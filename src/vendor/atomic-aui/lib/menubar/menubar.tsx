// modules/design/atomic-aui/src/lib/menubar/menubar.tsx
//
// The compound Menubar — wraps `@base-ui/react/menubar` (1.5.0), dot-namespaced via `Object.assign`
// (the Field/Fieldset/Dropdown precedent). A Menubar is the application menu BAR: several top-level
// menus on one filled surface bar. Each menu is a REUSED `Dropdown` (a Base UI `Menu.Root`) that
// AUTO-DETECTS the menubar parent and switches into menubar mode (roving focus, hover-switch,
// context-merged disabled) — we add NO behavior, only the bar frame + the bespoke bar trigger.
//
// NAMING: FLAT 2-level, grouped by NAME (component-namespace-convention.md). The menu surface is a
// set of THIN `typeof` re-exports of the Dropdown parts (`Menubar.DropdownItem` = `Dropdown.Item`,
// etc. — zero re-implementation, same identity re-stamp on the portaled popup). The ONLY bespoke
// menu part is `Menubar.DropdownTrigger` (the top-level bar trigger). NO 3-level
// (`Menubar.Dropdown.Item`); each part is one-level `Menubar.<Name>`.
//
// CASCADE = color + scale, overridable per-part (mirrors Field's per-part cascade, but only color +
// scale flow here — paint/profile/shape/sx are per-part). The bar SEEDS from the consumer's RAW aui
// (so the trigger's `raised` default survives when no bar color is set, while a bar-level color
// override cascades). Color rides a Menubar-local JS context; scale rides AuiScaleProvider (so the
// re-exported Dropdown parts' useScaleCascade picks up the tier).
import * as React from 'react';
import { Menubar as MenubarPrimitive } from '@base-ui/react/menubar';
import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { createAtomicPart } from '../../core/factory/create-atomic-part';
import { mergeAuiClasses } from '../../core/recipe/merge-classes';
import type { AuiBorderWidth } from '../../tokens/index';
import { useStateLayer } from '../../core/state/use-state-layer';
import {
  AuiScaleProvider,
  useAuiScale,
  useScaleCascade,
  resolveAuiScale,
} from '../scale-cascade/use-aui-scale';
import { ContainedIcon, type ContainedIconProps } from '../icon';
import { Button } from '../button';
import { BUTTON_VOCAB } from '../button/use-recipe';
import { IconButton, ICON_BUTTON_DEFAULTS } from '../icon-button';
import type { IconButtonProps } from '../icon-button';
import { Dropdown } from '../dropdown';
import type { DropdownScale, DropdownRootProps, DropdownSubmenuRootProps } from '../dropdown';
import type { ButtonProps } from '../button';
import { splitTriggerChildren, composeChevron } from '../../families/chevron';
import { warnIfNoAccessibleName } from '../../core/a11y/warn-if-no-accessible-name';
import {
  mergeFieldAui,
  resolvePartAui,
  seedFieldAui,
  type FieldResolvedAui,
} from '../field/field-context';
import { MenubarAuiProvider, useMenubarAui } from './menubar-context';
import {
  MENUBAR_ROOT_VOCAB,
  MENUBAR_TRIGGER_VOCAB,
  useMenubarRootRecipe,
  useMenubarTriggerRecipe,
  type MenubarRootAui,
  type MenubarTriggerAui,
  type MenubarScale,
} from './use-recipe';

// Re-export the Base UI Menubar prop shape verbatim — the full bar model (modal/disabled/
// orientation/loopFocus). We do NOT narrow it.
export type { MenubarProps as MenubarBaseProps } from '@base-ui/react/menubar';
import type { MenubarProps as MenubarBaseProps } from '@base-ui/react/menubar';

export type {
  MenubarColor,
  MenubarPaint,
  MenubarScale,
  MenubarShape,
  MenubarRootAui,
  MenubarTriggerAui,
} from './use-recipe';

