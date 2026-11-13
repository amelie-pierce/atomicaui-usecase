// modules/design/atomic-aui/src/lib/autocomplete/autocomplete.tsx
//
// AtomicAUI Autocomplete wraps the installed PUBLIC @base-ui/react/autocomplete namespace. Base UI owns
// filtering, query value, open/highlight state, ARIA, form serialization, focus, and field registration;
// AtomicAUI owns the per-part `aui` appearance surface and the DS popup scroll wrapper.
import * as React from 'react';
import { Autocomplete as AutocompletePrimitive } from '@base-ui/react/autocomplete';
import { Separator } from '@base-ui/react/separator';
import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { createAtomicPart, findPartChild } from '../../core/factory/create-atomic-part';
import { useStateLayer } from '../../core/state/use-state-layer';
import { prependMarkerClassName } from '../../core/recipe/prepend-marker-class-name';
import { warnIfNoAccessibleName } from '../../core/a11y/warn-if-no-accessible-name';
import { ContainedIcon, type ContainedIconProps } from '../icon';
import { IconButton, ICON_BUTTON_DEFAULTS, type IconButtonAui } from '../icon-button';
import { useAuiIdentity, identityToDataAttrs } from '../identity';
import {
  AuiScaleProvider,
  useAuiScale,
  useScaleCascade,
  resolveAuiScale,
} from '../scale-cascade/use-aui-scale';
import {
  ScrollAreaViewport as ViewScrollAreaViewport,
  ScrollAreaScrollbar as ViewScrollAreaScrollbar,
} from '../view';
import type { ScrollAreaThumbColor } from '../view';
import { useFieldAui, type FieldResolvedAui } from '../field/field-context';
import {
  AUTOCOMPLETE_TRIGGER_VOCAB,
  useAutocompleteInputGroupRecipe,
  useAutocompleteInputRecipe,
  useAutocompleteTriggerRecipe,
  useAutocompletePopupRecipe,
  useAutocompleteItemRecipe,
  useAutocompleteEmptyRecipe,
  useAutocompleteStatusRecipe,
  useAutocompleteGroupLabelRecipe,
  useAutocompleteInlineLayoutRecipe,
  useAutocompleteInlineCardRecipe,
  useAutocompleteListRecipe,
} from './use-recipe';
import type {
  AutocompleteInputGroupAui,
  AutocompleteInputAui,
  AutocompleteTriggerAui,
  AutocompletePopupAui,
  AutocompleteItemAui,
  AutocompleteEmptyAui,
  AutocompleteStatusAui,
  AutocompleteGroupLabelAui,
  AutocompleteInlineLayoutAui,
  AutocompleteInlineCardAui,
  AutocompleteListAui,
  AutocompleteScale,
} from './use-recipe';

import type { AutocompleteRootProps as BaseAutocompleteRootProps } from '@base-ui/react/autocomplete';

// Autocomplete.Root props = Base UI's Root props PLUS two DS-friendly booleans that alias the raw
// `mode` enum (USER DECISION, 2026-07-11, round 8 — precedent: Dialog's `clickOutsideToClose` alias,
// `dialog.tsx`). `filterOnType` (default true) is "does typing narrow the list"; `previewOnHighlight`
// (default false) is "do arrow keys write the highlighted item into the input". Mapping: both true →
// 'both'; filter-only (the default combo) → 'list'; preview-only → 'inline'; neither → 'none'. Raw
// `mode` stays accepted for Base UI parity; when set explicitly it WINS over the booleans (mirrors
// `clickOutsideToClose` winning over `disablePointerDismissal`) — with a dev-warn on the conflict.
// NOTE: unlike `clickOutsideToClose`, Dialog's own alias does NOT dev-warn on conflict (verified —
// `dialog.tsx`/`dialog.spec.tsx` have no such warning); the warn here is this decision's own addition,
// using the codebase's general dev-warn shape (`process.env.NODE_ENV !== 'production'`, cf.
// `select.tsx`'s composed-part warnings), not literally copied from Dialog.
export interface AutocompleteRootProps<ItemValue> extends BaseAutocompleteRootProps<ItemValue> {
  /**
   * Whether typing narrows the item list. DS-friendly alias for part of Base UI's `mode`.
   * Default `true`. Combined with `previewOnHighlight` to resolve the underlying `mode`:
   * both true → `'both'`; this alone → `'list'` (default); neither → `'none'`.
   */
  filterOnType?: boolean;
  /**
   * Whether arrow-key highlighting writes the highlighted item's text into the input. DS-friendly
   * alias for part of Base UI's `mode`. Default `false`. This alone (without `filterOnType`) → `'inline'`.
   */
  previewOnHighlight?: boolean;
}

export type {
  AutocompleteInputGroupAui,
  AutocompleteInputAui,
  AutocompleteTriggerAui,
  AutocompletePopupAui,
  AutocompleteItemAui,
  AutocompleteEmptyAui,
  AutocompleteStatusAui,
  AutocompleteGroupLabelAui,
  AutocompleteInlineLayoutAui,
  AutocompleteInlineCardAui,
  AutocompleteListAui,
  AutocompleteColor,
  AutocompletePaint,
  AutocompleteScale,
  AutocompleteShape,
} from './use-recipe';

type FieldMergeableAui = {
  color?: unknown;
  shape?: unknown;
  elevation?: unknown;
  sx?: unknown;
};

