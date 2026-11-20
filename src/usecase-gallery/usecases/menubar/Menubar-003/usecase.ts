import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Menubar with summary trigger',
  title: 'Settings summary',
  apps: ['hs', 'fd', 'ace'],
  cases: [{ id: 'hs-settings', name: 'Top bar', source: { hs: 'src/hs/TopBar.tsx' } }],
  source: { hs: 'src/hs/TopBar.tsx', fd: 'src/components/SettingsPopover.jsx', ace: 'src/features/top-navigation/ui/AceNavBar.tsx' },
  summary: 'A tonal Menubar.Button that sums up the current region, language and design code in one line, separated by dividers, and opens the settings popover.',
  where: 'The right side of the top bar in HS (country, EU purchase country, language, design code and design method, Popover.Trigger), FD (country, language and design code, Popover.Trigger) and ACE (country flag and language, the app configuration button).',
  when: 'Use it when several settings that apply to the whole design are read at a glance on the bar and edited together in one popover. A single icon-only settings menu is the gear (Menubar-002); a plain action is a Menubar.Button place of Menubar-001.',
  how: 'A Menubar.Button with aui color "surface" and paint "tonal" holding, in order, an optional Menubar.Icon (the app puts a ContainedImage flag, fit "contain", ratio "4:3", in it; the scene uses a globe icon), the text values and a Menubar.Divider between each pair. HS and FD write it as the render prop of a Popover.Trigger inside a non-modal Popover.Root and ACE as the app configuration button; the scene draws the closed bar only. Measured against the plain Menubar.Button of Menubar-001: it has a white fill, a 1px border and 3px 7px padding where Menubar-001 has the surface fill, no border and 4px 8px padding, and it grows with its dividers, so it is its own type. The popover contents are left out; HS adds the EU purchase country and design method values, FD prefixes labels, ACE shows only country and language.',
});
