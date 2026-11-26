import { defineUsecase } from '../../../define';

const VIEWER_CONTEXT = [
  { id: 'viewer-pane', name: '3D Viewer pane', description: 'The soft surface-alt section labelled "3D Viewer" that holds the model view and its controls.' },
  { id: 'viewer-title', name: 'Pane title', description: 'The semi-bold "3D Viewer" heading at the top of the pane.' },
  { id: 'viewer-stage', name: 'Viewer canvas', description: 'The soft model canvas that the camera controls float over.' },
  { id: 'viewer-controls', name: 'Viewer controls', description: 'The control cluster over the canvas that holds the camera projection group.' },
];

export default defineUsecase({
  uiType: 'Radio',
  title: 'Camera projection radio group',
  apps: ['hcs', 'fd', 'adc', 'pbs'],
    layers: [
        {"id":"group","partId":"group","title":"Radio group","explanation":"The projection group named by aria-label \"Camera projection\", Perspective selected by default; it sits among the 3D viewer controls.","keyIdea":"The projection group treats camera perspective as one exclusive viewer setting.","selector":"[class~=\"aui-radio-group\"]"},
        {"id":"radio","partId":"radio","title":"Radio","explanation":"Perspective or Orthographic: a solid surface circle with a 1px outlined border when off and solid primary when chosen.","keyIdea":"The radio surface distinguishes the active camera mode from the inactive one.","selector":"[class~=\"aui-radio\"]"},
        {"id":"indicator","partId":"indicator","title":"Indicator","explanation":"The circle that marks the active camera projection.","keyIdea":"A centered marker makes the active projection visible within its radio.","selector":"[class~=\"aui-radio-indicator\"]"},
        {"id":"label","partId":"label","title":"Label","explanation":"The projection name, Perspective or Orthographic; PBS wraps each radio in a tooltip.","keyIdea":"The choice label identifies whether the viewer uses Perspective or Orthographic projection.","selector":"[class~=\"aui-control-row\"] > [class~=\"aui-label\"]"},
      ],
options: [
    { id: "hcs-projection", contextAnatomy: VIEWER_CONTEXT, name: "Projection", apps: ["hcs","fd"], source: {"hcs":"src/App.tsx","fd":"src/components/Viewer.jsx"} ,
      contextLayers: [
        {"id":"context-viewer-pane","partId":"viewer-pane","title":"3D Viewer pane","explanation":"The soft surface-alt section labelled \"3D Viewer\" that holds the model view and its controls.","keyIdea":"The HCS viewer pane bounds the model and its controls as one workspace.","selector":"[data-ug-part=\"viewer-pane\"]","scope":"context"},
        {"id":"context-viewer-title","partId":"viewer-title","title":"Pane title","explanation":"The semi-bold \"3D Viewer\" heading at the top of the pane.","keyIdea":"A pane heading tells users the camera control belongs to the 3D viewer.","selector":"[data-ug-part=\"viewer-title\"]","scope":"context"},
        {"id":"context-viewer-stage","partId":"viewer-stage","title":"Viewer canvas","explanation":"The soft model canvas that the camera controls float over.","keyIdea":"The canvas provides the visual scene whose projection the radio group changes.","selector":"[data-ug-part=\"viewer-stage\"]","scope":"context"},
        {"id":"context-viewer-controls","partId":"viewer-controls","title":"Viewer controls","explanation":"The control cluster over the canvas that holds the camera projection group.","keyIdea":"The floating control cluster keeps camera choices beside the model they affect.","selector":"[data-ug-part=\"viewer-controls\"]","scope":"context"},
      ],
    },
    { id: "adc-projection", contextAnatomy: VIEWER_CONTEXT, name: "Plain projection radios", apps: ["adc"], source: {"adc":"src/adc/components/ConnectionModel.tsx"} ,
      contextLayers: [
        {"id":"context-viewer-pane","partId":"viewer-pane","title":"3D Viewer pane","explanation":"The soft surface-alt section labelled \"3D Viewer\" that holds the model view and its controls.","keyIdea":"ADC uses the same viewer boundary to contain its model and camera choices.","selector":"[data-ug-part=\"viewer-pane\"]","scope":"context"},
        {"id":"context-viewer-title","partId":"viewer-title","title":"Pane title","explanation":"The semi-bold \"3D Viewer\" heading at the top of the pane.","keyIdea":"This heading names the ADC viewer before its canvas and controls appear.","selector":"[data-ug-part=\"viewer-title\"]","scope":"context"},
        {"id":"context-viewer-stage","partId":"viewer-stage","title":"Viewer canvas","explanation":"The soft model canvas that the camera controls float over.","keyIdea":"The ADC canvas makes perspective changes visible against the model scene.","selector":"[data-ug-part=\"viewer-stage\"]","scope":"context"},
        {"id":"context-viewer-controls","partId":"viewer-controls","title":"Viewer controls","explanation":"The control cluster over the canvas that holds the camera projection group.","keyIdea":"The camera control cluster sits over the work surface rather than in another pane.","selector":"[data-ug-part=\"viewer-controls\"]","scope":"context"},
      ],
    },
    { id: "pbs-projection-tooltip", contextAnatomy: [...VIEWER_CONTEXT, { id: 'radio-tooltip', name: 'Radio tooltip', description: 'The tooltip above the Perspective radio that explains the view mode: "Realistic 3D view with depth and perspective."' }], name: "Projection tooltip radios", apps: ["pbs"], source: {"pbs":"src/Viewer.tsx"} ,
      contextLayers: [
        {"id":"context-viewer-pane","partId":"viewer-pane","title":"3D Viewer pane","explanation":"The soft surface-alt section labelled \"3D Viewer\" that holds the model view and its controls.","keyIdea":"This tooltip variant keeps projection controls grounded in its own 3D viewer surface.","selector":"[data-ug-part=\"viewer-pane\"]","scope":"context"},
        {"id":"context-viewer-title","partId":"viewer-title","title":"Pane title","explanation":"The semi-bold \"3D Viewer\" heading at the top of the pane.","keyIdea":"Its pane heading identifies the model workspace before the projected view is explained.","selector":"[data-ug-part=\"viewer-title\"]","scope":"context"},
        {"id":"context-viewer-stage","partId":"viewer-stage","title":"Viewer canvas","explanation":"The soft model canvas that the camera controls float over.","keyIdea":"The canvas shows the view that the Perspective option describes.","selector":"[data-ug-part=\"viewer-stage\"]","scope":"context"},
        {"id":"context-viewer-controls","partId":"viewer-controls","title":"Viewer controls","explanation":"The control cluster over the canvas that holds the camera projection group.","keyIdea":"The floating controls keep projection choices attached to the canvas they affect.","selector":"[data-ug-part=\"viewer-controls\"]","scope":"context"},
        {"id":"context-radio-tooltip","partId":"radio-tooltip","title":"Radio tooltip","explanation":"The tooltip above the Perspective radio that explains the view mode: \"Realistic 3D view with depth and perspective.\"","keyIdea":"The tooltip explains the realistic depth cue before users choose Perspective.","selector":"[data-ug-part=\"radio-tooltip\"]","scope":"context"},
      ],
    },
  ],
  source: {
    hcs: 'src/App.tsx',
    fd: 'src/components/Viewer.jsx',
    adc: 'src/adc/components/ConnectionModel.tsx',
    pbs: 'src/Viewer.tsx',
  },
  summary: 'The camera projection radios of the 3D viewer, Perspective and Orthographic, with no label, next to the other view controls.',
  where: 'The viewer controls of HCS (the desktop controls and the View options popover), FD and ADC (the radios alone) and PBS (the view mode radios, each with a tooltip). Real site source: the viewer file of each app (the paths are in source).',
  when: 'Use it for the camera choice that sits next to the other view controls, where the group needs no label. Add a tooltip per radio when the label alone does not say what the choice does (PBS). Do not use it for an input of a form (Radio-001) or for the Object Visibility checkboxes (Checkbox-004).',
  how: 'One RadioGroup at scale "sm" with no padding. HCS and FD: an aria-label "Camera projection" on the group and a surface solid frame with a 1 outlined border unselected and a solid primary selected; the scene puts the group in the column the controls stack in (start-aligned, gap 4). ADC writes the group at scale "xs" with a 4 gap and the tonal outlined selection look; its measured labels are 14px/500 versus 16px/400 in HCS and FD (20px versus 22px dots), so it has its own app group. PBS (the tooltip group, written as another group of the same case): a row with gap 8 and aria-label "View mode"; each Radio sits in a Tooltip.Trigger rendered as a span with closeOnClick off (the trigger props would otherwise land on the inner dot, and the group checks a radio on arrow keys with a click that would block the tooltip on focus); the Tooltip.Positioner is on top, 4px off, and each popup is one sentence. The scenes leave out the lock hint of the label row, the per-radio disabled rule, the drawer around the settings popover, the Reset view button, the orientation cube and the Object Visibility checkboxes; the viewer canvas is a stand-in; the apps show the group enabled and the tooltip scene shows the Perspective tooltip open.',
  anatomy: [
    {
      id: "group",
      name: "Radio group",
      selector: "[class~=\"aui-radio-group\"]",
      description: "The projection group named by aria-label \"Camera projection\", Perspective selected by default; it sits among the 3D viewer controls.",
    },
    {
      id: "radio",
      name: "Radio",
      selector: "[class~=\"aui-radio\"]",
      description: "Perspective or Orthographic: a solid surface circle with a 1px outlined border when off and solid primary when chosen.",
    },
    {
      id: "indicator",
      name: "Indicator",
      selector: "[class~=\"aui-radio-indicator\"]",
      description: "The circle that marks the active camera projection.",
    },
    {
      id: "label",
      name: "Label",
      selector: "[class~=\"aui-control-row\"] > [class~=\"aui-label\"]",
      description: "The projection name, Perspective or Orthographic; PBS wraps each radio in a tooltip.",
    },
  ],
});