// Field.Autocomplete re-provides FieldAuiContext around Root; every DOM-bearing
// part reads it here so portaled parts inherit Field axes, while an explicit
// part `aui` remains the local override.
function mergeAutocompletePartAui<A extends FieldMergeableAui>(
  inherited: FieldResolvedAui,
  own: A | undefined,
): A {
  const out: Record<string, unknown> = { ...(own ?? {}) };
  if (own?.color === undefined && inherited.color !== undefined) out.color = inherited.color;
  if (own?.shape === undefined && inherited.shape !== undefined) out.shape = inherited.shape;
  if (own?.elevation === undefined && inherited.elevation !== undefined) out.elevation = inherited.elevation;
  const ownSx = (own as { sx?: object } | undefined)?.sx;
  if (inherited.sx !== undefined || ownSx !== undefined) {
    out.sx = { ...(inherited.sx as object | undefined), ...ownSx };
  }
  return out as A;
}

function useMergedAutocompletePartAui<A extends FieldMergeableAui>(aui: A | undefined): A {
  const inherited = useFieldAui();
  return React.useMemo(() => mergeAutocompletePartAui(inherited, aui), [inherited, aui]);
}

// ─── Value — a marker-tier part (VERIFIED-SAME: Select.Value `select.tsx:100-105`,
// Combobox.Value `combobox.tsx:107-112` — a plain `createAtomicPart` over the Base UI render-prop
// part, so the rendered `<span>` carries `aui-autocomplete-value` and is CSS/DOM-targetable,
// instead of the raw untargetable passthrough this shipped with). No `aui` (no styling needs a
// hook here); Portal/Collection remain genuine no-own-DOM passthroughs (Base UI renders nothing).
const AutocompleteValue = createAtomicPart<React.ComponentProps<typeof AutocompletePrimitive.Value>>(
  AutocompletePrimitive.Value,
  'aui-autocomplete-value',
);
AutocompleteValue.displayName = 'Autocomplete.Value';
export type AutocompleteValueProps = React.ComponentProps<typeof AutocompleteValue>;

const AutocompletePortal = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof AutocompletePrimitive.Portal>
>(function AutocompletePortal(props, ref) {
  return React.createElement(AutocompletePrimitive.Portal as React.ElementType, { ref, ...props });
});
AutocompletePortal.displayName = 'Autocomplete.Portal';
export type AutocompletePortalProps = React.ComponentProps<typeof AutocompletePortal>;

const AutocompleteCollection = AutocompletePrimitive.Collection;
export type AutocompleteCollectionProps = React.ComponentProps<typeof AutocompleteCollection>;

// ─── InputGroup/Input/Trigger — the typing rail ──────────────────────────────
const _AutocompleteInputGroup = createAtomicComponent(AutocompletePrimitive.InputGroup, {
  extensions: [useScaleCascade, useAutocompleteInputGroupRecipe],
});
export interface AutocompleteInputGroupProps
  extends Omit<React.ComponentProps<typeof AutocompletePrimitive.InputGroup>, 'color'> {
  aui?: AutocompleteInputGroupAui;
}
const AutocompleteInputGroup = React.forwardRef<HTMLDivElement, AutocompleteInputGroupProps>(
  function AutocompleteInputGroup({ aui, ...rest }, ref) {
    const merged = useMergedAutocompletePartAui(aui);
    return React.createElement(_AutocompleteInputGroup as React.ElementType, { ref, ...rest, aui: merged });
  },
);
AutocompleteInputGroup.displayName = 'Autocomplete.InputGroup';

const _AutocompleteInput = createAtomicComponent(AutocompletePrimitive.Input, {
  extensions: [useScaleCascade, useAutocompleteInputRecipe],
});
export interface AutocompleteInputProps
  extends Omit<React.ComponentProps<typeof AutocompletePrimitive.Input>, 'color'> {
  aui?: AutocompleteInputAui;
}
const AutocompleteInput = React.forwardRef<HTMLInputElement, AutocompleteInputProps>(
  function AutocompleteInput({ aui, ...rest }, ref) {
    const merged = useMergedAutocompletePartAui(aui);
    return React.createElement(_AutocompleteInput as React.ElementType, { ref, ...rest, aui: merged });
  },
);
AutocompleteInput.displayName = 'Autocomplete.Input';

const _AutocompleteTrigger = createAtomicComponent(AutocompletePrimitive.Trigger, {
  extensions: [useScaleCascade, useStateLayer, useAutocompleteTriggerRecipe],
});
export interface AutocompleteTriggerProps
  extends Omit<React.ComponentProps<typeof AutocompletePrimitive.Trigger>, 'color'> {
  aui?: AutocompleteTriggerAui;
}
const AutocompleteTrigger = React.forwardRef<HTMLButtonElement, AutocompleteTriggerProps>(
  function AutocompleteTrigger({ aui, children, ...rest }, ref) {
    if (process.env.NODE_ENV !== 'production') warnIfNoAccessibleName([children], rest, 'Autocomplete.Trigger');
    const merged = useMergedAutocompletePartAui(aui);
    return React.createElement(_AutocompleteTrigger as React.ElementType, { ref, ...rest, aui: merged }, children);
  },
);
AutocompleteTrigger.displayName = 'Autocomplete.Trigger';

