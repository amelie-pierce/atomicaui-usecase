import { lazy } from 'react';
import type { ComponentType } from 'react';
import { appLabels } from './app-views';
import { toContextSlotLines, toContextSnippet, toSnippet } from './snippet';
import { anatomyLayers } from './anatomy-layers';
import type { AppKey } from '../apps';
import type { ComponentGroup, ComponentMeta, ContextProps, UiTypeGroup, Usecase, UsecaseDoc, UsecaseOption, UsecaseOptionDoc } from '../types';

type Loader<T> = () => Promise<T>;

/** Glob results keyed by path, e.g. `../usecases/button/Button-013/example.tsx`; modules are default exports. */
export interface CatalogSources {
  metas: Record<string, ComponentMeta>;
  docs: Record<string, UsecaseDoc>;
  examples: Record<string, Loader<ComponentType>>;
  sources: Record<string, Loader<string>>;
  /** `../usecases/<component>/<UseCaseId>/options/<option-id>/{scene,example}.tsx`: the options of a selection-based use case. */
  options?: Record<string, Loader<ComponentType<ContextProps> | ComponentType>>;
  optionSources?: Record<string, Loader<string>>;
}

const ID_PATTERN = /^([A-Z][A-Za-z0-9]*)-(\d{3,})$/;
const byNaturalOrder = (a: string, b: string) => a.localeCompare(b, 'en', { numeric: true });

const segments = (path: string) => path.split('/');
/** `.../usecases/<component>/<UseCaseId>/<file>` -> [component, UseCaseId]. */
const usecaseKey = (path: string) => segments(path).slice(-3, -1);
/** `.../usecases/<component>/<component>.meta.ts` -> component. */
const componentKey = (path: string) => segments(path).slice(-2, -1)[0];

/** `.../usecases/<component>/<UseCaseId>/options/<option-id>/<file>.tsx` -> `<component>/<UseCaseId>/<option-id>/<file>`. */
const optionKey = (path: string) => {
  const [component, id, , option, file] = segments(path).slice(-5);
  return `${component}/${id}/${option}/${file.replace(/\.tsx$/, '')}`;
};
const fail = (message: string): never => {
  throw new Error(`[usecase-gallery] ${message}`);
};

function validateAnatomy(id: string, parts: Usecase['anatomy'], label = 'Component') {
  const ids = new Set<string>();
  for (const part of parts) {
    if (!part.id || !part.name || !part.description) fail(`${id} has an incomplete ${label} Anatomy part`);
    if (ids.has(part.id)) fail(`${id} repeats ${label} Anatomy id "${part.id}"`);
    ids.add(part.id);
  }
  // Parent and reading order depend on option-specific mounted DOM and cannot be inferred
  // from arbitrary CSS selectors in the static catalog. The preview orders resolved targets.
  anatomyLayers(parts, label === 'Component' ? 'component' : 'context');
}

