import type { LayerStep, Usecase } from '../types';

const PART_MARKER = /\sdata-ug-part=(["'])[^"']*\1/g;

/** Layer code keeps `data-ug-part` markers so steps can find their element; copied and displayed code drops them. */
export const stripPartMarkers = (code: string): string => code.replace(PART_MARKER, '');

/** The compounds of a selector from the revealed element outwards, with `:not(...)` guards removed. */
function compoundsOutward(selector: string) {
  const plain = selector.replace(/:not\((?:[^()]|\([^()]*\))*\)/g, '');
  let depth = 0;
  let quote = '';
  let current = '';
  const compounds: string[] = [];
  for (const char of plain) {
    if (quote) { if (char === quote) quote = ''; }
    else if (char === '"' || char === "'") quote = char;
    else if (char === '(' || char === '[') depth += 1;
    else if (char === ')' || char === ']') depth -= 1;
    else if (depth === 0 && /[\s>+~]/.test(char)) { compounds.push(current); current = ''; continue; }
    current += char;
  }
  compounds.push(current);
  return compounds.filter(Boolean).reverse();
}

const tagWords = (tag: string) => tag.replace(/\./g, '').match(/[A-Z][a-z0-9]*/g)?.map((word) => word.toLowerCase()) ?? [];

/** Whether a JSX tag is the component a class comes from: its trailing words are the class words (`Field.NumberFieldGroup` <- `aui-number-field-group`). */
function tagMatchesClass(tag: string, className: string) {
  const words = tagWords(tag);
  const classWords = className.split('-').filter(Boolean);
  return classWords.length > 0 && classWords.length <= words.length && classWords.every((word, index) => word === words[words.length - classWords.length + index]);
}

/** The line span of the opening tag that starts at `start`, through its closing `>`. */
function openingTagLines(code: string, start: number) {
  let depth = 0;
  let quote = '';
  let end = start;
  for (; end < code.length; end += 1) {
    const char = code[end];
    if (quote) { if (char === quote) quote = ''; continue; }
    if (char === '"' || char === "'") quote = char;
    else if (char === '{') depth += 1;
    else if (char === '}') depth -= 1;
    else if (char === '>' && depth === 0 && code[end - 1] !== '=') break;
  }
  const first = code.slice(0, start).split('\n').length - 1;
  return { first, last: first + code.slice(start, end).split('\n').length - 1 };
}

function linesOf(code: string, compound: string, step: LayerStep) {
  const starts: number[] = [];
  const classNames = [...compound.matchAll(/\[class~=["']aui-([^"']+)["']\]/g)].map(([, className]) => className);
  for (const match of code.matchAll(/<([A-Za-z][\w.-]*)(?=[\s/>])/g)) {
    if (step.code ? step.code.includes(match[1]) : classNames.some((className) => tagMatchesClass(match[1], className))) starts.push(match.index);
  }
  for (const [, marker] of compound.matchAll(/data-ug-part=["']([^"']+)["']/g)) {
    for (const match of code.matchAll(new RegExp(`data-ug-part=["']${marker}["']`, 'g'))) {
      const tagStart = code.lastIndexOf('<', match.index);
      if (tagStart >= 0) starts.push(tagStart);
    }
  }
  const lines = new Set<number>();
  for (const start of starts) {
    const { first, last } = openingTagLines(code, start);
    for (let line = first; line <= last; line += 1) lines.add(line);
  }
  return lines;
}

/**
 * The 0-based lines of `code` that write the element a layer step reveals: whole opening tags, matched exactly by an authored
 * `code` tag, a `data-ug-part` marker or the class's component. An element a component renders itself has no tag of its own,
 * so the step resolves through the nearest enclosing selector that does.
 */
export function layerCodeLines(code: string, step: LayerStep | undefined) {
  if (!step) return new Set<number>();
  const own = step.code ? linesOf(code, '', step) : undefined;
  if (own?.size) return own;
  for (const compound of compoundsOutward(step.selector ?? '')) {
    const lines = linesOf(code, compound, { ...step, code: undefined });
    if (lines.size) return lines;
  }
  return new Set<number>();
}

/** The steps of one view whose code highlight is missing, or repeats the step before without being authored `unchanged`. */
export function layerCodeProblems(code: string, layers: LayerStep[]) {
  const problems: string[] = [];
  let previous: string | undefined;
  for (const layer of layers) {
    const lines = [...layerCodeLines(code, layer)].sort((a, b) => a - b).join(',');
    if (!lines) problems.push(`"${layer.id}" highlights no code line`);
    else if (lines === previous && !layer.unchanged) problems.push(`"${layer.id}" highlights the same code as the step before`);
    previous = lines;
  }
  return problems;
}

/** Rejects layer steps whose code view highlights nothing, or does not change from the previous step, in either view of every option. */
export async function assertLayerCode(usecases: Usecase[]) {
  const problems: string[] = [];
  for (const usecase of usecases) {
    for (const option of usecase.options) {
      const views = [
        { label: 'Component', code: await option.loadExampleCode(), layers: option.componentLayers ?? usecase.layers },
        { label: 'In context', code: await option.loadCode(), layers: [...option.contextLayers, ...usecase.layers] },
      ];
      for (const { label, code, layers } of views) {
        for (const problem of layerCodeProblems(code, layers)) problems.push(`${usecase.id} ${label} (${option.id}) ${problem}`);
      }
    }
  }
  if (problems.length) throw new Error(`[usecase-gallery] layer code: ${problems.join('; ')}`);
}
