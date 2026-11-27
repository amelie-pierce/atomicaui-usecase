import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const server = await createServer({ configFile: false, appType: 'custom', server: { middlewareMode: true, hmr: false, ws: false }, optimizeDeps: { noDiscovery: true }, logLevel: 'error' });
const { assertLayerCode } = await server.ssrLoadModule('/src/usecase-gallery/catalog/layer-code.ts');
const { toContextSlotLines, toContextSnippet, toSnippet } = await server.ssrLoadModule('/src/usecase-gallery/catalog/snippet.ts');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const usecasesRoot = path.join(root, 'src/usecase-gallery/usecases');
const directories = async (directory) => (await readdir(directory, { withFileTypes: true })).filter((entry) => entry.isDirectory()).map((entry) => path.join(directory, entry.name));

async function loadUsecase(dir) {
  const doc = (await server.ssrLoadModule(`/${path.relative(root, path.join(dir, 'usecase.ts'))}`)).default;
  const exampleCode = async (index, option) => toSnippet(await readFile(path.join(dir, index === 0 ? 'example.tsx' : `options/${option.id}/example.tsx`), 'utf8'));
  const sceneSource = (option) => readFile(path.join(dir, `options/${option.id}/scene.tsx`), 'utf8');
  return {
    id: path.basename(dir),
    anatomy: doc.anatomy,
    options: doc.options.map((option, index) => ({
      ...option,
      contextAnatomy: (option.contextAnatomy ?? []).map((part) => ({ ...part, ...option.contextAnatomyOverrides?.find((override) => override.id === part.id) })),
      loadExampleCode: () => exampleCode(index, option),
      loadCode: async () => toContextSnippet(await sceneSource(option), await exampleCode(index, option)),
      loadSlotLines: async () => toContextSlotLines(await sceneSource(option), await exampleCode(index, option)),
    })),
  };
}

const usecases = [];
for (const component of await directories(usecasesRoot)) {
  for (const dir of await directories(component)) usecases.push(await loadUsecase(dir));
}
try {
  await assertLayerCode(usecases);
  console.log(`Layer code validated for ${usecases.length} use cases.`);
} finally {
  await server.close();
}
