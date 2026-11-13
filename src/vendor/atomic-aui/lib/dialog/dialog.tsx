// modules/design/atomic-aui/src/lib/dialog/dialog.tsx
//
// Dialog is the general modal/dialog wrapper around Base UI Dialog. Base UI owns focus trapping,
// role/ARIA wiring, portal mechanics, Escape dismissal, outside dismissal, and modal mode;
// AtomicAUI owns appearance through per-part `aui` recipes and marker CSS.
import * as React from 'react';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { createAtomicPart, findPartChild } from '../../core/factory/create-atomic-part';
import { prependMarkerClassName } from '../../core/recipe/prepend-marker-class-name';
import { Button, type ButtonAui, type ButtonProps } from '../button';
import { IconButton, type IconButtonAui } from '../icon-button';
import {
  ScrollArea as ViewScrollArea,
  ScrollAreaViewport as ViewScrollAreaViewport,
  ScrollAreaScrollbar as ViewScrollAreaScrollbar,
} from '../view';
import type { ScrollAreaThumbColor } from '../view';
import {
  ContainedIcon,
  type ContainedIconProps,
  type IconFamily,
  type IconLayer,
  type IconWeight,
} from '../icon';
import { identityToDataAttrs, useAuiIdentity } from '../identity';
import {
  buildDialogFramePartClasses,
  useDialogPopupRecipe,
  DIALOG_POPUP_VOCAB,
} from './use-recipe';
import { useDialogDrag } from './use-dialog-drag';
import {
  useDialogResize,
  DIALOG_RESIZE_DIRS,
  type DialogResizeController,
  type DialogResizeDir,
} from './use-dialog-resize';
import type {
  DialogActionsAui,
  DialogBodyAui,
  DialogDescriptionAui,
  DialogPopupAui,
  DialogProfile,
  DialogScale,
  DialogShape,
  DialogTitleAui,
} from './use-recipe';

import type {
  DialogCloseProps as BaseDialogCloseProps,
  DialogDescriptionProps as BaseDialogDescriptionProps,
  DialogRootProps as BaseDialogRootProps,
  DialogTitleProps as BaseDialogTitleProps,
  DialogTriggerProps as BaseDialogTriggerProps,
} from '@base-ui/react/dialog';

// Dialog.Root props = Base UI's Root props PLUS the DS-friendly `clickOutsideToClose` boolean.
// `clickOutsideToClose` is the readable inverse of Base UI's `disablePointerDismissal`: it maps to
// `disablePointerDismissal: !clickOutsideToClose`. When unset, the raw `disablePointerDismissal`
// (still accepted for Base-UI parity) — or Base UI's default (outside press DOES close) — applies, so
// existing behavior is preserved. `clickOutsideToClose` wins over `disablePointerDismissal` when both
// are set.
export interface DialogRootProps<Payload = unknown> extends BaseDialogRootProps<Payload> {
  /**
   * Whether a click outside the Popup (on the Backdrop / viewport scrim) closes the dialog.
   * Maps to Base UI's `disablePointerDismissal` (inverted). Default `true` — Base UI's default, where
   * an outside press closes with reason `outside-press`. Set `false` to require an explicit Close or
   * footer action (e.g. when the dialog holds unsaved work).
   */
  clickOutsideToClose?: boolean;
}

export const DialogHandle = DialogPrimitive.Handle;
export const createDialogHandle = DialogPrimitive.createHandle;
export type DialogHandle<Payload> =
  ReturnType<typeof DialogPrimitive.createHandle<Payload>>;

export type {
  DialogPopupAui,
  DialogTitleAui,
  DialogDescriptionAui,
  DialogBodyAui,
  DialogActionsAui,
  DialogColor,
  DialogPaint,
  DialogProfile,
  DialogScale,
  DialogShape,
} from './use-recipe';

const DEFAULT_POPUP_SCALE: DialogScale = 'sm';
const DEFAULT_POPUP_SHAPE: DialogShape = 'soft';
const DEFAULT_POPUP_PROFILE: DialogProfile = 'default';

interface DialogPopupAppearanceContextValue {
  scale: DialogScale;
  shape: DialogShape;
  profile: DialogProfile;
}

const DialogPopupAppearanceContext =
  React.createContext<DialogPopupAppearanceContextValue>({
    scale: DEFAULT_POPUP_SCALE,
    shape: DEFAULT_POPUP_SHAPE,
    profile: DEFAULT_POPUP_PROFILE,
  });

