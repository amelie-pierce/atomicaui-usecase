import { defineUsecase } from '../../../define';

export default defineUsecase({
  title: 'Disabled and busy',
  summary: 'A disabled Button with a Spinner shows that a request is in progress.',
  where: 'Any Button that starts a request: Save, Submit, Upload.',
  when: 'Use it while the request is in flight so the action cannot be submitted twice. Restore the Button when the request ends.',
  how: 'Set the native disabled and aria-busy attributes, and place Button.Spinner before the label. Button has no loading prop.',
});
