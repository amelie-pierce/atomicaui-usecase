import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Radio',
  title: 'Labelled radio group',
  apps: ['agpd', 'rws', 'pbs', 'fd'],
  cases: [
    {
      id: 'agpd-inline',
      name: 'Labelled group',
      apps: ['agpd', 'rws', 'pbs'],
      source: { agpd: 'src/agpd/inputs.tsx', rws: 'src/rws/inputs.tsx', pbs: 'src/InputFields.tsx' },
    },
    { id: 'fd-settings', name: 'Labelled group', apps: ['fd'], source: { fd: 'src/App.jsx' } },
  ],
  source: { agpd: 'src/agpd/inputs.tsx', rws: 'src/rws/inputs.tsx', pbs: 'src/InputFields.tsx', fd: 'src/App.jsx' },
  summary: 'A group of radios under one label for a choice among a few named options.',
  where: 'The input panel of AGPD, RWS and PBS (inline radios under a form label, for example a plate or fastener option) and the Auto-rotate 3D model setting in the Settings popover of the FD phone drawer. Real site source: the input fields (AGPD, RWS, PBS) and App.jsx (FD).',
  when: 'Use it for one choice among two to four short, always visible options that need a label. Use Select-001 when the list is longer, and Radio-001 for the unlabelled camera projection radios of the viewer.',
  how: 'Inline (AGPD, RWS, PBS): a RadioGroup at scale "sm" with no padding, direction "row", whose RadioGroup.Label is a row (gap 4, width fill) on its own first line, then the Radios in the tonal outlined selection look (unselected an outlined tonal surface, selected a solid primary), 22px dots with 16px text and 8 between radios; the example is that group. PBS wraps its radios in a flex row with a 12 gap and a 3 column gap under the label, a 4px spacing difference that renders the same, so it is in this group (measured in the gallery). Stacked (FD): the RadioGroup keeps the default column direction with a plain RadioGroup.Label above the Yes and No radios, one per line in the same selection look. The scenes leave out the help trigger and lock hint of the label row, the per-radio disabled rule, the label highlighted in error (PBS), and the drawer around the settings popover; the apps show the group enabled.',
});
