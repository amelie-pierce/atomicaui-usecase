import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Viewer',
  title: 'Camera projection radios',
  apps: ['hcs', 'fd', 'adc'],
  cases: [
    {
      id: 'hcs-projection',
      name: 'Projection',
      apps: ['hcs', 'fd'],
      source: { hcs: 'src/App.tsx', fd: 'src/components/Viewer.jsx' },
    },
    {
      id: 'adc-projection',
      name: 'Projection',
      apps: ['adc'],
      source: { adc: 'src/adc/components/ConnectionModel.tsx' },
    },
  ],
  source: { hcs: 'src/App.tsx', fd: 'src/components/Viewer.jsx', adc: 'src/adc/components/ConnectionModel.tsx' },
  summary: 'A group of two radios in the 3D viewer controls that switches the camera between Perspective and Orthographic.',
  where: 'The viewer controls column of HCS (the desktop controls and the View options popover), FD and ADC. PBS has the same two radios with a tooltip on each (Radio-001). Real site source: the viewer file of each app (the paths are in source).',
  when: 'Use it for one choice of exactly one camera mode that stays visible next to the other view controls. Do not use it for a labelled form choice (RadioGroup-002).',
  how: 'One RadioGroup at scale "sm" with no padding and an aria-label "Camera projection" holds two Radios whose unselected state is a surface solid frame with a 1 outlined border and whose selected state is a solid primary; the example is that group, and the scene puts it in the column the controls stack in (start-aligned, gap 4). HCS and FD write exactly this (22px dot, 16px text); ADC writes the group at scale "xs" with a 4 gap and the tonal outlined selection look; its measured labels are 14px/500 versus 16px/400 in HCS and FD, so ADC has its own group (20px versus 22px dots). The scene leaves out the Reset view button, the orientation cube, the Object Visibility checkboxes; the viewer canvas is a stand-in; the apps show the group enabled.',
});
