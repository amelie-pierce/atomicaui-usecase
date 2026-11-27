import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Popover',
  title: 'Help popover',
  apps: ['pfd', 'pbs', 'agpd', 'rws'],
    layers: [
        {"id":"trigger","partId":"trigger","title":"Trigger","explanation":"Material help question button sits beside the field label; app shapes vary.","keyIdea":"The help trigger keeps an explanation available beside the field without adding permanent page text.","selector":"[data-base-ui-click-trigger]","code":["Popover.Trigger"]},
        {"id":"trigger-icon","partId":"trigger-icon","title":"Trigger icon","explanation":"Circle-question glyph sits inside the Material help trigger.","keyIdea":"A question glyph signals that the control offers supporting information rather than an input choice.","selector":"[data-base-ui-click-trigger] [class~=\"aui-contained-icon\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"Elevated soft help surface opens 4px above; width varies by app.","keyIdea":"The raised popup separates help copy from the form while staying anchored to its question mark.","selector":"[data-aui-popup-motion][role=\"dialog\"]","code":["Popover.Popup"]},
        {"id":"close-row","partId":"close-row","title":"Close row","explanation":"AGPD places its end-aligned close row above the help text.","keyIdea":"AGPD puts dismissal in its own top row because its help surface has no title bar.","selector":"[data-ug-part=\"close-row\"]"},
        {"id":"close","partId":"close","title":"Close","explanation":"X closes help; PBS, AGPD, and PFD place it differently.","keyIdea":"The close action hides the supplemental explanation and returns attention to the field.","selector":"[data-ug-part=\"close\"]"},
      ],
options: [
    { id: "pbs-help", showContext: false, name: "Inline close popover", apps: ["pbs"], source: {"pbs":"src/InputFields.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "pfd-help", showContext: false, name: "Square close popover", apps: ["pfd"], source: {"pfd":"src/pfd/fields.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "agpd-help", showContext: false, name: "Icon close popover", apps: ["agpd","rws"], source: {"agpd":"src/agpd/inputs.tsx","rws":"src/rws/inputs.tsx"} ,
      contextLayers: [

      ],
    },
  ],
  source: { pfd: 'src/pfd/fields.tsx', pbs: 'src/InputFields.tsx', agpd: 'src/agpd/inputs.tsx', rws: 'src/rws/inputs.tsx' },
  summary: 'A short text popover opened from a circle-question trigger beside a field label, closed by an X or an outside click.',
  where: 'After the label of an input field in PFD, PBS, AGPD and RWS (HCS, ACE, ADM and HS use a Tooltip for field help). Real source: the help popover of each app (the paths are in the cases).',
  when: 'Use it for help text the user opens on purpose and may need to read for a while, or that holds a link or a diagram. Use a Tooltip for one short hover hint. Do not use it for a form or menu (Popover-002, Popover-003).',
  how: 'The Popover opens from `Popover.Trigger` (a text `Button` with `ContainedIcon` circle-question) above it (`side="top"`, `sideOffset={4}`); the Popup renders a `View` (color surface, solid, profile default, soft, elevation 4). Field help has three groups: PBS (a row, the text fills it and an xs `IconButton` X sits at its end, 320px), PFD (a column, a square Button X in its own row above the text, up to 384px) and AGPD and RWS (a 320px column, an xs `IconButton` X in its own row above the text). The close X itself is Button-029. The scenes leave out the optional image or diagram, and PBS\'s link parser.',
  anatomy: [
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[data-base-ui-click-trigger]',
      description: 'The text circle-question button labelled "Material help" beside the field label; it is a compact square in PBS and the example and a square in PFD and AGPD.',
    },
    {
      id: 'trigger-icon',
      name: 'Trigger icon',
      selector: '[data-base-ui-click-trigger] [class~="aui-contained-icon"]',
      description: 'The circle-question glyph inside the help trigger.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[data-aui-popup-motion][role="dialog"]',
      description: 'The elevated soft surface (surface colour, solid, elevation 4) that opens above the trigger with a 4px offset: 320px wide, and up to 384px in PFD.',
    },
    {
      id: 'help-text',
      name: 'Help text',
      text: true,
      description: 'The p3 sentence "Select the base material of the member."; in PBS and the example it fills the row beside the close X, in the other apps it sits under it.',
    },
    {
      id: 'close-row',
      name: 'Close row',
      description: 'The end-aligned row above the text in AGPD that holds only the close X.',
    },
    {
      id: 'close',
      name: 'Close',
      description: 'The X that closes the popover: an xs icon button at the end of the row in PBS, in its own row in AGPD, and a square Button in PFD.',
    },
  ],
});
