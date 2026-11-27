import type { LayerStep, Usecase } from '../types';

const PART_MARKER = /\sdata-ug-part=(["'])[^"']*\1/g;

/** Layer code keeps `data-ug-part` markers so steps can find their element; copied and displayed code drops them. */
export const stripPartMarkers = (code: string): string => code.replace(PART_MARKER, '');

/** Splits a selector at the separators that sit outside brackets, parentheses and quotes, keeping each separator. */
function splitOutside(selector: string, separator: RegExp) {
  let depth = 0;
  let quote = '';
  let current = '';
  const parts: string[] = [];
  for (const char of selector) {
    if (quote) { if (char === quote) quote = ''; }
    else if (char === '"' || char === "'") quote = char;
    else if (char === '(' || char === '[') depth += 1;
    else if (char === ')' || char === ']') depth -= 1;
    else if (depth === 0 && separator.test(char)) { parts.push(current, char); current = ''; continue; }
    current += char;
  }
  parts.push(current);
  return parts;
}

interface Compound { text: string; direct: boolean }

/** The compounds of one complex selector from the revealed element outwards; `direct` marks a `>` link to the next one. */
function compoundsOutward(selector: string) {
  const compounds: Compound[] = [];
  let direct = false;
  for (const part of splitOutside(selector, /[\s>+~]/).reverse()) {
    if (part === '>' && compounds.length) compounds[compounds.length - 1].direct = true;
    else if (part.trim() && !/^[>+~]$/.test(part)) compounds.push({ text: part, direct });
  }
  return compounds;
}

interface CodeElement { tag: string; start: number; attributes: string; parent?: CodeElement; children: CodeElement[]; rendered?: CodeElement }

/** The line span of the opening tag that starts at `start`, through its closing `>`. */
function openingTag(code: string, start: number) {
  let depth = 0;
  let quote = '';
  let end = start;
  let attributes = '';
  for (; end < code.length; end += 1) {
    const char = code[end];
    if (quote) { if (char === quote) quote = ''; if (depth === 0) attributes += char; continue; }
    if (char === '}') depth -= 1;
    if (depth === 0) attributes += char;
    if (char === '"' || char === "'" || char === '`') quote = char;
    else if (char === '{') depth += 1;
    else if (char === '>' && depth === 0 && code[end - 1] !== '=') break;
  }
  const first = code.slice(0, start).split('\n').length - 1;
  return { first, last: first + code.slice(start, end).split('\n').length - 1, end, attributes };
}

/** The JSX elements `code` writes, linked to their written parents and children. */
function elementsOf(code: string) {
  const elements: CodeElement[] = [];
  const open: CodeElement[] = [];
  let latest: { element: CodeElement; end: number } | undefined;
  for (const match of code.matchAll(/<(\/?)([A-Za-z][\w.-]*)(?=[\s/>])/g)) {
    const [, closing, tag] = match;
    if (closing) {
      const index = open.map((element) => element.tag).lastIndexOf(tag);
      if (index >= 0) open.length = index;
      continue;
    }
    // A `<` glued to an identifier is a TypeScript type argument, not an element.
    if (/[\w$]/.test(code[match.index - 1] ?? '')) continue;
    const { end, attributes } = openingTag(code, match.index);
    const isRender = /\brender=\{\s*$/.test(code.slice(0, match.index));
    const holder = isRender && latest && match.index < latest.end ? latest.element : undefined;
    const host = holder ?? open[open.length - 1];
    // A host's children render inside the element its `render` prop supplies.
    const parent = isRender ? host : host?.rendered ?? host;
    const element: CodeElement = { tag, start: match.index, attributes, parent, children: [] };
    parent?.children.push(element);
    if (holder) holder.rendered = element;
    else latest = { element, end };
    elements.push(element);
    if (code[end - 1] !== '/') open.push(element);
  }
  return elements;
}

const tagWords = (tag: string) => tag.replace(/\./g, '').match(/[A-Z][a-z0-9]*/g)?.map((word) => word.toLowerCase()) ?? [];

/** The controls that render their own `aui-control-row` around their label. */
const CONTROL_ROW_TAGS = ['Checkbox', 'Radio', 'Switch'];

/** Whether a JSX tag is the component a class comes from: its trailing words are the class words (`Field.NumberFieldGroup` <- `aui-number-field-group`). */
function tagMatchesClass(tag: string, className: string) {
  if (className === 'control-row') return CONTROL_ROW_TAGS.includes(tag);
  const words = tagWords(tag);
  const classWords = className.split('-').filter(Boolean);
  return classWords.length > 0 && classWords.length <= words.length && classWords.every((word, index) => word === words[words.length - classWords.length + index]);
}

const classNamesOf = (selector: string) => [...selector.matchAll(/\[class~=["']aui-([^"']+)["']\]/g)].map(([, className]) => className);

const NEGATION = /:not\(((?:[^()]|\([^()]*\))*)\)/g;
const ATTRIBUTE = /\[(aria-label|role)(?:([*^$]?=)["']([^"']*)["']( i)?)?\]/g;

/** Whether the element writes the attribute test as a literal; `undefined` when the code does not spell the value out. */
function attributeTest(element: CodeElement, [, name, operator, value, insensitive]: RegExpMatchArray) {
  const written = new RegExp(`(?<![\\w-])${name}=(?:"([^"]*)"|'([^']*)'|\\{)`).exec(element.attributes);
  if (!operator) return written ? true : undefined;
  let actual = written?.[1] ?? written?.[2];
  if (actual === undefined) return undefined;
  if (insensitive) { actual = actual.toLowerCase(); value = value.toLowerCase(); }
  if (operator === '^=') return actual.startsWith(value);
  if (operator === '$=') return actual.endsWith(value);
  return operator === '*=' ? actual.includes(value) : actual === value;
}

/** Whether the element writes the compound's component: its class, its `data-ug-part` marker, or else its literal attributes. */
function writes(element: CodeElement, compound: string) {
  const plain = compound.replace(NEGATION, '');
  const classNames = classNamesOf(plain);
  const markers = [...plain.matchAll(/data-ug-part=["']([^"']+)["']/g)].map(([, marker]) => marker);
  if (classNames.length || markers.length) {
    return classNames.some((className) => tagMatchesClass(element.tag, className))
      || markers.some((marker) => element.attributes.includes(`data-ug-part="${marker}"`) || element.attributes.includes(`data-ug-part='${marker}'`));
  }
  const tests = [...plain.matchAll(ATTRIBUTE)].filter((test) => test[2]);
  return tests.length > 0 && tests.every((test) => attributeTest(element, test) === true);
}

/** Drops the candidates that break the compound's `:not(...)` guards, literal attributes or position among written siblings. */
function narrow(candidates: CodeElement[], compound: string) {
  const negations = [...compound.matchAll(NEGATION)].map(([, inner]) => inner);
  let kept = candidates.filter((element) => !negations.some((inner) =>
    classNamesOf(inner).some((className) => tagMatchesClass(element.tag, className))
    || [...inner.matchAll(ATTRIBUTE)].some((test) => attributeTest(element, test) === true)));
  const prefer = (test: (element: CodeElement) => boolean) => {
    const passing = kept.filter(test);
    if (passing.length) kept = passing;
  };
  const plain = compound.replace(NEGATION, '');
  for (const test of plain.matchAll(ATTRIBUTE)) {
    kept = kept.filter((element) => attributeTest(element, test) !== false);
    prefer((element) => attributeTest(element, test) === true);
  }
  for (const [, position, unit] of plain.matchAll(/:(first|last)-(child|of-type)/g)) {
    prefer((element) => {
      const siblings = element.parent?.children.filter((sibling) => unit === 'child' || sibling.tag === element.tag) ?? [element];
      return siblings[position === 'first' ? 0 : siblings.length - 1] === element;
    });
  }
  return kept;
}

const isWithin = (element: CodeElement, outer: Set<CodeElement>, direct: boolean): boolean => {
  for (let parent = element.parent; parent; parent = direct ? undefined : parent.parent) {
    if (outer.has(parent)) return true;
  }
  return false;
};

/** The elements that write the first compound, inside the enclosing compounds wherever the code writes those too. */
function matching(elements: CodeElement[], [own, ...enclosing]: Compound[]): CodeElement[] {
  const candidates = narrow(elements.filter((element) => writes(element, own.text)), own.text);
  if (!enclosing.length) return candidates;
  const outer = new Set(matching(elements, enclosing));
  if (!outer.size) return candidates;
  return candidates.filter((element) => isWithin(element, outer, own.direct));
}

/** The authored tags, kept to the enclosing element (itself or its content) wherever the code writes that component. */
function authoredMatches(elements: CodeElement[], [, ...enclosing]: Compound[], tags: string[]) {
  const candidates = elements.filter((element) => tags.includes(element.tag));
  if (!enclosing.length || !elements.some((element) => writes(element, enclosing[0].text))) return candidates;
  const outer = new Set(matching(elements, enclosing));
  return candidates.filter((element) => outer.has(element) || isWithin(element, outer, false));
}

const selectorList = (selector: string) => splitOutside(selector, /,/).filter((part) => part !== ',');

function resolve(code: string, step: LayerStep) {
  const elements = elementsOf(code);
  const selectors = selectorList(step.selector ?? `[data-ug-part="${step.id}"]`).map(compoundsOutward);
  const written = selectors.flatMap((compounds) => matching(elements, compounds));
  const authored = !written.length;
  const matches = authored ? selectors.flatMap((compounds) => authoredMatches(elements, compounds, step.code ?? [])) : written;
  return { elements, authored, matches };
}

/**
 * The 0-based lines of `code` that write the element a layer step reveals: whole opening tags, matched by the step's
 * selector (`data-ug-part` marker, class component, literal attributes, position and enclosing compounds). An element a
 * component renders itself has no tag of its own, so the step names the writing tags in `code`; otherwise nothing is highlighted.
 */
export function layerCodeLines(code: string, step: LayerStep | undefined) {
  const lines = new Set<number>();
  if (!step) return lines;
  for (const { start } of resolve(code, step).matches) {
    const { first, last } = openingTag(code, start);
    for (let line = first; line <= last; line += 1) lines.add(line);
  }
  return lines;
}

/** How many leading words of the step's classes the tag ends with (`Checkbox` owns one word of `aui-checkbox-indicator`). */
function ownedWords(tag: string, selector: string) {
  const words = tagWords(tag);
  return Math.max(0, ...classNamesOf(selector.replace(NEGATION, '')).map((className) => {
    const classWords = className.split('-');
    return classWords.reduce((owned, _, index) => words.join('-').endsWith(classWords.slice(0, index + 1).join('-')) ? index + 1 : owned, 0);
  }));
}

const descendants = (element: CodeElement): CodeElement[] => element.children.flatMap((child) => [child, ...descendants(child)]);

/** The authored `code` references of one step that name a tag no view writes, or highlight a wrapper around a more specific tag. */
export function layerCodeProblems(codes: string[], step: LayerStep) {
  if (!step.code) return [];
  const views = codes.map((code) => resolve(code, step));
  const problems = step.code
    .filter((tag) => !views.some(({ elements }) => elements.some((element) => element.tag === tag)))
    .map((tag) => `"${step.id}" names <${tag}>, which its code does not write`);
  for (const { authored, matches } of views) {
    if (!authored) continue;
    for (const match of matches) {
      const owned = ownedWords(match.tag, step.selector ?? '');
      const closer = descendants(match).find((element) => ownedWords(element.tag, step.selector ?? '') > owned);
      if (closer) problems.push(`"${step.id}" highlights the wrapper <${match.tag}> although <${closer.tag}> is written`);
    }
  }
  return [...new Set(problems)];
}

/** Rejects authored layer `code` references that are wrong for the code of the views showing the step. */
export async function assertLayerCode(usecases: Usecase[]) {
  const problems: string[] = [];
  for (const usecase of usecases) {
    const views = new Map<LayerStep, string[]>();
    for (const option of usecase.options) {
      const component = await option.loadExampleCode();
      const context = await option.loadCode();
      for (const step of option.componentLayers ?? usecase.layers) views.set(step, [...(views.get(step) ?? []), component]);
      for (const step of [...option.contextLayers, ...usecase.layers]) views.set(step, [...(views.get(step) ?? []), context]);
    }
    for (const [step, codes] of views) {
      for (const problem of layerCodeProblems(codes, step)) problems.push(`${usecase.id} ${problem}`);
    }
  }
  if (problems.length) throw new Error(`[usecase-gallery] layer code: ${problems.join('; ')}`);
}
