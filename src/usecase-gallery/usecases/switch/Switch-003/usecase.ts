import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Switch',
  title: 'Switch with bordered off state',
  apps: ['adm'],
options: [
    { id: "adm-loads", name: "Load conditions", contextAnatomy: [{ id: 'input-pane', name: 'Input pane', description: 'The Input side pane (an aside, soft, surface-alt) that holds the form sections.' , lesson: {"explanation":"Soft Input side pane holds the form sections.","selector":"[data-ug-part=\"input-pane\"]","scope":"context"}}, { id: 'section', name: 'Load conditions section', description: 'The Accordion item, open, that groups the load condition rows.' , lesson: {"explanation":"The Accordion item, open, that groups the load condition rows.","selector":"[data-ug-part=\"section\"]","scope":"context"}}, { id: 'section-title', name: 'Section header', description: 'The Load conditions trigger, a semi-bold l4 label with a chevron, that collapses the section.' , lesson: {"explanation":"Semi-bold Load conditions trigger expands or collapses the section.","selector":"[data-ug-part=\"section-title\"]","scope":"context"}}], apps: ["adm"], source: {"adm":"src/features/design-inputs/components/LoadsSection/LoadConditionsFields.tsx"} ,
    },
  ],
  source: { adm: 'src/features/design-inputs/components/LoadsSection/LoadConditionsFields.tsx' },
  summary: 'A switch at the end of a form row, with the row\'s name at the start, turns the setting on or off; its off state is a white track with a thin border.',
  where: 'ADM load conditions in the input panel: three rows, each a Type l5 name with a help icon at the start and a Switch at the end.',
  when: 'Use it for an on and off choice that applies at once in the rows of a form, where the row text is the label and the switches line up at one edge, and the off switch needs a visible outline on a white panel. For a pale off track, see Switch-001.',
  how: 'A row View (flex, centred, space between, fill width, gap 8) holds the name in a Type role "l5" (bold, 12px) and a Switch with an aria-label equal to the name and no Switch.Label, with the shared toggle states (unselected tonal surface with an outlined border, selected primary solid). The gallery scene, measured in headless Chromium, shows off as an rgb(255,255,255) track with a 1px rgb(148,163,184) border and the thumb at x=5, on as the rgb(255,83,8) fill, 44 by 22px. The app was not run; its props and states are read from the app source. The name is a separate Type, so a click on it does not toggle. The scene shows the switch on and enabled and leaves out the help icon (the Field help trigger) and the server error line that one of the rows shows under it.',
  anatomy: [
    {
      id: "list",
      name: "List",
      selector: "[class~=\"aui-list\"]",
      description: "The \"Load conditions\" list of the ADM input panel, three rows each with a name and a switch.",
     lesson: {"explanation":"Load conditions list pairs each load name with a switch."}},
    {
      id: "row",
      name: "Row",
      selector: "[class~=\"aui-list-item\"]",
      description: "The Wind load row with the name at the start and its switch at the end.",
     lesson: {"explanation":"Wind load row places its switch after the label."}},
    {
      id: "row-text",
      name: "Row text",
      selector: "[class~=\"aui-list-item-text\"]",
      description: "The condition name \"Wind load\".",
     lesson: {"explanation":"Wind load label names this input switch row."}},
    {
      id: "row-actions",
      name: "Row actions",
      selector: "[class~=\"aui-list-item-actions\"]",
      description: "The slot at the end of the row that holds the switch.",
     lesson: {"explanation":"The slot at the end of the row that holds the switch."}},
    {
      id: "switch",
      name: "Switch",
      selector: "[class~=\"aui-switch\"]",
      description: "The off-by-default control whose unselected track is a surface-tonal white fill with a thin outlined border; selected it is solid primary.",
     lesson: {"explanation":"Off track is white and outlined; on track is solid primary."}},
    {
      id: "thumb",
      name: "Thumb",
      selector: "[class~=\"aui-switch-thumb\"]",
      description: "The thumb at the start of the white track while the load is off.",
     lesson: {"explanation":"Thumb rests at the left edge while the load is off.","code":["Switch"]}},
  ],
});
