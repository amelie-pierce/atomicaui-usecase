import type { ContextProps } from '../../../../../types';
import { Popover, View } from '../../../../../kit';

// HCS HcsBeamTypeSelect (src/components/HcsBeamTypeSelect.tsx): while the option list is open, a Popover opened to the side of the highlighted option holds the preview Card (title, then the illustration). The list itself is Combobox-002; the Popover is anchored to a stand-in for it.
export default function HcsPreviewScene({ children, host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 18)', inlineSize: 'min(100%, calc(var(--p-px-16) * 28))' }}>
      <Popover open>
        <Popover.Trigger nativeButton={false} render={<View data-ug-part="option-trigger" aui={{ color: 'surface', paint: 'solid', profile: 'default', scale: 'sm', shape: 'soft', sx: { width: '160' } }} />}>Glulam</Popover.Trigger>
        <Popover.Portal container={host}>
          <Popover.Positioner side="right" align="start" sideOffset={8} className="ug-anchored">
            <Popover.Popup data-ug-part="preview-popover" initialFocus={false}>
              {children}
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
