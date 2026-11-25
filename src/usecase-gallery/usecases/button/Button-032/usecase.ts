import { defineUsecase } from '../../../define';

const LABEL_ROW_CONTEXT = [
  { id: 'label-row', name: 'Label row', selector: '[data-ug-part="label-row"]', description: 'The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control.' },
];

const HCS_CONTEXT = [
  { id: 'input-pane', name: 'Input pane', selector: '[data-ug-part="input-pane"]', description: 'The surface-alt Input pane that frames the Load Properties field.' },
  { id: 'label-row', name: 'Label row', selector: '[data-ug-part="label-row"]', description: 'The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control.' },
];

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Open field help button',
  apps: ['hcs', 'pbs', 'rws', 'hs', 'adm', 'pfd', 'agpd'],
    layers: [
        {"id":"help","partId":"help","title":"Help button","explanation":"The 20px transparent secondary circle-question button that sits beside the field label; the Look select swaps it for the 28px ghost version. In scenes it is a Button around a ContainedIcon (square or square-compact, RWS fixed at 20px).","keyIdea":"The 20px transparent secondary circle-question button that sits beside the field label; the Look select swaps it for the 28px ghost version.","selector":"[class~=\"aui-button\"][aria-label*=\"elp\"]"},
        {"id":"help-icon","partId":"help-icon","title":"Help icon","explanation":"The circle-question glyph centred in the help button.","keyIdea":"The circle-question glyph centred in the help button.","selector":"[class~=\"aui-button\"][aria-label*=\"elp\"] > :is([class~=\"aui-icon\"], [class~=\"aui-contained-icon\"])"},
        {"id":"label","partId":"label","title":"Field label","explanation":"The label (Material, or Download Duration in HCS) that names the control the help explains.","keyIdea":"The label (Material, or Download Duration in HCS) that names the control the help explains.","selector":"[class~=\"aui-field-label\"]"},
        {"id":"control","partId":"control","title":"Field control","explanation":"The input (Steel) in ADM, HS, PBS, PFD and RWS scenes that the help text describes.","keyIdea":"The input (Steel) in ADM, HS, PBS, PFD and RWS scenes that the help text describes.","selector":"[class~=\"aui-field-control\"]"},
        {"id":"tooltip","partId":"tooltip","title":"Help tooltip","explanation":"ADM and HS open the explanation as a tooltip above the button, up to 256px (ADM) or 384px (HS) wide.","keyIdea":"ADM and HS open the explanation as a tooltip above the button, up to 256px (ADM) or 384px (HS) wide.","selector":"[class~=\"aui-tooltip-popup\"]"},
        {"id":"popover","partId":"popover","title":"Help popover","explanation":"PBS, PFD and RWS open the explanation in a solid popover (320px or 384px max) above the button.","keyIdea":"PBS, PFD and RWS open the explanation in a solid popover (320px or 384px max) above the button.","selector":"[data-aui-popup-motion][role=\"dialog\"]"},
        {"id":"select","partId":"select","title":"Select trigger","explanation":"HCS only: the Snow (115) select under the Download Duration label.","keyIdea":"HCS only: the Snow (115) select under the Download Duration label.","selector":"[class~=\"aui-select-trigger\"]"},
      ],
