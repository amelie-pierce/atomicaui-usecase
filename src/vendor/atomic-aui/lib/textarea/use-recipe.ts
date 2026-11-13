import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import { buildLeafClasses } from '../../core/recipe/build-leaf-classes';
import type { AnyProps, PropHook } from '../../core/types';
import { defineLeaf, type Appearance } from '../../core/vocabulary/leaf-vocabulary';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';
import type {
  AuiElevation,
  AuiRecipeColor,
  AuiRecipePaint,
  AuiRecipeScale,
  AuiRecipeShape,
  AuiScaleProfile,
} from '../../core/vocabulary/recipe-vocab';

export type TextareaColor = AuiRecipeColor;
export type TextareaPaint = AuiRecipePaint;
export type TextareaScale = AuiRecipeScale;
export type TextareaProfile = AuiScaleProfile;
export type TextareaShape = AuiRecipeShape;
export type TextareaElevation = AuiElevation;

export type TextareaAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };
export interface TextareaRecipeProps extends AnyProps {
  aui?: TextareaAui;
}

type TextareaRenderState = { disabled?: boolean };

// Byte-for-byte Input's frame defaults (evidence: lib/input/use-recipe.ts INPUT_VOCAB). Textarea is
// Input's MULTI-LINE sibling: same context axes, same `sm` default scale, same full-frame `sx`, same
// stateless (disabled-via-render-state) recipe. Only the marker differs (`aui-textarea`) so the
// component-local CSS in `tokens/_state-cascade.scss` can add the multi-line behaviors (resize,
// top-aligned text) without touching `.aui-input`.
export const TEXTAREA_DEFAULT_SCALE: TextareaScale = 'sm';
export const TEXTAREA_DEFAULT_SHAPE: TextareaShape = 'soft';

// Base UI Input (the same primitive standalone Input wraps) renders a native control element; Textarea
// pins `render={<textarea/>}` so the `.aui-frame` recipe lands on that native <textarea>. `.aui-frame`
// keeps `height: auto`, so the box HUGS the textarea's intrinsic `rows` height; the scale cell's
// `--aui-min-height` is only a FLOOR (a single-line multi-row box is never squashed).
export const TEXTAREA_VOCAB = defineLeaf({
  marker: 'aui-textarea',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: {
    color: 'surface',
    paint: 'fixed',
    scale: TEXTAREA_DEFAULT_SCALE,
    shape: TEXTAREA_DEFAULT_SHAPE,
    elevation: 0,
  },
  states: undefined,
});

export const useTextareaRecipe: PropHook<
  TextareaRecipeProps,
  { classNameForState: (state: unknown) => string }
> = (props) => {
  const aui = props.aui as Appearance | undefined;
  return {
    // Base UI Input delegates to Field.Control; Field.Root `disabled` only reaches this host through
    // the render state, not as a prop on the AtomicAUI wrapper (mirrors Input).
    classNameForState: (state: unknown) =>
      buildLeafClasses(
        TEXTAREA_VOCAB,
        aui,
        undefined,
        !!(state as TextareaRenderState | null)?.disabled,
      ),
  };
};
useTextareaRecipe.hookProps = new Set(['aui']);
