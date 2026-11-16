import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Viewer',
  contextVariant: 'options',
  title: 'View options',
  apps: ['hcs'],
  summary: 'A tonal text Button in the corner of the 3D viewer opens the camera and visibility controls in a popover.',
  where: 'The top-right corner of the 3D Viewer canvas, 8px in, in compact layouts where the floating controls are hidden. It is not in the Output toolbar. Real site source: HCS Button-004 (View options); Print Output, its sibling tonal button, is Button-007.',
  when: 'Use it when the controls would crowd a small canvas. It has no icon; the popover holds the same stack as the desktop overlay (Button-015).',
  how: 'Set aui scale "sm", color "surface" and paint "tonal". In the app it is the trigger of a Popover (side bottom, align end, offset 4). In context the canvas is a framed stand-in and the popup is a static View card (surface, solid, soft, elevation 4) under the button; the corner placement is an inline style because the kit sx has no inset axis.',
});
