import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Button group',
  title: 'Save edited value buttons',
  look: 'Text and primary',
  apps: ['adc'],
  cases: [
    { id: 'adc-edit-value', name: 'Edit value', apps: ['adc'], source: { adc: 'src/adc/components/InPlaceEditor.tsx' } },
  ],
  source: { adc: 'src/adc/components/InPlaceEditor.tsx' },
  summary: 'A filled Cancel and a solid secondary Save close the in-place editor popover of a value chip.',
  where: 'The in-place editor popover opened from a value chip: a row with a number Field, then Cancel and Save. Real site source: ADC src/adc/components/InPlaceEditor.tsx. No other app has this popover.',
  when: 'Use it for the commit of a small in-place edit; ADC fills the popover Cancel like a dialog Cancel (the unfilled text Cancel of Button-021 is for column configuration).',
  how: 'Cancel sets color "surface-alt" and paint "solid", Save color "secondary" and paint "solid", both scale "sm" with a soft shape and a 4px gap; there is no reset icon. '
    + 'The popup opens to the right of the value chip (surface solid xs, compact; right, center, 8px offset). The chip stands alone here instead of floating over the 3D model. One group, ADC only.',
});
