import type { ContextProps } from '../../../../types';
import { Button, ContainedIcon, Field, Popover, View } from '../../../../kit';

// PFD Help (src/pfd/fields.tsx; AGPD writes the same trigger in src/agpd/inputs.tsx): after the label text in the Field.Label row comes a Button (not an IconButton) at profile "square", 28px, not "contained".
// It opens a popover; its close is Button-031. The scene keeps the one labelled field.
export default function PfdFieldHelpScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 10)', inlineSize: 'min(100%, calc(var(--p-px-16) * 18))' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text', sx: { display: 'flex', alignItems: 'center' } }}>
          <Field.Label aui={{ scale: 'sm' }}>Material</Field.Label>
          <Popover>
            <Popover.Trigger render={<Button aria-label="Material help" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft' }} />}>
              <ContainedIcon name="circle-question" />
            </Popover.Trigger>
            <Popover.Portal container={host}>
              <Popover.Positioner side="top" sideOffset={4} className="ug-anchored">
                <Popover.Popup aria-label="Material help" render={<View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { maxWidth: '384' } }} />}>
                  Select the base material of the member.
                </Popover.Popup>
              </Popover.Positioner>
            </Popover.Portal>
          </Popover>
        </View>
        <Field.Control aui={{ scale: 'sm' }} aria-label="Material" defaultValue="Steel" />
      </Field>
    </View>
  );
}