// ─── Menubar (root) — the surface-bar FRAME + the cascade seed ───────────────────
// Base UI `Menubar` renders a <div role="menubar"> and provides the menubar context (each child
// Menu.Root auto-detects it). We make that <div> a recipe FRAME (the `aui-menubar` marker +
// `.aui-frame` surface) AND the cascade provider. Stateless (no focus ring on the bar; roving focus
// is on the triggers) → NO useStateLayer.
//
// 🔑 SEED FROM THE CONSUMER'S RAW `aui` (seedFieldAui projects only the explicitly-set axes), NOT
// the resolved frame aui — so the trigger's `raised` default SURVIVES when no bar color is set, while
// a bar-level `aui.color` override DOES cascade. The bar FRAME appearance resolves SEPARATELY.
const _MenubarFrame = createAtomicComponent(MenubarPrimitive, {
  extensions: [useMenubarRootRecipe],
});

export interface MenubarProps
  extends Omit<MenubarBaseProps, 'color'> {
  /** The surface-bar frame appearance — ALSO the cascade seed for the bar triggers. The inherited
   *  axes (color/scale) cascade; `paint`/`profile`/`shape`/`sx` are per-part (frame-local, not
   *  cascaded). `modal`/`disabled`/`orientation`/`loopFocus` are native Base UI bar props. */
  aui?: MenubarRootAui;
}

const MenubarRoot = React.forwardRef<HTMLDivElement, MenubarProps>(function Menubar(
  { aui, children, ...rest },
  ref,
) {
  const ambient = useMenubarAui();
  // The bar FRAME's OWN aui resolves FIRST: color FOLLOWS the cascade (own ?? ambient ?? raised → the
  // bar recolors), paint/shape/scale default from the vocab, sx per-part.
  const frameAui = React.useMemo<MenubarRootAui>(
    () =>
      resolvePartAui(ambient, aui as FieldResolvedAui, {
        paint: MENUBAR_ROOT_VOCAB.defaults.paint,
        profile: MENUBAR_ROOT_VOCAB.profile,
        color: MENUBAR_ROOT_VOCAB.defaults.color as FieldResolvedAui['color'],
        scale: MENUBAR_ROOT_VOCAB.defaults.scale as FieldResolvedAui['scale'],
        shape: MENUBAR_ROOT_VOCAB.defaults.shape as FieldResolvedAui['shape'],
        followColor: true,
      }) as MenubarRootAui,
    [ambient, aui],
  );
  // The cascade seed carries the bar's RESOLVED color + scale (NOT just the raw consumer axes), so the
  // bar's default (`color:'raised'`, `scale:'sm'`) ALSO cascades — the triggers AND the Button follow
  // the bar by default, and a bar color/scale override cascades to all of them. A per-part `aui` still
  // wins (own ?? cascaded ?? part-default). shape/elevation stay raw (per-part); paint/profile/sx never
  // cascade. Standalone (no Menubar) the context is empty → each part keeps its own default (no-op).
  const inherited = React.useMemo<FieldResolvedAui>(
    () =>
      mergeFieldAui(ambient, {
        ...seedFieldAui(aui),
        color: frameAui.color as FieldResolvedAui['color'],
        scale: frameAui.scale as FieldResolvedAui['scale'],
      }),
    [ambient, aui, frameAui],
  );
  // Wrap children in BOTH providers: color rides the JS context, scale rides AuiScaleProvider seeded
  // with the bar's RESOLVED tier (so the re-exported Dropdown parts' useScaleCascade picks it up).
  return React.createElement(
    _MenubarFrame as React.ElementType,
    { ref, ...rest, aui: frameAui },
    React.createElement(
      MenubarAuiProvider,
      { value: inherited },
      React.createElement(AuiScaleProvider, { value: frameAui.scale }, children),
    ),
  );
});
MenubarRoot.displayName = 'Menubar';

// ─── Menubar.Spacer — a tier-1 flex spacer (CSS in _state-cascade.scss) ──────────
// A box-less structural marker (`flex:1 1 auto`) that pushes following bar items to the far end.
// NO `aui`, NO recipe — pure layout (the Separator/Arrow marker precedent).
export interface MenubarSpacerProps
  extends React.ComponentPropsWithoutRef<'div'>,
    React.RefAttributes<HTMLDivElement> {}
const MenubarSpacer = createAtomicPart<MenubarSpacerProps>('div', 'aui-menubar-spacer');
MenubarSpacer.displayName = 'Menubar.Spacer';

