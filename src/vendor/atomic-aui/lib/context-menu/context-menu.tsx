// modules/design/atomic-aui/src/lib/context-menu/context-menu.tsx
//
// The compound ContextMenu — wraps `@base-ui/react/context-menu` (1.5.0), dot-namespaced via
// `Object.assign` (the Field/Fieldset/Dropdown/Menubar precedent). A ContextMenu is a menu opened by
// RIGHT-CLICK (or long-press) over an AREA: `ContextMenu.Trigger` renders a bare <div> right-click
// zone; the same Base UI Menu surface (Portal/Positioner/Popup/Item/…) then paints the menu.
//
// THE MENUBAR REUSE PATTERN (menubar.tsx:312-375): Base UI's `@base-ui/react/context-menu` RE-EXPORTS
// the SAME Menu parts as Dropdown (`Item` = `MenuItem`, `Popup` = `MenuPopup`, … — verified against
// node_modules/@base-ui/react/context-menu/index.parts.d.ts). So we REUSE every Dropdown menu-surface
// part BY IDENTITY (`const ContextMenuItem = Dropdown.Item; …` — zero re-implementation; the portaled
// popup themes via the SAME `Dropdown.Positioner` identity re-stamp for free). The ONLY new code is:
//   • `ContextMenu.Root`   — over `ContextMenuPrimitive.Root` (narrows out modal/openOnHover/delay/
//     closeDelay + its own onOpenChange), seeding the aui SCALE cascade like `DropdownRoot`.
//   • `ContextMenu.Trigger`— an UNSTYLED passthrough (user-decided): a thin `createAtomicComponent`
//     marker over `ContextMenuPrimitive.Trigger` that strips `aui` off the DOM, NO recipe/frame/chevron.
//
// We DROP the Dropdown payload seam (`createHandle`/`Viewport`/`Payload`) — a context menu has no
// multi-trigger Viewport. We do NOT touch the shared `DROPDOWN_*_VOCAB` (blast radius).
//
// NAMING: FLAT 2-level, grouped by NAME (component-namespace-convention.md). Every menu part is one
// level `ContextMenu.<Name>` (`ContextMenu.Item`, NOT `ContextMenu.Menu.Item`), matching the flat
// Dropdown shape.
import * as React from 'react';
import { ContextMenu as ContextMenuPrimitive } from '@base-ui/react/context-menu';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { AuiScaleProvider } from '../scale-cascade/use-aui-scale';
import { Dropdown } from '../dropdown';
import type { DropdownScale, DropdownSubmenuRootProps } from '../dropdown';

// Re-export the Base UI ContextMenu Root + Trigger prop shapes (the Root narrows the Menu model:
// no modal/openOnHover/delay/closeDelay, its own onOpenChange — see
// node_modules/@base-ui/react/context-menu/root/ContextMenuRoot.d.ts). The Trigger renders a <div>.
export type {
  ContextMenuRootProps as ContextMenuBaseRootProps,
  ContextMenuTriggerProps as ContextMenuBaseTriggerProps,
} from '@base-ui/react/context-menu';
import type {
  ContextMenuRootProps as ContextMenuBaseRootProps,
  ContextMenuTriggerProps as ContextMenuBaseTriggerProps,
} from '@base-ui/react/context-menu';

// ─── ContextMenu.Root — the right-click menu root + the SCALE cascade seed ──────────
// Mirror `DropdownRoot` (dropdown.tsx:124-142): render no box, accept a NARROW `aui={{ scale }}` that
// SEEDS the scale-only cascade for the parts (Popup / Item / CheckboxItem / RadioItem / SubmenuTrigger
// / LinkItem all fall back to it via `useScaleCascade`; an own `aui.scale` wins). Only `scale`
// cascades — color/paint/shape stay per-part (the Popup rounds while its rows stay flat). Built over
// `ContextMenuPrimitive.Root` (NOT `MenuPrimitive.Root`) so the NARROWED context-menu prop shape is
// what we expose (right-click area model — no hover/delay). Non-generic: a context menu has no
// multi-trigger payload (we drop the Dropdown `<Payload>` seam).
type ContextMenuRootAui = { scale?: DropdownScale };
function ContextMenuRoot(
  props: ContextMenuBaseRootProps & { aui?: ContextMenuRootAui },
): React.JSX.Element {
  const { aui, children, ...rest } = props as ContextMenuBaseRootProps & {
    aui?: ContextMenuRootAui;
    children?: React.ReactNode;
  };
  const scale = aui?.scale;
  const seeded = React.createElement(AuiScaleProvider, { value: scale }, children as React.ReactNode);
  return React.createElement(ContextMenuPrimitive.Root as React.ElementType, rest as object, seeded);
}
ContextMenuRoot.displayName = 'ContextMenu';

