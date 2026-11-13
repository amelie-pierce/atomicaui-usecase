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

export type InputColor = AuiRecipeColor;
export type InputPaint = AuiRecipePaint;
export type InputScale = AuiRecipeScale;
export type InputProfile = AuiScaleProfile;
export type InputShape = AuiRecipeShape;
export type InputElevation = AuiElevation;

export type InputAui = Omit<Appearance, 'sx'> & { sx?: AuiFrameStyleProps };
export interface InputRecipeProps extends AnyProps {
  aui?: InputAui;
}

type InputRenderState = { disabled?: boolean };

export const INPUT_DEFAULT_SCALE: InputScale = 'sm';
export const INPUT_DEFAULT_SHAPE: InputShape = 'soft';

// Base UI Input renders the native void <input>, so the `.aui-frame`
// recipe lands on that host; value/placeholder text are not child content.
export const INPUT_VOCAB = defineLeaf({
  marker: 'aui-input',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[],
  profile: 'default' as const,
  defaults: {
    color: 'surface',
    paint: 'fixed',
    scale: INPUT_DEFAULT_SCALE,
    shape: INPUT_DEFAULT_SHAPE,
    elevation: 0,
  },
  states: undefined,
});

export const useInputRecipe: PropHook<
  InputRecipeProps,
  { classNameForState: (state: unknown) => string }
> = (props) => {
  const aui = props.aui as Appearance | undefined;
  return {
    // Base UI Input delegates to Field.Control; Field.Root `disabled` only reaches
    // this host through the render state, not as a prop on the AtomicAUI wrapper.
    classNameForState: (state: unknown) =>
      buildLeafClasses(
        INPUT_VOCAB,
        aui,
        undefined,
        !!(state as InputRenderState | null)?.disabled,
      ),
  };
};
useInputRecipe.hookProps = new Set(['aui']);
