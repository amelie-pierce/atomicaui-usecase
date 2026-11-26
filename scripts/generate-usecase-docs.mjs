import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const usecasesRoot = path.join(root, 'src/usecase-gallery/usecases');
const docsRoot = path.join(root, 'docs/usecases');
const appsSource = await readFile(path.join(root, 'src/usecase-gallery/apps.ts'), 'utf8');
const appLabels = Object.fromEntries(
  [...appsSource.matchAll(/^\s{2}(\w+):\s*\{[\s\S]*?label:\s*'([^']+)'/gm)].map(([, key, label]) => [key, label]),
);

async function directories(directory) {
  return (await readdir(directory, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(directory, entry.name));
}

async function loadUsecase(source, sourcePath) {
  const withoutImport = source.replace(/^import\s+\{\s*defineUsecase\s*\}\s+from\s+['"][^'"]+['"];?\s*/m, '');
  if (withoutImport === source) throw new Error(`Expected defineUsecase import in ${sourcePath}`);
  const { code } = await transform(`const defineUsecase = (value) => value;\n${withoutImport}`, {
    loader: 'ts',
    format: 'esm',
    target: 'es2022',
  });
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`;
  return (await import(moduleUrl)).default;
}

function codeFence(source) {
  const longest = Math.max(2, ...[...source.matchAll(/`+/g)].map(([fence]) => fence.length));
  const fence = '`'.repeat(longest + 1);
  return `${fence}tsx\n${source.trimEnd()}\n${fence}`;
}

function bullets(values, empty = 'None documented.') {
  return values.length ? values.map((value) => `- ${value}`).join('\n') : empty;
}

function componentNames(sources) {
  const names = new Set();
  for (const source of sources) {
    for (const [, imports] of source.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"][^'"]*\/kit['"]/g)) {
      for (const imported of imports.split(',')) {
        const name = imported.trim().split(/\s+as\s+/)[0];
        if (name) names.add(name);
      }
    }
  }
  return [...names].sort((a, b) => a.localeCompare(b));
}

function styleValues(sources) {
  const values = new Map();
  for (const source of sources) {
    for (const [, prop, value] of source.matchAll(/\b(color|paint|scale|shape|profile|role|weight)\s*:\s*['"]([^'"]+)['"]/g)) {
      if (!values.has(prop)) values.set(prop, new Set());
      values.get(prop).add(value);
    }
  }
  return [...values.entries()].map(([prop, found]) => `\`${prop}\`: ${[...found].sort().map((value) => `\`${value}\``).join(', ')}`);
}

function renderAnatomy(anatomy = []) {
  if (!anatomy.length) return 'No Anatomy parts are authored for this use case.';
  return anatomy.map((part, index) => {
    const link = part.selector ? `Selector: \`${part.selector}\`.` : `Part marker: \`data-ug-part="${part.id}"\`.`;
    return `${index + 1}. **${part.name}** — ${part.description} ${link}${part.text ? ' Direct text is highlighted.' : ''}`;
  }).join('\n');
}

function renderLayers(layers = []) {
  if (!layers.length) return 'No layer steps are authored for this view.';
  return layers.map((step, index) => `${index + 1}. **${step.title}** — ${step.explanation} Selector: \`${step.selector}\`.`).join('\n');
}

