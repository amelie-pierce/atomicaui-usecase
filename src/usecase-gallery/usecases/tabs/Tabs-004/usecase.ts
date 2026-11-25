import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Closable tab rail',
  title: 'Design tab rail',
  apps: ['adc'],
    layers: [
        {"id":"tabs","partId":"tabs","title":"Tabs","explanation":"The design rail root with no padding; Design 1 (d1) is selected by default.","keyIdea":"The design rail root with no padding; Design 1 (d1) is selected by default.","selector":"[class~=\"aui-tabs\"]"},
        {"id":"list","partId":"list","title":"List","explanation":"Row holding the design chips and the add button; ADC lets it shrink with overflow=\"shrink\".","keyIdea":"Row holding the design chips and the add button; ADC lets it shrink with overflow=\"shrink\".","selector":"[class~=\"aui-tabs-list\"]"},
        {"id":"tab","partId":"tab","title":"Tab","explanation":"One open design (Design 1, Design 2) rendered as a div chip with nativeButton={false} so it can hold buttons; the selected chip is raised and tonal.","keyIdea":"One open design (Design 1, Design 2) rendered as a div chip with nativeButton={false} so it can hold buttons; the selected chip is raised and tonal.","selector":"[class~=\"aui-tabs-tab\"]"},
        {"id":"pin","partId":"pin","title":"Error dot","explanation":"Error-coloured circle-exclamation on Design 1, labelled \"The design has an error\".","keyIdea":"Error-coloured circle-exclamation on Design 1, labelled \"The design has an error\".","selector":"[class~=\"aui-tabs-pin-button\"]"},
        {"id":"close","partId":"close","title":"Close","explanation":"Per-design close action, for example \"Close Design 1\".","keyIdea":"Per-design close action, for example \"Close Design 1\".","selector":"[class~=\"aui-tabs-close-button\"]"},
        {"id":"add","partId":"add","title":"Add","explanation":"File-circle-plus button at the end of the rail that opens a new design.","keyIdea":"File-circle-plus button at the end of the rail that opens a new design.","selector":"[class~=\"aui-tabs-add-button\"]"},
      ],
options: [
    { id: "adc-design-rail", name: "Design tab rail", showContext: false, apps: ["adc"], source: {"adc":"src/adc/Workspace.tsx"} ,
      contextLayers: [

      ],
    },
  ],
  source: { adc: 'src/adc/Workspace.tsx' },
  summary: 'A rail of closable tab chips, one per open design, ending in an add button, with an error dot on a tab whose design has a problem.',
  where: 'The top of the ADC workspace, above the designer: one tab per open design (renamed by double-click, reordered by drag, opened from the hidden-designs menu when they do not fit), the add button at the end of the rail.',
  when: 'Use it for a user-managed set of open items (designs, documents) where each item can be closed, a new one added and the order changed. For fixed views of one result use Tabs-001. The tab context menu is ContextMenu-001 and the overflow list of hidden designs is Dropdown-002, both on this rail.',
  how: 'The example is the rail: a Tabs root (profile "no-padding") with a Tabs.List, a Tabs.Tab per design (nativeButton false and rendered as a div, so the buttons inside it are not nested in a button) with a leading label span and a Tabs.CloseButton (aria-label "Close <name>"), a Tabs.PinButton named "circle-exclamation" with color "error" and profile "contained" on a tab with an error (the app calls it the error dot; Tabs.PinButton has no pinned state and only runs the parent\'s onClick), and a final Tabs.AddButton named "file-circle-plus" labelled "Add new design". The chips take CHIP_AUI (color "surface-alt", paint "solid", shape "soft", selected raised tonal). Measured in the browser: the close and error buttons are 20x20 transparent squares inside the 28px chip, the add button is a 28x28 square chip. The app sets overflow "shrink" on the List so the chips shrink to the rail width (the scene does; the example leaves it off because the Component stage is only as wide as its content), and also passes reorderable and onReorder on the List, a ContextMenu around each Tab and disabled while a report runs. These Tabs parts are the Tabs\' own icon buttons, so they are written here and not as IconButton use cases. '
    + 'ADC: one group. The scene keeps two tabs, one with the error dot, and leaves out drag reorder, rename, the error Tooltip, disabled states and the designer panels.',
  anatomy: [
    {
      id: 'tabs',
      name: 'Tabs',
      selector: '[class~="aui-tabs"]',
      description: 'The design rail root with no padding; Design 1 (d1) is selected by default.',
    },
    {
      id: 'list',
      name: 'List',
      selector: '[class~="aui-tabs-list"]',
      description: 'Row holding the design chips and the add button; ADC lets it shrink with overflow="shrink".',
    },
    {
      id: 'tab',
      name: 'Tab',
      selector: '[class~="aui-tabs-tab"]',
      description: 'One open design (Design 1, Design 2) rendered as a div chip with nativeButton={false} so it can hold buttons; the selected chip is raised and tonal.',
    },
    {
      id: 'pin',
      name: 'Error dot',
      selector: '[class~="aui-tabs-pin-button"]',
      description: 'Error-coloured circle-exclamation on Design 1, labelled "The design has an error".',
    },
    {
      id: 'close',
      name: 'Close',
      selector: '[class~="aui-tabs-close-button"]',
      description: 'Per-design close action, for example "Close Design 1".',
    },
    {
      id: 'add',
      name: 'Add',
      selector: '[class~="aui-tabs-add-button"]',
      description: 'File-circle-plus button at the end of the rail that opens a new design.',
    },
  ],
});
