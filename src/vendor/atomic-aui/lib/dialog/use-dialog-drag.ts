// modules/design/atomic-aui/src/lib/dialog/use-dialog-drag.ts
//
// Pointer-drag controller for a draggable Dialog.Popup. The drag is a pure pointer enhancement:
// it never changes the DOM order or tab stops, it composes on TOP of Base UI's viewport centering
// (the Popup is centered by `.aui-dialog-viewport`, not by a transform), and it writes only two
// CSS custom properties on the Popup — `--aui-dialog-drag-x` / `--aui-dialog-drag-y` — which the
// `.aui-dialog-popup` transform folds in ahead of the open/close animation transform. So drag and
// the entrance/exit motion share the SAME `transform` property without fighting: at rest the
// animation half is identity (`translateY(0) scale(1)`), leaving only the drag translate.
//
// Reset-on-reopen is automatic: Base UI unmounts the Popup on close (unless `keepMounted`), so a
// fresh mount starts at offset 0 with no inline vars. The offset is stored in a ref (no React state)
// so a live drag never re-renders — the listeners captured at pointerdown stay stable through the
// gesture.
//
// DOM globals note: the lib build tsconfig omits `lib: dom` (see `field/use-focus-origin.ts`), so
// this file talks to the DOM through minimal STRUCTURAL types + casts rather than `HTMLElement` /
// `window` globals.
import * as React from 'react';

export interface DialogDragController {
  /** Assign to the Popup DOM node (merged with the forwarded ref). */
  setPopupNode: (node: HTMLDivElement | null) => void;
  /** Attach to the drag-handle (Dialog.Title) `onPointerDown`. A no-op when dragging is disabled. */
  onHandlePointerDown: (event: React.PointerEvent<HTMLElement>) => void;
}

// Structural DOM shapes (the build tsconfig has no `lib: dom`).
type HandleNativeEvent = { pointerId: number; clientX: number; clientY: number };
type DragHandle = {
  setPointerCapture?(pointerId: number): void;
  hasPointerCapture?(pointerId: number): boolean;
  releasePointerCapture(pointerId: number): void;
  addEventListener(type: string, listener: (event: HandleNativeEvent) => void): void;
  removeEventListener(type: string, listener: (event: HandleNativeEvent) => void): void;
};
type DragNode = {
  style: { setProperty(name: string, value: string): void };
  getBoundingClientRect(): { left: number; top: number; width: number; height: number };
  setAttribute(name: string, value: string): void;
  removeAttribute(name: string): void;
};
type DragView = {
  innerWidth: number;
  innerHeight: number;
  addEventListener?(type: string, listener: () => void): void;
  removeEventListener?(type: string, listener: () => void): void;
};
type DragRect = { left: number; top: number; width: number; height: number };
type DragOffset = { x: number; y: number };
type DragBounds = { minX: number; maxX: number; minY: number; maxY: number };

// Interactive descendants inside the handle that must NOT initiate a drag (so the Close ×, footer
// actions, and form controls keep working when they live in the title row).
const NON_DRAG_SELECTOR =
  'button, a, input, select, textarea, [contenteditable="true"], [data-no-drag]';

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

// The travel range (in offset space) that keeps the Popup fully inside the viewport, given its
// CURRENT rect, the offset currently applied (to back out its offset-0 "home"), and the viewport.
// `min`/`max` guard the degenerate case where the Popup is larger than the viewport (the edges cross)
// so clamping still yields a sane range instead of pinning off-screen. PURE — shared by the drag
// gesture (bounds at pointerdown) and the window-resize re-clamp (clamp the persisted offset into the
// shrunken viewport, KEEPING the user's placement). Exported for unit tests.
export function computeDragBounds(
  rect: DragRect,
  offset: DragOffset,
  viewportWidth: number,
  viewportHeight: number,
): DragBounds {
  const homeLeft = rect.left - offset.x;
  const homeTop = rect.top - offset.y;
  const edgeX0 = -homeLeft;
  const edgeX1 = viewportWidth - rect.width - homeLeft;
  const edgeY0 = -homeTop;
  const edgeY1 = viewportHeight - rect.height - homeTop;
  return {
    minX: Math.min(edgeX0, edgeX1),
    maxX: Math.max(edgeX0, edgeX1),
    minY: Math.min(edgeY0, edgeY1),
    maxY: Math.max(edgeY0, edgeY1),
  };
}

// Re-clamp a persisted drag offset into a (possibly shrunken) viewport — KEEP the offset, only pull it
// back the minimum needed to stay on-screen. Returns the same object identity semantics via a plain
// object; callers compare against the old offset to decide whether to re-apply. PURE — unit-tested.
export function clampOffsetToViewport(
  rect: DragRect,
  offset: DragOffset,
  viewportWidth: number,
  viewportHeight: number,
): DragOffset {
  const bounds = computeDragBounds(rect, offset, viewportWidth, viewportHeight);
  return {
    x: clamp(offset.x, bounds.minX, bounds.maxX),
    y: clamp(offset.y, bounds.minY, bounds.maxY),
  };
}

