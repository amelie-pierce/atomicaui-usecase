import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single checkbox',
  title: 'Show passed checks filter',
  apps: ['fd'],
  cases: [
    {
      id: 'fd-filter',
      name: 'Table filter',
      apps: ['fd'],
      source: { fd: 'src/components/RowExpansion.jsx' },
    },
  ],
  source: {
    fd: 'src/components/RowExpansion.jsx',
  },
  summary: 'A Checkbox with its label that turns an on and off filter of the table right below it: Show passed validations above a results table.',
  where: 'FD only: the Why not details of an expanded result row (src/components/RowExpansion.jsx, SolutionDetails), the first child of the details column above the checks Table.',
  when: 'Use it for an on and off filter that applies to the table right below it. Do not use it for a column filter (Dropdown-001), an exclusive choice (a RadioGroup) or an on and off setting that applies at once (a Switch).',
  how: 'The Checkbox has aui scale "sm" (22px box, a 14px mark, radius 4px) and per-state appearance in states: unselected color "surface" paint "tonal" with sx borderColor "outlined" (a white box with a 1px border), selected color "primary" paint "solid" (no border). Checkbox.Icon name "check" is the mark and Checkbox.Label is the caption on its right with an 8px gap: 16px regular. The Checkbox is the first child of a View (profile "default", scale "sm", flex column, gap 8) above the checks table, and starts unselected (the white box with the 1px border), so the app lists only the failed and warning checks until the reader turns it on and the passed ones appear too. It is the same bare Checkbox as the input panel option with a different label. The scene leaves out the checks table below.',
});