// ─── Menubar.Divider — a VERTICAL rule whose THICKNESS follows the BORDER-WIDTH axis (CSS below) ──
// A thin vertical hairline that SEPARATES bar items (between menu groups, or between info chips).
// UNLIKE `Menubar.Spacer` (a `flex:1` GAP that takes up room), the Divider is a VISIBLE rule. It is
// box-less (no `.aui-frame`, no paint cell). Its line THICKNESS follows the **BORDER-WIDTH axis** rail
// `--aui-border-width-context` (the 220-Border-Width token — the SAME rail the Select/Dropdown ARROW
// hairline reads), NOT a spacing token. The recipe emits a 220 cell so the rail is SET (not just the
// CSS fallback):
//   • `aui.borderWidth` (own) → `aui-border-width-<n>` (a fixed px: 0..4) — own override WINS;
//   • unset → `aui-border-width-default`, which BRIDGES `--aui-border-width-context` to the scale's
//     `--aui-stroke-width-context` → the thickness then FOLLOWS the tier (1px sm … 2px xl).
// SCALE feeds that bridge: the divider also emits `aui-scale-default-<tier>` (own `aui.scale` ?? the
// bar cascade ?? the trigger vocab default), so a bar `aui.scale` cascades to the divider thickness.
// `--aui-border-width-context` is `@property inherits:true`, so a divider nested under a bar that sets
// the rail inherits it too. Standalone (no Menubar) it resolves the default tier (sm → 1px). Stamps
// the a11y-correct `role="separator" aria-orientation="vertical"` (consumer props win — spread after).
export interface MenubarDividerProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'color'> {
  /** The only meaningful axes on a box-less rule: `borderWidth` sets the line THICKNESS off the
   *  220-Border-Width rail (own wins; unset = the scale-driven `default`), and `scale` feeds that
   *  `default` bridge (own ?? the bar cascade ?? the trigger default). */
  aui?: { borderWidth?: AuiBorderWidth; scale?: MenubarScale };
}
const MenubarDivider = React.forwardRef<HTMLDivElement, MenubarDividerProps>(
  function MenubarDivider({ aui, className, ...rest }, ref) {
    const inheritedScale = useAuiScale();
    // Resolve the effective tier (own ?? bar cascade ?? trigger vocab default — READ the vocab, never
    // a literal, G15). The scale cell sets `--aui-stroke-width-context`, which the
    // `aui-border-width-default` cell bridges into `--aui-border-width-context` (the thickness rail).
    const resolvedScale = resolveAuiScale(
      aui?.scale,
      inheritedScale,
      MENUBAR_TRIGGER_VOCAB.defaults.scale as MenubarScale,
    );
    // An OWN `aui.borderWidth` pins a fixed px (`aui-border-width-<n>`); unset bridges to the
    // scale-driven stroke (`aui-border-width-default`) so the thickness FOLLOWS the tier.
    const borderWidthClass = `aui-border-width-${aui?.borderWidth ?? 'default'}`;
    const cls = mergeAuiClasses([
      'aui-menubar-divider',
      `aui-scale-default-${resolvedScale}`,
      borderWidthClass,
      className as string | undefined,
    ]);
    return <div ref={ref} role="separator" aria-orientation="vertical" {...rest} className={cls} />;
  },
);
MenubarDivider.displayName = 'Menubar.Divider';

// ─── Menubar.DropdownTrigger — the bespoke top-level bar trigger ──────────────────
// The ONE bespoke menu part: a real Base UI Menu.Trigger (the bar button that opens one menu),
// going through the MAIN factory with [useScaleCascade, useStateLayer, useMenubarTriggerRecipe]
// (identical extension chain to Dropdown.Trigger, only the recipe differs). It RESOLVES color off
// the Menubar cascade (own ?? inherited ?? raised) and passes the PLAIN resolved aui to the factory.
// Disabled → grey via the trigger-state recipe (reads Base UI render state; context-merged from a
// disabled bar) — no extra work.
const _MenubarTrigger = createAtomicComponent(MenuPrimitive.Trigger, {
  extensions: [useScaleCascade, useStateLayer, useMenubarTriggerRecipe],
});

// ─── Menubar.Chevron — the composable disclosure chevron (re-export Dropdown.Chevron) ──
// A `Menubar.Dropdown` IS a `Dropdown`, and the bespoke bar trigger is a Base UI `Menu.Trigger` that
// carries the SAME `data-popup-open` attr — so the shared `.aui-dropdown-chevron` rotate works in
// menubar mode (the integrator's scss keys the rotate off `.aui-menubar-trigger[data-popup-open]`).
// We therefore RE-EXPORT `Dropdown.Chevron` verbatim (zero re-implementation, same identity) under
// the flat host name `Menubar.Chevron`. The displayName is left as `Dropdown.Chevron` (it IS the same
// reference) so `splitTriggerChildren(children, MenubarChevron)` matches by identity.
const MenubarChevron = Dropdown.Chevron;
export type MenubarChevronProps = React.ComponentProps<typeof MenubarChevron>;

