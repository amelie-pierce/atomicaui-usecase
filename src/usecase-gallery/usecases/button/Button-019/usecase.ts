import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Button group',
  title: 'Text and primary',
  apps: ['hcs', 'hs', 'adc'],
  cases: [
    { id: 'hcs-configure-columns', name: 'Configure columns', apps: ['hcs'], source: { hcs: 'src/components/ColumnVisibility.tsx' } },
    { id: 'hs-configure-columns', name: 'Configure columns', apps: ['hs'], source: { hs: 'src/hs/ColumnVisibility.tsx' } },
    { id: 'adc-edit-value', name: 'Edit value', apps: ['adc'], source: { adc: 'src/adc/components/InPlaceEditor.tsx' } },
  ],
  source: { hcs: 'src/components/ColumnVisibility.tsx', hs: 'src/hs/ColumnVisibility.tsx', adc: 'src/adc/components/InPlaceEditor.tsx' },
  summary: 'A Cancel and a solid secondary Save close a popover, with an icon-only reset beside them in the column configurator.',
  where: 'The footer of a popover form. Configure columns (HCS, HS): a reset icon at the start, then Cancel and Save. Edit value (ADC): the in-place editor popover opened from a value chip, Cancel and Save only. Dialogs use a gray solid Cancel instead (Button-018).',
  when: 'Use it when the popover is lightweight and the Cancel should not compete with Save. Prefer the filled Cancel of Button-018 in dialogs; ADC fills its popover Cancel the same way.',
  how: 'Configure columns, HCS: Cancel sets aui paint "text" (default color, no fill, default scale); Save sets scale "sm", color "secondary" and paint "solid". Cancel and Save sit in their own row View so the footer row can use justifyContent "between": reset icon at the start, the pair at the end. The reset is an IconButton with the rotate-left glyph, aui paint "text", and needs an aria-label. In context the popover is opened under the table-columns IconButton (contained profile) at the end of the Output header (bottom, end, 4px offset): a reorderable List of three Output columns (Model locked and always on, a switch and a drag handle on each row, an arrow-up beside Load for the sort), then this footer; the search field, the other six columns and Group by model are left out. HS (own group): the same footer, but Save has no scale (default size) and the table-columns trigger has no contained profile. Edit value, ADC: the popup opens to the right of the value chip (surface solid xs, compact; right, center, 8px offset) as a row with a number Field, then Cancel (color "surface-alt", paint "solid") and Save (color "secondary", paint "solid"), both scale "sm" with a soft shape and a 4px gap; there is no reset icon. The chip stands alone here instead of floating over the 3D model.',
});
