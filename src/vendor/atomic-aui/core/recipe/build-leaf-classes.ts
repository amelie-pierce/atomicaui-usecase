// modules/design/atomic-aui/src/core/build-leaf-classes.ts
//
// The ONE class-building engine for leaf components (Task 1.3 of the unified-`aui` refactor).
// Resolves dimension-A source cascade then composes the full `.aui-*` class string.
//
// Resolution order (low → high, last wins per axis):
//   vocab.defaults
//   < vocab.states[activeState]
//   < appearance (top-level)
//   < appearance.states[activeState]
//
// sx merges shallowly (Object.assign) at each layer in the same order.
//
// Consumers: the component factory + compound parts (Task 1.4+).

import type { LeafVocabulary, Appearance, StateAppearance } from '../vocabulary/leaf-vocabulary';
import { buildUnstyledClasses } from './build-unstyled-classes';
import { buildStyleProps, expandShorthands, type AuiStyleShorthands } from './build-style-props';
import { mergeAuiClasses } from './merge-classes';
import type { AuiStyleProps } from '../../tokens/index';
import type { AuiRecipeColor, AuiRecipePaint, AuiRecipeScale, AuiRecipeShape, AuiScaleProfile, AuiElevation } from '../vocabulary/recipe-vocab';

// ─── Resolved shape ───────────────────────────────────────────────────────────

interface Resolved {
  color?: AuiRecipeColor;
  paint?: AuiRecipePaint;
  scale?: AuiRecipeScale;
  // Size PROFILE (top-level only, like scale). Falls back to `vocab.profile` at
  // emit time when unset — see buildLeafClasses.
  profile?: AuiScaleProfile;
  shape?: AuiRecipeShape;
  // Drop-shadow level → `aui-elevation-<n>`. A visual axis: resolves per-state
  // (all four layers), like color/paint — NOT top-level-only.
  elevation?: AuiElevation;
  // Carries granular axes AND the curated shorthands (`radius`/`borderWidth`) — they
  // are expanded to granular keys before the sxAxes filter runs.
  sx: Partial<AuiStyleProps & AuiStyleShorthands>;
}

// ─── Internal resolver ────────────────────────────────────────────────────────

/**
 * Pure resolver: merges appearance layers low→high to produce a single
 * `Resolved` snapshot. No side-effects; no component knowledge.
 *
 * Layer order (earlier = lower priority):
 *   1. vocab.defaults
 *   2. vocab.states[activeState]
 *   3. appearance (top-level)
 *   4. appearance.states[activeState]
 */
function resolve(
  vocab: LeafVocabulary,
  appearance: (Appearance & { states?: Record<string, StateAppearance> }) | undefined,
  activeState?: string,
): Resolved {
  const out: Resolved = { sx: {} };

  // Layer 1: vocab defaults
  const defaults = vocab.defaults;
  if (defaults) {
    if (defaults.color !== undefined) out.color = defaults.color;
    if (defaults.paint !== undefined) out.paint = defaults.paint;
    if (defaults.scale !== undefined) out.scale = defaults.scale;
    if (defaults.shape !== undefined) out.shape = defaults.shape;
    if (defaults.elevation !== undefined) out.elevation = defaults.elevation;
    if (defaults.sx) Object.assign(out.sx, defaults.sx);
  }

  // Layer 2: vocab.states[activeState]
  if (activeState && vocab.states?.[activeState]) {
    const vState = vocab.states[activeState];
    if (vState.color !== undefined) out.color = vState.color;
    if (vState.paint !== undefined) out.paint = vState.paint;
    // Geometry axes ARE resolvable per-state (unified-states model 2026-06-11): a
    // selectable leaf may resize/reshape per state. The compound class recomputes below.
    if (vState.scale !== undefined) out.scale = vState.scale;
    if (vState.profile !== undefined) out.profile = vState.profile;
    if (vState.shape !== undefined) out.shape = vState.shape;
    if (vState.elevation !== undefined) out.elevation = vState.elevation;
    if (vState.sx) Object.assign(out.sx, vState.sx);
  }

  // Layer 3: top-level appearance
  if (appearance) {
    if (appearance.color !== undefined) out.color = appearance.color;
    if (appearance.paint !== undefined) out.paint = appearance.paint;
    if (appearance.scale !== undefined) out.scale = appearance.scale;
    // `profile` is a TOP-LEVEL geometry axis (like scale) — read it here only.
    // Unset → buildLeafClasses falls back to vocab.profile (the component default).
    if (appearance.profile !== undefined) out.profile = appearance.profile;
    if (appearance.shape !== undefined) out.shape = appearance.shape;
    if (appearance.elevation !== undefined) out.elevation = appearance.elevation;
    if (appearance.sx) Object.assign(out.sx, appearance.sx);
  }

  // Layer 4: appearance.states[activeState]
  if (activeState && appearance?.states?.[activeState]) {
    const aState = appearance.states[activeState];
    if (aState.color !== undefined) out.color = aState.color;
    if (aState.paint !== undefined) out.paint = aState.paint;
    // Geometry axes resolve per-state too (highest source layer for this state).
    if (aState.scale !== undefined) out.scale = aState.scale;
    if (aState.profile !== undefined) out.profile = aState.profile;
    if (aState.shape !== undefined) out.shape = aState.shape;
    if (aState.elevation !== undefined) out.elevation = aState.elevation;
    if (aState.sx) Object.assign(out.sx, aState.sx);
  }

  return out;
}

