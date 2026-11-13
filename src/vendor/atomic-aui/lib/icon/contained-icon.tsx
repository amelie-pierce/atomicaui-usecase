// modules/design/atomic-aui/src/lib/icon/contained-icon.tsx
//
// ContainedIcon — a fixed SQUARE box (`<span class="aui-contained-icon …">`) that centers an
// always-decorative `Icon`. The Figma `6164:44` primitive; for icon-only affordances and fixed
// row cells. Like `Icon`, this is a plain `forwardRef` (no `createAtomicComponent`, no Base UI,
// no state layer) — see icon.tsx for the convention this mirrors. Box composition (recipe classes
// + a11y) lives in `useContainedIconRecipe` (./use-recipe, a PLAIN hook); identity/color/scale
// forwarding to the inner Icon stays here (render glue, not recipe). (Spec §5.2, §7, §8.)
//
// Anatomy split (spec §5.2; box-cell model 2026-06-11):
//   • BOX  — the `<span>`: the full appearance — `color`/`paint` resolve the context cell on the box
//            (`--paint-*` rails; paint default `text`), `scale` → container size, `profile`/`shape`/
//            `elevation`/box `sx` style the box. The box's CONTENT color is the cell content.
//   • GLYPH — the inner `<Icon>`: only the SAME `aui.scale` (→ glyph `aui-icon-size-*`). Its color
//            INHERITS the box content via `currentColor` (no own `aui-fg`), so a `text`-paint box
//            with a `color` yields a colored glyph, and a filled box yields an on-fill glyph. Always
//            `aria-hidden` (the BOX owns a11y).
import * as React from 'react';
import { Icon } from './icon';
import { guardTabIndexForAriaHidden } from './icon-a11y';
import { useContainedIconRecipe } from './use-recipe';
import type { ContainedIconAui } from './use-recipe';
import type { IconFamily, IconLayer, IconWeight } from './fa-mapping';
import { useIconography } from './iconography-provider';

// Public appearance namespace is homed in ./use-recipe (the recipe layer), mirroring `ButtonAui`.
// Re-export so the ContainedIcon public surface (and `./contained-icon` importers) is unchanged.
export type { ContainedIconAui } from './use-recipe';

/** The shared (non-content) props — the box appearance + identity axes + DOM rest. Both content
 *  modes carry these; only the CONTENT seam (`name` XOR `children`) differs (the union below). */
interface ContainedIconBaseProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color' | 'children'> {
  /** Icon family — IDENTITY, forwarded to the inner Icon. Default: ctx ?? 'classic'. */
  family?: IconFamily;
  /** Mono- vs duo-tone — IDENTITY, forwarded to the inner Icon. Default: ctx ?? 'duotone'. */
  layer?: IconLayer;
  /** FA cut/weight — IDENTITY, forwarded to the inner Icon. Default: ctx ?? 'solid'. */
  weight?: IconWeight;
  /** Appearance: the full box appearance (color/paint/scale/profile/shape/elevation/sx). */
  aui?: ContainedIconAui;
}

/** CONTENT seam — a discriminated union (additive 2026-06-23). EITHER the FA-GLYPH path (the
 *  original behavior, `name` REQUIRED + no children) XOR the CUSTOM-CONTENT path (`children` —
 *  an arbitrary image/SVG rendered at the icon-container size — + no `name`). Both-or-neither is a
 *  type error: a custom child supplies its OWN label/glyph, so a `name` would be ambiguous. Every
 *  existing `name="…"`-only caller keeps typechecking + rendering identically. */
export type ContainedIconProps = ContainedIconBaseProps &
  (
    | {
        /** REQUIRED on the FA path. FA web icon name; forwarded to the inner Icon (which validates +
         *  dev-warns + renders the inspectable fallback — ContainedIcon does NOT re-validate). */
        name: string;
        /** Forbidden on the FA path — a `name` already supplies the glyph. */
        children?: never;
      }
    | {
        /** Forbidden on the custom path — `children` already supplies the content. */
        name?: never;
        /** Custom content (an `<img>`/SVG) rendered INSIDE the same box, sized to FILL the container
         *  width (see `_icon.scss`). The child provides its OWN a11y (`<img alt>` / `role="img"`). */
        children: React.ReactNode;
      }
  );

