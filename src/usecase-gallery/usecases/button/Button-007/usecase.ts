import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Close info dialog button',
  apps: ['pbs', 'agpd', 'rws', 'fd'],
  cases: [
    { id: 'pbs-close', name: 'Info Close', apps: ['pbs', 'agpd', 'rws'], look: 'Secondary solid', source: { pbs: 'src/WorkspaceTools.tsx', agpd: 'src/agpd/ShellDialogs.tsx', rws: 'src/rws/ShellDialogs.tsx' } },
    { id: 'fd-close', name: 'Info Close', apps: ['fd'], look: 'Dark solid', source: { fd: 'src/App.jsx' } },
  ],
  source: { pbs: 'src/WorkspaceTools.tsx', agpd: 'src/agpd/ShellDialogs.tsx', rws: 'src/rws/ShellDialogs.tsx', fd: 'src/App.jsx' },
  summary: 'Close is the lone button of an info dialog that only informs; the example is the default gray one.',
  where: 'The footer of an info dialog: the Add to Home Screen dialog in PBS WorkspaceTools.tsx, AGPD and RWS ShellDialogs.tsx, and the Explore More Applications dialog in FD src/App.jsx. PFD writes the Add to Home Screen dialog without a footer, so it has no Close.',
  when: 'Use one button when closing is the only choice and the dialog holds nothing to decide. The default look is the neutral gray Close; use the dark one only where the app wants the Close to stand out.',
  how: 'Secondary solid (PBS, AGPD, RWS): the example sets only aui scale "sm"; color "surface-alt" and paint "solid" are the defaults, and the Dialog.Button default is the same gray solid button that dismisses the dialog. '
    + 'Dark solid (FD): a plain Button with aui color "secondary" (a black fill) instead of the gray Dialog.Button; the scene writes it. '
    + 'The dialog is an AlertDialog or Modal in the apps and is drawn as a non-modal Dialog here; each scene keeps one paragraph of body text.',
});
