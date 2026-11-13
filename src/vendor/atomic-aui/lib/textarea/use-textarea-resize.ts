// modules/design/atomic-aui/src/lib/textarea/use-textarea-resize.ts
//
// Pointer-resize controller for a resizable Textarea — window-style directional resizing from invisible
// edge/corner hit zones (NO visible grabber) on the wrapping View.ScrollArea Root (`.aui-textarea-scroll`).
// It is a pure pointer enhancement: never changes DOM order or tab stops, composes on TOP of the DS scroll
// wrapper, and writes only inline `width` / `height` (px) on the Root node.
//
// COPIED-not-imported from `lib/dialog/use-dialog-resize.ts` — a `lib → lib` import is forbidden, and the
// copy-not-import precedent is textarea.tsx's focus-origin block copied from input.tsx (textarea.tsx:21-24).
// Differences from the Dialog version (which resizes a viewport-CENTERED Popup):
//   • The Textarea wrapper sits in NORMAL FLOW, so there is NO centering-compensation translate — no
//     `--aui-*-resize-x/y` math, no offset ref. The drag just writes inline `width`/`height` on the Root.
//   • Only three hit zones — `e` (right edge), `s` (bottom edge), `se` (corner) — never the top/left/`n`/`w`.
//   • A VERTICAL drag (`s`/`se`) RELEASES the wrapper's inline viewport bound via `onReleaseVerticalBound`
//     so the Root's inline height owns the box thereafter (the viewport fills the Root); the Root's current
//     height is pinned at gesture start so releasing the bound never collapses the box.
// Pointer-capture + JS clamp + `data-aui-resizing` (kills transitions) + primary-button-only all carry over.
//
// DOM globals note: the lib build tsconfig omits `lib: dom` (see `field/use-focus-origin.ts` and the
// sibling `use-dialog-resize.ts`), so this talks to the DOM through minimal STRUCTURAL types + casts.
import * as React from 'react';

/** The resize axis a consumer requests via `Textarea.resizable`. */
export type TextareaResizeAxis = 'none' | 'horizontal' | 'vertical' | 'both';

/** The three edge/corner hit zones a resizable Textarea renders (never `n`/`w` — the box grows down/right). */
export type TextareaResizeDir = 'e' | 's' | 'se';

// Edge signs per handle. `sx`: 1 = right edge (pointer +dx grows width), 0 = no horizontal resize. `sy`:
// 1 = bottom edge (+dy grows height), 0 = none. No negative edges — the wrapper is anchored top-left in flow.
export const HANDLE_DIRS: Record<TextareaResizeDir, { sx: 0 | 1; sy: 0 | 1 }> = {
  e: { sx: 1, sy: 0 },
  s: { sx: 0, sy: 1 },
  se: { sx: 1, sy: 1 },
};

// Axis → the ordered handle list to render. `horizontal` → `e` only; `vertical` → `s` only; `both` → all
// three (edges first, the corner last so its z-stack wins the overlap). `none` renders nothing.
export const RESIZE_HANDLES_BY_AXIS: Record<Exclude<TextareaResizeAxis, 'none'>, readonly TextareaResizeDir[]> = {
  horizontal: ['e'],
  vertical: ['s'],
  both: ['e', 's', 'se'],
};

// The hard resize floors (JS), mirroring the dialog's `RESIZE_FLOOR` approach so a browser that cannot
// resolve a computed `min-*` (e.g. jsdom) still floors identically: 96px wide (var(--p-px-96)), 64px tall.
export const TEXTAREA_RESIZE_MIN_WIDTH = 96;
export const TEXTAREA_RESIZE_MIN_HEIGHT = 64;

export interface TextareaResizeController {
  /** Assign to the wrapping View.ScrollArea Root DOM node so the controller can read/measure + resize it. */
  setRootNode: (node: HTMLElement | null) => void;
  /** Attach to each hit-zone `onPointerDown`, passing the zone's direction. No-op when disabled. */
  onHandlePointerDown: (dir: TextareaResizeDir, event: React.PointerEvent<HTMLElement>) => void;
}

