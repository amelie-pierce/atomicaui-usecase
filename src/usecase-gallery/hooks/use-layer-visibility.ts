import { useLayoutEffect } from 'react';
import type { LayerStep } from '../types';

/** Hide layers after the selected step in the mounted preview without changing scene data. */
export function useLayerVisibility(root: HTMLElement | null, layers: LayerStep[], activeIndex: number, enabled: boolean) {
  useLayoutEffect(() => {
    if (!root || !enabled || !Array.isArray(layers)) return;
    const apply = () => {
      const assigned = new Map<Element, number>();
      const textAssigned = new Map<Element, number>();
      const assignText = (element: Element, index: number) => textAssigned.set(element, Math.min(index, textAssigned.get(element) ?? index));
      const assign = (element: Element, index: number) => assigned.set(element, Math.min(index, assigned.get(element) ?? index));
      layers.forEach((layer, index) => {
        try {
          const componentRoot = layer.scope === 'context' ? null : root.querySelector('[data-ug-component-root]');
          const selector = layer.selector ?? `[data-ug-part="${layer.id}"]`;
          let elements = [...(componentRoot ?? root).querySelectorAll(selector)];
          // Dialog, Popover and Tooltip examples portal out of their component wrapper into the stage host.
          if (!elements.length && componentRoot) elements = [...root.querySelectorAll(selector)];
          elements.forEach((element) => {
            if (!layer.text) {
              assign(element, index);
              return;
            }
            assignText(element, index);
          });
        } catch {
          // A malformed authored selector should not break the preview.
        }
      });
      // An ancestor appears no later than its earliest descendant, so a completed step never shows nothing.
      [...assigned].forEach(([element, index]) => {
        for (let ancestor = element.parentElement; ancestor && ancestor !== root; ancestor = ancestor.parentElement) {
          if ((assigned.get(ancestor) ?? -1) > index) assigned.set(ancestor, index);
        }
      });
      root.querySelectorAll('[data-ug-layer-hidden], [data-ug-layer-text-hidden]').forEach((element) => {
        element.removeAttribute('data-ug-layer-hidden');
        element.removeAttribute('data-ug-layer-text-hidden');
      });
      textAssigned.forEach((index, element) => element.toggleAttribute('data-ug-layer-text-hidden', index > activeIndex));
      assigned.forEach((index, element) => {
        element.setAttribute('data-ug-layer-index', String(index));
        if (index > activeIndex) element.setAttribute('data-ug-layer-hidden', '');
        else element.removeAttribute('data-ug-layer-hidden');
      });
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(root, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      root.querySelectorAll('[data-ug-layer-index], [data-ug-layer-hidden], [data-ug-layer-text-hidden]').forEach((element) => {
        element.removeAttribute('data-ug-layer-index');
        element.removeAttribute('data-ug-layer-hidden');
        element.removeAttribute('data-ug-layer-text-hidden');
      });
    };
  }, [root, layers, activeIndex, enabled]);
}
