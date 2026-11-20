import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Close info dialog button',
  look: 'Dark solid',
  apps: ['fd'],
  cases: [
    { id: 'fd-close', name: 'Info Close', apps: ['fd'], source: { fd: 'src/App.jsx' } },
  ],
  source: { fd: 'src/App.jsx' },
  summary: 'A black Close is the lone button of an info dialog where the app wants it to stand out.',
  where: 'The footer of the Explore More Applications dialog. Real site source: FD src/App.jsx. Other apps close their info dialogs with the gray Button-007.',
  when: 'Use it where the app wants a black Close instead of the gray default of Button-007.',
  how: 'A plain Button with aui color "secondary" (a black fill), not the gray Dialog.Button the other apps use. The Modal is drawn as a non-modal Dialog here; the scene keeps one paragraph of body text. One group, FD only.',
});
