import type { ContextProps } from '../../../../../types';
import { Button, ContainedIcon, Field, Tooltip, View } from '../../../../../kit';

// HS Help (src/hs/InputFields.tsx): the same square Button after the label, but it opens a Tooltip (top, 4px offset, up to 384px) on hover or focus, not a Popover, so there is no close Button.
// Shown open; the scene keeps the one labelled field.
export default function HsFieldHelpScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 10)', inlineSize: 'min(100%, calc(var(--p-px-16) * 18))' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <View data-ug-part="label-row" aui={{ scale: 'sm', profile: 'no-padding', paint: 'text', sx: { display: 'flex', alignItems: 'center' } }}>
          <Field.Label aui={{ scale: 'sm' }}>Material</Field.Label>
          <Tooltip.Provider>
            <Tooltip open>
              <Tooltip.Trigger render={<Button aria-label="Material help" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft' }} />}>
                <ContainedIcon name="circle-question" />
              </Tooltip.Trigger>
              <Tooltip.Portal container={host}>
                <Tooltip.Positioner side="top" sideOffset={4} className="ug-anchored">
                  <Tooltip.Popup aui={{ sx: { maxWidth: '384' } }}>Select the base material of the member.</Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip>
          </Tooltip.Provider>
        </View>
        <Field.Control aui={{ scale: 'sm' }} aria-label="Material" defaultValue="Steel" />
      </Field>
    </View>
  );
}
