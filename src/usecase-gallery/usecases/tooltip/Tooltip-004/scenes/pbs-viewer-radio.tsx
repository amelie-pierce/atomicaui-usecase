import type { ContextProps } from '../../../../types';
import { Radio, RadioGroup, Tooltip, View } from '../../../../kit';

// PBS Viewer (src/Viewer.tsx, the `tooltip` helper at line 373) and RWS Viewer (src/rws/Viewer.tsx line 461): the viewer's view or member radio is the trigger, wrapped in a span (`render={<span />}`, closeOnClick off so a
// keyboard check does not close it); the popup is the kit default (surface, scale sm) and opens above (top, 4px offset) with a one-line note.
// Shown open; the scene keeps one radio of the group.
export default function PbsViewerRadioScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 8)', paddingBlockStart: 'calc(var(--p-px-16) * 4)' }}>
      <RadioGroup aria-label="Camera projection" defaultValue="perspective" aui={{ scale: 'sm', profile: 'no-padding' }}>
        <Tooltip open>
          <Tooltip.Trigger closeOnClick={false} render={<span />}>
            <Radio value="perspective" aui={{ scale: 'sm' }}>
              <Radio.Label>Perspective</Radio.Label>
            </Radio>
          </Tooltip.Trigger>
          <Tooltip.Portal container={host}>
            <Tooltip.Positioner side="top" sideOffset={4} className="ug-anchored">
              <Tooltip.Popup>Show the model in perspective</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip>
      </RadioGroup>
    </View>
  );
}