// ─── Tier-shadow dev-warning (spec §5.1) ──────────────────────────────────────

/**
 * Top-level `sx` keys whose layer-3 `--aui-*` hook is the SAME hook a per-state
 * context paint cell (`color`/`paint`) drives. Because the cascade is
 * `var(--aui-x, var(--paint-x))`, a top-level `sx` on one of these hooks ALWAYS
 * beats the layer-2 context — so a per-state `color`/`paint` override on the same
 * hook is silently shadowed. Map sx key → the context channel it pins.
 */
const SHADOWING_SX_HOOKS: Readonly<Record<string, string>> = {
  background: 'fill',
  foreground: 'content',
  borderColor: 'border',
};

function hasExplicitContextOverride(
  appearance: (Appearance & { states?: Record<string, StateAppearance> }) | undefined,
  activeState: string | undefined,
): boolean {
  const topLevel = appearance?.color !== undefined || appearance?.paint !== undefined;
  const stateLevel = !!activeState && (
    appearance?.states?.[activeState]?.color !== undefined ||
    appearance?.states?.[activeState]?.paint !== undefined
  );
  return topLevel || stateLevel;
}

/**
 * Dev-only: warn when a per-state CONTEXT override (`color`/`paint`) on the active
 * state is shadowed by a TOP-LEVEL `sx` pinning a hook that context controls. The
 * shadow is intentional (sx is tier-2 and always wins) but surprising, so we surface
 * the fix: move the override to the same tier (`states.<state>.sx`).
 *
 * The shadowable per-state context can come from EITHER the consumer
 * (`appearance.states[active]`) OR the leaf's built-in vocab (`vocab.states[active]`)
 * — both feed the same merged context. A top-level `sx` key is NOT flagged when the
 * consumer already pins that same key per-state at the sx tier
 * (`appearance.states[active].sx[key]`) — that's a deliberate same-tier override, no
 * real shadow.
 *
 * Inspects the STRUCTURED `appearance.sx` object only — never parses `className`
 * (brittle; spec §5.1). Emits a single `console.warn` per call. No-op when nothing
 * collides. The production guard lives at the call site (NODE_ENV check).
 */
function warnTierShadow(
  vocab: LeafVocabulary,
  appearance: (Appearance & { states?: Record<string, StateAppearance> }) | undefined,
  activeState: string | undefined,
): void {
  if (!activeState || !appearance) return;

  const topSx = appearance.sx;
  if (!topSx) return;

  const vocabState = vocab.states?.[activeState];
  const consumerState = appearance.states?.[activeState];
  // Per-state CONTEXT = color/paint on EITHER the vocab default OR the consumer override.
  const hasStateContext =
    (!!vocabState && (vocabState.color !== undefined || vocabState.paint !== undefined)) ||
    (!!consumerState && (consumerState.color !== undefined || consumerState.paint !== undefined));
  if (!hasStateContext) return;

  // Keys the consumer already pinned per-state at the sx tier — a real same-tier
  // override, so they don't count as shadowed.
  const consumerStateSx = (consumerState?.sx ?? {}) as Record<string, unknown>;

  const shadowed = Object.keys(SHADOWING_SX_HOOKS).filter(
    (key) =>
      (topSx as Record<string, unknown>)[key] !== undefined &&
      consumerStateSx[key] === undefined,
  );
  if (shadowed.length === 0) return;

  console.warn(
    `[atomic-aui] ${vocab.marker}: per-state '${activeState}' context (color/paint) is ` +
      `shadowed by a top-level sx pinning [${shadowed.join(', ')}]. To override per-state, ` +
      `set it at the sx tier (states.${activeState}.sx) instead.`,
  );
}