export interface MenubarDropdownTriggerProps
  extends Omit<React.ComponentProps<typeof MenuPrimitive.Trigger>, 'color'> {
  /** Unified customisation object: context axes (color/paint/scale/shape) + per-state appearance
   *  (`states.unselected` = closed / `states.selected` = open) + nested `sx` (full-frame surface).
   *  color + scale FOLLOW the bar cascade (own wins); paint/shape/profile/sx are per-part. With no
   *  `states` authored the appearance is identical to before (zero-diff). `disabled` stays native. */
  aui?: MenubarTriggerAui;
}

// COMPOSITION-DRIVEN (mirror Dropdown.Trigger): the trigger renders the label body + (only if the
// consumer composed a `<Menubar.Chevron>`) the disclosure chevron. There is NO auto-render and NO
// `chevron`/`rotateOnOpen` prop. `splitTriggerChildren` separates a composed `<Menubar.Chevron>` from
// the label body by part identity (recursing fragments); `composeChevron` injects the scale-matched
// default glyph + stamps `data-aui-rotate` (childless → default glyph + auto-rotate; custom-content
// → as authored). If no chevron is composed, NO chevron renders. Ref typed `HTMLElement` (Base UI's
// Menu.Trigger exposes `RefAttributes<HTMLElement>` — its `render` prop can replace the `<button>`).
const MenubarDropdownTrigger = React.forwardRef<HTMLElement, MenubarDropdownTriggerProps>(
  function MenubarDropdownTrigger({ children, aui, ...rest }, ref) {
    // a11y (WCAG 4.1.2): dev-warn on a nameless bar trigger (only a decorative Menubar.Icon /
    // Menubar.Chevron, no aria-label/-labelledby/title). NO-OP in production.
    warnIfNoAccessibleName(children, rest as Record<string, unknown>, 'Menubar.DropdownTrigger');
    const inherited = useMenubarAui();
    const inheritedScale = useAuiScale();
    // RESOLVE color (+ scale/shape) off the bar cascade; paint/shape default from the trigger vocab.
    // color FOLLOWS the cascade (own ?? inherited ?? raised) — a bar color override recolors the
    // trigger; the un-set default keeps `raised`. `states` (per-state appearance) is NOT cascaded;
    // pass it through verbatim so `aui.states` reaches the toggle recipe.
    const resolvedAui = React.useMemo<MenubarTriggerAui>(
      () => {
        const resolved = resolvePartAui(inherited, aui as FieldResolvedAui, {
          paint: MENUBAR_TRIGGER_VOCAB.defaults.paint,
          profile: MENUBAR_TRIGGER_VOCAB.profile,
          color: MENUBAR_TRIGGER_VOCAB.defaults.color as FieldResolvedAui['color'],
          scale: MENUBAR_TRIGGER_VOCAB.defaults.scale as FieldResolvedAui['scale'],
          shape: MENUBAR_TRIGGER_VOCAB.defaults.shape as FieldResolvedAui['shape'],
          followColor: true,
        }) as MenubarTriggerAui;
        return aui?.states ? { ...resolved, states: aui.states } : resolved;
      },
      [inherited, aui],
    );
    // The chevron is sized by the trigger's EFFECTIVE TIER — own ?? cascaded scale ?? vocab default
    // (READ the vocab default, never a literal — G15). The resolved aui already carries the effective
    // scale, but resolveAuiScale keeps parity with Dropdown.Trigger's wrapper.
    const triggerScale: DropdownScale = resolveAuiScale(
      (resolvedAui as { scale?: DropdownScale }).scale,
      inheritedScale,
      MENUBAR_TRIGGER_VOCAB.defaults.scale as DropdownScale,
    );
    // Split the composed chevron from the label body (by part identity, recursing fragments). The
    // chevron's GLYPH inherits the trigger's resolved scale; its own `aui` still wins per-axis.
    const { body, chevrons } = splitTriggerChildren(children, MenubarChevron);
    const composedChevron = composeChevron(chevrons[0], {
      scale: triggerScale,
      rotateOnOpen: true,
    });
    return React.createElement(
      _MenubarTrigger as React.ElementType,
      { ref, ...rest, aui: resolvedAui },
      <>
        {body}
        {composedChevron}
      </>,
    );
  },
);
MenubarDropdownTrigger.displayName = 'Menubar.DropdownTrigger';

