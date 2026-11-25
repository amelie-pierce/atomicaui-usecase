import type { AnatomyPart, ComponentMeta, LayerStep, UsecaseDoc } from './types';

const keyIdeaFor = (name: string) => {
  const rules: [RegExp, string][] = [
    [/overlay|backdrop|scrim/i, 'Separate the task surface from the surrounding page while keeping the context visible.'],
    [/popup|container|card|panel|surface/i, 'Give related content one bounded, easy-to-scan surface.'],
    [/title|heading|header/i, 'Orient users before they scan details or choose an action.'],
    [/close|dismiss/i, 'Keep a clear, accessible way to leave this surface.'],
    [/body|content|detail|notes/i, 'Use the main region for the information that supports the task.'],
    [/footer|action|button|submit|cancel/i, 'Make the available choice clear and easy to reach.'],
    [/search|filter/i, 'Help users narrow the set without losing their place.'],
    [/list|option|item|row/i, 'Present each choice as a distinct, understandable unit.'],
    [/tab/i, 'Keep related views together and make the active section clear.'],
    [/toggle|switch|checkbox|radio/i, 'Make the current state and available choice easy to recognize.'],
    [/badge|chip|status/i, 'Communicate status briefly without competing with the main content.'],
    [/icon|glyph/i, 'Use the symbol to reinforce the control’s purpose.'],
  ];
  return rules.find(([pattern]) => pattern.test(name))?.[1] ?? `Keep ${name.toLowerCase()} focused on its role in the complete interface.`;
};

/** Anatomy already names each rendered part, so it is the starting data for a step-by-step build. */
export const layersFromAnatomy = (parts: AnatomyPart[], prefix = ''): LayerStep[] => parts.map((part) => ({
  id: `${prefix}${part.id}`,
  partId: part.id,
  title: part.name,
  explanation: part.description,
  keyIdea: part.keyIdea ?? keyIdeaFor(part.name),
  selector: part.selector ?? `[data-ug-part="${part.id}"]`,
  text: part.text,
  scope: prefix ? 'context' : 'component',
}));

/** Type-checks a use case's `usecase.ts` default export. */
export const defineUsecase = (doc: UsecaseDoc): UsecaseDoc => ({ ...doc, layers: doc.layers ?? layersFromAnatomy(doc.anatomy) });

/** Type-checks a component's `<component>.meta.ts` default export. */
export const defineComponent = (meta: ComponentMeta): ComponentMeta => meta;
