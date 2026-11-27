# Switch-001: Switch at row end

Component family: **Switch**

UI type: **Switch**

Source: `src/usecase-gallery/usecases/switch/Switch-001/usecase.ts`

## What it is

A switch at the end of a row, with the row's name at the start, turns the setting the row names on or off.

## When to choose it

Use it for an on and off choice that applies at once and sits in a list of similar items, where the row text is the label and the switches line up at one edge. Use a Switch.Label when the switch stands alone (Switch-002). For a row of a form whose off switch has a border, see Switch-003.

## Where it belongs

The Configure columns popover of the results table in HCS, HS and FD: one List row per column, the column name first and the switch in the row actions. The switch has no visible label (it carries an aria-label "Show <column>"); the row text names it.

## Usage guidance

All three apps write the switch the same way: no Switch.Label, an aria-label that repeats the row name, 44 by 22px with a 999px radius. Column visibility (HCS, HS, FD, one group): a List.Item with a List.ItemText and, inside List.ItemActions, a Switch with no children and an aria-label, aui states selected { color "primary", paint "solid" } so an on switch is the orange primary fill and an off switch the pale slate track (measured in the gallery scene in headless Chromium: 44 by 22px, 999px radius, 14px thumb; on is rgb(255,83,8) with a white thumb at x=26, off is rgb(241,245,249) with no border and an rgb(18,18,18) thumb at x=4, disabled and on is rgb(224,224,224) with an rgb(100,116,139) thumb). The consumer apps were not run; their props and states are read from the app source, where the three write the same switch. HCS and HS also set the row locked and the switch disabled for a column that cannot be hidden, add a List.DragHandle after the switch and an indicator before the text so the list can be reordered; FD has no drag handle and no locked column. The scene shows the switch enabled, one row, and leaves out the search field, the drag handle, the locked state and the Group by model switch (Switch-002).

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `IconButton`, `List`, `Popover`, `Switch`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `primary`, `secondary`, `surface`
- `paint`: `solid`, `text`
- `profile`: `contained`, `default`, `no-padding`
- `scale`: `sm`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Anatomy parts (gallery ordered by mounted parent and visual reading order)

1. **List** — The "Columns" list of the Configure columns popover, one row per results-table column. Selector: `[class~="aui-list"]`. Layer step: **List** — Columns popover lists one configurable result column per row.
2. **Row** — The Model row: the column name at the start and its switch in the row actions at the end. Selector: `[class~="aui-list-item"]`. Layer step: **Row** — Model row pairs its column name with the switch action.
3. **Row text** — The column name "Model" that names what the switch shows or hides. Selector: `[class~="aui-list-item-text"]`. Layer step: **Row text** — The column name "Model" that names what the switch shows or hides.
4. **Row actions** — The trailing slot at the end of the row that holds the switch. Selector: `[class~="aui-list-item-actions"]`. Layer step: **Row actions** — Trailing row slot contains the visibility switch control.
5. **Switch** — The on/off control, on by default, with no visible label; its aria-label "Show Model" names it and the selected track is solid primary. Selector: `[class~="aui-switch"]`. Layer step: **Switch** — On-by-default unlabeled switch uses Show Model for its accessible name.
6. **Thumb** — The movable thumb that sits at the end of the track while the column is shown. Selector: `[class~="aui-switch-thumb"]`. Layer step: **Thumb** — Thumb rests at track end when the column is shown. Code target: `Switch`.

## Apps

- HCS (`hcs`)
- HS (`hs`)
- FD (`fd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Column visibility (`hcs-columns`)

Apps: HCS, HS, FD

In context source: HCS: `src/components/ColumnVisibility.tsx`; HS: `src/hs/ColumnVisibility.tsx`; FD: `src/components/ColumnSettings.jsx`

In context view: Shown.

#### In context structure additions

1. **Configure columns trigger** — The table-columns IconButton, labelled Configure columns, that opens the popover under it. Part marker: `data-ug-part="columns-trigger"`. Layer step: **Configure columns trigger** — The table-columns IconButton, labelled Configure columns, that opens the popover under it.
2. **Configure columns popover** — The elevated popover, 320px wide, anchored under the trigger that holds the column list. Part marker: `data-ug-part="columns-popover"`. Layer step: **Configure columns popover** — Elevated 320px popover anchors beneath the settings trigger.

#### Component UI source — `src/usecase-gallery/usecases/switch/Switch-001/example.tsx`

```tsx
import { List, Switch } from '../../../kit';

export default function Example() {
  return (
    <List aria-label="Columns">
      <List.Item id="model">
        <List.ItemText>Model</List.ItemText>
        <List.ItemActions>
          <Switch aria-label="Show Model" defaultSelected aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }} />
        </List.ItemActions>
      </List.Item>
    </List>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/switch/Switch-001/options/hcs-columns/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { IconButton, Popover, View } from '../../../../../kit';

export default function HcsColumnsScene({ children, host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', justifyContent: 'end' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Popover open>
        <Popover.Trigger render={<IconButton data-ug-part="columns-trigger" name="table-columns" aria-label="Configure columns" aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'contained', shape: 'soft' }} />} />
        <Popover.Portal container={host}>
          <Popover.Positioner side="bottom" align="end" style={{ paddingBlock: 'var(--p-px-4)' }} className="ug-anchored">
            <Popover.Popup data-ug-part="columns-popover" initialFocus={false} aria-label="Configure columns" render={<View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '8', width: '320' } }} />}>
              {children}
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
