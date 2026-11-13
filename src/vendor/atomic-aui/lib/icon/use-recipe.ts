// modules/design/atomic-aui/src/lib/icon/use-recipe.ts
//
// Icon family per-instance composition hooks — the "props → render inputs" layer for the
// hand-crafted Icon / ContainedIcon components.
//
// IMPORTANT — these are PLAIN React composition hooks, NOT the factory PropHook pattern.
// Unlike button/use-recipe.ts (which exports `useButtonRecipe = createVocabRecipe(BUTTON_VOCAB)`,
// a `createVocabRecipe`-built PropHook consumed by `createAtomicComponent`), Icon/ContainedIcon
// are hand-crafted `React.forwardRef` components (no Base UI, no state layer, no factory — the
// factory always renders its element and so can't suppress for an invalid name; see icon.tsx §0).
// These hooks therefore have NO factory contract: they read context, run the dev-guards, do the
// FA mapping, call the pure `buildIconClasses` / `buildContainedIconClasses` recipe, resolve a11y,
// and hand the component a ready-to-render bundle. They are the spirit-parallel of the leaf recipe
// files (one "props → render inputs" layer per component family), not a literal PropHook parity.
import { buildIconClasses, buildContainedIconClasses } from '../../core/recipe/build-icon-classes';
import type { IconSxProps, ContainedIconSxProps } from '../../core/recipe/build-icon-classes';
import type { AuiRecipeColor, AuiRecipePaint, AuiRecipeScale, AuiRecipeShape, AuiScaleProfile, AuiElevation } from '../../core/vocabulary/recipe-vocab';
import { faRender, isValidIconName } from './fa-mapping';
import type { IconFamily, IconLayer, IconWeight } from './fa-mapping';
import { resolveIconA11y, isMeaningfulLabel } from './icon-a11y';
import { useIconography } from './iconography-provider';

// ── Public type aliases (parity with ButtonColor/ButtonScale/… in button/use-recipe.ts) ──────
// These alias the shared, token-derived core recipe vocabulary. Identity axes (family/layer/
// weight) are re-exported from fa-mapping unchanged — they're FA class names, not recipe axes.
export type IconColor = AuiRecipeColor;
export type IconScale = AuiRecipeScale;
export type ContainedIconShape = AuiRecipeShape;
export type { IconFamily, IconLayer, IconWeight } from './fa-mapping';

/** Appearance namespace for an Icon — NO paint, NO states (a glyph has no box/surface). */
export interface IconAui {
  color?: IconColor;
  scale?: IconScale;
  sx?: IconSxProps;
}

/** Appearance namespace for a ContainedIcon — the box takes the FULL appearance (2026-06-11).
 *  `color`/`paint` resolve the standard context cell on the BOX (`paint` defaults to `text`, so a
 *  bare `color` = a transparent box whose content-color the inner glyph follows — a one-knob
 *  colored icon; `paint: 'solid'|'tonal'` fills the box). `scale` sizes box + glyph together;
 *  `profile` (default `no-padding`), `shape`, `elevation` (default `0`) style the box; `sx` is the
 *  box-only override surface. NO states (a ContainedIcon is not selectable). */
export interface ContainedIconAui {
  /** Chroma of the box context cell. With the default `text` paint the box is transparent and the
   *  inner glyph follows this hue (the colored-icon case); with a fill paint it tints the box. */
  color?: IconColor;
  /** Paint MODE of the box cell. Default `text` (transparent box + content-colored glyph). */
  paint?: AuiRecipePaint;
  /** Drives BOTH the box container size (`aui-icon-container-i*`) AND the inner glyph size
   *  (`aui-icon-size-*`) — box and glyph scale together. */
  scale?: IconScale;
  /** Size profile of the box. Default `no-padding` (tight to the glyph). */
  profile?: AuiScaleProfile;
  /** Box corner radii → `aui-shape-*`. */
  shape?: ContainedIconShape;
  /** Box drop-shadow level → `aui-elevation-<n>`. Default `0` (no shadow). */
  elevation?: AuiElevation;
  /** Box-only style overrides (background / border / radii / iconContainer). NOT forwarded to
   *  the glyph. */
  sx?: ContainedIconSxProps;
}

// ── Identity hard-defaults (prop ?? context ?? these), PER AXIS ───────────────────────────────
const DEFAULT_FAMILY: IconFamily = 'classic';
const DEFAULT_LAYER: IconLayer = 'monotone';
const DEFAULT_WEIGHT: IconWeight = 'solid';

const isDev = process.env.NODE_ENV !== 'production';

// Module-level once-flag for the webfont-mode dev guard (fires at most once per session).
let warnedWebfontMode = false;

