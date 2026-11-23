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
  anatomy: [
    { id: 'chip', name: 'Value chip', token: 'Popover.Trigger', selector: '[data-base-ui-click-trigger]', description: 'The 12 in value chip (aria-label "Edit Width, 12 in") that opens the editor popover; it stands alone here rather than floating over the 3D model.',
      code: `<Popover.Trigger render={<Button aria-label="Edit Width, 12 in" aui={{ color: 'surface', paint: 'solid', scale: 'xs', shape: 'soft', profile: 'compact' }} />}>
  12 in
</Popover.Trigger>` },
    { id: 'popup', name: 'Editor popup', token: 'Popover.Popup', selector: '[data-aui-popup-motion][role="dialog"]', description: 'The surface (solid, sm, soft, elevation 4) opened 8px to the right of the chip, holding the Width number field and the Cancel and Save buttons in one row.',
      code: `<Popover.Positioner side="right" align="center" sideOffset={8} className="ug-anchored">
  <Popover.Popup initialFocus={false} aria-label="Edit Width" render={<View as="section" aui={{ … }} />}>
    …
  </Popover.Popup>
</Popover.Positioner>` },
    { id: 'actions', name: 'Button row', token: 'View', selector: '[data-ug-part="edit-actions"]', description: 'The row at the end of the popup that keeps Cancel and Save together with a 4px gap and no growth, so the Width field takes the remaining width.',
      code: `<View data-ug-part="edit-actions" aui={{ paint: 'text', profile: 'no-padding', scale: 'sm', sx: { display: 'flex', gap: '4', alignItems: 'center', flex: 'none' } }}>
  …
</View>` },
    { id: 'cancel', name: 'Cancel', token: 'Button', selector: '[class~="aui-button"]:not([aria-label]):first-of-type', description: 'The filled gray surface-alt Cancel that abandons the edit; ADC fills it like a dialog Cancel.',
      code: `<Button aui={{ color: 'surface-alt', paint: 'solid', scale: 'sm', shape: 'soft' }}>Cancel</Button>` },
    { id: 'save', name: 'Save', token: 'Button', selector: '[class~="aui-button"]:not([aria-label]):last-of-type', description: 'The solid secondary Save that commits the new Width value; it follows Cancel and is the only emphasised action.',
      code: `<Button aui={{ color: 'secondary', paint: 'solid', scale: 'sm', shape: 'soft' }}>Save</Button>` },
  ],
});
