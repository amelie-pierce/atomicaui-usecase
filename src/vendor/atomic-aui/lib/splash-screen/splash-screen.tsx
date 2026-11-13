// modules/design/atomic-aui/src/lib/splash-screen/splash-screen.tsx
//
// SplashScreen — a passive, content-driven boot overlay. The NEW (2026-07-05) simplified design is a
// LIGHT rounded ELEVATED card of exactly TWO bands (Figma ADC Kit node 5272:1688):
//   1. a HERO image band — a single consumer-supplied `<img>` filling the card width (logo, title,
//      badges, copyright are all baked INTO the artwork), radius-clipped to the card top, reserving its
//      box via `aspect-ratio` (no layout shift while it loads); and
//   2. a bottom STRIP — the shipped indeterminate Progress bar + a left/right Status row.
// Every surface paints through `.aui-*` classes + `--theme-*`/`--p-*` role tokens ONLY, so it follows
// the ambient AuiIdentityProvider (brand/theme/typeface) with zero hex, zero font/shadow literals.
//
// Anatomy (all slots optional; the content-driven splash never auto-renders — the consumer composes
// what it wants):
//   • SplashScreen (Root) — fixed-inset overlay scrim, max z, grid-centered; `role="status"`
//     `aria-live="polite"`; OWNS the show/hold/exit timing (open + minVisibleMs + anchor +
//     onExitComplete, §3.1) and the bootstrap handoff (§3.2). Full `.aui-frame` leaf (backdrop).
//   • SplashScreen.Card — the light elevated two-band surface (full `.aui-frame` leaf).
//   • SplashScreen.Hero — the consumer image band (a decorative `<img>`; reserves its box via
//     aspect-ratio, radius-clipped to the card top).
//   • SplashScreen.Footer — the transparent bottom strip (a plain marker — reads the card surface).
//   • SplashScreen.Progress — COMPOSES the shipped DS Progress (indeterminate, profile progress).
//   • SplashScreen.Status — a left/right meta row (`start`/`end`, SM-scale l3 type, space-between).
//
// BREAKING vs the prior build: the dark-hero content parts (Logo/Title/Subtitle/Badges/Badge/Art), the
// Card `theme` island prop, and the Logo `plate` prop are REMOVED — the artwork carries all of it now,
// and no ADC consumer remains (the ADC startup splash is the generated bootstrap twin, not this
// DS-generic component). See the consume-doc `wiki/component-classes/splash-screen.md`.
import * as React from 'react';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { prependMarkerClassName } from '../../core/recipe/prepend-marker-class-name';
import { Progress, type ProgressProps } from '../progress';
import { Type } from '../type';
import {
  useSplashScreenRecipe,
  useSplashScreenCardRecipe,
  SPLASH_SCREEN_DEFAULT_MIN_VISIBLE_MS,
  SPLASH_SCREEN_EXIT_MS,
} from './use-recipe';
import type { SplashScreenAui, SplashScreenCardAui } from './use-recipe';

export {
  SPLASH_SCREEN_VOCAB,
  SPLASH_SCREEN_CARD_VOCAB,
  SPLASH_SCREEN_SX_AXES,
  SPLASH_SCREEN_DEFAULT_SCALE,
  SPLASH_SCREEN_DEFAULT_MIN_VISIBLE_MS,
  SPLASH_SCREEN_EXIT_MS,
  useSplashScreenRecipe,
  useSplashScreenCardRecipe,
} from './use-recipe';
export type {
  SplashScreenAui,
  SplashScreenCardAui,
  SplashScreenColor,
  SplashScreenPaint,
  SplashScreenScale,
  SplashScreenProfile,
  SplashScreenShape,
  SplashScreenElevation,
} from './use-recipe';

// ─── Timing helpers (§3.1) ────────────────────────────────────────────────────────────────────────
// `performance.now()` is relative to `performance.timeOrigin` (navigation start), so for the default
// `anchor='navigation'` the elapsed-since-page-load IS `performance.now()` — no timeOrigin arithmetic
// needed. jsdom provides both; the Date.now fallback covers a stray environment with neither.
function perfNow(): number {
  return typeof performance !== 'undefined' && typeof performance.now === 'function'
    ? performance.now()
    : Date.now();
}

