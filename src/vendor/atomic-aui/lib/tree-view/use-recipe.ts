// modules/design/atomic-aui/src/lib/tree-view/use-recipe.ts
//
// TreeView recipe layer. TreeView is a hand-crafted ARIA tree (Base UI ships no tree primitive): the
// root is a stateless frame, and each row (`TreeView.ItemContent`) is a selectable frame whose active
// state comes from the tree's single-selection model. Mirrors the List recipe (lib/list/use-recipe.ts).
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

export type TreeViewColor = AuiRecipeColor;
export type TreeViewPaint = AuiRecipePaint;
export type TreeViewScale = AuiRecipeScale;
export type TreeViewProfile = AuiScaleProfile;
export type TreeViewShape = AuiRecipeShape;
export type TreeViewElevation = AuiElevation;

/** Spacing rail for `indent`: the `--p-px-<n>` spacing tokens. */
export const TREE_VIEW_SPACINGS = ['0', '2', '4', '6', '8', '12', '16', '20', '24'] as const;
export type TreeViewSpacing = (typeof TREE_VIEW_SPACINGS)[number];

/** The row's appearance state. Single selection only this round; `indeterminate` is reserved. */
export type TreeViewItemStateKey = 'unselected' | 'selected' | 'indeterminate';

export const TREE_VIEW_ITEM_STATE_KEYS = [
  'unselected',
  'selected',
  'indeterminate',
] as const satisfies readonly TreeViewItemStateKey[];

// The reference ships sm + md; sm is the default for the root and every row (a "sm tree" renders sm rows).
export const TREE_VIEW_ROOT_DEFAULT_SCALE: TreeViewScale = 'sm';
export const TREE_VIEW_ITEM_DEFAULT_SCALE: TreeViewScale = 'sm';

export const TREE_VIEW_ROOT_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];
export const TREE_VIEW_ITEM_SX_AXES = Object.keys(STYLE_PROP_MAP) as (keyof AuiStyleProps)[];

export type TreeViewAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
};

export type TreeViewItemStateAppearance = Omit<StateAppearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
};

export type TreeViewItemContentAui = Omit<Appearance, 'sx'> & {
  sx?: AuiFrameStyleProps;
  states?: Partial<Record<TreeViewItemStateKey, TreeViewItemStateAppearance>>;
};

// Root: a flat, solid surface frame (the same card silhouette as List) that carries the block padding.
export const TREE_VIEW_ROOT_VOCAB = defineLeaf({
  marker: 'aui-tree-view',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: TREE_VIEW_ROOT_SX_AXES,
  profile: 'block-padding' as const,
  defaults: {
    color: 'surface',
    paint: 'solid',
    scale: TREE_VIEW_ROOT_DEFAULT_SCALE,
    shape: 'soft',
    elevation: 0,
  },
});

// Row: transparent `text` paint when unselected, a `surface-alt` solid fill when selected.
export const TREE_VIEW_ITEM_VOCAB = defineLeaf({
  marker: 'aui-tree-view-item-content',
  contextAxes: ['color', 'paint', 'scale', 'shape'] as const,
  sxAxes: TREE_VIEW_ITEM_SX_AXES,
  profile: 'default' as const,
  defaults: {
    color: 'surface',
    paint: 'text',
    scale: TREE_VIEW_ITEM_DEFAULT_SCALE,
    shape: 'soft',
    elevation: 0,
  },
  states: {
    unselected: { color: 'surface', paint: 'text', shape: 'soft' },
    selected: { color: 'surface-alt', paint: 'solid', shape: 'soft' },
    indeterminate: { color: 'surface-alt', paint: 'solid', shape: 'soft' },
  },
});

export const useTreeViewRecipe = createVocabRecipe(TREE_VIEW_ROOT_VOCAB);

export function treeViewItemStateKey(props: { selected?: boolean }): TreeViewItemStateKey {
  return props.selected ? 'selected' : 'unselected';
}

export function buildTreeViewItemClasses(
  aui: TreeViewItemContentAui | undefined,
  activeState: TreeViewItemStateKey,
  disabled: boolean | undefined,
): string {
  return buildLeafClasses(
    TREE_VIEW_ITEM_VOCAB,
    aui as (Appearance & { states?: Record<string, StateAppearance> }) | undefined,
    activeState,
    !!disabled,
  );
}

export function resolveTreeViewItemScale(
  aui: TreeViewItemContentAui | undefined,
  activeState: TreeViewItemStateKey,
): TreeViewScale {
  return aui?.states?.[activeState]?.scale ?? aui?.scale ?? TREE_VIEW_ITEM_DEFAULT_SCALE;
}
