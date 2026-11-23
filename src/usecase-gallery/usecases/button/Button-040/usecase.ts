import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Add result row button',
  look: 'Tonal, 28px',
  apps: ['pbs'],
  cases: [
    { id: 'pbs-row', name: 'Row add icon', apps: ['pbs'], source: { pbs: 'src/ResultsSection.tsx' } },
  ],
  source: { pbs: 'src/ResultsSection.tsx' },
  summary: 'A tonal plus IconButton, 28px square, adds one result row to a list.',
  where: 'The first cell of each result row of a results table. Real site source: PBS src/ResultsSection.tsx (a plus IconButton that adds the row to the Connection List; the app replaces it with a selection radio in edit mode). '
    + 'ADM, PFD, HCS, HS, FD, AGPD, RWS and ADC have no row add icon.',
  when: 'Use it when every row can be added on its own and the cell is too narrow for a label; use the labelled Button of Button-013 when one result is chosen elsewhere. Name it with a Tooltip and aria-label.',
  how: 'Set aui color "secondary", paint "tonal", scale "sm" and shape "soft" on an IconButton with the plus glyph; the default square profile gives the 28px box. '
    + 'In context it sits in the centred first cell of one result row inside a top Tooltip (4px offset) reading Add to Connection List; the table keeps one row and one other column, and the tooltip is closed.',
  anatomy: [
    { id: 'add', name: 'Add', token: 'IconButton', selector: '[class~="aui-button"][aria-label="Add to Connection List"]', description: 'The tonal secondary soft plus button that adds the result row to the Connection List.',
      code: `<IconButton name="plus" aria-label="Add to Connection List" aui={{ color: 'secondary', paint: 'tonal', scale: 'sm', shape: 'soft' }} />` },
    { id: 'add-icon', name: 'Plus icon', token: 'IconButton', selector: '[class~="aui-button"][aria-label="Add to Connection List"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])', description: 'The plus glyph centred in the button.',
      code: `<IconButton name="plus" aria-label="Add to Connection List" aui={{ color: 'secondary', paint: 'tonal', scale: 'sm', shape: 'soft' }} />` },
    { id: 'tooltip', name: 'Tooltip', token: 'Tooltip.Popup', selector: '[class~="aui-tooltip-popup"]', description: 'PBS tooltip above the button that repeats the action as Add to Connection List.',
      code: `<Tooltip.Popup>Add to Connection List</Tooltip.Popup>` },
    { id: 'cell', name: 'Add cell', token: 'Table.Cell', selector: '[class~="aui-table-cell"]:first-child', description: 'The centred first cell of the Model A-100 row that holds the button.',
      code: `<Table.Cell aui={{ sx: { textAlign: 'center' } }}>` },
    { id: 'header-cell', name: 'Add header', token: 'Table.HeaderCell', selector: '[class~="aui-table-header-cell"]:first-child', description: 'The unlabeled column heading (aria-label Add) over the add buttons.',
      code: `<Table.HeaderCell aui={{ color: 'raised' }} aria-label="Add" />` },
  ],
});
