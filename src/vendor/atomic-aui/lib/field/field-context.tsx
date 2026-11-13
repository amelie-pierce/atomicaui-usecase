// modules/design/atomic-aui/src/lib/field/field-context.tsx
//
// FieldAuiContext — the cascade carrier for the Field compound. ONE provider at
// `Field.Root` seeds the inherited axes; `Field.Control` reads them, merges its OWN
// {color,scale,shape,elevation} over the root, and RE-PROVIDES the merged value to the
// inner control row (a nested cascade — Control overrides Root for its descendants).
//
// Resolution contract (the NEW per-part cascade model — see the consume-doc + spec):
//   • The context carries ONLY the INHERITED axes { color, scale, shape, elevation }.
//     `profile`, `paint` and `sx` are NOT cascaded — each part owns those locally.
//   • EVERY part reads the nearest provider via `useFieldAui()` and resolves its OWN aui:
//       - scale     = own.scale     ?? inherited.scale     ?? <part default>
//       - shape     = own.shape     ?? inherited.shape     ?? <part default>
//       - profile   = own.profile   ?? <part default>            (NOT inherited — per-part)
//       - paint     = own.paint     ?? <part default>            (NOT inherited — pinned)
//       - color: two groups —
//           * Control + Description → own.color ?? inherited.color ?? 'surface' (FOLLOW root)
//           * Label/Error/Input/Icon/Button → own.color ?? 'surface'           (PIN surface)
//       - elevation: SURFACE-FRAME-only follow (mirrors color's two-group split, but narrower):
//           * Control / Group (the bordered surface) → own ?? inherited ?? <default>  (followElevation)
//           * every content part (Label/Description/Error/Input/Icon/Button/Unit/Legend/Steppers)
//             → own.elevation ?? <part default>  — elevation is a SURFACE property (a float/shadow);
//             content parts sit ON the surface and must NOT each carry their own shadow, so they do
//             NOT consume the cascaded elevation. The context still carries it for the frame.
//   • `mergeFieldAui(inherited, own)` = per-axis `{ ...inherited, ...own }` (own wins,
//     undefined-skip) over the FOUR inherited axes. paint/profile never flow; sx is only an
//     explicit wrapper-local merge seam and is never produced by `seedFieldAui`.
import * as React from 'react';
import type {
  AuiRecipeColor,
  AuiRecipeScale,
  AuiRecipeShape,
  AuiElevation,
} from '../../core/vocabulary/recipe-vocab';
import type { AuiFrameStyleProps } from '../../core/recipe/build-style-props';

/** Field cascade snapshot. `seedFieldAui` produces only color/scale/shape/elevation. */
export interface FieldResolvedAui {
  color?: AuiRecipeColor;
  scale?: AuiRecipeScale;
  shape?: AuiRecipeShape;
  elevation?: AuiElevation;
  /** Optional wrapper-local sx seam. Field/Fieldset/Control roots keep their own `sx` frame-local:
   *  `seedFieldAui` never projects it. Only code that explicitly passes an sx-bearing wrapper value
   *  can merge it, and the part's own `sx` still wins per key. */
  sx?: AuiFrameStyleProps;
}

/**
 * Project an `aui` (a frame Appearance) down to the INHERITED cascade snapshot the context carries
 * (color/scale/shape/elevation only — paint/profile/sx are per-part, never inherited). Pure
 * projection; no defaults applied (each part falls back to its own vocab default when an axis is
 * unset). Shared by `Field.Root`/`Field.Control` AND `Fieldset.Root` (the cascade-up seam) so the
 * projection rule lives in ONE place — Fieldset reuses this exact primitive rather than forking it.
 */
export function seedFieldAui(aui: FieldResolvedAui | undefined): FieldResolvedAui {
  const out: FieldResolvedAui = {};
  if (aui?.color !== undefined) out.color = aui.color;
  if (aui?.scale !== undefined) out.scale = aui.scale;
  if (aui?.shape !== undefined) out.shape = aui.shape;
  if (aui?.elevation !== undefined) out.elevation = aui.elevation;
  return out;
}

/** The default seed (no axes set → every part falls back to its own vocab default). */
const EMPTY_FIELD_AUI: FieldResolvedAui = {};

const FieldAuiContext = React.createContext<FieldResolvedAui>(EMPTY_FIELD_AUI);

export function useFieldAui(): FieldResolvedAui {
  return React.useContext(FieldAuiContext);
}

export const FieldAuiProvider = FieldAuiContext.Provider;

/**
 * Merge an inherited cascade snapshot with a part's own inherited-axis values — per-axis
 * `{ ...inherited, ...own }` (own wins, undefined-skip) over the FOUR cascaded axes
 * (color/scale/shape/elevation). `paint` and `profile` never flow. `sx` is not projected by
 * `seedFieldAui`; it is preserved only when an actual wrapper value already contains it.
 *
 * @param inherited the nearest `FieldAuiContext` value (Root, or Control's re-provided value)
 * @param own       the part's own inherited-axis values (may be undefined)
 */