// ─── Menubar.Icon — a placeable general icon (a ContainedIcon, contained profile) ──
// ONE placeable icon usable ANYWHERE inside the menubar (bar trigger, bar Button, AND menu items),
// exactly like `Dropdown.Icon`. A thin wrapper over `ContainedIcon` that DEFAULTS `profile:
// 'contained'` so a leading/inline icon sits SNUG in a row. It IS a ContainedIcon otherwise (same
// identity props `name`/`family`/`layer`/`weight` + the full box `aui` surface; a consumer overrides
// any axis via `aui`). The icon sizes to its EFFECTIVE tier read off the MENUBAR cascade: own
// `aui.scale` ?? the bar scale (`AuiScaleProvider`, seeded by the bar) ?? the Trigger vocab default.
export type MenubarIconProps = ContainedIconProps;
const MenubarIcon = React.forwardRef<HTMLSpanElement, MenubarIconProps>(
  function MenubarIcon({ aui, ...rest }, ref) {
    const inheritedScale = useAuiScale();
    const resolvedScale = resolveAuiScale(
      aui?.scale,
      inheritedScale,
      MENUBAR_TRIGGER_VOCAB.defaults.scale as DropdownScale,
    );
    const resolvedAui = React.useMemo(
      () => ({ profile: 'contained' as const, ...aui, scale: resolvedScale }),
      [aui, resolvedScale],
    );
    return <ContainedIcon ref={ref} {...rest} aui={resolvedAui} />;
  },
);
MenubarIcon.displayName = 'Menubar.Icon';

// ─── The menu surface — THIN re-exports of the Dropdown parts ─────────────────────
// Every part EXCEPT `Menubar.Dropdown` IS the same reference as the matching `Dropdown.<X>` (zero
// re-implementation). `Menubar.Dropdown` is a THIN forwardRef WRAPPER over `Dropdown` (NOT a raw
// `typeof` re-export) that RE-SEEDS the bar scale into the Dropdown's `aui` — without it the
// Dropdown root's own `AuiScaleProvider value={aui?.scale}` (undefined) would SHADOW the bar's
// seeded scale and drop the popup/items to vocab `sm`. The popup parts theme via the SAME identity
// re-stamp, now correctly inheriting the re-seeded scale. The Menubar ROOT is non-generic (mirrors
// Fieldset/Field, not the Dropdown payload seam).
// TYPE NOTE (TS4023): `Dropdown` (the assembled namespace) infers to the NON-exported
// `DropdownComponent` interface in `../dropdown/dropdown`, `Dropdown.SubmenuRoot` to a local
// `DropdownSubmenuRoot` function type, and `Button` to the non-exported `ButtonComponent` — none can
// be NAMED in our emitted `.d.ts`. We don't own those files, so we hand-author NAMEABLE component
// types for the three offenders from their EXPORTED Props types and annotate the consts with them.
// This is sound for the FLAT public contract: a consumer composes `<Menubar.Dropdown>` as the menu
// ROOT and reaches its parts through the flat `Menubar.Dropdown*` siblings (NOT `Menubar.Dropdown.*`),
// so the root's own static namespace is not part of the public Menubar API and may be widened away.
type MenubarDropdownComponent = React.ForwardRefExoticComponent<
  DropdownRootProps & { aui?: { scale?: MenubarScale } } & React.RefAttributes<HTMLElement>
>;
type MenubarDropdownSubmenuRootComponent = React.ForwardRefExoticComponent<
  DropdownSubmenuRootProps & React.RefAttributes<HTMLElement>
>;
type MenubarButtonComponent = React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLElement>
>;
// `IconButtonProps` is an exported, nameable type (the `name` + accessible-name contract is baked in),
// so we keep its full prop shape and just widen the ref to `HTMLElement` for parity with the others.
type MenubarIconButtonComponent = React.ForwardRefExoticComponent<
  IconButtonProps & React.RefAttributes<HTMLElement>
