// Table recipe layer — the vocabularies + class builders for the intrinsic <table>/<tr>/<td>/<th>
// leaves. <tr>/<td>/<th> are intrinsic elements with no Base UI render-state, and the factory's
// function-className `as`-guard throws for an intrinsic string `as`, so the Table leaves build their
// class strings imperatively through `buildLeafClasses` (the principled intrinsic analog of the
// select-item family) rather than `createAtomicComponent`.
//
// The CELL is the centre of the rebuild: both the body <td> and the header <th> resolve their class
// string AND their "do I paint my own surface?" flag through ONE function — `resolveCellSurface` — so
// the who-paints decision lives in a single place instead of being split across the cell component, a
// separate painted-surface probe, and the SCSS.

import { buildLeafClasses } from '../../core/recipe/build-leaf-classes';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps, AuiTextAlignValue } from '../../tokens/index';
import {
  defineLeaf,
  type Appearance,
  type LeafVocabulary,
  type StateAppearance,
} from '../../core/vocabulary/leaf-vocabulary';
import type {
  AuiElevation,
  AuiRecipeColor,
  AuiRecipePaint,
  AuiRecipeScale,
  AuiRecipeShape,
  AuiScaleProfile,
} from '../../core/vocabulary/recipe-vocab';

// ─── Public axis aliases ────────────────────────────────────────────────────
// NO INVENTED PROFILES: `TableProfile` is the REAL `AuiScaleProfile` union — the Table consumes the
// generated `aui-scale-<profile>-<tier>` cells (default / compact / block-padding / …) like every other
// component. There is no hand-authored `table` / `table-compact` density profile (none exist in Figma).
export type TableColor = AuiRecipeColor;
export type TablePaint = AuiRecipePaint;
export type TableScale = AuiRecipeScale;
export type TableProfile = AuiScaleProfile;
export type TableShape = AuiRecipeShape;
export type TableElevation = AuiElevation;

// A selectable leaf (Row / Cell) has THREE states. `indeterminate` = a grouped-mode group header whose
// leaf children are only PARTIALLY selected.
export type TableRowStateKey = 'unselected' | 'selected' | 'indeterminate';

/** The PUBLIC fine-grained override axis (where the selected look / hover paints). */
export type TableInteractionTarget = 'row' | 'cell';
/** The INTERNAL resolved target — adds the `none` sentinel (selection=none kills hover entirely). */
export type TableResolvedTarget = 'none' | 'row' | 'cell';

// ─── aui shapes ─────────────────────────────────────────────────────────────
// The root <table> is a box → full 7-axis appearance. Row + Cell are selectable leaves → appearance +
// per-state overrides (full per-state appearance incl. `sx`, e.g. a left-accent bar via
// `sx.borderInlineStartWidth`). The brand accent is supplied by the consumer, never baked in.
export type TableRootAui = Pick<Appearance, 'color' | 'paint' | 'scale' | 'profile' | 'shape' | 'elevation' | 'sx'>;

export type TableRowStateAppearance = Omit<StateAppearance, 'sx'> & { sx?: AuiFrameStyleProps };
export type TableCellStateAppearance = TableRowStateAppearance;

export type TableRowAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: Partial<Record<TableRowStateKey, TableRowStateAppearance>>;
};

export type TableCellAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: Partial<Record<TableRowStateKey, TableCellStateAppearance>>;
};

// FULL 32-axis sx surface on every Table box (G13 — the <table> root and every <tr>/<td>/<th> is a box).
export const TABLE_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

// ─── Vocabularies (one shared base, four markers) ────────────────────────────
// All four leaves share the neutral surface defaults + context axes + the full sx surface; they differ
// only in marker, pinned profile, and (for Row/Cell) the selectable state map.
const TABLE_NEUTRAL_DEFAULTS = {
  color: 'surface',
  paint: 'text',
  scale: 'sm',
  shape: 'none',
  elevation: 0,
} as const satisfies Omit<Appearance, 'profile'>;

// The tier an auto-rendered ROW/HEADER control (the selection toggle, the expand chevron, the header
// master select-all) inherits when neither it nor the table set a scale. It is the SAME vocab default the
// rows/cells resolve to — so the controls track the table density instead of pinning a hardcoded tier
// (G15: a reference, never a stale literal). The row/header controls thread this through
// `resolveAuiScale(own, ctx.density.scale, TABLE_DEFAULT_SCALE)`, so a root `aui.scale` cascades to them
// and an explicit per-control `aui.scale` still wins.
export const TABLE_DEFAULT_SCALE: TableScale = TABLE_NEUTRAL_DEFAULTS.scale;

// The consumer-overridable selected look (the togglable pattern, NOT a baked recipe). R5: the SELECTED
// row reads a neutral `raised` tonal band (a calm, brand-agnostic highlight — the consumer supplies a
// chroma accent via `rowAui.states.selected`, never baked in); `indeterminate` keeps a distinct hue
// (info) so a partially-selected group header reads apart from the selected tint.
const TABLE_SELECTABLE_STATES = {
  unselected: { color: 'surface', paint: 'tonal' },
  selected: { color: 'raised', paint: 'tonal' },
  indeterminate: { color: 'info', paint: 'tonal' },
} as const satisfies Partial<Record<TableRowStateKey, StateAppearance>>;

