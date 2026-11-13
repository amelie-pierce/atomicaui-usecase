// modules/design/atomic-aui/src/lib/alert-dialog/alert-dialog.tsx
//
// AlertDialog is the modal confirmation-dialog wrapper around Base UI AlertDialog. Base UI owns
// focus trapping, role/ARIA wiring, portal mechanics, and pointer-dismissal prevention; AtomicAUI
// owns appearance through per-part `aui` recipes and marker CSS.
import * as React from 'react';
import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { createAtomicPart } from '../../core/factory/create-atomic-part';
import { prependMarkerClassName } from '../../core/recipe/prepend-marker-class-name';
import { Button, type ButtonAui, type ButtonProps } from '../button';
import { IconButton, type IconButtonAui } from '../icon-button';
import {
  ContainedIcon,
  type ContainedIconProps,
  type IconFamily,
  type IconLayer,
  type IconWeight,
} from '../icon';
import { identityToDataAttrs, useAuiIdentity } from '../identity';
import {
  buildAlertDialogFramePartClasses,
  useAlertDialogPopupRecipe,
  ALERT_DIALOG_POPUP_VOCAB,
} from './use-recipe';
import type {
  AlertDialogActionsAui,
  AlertDialogDescriptionAui,
  AlertDialogPopupAui,
  AlertDialogProfile,
  AlertDialogScale,
  AlertDialogShape,
  AlertDialogTitleAui,
} from './use-recipe';

import type {
  AlertDialogCloseProps as BaseAlertDialogCloseProps,
  AlertDialogDescriptionProps as BaseAlertDialogDescriptionProps,
  AlertDialogRootProps as BaseAlertDialogRootProps,
  AlertDialogTitleProps as BaseAlertDialogTitleProps,
  AlertDialogTriggerProps as BaseAlertDialogTriggerProps,
} from '@base-ui/react/alert-dialog';

// AlertDialog.Root props = Base UI's Root props PLUS the DS-friendly `clickOutsideToClose` boolean.
// Base UI HARD-FORCES `disablePointerDismissal=true` for an alert dialog (and omits the prop) — an
// alert dialog must require an explicit choice — so there is NO native pointer-dismissal to forward.
// `clickOutsideToClose` (default `false`, preserving that semantic) instead opts INTO an outside-press
// close implemented by the DS: when `true`, a click on the authored Backdrop dismisses the dialog
// imperatively (see AlertDialogBackdrop + AlertDialogOutsideCloseContext below).
export interface AlertDialogRootProps<Payload = unknown> extends BaseAlertDialogRootProps<Payload> {
  /**
   * Whether a click on the authored `AlertDialog.Backdrop` closes the dialog. Default `false` —
   * Base UI blocks pointer dismissal for an alert dialog, which by design requires an explicit
   * Cancel/Confirm choice. Set `true` to opt into outside-press dismissal (requires a rendered
   * `AlertDialog.Backdrop` — the scrim is the outside-click target).
   */
  clickOutsideToClose?: boolean;
}

// Imperative close handle shape (Base UI's AlertDialogRoot.Actions = { close, unmount }). Captured via
// `actionsRef` and invoked by the Backdrop when `clickOutsideToClose` opts into outside dismissal.
type AlertDialogActionsHandle = { close: () => void; unmount: () => void };

// Shared from Root → Backdrop: whether an outside press should close + the imperative close. The
// Backdrop is the only outside-click target (the Viewport is `pointer-events:none` and passes clicks
// through to it), so the close wiring lives there, gated on `clickOutsideToClose`.
interface AlertDialogOutsideCloseContextValue {
  clickOutsideToClose: boolean;
  requestClose: () => void;
}
const AlertDialogOutsideCloseContext =
  React.createContext<AlertDialogOutsideCloseContextValue>({
    clickOutsideToClose: false,
    requestClose: () => undefined,
  });

export const AlertDialogHandle = AlertDialogPrimitive.Handle;
export const createAlertDialogHandle = AlertDialogPrimitive.createHandle;
export type AlertDialogHandle<Payload> =
  ReturnType<typeof AlertDialogPrimitive.createHandle<Payload>>;

export type {
  AlertDialogPopupAui,
  AlertDialogTitleAui,
  AlertDialogDescriptionAui,
  AlertDialogActionsAui,
  AlertDialogColor,
  AlertDialogPaint,
  AlertDialogProfile,
  AlertDialogScale,
  AlertDialogShape,
} from './use-recipe';

