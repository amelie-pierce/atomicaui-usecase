// modules/design/atomic-aui/src/lib/toast/toast.tsx
//
// Toast is a notification SYSTEM, not a single leaf: Provider + imperative manager + portaled
// Viewport + ONE per-toast Root rendered per manager entry. Base UI owns ALL behavior (timing,
// auto-dismiss, swipe gestures, the dialog/alertdialog ARIA, live announcements, and the manager
// queue/limit state); AtomicAUI owns ONLY appearance + composition via the 6.0 recipe/part
// architecture. Like Select/Dropdown, this is a compound dot-namespace — but the SHAPE differs:
// the Root is driven by an IMPERATIVE manager (`manager.add(...)`) rather than declarative
// children, so the consumer renders a `manager.toasts.map(toast => <Toast toast={toast} />)` sink
// inside the Viewport. `Toast` IS that per-toast Root (no `.Root` self-alias — see the assemble
// block at the bottom).
//
// PORTAL CASCADE: both the Viewport AND the Positioner sit under `document.body`, so BOTH re-stamp
// the ambient `data-aui-*` identity to re-root the theme cascade onto the portaled subtree (the
// same lib/identity re-stamp Select/Dropdown use, but applied to TWO hosts here — see those parts).
//
// AUTO-RENDER: the Root reads Base UI's `toast.title`/`toast.description`/`toast.actionProps` and
// lays them out into the ADC Kit anatomy (leading severity icon, copy column, optional action,
// compact close) WITHOUT the consumer composing parts — an ergonomic default that composed
// `children` opt out of entirely (see `renderAutoToastContent`).
import * as React from 'react';
import { Toast as ToastPrimitive } from '@base-ui/react/toast';
import type {
  ToastManager as BaseToastManager,
  ToastObject as BaseToastObject,
  ToastProviderProps as BaseToastProviderProps,
  ToastManagerEvent as BaseToastManagerEvent,
} from '@base-ui/react/toast';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { createAtomicPart } from '../../core/factory/create-atomic-part';
import { prependMarkerClassName } from '../../core/recipe/prepend-marker-class-name';
// Toast COMPOSES sibling leaf components (the same pattern as the ContainedIcon import below): the
// Action/Close ARE the real AtomicAUI <Button>, and the Close glyph is the real <Icon>. So they look
// identical to a standalone Button/Icon and can never drift from them.
import { Button } from '../button';
import type { ButtonAui, ButtonColor } from '../button';
import { ContainedIcon, Icon } from '../icon';
import type { ContainedIconAui, IconFamily, IconLayer, IconWeight } from '../icon';
import { identityToDataAttrs, useAuiIdentity } from '../identity';
import { TOAST_ROOT_VOCAB, toastTypeToColor, useToastRootRecipe } from './use-recipe';
import type { ToastRootAui, ToastSeverityColor, ToastScale } from './use-recipe';

export type {
  ToastRootAui,
  ToastColor,
  ToastSeverityColor,
  ToastPaint,
  ToastScale,
  ToastShape,
} from './use-recipe';

// The Action/Close `aui` IS a Button's `aui` (they render real Buttons). Aliased for a stable public
// name + so the manager's `actionProps.aui` and the part props all speak the same Button vocabulary.
export type ToastActionAui = ButtonAui;
export type ToastCloseAui = ButtonAui;

// Base UI's manager stores `actionProps` as native button props. AtomicAUI renders that payload
// through `Toast.Action`, so the public manager type must accept the same `aui` leaf prop the real
// action part accepts. Runtime stays Base UI's manager; this is the AtomicAUI-facing type seam.
export interface ToastManagerActionProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'color'> {
  aui?: ToastActionAui;
}

export interface ToastObject<Data extends object = object>
  extends Omit<BaseToastObject<Data>, 'actionProps'> {
  actionProps?: ToastManagerActionProps | undefined;
}

export interface ToastManagerAddOptions<Data extends object = object>
  extends Omit<
    ToastObject<Data>,
    'id' | 'animation' | 'height' | 'ref' | 'limited' | 'updateKey'
  > {
  id?: string | undefined;
}

