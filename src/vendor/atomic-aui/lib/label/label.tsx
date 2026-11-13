// modules/design/atomic-aui/src/lib/label/label.tsx
//
// Label — the AtomicAUI 6.0 `<label>` primitive: a FULL frame box (every `aui` axis + full `sx`)
// that renders a `<label>` and is Base-UI-compatible (auto-associates to a labelable control).
//
// HAND-CRAFTED like View (a plain `React.forwardRef` + `buildLabelClasses`, NOT
// `createAtomicComponent`): there is no Base UI headless CORE to wrap — Base UI has no standalone
// label, only component-bound ones (`field/label` is hard-bound to `Field.Root`). What IS reusable is
// the labelable SUBSTRATE (`useLabel` from `@base-ui/react/internals/labelable-provider` — an EXPORTED
// package subpath, verified resolvable on @base-ui/react@1.5.0; the `internals/` segment means it is
// not semver-stable, so re-verify on a Base UI upgrade. Base UI's own `Field.Label` uses the same
// path): inside ANY Base UI labelable control (Checkbox/Radio/Switch/Field/CheckboxGroup) it
// auto-wires `htmlFor` to the control AND registers this label's id so the control's
// `aria-labelledby` points back. Standalone (no provider) it is throw-safe — the default
// LabelableContext NOOPs, so `htmlFor` is simply `undefined` and the consumer owns association.
//
// Typography is NOT a separate prop layer — it is controlled through `aui` / `aui.sx`
// (`fontSize`, `typographyStyle`, …) + the inherited typescale cascade (the frame convention:
// Button/View don't carry typography props either).
//
// DUAL NATURE (the user's intent): used directly as `<Label>`, OR embedded as a host's `*.Label`
// PART. As a part it inherits ONLY `scale` from the host (the scale-only `AuiScaleContext` rail, the
// Field.Icon precedent) — every other axis takes the Label default. A host wires its own thin
// `Host.Label` reading the host's own scale source and feeds this component.
import * as React from 'react';
import { useLabel } from '@base-ui/react/internals/labelable-provider';
import { buildLabelClasses, type LabelAui } from './use-recipe';
import { useAuiScale } from '../scale-cascade/use-aui-scale';

// Compose a labelable handler with a consumer-supplied one so the spread order can't silently clobber
// either: both run (labelable first). Returns the single handler when only one exists, or undefined so
// we never stamp a dead listener. The labelable handlers (`onMouseDown` for a native <label>;
// `onClick`/`onPointerDown` for a non-native element) carry the double-click-selection guard + the
// focus-the-control shim — they MUST survive a consumer's own handler.
function composeHandler<E>(
  labelable: ((event: E) => void) | undefined,
  consumer: ((event: E) => void) | undefined,
): ((event: E) => void) | undefined {
  if (!labelable) return consumer;
  if (!consumer) return labelable;
  return (event: E) => {
    labelable(event);
    consumer(event);
  };
}

export {
  LABEL_VOCAB,
  LABEL_SX_AXES,
  LABEL_DEFAULT_SCALE,
  buildLabelClasses,
} from './use-recipe';
export type {
  LabelAui,
  LabelColor,
  LabelPaint,
  LabelScale,
  LabelProfile,
  LabelShape,
  LabelElevation,
} from './use-recipe';

export interface LabelProps extends Omit<React.LabelHTMLAttributes<HTMLElement>, 'color'> {
  /** The FULL 7-axis frame appearance (color/paint/scale/profile/shape/elevation/sx). Default:
   *  surface / text (transparent) / sm / no-padding / none / 0. Set `paint`/`profile`/`sx` to opt
   *  into a padded, visible box; control the text via `aui.sx` (`fontSize`/`typographyStyle`). As a
   *  host PART, only `scale` is inherited from the host (own `aui.scale` still wins). */
  aui?: LabelAui;
  /** Render element (polymorphism). Default `'label'`. Override only as an escape hatch — the
   *  labelable `htmlFor` wiring applies to a native `<label>` only. */
  as?: React.ElementType;
  /** Associates the label to a control by id. When omitted inside a Base UI labelable control it is
   *  auto-wired; an explicit value always wins. */
  htmlFor?: string;
  className?: string;
  children?: React.ReactNode;
}

const LabelRoot = React.forwardRef<HTMLElement, LabelProps>(function Label(
  { aui, as, htmlFor, id, className, children, ...rest },
  ref,
) {
  const Tag = (as ?? 'label') as React.ElementType;
  const isNativeLabel = Tag === 'label';

  // Dev-only: a non-native `as` element can't carry `htmlFor` (it's a `<label>`-only attribute), so a
  // consumer who passes one on e.g. `as="span"` would see it silently dropped. Warn instead.
  if (process.env.NODE_ENV !== 'production' && !isNativeLabel && htmlFor) {
    console.warn(
      `[atomic-aui] Label: 'htmlFor' is ignored on a non-<label> element (as=${String(as)}) — ` +
        `render a native <label> for the htmlFor association.`,
    );
  }

  // Base UI labelable wiring (throw-safe standalone). `native` gates the `<label htmlFor>` branch vs
  // the non-native focus shim. Returns `{ id, htmlFor?, onMouseDown | onClick + onPointerDown }`. We
  // pull the handlers out so they can be COMPOSED with the consumer's (not clobbered by spread order).
  const {
    onMouseDown: labelableMouseDown,
    onClick: labelableClick,
    onPointerDown: labelablePointerDown,
    ...labelAttrProps
  } = useLabel({ id, native: isNativeLabel });

  // Scale-only cascade: as a host PART, Label inherits ONLY `scale` from a seeding Root (own wins).
  const inheritedScale = useAuiScale();
  const resolvedAui = React.useMemo<LabelAui | undefined>(() => {
    if (aui?.scale !== undefined || inheritedScale === undefined) return aui;
    return { ...aui, scale: inheritedScale };
  }, [aui, inheritedScale]);

  const recipeClasses = buildLabelClasses(resolvedAui);
  const composedClassName = [recipeClasses, className].filter(Boolean).join(' ');

  // Order: labelable attrs (auto id/htmlFor) < consumer `...rest` < composed handlers + explicit
  // htmlFor override. The labelable + consumer handlers are MERGED (both run). A native `<label>` gets
  // the resolved `htmlFor`; a non-native escape-hatch element never emits `htmlFor`; an empty-string
  // `htmlFor` is ignored (`for=""` would silently break the association).
  return (
    <Tag
      ref={ref}
      {...labelAttrProps}
      {...rest}
      onMouseDown={composeHandler<React.MouseEvent<HTMLElement>>(labelableMouseDown, rest.onMouseDown)}
      onClick={composeHandler<React.MouseEvent<HTMLElement>>(labelableClick, rest.onClick)}
      onPointerDown={composeHandler<React.PointerEvent<HTMLElement>>(
        labelablePointerDown,
        rest.onPointerDown,
      )}
      {...(isNativeLabel && htmlFor ? { htmlFor } : null)}
      className={composedClassName}
    >
      {children}
    </Tag>
  );
});
LabelRoot.displayName = 'Label';

export const Label = LabelRoot;
export default Label;
