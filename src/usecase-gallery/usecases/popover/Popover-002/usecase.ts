import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Popover',
  title: 'Form popover with footer',
  apps: ['hcs', 'hs'],
  cases: [
    { id: 'hcs-configure-columns', name: 'Configure columns', apps: ['hcs'], source: { hcs: 'src/components/ColumnVisibility.tsx' } },
    { id: 'hs-configure-columns', name: 'Configure columns', apps: ['hs'], source: { hs: 'src/hs/ColumnVisibility.tsx' } },
  ],
  source: { hcs: 'src/components/ColumnVisibility.tsx', hs: 'src/hs/ColumnVisibility.tsx' },
  summary: 'A popover that holds a small form and ends in a footer row: a reset icon at the start, Cancel and a solid Save at the end.',
  where: 'The Configure columns popover opened from the table-columns icon at the end of the Output header in HCS and HS (ADC edits a value in a smaller popover, Button-014).',
  when: 'Use it for a short list of settings the user confirms or cancels. Do not use it for read-only help (Popover-001) or a menu of choices (Popover-003).',
  how: 'The Popover opens below the trigger `IconButton` (`side="bottom"`, `align="end"`, `sideOffset={4}`); the Popup renders a 320px `View` column (surface, solid, soft, elevation 4, gap 8) with a reorderable `List` and a footer `View` with `justifyContent: "between"`. The footer is the Button-014 group. HCS and HS are two groups: HCS (a contained trigger, a search Field and a Group by model switch, Save at scale "sm") and HS (a secondary text trigger, Save at the default scale). The scenes leave out the search and the group switch.',
});