export type ToastManagerUpdateOptions<Data extends object = object> = Partial<
  Omit<ToastObject<Data>, 'id' | 'ref' | 'height' | 'transitionStatus' | 'limited' | 'updateKey'>
>;

export interface ToastManagerPromiseOptions<
  Value,
  Data extends object = object,
> {
  loading: string | ToastManagerUpdateOptions<Data>;
  success:
    | string
    | ToastManagerUpdateOptions<Data>
    | ((result: Value) => string | ToastManagerUpdateOptions<Data>);
  error:
    | string
    | ToastManagerUpdateOptions<Data>
    | ((error: unknown) => string | ToastManagerUpdateOptions<Data>);
}

export interface UseToastManagerReturnValue<Data extends object = object> {
  toasts: ToastObject<Data>[];
  add: <T extends Data = Data>(options: ToastManagerAddOptions<T>) => string;
  close: (toastId?: string) => void;
  update: <T extends Data = Data>(toastId: string, options: ToastManagerUpdateOptions<T>) => void;
  promise: <Value, T extends Data = Data>(
    promise: Promise<Value>,
    options: ToastManagerPromiseOptions<Value, T>,
  ) => Promise<Value>;
}

export interface ToastManager<Data extends object = object> {
  ' subscribe': (listener: (data: BaseToastManagerEvent) => void) => () => void;
  add: <T extends Data = Data>(options: ToastManagerAddOptions<T>) => string;
  close: (id?: string) => void;
  update: <T extends Data = Data>(id: string, updates: ToastManagerUpdateOptions<T>) => void;
  promise: <Value, T extends Data = Data>(
    promiseValue: Promise<Value>,
    options: ToastManagerPromiseOptions<Value, T>,
  ) => Promise<Value>;
}

export const useToastManager = ToastPrimitive.useToastManager as <
  Data extends object = object,
>() => UseToastManagerReturnValue<Data>;
export const createToastManager = ToastPrimitive.createToastManager as <
  Data extends object = object,
>() => ToastManager<Data>;

// ─── Toast.Provider / Toast.Portal — structural passthroughs ──────────────────
// The Provider hosts the manager context (timing/limit/global toastManager) and renders NO box —
// a thin wrapper so the part is named by its role and lives in the dot-namespace; all Base UI
// provider props pass straight through. The Portal moves the Viewport subtree to `document.body`
// (theming is then handled by the Viewport/Positioner identity re-stamp below). Neither takes `aui`.

export interface ToastProviderProps extends Omit<BaseToastProviderProps, 'toastManager'> {
  toastManager?: ToastManager | BaseToastManager | undefined;
}
function ToastProvider(props: ToastProviderProps): React.JSX.Element {
  return React.createElement(ToastPrimitive.Provider, props as BaseToastProviderProps);
}
ToastProvider.displayName = 'Toast.Provider';

export interface ToastPortalProps
  extends React.ComponentPropsWithoutRef<'div'>,
    React.RefAttributes<HTMLDivElement> {
  /** Portal container. Mirrors Base UI's FloatingPortalLite `container` surface. */
  container?: HTMLElement | null | React.RefObject<HTMLElement | null>;
}
const ToastPortal: React.ForwardRefExoticComponent<
  Omit<ToastPortalProps, 'ref'> & React.RefAttributes<HTMLDivElement>
> = React.forwardRef<HTMLDivElement, ToastPortalProps>(function ToastPortal(props, ref) {
  return React.createElement(ToastPrimitive.Portal as React.ElementType, { ref, ...props });
});
ToastPortal.displayName = 'Toast.Portal';

