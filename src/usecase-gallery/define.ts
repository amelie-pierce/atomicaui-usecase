import type { AnatomyPart, ComponentMeta, LayerStep, UsecaseDoc } from './types';

const firstSentence = (text: string) => text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;

/** Development-only fallback. Authored lessons keep the order beside the use case. */
export const layersFromAnatomy = (parts: AnatomyPart[], prefix = ''): LayerStep[] => {
  return parts
    .filter((part) => !part.text)
    .map((part) => ({
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
export const defineUsecase = (doc: UsecaseDoc): UsecaseDoc => doc;

/** Type-checks a component's `<component>.meta.ts` default export. */
export const defineComponent = (meta: ComponentMeta): ComponentMeta => meta;
