import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Tooltip on a radio',
  title: 'Radio option tooltip',
  apps: ['pbs', 'rws'],
    layers: [
        {"id":"group","partId":"group","title":"Radio group","explanation":"The \"Camera projection\" RadioGroup (scale \"sm\", no padding) whose options each carry their own tooltip.","keyIdea":"The \"Camera projection\" RadioGroup (scale \"sm\", no padding) whose options each carry their own tooltip.","selector":"[class~=\"aui-radio-group\"]"},
        {"id":"trigger","partId":"trigger","title":"Trigger","explanation":"The span, with closeOnClick off, that wraps the Perspective radio so the tooltip does not close on arrow-key selection.","keyIdea":"The span, with closeOnClick off, that wraps the Perspective radio so the tooltip does not close on arrow-key selection.","selector":"[data-ug-part=\"trigger\"]"},
        {"id":"radio","partId":"radio","title":"Radio","explanation":"The \"Perspective\" radio at scale \"sm\", selected by default.","keyIdea":"The \"Perspective\" radio at scale \"sm\", selected by default.","selector":"[class~=\"aui-radio\"]"},
        {"id":"radio-label","partId":"radio-label","title":"Radio label","explanation":"The visible option name \"Perspective\" beside the radio.","keyIdea":"The visible option name \"Perspective\" beside the radio.","selector":"[class~=\"aui-control-row\"] > [class~=\"aui-label\"]"},
        {"id":"positioner","partId":"positioner","title":"Positioner","explanation":"Places the note above the radio with a 4px offset (side=\"top\"); RWS requests the bottom side.","keyIdea":"Places the note above the radio with a 4px offset (side=\"top\"); RWS requests the bottom side.","selector":"[class~=\"aui-tooltip-positioner\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"The default tooltip surface for the one-line note.","keyIdea":"The default tooltip surface for the one-line note.","selector":"[class~=\"aui-tooltip-popup\"]"},
      ],
options: [
    { id: "pbs-viewer-radio", name: "Viewer control", showContext: false, apps: ["pbs","rws"], source: {"pbs":"src/Viewer.tsx","rws":"src/rws/Viewer.tsx"} ,
      contextLayers: [

      ],
    },
  ],
  source: { pbs: 'src/Viewer.tsx', rws: 'src/rws/Viewer.tsx' },
  summary: 'A radio option of a group, with its label beside it, shows a short note about the option in a small tooltip on hover or keyboard focus.',
  where: 'The view and member radios floating over the 3D viewer in PBS and RWS (the tooltip helper of Viewer).',
  when: 'Use it for a radio option whose effect is not obvious from its short label. Do not use it for an icon-only button (Tooltip-001) and not for long help text.',
  how: 'Compose Tooltip.Provider, a RadioGroup, Tooltip and Tooltip.Trigger with a span as render and closeOnClick off, so the arrow-key check does not close it; the Radio with its Radio.Label is the trigger child. Then Tooltip.Portal, Tooltip.Positioner and Tooltip.Popup. PBS and RWS are one group; from the tooltip source, the popup is the kit default and opens above (top) with a 4px offset and a one-line note, and RWS requests the bottom side. The app code was not run. The scene shows one radio of the group with the tooltip open and leaves out the other viewer controls and the canvas.',
  anatomy: [
    {
      id: 'group',
      name: 'Radio group',
      selector: '[class~="aui-radio-group"]',
      description: 'The "Camera projection" RadioGroup (scale "sm", no padding) whose options each carry their own tooltip.',
    },
    {
      id: 'trigger',
      name: 'Trigger',
      description: 'The span, with closeOnClick off, that wraps the Perspective radio so the tooltip does not close on arrow-key selection.',
    },
    {
      id: 'radio',
      name: 'Radio',
      selector: '[class~="aui-radio"]',
      description: 'The "Perspective" radio at scale "sm", selected by default.',
    },
    {
      id: 'radio-label',
      name: 'Radio label',
      selector: '[class~="aui-control-row"] > [class~="aui-label"]',
      description: 'The visible option name "Perspective" beside the radio.',
    },
    {
      id: 'positioner',
      name: 'Positioner',
      selector: '[class~="aui-tooltip-positioner"]',
      description: 'Places the note above the radio with a 4px offset (side="top"); RWS requests the bottom side.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-tooltip-popup"]',
      description: 'The default tooltip surface for the one-line note.',
    },
    {
      id: 'note',
      name: 'Note',
      selector: '[class~="aui-tooltip-popup"]',
      text: true,
      description: 'The note "Show the model in perspective" that explains what the option does.',
    },
  ],
});