function renderProps(doc) {
  const props = doc.api?.props ?? [];
  if (!props.length) return 'No separate API prop table is authored. Use the exact props visible in the Component and In context source below.';
  return [
    '| Prop | Type | Required | Default | Description |',
    '| --- | --- | --- | --- | --- |',
    ...props.map((prop) => `| \`${prop.name}\` | ${prop.type} | ${prop.required ? 'Yes' : 'No'} | ${prop.defaultValue ? `\`${prop.defaultValue}\`` : '—'} | ${prop.description ?? '—'} |`),
  ].join('\n');
}

function renderContextDocument(contextDocument = {}) {
  const labels = {
    summary: 'Context view',
    where: 'Context placement',
    when: 'Context choice',
    how: 'Context usage',
    usage: 'Usage',
    behavior: 'Behavior',
    variants: 'Variants',
  };
  const prose = Object.entries(labels)
    .filter(([key]) => contextDocument[key])
    .map(([key, label]) => `**${label}:** ${contextDocument[key]}`)
    .join('\n\n');
  const additional = [];
  if (contextDocument.accessibility) {
    additional.push(`**Context accessibility:** ${Object.entries(contextDocument.accessibility).map(([key, value]) => `${key}: ${value}`).join('; ')}`);
  }
  if (contextDocument.api?.props?.length) additional.push(`**Context API props:**\n\n${renderProps({ api: contextDocument.api })}`);
  if (contextDocument.prompt) additional.push(`**Context build prompt:** ${contextDocument.prompt}`);
  if (contextDocument.debugPrompt) additional.push(`**Context debug prompt:** ${contextDocument.debugPrompt}`);
  if (contextDocument.related?.length) additional.push(`**Context related:** ${contextDocument.related.map((item) => `[${item.label}](${item.href})`).join(', ')}`);
  return [prose, ...additional].filter(Boolean).join('\n\n');
}

const componentDirs = (await directories(usecasesRoot)).sort();
const indexRows = [];
let generated = 0;

for (const componentDir of componentDirs) {
  const family = path.basename(componentDir);
  const metaPath = path.join(componentDir, `${family}.meta.ts`);
  const metaSource = await readFile(metaPath, 'utf8');
  const metaModule = await transform(`${metaSource.replace(/^import\s+\{\s*defineComponent\s*\}\s+from\s+['"][^'"]+['"];?\s*/m, '')}`, {
    loader: 'ts', format: 'esm', target: 'es2022',
  });
  const metaUrl = `data:text/javascript;base64,${Buffer.from(`const defineComponent = (value) => value;\n${metaModule.code}`).toString('base64')}`;
  const meta = (await import(metaUrl)).default;
  const cases = (await directories(componentDir)).sort();
  const familyRows = [];

  for (const caseDir of cases) {
    const id = path.basename(caseDir);
    const relative = (file) => path.relative(root, file).split(path.sep).join('/');
    const usecaseFile = path.join(caseDir, 'usecase.ts');
    const usecaseSource = await readFile(usecaseFile, 'utf8');
    const doc = await loadUsecase(usecaseSource, relative(usecaseFile));
    const firstExample = path.join(caseDir, 'example.tsx');
    const exampleSource = await readFile(firstExample, 'utf8');
    const optionRows = [];
    const sources = [exampleSource];

    for (const [index, option] of doc.options.entries()) {
      const optionDir = path.join(caseDir, 'options', option.id);
      const exampleFile = index === 0 ? firstExample : path.join(optionDir, 'example.tsx');
      const sceneFile = path.join(optionDir, 'scene.tsx');
      const optionExample = index === 0 ? exampleSource : await readFile(exampleFile, 'utf8');
      const scene = await readFile(sceneFile, 'utf8');
      sources.push(optionExample, scene);
      const optionApps = (option.apps ?? doc.apps).map((app) => appLabels[app] ?? app).join(', ');
      const sceneSources = Object.entries(option.source ?? doc.source ?? {}).map(([app, source]) => `${appLabels[app] ?? app}: \`${source}\``);
      const noContext = option.showContext === false;
      const contextDoc = renderContextDocument(option.contextDocument);
      const contextAnatomy = option.contextAnatomy?.length
        ? `#### In context structure additions\n\n${renderAnatomy(option.contextAnatomy)}\n\n`
        : '';
      const contextLayers = option.contextLayers?.length
        ? `#### In context layer steps\n\n${renderLayers([...option.contextLayers, ...doc.layers])}\n\n`
        : '';
      optionRows.push(`### ${index + 1}. ${option.name} (\`${option.id}\`)\n\nApps: ${optionApps || 'Not listed.'}\n\n${sceneSources.length ? `In context source: ${sceneSources.join('; ')}\n\n` : ''}${option.note ? `Note: ${option.note}\n\n` : ''}In context view: ${noContext ? 'Hidden by the authored option setting.' : 'Shown.'}\n\n${contextDoc ? `${contextDoc}\n\n` : ''}${contextAnatomy}${contextLayers}#### Component UI source — \`${relative(exampleFile)}\`\n\n${codeFence(optionExample)}\n\n#### In context source — \`${relative(sceneFile)}\`\n\n${codeFence(scene)}`);
    }

    const components = componentNames(sources);
    const values = styleValues(sources);
    const docPath = path.join(docsRoot, family, `${id}.md`);
    await mkdir(path.dirname(docPath), { recursive: true });
    const content = [
      `# ${id}: ${doc.title}`,
      '',
      `Component family: **${meta.title}**${meta.parent ? ` (shown within ${meta.parent})` : ''}`,
      '',
      `UI type: **${doc.uiType}**`,
      '',
      `Source: \`${relative(usecaseFile)}\``,
      '',
      '## What it is',
      '',
      doc.summary,
      '',
      '## When to choose it',
      '',
      doc.when,
      '',
      '## Where it belongs',
      '',
      doc.where,
      '',
      '## Usage guidance',
      '',
      doc.how,
      ...(doc.usage ? ['', doc.usage] : []),
      ...(doc.behavior ? ['', `**Behavior:** ${doc.behavior}`] : []),
      ...(doc.variants ? ['', `**Variants:** ${doc.variants}`] : []),
      '',
      '## AtomicAUI components, props, and token values',
      '',
      `AtomicAUI components imported by this use case: ${components.length ? components.map((name) => `\`${name}\``).join(', ') : 'None detected in the authored component source.'}`,
      '',
      'The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:',
      '',
      bullets(values, 'No color, paint, scale, shape, profile, role, or weight string props were found in the example or scene source.'),
      '',
      '### Authored API props',
      '',
      renderProps(doc),
      '',
      '## Structure (outer to inner)',
      '',
      renderAnatomy(doc.anatomy),
      '',
      '## Component layer steps',
      '',
      renderLayers(doc.layers),
      '',
      '## Apps',
      '',
      bullets((doc.apps ?? []).map((app) => `${appLabels[app] ?? app} (\`${app}\`)`)),
      '',
      '## Options and copyable source',
      '',
      'Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.',
      '',
      ...optionRows.flatMap((row) => [row, '']),
      ...(doc.accessibility ? ['## Accessibility', '', ...Object.entries(doc.accessibility).map(([key, value]) => `- **${key}:** ${value}`), ''] : []),
      ...(doc.prompt ? ['## Build prompt', '', doc.prompt, ''] : []),
      ...(doc.related?.length ? ['## Related use cases', '', ...doc.related.map((item) => `- [${item.label}](${item.href})`), ''] : []),
      '_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._',
      '',
    ].join('\n');
    await writeFile(docPath, content);
    familyRows.push(`- [${id}: ${doc.title}](./${family}/${id}.md) — ${doc.summary.replace(/\s+/g, ' ').trim()}`);
    generated++;
  }
  indexRows.push(`## ${meta.title}\n\n${familyRows.join('\n')}`);
}

