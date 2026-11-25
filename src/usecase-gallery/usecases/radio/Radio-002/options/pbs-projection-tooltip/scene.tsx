import { MockViewerCanvas } from '../../../../../mock-data';
import type { ContextProps } from '../../../../../types';
import { Radio, RadioGroup, Tooltip, Type, View } from '../../../../../kit';

// The view mode radios of the PBS viewer (src/Viewer.tsx): a row RadioGroup (gap 8) whose radios are each wrapped in a Tooltip trigger (a span, closeOnClick off), top, 4px offset.
// Shown with the Perspective tooltip open; left out: the Reset View button, the Object Visibility checkboxes; the app shows the group enabled.
export default function PbsProjectionScene({ host }: ContextProps) {
  return (
    <View data-ug-part="viewer-pane" as="section" aria-label="3D Viewer" aui={{ color: 'surface-alt', paint: 'fixed', shape: 'soft', profile: 'default' }}>
      <Type data-ug-part="viewer-title" as="h2" role="l3" weight="semi-bold">3D Viewer</Type>
      <View aui={{ color: 'surface', shape: 'soft', profile: 'no-padding' }}>
        <div data-ug-part="viewer-stage" className="ug-scene">
          <MockViewerCanvas />
          <div data-ug-part="viewer-controls" className="ug-scene__controls">
            <View aui={{ paint: 'text', profile: 'no-padding' }}>
              <RadioGroup defaultValue="perspective" aria-label="View mode" aui={{ scale: 'sm', profile: 'no-padding', sx: { flexDirection: 'row', gap: '8' } }}>
                <Tooltip.Provider>
                  <Tooltip open>
                    <Tooltip.Trigger closeOnClick={false} render={<span />}>
                      <Radio value="perspective" aui={{ scale: 'sm', states: { unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } }, selected: { paint: 'solid', color: 'primary' } } }}>
                        <Radio.Label>Perspective</Radio.Label>
                      </Radio>
                    </Tooltip.Trigger>
                    <Tooltip.Portal container={host}>
                      <Tooltip.Positioner side="top" sideOffset={4} className="ug-anchored">
                        <Tooltip.Popup data-ug-part="radio-tooltip">Realistic 3D view with depth and perspective.</Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip>
                  <Tooltip>
                    <Tooltip.Trigger closeOnClick={false} render={<span />}>
                      <Radio value="ortho" aui={{ scale: 'sm', states: { unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } }, selected: { paint: 'solid', color: 'primary' } } }}>
                        <Radio.Label>Orthographic</Radio.Label>
                      </Radio>
                    </Tooltip.Trigger>
                    <Tooltip.Portal container={host}>
                      <Tooltip.Positioner side="top" sideOffset={4} className="ug-anchored">
                        <Tooltip.Popup>True-scale view with no perspective distortion.</Tooltip.Popup>
                      </Tooltip.Positioner>
                    </Tooltip.Portal>
                  </Tooltip>
                </Tooltip.Provider>
              </RadioGroup>
            </View>
          </div>
        </div>
      </View>
    </View>
  );
}
