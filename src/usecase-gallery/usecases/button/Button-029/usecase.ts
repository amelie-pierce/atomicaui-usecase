import { defineUsecase } from '../../../define';

const HCS_CONTEXT = [
  { id: 'help-intro', name: 'Help intro', selector: '[data-ug-part="help-intro"]', description: 'The line "Duration of load adjustments as specified by the code are as follows:" that fills the popup row and leaves the close X at its end.' },
  { id: 'duration-notes', name: 'Duration notes', selector: '[data-ug-part="duration-notes"]', description: 'The plain list of five load-duration notes under the intro, each with a quoted bold label and its description.' },
];

const PFD_CONTEXT = [
  { id: 'help-text', name: 'Help text', selector: '[data-ug-part="help-text"]', description: 'The "Select the base material of the member." text under the close button in the popup.' },
];

const PBS_CONTEXT = [
  { id: 'help-text', name: 'Help text', selector: '[data-ug-part="help-text"]', description: 'The "Select the base material of the member." text that fills the popup row beside the close X.' },
];

const AGPD_CONTEXT = [
  { id: 'close-row', name: 'Close row', selector: '[data-ug-part="close-row"]', description: 'The end-aligned row that holds only the close X above the help text.' },
  { id: 'help-text', name: 'Help text', selector: '[data-ug-part="help-text"]', description: 'The "Select the base material of the member." text under the close row.' },
];

const FD_CONTEXT = [
  { id: 'top-bar', name: 'Top bar', selector: '[class~="aui-menubar"]', description: 'The Menubar with the grip Apps button that opens this popover.' },
  { id: 'apps-title', name: 'Popover title', selector: '[data-ug-part="apps-title"]', description: 'The semi-bold "Explore More Applications" heading at the start of the title row, opposite the close button.' },
];

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Close popover button',

  apps: ['hcs', 'pfd', 'pbs', 'fd', 'agpd', 'rws'],
    layers: [
        {"id":"close","partId":"close","title":"Close","explanation":"Transparent X dismisses the popover; apps place it in different corners.","keyIdea":"The transparent close action dismisses the floating help surface.","selector":"[class~=\"aui-button\"][aria-label^=\"Close\"]"},
        {"id":"close-icon","partId":"close-icon","title":"Close icon","explanation":"The xmark glyph centred in the close button.","keyIdea":"The xmark identifies the control that closes the popover.","selector":"[class~=\"aui-button\"][aria-label^=\"Close\"] > :is([class~=\"aui-icon\"], [class~=\"aui-contained-icon\"])"},
        {"id":"popup","partId":"popup","title":"Popover popup","explanation":"Floating soft surface holds help text or the app list and Close.","keyIdea":"The popup contains contextual help or a short application list.","selector":"[data-aui-popup-motion][role=\"dialog\"]"},
        {"id":"help-trigger","partId":"help-trigger","title":"Help trigger","explanation":"Circle-question button anchors help to its related control.","keyIdea":"The question control opens help beside the field that needs explanation.","selector":"[class~=\"aui-button\"][aria-label*=\"elp\"]:not([aria-label^=\"Close\"])"},
        {"id":"apps-trigger","partId":"apps-trigger","title":"Apps trigger","explanation":"FD grip in the top bar opens the application list.","keyIdea":"The FD grip trigger opens the list of additional applications.","selector":"[class~=\"aui-button\"][aria-label=\"Apps\"]"},
      ],
