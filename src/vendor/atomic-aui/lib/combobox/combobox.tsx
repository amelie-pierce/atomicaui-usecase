// modules/design/atomic-aui/src/lib/combobox/combobox.tsx
//
// Round-5 REBUILD-FROM-REVERT — the Combobox control: wraps the INSTALLED `@base-ui/react/combobox`
// (v1.6.0). Nearest shipped siblings: Select (trigger/popup anatomy, matchTriggerWidth, the
// Positioner cascade re-stamp), Dropdown (popup stack — matchTriggerWidth verified-same at
// dropdown.tsx:333-352 / dropdown.spec.tsx:729-742), Field (the Field.Combobox re-export law), Chip
// (the chip slice composed via `profile:'chip'`). Base UI owns ALL behavior (Intl.Collator
// filtering, combobox/listbox/option ARIA, roving focus, floating placement, the hidden form
// input, the chip remove/clear reasons); we own appearance via per-part recipes (use-recipe.ts).
//
// We wrap the PUBLIC `Combobox.Root` (`ComboboxRoot`), never the `@internal` `AriaCombobox` — see
// the consume-doc's L28 narrowing note: the public root has NO filtering-mode `autoComplete` and NO
// `selectionMode` (drive multi via `multiple` only).
import * as React from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';
import { useLabelableContext, useLabelableId } from '@base-ui/react/internals/labelable-provider';
import { createAtomicComponent } from '../../core/factory/create-atomic-component';
import { createAtomicPart, hasPartChild, findPartChild, type PartStyleProps } from '../../core/factory/create-atomic-part';
import { FRAME_PART_SX_AXES } from '../../core/recipe/part-classes';
import { useStateLayer } from '../../core/state/use-state-layer';
import { prependMarkerClassName } from '../../core/recipe/prepend-marker-class-name';
import { warnIfNoAccessibleName } from '../../core/a11y/warn-if-no-accessible-name';
import { ContainedIcon, type ContainedIconProps } from '../icon';
import { guardTabIndexForAriaHidden } from '../icon/icon-a11y';
import { useAuiIdentity, identityToDataAttrs } from '../identity';
import { Chip, CHIP_DEFAULT_SCALE, type ChipAui } from '../chip';
import { IconButton, ICON_BUTTON_DEFAULTS, type IconButtonAui } from '../icon-button';
import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import {
  ScrollAreaViewport as ViewScrollAreaViewport,
  ScrollAreaScrollbar as ViewScrollAreaScrollbar,
} from '../view';
import type { ScrollAreaThumbColor } from '../view';
import {
  AuiScaleProvider,
  useAuiScale,
  useScaleCascade,
  resolveAuiScale,
} from '../scale-cascade/use-aui-scale';
import {
  useComboboxInputGroupRecipe,
  useComboboxInputRecipe,
  useComboboxTriggerRecipe,
  useComboboxPopupRecipe,
  useComboboxItemRecipe,
  useComboboxEmptyRecipe,
  useComboboxStatusRecipe,
  useComboboxGroupLabelRecipe,
  COMBOBOX_TRIGGER_VOCAB,
  COMBOBOX_ITEM_VOCAB,
} from './use-recipe';
import type {
  ComboboxInputGroupAui,
  ComboboxInputAui,
  ComboboxTriggerAui,
  ComboboxPopupAui,
  ComboboxItemAui,
  ComboboxEmptyAui,
  ComboboxStatusAui,
  ComboboxGroupLabelAui,
  ComboboxScale,
} from './use-recipe';
import { useFieldAui, type FieldResolvedAui } from '../field/field-context';

// ─── Field-axis forwarding (2026-07-11 USER DECISION — fleet-wide, PINNED) ────────────────────────
// Popup-family parity audit finding #2 (`_vaults/atomicaui/raw/2026-07-11-popup-family-parity-audit.md`,
// row 11): Autocomplete forwards the Field ambient `aui` (color/shape/elevation/sx — scale already
// cascades via the separate `AuiScaleProvider` rail seeded below) to EVERY DOM-bearing part
// (`useMergedAutocompletePartAui`, `autocomplete.tsx:84-105`); Combobox forwarded scale ONLY (the
// field.tsx:1011-1013 doc comment documented this as a known gap). Scale-only forwarding is the
// defect, not the law — this mirrors Autocomplete's shape exactly (own-axis-wins: an explicit part
// `aui.color`/`.shape`/`.elevation`/`.sx` is never clobbered). `Field.Combobox` (field.tsx) already
// re-provides `FieldAuiContext` around `Combobox.Root`, so no change is needed there — only the parts
// below need to read it.
type FieldMergeableAui = {
  color?: unknown;
  shape?: unknown;
  elevation?: unknown;
  sx?: unknown;
};

