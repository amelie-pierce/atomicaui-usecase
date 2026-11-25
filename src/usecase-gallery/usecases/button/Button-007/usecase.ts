import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Close info dialog button',
  apps: ['pbs', 'agpd', 'rws', 'fd'],
  options: [
    { id: "pbs-close", name: "Secondary solid", apps: ["pbs","agpd","rws"], contextAnatomy: [
      { id: "dialog", name: "Dialog", description: "The open dialog titled \"Add to Your Home Screen\"." },
      { id: "dialog-title", name: "Dialog title", description: "The raised title bar with \"Add to Your Home Screen\" and the close X at the end." },
      { id: "dialog-close", name: "Close button", description: "The X in the title that closes the dialog (aria-label \"Close Add to Your Home Screen\")." },
      { id: "dialog-body", name: "Dialog body", description: "The scrollable body with the Android \"Add to Home Screen\" instructions." },
      { id: "dialog-footer", name: "Dialog footer", description: "The Actions row at the end that holds the single Close button." },
    ], source: {"pbs":"src/WorkspaceTools.tsx","agpd":"src/agpd/ShellDialogs.tsx","rws":"src/rws/ShellDialogs.tsx"} },
    { id: "fd-close", name: "Dark solid", apps: ["fd"], contextAnatomy: [
      { id: "dialog", name: "Dialog", description: "The open dialog titled \"Explore More Applications\"." },
      { id: "dialog-title", name: "Dialog title", description: "The raised title bar with \"Explore More Applications\" and the close X at the end." },
      { id: "dialog-close", name: "Close button", description: "The X in the title that closes the dialog (aria-label \"Close Explore More Applications\")." },
      { id: "dialog-body", name: "Dialog body", description: "The scrollable body with the line \"Simpson Strong-Tie design applications.\"" },
      { id: "dialog-footer", name: "Dialog footer", description: "The Actions row at the end that holds the single Close button." },
    ], source: {"fd":"src/App.jsx"} },
  ],
  source: { pbs: 'src/WorkspaceTools.tsx', agpd: 'src/agpd/ShellDialogs.tsx', rws: 'src/rws/ShellDialogs.tsx', fd: 'src/App.jsx' },
  summary: 'Close is the lone button of an info dialog that only informs; its first look, the default gray one, is the example; the Look select shows the other.',
  where: 'The footer of an info dialog: the Add to Home Screen dialog in PBS WorkspaceTools.tsx, AGPD and RWS ShellDialogs.tsx, and the Explore More Applications dialog in FD src/App.jsx. PFD writes the Add to Home Screen dialog without a footer, so it has no Close.',
  when: 'Use one button when closing is the only choice and the dialog holds nothing to decide. The default look is the neutral gray Close; use the dark one only where the app wants the Close to stand out.',
  how: 'Secondary solid (PBS, AGPD, RWS): the example sets only aui scale "sm"; color "surface-alt" and paint "solid" are the defaults, and the Dialog.Button default is the same gray solid button that dismisses the dialog. '
    + 'Dark solid (FD): a plain Button with aui color "secondary" (a black fill) instead of the gray Dialog.Button; the scene writes it. '
    + 'The dialog is an AlertDialog or Modal in the apps and is drawn as a non-modal Dialog here; each scene keeps one paragraph of body text.',
  anatomy: [
    {
      id: "container",
      name: "Container",
      description: "The single Close Button in an info dialog footer, small and default gray (PBS); FD shows the same Close with a black secondary fill.",
      selector: "[class~=\"aui-button\"]:not([class~=\"aui-dialog-close\"])",
    },
    {
      id: "label",
      name: "Label",
      description: "The text \"Close\" that dismisses the info dialog, the only choice it offers.",
      selector: "[class~=\"aui-button\"]:not([class~=\"aui-dialog-close\"])",
      text: true,
    },
  ],
});