// Structural DOM shapes (the build tsconfig has no `lib: dom`).
type HandleNativeEvent = { pointerId: number; clientX: number; clientY: number };
type ResizeHandle = {
  setPointerCapture?(pointerId: number): void;
  hasPointerCapture?(pointerId: number): boolean;
  releasePointerCapture(pointerId: number): void;
  addEventListener(type: string, listener: (event: HandleNativeEvent) => void): void;
  removeEventListener(type: string, listener: (event: HandleNativeEvent) => void): void;
};
type Rect = { width: number; height: number };
// A scroll-area viewport we nudge to re-measure after a resize (see `collectScrollViewports`).
type ScrollTarget = { dispatchEvent(event: unknown): boolean };
type WindowLike = { Event: new (type: string) => unknown };
// The minimal element shape the controller walks: box metrics + a DOM-tree walk + a scroll-event dispatch.
type ElementLike = {
  className: unknown;
  parentElement: ElementLike | null;
  getBoundingClientRect(): Rect;
  querySelectorAll(selector: string): ArrayLike<ScrollTarget>;
  ownerDocument: { defaultView: WindowLike | null } | null;
  dispatchEvent(event: unknown): boolean;
};
type ResizeNode = ElementLike & {
  style: { setProperty(name: string, value: string): void };
  setAttribute(name: string, value: string): void;
  removeAttribute(name: string): void;
};
type ResizeView = { innerWidth: number };

const SCROLL_VIEWPORT_CLASS = 'aui-view-scroll-area-viewport';

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function resizeView(): ResizeView | undefined {
  return (globalThis as { window?: ResizeView }).window;
}

// The scroll-area viewports whose thumb must re-measure after this wrapper's box changes: the wrapper's
// OWN View.ScrollArea viewport (a descendant) PLUS every ANCESTOR viewport (e.g. a Dialog.Body scroll
// area). Collected once at gesture start (the DOM identities are stable across a drag).
//
// WHY: Base UI's `ScrollAreaViewport` recomputes its thumb from a `ResizeObserver` that observes the
// viewport's OWN box (and `onScroll`) — NOT its content. Growing this wrapper's height grows an ancestor
// viewport's `scrollHeight` but not the ancestor viewport's box, so its RO never fires and the thumb goes
// stale until some scroll happens. Our own viewport is `height:100%` so its box DOES resize (its RO fires),
// but ancestors need a nudge. (Verified on ADC ProjectInformation 2026-07-08: post-resize the Dialog.Body
// thumb stayed at the pre-resize size until a scroll event.)
function collectScrollViewports(node: ElementLike): ScrollTarget[] {
  const targets: ScrollTarget[] = [];
  const own = node.querySelectorAll(`.${SCROLL_VIEWPORT_CLASS}`);
  for (let i = 0; i < own.length; i += 1) targets.push(own[i]);
  let ancestor = node.parentElement;
  while (ancestor) {
    if (typeof ancestor.className === 'string' && ancestor.className.split(' ').includes(SCROLL_VIEWPORT_CLASS)) {
      targets.push(ancestor as unknown as ScrollTarget);
    }
    ancestor = ancestor.parentElement;
  }
  return targets;
}

// Nudge each collected viewport to re-measure via Base UI's supported `onScroll` → `computeThumbPosition`
// path (a synthetic `scroll` event; `programmaticScrollRef` stays true, so no spurious user-scroll callback).
// Best-effort — a viewport without an Event ctor (jsdom edge) is skipped silently.
function nudgeScrollViewports(node: ResizeNode, targets: readonly ScrollTarget[]): void {
  const win = node.ownerDocument?.defaultView;
  if (!win || targets.length === 0) return;
  for (const target of targets) {
    try {
      target.dispatchEvent(new win.Event('scroll'));
    } catch {
      /* dispatch is best-effort */
    }
  }
}

