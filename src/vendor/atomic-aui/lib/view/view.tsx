// modules/design/atomic-aui/src/lib/view/view.tsx
//
// View — the AtomicAUI 6.0 structural FRAME primitive: ONE box (`.aui-view`, an `.aui-frame`) that
// frames/groups content. Like Type/Icon (and UNLIKE Button/Checkbox/Select) it is HAND-CRAFTED — a
// plain `React.forwardRef` + a `useViewRecipe` hook, NOT `createAtomicComponent`. Reason: View
// renders a plain `as` element (default `'div'`) with no Base UI headless core, and `interactive`
// must CONDITIONALLY toggle the state layer + state resolution — the factory's STATIC `extensions`
// array can't gate on a prop. View IS a box (unlike Type's text), so it takes the FULL frame `aui`
// surface (every box axis + the canonical `aui.states`).
//
// View is ALSO the host namespace for the ScrollArea family: `Object.assign(View, { ScrollArea, … })`
// (flat 2-level, `View.ScrollAreaScrollbar` not `View.ScrollArea.Scrollbar`). See ./scroll-area.tsx.
import * as React from 'react';
import { buildLeafClasses } from '../../core/recipe/build-leaf-classes';
import { toggleStateKey, type EnabledStateKey } from '../../families/toggleable/state-key';
import { VIEW_VOCAB, type ViewAui } from './use-recipe';
import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from './scroll-area';
import type {
  ScrollAreaProps,
  ScrollAreaViewportProps,
  ScrollAreaScrollbarProps,
  ScrollAreaThumbProps,
  ScrollAreaCornerProps,
} from './scroll-area';

export { VIEW_VOCAB, VIEW_SX_AXES } from './use-recipe';
export type { ViewAui } from './use-recipe';

// The `useStateLayer` class string — appended ONLY when interactive (the `.aui-stateful` overlay
// host + the focus-ring defaults the shared `_state-cascade.scss` CSS draws). Mirrors the shared
// `core/state/use-state-layer.ts` constant; inlined because View resolves classes by hand (it does
// not run the factory PropHook chain that consumes `useStateLayer`).
const STATE_LAYER_CLASSES = 'aui-stateful aui-focus-color-info aui-focus-width-2';

export interface ViewProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  /** Unified customisation object: the FULL 7-axis frame appearance (color/paint/scale/profile/
   *  shape/elevation/sx) + canonical per-state overrides under `states`
   *  (`unselected`/`selected`/`indeterminate`). Default appearance: surface / solid / sm /
   *  no-padding / none / 0. `aui.states` is INERT unless `interactive` (see below). */
  aui?: ViewAui;
  /** When `true`, View becomes an interactive surface: it gets the `.aui-stateful` hover/active/
   *  focus overlay + focus ring, resolves `aui.states` for the active state, applies the disabled
   *  chroma flip, and the shell adds interaction a11y (a default `role` you can override,
   *  `tabIndex`, Enter/Space → click). When `false` (DEFAULT) the frame is visually INERT — a plain
   *  structural box: `selected`/`indeterminate`/`disabled`/`aui.states` have NO effect. */
  interactive?: boolean;
  /** Selection state (only meaningful when `interactive`). Resolves the `selected` appearance key. */
  selected?: boolean;
  /** Indeterminate state (only meaningful when `interactive`). Resolves the `indeterminate` key. */
  indeterminate?: boolean;
  /** Disabled (only meaningful when `interactive`): flips the chroma to the paint's disabled cell,
   *  reflected as `aria-disabled` + `data-disabled` (NOT a native `disabled` attr — `<div>` has none). */
  disabled?: boolean;
  /** Render element (polymorphism). Default `'div'`. */
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
}