// The lib is compiled DOM-lib-free (SSR-safe — `tsconfig.base.json` `lib: ["es2022"]`; Base UI owns
// the DOM), so `document`/`requestAnimationFrame` are reached structurally through `globalThis` with
// a minimal shape — no DOM `lib` dependency, no `any`. The bootstrap handoff (§3.2) is the only DOM
// touch the component makes; everything else paints through React + the recipe classes.
interface SplashBootstrapNode {
  remove(): void;
}
interface SplashHostGlobals {
  document?: { querySelector(selectors: string): SplashBootstrapNode | null };
  requestAnimationFrame?: (callback: () => void) => number;
}
const hostGlobals = globalThis as unknown as SplashHostGlobals;

/** Schedule after the next paint frame (jsdom-safe: falls back to a 0ms timer when there is no
 *  `requestAnimationFrame`). */
function nextFrame(callback: () => void): void {
  if (typeof hostGlobals.requestAnimationFrame === 'function') {
    hostGlobals.requestAnimationFrame(callback);
  } else {
    setTimeout(callback, 0);
  }
}

type SplashPhase = 'visible' | 'exiting' | 'closed';

// ─── SplashScreen.Card — the light elevated two-band surface ──────────────────────────────────────
const _SplashCard = createAtomicComponent('div', {
  extensions: [useSplashScreenCardRecipe],
});

export interface SplashScreenCardProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'color'> {
  /** The full frame surface for the card. Defaults: surface / solid / sm / soft / 6 (a light elevated
   *  surface, Figma node 5272:1688; see use-recipe.ts). */
  aui?: SplashScreenCardAui;
}

const SplashCard = React.forwardRef<HTMLDivElement, SplashScreenCardProps>(function SplashScreenCard(
  props,
  ref,
) {
  return React.createElement(_SplashCard as React.ElementType, { ref, ...props });
});
SplashCard.displayName = 'SplashScreen.Card';

// ─── SplashScreen.Hero — the consumer image band ──────────────────────────────────────────────────
// A single `<img>` that fills the card width; the consumer's artwork bakes in the logo / title /
// badges / copyright. Decorative by default (`aria-hidden` + empty `alt` — the Root's `aria-label`
// names the overlay), overridable. The band reserves its box via `aspect-ratio` (marker, overridable
// through `--aui-splash-hero-aspect`) so there is NO layout shift while the image loads; the card's
// `overflow:hidden` + radius clips its top corners.
const SplashHero = React.forwardRef<HTMLImageElement, React.ComponentPropsWithoutRef<'img'>>(
  function SplashScreenHero({ className, alt = '', ...rest }, ref) {
    return (
      <img
        ref={ref}
        alt={alt}
        aria-hidden={alt === '' ? true : undefined}
        className={prependMarkerClassName('aui-splash-screen-hero', className) as string | undefined}
        {...rest}
      />
    );
  },
);
SplashHero.displayName = 'SplashScreen.Hero';

// ─── SplashScreen.Footer — the transparent bottom strip (marker) ──────────────────────────────────
// A plain marker container (NOT a frame leaf): Figma shows the strip transparent on the light card, so
// it carries no own surface — it stacks the Progress over the Status with the strip padding, reading
// the card surface through.
const SplashFooter = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  function SplashScreenFooter({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={prependMarkerClassName('aui-splash-screen-footer', className) as string | undefined}
        {...rest}
      />
    );
  },
);
SplashFooter.displayName = 'SplashScreen.Footer';

// ─── SplashScreen.Progress — composes the shipped DS Progress (indeterminate) ─────────────────────
// COMPOSE the shipped `lib/progress` in its indeterminate state, no re-implementation. Progress already
// defaults profile `progress` / scale `sm`; omitting `value` yields `null` → indeterminate (the DS
// sweep, reduced-motion + RTL safe). We only add the footer marker (full-width) + a default accessible
// name (overridable).
export type SplashScreenProgressProps = ProgressProps;