// ─── Toast.Viewport / Toast.Positioner — THE dual portal cascade re-stamp ─────
// A portaled overlay renders OUTSIDE the themed root (`[data-aui-brand][data-aui-theme]`), so the
// `--theme-*`/`--paint-*` rails never reach it → the toasts would paint UNSTYLED. Both hosts read
// the ambient identity via `useAuiIdentity()` (carried across the portal by React context) and
// RE-STAMP the same `data-aui-*` attrs, re-rooting the theme selector so the rails re-emit and
// inherit into the toast subtree (the exact lib/identity re-stamp Select.Positioner / Dropdown.
// Positioner use).
//
// WHY BOTH (vs Select/Dropdown, which only re-stamp the Positioner): Toast has TWO independent
// body-portaled hosts. The common path is the fixed STACK — `Toast.Viewport` (every standard toast
// flows through it). `Toast.Positioner` is the SEPARATE anchored path for manager entries that
// supply `positionerProps` (a toast pinned to an element, like a popover). A given toast passes
// through EXACTLY ONE of the two, so each must independently carry the re-stamp; re-stamping only
// the Positioner (as Select/Dropdown do) would leave every fixed-stack toast unthemed.
//
// Precedence: consumer-supplied `data-aui-*` spreads FIRST (`...rest`), then the identity attrs
// LAST, so the ambient identity WINS (the re-stamp is authoritative — the toast must match its
// themed root). Both are markers (NOT `.aui-frame`) — just re-stamp hosts; the Root owns the paint.
const ToastViewport = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ToastPrimitive.Viewport>
>(function ToastViewport({ className, ...rest }, ref) {
  const identity = useAuiIdentity();
  const dataAttrs = identityToDataAttrs(identity);
  return React.createElement(ToastPrimitive.Viewport as React.ElementType, {
    ref,
    ...rest,
    ...dataAttrs,
    className: prependMarkerClassName('aui-toast-viewport', className),
  });
});
ToastViewport.displayName = 'Toast.Viewport';
export type ToastViewportProps = React.ComponentProps<typeof ToastViewport>;

const ToastPositioner = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ToastPrimitive.Positioner>
>(function ToastPositioner({ className, ...rest }, ref) {
  const identity = useAuiIdentity();
  const dataAttrs = identityToDataAttrs(identity);
  return React.createElement(ToastPrimitive.Positioner as React.ElementType, {
    ref,
    ...rest,
    ...dataAttrs,
    className: prependMarkerClassName('aui-toast-positioner', className),
  });
});
ToastPositioner.displayName = 'Toast.Positioner';
export type ToastPositionerProps = React.ComponentProps<typeof ToastPositioner>;

// ─── Marker-only content parts (tier-1 cascade-readers, CSS in _state-cascade.scss) ──
// Content / Title / Description / Icon / Arrow are box-LESS structural parts — pure tier-1 markers
// (createAtomicPart, NO `aui`, NO recipe). A `defineLeaf` would hard-emit an `.aui-frame` + a paint
// cell — WRONG for a flex wrapper, a text run, or a decorative diamond (the Icon/Dropdown.Arrow
// lesson). The Root surface owns the single paint cell; these parts read it via the cascade — text
// inherits `currentColor` (the Root's resolved content color), the icon glyph the same. All
// appearance lives in `_state-cascade.scss` (Content = the flex row; Title = bold; Description =
// regular; Arrow = a rotated diamond inheriting the Root's `--aui-bg`).
const ToastContent = createAtomicPart<React.ComponentProps<typeof ToastPrimitive.Content>>(
  ToastPrimitive.Content,
  'aui-toast-content',
);
ToastContent.displayName = 'Toast.Content';
export type ToastContentProps = React.ComponentProps<typeof ToastContent>;

const ToastTitle = createAtomicPart<React.ComponentProps<typeof ToastPrimitive.Title>>(
  ToastPrimitive.Title,
  'aui-toast-title',
);
ToastTitle.displayName = 'Toast.Title';
export type ToastTitleProps = React.ComponentProps<typeof ToastTitle>;

const ToastDescription = createAtomicPart<React.ComponentProps<typeof ToastPrimitive.Description>>(
  ToastPrimitive.Description,
  'aui-toast-description',
);
ToastDescription.displayName = 'Toast.Description';
export type ToastDescriptionProps = React.ComponentProps<typeof ToastDescription>;

