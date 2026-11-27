import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Switch',
  title: 'Switch with label',
  apps: ['hcs', 'hs', 'adm', 'pbs', 'rws', 'ace'],
    layers: [
        {"id":"switch","partId":"switch","title":"Switch","explanation":"On-by-default switch appears in popovers, toolbars, or dialogs.","keyIdea":"The switch changes one setting while allowing the same control to appear in several app contexts.","selector":"[class~=\"aui-switch\"]"},
        {"id":"thumb","partId":"thumb","title":"Thumb","explanation":"Thumb slides to track end when Group by model is enabled.","keyIdea":"The sliding thumb makes the binary setting position visible as it changes.","selector":"[class~=\"aui-switch-thumb\"]","code":["Switch"]},
        {"id":"label","partId":"label","title":"Label","explanation":"App labels include Group by model and Send me a copy.","keyIdea":"The option label explains the behavior affected by the switch.","selector":"[class~=\"aui-control-row\"] > [class~=\"aui-label\"]"},
      ],
options: [
    { id: "hcs-labelled", name: "Labelled switch", contextAnatomy: [{ id: 'columns-trigger', name: 'Configure columns trigger', description: 'The table-columns IconButton, labelled Configure columns, that opens the popover under it.' }, { id: 'columns-popover', name: 'Configure columns popover', description: 'The elevated popover, 320px wide, anchored under the trigger that holds the column list.' }], apps: ["hcs","hs"], source: {"hcs":"src/components/ColumnVisibility.tsx","hs":"src/hs/ColumnVisibility.tsx"} ,
      contextLayers: [
        {"id":"context-columns-trigger","partId":"columns-trigger","title":"Configure columns trigger","explanation":"The table-columns IconButton, labelled Configure columns, that opens the popover under it.","keyIdea":"The Configure columns trigger opens the control group for the results table.","selector":"[data-ug-part=\"columns-trigger\"]","scope":"context"},
        {"id":"context-columns-popover","partId":"columns-popover","title":"Configure columns popover","explanation":"320px column popover anchors beneath the settings trigger.","keyIdea":"The anchored popover groups column visibility choices in the same surface.","selector":"[data-ug-part=\"columns-popover\"]","scope":"context"},
      ],
    },
    { id: "adm-labelled", name: "Dialog copy switch", contextAnatomy: [{ id: 'dialog', name: 'Base plate dialog', description: 'The Dialog popup, titled Base plate, that hosts the switch.' }, { id: 'dialog-title', name: 'Dialog title', description: 'The raised title bar with the Base plate heading and a Close button at the end.' }, { id: 'dialog-body', name: 'Dialog body', description: 'The body area that holds the Include base plate switch in a column.' }], apps: ["adm"], source: {"adm":"src/features/viewer/components/EditModals/BasePlateModal.tsx"} ,
      contextLayers: [
        {"id":"context-dialog","partId":"dialog","title":"Base plate dialog","explanation":"The Dialog popup, titled Base plate, that hosts the switch.","keyIdea":"The Base plate dialog places its setting inside the task that edits that component.","selector":"[data-ug-part=\"dialog\"]","scope":"context"},
        {"id":"context-dialog-title","partId":"dialog-title","title":"Dialog title","explanation":"Raised title bar names the task and places Close at the end.","keyIdea":"The raised title identifies which component’s options are being changed.","selector":"[data-ug-part=\"dialog-title\"]","scope":"context"},
        {"id":"context-dialog-body","partId":"dialog-body","title":"Dialog body","explanation":"Column body holds Include base plate switch vertically.","keyIdea":"The dialog body separates the Include base plate setting from its footer actions.","selector":"[data-ug-part=\"dialog-body\"]","scope":"context"},
      ],
    },
    { id: "pbs-labelled", name: "Grouped setting switch", showContext: false, apps: ["pbs","rws"], source: {"pbs":"src/ResultsSection.tsx","rws":"src/rws/output.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "ace-labelled", name: "Feedback copy switch", contextAnatomy: [{ id: 'dialog', name: 'Feedback dialog', description: 'The Dialog popup, titled Feedback Form, that hosts the switch.' }, { id: 'dialog-title', name: 'Dialog title', description: 'The raised title bar with the Feedback Form heading and a Cancel close button at the end.' }, { id: 'dialog-body', name: 'Dialog body', description: 'The body area that holds the Send me a copy switch.' }, { id: 'dialog-actions', name: 'Dialog actions', description: 'The footer with a Cancel button and a solid secondary Send button.' }], apps: ["ace"], source: {"ace":"src/features/top-navigation/ui/FeedbackDialog.tsx"} ,
      contextLayers: [
        {"id":"context-dialog","partId":"dialog","title":"Feedback dialog","explanation":"The Dialog popup, titled Feedback Form, that hosts the switch.","keyIdea":"The feedback dialog keeps response-copy preference within the submission task.","selector":"[data-ug-part=\"dialog\"]","scope":"context"},
        {"id":"context-dialog-title","partId":"dialog-title","title":"Dialog title","explanation":"Raised title bar names the task and places Close at the end.","keyIdea":"The Feedback Form title names the form whose copy preference is being changed.","selector":"[data-ug-part=\"dialog-title\"]","scope":"context"},
        {"id":"context-dialog-body","partId":"dialog-body","title":"Dialog body","explanation":"Column body holds the Send me a copy switch vertically.","keyIdea":"The body places the opt-in beside the feedback fields it governs.","selector":"[data-ug-part=\"dialog-body\"]","scope":"context"},
        {"id":"context-dialog-actions","partId":"dialog-actions","title":"Dialog actions","explanation":"The footer with a Cancel button and a solid secondary Send button.","keyIdea":"The footer separates canceling the form from sending the selected response.","selector":"[data-ug-part=\"dialog-actions\"]","scope":"context"},
      ],
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
    },
    {
      id: "thumb",
      name: "Thumb",
      selector: "[class~=\"aui-switch-thumb\"]",
      description: "The thumb that slides to the end of the track when Group by model is on.",
    },
    {
      id: "label",
      name: "Label",
      selector: "[class~=\"aui-control-row\"] > [class~=\"aui-label\"]",
      description: "The option text \"Group by model\" beside the switch; the scenes swap it for Show Optimized Models, Send me a copy or the ADM draft switches.",
    },
  ],
});