// Popup → Title channel for the `draggable` enhancement. The Popup owns the drag controller (it holds
// the moved node + the transform vars); the Title is the drag HANDLE (a title-bar drag is the modal
// convention), so it reads this context and wires the handle pointerdown. Default `draggable:false`
// means a non-draggable Dialog (and every Title outside a draggable Popup) is inert — no handle wiring,
// no cursor affordance, byte-identical to before.
interface DialogInteractionContextValue {
  draggable: boolean;
  onHandlePointerDown: (event: React.PointerEvent<HTMLElement>) => void;
}

const noopPointerDown = (): void => undefined;

const DialogInteractionContext =
  React.createContext<DialogInteractionContextValue>({
    draggable: false,
    onHandlePointerDown: noopPointerDown,
  });

// Dialog.Root - generic Base UI behavior shell.
// Base UI renders no root DOM here; it owns dialog role selection, modal mode,
// focus trapping/return, Escape dismissal, pointer dismissal, handles, and payload.
function DialogRoot<Payload>({
  clickOutsideToClose,
  disablePointerDismissal,
  ...props
}: DialogRootProps<Payload>): React.JSX.Element {
  // `clickOutsideToClose` is the DS-facing inverse of Base UI's `disablePointerDismissal`. When the
  // friendly prop is set it WINS; otherwise the raw prop (or Base UI's default) is forwarded untouched.
  const resolvedDisablePointerDismissal =
    clickOutsideToClose === undefined ? disablePointerDismissal : !clickOutsideToClose;
  return React.createElement(DialogPrimitive.Root, {
    ...props,
    disablePointerDismissal: resolvedDisablePointerDismissal,
  } as object);
}
DialogRoot.displayName = 'Dialog';

// Dialog.Trigger - real Button composed through Base UI render.
// Base UI clones the render element and merges trigger behavior onto it, so this stays a
// shipped AtomicAUI Button instead of a dialog-local button recipe.
export interface DialogTriggerProps<Payload = unknown>
  extends Omit<
    BaseDialogTriggerProps<Payload>,
    'color' | 'render'
  > {
  aui?: ButtonAui;
}

interface DialogTriggerComponent {
  <Payload = unknown>(
    props: DialogTriggerProps<Payload> & React.RefAttributes<HTMLButtonElement>
  ): React.JSX.Element;
  displayName?: string;
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  function DialogTrigger({ aui, className, children, type, ...rest }, ref) {
    const triggerAui: ButtonAui = {
      color: 'surface-alt',
      paint: 'solid',
      scale: 'sm',
      shape: 'soft',
      ...aui,
    };
    const buttonClassName = 'aui-dialog-trigger';

    return (
      <DialogPrimitive.Trigger
        ref={ref}
        type={type ?? 'button'}
        {...rest}
        className={className}
        // After the rest spread so a runtime `render` in rest cannot replace the composed Button
        // even if a caller bypasses the public Omit type.
        render={<Button aui={triggerAui} className={buttonClassName} />}
      >
        {children}
      </DialogPrimitive.Trigger>
    );
  },
) as DialogTriggerComponent;
DialogTrigger.displayName = 'Dialog.Trigger';

// Dialog.Portal - structural passthrough.
// The portal host may move the subtree to body and Base UI may add its own internal modal
// backdrop; the AtomicAUI paint hosts below still re-stamp identity themselves.
const DialogPortal = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof DialogPrimitive.Portal>
>(function DialogPortal(props, ref) {
  return React.createElement(DialogPrimitive.Portal as React.ElementType, { ref, ...props });
});
DialogPortal.displayName = 'Dialog.Portal';
export type DialogPortalProps = React.ComponentProps<typeof DialogPortal>;

// Dialog.Backdrop - themed scrim marker plus portal identity re-stamp.
// Marker-only: no `aui`, no `.aui-frame`, and no state layer. It paints from theme overlay rails
// only after the body-portaled node has matching `data-aui-*` identity attrs.
export type DialogBackdropProps =
  React.ComponentProps<typeof DialogPrimitive.Backdrop>;
const DialogBackdrop = React.forwardRef<HTMLDivElement, DialogBackdropProps>(
  function DialogBackdrop({ className, ...rest }, ref) {
    const identity = useAuiIdentity();
    const dataAttrs = identityToDataAttrs(identity);
    return React.createElement(DialogPrimitive.Backdrop as React.ElementType, {
      ref,
      ...rest,
      // Ambient identity wins over raw attrs in `rest`, keeping the portal paint in lockstep with
      // the provider context that supplied the theme.
      ...dataAttrs,
      className: prependMarkerClassName('aui-dialog-backdrop', className),
    });
  },
);
DialogBackdrop.displayName = 'Dialog.Backdrop';

// Dialog.Viewport - marker-only centering and scroll host.
// Base UI has no dialog Positioner here; this part is structural CSS only, not a recipe-bearing
// paint surface.
export type DialogViewportProps =
  React.ComponentProps<typeof DialogPrimitive.Viewport>;
