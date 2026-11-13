import { lazy } from 'react';
import type { ComponentType } from 'react';
import { toSnippet } from './snippet';
import type { ComponentGroup, ComponentMeta, Usecase, UsecaseDoc } from '../types';

type Loader<T> = () => Promise<T>;

/** Glob results keyed by path, e.g. `../usecases/button/Button-001/example.tsx`; modules are default exports. */
export interface CatalogSources {
  metas: Record<string, ComponentMeta>;
  docs: Record<string, UsecaseDoc>;
  examples: Record<string, Loader<ComponentType>>;
  sources: Record<string, Loader<string>>;
}

const ID_PATTERN = /^([A-Z][A-Za-z0-9]*)-(\d{3,})$/;
const byNaturalOrder = (a: string, b: string) => a.localeCompare(b, 'en', { numeric: true });

const segments = (path: string) => path.split('/');
/** `.../usecases/<component>/<UseCaseId>/<file>` -> [component, UseCaseId]. */
const usecaseKey = (path: string) => segments(path).slice(-3, -1);
/** `.../usecases/<component>/<component>.meta.ts` -> component. */
const componentKey = (path: string) => segments(path).slice(-2, -1)[0];

const fail = (message: string): never => {
  throw new Error(`[usecase-gallery] ${message}`);
};

/** Pure assembly of the catalog from glob results, so the discovery rules live in one testable place. */
export function buildCatalog({ metas, docs, examples, sources }: CatalogSources): ComponentGroup[] {
  const groups = new Map<string, ComponentGroup>();
  for (const [path, meta] of Object.entries(metas)) {
    groups.set(componentKey(path), { ...meta, usecases: [] });
  }

  const exampleByPath = new Map(Object.entries(examples).map(([p, load]) => [usecaseKey(p).join('/'), load]));
  const sourceByPath = new Map(Object.entries(sources).map(([p, load]) => [usecaseKey(p).join('/'), load]));
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
    const usecase: Usecase = {
      ...doc,
      id,
      componentId: group.id,
      Example: lazy(() => loadExample().then((component) => ({ default: component }))),
      loadCode: () => (code ??= loadSource().then(toSnippet)),
    };
    group.usecases.push(usecase);
  }

  return [...groups.values()]
    .filter((group) => group.usecases.length > 0)
    .sort((a, b) => byNaturalOrder(a.title, b.title))
    .map((group) => ({ ...group, usecases: group.usecases.sort((a, b) => byNaturalOrder(a.id, b.id)) }));
}
