// modules/design/atomic-aui/src/lib/tabs/tabs.tsx
//
// Tabs is a single-select navigation set: Root → List → Tab(+Indicator) → Panel. Base UI owns the
// value model, roving keyboard focus, ARIA, active-tab measurement (the `--active-tab-*` CSS vars),
// and panel mount/visibility. AtomicAUI owns only appearance, composition, and the public
// dot-namespace.
//
// IMPORTANT CONTRAST WITH Select/Dropdown/Menubar: Tabs never portals. There is no Popup,
// Positioner, Viewport, or identity re-stamp here; the whole tree stays in normal document flow and
// inherits the app's existing AtomicAUI cascade naturally (like Accordion).
import * as React from 'react';
import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import type { TabsRootProps as BaseTabsRootProps } from '@base-ui/react/tabs';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { useStateLayer } from '../../core/state/use-state-layer';
import { prependMarkerClassName } from '../../core/recipe/prepend-marker-class-name';
import { buildLeafClasses } from '../../core/recipe/build-leaf-classes';
import { warnIfNoAccessibleName } from '../../core/a11y/warn-if-no-accessible-name';
import { resolveAuiScale } from '../scale-cascade/use-aui-scale';
import { ContainedIcon, type ContainedIconProps } from '../icon';
import { IconButton, type IconButtonProps } from '../icon-button';
import type { PropHook } from '../../core/types';
import type { AuiElevation } from '../../core/vocabulary/recipe-vocab';
import type { TabsPaint } from './use-recipe';
import {
  TABS_ROOT_VOCAB,
  TABS_TAB_VOCAB,
  useTabsListRecipe,
  useTabsTabRecipe,
  useTabsPanelRecipe,
  useTabsIndicatorRecipe,
  useTabsContentRecipe,
} from './use-recipe';
import type {
  TabsColor,
  TabsScale,
  TabsShape,
  TabsRootAui,
  TabsListAui,
  TabsTabAui,
  TabsPanelAui,
  TabsIndicatorAui,
  TabsTabContentAui,
} from './use-recipe';

export type {
  TabsColor,
  TabsPaint,
  TabsScale,
  TabsShape,
  TabsRootAui,
  TabsListAui,
  TabsTabAui,
  TabsPanelAui,
  TabsIndicatorAui,
  TabsTabContentAui,
} from './use-recipe';

// ─── Tabs appearance cascade — color + paint + scale + shape + elevation (FINAL, user-decided) ─
// The Tabs Root is a FULL styleable `.aui-frame` (all 6 axes + sx, the Accordion.Item pattern) that
// ALWAYS renders the frame on `.aui-tabs` AND seeds these FIVE inheritable axes (`color` + `paint` +
// `scale` + `shape` + `elevation`) for every descendant part (List / Tab / Panel / Indicator) — a
// part's OWN axis always wins. The frame's `profile` DEFAULTS to `no-padding`, so an unstyled `<Tabs>`
// is `aui-tabs aui-frame aui-scale-no-padding-sm` (no padding; the no-padding cell's 6px gap is the
// default List↔Panel spacing) with NO fill (cascadeReader + paint:text). `profile` + `sx` are
// ROOT-LOCAL (they shape the wrapper cell; `sx.gap` overrides the gap) — NOT cascaded, so the List
// keeps its own `no-padding`. There is no Item-level re-seed.
//
// `paint` cascade (2026-06-21, user-directed): a Root `paint:text` flattens every part (the Tab loses
// its solid fill); `paint:solid` fills List/Panel. UNSET → seeds NO paint → each part keeps its OWN
// default (Tab=solid, List/Panel=cascadeReader text). An own-part `aui.paint` still wins.
//
// `TabsCascade` is the CASCADE-CONTEXT shape (the 5 inheritable axes only) carried on the JS context;
// the Root's PUBLIC `aui` prop is `TabsRootAui` (the FULL 6 axes + Root-local `sx`).
interface TabsCascade {
  scale?: TabsScale;
  color?: TabsColor;
  paint?: TabsPaint;
  shape?: TabsShape;
  elevation?: AuiElevation;
}
const EMPTY_TABS_CASCADE: TabsCascade = {};
const TabsAuiContext = React.createContext<TabsCascade>(EMPTY_TABS_CASCADE);
const TabsAuiProvider = TabsAuiContext.Provider;
function useTabsCascade(): TabsCascade {
  return React.useContext(TabsAuiContext);
}

/** The cascaded axes of `inherited`, as a seed object (only DEFINED axes). */
function cascadeSeed(inherited: TabsCascade): Record<string, unknown> {
  const seed: Record<string, unknown> = {};
  if (inherited.scale !== undefined) seed.scale = inherited.scale;
  if (inherited.color !== undefined) seed.color = inherited.color;
  if (inherited.paint !== undefined) seed.paint = inherited.paint;
  if (inherited.shape !== undefined) seed.shape = inherited.shape;
  if (inherited.elevation !== undefined) seed.elevation = inherited.elevation;
  return seed;
}

/** Drop UNDEFINED-valued keys so an explicit `undefined` axis (e.g. from a spread) can't CLOBBER an
 *  inherited/default value when spread last. */
function compactDefined(obj: Record<string, unknown> | undefined): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj ?? {})) if (v !== undefined) out[k] = v;
  return out;
}

/** Merge the inherited cascade UNDER a part's own `aui` (own DEFINED axis wins; every non-cascaded
 *  own axis — profile/sx — passes through untouched; an own `undefined` does NOT erase the cascade). */
function mergeCascadeAui(
  own: Record<string, unknown> | undefined,
  inherited: TabsCascade,
): Record<string, unknown> {
  return { ...cascadeSeed(inherited), ...compactDefined(own) };
}

/** PropHook: inject the inherited cascade into a part's `aui` before its recipe runs (own wins). */
const useTabsCascadeProps: PropHook<{ aui?: Record<string, unknown> }, { aui?: Record<string, unknown> }> = (
  props,
) => ({ aui: mergeCascadeAui(props.aui, useTabsCascade()) });

export interface TabsRootProps<Value = unknown>
  extends Omit<BaseTabsRootProps, 'value' | 'defaultValue' | 'onValueChange' | 'color'> {
  /** The value of the currently active Tab (controlled). */
  value?: Value;
  /** The default active Tab value (uncontrolled). */
  defaultValue?: Value;
  /** Callback invoked when the active Tab changes. */
  onValueChange?: (value: Value, eventDetails: unknown) => void;
  /** The FULL frame surface for the `.aui-tabs` wrapper (color/paint/scale/profile/shape/elevation +
   *  sx) — the Root ALWAYS renders the frame (profile defaults to `no-padding`). It ALSO seeds the
   *  cascade for every part (List / Tab / Panel / Indicator); a part's own axis always wins. The
   *  CASCADED axes are `color` + `paint` + `scale` + `shape` + `elevation`; `profile` + `sx` are
   *  ROOT-LOCAL (the wrapper cell + `sx.gap` = List↔Panel spacing), NOT cascaded. */
  aui?: TabsRootAui;
}