// ─── ContextMenu.Trigger — an UNSTYLED passthrough right-click AREA ─────────────────
// User-decided: NOT a styled chip (unlike `Menubar.DropdownTrigger`). `ContextMenuPrimitive.Trigger`
// renders a bare <div> right-click zone (it wraps the consumer's content / area). We go through the
// MAIN factory ONLY to STRIP `aui` off the DOM (an `aui` <div> attribute would be invalid) — NO
// recipe, NO frame marker, NO chevron, NO state layer. The `stripAuiHook` declares `aui` in
// `hookProps`, so `createAtomicComponent` removes it from the DOM props (factory: `hookProps.has(key)`
// → skip) and returns nothing else → the <div> renders byte-clean (just the consumer className, if
// any). A consumer may still pass `aui` for forward-compat symmetry; it is silently dropped.
const stripAuiHook: import('../../core/types').PropHook = () => ({});
stripAuiHook.hookProps = new Set(['aui']);
const _ContextMenuTrigger = createAtomicComponent(ContextMenuPrimitive.Trigger, {
  extensions: [stripAuiHook],
});

export interface ContextMenuTriggerProps
  extends Omit<ContextMenuBaseTriggerProps, 'color'> {
  /** Accepted for forward-compat symmetry with the other compounds, but the trigger is an UNSTYLED
   *  passthrough (user-decided) — `aui` is stripped off the <div> and has NO visual effect. Style the
   *  right-click AREA via your own content/className. */
  aui?: unknown;
}
// Ref typed `HTMLDivElement` — `ContextMenuPrimitive.Trigger` renders a <div>
// (node_modules/@base-ui/react/context-menu/trigger/ContextMenuTrigger.d.ts:9).
const ContextMenuTrigger = _ContextMenuTrigger as unknown as React.ForwardRefExoticComponent<
  ContextMenuTriggerProps & React.RefAttributes<HTMLDivElement>
>;
(ContextMenuTrigger as { displayName?: string }).displayName = 'ContextMenu.Trigger';

// ─── The menu surface — THIN re-exports of the Dropdown parts (by identity) ─────────
// Every menu part IS the SAME reference as the matching `Dropdown.<X>` (zero re-implementation — the
// Menubar precedent, menubar.tsx:358-375). Base UI's context-menu re-exports these same Menu parts, so
// the Dropdown wrappers (which wrap the same Menu cores) work verbatim under a ContextMenu.Root. The
// portaled popup themes via the SAME `Dropdown.Positioner` identity re-stamp for free. We DROP
// `Viewport` (no multi-trigger payload) and `createHandle`/`Payload`.
const ContextMenuPortal = Dropdown.Portal;
const ContextMenuPositioner = Dropdown.Positioner;
const ContextMenuPopup = Dropdown.Popup;
const ContextMenuItem = Dropdown.Item;
const ContextMenuLinkItem = Dropdown.LinkItem;
const ContextMenuGroup = Dropdown.Group;
const ContextMenuGroupLabel = Dropdown.GroupLabel;
const ContextMenuSeparator = Dropdown.Separator;
const ContextMenuArrow = Dropdown.Arrow;
const ContextMenuBackdrop = Dropdown.Backdrop;
const ContextMenuCheckboxItem = Dropdown.CheckboxItem;
const ContextMenuCheckboxItemIndicator = Dropdown.CheckboxItemIndicator;
const ContextMenuRadioGroup = Dropdown.RadioGroup;
const ContextMenuRadioItem = Dropdown.RadioItem;
const ContextMenuRadioItemIndicator = Dropdown.RadioItemIndicator;
// TYPE NOTE (TS4023, the Menubar precedent menubar.tsx:331-333,368): `Dropdown.SubmenuRoot` infers to
// a local `DropdownSubmenuRoot` function type in `../dropdown/dropdown` that cannot be NAMED in our
// emitted `.d.ts`. We don't own that file, so we re-type the const with a NAMEABLE component type built
// from the EXPORTED `DropdownSubmenuRootProps` (the identity is unchanged — the spec asserts `toBe`).
type ContextMenuSubmenuRootComponent = React.ForwardRefExoticComponent<
  DropdownSubmenuRootProps & React.RefAttributes<HTMLElement>
>;
const ContextMenuSubmenuRoot = Dropdown.SubmenuRoot as unknown as ContextMenuSubmenuRootComponent;
const ContextMenuSubmenuTrigger = Dropdown.SubmenuTrigger;
const ContextMenuChevron = Dropdown.Chevron;
const ContextMenuIcon = Dropdown.Icon;

