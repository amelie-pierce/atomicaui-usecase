import { defineUsecase } from '../../../define';

const INPUT_PANEL_CONTEXT = [
  { id: 'input-pane', name: 'Input pane', description: 'The soft surface-alt section labelled "Input panel" that holds the plate connection field.' },
  { id: 'input-title', name: 'Pane title', description: 'The semi-bold "Input" heading at the top of the pane.' },
];

const SETTINGS_CONTEXT = [
  { id: 'settings-trigger', name: 'Settings button', description: 'The Settings Button that opens the popover under it.' },
  { id: 'settings-popup', name: 'Settings popover', description: 'The elevated popover that holds the settings, here the Auto-rotate 3D model group.' },
  { id: 'settings-title', name: 'Settings title', description: 'The semi-bold "Settings" heading at the top of the popover.' },
];

export default defineUsecase({
  uiType: 'Radio',
  title: 'Option radio group',
  apps: ['agpd', 'rws', 'pbs', 'fd'],
    layers: [
        {"id":"group","partId":"group","title":"Radio group","explanation":"Row group defaults to Welded; FD shows its Yes or No variant.","keyIdea":"The group collects related plate-connection choices while ensuring only one can be active.","selector":"[class~=\"aui-radio-group\"]"},
        {"id":"group-label","partId":"group-label","title":"Group label","explanation":"Plate connection label starts the full-width row with 4px gap.","keyIdea":"The field label names the decision shared by all radio choices.","selector":"[class~=\"aui-radio-group\"] > [class~=\"aui-label\"]"},
        {"id":"radio","partId":"radio","title":"Radio","explanation":"Welded and Bolted circles use tonal unselected and solid primary selected states.","keyIdea":"Each radio offers one connection type as the mutually exclusive value.","selector":"[class~=\"aui-radio\"]"},
        {"id":"indicator","partId":"indicator","title":"Indicator","explanation":"The circle that shows which option is chosen.","keyIdea":"The inner circle shows which connection type currently supplies the field value.","selector":"[class~=\"aui-radio-indicator\"]","code":["RadioGroup"]},
        {"id":"label","partId":"label","title":"Label","explanation":"The option text, Welded or Bolted, beside its circle.","keyIdea":"The option text lets users distinguish Welded from Bolted without interpreting the control shape.","selector":"[class~=\"aui-control-row\"] > [class~=\"aui-label\"]"},
      ],
options: [
    { id: "agpd-inline", contextAnatomy: INPUT_PANEL_CONTEXT, name: "Labelled group", apps: ["agpd","rws","pbs"], source: {"agpd":"src/agpd/inputs.tsx","rws":"src/rws/inputs.tsx","pbs":"src/InputFields.tsx"} ,
      contextLayers: [
        {"id":"context-input-pane","partId":"input-pane","title":"Input pane","explanation":"Soft Input panel holds the plate-connection control and its value.","keyIdea":"The AGPD pane groups plate connection with the other inputs that define the model.","selector":"[data-ug-part=\"input-pane\"]","scope":"context"},
        {"id":"context-input-title","partId":"input-title","title":"Pane title","explanation":"The semi-bold \"Input\" heading at the top of the pane.","keyIdea":"The pane title tells users which workspace section contains this connection setting.","selector":"[data-ug-part=\"input-title\"]","scope":"context"},
      ],
    },
    { id: "fd-settings", contextAnatomy: SETTINGS_CONTEXT, name: "Settings popover radios", apps: ["fd"], source: {"fd":"src/App.jsx"} ,
      contextLayers: [
        {"id":"context-settings-trigger","partId":"settings-trigger","title":"Settings button","explanation":"The Settings Button that opens the popover under it.","keyIdea":"The Settings button is the anchor for preferences that are separate from the input form.","selector":"[data-ug-part=\"settings-trigger\"]","scope":"context"},
        {"id":"context-settings-popup","partId":"settings-popup","title":"Settings popover","explanation":"Elevated settings popover contains the Auto-rotate 3D model group.","keyIdea":"The elevated settings surface keeps automatic rotation near its invoking control.","selector":"[data-ug-part=\"settings-popup\"]","scope":"context"},
        {"id":"context-settings-title","partId":"settings-title","title":"Settings title","explanation":"The semi-bold \"Settings\" heading at the top of the popover.","keyIdea":"The heading names the preference group before the user changes a setting.","selector":"[data-ug-part=\"settings-title\"]","scope":"context"},
      ],
    },
  ],
  source: {
    agpd: 'src/agpd/inputs.tsx',
    rws: 'src/rws/inputs.tsx',
    pbs: 'src/InputFields.tsx',
    fd: 'src/App.jsx',
  },
  summary: 'A group of radios under a form label that picks one option among a few named ones: a plate or fastener option, Auto-rotate 3D model Yes or No.',
  where: 'The input panel of AGPD, RWS and PBS (inline radios under a form label, for example a plate or fastener option) and the Auto-rotate 3D model setting in the Settings popover of the FD phone drawer. Real site source: the input fields (AGPD, RWS, PBS) and App.jsx (FD) (the paths are in source).',
  when: 'Use it for one input of a form that is a choice among two to four short, always visible options, with a label. Use Select-001 when the list is longer. The camera projection that sits next to the other view controls is Radio-002.',
  how: 'One RadioGroup at scale "sm" with no padding holds the Radios in the tonal outlined selection look (an unselected outlined tonal surface, a solid primary selected), 22px dots with 16px text; the example is the labelled group. Inline (AGPD, RWS, PBS): direction "row", whose RadioGroup.Label is a row (gap 4, width fill) on its own first line, then the Radios with 8 between them. PBS wraps its radios in a flex row with a 12 gap and a 3 column gap under the label, a 4px spacing difference that renders the same, so it is in this group (measured in the gallery). Stacked (FD): the default column direction with a plain RadioGroup.Label above the Yes and No radios, one per line. The scenes leave out the help trigger and lock hint of the label row, the per-radio disabled rule, the label highlighted in error (PBS) and the drawer around the settings popover.',
  anatomy: [
    {
      id: "group",
      name: "Radio group",
      selector: "[class~=\"aui-radio-group\"]",
      description: "A row of radios (direction \"row\") with Welded selected by default; the FD Settings popover shows the same group as Yes or No.",
    },
    {
      id: "group-label",
      name: "Group label",
      selector: "[class~=\"aui-radio-group\"] > [class~=\"aui-label\"]",
      description: "The \"Plate connection\" form label at the start of the row, laid out as a flex row that fills the width with a gap of 4.",
    },
    {
      id: "radio",
      name: "Radio",
      selector: "[class~=\"aui-radio\"]",
      description: "One option, Welded or Bolted: a tonal surface circle with an outlined border when unselected and a solid primary circle when chosen.",
    },
    {
      id: "indicator",
      name: "Indicator",
      selector: "[class~=\"aui-radio-indicator\"]",
      description: "The circle that shows which option is chosen.",
    },
    {
      id: "label",
      name: "Label",
      selector: "[class~=\"aui-control-row\"] > [class~=\"aui-label\"]",
      description: "The option text, Welded or Bolted, beside its circle.",
    },
  ],
});
