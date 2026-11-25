const KIT_IMPORT = /^import\s[^;]*from\s+['"][^'"]*\/kit['"];?\s*$/gm;
const RETURNED_JSX = /return\s*\(?\s*([\s\S]*?)\s*\)?;\s*}\s*$/;

// The first line was captured after `return (`, so its indent is gone; align the rest to it.
const dedent = (jsx: string) => {
  const [first, ...rest] = jsx.split('\n');
  const indents = rest.filter((line) => line.trim()).map((line) => line.length - line.trimStart().length);
  const indent = indents.length ? Math.min(...indents) : 0;
  return [first, ...rest.map((line) => line.slice(indent))].join('\n');
};

const PREVIEW_ONLY_PROPS = /\s(?:container|anchor)=\{host\}|\s(?:anchor|ref)=\{anchor\}|\sclassName=\"ug-anchored\"|\sdata-ug-part=\"[^\"]*\"|\s(?:initialFocus|modal)=\{false\}|(?<=<[\w.]+)\sopen(?=[\s>])/g;

export const stripPreviewProps = (code: string): string => code.replace(PREVIEW_ONLY_PROPS, '');

/**
 * Turns an `example.tsx` source into the snippet users copy: the JSX the `Example` component returns,
 * without the kit import, the component wrapper or the preview-only props (a Dialog example is forced open into the stage). Falls back to the whole file when the shape differs.
 */
export const toSnippet = (source: string): string => {
  const body = source.replace(KIT_IMPORT, '').trim();
  const jsx = RETURNED_JSX.exec(body)?.[1];
  return jsx ? dedent(jsx.replace(PREVIEW_ONLY_PROPS, '')) : body;
};

const CHILDREN_LINE = /^([ \t]*)\{children\}[ \t]*$/m;

/** Turns an option scene source and the example snippet into the complete In context code, replacing its `{children}` slot. */
export const toContextSnippet = (contextSource: string, exampleSnippet: string): string => {
  const context = toSnippet(contextSource).replace(PREVIEW_ONLY_PROPS, '');
  const slot = CHILDREN_LINE.exec(context);
  // A scene with no slot writes its own controls (a static state), so it is the snippet.
  if (!slot) return context;
  // A fragment only groups siblings; inside the context's parent element it is noise.
  const unwrapped = /^<>\s*([\s\S]*?)\s*<\/>$/.exec(exampleSnippet.trim())?.[1];
  const indented = (unwrapped ? dedent(unwrapped) : exampleSnippet)
    .split('\n')
    .map((line, index) => (index === 0 || !line.trim() ? line : slot[1] + line))
    .join('\n');
  return context.replace(CHILDREN_LINE, slot[1] + indented);
};