// ─── Tabs.Root — a full no-padding `.aui-frame` (always) + cascade seed ──────────────────────
// Root is the exported `Tabs` call signature, not a `.Root` static (mirror Accordion/Menubar). It
// takes value/defaultValue/onValueChange/orientation and a FULL `aui` (6 axes + sx). Like
// Accordion.Root, a plain generic function preserves the `Value` generic on controlled value/
// onValueChange that `forwardRef` would erase; the props object still carries `ref` through.
//
// The Root ALWAYS renders the full `.aui-frame` (NO bare-marker shortcut — the `no-padding` profile
// default must ALWAYS apply): `buildLeafClasses(TABS_ROOT_VOCAB, aui)` stamps the marker + frame +
// color/paint/scale/profile/shape/elevation + sx on `.aui-tabs`. So an unstyled `<Tabs>` →
// `aui-tabs aui-frame aui-scale-no-padding-sm`: NO padding, NO fill (cascadeReader + paint:text), and
// the `no-padding` cell's `--aui-gap` (6px at sm) IS the default List↔Panel gap (the intended
// default). `cascadeSeed` seeds the 5 inheritable axes to the parts (own-part-wins; `profile` + `sx`
// are Root-local, NOT cascaded → the List keeps its own `no-padding`). `prependMarkerClassName` merges
// the consumer `className` LAST so it still wins.
function TabsRoot<Value = unknown>(props: TabsRootProps<Value>): React.JSX.Element {
  const { className, orientation, aui, children, ...rest } = props;

  const resolvedOrientation = orientation ?? 'horizontal';

  // ALWAYS stamp the full frame (marker + frame + color/paint/scale/profile/shape/elevation + sx) so
  // the `no-padding` profile default ALWAYS applies — including an unstyled `<Tabs>` (user-decided,
  // FINAL: NO bare-marker shortcut). `buildLeafClasses(vocab, undefined)` emits the vocab defaults →
  // `aui-tabs aui-frame aui-scale-no-padding-sm` (no fill via cascadeReader + paint:text; the
  // no-padding cell's 6px gap is the default List↔Panel spacing).
  const rootClasses = buildLeafClasses(TABS_ROOT_VOCAB, aui as Parameters<typeof buildLeafClasses>[1]);

  // Cascade seed = the RESOLVED 5 inheritable axes from the Root's own `aui` (`cascadeSeed` copies
  // color/paint/scale/shape/elevation; `profile` + `sx` are Root-local, NOT cascaded). UNSET → empty.
  const cascade = React.useMemo<TabsCascade>(
    () => (aui ? (cascadeSeed(aui as TabsCascade) as TabsCascade) : EMPTY_TABS_CASCADE),
    [aui],
  );

  return React.createElement(
    TabsPrimitive.Root,
    {
      ...rest,
      // Base UI's TabsRoot emits `data-orientation` itself (getStateAttributesProps maps the truthy
      // `orientation` state string; tabsStateAttributesMapping only custom-maps activationDirection),
      // so we pass `orientation` and let the primitive stamp the attr — no manual `data-orientation`.
      orientation: resolvedOrientation,
      className: prependMarkerClassName(rootClasses, className),
    } as object,
    React.createElement(TabsAuiProvider, { value: cascade }, children),
  );
}
TabsRoot.displayName = 'Tabs';

// ─── Tabs.List — the stateless tab rail ──────────────────────────────────────
// A real Base UI part and a real `.aui-frame`, but NOT interactive (roving focus lives on the tabs).
// Do NOT add useStateLayer here. The cascade props inject the Root cascade before the recipe runs.
const _TabsList = createAtomicComponent(TabsPrimitive.List, {
  extensions: [useTabsCascadeProps, useTabsListRecipe],
});

/** Overflow strategy for the tab rail. `'visible'` (default) lets tabs keep their natural width.
 *  `'shrink'` = the Chrome-style pure compaction (tabs flex-shrink to a floor, label ellipsis, no
 *  scrollbar). Enum (not boolean) so a future `'scroll'` mode can slot in. */
export type TabsListOverflow = 'visible' | 'shrink';

export interface TabsListProps
  extends Omit<React.ComponentProps<typeof TabsPrimitive.List>, 'color'> {
  /** Unified customisation object for the tab rail surface. */
  aui?: TabsListAui;
  /** Overflow strategy. `'visible'` (default) = natural widths; `'shrink'` = Chrome compaction
   *  (tabs shrink to a floor + label ellipsis, NO scrollbar). Pure CSS — stamped as
   *  `data-overflow="shrink"`; the raw prop never reaches the DOM. */
  overflow?: TabsListOverflow;
  /** Reverse the order of the tabs in the rail. Reorders the RENDERED CHILDREN in the DOM (NOT a CSS
   *  `*-reverse` flip), so visual order, DOM order, and Base UI's roving keyboard arrow-key focus all
   *  AGREE — a11y-safe. (A CSS `flex-direction: row-reverse` would flip only the visual order while
   *  Base UI's roving focus still followed DOM order → ArrowRight would move focus visually LEFT.) The
   *  raw prop never reaches the DOM. Default `false`. */
  reverse?: boolean;
  /** Make the tabs drag-to-reorder (dnd-kit). When `true`, ONLY the `Tabs.Tab` children become
   *  sortable (every OTHER List child — a composed `Tabs.Indicator`, etc. — stays put in its original
   *  slot, mirroring `reverse`), wrapped in a `DndContext` + `SortableContext` keyed by each Tab's
   *  `value`. The drag animation rides @dnd-kit/utilities `CSS.Transform`. Selection stays value-keyed
   *  (Base UI selects by `value`, NOT DOM position) so dragging never changes the active tab. Keyboard
   *  reorder is supported (dnd-kit KeyboardSensor). The raw prop NEVER reaches the DOM. Default
   *  `false` → zero behavior change. */
  reorderable?: boolean;
  /** Fired after a drag-reorder settles. `fromIndex`/`toIndex` are positions AMONG THE `Tabs.Tab`
   *  CHILDREN ONLY (0-based, ignoring non-tab List children). Only fires when `reorderable` is set and
   *  the position actually changed. */
  onReorder?: (fromIndex: number, toIndex: number) => void;
}

/** Reverse ONLY the `Tabs.Tab` children, in their original slots — every OTHER List child (a composed
 *  `Tabs.Indicator`, etc.) stays exactly where it was. Reversing ALL children (the naive
 *  `toArray().reverse()`) dragged the Indicator/other parts along with the tabs (the
 *  indicator-ends-up-behind-a-tab bug). `React.Children.toArray` assigns stable keys, so a
 *  consumer-keyed list does not remount-thrash; Base UI's selection keys off the Tab `value` (NOT DOM
 *  position), so reordering leaves the active tab intact. */
function reverseTabsOnlyChildren(children: React.ReactNode): React.ReactNode {
  const arr = React.Children.toArray(children);
  const tabSlots = tabSlotIndices(arr);
  if (tabSlots.length < 2) return children;
  const reversedTabs = tabSlots.map((i) => arr[i]).reverse();
  const out = arr.slice();
  tabSlots.forEach((slot, k) => {
    out[slot] = reversedTabs[k];
  });
  return out;
}

