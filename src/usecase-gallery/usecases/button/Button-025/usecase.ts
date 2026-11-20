import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Ghost, 20px',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
  cases: [
    { id: 'hcs-help-close', name: 'Help popover close', apps: ['hcs'], source: { hcs: 'src/components/HcsDownloadDurationHelp.tsx' } },
    { id: 'pfd-help-close', name: 'Help popover close', apps: ['pfd'], source: { pfd: 'src/pfd/fields.tsx' } },
    { id: 'pbs-help-close', name: 'Help popover close', apps: ['pbs'], source: { pbs: 'src/InputFields.tsx' } },
    { id: 'agpd-help-close', name: 'Help popover close', apps: ['agpd', 'rws'], source: { agpd: 'src/agpd/inputs.tsx', rws: 'src/rws/inputs.tsx' } },
    { id: 'fd-apps-close', name: 'Apps popover close', apps: ['fd'], source: { fd: 'src/App.jsx' } },
    {
      id: 'hcs-walkthrough-close',
      name: 'Walkthrough close',
      apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
      source: {
        hcs: 'src/components/F01Walkthrough.tsx',
        ace: 'src/features/top-navigation/ui/TutorialWalkthrough.tsx',
        adm: 'src/features/top-navigation/components/TutorialWalkthrough.tsx',
        pfd: 'src/pfd/Walkthrough.tsx',
        pbs: 'src/PbsWalkthrough.tsx',
        hs: 'src/hs/Tutorials.tsx',
        fd: 'src/components/Walkthrough.jsx',
        agpd: 'src/agpd/Tutorials.tsx',
        rws: 'src/rws/Tutorials.tsx',
      },
    },
    { id: 'adc-close', name: 'Dialog close', apps: ['adc'], source: { adc: 'src/adc/Workspace.tsx' } },
    {
      id: 'hcs-close',
      name: 'Dialog close',
      apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
      source: {
        hcs: 'src/components/F01Experience.tsx',
        ace: 'src/features/file-persistence/ui/OpenFromDeviceDialog.tsx',
        adm: 'src/features/top-navigation/components/FeedbackDialog.tsx',
        pfd: 'src/pfd/ShellDialogs.tsx',
        pbs: 'src/WorkspaceTools.tsx',
        hs: 'src/hs/ShellDialog.tsx',
        fd: 'src/components/ui.jsx',
        agpd: 'src/agpd/ShellDialogs.tsx',
        rws: 'src/rws/ShellDialogs.tsx',
      },
    },
    { id: 'pbs-close', name: 'Close without Title', apps: ['pbs'], source: { pbs: 'src/ResultsSection.tsx' } },
    { id: 'hcs-panel-header', name: 'Panel header', apps: ['hcs'], source: { hcs: 'src/App.tsx' } },
    { id: 'hcs-field-help', name: 'Field help', apps: ['hcs'], source: { hcs: 'src/App.tsx' } },
    { id: 'pbs-field-help', name: 'Field help', apps: ['pbs'], source: { pbs: 'src/InputFields.tsx' } },
    { id: 'rws-field-help', name: 'Field help', apps: ['rws'], source: { rws: 'src/rws/inputs.tsx' } },
    { id: 'fd-header-info', name: 'Header info', apps: ['fd'], source: { fd: 'src/components/Results.jsx' } },
  ],
  source: {
    hcs: 'src/components/F01Experience.tsx',
    ace: 'src/features/file-persistence/ui/OpenFromDeviceDialog.tsx',
    adm: 'src/features/top-navigation/components/FeedbackDialog.tsx',
    pfd: 'src/pfd/ShellDialogs.tsx',
    pbs: 'src/ResultsSection.tsx',
    hs: 'src/hs/ShellDialog.tsx',
    fd: 'src/components/ui.jsx',
    agpd: 'src/agpd/ShellDialogs.tsx',
    rws: 'src/rws/ShellDialogs.tsx',
    adc: 'src/adc/Workspace.tsx',
  },
  summary: 'A transparent icon-only IconButton, 20px square, runs one quiet action in a corner or beside a label: dismiss an overlay, explain a field, or work a panel.',
  where: 'The corner or title end of any overlay that can be dismissed: a help popover (beside the circle-question trigger of Field help) and the FD apps popover, the coach-mark card of a walkthrough, and a dialog Title; and the quiet chrome of a form or panel: the circle-question beside a field label that opens its help (HCS, PBS and RWS), the FD table-header info trigger, and the HCS Input pane header (collapse all, expand all, configure columns, help). Each place shows its own spot for the button.',
  when: 'Use it for an icon-only control that never needs emphasis: to dismiss an overlay without acting (in a dialog it is the same as the neutral Cancel of the footer, Button-018, Button-005; do not use it as the only way out of a dialog that needs a decision, and leave it out where the app forbids closing, the PBS licence gate), to explain one field without adding permanent text, or in panel chrome. Always set aria-label, and wrap panel buttons in a Tooltip with the same text; the popup or tooltip a help button opens holds the long explanation.',
  how: 'The example is the shared part: an IconButton with paint "text", profile "contained" and an aria-label (the dialog default); the places differ only in the glyph, the props the app sets and where the button sits. The Component tab shows the X IconButton; the Dialog.Close of the dialog places, the Popover, the Tooltip and the walkthrough card are the supporting parts the In context scene writes around it. IconButton is a kit part and needs the Font Awesome font to show its glyph. The preview shows the radio group of the places and a toggle of the apps where a place has two or more groups. '
    + 'Help popover close: HCS (an IconButton at scale "sm", profile "square-compact", color "secondary", paint "text", shape "soft", sx flex "none", at the end of an intro row in a View card, surface, solid, soft, elevation 4, up to 34rem, above the circle-question trigger; top, start, 8px offset). PFD: a Button (not an IconButton) with a ContainedIcon xmark at profile "square", scale "sm", secondary, text, alone in its own row at the end above the text, in a column up to 384px. PBS: an IconButton at scale "xs", paint "text", profile "square-compact", shape "soft" and no color, at the end of a row beside the help text, in a 320px popup. AGPD and RWS: an IconButton with only scale "xs", right-aligned in its own row above the text, in a 320px column. The optional image or diagram of the PFD, AGPD and RWS popups is left out. '
    + 'Apps popover close: FD only (a Button with an xmark Icon child, color "secondary", paint "text", scale "sm", at the end of the title row "Explore More Applications" in the 288px apps popover opened from the top bar grip; the grid of app links is left out). '
    + 'Walkthrough close: all nine apps with a tour (ADC has none) write the same IconButton with scale "sm", paint "text" and color "surface"; the glyph is xmark (the apps pass family classic and layer duotone, which is the provider default here). In context the X sits in the corner of the step 1 card (HCS Connection Type, so only Next in the footer), 4px in, through an inline style (the apps use a local class such as .hcs-tour-close because the kit sx has no inset axis); the title reserves 24px at its end so its text stops short of it. RWS hides the X on one step of its tour (a step with close set to false); that is a rule of its steps, not another UI. The footer of the scene is HCS\'s; the other apps\' footers are in Button-020. '
    + 'Dialog close: the real part is Dialog.Close, an IconButton named "xmark" with paint "text" and profile "contained", taking the popup scale (the example uses IconButton, since Dialog.Close needs a Dialog around it). ADC (the X wrapped in a Tooltip, a solid secondary sm popup reading "Close", measured 59x28 on hover); HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD and RWS (a raised Title with a Spacer and the 20x20 contained X; the scene is HCS, which sets scale "sm", the default, on the Title and the X; measured in the browser, HCS and the others render the same elements and styles and differ only in popup width, 384px vs 480px, and the aria-label; their licence gates set scale "sm" on a plain Title and the X, and PBS drops the X there). '
    + 'Close without Title: PBS only (HeaderClose, the Remove and Duplicate dialogs): no Title, a View row with justifyContent "end" holding only the X. '
    + 'Panel header: HCS only (an IconButton with aui color "secondary", paint "text", scale "sm", shape "soft" and profile "contained" inside a Tooltip with the same text as the aria-label, as the app does for every icon-only button; in context it is Collapse all at the end of the Input pane header, after the collapse chevron, the semi-bold title and a Panels.Spacer, above two accordion sections, both open and empty, so the label and glyph read Collapse all and arrows-to-line; with every section closed they read Expand all and arrows-from-line; the section contents and the Galvanized card are left out). '
    + 'Field help, HCS: an IconButton with aui scale "sm", profile "contained", color "secondary", paint "text" and shape "soft", with the circle-question glyph; it opens the popover of Help popover close. In context it is the Load Properties section: Download Duration alone, the label row (label text, then the icon, a flex row) above its select. The other fields are left out. PBS: a Button with a ContainedIcon circle-question child at profile "square-compact" so the label row keeps its height, opening a 320px popover. RWS: a Button at profile "square" pinned to 20px by sx, opening a 320px popover. The other apps\' field-help triggers are 28px squares and sit in Button-027. '
    + 'Header info: FD only (a Button with a circle-info Button.Icon, color "secondary", paint "text", scale "xs", in a table column header cell, opening a popover below it). Each help scene keeps one labelled field and one sentence of help text. '
    + 'The dialog scenes keep the Title only: no body or footer.',
});
