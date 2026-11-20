import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Menubar with icon trigger',
  title: 'Settings gear menu',
  apps: ['hcs', 'adm', 'ace', 'hs', 'pfd', 'agpd', 'rws', 'pbs'],
  source: {
    hcs: 'src/App.tsx',
    adm: 'src/features/settings/components/SettingsMenu.tsx',
    ace: 'src/features/settings/ui/SettingsMenu.tsx',
    hs: 'src/hs/TopBar.tsx',
    pfd: 'src/pfd/TopBar.tsx',
    agpd: 'src/agpd/TopBar.tsx',
    rws: 'src/rws/TopBar.tsx',
    pbs: 'src/TopBar.tsx',
  },
  cases: [
    {
      id: 'hcs-gear-menu',
      name: 'Gear menu',
      apps: ['hcs', 'adm'],
      source: { hcs: 'src/App.tsx', adm: 'src/features/settings/components/SettingsMenu.tsx' },
    },
    {
      id: 'ace-gear-menu',
      name: 'Gear menu',
      apps: ['ace', 'hs', 'pfd', 'agpd', 'rws', 'pbs'],
      source: {
        ace: 'src/features/settings/ui/SettingsMenu.tsx',
        hs: 'src/hs/TopBar.tsx',
        pfd: 'src/pfd/TopBar.tsx',
        agpd: 'src/agpd/TopBar.tsx',
        rws: 'src/rws/TopBar.tsx',
        pbs: 'src/TopBar.tsx',
      },
    },
    { id: 'adm-drawer-row', name: 'Drawer row', apps: ['adm'], source: { adm: 'src/features/settings/components/SettingsMenu.tsx' } },
    { id: 'ace-drawer-row', name: 'Drawer row', apps: ['ace'], source: { ace: 'src/features/settings/ui/SettingsMenu.tsx' } },
  ],
  summary: 'A square gear button in the top bar opens a grouped menu of pane orientation radio rows, a reset row and, where the app has a 3D model, an Auto-Rotate check row.',
  where: 'The right end of the top bar, before the theme toggle, in every app but ADC: the layout settings that choose the Input and Output pane orientation (Vertical, Horizontal, Grid) and reset the pane sizes. ADM and ACE also show the same menu from a Settings text row in the phone drawer.',
  when: 'Use it for view settings that change the layout the user is working in, where each choice is a standing state rather than an action. Radio rows pick one orientation; the checkbox row switches one option. Do not use it for file or help actions: those are the File and Help Center menus.',
  how: 'A Menubar.Dropdown whose Menubar.DropdownTrigger is the "gear" Menubar.Icon with profile "square" and aria-label "Settings" (the apps say "Layout settings" in places); the popup is aligned to the end of the trigger, 4px below it. Two Menubar.DropdownGroups, each with a GroupLabel ("Pane Orientation", "Pane Layout"): a RadioGroup of three RadioItems (Vertical "table-columns", Horizontal "table-rows", Grid "grid-2") and one DropdownItem "Reset layout to default" ("rotate-left"), with a Separator between the groups. Every row has a leading icon, and every RadioItem composes a Menubar.DropdownRadioItemIndicator with the hidden attribute: the kit draws a trailing dot unless an indicator is composed, so the chosen row shows only the item\'s own selected fill. Gear menu, HCS, ADM: the same menu plus a Separator and a CheckboxItem "Auto-Rotate 3D Model" ("rotate") with its indicator hidden; both apps wrap the trigger in an icon Tooltip "Settings" (the scene leaves it out because the open menu hides it), and HCS writes scale "sm" on the Dropdown, trigger and popup. Gear menu, Other apps (ACE, HS, PFD, AGPD, PBS, RWS): the menu without Auto-Rotate (these apps have no 3D model) and without the trigger tooltip. Scale does not split the groups: PFD and AGPD write scale "sm" on the Dropdown, trigger and popup, PBS on the popup only, and ACE, HS and RWS write none; the rendered popups, rows (28px high, 6px gap) and trigger (28px square) match. RWS also puts a Separator under each group label; that is an app-side deviation from the shared menu, so it is not drawn. Drawer row, ADM and ACE: the trigger is the text row "Settings" instead of the gear, and the menu opens beside or below it. ADM places the popup to the left (side "left", align "start", sideOffset 8, above the drawer) and keeps Auto-Rotate; ACE places it below, centred (side "bottom", align "center", sideOffset 4) and has no Auto-Rotate. The scenes show the enabled state: the apps disable Reset layout to default while the layout is at its default and the Grid row below 992px, and ADM hides the two groups and keeps only Auto-Rotate below 768px. Each scene is a minimal Menubar holding only the Settings trigger, shown open; the theme toggle, the other bar items and the File and Help Center menus are left out.',
});