const DialogViewport = createAtomicPart<DialogViewportProps>(
  DialogPrimitive.Viewport as React.ElementType,
  'aui-dialog-viewport',
);
DialogViewport.displayName = 'Dialog.Viewport';

// Dialog.Popup - recipe-bearing passive surface plus portal identity re-stamp.
// Popup is the modal card, so it uses the main factory and only the popup recipe. It intentionally
// omits `useStateLayer`; controls inside the dialog own hover, press, focus, and disabled states.
const _DialogPopup = createAtomicComponent(DialogPrimitive.Popup, {
  extensions: [useDialogPopupRecipe],
});

export interface DialogPopupProps
  extends Omit<React.ComponentProps<typeof DialogPrimitive.Popup>, 'color'> {
  aui?: DialogPopupAui;
  /**
   * Whether the Popup can be dragged around the viewport by its title bar (`Dialog.Title` is the drag
   * handle). Pointer-only enhancement — no keyboard drag, no tab-stop change; interactive descendants
   * (the Close ×, footer actions, form controls in the title row) are never hijacked. The Popup is
   * constrained to stay fully in the viewport and the position RESETS on reopen (the Popup remounts).
   * Composes with `resizable`. Default `false`.
   */
  draggable?: boolean;
  /**
   * Whether the Popup can be resized window-style by dragging any EDGE or CORNER. Hovering an edge/
   * corner shows the matching resize cursor (no visible grabber); dragging an edge resizes along that
   * axis with the OPPOSITE edge anchored (a corner resizes both axes, opposite corner anchored) — the
   * grid-centering is compensated by a translate so the anchored edge stays put. Growth is bounded by
   * the viewport (and any `aui.sx.maxWidth`/`maxHeight`); shrink is bounded by a floor (`max(192px,
   * aui.sx.minWidth/minHeight)`). The Popup scrolls its content when shrunk below it. Pointer-only
   * enhancement — the invisible hit zones are `aria-hidden`, take no tab stop, and never intercept
   * content interaction beyond their edge strip. Size RESETS on reopen (the Popup remounts). Composes
   * with `draggable`. Default `false`.
   */
  resizable?: boolean;
}

// The eight window-style resize hit zones for a resizable Popup. Each is an invisible, `aria-hidden`,
// pointer-only strip (edges) or square (corners) absolutely positioned inside the Popup edge; the
// cursor + geometry are ALL in `_state-cascade.scss` on the `[data-aui-resize-handle]` marker (SCSS-
// cascade-first — no inline style). Divs take no tab stop; `onPointerDown` starts the directional
// resize (which reads the zone's direction to pick the resize axis + the anchored edge).
function DialogResizeHandles({ resize }: { resize: DialogResizeController }): React.JSX.Element {
  return (
    <>
      {DIALOG_RESIZE_DIRS.map((dir: DialogResizeDir) => (
        <div
          key={dir}
          data-aui-resize-handle={dir}
          aria-hidden="true"
          onPointerDown={(event) => resize.onHandlePointerDown(dir, event)}
        />
      ))}
    </>
  );
}

const DialogPopup = React.forwardRef<HTMLDivElement, DialogPopupProps>(
  function DialogPopup({ aui, children, draggable = false, resizable = false, ...rest }, ref) {
    const identity = useAuiIdentity();
    const dataAttrs = identityToDataAttrs(identity);
    // Captures Popup geometry for nested Close buttons. Frame-like content sections also inherit
    // the Popup's CSS rails unless they explicitly stamp their own scale/shape.
    const inheritedAppearance = React.useMemo<DialogPopupAppearanceContextValue>(
      () => ({
        scale: aui?.scale ?? DEFAULT_POPUP_SCALE,
        shape: aui?.shape ?? DEFAULT_POPUP_SHAPE,
        profile: aui?.profile ?? DEFAULT_POPUP_PROFILE,
      }),
      [aui?.scale, aui?.shape, aui?.profile],
    );

    const drag = useDialogDrag(draggable);
    const resize = useDialogResize(resizable);
    // Merge BOTH controllers' node capture with the forwarded ref so a consumer `ref` still reaches the
    // Popup div AND each controller can read/measure it (drag rides transform, resize rides inline
    // size + a compensating translate — orthogonal, so they share the node without fighting).
    const setPopupRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        drag.setPopupNode(node);
        resize.setPopupNode(node);
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [drag, resize, ref],
    );
    const interaction = React.useMemo<DialogInteractionContextValue>(
      () => ({ draggable, onHandlePointerDown: drag.onHandlePointerDown }),
      [draggable, drag],
    );

    return React.createElement(_DialogPopup as React.ElementType, {
      ref: setPopupRef,
      ...rest,
      aui,
      // Same authoritative portal re-stamp as Backdrop: consumer data attrs cannot desync the
      // portaled paint surface from the ambient identity context.
      ...dataAttrs,
      // `data-aui-resizable` arms the CSS resize affordance (the min/max/overflow rules); the actual
      // resizing is driven by the hit-zone handles below, not native CSS `resize`. `draggable` is NOT
      // forwarded to the DOM (the native HTML `draggable` attr would arm the browser's own drag-and-drop)
      // — it drives only the interaction context above.
      ...(resizable ? { 'data-aui-resizable': '' } : {}),
    }, (
      <DialogInteractionContext.Provider value={interaction}>
        <DialogPopupAppearanceContext.Provider value={inheritedAppearance}>
          {children}
        </DialogPopupAppearanceContext.Provider>
      </DialogInteractionContext.Provider>
    ),
      // Window-style resize hit zones: eight invisible edge/corner strips absolutely positioned inside
      // the Popup edges. Rendered AFTER the content (as later Popup children) so they z-stack above it,
      // but they are pointer-only (`aria-hidden`, no tab stop) and only cover their own edge strip, so
      // content interaction elsewhere is untouched. Absent entirely when not resizable.
      resizable ? <DialogResizeHandles key="aui-resize-handles" resize={resize} /> : null,
    );
  },
);
DialogPopup.displayName = 'Dialog.Popup';

