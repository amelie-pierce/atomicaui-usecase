import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dropdown with text trigger',
  title: 'Outlined text trigger',
  apps: ['hcs'],
  cases: [{ id: 'hcs-product-filter', name: 'Radio value filter', apps: ['hcs'], source: { hcs: 'src/components/HcsProductFilter.tsx' } }],
  source: { hcs: 'src/components/HcsProductFilter.tsx' },
  summary: 'A text trigger with a chevron opens a short list of radio rows; the chosen row names the trigger and closes the list.',
  where: 'The HCS output toolbar, at the end of the row beside the "Showing N of M results" text: the Product filter that narrows the results to Passed, Failed or All Products.',
  when: 'Use it to pick one value from a short fixed list where the current value must stay visible in the trigger. The trigger is the outlined text form (surface, fixed, a 1px outlined border), not an icon button, and the chosen row is marked by the selected fill.',
  how: 'HCS: a Dropdown at scale "sm" whose Dropdown.Trigger shows the chosen option label with its count (for example "Passed Products (9)") and a Dropdown.Chevron, with aria-label "Product filter", color "surface", paint "fixed" and a 1px border on all four sides in the "outlined" colour (sx whiteSpace "nowrap"). The popup is a Dropdown.Popup with matchTriggerWidth at scale "sm", placed 4px below the trigger and aligned to its start. It holds one Dropdown.RadioGroup of three RadioItems (Passed Products, Failed Products, All Products), each with closeOnClick, its label and count, and a composed Dropdown.RadioItemIndicator (the kit draws it as an empty transparent span, so the chosen row is marked by its raised fill, not a glyph). The app drops the counts and disables the trigger while the design is invalid; the scene shows the enabled state with counts. The scene is shown open and keeps only the filter: the search field, Reset filters button and results count of the toolbar are left out.',
});
