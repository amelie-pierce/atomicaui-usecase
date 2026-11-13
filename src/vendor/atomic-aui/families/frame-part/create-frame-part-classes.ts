// ─── Frame-part class builder ─────────────────────────────────────────────────
//
// A shared, component-agnostic class builder for the "frame-like marker section"
// pattern: a part that lives INSIDE an elevated surface card (Dialog.Popup /
// AlertDialog.Popup) and reads the Popup's inherited scale/shape rails by default
// rather than owning a full leaf recipe.
//
// Lifted verbatim from the byte-identical `buildDialogFramePartClasses` /
// `buildAlertDialogFramePartClasses` (the `createTriggerStateRecipe` precedent):
// the two were identical modulo names, so they now share one tested source.
//
// Behavior contract (unchanged from the originals):
//  - No color/paint input  → inherit the Popup paint (no `aui-color-*` class).
//  - Explicit color/paint  → a local band; supplying only one axis completes the
//    pair, and a tonal/fixed band also gets the inset frame + 1px border rail so
//    nested sections read as surfaces rather than flat text on the Popup paint.
//  - No scale/shape         → the Popup's inherited rails continue to size the
//    section until a part opts out with its own `aui.scale` / `aui.shape`.
//
// Pure TypeScript (no React / Base UI imports) so it stays testable in isolation.
import { buildStyleProps, type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { mergeAuiClasses } from '../../core/recipe/merge-classes';
import type {
  AuiRecipeColor,
  AuiRecipePaint,
  AuiRecipeScale,
  AuiRecipeShape,
  AuiScaleProfile,
  AuiElevation,
} from '../../core/vocabulary/recipe-vocab';

const BORDER_WIDTH_1 = [
  'aui-border-block-start-width-1',
  'aui-border-block-end-width-1',
  'aui-border-inline-start-width-1',
  'aui-border-inline-end-width-1',
];

/** Unified customisation shape for a frame-like marker section inside a Popup.
 *  Full-frame `sx` is allowed because these sections own a box; `scale`/`shape`
 *  stay opt-in so unset sections keep inheriting the Popup geometry. `elevation`
 *  is a first-class box axis (these are real `.aui-frame` boxes) so the surface
 *  matches every other box group's six top-level axes; default = no own shadow. */
export type FramePartAui = {
  color?: AuiRecipeColor;
  paint?: AuiRecipePaint;
  scale?: AuiRecipeScale;
  profile?: AuiScaleProfile;
  shape?: AuiRecipeShape;
  elevation?: AuiElevation;
  sx?: AuiFrameStyleProps;
};

export type FramePartClassName<S = unknown> =
  | string
  | ((state: S) => string | undefined);

export interface BuildFramePartClassesArgs<S = unknown> {
  marker: string;
  aui?: FramePartAui;
  className?: FramePartClassName<S>;
  defaultColor?: AuiRecipeColor;
  defaultPaint?: AuiRecipePaint;
  /** The Popup's resolved tier (from its appearance context). A section emits its OWN
   *  `aui-scale-<profile>-<tier>` cell at this tier — so it OWNS its box padding (profile `default`
   *  by default) rather than inheriting the Popup's `--aui-padding-*` (which is `inherits:true`, so a
   *  no-padding Popup would otherwise leak 0 padding into the sections). An own `aui.scale` overrides
   *  the inherited tier; an own `aui.profile` overrides the default profile. 2026-06-14. */
  inheritedScale?: AuiRecipeScale;
  /** The default scale PROFILE this section emits when the consumer sets no `aui.profile` (default
   *  `'default'` — a padded section). A part pins a different resting profile here — e.g. `Dialog.Body`
   *  passes `'no-padding'` (2026-07-08) so its always-on scroll viewport spans edge-to-edge and the DS
   *  thumb hugs the dialog edge; content breathing room then belongs to the Body's content. A consumer
   *  `aui.profile` still overrides it. */
  defaultProfile?: AuiScaleProfile;
}

export function buildFramePartClasses(
  args: Omit<BuildFramePartClassesArgs, 'className'> & { className?: string }
): string;
export function buildFramePartClasses<S>(
  args: BuildFramePartClassesArgs<S>
): string | ((state: S) => string);
export function buildFramePartClasses<S = unknown>({
  marker,
  aui,
  className,
  defaultColor,
  defaultPaint,
  inheritedScale,
  defaultProfile,
}: BuildFramePartClassesArgs<S>): string | ((state: S) => string) {
  // Title opts into default paint; Description/Body/Actions stay paint-inheriting unless the
  // consumer supplies an `aui` paint/color. Supplying only one paint axis completes the pair.
  const hasPaintInput = !!defaultColor || !!defaultPaint || !!aui?.color || !!aui?.paint;
  const paint = aui?.paint ?? defaultPaint ?? 'solid';
  const color = aui?.color ?? defaultColor ?? 'surface';
  const colorClass = hasPaintInput ? `aui-color-${paint}-${color}` : '';
  // The section OWNS its box: it emits `aui-scale-<profile>-<tier>` at its own `aui.scale` OR the
  // Popup's inherited tier (so it carries its OWN `--aui-padding-*` and is NOT stripped by the
  // no-padding Popup's inherited 0 — the `--aui-padding-*` hooks are `inherits:true`). `profile`
  // defaults to `default` (the section keeps its padding even when the Popup is `no-padding`); an own
  // `aui.profile` overrides it. With NEITHER an own scale nor an inherited tier there is no cell.
  const tier = aui?.scale ?? inheritedScale;
  const scaleClass = tier ? `aui-scale-${aui?.profile ?? defaultProfile ?? 'default'}-${tier}` : '';
  const shapeClass = aui?.shape ? `aui-shape-${aui.shape}` : '';
  // `elevation` → `aui-elevation-<n>` (the drop-shadow level; a real box axis). Emitted only when the
  // consumer sets it, so an unset section keeps no own shadow (it sits inside the already-elevated Popup).
  const elevationClass = aui?.elevation !== undefined ? `aui-elevation-${aui.elevation}` : '';
  const sxClasses = aui?.sx ? buildStyleProps(aui.sx) : '';

  const build = (resolvedClassName?: string) => mergeAuiClasses([
    marker,
    'aui-frame',
    'aui-typography-typescale-default',
    colorClass,
    // Tonal/fixed local bands need the inset frame/border rail so nested sections read as surfaces,
    // not as flat text sitting directly on the Popup paint.
    colorClass && (paint === 'tonal' || paint === 'fixed')
      ? ['aui-frame--inset', ...BORDER_WIDTH_1].join(' ')
      : '',
    scaleClass,
    shapeClass,
    elevationClass,
    sxClasses,
    resolvedClassName,
  ]);

  if (typeof className === 'function') {
    return (state: S) => build(className(state));
  }

  return build(className);
}
