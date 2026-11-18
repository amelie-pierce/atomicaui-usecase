import { useRef } from 'react';
import type { ContextProps } from '../../../../types';
import { ContextMenu, Tabs, View } from '../../../../kit';

// ADC design tab rail (src/adc/Workspace.tsx): every visible design tab is the right-click area of a ContextMenu (Tabs.Tab rendered through ContextMenu.Trigger); the popup is "Tab options".
// Built open and non-modal (container={host}, positioner ug-anchored); the app's menu opens at the pointer, the scene anchors it under the tab (a pointer-less scene has no cursor to open at). The chip look is CHIP_AUI of src/adc/ui.ts.
// The app disables Close and Close all other designs when only one design is open, and every row while a report is running; the scene shows them enabled.
// Drag reorder, double-click rename, the close button, the error dot and the other tabs are left out; one tab stands for the rail.

const CHIP_AUI = { color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'raised', paint: 'tonal' } } } as const;

export default function AdcTabOptionsScene({ host }: ContextProps) {
  const rail = useRef<HTMLDivElement>(null);
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 14)', inlineSize: 'min(100%, 480px)' }}>
      <div ref={rail} style={{ inlineSize: 'fit-content' }}>
        <Tabs defaultValue="d1" aui={{ profile: 'no-padding' }}>
          <Tabs.List>
            <ContextMenu open>
              <Tabs.Tab value="d1" nativeButton={false} render={<ContextMenu.Trigger render={<div />} />} aui={CHIP_AUI}>
                Design 1
              </Tabs.Tab>
              <ContextMenu.Portal container={host}>
                <ContextMenu.Positioner anchor={rail} align="start" sideOffset={4} className="ug-anchored">
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
      </div>
    </View>
  );
}