const ContainedIconRoot = React.forwardRef<HTMLSpanElement, ContainedIconProps>(
  function ContainedIcon(
    { name, family, layer, weight, aui, className, tabIndex, children, ...rest },
    ref,
  ) {
    // CONTENT mode: the FA-glyph path (a `name`, no children) vs the CUSTOM-content path (children,
    // no name — an arbitrary <img>/SVG sized to fill the box). The discriminated union guarantees
    // exactly one is set; `isCustom` switches the inner render + the a11y default.
    const isCustom = children !== undefined;

    // CUSTOM-content sizing: the box gets its size from `aui.scale`/`aui.profile` (the icon-container
    // / profile-min rails), and the child FILLS that box (see `_icon.scss`). Unlike the FA path — where
    // a scale-less box HUGS the tiny glyph (`max-content`) — a custom <img>/SVG has its OWN large
    // intrinsic size with NOTHING to hug it to the icon scale, so a scale-less custom box has no size
    // source. So when the consumer set NEITHER `scale` NOR `profile`, DEFAULT the scale to `md`
    // (the icon-container mid tier) so the box renders at a sensible icon size and the child follows it.
    // A consumer `scale`/`profile` still wins (the default only fills the gap).
    const effectiveAui = React.useMemo<ContainedIconAui | undefined>(() => {
      if (!isCustom) return aui;
      if (aui?.scale !== undefined || aui?.profile !== undefined) return aui;
      return { ...aui, scale: 'md' };
    }, [isCustom, aui]);

    // BOX recipe (container size + shape + box-only sx) + a11y — both from the recipe hook. On the
    // CUSTOM path the box must NOT default to `aria-hidden` (the child carries its own label, and a
    // hidden box would swallow it from AT); pass `selfLabeledContent` so the recipe skips the
    // decorative default unless the BOX itself is explicitly labelled (aria-label/-labelledby/title).
    const { className: composedClassName, a11y } = useContainedIconRecipe({
      aui: effectiveAui,
      className,
      rest,
      selfLabeledContent: isCustom,
    });
    const iconography = useIconography();
    // ContainedIcon carries the boxed duotone signature by component default, while bare
    // Icon remains monotone. Provider context still wins over that component default.
    const effectiveLayer = layer ?? iconography.layer ?? 'duotone';

    // When the resolved a11y makes the BOX decorative (`aria-hidden:true` — no meaningful label),
    // a consumer-passed `tabIndex` must NOT make it focusable: guard it to `-1` (a hidden tab stop
    // strands keyboard users). A meaningful (role=img) ContainedIcon keeps the tabIndex verbatim.
    const guardedTabIndex = guardTabIndexForAriaHidden(tabIndex, a11y['aria-hidden']);

    return React.createElement(
      'span',
      { ref, ...rest, tabIndex: guardedTabIndex, className: composedClassName, ...a11y },
      // CUSTOM-content path: render `children` verbatim inside the SAME box. The box paints/sizes from
      // its profile/scale + box `aui` exactly as on the FA path; `_icon.scss` sizes the non-`.aui-icon`
      // child to FILL the container width (`inline-size:100%`, `block-size:auto`, `object-fit:contain`).
      // No inner <Icon>, no name validation, no forced a11y — the child supplies its own glyph + label.
      isCustom
        ? children
        : // FA-glyph path (UNCHANGED). Inner glyph: forward identity + scale, plus the box's
          // `sx.iconSize` (the ONLY box sx axis that targets the GLYPH, not the box). The glyph's
          // `scale` emits a `--aui-icon-size-FALLBACK` (the generic per-scale size) — a LAST-RESORT
          // only, because `.aui-icon` reads `var(--aui-icon-size, var(--aui-icon-size-fallback, 1em))`:
          // when ANY profile cell up-tree (the box's own `aui.profile`, or a profiled host like
          // Button/IconButton) sets `--aui-icon-size` (inherits:true, the Figma value), it WINS and the
          // glyph follows the profile — no prop needed. The fallback fires only for a bare, profile-less
          // icon (else the glyph would collapse to `1em`). `sx.iconSize` sets the AUTHORITATIVE
          // `--aui-icon-size` on the glyph (layer-3 override), so it beats both the inherited profile
          // value and the fallback — the explicit escape hatch. NO color (it inherits the box content
          // color via currentColor), NO other sx (box-only), NO label.
          React.createElement(Icon, {
            name: name as string,
            family,
            layer: effectiveLayer,
            weight,
            aui: {
              scale: aui?.scale,
              ...(aui?.sx?.iconSize !== undefined ? { sx: { iconSize: aui.sx.iconSize } } : {}),
            },
            'aria-hidden': true,
          })
    );
  }
);
ContainedIconRoot.displayName = 'ContainedIcon';

export const ContainedIcon = ContainedIconRoot;
export default ContainedIcon;
