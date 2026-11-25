import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Open view options button',

    layers: [
        {"id":"container","partId":"container","title":"Container","explanation":"The View options Button in the corner of the 3D viewer: small, surface color with tonal paint, acting as the trigger of the camera and visibility popover.","keyIdea":"The corner trigger opens view controls without covering the viewer heading.","selector":"[class~=\"aui-button\"]"},
      ],
options: [
    { id: "default", name: "Tonal outlined", contextAnatomy: [
      { id: "viewer-pane", name: "3D Viewer pane", description: "The 3D Viewer section with its heading and the viewer canvas that the controls float over." },
      { id: "corner", name: "Options corner", description: "The top-end corner of the scene, 8px in, that holds the View options trigger." },
      { id: "options-popover", name: "View options popover", description: "The open popover under the trigger (bottom, end, 4px offset) that holds the viewer controls." },
      { id: "reset-view", name: "Reset view button", description: "The outlined bullseye IconButton in the popover that resets the camera." },
    ] ,
      contextLayers: [
        {"id":"context-viewer-pane","partId":"viewer-pane","title":"3D Viewer pane","explanation":"The 3D Viewer section with its heading and the viewer canvas that the controls float over.","keyIdea":"The viewer pane keeps its title and canvas together beneath the floating controls.","selector":"[data-ug-part=\"viewer-pane\"]","scope":"context"},
        {"id":"context-corner","partId":"corner","title":"Options corner","explanation":"The top-end corner of the scene, 8px in, that holds the View options trigger.","keyIdea":"The corner reserves a predictable overlay position for View options.","selector":"[data-ug-part=\"corner\"]","scope":"context"},
        {"id":"context-options-popover","partId":"options-popover","title":"View options popover","explanation":"The open popover under the trigger (bottom, end, 4px offset) that holds the viewer controls.","keyIdea":"The popover places camera and visibility settings beside their viewer trigger.","selector":"[data-ug-part=\"options-popover\"]","scope":"context"},
        {"id":"context-reset-view","partId":"reset-view","title":"Reset view button","explanation":"The outlined bullseye IconButton in the popover that resets the camera.","keyIdea":"The bullseye control returns the camera to its default view.","selector":"[data-ug-part=\"reset-view\"]","scope":"context"},
      ],
    },
  ],

  apps: ['hcs', 'adm'],
  source: { hcs: 'src/App.tsx', adm: 'src/features/base-plate/components/ThicknessCalculatorDialog.tsx' },
  summary: 'A tonal text Button in the corner of the 3D viewer opens the camera and visibility controls in a popover.',
  where: 'The top-right corner of the 3D Viewer canvas, 8px in, in compact layouts where the floating controls are hidden. It is not in the Output toolbar. '
    + 'ADM writes the same Button as Save image in the Thickness Calculator dialog (secondary tonal, scale "sm", shape "soft"; measured 28px high, 3px 7px padding, white fill, 1px dark border, the same as View options), a place of this variant that the preview does not draw. '
    + 'Real site source: HCS (View options); Print Output, its sibling tonal button, is Button-001. Built from the viewer pane in src/App.tsx (lines 1522-1651) and index.css (.f02-mobile-options, .f02-popover).',
  when: 'Use it when the controls would crowd a small canvas. It has no icon; the popover holds the same stack as the desktop overlay (Button-039).',
  how: 'Set aui scale "sm", color "surface" and paint "tonal". In the app it is the trigger of a Popover (side bottom, align end, offset 4). '
    + 'In context the scene is the compact 3D Viewer: the button sits in the top end corner of the scene, 8px in (a gallery rule for the app\'s `.f02-mobile-options`), and the popup is open below it on a surface card (12px padding, 4px radius, shadow) holding Reset view and the projection radios (the Object Visibility checkboxes are left out). '
    + 'The canvas is a framed stand-in.',
  anatomy: [
    {
      id: "container",
      name: "Container",
      description: "The View options Button in the corner of the 3D viewer: small, surface color with tonal paint, acting as the trigger of the camera and visibility popover.",
      selector: "[class~=\"aui-button\"]",
    },
    {
      id: "label",
      name: "Label",
      description: "The text \"View options\" that names the popover of camera and visibility controls.",
      selector: "[class~=\"aui-button\"]",
      text: true,
    },
  ],
});
