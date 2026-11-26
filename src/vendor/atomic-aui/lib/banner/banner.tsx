import * as React from 'react';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { prependMarkerClassName } from '../../core/recipe/prepend-marker-class-name';
import { Button, type ButtonAui, type ButtonColor, type ButtonScale } from '../button';
import { ContainedIcon, Icon, type ContainedIconAui, type IconFamily, type IconLayer, type IconWeight } from '../icon';
import { Type, type TypeProps } from '../type';
import { BANNER_VOCAB, useBannerRecipe, type BannerAui } from './use-recipe';

export interface BannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Appearance. `color` is the banner tone (default `surface-alt`); `scale` is its size (`xs` is slim). */
  aui?: BannerAui;
  /** Controlled visibility. When omitted, `defaultOpen` supplies the initial visibility. */
  open?: boolean;
  defaultOpen?: boolean;
  /** Called with the next visibility when the banner is dismissed. */
  onOpenChange?: (open: boolean) => void;
}

// The Root resolves its chroma + scale once; Close and the Buttons inside Actions inherit them so
// they read as part of the same banner (the Toast pattern).
interface BannerContextValue {
  dismiss: () => void;
  color: ButtonColor;
  scale: ButtonScale;
}
const BannerContext = React.createContext<BannerContextValue | null>(null);
const _Banner = createAtomicComponent('div', { extensions: [useBannerRecipe] });

function useBannerContext(): BannerContextValue {
  const context = React.useContext(BannerContext);
  if (!context) throw new Error('Banner parts must be rendered inside Banner');
  return context;
}

/** Moves keyboard focus to the next available control before the dismissed banner unmounts. */
type FocusTarget = { getClientRects(): { length: number }; focus(): void };
type FocusRoot = {
  contains(node: unknown): boolean;
  compareDocumentPosition(node: unknown): number;
};
type FocusDocument = {
  activeElement: unknown;
  querySelectorAll(selector: string): Iterable<FocusTarget>;
};
function findFocusTarget(root: HTMLDivElement | null): { focus(): void } | undefined {
  const document = (globalThis as { document?: FocusDocument }).document;
  if (!root || !document) return undefined;
  const host = root as unknown as FocusRoot;
  if (!host.contains(document.activeElement)) return undefined;
  const controls = Array.from(document.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )).filter((element) => !host.contains(element) && element.getClientRects().length > 0);
  const next = controls.find((element) => Boolean(host.compareDocumentPosition(element) & 4));
  return next ?? controls.at(-1);
}

const BannerBase = React.forwardRef<HTMLDivElement, BannerProps>(function Banner(
  {
    aui,
    open,
    defaultOpen = true,
    onOpenChange,
    onBlur,
    role = 'region',
    'aria-label': ariaLabel = 'Announcement',
    children,
    ...rest
  },
  forwardedRef,
) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const ref = React.useCallback((node: HTMLDivElement | null) => {
    rootRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  }, [forwardedRef]);
  const focusTargetRef = React.useRef<{ focus(): void } | undefined>(undefined);
  const dismiss = React.useCallback(() => {
    focusTargetRef.current = findFocusTarget(rootRef.current);
    if (open === undefined) setInternalOpen(false);
    onOpenChange?.(false);
  }, [open, onOpenChange]);
  const color: ButtonColor = aui?.color ?? (BANNER_VOCAB.defaults.color as ButtonColor);
  const scale: ButtonScale = aui?.scale ?? (BANNER_VOCAB.defaults.scale as ButtonScale);
  const context = React.useMemo(() => ({ dismiss, color, scale }), [dismiss, color, scale]);
  const isOpen = open ?? internalOpen;
  React.useEffect(() => {
    if (!isOpen) focusTargetRef.current?.focus();
    focusTargetRef.current = undefined;
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <BannerContext.Provider value={context}>
      <_Banner
        {...rest}
        ref={ref}
        onBlur={(event: React.FocusEvent<HTMLDivElement>) => { focusTargetRef.current = undefined; onBlur?.(event); }}
        role={role}
        aria-label={ariaLabel}
        aui={aui}
        data-aui-banner-color={color}
        data-aui-banner-scale={scale}
      >
        {children}
      </_Banner>
    </BannerContext.Provider>
  );
});
BannerBase.displayName = 'Banner';

export interface BannerIconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color' | 'children'> {
  name?: string;
  family?: IconFamily;
  layer?: IconLayer;
  weight?: IconWeight;
  aui?: ContainedIconAui;
}
const BannerIcon = React.forwardRef<HTMLSpanElement, BannerIconProps>(function BannerIcon(
  { name = 'bullhorn', className, ...rest }, ref,
) {
  return <ContainedIcon ref={ref} name={name} className={prependMarkerClassName('aui-banner-icon', className) as string | undefined} {...rest} />;
});
BannerIcon.displayName = 'Banner.Icon';

