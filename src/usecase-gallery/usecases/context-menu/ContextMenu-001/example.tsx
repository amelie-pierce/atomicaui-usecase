import { ContextMenu, Tabs } from '../../../kit';

export default function Example() {
  return (
    <Tabs defaultValue="d1" aui={{ profile: 'no-padding' }}>
      <Tabs.List>
        <ContextMenu>
          <Tabs.Tab
            value="d1"
            nativeButton={false}
            render={<ContextMenu.Trigger render={<div />} />}
            aui={{ color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'raised', paint: 'tonal' } } }}
          >
            Design 1
          </Tabs.Tab>
          <ContextMenu.Portal>
            <ContextMenu.Positioner>
              <ContextMenu.Popup aria-label="Tab options">
                <ContextMenu.Item>
                  <ContextMenu.Icon name="xmark" />
                  Close
                </ContextMenu.Item>
                <ContextMenu.Item>
                  <ContextMenu.Icon name="ban" />
                  Close all other designs
                </ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item>
                  <ContextMenu.Icon name="pen" />
                  Rename
                </ContextMenu.Item>
                <ContextMenu.Item>
                  <ContextMenu.Icon name="copy" />
                  Duplicate
                </ContextMenu.Item>
                <ContextMenu.Item>
                  <ContextMenu.Icon name="arrow-up" />
                  Move to top
                </ContextMenu.Item>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        </ContextMenu>
      </Tabs.List>
    </Tabs>
  );
}
