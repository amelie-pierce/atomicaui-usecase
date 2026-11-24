import { IconButton, Popover, Radio, RadioGroup, View } from '../../../../../kit';
import { useStageHost } from '../../../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', justifyContent: 'end' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Popover open>
        <Popover.Trigger render={<IconButton name="ellipsis-vertical" aria-label="Column options" aui={{ color: 'surface', paint: 'text', profile: 'square-compact', shape: 'soft', scale: 'xs' }} />} />
        <Popover.Portal container={host}>
          <Popover.Positioner side="bottom" align="end" sideOffset={4} className="ug-anchored">
            <Popover.Popup
              initialFocus={false}
              aria-label="Column options"
              render={<View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', minHeight: '0', minWidth: '0', gap: '12', width: '256' } }} />}
            >
              <RadioGroup defaultValue="asc">
                <RadioGroup.Label>Sort</RadioGroup.Label>
                <Radio value="asc" aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}><Radio.Label>Sort A to Z</Radio.Label></Radio>
                <Radio value="desc" aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}><Radio.Label>Sort Z to A</Radio.Label></Radio>
              </RadioGroup>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