const index = `# AtomicAUI use case reference\n\nGenerated per-use-case docs grounded in \`src/usecase-gallery/usecases/\`. Each page includes the authored choice guidance, Anatomy, options, apps, AtomicAUI component imports, style values, and source snippets. Regenerate with \`npm run docs:usecases\`.\n\n## Build an app from these references\n\n1. Choose a use case by its business action and read its **When to choose it** guidance; the title describes the action, while the UI type describes structure.\n2. Choose the option whose rendered UI and state match the app. Its apps and source references show where the composition came from.\n3. Copy the Component source for an isolated control, or use the In context source to place it in a representative composition. Combine multiple use cases when the app needs multiple actions or component responsibilities; keep each component's props and relationships consistent with its source.\n4. Use AtomicAUI components, tokens, fonts, and icons only. Never edit \`src/vendor/atomic-aui\`, create new design-system components, or substitute hand-authored colors, fonts, or icons.\n5. Treat the source snippets as the authority. The snippets include preview scaffolding such as \`data-ug-part\` and host placement where applicable; adapt only the gallery-specific preview wiring when integrating into an app.\n\n## Use cases by component family\n\n${indexRows.join('\n\n')}\n`;
await mkdir(docsRoot, { recursive: true });
await writeFile(path.join(docsRoot, 'README.md'), index);
console.log(`Generated ${generated} use case documents across ${componentDirs.length} component families.`);