// ─── reorderable (dnd-kit) helpers ───────────────────────────────────────────
// `reorderable` reuses the SAME slot-preserving philosophy as `reverse`: ONLY the `Tabs.Tab` children
// participate (other List children like a composed `Tabs.Indicator` keep their original slots), and a
// reorder reorders the RENDERED CHILDREN in the DOM (never a CSS flip), so visual + DOM + roving-focus
// order all agree. Base UI's selection keys off the Tab `value` (NOT DOM position), so a drag never
// changes the active tab.

/** A resolved tab slot: the INNER `Tabs.Tab` element plus a `rebuild` that re-seats a (possibly
 *  re-cloned) tab back where it came from. For a DIRECT `Tabs.Tab` child, `tab` IS the child and
 *  `rebuild` is the identity. For a SINGLE per-tab WRAPPER (a `ContextMenu`, a `Tooltip`, …) whose
 *  `children` contain EXACTLY ONE `Tabs.Tab` (the painted/draggable node — the wrapper itself renders no
 *  DOM, e.g. Base UI `ContextMenu.Root` whose children are `[Tab-as-Trigger, Portal]`), `tab` is that
 *  inner Tab and `rebuild` clones the wrapper with the new tab swapped into its children (siblings — a
 *  Portal stand-in — preserved). A non-tab child, or a wrapper with 0 or >1 nested Tabs, resolves to
 *  `null` (left untouched — never guessed at). This is what makes the reorderable Tabs WRAPPER-AWARE:
 *  the consumer may wrap each `Tabs.Tab` in one pass-through element and dragging still works. */
function resolveTabElement(
  child: React.ReactNode,
): { tab: React.ReactElement; rebuild: (newTab: React.ReactNode) => React.ReactNode } | null {
  if (!React.isValidElement(child)) return null;
  if (child.type === TabsTab) {
    return { tab: child, rebuild: (newTab) => newTab };
  }
  // A single-level wrapper: search its direct children for EXACTLY ONE `Tabs.Tab`. One level is enough
  // for the ContextMenu case (children are `[Tab, Portal]`). Walk with `React.Children.forEach` (NOT
  // `toArray`, which re-keys + COPIES the elements — breaking reference identity needed by `rebuild`):
  // `inner` holds the ORIGINAL element instance, so `rebuild`'s `c === tab` swap actually hits.
  const wrapperChildren = (child.props as { children?: React.ReactNode }).children;
  let tab: React.ReactElement | null = null;
  let count = 0;
  React.Children.forEach(wrapperChildren, (c) => {
    if (React.isValidElement(c) && c.type === TabsTab) {
      tab = c;
      count += 1;
    }
  });
  if (count !== 1 || tab === null) return null;
  const innerTab: React.ReactElement = tab;
  return {
    tab: innerTab,
    rebuild: (newTab) =>
      React.cloneElement(
        child,
        undefined,
        React.Children.map(wrapperChildren, (c) => (c === innerTab ? newTab : c)),
      ),
  };
}

/** The slot indices (into the full child array) that hold a tab — directly OR inside a single per-tab
 *  wrapper. Shared by `reverse` + the reorder path so both reason about the same "tab-only" slots. */
function tabSlotIndices(arr: React.ReactNode[]): number[] {
  return arr.reduce<number[]>((acc, child, i) => {
    if (resolveTabElement(child) !== null) acc.push(i);
    return acc;
  }, []);
}

/** A Tab's sortable KEY = its `value` (stringified). Mirrors Base UI keying selection off `value`, so
 *  the sortable id and the selection id are the same handle. Accepts a List child (a direct `Tabs.Tab`
 *  OR a single per-tab wrapper) and reads the value off the resolved INNER tab. */
function tabSortKey(child: React.ReactNode): string {
  const resolved = resolveTabElement(child);
  const tab = resolved ? resolved.tab : (child as React.ReactElement);
  const value = (tab.props as { value?: unknown }).value;
  return String(value);
}

// dnd-kit's `useSortable` returns DOM-typed `listeners`/`attributes`/`setNodeRef`. The library
// tsconfig compiles WITHOUT lib.dom (es2022 only), so we spread those through narrow `object` casts —
// never naming the DOM event-handler types — the same convention the rest of this file uses for DOM.
type SortableSpreadable = Record<string, unknown>;

// `SortableTab` — wraps ONE List child (a direct `Tabs.Tab` OR a single per-tab wrapper such as a
// `ContextMenu`) so the inner tab is drag-sortable. It is the IN-PLACE item that stays in the flex row:
// the inner tab gets the sortable ref/listeners/attributes and the `CSS.Transform`/`transition` so the
// SURROUNDING tabs slide to make room. The DRAGGED tab itself is NOT transformed-in-place anymore —
// while it is the active drag it becomes a dimmed PLACEHOLDER (its real visual is the portaled
// `DragOverlay` clone at the tab's measured rect; see `ReorderableTabs`), so it never shrinks over a
// smaller slot nor stretches over the wider selected slot (the `overflow="shrink"` flex distortion the
// old transform-in-place suffered). Reduced opacity (not `display:none`/removal) keeps the row layout
// from jumping. CRITICALLY, when NOT dragging the style is the tab's OWN style verbatim PLUS dnd-kit's
// transform/transition — but we never leave a stale transform/width on the node:
// `CSS.Transform.toString(transform)` returns `undefined` for a null transform (idle/after-drop) and
// `transition` is undefined when settled, so the cloned style carries no inline transform/width once a
// drag ends (this fixes the post-drop "selected tab broken" symptom). It does NOT alter the tab's
// `value` (selection stays value-keyed). `id` = the tab's sort key (value). The dnd ref/listeners land
// on the INNER tab's painted node — through the wrapper (which renders no DOM) — while the wrapper keeps
// providing its own affordance (e.g. ContextMenu right-click). For a direct Tab, the rebuild is the
// identity, so behavior is byte-identical to a non-wrapped list.
function SortableTab({ id, child }: { id: string; child: React.ReactNode }): React.JSX.Element {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isSorting } =
    useSortable({ id });
  // Resolve the inner tab; a non-tab child can never reach here (tabSlotIndices gates membership), but
  // fall back to treating `child` AS the tab so the types stay total.
  const resolved = resolveTabElement(child);
  const tab = resolved ? resolved.tab : (child as React.ReactElement);
  const rebuild = resolved ? resolved.rebuild : (t: React.ReactNode) => t;
  const tabProps = tab.props as {
    style?: Record<string, unknown>;
    onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  };
  // The dragged tab is rendered as the DragOverlay clone, so here the source is fully HIDDEN
  // (opacity:0) — only the overlay clone is visible (no double-image). It still occupies its layout box
  // (NOT display:none/removal), so the row doesn't collapse/jump while the OTHER non-dragged tabs take
  // the transform/transition to slide out of the way. `CSS.Transform.toString(transform)` is
  // `undefined` when transform is null (idle/settled) → no stale inline transform survives drop.
  const style: Record<string, unknown> = {
    ...(tabProps.style ?? {}),
    transform: isDragging ? undefined : CSS.Transform.toString(transform),
    transition: isDragging ? undefined : transition,
    ...(isDragging ? { opacity: 0 } : {}),
  };
  // dnd-kit's `attributes` default `role: 'button'` would CLOBBER Base UI's `role="tab"` (which the
  // tablist + roving-focus a11y model depends on). Strip `role` so Base UI keeps the tab semantics —
  // dnd-kit's `aria-roledescription="sortable"` + `tabindex` still announce the drag affordance.
  const { role: _droppedRole, ...attrsNoRole } = attributes as unknown as SortableSpreadable & {
    role?: unknown;
  };
  void _droppedRole;
  // ── Selection-steal guard DURING a drag (the drop key-press) ─────────────────────────────────────
  // The bug: keyboard-reordering the SELECTED tab loses its selection. dnd-kit's KeyboardSensor, on the
  // ArrowKey step, moves DOM focus to the NEIGHBOR tab (the drop target) — so when the user presses Space
  // to DROP, that Space `keydown` lands on the now-focused NEIGHBOR. Base UI's Tab is a button: its
  // `useButton.onKeyDown` turns a Space/Enter on a non-native button into a synthetic `click()`
  // (use-button/useButton.js:113-125 + 119) → `onTabActivation` → the controlled `onValueChange` → the
  // neighbor becomes selected, stealing selection from the dragged tab (and the focusin alone does NOT
  // do it — `activateOnFocus` defaults false here; the OBSERVED culprit is the drop key-press, verified
  // live on ADC). useButton runs the EXTERNAL onKeyDown first and bails if `baseUIHandlerPrevented`
  // (useButton.js:99-103), so while ANY drag is in progress (`isSorting` — true on every sortable item,
  // not just the dragged one) we call `preventBaseUIHandler()` on a Space/Enter keydown to suppress the
  // synthetic click → no spurious activation. This is scoped to the drag window only: when NOT sorting we
  // never prevent, so ordinary keyboard tab nav + click-to-select + Space/Enter activation are UNCHANGED.
  // dnd-kit's own activator lives in `listeners.onKeyDown` (it only STARTS a drag, when isSorting is
  // false), so we run it FIRST and the per-tab consumer onKeyDown after — never dropping either.
  const dndListeners = listeners as SortableSpreadable & {
    onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  };
  const { onKeyDown: dndOnKeyDown, ...listenersNoKeyDown } = dndListeners;
  const consumerOnKeyDown = tabProps.onKeyDown;
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (isSorting && (event.key === ' ' || event.key === 'Enter')) {
      (event as { preventBaseUIHandler?: () => void }).preventBaseUIHandler?.();
    }
    dndOnKeyDown?.(event);
    consumerOnKeyDown?.(event);
  };
  const draggableTab = React.cloneElement(tab, {
    ref: setNodeRef,
    style,
    onKeyDown: handleKeyDown,
    ...(attrsNoRole as SortableSpreadable),
    ...(listenersNoKeyDown as SortableSpreadable),
  } as object);
  // Re-seat the now-draggable inner tab inside its wrapper (identity for a direct Tab) so the wrapper
  // (ContextMenu, …) keeps providing its affordance while the dnd ref/listeners ride the inner Tab.
  return <>{rebuild(draggableTab)}</>;
}

