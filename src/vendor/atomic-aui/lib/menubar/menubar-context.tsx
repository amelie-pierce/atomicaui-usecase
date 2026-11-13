// modules/design/atomic-aui/src/lib/menubar/menubar-context.tsx
//
// MenubarAuiContext — the cascade carrier for the Menubar compound. The `Menubar` bar root SEEDS
// the inherited axes; the bespoke `Menubar.DropdownTrigger` reads them and resolves its OWN aui
// (color FOLLOWS the cascade, scale FOLLOWS the cascade; paint/shape/profile/sx are per-part).
//
// REUSE, don't re-implement: the THREE pure resolvers (seedFieldAui / mergeFieldAui / resolvePartAui)
// live in `../field/field-context` and are component-agnostic (the sx-drop bug is fixed there). We
// only declare a SEPARATE context object here so a Menubar's cascade never collides with a Field's
// (a Menubar may contain Fields; each cascade is independent). The carried snapshot shape is the
// shared `FieldResolvedAui` ({ color, scale, shape, elevation, sx }).
//
// NOTE on scale: scale ALSO rides a parallel `AuiScaleProvider` (seeded by the bar) so the
// re-exported Dropdown menu parts (whose `useScaleCascade` reads that provider) pick up the tier.
// Color rides THIS JS context (resolved per-part in menubar.tsx); paint/profile/shape/sx are per-part.
import * as React from 'react';
import type { FieldResolvedAui } from '../field/field-context';

/** The default seed (no axes set → every part falls back to its own vocab default). */
const EMPTY_MENUBAR_AUI: FieldResolvedAui = {};

const MenubarAuiContext = React.createContext<FieldResolvedAui>(EMPTY_MENUBAR_AUI);

/** Read the nearest Menubar cascade snapshot (empty when not inside a seeding `Menubar`). */
export function useMenubarAui(): FieldResolvedAui {
  return React.useContext(MenubarAuiContext);
}

export const MenubarAuiProvider = MenubarAuiContext.Provider;
