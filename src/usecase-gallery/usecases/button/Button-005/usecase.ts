import { defineUsecase } from '../../../define';

export default defineUsecase({
  title: 'Outlined toolbar action',
  summary: 'A tonal surface Button carries a toolbar action with a dark outline; Print Output has a leading print icon and View options has none.',
  where: 'A results toolbar beside other controls: Print Output, View options. Real site source: HCS Button-004.',
  when: 'Use it for a tertiary action that should read as a button but stay quieter than a solid one. Add the native disabled attribute while the action is unavailable.',
  how: 'Set aui scale "sm", color "surface" and paint "tonal". Add sx flex "none" to stop it shrinking in a flex row. Print Output adds Button.Icon print before the label; View options is text only.',
});