export type AutocompleteIconProps = ContainedIconProps;
// Rail affordance pin: keep the chevron box tier-aligned with Clear/IconButton
// like Combobox until the shared icon-container sizing follow-up lands.
const AUTOCOMPLETE_ICON_BOX_PIN_TIER: Record<AutocompleteScale, string> = {
  xs: '16',
  sm: '20',
  md: '22',
  lg: '24',
  xl: '28',
};
const AutocompleteIcon = React.forwardRef<HTMLSpanElement, AutocompleteIconProps>(
  function AutocompleteIcon({ aui, className, ...rest }, ref) {
    const inheritedScale = useAuiScale();
    const resolvedScale = resolveAuiScale(
      aui?.scale,
      inheritedScale,
      AUTOCOMPLETE_TRIGGER_VOCAB.defaults.scale as AutocompleteScale,
    );
    const resolvedAui = React.useMemo(() => ({ ...aui, scale: resolvedScale }), [aui, resolvedScale]);
    const markerClassName = prependMarkerClassName('aui-autocomplete-icon', className as string | undefined) as
      | string
      | undefined;
    const pinnedPx = `${AUTOCOMPLETE_ICON_BOX_PIN_TIER[resolvedScale]}px`;
    const style = {
      ...(rest as { style?: React.CSSProperties }).style,
      '--aui-icon-container': pinnedPx,
    } as React.CSSProperties;
    return <ContainedIcon ref={ref} {...rest} style={style} className={markerClassName} aui={resolvedAui} />;
  },
);
AutocompleteIcon.displayName = 'Autocomplete.Icon';

export interface AutocompleteClearProps
  extends Omit<React.ComponentProps<typeof AutocompletePrimitive.Clear>, 'render' | 'className' | 'children'> {
  aui?: IconButtonAui;
  className?: string;
  /** The clear glyph. Defaults to 'xmark'. */
  name?: string;
}
const AutocompleteClear = React.forwardRef<HTMLButtonElement, AutocompleteClearProps>(
  function AutocompleteClear(
    {
      aui,
      className,
      name = 'xmark',
      keepMounted = true,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      ...rest
    },
    ref,
  ) {
    if (process.env.NODE_ENV !== 'production') {
      warnIfNoAccessibleName(
        [],
        { ...rest, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby },
        'Autocomplete.Clear',
      );
    }
    const inherited = useFieldAui();
    const fieldMergedAui = React.useMemo(
      () => mergeAutocompletePartAui(inherited, aui as IconButtonAui | undefined),
      [inherited, aui],
    );
    const [clearNode, setClearNode] = React.useState<HTMLButtonElement | null>(null);
    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        setClearNode(node);
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      },
      [ref],
    );
    const inheritedScale = useAuiScale();
    const resolvedScale = resolveAuiScale(fieldMergedAui?.scale, inheritedScale, ICON_BUTTON_DEFAULTS.scale);
    const resolvedAui = React.useMemo<IconButtonAui>(
      () => ({ profile: 'contained' as const, paint: 'text' as const, ...fieldMergedAui, scale: resolvedScale }),
      [fieldMergedAui, resolvedScale],
    );
    const accessibleNameProps = { 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby } as {
      'aria-label': string;
    };

    React.useEffect(() => {
      if (!clearNode) return undefined;
      const node = clearNode as unknown as {
        hasAttribute(name: string): boolean;
        getAttribute(name: string): string | null;
        setAttribute(name: string, value: string): void;
        removeAttribute(name: string): void;
      };
      // Base UI owns Clear visibility through `data-visible`; mirror that sentinel
      // to aria-hidden so the kept-mounted IconButton stays out of the a11y tree.
      const applyAriaHidden = () => {
        const shouldHide = !node.hasAttribute('data-visible');
        const current = node.getAttribute('aria-hidden');
        if (shouldHide && current !== 'true') node.setAttribute('aria-hidden', 'true');
        else if (!shouldHide && current !== null) node.removeAttribute('aria-hidden');
      };
      applyAriaHidden();
      const win = globalThis as { MutationObserver?: new (cb: () => void) => {
        observe(target: unknown, opts: object): void;
        disconnect(): void;
      } };
      if (!win.MutationObserver) return undefined;
      const observer = new win.MutationObserver(applyAriaHidden);
      observer.observe(node, { attributes: true, attributeFilter: ['data-visible', 'aria-hidden'] });
      return () => observer.disconnect();
    }, [clearNode]);

    return React.createElement(AutocompletePrimitive.Clear, {
      ref: setRefs,
      keepMounted,
      ...rest,
      render: (buttonProps, state) => {
        const buttonRest = { ...(buttonProps as React.ComponentProps<typeof IconButton> & { children?: React.ReactNode }) };
        const baseClassName = buttonRest.className;
        delete buttonRest.className;
        delete buttonRest.children;
        const combinedClassName = [baseClassName, className].filter(Boolean).join(' ') || undefined;
        const clearClassName = prependMarkerClassName('aui-autocomplete-clear', combinedClassName) as
          | string
          | undefined;
        return (
          <IconButton
            {...buttonRest}
            name={name}
            aui={resolvedAui}
            className={clearClassName}
            aria-hidden={(state as { visible?: boolean }).visible ? undefined : true}
            {...accessibleNameProps}
          />
        );
      },
    });
  },
);
AutocompleteClear.displayName = 'Autocomplete.Clear';