const DEFAULT_POPUP_SCALE: AlertDialogScale = 'sm';
const DEFAULT_POPUP_SHAPE: AlertDialogShape = 'soft';
const DEFAULT_POPUP_PROFILE: AlertDialogProfile = 'default';

interface AlertDialogPopupAppearanceContextValue {
  scale: AlertDialogScale;
  shape: AlertDialogShape;
  profile: AlertDialogProfile;
}

const AlertDialogPopupAppearanceContext =
  React.createContext<AlertDialogPopupAppearanceContextValue>({
    scale: DEFAULT_POPUP_SCALE,
    shape: DEFAULT_POPUP_SHAPE,
    profile: DEFAULT_POPUP_PROFILE,
  });

// ─── AlertDialog.Root — generic behavior shell ──────────────────────────────
// Base UI's AlertDialog.Root renders no DOM; it forces `modal=true`,
// `disablePointerDismissal=true`, and `role="alertdialog"` internally. Escape remains the
// standard keyboard dismissal path and routes through Base UI's `escape-key` close reason.
function AlertDialogRoot<Payload>({
  clickOutsideToClose = false,
  actionsRef,
  ...props
}: AlertDialogRootProps<Payload>): React.JSX.Element {
  // Capture an imperative close handle. If the consumer passed their own `actionsRef`, reuse THAT
  // object (Base UI writes `.current` onto it) so the consumer keeps full imperative control; else use
  // an internal ref. Either way the Backdrop's outside-press can call `.close()`.
  const internalActionsRef = React.useRef<AlertDialogActionsHandle | null>(null);
  const resolvedActionsRef = (actionsRef ??
    internalActionsRef) as React.RefObject<AlertDialogActionsHandle | null>;
  const requestClose = React.useCallback(() => {
    resolvedActionsRef.current?.close();
  }, [resolvedActionsRef]);
  const outsideClose = React.useMemo<AlertDialogOutsideCloseContextValue>(
    () => ({ clickOutsideToClose, requestClose }),
    [clickOutsideToClose, requestClose],
  );
  return (
    <AlertDialogOutsideCloseContext.Provider value={outsideClose}>
      {React.createElement(AlertDialogPrimitive.Root, {
        ...props,
        actionsRef: resolvedActionsRef,
      } as object)}
    </AlertDialogOutsideCloseContext.Provider>
  );
}
AlertDialogRoot.displayName = 'AlertDialog';

// ─── AlertDialog.Trigger — real Button composed through Base UI render ───────
// The trigger is behavior-bearing (it opens the dialog), but visually it must be the shipped
// AtomicAUI Button. Base UI's `render` prop clones our <Button> and merges its trigger behavior
// props onto it, so the result stays a real Button while retaining AlertDialog semantics.
export interface AlertDialogTriggerProps<Payload = unknown>
  extends Omit<
    BaseAlertDialogTriggerProps<Payload>,
    'color' | 'render'
  > {
  aui?: ButtonAui;
}

interface AlertDialogTriggerComponent {
  <Payload = unknown>(
    props: AlertDialogTriggerProps<Payload> & React.RefAttributes<HTMLButtonElement>
  ): React.JSX.Element;
  displayName?: string;
}

const AlertDialogTrigger = React.forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(
  function AlertDialogTrigger({ aui, className, children, type, ...rest }, ref) {
    const triggerAui: ButtonAui = {
      color: 'surface-alt',
      paint: 'solid',
      scale: 'sm',
      shape: 'soft',
      ...aui,
    };
    const buttonClassName = 'aui-alert-dialog-trigger';

    return (
      <AlertDialogPrimitive.Trigger
        ref={ref}
        type={type ?? 'button'}
        {...rest}
        className={className}
        // After the rest spread so a runtime `render` in rest can never silently replace the
        // composed Button (the prop is already Omit-ted from the public type).
        render={<Button aui={triggerAui} className={buttonClassName} />}
      >
        {children}
      </AlertDialogPrimitive.Trigger>
    );
  },
) as AlertDialogTriggerComponent;
AlertDialogTrigger.displayName = 'AlertDialog.Trigger';