// Root-seeded defaults the composed children inherit. The Root resolves its chroma (explicit
// `aui.color`, else the `toast.type` severity, else `info`) + scale ONCE and provides them here so
// the leading icon glyph (scale) AND the Action/Close buttons (color + scale) inherit them whether
// the content is auto-rendered or hand-composed.
interface ToastButtonDefaults {
  color: ButtonColor;
  scale: ToastScale;
}
const ToastButtonContext = React.createContext<ToastButtonDefaults | null>(null);

export interface ToastIconProps
  extends Omit<React.ComponentPropsWithoutRef<'span'>, 'color'>,
    React.RefAttributes<HTMLSpanElement> {
  /** Leading severity glyph name — renders the boxed `ContainedIcon` glyph under TOAST's OWN
   *  namespace (per the namespace convention; no foreign `<ContainedIcon>` child needed). Omit
   *  `name` and pass children for full manual control. */
  name?: string;
  /** Icon identity — forwarded to the boxed glyph. */
  family?: IconFamily;
  layer?: IconLayer;
  weight?: IconWeight;
  /** Glyph appearance (scale, etc.) forwarded to the boxed icon. */
  aui?: ContainedIconAui;
}
// Toast.Icon is a host-namespaced glyph (mirrors Field.Icon / Checkbox.Icon): given `name` it
// auto-renders the boxed severity ContainedIcon; given children it renders them (full control); the
// Root's auto-content path passes the severity glyph as children, so that path is unaffected.
const ToastIcon = React.forwardRef<HTMLSpanElement, ToastIconProps>(function ToastIcon(
  { name, family, layer, weight, aui, children, className, ...rest },
  ref,
) {
  // Scale CASCADES from the Toast Root (ToastButtonContext) like the auto severity glyph + the
  // Action/Close buttons do; the consumer's own `aui.scale` overrides it.
  const ctx = React.useContext(ToastButtonContext);
  const glyph =
    children !== undefined && children !== null
      ? children
      : name !== undefined
        ? (
            <ContainedIcon
              name={name}
              family={family}
              layer={layer}
              weight={weight}
              aria-hidden
              aui={{ scale: ctx?.scale, ...aui }}
            />
          )
        : null;
  return React.createElement(
    'span',
    {
      ref,
      ...rest,
      className: ['aui-toast-icon', typeof className === 'string' ? className : undefined]
        .filter(Boolean)
        .join(' '),
    },
    glyph,
  );
});
ToastIcon.displayName = 'Toast.Icon';

const ToastArrow = createAtomicPart<React.ComponentProps<typeof ToastPrimitive.Arrow>>(
  ToastPrimitive.Arrow,
  'aui-toast-arrow',
);
ToastArrow.displayName = 'Toast.Arrow';
export type ToastArrowProps = React.ComponentProps<typeof ToastArrow>;

// ─── Toast.Action / Toast.Close — composed real <Button> parts ────────────────
// Both render the REAL AtomicAUI <Button> via Base UI's `render` prop: Base UI keeps the behavior
// (Action runs its action handler; Close dismisses the toast) and the ARIA, while the VISUAL is
// genuinely our Button — same recipe, state layer, and look as a standalone <Button>, so they can
// never drift from it. NOTE: Base UI's `Toast.Action` does NOT auto-close the toast — only
// `Toast.Close` calls the manager's close; an action that should also dismiss must close it itself.
// Each button's defaults are: `paint: 'solid'` (the action/close are solid CTAs on the card), and
// COLOR + SCALE INHERITED from the Root via `ToastButtonContext` (so a HAND-COMPOSED
// `<Toast.Action>`/`<Toast.Close>` reads as part of the same toast — same chroma/size as the card —
// not a stray `primary`/`md` button). Action pins `profile: 'compact'`, Close pins `square-compact`.
// A consumer `aui` overrides any of these. Outside a Toast (no provider) they fall back to
// `primary`/`solid`/`md`. A thin `aui-toast-action` / `aui-toast-close` marker is added ONLY for
// layout (flex placement in the content row); all APPEARANCE comes from the Button recipe.

