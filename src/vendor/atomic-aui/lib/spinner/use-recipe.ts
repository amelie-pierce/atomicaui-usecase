// modules/design/atomic-aui/src/lib/spinner/use-recipe.ts
//
// Spinner per-instance composition — the "props → render inputs" layer for the hand-crafted
// Spinner (the boxed loading indicator). A PLAIN React composition hook, NOT the factory
// PropHook pattern — mirrors icon/use-recipe.ts (Spinner is a hand-crafted `forwardRef`: no
// Base UI, no state layer, no factory).
//
// The Spinner BOX reuses the ContainedIcon box recipe VERBATIM (`buildContainedIconClasses`):
// same context-cell / scale / profile / shape / elevation / sx cascade AND the same paint default
// (`text` → transparent box). It only PREPENDS the `aui-spinner` marker the rotation CSS keys off
// (`.aui-spinner .aui-icon` rotates the inner glyph; the box stays static). So a default Spinner
// reads as a bare spinning glyph, while `paint:'solid'|'tonal'` unlocks a chip-style loading badge.
//
// PROFILE DEFAULT = `'spinner'` (user-directed 2026-07-08 — the Spinner rendered "quite small" under
// ContainedIcon's `no-padding` default, which leaves the glyph on the tiny fallback ladder / 1em).
// The purpose-built `aui-scale-spinner-<tier>` cells size the glyph properly per tier
// (`--aui-icon-size` = 16/20/24/28/32px xs→xl; the box min tracks it) — the default tier `sm` = a
// 20px glyph. It still hugs (the cells set padding 0) and stays transparent, so it reads as a bare
// glyph, just correctly sized. A consumer overrides via `aui.profile` (e.g. `'no-padding'` to opt
// out, or `'square-compact'` for a padded badge). The pinned-profile mechanism (Checkbox
// `'checkable'`, Switch `'switch'`), applied here at the hand-crafted recipe layer.
import { buildContainedIconClasses } from '../../core/recipe/build-icon-classes';
import type { ContainedIconAui } from '../icon';

/** The Spinner's pinned default profile (the purpose-built `aui-scale-spinner-<tier>` cells). */
export const SPINNER_DEFAULT_PROFILE = 'spinner' as const;

/** Spinner appearance = the ContainedIcon box surface, verbatim (the full 7-axis box:
 *  color/paint/scale/profile/shape/elevation + the full `CONTAINED_ICON_SX_AXES` sx). */
export type SpinnerAui = ContainedIconAui;

/** Inputs the Spinner hook needs from the component. */
export interface UseSpinnerRecipeProps {
  aui?: SpinnerAui;
  className?: string;
}

/** The ready-to-render bundle for the Spinner `<span>` box. */
export interface UseSpinnerRecipeResult {
  /** Composed box className: `aui-spinner` marker + the ContainedIcon box recipe + user className. */
  className: string;
}

/** Per-instance composition for the Spinner `<span>` BOX. Reuses the ContainedIcon box recipe
 *  engine and prepends the `aui-spinner` rotation marker. A11y (role="status" + live + label) is
 *  spinner-specific and lives in the component shell, not here. */
export function useSpinnerRecipe(props: UseSpinnerRecipeProps): UseSpinnerRecipeResult {
  const { aui, className } = props;
  const boxClasses = buildContainedIconClasses({
    color: aui?.color,
    paint: aui?.paint,
    scale: aui?.scale,
    // Default to the purpose-built `spinner` profile (proper glyph sizes per tier) unless the
    // consumer picks another — see SPINNER_DEFAULT_PROFILE above.
    profile: aui?.profile ?? SPINNER_DEFAULT_PROFILE,
    shape: aui?.shape,
    elevation: aui?.elevation,
    sx: aui?.sx,
  });
  // `aui-spinner` FIRST so the rotation selector `.aui-spinner .aui-icon` resolves; the
  // ContainedIcon box classes carry `aui-contained-icon` (box sizing/paint cascade); user
  // className LAST (overrides exactly one role, per mergeAuiClasses' append convention).
  const composedClassName = ['aui-spinner', boxClasses, className].filter(Boolean).join(' ');
  return { className: composedClassName };
}
