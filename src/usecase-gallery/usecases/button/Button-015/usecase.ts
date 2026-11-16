import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Viewer',
  title: 'Viewer overlay icon',
  apps: ['hcs'],
  summary: 'An orange icon with a thin outline floats over a 3D viewer to reset the camera.',
  where: 'A corner of a 3D viewer: Reset view. Real site source: HCS Button-015, the only live icon button in the primary color.',
  when: 'Use it for a control that sits over busy content, where the outline keeps it findable. The outline comes from sx, not from a color axis.',
  how: 'In context the canvas is a framed stand-in (the app draws a 3D scene and a CSS 3D view cube) and the controls stack floats at the right, 62px from the top, placed with an inline style because the kit sx has no inset axis; the radios and checkboxes under the button are sample content. Set aui scale "sm", color "primary", paint "text" and shape "soft", plus sx borderWidth "1", borderStyle "solid" and borderColor "outlined".',
});
