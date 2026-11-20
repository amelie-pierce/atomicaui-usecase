import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Close info dialog button',
  look: 'Secondary solid',
  apps: ['pbs', 'agpd', 'rws'],
  cases: [
    { id: 'pbs-close', name: 'Info Close', apps: ['pbs', 'agpd', 'rws'], source: { pbs: 'src/WorkspaceTools.tsx', agpd: 'src/agpd/ShellDialogs.tsx', rws: 'src/rws/ShellDialogs.tsx' } },
  ],
  source: { pbs: 'src/WorkspaceTools.tsx', agpd: 'src/agpd/ShellDialogs.tsx', rws: 'src/rws/ShellDialogs.tsx' },
  summary: 'The default gray Close is the lone button of an info dialog that only informs.',
  where: 'The footer of the Add to Home Screen info dialog. Real site source: PBS WorkspaceTools.tsx, AGPD and RWS ShellDialogs.tsx; PFD writes the same dialog without a footer, so it has no Close.',
  when: 'Use one neutral button when closing is the only choice and the dialog holds nothing to decide; an app that wants a black Close uses Button-015.',
  how: 'The example sets only aui scale "sm"; color "surface-alt" and paint "solid" are the defaults, and the Dialog.Button default is the same gray solid button that dismisses the dialog. One UI in PBS, AGPD and RWS. '
    + 'The dialog is an AlertDialog in the apps and is drawn as a non-modal Dialog here; the scene keeps one paragraph of body text.',
});
