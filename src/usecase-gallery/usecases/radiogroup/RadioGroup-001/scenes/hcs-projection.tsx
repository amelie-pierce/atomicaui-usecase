import { MockViewerCanvas } from '../../../../mock-data';
import type { ContextProps } from '../../../../types';
import { Radio, RadioGroup, Type, View } from '../../../../kit';

// The viewer controls of HCS (src/App.tsx, the f02-controls column), FD (src/components/Viewer.jsx, the viewer-controls cluster) and ADC (src/adc/components/ConnectionModel.tsx): the projection group on its own, in the column the controls stack in.
// ADC writes the group at scale "xs" with the tonal outlined selection look; it renders the same radios at a smaller size (14px/500 text, 20px dot, 4px gap instead of 16px/400, 22px, 8px), so it is in this group and the standard is the HCS and FD size.
// Left out: the Reset view button, the Object Visibility checkboxes; the apps show the group enabled.
export default function HcsProjectionScene(_: ContextProps) {
  return (
    <View as="section" aria-label="3D Viewer" aui={{ color: 'surface-alt', paint: 'fixed', shape: 'soft', profile: 'default' }}>
      <Type as="h2" role="l3" weight="semi-bold">3D Viewer</Type>
      <View aui={{ color: 'surface', shape: 'soft', profile: 'no-padding' }}>
        <div className="ug-scene">
          <MockViewerCanvas />
          <div className="ug-scene__controls">
            <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '4' } }}>
              <RadioGroup aria-label="Camera projection" defaultValue="perspective" aui={{ scale: 'sm', profile: 'no-padding' }}>
                <Radio value="perspective" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'solid', sx: { borderWidth: '1', borderStyle: 'solid', borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
                  <Radio.Label>Perspective</Radio.Label>
                </Radio>
                <Radio value="orthographic" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'solid', sx: { borderWidth: '1', borderStyle: 'solid', borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
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