function mergeComboboxFieldAxes<A extends FieldMergeableAui>(
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

function useComboboxFieldMergedAui<A extends FieldMergeableAui>(aui: A | undefined): A {
  const inherited = useFieldAui();
  return React.useMemo(() => mergeComboboxFieldAxes(inherited, aui), [inherited, aui]);
}

// ─── Stateful Field-axis forwarding — Combobox.Item ONLY (2026-07-11 USER DECISION, widened) ──────
// COMBOBOX_ITEM_VOCAB reuses SELECT_ITEM_VOCAB's family verbatim and pins the SAME deliberate
// per-state look (selected = `raised`/`solid`, a fixed selection affordance, this same session).
// The naive top-level merge above (`mergeComboboxFieldAxes`) lands ABOVE `vocab.states` in
// `buildLeafClasses`' layering, so applying it to `Combobox.Item` would silently override the
// PINNED selected fill under an ambient Field color. Mirrors `select.tsx`'s
// `mergeSelectItemFieldAui` exactly: ambient color/shape/elevation reach ONLY the `unselected`
// (resting) state, synthesized as `aui.states.unselected` merged UNDER the consumer's own
// `states.unselected`; the selected state is untouched by ambient (a consumer's own top-level or
// `aui.states.selected` override still reaches it, unaffected). `sx` still merges at the top level.
// GATING (own-axis-wins, not just own-state-wins): an ambient axis is injected into
// `states.unselected` ONLY when the consumer's OWN TOP-LEVEL `aui` does NOT already set that axis
// — `states[active]` is the HIGHEST layer, so an ungated injection would beat even a consumer's
// own top-level `aui.color`, which must never lose to ambient.
function mergeComboboxItemFieldAui(
  inherited: FieldResolvedAui,
  own: ComboboxItemAui | undefined,
): ComboboxItemAui {
  const ambientUnselected: Record<string, unknown> = {};
  if (own?.color === undefined && inherited.color !== undefined) ambientUnselected.color = inherited.color;
  if (own?.shape === undefined && inherited.shape !== undefined) ambientUnselected.shape = inherited.shape;
  if (own?.elevation === undefined && inherited.elevation !== undefined) ambientUnselected.elevation = inherited.elevation;
  const ownUnselected = (own?.states as { unselected?: object } | undefined)?.unselected;
  const out: ComboboxItemAui = { ...own };
  if (Object.keys(ambientUnselected).length > 0 || ownUnselected) {
    out.states = {
      ...own?.states,
      unselected: { ...ambientUnselected, ...ownUnselected },
    } as ComboboxItemAui['states'];
  }
  const ownSx = (own as { sx?: object } | undefined)?.sx;
  if (inherited.sx !== undefined || ownSx !== undefined) {
    out.sx = { ...(inherited.sx as object | undefined), ...ownSx } as ComboboxItemAui['sx'];
  }
  return out;
}

function useComboboxItemFieldMergedAui(aui: ComboboxItemAui | undefined): ComboboxItemAui {
  const inherited = useFieldAui();
  return React.useMemo(() => mergeComboboxItemFieldAui(inherited, aui), [inherited, aui]);
}

// Re-export the Base UI Root prop shape verbatim (the full value/input/filter model + the `| null`
// single-select clear-signal, `multiple`, name/required/disabled/readOnly, open-state, object-value
// helpers). We do NOT narrow or shim it — `ComboboxRoot` (the PUBLIC surface) already narrows the
// `@internal` `AriaCombobox` (drops the filtering-mode `autoComplete` + `selectionMode` — L28).
export type { ComboboxRootProps } from '@base-ui/react/combobox';
import type { ComboboxRootProps } from '@base-ui/react/combobox';

export type {
  ComboboxInputGroupAui,
  ComboboxInputAui,
  ComboboxTriggerAui,
  ComboboxPopupAui,
  ComboboxItemAui,
  ComboboxColor,
  ComboboxPaint,
  ComboboxScale,
  ComboboxShape,
} from './use-recipe';

/** Join `aria-labelledby` id sources (the Field label + any explicit consumer value), dropping
 *  empties. Installed Base UI 1.6.0 `AriaCombobox` owns Field registration, and its
 *  `ComboboxInput` already reads the ambient Field label context. This helper preserves the Atomic
 *  wrapper's existing seam by joining a consumer value with the Field label before forwarding it. */
function resolveAriaLabelledBy(...ids: (string | undefined)[]): string | undefined {
  const joined = ids.filter((x): x is string => typeof x === 'string' && x.length > 0).join(' ');
  return joined.length > 0 ? joined : undefined;
}

// ─── Combobox.Label — marker-only (Base UI: labels Combobox.Trigger only) ─────────
// Base UI's own `Combobox.Label` dev-warns when the field control is `Combobox.Input` (not
// `Trigger`): "use a native <label> or <Field.Label> instead." Kept SHIP per the matrix
// (sibling parity w/ the pre-removal Select.Label shape) as a marker-only pass-through; the
// primary label path for the typing-surface composition is `Field.Label` (see Field.Combobox).
const ComboboxLabel = createAtomicPart<React.ComponentProps<typeof ComboboxPrimitive.Label>>(
  ComboboxPrimitive.Label,
  'aui-combobox-label',
);
ComboboxLabel.displayName = 'Combobox.Label';
export type ComboboxLabelProps = React.ComponentProps<typeof ComboboxLabel>;

// ─── Combobox.Value — tier-1 cascade-reader (marker only, no aui) ─────────────────
// The single-select display span (overridden by Chips in multiple mode) — mirrors
// `Select.Value` exactly (a plain `createAtomicPart` over the Base UI render-prop part).
const ComboboxValue = createAtomicPart<React.ComponentProps<typeof ComboboxPrimitive.Value>>(
  ComboboxPrimitive.Value,
  'aui-combobox-value',
);
ComboboxValue.displayName = 'Combobox.Value';
export type ComboboxValueProps = React.ComponentProps<typeof ComboboxValue>;

// ─── Combobox.InputGroup — the rail (Base-UI-context-disabled frame) ──────────────
const _ComboboxInputGroup = createAtomicComponent(ComboboxPrimitive.InputGroup, {
  extensions: [useScaleCascade, useComboboxInputGroupRecipe],
});

export interface ComboboxInputGroupProps
  extends Omit<React.ComponentProps<typeof ComboboxPrimitive.InputGroup>, 'color'> {
  /** Unified customisation object: context axes (color/paint/scale/shape) + the FULL-frame `sx`
   *  surface. `ComboboxInputGroup` carries NO own `disabled` prop (Base UI merges it purely from
   *  the Root's context) — the recipe reads Base UI's render STATE, never `props.disabled`. */
  aui?: ComboboxInputGroupAui;
}

const ComboboxInputGroup = React.forwardRef<HTMLDivElement, ComboboxInputGroupProps>(
  function ComboboxInputGroup({ aui, ...rest }, ref) {
    // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
    // rail's own `aui` — own axis always wins.
    const mergedAui = useComboboxFieldMergedAui(aui);
    return React.createElement(_ComboboxInputGroup as React.ElementType, { ref, ...rest, aui: mergedAui });
  },
);
ComboboxInputGroup.displayName = 'Combobox.InputGroup';

// ─── Combobox.Input — the typing surface (CORE to the primary behavior) ──────────
const _ComboboxInput = createAtomicComponent(ComboboxPrimitive.Input, {
  extensions: [useScaleCascade, useComboboxInputRecipe],
});

export interface ComboboxInputProps
  extends Omit<React.ComponentProps<typeof ComboboxPrimitive.Input>, 'color'> {
  /** Unified customisation object — full-frame `aui` + `sx`. `shape` PINS `none` and `profile`
   *  PINS `no-padding` in the vocab defaults (the rail owns rounding + padding); an explicit
   *  override still wins. */
  aui?: ComboboxInputAui;
}

// Installed Base UI 1.6.0 `AriaCombobox` owns Field control registration, and its `ComboboxInput`
// already consumes the ambient Field label context. The Atomic wrapper keeps its existing explicit
// id/`aria-labelledby` stitching: `useLabelableId` resolves the forwarded input id, while the local
// helper preserves a consumer-provided `aria-labelledby` by joining it with the Field label.
// Outside a `<Field>`, the label context is empty and `useLabelableId` still returns a generated id.
const ComboboxInput = React.forwardRef<HTMLInputElement, ComboboxInputProps>(function ComboboxInput(
  { aui, id: idProp, 'aria-labelledby': ariaLabelledByProp, ...rest },
  ref,
) {
  const { labelId } = useLabelableContext();
  const id = useLabelableId({ id: idProp as string | undefined });
  const ariaLabelledBy = resolveAriaLabelledBy(ariaLabelledByProp as string | undefined, labelId);
  // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
  // input's own `aui` — own axis always wins.
  const mergedAui = useComboboxFieldMergedAui(aui);
  return React.createElement(_ComboboxInput as React.ElementType, {
    ref,
    id,
    'aria-labelledby': ariaLabelledBy,
    ...rest,
    aui: mergedAui,
  });
});
ComboboxInput.displayName = 'Combobox.Input';

// ─── Combobox.Trigger — the open control (trigger-toggle: open ⇒ selected) ────────
const _ComboboxTrigger = createAtomicComponent(ComboboxPrimitive.Trigger, {
  extensions: [useScaleCascade, useStateLayer, useComboboxTriggerRecipe],
});

export interface ComboboxTriggerProps
  extends Omit<React.ComponentProps<typeof ComboboxPrimitive.Trigger>, 'color'> {
  aui?: ComboboxTriggerAui;
}

// Same labelable self-registration as Combobox.Input (Base UI's `ComboboxTrigger` calls
// `useLabelableId` internally too, but DISCARDS the return value — it never becomes the rendered
// `id`, so a Field.Label's `htmlFor`/`aria-labelledby` target would drift; we wire it explicitly,
// mirroring Field.DatepickerTrigger).
const ComboboxTrigger = React.forwardRef<HTMLButtonElement, ComboboxTriggerProps>(
  function ComboboxTrigger({ id: idProp, 'aria-labelledby': ariaLabelledByProp, children, aui, ...rest }, ref) {
    const { labelId } = useLabelableContext();
    const id = useLabelableId({ id: idProp as string | undefined });
    const ariaLabelledBy = resolveAriaLabelledBy(ariaLabelledByProp as string | undefined, labelId);
    if (process.env.NODE_ENV !== 'production') {
      warnIfNoAccessibleName(children, { ...rest, 'aria-labelledby': ariaLabelledBy }, 'Combobox.Trigger');
    }
    // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
    // trigger's own `aui` — own axis always wins.
    const mergedAui = useComboboxFieldMergedAui(aui);
    return React.createElement(
      _ComboboxTrigger as React.ElementType,
      { ref, id, 'aria-labelledby': ariaLabelledBy, ...rest, aui: mergedAui },
      children,
    );
  },
);
ComboboxTrigger.displayName = 'Combobox.Trigger';

// ─── Combobox.Icon — a placeable general icon (ContainedIcon, IDENTICAL to Select.Icon) ───
// The trigger indicator glyph — a thin `ContainedIcon` wrapper defaulting `profile: 'contained'`
// (a leading/inline icon sits SNUG in the row, the in-row icon convention). Sizes to the Trigger's
// EFFECTIVE tier: own `aui.scale` ?? the Combobox scale cascade ?? the Trigger vocab default (READ
// the vocab default, never a literal — G15). Sibling-parity REQUIRED row (round-3 defect #6: a
// 44px indicator column vs Select's 8px trailing) — structurally mirrors `Select.Icon`
// (select.tsx:70-93), but see the USER DIRECTIVE 12 correction below on the `profile` default.
//
// CHEVRON ROTATION (USER DIRECTIVE 6, 2026-07-10): Select/Dropdown rotate their disclosure chevron
// via a SEPARATE `*.Chevron` part (the shared `createChevronPart` family) whose `data-aui-rotate`
// marker disambiguates "the auto-injected default glyph" from "custom composed content" — Combobox
// has no such ambiguity to resolve (there is no auto-injected default; a consumer ALWAYS explicitly
// composes `<Combobox.Icon name="…"/>`), so adopting the full chevron-family machinery would
// duplicate a disambiguation Combobox doesn't need. Instead: a STABLE marker class
// (`aui-combobox-icon`, prepended alongside ContainedIcon's own `aui-contained-icon`) gives
// `_state-cascade.scss` the SAME kind of CSS hook — `.aui-combobox-trigger[data-popup-open]
// .aui-combobox-icon { transform: rotate(180deg) }`, the IDENTICAL selector shape + transition
// timing as `.aui-select-trigger[data-popup-open] .aui-select-chevron[data-aui-rotate]`
// (`_state-cascade.scss:793`) — `data-popup-open` is Base UI's own stamp on the Trigger
// (`ComboboxTriggerDataAttributes.d.ts`, verified present), so no TS is needed for that half; only
// the marker class (this one line) is the "no TS unless the attr isn't stamped" exception, and it's
// justified by the composed-vs-auto-injected difference above.
//
// GLYPH VERTICAL CENTERING FIX (USER DIRECTIVE 12, 2026-07-10) — root-caused, not a magic offset:
// grepped EVERY usage of `Combobox.Icon` in the repo (demos, spec, Configurator) — 100% are
// `name="chevron-down"` composed inside `Trigger`; there is no OTHER usage. So despite the
// structural mirror of `Select.Icon` above, `Combobox.Icon`'s REAL role is `Select.Chevron`'s role
// (the disclosure indicator), not `Select.Icon`'s (a free-floating placeable icon) — and the shared
// chevron family's own default renderer (`defaultChevron`, `families/chevron/default-chevron.tsx:22`
// — what Select.Chevron/Dropdown.Chevron/etc. all render) NEVER sets a `profile` on its inner
// `ContainedIcon`, letting it stay UNPROFILED. `profile: 'contained'` (this file's prior default) was
// wrong for that role: `build-icon-classes.ts:187-190` only emits the `aui-icon-lh-<tier>` class
// (sets `--aui-line-height-context`, the mechanism that sizes the icon's container to the FONT's own
// line-height so an icon-font glyph's baseline-relative ink sits centered) for an UNPROFILED icon —
// a profiled icon's box size comes from the profile's OWN `--aui-icon-container` token instead, which
// does not track the font's baseline metrics. FIX: stop forcing `profile: 'contained'` — let it fall
// through unprofiled (`ContainedIcon`'s own default), VERIFIED-SAME with `defaultChevron`
// (`default-chevron.tsx:22`, `aui={{ scale, ...aui }}` — profile never set). A consumer can still opt
// back into a profile via `aui.profile` (own-axis-wins, unchanged).
//
// NUMERIC ink-centroid measurement (pixel-scan, not eyeballed — a padded-crop attempt was
// contaminated by the InputGroup rail's border bleeding in; the zero-pad re-measurement below is the
// trustworthy one): closed-state ink-vs-box-center offset is 0–1px at every tier, BYTE-IDENTICAL to
// Select's own chevron (same computed font-size/line-height/box at every tier) — the centering fix
// above is confirmed correct and is NOT what USER DIRECTIVE 12's re-open screenshots were showing.
//
// BOX-SIZE PIN (PF-R5-5, parked cross-cutting root cause — 2026-07-10): the ORIGINAL claim here
// ("the profiled and unprofiled box resolve to the identical 20×20 at sm") was true at `sm` but
// INCOMPLETE — checked only one tier. Full per-tier sweep: `Combobox.Icon`'s unprofiled box tracks
// `--aui-line-height-context` (a typography-line-height token) while `Combobox.Clear`'s IconButton
// tracks `--aui-min-width` (a 200-scale token) — the two token scales coincide at xs/sm/md (16/20/22
// both) but DIVERGE at lg/xl (24 vs 28, 28 vs 32) because `ContainedIcon`'s own box formula is
// `max(--aui-icon-container, --aui-min-width)` and `--aui-icon-container: var(--aui-line-height-
// context)` (`_state-cascade.scss`/`_200-scale.scss`) wins that `max()` at the larger tiers. VERIFIED
// this is NOT caused by the profile-removal fix above (forcing `profile:'contained'` back via the
// Configurator reproduces the identical mismatch) and is NOT Combobox-specific (Select's own bolt
// `Select.Icon`, same profile, shows the identical divergence — it just never surfaces visually
// because Select never puts a bare ContainedIcon beside an IconButton in the same row). The SHARED
// root (the `--aui-icon-container`/`--aui-min-width` divergence in `_icon.scss`/`build-icon-
// classes.ts`) is OUTSIDE this file's scope (core recipe engine, not Combobox-local) — PARKED as
// PF-R5-5 for a cross-cutting fix. USER DECISION: pin LOCALLY here so the chevron box matches
// `Combobox.Clear`'s box at every tier NOW (two differently-sized icon-affordances side by side in
// the SAME rail reads as "broken" regardless of whether each glyph is centered within its own box —
// confirmed via user screenshots). The pin below reads the SAME `--p-px-<n>` literals the `contained`
// profile's OWN `--aui-min-width` cascade already sets per tier (`_200-scale.scss:406-505`) — remove
// this pin + the lookup below once PF-R5-5 lands the shared fix (the box-size table in the correction
// lane's run-log entry documents WHY these exact numbers were chosen, for whoever picks that up).
const COMBOBOX_ICON_BOX_PIN_TIER: Record<ComboboxScale, string> = {
  xs: '16',
  sm: '20',
  md: '22',
  lg: '24',
  xl: '28',
};
export type ComboboxIconProps = ContainedIconProps;
const ComboboxIcon = React.forwardRef<HTMLSpanElement, ComboboxIconProps>(function ComboboxIcon(
  { aui, className, ...rest },
  ref,
) {
  const inheritedScale = useAuiScale();
  const resolvedScale = resolveAuiScale(
    aui?.scale,
    inheritedScale,
    COMBOBOX_TRIGGER_VOCAB.defaults.scale as ComboboxScale,
  );
  const resolvedAui = React.useMemo(
    () => ({ ...aui, scale: resolvedScale }),
    [aui, resolvedScale],
  );
  const markerClassName = prependMarkerClassName('aui-combobox-icon', className as string | undefined) as
    | string
    | undefined;
  // PF-R5-5 box-size pin (see the comment block above): `aui.sx.width`/`.minWidth` can't express this
  // — the generated `AuiWidthValue`/`AuiMinWidthValue` utility scales skip `22` (jump 20→24), so `md`
  // is unreachable through the sx axis. Override the CUSTOM PROPERTY the box's own min-size formula
  // reads (`min-inline-size: max(var(--aui-icon-container), var(--aui-min-width))`,
  // `_icon.scss:132-134`) directly via inline `style` instead — pinning `--aui-icon-container` to the
  // SAME px Clear/Trigger's `--aui-min-width` resolves to makes the `max()` land on that value at
  // every tier, INCLUDING `22`, since a raw px string has no utility-scale gap. Inline style wins over
  // the class-cascaded custom property by source order (same technique as the ScrollArea `overflowX`
  // fix, USER DIRECTIVE 5) — never fights the `aui-icon-lh-<tier>` class, it just overrides what THAT
  // class's `--aui-line-height-context` would otherwise feed into `--aui-icon-container`.
  const pinnedPx = `${COMBOBOX_ICON_BOX_PIN_TIER[resolvedScale]}px`;
  const style = {
    ...(rest as { style?: React.CSSProperties }).style,
    '--aui-icon-container': pinnedPx,
  } as React.CSSProperties;
  return <ContainedIcon ref={ref} {...rest} style={style} className={markerClassName} aui={resolvedAui} />;
});
ComboboxIcon.displayName = 'Combobox.Icon';

// ─── Combobox.Portal — structural passthrough (IDENTICAL to Select.Portal) ────────
const ComboboxPortal = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ComboboxPrimitive.Portal>
>(function ComboboxPortal(props, ref) {
  return React.createElement(ComboboxPrimitive.Portal as React.ElementType, { ref, ...props });
});
ComboboxPortal.displayName = 'Combobox.Portal';
export type ComboboxPortalProps = React.ComponentProps<typeof ComboboxPortal>;

// ─── Combobox.Backdrop — portaled overlay marker + identity re-stamp ──────────────
// Mirrors Select.Backdrop verbatim (select.tsx:246-262) — Backdrop can be a Portal SIBLING of
// Positioner, so it cannot rely on Positioner to re-root theme variables.
const ComboboxBackdrop = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ComboboxPrimitive.Backdrop>
>(function ComboboxBackdrop({ className, ...rest }, ref) {
  const identity = useAuiIdentity();
  const dataAttrs = identityToDataAttrs(identity);
  return React.createElement(ComboboxPrimitive.Backdrop as React.ElementType, {
    ref,
    'data-aui-popup-motion': 'backdrop',
    ...rest,
    ...dataAttrs,
    className: prependMarkerClassName('aui-combobox-backdrop', className),
  });
});
ComboboxBackdrop.displayName = 'Combobox.Backdrop';
export type ComboboxBackdropProps = React.ComponentProps<typeof ComboboxBackdrop>;

// ─── Combobox.Positioner — THE cascade re-stamp (CRITICAL — required row) ─────────
// WITHOUT this, the portaled Popup + Items paint UNSTYLED (the risk Lane 0 threaded to this lane:
// a portaled overlay renders OUTSIDE the themed root, so the `--theme-*`/`--paint-*` rails never
// reach it). Mirrors `Select.Positioner` verbatim (select.tsx:264-297) — reads the ambient identity
// via `useAuiIdentity()` and RE-STAMPS the same `data-aui-*` attrs on the Base UI Positioner
// element, re-rooting the theme selector there. Precedence: a consumer-supplied `data-aui-*` is
// spread FIRST, the identity attrs LAST, so the ambient identity WINS.
const ComboboxPositioner = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ComboboxPrimitive.Positioner>
>(function ComboboxPositioner({ className, ...rest }, ref) {
  const identity = useAuiIdentity();
  const dataAttrs = identityToDataAttrs(identity);
  return React.createElement(ComboboxPrimitive.Positioner as React.ElementType, {
    ref,
    ...rest,
    ...dataAttrs,
    className: prependMarkerClassName('aui-combobox-positioner', className),
  });
});
ComboboxPositioner.displayName = 'Combobox.Positioner';
export type ComboboxPositionerProps = React.ComponentProps<typeof ComboboxPositioner>;

// ─── Combobox.Popup — tier-3 surface frame, NO useStateLayer (IDENTICAL mechanism to Select.Popup) ──
// Pins `elevation: 2` in COMBOBOX_POPUP_VOCAB.defaults (contract item 2 — NOT Select's 4).
// `profile: 'block-padding'` keeps the scale's block padding, zeroes inline (items own their own
// inline rail) — the open-surface profile shared with Select/Dropdown popups.
const _ComboboxPopup = createAtomicComponent(ComboboxPrimitive.Popup, {
  extensions: [useScaleCascade, useComboboxPopupRecipe],
});

// ─── Combobox.ScrollArea — CONFIG-CARRIER override for the built-in DS-scroll wrapper ────────────
// Fleet-parity shape (byte-for-byte the `Dropdown.ScrollArea`/`Select.ScrollArea` mechanism,
// `dropdown.tsx:310-336`, stabilized 2026-07-10) — a config sentinel (SAME detection mechanism as
// `Textarea.ScrollArea`, `textarea.tsx:169-172`/`findPartChild` at `:466`): renders NOTHING itself.
// Compose it as a SIBLING of the real Status/Empty/List content (never a replacement — Popup's
// children are the actual listbox, unlike Textarea's single-value child) to override the
// auto-rendered wrapper's DS-thumb styling WITHOUT the internal wrapper ever double-wrapping: Popup
// always renders EXACTLY one `ScrollArea.Root`/Viewport/Scrollbar; composing this part only
// PARAMETERIZES it (USER DIRECTIVE 3b — "a consumer-passed *.ScrollArea overrides the built-in
// one … never double-wrap"). NO `maxHeight`/`height` here — `Combobox.Popup` already has its own
// `maxHeight` prop; duplicating it would create two competing height knobs.
export interface ComboboxScrollAreaProps {
  /** DS scroll-thumb thickness — forwarded to the wrapping Scrollbar/Thumb (number → `--p-px-<n>`
   *  rail; string → verbatim). Unset = the CSS 8px fallback every AtomicAUI View.ScrollArea uses. */
  scrollbarSize?: number | string;
  /** Thumb HOVER color override — any CSS color; sets `--aui-scrollbar-thumb-hover`. */
  scrollbarThumbHover?: string;
  /** Resting thumb COLOR — the foreground anchor (same value space as `aui.sx.foreground`). Unset
   *  mirrors the ambient foreground. */
  scrollbarColor?: ScrollAreaThumbColor;
}
/** Config-carrier — never rendered. The parent `Combobox.Popup` reads its props to parameterize the
 *  always-on wrap; it contributes NO DOM (a bare `() => null`), so it is safe to compose alongside
 *  the real Status/Empty/List content with zero visual/structural side effect. */
const ComboboxScrollArea: React.FC<ComboboxScrollAreaProps> = () => null;
ComboboxScrollArea.displayName = 'Combobox.ScrollArea';

export interface ComboboxPopupProps
  extends Omit<React.ComponentProps<typeof ComboboxPrimitive.Popup>, 'color'> {
  aui?: ComboboxPopupAui;
  /** Match the popup width to the rail (anchor) width EXACTLY — the SAME mechanism proven for
   *  Dropdown/Select (dropdown.tsx:333-352 / dropdown.spec.tsx:729-742; select.tsx:317-322):
   *  injects `--aui-width: var(--anchor-width)`; Base UI sets the DPR-snapped `--anchor-width` on
   *  the Positioner and it inherits to the Popup. Round-3 defect #5 (118px popup on a 281px rail)
   *  is exactly this row. Structural boolean, NOT an `aui` axis — destructured out, never a DOM
   *  attr; consumer `style` wins.
   *
   *  **Defaults `true`** (USER DIRECTIVE 7, 2026-07-10 — diverges from Select's `false` default):
   *  Combobox's rail is a TYPING SURFACE, not a closed Select-style trigger — a user reads the popup
   *  as "the list under what I'm typing into," so it reads wrong at any width other than the rail's
   *  own. Select's popup can legitimately want its own content-driven width (a short trigger opening
   *  a wider list of long labels); Combobox's typing rail has no equivalent case for the mission's
   *  contract. Pass `matchTriggerWidth={false}` to opt back out to Select's floor. */
  matchTriggerWidth?: boolean;
  /** Cap the listbox height. UNSET (default) = AUTO: the popup fits the space between the rail and
   *  the viewport edge (`--available-height`) and scrolls. SET = SPECIFIED: cap at this height, but
   *  STILL shrink to the viewport so it never overflows (`min(maxHeight, available)`). Sets the
   *  `--aui-popup-max-block-size` hook — NOT an `aui` axis; destructured out, never a DOM attr;
   *  consumer `style` wins. Mirrors Select/Dropdown.Popup. */
  maxHeight?: number | string;
}

// ─── The ALWAYS-ON DS-scroll wrapper (fleet parity w/ Dropdown.Popup; USER DIRECTIVE 3, stabilized
// 2026-07-10) ──────────────────────────────────────────────────────────────────────────────────
// MANDATORY PRE-CHECK (the fleet lane's own lesson, re-run here): grepped installed
// `ComboboxPopup.js` + `ComboboxList.js` for `scrollTop`/`scrollHeight`/`onScroll`/`scrollIntoView`
// — ZERO matches (unlike `Select.Popup`'s `alignItemWithTrigger` choreography, which imperatively
// owns `scrollTop`/`onScroll` and made Select's wrapper opt-in). Combobox's Popup does NO
// imperative scroll/height management of its own — the SAME clean floor `Menu.Popup` (Dropdown) has
// — so it is SAFE to move scroll ownership one level down, always-on, unconditionally: Popup itself
// no longer scrolls (its native `overflow-y:auto` in `.aui-combobox-popup` is now INERT — nothing
// ever overflows Popup once its child clips), and a nested Base UI `ScrollArea.Root` (RAW/unstyled —
// Popup is already the `.aui-frame` surface, so the Root carries NO recipe) hosts the SAME styled
// `View.ScrollAreaViewport`/`ScrollAreaScrollbar` Dropdown/Textarea compose (the shared DS thumb,
// `--aui-scrollbar-size` CSS-default 8px, no extra props needed).
//
// The bound MOVES from Popup's own `max-block-size` to the Viewport's, computed from the SAME
// `--aui-popup-max-block-size` (the `maxHeight` prop hook, unchanged above) / `--available-height`
// (Base UI, set on the Positioner, inherits) pair Popup used to read directly — minus Popup's OWN
// resolved block padding (`--aui-padding-block-start`/`-end`, `@property inherits:true`, G14), so
// the wrapped content area matches the unwrapped popup's content-box: that padding used to be
// carved out of Popup's own max-block-size (border-box); now it must be carved out of the
// Viewport's cap instead, or the total popup height would grow by the padding amount. Popup's own
// `max-block-size` is neutralized inline (`maxBlockSize:'none'`) so the two bounds never
// double-clamp. Byte-identical formula to `DROPDOWN_SCROLL_MAX_BLOCK_SIZE` (`dropdown.tsx:378-382`).
const COMBOBOX_SCROLL_MAX_BLOCK_SIZE =
  'min(' +
  'calc(var(--aui-popup-max-block-size, 100vh) - var(--aui-padding-block-start, 0px) - var(--aui-padding-block-end, 0px)), ' +
  'calc(var(--available-height, 100vh) - var(--aui-padding-block-start, 0px) - var(--aui-padding-block-end, 0px))' +
  ')';

const ComboboxPopup = React.forwardRef<HTMLDivElement, ComboboxPopupProps>(function ComboboxPopup(
  { matchTriggerWidth = true, maxHeight, style, children, aui, ...rest },
  ref,
) {
  // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
  // popup's own `aui` — own axis always wins.
  const mergedAui = useComboboxFieldMergedAui(aui);
  // Inline hooks: the trigger-width match + the explicit height cap, PLUS the always-on neutralize
  // of Popup's own max-block-size (scroll ownership moved to the nested Viewport below).
  const widthStyle = {
    ...(matchTriggerWidth ? { '--aui-width': 'var(--anchor-width)' } : {}),
    ...(maxHeight != null
      ? { '--aui-popup-max-block-size': typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }
      : {}),
    maxBlockSize: 'none',
  } as React.CSSProperties;
  let mergedStyle: ComboboxPopupProps['style'] | undefined;
  if (typeof style === 'function') {
    const styleFn = style;
    mergedStyle = (state: unknown) =>
      ({ ...widthStyle, ...(styleFn as (s: unknown) => React.CSSProperties)(state) });
  } else {
    mergedStyle = { ...widthStyle, ...style };
  }

  // USER DIRECTIVE 3b — a composed `<Combobox.ScrollArea/>` OVERRIDES the built-in wrap's thumb
  // styling; it is a config-carrier SIBLING of the real content (renders null itself, so leaving it
  // in `children` costs nothing — no filtering needed). The wrapper NEVER double-wraps: exactly one
  // Root/Viewport/Scrollbar renders either way, only its props change.
  const scrollAreaPart = findPartChild(children, ComboboxScrollArea);
  const scrollAreaProps = scrollAreaPart?.props as ComboboxScrollAreaProps | undefined;
  const rootThumbStyle = {
    ...(scrollAreaProps?.scrollbarSize != null
      ? { '--aui-scrollbar-size': typeof scrollAreaProps.scrollbarSize === 'number' ? `var(--p-px-${scrollAreaProps.scrollbarSize})` : scrollAreaProps.scrollbarSize }
      : {}),
    ...(scrollAreaProps?.scrollbarThumbHover != null ? { '--aui-scrollbar-thumb-hover': scrollAreaProps.scrollbarThumbHover } : {}),
  } as React.CSSProperties;

  return React.createElement(
    _ComboboxPopup as React.ElementType,
    {
      ref,
      'data-aui-popup-motion': 'anchored',
      ...rest,
      style: mergedStyle,
      aui: mergedAui,
    },
    // The RAW Base UI ScrollArea.Root — context-only (no atomic recipe; Popup already IS the
    // frame). Its Scrollbar auto-renders NOTHING when the axis doesn't overflow (Base UI's own
    // gate), so a SHORT list is byte-for-byte inert (no visible bar, no layout change). Viewport
    // carries the (padding-aware) cap; Scrollbar is the shared DS thumb, PARAMETERIZED by a
    // composed `Combobox.ScrollArea` when present (never a second wrap).
    //
    // VERTICAL-ONLY (USER DIRECTIVE 5, 2026-07-10): `overflowX: 'hidden'` is a `style` PROP, not a
    // stylesheet rule — `.aui-view-scroll-area-viewport`'s own comment ("NEVER re-set overflow via
    // CSS; Base UI owns overflow:scroll inline; a class can't clip one axis") is load-bearing: Base
    // UI's `ScrollAreaViewport.js` sets `style:{overflow:'scroll'}` INLINE and merges consumer
    // `elementProps` LAST — so ONLY an inline longhand from OUR side can win that axis; no CSS
    // specificity beats an inline shorthand. Byte-identical mechanism to `dropdown.tsx:450-461` /
    // `select.tsx:489+` (the fleet-scroll lane's own retrofit) — only ONE Scrollbar is ever composed
    // below (`orientation:'vertical'`), so this longhand is what stops horizontal SCROLLING (not
    // just the bar) for an unwrappable token wider than the popup.
    React.createElement(
      ScrollAreaPrimitive.Root as React.ElementType,
      Object.keys(rootThumbStyle).length > 0 ? { style: rootThumbStyle } : null,
      React.createElement(
        ViewScrollAreaViewport,
        { style: { maxBlockSize: COMBOBOX_SCROLL_MAX_BLOCK_SIZE, overflowX: 'hidden' } as React.CSSProperties },
        children,
      ),
      React.createElement(ViewScrollAreaScrollbar, {
        orientation: 'vertical',
        ...(scrollAreaProps?.scrollbarColor != null ? { thumbColor: scrollAreaProps.scrollbarColor } : {}),
      }),
    ),
  );
});
ComboboxPopup.displayName = 'Combobox.Popup';

// ─── Combobox.List — tier-1 marker (option-list container) ────────────────────────
// Base UI's `List` NATIVELY supports a render-function child `(item, index) => ReactNode` (implicit
// `Collection` wrap — `ComboboxList.js`: "Support 'closed template' API: if children is a function,
// implicitly wrap it with a Combobox.Collection") — the canonical filtering path (contract item 0).
const ComboboxList = createAtomicPart<React.ComponentProps<typeof ComboboxPrimitive.List>>(
  ComboboxPrimitive.List,
  'aui-combobox-list',
);
ComboboxList.displayName = 'Combobox.List';
export type ComboboxListProps = React.ComponentProps<typeof ComboboxList>;

// ─── Combobox.Status / Combobox.Empty — G41 mounted live regions, NOW real leaves (USER DIRECTIVE 9,
// 2026-07-10) ──────────────────────────────────────────────────────────────────────────────────
// Both STAY MOUNTED per the installed typing's own doc comment ("Avoid hiding or removing the
// component itself with display:none/hidden/aria-hidden/conditional rendering") — the G41 CSS
// `:empty` collapse (`_state-cascade.scss`) handles the visual hide, keying off the marker class
// ALONE (a `:empty` pseudo-class checks child nodes, not classes — promoting these from a bare
// marker to a full `.aui-frame` recipe changes NOTHING about that collapse; verified by the spec's
// own `:empty` assertions below still passing). Were BARE marker-only wrappers ("renders a bare
// unstyled row" per the consume-doc, before this fix) — now full leaf frames (`createAtomicComponent`
// + a dedicated vocab, `use-recipe.ts`), like Popup/Trigger/Item, so a consumer gets the FULL `aui`
// AppearanceProps surface on an informational row exactly like every other part. NO `useStateLayer`
// (mirrors Popup — these are static text, not interactive/pressable surfaces).
const _ComboboxStatus = createAtomicComponent(ComboboxPrimitive.Status, {
  extensions: [useScaleCascade, useComboboxStatusRecipe],
});

export interface ComboboxStatusProps
  extends Omit<React.ComponentProps<typeof ComboboxPrimitive.Status>, 'color'> {
  aui?: ComboboxStatusAui;
}

const ComboboxStatus = React.forwardRef<HTMLDivElement, ComboboxStatusProps>(
  function ComboboxStatus({ aui, ...rest }, ref) {
    // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
    // status row's own `aui` — own axis always wins.
    const mergedAui = useComboboxFieldMergedAui(aui);
    return React.createElement(_ComboboxStatus as React.ElementType, { ref, ...rest, aui: mergedAui });
  },
);
ComboboxStatus.displayName = 'Combobox.Status';

const _ComboboxEmpty = createAtomicComponent(ComboboxPrimitive.Empty, {
  extensions: [useScaleCascade, useComboboxEmptyRecipe],
});

export interface ComboboxEmptyProps
  extends Omit<React.ComponentProps<typeof ComboboxPrimitive.Empty>, 'color'> {
  aui?: ComboboxEmptyAui;
}

const ComboboxEmpty = React.forwardRef<HTMLDivElement, ComboboxEmptyProps>(
  function ComboboxEmpty({ aui, ...rest }, ref) {
    // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
    // empty row's own `aui` — own axis always wins.
    const mergedAui = useComboboxFieldMergedAui(aui);
    return React.createElement(_ComboboxEmpty as React.ElementType, { ref, ...rest, aui: mergedAui });
  },
);
ComboboxEmpty.displayName = 'Combobox.Empty';

// ─── Combobox.Clear — the clear affordance (composes the REAL IconButton via `render`) ───────────
// Mirrors the Toast.Action/Close `render`-composition precedent (toast.tsx:326-358) — Base UI keeps
// the behavior (clears the query + value) while the VISUAL is genuinely our IconButton. Defaults
// `profile:'contained'`/`paint:'text'` — a borderless glyph snug in the row (the Chip.Dismiss
// convention). Requires an accessible name (IconButton's own type union) — dev-warned here too.
//
// `keepMounted` DEFAULTS `true` here — a DELIBERATE override of Base UI's own `false` default
// (`ComboboxClear.js`). Verified against the installed source: Base UI's `visible` render-state for
// a SINGLE-select combobox (the public `ComboboxRoot` always maps `multiple:false` → the internal
// `selectionMode:'single'`, `ComboboxRoot.js`) gates on `selectedValue != null` — a SELECTED value,
// NOT the typed query — so a query alone (no selection yet) would leave `keepMounted:false` NEVER
// rendering the button at all (not merely hidden — Base UI early-returns `null`). Consume-doc
// pointer: this SUPERSEDES the `keepMounted:false` line there (queued for wiki-sync).
// Always-mounted alone would show the "×" with nothing to clear (5a-F1) — see the `data-visible` /
// `--has-query` visibility gate below + `_state-cascade.scss` (Combobox Clear section).
//
// Narrow structural DOM shapes for the 5a-F1 sibling-input read below — this lib's tsconfig compiles
// WITHOUT `lib.dom` (es2022 only, the tabs.tsx/field.tsx convention), so DOM APIs are reached through
// local interface casts rather than the global DOM types.
interface ClearAncestorHost {
  closest(selector: string): ClearQueryableGroup | null;
}
interface ClearQueryableGroup {
  querySelector(selector: string): unknown;
}
interface ClearQueryInput {
  readonly value: string;
  addEventListener(type: string, listener: () => void): void;
  removeEventListener(type: string, listener: () => void): void;
}
export interface ComboboxClearProps
  extends Omit<React.ComponentProps<typeof ComboboxPrimitive.Clear>, 'render' | 'className' | 'children'> {
  aui?: IconButtonAui;
  className?: string;
  /** The clear glyph. Defaults to `'xmark'` (the Chip.Dismiss precedent). */
  name?: string;
}
const ComboboxClear = React.forwardRef<HTMLButtonElement, ComboboxClearProps>(function ComboboxClear(
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
    // aria-label/-labelledby are destructured OUT of `rest` below (single ownership on the
    // composed IconButton — 5a-NIT3); re-merge them here so the dev-warning still sees them.
    warnIfNoAccessibleName(
      [],
      { ...rest, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby },
      'Combobox.Clear',
    );
  }
  // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
  // Clear's own `aui` BEFORE scale resolution — own axis always wins; scale is untouched by the
  // merge (Field forwards color/shape/elevation/sx only — scale flows via the separate rail below).
  // Mirrors `Autocomplete.Clear` verbatim (autocomplete.tsx:229-233).
  const fieldMergedAui = useComboboxFieldMergedAui(aui);
  // SCALE-CASCADE FIX (USER DIRECTIVE 10, 2026-07-10): `IconButton` does NOT read the ambient
  // `AuiScaleProvider` on its own (verified: `icon-button.tsx` resolves `scale: aui?.scale ??
  // ICON_BUTTON_DEFAULTS.scale` — a HARDCODED 'sm' floor, no `useAuiScale()` call anywhere in that
  // file) — a composed IconButton must thread the ambient scale in EXPLICITLY, or it silently pins
  // 'sm' regardless of the Combobox root's own `aui.scale` (invisible at the shared default tier,
  // visibly wrong at xl). Mirrors `Datepicker.InputButton`'s IDENTICAL fix (`datepicker.tsx:438-448`
  // — VERIFIED-SAME sibling mechanism) and this file's own `ComboboxIcon` (already correct, built
  // during USER DIRECTIVE 6). Floor = `ICON_BUTTON_DEFAULTS.scale` (IconButton's OWN vocab default,
  // read not hardcoded — G15), not a literal.
  const inheritedScale = useAuiScale();
  const resolvedScale = resolveAuiScale(fieldMergedAui?.scale, inheritedScale, ICON_BUTTON_DEFAULTS.scale);
  const resolvedAui = React.useMemo<IconButtonAui>(
    () => ({ profile: 'contained' as const, paint: 'text' as const, ...fieldMergedAui, scale: resolvedScale }),
    [fieldMergedAui, resolvedScale],
  );
  // 5a-NIT3 fix: aria-label/-labelledby now flow through EXACTLY ONE path (destructured above,
  // passed only here) instead of twice (once via the old `...rest` spread onto
  // `ComboboxPrimitive.Clear`, once via a second extraction onto the composed IconButton).
  const accessibleNameProps = { 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby } as {
    'aria-label': string;
  };

  // 5a-F1 (pinned fix): visible when a query is TYPED or a value is SELECTED; hidden when both are
  // empty. Base UI's own `visible` render-state (stamped as `data-visible` via the default
  // `getStateAttributesProps` fallback — `ComboboxClear.js`) already covers "a selection exists"
  // for BOTH single (`selectedValue != null`) and multiple/chips (`hasSelectionChips`) mode — gated
  // in CSS below via `[data-visible]`. It does NOT cover "a query is typed but nothing is selected
  // yet" (the exact reason `keepMounted` overrides to `true` above: Base UI's OWN `visible` computes
  // false for that case and `keepMounted:false` would unmount the button entirely). There is no
  // Base UI DOM signal for that second half, so we mirror it ourselves: read the sibling
  // `.aui-combobox-input`'s live value — a PUBLIC DOM read (the `@internal` root store/context has
  // no public export — verified: `@base-ui/react`'s package exports map only `./combobox`, not a
  // `/store` or `/root/*Context` subpath) — and reflect it as an OWN marker class (`IconButton`'s
  // props have no `data-*` index signature, so a class — already a typed `string` prop — carries
  // the signal instead of an attribute). SCSS still owns the actual hide/show
  // (`_state-cascade.scss`, Combobox Clear section).
  const [clearNode, setClearNode] = React.useState<HTMLButtonElement | null>(null);
  const setRefs = React.useCallback(
    (node: HTMLButtonElement | null) => {
      setClearNode(node);
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    },
    [ref],
  );
  const [hasQuery, setHasQuery] = React.useState(false);
  React.useEffect(() => {
    // This lib's tsconfig compiles WITHOUT `lib.dom` (es2022 only — the tabs.tsx/field.tsx
    // convention), so the traversal goes through the narrow structural casts declared above
    // (`ClearAncestorHost`/`ClearQueryInput`), never the global DOM method types.
    const host = clearNode as unknown as ClearAncestorHost | null;
    if (!host || typeof host.closest !== 'function') return undefined;
    const group = host.closest('.aui-combobox-input-group');
    const input = (
      group && typeof group.querySelector === 'function'
        ? (group.querySelector('.aui-combobox-input') as ClearQueryInput | null)
        : null
    );
    if (!input) return undefined;
    const sync = () => setHasQuery(input.value !== '');
    sync();
    // Both events wired: real typing fires `input`; jsdom/testing-library's `fireEvent.change`
    // (the fixture's own typing helper) fires `change` — either must resync the signal.
    input.addEventListener('input', sync);
    input.addEventListener('change', sync);
    return () => {
      input.removeEventListener('input', sync);
      input.removeEventListener('change', sync);
    };
  }, [clearNode]);

  // Lane 7 finding (2026-07-10, SHOULD-FIX): Combobox.Clear painted visible (the `hasQuery` CSS
  // override below) while carrying `aria-hidden="true"` in the typed-query-no-selection state — a
  // mouse user could see/click it, a screen-reader user could not discover it. Investigated the
  // render-time path first (threading an explicit `aria-hidden` through the composed IconButton,
  // even switching `ComboboxPrimitive.Clear`'s `render` to the function form to read Base UI's own
  // `state.visible` directly) — STOPPED on that approach: instrumented every layer (the render
  // function's OWN returned element, a raw `<button>` bypassing IconButton entirely) and confirmed
  // the EXPLICIT `aria-hidden={false}` I passed was correctly present on the element I constructed,
  // yet the COMMITTED DOM still showed `aria-hidden="true"` — something downstream of the `render`
  // callback's return value (inside Base UI's own `ComboboxPrimitive.Clear`/`useRenderElement`
  // machinery, not traceable to any `aria-hidden` reference in the installed source of
  // `ComboboxClear.js`, `useButton.js`, `useFocusableWhenDisabled.js`, `useTransitionStatus.js`, or
  // `getStateAttributesProps.js`) overrides it. Rather than ship a render-time fix whose mechanism
  // I could not verify, this uses the SAME imperative-DOM-read pattern already proven for `hasQuery`
  // above: after each render, read Base UI's OWN `data-visible` attribute directly off the
  // mounted Clear node and imperatively set/clear `aria-hidden` to match the identical OR-condition
  // the CSS visibility rule already uses (`hasQuery || data-visible`) — so the a11y-tree presence
  // and the paint can never diverge, regardless of the render-time mechanism this sidesteps. A
  // `MutationObserver` on `data-visible` (not just the `hasQuery` effect's own input/change
  // listeners) is required because SELECTING an option can flip `data-visible` without necessarily
  // firing an `input`/`change` event on the sibling input.
  React.useEffect(() => {
    if (!clearNode) return undefined;
    const node = clearNode as unknown as {
      hasAttribute(name: string): boolean;
      getAttribute(name: string): string | null;
      setAttribute(name: string, value: string): void;
      removeAttribute(name: string): void;
    };
    // Something DOWNSTREAM of Base UI's own render pipeline re-asserts `aria-hidden="true"` on
    // this node AFTER this effect's own synchronous pass commits (confirmed: an initial
    // `applyAriaHidden()` call here correctly clears the attribute — verified via direct
    // `hasAttribute` reads immediately after the call — yet the FINAL DOM still shows it "true"
    // moments later, with no additional invocation of THIS effect observed). Rather than chase
    // that mechanism further, the MutationObserver below watches `aria-hidden` ITSELF (not just
    // `data-visible`) and CORRECTS it back whenever it drifts from the desired value — a guarded
    // self-healing loop (only writes when the current value actually differs, so it cannot spin).
    const applyAriaHidden = () => {
      const dataVisible = node.hasAttribute('data-visible');
      const shouldHide = !(hasQuery || dataVisible);
      const current = node.getAttribute('aria-hidden');
      if (shouldHide && current !== 'true') node.setAttribute('aria-hidden', 'true');
      else if (!shouldHide && current !== null) node.removeAttribute('aria-hidden');
    };
    applyAriaHidden();
    const win = (globalThis as { MutationObserver?: new (cb: () => void) => {
      observe(target: unknown, opts: object): void;
      disconnect(): void;
    } });
    if (!win.MutationObserver) return undefined;
    const observer = new win.MutationObserver(applyAriaHidden);
    observer.observe(node, { attributes: true, attributeFilter: ['data-visible', 'aria-hidden'] });
    return () => observer.disconnect();
  }, [clearNode, hasQuery]);

  // The has-query marker rides the SAME className string as the base marker (mergeAuiClasses
  // splits on whitespace) — no separate attribute prop needed on IconButton.
  const clearClassName = prependMarkerClassName(
    hasQuery ? 'aui-combobox-clear aui-combobox-clear--has-query' : 'aui-combobox-clear',
    className,
  ) as string | undefined;

  return React.createElement(ComboboxPrimitive.Clear, {
    ref: setRefs,
    keepMounted,
    ...rest,
    // After the rest spread so a runtime `render` in rest can never silently replace the composed
    // IconButton (already Omit-ted from the public type).
    render: <IconButton name={name} aui={resolvedAui} className={clearClassName} {...accessibleNameProps} />,
  });
});
ComboboxClear.displayName = 'Combobox.Clear';

