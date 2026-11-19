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
      apps: ['hcs', 'agpd', 'rws'],
      source: {
        hcs: 'src/components/HcsIconTooltip.tsx',
        agpd: 'src/agpd/panel.tsx',
        rws: 'src/rws/panel.tsx',
      },
    },
    {
      id: 'pfd-icon-label',
      name: 'Icon label',
      apps: ['pfd', 'pbs', 'hs'],
      source: { pfd: 'src/pfd/useOutputNavigation.tsx', pbs: 'src/App.tsx', hs: 'src/hs/useOutputNavigation.tsx' },
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
  how: 'Compose Tooltip.Provider, Tooltip, Tooltip.Trigger with the IconButton as render, Tooltip.Portal, Tooltip.Positioner and Tooltip.Popup. ACE, ADM, FD and ADC use a dark secondary popup below the button (8px offset; ADM 6px). HCS, AGPD and RWS use the default surface popup below (4px); PFD, PBS and HS use it above (4px). ADC dialog close buttons open above and FD viewer buttons open left (Tooltip-002). Collision handling may flip the requested side when space is limited. Scenes show one enabled button and omit the surrounding pane header.',
});
