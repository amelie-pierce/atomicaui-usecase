// modules/design/atomic-aui/src/lib/progress/progress.tsx
//
// Progress — the passive value-driven BAR, thin-wrapping the INSTALLED `@base-ui/react/progress`
// (1.6.0; anatomy Root/Track/Indicator — we do NOT expose Label/Value: the Figma bar shows
// neither; label via `aria-label`/`aria-labelledby`).
//
//   • Progress (Root, marker `aui-progress`)   — a full `.aui-frame` leaf painted by
//     `useProgressRecipe`; its context cell IS the visible TRACK (solid-raised default).
//   • Progress.Track (`aui-progress-track`)    — marker part; the full-bleed clip window over the
//     Root's painted box (no paint of its own).
//   • Progress.Indicator (`aui-progress-indicator`) — styleable part with its OWN context cell
//     (solid-primary default, MERGED under a consumer `aui` — see the wrapper below). Base UI owns
//     the determinate geometry (inline {insetInlineStart:0, height:'inherit', width:'N%'}).
//
// Base UI owns the value model, `role="progressbar"` + aria-valuemin/max/now/text, and stamps the
// status data-attr (`data-progressing`/`data-complete`/`data-indeterminate`) on Root, Track, AND
// Indicator alike. It also appends a visually-hidden `<span role="presentation">` child to the
// Root — a pinned quirk, not a bug.
//
// The ONE Base UI divergence: Base UI declares `value` REQUIRED (`value: number | null`); our
// wrapper makes it OPTIONAL, defaulting `null` → an attribute-less `<Progress />` is
// INDETERMINATE (the `_state-cascade.scss` sweep keys off
// `.aui-progress-indicator[data-indeterminate]`).
//
// Progress is PASSIVE: no `useStateLayer` (no hover/press tint, no focus ring — the bar is a
// non-focusable display region; do not add tabIndex).
import * as React from 'react';
import { Progress as ProgressPrimitive } from '@base-ui/react/progress';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { createAtomicPart, type PartStyleProps } from '../../core/factory/create-atomic-part';
import { FRAME_PART_SX_AXES } from '../../core/recipe/part-classes';
import { useProgressRecipe } from './use-recipe';
import type { ProgressAui } from './use-recipe';

export {
  PROGRESS_VOCAB,
  PROGRESS_SX_AXES,
  PROGRESS_DEFAULT_SCALE,
  useProgressRecipe,
} from './use-recipe';
export type {
  ProgressAui,
  ProgressColor,
  ProgressPaint,
  ProgressScale,
  ProgressProfile,
  ProgressShape,
  ProgressElevation,
} from './use-recipe';

// ─── Progress.Track — the full-bleed clip window (marker part) ────────────────────────────────────
// Wraps Base UI `Progress.Track`. Marker-only: the visible rail paint is the ROOT's context cell
// (the track shows through); the marker CSS (inline/block-size 100%, border-radius:inherit,
// overflow:hidden) lives in `_state-cascade.scss`. Base UI stamps the status data-attr here too.
export type ProgressTrackProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Track>;
const ProgressTrack = createAtomicPart<ProgressTrackProps>(
  ProgressPrimitive.Track,
  'aui-progress-track',
);
ProgressTrack.displayName = 'Progress.Track';

// ─── Progress.Indicator — the filled bar (styleable part, OWN context cell) ───────────────────────
// Wraps Base UI `Progress.Indicator` as a styleable part with the FULL sx surface
// (`FRAME_PART_SX_AXES` — the marker reads the anatomy hooks; width/height are var-correct but
// MASKED in the determinate state where Base UI's inline style owns them — the documented G13
// var-correct-but-inert precedent).
//
// The part carries its OWN context cell: defaults `{ color:'primary', paint:'solid' }` (the Figma
// bar #ff5308 = --theme-primary). `createAtomicPart`'s `baseProps` REPLACE rather than merge (a
// consumer `aui` prop would clobber the whole default object), so this thin wrapper MERGES the
// defaults UNDER the consumer's DEFINED axes — `aui={{ color:'success' }}` keeps paint 'solid'
// (→ `aui-color-solid-success`), mirroring Chip.Dismiss's compactDefined merge.
const INDICATOR_DEFAULT_AUI: NonNullable<PartStyleProps['aui']> = {
  color: 'primary',
  paint: 'solid',
};

