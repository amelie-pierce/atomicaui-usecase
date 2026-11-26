import { useStageHost } from '../../../../../hooks/use-stage-host';
import { Button, ContainedIcon, IconButton, Popover, Type, View } from '../../../../../kit';

export default function Example() {
  const host = useStageHost();
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'end' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 14)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Popover open>
        <Popover.Trigger
          render={<Button aria-label="Material help" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft' }} />}
        >
          <ContainedIcon name="circle-question" />
        </Popover.Trigger>
        <Popover.Portal container={host}>
          <Popover.Positioner side="top" sideOffset={4} className="ug-anchored">
            <Popover.Popup
              initialFocus={false}
              aria-label="Material help"
              render={
                <View
                  aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '8', width: '320' } }}
                />
              }
            >
              <View data-ug-part="close-row" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', justifyContent: 'end' } }}>
                <IconButton data-ug-part="close" name="xmark" aria-label="Close" aui={{ scale: 'xs' }} />
              </View>
              <Type data-ug-part="help-text" as="div" role="p3">Select the base material of the member.</Type>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
