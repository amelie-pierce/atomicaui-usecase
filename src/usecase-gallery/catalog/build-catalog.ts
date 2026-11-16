import { lazy } from 'react';
import type { ComponentType } from 'react';
import { toContextSnippet, toSnippet } from './snippet';
import type { AreaGroup, ComponentGroup, ComponentMeta, ContextProps, Usecase, UsecaseDoc } from '../types';

type Loader<T> = () => Promise<T>;

/** Glob results keyed by path, e.g. `../usecases/button/Button-001/example.tsx`; modules are default exports. */
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
    const match = ID_PATTERN.exec(id) ?? fail(`"${id}" is not a valid id; use <Component>-<NNN>, e.g. Button-001`);
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
    const slug = doc.contextVariant ? `${areaSlug(doc.area)}-${doc.contextVariant}` : areaSlug(doc.area);
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
      usecase.cases = cases.map(({ id: caseId, name }) => {
        if (caseIds.has(caseId)) fail(`${id} lists the case "${caseId}" twice`);
        caseIds.add(caseId);
        const loadScene = sceneByKey.get(`${key}/${caseId}`) ?? fail(`${id} lists the case "${caseId}" but scenes/${caseId}.tsx is missing`);
        const loadSceneSource = sceneSourceByKey.get(`${key}/${caseId}`) ?? fail(`${id} lists the case "${caseId}" but scenes/${caseId}.tsx is missing`);
        const Scene = lazy(() => loadScene().then((component) => ({ default: component })));
        let sceneCode: Promise<string> | undefined;
        return {
          id: caseId,
          name,
          Scene,
          loadCode: () => (sceneCode ??= Promise.all([usecase.loadCode(), loadSceneSource()]).then(([snippet, source]) => toContextSnippet(source, snippet))),
        };
      });
    }
    group.usecases.push(usecase);
  }

  return [...groups.values()]
    .filter((group) => group.usecases.length > 0)
    .sort((a, b) => byNaturalOrder(a.title, b.title))
    .map(({ usecases, ...group }) => ({ ...group, areas: groupByArea(usecases) }));
}

/** Areas appear in the order of their lowest use case id, so a new area slots in where its first use case sits. */
function groupByArea(usecases: Usecase[]): AreaGroup[] {
  const areas = new Map<string, AreaGroup>();
  for (const usecase of [...usecases].sort((a, b) => byNaturalOrder(a.id, b.id))) {
    const title = usecase.area.trim() || fail(`${usecase.id} has an empty area`);
    const area = areas.get(title) ?? { title, usecases: [] };
    area.usecases.push(usecase);
    areas.set(title, area);
  }
  return [...areas.values()];
}