// `ReorderableTabs` — wraps the `Tabs.Tab` children of a List in a DndContext + SortableContext, keyed
// by each tab's `value`. Non-tab children (Indicator, etc.) render in their ORIGINAL slots untouched.
// On dragEnd it computes from/to AMONG THE TABS ONLY, reorders the rendered children, and calls
// `onReorder(from, to)`. Uses a PointerSensor (drag) + a KeyboardSensor (a11y reorder).
function ReorderableTabs({
  children,
  onReorder,
}: {
  children: React.ReactNode;
  onReorder?: (fromIndex: number, toIndex: number) => void;
}): React.JSX.Element {
  // Local override of the tab order so the reorder renders immediately even when the consumer does not
  // re-key/reorder the children themselves. Tracked as the array of tab sort-keys (values).
  const arr = React.Children.toArray(children);
  const tabSlots = tabSlotIndices(arr);
  const baseKeys = tabSlots.map((i) => tabSortKey(arr[i]));

  const [order, setOrder] = React.useState<string[]>(baseKeys);
  // The sort-key of the tab currently being dragged, captured on dragStart so we can render its clone
  // in the DragOverlay (a fixed-position, full-size copy decoupled from the flex row). `null` = no
  // active drag (the overlay renders nothing). Cleared on dragEnd AND dragCancel so no stale overlay
  // and no stale placeholder survive.
  const [activeKey, setActiveKey] = React.useState<string | null>(null);
  // Re-sync to the incoming children whenever their identity set changes (add/remove a tab, or a
  // controlled reorder from the consumer). Compare as a stable joined key so a pure re-render is inert.
  const baseKey = baseKeys.join(' ');
  React.useEffect(() => {
    // Adopt the consumer's order whenever the consumer hands back a NEW one — membership change OR a pure
    // PERMUTATION. The effect is gated on `baseKey` (the consumer's joined child order), so a local drag —
    // which updates `order` but NOT the consumer's children — never fires this and is never clobbered. But
    // once the consumer commits the reorder (or a controlled refetch returns a new order) we re-sync to it.
    // CRITICAL for a POSITIONAL-KEY consumer (tab values that re-index by slot, e.g. ADC's
    // `backend-design-<index>`): after a move the key-SET is unchanged but the ORDER changed, so a
    // sorted-SET compare would wrongly hold the stale drag permutation and desync the rendered order from
    // the data (selection lands on a neighbor until refresh). Comparing the ORDERED join adopts the new
    // order. A no-op when `order` already equals `baseKeys` (the optimistic phase, where they match).
    if (order.join(' ') !== baseKeys.join(' ')) setOrder(baseKeys);
    // Keyed on the joined `baseKey` only: a local drag (which doesn't change baseKey) must not re-trigger.
  }, [baseKey]);

  const sensors = useSensors(
    // A drag-distance ACTIVATION CONSTRAINT: the drag only starts after the pointer moves ≥4px, so a
    // plain pointerdown+up (a CLICK with no movement) is NOT captured by dnd-kit and falls through to
    // Base UI's tab selection. Without it the PointerSensor grabs every pointerdown and clicking a tab
    // never selects it.
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  // Build the rendered children: tab SLOTS placed in their original slots in `order`'s sequence, each
  // wrapped in a SortableTab; non-tab children untouched. `tabByKey` stores the full List CHILD (a
  // direct `Tabs.Tab` OR its per-tab wrapper) so SortableTab can resolve + rebuild through the wrapper.
  const effectiveOrder = order.length === baseKeys.length ? order : baseKeys;
  const childByKey = new Map<string, React.ReactNode>();
  tabSlots.forEach((i) => {
    childByKey.set(tabSortKey(arr[i]), arr[i]);
  });
  const orderedChildren = effectiveOrder
    .map((k) => childByKey.get(k))
    .filter((c): c is React.ReactNode => c !== undefined);
  const rendered = arr.slice();
  tabSlots.forEach((slot, k) => {
    const child = orderedChildren[k];
    const key = child !== undefined ? tabSortKey(child) : undefined;
    rendered[slot] =
      child !== undefined && key !== undefined ? (
        <SortableTab key={key} id={key} child={child} />
      ) : (
        rendered[slot]
      );
  });

  const handleDragStart = React.useCallback((event: DragStartEvent) => {
    setActiveKey(String(event.active.id));
  }, []);

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      // Clear the active drag FIRST so the overlay unmounts and the placeholder un-dims regardless of
      // whether the position changed (prevents a stranded overlay / dimmed tab after a no-op drop).
      setActiveKey(null);
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      // Compute the reorder from the CURRENT order, apply it as a PURE value, then fire the
      // `onReorder` side effect EXACTLY ONCE — never inside a setState updater. React StrictMode
      // double-invokes updaters to surface impurity, so a side effect (here `onReorder`, which
      // fires the consumer's move mutation) placed inside one runs TWICE in dev → a duplicate
      // reorder PATCH whose second call re-moves and scrambles the order. The updater stays pure.
      const from = order.indexOf(String(active.id));
      const to = order.indexOf(String(over.id));
      if (from === -1 || to === -1 || from === to) return;
      const next = order.slice();
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      setOrder(next);
      onReorder?.(from, to);
    },
    [order, onReorder],
  );

  // dragCancel (Escape, or a constraint abort) must ALSO clear the active drag so the overlay unmounts
  // and the placeholder un-dims — otherwise a cancelled drag leaves a stranded overlay + a permanently
  // dimmed tab. No reorder on cancel.
  const handleDragCancel = React.useCallback(() => {
    setActiveKey(null);
  }, []);

  // The dragged tab's element, for the DragOverlay clone. Rendered WITHOUT the sortable wiring (it is a
  // fixed-position visual copy positioned over the source rect by DragOverlay) — a plain `Tabs.Tab` so
  // it keeps its full natural look at its own measured size (no flex shrink/stretch). It is NOT
  // selectable/interactive while floating; `tabIndex:-1` + a `data-` marker keep it inert and styleable.
  // Clone the INNER tab (resolved through any per-tab wrapper), NOT the wrapper itself — the floating
  // clone must be a plain Tab, never a detached ContextMenu.Trigger.
  const activeChild = activeKey != null ? childByKey.get(activeKey) : undefined;
  const activeTab = activeChild !== undefined ? resolveTabElement(activeChild)?.tab : undefined;
  const overlayTab = activeTab
    ? React.cloneElement(activeTab, {
        tabIndex: -1,
        'data-tabs-drag-overlay': '',
        // FILL the DragOverlay wrapper — dnd-kit sizes that wrapper to the dragged tab's measured rect, so
        // filling it keeps the clone at the ORIGINAL dragged size. Without this the tab's flex-sizing
        // classes (e.g. `flex: 1 1 160px`) are inert outside the flex row, and the clone would shrink to
        // its content width (or stretch over a wider/selected slot).
        style: {
          ...((activeTab.props as { style?: Record<string, unknown> }).style ?? {}),
          inlineSize: '100%',
          blockSize: '100%',
        },
        // REPLACE the consumer's `render` (e.g. a per-tab `ContextMenu.Trigger`) with a plain <div>: the
        // overlay is portaled OUTSIDE any per-tab wrapper's context provider (e.g. `ContextMenu.Root`), so
        // a context-dependent render element throws here ("ContextMenuRootContext is missing" → blank page
        // on drag). A plain <div> is the correct self-contained, NON-interactive visual clone — and a
        // non-<button> (the Tab uses `nativeButton={false}` here), so the contained close <button> doesn't
        // nest button-in-button. The Tab's classes/content/data-attrs still merge onto this <div>.
        render: React.createElement('div'),
      } as object)
    : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={effectiveOrder} strategy={horizontalListSortingStrategy}>
        {rendered}
      </SortableContext>
      {/* The portaled, fixed-size clone of the dragged tab — decoupled from the flex row so it keeps its
          OWN measured width (no shrink over a smaller slot, no stretch over the wider selected slot).
          DragOverlay measures the active draggable node and positions/sizes the clone over it. */}
      <DragOverlay>{overlayTab}</DragOverlay>
    </DndContext>
  );
}

