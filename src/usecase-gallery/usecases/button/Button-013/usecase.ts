import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Button',
  apps: ['hcs'],
  title: 'Viewer overlay icon',
  summary: 'An orange icon with a thin outline floats over a 3D viewer to reset the camera.',
  where: 'A corner of a 3D viewer: Reset view. Real site source: HCS Button-015, the only live icon button in the primary color.',
  when: 'Use it for a control that sits over busy content, where the outline keeps it findable. The outline comes from sx, not from a color axis.',
  how: 'Set aui scale "sm", color "primary", paint "text" and shape "soft", plus sx borderWidth "1", borderStyle "solid" and borderColor "outlined".',
});
