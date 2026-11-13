// modules/design/atomic-aui/src/families/chevron/default-chevron.tsx
//
// The shared chevron GLYPH — lifted from Accordion so Dropdown / Select / Menubar (and later
// Accordion) reuse ONE definition instead of each re-typing the ContainedIcon. A chevron is just a
// `chevron-down` ContainedIcon sized to the trigger tier; the surrounding component owns the rotate
// affordance (a `data-aui-rotate` span), not this leaf.
//
// `aui` is FORWARDED to the inner ContainedIcon (NOT painted on a span), so every axis — color (glyph
// hue), paint (box fill), scale, profile, shape, elevation, contained-icon sx — is LIVE, consistent
// with `Accordion.Icon` / `Checkbox.Icon`. `scale` is spread first so an `aui.scale` override wins.
import * as React from 'react';
import { ContainedIcon, type ContainedIconAui } from '../../lib/icon';
import type { AuiRecipeScale } from '../../core/vocabulary/recipe-vocab';

/**
 * Render the shared chevron glyph at the given scale.
 *
 * @param scale - The resolved trigger tier the glyph sizes to.
 * @param aui   - Optional override forwarded to the ContainedIcon; an `aui.scale` wins over `scale`.
 */
export function defaultChevron(scale: AuiRecipeScale, aui?: ContainedIconAui): React.ReactElement {
  return <ContainedIcon name="chevron-down" aria-hidden aui={{ scale, ...aui }} />;
}