>;

// 🔑 `Menubar.Dropdown` is a THIN forwardRef WRAPPER (NOT a raw `typeof Dropdown` re-export). The
// underlying `DropdownRoot` wraps its children in `AuiScaleProvider value={aui?.scale}` — when that
// `aui.scale` is undefined it would SHADOW the bar's seeded `AuiScaleProvider`, dropping the popup +
// items back to the vocab `sm` tier. We re-seed the bar scale into the Dropdown's `aui` (own scale
// wins; else inherit the bar tier read off the Menubar root's `AuiScaleProvider`) so the Dropdown's
// inner provider carries the bar tier and the re-exported menu parts inherit it. (Only `scale` is
// re-seeded — that's all `DropdownRoot` reads; color/shape stay per-part as before.)
const MenubarDropdown = React.forwardRef<HTMLElement, DropdownRootProps & { aui?: { scale?: MenubarScale } }>(
  function MenubarDropdown({ aui, ...rest }, ref) {
    const barScale = useAuiScale();
    const merged = { ...aui, scale: aui?.scale ?? barScale };
    return React.createElement(Dropdown as React.ElementType, { ref, ...rest, aui: merged });
  },
) as unknown as MenubarDropdownComponent;
(MenubarDropdown as { displayName?: string }).displayName = 'Menubar.Dropdown';
const MenubarDropdownPopup = Dropdown.Popup;
const MenubarDropdownItem = Dropdown.Item;
const MenubarDropdownSeparator = Dropdown.Separator;
const MenubarDropdownGroup = Dropdown.Group;
const MenubarDropdownGroupLabel = Dropdown.GroupLabel;
const MenubarDropdownCheckboxItem = Dropdown.CheckboxItem;
const MenubarDropdownCheckboxItemIndicator = Dropdown.CheckboxItemIndicator;
const MenubarDropdownRadioGroup = Dropdown.RadioGroup;
const MenubarDropdownRadioItem = Dropdown.RadioItem;
const MenubarDropdownRadioItemIndicator = Dropdown.RadioItemIndicator;
const MenubarDropdownSubmenuRoot = Dropdown.SubmenuRoot as unknown as MenubarDropdownSubmenuRootComponent;
const MenubarDropdownSubmenuTrigger = Dropdown.SubmenuTrigger;
const MenubarDropdownLinkItem = Dropdown.LinkItem;
const MenubarDropdownPortal = Dropdown.Portal;
const MenubarDropdownPositioner = Dropdown.Positioner;
const MenubarDropdownArrow = Dropdown.Arrow;
const MenubarDropdownBackdrop = Dropdown.Backdrop;
const MenubarDropdownViewport = Dropdown.Viewport;

// `Menubar.Button` = a THIN cascade-reading wrapper over the shipped Button (bar-level actions that
// are NOT menus). It mirrors how the bespoke trigger resolves: read the bar cascade (color via the
// Menubar JS context, scale via AuiScaleProvider) and resolve via `resolvePartAui` so a bar
// `aui.color`/`scale` flows to the button (own wins). Without this, a raw `typeof Button` would
// ignore the bar cascade entirely. The Button defaults (surface-alt/solid/xs/soft/elev-0) hold when
// nothing cascades — standalone (no Menubar) the ambient cascade is EMPTY → byte-identical to a
// plain Button. Widened to the nameable `MenubarButtonComponent` (see the TS4023 note); a bar icon
// is composed via the placeable `Menubar.Icon`, so the Button's own `.Icon` static is moot.
const MenubarButton = React.forwardRef<HTMLElement, ButtonProps>(
  function MenubarButton({ aui, ...rest }, ref) {
    const inherited = useMenubarAui();
    const resolvedAui = React.useMemo<ButtonProps['aui']>(
      () =>
        resolvePartAui(inherited, aui as FieldResolvedAui, {
          // Button vocab defaults (READ the vocab, never literals — G15) — color FOLLOWS the bar
          // cascade (own ?? inherited ?? surface-alt); scale/shape follow too; the rest pin.
          paint: BUTTON_VOCAB.defaults.paint,
          color: BUTTON_VOCAB.defaults.color as FieldResolvedAui['color'],
          scale: BUTTON_VOCAB.defaults.scale as FieldResolvedAui['scale'],
          shape: BUTTON_VOCAB.defaults.shape as FieldResolvedAui['shape'],
          elevation: BUTTON_VOCAB.defaults.elevation as FieldResolvedAui['elevation'],
          followColor: true,
        }) as ButtonProps['aui'],
      [inherited, aui],
    );
    return React.createElement(Button as React.ElementType, { ref, ...rest, aui: resolvedAui });
  },
) as unknown as MenubarButtonComponent;
(MenubarButton as { displayName?: string }).displayName = 'Menubar.Button';

