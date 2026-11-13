// modules/design/atomic-aui/src/lib/scale-cascade/use-aui-scale.tsx
//
// AuiScaleContext — a tiny, scale-ONLY cascade for multi-part composites (Select, Dropdown,
// Accordion). Principle: a component should render at ONE size tier by default — you shouldn't have
// to set `scale` on the Trigger, the Popup, AND every row. The Root seeds `scale` once and every
// scale-bearing part falls back to it (an own `aui.scale` always wins).
//
// WHY scale-ONLY (deliberately lighter than `FieldAuiContext`, which carries 4 axes): scale is the
// one axis where "more than one value per component instance" is almost always a mistake. The other
// axes are legitimately per-part here and MUST NOT ride along —
//   • profile  — parts differ by design (Trigger contained, Item flat, etc.);
//   • color    — Select/Dropdown parts carry distinct chroma (trigger vs popup vs selected row);
//   • shape    — the surface rounds while the rows/inner parts stay flat (a menu Popup is `soft`,
//                its Items are `none`; an Accordion Item card rounds, its Trigger/Panel don't);
//   • elevation — a float belongs to the surface, never to the content sitting on it.
// Carrying ONLY scale means none of those can ever accidentally cascade.
import * as React from 'react';
import type { AnyProps, PropHook } from '../../core/types';
import type { AuiRecipeScale } from '../../core/vocabulary/recipe-vocab';

const AuiScaleContext = React.createContext<AuiRecipeScale | undefined>(undefined);

/** Provider — a Root seeds the shared size tier. `undefined` = no cascade (parts use their own default). */
export const AuiScaleProvider = AuiScaleContext.Provider;

/** Read the cascaded component scale (undefined when not inside a seeding Root). */
export function useAuiScale(): AuiRecipeScale | undefined {
  return React.useContext(AuiScaleContext);
}

/** Resolve a part's effective scale: own wins, else the cascaded tier, else the caller's default.
 *  Used by wrappers that size a non-recipe affordance off the scale (e.g. a Trigger's chevron). */
export function resolveAuiScale(
  own: AuiRecipeScale | undefined,
  inherited: AuiRecipeScale | undefined,
  partDefault: AuiRecipeScale,
): AuiRecipeScale {
  return own ?? inherited ?? partDefault;
}

/** Props a scale-cascade-aware part accepts — an `aui` carrying an optional scale. */
interface ScaleCascadeProps extends AnyProps {
  aui?: { scale?: AuiRecipeScale } & Record<string, unknown>;
}

/**
 * A PropHook extension that injects the cascaded component scale into a part's `aui` BEFORE its
 * recipe runs: `aui.scale = own.scale ?? inheritedScale`. A no-op when the part already sets its
 * own scale OR there is no seeding Root above. Add it as the FIRST extension on a scale-bearing part:
 *
 *   createAtomicComponent(Base, { extensions: [useScaleCascade, useStateLayer, useRecipe] })
 *
 * The recipe then reads the merged `aui.scale`. `aui` is already a recipe `hookProp`, so the
 * (possibly re-created) object never reaches the DOM. Extensions are invoked during render, so
 * reading context here is safe.
 */
export const useScaleCascade: PropHook<ScaleCascadeProps, { aui?: ScaleCascadeProps['aui'] }> = (
  props,
) => {
  const inherited = useAuiScale();
  const own = props.aui?.scale;
  if (own !== undefined || inherited === undefined) return {};
  return { aui: { ...props.aui, scale: inherited } };
};
useScaleCascade.hookProps = new Set(['aui']);
