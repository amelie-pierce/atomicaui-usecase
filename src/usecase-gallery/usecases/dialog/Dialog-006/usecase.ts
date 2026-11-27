import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Centered-title dialog',
  apps: ['fd'],
options: [
    { id: "fd-help-center", name: "Help Center", showContext: false, source: {"fd":"src/components/HelpCenter.jsx"} ,
    },
  ],
  source: { fd: 'src/components/HelpCenter.jsx' },
  summary: 'A small raised-title dialog whose title is centred between side paddings, with the close X pinned to the end and a column of rows in the body.',
  where: 'The Help Center panel of FD (src/components/HelpCenter.jsx): a popup pinned to the bottom end of the screen, listing help rows and the tutorials. The other apps open the Help Center as a menu (Menubar-003).',
  when: 'Use it for a small floating panel that lists a few navigation rows and stays beside the work, where a centred name suits the panel. A dialog that left-aligns its name is Dialog-001.',
  how: 'The same parts as Dialog-001 (Dialog.Popup at scale "sm", shape "soft", a raised Dialog.Title, Dialog.Close, Dialog.Body) with two differences measured in the gallery against the About dialog: the Title has justifyContent "center" and 40px start and end padding (the Title text is centred, the About one starts at 8px) and there is no Dialog.Spacer, so the close X is taken out of the flow and pinned with position absolute and an 8px inline-end offset (FD does it with its own CSS class; the scene writes the same two declarations inline). Title height (28px), fill and font match Dialog-001. FD also fixes the popup to the screen corner with its own viewport class and caps it at 420px; the scene is a plain 360px popup. The body is one navigation View of rows (no padding, gap 8); the row icons and the tutorials list are left out.',
  anatomy: [
    {
      id: 'overlay',
      name: 'Overlay',
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim behind the Help Center window.',
     lesson: {"explanation":"Scrim dims content behind the Help Center window."}},
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The small 360px Help Center window at scale "sm" with a soft shape (FD caps its own copy at 420px and pins it to the screen corner).',
     lesson: {"explanation":"Small soft Help Center window is 360px; FD uses 420px."}},
    {
      id: 'title',
      name: 'Title bar',
      selector: '[class~="aui-dialog-title"]',
      description: 'The raised title bar whose "Help Center" text is centred between 40px start and end padding, with no Spacer.',
     lesson: {"explanation":"Raised centered title leaves 40px padding at each end."}},
    {
      id: 'title-text',
      name: 'Title text',
      description: 'The centred words "Help Center" inside the title bar.',
     lesson: {"explanation":"The centred words \"Help Center\" inside the title bar.","selector":"[data-ug-part=\"title-text\"]"}},
    {
      id: 'close',
      name: 'Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X taken out of the flow and pinned to the inline end with position absolute and an 8px offset.',
     lesson: {"explanation":"Absolutely positioned Close X sits 8px from the inline end."}},
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'The body that holds the navigation column of help rows.',
     lesson: {"explanation":"The body that holds the navigation column of help rows."}},
    {
      id: 'help-rows',
      name: 'Help rows',
      description: 'The nav View labelled "Help Center": a no-padding column with gap 8 whose rows are Feedback and Tutorials in the FD scene.',
     lesson: {"explanation":"Help Center navigation lists Feedback and Tutorials in FD.","selector":"[data-ug-part=\"help-rows\"]"}},
  ],
});
