import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Print output button',
  apps: ['hcs', 'adm', 'hs', 'fd'],
  options: [
    { id: 'white-icon', name: 'White button with icon', apps: ['hcs'], source: { hcs: 'src/App.tsx' } },
    { id: 'black-icon', name: 'Black button with icon', apps: ['hs', 'fd'], source: { hs: 'src/hs/OutputPane.tsx', fd: 'src/components/Results.jsx' } },
    { id: 'black-no-icon', name: 'Black button without icon', apps: ['adm'], source: { adm: 'src/app/layout/Workbench/Workbench.tsx' } },
    { id: 'disabled', name: 'Disabled button', apps: ['hcs', 'adm', 'hs', 'fd'], source: { hcs: 'src/App.tsx', adm: 'src/app/layout/Workbench/Workbench.tsx', hs: 'src/hs/OutputPane.tsx', fd: 'src/components/Results.jsx' } },
  ],
  source: { hcs: 'src/App.tsx', adm: 'src/app/layout/Workbench/Workbench.tsx', hs: 'src/hs/OutputPane.tsx', fd: 'src/components/Results.jsx' },
  summary: 'A Button with a print icon is the last item of a results pane header: quiet and tonal in HCS, a solid black Button in the tabbed headers of HS, FD and ADM.',
  where: 'The action group at the end of the Output pane header, after the scroll helpers and Configure columns (not in the table toolbar). '
    + 'Real site source: HCS App.tsx (Output pane header); HS OutputPane.tsx (Print Output, after Fullscreen) and FD Results.jsx (after Column settings), both inside the tabbed header; ADM Workbench.tsx (right of the Summary and Result tabs, only on the result branch). '
    + 'ACE, PFD, PBS, AGPD and RWS have no Print Output Button: they print from the File menu or the phone drawer (Menubar items), and ADC has no print. '
    + 'View options, the other tonal button of HCS, lives in the 3D viewer (Button-009).',
  when: 'Use it for the one print action of the results pane. HCS keeps it quieter than a solid Button (tonal surface); the apps that follow the HS 2.0 panel standard make ordinary actions secondary solid. '
    + 'Add the native disabled attribute while nothing can be printed (all four apps disable it while the inputs are invalid or there is no result).',
  how: 'Choose the UI to view from the options at the top: each shows the Component UI and the In context UI, and the Document and Code follow it. '
    + 'White button with icon is the HCS Button and the example: aui scale "sm", color "surface", paint "tonal", sx flex "none", with Button.Icon print before the label. '
    + 'In HCS the Output pane header is a title ("Output") with the action group pushed to the end by an app margin (here an inline one). '
    + 'Black button with icon (HS, FD): the header is a 28px tab list (HS: Output, Job List; FD: Output, Calculation Result) with the action group growing and right-aligned after it; Print Output is a Button with aui color "secondary", paint "solid", scale "sm", shape "soft" and Button.Icon print. '
    + 'Black button without icon (ADM): the same tabbed header (Summary, Result) with the action group pushed to the end by a margin (an inline one here); the same Button without the icon, labelled Print Summary or Print Result after the active tab. '
    + 'Disabled button is the HCS header with the native disabled attribute on the Button; HS, FD and ADM disable theirs the same way. '
    + 'Left out of every scene: the Configure columns trigger, the scroll helpers, HS Fullscreen, the toolbar, the results table and Table Notes; also the icon-only form FD shows in a narrow header and ADM\'s phone print row.',
  anatomy: [
    {
      id: "container",
      name: "Container",
      token: "Button",
      description: "The Print Output Button: scale \"sm\", surface color with tonal paint and flex \"none\" so it keeps its width at the end of the results pane header (HCS look; HS, FD and ADM scenes swap in a solid secondary black Button).",
      selector: "[class~=\"aui-button\"]",
      code: "<Button aui={{ scale: 'sm', color: 'surface', paint: 'tonal', sx: { flex: 'none' } }}>\n  …\n</Button>",
    },
    {
      id: "icon",
      name: "Icon",
      token: "Button.Icon",
      description: "The print glyph before the label, at scale \"sm\" so it matches the small Button.",
      selector: "[class~=\"aui-button\"] > :is([class~=\"aui-contained-icon\"], [class~=\"aui-icon\"])",
      code: "<Button.Icon name=\"print\" aui={{ scale: 'sm' }} />",
    },
    {
      id: "label",
      name: "Label",
      token: "Button",
      description: "The text \"Print Output\" that names the action of printing the results.",
      selector: "[class~=\"aui-button\"]",
      text: true,
      code: "Print Output",
    },
  ],
});
