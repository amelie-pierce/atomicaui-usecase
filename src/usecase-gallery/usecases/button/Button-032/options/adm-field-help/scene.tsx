import type { ContextProps } from '../../../../../types';
import { Button, ContainedIcon, Field, Tooltip, View } from '../../../../../kit';

// ADM AdmHelpTooltip (src/shared/lib/tooltip/AdmHelpTooltip.tsx): the same square Button after the label, opening a Tooltip above it (top, 8px offset) painted solid secondary at scale sm, up to 256px.
// Shown open; the scene keeps the one labelled field.
export default function AdmFieldHelpScene({ host }: ContextProps) {
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
                <Tooltip.Positioner side="top" sideOffset={8} className="ug-anchored">
                  <Tooltip.Popup aui={{ paint: 'solid', color: 'secondary', scale: 'sm', sx: { maxWidth: '256' } }}>Select the base material of the member.</Tooltip.Popup>
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