const TABLE_CONTEXT_AXES = ['color', 'paint', 'scale', 'shape'] as const;

// Root: the <table> box owns NO padding (table padding would inset every row); the <td> is the single
// padding owner. `no-padding` zeros the root's painted padding while the cells carry their own density.
export const TABLE_ROOT_VOCAB = defineLeaf({
  marker: 'aui-table',
  contextAxes: TABLE_CONTEXT_AXES,
  sxAxes: TABLE_SX_AXES,
  profile: 'no-padding' as const,
  // #R4 the grid BORDER COLOUR unifies on the root `aui.sx.borderColor` (default `outlined` — the
  // structural-hairline role). `buildLeafClasses` emits `.aui-border-color-outlined` (0,1,0) on the
  // <table>, setting the root's `--aui-border-color` (which the root's own `paint:'text'` colour class
  // otherwise pins to transparent at 0,0,0). The root routing rule then republishes this into the
  // inheriting `--aui-table-border-color` that every border rule reads — a consumer `aui.sx.borderColor`
  // overrides the default at the same layer-3 hook and recolours EVERY border (frame, between-rows,
  // all-cells, nested/treegrid rows, expanded divider).
  defaults: { ...TABLE_NEUTRAL_DEFAULTS, sx: { borderColor: 'outlined' } },
});

// Row: a structural container. A `display:table-row` element ignores padding anyway, so the row stays
// `no-padding` (the cell owns padding) — a consumer can still set its own `aui.profile`.
export const TABLE_ROW_VOCAB = defineLeaf({
  marker: 'aui-table-row',
  contextAxes: TABLE_CONTEXT_AXES,
  sxAxes: TABLE_SX_AXES,
  profile: 'no-padding' as const,
  defaults: TABLE_NEUTRAL_DEFAULTS,
  states: TABLE_SELECTABLE_STATES,
});

// Body cell: the single padding owner (`default` profile, `sm` tier by default). A SELECTABLE leaf —
// when the unified target routes selection to the cell, it paints the per-state look via its states.
export const TABLE_CELL_VOCAB = defineLeaf({
  marker: 'aui-table-cell',
  contextAxes: TABLE_CONTEXT_AXES,
  sxAxes: TABLE_SX_AXES,
  profile: 'default' as const,
  defaults: TABLE_NEUTRAL_DEFAULTS,
  states: TABLE_SELECTABLE_STATES,
});

// Header cell: a solid `overlay` band (R5) — a distinct, OPAQUE tint so the self-scroll sticky header
// does not bleed the scrolled rows through it. Stateless. Consumer-overridable (e.g. `{ paint: 'text' }`
// flattens it: the resolved paint becomes `text` → it no longer paints its own surface → the row band
// shows).
export const TABLE_HEADER_CELL_VOCAB = defineLeaf({
  marker: 'aui-table-header-cell',
  contextAxes: TABLE_CONTEXT_AXES,
  sxAxes: TABLE_SX_AXES,
  profile: 'default' as const,
  defaults: { ...TABLE_NEUTRAL_DEFAULTS, color: 'overlay', paint: 'solid' },
});

// ─── Density cascade ─────────────────────────────────────────────────────────
/** The root density (aui.scale / profile) a row/cell inherits when it sets none of its own. */
export interface TableInheritedDensity {
  scale?: TableScale;
  profile?: TableProfile;
}

// `buildLeafClasses` ALWAYS pins an `aui-scale-<profile>-<tier>` class on each cell (an own declaration),
// which beats the root's inherited `--aui-padding-*` rail — even though those rails ARE `@property
// inherits:true` (verified in `_component-tokens.scss`). So a cell with its own class would ignore a root
// `aui.scale`/`profile`. To make root density CASCADE, we thread the resolved root density onto each
// cell's appearance, so the cell emits the resolved class; an explicit cell/row scale/profile still wins.
// This is the imperative analog of the `AuiScaleProvider` rail other components use, done by hand for the
// intrinsic <tr>/<td>.
function withInheritedDensity<T extends { scale?: TableScale; profile?: TableProfile }>(
  aui: T | undefined,
  inherited: TableInheritedDensity | undefined,
): T | undefined {
  if (!inherited || (!inherited.scale && !inherited.profile)) return aui;
  return {
    ...(aui as T),
    scale: aui?.scale ?? inherited.scale,
    profile: aui?.profile ?? inherited.profile,
  } as T;
}

type CellAppearance = (Appearance & { states?: Record<TableRowStateKey, StateAppearance> }) | undefined;

// ─── Root + Row class builders ────────────────────────────────────────────────
export function buildTableRootClasses(aui: TableRootAui | undefined): string {
  return buildLeafClasses(TABLE_ROOT_VOCAB, aui as Appearance | undefined);
}

