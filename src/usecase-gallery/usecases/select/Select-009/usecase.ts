import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Filled select',
  title: 'Status filter',
  apps: ['fd'],
  cases: [{ id: 'fd-status-filter', name: 'Status filter', apps: ['fd'], source: { fd: 'src/components/Results.jsx' } }],
  source: { fd: 'src/components/Results.jsx' },
  summary: 'A label-less select in the output toolbar that narrows the results by status.',
  where: 'The FD output toolbar, beside the search field: the Product status filter, shown when the design has failed products.',
  when: 'Use it as a toolbar filter where the visible value names the filter and no label fits. Name it with aria-label on the trigger. Use the field select (Select-001) for a design input.',
  how: 'FD: a Field at scale "sm" (class "status-filter") around a Field.Select; the Field.SelectTrigger carries aria-label "Product status" and only `sx: { width: "full" }`, so it keeps the default kit colour and paint and fills the toolbar slot, with Field.SelectValue and Field.SelectChevron. The Field.SelectPositioner uses sideOffset 5 and the Field.SelectPopup matchTriggerWidth; each row is a Field.SelectItem with Field.SelectItemText and an empty Field.SelectItemIndicator. The scene shows the filter alone and leaves out the search field, the reset filter button and the solution count.',
});