/** TEST-ONLY: reset the module-level webfont-mode once-flag so the dev guard can fire again.
 *  Not part of the public API — exists solely so `icon.spec.tsx` can assert the warn behavior
 *  deterministically (the latch is otherwise order-dependent / untestable). Re-exported from
 *  `./icon` so existing spec imports (`import … from './icon'`) keep resolving unchanged. */
export function __resetWebfontWarnForTest(): void {
  warnedWebfontMode = false;
}

function checkWebfontMode(): void {
  if (!isDev || warnedWebfontMode) return;
  // Gate on a browser global so SSR doesn't spam. `window` isn't in the lib build's `lib`
  // (es2022 + node only — no DOM), so reach it through the typed `globalThis`.
  const g = globalThis as {
    window?: unknown;
    FontAwesome?: { config?: { autoReplaceSvg?: unknown } };
  };
  if (typeof g.window === 'undefined') return;
  // Only warn when SVG/JS mode is POSITIVELY detected: the kit defines a `FontAwesome`
  // global with a truthy `autoReplaceSvg` (true or a nodeCallback). Web Font mode — the
  // required mode — does NOT define `FontAwesome` at all, so an absent global is the
  // healthy case and must NOT warn (otherwise the guard cries wolf on every dev render).
  if (g.FontAwesome?.config?.autoReplaceSvg) {
    warnedWebfontMode = true;
    console.warn(
      '[atomic-aui] <Icon> requires the FontAwesome kit in Web Font mode ' +
        '(set autoReplaceSvg=false). SVG+JS mode swaps <i>→<svg> via a ' +
        'MutationObserver that collides with React reconciliation.'
    );
  }
}

/** Inputs the Icon hook needs from the component. */
export interface UseIconRecipeProps {
  name: string;
  family?: IconFamily;
  layer?: IconLayer;
  weight?: IconWeight;
  aui?: IconAui;
  className?: string;
  /** Remaining HTML attrs — only the a11y subset (`aria-label`/`aria-labelledby`/`title`) is read. */
  rest: Record<string, unknown>;
}

/** The ready-to-render bundle for the Icon `<i>`. */
export interface UseIconRecipeResult {
  /** Composed className: recipe (incl. base `aui-icon`) + FA classes + user className (last). */
  className: string;
  /** Both FA CSS-selector data-attrs (always both present). */
  dataAttrs: {
    'data-aui-icon-family': string;
    'data-aui-icon-style': IconLayer;
  };
  /** Computed-last `{ role, aria-hidden }` pair, spread LAST onto the `<i>`. */
  a11y: { role: 'img' | undefined; 'aria-hidden': true | undefined };
  /** True when `name` is not a valid icon name (the component stamps `data-aui-icon-invalid`). */
  isInvalid: boolean;
  /** The original `name` (used as the `data-aui-icon-invalid` marker value when invalid). */
  invalidName: string;
}

/** Per-instance composition for `<Icon>` — encapsulates ALL of the glue that used to live inline
 *  in icon.tsx: webfont dev-guard, context-resolved identity, name validation + dev-warns, FA
 *  mapping, recipe class build, className compose + fa-smuggle guard, and a11y. The component just
 *  destructures the result and renders the `<i>`. */
