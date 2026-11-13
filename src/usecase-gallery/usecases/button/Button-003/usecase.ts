import { defineUsecase } from '../../../define';

export default defineUsecase({
  title: 'Destructive action',
  summary: 'The error color flags an action that deletes or discards data.',
  where: 'Confirmation dialogs and settings pages: Delete project, Remove member, Discard changes.',
  when: 'Use it only for the confirming action of an irreversible change, never for the cancel path. Ask for confirmation first.',
  how: 'Set aui color to "error" and paint to "solid". Name the verb and the object, and keep it away from the primary action.',
});
