import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Show column info button',
  look: 'Ghost, 20px',
  apps: ['fd'],
  cases: [
    { id: 'fd-header-info', name: 'Header info', apps: ['fd'], source: { fd: 'src/components/Results.jsx' } },
  ],
  source: { fd: 'src/components/ui.jsx' },
  summary: 'A transparent icon-only button with a circle-info opens an explanation popover from a table column header.',
  where: 'A table column header cell. Real site source: FD src/components/Results.jsx (FastenerPatternInfo). No other app has this control.',
  when: 'Use it to explain one column without adding permanent text; stop its click so it does not sort the column. Always set aria-label.',
  how: 'FD writes a Button (color "secondary", paint "text", scale "xs", shape "soft") with a circle-info Button.Icon, which opens a popover below it; the scene writes that Button, the example shows the IconButton form. '
    + 'The scene keeps one header cell and the first line of the popover. One group, FD only.',
  anatomy: [
    { id: 'info', name: 'Info button', token: 'IconButton', selector: '[class~="aui-button"][aria-label="Fastener Pattern"], [class~="aui-button"][aria-label="Column info"]', description: 'The xs transparent secondary circle-info button that explains a column; in FD it is a Button with Button.Icon beside the Fastener Pattern heading.',
      code: `<IconButton name="circle-info" aria-label="Column info" aui={{ color: 'secondary', paint: 'text', scale: 'xs', shape: 'soft', profile: 'contained' }} />` },
    { id: 'info-icon', name: 'Info icon', token: 'Button.Icon', selector: '[class~="aui-button"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])', description: 'The circle-info glyph that signals a note about the column.',
      code: `<Button.Icon name="circle-info" />` },
    { id: 'header-cell', name: 'Column header', token: 'Table.HeaderCell', selector: '[class~="aui-table-header-cell"]', description: 'The raised Fastener Pattern heading cell that carries the text and the info button with a 4px gap.',
      code: `<Table.HeaderCell aui={{ color: 'raised' }}>
  …
</Table.HeaderCell>` },
    { id: 'popup', name: 'Info popover', token: 'Popover.Popup', selector: '[data-aui-popup-motion][role="dialog"]', description: 'The 384px solid popover below the heading that states Fasteners are counted per row.',
      code: `<Popover.Popup initialFocus={false} aria-label="Fastener Pattern" render={<View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { width: '384' } }} />}>
  Fasteners are counted per row.
</Popover.Popup>` },
  ],
});
