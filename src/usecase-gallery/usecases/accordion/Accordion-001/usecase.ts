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
  anatomy: [
    {
      id: 'item',
      name: 'Item',
      token: 'Accordion.Item',
      selector: '[class~="aui-accordion-item"]',
      description: 'One Input-pane section, Connection Type (open by default) or Load Properties; in the list layout (HCS, HS, PFD) items are flush with a 1px outlined line between them, in the cards layout (FD, PBS) each is a soft rounded card.',
      code: `<Accordion.Item value="Connection Type" aui={{ color: 'surface', scale: 'sm', shape: 'none' }}>`,
    },
    {
      id: 'trigger',
      name: 'Trigger',
      token: 'Accordion.Trigger',
      selector: '[class~="aui-accordion-trigger"]',
      description: 'Full-width surface title row, scale "sm" and shape "none", that opens or closes its section; openMultiple lets several stay open.',
      code: `<Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
  …
</Accordion.Trigger>`,
    },
    {
      id: 'icon',
      name: 'Section icon',
      token: 'Accordion.Icon',
      selector: '[class~="aui-accordion-trigger-content"] [class~="aui-contained-icon"]',
      description: 'Leading regular-weight topic icon, link for Connection Type and arrow-down for Load Properties; the FD and PBS card layouts omit it.',
      code: `<Accordion.Icon name="link" weight="regular" aria-hidden />`,
    },
    {
      id: 'label',
      name: 'Title',
      token: 'Accordion.Trigger',
      selector: '[class~="aui-accordion-trigger-content"]',
      description: 'Semi-bold l4 section name, "Connection Type" or "Load Properties" (upper case in the card layouts).',
      code: `<Type as="span" role="l4" weight="semi-bold">Connection Type</Type>`,
    },
    {
      id: 'chevron',
      name: 'Chevron',
      token: 'Accordion.Chevron',
      selector: '[class~="aui-accordion-trigger"] > [class~="aui-accordion-chevron"]',
      description: 'Disclosure chevron at the end of the row that turns with the open state.',
      code: `<Accordion.Chevron />`,
    },
    {
      id: 'panel',
      name: 'Panel',
      token: 'Accordion.Panel',
      selector: '[class~="aui-accordion-panel"]',
      description: 'Body of the open section with default padding; Connection Type shows the placeholder "Section fields" while Load Properties has no panel.',
      code: `<Accordion.Panel aui={{ profile: 'default' }}>
  <Type as="p" role="p3">Section fields</Type>
</Accordion.Panel>`,
    },
  ],
});
