import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Tooltip on a button',
  title: 'Icon button tooltip',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
  cases: [
    {
      id: 'hcs-icon-label',
      name: 'Icon label',
      apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
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
  summary: 'An icon-only button shows what it does in a small tooltip on hover or keyboard focus.',
  where: 'Every icon-only header, rail and navigation button of the ten apps (HCS HcsIconTooltip, ACE PaneIconTooltip, ADM AdmIconTooltip, ADC and FD IconTooltip, AGPD and RWS IconTip, PBS and PFD and HS output navigation). The panel standard of the apps is that an icon-only button carries an aria-label and a tooltip with the same words. Also the Reset View button floating over the 3D viewer (ADM ViewerChrome, FD Viewer).',
  when: 'Use it on every IconButton that has no visible text, including the Reset View button over the viewer. Do not use it for a control whose label is already visible, and not for long help text (a help icon, Button-025). For a radio option, see Tooltip-004.',
  how: 'Compose Tooltip.Provider, Tooltip, Tooltip.Trigger with the IconButton as render, Tooltip.Portal, Tooltip.Positioner and Tooltip.Popup. All ten apps show the same label tooltip on an icon-only button, so they are one group; no popup placement or surface was measured in a browser, so none splits it. From the tooltip source, HS requests the Base UI default side (top) and RWS requests bottom, each with a 4px offset; collision handling may flip the requested side when space is limited. Scenes show one enabled button and omit the surrounding pane header. Reset View (ADM, FD): the same IconButton trigger and label tooltip on a floating viewer control; ADM ViewerChrome and FD Viewer are read from the source and not run.',
});
