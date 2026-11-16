const KIT_IMPORT = /^import\s[^;]*from\s+['"][^'"]*\/kit['"];?\s*$/gm;
const RETURNED_JSX = /return\s*\(?\s*([\s\S]*?)\s*\)?;\s*}\s*$/;

// The first line was captured after `return (`, so its indent is gone; align the rest to it.
const dedent = (jsx: string) => {
  const [first, ...rest] = jsx.split('\n');
  const indents = rest.filter((line) => line.trim()).map((line) => line.length - line.trimStart().length);
  const indent = indents.length ? Math.min(...indents) : 0;
  return [first, ...rest.map((line) => line.slice(indent))].join('\n');
};

/**
 * Turns an `example.tsx` source into the snippet users copy: the JSX the `Example` component returns,
 * without the kit import or the component wrapper. Falls back to the whole file when the shape differs.
 */
export const toSnippet = (source: string): string => {
  const body = source.replace(KIT_IMPORT, '').trim();
  const jsx = RETURNED_JSX.exec(body)?.[1];
  return jsx ? dedent(jsx) : body;
};

const PREVIEW_ONLY_PROPS = /\s(?:container|anchor)=\{host\}|\s(?:initialFocus|modal)=\{false\}|(?<=<[\w.]+)\sopen(?=[\s>])/g;
// Scenery from `mock-data.tsx` is not part of the pattern: the copied code keeps a one-line placeholder.
const MOCK_SCENERY = /<Mock(\w+)\s*\/>/g;
const CHILDREN_LINE = /^([ \t]*)\{children\}[ \t]*$/m;

/**
 * Turns a `contexts/<area>.tsx` source and the example's snippet into the in-context snippet: the JSX
 * the context returns minus its preview-only props (forced open, `host` container), with its `{children}` line replaced by the example. Falls back to the example alone.
 */
export const toContextSnippet = (contextSource: string, exampleSnippet: string): string => {
  const context = toSnippet(contextSource)
    .replace(PREVIEW_ONLY_PROPS, '')
    .replace(MOCK_SCENERY, (_, name: string) => `{/* sample ${name.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()} */}`);
  const slot = CHILDREN_LINE.exec(context);
  // A scene with no slot writes its own controls (a static state of the case), so it is the snippet.
  if (!slot) return context;
  // A fragment only groups siblings; inside the context's parent element it is noise.
  const unwrapped = /^<>\s*([\s\S]*?)\s*<\/>$/.exec(exampleSnippet.trim())?.[1];
  const indented = (unwrapped ? dedent(unwrapped) : exampleSnippet)
    .split('\n')
    .map((line, index) => (index === 0 || !line.trim() ? line : slot[1] + line))
    .join('\n');
  return context.replace(CHILDREN_LINE, slot[1] + indented);
};