/**
 * Filter a resolved `sx` object down to the GRANULAR keys the leaf advertises in
 * `vocab.sxAxes`. A fixed-anatomy control (Checkbox/Switch/Radio) narrows its
 * `sxAxes` to non-anatomy hooks only — its marker class HARD-SETS padding/size/gap, so
 * a smuggled geometry override (`aui-padding-*`/`aui-width-*`) would shatter the marker
 * grid. Typed consumers can never pass a disallowed key, but a JS/`any`/cast consumer
 * can — so we enforce the allow-list at runtime. In dev, dropped keys are warned.
 *
 * Curated shorthands (`radius`/`borderWidth`) are EXPANDED to their granular keys
 * FIRST (via the same `expandShorthands` `buildStyleProps` uses), then the granular
 * result is filtered. So a shorthand whose expansion is allowed survives (Button +
 * controls both list the radius/border granular keys), while a smuggled granular
 * geometry key is dropped — and the warning names the granular key.
 */
function filterSxByAxes(
  vocab: LeafVocabulary,
  sx: Partial<AuiStyleProps & AuiStyleShorthands>,
): { filtered: Partial<AuiStyleProps>; dropped: string[] } {
  const granular = expandShorthands(sx);
  const allowed = new Set<string>(vocab.sxAxes as readonly string[]);
  const filtered: Partial<AuiStyleProps> = {};
  const dropped: string[] = [];
  for (const key of Object.keys(granular)) {
    if (allowed.has(key)) {
      (filtered as Record<string, unknown>)[key] = (granular as Record<string, unknown>)[key];
    } else {
      dropped.push(key);
    }
  }
  return { filtered, dropped };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Build the full `.aui-*` class string for a leaf component snapshot.
 *
 * @param vocab      - Static leaf descriptor (marker, profile, defaults, states).
 * @param appearance - Author-supplied customisation (may carry nested `states`).
 * @param activeState - Active state key (e.g. `'selected'`, `'indeterminate'`).
 * @param disabled    - When `true`, flips the chroma to the active paint's `disabled`
 *   cell (`aui-color-<paint>-disabled`). Orthogonal to the source cascade — it does
 *   NOT participate in `resolve()` (mirrors how `createToggleableRecipe` passes it
 *   straight through to `buildUnstyledClasses`).
 * @returns Space-separated, role-deduped class string.
 */
export function buildLeafClasses(
  vocab: LeafVocabulary,
  appearance: (Appearance & { states?: Record<string, StateAppearance> }) | undefined,
  activeState?: string,
  disabled?: boolean,
): string {
  const resolved = resolve(vocab, appearance, activeState);

  // Enforce the leaf's sxAxes allow-list at runtime — a JS/cast consumer can smuggle a
  // geometry key past the type system; drop it so it can't shatter the marker grid.
  const { filtered: filteredSx, dropped } = filterSxByAxes(vocab, resolved.sx);

  // Dev-only diagnostics (production no-op).
  if (process.env.NODE_ENV !== 'production') {
    if (dropped.length > 0) {
      console.warn(
        `[atomic-aui] ${vocab.marker}: sx key(s) [${dropped.join(', ')}] are not in this ` +
          `leaf's sxAxes — ignored (the marker hard-sets that anatomy).`,
      );
    }
    // Warn when a top-level sx silently shadows a per-state context override.
    warnTierShadow(vocab, appearance, activeState);
  }

  // Context classes — buildUnstyledClasses requires scale; default to 'md' when unset.
  // `profile` resolves consumer-first (`aui.profile`) then the component's pinned
  // `vocab.profile` default — so an icon-only trigger can opt into `'square-compact'`
  // without the component re-pinning its vocab. `disabled` flips the chroma to the
  // paint's `disabled` cell (orthogonal to resolve()).
  const contextClasses = buildUnstyledClasses({
    color: resolved.color,
    paint: resolved.paint,
    scale: resolved.scale ?? 'md',
    profile: resolved.profile ?? vocab.profile,
    shape: resolved.shape,
    disabled,
    // A cascade-reader frame, such as Accordion.Trigger/Panel, still needs frame/scale/shape/sx
    // classes but should not stamp its default paint cell over the parent Item. An explicit
    // author color/paint or the disabled chroma flip still emits a normal paint class.
    omitPaintContext: !!vocab.cascadeReader && !disabled && !hasExplicitContextOverride(appearance, activeState),
  });

  // Elevation class — a resolvable visual axis (not part of buildUnstyledClasses or the
  // sx filter). Emit `aui-elevation-<n>` only when set; mergeAuiClasses dedups the role,
  // so a consumer `className="aui-elevation-N"` still wins last-write.
  const elevationClass =
    resolved.elevation !== undefined ? `aui-elevation-${resolved.elevation}` : undefined;

  // sx classes — returns '' when nothing is set. Uses the axis-filtered sx.
  const sxClasses = buildStyleProps(filteredSx);

  // Compose: marker first, then context classes, elevation, then sx overrides.
  // mergeAuiClasses role-dedups across all fragments (last-wins per role).
  return mergeAuiClasses([vocab.marker, contextClasses, elevationClass, sxClasses || undefined]);
}