options: [
    { id: "hcs-field-help", contextAnatomy: HCS_CONTEXT, name: "Ghost, 20px", apps: ["hcs"], source: {"hcs":"src/App.tsx"} ,
      contextLayers: [
        {"id":"context-input-pane","partId":"input-pane","title":"Input pane","explanation":"The surface-alt Input pane that frames the Load Properties field.","keyIdea":"The surface-alt Input pane that frames the Load Properties field.","selector":"[data-ug-part=\"input-pane\"]","scope":"context"},
        {"id":"context-label-row","partId":"label-row","title":"Label row","explanation":"The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control.","keyIdea":"The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control.","selector":"[data-ug-part=\"label-row\"]","scope":"context"},
      ],
    },
    { id: "pbs-field-help", contextAnatomy: LABEL_ROW_CONTEXT, name: "Ghost, 20px — UI variant 2", apps: ["pbs"], source: {"pbs":"src/InputFields.tsx"} ,
      contextLayers: [
        {"id":"context-label-row","partId":"label-row","title":"Label row","explanation":"The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control.","keyIdea":"The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control.","selector":"[data-ug-part=\"label-row\"]","scope":"context"},
      ],
    },
    { id: "rws-field-help", contextAnatomy: LABEL_ROW_CONTEXT, name: "Ghost, 20px — UI variant 3", apps: ["rws"], source: {"rws":"src/rws/inputs.tsx"} ,
      contextLayers: [
        {"id":"context-label-row","partId":"label-row","title":"Label row","explanation":"The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control.","keyIdea":"The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control.","selector":"[data-ug-part=\"label-row\"]","scope":"context"},
      ],
    },
    { id: "hs-field-help", contextAnatomy: LABEL_ROW_CONTEXT, name: "Ghost, 28px", apps: ["hs"], source: {"hs":"src/hs/InputFields.tsx"} ,
      contextLayers: [
        {"id":"context-label-row","partId":"label-row","title":"Label row","explanation":"The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control.","keyIdea":"The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control.","selector":"[data-ug-part=\"label-row\"]","scope":"context"},
      ],
    },
    { id: "adm-field-help", contextAnatomy: LABEL_ROW_CONTEXT, name: "Ghost, 28px — UI variant 2", apps: ["adm"], source: {"adm":"src/shared/lib/tooltip/AdmHelpTooltip.tsx"} ,
      contextLayers: [
        {"id":"context-label-row","partId":"label-row","title":"Label row","explanation":"The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control.","keyIdea":"The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control.","selector":"[data-ug-part=\"label-row\"]","scope":"context"},
      ],
    },
    { id: "pfd-field-help", contextAnatomy: LABEL_ROW_CONTEXT, name: "Ghost, 28px — UI variant 3", apps: ["pfd","agpd"], source: {"pfd":"src/pfd/fields.tsx","agpd":"src/agpd/inputs.tsx"} ,
      contextLayers: [
        {"id":"context-label-row","partId":"label-row","title":"Label row","explanation":"The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control.","keyIdea":"The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control.","selector":"[data-ug-part=\"label-row\"]","scope":"context"},
      ],
    },
  ],
  source: { hcs: 'src/components/F01Experience.tsx', pbs: 'src/ResultsSection.tsx', rws: 'src/rws/ShellDialogs.tsx', hs: 'src/hs/InputFields.tsx', adm: 'src/shared/lib/tooltip/AdmHelpTooltip.tsx', pfd: 'src/pfd/fields.tsx', agpd: 'src/agpd/inputs.tsx' },
  summary: 'A transparent icon-only IconButton with a circle-question opens the help of a field from beside its label; the example is the 20px one and the Look select shows the 28px one.',
  where: 'After a field label in the input pane. HCS, PBS and RWS draw it as a 20px square that opens a popover; HS and ADM draw a 28px square that opens a tooltip; PFD and AGPD draw the 28px square that opens a popover. The popover is closed by Button-029.',
  when: 'Use it to explain one field without adding permanent text. Always set aria-label; the popover or tooltip it opens holds the explanation.',
  how: 'Ghost, 20px (HCS, PBS, RWS). HCS: an IconButton with aui scale "sm", profile "contained", color "secondary", paint "text" and shape "soft", with the circle-question glyph. '
    + 'In context it is the Load Properties section: Download Duration alone, the label row (label text, then the icon, a flex row) above its select; the other fields are left out. '
    + 'PBS: a Button with a ContainedIcon circle-question child at profile "square-compact" so the label row keeps its height, opening a 320px popover. '
    + 'RWS: a Button at profile "square" pinned to 20px by sx, opening a 320px popover. '
    + 'Ghost, 28px (HS, ADM, PFD, AGPD): aui color "secondary", paint "text", scale "sm", shape "soft" and profile "square" on an IconButton; the apps that write the circle-question as a Button with a ContainedIcon child at profile "square" get the same 28px box and glyph, and the scene writes that control. '
    + 'HS: a Tooltip above it, 4px offset, up to 384px, so it has no close. ADM: the same square Button with a Tooltip above it, 8px offset, painted solid secondary at scale "sm", up to 256px. PFD and AGPD (one group): the same square Button opening a popover, top, 4px offset, a surface card up to 384px. '
    + 'Each help scene keeps one labelled field and one sentence of help text.',
  anatomy: [
    { id: 'help', name: 'Help button', selector: '[class~="aui-button"][aria-label*="elp"]', description: 'The 20px transparent secondary circle-question button that sits beside the field label; the Look select swaps it for the 28px ghost version. In scenes it is a Button around a ContainedIcon (square or square-compact, RWS fixed at 20px).' },
    { id: 'help-icon', name: 'Help icon', selector: '[class~="aui-button"][aria-label*="elp"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])', description: 'The circle-question glyph centred in the help button.' },
    { id: 'label', name: 'Field label', selector: '[class~="aui-field-label"]', description: 'The label (Material, or Download Duration in HCS) that names the control the help explains.' },
    { id: 'control', name: 'Field control', selector: '[class~="aui-field-control"]', description: 'The input (Steel) in ADM, HS, PBS, PFD and RWS scenes that the help text describes.' },
    { id: 'tooltip', name: 'Help tooltip', selector: '[class~="aui-tooltip-popup"]', description: 'ADM and HS open the explanation as a tooltip above the button, up to 256px (ADM) or 384px (HS) wide.' },
    { id: 'popover', name: 'Help popover', selector: '[data-aui-popup-motion][role="dialog"]', description: 'PBS, PFD and RWS open the explanation in a solid popover (320px or 384px max) above the button.' },
    { id: 'select', name: 'Select trigger', selector: '[class~="aui-select-trigger"]', description: 'HCS only: the Snow (115) select under the Download Duration label.' },
  ],
});