export interface ToastActionProps
  extends Omit<React.ComponentProps<typeof ToastPrimitive.Action>, 'color' | 'render' | 'className'> {
  aui?: ToastActionAui;
  /** Layout/extra classes forwarded to the composed Button (string only — not Base UI's fn form). */
  className?: string;
}

// Base UI's `render` clones the given <Button> and merges its behavior props (onClick, type, ref,
// data-state, …) onto it, with the Action's `children` as the button label. So this IS a real Button
// that also runs the action's `onClick` (it does NOT dismiss — see the note above).
const ToastAction = React.forwardRef<HTMLButtonElement, ToastActionProps>(function ToastAction(
  { aui, className, children, type, ...rest },
  ref,
) {
  // Color + scale inherit from the Root (ToastButtonContext); paint is a solid CTA; profile compact.
  // A standalone Action (no Toast Root) falls back to primary/md. Consumer `aui` overrides all.
  const ctx = React.useContext(ToastButtonContext);
  const actionAui: ButtonAui = {
    color: ctx?.color ?? 'primary',
    paint: 'solid',
    scale: ctx?.scale ?? (TOAST_ROOT_VOCAB.defaults.scale as ToastScale),
    shape: 'soft',
    profile: 'compact',
    ...aui,
  };
  // Layout marker + any consumer class → a plain string for the composed <Button> (Button does its
  // own recipe merge internally; this marker only positions the button in the flex content row). The
  // `typeof === 'string'` guard hardens against a JS caller slipping Base UI's function-className form.
  const buttonClassName =
    typeof className === 'string' && className ? `aui-toast-action ${className}` : 'aui-toast-action';
  return (
    <ToastPrimitive.Action
      ref={ref}
      type={type ?? 'button'}
      {...rest}
      // After the rest spread so a runtime `render` in rest can never silently replace the
      // composed Button (the prop is already Omit-ted from the public type).
      render={<Button aui={actionAui} className={buttonClassName} />}
    >
      {children}
    </ToastPrimitive.Action>
  );
});
ToastAction.displayName = 'Toast.Action';

export interface ToastCloseProps
  extends Omit<React.ComponentProps<typeof ToastPrimitive.Close>, 'color' | 'render' | 'className'> {
  aui?: ToastCloseAui;
  /** Layout/extra classes forwarded to the composed Button (string only — not Base UI's fn form). */
  className?: string;
}

// The default dismiss glyph: a bare <Icon name="xmark">. The Close Button IS the square box (a
// `square-compact` profile), so a plain glyph — NOT a ContainedIcon — is the right fit; it inherits
// the Button's resolved content color through the normal cascade (white on a solid card, the chroma
// on a text/tonal card), so no `color: inherit` hack is needed. Sized by the Close's resolved scale.
function defaultCloseIcon(scale: ToastScale): React.ReactElement {
  return <Icon name="xmark" aria-hidden aui={{ scale }} />;
}

// Toast.Close renders the real <Button> as a `square-compact` icon button (the profile is pinned, but
// a consumer `aui` can override it). It supplies the default xmark glyph + the `Dismiss notification`
// aria-label (the button is icon-only, so it MUST carry an accessible name; a consumer overrides
// either by passing `children` or an explicit `aria-label`). `type` defaults to `'button'`.
const ToastClose = React.forwardRef<HTMLButtonElement, ToastCloseProps>(function ToastClose(
  { aui, className, children, type, 'aria-label': ariaLabel, ...rest },
  ref,
) {
  // ONE resolved scale drives BOTH the Button frame AND the glyph (else a bare <Toast.Close /> gets a
  // mismatched frame/glyph sizing). `scale` goes LAST so it always equals
  // `closeScale` (which already honours a consumer `aui.scale`).
  // Color + scale inherit from the Root (ToastButtonContext); paint solid; the icon-only Close keeps
  // its `square-compact` profile. Standalone (no Root) falls back to primary, and scale to `sm`.
  const ctx = React.useContext(ToastButtonContext);
  const closeScale: ToastScale = (aui?.scale as ToastScale | undefined) ?? ctx?.scale ?? 'sm';
  const closeAui: ButtonAui = {
    color: ctx?.color ?? 'primary',
    paint: 'solid',
    shape: 'soft',
    profile: 'square-compact',
    ...aui,
    scale: closeScale,
  };
  const buttonClassName =
    typeof className === 'string' && className ? `aui-toast-close ${className}` : 'aui-toast-close';
  return (
    <ToastPrimitive.Close
      ref={ref}
      type={type ?? 'button'}
      aria-label={ariaLabel ?? 'Dismiss notification'}
      {...rest}
      // After the rest spread so a runtime `render` in rest can never silently replace the
      // composed Button (the prop is already Omit-ted from the public type).
      render={<Button aui={closeAui} className={buttonClassName} />}
    >
      {children ?? defaultCloseIcon(closeScale)}
    </ToastPrimitive.Close>
  );
});
ToastClose.displayName = 'Toast.Close';

