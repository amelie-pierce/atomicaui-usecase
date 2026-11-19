import { Panels, Tooltip, Type, View } from '../../../../kit';

// The Grid (engineering) layout of HcsSplitLayout.tsx with the Input panel collapsed: a vertical Panels group whose Input panel is collapsible and
// rests at its 40px collapsedSize. The rail is a transparent row that holds the 28px square Panels.Trigger (angle-down, with its tooltip) at the
// start corner, 4px in from the start edge (paddingInlineStart "4"); the Input content is a Panels.Content the collapse hides. The results panel
// below keeps the rest of the height, reduced to its title. The 200px minimum size, the splitter drag and the contents are left out.
export default function HcsTopRailScene() {
  return (
    <div style={{ inlineSize: 'min(100%, 560px)', blockSize: 200 }}>
      <Panels orientation="vertical" className="ug-split" aui={{ scale: 'sm' }}>
        <Panels.Panel
          id="hcs-input"
          collapsible
          collapsedSize="40px"
          defaultSize="40px"
          minSize="40px"
          className="ug-split__panel"
          aui={{ profile: 'block-padding', scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
        >
          <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'row', alignItems: 'start', flex: 'none', paddingInlineStart: '4' } }}>
            <Tooltip.Provider>
              <Tooltip>
                <Tooltip.Trigger
                  render={
                    <Panels.Trigger
                      targetId="hcs-input"
                      name="angle-down"
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
        <Panels.ResizeHandle aria-label="Resize Input and results panels" color="primary" width="6px" />
        <Panels.Panel
          id="hcs-results"
          minSize="40px"
          className="ug-split__panel"
          aui={{ profile: 'block-padding', scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
        >
          <Type as="h2" role="l3" weight="semi-bold">Output</Type>
        </Panels.Panel>
      </Panels>
    </div>
  );
}