options: [
    { id: "hcs-help-close", contextAnatomy: HCS_CONTEXT, name: "Help popover close", apps: ["hcs"], source: {"hcs":"src/components/HcsDownloadDurationHelp.tsx"} ,
      contextLayers: [
        {"id":"context-help-intro","partId":"help-intro","title":"Help intro","explanation":"Intro line explains the code’s load-duration adjustment rules.","keyIdea":"The intro line frames the detailed duration notes below it.","selector":"[data-ug-part=\"help-intro\"]","scope":"context"},
        {"id":"context-duration-notes","partId":"duration-notes","title":"Duration notes","explanation":"List gives five quoted load-duration labels with their explanations.","keyIdea":"The notes list pairs each load-duration category with its explanation.","selector":"[data-ug-part=\"duration-notes\"]","scope":"context"},
      ],
    },
    { id: "pfd-help-close", contextAnatomy: PFD_CONTEXT, name: "Popover close icon", apps: ["pfd"], source: {"pfd":"src/pfd/fields.tsx"} ,
      contextLayers: [
        {"id":"context-help-text","partId":"help-text","title":"Help text","explanation":"Text explains how to select the member’s base material.","keyIdea":"The help sentence explains the material choice beside the close affordance.","selector":"[data-ug-part=\"help-text\"]","scope":"context"},
      ],
    },
    { id: "pbs-help-close", contextAnatomy: PBS_CONTEXT, name: "Help popover X", apps: ["pbs"], source: {"pbs":"src/InputFields.tsx"} ,
      contextLayers: [
        {"id":"context-help-text","partId":"help-text","title":"Help text","explanation":"Text explains how to select the member’s base material.","keyIdea":"The FD help text shares its row with Close applications.","selector":"[data-ug-part=\"help-text\"]","scope":"context"},
      ],
    },
    { id: "agpd-help-close", contextAnatomy: AGPD_CONTEXT, name: "Field help close icon", apps: ["agpd","rws"], source: {"agpd":"src/agpd/inputs.tsx","rws":"src/rws/inputs.tsx"} ,
      contextLayers: [
        {"id":"context-close-row","partId":"close-row","title":"Close row","explanation":"End-aligned row contains only the dialog close X.","keyIdea":"The close row separates dismissal from the help copy below.","selector":"[data-ug-part=\"close-row\"]","scope":"context"},
        {"id":"context-help-text","partId":"help-text","title":"Help text","explanation":"Text explains how to select the member’s base material.","keyIdea":"The help copy sits under the close control for a clear reading order.","selector":"[data-ug-part=\"help-text\"]","scope":"context"},
      ],
    },
    { id: "fd-apps-close", contextAnatomy: FD_CONTEXT, name: "Apps popover close", apps: ["fd"], source: {"fd":"src/App.jsx"} ,
      contextLayers: [
        {"id":"context-top-bar","partId":"top-bar","title":"Top bar","explanation":"The Menubar with the grip Apps button that opens this popover.","keyIdea":"The top bar places the additional-applications trigger with navigation.","selector":"[class~=\"aui-menubar\"]","scope":"context"},
        {"id":"context-apps-title","partId":"apps-title","title":"Popover title","explanation":"Semi-bold heading names Explore More Applications beside Close.","keyIdea":"The heading names the list of applications opened from the top bar.","selector":"[data-ug-part=\"apps-title\"]","scope":"context"},
      ],
    },
  ],
  source: { hcs: 'src/components/F01Experience.tsx', pfd: 'src/pfd/ShellDialogs.tsx', pbs: 'src/ResultsSection.tsx', fd: 'src/components/ui.jsx', agpd: 'src/agpd/ShellDialogs.tsx', rws: 'src/rws/ShellDialogs.tsx' },
  summary: 'A transparent icon-only IconButton, 20px square, closes a popover from its corner.',
  where: 'The corner or title end of a popover: the help popover that opens from the circle-question trigger of a field (HCS, PFD, PBS, AGPD, RWS) and the FD apps popover. '
    + 'The trigger that opens the help is Button-032.',
  when: 'Use it to dismiss a popover without acting. Always set aria-label.',
  how: 'The example is the shared part: an IconButton with paint "text", profile "contained" and an aria-label; the apps differ only in the glyph, the props they set and where the button sits. '
    + 'The Popover is the supporting part the In context scene writes around it; IconButton needs the Font Awesome font to show its glyph. '
    + 'Help popover close: HCS (an IconButton at scale "sm", profile "square-compact", color "secondary", paint "text", shape "soft", sx flex "none", at the end of an intro row in a View card, surface, solid, soft, elevation 4, up to 34rem, above the circle-question trigger; top, start, 8px offset). '
    + 'PFD: a Button (not an IconButton) with a ContainedIcon xmark at profile "square", scale "sm", secondary, text, alone in its own row at the end above the text, in a column up to 384px. '
    + 'PBS: an IconButton at scale "xs", paint "text", profile "square-compact", shape "soft" and no color, at the end of a row beside the help text, in a 320px popup. '
    + 'AGPD and RWS: an IconButton with only scale "xs", right-aligned in its own row above the text, in a 320px column. The optional image or diagram of the PFD, AGPD and RWS popups is left out. '
    + 'Apps popover close: FD only (a Button with an xmark Icon child, color "secondary", paint "text", scale "sm", at the end of the title row "Explore More Applications" in the 288px apps popover opened from the top bar grip; the grid of app links is left out).',
  anatomy: [
    { id: 'close', name: 'Close', selector: '[class~="aui-button"][aria-label^="Close"]', description: 'The transparent xmark button that dismisses the popover; it is the 20px contained one in the example, and the scenes place it at the corner (AGPD, HCS, PBS) or use a Button with an icon (FD Close applications, PFD).' },
    { id: 'close-icon', name: 'Close icon', selector: '[class~="aui-button"][aria-label^="Close"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])', description: 'The xmark glyph centred in the close button.' },
    { id: 'popup', name: 'Popover popup', selector: '[data-aui-popup-motion][role="dialog"]', description: 'The floating surface (solid, soft, elevation 4) that holds the help text or the Explore More Applications list with the close button in its corner.' },
    { id: 'help-trigger', name: 'Help trigger', selector: '[class~="aui-button"][aria-label*="elp"]:not([aria-label^="Close"])', description: 'The circle-question button (Material help, Help with Download Duration) that anchors the popover in the help scenes.' },
    { id: 'apps-trigger', name: 'Apps trigger', selector: '[class~="aui-button"][aria-label="Apps"]', description: 'FD only: the grip button in the top bar that opens Explore More Applications.' },
  ],
});
