import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Toolbar',
  title: 'Results toolbar actions',
  apps: ['hcs'],
  summary: 'Quiet tonal Buttons carry the actions of a results toolbar (Print Output, View options) beside a neutral Reset filters.',
  where: 'A results toolbar beside other controls: Print Output, View options and Reset filters. Real site source: HCS Button-004 (tonal) and Button-007 (Reset filters).',
  when: 'Use the tonal surface Button for a tertiary action that should read as a button but stay quieter than a solid one. Add the native disabled attribute while an action is unavailable. Reset filters is the plain default Button.',
  how: 'Tonal ones set aui scale "sm", color "surface" and paint "tonal", plus sx flex "none" to stop them shrinking in a flex row; Print Output adds Button.Icon print before the label. Reset filters sets only scale "sm" (color "surface-alt" and paint "solid" are the defaults) with Button.Icon filter-circle-xmark.',
});