// ─── Popup stack ─────────────────────────────────────────────────────────────
// Backdrop can portal as a sibling and Positioner carries the portaled popup;
// both re-stamp the active Atomic identity so theme variables re-root there.
const AutocompleteBackdrop = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof AutocompletePrimitive.Backdrop>
>(function AutocompleteBackdrop({ className, ...rest }, ref) {
  const identity = useAuiIdentity();
  const dataAttrs = identityToDataAttrs(identity);
  return React.createElement(AutocompletePrimitive.Backdrop as React.ElementType, {
    ref,
    'data-aui-popup-motion': 'backdrop',
    ...rest,
    ...dataAttrs,
    className: prependMarkerClassName('aui-autocomplete-backdrop', className),
  });
});
AutocompleteBackdrop.displayName = 'Autocomplete.Backdrop';
export type AutocompleteBackdropProps = React.ComponentProps<typeof AutocompleteBackdrop>;

const AutocompletePositioner = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof AutocompletePrimitive.Positioner>
>(function AutocompletePositioner({ className, ...rest }, ref) {
  const identity = useAuiIdentity();
  const dataAttrs = identityToDataAttrs(identity);
  return React.createElement(AutocompletePrimitive.Positioner as React.ElementType, {
    ref,
    ...rest,
    ...dataAttrs,
    className: prependMarkerClassName('aui-autocomplete-positioner', className),
  });
});
AutocompletePositioner.displayName = 'Autocomplete.Positioner';
export type AutocompletePositionerProps = React.ComponentProps<typeof AutocompletePositioner>;

const _AutocompletePopup = createAtomicComponent(AutocompletePrimitive.Popup, {
  extensions: [useScaleCascade, useAutocompletePopupRecipe],
});
export interface AutocompleteScrollAreaProps {
  scrollbarSize?: number | string;
  scrollbarThumbHover?: string;
  scrollbarColor?: ScrollAreaThumbColor;
  /** INLINE mode only — bounds `Autocomplete.InlineCard`'s height (the same
   *  `--aui-popup-max-block-size` hook `Autocomplete.Popup`'s own `maxHeight` prop writes; inline
   *  has no `Popup` to hang the prop off, so it rides the config carrier already present there
   *  instead). No effect in floating mode — use `Autocomplete.Popup`'s own `maxHeight` there. */
  maxHeight?: number | string;
}
// Config carrier only: Popup/InlineCard read this part's props while rendering exactly one
// built-in DS ScrollArea wrapper around Base UI's popup/list content.
const AutocompleteScrollArea: React.FC<AutocompleteScrollAreaProps> = () => null;
AutocompleteScrollArea.displayName = 'Autocomplete.ScrollArea';

export interface AutocompletePopupProps
  extends Omit<React.ComponentProps<typeof AutocompletePrimitive.Popup>, 'color'> {
  aui?: AutocompletePopupAui;
  matchTriggerWidth?: boolean;
  maxHeight?: number | string;
}

// Popup owns the frame padding, but the nested Viewport owns scrolling; subtract
// the inherited block padding so the wrapper preserves the unwrapped content cap.
const AUTOCOMPLETE_SCROLL_MAX_BLOCK_SIZE =
  'min(' +
  'calc(var(--aui-popup-max-block-size, 100vh) - var(--aui-padding-block-start, 0px) - var(--aui-padding-block-end, 0px)), ' +
  'calc(var(--available-height, 100vh) - var(--aui-padding-block-start, 0px) - var(--aui-padding-block-end, 0px))' +
  ')';

const AutocompletePopup = React.forwardRef<HTMLDivElement, AutocompletePopupProps>(
  function AutocompletePopup({ matchTriggerWidth = true, maxHeight, style, children, aui, ...rest }, ref) {
    const mergedAui = useMergedAutocompletePartAui(aui);
    const widthStyle = {
      ...(matchTriggerWidth ? { '--aui-width': 'var(--anchor-width)' } : {}),
      ...(maxHeight != null
        ? { '--aui-popup-max-block-size': typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }
        : {}),
      maxBlockSize: 'none',
    } as React.CSSProperties;
    let mergedStyle: AutocompletePopupProps['style'] | undefined;
    if (typeof style === 'function') {
      const styleFn = style;
      mergedStyle = (state: unknown) =>
        ({ ...widthStyle, ...(styleFn as (s: unknown) => React.CSSProperties)(state) });
    } else {
      mergedStyle = { ...widthStyle, ...style };
    }

    // Installed Popup/List own refs, ids, roles, placement, and focus; they do
    // not own scroll metrics, so scroll ownership can move to this one wrapper.
    const scrollAreaPart = findPartChild(children, AutocompleteScrollArea);
    const scrollAreaProps = scrollAreaPart?.props as AutocompleteScrollAreaProps | undefined;
    const rootThumbStyle = {
      ...(scrollAreaProps?.scrollbarSize != null
        ? { '--aui-scrollbar-size': typeof scrollAreaProps.scrollbarSize === 'number' ? `var(--p-px-${scrollAreaProps.scrollbarSize})` : scrollAreaProps.scrollbarSize }
        : {}),
      ...(scrollAreaProps?.scrollbarThumbHover != null ? { '--aui-scrollbar-thumb-hover': scrollAreaProps.scrollbarThumbHover } : {}),
    } as React.CSSProperties;

    return React.createElement(
      _AutocompletePopup as React.ElementType,
      {
        ref,
        'data-aui-popup-motion': 'anchored',
        ...rest,
        aui: mergedAui,
        style: mergedStyle,
      },
      React.createElement(
        ScrollAreaPrimitive.Root as React.ElementType,
        Object.keys(rootThumbStyle).length > 0 ? { style: rootThumbStyle } : null,
        React.createElement(
          ViewScrollAreaViewport,
          { style: { maxBlockSize: AUTOCOMPLETE_SCROLL_MAX_BLOCK_SIZE, overflowX: 'hidden' } as React.CSSProperties },
          children,
        ),
        React.createElement(ViewScrollAreaScrollbar, {
          orientation: 'vertical',
          ...(scrollAreaProps?.scrollbarColor != null ? { thumbColor: scrollAreaProps.scrollbarColor } : {}),
        }),
      ),
    );
  },
);
AutocompletePopup.displayName = 'Autocomplete.Popup';

