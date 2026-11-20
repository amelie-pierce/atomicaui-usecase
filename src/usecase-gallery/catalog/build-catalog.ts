import { lazy } from 'react';
import type { ComponentType } from 'react';
import { appLabels, caseTypes } from './app-views';
import { toContextSnippet, toSnippet } from './snippet';
import type { AppKey } from '../apps';
import type { ComponentGroup, ComponentMeta, ContextProps, UiTypeGroup, Usecase, UsecaseCaseDoc, UsecaseDoc } from '../types';

type Loader<T> = () => Promise<T>;

/** Glob results keyed by path, e.g. `../usecases/button/Button-013/example.tsx`; modules are default exports. */
export interface CatalogSources {
  metas: Record<string, ComponentMeta>;
  docs: Record<string, UsecaseDoc>;
  examples: Record<string, Loader<ComponentType>>;
  sources: Record<string, Loader<string>>;
  /** `../contexts/<area-slug>.tsx` components and their sources, optional per area. */
  contexts?: Record<string, Loader<ComponentType<ContextProps>>>;
  contextSources?: Record<string, Loader<string>>;
  /** `../usecases/<component>/<UseCaseId>/scenes/<case>.tsx`: the In context cases of one use case. */
  scenes?: Record<string, Loader<ComponentType<ContextProps>>>;
  sceneSources?: Record<string, Loader<string>>;
}

const ID_PATTERN = /^([A-Z][A-Za-z0-9]*)-(\d{3,})$/;
const byNaturalOrder = (a: string, b: string) => a.localeCompare(b, 'en', { numeric: true });

const segments = (path: string) => path.split('/');
/** `.../usecases/<component>/<UseCaseId>/<file>` -> [component, UseCaseId]. */
const usecaseKey = (path: string) => segments(path).slice(-3, -1);
/** `.../usecases/<component>/<component>.meta.ts` -> component. */
const componentKey = (path: string) => segments(path).slice(-2, -1)[0];

/** `Body text` -> `body-text`: the file name of an area's context. */
export const areaSlug = (area: string) => area.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
/** `.../contexts/<area-slug>[-<variant>].tsx` -> the file name without extension. */
/** `.../usecases/<component>/<UseCaseId>/scenes/<case>.tsx` -> `<component>/<UseCaseId>/<case>`. */
const sceneKey = (path: string) => {
  const [component, id, , file] = segments(path).slice(-4);
  return `${component}/${id}/${file.replace(/\.tsx$/, '')}`;
};
const contextKey = (path: string) => segments(path).slice(-1)[0].replace(/\.tsx$/, '');

const fail = (message: string): never => {
  throw new Error(`[usecase-gallery] ${message}`);
};

