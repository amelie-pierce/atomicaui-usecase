import type { LayerStep } from '../types';

const fitScope = '.ug-render__fit[data-ug-layer-mode="true"]';

/** Build the hidden-layer rules as React-rendered CSS; preview nodes stay under React ownership. */
export function layerVisibilityCss(layers: LayerStep[], activeIndex: number) {
  const active = layers[activeIndex];
  const targetFor = (layer: LayerStep) => {
    const selector = layer.selector ?? `[data-ug-part="${layer.id}"]`;
    return layer.scope === 'context'
      ? `${fitScope} :is(${selector})`
      : `${fitScope} [data-ug-component-root] :is(${selector})`;
  };
  const hidden = layers
    .map((layer, index) => {
      if (index <= activeIndex) return '';
      const target = targetFor(layer);
      return `${target} { display: none !important; }`;
    })
    .filter(Boolean)
    .join('\n');
  if (!active || !/\b(container|wrapper|popup|dialog|panel|body|viewport|pane|frame|region|group|list|row|layout|section|card)\b/i.test(active.title)) return hidden;
  const footprint = `${targetFor(active)} { box-sizing: border-box; min-inline-size: min(100%, var(--p-px-160)); min-block-size: var(--p-px-96); padding: var(--p-px-16); border: var(--p-px-1) dashed var(--theme-primary); background: var(--theme-surface-alt) !important; }`;
  return [hidden, footprint].filter(Boolean).join('\n');
}
