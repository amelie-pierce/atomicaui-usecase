// modules/design/atomic-aui/src/families/chevron/create-chevron-part.tsx
//
// A factory for a component's chevron PART (`Dropdown.Chevron`, `Select.Chevron`, `Menubar.Chevron`).
// Mirrors Accordion's `AccordionChevron`: a MARKER-ONLY `<span>` (no `styleable`) whose `aui` is
// CONSUMED here and FORWARDED to an inner `defaultChevron` (a ContainedIcon) when childless, so every
// glyph axis stays live; when the consumer supplies `children`, those render verbatim (a replacement
// node). The span is the structural/rotation affordance the trigger keys `data-aui-rotate` off.
//
// Usage:  const DropdownChevron = createChevronPart('aui-dropdown-chevron');
//         DropdownChevron.displayName = 'Dropdown.Chevron';
import * as React from 'react';
import { createAtomicPart } from '../../core/factory/create-atomic-part';
import type { ContainedIconAui } from '../../lib/icon';
import { guardTabIndexForAriaHidden } from '../../lib/icon/icon-a11y';
import type { AuiRecipeScale } from '../../core/vocabulary/recipe-vocab';
import { defaultChevron } from './default-chevron';

/** Props every chevron part accepts: span attributes (sans `color`) + the forwarded glyph `aui`. */
export interface ChevronPartProps
  extends Omit<React.ComponentPropsWithoutRef<'span'>, 'color'>,
    React.RefAttributes<HTMLSpanElement> {
  /** The chevron glyph's appearance — forwarded to the inner `ContainedIcon` (color = glyph hue /
   *  paint / scale / profile / shape / elevation / contained-icon `sx`). NOT placed on the span. */
  aui?: ContainedIconAui;
}

/** The default tier the standalone (un-cascaded) chevron glyph sizes to. */
const DEFAULT_CHEVRON_SCALE: AuiRecipeScale = 'md';

/**
 * Build a marker-only chevron part for a component.
 *
 * @param marker - The span's marker class (e.g. `'aui-dropdown-chevron'`).
 * @returns A `forwardRef` span that forwards `aui` to `defaultChevron` when childless, else renders
 *   its `children`. Set `.displayName` on the returned component at the call site.
 */
export function createChevronPart(marker: string) {
  // Marker-only span (no `styleable`): the appearance lives on the inner ContainedIcon, not here.
  const InnerSpan = createAtomicPart<ChevronPartProps>('span', marker);

  const Chevron = React.forwardRef<HTMLSpanElement, ChevronPartProps>(function Chevron(
    { children, aui, 'aria-hidden': ariaHidden, tabIndex, ...rest },
    ref,
  ) {
    // `aui` is consumed here (never reaches the span DOM) and forwarded to the inner glyph. Inside a
    // trigger the parent injects `children` (a glyph already built at the live tier), so the default
    // below is bypassed; standalone, default to the chevron tier (own `aui.scale` wins).
    const glyph = children ?? defaultChevron(aui?.scale ?? DEFAULT_CHEVRON_SCALE, aui);
    // The chevron span is DECORATIVE (aria-hidden defaults true). An aria-hidden element must NOT be
    // focusable — strip a consumer-passed `tabIndex` to `-1` so it can't become a hidden tab stop.
    const resolvedHidden = ariaHidden ?? true;
    return React.createElement(
      InnerSpan as React.ElementType,
      {
        ref,
        'aria-hidden': resolvedHidden,
        tabIndex: guardTabIndexForAriaHidden(tabIndex, resolvedHidden === true),
        ...rest,
      },
      glyph,
    );
  });
  return Chevron;
}
