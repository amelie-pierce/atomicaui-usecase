import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Editable table',
  title: 'Cell input table',
  apps: ['adm'],
  cases: [{ id: 'adm-cell-input', name: 'Cell input table', apps: ['adm'], source: { adm: 'src/features/design-inputs/components/GeometrySection/AnchorSpacingTable.tsx' } }],
  source: { adm: 'src/features/design-inputs/components/GeometrySection/AnchorSpacingTable.tsx' },
  summary: 'A table whose cells hold inputs: each spacing value is edited in its own number field.',
  where: 'ADM Design inputs, Geometry section: AnchorSpacingTable.tsx, the Anchor Spacing table with one row per anchor and a Column and a Row spacing cell.',
  when: 'Use it when a grid of values is edited in place. Give each input an aria-label (the column header is its visible label) and let the field fill the cell with minWidth 0 so it shrinks to the column. A table of read-only values is Table-001 or Table-003.',
  how: 'Table with aria-label, scroll "self" (fixed layout, so the columns share the width), aui scale "sm", shape "soft", width "fill". The index header and body cell both pin sx width "32" (head and body are separate tables under scroll "self"); the two value columns share the rest. Each value cell holds a Field.NumberField (width "fill", minWidth "0", min 1) with a Field.NumberFieldGroup (color "surface", paint "fixed"), a Field.NumberFieldInput (minWidth "0", textAlign "end") and a Field.NumberFieldUnit with the unit in a Symbol. The scene shows the enabled state; the app disables a cell beyond the pattern count and renders one row per anchor, so the scene leaves out the extra rows and the disabled cells. Only ADM has it, so there is one group.',
});