function dragView(): DragView | undefined {
  return (globalThis as { window?: DragView }).window;
}

export function useDialogDrag(enabled: boolean): DialogDragController {
  const popupRef = React.useRef<DragNode | null>(null);
  const offsetRef = React.useRef({ x: 0, y: 0 });

  // Window-resize re-clamp: a dragged Popup's offset persists, so shrinking the window can strand the
  // card off-screen / far off-center. On resize, pull the persisted offset back the MINIMUM needed to
  // sit fully in the new viewport — KEEP the user's placement, never reset-to-center. A never-dragged
  // Popup (offset 0) needs nothing: the `.aui-dialog-viewport` grid re-centers it for free. Listener
  // lifecycle is tied to `enabled` (added/removed with the controller — no leak), mirroring the
  // focus-origin listener discipline.
  React.useEffect(() => {
    if (!enabled) return undefined;
    const view = dragView();
    if (!view?.addEventListener || !view.removeEventListener) return undefined;
    const onResize = () => {
      const node = popupRef.current;
      const base = offsetRef.current;
      if (!node || (base.x === 0 && base.y === 0)) return;
      const rect = node.getBoundingClientRect();
      const next = clampOffsetToViewport(rect, base, view.innerWidth, view.innerHeight);
      if (next.x !== base.x || next.y !== base.y) {
        offsetRef.current = next;
        node.style.setProperty('--aui-dialog-drag-x', `${next.x}px`);
        node.style.setProperty('--aui-dialog-drag-y', `${next.y}px`);
      }
    };
    view.addEventListener('resize', onResize);
    return () => view.removeEventListener?.('resize', onResize);
  }, [enabled]);

  return React.useMemo<DialogDragController>(() => {
    let drag:
      | {
          handle: DragHandle;
          pointerId: number;
          startX: number;
          startY: number;
          baseX: number;
          baseY: number;
          minX: number;
          maxX: number;
          minY: number;
          maxY: number;
        }
      | null = null;

    const apply = (x: number, y: number) => {
      const node = popupRef.current;
      if (!node) return;
      node.style.setProperty('--aui-dialog-drag-x', `${x}px`);
      node.style.setProperty('--aui-dialog-drag-y', `${y}px`);
    };

    const onMove = (event: HandleNativeEvent) => {
      if (!drag || event.pointerId !== drag.pointerId) return;
      const x = clamp(drag.baseX + (event.clientX - drag.startX), drag.minX, drag.maxX);
      const y = clamp(drag.baseY + (event.clientY - drag.startY), drag.minY, drag.maxY);
      offsetRef.current = { x, y };
      apply(x, y);
    };

    const onEnd = (event: HandleNativeEvent) => {
      if (!drag || event.pointerId !== drag.pointerId) return;
      const { handle, pointerId } = drag;
      handle.removeEventListener('pointermove', onMove);
      handle.removeEventListener('pointerup', onEnd);
      handle.removeEventListener('pointercancel', onEnd);
      if (handle.hasPointerCapture?.(pointerId)) {
        handle.releasePointerCapture(pointerId);
      }
      popupRef.current?.removeAttribute('data-aui-dragging');
      drag = null;
    };

    const onHandlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
      // Primary button / touch / pen only; never hijack a right-click or an interactive descendant.
      if (!enabled || event.button !== 0) return;
      const target = event.target as unknown as { closest(selector: string): unknown } | null;
      if (target?.closest(NON_DRAG_SELECTOR)) return;
      const node = popupRef.current;
      const view = dragView();
      if (!node || !view) return;

      const handle = event.currentTarget as unknown as DragHandle;
      const rect = node.getBoundingClientRect();
      const base = offsetRef.current;
      // Offsets that keep the Popup fully inside the viewport (shared pure math with the resize
      // re-clamp below).
      const bounds = computeDragBounds(rect, base, view.innerWidth, view.innerHeight);

      drag = {
        handle,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        baseX: base.x,
        baseY: base.y,
        minX: bounds.minX,
        maxX: bounds.maxX,
        minY: bounds.minY,
        maxY: bounds.maxY,
      };

      // `setPointerCapture` throws if the pointer is not capturable (e.g. jsdom, or a synthetic
      // pointer) — the drag still works via the handle listeners below, so swallow it.
      try {
        handle.setPointerCapture?.(event.pointerId);
      } catch {
        /* pointer capture is best-effort */
      }
      // Kill the transform transition for the duration of the drag so the Popup tracks the pointer
      // 1:1 instead of easing behind it (the `[data-aui-dragging]` selector sets `transition:none`).
      node.setAttribute('data-aui-dragging', '');
      handle.addEventListener('pointermove', onMove);
      handle.addEventListener('pointerup', onEnd);
      handle.addEventListener('pointercancel', onEnd);
    };

    const setPopupNode = (node: HTMLDivElement | null) => {
      popupRef.current = (node as unknown as DragNode) ?? null;
    };

    return { setPopupNode, onHandlePointerDown };
  }, [enabled]);
}
