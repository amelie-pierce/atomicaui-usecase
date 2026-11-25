import { useLayoutEffect } from 'react';
import type { LayerStep } from '../types';

/** Hide layers after the selected step in the mounted preview without changing scene data. */
export function useLayerVisibility(root: HTMLElement | null, layers: LayerStep[], activeIndex: number, enabled: boolean) {
  useLayoutEffect(() => {
    if (!root || !enabled || !Array.isArray(layers)) return;
    const apply = () => {
      const assigned = new Map<Element, number>();
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
            // Wrap direct text nodes so a button label or dialog title can reveal separately from its shell.
            for (const node of [...element.childNodes]) {
              if (node.nodeType !== Node.TEXT_NODE || !node.textContent?.trim()) continue;
              const wrapper = document.createElement('span');
              wrapper.setAttribute('data-ug-layer-text', '');
              node.replaceWith(wrapper);
              wrapper.append(node);
              assign(wrapper, index);
            }
            element.querySelectorAll('[data-ug-layer-text]').forEach((wrapper) => assign(wrapper, index));
          });
        } catch {
          // A malformed authored selector should not break the preview.
        }
      });
      root.querySelectorAll('[data-ug-layer-hidden]').forEach((element) => element.removeAttribute('data-ug-layer-hidden'));
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
      root.querySelectorAll('[data-ug-layer-text]').forEach((wrapper) => wrapper.replaceWith(...wrapper.childNodes));
      root.querySelectorAll('[data-ug-layer-index], [data-ug-layer-hidden]').forEach((element) => {
        element.removeAttribute('data-ug-layer-index');
        element.removeAttribute('data-ug-layer-hidden');
      });
    };
  }, [root, layers, activeIndex, enabled]);
}
