// modules/design/atomic-aui/src/lib/dialog/use-dialog-resize.ts
//
// Pointer-resize controller for a resizable Dialog.Popup — window-style directional resizing from
// invisible edge/corner hit zones (NO visible grabber). Like `use-dialog-drag`, it is a pure pointer
// enhancement: it never changes DOM order or tab stops, composes on TOP of Base UI's viewport
// centering, and writes only inline size + two CSS custom properties on the Popup.
//
// THE ANCHOR MATH (why a resize needs a compensating translate).
// The Popup is CENTERED by the grid `.aui-dialog-viewport` (place-items:center), NOT by a
// `translate(-50%,-50%)`. So for a Popup of inline size `w`, its centered "home" left edge sits at
// `homeLeft(w) = vw/2 − w/2` (the viewport padding is symmetric, so the centering axis is vw/2). The
// Popup's ACTUAL left edge is `homeLeft(w) + tX`, where `tX` is the total translate the Popup carries
// (drag offset + resize offset, folded into the SAME `transform` in `_state-cascade.scss`).
//
// A width change ALONE (grid recenters) moves BOTH edges by ∓Δw/2 — so to keep the OPPOSITE edge
// visually anchored we compensate with a resize translate:
//   • drag the RIGHT edge (grow rightward, LEFT edge anchored):  d(left)=−Δw/2 + d(tX)=0 ⇒ tX += Δw/2
//   • drag the LEFT edge  (grow leftward,  RIGHT edge anchored):  right = vw/2 + w/2 + tX ⇒ tX −= Δw/2
// Vertically the same with height and tY (bottom→top anchored ⇒ tY += Δh/2; top→bottom ⇒ tY −= Δh/2).
// Per handle this collapses to `resizeOffset ± appliedDelta/2` with the sign = the handle's edge sign
// (see HANDLE_DIRS). It is INDEPENDENT of the drag offset (dragX is constant across a resize gesture),
// so drag + resize compose cleanly through separate `--aui-dialog-drag-*` / `--aui-dialog-resize-*`
// vars. We clamp the applied width/height in JS to the SAME min/max the CSS enforces (read from
// computed style at gesture start) so the compensation never disagrees with a CSS clamp at the bound.
//
// Reset-on-reopen is automatic: Base UI remounts the Popup on open, so a fresh mount starts at size
// intrinsic / offset 0 with no inline vars. The offset is stored in a ref (no React state) so a live
// resize never re-renders.
//
// DOM globals note: the lib build tsconfig omits `lib: dom` (see `field/use-focus-origin.ts` and the
// sibling `use-dialog-drag.ts`), so this talks to the DOM through minimal STRUCTURAL types + casts.
import * as React from 'react';
import { clampOffsetToViewport } from './use-dialog-drag';

/** The eight edge/corner hit zones. */
export type DialogResizeDir = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

// Edge signs per handle. `sx`: +1 = right edge (pointer +dx grows width, LEFT edge anchored), −1 = left
// edge (−dx grows, RIGHT anchored), 0 = no horizontal resize. `sy`: +1 = bottom edge (+dy grows height,
// TOP anchored), −1 = top edge (−dy grows, BOTTOM anchored), 0 = none. The compensation sign IS the
// edge sign (grow right ⇒ tX += Δ/2; grow left ⇒ tX −= Δ/2), which falls out of the anchor math above.
export const HANDLE_DIRS: Record<DialogResizeDir, { sx: -1 | 0 | 1; sy: -1 | 0 | 1 }> = {
  n: { sx: 0, sy: -1 },
  s: { sx: 0, sy: 1 },
  e: { sx: 1, sy: 0 },
  w: { sx: -1, sy: 0 },
  ne: { sx: 1, sy: -1 },
  nw: { sx: -1, sy: -1 },
  se: { sx: 1, sy: 1 },
  sw: { sx: -1, sy: 1 },
};

/** Ordered list for rendering (edges first, corners last so corner z-stack wins overlaps). */
export const DIALOG_RESIZE_DIRS: readonly DialogResizeDir[] = [
  'n',
  's',
  'e',
  'w',
  'ne',
  'nw',
  'se',
  'sw',
];