const SplashProgress = React.forwardRef<HTMLDivElement, SplashScreenProgressProps>(
  function SplashScreenProgress({ className, 'aria-label': ariaLabel, ...rest }, ref) {
    return (
      <Progress
        ref={ref}
        aria-label={ariaLabel ?? 'Loading'}
        className={
          prependMarkerClassName('aui-splash-screen-progress', className) as string | undefined
        }
        {...rest}
      />
    );
  },
);
SplashProgress.displayName = 'SplashScreen.Progress';

// ─── SplashScreen.Status — the left/right meta row ────────────────────────────────────────────────
// Typography = the SM-scale font size (user-pinned): the `aui-scale-default-sm` cell resolves its
// font-size/line-height to the `l3` typescale role (16/20 — the same rail as sm Input/Button text,
// `generated/layer-2/_200-scale.scss:557` → `l3`). Full-strength foreground (Figma `#121212`), not
// muted — both meta cells read at the default `--paint-content`.
export interface SplashScreenStatusProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  /** Left meta (e.g. "Initializing…"). Wrapped in an l3 Type. */
  start?: React.ReactNode;
  /** Right meta (e.g. "Version 0.1.x"). Wrapped in an l3 Type. */
  end?: React.ReactNode;
  /** Fully custom row content — REPLACES the `start`/`end` convenience slots when provided. */
  children?: React.ReactNode;
}

const SplashStatus = React.forwardRef<HTMLDivElement, SplashScreenStatusProps>(
  function SplashScreenStatus({ start, end, children, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={prependMarkerClassName('aui-splash-screen-status', className) as string | undefined}
        {...rest}
      >
        {children ?? (
          <>
            {start != null && (
              <Type role="l3" as="span" className="aui-splash-screen-status__start">
                {start}
              </Type>
            )}
            {end != null && (
              <Type role="l3" as="span" className="aui-splash-screen-status__end">
                {end}
              </Type>
            )}
          </>
        )}
      </div>
    );
  },
);
SplashStatus.displayName = 'SplashScreen.Status';

// ─── SplashScreen — the Root (full frame leaf + the show/hold/exit timing + bootstrap handoff) ────
const _SplashRoot = createAtomicComponent('div', {
  extensions: [useSplashScreenRecipe],
});

export interface SplashScreenProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'color'> {
  /** The full frame surface for the backdrop overlay. Defaults: surface-alt / solid / sm / none / 0
   *  (the page-tinted themed scrim). */
  aui?: SplashScreenAui;
  /** Controlled DISMISSAL INTENT. `true` shows the splash; flipping to `false` starts dismissal at
   *  `max(now, minVisibleMs since the anchor)` then runs the exit transition and removes the node.
   *  Default `true` (a bare `<SplashScreen>` is shown). Time only ever EXTENDS visibility — the
   *  dismissal TRIGGER is always this flag, never a timeout (§3.1). */
  open?: boolean;
  /** Minimum on-screen time (ms) counted from the timing anchor. Default `0` (no hold). Guarantees
   *  no flash-on/flash-off: the splash stays at least this long before it can exit. */
  minVisibleMs?: number;
  /** The timing anchor for `minVisibleMs` (§3.1). `'navigation'` (default) counts from page load
   *  (`performance.now()` — jsdom-safe); `'mount'` counts from the component's first mount (the
   *  legacy semantics for non-startup uses). */
  anchor?: 'navigation' | 'mount';
  /** Fired once the exit transition completes and the node is removed. */
  onExitComplete?: () => void;
}