// `overflow` is STRIPPED before the DOM spread (like `aui`) and re-emitted as a `data-overflow`
// modifier attr the SCSS keys off of — never leak the raw prop to the element. `overflow:'visible'`
// is the default → NO attr (the unmodified rail).
//
// `reverse` is ALSO stripped, but it is NOT a CSS flip: when true ONLY the `Tabs.Tab` CHILDREN are
// reordered in the DOM (via `reverseTabsOnlyChildren` — other List children like a composed
// `Tabs.Indicator` stay put), so visual + DOM + roving-focus order all agree (a11y-safe — the keyboard
// arrow order matches the visual order). Base UI's selection keys off the Tab `value` (NOT DOM
// position), so reversing the tab order leaves the active tab intact.
const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { overflow, reverse, reorderable, onReorder, children, ...rest },
  ref,
) {
  const dataAttrs: Record<string, string> = {};
  if (overflow === 'shrink') dataAttrs['data-overflow'] = 'shrink';
  // `reverse` reorders the tab children FIRST (pure slot-preserving reverse); `reorderable` then wraps
  // those (already-ordered) children in the dnd-kit sortable context. Both strip before the DOM spread.
  const reversedChildren = reverse ? reverseTabsOnlyChildren(children) : children;
  const resolvedChildren = reorderable ? (
    <ReorderableTabs onReorder={onReorder}>{reversedChildren}</ReorderableTabs>
  ) : (
    reversedChildren
  );
  return React.createElement(
    _TabsList as React.ElementType,
    { ref, ...dataAttrs, ...rest },
    resolvedChildren,
  );
});
TabsList.displayName = 'Tabs.List';

// ─── Tabs.Icon — the leading Tab adornment (a ContainedIcon, contained profile) ────
// A thin wrapper over `ContainedIcon` that DEFAULTS `profile: 'contained'` so the in-row icon sits
// SNUG (the 2026-06-17 placeable-icon convention; IDENTICAL to Menubar.Icon — the proven sibling). It
// sizes to its EFFECTIVE tier read off the Tabs cascade: own `aui.scale` ?? the cascade scale ?? the
// Tab vocab default (READ the vocab default, NOT a literal — G15). Compose it inside a Tabs.Tab.
//
// The icon inherits the parent Tab's CONTENT color via `currentColor` — it does NOT re-resolve the
// cascaded color ROLE. Spreading the cascaded color here (the old `cascadeSeed(inherited)`) painted
// the glyph the chroma's CONTENT color: on a `paint:solid color:primary` chip that content color is
// the on-primary white at the box level, but a re-resolved `color:primary paint:text` glyph paints
// the PRIMARY content (orange) — orange-on-orange, invisible (the 2026-06-21 solid-tab icon bug). By
// inheriting `currentColor` the glyph is white on a solid primary chip, primary on a flat/text tab.
// Scale still cascades (separate from color); a consumer's own `aui.color` still wins.
export type TabsIconProps = ContainedIconProps;
const TabsIcon = React.forwardRef<HTMLSpanElement, TabsIconProps>(
  function TabsIcon({ aui, ...rest }, ref) {
    const inherited = useTabsCascade();
    const resolvedScale = resolveAuiScale(
      aui?.scale,
      inherited.scale,
      TABS_TAB_VOCAB.defaults.scale as TabsScale,
    );
    // `profile: 'contained'` is the only DEFAULT; the resolved tier sizes it to the row. NO cascade
    // color spread — the glyph inherits the parent Tab's content color (currentColor). Own `aui` wins.
    const resolvedAui = React.useMemo(
      () => ({ profile: 'contained' as const, ...aui, scale: resolvedScale }),
      [aui, resolvedScale],
    );
    return <ContainedIcon ref={ref} {...rest} aui={resolvedAui} />;
  },
);
TabsIcon.displayName = 'Tabs.Icon';

