import type { AnatomyPart, ComponentMeta, LayerStep, UsecaseDoc } from './types';

const firstSentence = (text: string) => text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;

/** Build order, outer to inner: wrapper/overlay, container, title, close, content, then footer actions. */
const buildRank = (part: AnatomyPart) => {
  const key = `${part.id} ${part.name}`;
  if (/overlay|backdrop|scrim|wrapper|\broot\b/i.test(key)) return 0;
  if (/popup|container|card|panel|surface|shell|frame/i.test(key)) return 1;
  if (/title|heading|header/i.test(key)) return 2;
  if (/close|dismiss/i.test(key)) return 3;
  if (/footer|actions/i.test(key)) return 5;
  return 4;
};

/** Anatomy already names each rendered part, so it is the starting data for a step-by-step build. */
export const layersFromAnatomy = (parts: AnatomyPart[], prefix = ''): LayerStep[] => parts
  .map((part, order) => ({ part, order }))
  .sort((a, b) => buildRank(a.part) - buildRank(b.part) || a.order - b.order)
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

/** Type-checks a use case's `usecase.ts` default export. */
export const defineUsecase = (doc: UsecaseDoc): UsecaseDoc => ({ ...doc, layers: doc.layers ?? layersFromAnatomy(doc.anatomy) });

/** Type-checks a component's `<component>.meta.ts` default export. */
export const defineComponent = (meta: ComponentMeta): ComponentMeta => meta;
