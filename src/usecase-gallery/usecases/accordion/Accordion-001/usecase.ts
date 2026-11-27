import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: "input-pane", name: "Input pane", description: "The Input aside (aria-label \"Input\") on a surface-alt background that holds the section list or section cards; the pane header, the fields and further sections are left out." },
];

export default defineUsecase({
  uiType: 'Section accordion',
  title: 'Flush sections',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
    layers: [
        {"id":"item","partId":"item","title":"Item","explanation":"One section row opens Connection Type or Load Properties.","keyIdea":"A single expanded section keeps related inputs together without splitting the form into separate cards.","selector":"[class~=\"aui-accordion-item\"]"},
        {"id":"trigger","partId":"trigger","title":"Trigger","explanation":"Full-width title row opens one section; several can stay open.","keyIdea":"A full-width trigger makes the section title row one predictable place to open or close its group.","selector":"[class~=\"aui-accordion-trigger\"]"},
        {"id":"label","partId":"label","title":"Title","explanation":"Semi-bold label names Connection Type or Load Properties.","keyIdea":"The section label tells users which input group will appear before they change its disclosure state.","selector":"[class~=\"aui-accordion-trigger-content\"] [data-ug-part=\"section-label\"]"},
        {"id":"icon","partId":"icon","title":"Section icon","explanation":"Link icon marks Connection Type; arrow-down marks Load Properties.","keyIdea":"The leading topic glyph helps distinguish sections whose names are close in meaning.","selector":"[class~=\"aui-accordion-trigger-content\"] [class~=\"aui-contained-icon\"]","code":["Accordion.Icon"]},
        {"id":"chevron","partId":"chevron","title":"Chevron","explanation":"Disclosure chevron turns to show the section's open state.","keyIdea":"The turning chevron shows whether the section fields are currently available below the title row.","selector":"[class~=\"aui-accordion-trigger\"] > [class~=\"aui-accordion-chevron\"]"},
        {"id":"panel","partId":"panel","title":"Panel","explanation":"Open panel shows section fields; Load Properties has no panel.","keyIdea":"The panel is where the selected section exposes its fields while closed groups stay out of the way.","selector":"[class~=\"aui-accordion-panel\"]"},
      ],
options: [
    { id: "hcs-section-list", contextAnatomy: CONTEXT_ANATOMY, name: "Section list", apps: ["hcs","ace","adm","hs","adc"], source: {"hcs":"src/App.tsx","ace":"src/features/estimator/ui/EstimatorInputPanel.tsx","adm":"src/features/design-inputs/components/InputsPanel/InputsPanel.tsx","hs":"src/App.tsx","adc":"src/adc/Workspace.tsx"} ,
      contextLayers: [
        {"id":"context-input-pane","partId":"input-pane","title":"Input pane","explanation":"Input pane frames the section list beside app results.","keyIdea":"The HCS-family Input aside gives the section list a clear editing region beside the results.","selector":"[data-ug-part=\"input-pane\"]","scope":"context"},
      ],
    },
    { id: "pbs-section-list", contextAnatomy: CONTEXT_ANATOMY, name: "Icon section list", apps: ["pbs","pfd","rws","agpd"], source: {"pbs":"src/App.tsx","pfd":"src/pfd/InputPane.tsx","rws":"src/rws/inputs.tsx","agpd":"src/agpd/InputPanel.tsx"} ,
      contextLayers: [
        {"id":"context-input-pane","partId":"input-pane","title":"Input pane","explanation":"Input pane frames the section list beside app results.","keyIdea":"The PBS-family surface-alt pane keeps its outlined groups together as one input area.","selector":"[data-ug-part=\"input-pane\"]","scope":"context"},
      ],
    },
    { id: "fd-section-list", contextAnatomy: CONTEXT_ANATOMY, name: "Plain section list", apps: ["fd"], source: {"fd":"src/components/InputPane.jsx"} ,
      contextLayers: [
        {"id":"context-input-pane","partId":"input-pane","title":"Input pane","explanation":"Input pane frames the section list beside app results.","keyIdea":"FD separates its accordion rows from results by giving them a named Input region.","selector":"[data-ug-part=\"input-pane\"]","scope":"context"},
      ],
    },
    { id: "hcs-section-cards", contextAnatomy: CONTEXT_ANATOMY, name: "Section cards", apps: ["hcs","ace","adm","hs"], source: {"hcs":"src/App.tsx","ace":"src/features/estimator/ui/EstimatorInputPanel.tsx","adm":"src/features/design-inputs/components/InputsPanel/InputsPanel.tsx","hs":"src/App.tsx"} ,
      contextLayers: [
        {"id":"context-input-pane","partId":"input-pane","title":"Input pane","explanation":"Input pane frames the softer section cards beside app results.","keyIdea":"HCS uses this pane to frame the softer section cards as one continuous editing area.","selector":"[data-ug-part=\"input-pane\"]","scope":"context"},
      ],
    },
    { id: "pbs-section-cards", contextAnatomy: CONTEXT_ANATOMY, name: "Icon section cards", apps: ["pbs","pfd","rws","agpd"], source: {"pbs":"src/App.tsx","pfd":"src/pfd/InputPane.tsx","rws":"src/rws/inputs.tsx","agpd":"src/agpd/InputPanel.tsx"} ,
      contextLayers: [
        {"id":"context-input-pane","partId":"input-pane","title":"Input pane","explanation":"Input pane frames the rounded section cards beside app results.","keyIdea":"The PBS card scene keeps the rounded input groups inside a distinct workspace boundary.","selector":"[data-ug-part=\"input-pane\"]","scope":"context"},
      ],
    },
    { id: "fd-section-cards", contextAnatomy: CONTEXT_ANATOMY, name: "Outlined section cards", apps: ["fd"], source: {"fd":"src/components/InputPane.jsx"} ,
      contextLayers: [
        {"id":"context-input-pane","partId":"input-pane","title":"Input pane","explanation":"Input pane frames the rounded section cards beside app results.","keyIdea":"FD groups its card-like sections in an aside so input controls read apart from output.","selector":"[data-ug-part=\"input-pane\"]","scope":"context"},
      ],
    },
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
      selector: '[class~="aui-accordion-item"]',
      description: 'One Input-pane section, Connection Type (open by default) or Load Properties; in the list layout (HCS, HS, PFD) items are flush with a 1px outlined line between them, in the cards layout (FD, PBS) each is a soft rounded card.',
    },
    {
      id: 'trigger',
      name: 'Trigger',
      selector: '[class~="aui-accordion-trigger"]',
      description: 'Full-width surface title row, scale "sm" and shape "none", that opens or closes its section; openMultiple lets several stay open.',
    },
    {
      id: 'icon',
      name: 'Section icon',
      selector: '[class~="aui-accordion-trigger-content"] [class~="aui-contained-icon"]',
      description: 'Leading regular-weight topic icon, link for Connection Type and arrow-down for Load Properties; PBS omits it in both layouts, and FD omits it in both layouts while uppercasing titles.',
    },
    {
      id: 'label',
      name: 'Title',
      selector: '[class~="aui-accordion-trigger-content"]',
      description: 'Semi-bold l4 section name, "Connection Type" or "Load Properties" (upper case in the card layouts).',
    },
    {
      id: 'chevron',
      name: 'Chevron',
      selector: '[class~="aui-accordion-trigger"] > [class~="aui-accordion-chevron"]',
      description: 'Disclosure chevron at the end of the row that turns with the open state.',
    },
    {
      id: 'panel',
      name: 'Panel',
      selector: '[class~="aui-accordion-panel"]',
      description: 'Body of the open section with default padding; Connection Type shows the placeholder "Section fields" while Load Properties has no panel.',
    },
  ],
});
