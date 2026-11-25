import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Reset filters button',

  apps: ['hcs', 'pfd', 'hs', 'fd'],
  options: [
    { id: "hcs-toolbar", name: "Toolbar", apps: ["hcs","pfd","hs"], contextAnatomy: [
      { id: "output-pane", name: "Output pane", description: "The Output pane frame, a surface-alt section cut to its title and toolbar." },
      { id: "output-title", name: "Output title", description: "The \"Output\" heading at the start of the pane header." },
      { id: "toolbar", name: "Output toolbar", description: "The wrapping row of small controls (8px gap) with the search field filling the line and Reset filters after it." },
      { id: "search", name: "Search field", description: "The Field with a magnifying-glass icon, the entered text \"Model\" and a clear (x) button." },
    ], source: {"hcs":"src/App.tsx","pfd":"src/pfd/ResultsTable.tsx","hs":"src/hs/ResultsTable.tsx"} },
    { id: "fd-toolbar", name: "Toolbar — UI variant 2", apps: ["fd"], contextAnatomy: [
      { id: "output-pane", name: "Output pane", description: "The Output pane frame, a surface-alt section cut to its title and toolbar." },
      { id: "output-title", name: "Output title", description: "The \"Output\" heading at the start of the pane header." },
      { id: "toolbar", name: "Output toolbar", description: "The wrapping row of small controls (8px gap) with the search field filling the line and Reset filters after it." },
      { id: "search", name: "Search field", description: "The Field with a magnifying-glass icon, the entered text \"Model\" and a clear (x) button." },
    ], source: {"fd":"src/components/Results.jsx"} },
  ],
  source: { hcs: 'src/App.tsx', pfd: 'src/pfd/ResultsTable.tsx', hs: 'src/hs/ResultsTable.tsx', fd: 'src/components/Results.jsx' },
  summary: 'A neutral default Button clears the active filters of a results table; FD draws it as a quiet text Button.',
  where: 'The toolbar row above the Output table, after the search field and before the result count and the product or status filter (left out of the scene). '
    + 'Real site source: HCS (Reset filters, App.tsx); PFD ResultsTable.tsx and HS ResultsTable.tsx write the same Button in the same row; FD Results.jsx writes a text Button in its toolbar. '
    + 'ACE, ADM, PBS, AGPD, RWS and ADC have no Reset filters Button.',
  when: 'Use it beside filter controls, shown only while a filter is active (a search, a status filter or a custom sort in FD). '
    + 'Prefer the plain default Button where clearing filters is a quiet action; FD keeps it as a borderless text Button to match its other toolbar actions.',
  how: 'The example is the HCS Button: set only aui scale "sm" (color "surface-alt" and paint "solid" are the defaults), with Button.Icon filter-circle-xmark (scale "sm") before the label. '
    + 'The preview groups the apps by distinct UI and the Document lists the same groups. '
    + 'HCS, PFD, HS: the Output toolbar is one wrapping row, the search field fills the line, then the button (rendered only while a filter is active); the three write the same Button and row. '
    + 'FD: the same row, but the Button is aui color "secondary", paint "text", scale "sm", shape "soft" with a plain filter-circle-xmark icon. '
    + 'The pane header actions, the muted result count, the product filter, the results table and Table Notes are left out.',
  anatomy: [
    {
      id: "container",
      name: "Container",
      description: "The Reset filters Button in the table toolbar: small and default gray in HCS, a borderless secondary text Button in FD.",
      selector: "[class~=\"aui-button\"]",
    },
    {
      id: "icon",
      name: "Icon",
      description: "The filter glyph with a cross that signals removing the active filters, at scale \"sm\".",
      selector: "[class~=\"aui-button\"] > :is([class~=\"aui-contained-icon\"], [class~=\"aui-icon\"])",
    },
    {
      id: "label",
      name: "Label",
      description: "The text \"Reset filters\" shown while a search or status filter is active.",
      selector: "[class~=\"aui-button\"]",
      text: true,
    },
  ],
});
