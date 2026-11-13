// Public surface for the CardGroup component (a selection-group container over rich Card content:
// Root + Search/ViewToggle/Items/Item/Empty). Every part + type is re-exported from the package
// `src/index.ts` too (the 2026-07-12 missing-barrel-exports lesson).
export { CardGroup } from './card-group';
export type {
  CardGroupProps,
  CardGroupItemProps,
  CardGroupItemsProps,
  CardGroupSearchProps,
  CardGroupViewToggleProps,
  CardGroupViewToggleAui,
  CardGroupToolbarProps,
  CardGroupLabelProps,
  CardGroupValue,
  // Mirrored item parts (D6) — the Card anatomy re-exposed under CardGroup.Item*.
  CardGroupItemImageProps,
  CardGroupItemImageContainerProps,
  CardGroupItemBodyProps,
  CardGroupItemHeaderProps,
  CardGroupItemTitleProps,
  CardGroupItemDescriptionProps,
  CardGroupItemActionProps,
  CardGroupItemContentProps,
  CardGroupItemFooterProps,
} from './card-group';
export {
  CARD_GROUP_DEFAULT_SCALE,
  CARD_GROUP_ITEM_VOCAB,
  CARD_GROUP_ITEM_SX_AXES,
  CARD_GROUP_ITEMS_VOCAB,
  CARD_GROUP_ITEMS_SX_AXES,
  CARD_GROUP_ROOT_VOCAB,
  CARD_GROUP_SX_AXES,
  buildCardGroupItemClasses,
  buildCardGroupItemsTrayClasses,
  useCardGroupRootRecipe,
} from './use-recipe';
export type {
  CardGroupColor,
  CardGroupPaint,
  CardGroupScale,
  CardGroupProfile,
  CardGroupShape,
  CardGroupElevation,
  CardGroupDisplay,
  CardGroupItemAui,
  CardGroupItemsAui,
  CardGroupItemStateKey,
  CardGroupRootAui,
} from './use-recipe';
