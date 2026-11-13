// modules/design/atomic-aui/src/lib/toast/use-recipe.ts
//
// Toast's ROOT recipe vocab (the elevated severity surface) + the severity→color bridge. Pure
// TypeScript: no React, no Base UI wiring. NOTE: the Action and Close are NO LONGER bespoke recipes —
// they compose the real AtomicAUI <Button> (see toast.tsx), so the only frame-bearing recipe here is
// the Root card. The buttons derive their `aui` (color + paint) from the Root at render time.
//
// Severity is NOT a bespoke prop. It resolves to the normal `aui.color` axis, either from an
// explicit `aui.color` or from Base UI's `toast.type`.
import { defineLeaf, type Appearance } from '../../core/vocabulary/leaf-vocabulary';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';
import type {
  AuiRecipeColor,
  AuiRecipePaint,
  AuiRecipeScale,
  AuiRecipeShape,
} from '../../core/vocabulary/recipe-vocab';
import type { AnyProps, PropHook } from '../../core/types';
import { buildLeafClasses } from '../../core/recipe/build-leaf-classes';

export type ToastColor = AuiRecipeColor;
export type ToastSeverityColor = Extract<ToastColor, 'info' | 'success' | 'warning' | 'error'>;
export type ToastPaint = AuiRecipePaint;
export type ToastScale = AuiRecipeScale;
export type ToastShape = AuiRecipeShape;

export type ToastRootAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };

// ─── Root — the elevated severity surface ────────────────────────────────────
// Defaults are read off the Figma ADC "Toast / File Limit Error" exemplar: a SOLID severity card
// with shadow and white content. So:
//   • color: 'info'   — the neutral "notification" semantic, the right default for a toast with no
//                       declared severity. Base UI's manager `type` REPLACES this color axis at
//                       runtime (info/success/warning/error → the matching chroma; see withTypeColor).
//   • paint: 'solid'  — the strong filled card the ADC toast reads as (white content on a chroma fill);
//                       a consumer wanting a quieter notification overrides to `tonal`/`text`.
//   • elevation: 4    — the overlay float level that lifts the toast off the page (pinned in
//                       defaults so an un-customized toast emits `aui-elevation-4`; higher than the
//                       popup's 2 — a toast sits ABOVE other overlays). Overridable via `aui` / className.
//   • scale 'sm' / shape 'soft' — the standard card sizing/corner.
export const TOAST_ROOT_VOCAB = defineLeaf({
  marker: 'aui-toast',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: { color: 'info', paint: 'solid', scale: 'sm', shape: 'soft', elevation: 4 },
});

// ─── Severity → color bridge (toast.type IS the color axis) ──────────────────
// Toast severity is NOT a bespoke prop — it resolves to the normal `aui.color` axis from one of two
// sources: an explicit author-supplied `aui.color`, OR Base UI's manager `toast.type`. `aui.color`
// always WINS (an author override is authoritative); `type` only supplies the color when unset.

// The four severity values are a SUBSET of the full color union. `toastTypeToColor` guards a raw
// `type` (typed `unknown`, since it crosses the Base UI boundary) against this Set and returns the
// matching `ToastSeverityColor` — or `undefined` for anything else. A SET-GUARD (not a bare `as`
// cast) is the point: a non-severity `type` (a custom manager type, or a malformed value) must NOT
// leak through as an invalid color class — it falls through to `undefined` so the vocab default
// (`info`) stands, rather than emitting `aui-color-solid-<garbage>` that no generated CSS backs.
const SEVERITY_COLORS = new Set<ToastSeverityColor>(['info', 'success', 'warning', 'error']);

export function toastTypeToColor(type: unknown): ToastSeverityColor | undefined {
  return typeof type === 'string' && SEVERITY_COLORS.has(type as ToastSeverityColor)
    ? (type as ToastSeverityColor)
    : undefined;
}

// Merge the severity color INTO the appearance: if the author already set `aui.color`, it wins
// (return `aui` untouched). Otherwise, if `type` is a real severity, shallow-clone `aui` with that
// color injected; if `type` is non-severity, leave `aui` alone (the vocab default applies). Shallow
// clone — never mutate the consumer's `aui` object (it may be reused across renders/toasts).
function withTypeColor<A extends Appearance>(aui: A | undefined, type: unknown): A | undefined {
  if (aui?.color !== undefined) return aui;
  const color = toastTypeToColor(type);
  if (!color) return aui;
  return { ...(aui ?? {}), color } as A;
}

interface ToastRootRecipeProps extends AnyProps {
  aui?: ToastRootAui;
  toast?: { type?: string };
}

// The Root recipe is a STATIC `{ className }` hook: the Root reads its `type` directly off the
// `toast` PROP it already holds (Base UI hands the manager entry to `Toast.Root`), so the severity
// color is known at hook time — no render-state needed. `hookProps` strips `aui` from the DOM.
export const useToastRootRecipe: PropHook<ToastRootRecipeProps, { className: string }> = (props) => {
  const aui = withTypeColor(props.aui as ToastRootAui | undefined, props.toast?.type);
  return { className: buildLeafClasses(TOAST_ROOT_VOCAB, aui) };
};
useToastRootRecipe.hookProps = new Set(['aui']);
