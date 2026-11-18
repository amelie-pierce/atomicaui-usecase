import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Viewer',
  title: 'Camera projection radios',
  apps: ['hcs', 'fd', 'adc'],
  cases: [
    {
      id: 'hcs-projection',
      name: 'Projection',
      apps: ['hcs', 'fd', 'adc'],
      source: { hcs: 'src/App.tsx', fd: 'src/components/Viewer.jsx', adc: 'src/adc/components/ConnectionModel.tsx' },
    },
  ],
  source: { hcs: 'src/App.tsx', fd: 'src/components/Viewer.jsx', adc: 'src/adc/components/ConnectionModel.tsx' },
  summary: 'A group of two radios in the 3D viewer controls that switches the camera between Perspective and Orthographic.',
  where: 'The viewer controls column of HCS (the desktop controls and the View options popover), FD and ADC. PBS has the same two radios with a tooltip on each (Radio-001). Real site source: the viewer file of each app (the paths are in source).',
  when: 'Use it for one choice of exactly one camera mode that stays visible next to the other view controls. Do not use it for a labelled form choice (RadioGroup-002).',
  how: 'One RadioGroup at scale "sm" with no padding and an aria-label "Camera projection" holds two Radios whose unselected state is a surface solid frame with a 1 outlined border and whose selected state is a solid primary; the example is that group, and the scene puts it in the column the controls stack in (start-aligned, gap 4). HCS and FD write exactly this (22px dot, 16px text); ADC writes the group at scale "xs" with a 4 gap and the tonal outlined selection look, which renders the same radios at a smaller size (20px dot, 14px medium text, measured in the gallery), so the three apps are one group. The scene leaves out the Reset view button, the orientation cube, the Object Visibility checkboxes and the 3D canvas; the apps show the group enabled.',
});
