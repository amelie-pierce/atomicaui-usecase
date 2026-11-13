// modules/design/atomic-aui/src/lib/panels/panels.tsx
//
// Panels — the AtomicAUI 6.0 resizable split-pane family. A thin, FULLY-COMPOSABLE wrapper over
// `react-resizable-panels` (RRP) v4: `Group` / `Panel` / `Separator` (NOT PanelGroup/PanelResizeHandle).
// RRP owns ALL the hard parts we must NOT re-implement: the flex sizing on `[data-panel]`, the
// `role="separator"` + full WAI-ARIA on the handle, pointer/keyboard drag, collapse math. We add ONLY:
//   • a `.aui-panels` outer-wrapper surface (`aui`) + the OPT-IN 220ms collapse/expand tween (lifted
//     `.aui-panels--animating` class, toggled by a JS timer on TOGGLE — like the ADC's — NOT on drag);
//   • a DS-owned React registry context: a `Map<id, PanelImperativeHandle>` so `Panels.Trigger` can
//     reach ANY panel by id and toggle its `collapse()`/`expand()` — the ONLY viable by-id mechanism
//     in RRP v4 (there is NO getPanelElement / usePanelGroupContext — grep=0);
//   • `Panels.Panel` — a View-class hand-crafted frame (forwardRef + PANEL_VOCAB) that registers its
//     panelRef in the registry on mount/unmount and lands its surface classes on RRP's NESTED inner
//     div (the node RRP styles; className/style do NOT go on the `[data-panel]` flex root);
//   • `Panels.Trigger` — an IconButton whose click reads the target panel's handle from the registry
//     and toggles it, reflecting `aria-expanded` from the live collapsed state;
//   • `Panels.ResizeHandle` — RRP `Separator`, STYLE-ONLY (`:hover`/`:active`), aria/flex untouched;
//   • `Panels.Icon` — a ContainedIcon part (mirrors Dropdown.Icon) for composing rail/panel icons.
// The 40px rail / relocating header are CONSUMER View composition inside a Panel — the DS owns NO
// opinionated rail.
import * as React from 'react';
import {
  Group as RrpGroup,
  Panel as RrpPanel,
  Separator as RrpSeparator,
  type GroupProps as RrpGroupProps,
  type PanelProps as RrpPanelProps,
  type SeparatorProps as RrpSeparatorProps,
  type PanelImperativeHandle,
} from 'react-resizable-panels';
import { buildLeafClasses } from '../../core/recipe/build-leaf-classes';
import { createAtomicPart, type PartStyleProps } from '../../core/factory/create-atomic-part';
import { FRAME_PART_SX_AXES } from '../../core/recipe/part-classes';
import type { AuiRecipeColor } from '../../core/vocabulary/recipe-vocab';
import { PANELS_ROOT_VOCAB, PANEL_VOCAB, type PanelAui } from './use-recipe';
import { IconButton, type IconButtonProps } from '../icon-button';
import { ContainedIcon, type ContainedIconProps } from '../icon';

export { PANELS_ROOT_VOCAB, PANEL_VOCAB, PANEL_SX_AXES } from './use-recipe';
export type { PanelAui } from './use-recipe';

// ─── The id registry (the by-id panel-handle mechanism — RRP v4 has none) ────────────────────────
// A DS-owned context that maps each Panel's `id` → its live `PanelImperativeHandle` (collapse/expand/
// isCollapsed/…). `Panels.Panel` registers on mount and removes on unmount; `Panels.Trigger` reads a
// handle by `targetId`. `subscribe` lets a Trigger re-render when the registry mutates (a panel
// (un)mounts) so a freshly-mounted target becomes reachable. We DON'T track collapsed state here —
// each panel's `onResize` feeds the Trigger's local collapsed state (RRP has no onCollapse/onExpand).
interface PanelsRegistry {
  register: (id: string, handle: PanelImperativeHandle) => () => void;
  get: (id: string) => PanelImperativeHandle | undefined;
  subscribe: (listener: () => void) => () => void;
}

const PanelsRegistryContext = React.createContext<PanelsRegistry | null>(null);

function usePanelsRegistry(): PanelsRegistry | null {
  return React.useContext(PanelsRegistryContext);
}

