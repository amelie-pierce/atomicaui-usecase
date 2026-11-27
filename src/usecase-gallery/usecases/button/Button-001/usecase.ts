import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Print output button',
  apps: ['hcs', 'adm', 'hs', 'fd'],
options: [
    { id: 'white-icon', name: 'White button with icon', apps: ['hcs'], contextAnatomy: [
      { id: "output-pane", name: "Output pane", description: "The Output pane frame, a surface-alt section that holds the header row. The toolbar, table and notes are left out." , lesson: {"explanation":"Surface-alt Output pane contains the header and its controls.","selector":"[data-ug-part=\"output-pane\"]","scope":"context"}},
      { id: "output-title", name: "Output title", description: "The \"Output\" heading at the start of the pane header." , lesson: {"explanation":"The \"Output\" heading at the start of the pane header.","selector":"[data-ug-part=\"output-title\"]","scope":"context"}},
      { id: "header-actions", name: "Header actions", description: "The action group pushed to the end of the header, which holds the Print Output button (HCS)." , lesson: {"explanation":"Header action group places Print at the far end.","selector":"[data-ug-part=\"header-actions\"]","scope":"context"}},
    ], source: { hcs: 'src/App.tsx' } ,
    },
    { id: 'black-icon', name: 'Black button with icon', apps: ['hs', 'fd'], contextAnatomy: [
      { id: "output-pane", name: "Output pane", description: "The Output pane frame, a surface-alt section that holds the header row. Only the header is shown." , lesson: {"explanation":"Surface-alt Output pane contains the header and its controls.","selector":"[data-ug-part=\"output-pane\"]","scope":"context"}},
      { id: "output-tabs", name: "Output tabs", description: "The Output and Job List tabs at the start of the header, with the selected tab on an overlay fill." , lesson: {"explanation":"Output tabs start the header; selected tab uses overlay fill.","selector":"[data-ug-part=\"output-tabs\"]","scope":"context"}},
      { id: "header-actions", name: "Header actions", description: "The action group that grows and right-aligns itself after the tabs and holds Print Output." , lesson: {"explanation":"Header action group places Print at the far end.","selector":"[data-ug-part=\"header-actions\"]","scope":"context"}},
    ], source: { hs: 'src/hs/OutputPane.tsx', fd: 'src/components/Results.jsx' } ,
    },
    { id: 'black-no-icon', name: 'Black button without icon', apps: ['adm'], contextAnatomy: [
      { id: "output-pane", name: "Output pane", description: "The Output pane frame, a surface-alt section that holds the header row. Only the header is shown." , lesson: {"explanation":"Surface-alt Output pane contains the header and its controls.","selector":"[data-ug-part=\"output-pane\"]","scope":"context"}},
      { id: "output-tabs", name: "Output tabs", description: "The Summary and Result tabs at the start of the header; the Print label follows the selected tab." , lesson: {"explanation":"Output tabs start the header; selected tab uses overlay fill.","selector":"[data-ug-part=\"output-tabs\"]","scope":"context"}},
      { id: "header-actions", name: "Header actions", description: "The action group pushed to the end of the header with an auto inline-start margin; it holds the text-only Print Summary button." , lesson: {"explanation":"Header action group places Print at the far end.","selector":"[data-ug-part=\"header-actions\"]","scope":"context"}},
    ], source: { adm: 'src/app/layout/Workbench/Workbench.tsx' } ,
    },
    { id: 'disabled', name: 'Disabled button', apps: ['hcs', 'adm', 'hs', 'fd'], contextAnatomy: [
      { id: "output-pane", name: "Output pane", description: "The Output pane frame, a surface-alt section that holds the header row. Labelled \"Output, inputs invalid\"." , lesson: {"explanation":"Surface-alt Output pane contains the header and its controls.","selector":"[data-ug-part=\"output-pane\"]","scope":"context"}},
      { id: "output-title", name: "Output title", description: "The \"Output\" heading at the start of the pane header." , lesson: {"explanation":"The \"Output\" heading at the start of the pane header.","selector":"[data-ug-part=\"output-title\"]","scope":"context"}},
      { id: "header-actions", name: "Header actions", description: "The action group pushed to the end of the header; its Print Output button is disabled while the inputs are invalid." , lesson: {"explanation":"Header action group places Print at the far end.","selector":"[data-ug-part=\"header-actions\"]","scope":"context"}},
    ], source: { hcs: 'src/App.tsx', adm: 'src/app/layout/Workbench/Workbench.tsx', hs: 'src/hs/OutputPane.tsx', fd: 'src/components/Results.jsx' } ,
    },
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
      description: "The Print Output Button: scale \"sm\", surface color with tonal paint and flex \"none\" so it keeps its width at the end of the results pane header (HCS look; HS, FD and ADM scenes swap in a solid secondary black Button).",
      selector: "[class~=\"aui-button\"]",
     lesson: {"explanation":"Print Output button sits at header end; app styling varies."}},
    {
      id: "icon",
      name: "Icon",
      description: "The print glyph before the label, at scale \"sm\" so it matches the small Button.",
      selector: "[class~=\"aui-button\"] > :is([class~=\"aui-contained-icon\"], [class~=\"aui-icon\"])",
     lesson: {"explanation":"Small print glyph sits before its button label."}},
    {
      id: "label",
      name: "Label",
      description: "The text \"Print Output\" that names the action of printing the results.",
      selector: "[class~=\"aui-button\"]",
      text: true,
    },
  ],
});
