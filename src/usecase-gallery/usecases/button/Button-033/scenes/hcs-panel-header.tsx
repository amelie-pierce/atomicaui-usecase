import type { ContextProps } from '../../../../types';
import { Accordion, IconButton, Panels, Tooltip, Type, View } from '../../../../kit';

// The Input pane cut to its header and two sections, as App.tsx composes it when stacked: pane frame, the 28px header (collapse chevron with
// its tooltip, the semi-bold title, a Panels.Spacer, then Collapse all) and a surface card of flush accordion sections, both open and empty.
export default function HcsPanelHeaderScene({ children }: ContextProps) {
  return (
    <View
      as="aside"
      aria-label="Input"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0', gap: '0' } }}
      style={{ inlineSize: 'min(100%, 360px)', blockSize: 200 }}
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
      <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', gap: '0' } }}>
        <Accordion openMultiple aui={{ scale: 'sm' }}>
          {[['Connection Type', 'link'], ['Load Properties', 'arrow-down']].map(([name, icon], i) => (
            <Accordion.Item key={name} value={name} aui={{ color: 'surface', scale: 'sm', shape: 'none', sx: i ? { borderColor: 'outlined', borderStyle: 'solid', borderBlockStartWidth: '1' } : undefined }}>
              <Accordion.Header>
                <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                  <Accordion.Icon name={icon} weight="regular" aria-hidden />
                  <Type role="l4" weight="semi-bold">{name}</Type>
                  <Accordion.Chevron />
                </Accordion.Trigger>
              </Accordion.Header>
            </Accordion.Item>
          ))}
        </Accordion>
      </View>
    </View>
  );
}