/** Pure assembly of the catalog from glob results, so the discovery rules live in one testable place. */
export function buildCatalog({ metas, docs, examples, sources, options = {}, optionSources = {} }: CatalogSources): ComponentGroup[] {
  const groups = new Map<string, ComponentGroup & { usecases: Usecase[] }>();
  for (const [path, meta] of Object.entries(metas)) {
    groups.set(componentKey(path), { ...meta, usecases: [] });
  }

  const exampleByPath = new Map(Object.entries(examples).map(([p, load]) => [usecaseKey(p).join('/'), load]));
  const sourceByPath = new Map(Object.entries(sources).map(([p, load]) => [usecaseKey(p).join('/'), load]));
  const optionByKey = new Map(Object.entries(options).map(([p, load]) => [optionKey(p), load]));
  const optionSourceByKey = new Map(Object.entries(optionSources).map(([p, load]) => [optionKey(p), load]));
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
    const { options: optionDocs, ...docFields } = doc;
    const usecase: Usecase = {
      ...docFields,
      id,
      componentId: group.id,
      Example: lazy(() => loadExample().then((component) => ({ default: component }))),
      loadCode: () => (code ??= loadSource().then(toSnippet)),
    };
    validateAnatomy(id, usecase.anatomy);
    if (!group.uiTypes.includes(doc.uiType)) fail(`${id} sets uiType "${doc.uiType}", which is not in uiTypes of ${component}.meta.ts (${group.uiTypes.join(', ')})`);
    if (!optionDocs?.length) fail(`${id} must define at least one option`);
    usecase.options = buildOptions(usecase, optionDocs, key, optionByKey, optionSourceByKey);
    for (const option of usecase.options) {
      const partIds = new Set(usecase.anatomy.map((part) => part.id));
      const overrideIds = new Set<string>();
      for (const part of option.componentAnatomy ?? []) {
        if (!partIds.has(part.id)) fail(`${id} option "${option.id}" overrides unknown Component Anatomy part "${part.id}"`);
        if (overrideIds.has(part.id)) fail(`${id} option "${option.id}" overrides Component Anatomy part "${part.id}" twice`);
        overrideIds.add(part.id);
      }
      validateAnatomy(id, option.contextAnatomy, `In context (${option.id})`);
    }
    group.usecases.push(usecase);
  }

  const built = [...groups.values()]
    .filter((group) => group.usecases.length > 0)
    .sort((a, b) => byNaturalOrder(a.title, b.title))
    .map(({ usecases, ...group }) => ({ ...group, uiTypeGroups: groupByUiType(group, usecases) }));
  return foldIntoParents(built).map((group) => ({
    ...group,
    flattenUiTypeGroup: group.uiTypeGroups.length === 1
      && normalizeTreeLabel(group.title) === normalizeTreeLabel(group.uiTypeGroups[0].title),
  }));
}

/** Ignore case and whitespace so labels such as `CardGroup` and `Card Group` are equivalent. */
function normalizeTreeLabel(value: string) {
  return value.toLocaleLowerCase().replace(/\s+/g, '');
}

/** A component with a `parent` is shown inside it: its UI types follow the parent's and its use cases report the parent as their component. */
function foldIntoParents(built: ComponentGroup[]): ComponentGroup[] {
  const top = built.filter((group) => !group.parent);
  for (const child of built.filter((group) => group.parent)) {
    const parent = top.find((group) => group.id === child.parent) ?? fail(`${child.id}.meta.ts sets parent "${child.parent}", which is not a component with use cases`);
    parent.uiTypes = [...parent.uiTypes, ...child.uiTypes];
    parent.uiTypeGroups = [...parent.uiTypeGroups, ...child.uiTypeGroups];
    for (const type of child.uiTypeGroups) for (const usecase of type.usecases) usecase.componentId = parent.id;
  }
  return top;
}

/** Old component ids that now live inside another (`AlertDialog` -> `Dialog`), for links made before the grouping. */
export const parentAliases = (metas: Record<string, ComponentMeta>): Record<string, string> =>
  Object.fromEntries(Object.values(metas).flatMap((meta) => (meta.parent ? [[meta.id, meta.parent]] : [])));

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

/**
 * The options of a use case: every option names the apps that draw it and has its own scene; the first option's example is
 * the use case's `example.tsx`, every other option brings `options/<id>/example.tsx`. The apps of the options must be
 * exactly the apps of the use case, so the Document badges and the control say the same thing.
 */
