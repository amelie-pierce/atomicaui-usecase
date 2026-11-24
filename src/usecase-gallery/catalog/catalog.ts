import { buildCatalog, parentAliases } from './build-catalog';
import type { ComponentMeta } from '../types';

// Discovery: adding a use case folder, or a whole component folder, needs no registry edit.
// Docs and metas are tiny and loaded up front for the tree; examples and sources load on demand.
const metas = import.meta.glob<ComponentMeta>('../usecases/*/*.meta.ts', { eager: true, import: 'default' });
export const componentAliases = parentAliases(metas);
export const catalog = buildCatalog({
  metas,
  docs: import.meta.glob('../usecases/*/*/usecase.ts', { eager: true, import: 'default' }),
  examples: import.meta.glob('../usecases/*/*/example.tsx', { import: 'default' }),
  sources: import.meta.glob('../usecases/*/*/example.tsx', { query: '?raw', import: 'default' }),
  // One file per area (place of use), named for it (`contexts/dialog.tsx`); an area without one falls back to a plain frame.
  contexts: import.meta.glob('../contexts/*.tsx', { import: 'default' }),
  contextSources: import.meta.glob('../contexts/*.tsx', { query: '?raw', import: 'default' }),
  // In context cases of one use case: `usecases/<component>/<UseCaseId>/scenes/<case>.tsx`, listed in its `usecase.ts`.
  scenes: import.meta.glob('../usecases/*/*/scenes/*.tsx', { import: 'default' }),
  sceneSources: import.meta.glob('../usecases/*/*/scenes/*.tsx', { query: '?raw', import: 'default' }),
  // Examples of the looks after the first: `usecases/<component>/<UseCaseId>/looks/<look-slug>.tsx`.
  // Options of a selection-based use case: `usecases/<component>/<UseCaseId>/options/<option-id>/{scene,example}.tsx`.
  options: import.meta.glob('../usecases/*/*/options/*/*.tsx', { import: 'default' }),
  optionSources: import.meta.glob('../usecases/*/*/options/*/*.tsx', { query: '?raw', import: 'default' }),
  looks: import.meta.glob('../usecases/*/*/looks/*.tsx', { import: 'default' }),
  lookSources: import.meta.glob('../usecases/*/*/looks/*.tsx', { query: '?raw', import: 'default' }),
});

export const allUsecases = catalog.flatMap((group) => group.uiTypeGroups.flatMap((type) => type.usecases));
