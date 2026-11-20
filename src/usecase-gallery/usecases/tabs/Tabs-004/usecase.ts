import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Closable tab rail',
  title: 'Design tab rail',
  apps: ['adc'],
  cases: [{ id: 'adc-design-rail', name: 'Design tab rail', apps: ['adc'], source: { adc: 'src/adc/Workspace.tsx' } }],
  source: { adc: 'src/adc/Workspace.tsx' },
  summary: 'A rail of closable tab chips, one per open design, ending in an add button, with an error dot on a tab whose design has a problem.',
  where: 'The top of the ADC workspace, above the designer: one tab per open design (renamed by double-click, reordered by drag, opened from the hidden-designs menu when they do not fit), the add button at the end of the rail.',
  when: 'Use it for a user-managed set of open items (designs, documents) where each item can be closed, a new one added and the order changed. For fixed views of one result use Tabs-001. The tab context menu is ContextMenu-001 and the overflow list of hidden designs is Dropdown-002, both on this rail.',
  how: 'The example is the rail: a Tabs root (profile "no-padding") with a Tabs.List, a Tabs.Tab per design (nativeButton false and rendered as a div, so the buttons inside it are not nested in a button) with a leading label span and a Tabs.CloseButton (aria-label "Close <name>"), a Tabs.PinButton named "circle-exclamation" with color "error" and profile "contained" on a tab with an error (the app calls it the error dot; Tabs.PinButton has no pinned state and only runs the parent\'s onClick), and a final Tabs.AddButton named "file-circle-plus" labelled "Add new design". The chips take CHIP_AUI (color "surface-alt", paint "solid", shape "soft", selected raised tonal). Measured in the browser: the close and error buttons are 20x20 transparent squares inside the 28px chip, the add button is a 28x28 square chip. The app sets overflow "shrink" on the List so the chips shrink to the rail width (the scene does; the example leaves it off because the Component stage is only as wide as its content), and also passes reorderable and onReorder on the List, a ContextMenu around each Tab and disabled while a report runs. These Tabs parts are the Tabs\' own icon buttons, so they are written here and not as IconButton use cases. '
    + 'ADC: one group. The scene keeps two tabs, one with the error dot, and leaves out drag reorder, rename, the error Tooltip, disabled states and the designer panels.',
});
