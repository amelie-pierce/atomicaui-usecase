import type { ContextProps } from '../../../../types';
import { IconButton, Popover, View } from '../../../../kit';

export default function HcsLabelledScene({ children, host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', justifyContent: 'end' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Popover open>
        <Popover.Trigger render={<IconButton name="table-columns" aria-label="Configure columns" aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'contained', shape: 'soft' }} />} />
        <Popover.Portal container={host}>
          <Popover.Positioner side="bottom" align="end" style={{ paddingBlock: 'var(--p-px-4)' }} className="ug-anchored">
            <Popover.Popup initialFocus={false} aria-label="Configure columns" render={<View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '8', width: '320' } }} />}>
              {children}
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