export interface DialogResizeController {
  /** Assign to the Popup DOM node (merged with the forwarded ref + the drag controller). */
  setPopupNode: (node: HTMLDivElement | null) => void;
  /** Attach to each hit-zone `onPointerDown`, passing the zone's direction. No-op when disabled. */
  onHandlePointerDown: (dir: DialogResizeDir, event: React.PointerEvent<HTMLElement>) => void;
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
type ComputedShape = { getPropertyValue(name: string): string };
type ResizeNode = {
  style: { setProperty(name: string, value: string): void };
  getBoundingClientRect(): {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  setAttribute(name: string, value: string): void;
  removeAttribute(name: string): void;
};
type ResizeView = {
  innerWidth: number;
  innerHeight: number;
  getComputedStyle(node: unknown): ComputedShape;
  addEventListener?(type: string, listener: () => void): void;
  removeEventListener?(type: string, listener: () => void): void;
};

// The hard resize floor, mirrored from `--aui-dialog-resize-min` (var(--p-px-192)) so a browser that
// cannot resolve the computed `min-inline-size` (e.g. jsdom) still floors at the same 192px.
const RESIZE_FLOOR = 192;

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function resizeView(): ResizeView | undefined {
  return (globalThis as { window?: ResizeView }).window;
}

// Parse a computed px length; NaN when the browser gives a non-px keyword (jsdom returns '' / 'auto').
function parsePx(value: string): number {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : Number.NaN;
}

function orElse(value: number, fallback: number): number {
  return Number.isNaN(value) ? fallback : value;
}

export function useDialogResize(enabled: boolean): DialogResizeController {
  const popupRef = React.useRef<ResizeNode | null>(null);
  // The resize CONTRIBUTION to the Popup translate, accumulated across resize gestures within one
  // mount (drag keeps its own offset ref). Reset on remount (reopen).
  const offsetRef = React.useRef({ x: 0, y: 0 });

  // Window-resize re-clamp: the rendered width/height is capped to the viewport by the CSS
  // `max-inline/block-size` (which re-resolve live), but the resize COMPENSATION offset was computed
  // for the pre-shrink size, so it can strand the (now-recentered) card off-screen. Pull the offset
  // back the minimum needed to sit fully in the new viewport — same pure clamp + KEEP-placement policy
  // as the drag controller (they share `clampOffsetToViewport`; each independently ensures ITS offset
  // never strands the card, using the live rect that already reflects the other's offset). Listener
  // lifecycle tied to `enabled` (no leak).
  React.useEffect(() => {
    if (!enabled) return undefined;
    const view = resizeView();
    if (!view?.addEventListener || !view.removeEventListener) return undefined;
    const onResize = () => {
      const node = popupRef.current;
      const base = offsetRef.current;
      if (!node || (base.x === 0 && base.y === 0)) return;
      const rect = node.getBoundingClientRect();
      const next = clampOffsetToViewport(rect, base, view.innerWidth, view.innerHeight);
      if (next.x !== base.x || next.y !== base.y) {
        offsetRef.current = next;
        node.style.setProperty('--aui-dialog-resize-x', `${next.x}px`);
        node.style.setProperty('--aui-dialog-resize-y', `${next.y}px`);
      }
    };
    view.addEventListener('resize', onResize);
    return () => view.removeEventListener?.('resize', onResize);
  }, [enabled]);

  return React.useMemo<DialogResizeController>(() => {
    let resize:
      | {
          handle: ResizeHandle;
          pointerId: number;
          startX: number;
          startY: number;
          startW: number;
          startH: number;
          baseX: number;
          baseY: number;
          sx: -1 | 0 | 1;
          sy: -1 | 0 | 1;
          minW: number;
          maxW: number;
          minH: number;
          maxH: number;
        }
      | null = null;

    const onMove = (event: HandleNativeEvent) => {
      if (!resize || event.pointerId !== resize.pointerId) return;
      const node = popupRef.current;
      if (!node) return;
      let x = resize.baseX;
      let y = resize.baseY;
      if (resize.sx !== 0) {
        const w = clamp(resize.startW + resize.sx * (event.clientX - resize.startX), resize.minW, resize.maxW);
        node.style.setProperty('width', `${w}px`);
        // The compensation sign IS the edge sign: grow-right (sx=+1) shifts the card right by half the
        // applied delta to hold the LEFT edge; grow-left (sx=−1) shifts left to hold the RIGHT edge.
        x = resize.baseX + (resize.sx * (w - resize.startW)) / 2;
      }
      if (resize.sy !== 0) {
        const h = clamp(resize.startH + resize.sy * (event.clientY - resize.startY), resize.minH, resize.maxH);
        node.style.setProperty('height', `${h}px`);
        y = resize.baseY + (resize.sy * (h - resize.startH)) / 2;
      }
      offsetRef.current = { x, y };
      node.style.setProperty('--aui-dialog-resize-x', `${x}px`);
      node.style.setProperty('--aui-dialog-resize-y', `${y}px`);
    };

    const onEnd = (event: HandleNativeEvent) => {
      if (!resize || event.pointerId !== resize.pointerId) return;
      const { handle, pointerId } = resize;
      handle.removeEventListener('pointermove', onMove);
      handle.removeEventListener('pointerup', onEnd);
      handle.removeEventListener('pointercancel', onEnd);
      if (handle.hasPointerCapture?.(pointerId)) {
        handle.releasePointerCapture(pointerId);
      }
      popupRef.current?.removeAttribute('data-aui-resizing');
      resize = null;
    };

    const onHandlePointerDown = (dir: DialogResizeDir, event: React.PointerEvent<HTMLElement>) => {
      // Primary button / touch / pen only; never hijack a right-click.
      if (!enabled || event.button !== 0) return;
      const node = popupRef.current;
      const view = resizeView();
      if (!node || !view) return;

      const handle = event.currentTarget as unknown as ResizeHandle;
      const rect = node.getBoundingClientRect();
      const { sx, sy } = HANDLE_DIRS[dir];
      // Read the min/max the CSS `[data-aui-resizable]` rule enforces (it already folds in the
      // `--aui-dialog-resize-min` floor AND any `aui.sx.min/maxWidth/Height`). Clamping the applied
      // size to these in JS keeps the compensation translate in lockstep with the used size at a bound.
      const cs = view.getComputedStyle(node);
      const minW = Math.max(RESIZE_FLOOR, orElse(parsePx(cs.getPropertyValue('min-inline-size')), RESIZE_FLOOR));
      const maxW = orElse(parsePx(cs.getPropertyValue('max-inline-size')), view.innerWidth);
      const minH = Math.max(RESIZE_FLOOR, orElse(parsePx(cs.getPropertyValue('min-block-size')), RESIZE_FLOOR));
      const maxH = orElse(parsePx(cs.getPropertyValue('max-block-size')), view.innerHeight);

      resize = {
        handle,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startW: rect.width,
        startH: rect.height,
        baseX: offsetRef.current.x,
        baseY: offsetRef.current.y,
        sx,
        sy,
        minW,
        maxW: Math.max(minW, maxW),
        minH,
        maxH: Math.max(minH, maxH),
      };

      // `setPointerCapture` throws for a non-capturable pointer (jsdom / synthetic) — the gesture still
      // works via the handle listeners below, so swallow it (mirrors the drag controller).
      try {
        handle.setPointerCapture?.(event.pointerId);
      } catch {
        /* pointer capture is best-effort */
      }
      // Kill the eased transform transition for the gesture so tracking is 1:1 (the `[data-aui-resizing]`
      // selector sets `transition:none`, shared with the drag `[data-aui-dragging]` rule).
      node.setAttribute('data-aui-resizing', '');
      handle.addEventListener('pointermove', onMove);
      handle.addEventListener('pointerup', onEnd);
      handle.addEventListener('pointercancel', onEnd);
    };

    const setPopupNode = (node: HTMLDivElement | null) => {
      popupRef.current = (node as unknown as ResizeNode) ?? null;
    };

    return { setPopupNode, onHandlePointerDown };
  }, [enabled]);
}