const _ProgressIndicator = createAtomicPart<
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Indicator> & PartStyleProps
>(ProgressPrimitive.Indicator, 'aui-progress-indicator', {
  styleable: true,
  sxAxes: FRAME_PART_SX_AXES,
});

export type ProgressIndicatorProps = React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Indicator
> &
  PartStyleProps;

const ProgressIndicator = React.forwardRef<HTMLElement, ProgressIndicatorProps>(
  function ProgressIndicator({ aui, ...rest }, ref) {
    // Merge: part defaults < consumer's DEFINED axes (an explicit `undefined` from a spread must
    // not clobber a default — the Chip `compactDefined` rule). `sx` merges as a whole object
    // (consumer sx replaces; the defaults carry none).
    const resolvedAui = React.useMemo<NonNullable<PartStyleProps['aui']>>(() => {
      const merged: Record<string, unknown> = { ...INDICATOR_DEFAULT_AUI };
      for (const [k, v] of Object.entries(aui ?? {})) if (v !== undefined) merged[k] = v;
      return merged as NonNullable<PartStyleProps['aui']>;
    }, [aui]);
    return React.createElement(_ProgressIndicator, { ref, ...rest, aui: resolvedAui });
  },
);
ProgressIndicator.displayName = 'Progress.Indicator';

// ─── Progress — the Root (full frame leaf; no Progress.Root self-alias, the Toast/Select idiom) ───
type BaseProgressRootProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>;

export interface ProgressProps extends Omit<BaseProgressRootProps, 'value'> {
  /** The FULL frame surface for the `.aui-progress` bar (color/paint/scale/profile/shape/
   *  elevation + full-frame sx). The ROOT context cell paints the TRACK. Defaults:
   *  raised / solid / sm / progress / soft / 0 (shape `soft` is user-locked — see use-recipe.ts). */
  aui?: ProgressAui;
  /** The task completion value. OPTIONAL here (Base UI declares it required): default `null` →
   *  INDETERMINATE (no `aria-valuenow`, `data-indeterminate` + the CSS sweep). A finite value
   *  renders determinate (`data-progressing`); `value === max` renders `data-complete`. */
  value?: number | null;
}

// Stateless recipe only — NO useStateLayer (passive, non-interactive display region).
const _ProgressRoot = createAtomicComponent(ProgressPrimitive.Root, {
  extensions: [useProgressRecipe],
});

const ProgressRoot = React.forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { value = null, children, ...rest },
  ref,
) {
  // AUTO-RENDER (pinned 2026-07-04): a CHILDLESS <Progress/> auto-renders the default anatomy
  // <Progress.Track><Progress.Indicator/></Progress.Track> (the Toast/Checkbox childless
  // convention); ANY explicit children replace the auto-anatomy wholesale (the consumer owns
  // composition — no findPartChild re-assembly needed for a 2-level passive subtree).
  // `toArray` (NOT `Children.count`) so a conditional `{cond && <Track/>}` that resolves to
  // false/null still auto-renders — `Children.count(false)` is 1 (booleans null inside
  // mapIntoArray but the callback fires), which would silently paint a track with NO indicator.
  const content =
    React.Children.toArray(children).length === 0
      ? React.createElement(ProgressTrack, null, React.createElement(ProgressIndicator, null))
      : children;
  return React.createElement(_ProgressRoot as React.ElementType, { ref, ...rest, value }, content);
});
ProgressRoot.displayName = 'Progress';

// ─── Assemble (flat 2-level dot-namespace) ────────────────────────────────────────────────────────
interface ProgressComponent
  extends React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>> {
  Track: typeof ProgressTrack;
  Indicator: typeof ProgressIndicator;
}

// Intentional typing seam over the lean `AnyProps` factory and Object.assign namespace.
export const Progress = Object.assign(ProgressRoot, {
  Track: ProgressTrack,
  Indicator: ProgressIndicator,
}) as ProgressComponent;
export default Progress;