// ─── Tabs.CloseButton / Tabs.AddButton — thin cascade-reading IconButton wrappers ────────────
// Both are THIN wrappers over the shipped `IconButton` (mirroring `Menubar.IconButton`,
// menubar.tsx:407-438) that FOLLOW THE FULL TABS CASCADE FIRST, then let a consumer override
// per-axis — so ADC needs NO props. Each reads `useTabsCascade()` and resolves EVERY inheritable
// axis the other Tabs parts inherit (color + paint + scale + shape + elevation), precedence
// **own `aui` ?? Tabs cascade ?? IconButton default** (`ICON_BUTTON_DEFAULTS`). It REUSES the same
// `cascadeSeed`/`compactDefined` helpers the rest of Tabs uses (do NOT re-invent the merge):
//   resolvedAui = { ...cascadeSeed(useTabsCascade()), ...compactDefined(own),
//                   profile: own?.profile ?? 'contained',
//                   scale: resolveAuiScale(own?.scale, inherited.scale, TABS_TAB_VOCAB.defaults.scale) }
// then `<IconButton aui={resolvedAui}>` fills any STILL-unset axis from `ICON_BUTTON_DEFAULTS`.
// Result: Tabs Root unset → IconButton's solid `surface-alt` chip; `<Tabs aui={{color,scale}}>`
// flows to the buttons automatically; a per-button `aui` still wins. `profile` defaults to
// `'contained'` (the in-row snug profile, like Tabs.Icon); `profile`/`sx` are NOT cascaded
// (Root-local) — matching the Tabs contract. Each carries a marker (`flex-shrink:0`, CSS in
// `_state-cascade.scss`) so it is robust ANYWHERE it is composed (leading/trailing within a Tab,
// or as a List sibling). `prependMarkerClassName` puts the marker FIRST so a consumer className
// still wins last. The accessible name (`aria-label`/`aria-labelledby`) is enforced by IconButton's
// own type-level `AccessibleName` union — required, forwarded verbatim. NOT borderless, no
// currentColor: the buttons are real filled IconButton chips.

type TabsActionAui = NonNullable<IconButtonProps['aui']>;
/** Part-specific defaults for a Tabs-action button — applied ONLY where neither the consumer's own
 *  `aui` nor the Tabs cascade set the axis. */
interface TabsActionDefaults {
  /** Root-local profile default (NOT cascaded): CloseButton = 'contained', AddButton = 'square'. */
  profile?: TabsActionAui['profile'];
  /** Paint fallback under the cascade: CloseButton = 'text' (borderless ×); AddButton unset (IconButton solid). */
  paint?: TabsActionAui['paint'];
}

/** Resolve a Tabs-action button's `aui` against the full Tabs cascade (own ?? cascade ?? part default
 *  ?? IconButton default). Shared by CloseButton + AddButton — the ONE merge for both. */
function useTabsActionButtonAui(
  own: IconButtonProps['aui'],
  defaults?: TabsActionDefaults,
): IconButtonProps['aui'] {
  const inherited = useTabsCascade();
  // READ the vocab default (G15) — never a literal — for the scale fallback.
  const resolvedScale = resolveAuiScale(
    own?.scale,
    inherited.scale,
    TABS_TAB_VOCAB.defaults.scale as TabsScale,
  );
  return React.useMemo<IconButtonProps['aui']>(
    () => {
      const merged = {
        // FULL cascade seed (color + paint + scale + shape + elevation) UNDER the own `aui` (own
        // DEFINED axis wins; an own `undefined` does NOT erase the cascade — `compactDefined`).
        ...cascadeSeed(inherited),
        ...compactDefined(own as Record<string, unknown> | undefined),
        // profile is Root-LOCAL (not cascaded): own ?? the part default (CloseButton 'contained',
        // AddButton 'square'); the ultimate fallback stays the in-row snug 'contained'.
        profile: own?.profile ?? defaults?.profile ?? 'contained',
        // scale resolved off the cascade tier (own ?? inherited ?? vocab default).
        scale: resolvedScale,
      } as Record<string, unknown>;
      // Paint fallback applies ONLY when neither own nor the cascade set it (so a Tabs-root `paint`
      // still cascades over it; a per-button `aui.paint` still wins).
      if (defaults?.paint !== undefined && merged.paint === undefined) merged.paint = defaults.paint;
      return merged as IconButtonProps['aui'];
    },
    [inherited, own, resolvedScale, defaults?.profile, defaults?.paint],
  );
}

// Minimal structural DOM shapes — the library `tsconfig` compiles WITHOUT `lib.dom` (es2022 only), so
// DOM APIs are reached through narrow casts (the `view.tsx` convention), never the global lib types.
interface AncestorReadableEl {
  getAttribute(name: string): string | null;
  hasAttribute(name: string): boolean;
}
interface ClosestCapable {
  closest(selectors: string): AncestorReadableEl | null;
}

/** Track whether the CloseButton's nearest ancestor tab is the ACTIVE tab, so the × roves WITH the tab
 *  in the keyboard Tab sequence: only the active tab's close is a Tab stop (tabindex 0); inactive tabs'
 *  closes are removed from the sequence (tabindex -1), so Tab goes tab → its close → out, and Arrow keys
 *  move between tabs (the roving pattern) — instead of Tab visiting every inactive tab's close. Reads
 *  Base UI's `aria-selected`/`data-active` on the ancestor `[role="tab"]`. A selection change re-renders
 *  the whole Tabs subtree (incl. this close) AND React commits the tab's new attribute BEFORE effects
 *  run, so re-reading after each commit stays in sync without a DOM observer. NO ancestor tab (CloseButton
 *  composed outside a tab) ⇒ treated ACTIVE (normally focusable). */
function useNearestTabActive(ref: React.RefObject<HTMLElement | null>): boolean {
  const [active, setActive] = React.useState(true);
  React.useEffect(() => {
    const node = ref.current as unknown as ClosestCapable | null;
    const tab = node?.closest('[role="tab"]') ?? null;
    const next = tab
      ? tab.getAttribute('aria-selected') === 'true' ||
        tab.hasAttribute('data-active') ||
        tab.hasAttribute('data-selected')
      : true;
    setActive((prev) => (prev === next ? prev : next));
  });
  return active;
}

export type TabsCloseButtonProps = Omit<IconButtonProps, 'name'> & {
  /** The close glyph. Defaults to `'xmark'`. */
  name?: string;
};

