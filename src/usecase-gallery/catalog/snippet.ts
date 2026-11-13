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
