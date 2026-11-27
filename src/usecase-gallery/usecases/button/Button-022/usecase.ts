import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'width-field', name: 'Width field', selector: '[data-aui-popup-motion][role="dialog"] [class~="aui-field"]', description: 'The labelled Width number field (12 with an in unit) at the start of the popup, which Cancel and Save commit or discard.' },
];

export default defineUsecase({
  uiType: 'Button group',
  title: 'Save edited value buttons',

  apps: ['adc'],
options: [
    { id: "adc-edit-value", contextAnatomy: CONTEXT_ANATOMY, name: "Edit value", apps: ["adc"], source: {"adc":"src/adc/components/InPlaceEditor.tsx"} ,
     contextAnatomyOverrides: [{"id":"width-field","lesson":{"explanation":"Width field starts at 12 inches beside the actions.","scope":"context"}}]},
  ],
  source: { adc: 'src/adc/components/InPlaceEditor.tsx' },
  summary: 'A filled Cancel and a solid secondary Save close the in-place editor popover of a value chip.',
  where: 'The in-place editor popover opened from a value chip: a row with a number Field, then Cancel and Save. Real site source: ADC src/adc/components/InPlaceEditor.tsx. No other app has this popover.',
  when: 'Use it for the commit of a small in-place edit; ADC fills the popover Cancel like a dialog Cancel (the unfilled text Cancel of Button-021 is for column configuration).',
  how: 'Cancel sets color "surface-alt" and paint "solid", Save color "secondary" and paint "solid", both scale "sm" with a soft shape and a 4px gap; there is no reset icon. '
    + 'The popup opens to the right of the value chip (surface solid xs, compact; right, center, 8px offset). The chip stands alone here instead of floating over the 3D model. One group, ADC only.',
  anatomy: [
    { id: 'chip', name: 'Value chip', selector: '[data-base-ui-click-trigger]', description: 'The 12 in value chip (aria-label "Edit Width, 12 in") that opens the editor popover; it stands alone here rather than floating over the 3D model.' , lesson: {"explanation":"12 in value chip opens its width editor."}},
    { id: 'popup', name: 'Editor popup', selector: '[data-aui-popup-motion][role="dialog"]', description: 'The surface (solid, sm, soft, elevation 4) opened 8px to the right of the chip, holding the Width number field and the Cancel and Save buttons in one row.' , lesson: {"explanation":"Soft popup sits 8px beside the chip with field and actions.","code":["Popover.Popup"]}},
    { id: 'actions', name: 'Button row', selector: '[data-ug-part="edit-actions"]', description: 'The row at the end of the popup that keeps Cancel and Save together with a 4px gap and no growth, so the Width field takes the remaining width.' , lesson: {"explanation":"End row keeps Cancel and Save together without taking field width."}},
    { id: 'cancel', name: 'Cancel', selector: '[class~="aui-button"]:not([aria-label]):first-of-type', description: 'The filled gray surface-alt Cancel that abandons the edit; ADC fills it like a dialog Cancel.' , lesson: {"explanation":"Filled gray Cancel discards the pending Width change."}},
    { id: 'save', name: 'Save', selector: '[class~="aui-button"]:not([aria-label]):last-of-type', description: 'The solid secondary Save that commits the new Width value; it follows Cancel and is the only emphasised action.' , lesson: {"explanation":"Solid secondary Save commits the new Width value."}},
  ],
});
