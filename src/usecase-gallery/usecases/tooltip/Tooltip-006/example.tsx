import { Radio, RadioGroup, Tooltip } from '../../../kit';

export default function Example() {
  return (
    <Tooltip.Provider>
      <RadioGroup aria-label="Camera projection" defaultValue="perspective" aui={{ scale: 'sm', profile: 'no-padding' }}>
        <Tooltip>
          <Tooltip.Trigger closeOnClick={false} render={<span />}>
            <Radio value="perspective" aui={{ scale: 'sm' }}>
              <Radio.Label>Perspective</Radio.Label>
            </Radio>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner side="top" sideOffset={4}>
              <Tooltip.Popup>Show the model in perspective</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip>
      </RadioGroup>
    </Tooltip.Provider>
  );
}
