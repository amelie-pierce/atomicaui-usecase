import { MockViewerCanvas } from '../../../../../mock-data';
import type { ContextProps } from '../../../../../types';
import { Radio, RadioGroup, Type, View } from '../../../../../kit';

// The viewer controls of HCS (src/App.tsx, the f02-controls column), FD (src/components/Viewer.jsx, the viewer-controls cluster): the projection group on its own, in the column the controls stack in.
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
