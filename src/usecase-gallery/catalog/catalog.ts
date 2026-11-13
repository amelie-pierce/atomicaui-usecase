import { buildCatalog } from './build-catalog';

// Discovery: adding a use case folder, or a whole component folder, needs no registry edit.
// Docs and metas are tiny and loaded up front for the tree; examples and sources load on demand.
export const catalog = buildCatalog({
  metas: import.meta.glob('../usecases/*/*.meta.ts', { eager: true, import: 'default' }),
  docs: import.meta.glob('../usecases/*/*/usecase.ts', { eager: true, import: 'default' }),
  examples: import.meta.glob('../usecases/*/*/example.tsx', { import: 'default' }),
  sources: import.meta.glob('../usecases/*/*/example.tsx', { query: '?raw', import: 'default' }),
});

export const allUsecases = catalog.flatMap((group) => group.usecases);