// ─── AlertDialog.Portal — structural passthrough ─────────────────────────────
// Base UI portals the modal subtree to body by default. The portaled descendants that paint
// (Backdrop + Popup) each re-stamp identity themselves because AlertDialog has no Positioner host.
const AlertDialogPortal = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof AlertDialogPrimitive.Portal>
>(function AlertDialogPortal(props, ref) {
  return React.createElement(AlertDialogPrimitive.Portal as React.ElementType, { ref, ...props });
});
AlertDialogPortal.displayName = 'AlertDialog.Portal';
export type AlertDialogPortalProps = React.ComponentProps<typeof AlertDialogPortal>;

// ─── AlertDialog.Backdrop — themed scrim marker + portal re-stamp ────────────
// Backdrop is a scrim, not a frame: no `aui`, no paint cell, no state layer. It still reads themed
// overlay rails in CSS, so it must re-stamp `data-aui-*` attrs at the portal boundary. Consumer
// attrs spread first, ambient identity last, matching Select/Dropdown's authoritative re-stamp.
export type AlertDialogBackdropProps =
  React.ComponentProps<typeof AlertDialogPrimitive.Backdrop>;
const AlertDialogBackdrop = React.forwardRef<HTMLDivElement, AlertDialogBackdropProps>(
  function AlertDialogBackdrop({ className, onClick, ...rest }, ref) {
    const identity = useAuiIdentity();
    const dataAttrs = identityToDataAttrs(identity);
    const { clickOutsideToClose, requestClose } = React.useContext(
      AlertDialogOutsideCloseContext,
    );
    // When `clickOutsideToClose` is opted in, a Backdrop click is a genuine outside press (the Popup is
    // `pointer-events:auto` and catches its own clicks; the Viewport is `pointer-events:none` and passes
    // empty-area clicks through to this scrim). The consumer's own `onClick` runs first and can cancel
    // via `preventDefault()`. A drag from inside the Popup to the Backdrop does NOT fire a Backdrop click
    // (the click target is the common ancestor), so this only triggers on a true outside click.
    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        (onClick as ((e: React.MouseEvent<HTMLDivElement>) => void) | undefined)?.(event);
        if (event.defaultPrevented) return;
        if (clickOutsideToClose) requestClose();
      },
      [onClick, clickOutsideToClose, requestClose],
    );
    return React.createElement(AlertDialogPrimitive.Backdrop as React.ElementType, {
      ref,
      ...rest,
      ...dataAttrs,
      onClick: handleClick,
      className: prependMarkerClassName('aui-alert-dialog-backdrop', className),
    });
  },
);
AlertDialogBackdrop.displayName = 'AlertDialog.Backdrop';

// ─── AlertDialog.Viewport — structural centering/scroll host ─────────────────
// Viewport is Base UI's dialog positioning/scroll container. It is NOT a floating Positioner and
// carries no theme paint; CSS uses it only for fixed inset, centering, and viewport overflow.
export type AlertDialogViewportProps =
  React.ComponentProps<typeof AlertDialogPrimitive.Viewport>;
const AlertDialogViewport = createAtomicPart<AlertDialogViewportProps>(
  AlertDialogPrimitive.Viewport as React.ElementType,
  'aui-alert-dialog-viewport',
);
AlertDialogViewport.displayName = 'AlertDialog.Viewport';

// ─── AlertDialog.Popup — tier-3 surface frame + portal re-stamp ──────────────
// Popup is the modal card: a passive `.aui-frame` surface via the main factory and ONLY the popup
// recipe. No `useStateLayer`: the card itself has no hover/press/focus affordance; actions inside
// it are real Buttons and own their own state layers. Since there is no Positioner, Popup re-stamps
// identity directly so body-portaled paint/elevation/theming resolve in the browser.
const _AlertDialogPopup = createAtomicComponent(AlertDialogPrimitive.Popup, {
  extensions: [useAlertDialogPopupRecipe],
});

export interface AlertDialogPopupProps
  extends Omit<React.ComponentProps<typeof AlertDialogPrimitive.Popup>, 'color'> {
  aui?: AlertDialogPopupAui;
}

const AlertDialogPopup = React.forwardRef<HTMLDivElement, AlertDialogPopupProps>(
  function AlertDialogPopup({ aui, children, ...rest }, ref) {
    const identity = useAuiIdentity();
    const dataAttrs = identityToDataAttrs(identity);
    const inheritedAppearance = React.useMemo<AlertDialogPopupAppearanceContextValue>(
      () => ({
        scale: aui?.scale ?? DEFAULT_POPUP_SCALE,
        shape: aui?.shape ?? DEFAULT_POPUP_SHAPE,
        profile: aui?.profile ?? DEFAULT_POPUP_PROFILE,
      }),
      [aui?.scale, aui?.shape, aui?.profile],
    );
    return React.createElement(_AlertDialogPopup as React.ElementType, {
      ref,
      ...rest,
      aui,
      ...dataAttrs,
    }, (
      <AlertDialogPopupAppearanceContext.Provider value={inheritedAppearance}>
        {children}
      </AlertDialogPopupAppearanceContext.Provider>
    ));
  },
);
AlertDialogPopup.displayName = 'AlertDialog.Popup';

