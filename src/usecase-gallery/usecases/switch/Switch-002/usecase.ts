import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Switch',
  title: 'Switch with label',
  apps: ['hcs', 'hs', 'adm', 'pbs', 'rws', 'ace'],
options: [
    { id: "hcs-labelled", name: "Labelled switch", contextAnatomy: [{ id: 'columns-trigger', name: 'Configure columns trigger', description: 'The table-columns IconButton, labelled Configure columns, that opens the popover under it.' , lesson: {"explanation":"The table-columns IconButton, labelled Configure columns, that opens the popover under it.","selector":"[data-ug-part=\"columns-trigger\"]","scope":"context"}}, { id: 'columns-popover', name: 'Configure columns popover', description: 'The elevated popover, 320px wide, anchored under the trigger that holds the column list.' , lesson: {"explanation":"320px column popover anchors beneath the settings trigger.","selector":"[data-ug-part=\"columns-popover\"]","scope":"context"}}], apps: ["hcs","hs"], source: {"hcs":"src/components/ColumnVisibility.tsx","hs":"src/hs/ColumnVisibility.tsx"} ,
    },
    { id: "adm-labelled", name: "Dialog copy switch", contextAnatomy: [{ id: 'dialog', name: 'Base plate dialog', description: 'The Dialog popup, titled Base plate, that hosts the switch.' , lesson: {"explanation":"The Dialog popup, titled Base plate, that hosts the switch.","selector":"[data-ug-part=\"dialog\"]","scope":"context"}}, { id: 'dialog-title', name: 'Dialog title', description: 'The raised title bar with the Base plate heading and a Close button at the end.' , lesson: {"explanation":"Raised title bar names the task and places Close at the end.","selector":"[data-ug-part=\"dialog-title\"]","scope":"context"}}, { id: 'dialog-body', name: 'Dialog body', description: 'The body area that holds the Include base plate switch in a column.' , lesson: {"explanation":"Column body holds Include base plate switch vertically.","selector":"[data-ug-part=\"dialog-body\"]","scope":"context"}}], apps: ["adm"], source: {"adm":"src/features/viewer/components/EditModals/BasePlateModal.tsx"} ,
    },
    { id: "pbs-labelled", name: "Grouped setting switch", showContext: false, apps: ["pbs","rws"], source: {"pbs":"src/ResultsSection.tsx","rws":"src/rws/output.tsx"} ,
    },
    { id: "ace-labelled", name: "Feedback copy switch", contextAnatomy: [{ id: 'dialog', name: 'Feedback dialog', description: 'The Dialog popup, titled Feedback Form, that hosts the switch.' , lesson: {"explanation":"The Dialog popup, titled Feedback Form, that hosts the switch.","selector":"[data-ug-part=\"dialog\"]","scope":"context"}}, { id: 'dialog-title', name: 'Dialog title', description: 'The raised title bar with the Feedback Form heading and a Cancel close button at the end.' , lesson: {"explanation":"Raised title bar names the task and places Close at the end.","selector":"[data-ug-part=\"dialog-title\"]","scope":"context"}}, { id: 'dialog-body', name: 'Dialog body', description: 'The body area that holds the Send me a copy switch.' , lesson: {"explanation":"Column body holds the Send me a copy switch vertically.","selector":"[data-ug-part=\"dialog-body\"]","scope":"context"}}, { id: 'dialog-actions', name: 'Dialog actions', description: 'The footer with a Cancel button and a solid secondary Send button.' , lesson: {"explanation":"The footer with a Cancel button and a solid secondary Send button.","selector":"[data-ug-part=\"dialog-actions\"]","scope":"context"}}], apps: ["ace"], source: {"ace":"src/features/top-navigation/ui/FeedbackDialog.tsx"} ,
    },
  ],
  source: { hcs: 'src/components/ColumnVisibility.tsx', hs: 'src/hs/ColumnVisibility.tsx', adm: 'src/features/viewer/components/EditModals/BasePlateModal.tsx', pbs: 'src/ResultsSection.tsx', rws: 'src/rws/output.tsx', ace: 'src/features/top-navigation/ui/FeedbackDialog.tsx' },
  summary: 'A switch with its own text beside it that turns one option on or off.',
  where: 'HCS and HS: Group by model in the Configure columns popover. ADM: the draft switches of the Base plate editor. PBS and RWS: Show Optimized Models in the table toolbar. ACE: the dialog option Send me a copy (feedback form), and Download in Save as template, which writes the same switch.',
  when: 'Use it for one setting that applies at once and has a name of its own, with Switch.Label as the text so a click on the text toggles it. For a row of a list that names the switch, leave the label out (Switch-001); for a label at the start of a row and the switch at the far end, see Switch-001.',
  how: 'Compound Switch with a Switch.Label child; the gallery scene measured in headless Chromium has a 16px, 400 weight label 8px from the 44 by 22px track. The apps were not run; their props and states are read from the app source, and the groups follow the states each app writes. HCS, HS: states selected { color "primary", paint "solid" }; the scene measures on as rgb(255,83,8) with a white thumb at x=26, off as rgb(241,245,249) with no border and an rgb(18,18,18) thumb at x=4. ADM (TOGGLE_STATE_AUI): the same on, and off as rgb(255,255,255) with a 1px rgb(148,163,184) border and the thumb at x=5. PBS, RWS, ACE: no states, so the scene measures on and off both as rgb(241,245,249) and only the thumb moves (x=26 on, 4 off); PBS and RWS write scale "sm", which the scene measures at the same size as the default. The scenes show the switch enabled and on; RWS disables it when no optimized models exist. PBS and RWS share a toolbar scene; ACE has a separate feedback dialog scene. The scenes leave out the help trigger and other fields and controls of each container.',
  anatomy: [
    {
      id: "switch",
      name: "Switch",
      selector: "[class~=\"aui-switch\"]",
      description: "The on/off control, on by default, with a solid primary track when selected; each app places it in a popover, a table toolbar or a dialog.",
     lesson: {"explanation":"On-by-default switch appears in popovers, toolbars, or dialogs."}},
    {
      id: "thumb",
      name: "Thumb",
      selector: "[class~=\"aui-switch-thumb\"]",
      description: "The thumb that slides to the end of the track when Group by model is on.",
     lesson: {"explanation":"Thumb slides to track end when Group by model is enabled.","code":["Switch"]}},
    {
      id: "label",
      name: "Label",
      selector: "[class~=\"aui-control-row\"] > [class~=\"aui-label\"]",
      description: "The option text \"Group by model\" beside the switch; the scenes swap it for Show Optimized Models, Send me a copy or the ADM draft switches.",
     lesson: {"explanation":"App labels include Group by model and Send me a copy."}},
  ],
});
