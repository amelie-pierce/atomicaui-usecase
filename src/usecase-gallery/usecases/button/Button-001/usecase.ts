import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Print output button',
  look: 'Tonal outlined with icon',
  apps: ['hcs', 'adm', 'hs', 'fd'],
  cases: [
    { id: 'hcs-enabled', name: 'Enabled', apps: ['hcs'], source: { hcs: 'src/App.tsx' } },
    { id: 'hs-enabled', name: 'Enabled', apps: ['hs', 'fd'], source: { hs: 'src/hs/OutputPane.tsx', fd: 'src/components/Results.jsx' } },
    { id: 'adm-enabled', name: 'Enabled', apps: ['adm'], source: { adm: 'src/app/layout/Workbench/Workbench.tsx' } },
    { id: 'hcs-disabled', name: 'Disabled (inputs invalid)', apps: ['hcs'], source: { hcs: 'src/App.tsx' } },
    { id: 'hs-disabled', name: 'Disabled (inputs invalid)', apps: ['hs', 'fd'], source: { hs: 'src/hs/OutputPane.tsx', fd: 'src/components/Results.jsx' } },
    { id: 'adm-disabled', name: 'Disabled (inputs invalid)', apps: ['adm'], source: { adm: 'src/app/layout/Workbench/Workbench.tsx' } },
  ],
  source: { hcs: 'src/App.tsx', adm: 'src/app/layout/Workbench/Workbench.tsx', hs: 'src/hs/OutputPane.tsx', fd: 'src/components/Results.jsx' },
  summary: 'A Button with a print icon is the last item of a results pane header: quiet and tonal in HCS, a solid black Button in the tabbed headers of HS, FD and ADM.',
  where: 'The action group at the end of the Output pane header, after the scroll helpers and Configure columns (not in the table toolbar). '
    + 'Real site source: HCS App.tsx (Output pane header); HS OutputPane.tsx (Print Output, after Fullscreen) and FD Results.jsx (after Column settings), both inside the tabbed header; ADM Workbench.tsx (right of the Summary and Result tabs, only on the result branch). '
    + 'ACE, PFD, PBS, AGPD and RWS have no Print Output Button: they print from the File menu or the phone drawer (Menubar items), and ADC has no print. '
    + 'View options, the other tonal button of HCS, lives in the 3D viewer (Button-009).',
  when: 'Use it for the one print action of the results pane. HCS keeps it quieter than a solid Button (tonal surface); the apps that follow the HS 2.0 panel standard make ordinary actions secondary solid. '
    + 'Add the native disabled attribute while nothing can be printed (all four apps disable it while the inputs are invalid or there is no result).',
  how: 'The example is the HCS Button: aui scale "sm", color "surface", paint "tonal", sx flex "none", with Button.Icon print before the label. The preview groups the apps by distinct UI and the Document lists the same groups. '
    + 'HCS: the Output pane header is a title ("Output") with the action group pushed to the end by an app margin (here an inline one); Print Output is the example. '
    + 'HS, FD: the header is a 28px tab list (HS: Output, Job List; FD: Output, Calculation Result) with the action group growing and right-aligned after it; Print Output is a Button with aui color "secondary", paint "solid", scale "sm", shape "soft" and Button.Icon print. '
    + 'ADM: the same tabbed header (Summary, Result) with the action group pushed to the end by a margin (an inline one here); the same Button without the icon, labelled Print Summary or Print Result after the active tab. '
    + 'Disabled (inputs invalid) is the same header with the native disabled attribute on the Button. '
    + 'Left out of every scene: the Configure columns trigger, the scroll helpers, HS Fullscreen, the toolbar, the results table and Table Notes; also the icon-only form FD shows in a narrow header and ADM\'s phone print row.',
});