// Dialog.Title - Base UI label part plus frame-like section band.
// Base UI writes `titleElementId` for Popup `aria-labelledby`; AtomicAUI adds the visual section.
// It defaults to a `surface-alt` band without stamping default scale/shape.
export interface DialogTitleProps
  extends Omit<
    BaseDialogTitleProps,
    'color'
  > {
  aui?: DialogTitleAui;
}

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  function DialogTitle({ aui, className, onPointerDown, ...rest }, ref) {
    const inheritedAppearance = React.useContext(DialogPopupAppearanceContext);
    const interaction = React.useContext(DialogInteractionContext);
    // When the Popup is draggable the Title is the drag handle: mark it (`data-aui-drag-handle` drives
    // the `cursor: move` + `touch-action: none` affordance in CSS) and start the drag on pointerdown,
    // AFTER any consumer `onPointerDown`. Otherwise the Title is unchanged.
    const handlePointerDown = interaction.draggable
      ? (event: Parameters<NonNullable<typeof onPointerDown>>[0]) => {
          onPointerDown?.(event);
          interaction.onHandlePointerDown(event);
        }
      : onPointerDown;
    return React.createElement(DialogPrimitive.Title as React.ElementType, {
      ref,
      ...rest,
      onPointerDown: handlePointerDown,
      ...(interaction.draggable ? { 'data-aui-drag-handle': '' } : {}),
      className: buildDialogFramePartClasses({
        marker: 'aui-dialog-title',
        aui,
        className,
        defaultColor: 'surface-alt',
        defaultPaint: 'solid',
        inheritedScale: inheritedAppearance.scale,
      }),
    });
  },
);
DialogTitle.displayName = 'Dialog.Title';

// Dialog.Description - the single accessible summary boundary.
// Base UI stores one `descriptionElementId` for Popup `aria-describedby`. Use Body for longer
// or repeated content so extra copy does not compete with the dialog's accessible description.
export interface DialogDescriptionProps
  extends Omit<
    BaseDialogDescriptionProps,
    'color'
  > {
  aui?: DialogDescriptionAui;
}

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(
  function DialogDescription({ aui, className, ...rest }, ref) {
    const inheritedAppearance = React.useContext(DialogPopupAppearanceContext);
    return React.createElement(DialogPrimitive.Description as React.ElementType, {
      ref,
      ...rest,
      className: buildDialogFramePartClasses({
        marker: 'aui-dialog-description',
        aui,
        className,
        inheritedScale: inheritedAppearance.scale,
      }),
    });
  },
);
DialogDescription.displayName = 'Dialog.Description';

// The DS-thumb thickness of the always-on body scroll wrapper — 8 (the `--p-px-8` rail), passed
// PROPS-FIRST through View.ScrollArea's own `scrollbarSize` prop so the wrapped Dialog.Body thumb reads
// the SAME 8px as every other AtomicAUI View.ScrollArea (byte-identical to Textarea's default — see
// TEXTAREA_SCROLL_DEFAULT_SCROLLBAR_SIZE). A composed `<Dialog.ScrollArea scrollbarSize/>` overrides it.
export const DIALOG_BODY_SCROLL_DEFAULT_SCROLLBAR_SIZE = 8;