// ─── useViewRecipe — the interactive-gated class resolver ─────────────────────────────────────────
// Resolves View's class string by hand (no factory). The `interactive` gate is the whole point:
//   • interactive  → buildLeafClasses(VIEW_VOCAB, aui, <activeKey>, disabled) + the state-layer
//                    classes. `<activeKey>` comes from `toggleStateKey({checked: selected,
//                    indeterminate, disabled})` (the shipped helper), split into the enabled key +
//                    the disabled flag (same split as the toggleable recipe).
//   • !interactive → buildLeafClasses(VIEW_VOCAB, aui, 'unselected', false) ONLY — base appearance,
//                    NO `.aui-stateful`, NO state layer, NO disabled flip. The "no effect" case.
interface UseViewRecipeProps {
  aui?: ViewAui;
  interactive: boolean;
  selected?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  className?: string;
}

interface UseViewRecipeResult {
  /** Composed className: recipe (incl. the `aui-view` marker) + the state-layer classes (interactive
   *  only) + the user className (LAST). */
  className: string;
  /** Whether the disabled chroma flip / a11y disabled reflection is active (interactive + disabled). */
  isDisabled: boolean;
}

export function useViewRecipe(props: UseViewRecipeProps): UseViewRecipeResult {
  const { aui, interactive, selected, indeterminate, disabled, className } = props;

  let recipe: string;
  let isDisabled = false;
  if (interactive) {
    const key = toggleStateKey({ checked: selected, indeterminate, disabled });
    isDisabled = key.startsWith('disabled-');
    const enabledKey: EnabledStateKey = isDisabled
      ? (key.slice('disabled-'.length) as EnabledStateKey)
      : (key as EnabledStateKey);
    recipe = buildLeafClasses(VIEW_VOCAB, aui, enabledKey, isDisabled);
  } else {
    // INERT structural frame: base appearance only — selected/indeterminate/disabled/aui.states off.
    recipe = buildLeafClasses(VIEW_VOCAB, aui, 'unselected', false);
  }

  const composed = [recipe, interactive ? STATE_LAYER_CLASSES : false, className]
    .filter(Boolean)
    .join(' ');

  return { className: composed, isDisabled };
}