export function useIconRecipe(props: UseIconRecipeProps): UseIconRecipeResult {
  const { name, family, layer, weight, aui, className, rest } = props;

  checkWebfontMode();

  // Effective identity = prop ?? context ?? hard-default, PER AXIS.
  const ctx = useIconography();
  const effFamily = family ?? ctx.family ?? DEFAULT_FAMILY;
  const effLayer = layer ?? ctx.layer ?? DEFAULT_LAYER;
  const effWeight = weight ?? ctx.weight ?? DEFAULT_WEIGHT;

  // Valid = a real string, syntactically kebab-case, and NOT an `fa-*` token (rejecting
  // `fa-` content is the component layer's job — fa-mapping.ts only checks shape). This
  // also defends against JS callers omitting `name` or passing null/undefined.
  const valid =
    typeof name === 'string' && !name.startsWith('fa-') && isValidIconName(name);
  if (isDev && !valid) {
    console.warn(
      `[atomic-aui] <Icon name=${JSON.stringify(name)}> is not a valid icon name ` +
        '(expected lowercase kebab-case, e.g. "circle-user"). Rendering an inspectable ' +
        'fallback with no fa-<name> class.'
    );
  }

  // className FA-smuggle guard: the recipe owns FA classes.
  if (isDev && className && /(?:^|\s)fa-/.test(className)) {
    console.warn(
      `[atomic-aui] <Icon className=${JSON.stringify(className)}> contains an \`fa-*\` ` +
        'class. The recipe owns FontAwesome classes (family/layer/weight/name) — use the ' +
        'top-level identity props instead.'
    );
  }

  // FA mapping: classes + BOTH data-attrs (always both — the CSS selector requires it).
  const fa = faRender({ family: effFamily, layer: effLayer, weight: effWeight, name });

  // Recipe (appearance) classes from `aui`.
  const recipeClasses = buildIconClasses({ color: aui?.color, scale: aui?.scale, sx: aui?.sx });

  // Compose: recipe (includes base `aui-icon`) + FA classes + user className.
  // For an invalid name, faRender still returns a smuggled `fa-<name>` class — drop it so
  // the fallback is inspectable but never paints a (likely tofu) glyph.
  const faClasses = valid ? fa.classNames : fa.classNames.filter((c) => c !== `fa-${name}`);
  const composedClassName = [recipeClasses, faClasses.join(' '), className]
    .filter(Boolean)
    .join(' ');

  // a11y, computed as ONE step and spread LAST (must beat any rest-supplied attr). Shared with
  // ContainedIcon via `resolveIconA11y` — see icon-a11y.ts for the meaningful/decorative rule.
  const a11y = resolveIconA11y(rest);

  return {
    className: composedClassName,
    dataAttrs: fa.dataAttrs,
    a11y,
    isInvalid: !valid,
    invalidName: name,
  };
}

/** Inputs the ContainedIcon hook needs from the component. */
export interface UseContainedIconRecipeProps {
  aui?: ContainedIconAui;
  className?: string;
  /** Remaining HTML attrs — only the a11y subset is read. */
  rest: Record<string, unknown>;
  /** CUSTOM-content path (2026-06-23): the box renders consumer `children` (an `<img>`/SVG) that
   *  carry their OWN label, so the box must NOT default to `aria-hidden` (a hidden box would swallow
   *  the labelled child from AT). When `true` AND the box itself is NOT explicitly labelled
   *  (aria-label/-labelledby/title), the box stays a plain, un-hidden wrapper (no role, no
   *  aria-hidden). An explicit box label still wins (→ role=img). Default `false` (the FA path: the
   *  box owns the name, the inner glyph is decorative — unchanged). */
  selfLabeledContent?: boolean;
}

/** The ready-to-render bundle for the ContainedIcon `<span>`. */
export interface UseContainedIconRecipeResult {
  /** Composed box className: recipe (incl. base `aui-contained-icon`) + user className (last). */
  className: string;
  /** Computed-last `{ role, aria-hidden }` pair, spread LAST onto the `<span>`. On the custom path
   *  with no box label both are `undefined` (the child speaks for itself). */
  a11y: { role: 'img' | undefined; 'aria-hidden': true | undefined };
}

/** Per-instance composition for the ContainedIcon `<span>` BOX — box recipe (container size /
 *  shape / box-only sx) + user className, plus a11y. Identity/color/scale forwarding to the inner
 *  Icon stays in contained-icon.tsx (that's render glue, not recipe). */
export function useContainedIconRecipe(
  props: UseContainedIconRecipeProps
): UseContainedIconRecipeResult {
  const { aui, className, rest, selfLabeledContent } = props;

  // BOX recipe: the standard context cell (color/paint → the box's `--paint-*` rails, paint default
  // `text`) + container size (scale) + profile padding + shape + elevation + box-only sx.
  const boxClasses = buildContainedIconClasses({
    color: aui?.color,
    paint: aui?.paint,
    scale: aui?.scale,
    profile: aui?.profile,
    shape: aui?.shape,
    elevation: aui?.elevation,
    sx: aui?.sx,
  });
  const composedClassName = [boxClasses, className].filter(Boolean).join(' ');

  // a11y, computed as ONE step and spread LAST onto the SPAN (must beat any rest-supplied attr).
  // Shared with Icon via `resolveIconA11y` — see icon-a11y.ts. On the FA path the BOX owns the
  // accessible name (the inner glyph is ALWAYS decorative — no double announcement; spec §8). On the
  // CUSTOM-content path (`selfLabeledContent`) the child carries its own label, so an UNLABELLED box
  // must NOT be `aria-hidden` (that would hide the labelled child from AT) — return a bare wrapper
  // (no role, no aria-hidden); an explicit box label still resolves to role=img.
  const labelled = isMeaningfulLabel(rest);
  const a11y =
    selfLabeledContent && !labelled
      ? { role: undefined, 'aria-hidden': undefined }
      : resolveIconA11y(rest);

  return { className: composedClassName, a11y };
}
