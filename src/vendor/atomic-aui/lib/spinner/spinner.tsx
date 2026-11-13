// modules/design/atomic-aui/src/lib/spinner/spinner.tsx
//
// Spinner — a hand-crafted (non-Base-UI) AtomicAUI 6.0 loading indicator. ONE drawn SVG ring for
// BOTH modes (user decision 2026-07-08 — the earlier FA-glyph-for-indeterminate read visually
// different from the SVG determinate ring; unifying on the ring makes the two modes pixel-identical):
//   • INDETERMINATE (value omitted/null — the default): a round-capped ¾-arc that ROTATES over a
//     faint full-circle track; the BOX is a live `role="status"` region. Rotation + the reduced-motion
//     opacity pulse are hand-authored in `_state-cascade.scss` (keyed off `[data-indeterminate]`).
//   • DETERMINATE (a finite `value`): the SAME ring, its arc filled to `value/max` (no rotation);
//     the BOX is `role="progressbar"` (+ aria-valuenow/min/max).
//
// The ring follows the box CONTENT colour (`--aui-fg`/currentColor); the track is the same hue at
// the duotone secondary opacity, so the two modes share one visual language. Plain `React.forwardRef`
// (no createAtomicComponent / Base UI / state layer). The box recipe + `aui-spinner` marker + the
// pinned `spinner` profile default live in ./use-recipe; the mode branch + a11y live here.
import * as React from 'react';
import { useSpinnerRecipe } from './use-recipe';
import type { SpinnerAui } from './use-recipe';

// Public appearance namespace is homed in ./use-recipe (the recipe layer), mirroring `ContainedIconAui`.
export type { SpinnerAui } from './use-recipe';

// Live-region default name — announced by role="status" (indeterminate) / names the progressbar
// (determinate). A consumer label (aria-label / aria-labelledby / title) overrides it.
const DEFAULT_ARIA_LABEL = 'Loading';

// Ring geometry: a 24-unit viewBox; r=10 leaves room for the stroke. Dash math uses rendered-pixel
// lengths so non-scaling strokes retain the intended gap. Indeterminate
// shows a FIXED ¾ arc (it spins); determinate shows `value/max` of the arc.
const RING_VIEWBOX = 24;
const RING_R = 10;
const RING_CIRCUMFERENCE_RATIO = 2 * Math.PI * RING_R / RING_VIEWBOX;
const INDETERMINATE_ARC = 0.75; // ¾ visible → strokeDashoffset 0.25 (echoes the old spinner-third look)

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color' | 'children'> {
  /** Appearance: the full ContainedIcon box surface (color/paint/scale/profile/shape/elevation/sx).
   *  `color` tints the ring (content rail); `paint:'solid'|'tonal'` fills a chip-style badge box. */
  aui?: SpinnerAui;
  /** Completion value (mirrors Progress). OMITTED / `null` → INDETERMINATE (the rotating ring,
   *  `role="status"`). A finite value → DETERMINATE (the filled ring, `role="progressbar"`);
   *  `value >= max` renders a full ring. */
  value?: number | null;
  /** Determinate lower bound (mirrors Progress). Default `0`. */
  min?: number;
  /** Determinate upper bound (mirrors Progress). Default `100`. */
  max?: number;
}

/** True when props carry a non-empty (non-whitespace) accessible name via `aria-label`,
 *  `aria-labelledby`, or `title`. Kept inline (a simple presence test) so the Spinner shell stays
 *  self-contained. */
function hasMeaningfulLabel(rest: Record<string, unknown>): boolean {
  const nonEmpty = (v: unknown): boolean => typeof v === 'string' && v.trim() !== '';
  return nonEmpty(rest['aria-label']) || nonEmpty(rest['aria-labelledby']) || nonEmpty(rest['title']);
}

const SpinnerRoot = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner({ aui, className, value = null, min = 0, max = 100, ...rest }, ref) {
    const { className: composedClassName } = useSpinnerRecipe({ aui, className });
    const labelled = hasMeaningfulLabel(rest);

    // Mode: a finite `value` → determinate; omitted/null (or non-finite) → indeterminate.
    const isDeterminate = value != null && Number.isFinite(value);

    // The value arc's dash offset (pathLength-normalized): determinate reveals `fraction`; indeterminate
    // shows the fixed ¾ arc (and spins via CSS).
    let dashoffset: number;
    let a11y: Record<string, unknown>;
    if (isDeterminate) {
      const clamped = Math.min(Math.max(value as number, min), max);
      const span = max - min;
      const fraction = span > 0 ? (clamped - min) / span : 0;
      dashoffset = 1 - fraction;
      a11y = {
        role: 'progressbar',
        'aria-valuenow': clamped,
        'aria-valuemin': min,
        'aria-valuemax': max,
        ...(labelled ? {} : { 'aria-label': DEFAULT_ARIA_LABEL }),
      };
    } else {
      dashoffset = 1 - INDETERMINATE_ARC;
      a11y = {
        role: 'status',
        'aria-live': 'polite',
        // The CSS rotation + reduced-motion pulse key off this attr (mirrors Progress's data-indeterminate).
        'data-indeterminate': '',
        ...(labelled ? {} : { 'aria-label': DEFAULT_ARIA_LABEL }),
      };
    }

    // A11y is spread BEFORE `...rest` so a consumer can still override role / live / label.
    return React.createElement(
      'span',
      { ref, ...a11y, ...rest, className: composedClassName },
      // The SVG ring is decorative (aria-hidden) — the BOX carries the status/progressbar semantics.
      React.createElement(
        'svg',
        { className: 'aui-spinner-ring', viewBox: `0 0 ${RING_VIEWBOX} ${RING_VIEWBOX}`, 'aria-hidden': true },
        React.createElement('circle', {
          className: 'aui-spinner-ring-track',
          cx: RING_VIEWBOX / 2,
          cy: RING_VIEWBOX / 2,
          r: RING_R,
        }),
        React.createElement('circle', {
          className: 'aui-spinner-ring-value',
          cx: RING_VIEWBOX / 2,
          cy: RING_VIEWBOX / 2,
          r: RING_R,
          style: {
            strokeDasharray: `calc(var(--aui-icon-size, 1em) * ${RING_CIRCUMFERENCE_RATIO})`,
            strokeDashoffset: `calc(${dashoffset} * var(--aui-icon-size, 1em) * ${RING_CIRCUMFERENCE_RATIO})`,
          },
        }),
      ),
    );
  },
);
SpinnerRoot.displayName = 'Spinner';

export const Spinner = SpinnerRoot;
export default Spinner;
