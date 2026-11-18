import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Icon button',
  title: 'Icon button label tooltip',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
  cases: [
    {
      id: 'ace-icon-label',
      name: 'Icon label',
      apps: ['ace', 'adm', 'fd', 'adc'],
      source: { ace: 'src/shared/ui/PaneIconTooltip.tsx', adm: 'src/shared/lib/tooltip/AdmIconTooltip.tsx', fd: 'src/components/ui.jsx', adc: 'src/adc/Workspace.tsx' },
    },
    {
      id: 'hcs-icon-label',
      name: 'Icon label',
      apps: ['hcs', 'pfd', 'pbs', 'hs', 'agpd', 'rws'],
      source: {
        hcs: 'src/components/HcsIconTooltip.tsx',
        pfd: 'src/pfd/useOutputNavigation.tsx',
        pbs: 'src/App.tsx',
        hs: 'src/hs/useOutputNavigation.tsx',
        agpd: 'src/agpd/panel.tsx',
        rws: 'src/rws/panel.tsx',
      },
    },
  ],
  source: {
    hcs: 'src/components/HcsIconTooltip.tsx',
    ace: 'src/shared/ui/PaneIconTooltip.tsx',
    adm: 'src/shared/lib/tooltip/AdmIconTooltip.tsx',
    pfd: 'src/pfd/useOutputNavigation.tsx',
    pbs: 'src/App.tsx',
    hs: 'src/hs/useOutputNavigation.tsx',
    fd: 'src/components/ui.jsx',
    agpd: 'src/agpd/panel.tsx',
    rws: 'src/rws/panel.tsx',
    adc: 'src/adc/Workspace.tsx',
  },
  summary: 'An icon-only button shows its own label in a small tooltip on hover or keyboard focus.',
  where: 'Every icon-only header, rail and navigation button of the ten apps (HCS HcsIconTooltip, ACE PaneIconTooltip, ADM AdmIconTooltip, ADC and FD IconTooltip, AGPD and RWS IconTip, PBS and PFD and HS output navigation). The panel standard of the apps is that an icon-only button carries an aria-label and a tooltip with the same words.',
  when: 'Use it on every IconButton that has no visible text. Do not use it for a control whose label is already visible, and not for long help text (a help icon, Button-018).',
  how: 'Compose the button as the trigger: Tooltip.Provider, Tooltip, then Tooltip.Trigger with render set to the IconButton (the button keeps its aria-label, the tooltip repeats it), Tooltip.Portal, Tooltip.Positioner and Tooltip.Popup holding the label. The popup is the kit default (aui surface, solid, scale sm, soft) in HCS, PFD, PBS, HS, AGPD and RWS (the second group of the toggle); ACE, ADM, FD and ADC set aui paint solid, color secondary, scale sm on the popup, a dark filled tip. Placement is app side and is a note, not a group: HCS, AGPD and RWS open below the button with a 4px offset, PBS, PFD and HS open above (PFD and HS leave the side at its default), ACE and ADC 8px below, ADM 6px below, ADC dialog closes and FD viewer buttons above or left. The scene is the enabled button with its tooltip open below it, and leaves out the pane header around the button.',
});