function buildOptions(usecase: Usecase, docs: UsecaseOptionDoc[], key: string, files: Map<string, Loader<ComponentType<ContextProps> | ComponentType>>, sources: Map<string, Loader<string>>): UsecaseOption[] {
  const { id } = usecase;
  const ids = new Set<string>();
  const names = new Set<string>();
  for (const { name } of docs) {
    if (/\b(?:ui\s+)?(?:variant|option)\s+\d+\b/i.test(name)) fail(`${id} uses generic option name "${name}"`);
    const normalized = name.trim().replace(/\s+/g, ' ').toLocaleLowerCase();
    if (names.has(normalized)) fail(`${id} repeats option name "${name}"`);
    names.add(normalized);
  }
  const options = docs.map((raw, index): UsecaseOption => {
    const { id: optionId, name, apps = usecase.apps, note, source, showContext = true, contextAnatomy = [], contextAnatomyOverrides = [], contextDocument, componentAnatomy, componentDocument } = raw;
    const contextIds = new Set(contextAnatomy.map((part) => part.id));
    const anatomyOverrideIds = new Set<string>();
    for (const part of contextAnatomyOverrides) {
      if (!contextIds.has(part.id)) fail(`${id} option "${optionId}" overrides unknown In context Anatomy part "${part.id}"`);
      if (anatomyOverrideIds.has(part.id)) fail(`${id} option "${optionId}" overrides In context Anatomy part "${part.id}" twice`);
      anatomyOverrideIds.add(part.id);
    }
    const resolvedContextAnatomy = contextAnatomy.map((part) => ({ ...part, ...contextAnatomyOverrides.find((override) => override.id === part.id) }));
    for (const app of [...apps, ...Object.keys(source ?? {})] as AppKey[]) {
      if (!apps.includes(app) || !usecase.apps.includes(app)) fail(`${id} sets the option "${optionId}" to app "${app}", which is not in its apps`);
    }
    if (apps.length === 0) fail(`${id} gives the option "${optionId}" an empty apps list`);
    if (ids.has(optionId)) fail(`${id} lists the option "${optionId}" twice`);
    ids.add(optionId);
    const loadScene = files.get(`${key}/${optionId}/scene`) ?? fail(`${id} lists the option "${optionId}" but options/${optionId}/scene.tsx is missing`);
    const loadSceneSource = sources.get(`${key}/${optionId}/scene`) ?? fail(`${id} lists the option "${optionId}" but options/${optionId}/scene.tsx is missing`);
    const Scene = lazy(() => (loadScene() as Promise<ComponentType<ContextProps>>).then((component) => ({ default: component })));
    let exampleCode: Promise<string> | undefined;
    let sceneCode: Promise<string> | undefined;
    let slotLines: Promise<LineRange | undefined> | undefined;
    let Example = usecase.Example;
    let loadExampleCode = usecase.loadCode;
    if (index > 0) {
      const loadExample = files.get(`${key}/${optionId}/example`) ?? fail(`${id} lists the option "${optionId}" but options/${optionId}/example.tsx is missing`);
      const loadExampleSource = sources.get(`${key}/${optionId}/example`) ?? fail(`${id} lists the option "${optionId}" but options/${optionId}/example.tsx is missing`);
      Example = lazy(() => (loadExample() as Promise<ComponentType>).then((component) => ({ default: component })));
      loadExampleCode = () => (exampleCode ??= loadExampleSource().then(toSnippet));
    }
    return {
      id: optionId,
      name,
      apps,
      label: appLabels(apps),
      note,
      showContext,
      contextAnatomy: resolvedContextAnatomy,
      contextDocument,
      componentAnatomy,
      componentDocument,
      Scene,
      Example,
      loadExampleCode,
      loadCode: () => (sceneCode ??= Promise.all([loadExampleCode(), loadSceneSource()]).then(([snippet, sceneSource]) => toContextSnippet(sceneSource, snippet))),
      loadSlotLines: () => (slotLines ??= Promise.all([loadExampleCode(), loadSceneSource()]).then(([snippet, sceneSource]) => toContextSlotLines(sceneSource, snippet))),
    };
  });
  const shown = new Set(options.flatMap((option) => option.apps));
  for (const app of usecase.apps) {
    if (!shown.has(app)) fail(`${id} lists "${app}" in apps, but no option shows it; add it to an option's apps or remove it from the use case`);
  }
  return options;
}