// ─── List and rows ───────────────────────────────────────────────────────────
// A cascade-reader leaf (`AUTOCOMPLETE_LIST_VOCAB` — use-recipe.ts): unpainted by default in BOTH
// modes. Floating mode's card is Popup; inline mode's card is `AutocompleteInlineCard` (below) —
// List itself never paints its own box in either mode (round 3 — see the vocab comment).
const _AutocompleteList = createAtomicComponent(AutocompletePrimitive.List, {
  extensions: [useScaleCascade, useAutocompleteListRecipe],
});
export interface AutocompleteListProps
  extends Omit<React.ComponentProps<typeof AutocompletePrimitive.List>, 'color'> {
  aui?: AutocompleteListAui;
}
// No Field-context merge here (unlike its siblings): List no longer owns any paint in either
// mode, so pulling in an ambient Field color would just double-stamp the SAME color the
// enclosing card (Popup / InlineCard) already resolved — invisible today (List sits fully
// inside the card, same hue, no seam) but a confusing "List looks explicitly colored" false
// signal. List's `cascadeReader` escape hatch stays live for a consumer who sets `aui` directly
// on the composed element; it just doesn't inherit ambient color it never asked for.
const AutocompleteList = React.forwardRef<HTMLDivElement, AutocompleteListProps>(
  function AutocompleteList({ aui, ...rest }, ref) {
    return React.createElement(_AutocompleteList as React.ElementType, { ref, ...rest, aui });
  },
);
AutocompleteList.displayName = 'Autocomplete.List';

const _AutocompleteStatus = createAtomicComponent(AutocompletePrimitive.Status, {
  extensions: [useScaleCascade, useAutocompleteStatusRecipe],
});
export interface AutocompleteStatusProps
  extends Omit<React.ComponentProps<typeof AutocompletePrimitive.Status>, 'color'> {
  aui?: AutocompleteStatusAui;
}
const AutocompleteStatus = React.forwardRef<HTMLDivElement, AutocompleteStatusProps>(
  function AutocompleteStatus({ aui, ...rest }, ref) {
    const merged = useMergedAutocompletePartAui(aui);
    return React.createElement(_AutocompleteStatus as React.ElementType, { ref, ...rest, aui: merged });
  },
);
AutocompleteStatus.displayName = 'Autocomplete.Status';

const _AutocompleteEmpty = createAtomicComponent(AutocompletePrimitive.Empty, {
  extensions: [useScaleCascade, useAutocompleteEmptyRecipe],
});
export interface AutocompleteEmptyProps
  extends Omit<React.ComponentProps<typeof AutocompletePrimitive.Empty>, 'color'> {
  aui?: AutocompleteEmptyAui;
}
const AutocompleteEmpty = React.forwardRef<HTMLDivElement, AutocompleteEmptyProps>(
  function AutocompleteEmpty({ aui, ...rest }, ref) {
    const merged = useMergedAutocompletePartAui(aui);
    return React.createElement(_AutocompleteEmpty as React.ElementType, { ref, ...rest, aui: merged });
  },
);
AutocompleteEmpty.displayName = 'Autocomplete.Empty';

const _AutocompleteItem = createAtomicComponent(AutocompletePrimitive.Item, {
  extensions: [useScaleCascade, useStateLayer, useAutocompleteItemRecipe],
});
export interface AutocompleteItemProps
  extends Omit<React.ComponentProps<typeof AutocompletePrimitive.Item>, 'color'> {
  aui?: AutocompleteItemAui;
}
const AutocompleteItem = React.forwardRef<HTMLDivElement, AutocompleteItemProps>(
  function AutocompleteItem({ aui, ...rest }, ref) {
    const merged = useMergedAutocompletePartAui(aui);
    return React.createElement(_AutocompleteItem as React.ElementType, { ref, ...rest, aui: merged });
  },
);
AutocompleteItem.displayName = 'Autocomplete.Item';

const AutocompleteGroup = createAtomicPart<React.ComponentProps<typeof AutocompletePrimitive.Group>>(
  AutocompletePrimitive.Group,
  'aui-autocomplete-group',
);
AutocompleteGroup.displayName = 'Autocomplete.Group';
export type AutocompleteGroupProps = React.ComponentProps<typeof AutocompleteGroup>;

const _AutocompleteGroupLabel = createAtomicComponent(AutocompletePrimitive.GroupLabel, {
  extensions: [useScaleCascade, useAutocompleteGroupLabelRecipe],
});
export interface AutocompleteGroupLabelProps
  extends Omit<React.ComponentProps<typeof AutocompletePrimitive.GroupLabel>, 'color'> {
  aui?: AutocompleteGroupLabelAui;
}
const AutocompleteGroupLabel = React.forwardRef<HTMLDivElement, AutocompleteGroupLabelProps>(
  function AutocompleteGroupLabel({ aui, ...rest }, ref) {
    const merged = useMergedAutocompletePartAui(aui);
    return React.createElement(_AutocompleteGroupLabel as React.ElementType, { ref, ...rest, aui: merged });
  },
);
AutocompleteGroupLabel.displayName = 'Autocomplete.GroupLabel';

