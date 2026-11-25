import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'viewer-pane', name: '3D Viewer pane', selector: '[data-ug-part="viewer-pane"]', description: 'The surface-alt 3D Viewer section that frames the header and the scene.' },
  { id: 'viewer-title', name: 'Viewer title', selector: '[data-ug-part="viewer-title"]', description: 'The semi-bold 3D Viewer heading in the 28px header.' },
  { id: 'viewer-canvas', name: 'Scene canvas', selector: '[data-ug-part="viewer-canvas"]', description: 'The framed stand-in for the live 3D canvas, with Reset view overlaid at its top end.' },
];

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Reset view button',

    layers: [
        {"id":"button","partId":"button","title":"Reset view","explanation":"The small soft-shaped IconButton with primary orange color and a 1px outlined border that floats over the 3D viewer to reset the camera.","keyIdea":"The floating control resets the camera within the viewer canvas.","selector":"[class~=\"aui-button\"]"},
        {"id":"icon","partId":"icon","title":"Bullseye icon","explanation":"The bullseye glyph, drawn in the primary color on a transparent surface.","keyIdea":"The bullseye glyph indicates returning the camera to its target view.","selector":"[class~=\"aui-button\"] > :is([class~=\"aui-contained-icon\"], [class~=\"aui-icon\"])"},
      ],
options: [
    { id: "default", contextAnatomy: CONTEXT_ANATOMY, name: "Outlined accent, 28px" ,
      contextLayers: [
        {"id":"context-viewer-pane","partId":"viewer-pane","title":"3D Viewer pane","explanation":"The surface-alt 3D Viewer section that frames the header and the scene.","keyIdea":"The viewer section frames the canvas and its camera control.","selector":"[data-ug-part=\"viewer-pane\"]","scope":"context"},
        {"id":"context-viewer-title","partId":"viewer-title","title":"Viewer title","explanation":"The semi-bold 3D Viewer heading in the 28px header.","keyIdea":"The header title identifies the area whose view can be adjusted.","selector":"[data-ug-part=\"viewer-title\"]","scope":"context"},
        {"id":"context-viewer-canvas","partId":"viewer-canvas","title":"Scene canvas","explanation":"The framed stand-in for the live 3D canvas, with Reset view overlaid at its top end.","keyIdea":"The canvas provides the spatial surface where Reset view is overlaid.","selector":"[data-ug-part=\"viewer-canvas\"]","scope":"context"},
      ],
    },
  ],
  apps: ['hcs'],
  source: { hcs: 'src/App.tsx' },
  summary: 'An orange icon with a thin outline floats over a 3D viewer to reset the camera.',
  where: 'A corner of a 3D viewer: Reset view. Real site source: HCS, the only live icon button in the primary color. Built from the viewer pane in src/App.tsx (lines 1403-1651) and index.css (.scene, .f02-controls).',
  when: 'Use it for a control that sits over busy content, where the outline keeps it findable. The outline comes from sx, not from a color axis.',
  how: 'Set aui scale "sm", color "primary", paint "text" and shape "soft", plus sx borderWidth "1", borderStyle "solid" and borderColor "outlined". '
    + 'In context the scene is the 3D Viewer pane with Reset view overlaid at the top end, 62px down and 12px in (the app\'s `.f02-controls-desktop`, here a gallery rule, since the kit sx has no inset axis); the projection radios and the Object Visibility checkboxes under it are left out. '
    + 'The canvas is a framed stand-in: the app draws a live three.js scene.',
  anatomy: [
    { id: 'button', name: 'Reset view', selector: '[class~="aui-button"]', description: 'The small soft-shaped IconButton with primary orange color and a 1px outlined border that floats over the 3D viewer to reset the camera.' },
    { id: 'icon', name: 'Bullseye icon', selector: '[class~="aui-button"] > :is([class~="aui-contained-icon"], [class~="aui-icon"])', description: 'The bullseye glyph, drawn in the primary color on a transparent surface.' },
  ],
});
