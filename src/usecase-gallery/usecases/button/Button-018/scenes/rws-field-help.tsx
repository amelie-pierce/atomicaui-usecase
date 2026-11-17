import type { ContextProps } from '../../../../types';
import { Button, ContainedIcon, Field, Popover, View } from '../../../../kit';

// RWS Help (src/rws/inputs.tsx): a Button at profile "square" pinned to 20px by sx, so the label row keeps the 20px of a plain label. It opens a 320px popover; its close is Button-003.
export default function RwsFieldHelpScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 10)', inlineSize: 'min(100%, calc(var(--p-px-16) * 18))' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text', sx: { display: 'flex', alignItems: 'center' } }}>
          <Field.Label aui={{ scale: 'sm' }}>Material</Field.Label>
          <Popover>
            <Popover.Trigger render={<Button aria-label="Material help" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft', sx: { width: '20', height: '20', minWidth: '20', minHeight: '20' } }} />}>
              <ContainedIcon name="circle-question" />
            </Popover.Trigger>
            <Popover.Portal container={host}>
              <Popover.Positioner side="top" sideOffset={4} className="ug-anchored">
                <Popover.Popup aria-label="Material help" render={<View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { width: '320' } }} />}>
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