// `Menubar.IconButton` = a THIN cascade-reading wrapper over the shipped IconButton (an icon-only bar
// action — e.g. a settings cog or notifications bell at the far end of the bar). It mirrors
// `Menubar.Button` EXACTLY: read the bar cascade (color via the Menubar JS context, scale via
// AuiScaleProvider) and resolve via `resolvePartAui` so a bar `aui.color`/`scale` flows to the
// icon-button (own wins). IconButton has NO `*_VOCAB` — its defaults live in `ICON_BUTTON_DEFAULTS`
// (color/paint/scale/profile/shape/elevation) — so we READ that const (never literals — G15). Only
// color + scale CASCADE (the Menubar contract); paint/shape/elevation pin from the defaults and
// `profile` ('square') stays IconButton's own per-part default (not cascaded, like paint). The
// icon (`name`) + accessible name (`aria-label`/`aria-labelledby`) are forwarded verbatim. Standalone
// (no Menubar) the ambient cascade is EMPTY → byte-identical to a plain IconButton. Widened to the
// nameable `MenubarIconButtonComponent` (see the TS4023 note).
const MenubarIconButton = React.forwardRef<HTMLElement, IconButtonProps>(
  function MenubarIconButton({ aui, ...rest }, ref) {
    const inherited = useMenubarAui();
    const resolvedAui = React.useMemo<IconButtonProps['aui']>(
      () =>
        resolvePartAui(inherited, aui as FieldResolvedAui, {
          // IconButton defaults (READ the const, never literals — G15) — color FOLLOWS the bar
          // cascade (own ?? inherited ?? surface-alt); scale follows too; the rest pin per-part.
          paint: ICON_BUTTON_DEFAULTS.paint,
          color: ICON_BUTTON_DEFAULTS.color as FieldResolvedAui['color'],
          scale: ICON_BUTTON_DEFAULTS.scale as FieldResolvedAui['scale'],
          shape: ICON_BUTTON_DEFAULTS.shape as FieldResolvedAui['shape'],
          elevation: ICON_BUTTON_DEFAULTS.elevation as FieldResolvedAui['elevation'],
          followColor: true,
        }) as IconButtonProps['aui'],
      [inherited, aui],
    );
    return React.createElement(IconButton as React.ElementType, { ref, ...rest, aui: resolvedAui });
  },
) as unknown as MenubarIconButtonComponent;
(MenubarIconButton as { displayName?: string }).displayName = 'Menubar.IconButton';

// Re-export the Props types from `../dropdown` (and Button) under host-prefixed names.
export type {
  DropdownPopupProps as MenubarDropdownPopupProps,
  DropdownItemProps as MenubarDropdownItemProps,
  DropdownSeparatorProps as MenubarDropdownSeparatorProps,
  DropdownGroupProps as MenubarDropdownGroupProps,
  DropdownGroupLabelProps as MenubarDropdownGroupLabelProps,
  DropdownCheckboxItemProps as MenubarDropdownCheckboxItemProps,
  DropdownCheckboxItemIndicatorProps as MenubarDropdownCheckboxItemIndicatorProps,
  DropdownRadioGroupProps as MenubarDropdownRadioGroupProps,
  DropdownRadioItemProps as MenubarDropdownRadioItemProps,
  DropdownRadioItemIndicatorProps as MenubarDropdownRadioItemIndicatorProps,
  DropdownSubmenuRootProps as MenubarDropdownSubmenuRootProps,
  DropdownSubmenuTriggerProps as MenubarDropdownSubmenuTriggerProps,
  DropdownLinkItemProps as MenubarDropdownLinkItemProps,
  DropdownPortalProps as MenubarDropdownPortalProps,
  DropdownPositionerProps as MenubarDropdownPositionerProps,
  DropdownArrowProps as MenubarDropdownArrowProps,
  DropdownBackdropProps as MenubarDropdownBackdropProps,
  DropdownViewportProps as MenubarDropdownViewportProps,
} from '../dropdown';
export type { ButtonProps as MenubarButtonProps } from '../button';
export type { IconButtonProps as MenubarIconButtonProps } from '../icon-button';