export function mergeFieldAui(
  inherited: FieldResolvedAui,
  own?: FieldResolvedAui,
): FieldResolvedAui {
  const out: FieldResolvedAui = {};
  const color = own?.color ?? inherited.color;
  const scale = own?.scale ?? inherited.scale;
  const shape = own?.shape ?? inherited.shape;
  const elevation = own?.elevation ?? inherited.elevation;
  if (color !== undefined) out.color = color;
  if (scale !== undefined) out.scale = scale;
  if (shape !== undefined) out.shape = shape;
  if (elevation !== undefined) out.elevation = elevation;
  // `sx` is an object seam, not a root-seeded cascade axis. If an actual wrapper put sx in the
  // inherited/own value, preserve it per-key with own keys winning; otherwise no sx is emitted.
  if (inherited.sx !== undefined || own?.sx !== undefined) {
    out.sx = { ...inherited.sx, ...own?.sx };
  }
  return out;
}

/**
 * Per-part resolver — projects the NEW cascade model into a concrete part `aui`. Reads the
 * nearest `inherited` cascade and the part's `own` axes and resolves each axis per the
 * contract: scale/shape follow `own ?? inherited ?? default`; `profile`/`paint` are per-part
 * (`own ?? default`, never inherited); `color` follows `inherited` only when `followColor`
 * is set (Control + Description), else PINS the part default chroma; `elevation` follows
 * `inherited` only when `followElevation` is set (the SURFACE frame — Control/Group), else
 * PINS `own ?? default` (a content part never inherits the surface's float/shadow).
 *
 * Returns a COMPACT object (no `undefined` axes) so a projected `aui` never pins an axis
 * the part left to its own vocab default.
 */
export function resolvePartAui(
  inherited: FieldResolvedAui,
  own: (FieldResolvedAui & { profile?: string; paint?: string; sx?: AuiFrameStyleProps }) | undefined,
  defaults: {
    paint?: string;
    profile?: string;
    /** the part's pinned default chroma when color does NOT follow the cascade */
    color?: AuiRecipeColor;
    scale?: AuiRecipeScale;
    shape?: AuiRecipeShape;
    elevation?: AuiElevation;
    /** Control + Description follow the inherited chroma; the rest pin their own. */
    followColor?: boolean;
    /** The SURFACE frame (Control / Group) follows the inherited elevation; content parts pin
     *  their own (elevation is a surface float — a content part must not carry its own shadow). */
    followElevation?: boolean;
  },
): {
  color?: AuiRecipeColor;
  paint?: string;
  scale?: AuiRecipeScale;
  shape?: AuiRecipeShape;
  elevation?: AuiElevation;
  profile?: string;
  sx?: AuiFrameStyleProps;
} {
  const color = defaults.followColor
    ? (own?.color ?? inherited.color ?? defaults.color)
    : (own?.color ?? defaults.color);
  const scale = own?.scale ?? inherited.scale ?? defaults.scale;
  const shape = own?.shape ?? inherited.shape ?? defaults.shape;
  // elevation follows the cascade ONLY for the surface frame (followElevation); content parts pin
  // `own ?? default` so a Root/Group-seeded float never lands a shadow on the inner text/icons/buttons.
  const elevation = defaults.followElevation
    ? (own?.elevation ?? inherited.elevation ?? defaults.elevation)
    : (own?.elevation ?? defaults.elevation);
  const profile = own?.profile ?? defaults.profile;
  const paint = own?.paint ?? defaults.paint;

  const out: Record<string, unknown> = {};
  if (color !== undefined) out.color = color;
  if (paint !== undefined) out.paint = paint;
  if (scale !== undefined) out.scale = scale;
  if (shape !== undefined) out.shape = shape;
  if (elevation !== undefined) out.elevation = elevation;
  if (profile !== undefined) out.profile = profile;
  // `sx` remains local to the part unless a wrapper explicitly supplied an sx-bearing inherited value.
  // Field.Root/Fieldset/Control seeds do not do that (`seedFieldAui` drops sx), so normal resolution
  // reduces to `own.sx`, with own keys winning if a wrapper seam is ever present.
  if (inherited.sx !== undefined || own?.sx !== undefined) {
    out.sx = { ...inherited.sx, ...own?.sx };
  }
  return out as ReturnType<typeof resolvePartAui>;
}

/** Strip `undefined` axes so a projected `aui` never pins an axis the cascade left open. */
export function compactAui<T extends Record<string, unknown>>(aui: T): Partial<T> {
  const out: Partial<T> = {};
  for (const [k, v] of Object.entries(aui)) {
    if (v !== undefined) (out as Record<string, unknown>)[k] = v;
  }
  return out;
}
