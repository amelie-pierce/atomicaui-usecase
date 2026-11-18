import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Table',
  title: 'Cell select',
  apps: ['adc'],
  cases: [{ id: 'adc-table-cell', name: 'Cell select', apps: ['adc'], source: { adc: 'src/adc/components/ProductsPicker.tsx' } }],
  source: { adc: 'src/adc/components/ProductsPicker.tsx' },
  summary: 'A compact label-less select that fills a table cell and picks one value for the row.',
  where: 'The Hef column of the ADC Products table: each selected anchor row edits its effective embedment from a short list.',
  when: 'Use it for a value picked inside a table row, where the column header is the label. The control is the bare Select, with no Field around it; give it an aria-label because it has no visible one.',
  how: 'ADC: a Select with a Select.Trigger at scale "xs", color "surface", paint "fixed" and width "fill", so it takes the width of its cell; it holds Select.Value and Select.Chevron and carries aria-label "Hef". Select.Portal > Select.Positioner (side "bottom", sideOffset 4) > Select.Popup with matchTriggerWidth > Select.List holds Select.Items, each with Select.ItemText and a Select.ItemIndicator written with `{null}`. The app also shows a plain Button with a chevron in place of the select for rows that are not being edited, and opens the list on mount for the row just chosen (defaultOpen); the scene shows the open select in a fixed-width cell and leaves out the table, the other columns and the expand toggles.',
});
