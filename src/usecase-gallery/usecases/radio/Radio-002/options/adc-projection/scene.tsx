import { MockViewerCanvas } from '../../../../../mock-data';
import type { ContextProps } from '../../../../../types';
import { Radio, RadioGroup, Type, View } from '../../../../../kit';

// The ADC viewer radios (src/adc/components/ConnectionModel.tsx): scale "xs", 4 gap, tonal outlined selection look.
export default function AdcProjectionScene(_: ContextProps) {
  return (
    <View as="section" aria-label="3D Viewer" aui={{ color: 'surface-alt', paint: 'fixed', shape: 'soft', profile: 'default' }}>
      <Type as="h2" role="l3" weight="semi-bold">3D Viewer</Type>
      <View aui={{ color: 'surface', shape: 'soft', profile: 'no-padding' }}>
        <div className="ug-scene">
          <MockViewerCanvas />
          <div className="ug-scene__controls">
            <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '4' } }}>
              <RadioGroup aria-label="Camera projection" defaultValue="perspective" aui={{ scale: 'xs', profile: 'no-padding', sx: { gap: '4' } }}>
                <Radio value="perspective" aui={{ scale: 'xs', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
                  <Radio.Label>Perspective</Radio.Label>
                </Radio>
                <Radio value="orthographic" aui={{ scale: 'xs', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
                  <Radio.Label>Orthographic</Radio.Label>
                </Radio>
              </RadioGroup>
            </View>
          </div>
        </div>
      </View>
    </View>
  );
}
