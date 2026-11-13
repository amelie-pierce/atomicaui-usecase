// modules/design/atomic-aui/src/lib/chip/chip.tsx
//
// Chip — a status-display pill (success / warning / error / info / neutral). A frame leaf + three
// composed parts, assembled the way Button/Tabs are:
//   • Chip (frame leaf)   — a structural inline-flex `<span>` row (marker `aui-chip`) painted by
//                           `useChipRecipe` (stateless). It seeds a 5-axis cascade
//                           (color/paint/scale/shape/elevation) to its parts via `ChipAuiContext`,
//                           copying Tabs Root's cascadeSeed pattern; `profile` + `sx` stay Root-local.
//   • Chip.Icon (part)    — a thin `ContainedIcon` sizing from the host chip's icon-container rail;
//                           NO color spread → the glyph inherits the chip CONTENT color via
//                           currentColor (G21 — the Tabs.Icon orange-on-orange fix).
//   • Chip.Label (part)   — a thin `Type` (rendered `as="span"`, phrasing content inside the span
//                           chip) for the caption; inherits the chip's font size + content color.
//   • Chip.Dismiss (part) — an OPTIONAL trailing `IconButton` (paint:'text' — borderless ×) following
//                           the chip cascade and fitting the host icon-container rail by default; stops click propagation so the
//                           × never triggers a parent Chip onClick, and REQUIRES an accessible name
//                           (IconButton's own type union). Mirrors Tabs.CloseButton.
//
// Chip is STATELESS (a status display): NO `useStateLayer`, NO `aui.states`. The Figma `Checkable
// Chip` variant (a selectable/togglable chip) is a SEPARATE follow-up — out of v1 scope.
import * as React from 'react';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { resolveAuiScale } from '../scale-cascade/use-aui-scale';
import { prependMarkerClassName } from '../../core/recipe/prepend-marker-class-name';
import { ContainedIcon, type ContainedIconProps, type ContainedIconAui } from '../icon';
import { IconButton, type IconButtonProps } from '../icon-button';
import { Type, type TypeProps } from '../type';
import { useChipRecipe, CHIP_DEFAULT_SCALE } from './use-recipe';
import type {
  ChipColor,
  ChipPaint,
  ChipScale,
  ChipShape,
  ChipElevation,
  ChipAui,
} from './use-recipe';

export {
  CHIP_VOCAB,
  CHIP_SX_AXES,
  CHIP_DEFAULT_SCALE,
  useChipRecipe,
} from './use-recipe';
export type {
  ChipAui,
  ChipColor,
  ChipPaint,
  ChipScale,
  ChipProfile,
  ChipShape,
  ChipElevation,
} from './use-recipe';

// ─── Chip appearance cascade — color + paint + scale + shape + elevation ──────────────────────────
// The Chip seeds these FIVE inheritable axes (the cascadeReader subset the parts inherit) so a
// `<Chip color="success">` flows its chroma to the Icon/Dismiss with no per-part props. `profile` +
// `sx` are Root-LOCAL (they shape the wrapper cell only) — NOT cascaded. A part's OWN axis always
// wins. Clones Tabs Root's `cascadeSeed`/`compactDefined` (tabs.tsx) — the proven mechanism.
interface ChipCascade {
  color?: ChipColor;
  paint?: ChipPaint;
  scale?: ChipScale;
  shape?: ChipShape;
  elevation?: ChipElevation;
}
const EMPTY_CHIP_CASCADE: ChipCascade = {};
const ChipAuiContext = React.createContext<ChipCascade>(EMPTY_CHIP_CASCADE);
function useChipCascade(): ChipCascade {
  return React.useContext(ChipAuiContext);
}

/** The cascaded axes of `inherited`, as a seed object (only DEFINED axes). */
function cascadeSeed(inherited: ChipCascade): Record<string, unknown> {
  const seed: Record<string, unknown> = {};
  if (inherited.color !== undefined) seed.color = inherited.color;
  if (inherited.paint !== undefined) seed.paint = inherited.paint;
  if (inherited.scale !== undefined) seed.scale = inherited.scale;
  if (inherited.shape !== undefined) seed.shape = inherited.shape;
  if (inherited.elevation !== undefined) seed.elevation = inherited.elevation;
  return seed;
}