const AutocompleteRow = createAtomicPart<React.ComponentProps<typeof AutocompletePrimitive.Row>>(
  AutocompletePrimitive.Row,
  'aui-autocomplete-row',
);
AutocompleteRow.displayName = 'Autocomplete.Row';
export type AutocompleteRowProps = React.ComponentProps<typeof AutocompleteRow>;

const AutocompleteArrow = createAtomicPart<React.ComponentProps<typeof AutocompletePrimitive.Arrow>>(
  AutocompletePrimitive.Arrow,
  'aui-autocomplete-arrow',
);
AutocompleteArrow.displayName = 'Autocomplete.Arrow';
export type AutocompleteArrowProps = React.ComponentProps<typeof AutocompleteArrow>;

// Separator — a marker-tier part (VERIFIED-SAME: Select.Separator `select.tsx:640-645`,
// Combobox.Separator `combobox.tsx:1055-1060`, Dropdown.Separator `dropdown.tsx:610-620` — each
// wraps the SAME shared `@base-ui/react/separator` component under their own `aui-<x>-separator`
// marker, since none of those namespaces ship a distinct Separator of their own — `Select`'s
// `index.parts.js` re-exports it verbatim from `../separator/Separator.js`). Autocomplete's
// installed namespace has no `separator` submodule either (only `trigger`/`value`/`clear`/
// `input-group`/`item`/`root` — confirmed via `node_modules/@base-ui/react/autocomplete`), so it
// shipped the raw passthrough with NO marker/CSS hook — the one outlier of the four. Wrapped here
// to match; the underlying component is identical, so behavior/props are unchanged, only the
// class + displayName differ (no longer reference-identical to the raw `Separator` import).
const AutocompleteSeparator = createAtomicPart<React.ComponentProps<typeof Separator>>(
  Separator,
  'aui-autocomplete-separator',
);
AutocompleteSeparator.displayName = 'Autocomplete.Separator';
export type AutocompleteSeparatorProps = React.ComponentProps<typeof AutocompleteSeparator>;

// ─── InlineLayout — the inline-mode structural column (Root-synthesized) ────────
// Root emits exactly one of these around its children when `inline` is true (never composed
// directly by a consumer — see the doc). A cascade-reader leaf (`AUTOCOMPLETE_INLINE_LAYOUT_VOCAB`
// — use-recipe.ts): unpainted/layout-only by default (the rail keeps sitting on the page
// background — the painted results card is `AutocompleteInlineCard`, below). `aui.inlineLayout` on
// Root remains a real override escape hatch. Exported publicly for typing/inspection, mirroring
// `List`/`Group`/`Row`/`Arrow`.
const _AutocompleteInlineLayout = createAtomicComponent('div', {
  extensions: [useScaleCascade, useAutocompleteInlineLayoutRecipe],
});
export interface AutocompleteInlineLayoutProps extends React.ComponentPropsWithoutRef<'div'> {
  aui?: AutocompleteInlineLayoutAui;
}
const AutocompleteInlineLayout = React.forwardRef<HTMLDivElement, AutocompleteInlineLayoutProps>(
  function AutocompleteInlineLayout({ aui, ...rest }, ref) {
    const merged = useMergedAutocompletePartAui(aui);
    return React.createElement(_AutocompleteInlineLayout as React.ElementType, { ref, ...rest, aui: merged });
  },
);
AutocompleteInlineLayout.displayName = 'Autocomplete.InlineLayout';