// ─── Combobox.ItemIndicator — tier-2 check puck (cascade-reader, styleable) ───────
// Mirrors Select.ItemIndicator verbatim (select.tsx:448-514), INCLUDING the `children: null`
// baked default (2026-06-26 fix, #74 — Base UI's `ComboboxItemIndicator` ALSO hardcodes a default
// child `children: '✔️'`, verified at `ComboboxItemIndicator.js:53` — the SAME heavy-check emoji
// leak Select.ItemIndicator was fixed for; without this baked override a childless
// `<Combobox.ItemIndicator />` would leak the emoji). Gated off the ROW's `data-selected` via
// `keepMounted`, not the indicator's own transient state — reserves the check column so selection
// doesn't reflow the row.
const _ComboboxItemIndicator = createAtomicPart<
  React.ComponentProps<typeof ComboboxPrimitive.ItemIndicator> & PartStyleProps
>(ComboboxPrimitive.ItemIndicator, 'aui-combobox-item-indicator', {
  baseProps: { keepMounted: true, 'aria-hidden': true, children: null },
  styleable: true,
  sxAxes: FRAME_PART_SX_AXES,
  defaultProfile: 'no-padding',
});
_ComboboxItemIndicator.displayName = 'Combobox.ItemIndicator';
export type ComboboxItemIndicatorProps = React.ComponentProps<typeof _ComboboxItemIndicator>;