// The frame the wrapping View.ScrollArea Root paints — INVISIBLE by design: `text` paint (transparent
// box, content-colored) + `none` shape + `elevation:0`, so the OUTER Dialog.Body div stays the sole
// visible frame (its border/fill/radius are untouched) and the scroll wrapper only adds the viewport +
// DS thumb. This is the Textarea 3-layer precedent inverted: there the wrapper Root IS the visible frame;
// here the Body div already owns the paint, so the wrapper is a bare shell.
//
// PROFILE `default` (padded — user directive 2026-07-08): with `Dialog.Body` now no-padding (edge-to-edge
// scroll), the PADDED wrapper is where the content breathing room comes from — the viewport (inside the
// Root's padding) insets the content while the Body/thumb still reach the dialog edge. So the DS provides
// the inset (consumers no longer pad the body content themselves). The padding follows the Popup's
// inherited scale tier via the ScrollArea Root's own `aui-scale-default-<tier>` cell.
const DIALOG_BODY_SCROLL_FRAME = {
  color: 'surface',
  paint: 'text',
  profile: 'default',
  shape: 'none',
  elevation: 0,
} as const;

// ─── Dialog.ScrollArea — the always-on body-scroll knob carrier (config-carrier part) ─────────────
// A CONFIG SENTINEL that renders NOTHING itself (the exact `Textarea.ScrollArea` precedent). Dialog.Body
// ALWAYS wraps its content in a View.ScrollArea, so — unlike Textarea, where the part TOGGLES the mode —
// composing `<Dialog.ScrollArea/>` here only OVERRIDES the wrapper's DS-thumb knobs. Body reads this part
// via `findPartChild` and threads its props to the wrapping View.ScrollArea (props-first, no CSS hack).
export interface DialogScrollAreaProps {
  /** The DS scroll-thumb thickness of the wrapping View.ScrollArea — forwarded verbatim to its
   *  `scrollbarSize` prop (number → `--p-px-<n>` rail; string → verbatim). Defaults to
   *  `DIALOG_BODY_SCROLL_DEFAULT_SCROLLBAR_SIZE` (`8`) so a bare Body matches every other AtomicAUI
   *  View.ScrollArea; set it to override per-instance. */
  scrollbarSize?: number | string;
  /** Thumb HOVER color — forwarded verbatim to the wrapping View.ScrollArea's `scrollbarThumbHover`
   *  prop (any CSS color; sets `--aui-scrollbar-thumb-hover`). Same name/semantics as View.ScrollArea. */
  scrollbarThumbHover?: string;
  /** Resting thumb COLOR — forwarded verbatim to the wrapping View.ScrollArea's `scrollbarColor` prop
   *  (a foreground color role; unset = mirror the ambient foreground). Same name/semantics as
   *  View.ScrollArea. */
  scrollbarColor?: ScrollAreaThumbColor;
}
/** Config-carrier — never rendered. Dialog.Body reads its props to thread the wrapper's thumb knobs. */
const DialogScrollArea: React.FC<DialogScrollAreaProps> = () => null;
DialogScrollArea.displayName = 'Dialog.ScrollArea';

// Dialog.Body - visual content section with an ALWAYS-ON DS scroll (user decision 2026-07-07).
// The OUTER div is unchanged — the frame-like content band (marker + `buildDialogFramePartClasses`, so
// the consumer `className`/`aui` still land here). INSIDE it, the content is ALWAYS wrapped in a
// View.ScrollArea (override mode: an explicit Viewport + one vertical Scrollbar) so long content scrolls
// with the shared DS thumb and fitting content shows NO bar — Base UI mounts the scrollbar DOM only on
// real overflow. The wrapper Root is painted INVISIBLE (`DIALOG_BODY_SCROLL_FRAME`); the Body div stays
// the visible frame. The scroll region only becomes the overflow container once the Popup is height-
// capped (a resizable/`aui.sx.maxHeight` Popup or the viewport clamp) — see the `_state-cascade.scss`
// flex-column chain. Compose `<Dialog.ScrollArea/>` to override the thumb knobs.
export interface DialogBodyProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  aui?: DialogBodyAui;
}