// ─── Toast.Root — elevated severity surface + optional auto content (main factory) ──
// The per-toast card: a tier-3 `.aui-frame` surface via the MAIN factory, recipe ONLY
// (useToastRootRecipe) — NOTABLY NO `useStateLayer`. A toast is a PASSIVE notification surface: it
// has no hover/press/focus affordance of its own (you don't click the card; you click the action or
// close button INSIDE it). So a state-layer overlay would be meaningless paint — exactly the reason
// Select.Popup / Dropdown.Popup also skip useStateLayer (a surface, not a control). The recipe gives
// the bordered severity surface (info/solid/md/soft) + the default `elevation: 4` float (pinned in
// TOAST_ROOT_VOCAB.defaults → `aui-elevation-4`, the shared overlay float level).
const _ToastRoot = createAtomicComponent(ToastPrimitive.Root, {
  extensions: [useToastRootRecipe],
});

export interface ToastRootProps
  extends Omit<React.ComponentProps<typeof ToastPrimitive.Root>, 'color' | 'toast'> {
  toast: ToastObject;
  aui?: ToastRootAui;
  /** Leading visual. `undefined` renders the severity ContainedIcon; `false` suppresses it. */
  icon?: React.ReactNode | false;
  /** Action shortcut. `undefined` uses `toast.actionProps?.children`; `false` suppresses it. */
  action?: React.ReactNode | false;
  /** Close shortcut. `undefined` renders the default compact xmark button; `false` suppresses it. */
  close?: React.ReactNode | false;
}

// The leading severity glyph map: one conventional FontAwesome icon per severity color (the same
// circle-info / circle-check / triangle-exclamation / circle-xmark set the ADC Kit toast uses).
// Keyed on the SEVERITY color (info/success/warning/error), NOT the raw `aui.color` union — a
// non-severity color (e.g. `primary`/`surface`) has no canonical glyph, so the auto-icon falls
// back to `info` below rather than emitting a wrong glyph.
const TOAST_ICON_BY_COLOR: Record<ToastSeverityColor, string> = {
  info: 'circle-info',
  success: 'circle-check',
  warning: 'triangle-exclamation',
  error: 'circle-xmark',
};

// Resolve the auto leading icon: map the toast's render-state `type` → a severity color → its glyph.
// `toastTypeToColor` returns `undefined` for a non-severity `type`, so we fall back to `info` (the
// neutral notification glyph) — never an invalid lookup. Scale feeds the ContainedIcon's own tier.
function defaultSeverityIcon(type: unknown, scale: ToastScale): React.ReactElement {
  const color = toastTypeToColor(type) ?? 'info';
  return <ContainedIcon name={TOAST_ICON_BY_COLOR[color]} aria-hidden aui={{ scale }} />;
}

// Base UI's `toast.title`/`toast.description` are `ReactNode | undefined`. We render a Title/
// Description part ONLY when the field is genuinely renderable (not `undefined`/`null`) so an
// icon-or-description-only toast doesn't emit an empty heading/paragraph that disturbs the layout.
const hasRenderableNode = (node: React.ReactNode) => node !== undefined && node !== null;

