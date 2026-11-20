import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Menubar with icon trigger',
  title: 'Settings drawer row menu',
  apps: ['adm', 'ace'],
  cases: [
    {
      id: 'adm-drawer-row',
      name: 'Drawer row',
      apps: ['adm'],
      source: { adm: 'src/features/settings/components/SettingsMenu.tsx' },
    },
    {
      id: 'ace-drawer-row',
      name: 'Drawer row',
      apps: ['ace'],
      source: { ace: 'src/features/settings/ui/SettingsMenu.tsx' },
    },
  ],
  source: {
    adm: 'src/features/settings/components/SettingsMenu.tsx',
    ace: 'src/features/settings/ui/SettingsMenu.tsx',
  },
  summary: 'A Settings text row in the phone drawer opens the same layout settings menu that the gear opens on the desktop top bar.',
  where: 'The phone drawer of ADM (src/features/settings/components/SettingsMenu.tsx) and ACE (src/features/settings/ui/SettingsMenu.tsx).',
  when: 'Use it for the layout settings on a phone, where the top bar gear is replaced by a drawer row. Use Menubar-004 on the desktop top bar. Do not use it for file or help actions.',
  how: 'The same menu as the gear menu with a different trigger: the Menubar.DropdownTrigger is the text row "Settings" instead of the gear, and the menu opens beside or below it. ADM places the popup to the left (side "left", align "start", sideOffset 8, above the drawer) and keeps Auto-Rotate; ACE places it below, centred (side "bottom", align "center", sideOffset 4) and has no Auto-Rotate. The scenes show the enabled state: the apps disable Reset layout to default while the layout is at its default, and ADM hides the two groups and keeps only Auto-Rotate below 768px. Each scene is a minimal Menubar holding only the Settings trigger, shown open; the rest of the drawer is left out.',
});
