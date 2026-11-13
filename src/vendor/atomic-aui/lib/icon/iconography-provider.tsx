// modules/design/atomic-aui/src/lib/icon/iconography-provider.tsx
//
// IconographyProvider — supplies DEFAULT icon identity axes (family/layer/weight) to
// descendant <Icon>s. It NEVER stamps data-attrs or renders a wrapper element; an Icon
// reads these as per-axis fallbacks (prop ?? context ?? hard-default). SSR-safe: a
// module-level context with an empty default, no mutable singleton.
import * as React from 'react';
import type { IconFamily, IconLayer, IconWeight } from './fa-mapping';

/** The identity defaults a provider supplies. Each axis is optional — a nested provider
 *  overriding only one axis keeps the outer values for the others (per-axis merge). */
export interface Iconography {
  family?: IconFamily;
  layer?: IconLayer;
  weight?: IconWeight;
}

// Empty default object → standalone <Icon> falls through to its own hard-defaults.
const IconographyContext = React.createContext<Iconography>({});

export interface IconographyProviderProps extends Iconography {
  children?: React.ReactNode;
}

/** Strip `undefined`-valued keys so a `{...outer, ...definedOnly(props)}` merge can't
 *  clobber an outer axis with an undefined inner one. */
function definedOnly(props: Iconography): Iconography {
  const out: Iconography = {};
  if (props.family !== undefined) out.family = props.family;
  if (props.layer !== undefined) out.layer = props.layer;
  if (props.weight !== undefined) out.weight = props.weight;
  return out;
}

/** Provides icon identity DEFAULTS to descendants. Per-axis merges with any outer
 *  provider so a nested provider overriding only one axis keeps the rest. */
export function IconographyProvider({ family, layer, weight, children }: IconographyProviderProps) {
  const outer = React.useContext(IconographyContext);
  const value = React.useMemo<Iconography>(
    () => ({ ...outer, ...definedOnly({ family, layer, weight }) }),
    [outer, family, layer, weight]
  );
  return React.createElement(IconographyContext.Provider, { value }, children);
}

/** Read the ambient icon identity defaults. */
export function useIconography(): Iconography {
  return React.useContext(IconographyContext);
}