const ComboboxItemIndicator = React.forwardRef<HTMLSpanElement, ComboboxItemIndicatorProps>(
  function ComboboxItemIndicator({ aui, tabIndex, ...rest }, ref) {
    // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
    // indicator's own `aui` BEFORE scale resolution — own axis always wins; scale is untouched by
    // the merge (Field forwards color/shape/elevation/sx only — scale flows via the scale rail).
    const fieldMergedAui = useComboboxFieldMergedAui(aui as FieldMergeableAui | undefined);
    const inheritedScale = useAuiScale();
    const resolvedScale = resolveAuiScale(
      (fieldMergedAui as { scale?: ComboboxScale } | undefined)?.scale,
      inheritedScale,
      COMBOBOX_ITEM_VOCAB.defaults.scale as ComboboxScale,
    );
    const resolvedAui = React.useMemo(
      () => ({ profile: 'no-padding' as const, ...(fieldMergedAui as object), scale: resolvedScale }),
      [fieldMergedAui, resolvedScale],
    );
    return React.createElement(_ComboboxItemIndicator as React.ElementType, {
      ref,
      ...rest,
      tabIndex: guardTabIndexForAriaHidden(tabIndex as number | undefined, true),
      aui: resolvedAui,
    });
  },
);
ComboboxItemIndicator.displayName = 'Combobox.ItemIndicator';

