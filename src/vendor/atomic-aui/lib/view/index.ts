// modules/design/atomic-aui/src/lib/view/index.ts
//
// Public surface for the View primitive + its View.ScrollArea family.
export { View, VIEW_VOCAB, VIEW_SX_AXES, useViewRecipe } from './view';
export type { ViewProps, ViewAui } from './view';

export {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
  SCROLL_AREA_VOCAB,
  SCROLL_AREA_SX_AXES,
  SCROLL_AREA_SCROLLBAR_SX_AXES,
} from './scroll-area';
export type {
  ScrollAreaProps,
  ScrollAreaViewportProps,
  ScrollAreaScrollbarProps,
  ScrollAreaThumbProps,
  ScrollAreaCornerProps,
  ScrollAreaAui,
  ScrollAreaScrollbarSxKey,
  ScrollAreaThumbColor,
  ScrollAxis,
} from './scroll-area';
