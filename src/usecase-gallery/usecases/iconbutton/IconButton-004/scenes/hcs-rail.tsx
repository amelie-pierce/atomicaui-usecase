import { Panels, Tooltip, Type, View } from '../../../../kit';

// The collapsed Input panel as HcsSplitLayout.tsx builds it: a Panels group whose Input panel is collapsible and rests at its 40px
// collapsedSize. The rail is a transparent column that fills the panel height (`.hcs-input-rail`, height 100%) with the 28px square
// Panels.Trigger (a kit trigger that renders the IconButton, with its tooltip) at the top centre; the Input pane itself is a Panels.Content the collapse hides. The viewer
// pane beside it keeps the rest of the width, reduced to its title (no canvas). The splitter is not draggable in the scene.
export default function HcsRailScene() {
  return (
    <div style={{ inlineSize: 'min(100%, 560px)', blockSize: 160 }}>
      <Panels orientation="horizontal" className="ug-split" aui={{ scale: 'sm' }}>
        <Panels.Panel
          id="hcs-input"
          collapsible
          collapsedSize="40px"
          defaultSize="40px"
          minSize="400px"
          className="ug-split__panel"
          aui={{ profile: 'block-padding', scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
        >
          <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'none' } }} style={{ height: '100%', boxSizing: 'border-box' }}>
            <Tooltip.Provider>
              <Tooltip>
                <Tooltip.Trigger
                  render={
                    <Panels.Trigger
                      targetId="hcs-input"
                      name="angle-right"
                      aria-label="Expand Input"
                      aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'square', shape: 'soft' }}
                    />
                  }
                />
                <Tooltip.Portal>
                  <Tooltip.Positioner side="bottom" sideOffset={4}>
                    <Tooltip.Popup aui={{ scale: 'sm' }}>Expand Input</Tooltip.Popup>
                  </Tooltip.Positioner>
                </Tooltip.Portal>
              </Tooltip>
            </Tooltip.Provider>
          </View>
          <Panels.Content
            aui={{ paint: 'text', profile: 'no-padding', sx: { position: 'relative', display: 'flex', flexDirection: 'column', flex: 'fill', overflow: 'hidden', minWidth: '0', minHeight: '0' } }}
          >
            <Type as="h2" role="l3" weight="semi-bold">Input</Type>
          </Panels.Content>
        </Panels.Panel>
        <Panels.ResizeHandle aria-label="Resize Input and 3D Viewer panels" color="primary" width="8px" />
        <Panels.Panel id="hcs-viewer" minSize="200px" className="ug-split__panel" aui={{ scale: 'sm' }}>
          <View
            as="section"
            aria-label="3D Viewer"
            aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0', height: 'fill' } }}
          >
            <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', height: '28', flex: 'none' } }}>
              <Type as="h2" role="l3" weight="semi-bold">3D Viewer</Type>
            </View>
          </View>
        </Panels.Panel>
      </Panels>
    </div>
  );
}