// Re-export the Props types from `../dropdown` under host-prefixed names (the Menubar precedent,
// menubar.tsx:440-460). Root/Trigger Props are the Base UI ContextMenu types above.
export type {
  DropdownPopupProps as ContextMenuPopupProps,
  DropdownItemProps as ContextMenuItemProps,
  DropdownLinkItemProps as ContextMenuLinkItemProps,
  DropdownGroupProps as ContextMenuGroupProps,
  DropdownGroupLabelProps as ContextMenuGroupLabelProps,
  DropdownSeparatorProps as ContextMenuSeparatorProps,
  DropdownArrowProps as ContextMenuArrowProps,
  DropdownBackdropProps as ContextMenuBackdropProps,
  DropdownCheckboxItemProps as ContextMenuCheckboxItemProps,
  DropdownCheckboxItemIndicatorProps as ContextMenuCheckboxItemIndicatorProps,
  DropdownRadioGroupProps as ContextMenuRadioGroupProps,
  DropdownRadioItemProps as ContextMenuRadioItemProps,
  DropdownRadioItemIndicatorProps as ContextMenuRadioItemIndicatorProps,
  DropdownSubmenuRootProps as ContextMenuSubmenuRootProps,
  DropdownSubmenuTriggerProps as ContextMenuSubmenuTriggerProps,
  DropdownPortalProps as ContextMenuPortalProps,
  DropdownPositionerProps as ContextMenuPositionerProps,
  DropdownChevronProps as ContextMenuChevronProps,
  DropdownIconProps as ContextMenuIconProps,
  DropdownScale as ContextMenuScale,
} from '../dropdown';

export interface ContextMenuRootProps extends ContextMenuBaseRootProps {
  /** The NARROW scale-only cascade seed for the menu parts (Popup/Item/…). Only `scale` cascades —
   *  color/paint/shape stay per-part (mirrors `Dropdown` root). */
  aui?: ContextMenuRootAui;
}

// ─── Assemble (Object.assign dot-namespace) ─────────────────────────────────────────
// The ContextMenu ROOT is NON-generic (no payload seam) → a plain function-component interface (mirror
// Fieldset/Field/Menubar, NOT the Dropdown payload seam). Keep the statics in LOCKSTEP with the
// `Object.assign` below.
interface ContextMenuComponent {
  (props: ContextMenuRootProps): React.JSX.Element;
  displayName?: string;
  Trigger: typeof ContextMenuTrigger;
  Portal: typeof ContextMenuPortal;
  Positioner: typeof ContextMenuPositioner;
  Popup: typeof ContextMenuPopup;
  Item: typeof ContextMenuItem;
  LinkItem: typeof ContextMenuLinkItem;
  Group: typeof ContextMenuGroup;
  GroupLabel: typeof ContextMenuGroupLabel;
  Separator: typeof ContextMenuSeparator;
  Arrow: typeof ContextMenuArrow;
  Backdrop: typeof ContextMenuBackdrop;
  CheckboxItem: typeof ContextMenuCheckboxItem;
  CheckboxItemIndicator: typeof ContextMenuCheckboxItemIndicator;
  RadioGroup: typeof ContextMenuRadioGroup;
  RadioItem: typeof ContextMenuRadioItem;
  RadioItemIndicator: typeof ContextMenuRadioItemIndicator;
  SubmenuRoot: typeof ContextMenuSubmenuRoot;
  SubmenuTrigger: typeof ContextMenuSubmenuTrigger;
  Chevron: typeof ContextMenuChevron;
  Icon: typeof ContextMenuIcon;
}

export const ContextMenu = Object.assign(ContextMenuRoot, {
  Trigger: ContextMenuTrigger,
  Portal: ContextMenuPortal,
  Positioner: ContextMenuPositioner,
  Popup: ContextMenuPopup,
  Item: ContextMenuItem,
  LinkItem: ContextMenuLinkItem,
  Group: ContextMenuGroup,
  GroupLabel: ContextMenuGroupLabel,
  Separator: ContextMenuSeparator,
  Arrow: ContextMenuArrow,
  Backdrop: ContextMenuBackdrop,
  CheckboxItem: ContextMenuCheckboxItem,
  CheckboxItemIndicator: ContextMenuCheckboxItemIndicator,
  RadioGroup: ContextMenuRadioGroup,
  RadioItem: ContextMenuRadioItem,
  RadioItemIndicator: ContextMenuRadioItemIndicator,
  SubmenuRoot: ContextMenuSubmenuRoot,
  SubmenuTrigger: ContextMenuSubmenuTrigger,
  Chevron: ContextMenuChevron,
  Icon: ContextMenuIcon,
}) as ContextMenuComponent;

export default ContextMenu;
