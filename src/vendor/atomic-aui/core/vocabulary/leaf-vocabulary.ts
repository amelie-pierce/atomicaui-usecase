// Foundation types for the unified `aui` component vocabulary.
// These types describe HOW an author customises a leaf component — no resolution
// logic lives here. That comes in later tasks (use-recipe, resolve-appearance, …).
//
// Import chain: core → tokens only (no component imports, no CSS side-effects).

import type {
  AuiRecipeColor,
  AuiRecipePaint,
  AuiRecipeScale,
  AuiRecipeShape,
  AuiScaleProfile,
  AuiElevation,
} from './recipe-vocab';
import type { AuiStyleProps } from '../../tokens/index';

// ─── Context axes ────────────────────────────────────────────────────────────

/** The four compound-token axes a leaf component can participate in. */
type AuiContextAxis = 'color' | 'paint' | 'scale' | 'shape';

// ─── Appearance ──────────────────────────────────────────────────────────────

/**
 * The ONE customisation shape for a leaf component.
 *
 * Flat context props (`color`, `paint`, `scale`, `shape`) drive the recipe
 * class matrix; nested `sx` applies typed layer-3 style-prop overrides on top.
 * This is what authors pass as the top-level `appearance` prop and what each
 * `states.<key>` entry holds (minus `scale`/`profile` — see `StateAppearance`).
 *
 * `scale` is the size TIER (`xs…xl`); `profile` is the size PROFILE
 * (`default`/`compact`/`square`/`square-compact`/…) — together they form the
 * compound class `aui-scale-<profile>-<tier>`. `profile` is OPTIONAL and falls
 * back to the component's pinned `vocab.profile` when unset, so most consumers
 * never touch it — but exposing it lets a frame consumer opt into a different
 * profile (e.g. an icon-only Dropdown trigger → `profile: 'square-compact'`).
 */
export interface Appearance {
  color?: AuiRecipeColor;
  paint?: AuiRecipePaint;
  scale?: AuiRecipeScale;
  /**
   * Size profile of the `200-Scale` axis. Falls back to the component's pinned
   * `vocab.profile` when unset. Together with `scale` it forms the compound class
   * `aui-scale-<profile>-<tier>`. Resolvable at the top level AND per-state (see
   * `StateAppearance`) — a selectable leaf MAY resize/reshape geometry per state.
   */
  profile?: AuiScaleProfile;
  shape?: AuiRecipeShape;
  /**
   * Drop-shadow level → `aui-elevation-<n>`. A VISUAL axis (not geometry), so it
   * is resolvable per-state like color/paint (NOT excluded from `StateAppearance`).
   */
  elevation?: AuiElevation;
  sx?: Partial<AuiStyleProps>;
}

/**
 * The canonical PUBLIC name for the unified appearance shape — the SEVEN axes
 * `{ color, paint, scale, profile, shape, elevation, sx }` every frame leaf and
 * frame part accepts. Alias of {@link Appearance} (the internal name kept for the
 * existing import graph). Use `AppearanceProps` in component-facing types.
 */
export type AppearanceProps = Appearance;

/**
 * Per-state appearance entry — the FULL `AppearanceProps`.
 *
 * As of the unified-states model (2026-06-11), a per-state entry may set EVERY
 * axis, INCLUDING the geometry axes `scale`/`profile`: a selectable leaf is
 * allowed to resize/reshape per state (the resolver recomputes the compound
 * `aui-scale-<profile>-<tier>` for the active state). Stable geometry remains the
 * NORM — vocab defaults should keep geometry constant unless a state deliberately
 * opts into a different size.
 */
export type StateAppearance = AppearanceProps;

// ─── Selectable state vocabulary ─────────────────────────────────────────────

/**
 * The canonical state set for a SELECTABLE leaf/part. `disabled` is NOT here —
 * it stays an orthogonal chroma flip (the active state resolves first, then the
 * disabled cell is applied). A leaf adapter maps its headless core's render state
 * (Base UI `{ checked, indeterminate }`, a table selection flag, …) onto these.
 */
export type AuiStateKey = 'unselected' | 'selected' | 'indeterminate';

/**
 * The `aui.states` shape: per-state appearance overrides keyed by {@link AuiStateKey}.
 * Each entry is a full {@link AppearanceProps}. Resolution per active state:
 * `vocab.defaults < vocab.states[state] < aui (top-level) < aui.states[state]` —
 * so a top-level `aui` axis applies to EVERY state and `aui.states.<state>.<axis>`
 * overrides it for just that state.
 */
export type AuiStates = Partial<Record<AuiStateKey, AppearanceProps>>;

// ─── LeafVocabulary ──────────────────────────────────────────────────────────

/**
 * Static descriptor for a leaf component's customisation contract.
 *
 * Each component defines exactly one `LeafVocabulary` via `defineLeaf` and
 * uses it to drive recipe resolution, prop filtering, and sx merging.
 * Only the fields relevant to the component are populated — YAGNI applies.
 */
export interface LeafVocabulary {
  /** BEM-style marker class emitted on the root element (e.g. `'aui-switch'`). */
  marker: string;

  /**
   * Which context axes this component participates in.
   * Determines which author props are forwarded to the recipe.
   * Declare `as const` to preserve literal tuple types.
   */
  contextAxes: readonly AuiContextAxis[];

  /**
   * Which `AuiStyleProps` keys this component exposes via `sx`.
   * Acts as an allow-list for the sx resolver — unlisted keys are ignored.
   * Declare `as const` to preserve literal tuple types.
   */
  sxAxes: readonly (keyof AuiStyleProps)[];

  /**
   * Scale profile — the component's pinned DEFAULT for the `200-Scale` profile
   * axis (e.g. `'checkable'`, `'switch'`, `'default'`). It is the fallback used
   * when a consumer does NOT set `aui.profile`; a consumer MAY override it via
   * the top-level `aui.profile` axis (e.g. an icon-only trigger →
   * `'square-compact'`). Resolution: `appearance.profile ?? vocab.profile`.
   */
  profile?: AuiScaleProfile;

  /**
   * Default appearance applied when no explicit props are passed. `profile` is
   * EXCLUDED here — the component's pinned profile lives in the dedicated
   * `vocab.profile` field (and is the fallback for an unset `aui.profile`), so a
   * `defaults.profile` would be silently ignored by the resolver. Set `profile`
   * at the vocab top level, not inside `defaults`.
   */
  defaults?: Omit<Appearance, 'profile'>;

  /**
   * Named per-state appearance overrides (e.g. `selected`, `unselected`, `indeterminate`).
   * Keys match the active-state key the leaf's recipe resolves (see `AuiStateKey`).
   * Each entry is a full `StateAppearance` (= `AppearanceProps`) — geometry axes
   * (`scale`/`profile`) ARE allowed per-state.
   */
  states?: Partial<Record<string, StateAppearance>>;

  /**
   * When `true` the component reads the nearest context-fan ancestor for its
   * default appearance (opt-in; most standalone leaves set this to `false`).
   */
  cascadeReader?: boolean;
}

// ─── defineLeaf ──────────────────────────────────────────────────────────────

/**
 * Identity helper that returns its argument unchanged while preserving the
 * literal types of `contextAxes` and `sxAxes` (avoids widening to `string[]`).
 *
 * Usage:
 * ```ts
 * export const VOCAB = defineLeaf({
 *   marker: 'aui-switch',
 *   contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
 *   sxAxes: ['background'] as const,
 *   profile: 'switch',
 * });
 * ```
 */
export function defineLeaf<const V extends LeafVocabulary>(v: V): V {
  return v;
}
