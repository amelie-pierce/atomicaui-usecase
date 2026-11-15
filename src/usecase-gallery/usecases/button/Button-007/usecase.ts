import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Button',
  apps: ['hcs'],
  title: 'In-form helper action',
  summary: 'A raised solid Button resets one field group to its default without leaving the form.',
  where: 'Next to a group of inputs in a side panel: Reset to default. Real site source: HCS Button-006, the only live use of color "raised".',
  when: 'Use it for a helper that acts on part of a form. It sits slightly darker than the default gray so it still reads on a gray panel.',
  how: 'Set aui scale "sm", paint "solid", color "raised" and shape "soft", with Button.Icon before the label.',
});
