// modules/design/atomic-aui/src/lib/field/use-focus-origin.ts
//
// LOCAL focus-origin detection for Field.Control — a self-contained replica of the mechanism in
// lib/input/input.tsx, BUT bound to the CONTROL FRAME element (not the inner input) so the tab-only
// outline works for ANY rendered control (the default Input AND a consumer `render={<Custom/>}`).
//
// WHY a local copy (not an import): input.tsx's module-level window listeners + state are private to
// that module, and the brief forbids modifying/importing them. We replicate the same small logic —
// a captured Tab marks the NEXT focus as `keyboard`, any pointer interaction marks it `pointer`, and
// the focus handler stamps the resolved origin on the Control frame element (cleared on blur).
import * as React from 'react';

type FocusOriginHost = {
  getAttribute(name: string): string | null;
  removeAttribute(name: string): void;
  setAttribute(name: string, value: string): void;
};
type FocusOriginEvent = { key?: unknown };
type FocusOriginWindow = {
  addEventListener(type: string, listener: (event: unknown) => void, options?: boolean): void;
  removeEventListener(type: string, listener: (event: unknown) => void, options?: boolean): void;
};
type FocusOrigin = 'keyboard' | 'pointer';

let lastFieldFocusOrigin: FocusOrigin = 'pointer';
let fieldFocusOriginListenerCount = 0;

function markKeyboardFocusOrigin(event: unknown): void {
  if ((event as FocusOriginEvent).key === 'Tab') {
    lastFieldFocusOrigin = 'keyboard';
  }
}

function markPointerFocusOrigin(): void {
  lastFieldFocusOrigin = 'pointer';
}

function focusOriginWindow(): FocusOriginWindow | undefined {
  return (globalThis as { window?: FocusOriginWindow }).window;
}

function installFieldFocusOriginListeners(): (() => void) | undefined {
  const win = focusOriginWindow();
  if (!win) return undefined;

  if (fieldFocusOriginListenerCount === 0) {
    win.addEventListener('keydown', markKeyboardFocusOrigin, true);
    win.addEventListener('pointerdown', markPointerFocusOrigin, true);
    win.addEventListener('mousedown', markPointerFocusOrigin, true);
    win.addEventListener('touchstart', markPointerFocusOrigin, true);
  }
  fieldFocusOriginListenerCount += 1;

  return () => {
    fieldFocusOriginListenerCount -= 1;
    if (fieldFocusOriginListenerCount === 0) {
      win.removeEventListener('keydown', markKeyboardFocusOrigin, true);
      win.removeEventListener('pointerdown', markPointerFocusOrigin, true);
      win.removeEventListener('mousedown', markPointerFocusOrigin, true);
      win.removeEventListener('touchstart', markPointerFocusOrigin, true);
    }
  };
}

function focusOriginHost(currentTarget: unknown): FocusOriginHost {
  return currentTarget as FocusOriginHost;
}

/**
 * Capture-phase handlers for the Control FRAME element. Stamp `data-aui-focus-origin` on the frame
 * itself: a captured Tab → `keyboard`; any pointer/programmatic focus → `pointer` (the same opt-in
 * policy as lib/input/input.tsx). field.scss gates the `:focus-within` outline on this attr, so the
 * Control's frame ring shows on keyboard focus and is suppressed on pointer click — for the default
 * Input AND a consumer custom control alike. Composes any consumer-supplied handlers.
 */
export interface FieldFocusOriginHandlers {
  onFocusCapture: React.FocusEventHandler<HTMLElement>;
  onBlurCapture: React.FocusEventHandler<HTMLElement>;
  onPointerDownCapture: React.PointerEventHandler<HTMLElement>;
  onMouseDownCapture: React.MouseEventHandler<HTMLElement>;
  onTouchStart: React.TouchEventHandler<HTMLElement>;
}

export function useFieldFocusOrigin(consumer?: {
  onFocusCapture?: React.FocusEventHandler<HTMLElement>;
  onBlurCapture?: React.FocusEventHandler<HTMLElement>;
  onPointerDownCapture?: React.PointerEventHandler<HTMLElement>;
  onMouseDownCapture?: React.MouseEventHandler<HTMLElement>;
  onTouchStart?: React.TouchEventHandler<HTMLElement>;
}): FieldFocusOriginHandlers {
  React.useEffect(() => installFieldFocusOriginListeners(), []);

  const onPointerDownCapture = React.useCallback<React.PointerEventHandler<HTMLElement>>(
    (event) => {
      lastFieldFocusOrigin = 'pointer';
      focusOriginHost(event.currentTarget).setAttribute('data-aui-focus-origin', 'pointer');
      consumer?.onPointerDownCapture?.(event);
    },
    [consumer],
  );

  const onMouseDownCapture = React.useCallback<React.MouseEventHandler<HTMLElement>>(
    (event) => {
      lastFieldFocusOrigin = 'pointer';
      focusOriginHost(event.currentTarget).setAttribute('data-aui-focus-origin', 'pointer');
      consumer?.onMouseDownCapture?.(event);
    },
    [consumer],
  );

  const onTouchStart = React.useCallback<React.TouchEventHandler<HTMLElement>>(
    (event) => {
      lastFieldFocusOrigin = 'pointer';
      focusOriginHost(event.currentTarget).setAttribute('data-aui-focus-origin', 'pointer');
      consumer?.onTouchStart?.(event);
    },
    [consumer],
  );

  const onFocusCapture = React.useCallback<React.FocusEventHandler<HTMLElement>>(
    (event) => {
      // Only a captured Tab navigation may opt into the visible frame ring; pointer/programmatic
      // focus is marked `pointer` and field.scss suppresses the outline.
      focusOriginHost(event.currentTarget).setAttribute('data-aui-focus-origin', lastFieldFocusOrigin);
      lastFieldFocusOrigin = 'pointer';
      consumer?.onFocusCapture?.(event);
    },
    [consumer],
  );

  const onBlurCapture = React.useCallback<React.FocusEventHandler<HTMLElement>>(
    (event) => {
      // Clear only when focus leaves the Control frame entirely (not when moving between the inner
      // control and an adornment Button within the same frame). Structural type avoids the DOM lib
      // dependency (this lib's tsconfig has no DOM globals — matching the aliases above).
      const frame = event.currentTarget as unknown as {
        contains(node: unknown): boolean;
      };
      const next = event.relatedTarget as unknown;
      if (!next || !frame.contains(next)) {
        focusOriginHost(event.currentTarget).removeAttribute('data-aui-focus-origin');
      }
      consumer?.onBlurCapture?.(event);
    },
    [consumer],
  );

  return {
    onFocusCapture,
    onBlurCapture,
    onPointerDownCapture,
    onMouseDownCapture,
    onTouchStart,
  };
}