const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  function DialogBody({ aui, className, children, ...rest }, ref) {
    const inheritedAppearance = React.useContext(DialogPopupAppearanceContext);

    // The DS-thumb prop surface is MIRRORED PROPS-FIRST from a composed `<Dialog.ScrollArea/>`
    // (scrollbarSize / scrollbarThumbHover / scrollbarColor — same names + value conventions as
    // View.ScrollArea). `scrollbarSize` defaults to 8 for a bare Body; the other two forward only when
    // set. `scrollbarSize`/`scrollbarThumbHover` are inline `--aui-scrollbar-*` vars the View.ScrollArea
    // Root writes (they inherit to the thumb — live even here in override mode); `scrollbarColor` must
    // reach the composed thumb through the Scrollbar's `thumbColor` (the Root's own is ignored in override).
    const scrollProps = findPartChild(children, DialogScrollArea)?.props as
      | DialogScrollAreaProps
      | undefined;
    const scrollbarSize = scrollProps?.scrollbarSize ?? DIALOG_BODY_SCROLL_DEFAULT_SCROLLBAR_SIZE;
    const rootThumbProps: Record<string, unknown> = {
      scrollbarSize,
      ...(scrollProps?.scrollbarThumbHover != null
        ? { scrollbarThumbHover: scrollProps.scrollbarThumbHover }
        : {}),
    };
    const scrollbarProps: Record<string, unknown> = { orientation: 'vertical' };
    if (scrollProps?.scrollbarColor != null) scrollbarProps['thumbColor'] = scrollProps.scrollbarColor;

    return (
      <div
        ref={ref}
        {...rest}
        className={buildDialogFramePartClasses({
          marker: 'aui-dialog-body',
          aui,
          className,
          inheritedScale: inheritedAppearance.scale,
          // Dialog.Body defaults to no-padding (2026-07-08 user directive): the always-on scroll viewport
          // spans the Body edge-to-edge so the DS thumb hugs the dialog edge. Content breathing room then
          // belongs to the Body's content (a form's field grid, a list's rows) — like every DS shell that
          // owns no padding while its content does; a consumer sets `aui={{ profile: 'default' }}` for a
          // padded plain-text body.
          defaultProfile: 'no-padding',
        })}
      >
        {React.createElement(
          ViewScrollArea as React.ElementType,
          { aui: DIALOG_BODY_SCROLL_FRAME, className: 'aui-dialog-body-scroll', ...rootThumbProps },
          React.createElement(ViewScrollAreaViewport as React.ElementType, null, children),
          React.createElement(ViewScrollAreaScrollbar as React.ElementType, scrollbarProps),
        )}
      </div>
    );
  },
);
DialogBody.displayName = 'Dialog.Body';

export type DialogActionsAlign = 'split' | 'start' | 'center' | 'end';

// Dialog.Actions - component-owned footer/action row.
// Alignment is structural rather than an `aui` axis. The nested provider lets Close buttons inherit
// a local footer scale/shape/profile when Actions opts into one.
export interface DialogActionsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  aui?: DialogActionsAui;
  align?: DialogActionsAlign;
}

const DialogActions = React.forwardRef<HTMLDivElement, DialogActionsProps>(
  function DialogActions({ aui, align = 'end', className, children, ...rest }, ref) {
    const inheritedAppearance = React.useContext(DialogPopupAppearanceContext);
    const actionAppearance = React.useMemo<DialogPopupAppearanceContextValue>(
      () => ({
        scale: aui?.scale ?? inheritedAppearance.scale,
        shape: aui?.shape ?? inheritedAppearance.shape,
        profile: aui?.profile ?? inheritedAppearance.profile,
      }),
      [
        aui?.scale,
        aui?.shape,
        aui?.profile,
        inheritedAppearance.scale,
        inheritedAppearance.shape,
        inheritedAppearance.profile,
      ],
    );

    return (
      <div
        ref={ref}
        {...rest}
        data-align={align}
        className={buildDialogFramePartClasses({
          marker: 'aui-dialog-actions',
          aui,
          className,
          inheritedScale: inheritedAppearance.scale,
        })}
      >
        <DialogPopupAppearanceContext.Provider value={actionAppearance}>
          {children}
        </DialogPopupAppearanceContext.Provider>
      </div>
    );
  },
);
DialogActions.displayName = 'Dialog.Actions';

// Dialog.Button - the labeled action Button. EVERY footer button in a Dialog is a Dialog.Button.
// Base UI supplies close-press behavior; the shipped Button owns visuals. Popup/Actions geometry
// becomes the default, while each Button can still override Button intent through `aui`.
//
// `dismiss` (default `true`) is the close contract:
//   - dismiss (default) → composed over Base UI Close: a consumer `onClick` runs first, then the
//     dialog dismisses (Cancel / Save / Close). This preserves the footer auto-dismiss behavior.
//   - dismiss={false}   → the IDENTICAL Button visuals (same `aui` surface, `aui-dialog-button`
//     marker, focus + keyboard activation) rendered as a PLAIN button host that is NOT composed
//     over Base UI Close — so `onClick` fires but the dialog STAYS open. This is the non-dismissing
//     action every multi-step / persist-in-place footer needs (a Back that steps within the dialog,
//     an Apply that keeps the modal open). A consumer flipping the prop sees zero visual change.
//
// Escape hatch for a PER-CLICK conditional keep-open while still defaulting to dismiss: Base UI
// merges a consumer `onClick` to the RIGHT of its internal close handler (so `onClick` runs first),
// and the click event carries `event.preventBaseUIHandler()` — calling it cancels the close-press
// for that click. (Plain `event.preventDefault()` does NOT stop the close: Base UI's close handler
// ignores `defaultPrevented`.) The declarative `dismiss={false}` is the durable, testable contract;
// `preventBaseUIHandler()` is the imperative per-click override.
export interface DialogButtonProps
  extends Omit<
    BaseDialogCloseProps,
    'color' | 'render'
  > {
  aui?: ButtonAui;
  /**
   * Whether clicking this footer button dismisses the Dialog. Default `true` (composes Base UI Close;
   * `onClick` runs first, then the dialog closes). Set `false` for an action that must keep the modal
   * open — the button renders the identical visual recipe/markup but is NOT composed over Base UI
   * Close, so `onClick` fires and the dialog stays open. See the class doc for the ADC Back/Apply case.
   */
  dismiss?: boolean;
}

