// modules/design/atomic-aui/src/lib/list/use-recipe.ts
//
// List recipe layer. List is a hand-crafted intrinsic wrapper (no Base UI controller):
// the root is a stateless frame, while Item is a selectable row whose active state is
// resolved by consumer-owned `selected` / `indeterminate` props.
import { createVocabRecipe } from '../../core/factory/create-vocab-recipe';
import { buildLeafClasses } from '../../core/recipe/build-leaf-classes';
import { type AuiFrameStyleProps } from '../../core/recipe/build-style-props';
import {
  defineLeaf,
  type Appearance,
  type StateAppearance,
} from '../../core/vocabulary/leaf-vocabulary';
import type {
  AuiElevation,
  AuiRecipeColor,
  AuiRecipePaint,
  AuiRecipeScale,
  AuiRecipeShape,
  AuiScaleProfile,
} from '../../core/vocabulary/recipe-vocab';
import { STYLE_PROP_MAP } from '../../tokens/index';
import type { AuiStyleProps } from '../../tokens/index';

export type ListColor = AuiRecipeColor;
export type ListPaint = AuiRecipePaint;
export type ListScale = AuiRecipeScale;
export type ListProfile = AuiScaleProfile;
export type ListShape = AuiRecipeShape;
export type ListElevation = AuiElevation;

export type ListItemStateKey = 'unselected' | 'selected' | 'indeterminate';

export const LIST_ITEM_STATE_KEYS = [
  'unselected',
  'selected',
  'indeterminate',
] as const satisfies readonly ListItemStateKey[];

// User directive 2026-07-12: default scale is 'sm' for List (root + item), overriding the Figma ADC
// Kit xs mapping (kept coupled — a "sm List" renders sm rows). See list.md tokens note.
export const LIST_ROOT_DEFAULT_SCALE: ListScale = 'sm';
export const LIST_ITEM_DEFAULT_SCALE: ListScale = 'sm';

export const LIST_ROOT_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];
export const LIST_ITEM_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

export type ListAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
};

export type ListItemStateAppearance = Omit<StateAppearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
};

export type ListItemAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: Partial<Record<ListItemStateKey, ListItemStateAppearance>>;
};

export const LIST_ROOT_VOCAB = defineLeaf({
  marker: 'aui-list',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: LIST_ROOT_SX_AXES,
  profile: 'block-padding' as const,
  defaults: {
    color: 'surface',
    paint: 'solid',
    scale: LIST_ROOT_DEFAULT_SCALE,
    shape: 'soft',
    // User directive 2026-07-12: List root defaults to a FLAT card (elevation 0), was 4.
    elevation: 0,
  },
});

export const LIST_ITEM_VOCAB = defineLeaf({
  marker: 'aui-list-item',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: LIST_ITEM_SX_AXES,
  profile: 'default' as const,
  defaults: {
    color: 'surface',
    paint: 'text',
    scale: LIST_ITEM_DEFAULT_SCALE,
    shape: 'none',
    elevation: 0,
  },
  states: {
    unselected: { color: 'surface', paint: 'text', shape: 'none' },
    selected: { color: 'surface-alt', paint: 'text', shape: 'none' },
    indeterminate: { color: 'surface-alt', paint: 'text', shape: 'none' },
  },
});

export const useListRecipe = createVocabRecipe(LIST_ROOT_VOCAB);

export function listItemStateKey(props: {
  selected?: boolean;
  indeterminate?: boolean;
}): ListItemStateKey {
  if (props.indeterminate) return 'indeterminate';
  if (props.selected) return 'selected';
  return 'unselected';
}

export function buildListItemClasses(
  aui: ListItemAui | undefined,
  activeState: ListItemStateKey,
  disabled: boolean | undefined,
): string {
  return buildLeafClasses(
    LIST_ITEM_VOCAB,
    aui as (Appearance & { states?: Record<string, StateAppearance> }) | undefined,
    activeState,
    !!disabled,
  );
}

export function resolveListItemScale(
  aui: ListItemAui | undefined,
  activeState: ListItemStateKey,
): ListScale {
  return aui?.states?.[activeState]?.scale ?? aui?.scale ?? LIST_ITEM_DEFAULT_SCALE;
}