// ─── Combobox.Item — tier-3 stateful ROW (select-item family, REUSED) ─────────────
// `ComboboxItemState` = `{disabled, selected, highlighted}` — structurally IDENTICAL to Base UI's
// `SelectItemState`, so `createSelectItemVocabRecipe` (component-agnostic per its own file header)
// applies verbatim (use-recipe.ts). UNLIKE Select.Item, Combobox has NO `ItemText` part in its
// installed anatomy (index.parts.d.ts carries no `ItemText` export) — the row's `children` render
// DIRECTLY; only the trailing `ItemIndicator` auto-renders (composition wins).
const _ComboboxItem = createAtomicComponent(ComboboxPrimitive.Item, {
  extensions: [useScaleCascade, useStateLayer, useComboboxItemRecipe],
});

export interface ComboboxItemProps
  extends Omit<React.ComponentProps<typeof ComboboxPrimitive.Item>, 'color'> {
  aui?: ComboboxItemAui;
}

const DefaultCheckGlyph = (
  <svg className="aui-combobox-item-glyph" viewBox="0 0 16 16" focusable="false" width="1em" height="1em">
    <path d="M3.5 8.5l3 3 6-6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ComboboxItem = React.forwardRef<HTMLElement, ComboboxItemProps>(function ComboboxItem(
  { children, aui, ...rest },
  ref,
) {
  // Field-axis forwarding (2026-07-11 USER DECISION, widened): the STATEFUL merge — ambient reaches
  // only the resting `unselected` state; the `raised`/`solid` selected fill is PINNED (see
  // `mergeComboboxItemFieldAui`'s comment above).
  const mergedAui = useComboboxItemFieldMergedAui(aui);
  // Composing a `<Combobox.ItemIndicator>` opts the row into manual control (mirrors Select.Item's
  // "composed wins" rule) — the AUTO path appends the trailing default-check indicator.
  const composedIndicator = hasPartChild(children, ComboboxItemIndicator);
  const content = composedIndicator ? (
    children
  ) : (
    <>
      {children}
      {React.createElement(ComboboxItemIndicator, null, DefaultCheckGlyph)}
    </>
  );
  return React.createElement(_ComboboxItem as React.ElementType, { ref, ...rest, aui: mergedAui }, content);
});
ComboboxItem.displayName = 'Combobox.Item';

