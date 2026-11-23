import { Suspense, useLayoutEffect, useRef, useState } from 'react';
import type { ComponentType } from 'react';
import { StageHostContext } from '../hooks/use-stage-host';

/** What a card's live render needs: the example of a use case. */
interface ThumbProps {
  Example: ComponentType;
}

/**
 * A live render of an example inside a card: the real component, inert so a click on the card navigates, and scaled
 * down to fit when it is larger than the frame (a dialog, a table). The stage stretches to the frame divided by the
 * scale, so an example that fills its container (a dialog) still fills the frame.
 */
export function Thumb({ Example }: ThumbProps) {
  const frame = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement | null>(null);
  const [host, setHost] = useState<HTMLElement | null>(null);
  const scale = useRef(1);
  const size = useRef({ width: 0, height: 0 });
  const [fit, setFit] = useState({ width: 0, height: 0, scale: 1 });

  useLayoutEffect(() => {
    const frameEl = frame.current;
    const stageEl = stage.current;
    if (!frameEl || !stageEl) return;
    // The content's extent is the farthest edge of any element in the stage: a dialog popup clips or centres inside its
    // viewport, so the stage's own scroll size would miss it. Rects are scaled by the current transform.
    const measure = () => {
      const { clientWidth: width, clientHeight: height } = frameEl;
      const origin = stageEl.getBoundingClientRect();
      const applied = scale.current;
      let right = 1;
      let bottom = 1;
      for (const element of stageEl.querySelectorAll('*')) {
        const rect = element.getBoundingClientRect();
        right = Math.max(right, (rect.right - origin.left) / applied);
        bottom = Math.max(bottom, (rect.bottom - origin.top) / applied);
      }
      // Floored: content sized in percent of the stage (a Card) grows with the stage, so an unbounded fit would shrink it to nothing.
      const next = Math.max(0.5, Math.min(1, width / right, height / bottom));
      if (Math.abs(next - applied) < 0.005 && width === size.current.width && height === size.current.height) return;
      scale.current = next;
      size.current = { width, height };
      setFit({ width, height, scale: next });
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(frameEl);
    resize.observe(stageEl);
    const mutate = new MutationObserver(measure);
    mutate.observe(stageEl, { childList: true, subtree: true });
    return () => {
      resize.disconnect();
      mutate.disconnect();
    };
  }, []);

  return (
    <div className="ug-thumb" ref={frame} aria-hidden="true" inert>
      <div
        className="ug-render__stage ug-thumb__stage"
        ref={(element) => {
          stage.current = element;
          setHost(element);
        }}
        style={{
          inlineSize: fit.width / fit.scale || undefined,
          blockSize: fit.height / fit.scale || undefined,
          transform: `translate(-50%, -50%) scale(${fit.scale})`,
        }}
      >
        <Suspense fallback={null}>
          {host && (
            <StageHostContext.Provider value={host}>
              <Example />
            </StageHostContext.Provider>
          )}
        </Suspense>
      </div>
    </div>
  );
}
