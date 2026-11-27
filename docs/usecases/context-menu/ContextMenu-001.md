# ContextMenu-001: Tab context menu

Component family: **Context menu**

UI type: **Context menu**

Source: `src/usecase-gallery/usecases/context-menu/ContextMenu-001/usecase.ts`

## What it is

A right-click on a tab opens a menu of actions for that tab: close, close the others, rename, duplicate and move.

## When to choose it

Use it for secondary actions on an item of a row or list that has no room for a button per action: the item itself is the area, and the menu opens at the pointer. It is the ContextMenu, not a Dropdown: no visible trigger, opened by right-click or long-press.

## Where it belongs

The ADC design tab rail: each design tab is the right-click area of its own context menu, labelled "Tab options" (double-click on the tab also renames).

## Usage guidance

ADC: a ContextMenu per design whose ContextMenu.Trigger is the tab itself (Tabs.Tab with nativeButton false, rendered through ContextMenu.Trigger as a div; the trigger takes no aui). The popup is a ContextMenu.Popup labelled "Tab options" at the default scale, in the Portal and Positioner without props. It holds plain ContextMenu.Items, each with a leading ContextMenu.Icon: xmark "Close", ban "Close all other designs", a ContextMenu.Separator, then pen "Rename", copy "Duplicate", arrow-up "Move to top". No row is selected and choosing one runs the action and closes the menu. The app disables Close and Close all other designs when one design is left, and every row while a report is running; the scene shows them enabled. The scene shows the menu open under one design tab (CHIP_AUI of the app: surface-alt, solid, soft); the app opens it at the pointer, the scene anchors it 4px below the tab. Drag reorder, rename editing, the close button, the error dot and the other tabs are left out.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `ContextMenu`, `Tabs`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `paint`: `solid`, `text`, `tonal`
- `profile`: `no-padding`
- `color`: `raised`, `surface-alt`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Anatomy parts (gallery ordered by mounted parent and visual reading order)

1. **Trigger** — The "Design 1" tab is the right-click area: a Tabs.Tab with nativeButton off rendered through ContextMenu.Trigger as a div, which takes no aui. Selector: `[class~="aui-tabs-tab"]`. Layer step: **Design tab trigger** — Design 1 tab opens its secondary menu on right-click.
2. **Popup** — The menu labelled "Tab options", opened at the pointer in the app and anchored under the tab in the scene. Selector: `[class~="aui-dropdown-popup"]`. Layer step: **Menu surface** — Tab options popup sits beside the tab and groups actions. Code target: `ContextMenu.Popup`.
3. **Item** — A plain action row: Close, Close all other designs, Rename, Duplicate or Move to top; choosing one runs it and closes the menu. Selector: `[class~="aui-dropdown-item"]`.
4. **Icon** — The leading glyph of each row: xmark, ban, pen, copy and arrow-up. Selector: `[class~="aui-dropdown-item"] > [class~="aui-contained-icon"]`.
5. **Separator** — The divider between the close actions (Close, Close all other designs) and the edit actions (Rename, Duplicate, Move to top). Selector: `[class~="aui-dropdown-separator"]`. Layer step: **Action group divider** — Divider separates close commands from editing and duplication actions. Code target: `ContextMenu.Separator`.
6. **Close action** — First row closes the current Design 1 tab. Selector: `[data-ug-part="close-action"]`. Layer step: **Close action** — First row closes the current Design 1 tab.
7. **Close other designs** — This row closes every other design while keeping the current tab. Selector: `[data-ug-part="close-others-action"]`. Layer step: **Close other designs** — This row closes every other design while keeping the current tab.
8. **Rename action** — Rename action opens the current design’s name editor. Selector: `[data-ug-part="rename-action"]`. Layer step: **Rename action** — Rename action opens the current design’s name editor.
9. **Duplicate action** — Duplicate action creates a copy of this design. Selector: `[data-ug-part="duplicate-action"]`. Layer step: **Duplicate action** — Duplicate action creates a copy of this design.
10. **Move to top action** — Final row moves this design to the tab rail’s start. Selector: `[data-ug-part="move-to-top-action"]`. Layer step: **Move to top action** — Final row moves this design to the tab rail’s start.

## Apps

- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Tab options (`adc-tab-options`)

Apps: ADC

In context source: ADC: `src/adc/Workspace.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/context-menu/ContextMenu-001/example.tsx`

```tsx
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
```

#### In context source — `src/usecase-gallery/usecases/context-menu/ContextMenu-001/options/adc-tab-options/scene.tsx`

```tsx
import { useRef } from 'react';
import type { ContextProps } from '../../../../../types';
import { ContextMenu, Tabs, View } from '../../../../../kit';

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
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
