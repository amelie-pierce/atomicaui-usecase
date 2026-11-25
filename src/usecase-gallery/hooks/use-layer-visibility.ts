import type { LayerStep } from '../types';

const fitScope = '.ug-render__fit[data-ug-layer-mode="true"]';

/** Build the hidden-layer rules as React-rendered CSS; preview nodes stay under React ownership. */
export function layerVisibilityCss(layers: LayerStep[], activeIndex: number) {
  return layers
    .map((layer, index) => {
      if (index <= activeIndex) return '';
      const selector = layer.selector ?? `[data-ug-part="${layer.id}"]`;
      const target = layer.scope === 'context'
        ? `${fitScope} :is(${selector})`
        : `${fitScope} [data-ug-component-root] :is(${selector})`;
      return `${target} { display: none !important; }`;
    })
    .filter(Boolean)
    .join('\n');
}
