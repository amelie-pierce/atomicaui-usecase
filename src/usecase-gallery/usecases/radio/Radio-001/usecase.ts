import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Viewer',
  title: 'Camera projection radios',
  apps: ['hcs', 'fd', 'adc', 'pbs'],
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
    {
      id: 'pbs-projection-tooltip',
      name: 'Projection with tooltip',
      apps: ['pbs'],
      source: { pbs: 'src/Viewer.tsx' },
    },
  ],
  source: { hcs: 'src/App.tsx', fd: 'src/components/Viewer.jsx', adc: 'src/adc/components/ConnectionModel.tsx', pbs: 'src/Viewer.tsx' },
  summary: 'A group of two radios in the 3D viewer controls that switches the camera between Perspective and Orthographic, with or without a tooltip on each radio.',
  where: 'The viewer controls of HCS (the desktop controls and the View options popover), FD and ADC (the radios alone), and PBS (the view mode radios, each with a tooltip). Real site source: the viewer file of each app (the paths are in source).',
  when: 'Use it for one choice of exactly one camera mode that stays visible next to the other view controls. Add the tooltip when the radio label alone does not say what the choice does and every option needs a line of help. Do not use it for a labelled form choice (Radio-002).',
  how: 'One RadioGroup at scale "sm" with no padding holds two Radios; the example is the tooltip type. Projection (no tooltip): the RadioGroup has an aria-label "Camera projection" and its Radios have a surface solid frame with a 1 outlined border unselected and a solid primary selected; the scene puts the group in the column the controls stack in (start-aligned, gap 4). HCS and FD write exactly this (22px dot, 16px text); ADC writes the group at scale "xs" with a 4 gap and the tonal outlined selection look; its measured labels are 14px/500 versus 16px/400 in HCS and FD, so ADC has its own group (20px versus 22px dots). Projection with tooltip (PBS): the RadioGroup is a row with gap 8 and aria-label "View mode"; each Radio sits in a Tooltip.Trigger rendered as a span with closeOnClick off (the trigger props would otherwise land on the inner dot, and the group checks a radio on arrow keys with a click that would block the tooltip on focus), in the tonal outlined selection look; the Tooltip.Positioner is on top, 4px off, and each popup is one sentence. The scenes leave out the Reset view button, the orientation cube, the Object Visibility checkboxes; the viewer canvas is a stand-in; the apps show the group enabled; the tooltip scene shows the Perspective tooltip open.',
});
