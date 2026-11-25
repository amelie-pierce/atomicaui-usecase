import { useLayoutEffect, useState } from 'react';

/**
 * Shrinks the content of a stage when it is larger than the stage, so a wide or tall component fits without a scrollbar.
 * `fit` is the stage's content wrapper (`.ug-render__fit`). It is zoomed rather than transformed: a transform would make
 * the wrapper the containing block of fixed popups such as a drawer, which then lays out against the wrapper instead of
 * the stage. The zoom is written to the element before paint, so the content never shows at full size first.
 * Returns the applied scale, which the anatomy overlay follows.
 */
export function useStageFit(fit: HTMLElement | null) {
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const stage = fit?.parentElement;
    if (!fit || !stage) return;
    let applied = 1;
    const measure = () => {
      // A hidden stage has no size to fit into; it is measured again when it is shown.
      if (!fit.clientWidth || !stage.clientHeight) return;
      // Extents are relative to the wrapper's own box; dividing by the applied zoom reads them back in unzoomed units.
      const origin = fit.getBoundingClientRect();
      let left = 0;
      let right = fit.clientWidth;
      let bottom = 0;
      for (const element of fit.querySelectorAll('*')) {
        const rect = element.getBoundingClientRect();
        if (!rect.width && !rect.height) continue;
        left = Math.min(left, (rect.left - origin.left) / applied);
        right = Math.max(right, (rect.right - origin.left) / applied);
        bottom = Math.max(bottom, (rect.bottom - origin.top) / applied);
      }
      const style = getComputedStyle(stage);
      const available = stage.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
      // Horizontally the content is centred in the wrapper, so it fits when no edge is beyond half the wrapper; vertically it starts at the top.
      const half = fit.clientWidth / 2;
      const beyond = Math.max(half - left, right - half, 0);
      const next = Math.min(1, beyond ? half / beyond : 1, bottom > available ? available / bottom : 1);
      if (next === applied) return;
      applied = next;
      fit.style.zoom = next < 1 ? String(next) : '';
      setScale(next);
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(stage);
    resize.observe(fit);
    const mutation = new MutationObserver(measure);
    mutation.observe(fit, { childList: true, subtree: true, characterData: true });
    return () => {
      resize.disconnect();
      mutation.disconnect();
    };
  }, [fit]);
  return scale;
}