// ─── Assemble (Object.assign dot-namespace) ───────────────────────────────────────
// The Menubar ROOT is NON-generic (menubar menus are static) → a plain ForwardRefExotic interface
// (mirror Fieldset/Field, NOT the Dropdown payload seam). Keep the statics in LOCKSTEP with the
// `Object.assign` below.
interface MenubarComponent
  extends React.ForwardRefExoticComponent<
    MenubarProps & React.RefAttributes<HTMLDivElement>
  > {
  Spacer: typeof MenubarSpacer;
  Divider: typeof MenubarDivider;
  Button: typeof MenubarButton;
  IconButton: typeof MenubarIconButton;
  Icon: typeof MenubarIcon;
  Chevron: typeof MenubarChevron;
  DropdownTrigger: typeof MenubarDropdownTrigger;
  Dropdown: typeof MenubarDropdown;
  DropdownPopup: typeof MenubarDropdownPopup;
  DropdownItem: typeof MenubarDropdownItem;
  DropdownSeparator: typeof MenubarDropdownSeparator;
  DropdownGroup: typeof MenubarDropdownGroup;
  DropdownGroupLabel: typeof MenubarDropdownGroupLabel;
  DropdownCheckboxItem: typeof MenubarDropdownCheckboxItem;
  DropdownCheckboxItemIndicator: typeof MenubarDropdownCheckboxItemIndicator;
  DropdownRadioGroup: typeof MenubarDropdownRadioGroup;
  DropdownRadioItem: typeof MenubarDropdownRadioItem;
  DropdownRadioItemIndicator: typeof MenubarDropdownRadioItemIndicator;
  DropdownSubmenuRoot: typeof MenubarDropdownSubmenuRoot;
  DropdownSubmenuTrigger: typeof MenubarDropdownSubmenuTrigger;
  DropdownLinkItem: typeof MenubarDropdownLinkItem;
  DropdownPortal: typeof MenubarDropdownPortal;
  DropdownPositioner: typeof MenubarDropdownPositioner;
  DropdownArrow: typeof MenubarDropdownArrow;
  DropdownBackdrop: typeof MenubarDropdownBackdrop;
  DropdownViewport: typeof MenubarDropdownViewport;
}

export const Menubar = Object.assign(MenubarRoot, {
  Spacer: MenubarSpacer,
  Divider: MenubarDivider,
  Button: MenubarButton,
  IconButton: MenubarIconButton,
  Icon: MenubarIcon,
  Chevron: MenubarChevron,
  DropdownTrigger: MenubarDropdownTrigger,
  Dropdown: MenubarDropdown,
  DropdownPopup: MenubarDropdownPopup,
  DropdownItem: MenubarDropdownItem,
  DropdownSeparator: MenubarDropdownSeparator,
  DropdownGroup: MenubarDropdownGroup,
  DropdownGroupLabel: MenubarDropdownGroupLabel,
  DropdownCheckboxItem: MenubarDropdownCheckboxItem,
  DropdownCheckboxItemIndicator: MenubarDropdownCheckboxItemIndicator,
  DropdownRadioGroup: MenubarDropdownRadioGroup,
  DropdownRadioItem: MenubarDropdownRadioItem,
  DropdownRadioItemIndicator: MenubarDropdownRadioItemIndicator,
  DropdownSubmenuRoot: MenubarDropdownSubmenuRoot,
  DropdownSubmenuTrigger: MenubarDropdownSubmenuTrigger,
  DropdownLinkItem: MenubarDropdownLinkItem,
  DropdownPortal: MenubarDropdownPortal,
  DropdownPositioner: MenubarDropdownPositioner,
  DropdownArrow: MenubarDropdownArrow,
  DropdownBackdrop: MenubarDropdownBackdrop,
  DropdownViewport: MenubarDropdownViewport,
}) as MenubarComponent;

// `MenubarDropdownTriggerProps`, `MenubarSpacerProps`, `MenubarDividerProps`, `MenubarIconProps` and
// `MenubarChevronProps` are exported at their declaration sites above (and re-exported from
// `./index`), so no extra re-export here.

export default Menubar;