function createRegistry(): PanelsRegistry {
  const map = new Map<string, PanelImperativeHandle>();
  const listeners = new Set<() => void>();
  const notify = () => listeners.forEach((l) => l());
  return {
    register(id, handle) {
      map.set(id, handle);
      notify();
      return () => {
        // Conditional delete: only remove if THIS handle is still the one registered under `id` — guards
        // a StrictMode double-mount / id-churn where a newer handle registered before this cleanup runs
        // (an unconditional delete would strand the live handle and make the Trigger inert).
        if (map.get(id) === handle) {
          map.delete(id);
          notify();
        }
      };
    },
    get(id) {
      return map.get(id);
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

// ─── Panels (root) — wraps RRP Group + owns the registry + the animate timer ─────────────────────
export interface PanelsProps extends Omit<RrpGroupProps, 'className' | 'style' | 'color'> {
  /** Resizable orientation. RRP's `orientation` (NOT `direction`). Default `'horizontal'`. */
  orientation?: RrpGroupProps['orientation'];
  /** When `true` (DEFAULT), a panel collapse/expand TOGGLE animates over 220ms (the lifted
   *  `.aui-panels--animating` class, set by a JS timer like the ADC's — applied on TOGGLE, removed
   *  after the tween, so DRAG resizing stays instant/un-tweened). `false` disables it entirely. */
  animate?: boolean;
  /** Surface appearance for the OUTER `.aui-panels` wrapper (the box around the RRP Group). The Group
   *  itself owns the flex layout (display/flex-direction/overflow are RRP-locked); the wrapper paints
   *  the optional frame around it. Defaults to no surface (transparent) — the consumer opts in. */
  aui?: PanelAui;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const PANELS_ANIMATING_CLASS = 'aui-panels--animating';
// Match the 220ms ADC tween → the nearest motion token is `--p-ms-240` (the timer clears the class
// after the tween; a hair longer than the CSS duration is intentional so the transition always lands).
const PANELS_ANIMATE_MS = 240;

const PanelsRoot = React.forwardRef<HTMLDivElement, PanelsProps>(function Panels(
  { orientation = 'horizontal', animate = true, aui, className, style, children, ...rest },
  ref,
) {
  // Stable registry instance for this Panels subtree.
  const registry = React.useMemo(createRegistry, []);

  // The animate timer: a Trigger toggle (or any consumer wanting a tween) calls `pulseAnimate()`,
  // which adds the lifted class then removes it after the tween. Drag never calls it → drag is instant.
  const [animating, setAnimating] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const pulseAnimate = React.useCallback(() => {
    if (!animate) return;
    setAnimating(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAnimating(false), PANELS_ANIMATE_MS);
  }, [animate]);
  React.useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const contextValue = React.useMemo<PanelsContextValue>(
    () => ({ registry, pulseAnimate }),
    [registry, pulseAnimate],
  );

  // The outer wrapper surface — ALWAYS the stateless root frame (PANELS_ROOT_VOCAB), even with no
  // `aui`: its default `paint:'text'` paints nothing (transparent fill/border) but the cell ALWAYS
  // carries `aui-scale-no-padding-sm`, whose `--aui-gap` (inherits:true) cascades to the ResizeHandle
  // so the inter-panel gap follows the root scale. `buildLeafClasses` already prepends the `aui-panels`
  // marker. A consumer `aui` overlays a real frame paint over the non-painting default.
  const surface = buildLeafClasses(PANELS_ROOT_VOCAB, aui);
  const wrapperClass = [surface, animate && animating ? PANELS_ANIMATING_CLASS : false, className]
    .filter(Boolean)
    .join(' ');

  return (
    <PanelsContext.Provider value={contextValue}>
      <PanelsRegistryContext.Provider value={registry}>
        <div ref={ref} className={wrapperClass} style={style}>
          <RrpGroup orientation={orientation} {...rest}>
            {children}
          </RrpGroup>
        </div>
      </PanelsRegistryContext.Provider>
    </PanelsContext.Provider>
  );
});
PanelsRoot.displayName = 'Panels';

// The Panels context (registry + the animate pulse). Separate from the registry context so the
// registry can be consumed alone (the Trigger needs both; a future part may need only the registry).
interface PanelsContextValue {
  registry: PanelsRegistry;
  pulseAnimate: () => void;
}
const PanelsContext = React.createContext<PanelsContextValue | null>(null);
function usePanelsContext(): PanelsContextValue | null {
  return React.useContext(PanelsContext);
}

// ─── Panels.Panel — a View-class frame wrapping RRP Panel; registers its id ──────────────────────
export interface PanelProps
  extends Omit<RrpPanelProps, 'className' | 'style' | 'color' | 'id' | 'panelRef' | 'elementRef'> {
  /** REQUIRED — the panel's id. Doubles as RRP's panel id (the `data-panel` attr) AND the registry
   *  key a `Panels.Trigger` targets via `targetId`. */
  id: string;
  /** The FULL 7-axis frame appearance for the panel's content surface (a View-class box). Lands on
   *  RRP's NESTED inner div, NOT the `[data-panel]` flex root — see the nested-div trap below. */
  aui?: PanelAui;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const PanelInner = React.forwardRef<HTMLDivElement, PanelProps>(function Panel(
  { id, aui, className, children, onResize, ...rest },
  ref,
) {
  const registry = usePanelsRegistry();
  // RRP delivers the imperative handle via `panelRef` (NOT `ref`). We capture it in a callback ref so
  // we can register/unregister it in the DS registry keyed by `id`.
  const handleRef = React.useRef<PanelImperativeHandle | null>(null);
  const cleanupRef = React.useRef<(() => void) | null>(null);

  // COLLAPSED REFLECTION (drives the content fade — Area D). RRP exposes NO `data-collapsed` attr (its
  // [data-panel] only carries the inline flex), so the collapsed state cannot be detected in pure CSS —
  // we reflect it ourselves into `data-aui-collapsed` on the [data-panel] root, and the SCSS fades the
  // body on that attr — `.aui-panels-content` (the body region) when a `Panels.Content` is composed, so
  // a SIBLING rail/Trigger stays visible; else the whole content node (`.aui-panels-panel`). The signal
  // is RRP's `onResize` (fires on mount and
  // on every size change incl. a collapse/expand) + an initial read at handle registration. The handle
  // can throw "Group not found" before RRP's group registers, so every read is guarded (treat as
  // not-collapsed). A drag resize that never crosses the collapse threshold keeps `isCollapsed()` false,
  // so the attr stays absent and content stays at full opacity — only a real collapse/expand toggles it.
  const [collapsed, setCollapsed] = React.useState(false);
  const safeIsCollapsed = React.useCallback(
    (handle: PanelImperativeHandle | null): boolean => {
      if (!handle) return false;
      try {
        return handle.isCollapsed();
      } catch {
        return false;
      }
    },
    [],
  );

  const setPanelHandle = React.useCallback(
    (handle: PanelImperativeHandle | null) => {
      handleRef.current = handle;
      // Re-register on every handle/id change: drop the previous registration, then add the new one.
      cleanupRef.current?.();
      cleanupRef.current = null;
      if (handle && registry) {
        cleanupRef.current = registry.register(id, handle);
      }
      // Seed the collapsed reflection from the freshly-resolved handle (e.g. a panel mounted already
      // collapsed via defaultSize=collapsedSize).
      setCollapsed(safeIsCollapsed(handle));
    },
    [id, registry, safeIsCollapsed],
  );
  React.useEffect(
    () => () => {
      // Unmount: drop the registration.
      cleanupRef.current?.();
      cleanupRef.current = null;
    },
    [],
  );

  // Wrap RRP's onResize: forward the consumer's handler verbatim, then refresh the collapsed reflection.
  // Guard the state update so a continuous drag (many onResize calls at the same collapsed-ness) does not
  // churn React state.
  const handleResize = React.useCallback<NonNullable<RrpPanelProps['onResize']>>(
    (panelSize, panelId, prevPanelSize) => {
      onResize?.(panelSize, panelId, prevPanelSize);
      const next = safeIsCollapsed(handleRef.current);
      setCollapsed((current) => (current === next ? current : next));
    },
    [onResize, safeIsCollapsed],
  );

  // MIND THE NESTED-DIV TRAP (RRP fact): `className`/`style` on RRP Panel are applied to a NESTED
  // inner `<div>` (RRP styles that node), NOT the `[data-panel]` flex root. So the View-frame surface
  // classes go to RRP's `className` — they correctly land on the content node, and RRP keeps the flex
  // root unstyled (its sizing intact). `ref` (the outer root element) is RRP's `elementRef`.
  const surface = buildLeafClasses(PANEL_VOCAB, aui);
  const innerClass = [surface, className].filter(Boolean).join(' ');

  return (
    <RrpPanel
      id={id}
      elementRef={ref}
      panelRef={setPanelHandle}
      className={innerClass}
      {...rest}
      onResize={handleResize}
      // Lands on the OUTER [data-panel] flex root (RRP spreads extra props there, not the inner content
      // div) so the SCSS `[data-panel][data-aui-collapsed] > .aui-panels-panel [> .aui-panels-content]`
      // direct-child rule fades exactly this panel's body (never a nested panel's).
      data-aui-collapsed={collapsed ? '' : undefined}
    >
      {children}
    </RrpPanel>
  );
});
PanelInner.displayName = 'Panels.Panel';

// ─── Panels.Trigger — an IconButton that toggles a target panel by id ────────────────────────────
// We INTERSECT `{ targetId }` onto `IconButtonProps` (rather than `extends Omit<…>`) so the
// `AccessibleName` discriminated union (aria-label OR aria-labelledby) is PRESERVED — flattening it
// via `interface … extends` collapses the union and breaks the required-name guarantee. `onClick`
// reuses IconButton's own (Base-UI-typed) signature so the handler stays assignable to the Button.
export type PanelsTriggerProps = IconButtonProps & {
  /** The id of the `Panels.Panel` this trigger toggles. */
  targetId: string;
};

type IconButtonClick = NonNullable<IconButtonProps['onClick']>;

const PanelsTrigger = React.forwardRef<HTMLButtonElement, PanelsTriggerProps>(function PanelsTrigger(
  { targetId, onClick, className, ...rest },
  ref,
) {
  const ctx = usePanelsContext();
  const registry = ctx?.registry ?? null;

  // Re-render when the registry mutates so a freshly-(un)mounted target becomes reachable + so the
  // collapsed reflection can read the latest handle.
  const [, force] = React.useReducer((n: number) => n + 1, 0);
  React.useEffect(() => registry?.subscribe(force), [registry]);

  // Track the target's collapsed state to reflect `aria-expanded`. RRP has NO onCollapse/onExpand, so
  // we read `isCollapsed()` from the handle (refreshed on every click + on registry changes). The
  // handle can throw "Group not found" if queried before RRP's group is fully registered (a mount-
  // timing race), so every read is guarded — an un-resolvable target reflects "expanded".
  const [collapsed, setCollapsed] = React.useState<boolean>(false);
  const safeIsCollapsed = React.useCallback((handle: PanelImperativeHandle | undefined): boolean => {
    if (!handle) return false;
    try {
      return handle.isCollapsed();
    } catch {
      return false;
    }
  }, []);
  const readCollapsed = React.useCallback(() => {
    setCollapsed(safeIsCollapsed(registry?.get(targetId)));
  }, [registry, targetId, safeIsCollapsed]);
  React.useEffect(readCollapsed, [readCollapsed]);

  const handleClick = React.useCallback<IconButtonClick>(
    (event) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      const handle = registry?.get(targetId);
      if (!handle) return;
      ctx?.pulseAnimate();
      if (safeIsCollapsed(handle)) handle.expand();
      else handle.collapse();
      // Read back after the toggle so aria-expanded reflects the new state immediately.
      setCollapsed(safeIsCollapsed(handle));
    },
    [onClick, registry, targetId, ctx, safeIsCollapsed],
  );

  // `rest` carries the required AccessibleName (aria-label | aria-labelledby) + name + aui surface. The
  // stable `.aui-panels-trigger` marker identifies the rail affordance (so it can be found/excluded —
  // it must sit OUTSIDE a faded `Panels.Content` region to stay visible in a collapsed rail).
  const triggerClass = ['aui-panels-trigger', className].filter(Boolean).join(' ');
  return (
    <IconButton
      ref={ref}
      className={triggerClass}
      aria-expanded={!collapsed}
      onClick={handleClick}
      {...rest}
    />
  );
});
PanelsTrigger.displayName = 'Panels.Trigger';

// ─── Panels.ResizeHandle — RRP Separator, STYLE-ONLY (CONFIGURABLE colour + width) ───────────────
// We add ONLY the `.aui-panels-resize-handle` marker (CSS :hover/:active in _state-cascade.scss). The
// `role="separator"` + full WAI-ARIA (aria-orientation/valuemin/valuemax/valuenow/controls) and the
// flex-grow/flex-shrink RRP locks are NEVER overridden — RRP owns them.
//
// CASCADE-FIRST consumer knobs (style-only — they emit two CSS custom properties the SCSS already
// reads, NOT prop-driven branching):
//   • `color` — an `AuiColor` intent for the divider line + the hover/active reveal wash. Resolves to
//     the matching `--theme-<color>` role and lands on `--aui-resize-handle-color`. The ADC sets
//     `color="primary"` to make the divider `--theme-primary` instead of the default outlined/overlay.
//     Unset → the SCSS falls back to `--theme-outlined` (line) / `--theme-overlay` (wash) — default look.
//   • `width` — a CSS length (e.g. `'var(--p-px-12)'`) for the handle's box size on the resize axis. It
//     lands on `--aui-resize-handle-size`, which the SCSS reads for inline-size (vertical handle) AND
//     block-size (horizontal handle) — NOT flex-basis (RRP's inline `flex: 0 0 auto` wins), the same
//     technique the gap uses. Unset → falls back to `--aui-gap` (the scale-driven default).
// Both are merged into the consumer `style` (consumer style wins on collision); RRP's role/aria/flex
// stay untouched. Default behaviour is unchanged when neither is set (no vars emitted).
export interface PanelsResizeHandleProps extends Omit<RrpSeparatorProps, 'color'> {
  className?: string;
  /** Divider line + hover/active wash colour — an `AuiColor` intent mapped to its `--theme-*` role.
   *  Unset → default outlined line / overlay wash. */
  color?: AuiRecipeColor;
  /** The handle's box size on the resize axis (a CSS length, e.g. `'var(--p-px-12)'`). Sizes
   *  inline-size (vertical handle) AND block-size (horizontal handle). Unset → the scale-driven gap. */
  width?: string;
  /** Whether the handle shows a faint background WASH on hover / while dragging (in addition to the
   *  divider line). Default `true`. `false` → only the divider line reveals (no background wash). */
  hoverBackground?: boolean;
  style?: React.CSSProperties;
}

const PanelsResizeHandle = React.forwardRef<HTMLDivElement, PanelsResizeHandleProps>(
  function PanelsResizeHandle({ className, color, width, hoverBackground = true, style, ...rest }, ref) {
    const composed = ['aui-panels-resize-handle', className].filter(Boolean).join(' ');
    // Emit the cascade hooks ONLY when set (so the default fallbacks in the SCSS hold otherwise). A
    // consumer `style` overlays last so it can still override any hook.
    const vars: React.CSSProperties = {};
    if (color) (vars as Record<string, string>)['--aui-resize-handle-color'] = `var(--theme-${color})`;
    if (width) (vars as Record<string, string>)['--aui-resize-handle-size'] = width;
    // hoverBackground=false zeroes the hover/active wash percentage (the divider line still reveals).
    if (!hoverBackground) (vars as Record<string, string>)['--aui-resize-handle-hover-bg'] = '0%';
    const mergedStyle =
      color || width || !hoverBackground || style ? { ...vars, ...style } : undefined;
    return (
      <RrpSeparator elementRef={ref} className={composed} style={mergedStyle} {...rest} />
    );
  },
);
PanelsResizeHandle.displayName = 'Panels.ResizeHandle';

// ─── Panels.Spacer — a box-less flex-grow filler (mirrors Collapsible.Spacer / Menubar.Spacer) ───
// A structural marker (`flex:1 1 auto`, CSS in _state-cascade.scss) composed INSIDE a rail (a consumer
// flex container, e.g. a vertical View toolbar) to push following content — typically a
// `Panels.Trigger` expand button — to the far end of the flex container, replacing a consumer
// `margin: auto`. `flex:1 1 auto` grows along the parent's MAIN axis, so it fills vertically in a column
// rail and horizontally in a row rail (direction follows the parent's flow, like the precedents). NO
// `aui`, NO recipe — pure layout.
export interface PanelsSpacerProps
  extends React.ComponentPropsWithoutRef<'div'>,
    React.RefAttributes<HTMLDivElement> {}
const PanelsSpacer = createAtomicPart<PanelsSpacerProps>('div', 'aui-panels-spacer');
PanelsSpacer.displayName = 'Panels.Spacer';

// ─── Panels.Content — the FADEABLE body region (the collapse-fade target) ────────────────────────
// A styleable frame part composed as a DIRECT child of a `Panels.Panel` to wrap the panel's MAIN body —
// the region that fades OUT on collapse / IN on expand. It is the fade target the Area-D cascade keys
// on: `_state-cascade.scss` fades `.aui-panels-content` (NOT the whole `.aui-panels-panel` content
// node), so a rail affordance composed as Content's SIBLING — typically a `Panels.Trigger` in a
// collapsed 40px rail — stays OPAQUE + clickable while only the body fades. This is REQUIRED for a
// persistent rail: CSS opacity GROUPS trap every DESCENDANT of an opacity:0 node, so an in-panel
// Trigger that must stay visible cannot be nested under the faded body — it must be Content's sibling.
// A Panel with NO `Panels.Content` falls back to fading its whole content node (the legacy behaviour),
// so this part is OPT-IN. FULL-surface frame `aui` (FRAME_PART_SX_AXES): a real `.aui-frame` (color/
// paint/scale/shape/sx all live) when `aui` is set, marker-only `.aui-panels-content` otherwise.
export type PanelsContentProps = React.ComponentPropsWithoutRef<'div'> & PartStyleProps;
const PanelsContent = createAtomicPart<PanelsContentProps>('div', 'aui-panels-content', {
  styleable: true,
  sxAxes: FRAME_PART_SX_AXES,
});
PanelsContent.displayName = 'Panels.Content';

// ─── Panels.Icon — a placeable ContainedIcon part (mirrors Dropdown.Icon) ────────────────────────
// A thin wrapper over `ContainedIcon` that DEFAULTS `profile:'contained'` so an icon sits snug in
// rail/panel content. Otherwise it IS a ContainedIcon — same identity props + full box `aui` surface.
export type PanelsIconProps = ContainedIconProps;
const PanelsIcon = React.forwardRef<HTMLSpanElement, PanelsIconProps>(function PanelsIcon(
  { aui, ...rest },
  ref,
) {
  const resolvedAui = React.useMemo(() => ({ profile: 'contained' as const, ...aui }), [aui]);
  return <ContainedIcon ref={ref} {...rest} aui={resolvedAui} />;
});
PanelsIcon.displayName = 'Panels.Icon';

// ─── Flat 2-level namespace (component-namespace-convention.md) ──────────────────────────────────
interface PanelsComponent
  extends React.ForwardRefExoticComponent<PanelsProps & React.RefAttributes<HTMLDivElement>> {
  Panel: typeof PanelInner;
  Trigger: typeof PanelsTrigger;
  Content: typeof PanelsContent;
  ResizeHandle: typeof PanelsResizeHandle;
  Spacer: typeof PanelsSpacer;
  Icon: typeof PanelsIcon;
}

export const Panels = Object.assign(PanelsRoot, {
  Panel: PanelInner,
  Trigger: PanelsTrigger,
  Content: PanelsContent,
  ResizeHandle: PanelsResizeHandle,
  Spacer: PanelsSpacer,
  Icon: PanelsIcon,
}) as PanelsComponent;

export { PanelInner as Panel, PanelsTrigger, PanelsContent, PanelsResizeHandle, PanelsSpacer, PanelsIcon };
export type { PanelImperativeHandle };
export default Panels;