const SplashRoot = React.forwardRef<HTMLDivElement, SplashScreenProps>(function SplashScreen(
  {
    open = true,
    minVisibleMs = SPLASH_SCREEN_DEFAULT_MIN_VISIBLE_MS,
    anchor = 'navigation',
    onExitComplete,
    role = 'status',
    'aria-live': ariaLive = 'polite',
    children,
    ...rest
  },
  ref,
) {
  const [phase, setPhase] = React.useState<SplashPhase>(open ? 'visible' : 'closed');
  const phaseRef = React.useRef(phase);
  phaseRef.current = phase;

  const holdTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const exitTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mountAnchorRef = React.useRef(0);
  const onExitCompleteRef = React.useRef(onExitComplete);
  onExitCompleteRef.current = onExitComplete;

  // Capture the mount timestamp for `anchor='mount'`. For `anchor='navigation'`, elapsed is
  // `perfNow()` directly (relative to timeOrigin = page load), so no capture is needed.
  React.useEffect(() => {
    mountAnchorRef.current = perfNow();
  }, []);

  const elapsedSinceAnchor = React.useCallback(
    () => (anchor === 'mount' ? perfNow() - mountAnchorRef.current : perfNow()),
    [anchor],
  );

  // The show/hold/exit state machine. Latest `open` intent wins (the effect clears pending timers
  // on every run). Time only EXTENDS visibility; dismissal is only ever armed by `open=false`.
  React.useEffect(() => {
    clearTimeout(holdTimer.current);
    clearTimeout(exitTimer.current);
    if (open) {
      setPhase('visible');
      return;
    }
    // `open === false`. If it was never shown (still closed), stay closed — no exit, no callback
    // (guards a mount with `open={false}` from firing a phantom exit).
    if (phaseRef.current === 'closed') return;
    const remaining = Math.max(0, minVisibleMs - elapsedSinceAnchor());
    holdTimer.current = setTimeout(() => {
      setPhase('exiting');
      exitTimer.current = setTimeout(() => {
        setPhase('closed');
        onExitCompleteRef.current?.();
      }, SPLASH_SCREEN_EXIT_MS);
    }, remaining);
    return () => {
      clearTimeout(holdTimer.current);
      clearTimeout(exitTimer.current);
    };
  }, [open, minVisibleMs, elapsedSinceAnchor]);

  // Bootstrap handoff (§3.2): after the React splash's OWN first visible paint, remove any static
  // bootstrap twin (`[data-aui-splash-bootstrap]`) on a double-rAF so the swap is imperceptible.
  // Runs ONCE, only after we actually paint visible (never removes the twin if we never showed —
  // that would flash the page blank). Opt-in: absent twin = no-op (standalone consumers).
  const handedOffRef = React.useRef(false);
  React.useEffect(() => {
    if (phase !== 'visible' || handedOffRef.current) return;
    handedOffRef.current = true;
    const node = hostGlobals.document?.querySelector('[data-aui-splash-bootstrap]');
    if (!node) return;
    // Double-frame: remove the twin only AFTER the React splash's own paint has committed, so the
    // swap is imperceptible (identical composition).
    nextFrame(() => nextFrame(() => node.remove()));
  }, [phase]);

  // Fully removed once dismissal completes AND the consumer's intent is still closed.
  if (phase === 'closed' && !open) return null;

  return React.createElement(
    _SplashRoot as React.ElementType,
    {
      ref,
      role,
      'aria-live': ariaLive,
      'data-exiting': phase === 'exiting' ? '' : undefined,
      ...rest,
    },
    children,
  );
});
SplashRoot.displayName = 'SplashScreen';

// ─── Assemble (flat 2-level dot-namespace) ────────────────────────────────────────────────────────
interface SplashScreenComponent
  extends React.ForwardRefExoticComponent<
    SplashScreenProps & React.RefAttributes<HTMLDivElement>
  > {
  Card: typeof SplashCard;
  Hero: typeof SplashHero;
  Footer: typeof SplashFooter;
  Progress: typeof SplashProgress;
  Status: typeof SplashStatus;
}

export const SplashScreen = Object.assign(SplashRoot, {
  Card: SplashCard,
  Hero: SplashHero,
  Footer: SplashFooter,
  Progress: SplashProgress,
  Status: SplashStatus,
}) as SplashScreenComponent;
export default SplashScreen;