// ─── renderAutoToastContent — the ergonomic ADC-Kit auto layout ───────────────
// WHY IT EXISTS: a manager-driven toast carries its content as DATA on the `toast` object
// (`toast.title`, `toast.description`, `toast.actionProps`) — NOT as JSX children. So the common
// case (`manager.add({ title, description, type })`) has no children to render. This function reads
// that data and assembles the canonical ADC anatomy — leading severity icon → copy column (title +
// description) → optional action → compact close — so the consumer never has to hand-compose
// `<Toast.Content><Toast.Icon/>…`. Composed `children` OPT OUT entirely (see ToastRoot below): an
// advanced consumer who passes children owns the subtree and this function is never called.
//
// The three slot props each have `false`-suppress / `undefined`-default semantics (mirroring the
// Dropdown.Trigger `chevron` convention):
//   • icon   — `undefined` → the severity ContainedIcon (auto); `false` → no icon span; a node → that node.
//   • action — `undefined` → render Base UI's `toast.actionProps.children` (if any); `false` → no action;
//              a node → that node (and `actionProps` is only rendered as an action AT ALL when it exists).
//   • close  — `undefined` → the default compact xmark button; `false` → no close button; a node → custom glyph.
function renderAutoToastContent({
  toast,
  scale,
  buttonAui,
  icon,
  action,
  close,
}: {
  toast: ToastObject;
  scale: ToastScale;
  // The Action + Close `aui` derived from the Root (shared color; paint follows the card). The Action
  // merges any consumer `actionProps.aui` ON TOP (consumer override wins); the Close pins its own
  // `square-compact` profile internally.
  buttonAui: ButtonAui;
  icon: React.ReactNode | false | undefined;
  action: React.ReactNode | false | undefined;
  close: React.ReactNode | false | undefined;
}) {
  const actionProps = toast.actionProps;
  const { aui: actionAui } = actionProps ?? {};
  const shouldRenderAction = action !== false && (actionProps !== undefined || action !== undefined);
  const shouldRenderClose = close !== false;
  const shouldRenderIcon = icon !== false;

  return (
    <ToastContent>
      {shouldRenderIcon && (
        <ToastIcon aria-hidden>
          {icon === undefined ? defaultSeverityIcon(toast.type, scale) : icon}
        </ToastIcon>
      )}
      <span className="aui-toast-copy">
        {hasRenderableNode(toast.title) && <ToastTitle>{toast.title}</ToastTitle>}
        {hasRenderableNode(toast.description) && (
          <ToastDescription>{toast.description}</ToastDescription>
        )}
      </span>
      {shouldRenderAction && (
        action === undefined ? (
          // Base UI's Toast.Action already merges toast.actionProps from context; spreading those
          // props here would compose duplicate handlers and can make actionProps.children override
          // a deliberate custom action node.
          <ToastAction aui={{ ...buttonAui, ...actionAui }} />
        ) : (
          action
        )
      )}
      {shouldRenderClose && (
        <ToastClose aui={buttonAui}>{close === undefined ? undefined : close}</ToastClose>
      )}
    </ToastContent>
  );
}

