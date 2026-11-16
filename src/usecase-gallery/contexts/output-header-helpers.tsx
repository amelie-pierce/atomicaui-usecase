import type { ContextProps } from '../types';
import { Button, IconButton, Popover, Tooltip, Type, View } from '../kit';
import { MockOutputBody } from '../mock-data';

// The Output header with the scroll helpers shown: both appear only past their scroll thresholds (Back to top from 80px of scroll,
// Table Notes while the notes heading is below the pane) and are the first two items of the action group, before Configure columns and
// Print Output. In the app they turn icon-only when the labels do not fit the header row.

export default function OutputHeaderHelpersContext({ children }: ContextProps) {
  return (
    <View
      as="section"
      aria-label="Output"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      style={{ inlineSize: 'min(100%, 720px)' }}
    >
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', minHeight: '28', flex: 'none', paddingBlockStart: '0', paddingBlockEnd: '0' } }}>
        <Type as="h2" role="l3" weight="semi-bold" aui={{ sx: { display: 'flex', alignItems: 'center', minHeight: '28' } }}>Output</Type>
        <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', justifyContent: 'end', flexWrap: 'wrap', gap: '6', minHeight: '28' } }} style={{ marginInlineStart: 'auto' }}>
          {children}
          <Popover>
            <Tooltip.Provider>
              <Tooltip>
                <Tooltip.Trigger
                  render={
                    <Popover.Trigger
                      render={<IconButton name="table-columns" aria-label="Configure columns" aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'contained', shape: 'soft' }} />}
                    />
                  }
                />
                <Tooltip.Portal>
                  <Tooltip.Positioner side="bottom" sideOffset={4}>
                    <Tooltip.Popup aui={{ scale: 'sm' }}>Configure columns</Tooltip.Popup>
                  </Tooltip.Positioner>
                </Tooltip.Portal>
              </Tooltip>
            </Tooltip.Provider>
          </Popover>
          <Button aui={{ scale: 'sm', color: 'surface', paint: 'tonal', sx: { flex: 'none' } }}>
            <Button.Icon name="print" aui={{ scale: 'sm' }} />
            Print Output
          </Button>
        </View>
      </View>
      <MockOutputBody />
    </View>
  );
}
