import * as React from 'react';
import { Input as BaseInput } from '@base-ui/react/input';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { useStateLayer } from '../../core/state/use-state-layer';
import { useInputRecipe } from './use-recipe';
import type { InputAui } from './use-recipe';

type BaseInputProps = React.ComponentPropsWithoutRef<typeof BaseInput>;
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
type InputFocusOrigin = 'keyboard' | 'pointer';

let lastInputFocusOrigin: InputFocusOrigin = 'pointer';
let focusOriginListenerCount = 0;

function markKeyboardFocusOrigin(event: unknown): void {
  if ((event as FocusOriginEvent).key === 'Tab') {
    lastInputFocusOrigin = 'keyboard';
  }
}

function markPointerFocusOrigin(): void {
  lastInputFocusOrigin = 'pointer';
}

function focusOriginWindow(): FocusOriginWindow | undefined {
  return (globalThis as { window?: FocusOriginWindow }).window;
}

function installFocusOriginListeners(): (() => void) | undefined {
  const win = focusOriginWindow();
  if (!win) return undefined;

  if (focusOriginListenerCount === 0) {
    win.addEventListener('keydown', markKeyboardFocusOrigin, true);
    win.addEventListener('pointerdown', markPointerFocusOrigin, true);
    win.addEventListener('mousedown', markPointerFocusOrigin, true);
    win.addEventListener('touchstart', markPointerFocusOrigin, true);
  }
  focusOriginListenerCount += 1;

  return () => {
    focusOriginListenerCount -= 1;
    if (focusOriginListenerCount === 0) {
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

export interface InputProps
  extends Omit<BaseInputProps, 'color' | 'children' | 'render'> {
  aui?: InputAui;
  children?: never;
  color?: never;
  render?: never;
}

const _Input = createAtomicComponent(BaseInput, {
  extensions: [useStateLayer, useInputRecipe],
});

const InputRoot = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    aui,
    children,
    color,
    render,
    onBlurCapture,
    onFocusCapture,
    onMouseDownCapture,
    onPointerDownCapture,
    ...rest
  },
  ref,
) {
  void children;
  void color;
  void render;

  React.useEffect(() => installFocusOriginListeners(), []);

  const handlePointerDownCapture = React.useCallback<NonNullable<InputProps['onPointerDownCapture']>>(
    (event) => {
      lastInputFocusOrigin = 'pointer';
      focusOriginHost(event.currentTarget).setAttribute('data-aui-focus-origin', 'pointer');
      onPointerDownCapture?.(event);
    },
    [onPointerDownCapture],
  );

  const handleMouseDownCapture = React.useCallback<NonNullable<InputProps['onMouseDownCapture']>>(
    (event) => {
      lastInputFocusOrigin = 'pointer';
      focusOriginHost(event.currentTarget).setAttribute('data-aui-focus-origin', 'pointer');
      onMouseDownCapture?.(event);
    },
    [onMouseDownCapture],
  );

  const handleFocusCapture = React.useCallback<NonNullable<InputProps['onFocusCapture']>>(
    (event) => {
      // Chromium treats text inputs as :focus-visible after pointer/programmatic
      // focus, so only a captured Tab navigation may opt into the visible ring.
      const target = focusOriginHost(event.currentTarget);
      target.setAttribute('data-aui-focus-origin', lastInputFocusOrigin);
      lastInputFocusOrigin = 'pointer';
      onFocusCapture?.(event);
    },
    [onFocusCapture],
  );

  const handleBlurCapture = React.useCallback<NonNullable<InputProps['onBlurCapture']>>(
    (event) => {
      focusOriginHost(event.currentTarget).removeAttribute('data-aui-focus-origin');
      onBlurCapture?.(event);
    },
    [onBlurCapture],
  );

  return React.createElement(_Input as React.ElementType, {
    ref,
    ...rest,
    aui,
    onBlurCapture: handleBlurCapture,
    onFocusCapture: handleFocusCapture,
    onMouseDownCapture: handleMouseDownCapture,
    onPointerDownCapture: handlePointerDownCapture,
  });
});
InputRoot.displayName = 'Input';

export const Input = InputRoot as React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>
>;
export default Input;
