import type { ContextProps } from '../../../../types';
import { IconButton, Popover, Tooltip, Type, View } from '../../../../kit';
import { MockOutputBody } from '../../../../mock-data';

// Print Output enabled, as the HCS Output pane composes it: pane frame, wrapping header (title, then the action group pushed to the
// end by the app's `.hcs-output-actions` margin, here an inline one), Configure columns while the results are valid, Print Output last,
// then the toolbar, results table and Table Notes. The scroll helpers appear only once the results are scrolled (Button-010).

export default function EnabledScene({ children }: ContextProps) {
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
          {children}
        </View>
      </View>
      <MockOutputBody />
    </View>
  );
}
