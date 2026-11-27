import type { LayerStep } from '../types';

export const footprintAttribute = 'data-ug-footprint';
const fitScope = '.ug-render__fit[data-ug-layer-mode="true"]';

export const layerSelector = (layer: LayerStep) => layer.selector ?? `[data-ug-part="${layer.id}"]`;

/** Selector of the elements a layer reveals, relative to the preview's fit element. */
export const layerTarget = (layer: LayerStep) => {
  const selector = layerSelector(layer);
  return layer.scope === 'context' ? `:is(${selector})` : `[data-ug-component-root] :is(${selector})`;
};

/** Build the hidden-layer rules as React-rendered CSS; preview nodes stay under React ownership. Only elements marked as empty footprints get a visible box. */
export function layerVisibilityCss(layers: LayerStep[], activeIndex: number) {
  const hidden = layers
    .map((layer, index) => index > activeIndex ? `${fitScope} ${layerTarget(layer)} { display: none !important; }` : '')
    .filter(Boolean);
  hidden.push(`${fitScope} [${footprintAttribute}] { box-sizing: border-box; min-inline-size: min(80vw, var(--p-px-320)); min-block-size: var(--p-px-160); padding: var(--p-px-16); border: var(--p-px-1) dashed var(--theme-primary); background: var(--theme-surface-alt) !important; }`);
  return hidden.join('\n');
}