// ─── Combobox.Chips — the chip-stack container (multiple mode, PINNED decision B) ────
// Base UI's `ComboboxChips` does NOT natively accept a render-function `children` (unlike `List`,
// verified: `ComboboxChips.d.ts` types `children` via the plain `BaseUIComponentProps` — a
// `React.ReactNode`, no function-child overload). We resolve the current `selectedValue` the SAME
// PUBLIC way `Combobox.Value`'s render-prop does (`ComboboxValue.js`: `childrenProp(selectedValue)`)
// — composing the raw Base UI `Combobox.Value` internally (no ref needed, so no dev-warning) to map
// each selected value through the consumer's render function, entirely on the PUBLIC surface (no
// `@internal` store reach-through).
//
// CORRECTION (round-5 painted-parity pass, item 3): Base UI's OWN canonical multiple-select
// composition renders `Combobox.Input` AS THE LAST CHILD of the SAME flex-wrap `Combobox.Chips`
// container the chip pills live in (`docs/react/components/combobox.md:633-670` — the Input is
// mapped INSIDE `Combobox.Value`'s render-prop, trailing the last chip, so it wraps onto whatever
// line the chips reach — the classic tag-input UX). The prior shape rendered `Combobox.Input` as a
// SEPARATE SIBLING of `Combobox.Chips` at the `InputGroup` level — a different flex row entirely, so
// a wrapped multi-line chip stack and the Input never occupied the same flow. `Combobox.Chips` now
// accepts EITHER a lone render function (unchanged, back-compat) OR an array mixing the render
// function with additional static children (the trailing `Combobox.Input`) — the static children
// render AFTER the mapped chips, in JSX source order, so `<Combobox.Chips>{(v) => …}<Combobox.Input
// /></Combobox.Chips>` places the Input last inside the SAME wrapping flex container as the chips.
const _ComboboxChips = createAtomicPart<React.ComponentProps<typeof ComboboxPrimitive.Chips>>(
  ComboboxPrimitive.Chips,
  'aui-combobox-chips',
);