// ─── Text parts — frame-like sections that inherit Popup geometry by default ──
// Title / Description own their section padding, but they do NOT stamp a default scale. Unset
// scale/shape inherit the Popup rails; explicit part `aui` can override locally. Title defaults
// to a `surface-alt` band, while Description inherits the Popup surface unless configured.
export interface AlertDialogTitleProps
  extends Omit<
    BaseAlertDialogTitleProps,
    'color'
  > {
  aui?: AlertDialogTitleAui;
}

const AlertDialogTitle = React.forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(
  function AlertDialogTitle({ aui, className, ...rest }, ref) {
    const inheritedAppearance = React.useContext(AlertDialogPopupAppearanceContext);
    return React.createElement(AlertDialogPrimitive.Title as React.ElementType, {
      ref,
      ...rest,
      className: buildAlertDialogFramePartClasses({
        marker: 'aui-alert-dialog-title',
        aui,
        className,
        defaultColor: 'surface-alt',
        defaultPaint: 'solid',
        inheritedScale: inheritedAppearance.scale,
      }),
    });
  },
);
AlertDialogTitle.displayName = 'AlertDialog.Title';

export interface AlertDialogDescriptionProps
  extends Omit<
    BaseAlertDialogDescriptionProps,
    'color'
  > {
  aui?: AlertDialogDescriptionAui;
}

const AlertDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDialogDescriptionProps
>(
  function AlertDialogDescription({ aui, className, ...rest }, ref) {
    const inheritedAppearance = React.useContext(AlertDialogPopupAppearanceContext);
    return React.createElement(AlertDialogPrimitive.Description as React.ElementType, {
      ref,
      ...rest,
      className: buildAlertDialogFramePartClasses({
        marker: 'aui-alert-dialog-description',
        aui,
        className,
        inheritedScale: inheritedAppearance.scale,
      }),
    });
  },
);
AlertDialogDescription.displayName = 'AlertDialog.Description';

// ─── AlertDialog.Actions — component-owned footer/action row ─────────────────
// Default `end` layout keeps all actions inline-end aligned. `split` is available when a product
// wants cancel on the inline-start side. Alignment is structural, not an `aui` appearance axis.
export type AlertDialogActionsAlign = 'split' | 'start' | 'center' | 'end';

export interface AlertDialogActionsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  aui?: AlertDialogActionsAui;
  align?: AlertDialogActionsAlign;
}

const AlertDialogActions = React.forwardRef<HTMLDivElement, AlertDialogActionsProps>(
  function AlertDialogActions({ aui, align = 'end', className, children, ...rest }, ref) {
    const inheritedAppearance = React.useContext(AlertDialogPopupAppearanceContext);
    const actionAppearance = React.useMemo<AlertDialogPopupAppearanceContextValue>(
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
        className={buildAlertDialogFramePartClasses({
          marker: 'aui-alert-dialog-actions',
          aui,
          className,
          inheritedScale: inheritedAppearance.scale,
        })}
      >
        <AlertDialogPopupAppearanceContext.Provider value={actionAppearance}>
          {children}
        </AlertDialogPopupAppearanceContext.Provider>
      </div>
    );
  },
);
AlertDialogActions.displayName = 'AlertDialog.Actions';

