import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single-line field',
  title: 'Search field',
  apps: ['hcs', 'hs', 'pfd', 'fd', 'pbs', 'rws'],
  options: [
    { id: "hs-search", name: "Search field", apps: ["hcs","hs","pfd","fd"], note: "The box ends with a clear button.", source: {"hcs":"src/App.tsx","hs":"src/hs/ResultsTable.tsx","pfd":"src/pfd/ResultsTable.tsx","fd":"src/components/Results.jsx"} },
    { id: "pbs-search", name: "Search field — UI variant 2", apps: ["pbs","rws"], note: "Icon only: the box has no clear button.", source: {"pbs":"src/ResultsSection.tsx","rws":"src/rws/output.tsx"} },
  ],
  source: { hcs: 'src/App.tsx', hs: 'src/hs/ResultsTable.tsx', pfd: 'src/pfd/ResultsTable.tsx', fd: 'src/components/Results.jsx', pbs: 'src/ResultsSection.tsx', rws: 'src/rws/output.tsx' },
  summary: 'A search box with a magnifying-glass icon at the start and, in some apps, a clear button at the end.',
  where: 'The table toolbar of HCS, HS, PFD, FD, PBS and RWS. The same icon-only box sits above the column list popovers (HS, HCS, FD) and the release notes of the About dialogs (HCS, HS, PBS, PFD, RWS).',
  when: 'Use it to filter a table or a list by text as the user types. Add the clear button where the box is a table toolbar and the user may want to reset in one click; leave it off a short list search.',
  how: 'Clear button (HCS, HS, PFD, FD): a Field at scale "sm" holds a Field.Control (28px outlined row) with a Field.Icon name "magnifying-glass", a Field.Input (placeholder "Search Table") and a Field.Button with aria-label "Clear search" holding a Field.ButtonIcon name "xmark" (20px, no fill). The kit shows the button only while the box has text, in every app, so the scene starts with a search term; an empty box looks like the icon-only group. The apps give the Field minWidth 112px and flex fill to share the toolbar row; the scene takes the host width. Icon only (PBS, RWS): the same field without the Field.Button; the input fills the row to its end. The apps show the field enabled. The scenes leave out the Reset filters button and the other toolbar controls (Button-008 and the table use cases cover them).',
  anatomy: [
    {
      id: "field",
      name: "Field",
      token: "Field",
      selector: "[class~=\"aui-field\"]",
      description: "The search wrapper at scale \"sm\"; the apps give it a minWidth of 112px and flex fill so it shares a toolbar row.",
      code: [
        "<Field aui={{ scale: 'sm' }}>",
        "  …",
        "</Field>",
      ].join("\n"),
    },
    {
      id: "control",
      name: "Control",
      token: "Field.Control",
      selector: "[class~=\"aui-field-control\"]",
      description: "The 28px outlined row that holds the magnifying glass, the input and, in HCS, HS, PFD and FD, the clear button.",
      code: [
        "<Field.Control>",
        "  <Field.Icon name=\"magnifying-glass\" />",
        "  <Field.Input … />",
        "</Field.Control>",
      ].join("\n"),
    },
    {
      id: "icon",
      name: "Search icon",
      token: "Field.Icon",
      selector: "[class~=\"aui-field-control\"] > [class~=\"aui-contained-icon\"]",
      description: "The leading magnifying-glass icon that marks the box as a search.",
      code: [
        "<Field.Icon name=\"magnifying-glass\" />",
      ].join("\n"),
    },
    {
      id: "input",
      name: "Input",
      token: "Field.Input",
      selector: "[class~=\"aui-field-control\"] > [class~=\"aui-input\"]",
      description: "The text input with the \"Search Table\" placeholder and aria-label, filling the rest of the row.",
      code: [
        "<Field.Input aria-label=\"Search Table\" placeholder=\"Search Table\" />",
      ].join("\n"),
    },
    {
      id: "clear",
      name: "Clear button",
      token: "Field.Button",
      selector: "[class~=\"aui-field-button\"]",
      description: "The xmark button labelled \"Clear search\" at the end of the box; it only appears once the box has text, and PBS and RWS leave it out.",
      code: [
        "<Field.Button aria-label=\"Clear search\">",
        "  <Field.ButtonIcon name=\"xmark\" />",
        "</Field.Button>",
      ].join("\n"),
    },
  ],
});
