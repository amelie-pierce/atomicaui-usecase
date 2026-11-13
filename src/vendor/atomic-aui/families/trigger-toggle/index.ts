// modules/design/atomic-aui/src/families/trigger-toggle/index.ts
//
// Internal barrel for the canonical-state trigger family. NOT re-exported from the package public
// surface (like the other families — imported directly by components).
export { triggerToggleStateKey } from './state-key';
export type { EnabledStateKey, TriggerToggleState } from './state-key';
export { createTriggerToggleRecipe } from './create-trigger-toggle-recipe';
export type { TriggerToggleRecipeProps } from './create-trigger-toggle-recipe';
