import type { ContextProps } from '../types';
import { Accordion, IconButton, Panels, Tooltip, Type, View } from '../kit';
import { MockInputGalvanized, MockInputSection } from '../mock-data';

// The Input pane as App.tsx composes it when stacked: pane frame, the 28px header (collapse chevron with its tooltip, the semi-bold title, a
// Panels.Spacer, then Collapse all), and under it a vertical scroll area holding one surface card of flush accordion sections (Connection
// Type, Load Properties, Beam Properties, all open as the app starts) and the Galvanized card. The scroll area has a fixed height here.
export default function PanelContext({ children }: ContextProps) {
  return (
    <View
      as="aside"
      aria-label="Input"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0', gap: '0' } }}
      style={{ inlineSize: 'min(100%, 420px)', blockSize: 480 }}
    >
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', height: '28', flex: 'none' } }}>
        <Tooltip.Provider>
          <Tooltip>
            <Tooltip.Trigger
              render={<IconButton name="angle-left" aria-label="Collapse Input" aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'contained', shape: 'soft' }} />}
            />
            <Tooltip.Portal>
              <Tooltip.Positioner side="bottom" sideOffset={4}>
                <Tooltip.Popup aui={{ scale: 'sm' }}>Collapse Input</Tooltip.Popup>
              </Tooltip.Positioner>
            </Tooltip.Portal>
          </Tooltip>
        </Tooltip.Provider>
        <Type as="h2" role="l3" weight="semi-bold">Input</Type>
        <Panels.Spacer />
        {children}
      </View>
      <View.ScrollArea scrollAxis="vertical" scrollbarSize={8} aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flex: 'fill', width: 'fill', minHeight: '0' } }}>
        <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', overflow: 'hidden', gap: '0' } }}>
          <Accordion openMultiple defaultValue={['Connection Type', 'Load Properties', 'Beam Properties']} aui={{ scale: 'sm' }}>
            <MockInputSection name="Connection Type" />
            <MockInputSection name="Load Properties" divider />
            <MockInputSection name="Beam Properties" divider />
            <MockInputGalvanized />
          </Accordion>
        </View>
      </View.ScrollArea>
    </View>
  );
}
