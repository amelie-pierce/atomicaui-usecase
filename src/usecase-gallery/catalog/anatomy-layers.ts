import type { AnatomyPart, LayerStep } from '../types';

/** Derive the Layer lesson directly from the currently ordered Anatomy entries. */
export function anatomyLayers(parts: AnatomyPart[] = [], scope: 'component' | 'context' = 'component'): LayerStep[] {
  return parts.map((part) => ({
    id: scope === 'context' ? `context-${part.id}` : part.id,
    partId: part.id,
    title: part.lesson?.title ?? part.name,
    explanation: part.lesson?.explanation ?? part.description,
    selector: part.lesson?.selector ?? part.selector ?? `[data-ug-part="${part.id}"]`,
    code: part.lesson?.code,
    text: part.lesson?.text ?? part.text,
    scope: part.lesson?.scope ?? (part.scope === 'scene' ? 'component' : part.scope ?? scope),
  }));
}
