import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Radio',
  title: 'Option radio group',
  apps: ['agpd', 'rws', 'pbs', 'fd'],
  cases: [
    {
      id: 'agpd-inline',
      name: 'Labelled group',
      apps: ['agpd', 'rws', 'pbs'],
      source: { agpd: 'src/agpd/inputs.tsx', rws: 'src/rws/inputs.tsx', pbs: 'src/InputFields.tsx' },
    },
    {
      id: 'fd-settings',
      name: 'Labelled group',
      apps: ['fd'],
      source: { fd: 'src/App.jsx' },
    },
  ],
  source: {
    agpd: 'src/agpd/inputs.tsx',
    rws: 'src/rws/inputs.tsx',
    pbs: 'src/InputFields.tsx',
    fd: 'src/App.jsx',
  },
  summary: 'A group of radios under a form label that picks one option among a few named ones: a plate or fastener option, Auto-rotate 3D model Yes or No.',
  where: 'The input panel of AGPD, RWS and PBS (inline radios under a form label, for example a plate or fastener option) and the Auto-rotate 3D model setting in the Settings popover of the FD phone drawer. Real site source: the input fields (AGPD, RWS, PBS) and App.jsx (FD) (the paths are in source).',
  when: 'Use it for one input of a form that is a choice among two to four short, always visible options, with a label. Use Select-001 when the list is longer. The camera projection that sits next to the other view controls is Radio-002.',
  how: 'One RadioGroup at scale "sm" with no padding holds the Radios in the tonal outlined selection look (an unselected outlined tonal surface, a solid primary selected), 22px dots with 16px text; the example is the labelled group. Inline (AGPD, RWS, PBS): direction "row", whose RadioGroup.Label is a row (gap 4, width fill) on its own first line, then the Radios with 8 between them. PBS wraps its radios in a flex row with a 12 gap and a 3 column gap under the label, a 4px spacing difference that renders the same, so it is in this group (measured in the gallery). Stacked (FD): the default column direction with a plain RadioGroup.Label above the Yes and No radios, one per line. The scenes leave out the help trigger and lock hint of the label row, the per-radio disabled rule, the label highlighted in error (PBS) and the drawer around the settings popover.',
});