/** Drop UNDEFINED-valued keys so an explicit `undefined` axis (from a spread) can't CLOBBER an
 *  inherited/default value when spread last. */
function compactDefined(obj: Record<string, unknown> | undefined): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj ?? {})) if (v !== undefined) out[k] = v;
  return out;
}

// ─── Chip.Root — a structural inline-flex `.aui-frame` span + cascade seed ────────────────────────
const _Chip = createAtomicComponent('span', {
  extensions: [useChipRecipe],
});

export interface ChipProps extends Omit<React.ComponentPropsWithoutRef<'span'>, 'color'> {
  /** The FULL frame surface for the `.aui-chip` pill (color/paint/scale/profile/shape/elevation +
   *  sx). It ALSO seeds the cascade for the parts (Icon / Label / Dismiss); a part's own axis always
   *  wins. The CASCADED axes are color + paint + scale + shape + elevation; `profile` + `sx` are
   *  ROOT-LOCAL (the wrapper cell), NOT cascaded. Defaults: surface-alt / solid / sm /
   *  default / soft / 0. */
  aui?: ChipAui;
}

const ChipRoot = React.forwardRef<HTMLSpanElement, ChipProps>(function Chip(
  { aui, children, ...rest },
  ref,
) {
  // Cascade seed = the RESOLVED 5 inheritable axes from the Chip's own `aui` (`cascadeSeed` copies
  // color/paint/scale/shape/elevation; `profile` + `sx` are Root-local, NOT cascaded). Unset → empty.
  const cascade = React.useMemo<ChipCascade>(
    () => (aui ? (cascadeSeed(aui as ChipCascade) as ChipCascade) : EMPTY_CHIP_CASCADE),
    [aui],
  );

  return React.createElement(
    _Chip as React.ElementType,
    { ref, ...rest, aui },
    React.createElement(ChipAuiContext.Provider, { value: cascade }, children),
  );
});
ChipRoot.displayName = 'Chip';

// ─── Chip.Icon — the leading status glyph (a host-fitting ContainedIcon) ──────────────────────────
// A thin wrapper over `ContainedIcon` that intentionally does NOT default a profile. Like Button.Icon,
// the unprofiled box inherits the host Chip's `--aui-icon-container` / `--aui-icon-size`, so a
// non-default host profile such as `profile:'chip'` does not get inflated by a child contained-sm box.
// It still sizes to its EFFECTIVE tier read off the Chip cascade: own `aui.scale` ?? cascade scale ??
// the Chip vocab default (READ the vocab default, NOT a literal — G15). The glyph inherits the parent
// Chip's CONTENT color via `currentColor`; it does NOT re-resolve the cascaded color ROLE (G21). Own
// `aui.profile` / `aui.sx` still wins because those classes are emitted on this part.
export type ChipIconProps = ContainedIconProps;
const ChipIcon = React.forwardRef<HTMLSpanElement, ChipIconProps>(function ChipIcon(
  { aui, ...rest },
  ref,
) {
  const inherited = useChipCascade();
  const resolvedScale = resolveAuiScale(aui?.scale, inherited.scale, CHIP_DEFAULT_SCALE);
  const resolvedAui = React.useMemo<ContainedIconAui>(
    () => ({ ...aui, scale: resolvedScale }),
    [aui, resolvedScale],
  );
  return (
    <ContainedIcon
      ref={ref}
      {...(rest as ContainedIconProps)}
      aui={resolvedAui}
      className={prependMarkerClassName('aui-chip-icon', rest.className) as string | undefined}
    />
  );
});
ChipIcon.displayName = 'Chip.Icon';

// ─── Chip.Label — the caption text (a Type, rendered as a span) ───────────────────────────────────
// A thin `Type` wrapper for the chip's caption. Rendered `as="span"` (phrasing content — the Chip is
// a `<span>`, so a default `<p>` would be invalid). It carries NO typescale role by default, so it
// INHERITS the chip's resolved font size (the `default` profile cell sets
// `--aui-font-size-context`, which the `.aui-frame` paints) AND the chip's content color
// (`currentColor`). This is plain status text, NOT the input↔label a11y `*.Label` family.
export type ChipLabelProps = TypeProps;
const ChipLabel = React.forwardRef<HTMLElement, ChipLabelProps>(function ChipLabel(
  { as, className, ...rest },
  ref,
) {
  return (
    <Type
      ref={ref}
      as={as ?? 'span'}
      {...rest}
      className={prependMarkerClassName('aui-chip-label', className) as string | undefined}
    />
  );
});
ChipLabel.displayName = 'Chip.Label';

