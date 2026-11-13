// modules/design/atomic-aui/src/lib/identity/aui-identity.tsx
//
// AuiIdentityProvider — carries the Core 6.0 identity axes (brand/theme/typeface/typography/
// icon-family/icon-style) that ROOT the token cascade, both as `data-aui-*` attrs on a real
// wrapper element AND via React context.
//
// Why the context exists: `--theme-*` / typography / `--icongraphy-*` rails are emitted only
// under the `[data-aui-brand="…"][data-aui-theme="…"]` (etc.) selectors and INHERIT down the DOM.
// A body-portaled overlay (Select popup, future Dialog/Popover/Tooltip) renders OUTSIDE the
// themed root, so it inherits no rails and paints unstyled. React can't read an ancestor's DOM
// attrs across a portal — so this context carries the identity to those portaled elements, which
// re-stamp the same `data-aui-*` attrs (via `identityToDataAttrs`) so the theme selector matches
// there and the rails resolve + inherit into the popup subtree.
//
// SSR-safe: a module-level context with an empty default, no mutable singleton. Mirrors
// IconographyProvider's defaults-only / per-axis-merge shape.
import * as React from 'react';

/** The full set of identity attrs that root the Core 6.0 token cascade. Each axis is optional —
 *  a nested provider overriding only one axis keeps the outer values for the rest (per-axis merge).
 *  brand/theme/typeface/typography are open brand/theme names → `string`. iconFamily/iconLayer are
 *  the RAW data-attr VALUES the SCSS selectors expect (e.g. 'fa-7-pro' / 'duotone'), not the icon
 *  component's authoring axes, so they stay `string` too — re-stamped verbatim. */
export interface AuiIdentity {
  brand?: string;
  theme?: string;
  typeface?: string;
  typography?: string;
  iconFamily?: string;
  iconLayer?: string;
}

// Empty default → a component with no provider above it reads `{}` (no re-stamp). SSR-safe.
const AuiIdentityContext = React.createContext<AuiIdentity>({});

/** Single source of truth for the prop → `data-aui-*` attr-name mapping. Verified against the
 *  generated layer-1 SCSS selectors:
 *    brand      → data-aui-brand        (_100-theme.scss)
 *    theme      → data-aui-theme        (_100-theme.scss)
 *    typeface   → data-aui-typeface     (_110-typography.scss)
 *    typography → data-aui-typography   (_110-typography.scss)
 *    iconFamily → data-aui-icon-family  (_120-icongraphy.scss)
 *    iconLayer  → data-aui-icon-style   (_120-icongraphy.scss)
 *  A wrong attr name = the re-stamp silently fails to match the theme selector, so this map is
 *  load-bearing and exercised directly by the spec. */
const ATTR_BY_AXIS: Record<keyof AuiIdentity, string> = {
  brand: 'data-aui-brand',
  theme: 'data-aui-theme',
  typeface: 'data-aui-typeface',
  typography: 'data-aui-typography',
  iconFamily: 'data-aui-icon-family',
  iconLayer: 'data-aui-icon-style',
};

const AXES = Object.keys(ATTR_BY_AXIS) as (keyof AuiIdentity)[];

/** Turn an `AuiIdentity` into the `data-aui-*` attr object (only defined keys), so a portaled
 *  element (P2.2's Positioner) can spread it to re-root the cascade. */
export function identityToDataAttrs(id: AuiIdentity): Record<string, string> {
  const out: Record<string, string> = {};
  for (const axis of AXES) {
    const value = id[axis];
    if (value !== undefined) out[ATTR_BY_AXIS[axis]] = value;
  }
  return out;
}

/** Strip `undefined`-valued axes so a `{...outer, ...definedOnly(inner)}` merge can't clobber an
 *  outer axis with an undefined inner one. */
function definedOnly(id: AuiIdentity): AuiIdentity {
  const out: AuiIdentity = {};
  for (const axis of AXES) {
    if (id[axis] !== undefined) out[axis] = id[axis];
  }
  return out;
}

export interface AuiIdentityProviderProps
  extends AuiIdentity,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof AuiIdentity> {
  children?: React.ReactNode;
  className?: string;
}

/** Provides the Core 6.0 identity to descendants in two ways:
 *  (a) stamps the provided axes as `data-aui-*` attrs on a real wrapper element (default `<div>`;
 *      accepts `className`/`...rest` so it can BE the themed root, e.g. `.v6-shell`), and
 *  (b) provides the merged identity (per-axis merge with any outer provider) via context, so
 *      portaled descendants can re-stamp it.
 *  Only provided axes are stamped (undefined omitted), mirroring IconographyProvider's merge. */
export function AuiIdentityProvider({
  brand,
  theme,
  typeface,
  typography,
  iconFamily,
  iconLayer,
  children,
  ...rest
}: AuiIdentityProviderProps) {
  const outer = React.useContext(AuiIdentityContext);
  const own = React.useMemo<AuiIdentity>(
    () => definedOnly({ brand, theme, typeface, typography, iconFamily, iconLayer }),
    [brand, theme, typeface, typography, iconFamily, iconLayer]
  );
  const value = React.useMemo<AuiIdentity>(() => ({ ...outer, ...own }), [outer, own]);

  // Stamp only THIS provider's own axes on its element (mirrors the per-axis-defined merge); the
  // merged value flows through context for descendants/portals.
  const dataAttrs = React.useMemo(() => identityToDataAttrs(own), [own]);

  // Guard the single-source-of-truth invariant: a raw `data-aui-*` identity attr in `...rest`
  // would stamp the DOM without entering the context, so a portaled re-stamp (reading context)
  // would diverge from the host's DOM. Route identity through the typed axis props instead.
  if (process.env.NODE_ENV !== 'production') {
    for (const attr of Object.values(ATTR_BY_AXIS)) {
      if (attr in rest) {
        console.warn(
          `[AuiIdentityProvider] Pass identity via the typed axis props (e.g. brand/theme/iconFamily), not the raw "${attr}" attr — raw attrs stamp the DOM but never reach the context, so portaled overlays will re-stamp a different value.`
        );
      }
    }
  }

  return (
    <AuiIdentityContext.Provider value={value}>
      <div {...rest} {...dataAttrs}>
        {children}
      </div>
    </AuiIdentityContext.Provider>
  );
}

/** Read the ambient Core 6.0 identity. Portaled components read this to re-stamp the `data-aui-*`
 *  attrs (via `identityToDataAttrs`) so the theme selector matches outside the themed root. */
export function useAuiIdentity(): AuiIdentity {
  return React.useContext(AuiIdentityContext);
}