export type BannerTitleProps = TypeProps;
const BannerTitle = React.forwardRef<HTMLElement, BannerTitleProps>(function BannerTitle(
  { role = 'l2', as = 'strong', className, ...rest }, ref,
) {
  return <Type ref={ref} role={role} as={as} className={prependMarkerClassName('aui-banner-title', className) as string | undefined} {...rest} />;
});
BannerTitle.displayName = 'Banner.Title';

export type BannerDescriptionProps = TypeProps;
const BannerDescription = React.forwardRef<HTMLElement, BannerDescriptionProps>(function BannerDescription(
  { role = 'p2', className, ...rest }, ref,
) {
  return <Type ref={ref} role={role} className={prependMarkerClassName('aui-banner-description', className) as string | undefined} {...rest} />;
});
BannerDescription.displayName = 'Banner.Description';

// A Button in Actions takes the banner color + scale. A solid Button reads as flat on the banner
// (its content is the color's on-color); a quieter paint (text, tonal, ...) keeps that on-color as
// its foreground so a secondary action stays legible on any banner color, like the Close glyph.
function bannerActionAui(ctx: BannerContextValue, own: ButtonAui | undefined): ButtonAui {
  const paint = own?.paint ?? 'solid';
  const base: ButtonAui = { color: ctx.color, paint: 'solid', scale: ctx.scale };
  if (paint !== 'solid') {
    base.sx = { foreground: `on-${own?.color ?? ctx.color}` } as ButtonAui['sx'];
  }
  return { ...base, ...own, sx: { ...base.sx, ...own?.sx } };
}

export interface BannerActionsProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'div' | 'form';
}
const BannerActions = React.forwardRef<HTMLElement, BannerActionsProps>(function BannerActions(
  { as: Element = 'div', className, children, ...rest }, ref,
) {
  const ctx = React.useContext(BannerContext);
  // Direct <Button> children take the banner's color + scale (solid, like Toast's Action) so they
  // match its background; a Button's own `aui` still wins. Other children (e.g. Input) pass through.
  const content = ctx
    ? React.Children.map(children, (child) =>
        React.isValidElement<{ aui?: ButtonAui }>(child) && child.type === Button
          ? React.cloneElement(child, { aui: bannerActionAui(ctx, child.props.aui) })
          : child)
    : children;
  return <Element ref={ref as never} className={prependMarkerClassName('aui-banner-actions', className) as string | undefined} {...rest}>{content}</Element>;
});
BannerActions.displayName = 'Banner.Actions';

export interface BannerCloseProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'color'> {
  /** Glyph name (default `xmark`). */
  name?: string;
  aui?: ButtonAui;
}
// Same recipe as Toast.Close: a real square-compact Button holding a bare Icon, so the glyph takes
// the Button's on-color for the banner color.
const BannerClose = React.forwardRef<HTMLButtonElement, BannerCloseProps>(function BannerClose(
  { name = 'xmark', 'aria-label': label = 'Dismiss announcement', className, onClick, aui, type = 'button', children, ...rest }, ref,
) {
  const { dismiss, color, scale } = useBannerContext();
  const closeScale = (aui?.scale as ButtonScale | undefined) ?? scale;
  return (
    <Button
      {...rest}
      ref={ref}
      type={type}
      aria-label={label}
      className={prependMarkerClassName('aui-banner-close', className) as string | undefined}
      aui={{ color, paint: 'solid', shape: 'soft', profile: 'square-compact', ...aui, scale: closeScale }}
      onClick={(event) => { onClick?.(event); if (!event.defaultPrevented) dismiss(); }}
    >
      {children ?? <Icon name={name} aria-hidden aui={{ scale: closeScale }} />}
    </Button>
  );
});
BannerClose.displayName = 'Banner.Close';

export interface BannerCountdownProps extends Omit<TypeProps, 'children'> {
  endsAt: Date | number;
}
const BannerCountdown = React.forwardRef<HTMLElement, BannerCountdownProps>(function BannerCountdown(
  { endsAt, className, ...rest }, ref,
) {
  const deadline = endsAt instanceof Date ? endsAt.getTime() : endsAt;
  const [now, setNow] = React.useState(() => Date.now());
  const expired = now >= deadline;
  React.useEffect(() => {
    if (expired) return undefined;
    const timer = globalThis.setInterval(() => setNow(Date.now()), 1000);
    return () => globalThis.clearInterval(timer);
  }, [expired]);
  const seconds = Math.max(0, Math.ceil((deadline - now) / 1000));
  const formatted = [Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), seconds % 60]
    .map((value) => String(value).padStart(2, '0')).join(':');
  return (
    <Type ref={ref} role="l2" as="time"
      className={prependMarkerClassName('aui-banner-countdown', className) as string | undefined} {...rest}>
      {formatted}
    </Type>
  );
});
BannerCountdown.displayName = 'Banner.Countdown';

export const Banner = Object.assign(BannerBase, {
  Icon: BannerIcon,
  Title: BannerTitle,
  Description: BannerDescription,
  Actions: BannerActions,
  Close: BannerClose,
  Countdown: BannerCountdown,
});