// ─── InlineCard — the inline-mode results card (Root-synthesized) ────────────────
// Root wraps [Status, Empty, List] specifically (never InputGroup) in exactly one of these —
// `AUTOCOMPLETE_INLINE_CARD_VOCAB` (use-recipe.ts) — so the "No matches."/result rows read as ONE
// card, matching the floating Popup's anatomy (round 3, USER BUG FIX: round 2 painted List alone,
// leaving Status/Empty as loose page-background siblings and showing an empty painted bar at zero
// items). `aui.inlineCard` on Root is the override escape hatch, same shape as `inlineLayout`.
// Exported publicly for typing/inspection; never composed directly by a consumer.
//
// SCROLL PARITY (round 4, PIN — user): InlineCard must be the SAME fleet ScrollArea shape Popup
// already ships — one always-on DS ScrollArea wrap (`ScrollAreaPrimitive.Root` + View's Viewport/
// Scrollbar), parameterized by a composed `Autocomplete.ScrollArea` sentinel, byte-identical
// mechanism to `AutocompletePopup` below (same `findPartChild` detection, same root-thumb-style
// derivation). Inline has NO floating-ui anchor, so there is no `--available-height` measurement
// to intersect against (Popup's `min(maxHeight, --available-height)` — the second term is always
// unset here) — `maxHeight` alone bounds it, reusing the SAME `--aui-popup-max-block-size` hook
// Popup writes, for one shared CSS contract. No prop = no bound (matches Popup's own default
// behavior when its `maxHeight` is omitted — unbounded until something else clips it).
const _AutocompleteInlineCard = createAtomicComponent('div', {
  extensions: [useScaleCascade, useAutocompleteInlineCardRecipe],
});
export interface AutocompleteInlineCardProps extends React.ComponentPropsWithoutRef<'div'> {
  aui?: AutocompleteInlineCardAui;
  maxHeight?: number | string;
}
const AutocompleteInlineCard = React.forwardRef<HTMLDivElement, AutocompleteInlineCardProps>(
  function AutocompleteInlineCard({ aui, maxHeight, style, children, ...rest }, ref) {
    const merged = useMergedAutocompletePartAui(aui);
    const heightStyle = {
      ...(maxHeight != null
        ? { '--aui-popup-max-block-size': typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }
        : {}),
    } as React.CSSProperties;
    const mergedStyle = { ...heightStyle, ...style } as React.CSSProperties;

    const scrollAreaPart = findPartChild(children, AutocompleteScrollArea);
    const scrollAreaProps = scrollAreaPart?.props as AutocompleteScrollAreaProps | undefined;
    const rootThumbStyle = {
      ...(scrollAreaProps?.scrollbarSize != null
        ? { '--aui-scrollbar-size': typeof scrollAreaProps.scrollbarSize === 'number' ? `var(--p-px-${scrollAreaProps.scrollbarSize})` : scrollAreaProps.scrollbarSize }
        : {}),
      ...(scrollAreaProps?.scrollbarThumbHover != null ? { '--aui-scrollbar-thumb-hover': scrollAreaProps.scrollbarThumbHover } : {}),
    } as React.CSSProperties;

    return React.createElement(
      _AutocompleteInlineCard as React.ElementType,
      { ref, ...rest, aui: merged, style: mergedStyle },
      React.createElement(
        ScrollAreaPrimitive.Root as React.ElementType,
        Object.keys(rootThumbStyle).length > 0 ? { style: rootThumbStyle } : null,
        React.createElement(
          ViewScrollAreaViewport,
          { style: { maxBlockSize: AUTOCOMPLETE_SCROLL_MAX_BLOCK_SIZE, overflowX: 'hidden' } as React.CSSProperties },
          children,
        ),
        React.createElement(ViewScrollAreaScrollbar, {
          orientation: 'vertical',
          ...(scrollAreaProps?.scrollbarColor != null ? { thumbColor: scrollAreaProps.scrollbarColor } : {}),
        }),
      ),
    );
  },
);
AutocompleteInlineCard.displayName = 'Autocomplete.InlineCard';

// Shallow, Fragment-unwrapping child partition — the `hasPartChild`/`findPartChild` precedent
// (`core/factory/create-atomic-part.tsx`), not a recursive slot-scan. Splits Root's inline children
// into the InputGroup(s) (stay on the page background, siblings of the card) and everything else
// (Status/Empty/List — go inside `AutocompleteInlineCard`), matching the doc's own composition
// contract ("compose Status, Empty, and List directly under Root" in inline mode).
function partitionInlineChildren(
  children: React.ReactNode,
): { inputGroup: React.ReactNode[]; results: React.ReactNode[] } {
  const inputGroup: React.ReactNode[] = [];
  const results: React.ReactNode[] = [];
  const visit = (nodes: React.ReactNode) => {
    React.Children.forEach(nodes, (child) => {
      if (!React.isValidElement(child)) {
        if (child !== null && child !== undefined && child !== false) results.push(child);
        return;
      }
      if (child.type === React.Fragment) {
        visit((child.props as { children?: React.ReactNode }).children);
        return;
      }
      if (child.type === AutocompleteInputGroup) {
        inputGroup.push(child);
        return;
      }
      results.push(child);
    });
  };
  visit(children);
  return { inputGroup, results };
}

// ─── Root and namespace ──────────────────────────────────────────────────────
export type AutocompleteRootAui = {
  scale?: AutocompleteScale;
  inlineLayout?: AutocompleteInlineLayoutAui;
  inlineCard?: AutocompleteInlineCardAui;
};
// Preserve Base UI's flat and grouped item overloads; AtomicAUI adds the scale
// seed and owns the structural column only when the public inline layout is on.
type GroupedItems = readonly { items: readonly unknown[] }[];

type AutocompleteMode = 'list' | 'both' | 'inline' | 'none';

// Resolves `filterOnType`/`previewOnHighlight` (or an explicit `mode`) to the underlying Base UI
// `mode` enum — see the `AutocompleteRootProps` doc comment above for the mapping + precedence law.
function resolveAutocompleteMode(
  mode: AutocompleteMode | undefined,
  filterOnType: boolean | undefined,
  previewOnHighlight: boolean | undefined,
): AutocompleteMode | undefined {
  if (mode !== undefined) {
    if (
      process.env.NODE_ENV !== 'production' &&
      (filterOnType !== undefined || previewOnHighlight !== undefined)
    ) {
      console.warn(
        '[Autocomplete] `mode` was set explicitly alongside `filterOnType`/`previewOnHighlight` — ' +
          '`mode` wins. Remove the boolean aliases or the explicit `mode` to silence this warning.',
      );
    }
    return mode;
  }
  if (filterOnType === undefined && previewOnHighlight === undefined) return undefined;
  const filters = filterOnType ?? true;
  const previews = previewOnHighlight ?? false;
  if (filters && previews) return 'both';
  if (filters) return 'list';
  if (previews) return 'inline';
  return 'none';
}