// Compose the marker + consumer className the same way Base UI merges the Close className onto the
// rendered Button (consumer class first, then the marker), so the DOM class SET is identical in both
// dismiss modes; the Button recipe role-dedups the rest. Base UI's `className` may be a state-aware
// callback (`(state) => string`), so preserve that form and merge the marker onto its resolved value.
function joinDialogButtonClassName(
  className: DialogButtonProps['className'],
  marker: string,
): ButtonProps['className'] {
  if (typeof className === 'function') {
    const fn = className as (state: { disabled: boolean }) => string | undefined;
    return ((state: { disabled: boolean }) => {
      const resolved = fn(state);
      return resolved ? `${resolved} ${marker}` : marker;
    }) as ButtonProps['className'];
  }
  return className ? `${className} ${marker}` : marker;
}

const DialogButton = React.forwardRef<HTMLButtonElement, DialogButtonProps>(
  function DialogButton({ aui, className, children, type, dismiss = true, ...rest }, ref) {
    const inheritedAppearance = React.useContext(DialogPopupAppearanceContext);
    const buttonAui: ButtonAui = {
      color: 'surface-alt',
      paint: 'solid',
      scale: inheritedAppearance.scale,
      shape: inheritedAppearance.shape,
      profile: inheritedAppearance.profile,
      ...aui,
    };
    const buttonClassName = 'aui-dialog-button';

    // dismiss={false}: render the SAME Button visuals but NOT wrapped in Base UI Close, so the click
    // never triggers close-press. `rest` (disabled / nativeButton / native button attrs) is a subset
    // of the Button prop surface, so it forwards cleanly. The ref widens to Button's HTMLElement slot
    // (the host is a native <button>, so it IS an HTMLButtonElement at runtime).
    if (!dismiss) {
      return (
        <Button
          ref={ref as React.Ref<HTMLElement>}
          type={type ?? 'button'}
          {...rest}
          aui={buttonAui}
          className={joinDialogButtonClassName(className, buttonClassName)}
        >
          {children}
        </Button>
      );
    }

    return (
      <DialogPrimitive.Close
        ref={ref}
        type={type ?? 'button'}
        {...rest}
        className={className}
        // After the rest spread so a runtime `render` in rest cannot replace the composed Button
        // even if a caller bypasses the public Omit type.
        render={<Button aui={buttonAui} className={buttonClassName} />}
      >
        {children}
      </DialogPrimitive.Close>
    );
  },
);
DialogButton.displayName = 'Dialog.Button';

// Dialog.Close - the header dismiss IconButton (the ×). An `IconButton` composed through Base UI
// Close `render`, so clicking it dismisses the dialog (same close-press mechanism as Dialog.Button,
// just an icon presentation). Defaults to the `xmark` glyph, accessible name "Close",
// `profile: 'contained'` + `paint: 'text'` (a snug, borderless box), and inherits the Popup
// scale/shape. Place it in the Title row, where it floats to the trailing inline edge. Use
// `Dialog.Button` for the labeled footer actions.
export interface DialogCloseProps
  extends Omit<
    BaseDialogCloseProps,
    'color' | 'render' | 'children'
  > {
  aui?: IconButtonAui;
  name?: string;
  family?: IconFamily;
  layer?: IconLayer;
  weight?: IconWeight;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  function DialogClose(
    {
      aui,
      className,
      name = 'xmark',
      family,
      layer,
      weight,
      type,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      ...rest
    },
    ref,
  ) {
    const inheritedAppearance = React.useContext(DialogPopupAppearanceContext);
    const closeAui: IconButtonAui = {
      paint: 'text',
      scale: inheritedAppearance.scale,
      shape: inheritedAppearance.shape,
      profile: 'contained',
      ...aui,
    };

    return (
      <DialogPrimitive.Close
        ref={ref}
        type={type ?? 'button'}
        {...rest}
        className={className}
        // After the rest spread so a runtime `render` in rest cannot replace the composed IconButton.
        render={(
          <IconButton
            name={name}
            family={family}
            layer={layer}
            weight={weight}
            aui={closeAui}
            className="aui-dialog-close"
            aria-label={ariaLabel ?? 'Close'}
            {...(ariaLabelledby ? { 'aria-labelledby': ariaLabelledby } : {})}
          />
        )}
      />
    );
  },
);
DialogClose.displayName = 'Dialog.Close';

