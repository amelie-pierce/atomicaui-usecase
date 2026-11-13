// modules/design/atomic-aui/src/lib/label/index.ts
//
// Public surface for the Label primitive.
export {
  Label,
  LABEL_VOCAB,
  LABEL_SX_AXES,
  LABEL_DEFAULT_SCALE,
  buildLabelClasses,
} from './label';
export { createControlLabel, renderLabeledControl } from './control-label';
export type { ControlLabelProps } from './control-label';
export type {
  LabelProps,
  LabelAui,
  LabelColor,
  LabelPaint,
  LabelScale,
  LabelProfile,
  LabelShape,
  LabelElevation,
} from './label';