// ─── AlertDialog.Button — the labeled action Button composed through Base UI Close render ──
// Use it for the labeled confirmation actions (Cancel / Confirm / Delete). Base UI supplies
// close-press behavior; the shipped Button owns visuals. Consumers render Cancel and Confirm as
// separate <AlertDialog.Button> buttons; destructive intent is expressed on the Button's own
// `aui.color` (`error`), not as an AlertDialog prop. Every button inside the component API is a
// real AtomicAUI Button.
//
// `dismiss` (default `true`) mirrors Dialog.Button exactly: default composes Base UI Close (a
// consumer `onClick` runs first, then the dialog dismisses); `dismiss={false}` renders the IDENTICAL
// Button visuals as a plain host NOT composed over Base UI Close, so `onClick` fires and the dialog
// STAYS open (a rare multi-step Back within an alert flow). For a per-click conditional keep-open
// while still defaulting to dismiss, a consumer `onClick` can call `event.preventBaseUIHandler()` on
// the Base UI click event (plain `preventDefault()` does NOT stop the close).
export interface AlertDialogButtonProps
  extends Omit<
    BaseAlertDialogCloseProps,
    'color' | 'render'
  > {
  aui?: ButtonAui;
  /**
   * Whether clicking this action button dismisses the AlertDialog. Default `true` (composes Base UI
   * Close). Set `false` for an action that must keep the modal open — identical visuals, but NOT
   * composed over Base UI Close, so `onClick` fires and the dialog stays open.
   */
  dismiss?: boolean;
}

// Compose the marker + consumer className the same way Base UI merges the Close className onto the
// rendered Button, so the DOM class SET is identical across both dismiss modes. Base UI's `className`
// may be a state-aware callback, so preserve that form and merge the marker onto its resolved value.
function joinAlertDialogButtonClassName(
  className: AlertDialogButtonProps['className'],
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

const AlertDialogButton = React.forwardRef<HTMLButtonElement, AlertDialogButtonProps>(
  function AlertDialogButton({ aui, className, children, type, dismiss = true, ...rest }, ref) {
    const inheritedAppearance = React.useContext(AlertDialogPopupAppearanceContext);
    const buttonAui: ButtonAui = {
      color: 'surface-alt',
      paint: 'solid',
      scale: inheritedAppearance.scale,
      shape: inheritedAppearance.shape,
      profile: inheritedAppearance.profile,
      ...aui,
    };
    const buttonClassName = 'aui-alert-dialog-button';

    // dismiss={false}: same Button visuals, NOT wrapped in Base UI Close, so the click keeps the
    // dialog open. `rest` is a subset of the Button prop surface; the ref widens to Button's
    // HTMLElement slot (the host is a native <button>).
    if (!dismiss) {
      return (
        <Button
          ref={ref as React.Ref<HTMLElement>}
          type={type ?? 'button'}
          {...rest}
          aui={buttonAui}
          className={joinAlertDialogButtonClassName(className, buttonClassName)}
        >
          {children}
        </Button>
      );
    }

    return (
      <AlertDialogPrimitive.Close
        ref={ref}
        type={type ?? 'button'}
        {...rest}
        className={className}
        // After the rest spread so a runtime `render` in rest can never silently replace the
        // composed Button (the prop is already Omit-ted from the public type).
        render={<Button aui={buttonAui} className={buttonClassName} />}
      >
        {children}
      </AlertDialogPrimitive.Close>
    );
  },
);
AlertDialogButton.displayName = 'AlertDialog.Button';

// ─── AlertDialog.Close — the header dismiss IconButton (the ×) ───────────────
// An `IconButton` composed through Base UI Close `render`, so clicking it dismisses the dialog
// (same close-press mechanism as AlertDialog.Button, just an icon presentation). Defaults to the
// `xmark` glyph, accessible name "Close", `profile: 'contained'` + `paint: 'text'`, and inherits
// the Popup scale/shape. Place it in the Title row, where it floats to the trailing inline edge.
// Use `AlertDialog.Button` for the labeled confirmation actions.
export interface AlertDialogCloseProps
  extends Omit<
    BaseAlertDialogCloseProps,
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

const AlertDialogClose = React.forwardRef<HTMLButtonElement, AlertDialogCloseProps>(
  function AlertDialogClose(
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
    const inheritedAppearance = React.useContext(AlertDialogPopupAppearanceContext);
    const closeAui: IconButtonAui = {
      paint: 'text',
      scale: inheritedAppearance.scale,
      shape: inheritedAppearance.shape,
      profile: 'contained',
      ...aui,
    };

    return (
      <AlertDialogPrimitive.Close
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
            className="aui-alert-dialog-close"
            aria-label={ariaLabel ?? 'Close'}
            {...(ariaLabelledby ? { 'aria-labelledby': ariaLabelledby } : {})}
          />
        )}
      />
    );
  },
);
AlertDialogClose.displayName = 'AlertDialog.Close';

