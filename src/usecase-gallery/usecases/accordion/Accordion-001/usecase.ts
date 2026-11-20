import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Section accordion',
  title: 'Flush sections',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
  cases: [
    {
      id: 'hcs-section-list',
      name: 'Section list',
      apps: ['hcs', 'ace', 'adm', 'hs', 'adc'],
      source: {
        hcs: 'src/App.tsx',
        ace: 'src/features/estimator/ui/EstimatorInputPanel.tsx',
        adm: 'src/features/design-inputs/components/InputsPanel/InputsPanel.tsx',
        hs: 'src/App.tsx',
        adc: 'src/adc/Workspace.tsx',
      },
    },
    {
      id: 'pbs-section-list',
      name: 'Section list',
      apps: ['pbs', 'pfd', 'rws', 'agpd'],
      source: { pbs: 'src/App.tsx', pfd: 'src/pfd/InputPane.tsx', rws: 'src/rws/inputs.tsx', agpd: 'src/agpd/InputPanel.tsx' },
    },
    { id: 'fd-section-list', name: 'Section list', apps: ['fd'], source: { fd: 'src/components/InputPane.jsx' } },
    {
      id: 'hcs-section-cards',
      name: 'Section cards',
      apps: ['hcs', 'ace', 'adm', 'hs'],
      source: {
        hcs: 'src/App.tsx',
        ace: 'src/features/estimator/ui/EstimatorInputPanel.tsx',
        adm: 'src/features/design-inputs/components/InputsPanel/InputsPanel.tsx',
        hs: 'src/App.tsx',
      },
    },
    {
      id: 'pbs-section-cards',
      name: 'Section cards',
      apps: ['pbs', 'pfd', 'rws', 'agpd'],
      source: { pbs: 'src/App.tsx', pfd: 'src/pfd/InputPane.tsx', rws: 'src/rws/inputs.tsx', agpd: 'src/agpd/InputPanel.tsx' },
    },
    { id: 'fd-section-cards', name: 'Section cards', apps: ['fd'], source: { fd: 'src/components/InputPane.jsx' } },
  ],
  source: {
    hcs: 'src/App.tsx',
    ace: 'src/features/estimator/ui/EstimatorInputPanel.tsx',
    adm: 'src/features/design-inputs/components/InputsPanel/InputsPanel.tsx',
    pfd: 'src/pfd/InputPane.tsx',
    pbs: 'src/App.tsx',
    hs: 'src/App.tsx',
    fd: 'src/components/InputPane.jsx',
    agpd: 'src/agpd/InputPanel.tsx',
    rws: 'src/rws/inputs.tsx',
    adc: 'src/adc/Workspace.tsx',
  },
  summary: 'The Input pane as a stack of collapsible sections: each a title row with an optional section icon and a chevron, opening onto the fields of one topic.',
  where: 'The Input panel of all ten apps (HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS, ADC): one Accordion whose items are the input sections (Connection Type, Load Properties, ...). Nine apps also have the Engineering Overview grid, where each section is its own card (ADC has no grid). Real site source: the Input pane of each app (the paths are in source).',
  when: 'Use it to split a long input form into topics the user can fold away, with several open at once. Do not use it for release notes in a dialog (Accordion-002), for groups inside a picker (Accordion-003) or for one block that just hides content (a Collapsible).',
  how: 'An Accordion at scale "sm" with openMultiple, so any number of sections stay open. Each Accordion.Item is color "surface", scale "sm", shape "none" with a 1px outlined top border (borderColor "outlined", borderStyle "solid", borderBlockStartWidth "1") on every item but the first, inside one surface View card (shape "soft", overflow "hidden", gap 0). Accordion.Trigger is color "surface", paint "text", scale "sm", shape "none" and holds an optional Accordion.Icon (weight "regular"), the title as Type span role "l4" weight "semi-bold", and Accordion.Chevron; Accordion.Panel takes profile "default" and holds the fields. The example is that stack of sections you copy; In context sets it in the pane frame. The apps write three UIs of the list, measured in the gallery (trigger 28px high, label 14px weight 600 in every one): HCS, ACE, ADM, HS and ADC show a 20px section icon before the title; PBS, PFD, RWS and AGPD have no icon; FD has no icon and its titles are upper case. Section cards (Engineering Overview) put each item on the pane as its own soft card, shape "soft", overflow "hidden" and the four radii stated, 6px apart, with no dividers; the apps split the same way (HCS, ACE, ADM and HS with the icon; PBS, PFD, RWS and AGPD without; FD upper case). The scenes leave out the pane header (Button-033), the section fields, further sections, the grid columns, the phone layout (closed sections divided by a bottom border) and the layout, keyboard and scroll handling.',
});
