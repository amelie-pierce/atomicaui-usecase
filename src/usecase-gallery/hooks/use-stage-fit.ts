import { useLayoutEffect, useState } from 'react';

/**
 * Shrinks the content of a stage when it is larger than the stage, so a wide or tall component fits without a scrollbar.
 * `fit` is the stage's content wrapper (`.ug-render__fit`). It is zoomed rather than transformed: a transform would make
 * the wrapper the containing block of fixed popups such as a drawer, which then lays out against the wrapper instead of
 * the stage. The content is measured at its natural size and the zoom is written before paint, so the content never shows
 * at full size first and the scale never depends on the previous scale.
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
      // The content is always measured at its natural size. Measured while zoomed, a wrapping or percent-sized component
      // reflows into the larger zoomed box, reads as fitting, is unzoomed, overflows again and so flips between the two.
      // Nothing paints between this reset and the zoom written below, so the reset is never seen.
      fit.style.zoom = '';
      const origin = fit.getBoundingClientRect();
      let left = 0;
      let right = fit.clientWidth;
      let bottom = 0;
      for (const element of fit.querySelectorAll('*')) {
        // A fixed element (a dialog's backdrop and viewport) frames the stage rather than being content, so it is not part
        // of the size to fit; the popup inside it still is. Counting it made every dialog scene shrink to its padding box.
        if (getComputedStyle(element).position === 'fixed') continue;
        const rect = element.getBoundingClientRect();
        if (!rect.width && !rect.height) continue;
        left = Math.min(left, rect.left - origin.left);
        right = Math.max(right, rect.right - origin.left);
        bottom = Math.max(bottom, rect.bottom - origin.top);
      }
      const style = getComputedStyle(stage);
      const available = stage.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
      // Horizontally the content is centred in the wrapper, so it fits when no edge is beyond half the wrapper; vertically it starts at the top.
      const half = fit.clientWidth / 2;
      const beyond = Math.max(half - left, right - half, 0);
      const raw = Math.min(1, beyond ? half / beyond : 1, bottom > available ? available / bottom : 1);
      // A scale this close to 1 is no scale at all.
      const next = raw > 0.995 ? 1 : raw;
      fit.style.zoom = next < 1 ? String(next) : '';
      if (next === applied) return;
      applied = next;
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
