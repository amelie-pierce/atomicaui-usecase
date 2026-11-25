import type { AnatomyPart, ComponentMeta, LayerStep, UsecaseDoc } from './types';

const firstSentence = (text: string) => text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;

const BUILD_RANKS: [RegExp, number][] = [
  [/overlay|backdrop|scrim|wrapper|trigger|\broot\b/i, 0],
  [/popup|container|card|panel|surface|shell|frame/i, 1],
  [/title|heading|header/i, 2],
  [/\bclose\b/i, 3],
  [/body|content|description|form/i, 4],
  [/footer|actions/i, 5],
];

/** Build order, outer to inner: wrapper/overlay, container, title, close, content, then footer actions. A part that names no role stays with the part before it, so children follow their ancestor. */
const buildRanks = (parts: AnatomyPart[]) => {
  let rank = 4;
  return parts.map((part) => {
    rank = BUILD_RANKS.find(([pattern]) => pattern.test(part.id))?.[1] ?? rank;
    return rank;
  });
};

/** Anatomy already names each rendered part, so it is the starting data for a step-by-step build. */
export const layersFromAnatomy = (parts: AnatomyPart[], prefix = ''): LayerStep[] => {
  const ranks = buildRanks(parts);
  return parts
    .map((part, order) => ({ part, order }))
    .sort((a, b) => ranks[a.order] - ranks[b.order] || a.order - b.order)
    .map(({ part }) => ({
      id: `${prefix}${part.id}`,
      partId: part.id,
      title: part.name,
      explanation: part.description,
      keyIdea: part.keyIdea ?? firstSentence(part.description),
      selector: part.selector ?? `[data-ug-part="${part.id}"]`,
      text: part.text,
      scope: prefix ? 'context' : 'component',
    }));
};

/** Type-checks a use case's `usecase.ts` default export. */
export const defineUsecase = (doc: UsecaseDoc): UsecaseDoc => ({ ...doc, layers: doc.layers ?? layersFromAnatomy(doc.anatomy) });

/** Type-checks a component's `<component>.meta.ts` default export. */
export const defineComponent = (meta: ComponentMeta): ComponentMeta => meta;
