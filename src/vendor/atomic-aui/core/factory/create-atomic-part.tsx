// modules/design/atomic-aui/src/core/create-atomic-part.tsx
import * as React from 'react';
import { buildStyleablePartClasses, PART_SX_AXES, PART_STYLE_KEYS, type PartStyleProps, type PartAuiSlot, type PartColorMode } from '../recipe/part-classes';
import type { AuiScaleProfile } from '../vocabulary/recipe-vocab';
import { mergeAuiClasses } from '../recipe/merge-classes';
import { PART_FORBIDDEN_STYLE_KEYS } from '../recipe/build-style-props';

// A COMPOUND SUB-PART (`Checkbox.Indicator`, `Switch.Thumb`, later `Select.Trigger`'s
// pure-structural siblings…): a thin wrapper over a headless CORE part that bakes in the
// AtomicAUI marker className the state CSS keys on. Parts are CASCADE-READERS by default —
// their color comes from the INHERITED box `color` the parent root's per-state recipe sets.
// With `styleable: true` a part accepts the unified `aui` slot — the FULL `AppearanceProps`,
// resolved the SAME way as a frame leaf (NO special "retint": removed 2026-06-11). `color`/`paint`
// → the STANDARD context cell `aui-frame aui-color-<paint>-<chroma>` (so a box part like Switch.Thumb
// paints its box); `scale`/`profile`/`shape`/`elevation` emit their rails; `sx` is runtime-narrowed
// to the color family. To recolor a GLYPH (a dot/check/chevron), use a dedicated `ContainedIcon`/
// `Icon` part, not this. Emits nothing unless `aui` is set, so the cascade stays the default. (Tier 3 — axis-bearing
// parts that are real frames, e.g. `Select.Trigger` — instead go through `createAtomicComponent`
// + a full recipe.)
//
// Convention (the precedent this sets): a part is named by its STRUCTURAL ROLE
// (`Indicator`/`Thumb`/`Trigger`/`Value`/`Popup`/`Backdrop`), never the core's export name,
// so the consumer contract stays stable if the core (Base UI → MUI/Radix) ever changes.
// The CORE part (Base UI's) owns its data-attrs + reads its Root's state context with zero
// wiring from us; we only attach the marker (+ the optional override + baked defaults).
interface AtomicPartOptions {
  /** Part-specific defaults baked in (e.g. `{ keepMounted: true }`); consumer props win. */
  baseProps?: Record<string, unknown>;
  /** Opt into the `aui={{ color?, sx? }}` override slot (cascade-reader parts that may be
   *  recolored or have granular sx overrides — Indicator/Thumb). Marker-only when no `aui`
   *  is set (cascade wins). */
  styleable?: boolean;
  /** The `aui.sx` allow-list this part honours (default `PART_SX_AXES`, color family only). A
   *  CONTAINER box part whose marker is reworked to READ every override hook (the `.aui-checkbox`
   *  box treatment) opts into the FULL surface via `FRAME_PART_SX_AXES`. Only applies with
   *  `styleable: true`. The part marker MUST read the anatomy hooks, or the extra axes are false
   *  affordances. */
  sxAxes?: ReadonlySet<string>;
  /** How `aui.color` is realised (default `'box'` — the standard context cell). A SOLID puck/dot
   *  whose marker paints `var(--aui-fg, currentColor)` (Switch.Thumb) opts into `'foreground'`, so
   *  `color` tints that fill via `aui-fg-<c>` (the box cell would be a dead knob). `styleable` only. */
  colorMode?: PartColorMode;
  /** The scale PROFILE this part's own `aui.scale` resolves under (default `'default'`). A part sized
   *  by a profile-specific rail (Switch.Thumb → `--aui-dot-size` from the `switch` profile) pins it so
   *  a part-level `scale` matches the parent's cascade at the same tier. `styleable` only. */
  defaultProfile?: AuiScaleProfile;
  /** COLOR-ONLY part (View.ScrollAreaThumb): the part's Base UI core OWNS its main-axis size, so it
   *  must NEVER become an `.aui-frame` (reads `--aui-min-*`) nor emit a scale/profile geometry rail
   *  (a scale cell POPULATES `--aui-min-*` → a main-axis min-size that fights Base UI's transform →
   *  the full-length/protruding thumb that got this lane discarded). With `colorOnly`, `aui` exposes
   *  ONLY the foreground tint (`aui-fg-<c>`) + the color-family `sx`; `scale`/`profile`/`shape`/
   *  `elevation`/`paint` are dropped + dev-warned. REQUIRES `colorMode:'foreground'`. `styleable` only. */
  colorOnly?: boolean;
}