// A positive finite dimension, or the fallback when the browser gives 0 / non-finite (jsdom has no layout,
// so `getBoundingClientRect()` returns zeros — fall back so the clamp never pins the box to 0).
function positiveOr(value: number, fallback: number): number {
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export function useTextareaResize(
  enabled: boolean,
  onReleaseVerticalBound: () => void,
): TextareaResizeController {
  const rootRef = React.useRef<ResizeNode | null>(null);
  // Keep the release callback in a ref so the memoized handlers always call the latest without widening
  // the `useMemo` deps (mirrors keeping the controller stable across renders like the dialog version).
  const releaseRef = React.useRef(onReleaseVerticalBound);
  releaseRef.current = onReleaseVerticalBound;

  return React.useMemo<TextareaResizeController>(() => {
    let resize:
      | {
          handle: ResizeHandle;
          pointerId: number;
          startX: number;
          startY: number;
          startW: number;
          startH: number;
          sx: 0 | 1;
          sy: 0 | 1;
          minW: number;
          maxW: number;
          minH: number;
          maxH: number;
          scrollTargets: readonly ScrollTarget[];
        }
      | null = null;

    const onMove = (event: HandleNativeEvent) => {
      if (!resize || event.pointerId !== resize.pointerId) return;
      const node = rootRef.current;
      if (!node) return;
      if (resize.sx !== 0) {
        const w = clamp(resize.startW + (event.clientX - resize.startX), resize.minW, resize.maxW);
        node.style.setProperty('width', `${w}px`);
      }
      if (resize.sy !== 0) {
        const h = clamp(resize.startH + (event.clientY - resize.startY), resize.minH, resize.maxH);
        node.style.setProperty('height', `${h}px`);
      }
      // Keep the enclosing scroll-area thumb/track live as the box grows (Base UI only re-measures the
      // ancestor viewport on scroll, not on child growth — see collectScrollViewports).
      nudgeScrollViewports(node, resize.scrollTargets);
    };

    const onEnd = (event: HandleNativeEvent) => {
      if (!resize || event.pointerId !== resize.pointerId) return;
      const { handle, pointerId, scrollTargets } = resize;
      handle.removeEventListener('pointermove', onMove);
      handle.removeEventListener('pointerup', onEnd);
      handle.removeEventListener('pointercancel', onEnd);
      if (handle.hasPointerCapture?.(pointerId)) {
        handle.releasePointerCapture(pointerId);
      }
      const node = rootRef.current;
      node?.removeAttribute('data-aui-resizing');
      // Final settle: ensure the ancestor scroll geometry matches the committed size.
      if (node) nudgeScrollViewports(node, scrollTargets);
      resize = null;
    };

    const onHandlePointerDown = (dir: TextareaResizeDir, event: React.PointerEvent<HTMLElement>) => {
      // Primary button / touch / pen only; never hijack a right-click.
      if (!enabled || event.button !== 0) return;
      const node = rootRef.current;
      const view = resizeView();
      if (!node || !view) return;

      const handle = event.currentTarget as unknown as ResizeHandle;
      const rect = node.getBoundingClientRect();
      const { sx, sy } = HANDLE_DIRS[dir];
      // Growth ceilings: width caps at the Root's PARENT content width (a wider drag would break the
      // surrounding layout); height is uncapped. jsdom returns a 0-width rect, so fall back to the viewport
      // width and, ultimately, no cap.
      const parentW = positiveOr(node.parentElement?.getBoundingClientRect().width ?? 0, view.innerWidth);
      const minW = TEXTAREA_RESIZE_MIN_WIDTH;
      const minH = TEXTAREA_RESIZE_MIN_HEIGHT;
      const startW = positiveOr(rect.width, minW);
      const startH = positiveOr(rect.height, minH);

      resize = {
        handle,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startW,
        startH,
        sx,
        sy,
        minW,
        maxW: Math.max(minW, parentW),
        minH,
        maxH: Number.POSITIVE_INFINITY,
        // The own + ancestor scroll-area viewports to keep in sync as the box grows (identities are stable
        // across the gesture, so collect once).
        scrollTargets: collectScrollViewports(node),
      };

      // A vertical drag releases the wrapper's inline viewport bound so the Root's inline height owns the
      // box. Pin the Root at its CURRENT height first so releasing the bound never collapses it (the moves
      // below then adjust that height).
      if (sy !== 0) {
        node.style.setProperty('height', `${startH}px`);
        releaseRef.current();
      }

      // `setPointerCapture` throws for a non-capturable pointer (jsdom / synthetic) — the gesture still
      // works via the handle listeners below, so swallow it (mirrors the drag/dialog controllers).
      try {
        handle.setPointerCapture?.(event.pointerId);
      } catch {
        /* pointer capture is best-effort */
      }
      // Kill any eased transition for the gesture so tracking is 1:1 (the `[data-aui-resizing]` selector
      // sets `transition:none`, shared with the dialog resize/drag rules).
      node.setAttribute('data-aui-resizing', '');
      handle.addEventListener('pointermove', onMove);
      handle.addEventListener('pointerup', onEnd);
      handle.addEventListener('pointercancel', onEnd);
    };

    const setRootNode = (node: HTMLElement | null) => {
      rootRef.current = (node as unknown as ResizeNode) ?? null;
    };

    return { setRootNode, onHandlePointerDown };
  }, [enabled]);
}
