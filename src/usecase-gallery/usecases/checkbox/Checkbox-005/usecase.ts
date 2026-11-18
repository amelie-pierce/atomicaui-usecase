import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Results',
  title: 'Filter above a results table',
  apps: ['fd'],
  source: { fd: 'src/components/RowExpansion.jsx' },
  cases: [{ id: 'fd-filter', name: 'Show passed validations', apps: ['fd'], source: { fd: 'src/components/RowExpansion.jsx' } }],
  summary: 'A Checkbox in the expanded row of a results table that widens the checks listed below it (Show passed validations).',
  where: 'The Why not details of an expanded result row in FD (src/components/RowExpansion.jsx, SolutionDetails): the Checkbox is the first child of the details column, above the checks Table.',
  when: 'Use it for an on and off filter that applies to the table right below it. Do not use it for a column filter (Dropdown-001) or to select a row (Table-002).',
  how: 'Checkbox aui states unselected color "surface" paint "tonal" borderColor "outlined" and selected color "primary" paint "solid", with a Checkbox.Label 16px regular. It sits in a View (profile "default", scale "sm", flex column, gap 8) and is not selected until the reader turns it on: the app then lists the passed checks as well as the failed and warning ones. FD is the only app with it, and the box renders as the bare Option of Checkbox-002. The scene leaves out the checks table below.',
});