// `Tabs.CloseButton` — the per-tab close affordance (× inline). Placed LEADING or TRAILING within a
// `Tabs.Tab` (consumer-composed; the DS forces no position). Default `name:'xmark'`. Requires an
// accessible name (IconButton's type enforces `aria-label`/`aria-labelledby`).
const TabsCloseButton = React.forwardRef<HTMLButtonElement, TabsCloseButtonProps>(
  function TabsCloseButton(
    { aui, name = 'xmark', className, tabIndex, onPointerDown, onClick, onFocus, ...rest },
    ref,
  ) {
    // CloseButton defaults: profile 'contained' (in-row snug ×) + paint 'text' (borderless — no chip).
    const resolvedAui = useTabsActionButtonAui(aui, { profile: 'contained', paint: 'text' });
    // The × roves with its tab: only the active tab's close is a Tab stop (tabindex 0); inactive ones
    // drop out of the sequence (-1). Needs the rendered node to read the ancestor [role=tab] state, so
    // merge a local ref with the forwarded one.
    const innerRef = React.useRef<HTMLButtonElement | null>(null);
    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        innerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      },
      [ref],
    );
    const tabActive = useNearestTabActive(innerRef);
    // Clicking the × must NOT select/activate its tab — a DS DEFAULT, so a consumer never needs a
    // manual stopPropagation. Base UI's Tab activates on THREE handlers bound to the ancestor tab
    // <button> (TabsTab.js: onClick L117, onPointerDown L146 priming, and — the real culprit — onFocus
    // L125 which, with `activateOnFocus` defaulting true, calls onTabActivation when focus lands inside
    // the tab). React's onClick/onPointerDown stopPropagation alone does NOT stop selection because
    // clicking the × moves DOM focus to it, firing a `focusin` that BUBBLES to the tab's React onFocus →
    // the tab activates. So we ALSO stop the focus (onFocus). We stop all three: pointerDown (priming),
    // click (the bubble path / testing-library fireEvent.click), and focus (the focusin bubble that was
    // actually selecting the tab). The button still fires its OWN handlers for the consumer's close
    // handler (stopPropagation halts BUBBLING to the tab, not the button's own handlers).
    const handlePointerDown = React.useCallback<NonNullable<IconButtonProps['onPointerDown']>>(
      (event) => {
        event.stopPropagation();
        onPointerDown?.(event);
      },
      [onPointerDown],
    );
    const handleClick = React.useCallback<NonNullable<IconButtonProps['onClick']>>(
      (event) => {
        event.stopPropagation();
        onClick?.(event);
      },
      [onClick],
    );
    const handleFocus = React.useCallback<NonNullable<IconButtonProps['onFocus']>>(
      (event) => {
        event.stopPropagation();
        onFocus?.(event);
      },
      [onFocus],
    );
    return (
      <IconButton
        ref={setRefs}
        {...(rest as IconButtonProps)}
        name={name}
        aui={resolvedAui}
        onPointerDown={handlePointerDown}
        onClick={handleClick}
        onFocus={handleFocus}
        // Consumer-set tabIndex wins; otherwise rove with the tab.
        tabIndex={tabIndex ?? (tabActive ? 0 : -1)}
        className={
          prependMarkerClassName('aui-tabs-close-button', className) as string | undefined
        }
      />
    );
  },
);
TabsCloseButton.displayName = 'Tabs.CloseButton';

export type TabsPinButtonProps = Omit<IconButtonProps, 'name'> & {
  /** The pin glyph. Defaults to `'thumbtack'` (FontAwesome's pin/thumbtack — the same FA-name
   *  convention as CloseButton's `'xmark'` / AddButton's `'plus'`). */
  name?: string;
};

// `Tabs.PinButton` — the per-tab pin affordance (a ONE-SHOT "move this tab to the front" action,
// NOT a stateful pinned toggle: there is no pressed / aria-pressed state — the parent's onClick does
// the reorder). A direct CLONE of `Tabs.CloseButton` (the proven template): same
// `useTabsActionButtonAui({ profile:'contained', paint:'text' })` cascade, same `setRefs` merge, same
// `useNearestTabActive` roving tabIndex (only the active tab's pin is a Tab stop), same
// stopPropagation on BOTH pointerDown + click so clicking the pin NEVER selects/activates its tab.
// Placed LEADING or TRAILING within a `Tabs.Tab` (consumer-composed). Default `name:'thumbtack'`.
// Requires an accessible name (IconButton's type enforces `aria-label`/`aria-labelledby`).
const TabsPinButton = React.forwardRef<HTMLButtonElement, TabsPinButtonProps>(
  function TabsPinButton(
    { aui, name = 'thumbtack', className, tabIndex, onPointerDown, onClick, onFocus, ...rest },
    ref,
  ) {
    // PinButton defaults: profile 'contained' (in-row snug) + paint 'text' (borderless — no chip),
    // IDENTICAL to CloseButton.
    const resolvedAui = useTabsActionButtonAui(aui, { profile: 'contained', paint: 'text' });
    // The pin roves with its tab: only the active tab's pin is a Tab stop (tabindex 0); inactive ones
    // drop out of the sequence (-1). Needs the rendered node to read the ancestor [role=tab] state, so
    // merge a local ref with the forwarded one.
    const innerRef = React.useRef<HTMLButtonElement | null>(null);
    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        innerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      },
      [ref],
    );
    const tabActive = useNearestTabActive(innerRef);
    // Clicking the pin must NOT select/activate its tab — a DS DEFAULT (matches CloseButton). Base UI's
    // Tab activates on THREE ancestor-tab handlers: onClick, onPointerDown (priming), and — the real
    // selection culprit — onFocus (TabsTab.js:125; `activateOnFocus` defaults true → focus inside the
    // tab activates it). React stopPropagation on click/pointerDown alone leaves the focusin path open:
    // clicking the pin moves DOM focus to it → `focusin` BUBBLES to the tab's React onFocus → the tab
    // activates. So we stop ALL THREE (pointerDown + click + focus). The button still fires its OWN
    // handlers (stopPropagation halts BUBBLING to the tab, not the button's own handlers), so the
    // consumer's "move to front" handler runs.
    const handlePointerDown = React.useCallback<NonNullable<IconButtonProps['onPointerDown']>>(
      (event) => {
        event.stopPropagation();
        onPointerDown?.(event);
      },
      [onPointerDown],
    );
    const handleClick = React.useCallback<NonNullable<IconButtonProps['onClick']>>(
      (event) => {
        event.stopPropagation();
        onClick?.(event);
      },
      [onClick],
    );
    const handleFocus = React.useCallback<NonNullable<IconButtonProps['onFocus']>>(
      (event) => {
        event.stopPropagation();
        onFocus?.(event);
      },
      [onFocus],
    );
    return (
      <IconButton
        ref={setRefs}
        {...(rest as IconButtonProps)}
        name={name}
        aui={resolvedAui}
        onPointerDown={handlePointerDown}
        onClick={handleClick}
        onFocus={handleFocus}
        // Consumer-set tabIndex wins; otherwise rove with the tab.
        tabIndex={tabIndex ?? (tabActive ? 0 : -1)}
        className={
          prependMarkerClassName('aui-tabs-pin-button', className) as string | undefined
        }
      />
    );
  },
);
TabsPinButton.displayName = 'Tabs.PinButton';

export type TabsAddButtonProps = IconButtonProps;