// Dialog.Spacer - a box-less flex spacer (CSS in _state-cascade.scss). A structural marker
// (`flex:1 1 auto`) with NO `aui`, NO recipe — pure layout (the Menubar.Spacer / Panels.Spacer
// precedent). Seat it in the Title row to push the Close × to the trailing inline edge:
// `Title → Icon → text → Spacer → Close`. (The `.Close` also keeps a `margin-inline-start:auto`
// fallback, so a header WITHOUT a Spacer still right-aligns the ×; the Spacer is the explicit path.)
export interface DialogSpacerProps
  extends React.ComponentPropsWithoutRef<'div'>,
    React.RefAttributes<HTMLDivElement> {}
const DialogSpacer = createAtomicPart<DialogSpacerProps>('div', 'aui-dialog-spacer');
DialogSpacer.displayName = 'Dialog.Spacer';

// Dialog.Icon - a placeable general icon (a ContainedIcon, contained profile).
// A thin wrapper over `ContainedIcon` that DEFAULTS `profile: 'contained'` so a leading/inline icon
// sits SNUG in a Title row (mirroring Dropdown.Icon / Accordion.Icon / Field.Icon). Otherwise it IS
// a ContainedIcon — same identity props (`name`/`family`/`layer`/`weight`) + the full box `aui`
// surface; a consumer can override the profile (or any axis) via `aui`. Placeable anywhere inside
// the Popup subtree.
//
// SCALE RESOLUTION: Dialog does NOT use the global AuiScaleProvider — the Popup seeds its OWN
// `DialogPopupAppearanceContext` (carrying the resolved Popup scale/shape/profile). So the icon
// reads THAT local context (the same way Title/Description/Body/Close inherit the Popup geometry),
// resolving its tier as: own `aui.scale` ?? the Popup appearance scale ?? the Popup vocab default.
export type DialogIconProps = ContainedIconProps;
const DialogIcon = React.forwardRef<HTMLSpanElement, DialogIconProps>(
  function DialogIcon({ aui, ...rest }, ref) {
    const inheritedAppearance = React.useContext(DialogPopupAppearanceContext);
    const resolvedScale =
      aui?.scale ?? inheritedAppearance.scale ?? DIALOG_POPUP_VOCAB.defaults.scale;
    const resolvedAui = React.useMemo(
      () => ({ profile: 'contained' as const, ...aui, scale: resolvedScale }),
      [aui, resolvedScale],
    );
    return <ContainedIcon ref={ref} {...rest} aui={resolvedAui} />;
  },
);
DialogIcon.displayName = 'Dialog.Icon';

interface DialogComponent {
  <Payload>(props: DialogRootProps<Payload>): React.JSX.Element;
  displayName?: string;
  Root: typeof DialogRoot;
  Trigger: typeof DialogTrigger;
  Portal: typeof DialogPortal;
  Backdrop: typeof DialogBackdrop;
  Viewport: typeof DialogViewport;
  Popup: typeof DialogPopup;
  Title: typeof DialogTitle;
  Description: typeof DialogDescription;
  Body: typeof DialogBody;
  ScrollArea: typeof DialogScrollArea;
  Actions: typeof DialogActions;
  Button: typeof DialogButton;
  Close: typeof DialogClose;
  Spacer: typeof DialogSpacer;
  Icon: typeof DialogIcon;
  Handle: typeof DialogHandle;
  createHandle: typeof createDialogHandle;
}

// Compound dot namespace. Keep the interface above and the assigned statics in lockstep; the root
// is the export itself (`<Dialog>`), with no redundant `.Root` or anchored `.Positioner`.
export const Dialog = Object.assign(DialogRoot, {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Backdrop: DialogBackdrop,
  Viewport: DialogViewport,
  Popup: DialogPopup,
  Title: DialogTitle,
  Description: DialogDescription,
  Body: DialogBody,
  ScrollArea: DialogScrollArea,
  Actions: DialogActions,
  Button: DialogButton,
  Close: DialogClose,
  Spacer: DialogSpacer,
  Icon: DialogIcon,
  Handle: DialogHandle,
  createHandle: createDialogHandle,
}) as DialogComponent;

export default Dialog;