// ─── AlertDialog.Spacer — a box-less flex spacer (CSS in _state-cascade.scss) ──────────
// A structural marker (`flex:1 1 auto`) with NO `aui`, NO recipe — pure layout (the Menubar.Spacer /
// Panels.Spacer precedent). Seat it in the Title row to push the Close × to the trailing inline edge:
// `Title → Icon → text → Spacer → Close`. (The `.Close` also keeps a `margin-inline-start:auto`
// fallback, so a header WITHOUT a Spacer still right-aligns the ×; the Spacer is the explicit path.)
export interface AlertDialogSpacerProps
  extends React.ComponentPropsWithoutRef<'div'>,
    React.RefAttributes<HTMLDivElement> {}
const AlertDialogSpacer = createAtomicPart<AlertDialogSpacerProps>('div', 'aui-alert-dialog-spacer');
AlertDialogSpacer.displayName = 'AlertDialog.Spacer';

// ─── AlertDialog.Icon — a placeable general icon (a ContainedIcon, contained profile) ──
// A thin wrapper over `ContainedIcon` that DEFAULTS `profile: 'contained'` so a leading/inline icon
// sits SNUG in a Title row (mirroring Dropdown.Icon / Dialog.Icon). Otherwise it IS a ContainedIcon
// — same identity props (`name`/`family`/`layer`/`weight`) + the full box `aui` surface; a consumer
// can override the profile (or any axis) via `aui`. Placeable anywhere inside the Popup subtree.
//
// SCALE RESOLUTION: AlertDialog does NOT use the global AuiScaleProvider — the Popup seeds its OWN
// `AlertDialogPopupAppearanceContext` (carrying the resolved Popup scale/shape/profile). So the icon
// reads THAT local context (the same way Title/Description/Close inherit the Popup geometry),
// resolving its tier as: own `aui.scale` ?? the Popup appearance scale ?? the Popup vocab default.
export type AlertDialogIconProps = ContainedIconProps;
const AlertDialogIcon = React.forwardRef<HTMLSpanElement, AlertDialogIconProps>(
  function AlertDialogIcon({ aui, ...rest }, ref) {
    const inheritedAppearance = React.useContext(AlertDialogPopupAppearanceContext);
    const resolvedScale =
      aui?.scale ?? inheritedAppearance.scale ?? ALERT_DIALOG_POPUP_VOCAB.defaults.scale;
    const resolvedAui = React.useMemo(
      () => ({ profile: 'contained' as const, ...aui, scale: resolvedScale }),
      [aui, resolvedScale],
    );
    return <ContainedIcon ref={ref} {...rest} aui={resolvedAui} />;
  },
);
AlertDialogIcon.displayName = 'AlertDialog.Icon';

// ─── Assemble + typing seam (mirror Select/Dropdown) ─────────────────────────
// `Object.assign` collapses the generic Root function, so the public compound component is typed
// explicitly. LOCKSTEP CONTRACT: every static in this interface must exist in the assign object
// below, and vice versa. The root is the export itself (`<AlertDialog>`); no redundant `.Root`.
interface AlertDialogComponent {
  <Payload>(props: AlertDialogRootProps<Payload>): React.JSX.Element;
  displayName?: string;
  Root: typeof AlertDialogRoot;
  Trigger: typeof AlertDialogTrigger;
  Portal: typeof AlertDialogPortal;
  Backdrop: typeof AlertDialogBackdrop;
  Viewport: typeof AlertDialogViewport;
  Popup: typeof AlertDialogPopup;
  Title: typeof AlertDialogTitle;
  Description: typeof AlertDialogDescription;
  Actions: typeof AlertDialogActions;
  Button: typeof AlertDialogButton;
  Close: typeof AlertDialogClose;
  Spacer: typeof AlertDialogSpacer;
  Icon: typeof AlertDialogIcon;
  Handle: typeof AlertDialogHandle;
  createHandle: typeof createAlertDialogHandle;
}

// Compound component (dot-namespace). Keep these statics in lockstep with the
// `AlertDialogComponent` interface above.
export const AlertDialog = Object.assign(AlertDialogRoot, {
  Root: AlertDialogRoot,
  Trigger: AlertDialogTrigger,
  Portal: AlertDialogPortal,
  Backdrop: AlertDialogBackdrop,
  Viewport: AlertDialogViewport,
  Popup: AlertDialogPopup,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Actions: AlertDialogActions,
  Button: AlertDialogButton,
  Close: AlertDialogClose,
  Spacer: AlertDialogSpacer,
  Icon: AlertDialogIcon,
  Handle: AlertDialogHandle,
  createHandle: createAlertDialogHandle,
}) as AlertDialogComponent;

export default AlertDialog;
