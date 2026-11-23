import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dropdown with icon trigger',
  title: 'Filled icon trigger',
  apps: ['adc'],
  cases: [{ id: 'adc-hidden-designs', name: 'Overflow list', apps: ['adc'], source: { adc: 'src/adc/Workspace.tsx' } }],
  source: { adc: 'src/adc/Workspace.tsx' },
  summary: 'An icon-only trigger opens a plain list of the items that no longer fit in a row; choosing one activates it.',
  where: 'The ADC design tab rail, at the start of the row before the design tabs; it appears only when some designs do not fit as tabs and lists exactly those.',
  when: 'Use it for the overflow of a tab row: the items that do not fit become plain rows of a menu, with no selected state, and the menu closes on choice. It is the plain Dropdown, not a Menubar menu.',
  how: 'ADC: a Dropdown whose Dropdown.Trigger is the square icon form: aria-label "Show hidden designs", color "surface-alt", paint "solid", scale "sm", profile "square", shape "soft", sx flex "none" and borderColor "default", holding a Dropdown.Icon "ellipsis-vertical". The popup is a Dropdown.Popup at scale "sm" with maxHeight "256" and overflowY "auto" (it scrolls when many designs are hidden), placed 4px below the trigger and aligned to its start. Each hidden design is a plain Dropdown.Item showing its name (or "Design N"); no item is selected, and choosing one activates that design tab. The app disables the trigger while a report is running; the scene shows it enabled. The scene is shown open beside one visible design tab (CHIP_AUI of the app: surface-alt, solid, soft); drag reorder, rename, the tab context menu and the other tabs are left out.',
  anatomy: [
    {
      id: 'trigger',
      name: 'Trigger',
      token: 'Dropdown.Trigger',
      selector: '[class~="aui-dropdown-trigger"]',
      description: 'Square icon trigger labelled "Show hidden designs": color "surface-alt", paint "solid", soft shape, flex "none" with a default border.',
      code: `<Dropdown.Trigger
  aria-label="Show hidden designs"
  aui={{ color: 'surface-alt', paint: 'solid', scale: 'sm', profile: 'square', shape: 'soft', sx: { flex: 'none', borderColor: 'default' } }}
>
  {/* … */}
</Dropdown.Trigger>`,
    },
    {
      id: 'icon',
      name: 'Icon',
      token: 'Dropdown.Icon',
      selector: '[class~="aui-dropdown-trigger"] > [class~="aui-contained-icon"]',
      description: 'The ellipsis-vertical glyph that is the only content of the trigger.',
      code: `<Dropdown.Icon name="ellipsis-vertical" />`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Dropdown.Popup',
      selector: '[class~="aui-dropdown-popup"]',
      description: 'Popup at scale "sm", capped at 256px high and scrolling vertically when many designs are hidden, aligned to the trigger start.',
      code: `<Dropdown.Popup aui={{ scale: 'sm', sx: { maxHeight: '256', overflowY: 'auto' } }}>
  {/* … */}
</Dropdown.Popup>`,
    },
    {
      id: 'item',
      name: 'Item',
      token: 'Dropdown.Item',
      selector: '[class~="aui-dropdown-item"]',
      description: 'A plain row for one hidden design: Design 3, Design 4 or Design 5. None is selected; choosing one activates that tab.',
      code: `<Dropdown.Item>Design 3</Dropdown.Item>`,
    },
    {
      id: 'visible-tab',
      name: 'Visible tab',
      token: 'Tabs.Tab',
      selector: '[class~="aui-tabs-tab"]',
      description: 'In the ADC scene one visible design tab, "Design 1", stands beside the trigger for the rest of the rail.',
      code: `<Tabs.Tab value="d1" aui={CHIP_AUI}>Design 1</Tabs.Tab>`,
    },
  ],
});