// `value: any` mirrors Base UI's OWN `ComboboxValueProps.children` signature verbatim
// (`(selectedValue: any) => React.ReactNode` — `ComboboxValue.d.ts`), so a consumer's narrower
// `(value: string) => ReactNode` render fn (the spec fixture) stays assignable.
export type ComboboxChipsRenderFn = (value: any, index: number) => React.ReactNode; // eslint-disable-line @typescript-eslint/no-explicit-any
export type ComboboxChipsProps = Omit<React.ComponentProps<typeof _ComboboxChips>, 'children'> & {
  children?: React.ReactNode | ComboboxChipsRenderFn | Array<React.ReactNode | ComboboxChipsRenderFn>;
};

const ComboboxChips = React.forwardRef<HTMLDivElement, ComboboxChipsProps>(function ComboboxChips(
  { children, ...rest },
  ref,
) {
  const items = Array.isArray(children) ? children : [children];
  const content = items.map((child, index) =>
    typeof child === 'function'
      ? React.createElement(ComboboxPrimitive.Value, {
          // The render-fn slot is positionally stable (JSX authors compose it once); the mapped
          // VALUES below key on the value itself, not on this index.
          key: `combobox-chips-value-${index}`,
          children: (selectedValue: unknown) =>
            (Array.isArray(selectedValue) ? selectedValue : []).map((value, valueIndex) =>
              (child as ComboboxChipsRenderFn)(value, valueIndex)),
        })
      : child,
  );
  return React.createElement(_ComboboxChips as React.ElementType, { ref, ...rest }, content);
});
ComboboxChips.displayName = 'Combobox.Chips';

// ─── Combobox.Chip — composes the REAL Chip via `render` (PINNED, G42 height bridge) ────
// Rides `profile:'chip'` (the shipped 200-Scale chip profile — tokens.ts:777/809,
// _200-scale.scss:206-305 — heights 18/20/22/28/32, gaps 2/3/4/5/6) so the chip stack MUST NOT
// inflate the rail's cross-axis height. Composes the REAL `Chip` (never a bespoke lookalike) via
// Base UI's `render` prop — the Toast.Action/Close precedent (toast.tsx:326-358): Base UI keeps
// the chip's behavior/ARIA (`ComboboxChip`'s keyboard nav, `aria-disabled`), our `<Chip>` owns the
// paint. `Combobox.ChipRemove` composed as a CHILD of `Combobox.Chip` therefore renders INSIDE the
// real `Chip`'s own `ChipAuiContext` cascade (the real Chip's `children` — including any composed
// `<Combobox.ChipRemove>` — flow through Base UI's clone), so composing `Chip.Dismiss` there gets
// the REAL host-fit cascade for free (G43 same-round parity), not a re-implementation.
export interface ComboboxChipProps
  extends Omit<React.ComponentProps<typeof ComboboxPrimitive.Chip>, 'render' | 'className'> {
  /** Defaults `profile:'chip'` — retuning the shipped chip profile is a STOP (G42). */
  aui?: ChipAui;
  className?: string;
}
const ComboboxChip = React.forwardRef<HTMLDivElement, ComboboxChipProps>(function ComboboxChip(
  { aui, className, children, ...rest },
  ref,
) {
  // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
  // chip's own `aui` BEFORE scale/color resolution — own axis always wins; scale is untouched by
  // the merge (Field forwards color/shape/elevation/sx only — scale flows via the separate rail
  // below). Mirrors `Combobox.Clear` immediately above.
  const fieldMergedAui = useComboboxFieldMergedAui(aui);
  // SCALE-CASCADE FIX (USER DIRECTIVE 10, 2026-07-10): same gap as `Combobox.Clear` above — the
  // real `Chip`'s OWN cascade (`ChipAuiContext`/`useChipCascade()`, `chip.tsx:59-70`) seeds from
  // THIS element's `aui.scale` alone; it does NOT itself read the workspace-wide `AuiScaleProvider`.
  // Composing `<Chip aui={resolvedAui}>` without an explicit `scale` therefore drops the Combobox
  // root's ambient tier silently at every consumer of the chip cascade downstream — `Chip.Icon`,
  // `Chip.Label`, AND `Combobox.ChipRemove`'s composed `Chip.Dismiss` (which reads `useChipCascade()`
  // for its own host-fit sizing, G43) all inherit whatever scale THIS line resolves. Floor =
  // `CHIP_DEFAULT_SCALE` (Chip's own vocab default, read not hardcoded — G15).
  const inheritedScale = useAuiScale();
  const resolvedScale = resolveAuiScale(fieldMergedAui?.scale, inheritedScale, CHIP_DEFAULT_SCALE);
  // DEFAULT COLOR = raised (USER DIRECTIVE 14, 2026-07-10): Combobox's chip stack defaults its
  // chroma to `raised` (verified present in `AuiColor`, `tokens.ts:55` — no STOP needed) instead of
  // `Chip`'s OWN vocab default (`surface-alt`, `chip.tsx`'s own defaults comment). A chroma-only
  // change — `raised` sets color/paint context, NOT geometry, so G42's rail-height contract
  // (18/20/22/28/32 via `profile:'chip'`) is untouched; `profile:'chip'` stays first in the object so
  // an explicit consumer `aui.profile` still can't accidentally clobber the height contract, and
  // `color: 'raised'` sits BEFORE `...fieldMergedAui` so an EXPLICIT consumer `aui.color` still wins
  // (own-axis-wins) while an ambient Field color (with no consumer override) now also wins over this
  // default, matching the Field-forwarding contract above.
  const resolvedAui = React.useMemo<ChipAui>(
    () => ({ profile: 'chip' as const, color: 'raised' as const, ...fieldMergedAui, scale: resolvedScale }),
    [fieldMergedAui, resolvedScale],
  );
  const chipClassName = prependMarkerClassName('aui-combobox-chip', className) as string | undefined;
  return React.createElement(
    ComboboxPrimitive.Chip,
    { ref, ...rest, render: <Chip aui={resolvedAui} className={chipClassName} /> },
    children,
  );
});
ComboboxChip.displayName = 'Combobox.Chip';

