// modules/design/atomic-aui/src/lib/icon/icon-a11y.ts
//
// Shared computed-last a11y resolver for Icon + ContainedIcon. A11y-correctness-critical
// and previously duplicated verbatim across both components — extracted here to kill the
// two-site drift hazard. (Spec §8.)
//
// An icon is "meaningful" only when it carries a NON-EMPTY (non-whitespace) accessible name
// via `aria-label`, `aria-labelledby`, or `title`. A meaningful icon is exposed as an image
// (`role="img"`, no `aria-hidden`); otherwise it's decorative (`aria-hidden`, no `role`).
//
// Both branches set BOTH `role` and `aria-hidden` (to `undefined` where absent) so the result
// can be spread LAST and reliably beat any rest-supplied value of either attr — e.g. a stray
// `role="img"` on a decorative icon, or `aria-hidden` on a labelled one.
import type * as React from 'react';

/** A label is meaningful only when it's a real, non-empty/non-whitespace string. */
function isNonEmpty(v: unknown): boolean {
  return typeof v === 'string' && v.trim() !== '';
}

/** True when the props carry a meaningful (non-empty) accessible name via `aria-label`,
 *  `aria-labelledby`, or `title`. The single source for the meaningful/decorative test — shared by
 *  `resolveIconA11y` AND the ContainedIcon custom-content path (which must NOT hide a box that the
 *  consumer explicitly labelled, while a bare box with a self-labelled child stays a plain wrapper). */
export function isMeaningfulLabel(
  props:
    | {
        'aria-label'?: React.AriaAttributes['aria-label'];
        'aria-labelledby'?: React.AriaAttributes['aria-labelledby'];
        title?: string;
      }
    | Record<string, unknown>
): boolean {
  const p = props as Record<string, unknown>;
  return isNonEmpty(p['aria-label']) || isNonEmpty(p['aria-labelledby']) || isNonEmpty(p.title);
}

/** Resolve the computed-last `{ role, aria-hidden }` pair from an icon's incoming props. */
export function resolveIconA11y(
  props:
    | {
        'aria-label'?: React.AriaAttributes['aria-label'];
        'aria-labelledby'?: React.AriaAttributes['aria-labelledby'];
        title?: string;
      }
    | Record<string, unknown>
): { role: 'img' | undefined; 'aria-hidden': true | undefined } {
  return isMeaningfulLabel(props)
    ? { role: 'img', 'aria-hidden': undefined }
    : { role: undefined, 'aria-hidden': true };
}

/**
 * Guard a consumer-passed `tabIndex` against an aria-hidden (decorative) element. An element that is
 * `aria-hidden` is removed from the accessibility tree — making it focusable (a non-`-1` tabIndex)
 * strands keyboard users on an invisible-to-AT stop (WCAG 2.4.3 / 4.1.2). When the element is hidden
 * AND a `tabIndex` was explicitly passed, force it to `-1` (non-focusable); otherwise pass the value
 * through untouched (incl. `undefined`, so we never stamp a `tabIndex` the consumer didn't ask for).
 *
 * @param tabIndex   - The consumer-supplied `tabIndex` (or `undefined` when none was passed).
 * @param ariaHidden - Whether the element resolves to `aria-hidden` (decorative).
 * @returns `-1` when hidden + a `tabIndex` was passed; else the original `tabIndex`.
 */
export function guardTabIndexForAriaHidden(
  tabIndex: number | undefined,
  ariaHidden: boolean | undefined
): number | undefined {
  return ariaHidden === true && tabIndex !== undefined ? -1 : tabIndex;
}
