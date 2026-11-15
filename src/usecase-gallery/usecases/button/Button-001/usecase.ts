import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Button',
  apps: ['hcs'],
  title: 'Dialog confirm',
  summary: 'The solid secondary Button commits the action of a dialog.',
  where: 'The footer of a confirmation or form dialog, beside Cancel: Reset, Submit, Accept. Real site source: HCS Button-001.',
  when: 'Use it for the one action that confirms the dialog. In brand atomic the near-black fill is color "secondary", not "primary" (orange). Pair it with the gray Cancel from Button-002.',
  how: 'Set aui scale "sm", color "secondary" and paint "solid". The real dialogs use Dialog.Button or AlertDialog.Button with the same aui; Button is shown here because the gallery kit does not export them.',
});