// ─── Combobox.ChipRemove — composes the REAL Chip.Dismiss via `render` (G43 parity) ──────
// SAME-ROUND parity with `Chip.Dismiss`'s host-fit rail — never an overflow-clipped contained
// IconButton beside the crisp sibling. Composed as a CHILD of `Combobox.Chip` (see above), so this
// element renders INSIDE the real `Chip`'s cascade — `Chip.Dismiss` reads the REAL
// `useChipCascade()` + the REAL `aui-chip-dismiss--host-fit` marker, verbatim, not a copy.
export interface ComboboxChipRemoveProps
  extends Omit<React.ComponentProps<typeof ComboboxPrimitive.ChipRemove>, 'render' | 'className'> {
  className?: string;
}
const ComboboxChipRemove = React.forwardRef<HTMLButtonElement, ComboboxChipRemoveProps>(
  function ComboboxChipRemove({ className, ...rest }, ref) {
    if (process.env.NODE_ENV !== 'production') {
      warnIfNoAccessibleName([], rest as Record<string, unknown>, 'Combobox.ChipRemove');
    }
    const markerClassName = prependMarkerClassName('aui-combobox-chip-remove', className) as string | undefined;
    const accessibleNameProps = {
      'aria-label': (rest as Record<string, unknown>)['aria-label'],
      'aria-labelledby': (rest as Record<string, unknown>)['aria-labelledby'],
    } as { 'aria-label': string };
    return React.createElement(ComboboxPrimitive.ChipRemove, {
      ref,
      ...rest,
      render: <Chip.Dismiss className={markerClassName} {...accessibleNameProps} />,
    });
  },
);
ComboboxChipRemove.displayName = 'Combobox.ChipRemove';

// ─── DEFERRED parts — kept as pass-throughs where the core exposes them (not styled/tested this round) ──
// Group/Row: plain markers (grouped options / grid-layout — no contract requirement). GroupLabel is
// NO LONGER deferred — see below (USER DIRECTIVE 11).
const ComboboxGroup = createAtomicPart<React.ComponentProps<typeof ComboboxPrimitive.Group>>(
  ComboboxPrimitive.Group,
  'aui-combobox-group',
);
ComboboxGroup.displayName = 'Combobox.Group';
export type ComboboxGroupProps = React.ComponentProps<typeof ComboboxGroup>;

// ─── Combobox.GroupLabel — a caption row labelling its Group (USER DIRECTIVE 11, 2026-07-10) ──────
// Promoted from a bare marker to a FULL leaf (`use-recipe.ts`: `COMBOBOX_GROUP_LABEL_VOCAB`,
// VERIFIED-SAME anchor `DROPDOWN_GROUP_LABEL_VOCAB`, `dropdown/use-recipe.ts:220-226`) — mirrors
// `Dropdown.GroupLabel` exactly (`dropdown.tsx:533-547`): `createAtomicComponent` + `useScaleCascade`
// (no manual `useAuiScale()`/`resolveAuiScale()` needed here, unlike Clear/Chip — GroupLabel is a
// direct leaf, not composing a SEPARATE part via `render`, so the standard cascade extension alone
// threads the ambient tier in).
const _ComboboxGroupLabel = createAtomicComponent(ComboboxPrimitive.GroupLabel, {
  extensions: [useScaleCascade, useComboboxGroupLabelRecipe],
});
export interface ComboboxGroupLabelProps
  extends Omit<React.ComponentProps<typeof ComboboxPrimitive.GroupLabel>, 'color'> {
  aui?: ComboboxGroupLabelAui;
}
const ComboboxGroupLabel = React.forwardRef<HTMLDivElement, ComboboxGroupLabelProps>(
  function ComboboxGroupLabel({ aui, ...rest }, ref) {
    // Field-axis forwarding (2026-07-11 USER DECISION): merge the ambient Field cascade under the
    // group label's own `aui` — own axis always wins.
    const mergedAui = useComboboxFieldMergedAui(aui);
    return React.createElement(_ComboboxGroupLabel as React.ElementType, { ref, ...rest, aui: mergedAui });
  },
);
ComboboxGroupLabel.displayName = 'Combobox.GroupLabel';

const ComboboxRow = createAtomicPart<React.ComponentProps<typeof ComboboxPrimitive.Row>>(
  ComboboxPrimitive.Row,
  'aui-combobox-row',
);
ComboboxRow.displayName = 'Combobox.Row';
export type ComboboxRowProps = React.ComponentProps<typeof ComboboxRow>;

const ComboboxArrow = createAtomicPart<React.ComponentProps<typeof ComboboxPrimitive.Arrow>>(
  ComboboxPrimitive.Arrow,
  'aui-combobox-arrow',
);
ComboboxArrow.displayName = 'Combobox.Arrow';
export type ComboboxArrowProps = React.ComponentProps<typeof ComboboxArrow>;

// Collection renders NO DOM element (a plain function, not forwardRef — `ComboboxCollection.d.ts`)
// and is only reachable via the `virtualized` external-virtualization path (DEFERRED, no contract
// requirement) — re-exported verbatim, no ref/marker wrapper (there is no element to mark).
const ComboboxCollection = ComboboxPrimitive.Collection;

// Separator: Base UI's Combobox re-exports the SAME shared core Separator part Select/Dropdown
// would (index.parts.d.ts:26, "../separator" relative to the combobox package = the shared
// `@base-ui/react` separator) — atomic-aui has NOT yet shipped a standalone `lib/separator`
// component (grepped: none exists), so "reuse the existing Separator" reduces to a plain marker
// pass-through, mirroring `Select.Separator`'s OWN wrapping exactly (select.tsx:431-436) — nothing
// new to wrap, no recipe. Flagged for the parent: if/when atomic-aui ships a real `lib/separator`,
// this should re-point to it.
const ComboboxSeparator = createAtomicPart<React.ComponentProps<typeof ComboboxPrimitive.Separator>>(
  ComboboxPrimitive.Separator,
  'aui-combobox-separator',
);
ComboboxSeparator.displayName = 'Combobox.Separator';
export type ComboboxSeparatorProps = React.ComponentProps<typeof ComboboxSeparator>;

// ─── Combobox.useFilter — the app-controlled filtering hook (SHIP, pass-through) ──
const useComboboxFilterHook = ComboboxPrimitive.useFilter;

// ─── Combobox.Root — generics-preserving wrapper (NOT createAtomicComponent) ──────
// Base UI's `Combobox.Root<Value, Multiple>` renders NO DOM element (behavior + context only),
// IDENTICAL to `Select.Root` (select.tsx:597-616). A NARROW `aui={{ scale }}` SEEDS the scale-only
// cascade for the parts (InputGroup/Input/Trigger/Popup/Item all fall back to it; an own
// `aui.scale` wins). Only `scale` cascades — color/paint/shape stay per-part (the rail is filled,
// the popup floats lighter, the item is flat).
type ComboboxRootAui = { scale?: ComboboxScale };
function ComboboxRoot<Value, Multiple extends boolean | undefined = false>(
  props: ComboboxRootProps<Value, Multiple> & { aui?: ComboboxRootAui },
): React.JSX.Element {
  const { aui, children, ...rest } = props;
  return React.createElement(
    ComboboxPrimitive.Root,
    rest as object,
    React.createElement(AuiScaleProvider, { value: aui?.scale }, children),
  );
}
ComboboxRoot.displayName = 'Combobox';

// ─── Assemble + the typing seam (mirrors select.tsx's SelectComponent pattern) ────
interface ComboboxComponent {
  <Value, Multiple extends boolean | undefined = false>(
    props: ComboboxRootProps<Value, Multiple> & { aui?: { scale?: ComboboxScale } },
  ): React.JSX.Element;
  displayName?: string;
  Label: typeof ComboboxLabel;
  Value: typeof ComboboxValue;
  InputGroup: typeof ComboboxInputGroup;
  Input: typeof ComboboxInput;
  Trigger: typeof ComboboxTrigger;
  Icon: typeof ComboboxIcon;
  Portal: typeof ComboboxPortal;
  Backdrop: typeof ComboboxBackdrop;
  Positioner: typeof ComboboxPositioner;
  Popup: typeof ComboboxPopup;
  ScrollArea: typeof ComboboxScrollArea;
  List: typeof ComboboxList;
  Status: typeof ComboboxStatus;
  Empty: typeof ComboboxEmpty;
  Clear: typeof ComboboxClear;
  Item: typeof ComboboxItem;
  ItemIndicator: typeof ComboboxItemIndicator;
  Chips: typeof ComboboxChips;
  Chip: typeof ComboboxChip;
  ChipRemove: typeof ComboboxChipRemove;
  Group: typeof ComboboxGroup;
  GroupLabel: typeof ComboboxGroupLabel;
  Row: typeof ComboboxRow;
  Arrow: typeof ComboboxArrow;
  Collection: typeof ComboboxCollection;
  Separator: typeof ComboboxSeparator;
  useFilter: typeof useComboboxFilterHook;
}

export const Combobox = Object.assign(ComboboxRoot, {
  Label: ComboboxLabel,
  Value: ComboboxValue,
  InputGroup: ComboboxInputGroup,
  Input: ComboboxInput,
  Trigger: ComboboxTrigger,
  Icon: ComboboxIcon,
  Portal: ComboboxPortal,
  Backdrop: ComboboxBackdrop,
  Positioner: ComboboxPositioner,
  Popup: ComboboxPopup,
  ScrollArea: ComboboxScrollArea,
  List: ComboboxList,
  Status: ComboboxStatus,
  Empty: ComboboxEmpty,
  Clear: ComboboxClear,
  Item: ComboboxItem,
  ItemIndicator: ComboboxItemIndicator,
  Chips: ComboboxChips,
  Chip: ComboboxChip,
  ChipRemove: ComboboxChipRemove,
  Group: ComboboxGroup,
  GroupLabel: ComboboxGroupLabel,
  Row: ComboboxRow,
  Arrow: ComboboxArrow,
  Collection: ComboboxCollection,
  Separator: ComboboxSeparator,
  useFilter: useComboboxFilterHook,
}) as ComboboxComponent;

export default Combobox;
