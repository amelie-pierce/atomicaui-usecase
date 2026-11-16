import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Viewer',
  contextVariant: 'options',
  title: 'View options',
  apps: ['hcs'],
  source: { hcs: 'src/App.tsx' },
  summary: 'A tonal text Button in the corner of the 3D viewer opens the camera and visibility controls in a popover.',
  where: 'The top-right corner of the 3D Viewer canvas, 8px in, in compact layouts where the floating controls are hidden. It is not in the Output toolbar. Real site source: HCS Button-004 (View options); Print Output, its sibling tonal button, is Button-007. Built from the viewer pane in src/App.tsx (lines 1522-1651) and index.css (.f02-mobile-options, .f02-popover).',
  when: 'Use it when the controls would crowd a small canvas. It has no icon; the popover holds the same stack as the desktop overlay (Button-015).',
  how: 'Set aui scale "sm", color "surface" and paint "tonal". In the app it is the trigger of a Popover (side bottom, align end, offset 4). In context the scene is the compact 3D Viewer: the button sits in the top end corner of the scene, 8px in (a gallery rule for the app\'s `.f02-mobile-options`), and the popup is open below it on a surface card (12px padding, 4px radius, shadow) holding the same controls stack as the desktop overlay: Reset view, the projection radios, Object Visibility and four checkboxes. The canvas is a framed stand-in.',
});