// The Root wrapper: renders the elevated card and, by default, the auto ADC content. The opt-out is
// a STRICT `children !== undefined` check — passing ANY children (even a fragment) routes around the
// auto layout entirely, so an advanced consumer can hand-compose `<Toast.Content>…` while still
// getting the Root's recipe surface. `icon`/`action`/`close` are structural shortcut props (NOT
// `aui` axes) — destructured out so they never spread to the DOM — feeding the auto renderer's
// suppress/default semantics. `toast` is the Base UI manager entry (required) and threads through.
const ToastRoot = React.forwardRef<HTMLDivElement, ToastRootProps>(function ToastRoot(
  { children, toast, icon, action, close, ...rest },
  ref,
) {
  // Read the resolved Root scale (`aui.scale`, default `md`) so the auto icon + copy rail are
  // tier-matched. Composed children opt out of the auto layout completely (strict `!== undefined`).
  const rootAui = (rest as { aui?: ToastRootAui }).aui;
  const scale: ToastScale = rootAui?.scale ?? (TOAST_ROOT_VOCAB.defaults.scale as ToastScale);

  // Derive the Action/Close `aui` from the Root so they read as part of the same toast:
  //   • COLOR — both share the Root's resolved color (explicit `aui.color`, else the severity from
  //     `toast.type`, else `info`).
  //   • PAINT — follows the card: a SOLID card → SOLID buttons (cohesive, same chroma); a quieter
  //     `tonal`/`text`/other card → `text` buttons (so they don't fight a soft surface).
  //   • SCALE — follows the Root's resolved scale by default, so the buttons size WITH the toast
  //     (a `lg` toast gets `lg` buttons). A consumer `actionProps.aui.scale` still overrides.
  // The Close pins its own `square-compact` profile on top of this.
  const rootColor: ButtonColor = (rootAui?.color as ButtonColor | undefined) ?? toastTypeToColor(toast.type) ?? 'info';
  // Action/Close are SOLID CTAs (a consistent filled affordance on any card paint) that inherit the
  // Root's resolved chroma + scale. The auto path passes this explicit `buttonAui`; hand-composed
  // parts read the same color/scale from `ToastButtonContext` (provided below).
  const buttonAui: ButtonAui = { color: rootColor, paint: 'solid', scale };

  const content =
    children !== undefined
      ? children
      : renderAutoToastContent({ toast, scale, buttonAui, icon, action, close });

  return React.createElement(
    _ToastRoot as React.ElementType,
    { ref, toast, ...rest },
    React.createElement(
      ToastButtonContext.Provider,
      { value: { color: rootColor, scale } },
      content,
    ),
  );
});
ToastRoot.displayName = 'Toast';

// ─── Assemble + the typing seam (mirror Select/Dropdown) ──────────────────────
// `Toast` IS the per-toast Root — exactly like `Select` IS its Root and `Dropdown` IS its menu
// Root. There is NO `.Root` static: the root is the export itself, so `<Toast toast={toast}>` is
// the canonical call and `Toast.Root` would be a redundant self-alias (a second name for the same
// component). The other parts hang off the dot-namespace; a consumer reaches them as
// `Toast.Viewport`, `Toast.Action`, etc.
//
// LOCKSTEP CONTRACT: the statics in THIS interface and the keys in the `Object.assign` below MUST
// stay 1:1 — a drift (a static present in one but not the other) is a REAL bug (the consumer would
// see a part the runtime doesn't expose, or vice-versa). Same note as Select/Dropdown. When adding
// a part: add it to BOTH the interface and the assign, together.
interface ToastComponent extends React.ForwardRefExoticComponent<
  Omit<ToastRootProps, 'ref'> & React.RefAttributes<HTMLDivElement>
> {
  Provider: typeof ToastProvider;
  Portal: typeof ToastPortal;
  Viewport: typeof ToastViewport;
  Positioner: typeof ToastPositioner;
  Content: typeof ToastContent;
  Icon: typeof ToastIcon;
  Title: typeof ToastTitle;
  Description: typeof ToastDescription;
  Action: typeof ToastAction;
  Close: typeof ToastClose;
  Arrow: typeof ToastArrow;
}

// Compound component (dot-namespace). Keep these statics in lockstep with the `ToastComponent`
// interface above — a drift is a real bug. `Toast` is the Root (no `.Root` self-alias; mirror
// Select/Dropdown).
export const Toast = Object.assign(ToastRoot, {
  Provider: ToastProvider,
  Portal: ToastPortal,
  Viewport: ToastViewport,
  Positioner: ToastPositioner,
  Content: ToastContent,
  Icon: ToastIcon,
  Title: ToastTitle,
  Description: ToastDescription,
  Action: ToastAction,
  Close: ToastClose,
  Arrow: ToastArrow,
}) as ToastComponent;

export default Toast;
