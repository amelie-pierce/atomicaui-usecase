import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Toolbar',
  title: 'Reset filters',
  apps: ['hcs'],
  summary: 'A neutral default Button clears the active filters of a results table.',
  where: 'The toolbar row above the Output table, after the search field and before the result count and the product filter. Real site source: HCS Button-005 (Reset filters).',
  when: 'Use it beside filter controls, shown only while a filter is active. It is the plain default Button because clearing filters is a quiet action.',
  how: "Set only aui scale \"sm\" (color \"surface-alt\" and paint \"solid\" are the defaults), with Button.Icon filter-circle-xmark before the label. In context the Output toolbar is one wrapping row: the search field fills the line, then the button (rendered only while a filter is active), the muted result count and the product filter, an outlined Dropdown trigger (closed here), above the results table and Table Notes.",
});