export function buildTableRowClasses(
  aui: TableRowAui | undefined,
  activeState: TableRowStateKey | undefined,
  inherited?: TableInheritedDensity,
): string {
  // The row inherits only the root SCALE TIER (never the padding profile) — it stays no-padding so the
  // cell remains the single padding owner.
  const rowInherited: TableInheritedDensity | undefined = inherited?.scale ? { scale: inherited.scale } : undefined;
  return buildLeafClasses(TABLE_ROW_VOCAB, withInheritedDensity(aui, rowInherited) as CellAppearance, activeState);
}

// ─── Cell surface (the rebuilt core — body <td> + header <th>) ─────────────────
/** Which leaf is being resolved — picks the vocab and whether an active selection state applies. */
export type TableCellRole = 'body' | 'header';

/** The resolved cell render inputs: the `.aui-*` class string + whether the cell paints its OWN surface. */
export interface TableCellSurface {
  className: string;
  /**
   * `true` when the cell carries its OWN background (a non-`text` paint OR an `sx.background`). The
   * `<td>`/`<th>` stamps `data-aui-table-cell-painted` from this, which switches the SCSS bg source to
   * `--aui-bg` so the cell chroma wins over the inherited row band. The header's default solid `overlay`
   * band paints through exactly this hook (no separate header bg rule), and a `paint:'text'` override
   * flips it off → the row band shows through (a flat header).
   */
  painted: boolean;
}

/**
 * Resolve the effective PAINT for a cell, mirroring `buildLeafClasses`' source cascade
 * (`vocab.defaults < vocab.states[state] < aui < aui.states[state]`) so the painted-surface flag can
 * never drift from the class the cell actually renders.
 */
function resolveCellPaint(
  vocab: LeafVocabulary,
  aui: TableCellAui | undefined,
  activeState: TableRowStateKey | undefined,
): TablePaint | undefined {
  const stateAui = activeState ? aui?.states?.[activeState] : undefined;
  const vocabStatePaint = activeState
    ? (vocab.states?.[activeState] as StateAppearance | undefined)?.paint
    : undefined;
  return stateAui?.paint ?? aui?.paint ?? vocabStatePaint ?? vocab.defaults?.paint;
}

/**
 * THE single resolution point for both Table cells. Returns the class string (with the root density
 * threaded in so it cascades — see `withInheritedDensity`) and the `painted` flag. The header is
 * STATELESS so it ignores any active state; the body cell threads the active selection state (set only
 * when the unified target routes selection to the cell — the cell-selection rule).
 */
export function resolveCellSurface(
  role: TableCellRole,
  aui: TableCellAui | undefined,
  activeState: TableRowStateKey | undefined,
  inherited: TableInheritedDensity | undefined,
): TableCellSurface {
  const vocab = role === 'header' ? TABLE_HEADER_CELL_VOCAB : TABLE_CELL_VOCAB;
  const state = role === 'header' ? undefined : activeState;
  const className = buildLeafClasses(vocab, withInheritedDensity(aui, inherited) as CellAppearance, state);
  const paint = resolveCellPaint(vocab, aui, state);
  const background = (state ? aui?.states?.[state]?.sx?.background : undefined) ?? aui?.sx?.background;
  return { className, painted: !!(background || (paint && paint !== 'text')) };
}

// ─── Per-column layout (DATA mode) ─────────────────────────────────────────────
/** The minimal shape of a TanStack column def the Table reads for per-column geometry. */
export interface TableColumnDefLayout {
  size?: number;
  meta?: { align?: AuiTextAlignValue };
}

/** Resolved per-column geometry for a single cell. */
export interface TableColumnLayout {
  /** The column text-align class (BASE precedence; a cell `aui.sx.textAlign` overrides). */
  alignClass?: string;
  /** The per-column width (px) to set on the `--aui-width` hook, or undefined. */
  width?: number;
}

// TanStack merges its DEFAULT column sizing (`size: 150`) onto every `columnDef.size`, so a column that
// set NO size still reports 150 — there is no `undefined` signal for "unset". We therefore treat the
// framework default (150) as AUTO (no pinned width → the column hugs / fills naturally); a consumer pins
// a width by setting any OTHER `columnDef.size`. (Matches the framework semantics: 150 = "I didn't pick
// one".) Pinning exactly 150px is the one unreachable value — pin 149/151 instead.
const TANSTACK_DEFAULT_COLUMN_SIZE = 150;

/**
 * Resolve a column's text-align class + width from its TanStack `columnDef`. The width reads
 * `columnDef.size` (treating the framework default 150 as AUTO — see above) and is SUPPRESSED when the
 * cell already carries its own `aui.sx.width` (so an explicit per-cell width wins over the column
 * default). The align reuses the existing `aui-text-align-<align>` static utility — no new emitter work.
 */
export function resolveColumnLayout(
  columnDef: TableColumnDefLayout | undefined,
  hasOwnWidth: boolean,
): TableColumnLayout {
  if (!columnDef) return {};
  const align = columnDef.meta?.align;
  const pinnedWidth =
    columnDef.size != null && columnDef.size !== TANSTACK_DEFAULT_COLUMN_SIZE ? columnDef.size : undefined;
  return {
    alignClass: align ? `${STYLE_PROP_MAP.textAlign}-${align}` : undefined,
    width: !hasOwnWidth ? pinnedWidth : undefined,
  };
}
