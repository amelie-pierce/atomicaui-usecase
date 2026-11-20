import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Centered-title dialog',
  apps: ['fd'],
  cases: [{ id: 'fd-help-center', name: 'Help Center', source: { fd: 'src/components/HelpCenter.jsx' } }],
  source: { fd: 'src/components/HelpCenter.jsx' },
  summary: 'A small raised-title dialog whose title is centred between side paddings, with the close X pinned to the end and a column of rows in the body.',
  where: 'The Help Center panel of FD (src/components/HelpCenter.jsx): a popup pinned to the bottom end of the screen, listing help rows and the tutorials. The other apps open the Help Center as a menu (Menubar-002).',
  when: 'Use it for a small floating panel that lists a few navigation rows and stays beside the work, where a centred name suits the panel. A dialog that left-aligns its name is Dialog-001.',
  how: 'The same parts as Dialog-001 (Dialog.Popup at scale "sm", shape "soft", a raised Dialog.Title, Dialog.Close, Dialog.Body) with two differences measured in the gallery against the About dialog: the Title has justifyContent "center" and 40px start and end padding (the Title text is centred, the About one starts at 8px) and there is no Dialog.Spacer, so the close X is taken out of the flow and pinned with position absolute and an 8px inline-end offset (FD does it with its own CSS class; the scene writes the same two declarations inline). Title height (28px), fill and font match Dialog-001. FD also fixes the popup to the screen corner with its own viewport class and caps it at 420px; the scene is a plain 360px popup. The body is one navigation View of rows (no padding, gap 8); the row icons and the tutorials list are left out.',
});