export function createAtomicPart<P extends object = { className?: string }>(
  corePart: React.ElementType,
  marker: string,
  options: AtomicPartOptions = {}
) {
  const { baseProps, styleable, sxAxes = PART_SX_AXES, colorMode = 'box', defaultProfile = 'default' as AuiScaleProfile, colorOnly = false } = options;
  const Part = React.forwardRef<HTMLElement, P>((props, ref) => {
    const all = props as Record<string, unknown> & { className?: unknown };
    const { aui: rawAui, ...withoutAui } = all;
    // Pull accidental `aui` off every part so marker-only parts never leak object props to
    // the DOM/core. Styleable parts also emit the unified-AppearanceProps part recipe.
    let recipe = '';
    let rest = withoutAui;
    if (styleable) {
      const auiSlot = rawAui as PartAuiSlot | undefined;
      // The full part recipe (standard context cell, geometry/shape/elevation rails, and
      // color-family sx). `droppedSx` reports anatomy sx keys the marker owns (dev-warn below).
      const built = buildStyleablePartClasses(auiSlot, sxAxes, colorMode, defaultProfile, colorOnly);
      recipe = built.classes;
      // Strip any forbidden AUI axis that arrived as a TOP-LEVEL prop via spread/cast (e.g.
      // `paint="solid"` instead of `aui={{ paint: 'solid' }}`). Customization enters through
      // `aui` ONLY; a leaked top-level axis would otherwise hit the DOM. Dev-warn so it's visible.
      const cleaned: Record<string, unknown> = {};
      const leaked: string[] = [];
      for (const [k, v] of Object.entries(withoutAui)) {
        if (PART_FORBIDDEN_STYLE_KEYS.has(k)) { leaked.push(k); continue; }
        cleaned[k] = v;
      }
      if (process.env.NODE_ENV !== 'production') {
        if (leaked.length) {
          console.warn(
            `[atomic-aui] ${marker}: customise a part through \`aui\` only. ` +
            `Ignoring top-level prop(s): ${leaked.join(', ')} (use \`aui={{ ${leaked[0]}: … }}\`).`
          );
        }
        if (built.droppedSx.length) {
          if (colorOnly) {
            console.warn(
              `[atomic-aui] ${marker}: a color-only part accepts ONLY \`aui.color\` (foreground tint) ` +
              `+ the color-family \`aui.sx\`; dropping: ${built.droppedSx.join(', ')}. ` +
              `Base UI owns this part's size — a scale/profile/box rail would force a main-axis ` +
              `min-size that shoves the thumb out of the track.`
            );
          } else {
            const fullSurface = sxAxes !== PART_SX_AXES;
            console.warn(
              `[atomic-aui] ${marker}: \`aui.sx\` ${fullSurface ? 'excludes' : 'accepts the COLOR FAMILY only;'} ` +
              `dropping key(s): ${built.droppedSx.join(', ')}. ` +
              `These would be silently masked by the marker — ` +
              `${fullSurface ? 'a definite-size container has no use for them.' : 'recolor the parent recipe / size via the part instead.'}`
            );
          }
        }
      }
      rest = cleaned;
    } else if (rawAui !== undefined && process.env.NODE_ENV !== 'production') {
      console.warn(
        `[atomic-aui] ${marker} is marker-only and does not accept \`aui\`; ignoring it.`,
      );
    }
    const { className, ...domProps } = rest;
    // Base UI parts accept `className?: string | ((state) => string)`. Order: marker FIRST,
    // recipe (color anchor) NEXT, sx overrides AFTER, consumer className LAST — run through
    // `mergeAuiClasses` so the consumer's className overrides the recipe BY AXIS ROLE
    // (e.g. `className="aui-color-error"` beats the recipe's `aui-color-info`), matching the
    // main factory's role-dedup contract (not just CSS source order). The function form is
    // resolved with the part's render `state`, like the factory.
    const join = (s: unknown) =>
      mergeAuiClasses([
        marker,
        recipe,
        typeof className === 'function' ? (className as (st: unknown) => string | undefined)(s) : (className as string | undefined),
      ]);
    return React.createElement(corePart, {
      ref,
      ...baseProps,
      ...(domProps as object),
      className: typeof className === 'function' ? join : join(undefined),
    });
  });
  Part.displayName = marker;
  return Part;
}

// Re-export the part style surface so leaves can type their parts (`… & PartStyleProps`).
export { PART_STYLE_KEYS, type PartStyleProps };

// Reference-based detection of a composed part among `children` (NOT a recursive slot-scan
// of arbitrary depth — that was the 4.0 `collectSlots` cost we leave behind). Lets a compound
// root auto-render its default part UNLESS the consumer composed one explicitly. Fragments are
// transparently unwrapped so `<><Part/></>` (and conditional `{cond && <Part/>}`) still match.
export function hasPartChild(children: React.ReactNode, part: React.ElementType): boolean {
  return React.Children.toArray(children).some((c) => {
    if (!React.isValidElement(c)) return false;
    if (c.type === part) return true;
    if (c.type === React.Fragment)
      return hasPartChild((c.props as { children?: React.ReactNode }).children, part);
    return false;
  });
}

// Like `hasPartChild` but RETURNS the first matching element (fragment-unwrapping), or undefined.
// Lets a compound root read a composed part's props (e.g. its `aui`) to re-assemble the subtree.
export function findPartChild(children: React.ReactNode, part: React.ElementType): React.ReactElement | undefined {
  let found: React.ReactElement | undefined;
  React.Children.forEach(children, (c) => {
    if (found || !React.isValidElement(c)) return;
    if (c.type === part) { found = c; return; }
    if (c.type === React.Fragment)
      found = findPartChild((c.props as { children?: React.ReactNode }).children, part);
  });
  return found;
}
