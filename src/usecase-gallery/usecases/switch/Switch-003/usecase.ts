import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Switch',
  title: 'Switch with bordered off state',
  apps: ['adm'],
    layers: [
        {"id":"list","partId":"list","title":"List","explanation":"Three-row Load conditions list pairs each name with a switch.","keyIdea":"The list makes each load condition independently available for inclusion.","selector":"[class~=\"aui-list\"]"},
        {"id":"row","partId":"row","title":"Row","explanation":"Wind load row places its switch after the label.","keyIdea":"The row keeps Wind load’s name beside the control that toggles it.","selector":"[class~=\"aui-list-item\"]"},
        {"id":"row-text","partId":"row-text","title":"Row text","explanation":"Wind load label names this input switch row.","keyIdea":"The label names which load condition will be included in the calculation.","selector":"[class~=\"aui-list-item-text\"]"},
        {"id":"row-actions","partId":"row-actions","title":"Row actions","explanation":"The slot at the end of the row that holds the switch.","keyIdea":"The trailing slot reserves a consistent end position for each condition switch.","selector":"[class~=\"aui-list-item-actions\"]"},
        {"id":"switch","partId":"switch","title":"Switch","explanation":"Off track is white and outlined; on track is solid primary.","keyIdea":"An outlined idle track distinguishes an excluded load before it is enabled.","selector":"[class~=\"aui-switch\"]"},
        {"id":"thumb","partId":"thumb","title":"Thumb","explanation":"Thumb rests at the left edge while the load is off.","keyIdea":"The thumb at the track start shows that Wind load is currently off.","selector":"[class~=\"aui-switch-thumb\"]","code":["List"]},
      ],
options: [
    { id: "adm-loads", name: "Load conditions", contextAnatomy: [{ id: 'input-pane', name: 'Input pane', description: 'The Input side pane (an aside, soft, surface-alt) that holds the form sections.' }, { id: 'section', name: 'Load conditions section', description: 'The Accordion item, open, that groups the load condition rows.' }, { id: 'section-title', name: 'Section header', description: 'The Load conditions trigger, a semi-bold l4 label with a chevron, that collapses the section.' }], apps: ["adm"], source: {"adm":"src/features/design-inputs/components/LoadsSection/LoadConditionsFields.tsx"} ,
      contextLayers: [
        {"id":"context-input-pane","partId":"input-pane","title":"Input pane","explanation":"Soft Input side pane holds the form sections.","keyIdea":"The Input pane frames condition settings as part of the model’s editable inputs.","selector":"[data-ug-part=\"input-pane\"]","scope":"context"},
        {"id":"context-section","partId":"section","title":"Load conditions section","explanation":"The Accordion item, open, that groups the load condition rows.","keyIdea":"The open accordion item groups the load rows under one condition category.","selector":"[data-ug-part=\"section\"]","scope":"context"},
        {"id":"context-section-title","partId":"section-title","title":"Section header","explanation":"Semi-bold Load conditions trigger expands or collapses the section.","keyIdea":"The trigger label and chevron identify the section users can collapse after editing.","selector":"[data-ug-part=\"section-title\"]","scope":"context"},
      ],
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
    },
    {
      id: "row",
      name: "Row",
      selector: "[class~=\"aui-list-item\"]",
      description: "The Wind load row with the name at the start and its switch at the end.",
    },
    {
      id: "row-text",
      name: "Row text",
      selector: "[class~=\"aui-list-item-text\"]",
      description: "The condition name \"Wind load\".",
    },
    {
      id: "row-actions",
      name: "Row actions",
      selector: "[class~=\"aui-list-item-actions\"]",
      description: "The slot at the end of the row that holds the switch.",
    },
    {
      id: "switch",
      name: "Switch",
      selector: "[class~=\"aui-switch\"]",
      description: "The off-by-default control whose unselected track is a surface-tonal white fill with a thin outlined border; selected it is solid primary.",
    },
    {
      id: "thumb",
      name: "Thumb",
      selector: "[class~=\"aui-switch-thumb\"]",
      description: "The thumb at the start of the white track while the load is off.",
    },
  ],
});