function AutocompleteRoot<Items extends GroupedItems>(
  props: Omit<AutocompleteRootProps<Items[number]['items'][number]>, 'items'> & {
    items: Items;
    aui?: AutocompleteRootAui;
  },
): React.JSX.Element;
function AutocompleteRoot<ItemValue>(
  props: AutocompleteRootProps<ItemValue> & { aui?: AutocompleteRootAui },
): React.JSX.Element;
function AutocompleteRoot(
  props: AutocompleteRootProps<unknown> & { aui?: AutocompleteRootAui },
): React.JSX.Element {
  const { aui, children, inline, mode, filterOnType, previewOnHighlight, ...rest } = props;
  const resolvedMode = resolveAutocompleteMode(
    mode as AutocompleteMode | undefined,
    filterOnType,
    previewOnHighlight,
  );
  // Base UI Root renders no host. CSS can style a wrapper but cannot create one
  // around the inline siblings, so this prop-driven structural branch is the
  // minimum needed to keep InputGroup and List independent of consumer layout.
  // InputGroup stays a direct InlineLayout child (page background); Status/Empty/List are
  // partitioned into one `AutocompleteInlineCard` (round 3 — see its comment above).
  const resolvedChildren = inline
    ? (() => {
        const { inputGroup, results } = partitionInlineChildren(children);
        // `Autocomplete.ScrollArea`'s `maxHeight` (inline-only — see its prop doc) bounds the
        // card, mirroring `Autocomplete.Popup`'s own `maxHeight` prop for floating mode.
        const scrollAreaPart = findPartChild(results, AutocompleteScrollArea);
        const inlineMaxHeight = (scrollAreaPart?.props as AutocompleteScrollAreaProps | undefined)?.maxHeight;
        return React.createElement(
          AutocompleteInlineLayout,
          { aui: aui?.inlineLayout },
          React.createElement(
            AuiScaleProvider,
            { value: aui?.scale },
            inputGroup,
            React.createElement(
              AutocompleteInlineCard,
              { aui: aui?.inlineCard, maxHeight: inlineMaxHeight },
              results,
            ),
          ),
        );
      })()
    : React.createElement(AuiScaleProvider, { value: aui?.scale }, children);
  return React.createElement(
    AutocompletePrimitive.Root,
    { ...rest, inline, mode: resolvedMode } as object,
    resolvedChildren,
  );
}
AutocompleteRoot.displayName = 'Autocomplete';

interface AutocompleteComponent {
  <Items extends GroupedItems>(
    props: Omit<AutocompleteRootProps<Items[number]['items'][number]>, 'items'> & {
      items: Items;
      aui?: AutocompleteRootAui;
    },
  ): React.JSX.Element;
  <ItemValue>(props: AutocompleteRootProps<ItemValue> & { aui?: AutocompleteRootAui }): React.JSX.Element;
  displayName?: string;
  Root: typeof AutocompleteRoot;
  Value: typeof AutocompleteValue;
  Trigger: typeof AutocompleteTrigger;
  Input: typeof AutocompleteInput;
  InputGroup: typeof AutocompleteInputGroup;
  Icon: typeof AutocompleteIcon;
  Clear: typeof AutocompleteClear;
  List: typeof AutocompleteList;
  InlineLayout: typeof AutocompleteInlineLayout;
  InlineCard: typeof AutocompleteInlineCard;
  Status: typeof AutocompleteStatus;
  Portal: typeof AutocompletePortal;
  Backdrop: typeof AutocompleteBackdrop;
  Positioner: typeof AutocompletePositioner;
  Popup: typeof AutocompletePopup;
  Arrow: typeof AutocompleteArrow;
  Group: typeof AutocompleteGroup;
  GroupLabel: typeof AutocompleteGroupLabel;
  Item: typeof AutocompleteItem;
  Row: typeof AutocompleteRow;
  Collection: typeof AutocompleteCollection;
  Empty: typeof AutocompleteEmpty;
  Separator: typeof AutocompleteSeparator;
  ScrollArea: typeof AutocompleteScrollArea;
  useFilter: typeof AutocompletePrimitive.useFilter;
  useFilteredItems: typeof AutocompletePrimitive.useFilteredItems;
}

export const Autocomplete = Object.assign(AutocompleteRoot, {
  Root: AutocompleteRoot,
  Value: AutocompleteValue,
  Trigger: AutocompleteTrigger,
  Input: AutocompleteInput,
  InputGroup: AutocompleteInputGroup,
  Icon: AutocompleteIcon,
  Clear: AutocompleteClear,
  List: AutocompleteList,
  InlineLayout: AutocompleteInlineLayout,
  InlineCard: AutocompleteInlineCard,
  Status: AutocompleteStatus,
  Portal: AutocompletePortal,
  Backdrop: AutocompleteBackdrop,
  Positioner: AutocompletePositioner,
  Popup: AutocompletePopup,
  Arrow: AutocompleteArrow,
  Group: AutocompleteGroup,
  GroupLabel: AutocompleteGroupLabel,
  Item: AutocompleteItem,
  Row: AutocompleteRow,
  Collection: AutocompleteCollection,
  Empty: AutocompleteEmpty,
  Separator: AutocompleteSeparator,
  ScrollArea: AutocompleteScrollArea,
  useFilter: AutocompletePrimitive.useFilter,
  useFilteredItems: AutocompletePrimitive.useFilteredItems,
}) as AutocompleteComponent;

export default Autocomplete;