// ─── The View render shell ────────────────────────────────────────────────────────────────────────
const ViewRoot = React.forwardRef<HTMLElement, ViewProps>(function View(
  {
    aui,
    interactive = false,
    selected,
    indeterminate,
    disabled,
    as,
    className,
    role,
    tabIndex,
    onKeyDown,
    onClick,
    onClickCapture,
    children,
    ...rest
  },
  ref,
) {
  const { className: composedClassName, isDisabled } = useViewRecipe({
    aui,
    interactive,
    selected,
    indeterminate,
    disabled,
    className,
  });

  const Tag = (as ?? 'div') as React.ElementType;
  // A natively-interactive `as` (`button`/`a`) already owns role + focusability + Enter/Space
  // activation, so we do NOT double-stamp the synthetic-button SHIM on it (it would fight the native
  // semantics — e.g. role="button" on an `<a>`, or a second Space activation). `interactive` on such
  // an element means "give it the state-layer visuals + disabled guards"; the consumer owns its
  // intrinsic role/focus/keyboard. Plain elements (div/span/…) get the FULL synthesised contract.
  const nativeInteractive = Tag === 'button' || Tag === 'a';
  // The role the element EFFECTIVELY exposes — used to gate `aria-pressed` (valid only on a button;
  // `aria-pressed` on a `tab`/`link`/`switch` is invalid ARIA — those use aria-selected/aria-checked).
  const effectiveRole = role ?? (Tag === 'button' ? 'button' : Tag === 'a' ? 'link' : 'button');

  // Interaction a11y — ONLY when interactive. Full button a11y to match the other interactive
  // components (Base UI Button et al.), since a `<div role="button">` gets NONE of it natively:
  //   • a default `role` (consumer-overridable) + keyboard focusability (`tabIndex` 0, or -1 disabled);
  //   • Enter/Space → activate (synthetic click), with `preventDefault` on Space so it doesn't scroll;
  //   • `disabled` → `aria-disabled` + `data-disabled` (a `<div>` has no native `disabled`; the attr
  //     also drives the `.aui-stateful` disabled-suppression CSS) AND blocks the click handler in BOTH
  //     phases (a native disabled button fires nothing — we match that);
  //   • a SELECTABLE button View (`selected`/`indeterminate`, effective role `button`) is a TOGGLE
  //     button → expose `aria-pressed` (`true`/`false`/`mixed`). A plain action View, or a role-/`as`-
  //     overridden non-button, gets NO `aria-pressed` (the consumer owns the correct state attr).
  // The component-owned attrs/handlers are spread AFTER `...rest` (below) so they stay AUTHORITATIVE —
  // a consumer can't desync the DOM semantics from the resolved disabled/selected state.
  const interactiveProps: React.HTMLAttributes<HTMLElement> & {
    'data-disabled'?: string;
    'aria-disabled'?: boolean;
    'aria-pressed'?: boolean | 'mixed';
  } = {};
  if (interactive) {
    if (!nativeInteractive) {
      // The synthetic-button shim — only for a non-native element.
      interactiveProps.role = role ?? 'button';
      interactiveProps.tabIndex = tabIndex ?? (isDisabled ? -1 : 0);
      interactiveProps.onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        // A native disabled button fires NO key events at all — match that: bail BEFORE the
        // consumer handler so a disabled View suppresses keyboard side-effects too (mirrors the
        // disabled-first order of the onClick handler below).
        if (isDisabled) return;
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
          event.preventDefault();
          (event.currentTarget as unknown as { click(): void }).click();
        }
      };
    } else {
      // Native button/<a>: honor an explicit role/tabIndex, pass onKeyDown through (no shim).
      if (role !== undefined) interactiveProps.role = role;
      if (tabIndex !== undefined) interactiveProps.tabIndex = tabIndex;
      if (onKeyDown !== undefined) interactiveProps.onKeyDown = onKeyDown;
    }
    if (effectiveRole === 'button' && (selected !== undefined || indeterminate !== undefined)) {
      interactiveProps['aria-pressed'] = indeterminate ? 'mixed' : !!selected;
    }
    if (isDisabled) {
      interactiveProps['aria-disabled'] = true;
      interactiveProps['data-disabled'] = '';
    }
    // Disabled blocks activation in BOTH the bubble and capture phases (a native disabled button
    // fires nothing in any phase); when enabled, the consumer's handler runs.
    interactiveProps.onClick = (event: React.MouseEvent<HTMLElement>) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    };
    interactiveProps.onClickCapture = (event: React.MouseEvent<HTMLElement>) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClickCapture?.(event);
    };
  } else {
    // Non-interactive: pass through any consumer-supplied role/tabIndex/handlers verbatim.
    if (role !== undefined) interactiveProps.role = role;
    if (tabIndex !== undefined) interactiveProps.tabIndex = tabIndex;
    if (onKeyDown !== undefined) interactiveProps.onKeyDown = onKeyDown;
    if (onClick !== undefined) interactiveProps.onClick = onClick;
    if (onClickCapture !== undefined) interactiveProps.onClickCapture = onClickCapture;
  }

  return (
    <Tag ref={ref} className={composedClassName} {...rest} {...interactiveProps}>
      {children}
    </Tag>
  );
});
ViewRoot.displayName = 'View';

// ─── Flat 2-level namespace (component-namespace-convention.md) ──────────────────────────────────
// View is the host. Each part's displayName is `View.<Part>` (set in ./scroll-area.tsx). The
// grouping ("ScrollArea") lives in the PascalCase part NAME — never a 3rd dot level.
interface ViewComponent
  extends React.ForwardRefExoticComponent<ViewProps & React.RefAttributes<HTMLElement>> {
  ScrollArea: typeof ScrollArea;
  ScrollAreaViewport: typeof ScrollAreaViewport;
  ScrollAreaScrollbar: typeof ScrollAreaScrollbar;
  ScrollAreaThumb: typeof ScrollAreaThumb;
  ScrollAreaCorner: typeof ScrollAreaCorner;
}

export const View = Object.assign(ViewRoot, {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
}) as ViewComponent;

export type {
  ScrollAreaProps,
  ScrollAreaViewportProps,
  ScrollAreaScrollbarProps,
  ScrollAreaThumbProps,
  ScrollAreaCornerProps,
};

export default View;
