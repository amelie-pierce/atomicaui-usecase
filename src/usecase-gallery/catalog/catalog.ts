import { buildCatalog, parentAliases } from './build-catalog';
import { assertLayerCode } from './layer-code';
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
  // Options of a selection-based use case: `usecases/<component>/<UseCaseId>/options/<option-id>/{scene,example}.tsx`.
  options: import.meta.glob('../usecases/*/*/options/*/*.tsx', { import: 'default' }),
  optionSources: import.meta.glob('../usecases/*/*/options/*/*.tsx', { query: '?raw', import: 'default' }),
});

export const allUsecases = catalog.flatMap((group) => group.uiTypeGroups.flatMap((type) => type.usecases));

if (import.meta.env.DEV) void assertLayerCode(allUsecases);
