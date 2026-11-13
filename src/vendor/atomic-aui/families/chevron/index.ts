// modules/design/atomic-aui/src/families/chevron/index.ts
//
// Internal barrel for the shared chevron family (DRY glyph + composed-child split). Reused by
// Dropdown / Select / Menubar (and later Accordion). NOT re-exported from the package public surface
// (like the other families — they are imported directly by components).
export { defaultChevron } from './default-chevron';
export { createChevronPart } from './create-chevron-part';
export type { ChevronPartProps } from './create-chevron-part';
export { splitTriggerChildren } from './split-trigger-children';
export { composeChevron } from './compose-chevron';
export type { ComposeChevronOptions } from './compose-chevron';