// `Tabs.AddButton` — the new-tab (+) affordance. Placed LEADING or TRAILING relative to `Tabs.List`
// (a SIBLING, consumer-composed — NOT necessarily inside the List). The consumer sets `name` (ADC: a
// "new design" glyph). Requires an accessible name (IconButton's type enforces it).
const TabsAddButton = React.forwardRef<HTMLButtonElement, TabsAddButtonProps>(
  function TabsAddButton({ aui, className, ...rest }, ref) {
    // AddButton default: profile 'square' (IconButton's natural square box).
    const resolvedAui = useTabsActionButtonAui(aui, { profile: 'square' });
    return (
      <IconButton
        ref={ref}
        {...(rest as IconButtonProps)}
        aui={resolvedAui}
        className={prependMarkerClassName('aui-tabs-add-button', className) as string | undefined}
      />
    );
  },
);
TabsAddButton.displayName = 'Tabs.AddButton';

// ─── Tabs.Tab — the active-aware selectable trigger ──────────────────────────
// useStateLayer runs (hover/press/focus affordance), and useTabsTabRecipe runs LAST (recipe +
// `aui.sx` + per-state). Active/disabled come from Base UI's Tab render state through the shared
// trigger-toggle family: `active === true` → the `'selected'` activeState (so `vocab.states.selected`
// + `aui.states` resolve), `disabled` flips the chroma. Same extension chain as Accordion.Trigger.
const _TabsTab = createAtomicComponent(TabsPrimitive.Tab, {
  extensions: [useTabsCascadeProps, useStateLayer, useTabsTabRecipe],
});

export interface TabsTabProps
  extends Omit<React.ComponentProps<typeof TabsPrimitive.Tab>, 'color'> {
  /** Unified customisation object for the interactive tab: context axes (color/paint/scale/shape) +
   *  per-state appearance (`states.unselected` = inactive / `states.selected` = active /
   *  `states.indeterminate` reserved-inert) + full-frame `sx`. With no extra `states` authored the
   *  resolved appearance follows the BAKED vocab default (`surface-alt`, active → `overlay`).
   *  `disabled` stays native/Base UI. */
  aui?: TabsTabAui;
}

const TabsTab = React.forwardRef<HTMLButtonElement, TabsTabProps>(function TabsTab(
  { children, ...rest },
  ref,
) {
  warnIfNoAccessibleName(children, rest as Record<string, unknown>, 'Tabs.Tab');
  return React.createElement(_TabsTab as React.ElementType, { ref, ...rest }, children);
});
TabsTab.displayName = 'Tabs.Tab';

// ─── Tabs.Indicator — the OPT-IN active-tab affordance ───────────────────────
// A stateless `.aui-frame` part. It renders ONLY when the consumer composes `<Tabs.Indicator/>`
// (Base UI's natural behavior — NO show/hide logic here). Its DEFAULT composed look (a thin
// underline) + its active-tab position tracking (Base UI's `--active-tab-*` vars) live in
// `_state-cascade.scss`. The cascade props inject the Root cascade before the recipe runs.
const _TabsIndicator = createAtomicComponent(TabsPrimitive.Indicator, {
  extensions: [useTabsCascadeProps, useTabsIndicatorRecipe],
});

export interface TabsIndicatorProps
  extends Omit<React.ComponentProps<typeof TabsPrimitive.Indicator>, 'color'> {
  /** Unified customisation object for the active-tab indicator surface. */
  aui?: TabsIndicatorAui;
}

const TabsIndicator = React.forwardRef<HTMLSpanElement, TabsIndicatorProps>(function TabsIndicator(
  { ...rest },
  ref,
) {
  return React.createElement(_TabsIndicator as React.ElementType, { ref, ...rest });
});
TabsIndicator.displayName = 'Tabs.Indicator';

// ─── Tabs.Panel — the stateless content region ───────────────────────────────
// A frame so it can be styled through `aui`, but it deliberately omits useStateLayer: it is a region,
// not a control. Base UI owns its mount/visibility. The cascade props inject the Root cascade.
const _TabsPanel = createAtomicComponent(TabsPrimitive.Panel, {
  extensions: [useTabsCascadeProps, useTabsPanelRecipe],
});

export interface TabsPanelProps
  extends Omit<React.ComponentProps<typeof TabsPrimitive.Panel>, 'color'> {
  /** Unified customisation object for the content region frame. */
  aui?: TabsPanelAui;
}

const TabsPanel = React.forwardRef<HTMLDivElement, TabsPanelProps>(function TabsPanel(
  { ...rest },
  ref,
) {
  return React.createElement(_TabsPanel as React.ElementType, { ref, ...rest });
});
TabsPanel.displayName = 'Tabs.Panel';

// ─── Tabs.TabContent — the composable label/children slot INSIDE a Tab (ordering frame) ───────
// Mirrors `Field.Input` (field.tsx): a forwardRef part whose DOM POSITION determines adornment order.
// A `Tabs.Tab` is a flex row; its children render in document order with NO CSS `order`, so a consumer
// orders the in-row elements by where they place this slot — `<Tabs.Icon>`/`<Tabs.PinButton>` BEFORE
// it for a leading adornment, `<Tabs.CloseButton>` AFTER it for a trailing one, with the tab's label
// living INSIDE `<Tabs.TabContent>`. It is a stateless, transparent `.aui-frame` span (a Tab is a
// `<button>`, so the slot must be phrasing content) reading the Tabs cascade through
// `useTabsCascadeProps` then `useTabsContentRecipe` (cascadeReader + paint:text ⇒ no fill — the tab
// chip shows through). Marker `aui-tabs-content`. The cascade props inject the Root cascade before the
// recipe runs (own `aui` axis still wins).
const _TabsTabContent = createAtomicComponent('span', {
  extensions: [useTabsCascadeProps, useTabsContentRecipe],
});

export interface TabsTabContentProps
  extends Omit<React.ComponentProps<'span'>, 'color'> {
  /** Unified customisation object for the transparent in-tab content slot. */
  aui?: TabsTabContentAui;
}

const TabsTabContent = React.forwardRef<HTMLSpanElement, TabsTabContentProps>(function TabsTabContent(
  { children, ...rest },
  ref,
) {
  return React.createElement(_TabsTabContent as React.ElementType, { ref, ...rest }, children);
});
TabsTabContent.displayName = 'Tabs.TabContent';

// ─── Assemble + lockstep typing seam ─────────────────────────────────────────
// `Object.assign` collapses the generic call signature of `TabsRoot`, so the public component type is
// declared explicitly. Keep these statics in lockstep with the interface (mirror Accordion).
interface TabsComponent {
  <Value = unknown>(props: TabsRootProps<Value>): React.JSX.Element;
  displayName?: string;
  List: typeof TabsList;
  Tab: typeof TabsTab;
  Indicator: typeof TabsIndicator;
  Panel: typeof TabsPanel;
  TabContent: typeof TabsTabContent;
  Icon: typeof TabsIcon;
  CloseButton: typeof TabsCloseButton;
  PinButton: typeof TabsPinButton;
  AddButton: typeof TabsAddButton;
}

// Compound component (dot-namespace). `Tabs` is the Root (no `.Root` self-alias; mirror
// Accordion/Menubar).
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab: TabsTab,
  Indicator: TabsIndicator,
  Panel: TabsPanel,
  TabContent: TabsTabContent,
  Icon: TabsIcon,
  CloseButton: TabsCloseButton,
  PinButton: TabsPinButton,
  AddButton: TabsAddButton,
}) as TabsComponent;

export default Tabs;
