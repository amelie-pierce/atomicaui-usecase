import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Open view options button',

  options: [
    { id: "default", name: "Tonal outlined" },
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
      token: "Button",
      description: "The View options Button in the corner of the 3D viewer: small, surface color with tonal paint, acting as the trigger of the camera and visibility popover.",
      selector: "[class~=\"aui-button\"]",
      code: "<Button aui={{ scale: 'sm', color: 'surface', paint: 'tonal' }}>View options</Button>",
    },
    {
      id: "label",
      name: "Label",
      token: "Button",
      description: "The text \"View options\" that names the popover of camera and visibility controls.",
      selector: "[class~=\"aui-button\"]",
      text: true,
      code: "View options",
    },
  ],
});
