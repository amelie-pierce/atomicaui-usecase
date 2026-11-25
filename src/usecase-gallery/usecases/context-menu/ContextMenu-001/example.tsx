import { useRef } from 'react';
import { ContextMenu, Tabs, View } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  const rail = useRef<HTMLDivElement>(null);
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 14)', inlineSize: 'min(100%, 480px)' }}>
      <div ref={rail} style={{ inlineSize: 'fit-content' }}>
        <Tabs defaultValue="d1" aui={{ profile: 'no-padding' }}>
          <Tabs.List>
            <ContextMenu open>
              <Tabs.Tab
                value="d1"
                nativeButton={false}
                render={<ContextMenu.Trigger render={<div />} />}
                aui={{ color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'raised', paint: 'tonal' } } }}
              >
                Design 1
              </Tabs.Tab>
              <ContextMenu.Portal container={host}>
                <ContextMenu.Positioner anchor={rail} align="start" sideOffset={4} className="ug-anchored">
                  <ContextMenu.Popup aria-label="Tab options">
                    <ContextMenu.Item data-ug-part="close-action">
                      <ContextMenu.Icon name="xmark" />
                      Close
                    </ContextMenu.Item>
                    <ContextMenu.Item data-ug-part="close-others-action">
                      <ContextMenu.Icon name="ban" />
                      Close all other designs
                    </ContextMenu.Item>
                    <ContextMenu.Separator />
                    <ContextMenu.Item data-ug-part="rename-action">
                      <ContextMenu.Icon name="pen" />
                      Rename
                    </ContextMenu.Item>
                    <ContextMenu.Item data-ug-part="duplicate-action">
                      <ContextMenu.Icon name="copy" />
                      Duplicate
                    </ContextMenu.Item>
                    <ContextMenu.Item data-ug-part="move-to-top-action">
                      <ContextMenu.Icon name="arrow-up" />
                      Move to top
                    </ContextMenu.Item>
                  </ContextMenu.Popup>
                </ContextMenu.Positioner>
              </ContextMenu.Portal>
            </ContextMenu>
          </Tabs.List>
        </Tabs>
      </div>
    </View>
  );
}
