import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Radio',
  title: 'Radio group',
  apps: ['hcs', 'fd', 'adc', 'pbs', 'agpd', 'rws'],
  cases: [
    {
      id: 'agpd-inline',
      name: 'Labelled group',
      apps: ['agpd', 'rws', 'pbs'],
      source: { agpd: 'src/agpd/inputs.tsx', rws: 'src/rws/inputs.tsx', pbs: 'src/InputFields.tsx' },
    },
    { id: 'fd-settings', name: 'Labelled group', apps: ['fd'], source: { fd: 'src/App.jsx' } },
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
  source: {
    agpd: 'src/agpd/inputs.tsx',
    rws: 'src/rws/inputs.tsx',
    pbs: 'src/InputFields.tsx',
    fd: 'src/App.jsx',
    hcs: 'src/App.tsx',
    adc: 'src/adc/components/ConnectionModel.tsx',
  },
  summary: 'A group of radios for one choice among a few named options, with a label above the options or, in the 3D viewer, with none.',
  where: 'The input panel of AGPD, RWS and PBS (inline radios under a form label, for example a plate or fastener option), the Auto-rotate 3D model setting in the Settings popover of the FD phone drawer, and the camera projection radios in the viewer controls of HCS (the desktop controls and the View options popover), FD and ADC (the radios alone) and PBS (the view mode radios, each with a tooltip). Real site source: the input fields (AGPD, RWS, PBS), App.jsx (FD) and the viewer file of each app (the paths are in source).',
  when: 'Use it for one choice among two to four short, always visible options. Add a label when the form needs one; leave it out for the camera projection that sits next to the other view controls. Add a tooltip per radio when the label alone does not say what the choice does. Use Select-001 when the list is longer.',
  how: 'One RadioGroup at scale "sm" with no padding holds the Radios in the tonal outlined selection look (an unselected outlined tonal surface, a solid primary selected), 22px dots with 16px text; the example is the labelled group. Labelled group, inline (AGPD, RWS, PBS): direction "row", whose RadioGroup.Label is a row (gap 4, width fill) on its own first line, then the Radios with 8 between them. PBS wraps its radios in a flex row with a 12 gap and a 3 column gap under the label, a 4px spacing difference that renders the same, so it is in this group (measured in the gallery). Labelled group, stacked (FD): the default column direction with a plain RadioGroup.Label above the Yes and No radios, one per line. Projection (HCS, FD): an aria-label "Camera projection" on the group and a surface solid frame with a 1 outlined border unselected and a solid primary selected; the scene puts the group in the column the controls stack in (start-aligned, gap 4). ADC writes the group at scale "xs" with a 4 gap and the tonal outlined selection look; its measured labels are 14px/500 versus 16px/400 in HCS and FD (20px versus 22px dots), so it has its own app group. Projection with tooltip (PBS): a row with gap 8 and aria-label "View mode"; each Radio sits in a Tooltip.Trigger rendered as a span with closeOnClick off (the trigger props would otherwise land on the inner dot, and the group checks a radio on arrow keys with a click that would block the tooltip on focus); the Tooltip.Positioner is on top, 4px off, and each popup is one sentence. The scenes leave out the help trigger and lock hint of the label row, the per-radio disabled rule, the label highlighted in error (PBS), the drawer around the settings popover, the Reset view button, the orientation cube and the Object Visibility checkboxes; the viewer canvas is a stand-in; the apps show the group enabled and the tooltip scene shows the Perspective tooltip open.',
});
