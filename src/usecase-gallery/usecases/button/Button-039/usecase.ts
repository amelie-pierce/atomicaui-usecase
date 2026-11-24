import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Reset view button',

  options: [
    { id: "default", name: "Outlined accent, 28px" },
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
    { id: 'button', name: 'Reset view', token: 'IconButton', selector: '[class~="aui-button"]', description: 'The small soft-shaped IconButton with primary orange color and a 1px outlined border that floats over the 3D viewer to reset the camera.',
      code: `<IconButton
  name="bullseye"
  aria-label="Reset view"
  aui={{
    scale: 'sm',
    color: 'primary',
    paint: 'text',
    shape: 'soft',
    sx: {
      borderWidth: '1',
      borderStyle: 'solid',
      borderColor: 'outlined',
    },
  }}
/>` },
    { id: 'icon', name: 'Bullseye icon', token: 'IconButton', selector: '[class~="aui-button"] > :is([class~="aui-contained-icon"], [class~="aui-icon"])', description: 'The bullseye glyph, drawn in the primary color on a transparent surface.',
      code: `name="bullseye"` },
  ],
});