/** Pure assembly of the catalog from glob results, so the discovery rules live in one testable place. */
export function buildCatalog({ metas, docs, examples, sources, contexts = {}, contextSources = {}, scenes = {}, sceneSources = {} }: CatalogSources): ComponentGroup[] {
  const groups = new Map<string, ComponentGroup & { usecases: Usecase[] }>();
  for (const [path, meta] of Object.entries(metas)) {
    groups.set(componentKey(path), { ...meta, usecases: [] });
  }

  const exampleByPath = new Map(Object.entries(examples).map(([p, load]) => [usecaseKey(p).join('/'), load]));
  const sourceByPath = new Map(Object.entries(sources).map(([p, load]) => [usecaseKey(p).join('/'), load]));
  const contextBySlug = new Map(Object.entries(contexts).map(([p, load]) => [contextKey(p), load]));
  const contextSourceBySlug = new Map(Object.entries(contextSources).map(([p, load]) => [contextKey(p), load]));
  const sceneByKey = new Map(Object.entries(scenes).map(([p, load]) => [sceneKey(p), load]));
  const sceneSourceByKey = new Map(Object.entries(sceneSources).map(([p, load]) => [sceneKey(p), load]));
  const lazyContexts = new Map<string, ComponentType<ContextProps>>();
  const ids = new Set<string>();

  for (const [path, doc] of Object.entries(docs)) {
    const [component, id] = usecaseKey(path);
    const group = groups.get(component) ?? fail(`"${component}" has use cases but no ${component}.meta.ts`);
    const match = ID_PATTERN.exec(id) ?? fail(`"${id}" is not a valid id; use <Component>-<NNN>, e.g. Button-013`);
    if (match[1] !== group.id) fail(`"${id}" must start with "${group.id}-" (id in ${component}.meta.ts)`);
    if (ids.has(id)) fail(`duplicate use case id "${id}"`);
    ids.add(id);

    const key = `${component}/${id}`;
    const loadExample = exampleByPath.get(key) ?? fail(`${id} is missing example.tsx`);
    const loadSource = sourceByPath.get(key) ?? fail(`${id} is missing example.tsx`);
    let code: Promise<string> | undefined;
    const { cases, ...docFields } = doc;
    const usecase: Usecase = {
      ...docFields,
      id,
      componentId: group.id,
      Example: lazy(() => loadExample().then((component) => ({ default: component }))),
      loadCode: () => (code ??= loadSource().then(toSnippet)),
    };
    if (!group.uiTypes.includes(doc.uiType)) fail(`${id} sets uiType "${doc.uiType}", which is not in uiTypes of ${component}.meta.ts (${group.uiTypes.join(', ')})`);
    if (doc.area && cases && cases.length > 0) fail(`${id} sets both "area" and "cases"; the scenes of the cases replace the area context, so drop "area"`);
    if (!doc.area && !(cases && cases.length > 0)) fail(`${id} has neither "area" (default In context) nor "cases"`);
    const slug = doc.area ? (doc.contextVariant ? `${areaSlug(doc.area)}-${doc.contextVariant}` : areaSlug(doc.area)) : '';
    if (doc.contextVariant && !contextBySlug.has(slug)) fail(`${id} sets contextVariant "${doc.contextVariant}" but contexts/${slug}.tsx is missing`);
    const loadContext = contextBySlug.get(slug);
    const loadContextSource = contextSourceBySlug.get(slug);
    if (loadContext && loadContextSource) {
      if (!lazyContexts.has(slug)) {
        lazyContexts.set(slug, lazy(() => loadContext().then((component) => ({ default: component }))));
      }
      usecase.Context = lazyContexts.get(slug);
      let contextCode: Promise<string> | undefined;
      usecase.loadContextCode = () =>
        (contextCode ??= Promise.all([usecase.loadCode(), loadContextSource()]).then(([snippet, source]) =>
          toContextSnippet(source, snippet),
        ));
    }
    if (cases && cases.length > 0) {
      const caseIds = new Set<string>();
      usecase.cases = cases.map((raw) => {
        const { id: caseId, name, apps = doc.apps, note, source } = raw;
        if ('app' in raw) fail(`${id} sets "app" on the case "${caseId}"; cases take "apps: [...]" now (the apps that share the scene)`);
        if (apps.length === 0) fail(`${id} gives the case "${caseId}" an empty apps list`);
        for (const app of [...apps, ...Object.keys(source ?? {})] as AppKey[]) {
          if (!apps.includes(app) || !doc.apps.includes(app)) fail(`${id} sets the case "${caseId}" to app "${app}", which is not in its apps`);
        }
        if (caseIds.has(caseId)) fail(`${id} lists the case "${caseId}" twice`);
        caseIds.add(caseId);
        const loadScene = sceneByKey.get(`${key}/${caseId}`) ?? fail(`${id} lists the case "${caseId}" but scenes/${caseId}.tsx is missing`);
        const loadSceneSource = sceneSourceByKey.get(`${key}/${caseId}`) ?? fail(`${id} lists the case "${caseId}" but scenes/${caseId}.tsx is missing`);
        const Scene = lazy(() => loadScene().then((component) => ({ default: component })));
        let sceneCode: Promise<string> | undefined;
        return {
          id: caseId,
          name,
          apps,
          label: appLabels(apps),
          note,
          Scene,
          loadCode: () => (sceneCode ??= Promise.all([usecase.loadCode(), loadSceneSource()]).then(([snippet, source]) => toContextSnippet(source, snippet))),
        };
      });
      checkAppGroups(usecase, cases);
    }
    group.usecases.push(usecase);
  }

  return [...groups.values()]
    .filter((group) => group.usecases.length > 0)
    .sort((a, b) => byNaturalOrder(a.title, b.title))
    .map(({ usecases, ...group }) => ({ ...group, uiTypeGroups: groupByUiType(group, usecases) }));
}

/**
 * The groups of a use case and its `apps` must say the same thing: within one type (cases sharing a name) the groups
 * never overlap and have different chips, and every listed app appears in at least one group, so the Document badges
 * and the In context toggle cover exactly the same apps. `docs` are the cases as written: a case without `apps` is
 * the same in every app, so it cannot share its name with another case.
 */
function checkAppGroups({ id, apps, cases = [] }: Usecase, docs: UsecaseCaseDoc[]) {
  for (const { name, cases: variants } of caseTypes({ cases })) {
    if (variants.length < 2) continue;
    const seen = new Map<AppKey, string>();
    for (const variant of variants) {
      if (!docs.find((doc) => doc.id === variant.id)?.apps) fail(`${id} gives the case "${variant.id}" no apps, but "${name}" has several cases; each needs its own apps`);
      for (const app of variant.apps) {
        const other = seen.get(app);
        if (other) fail(`${id} puts "${app}" in both "${other}" and "${variant.id}" of "${name}"; a type shows an app once`);
        seen.set(app, variant.id);
      }
    }
  }
  const shown = new Set(cases.flatMap((candidate) => candidate.apps));
  for (const app of apps) {
    if (!shown.has(app)) fail(`${id} lists "${app}" in apps, but no case shows it; add it to a case's apps or remove it from the use case`);
  }
}

/** UI types appear in the order the component's meta lists them; a listed type with no use case is a mistake. */
function groupByUiType({ id, title, uiTypes }: ComponentMeta, usecases: Usecase[]): UiTypeGroup[] {
  const groups = uiTypes.map((type): UiTypeGroup => ({ title: type, usecases: [] }));
  for (const usecase of [...usecases].sort((a, b) => byNaturalOrder(a.id, b.id))) {
    groups.find((group) => group.title === usecase.uiType)?.usecases.push(usecase);
  }
  for (const group of groups) {
    if (group.usecases.length === 0) fail(`${title} lists the UI type "${group.title}" in uiTypes, but no use case of ${id} has it`);
  }
  return groups;
}