// ─── Chip.Dismiss — the OPTIONAL trailing × (an IconButton, borderless) ───────────────────────────
// A thin wrapper over the shipped `IconButton` that FOLLOWS the Chip cascade (color + paint + scale +
// shape + elevation), precedence **own `aui` ?? Chip cascade ?? part default** ({ profile:'contained',
// paint:'text' } — a borderless × snug in the row). When the consumer does NOT provide a dismiss
// profile, the host-fit marker maps the button's size hooks to the Chip's host icon-container rail so
// the default contained-sm IconButton cannot inflate a `profile:'chip'` host. An explicit
// `aui.profile` skips that marker; `aui.sx` still wins over it. Clicking the × must NOT trigger a
// parent Chip onClick — a DS DEFAULT: it stops propagation on BOTH pointerdown AND click (the button
// still fires its OWN handlers for the consumer's dismiss). The accessible name (aria-label/
// aria-labelledby) is enforced by IconButton's own type union. `flex-shrink:0` marker keeps it from
// collapsing when chips pack a row.
export type ChipDismissProps = Omit<IconButtonProps, 'name'> & {
  /** The dismiss glyph. Defaults to `'xmark'`. */
  name?: string;
};
const ChipDismiss = React.forwardRef<HTMLButtonElement, ChipDismissProps>(function ChipDismiss(
  { aui, name = 'xmark', className, onPointerDown, onClick, ...rest },
  ref,
) {
  const inherited = useChipCascade();
  // Dismiss follows the chip cascade then a per-button `aui` wins; the part defaults (profile
  // 'contained', paint 'text') fill any STILL-unset axis. Paint falls back to 'text' ONLY when
  // neither own nor the cascade set it (a chip-root `paint` still cascades; a per-button `aui.paint`
  // still wins). Scale resolved off the cascade tier (own ?? inherited ?? vocab default — G15).
  const resolvedScale = resolveAuiScale(aui?.scale, inherited.scale, CHIP_DEFAULT_SCALE);
  const resolvedAui = React.useMemo<IconButtonProps['aui']>(() => {
    const merged = {
      ...cascadeSeed(inherited),
      ...compactDefined(aui as Record<string, unknown> | undefined),
      profile: aui?.profile ?? 'contained',
      scale: resolvedScale,
    } as Record<string, unknown>;
    if (merged.paint === undefined) merged.paint = 'text';
    return merged as IconButtonProps['aui'];
  }, [inherited, aui, resolvedScale]);

  // Clicking the × must NOT bubble to a parent Chip onClick — a DS default (matches Tabs.CloseButton).
  // stopPropagation halts the bubble to the Chip; the button still fires its OWN handlers.
  const handlePointerDown = React.useCallback<NonNullable<IconButtonProps['onPointerDown']>>(
    (event) => {
      event.stopPropagation();
      onPointerDown?.(event);
    },
    [onPointerDown],
  );
  const handleClick = React.useCallback<NonNullable<IconButtonProps['onClick']>>(
    (event) => {
      event.stopPropagation();
      onClick?.(event);
    },
    [onClick],
  );

  const markerClassName = aui?.profile === undefined
    ? 'aui-chip-dismiss aui-chip-dismiss--host-fit'
    : 'aui-chip-dismiss';
  return (
    <IconButton
      ref={ref}
      {...(rest as IconButtonProps)}
      name={name}
      aui={resolvedAui}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      className={prependMarkerClassName(markerClassName, className) as string | undefined}
    />
  );
});
ChipDismiss.displayName = 'Chip.Dismiss';

// ─── Assemble (flat 2-level dot-namespace) ────────────────────────────────────────────────────────
interface ChipComponent
  extends React.ForwardRefExoticComponent<ChipProps & React.RefAttributes<HTMLSpanElement>> {
  Icon: typeof ChipIcon;
  Label: typeof ChipLabel;
  Dismiss: typeof ChipDismiss;
}

export const Chip = Object.assign(ChipRoot, {
  Icon: ChipIcon,
  Label: ChipLabel,
  Dismiss: ChipDismiss,
}) as ChipComponent;
export default Chip;
