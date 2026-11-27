import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'visible-tab', name: 'Visible tab', selector: '[class~="aui-tabs-tab"]', description: 'The "Design 1" chip tab after the trigger; it stands for the design tab rail whose overflow the ellipsis menu lists.' },
];

export default defineUsecase({
  uiType: 'Dropdown with icon trigger',
  title: 'Filled icon trigger',
  apps: ['adc'],
    layers: [
        {"id":"trigger","partId":"trigger","title":"Trigger","explanation":"Square soft trigger opens hidden designs beyond the visible tab rail.","keyIdea":"The square trigger opens a list of designs hidden beyond the visible tab rail.","selector":"[class~=\"aui-dropdown-trigger\"]"},
        {"id":"icon","partId":"icon","title":"Icon","explanation":"The ellipsis-vertical glyph that is the only content of the trigger.","keyIdea":"The vertical ellipsis indicates additional actions or items beyond the current view.","selector":"[class~=\"aui-dropdown-trigger\"] > [class~=\"aui-contained-icon\"]","code":["Dropdown.Icon"]},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"Small popup aligns to trigger start and scrolls after 256px height.","keyIdea":"A height cap keeps many hidden designs scrollable within the phone stage.","selector":"[class~=\"aui-dropdown-popup\"]"},
        {"id":"item","partId":"item","title":"Item","explanation":"Plain unselected row activates Design 3, 4, or 5.","keyIdea":"Each plain row activates one hidden design and none is preselected.","selector":"[class~=\"aui-dropdown-item\"]"},
      ],
options: [
    { id: "adc-hidden-designs", name: "Overflow list", apps: ["adc"], source: {"adc":"src/adc/Workspace.tsx"}, contextAnatomy: CONTEXT_ANATOMY ,
      contextLayers: [
        {"id":"context-visible-tab","partId":"visible-tab","title":"Visible tab","explanation":"Design 1 chip represents the overflowed tab rail.","keyIdea":"The visible Design 1 tab shows the rail that overflowed into the hidden-design menu.","selector":"[class~=\"aui-tabs-tab\"]","scope":"context"},
      ],
    },
  ],
  source: { adc: 'src/adc/Workspace.tsx' },
  summary: 'An icon-only trigger opens a plain list of the items that no longer fit in a row; choosing one activates it.',
  where: 'The ADC design tab rail, at the start of the row before the design tabs; it appears only when some designs do not fit as tabs and lists exactly those.',
  when: 'Use it for the overflow of a tab row: the items that do not fit become plain rows of a menu, with no selected state, and the menu closes on choice. It is the plain Dropdown, not a Menubar menu.',
  how: 'ADC: a Dropdown whose Dropdown.Trigger is the square icon form: aria-label "Show hidden designs", color "surface-alt", paint "solid", scale "sm", profile "square", shape "soft", sx flex "none" and borderColor "default", holding a Dropdown.Icon "ellipsis-vertical". The popup is a Dropdown.Popup at scale "sm" with maxHeight "256" and overflowY "auto" (it scrolls when many designs are hidden), placed 4px below the trigger and aligned to its start. Each hidden design is a plain Dropdown.Item showing its name (or "Design N"); no item is selected, and choosing one activates that design tab. The app disables the trigger while a report is running; the scene shows it enabled. The scene is shown open beside one visible design tab (CHIP_AUI of the app: surface-alt, solid, soft); drag reorder, rename, the tab context menu and the other tabs are left out.',
  anatomy: [
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-dropdown-trigger"]',
      description: 'Square icon trigger labelled "Show hidden designs": color "surface-alt", paint "solid", soft shape, flex "none" with a default border.',
    },
    {
      id: 'icon',
      name: 'Icon',
      selector: '[class~="aui-dropdown-trigger"] > [class~="aui-contained-icon"]',
      description: 'The ellipsis-vertical glyph that is the only content of the trigger.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dropdown-popup"]',
      description: 'Popup at scale "sm", capped at 256px high and scrolling vertically when many designs are hidden, aligned to the trigger start.',
    },
    {
      id: 'item',
      name: 'Item',
      selector: '[class~="aui-dropdown-item"]',
      description: 'A plain row for one hidden design: Design 3, Design 4 or Design 5. None is selected; choosing one activates that tab.',
    },
  ],
});
