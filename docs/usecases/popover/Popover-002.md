# Popover-002: Form popover with footer

Component family: **Popover**

UI type: **Popover**

Source: `src/usecase-gallery/usecases/popover/Popover-002/usecase.ts`

## What it is

A popover that holds a small form and ends in a footer row: a reset icon at the start, Cancel and a solid Save at the end.

## When to choose it

Use it for a short list of settings the user confirms or cancels. Do not use it for read-only help (Popover-001) or a menu of choices (Popover-003).

## Where it belongs

The Configure columns popover opened from the table-columns icon at the end of the Output header in HCS and HS (ADC edits a value in a smaller popover, Button-022).

## Usage guidance

The Popover opens below the trigger `IconButton` (`side="bottom"`, `align="end"`, `sideOffset={4}`); the Popup renders a 320px `View` column (surface, solid, soft, elevation 4, gap 8) with a reorderable `List` and a footer `View` with `justifyContent: "between"`. The footer is the Button-021 group. HCS and HS are two groups: HCS (a contained trigger, a search Field and a Group by model switch, Save at scale "sm") and HS (a secondary text trigger, Save at the default scale). The scenes leave out the search and the group switch.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Icon`, `IconButton`, `List`, `Popover`, `Switch`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `paint`: `solid`, `text`
- `profile`: `contained`, `default`, `no-padding`
- `color`: `primary`, `secondary`, `surface`
- `scale`: `sm`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Trigger** — The "Configure columns" table-columns icon button beside the Output heading: contained in HCS, a plain secondary text button in HS and the example. Selector: `[data-base-ui-click-trigger]`.
2. **Popup** — The 320px elevated column that opens below the trigger aligned to its end, holding the title, the column list and the footer row. Selector: `[data-aui-popup-motion][role="dialog"]`.
3. **Heading** — The p3 "Columns" line that titles the popup in the example frame. Part marker: `data-ug-part="popup-heading"`. Direct text is highlighted.
4. **Column list** — The reorderable list labelled "Columns" with one row per output column; locked columns cannot be hidden. Selector: `[class~="aui-list"]`.
5. **Visibility switch** — The switch that shows or hides a column (labelled "Show <column>"), disabled for columns that cannot be hidden. Selector: `[class~="aui-switch"]`.
6. **Drag handle** — The handle that reorders a column row. Selector: `[class~="aui-list-drag-handle"]`.
7. **Footer row** — The row with justifyContent "between" that puts the reset icon at the start and Cancel and Save at the end. Part marker: `data-ug-part="footer"`.
8. **Reset** — The rotate-left icon button that restores the default columns. Part marker: `data-ug-part="reset"`.
9. **Cancel** — The text Cancel that discards the column changes. Part marker: `data-ug-part="cancel"`.
10. **Save** — The solid secondary Save that applies the column layout (scale "sm" in HCS, default scale in HS). Part marker: `data-ug-part="save"`.

## Component layer steps

1. **Trigger** — Configure columns button sits beside the Output heading. Selector: `[data-base-ui-click-trigger]`.
2. **Popup** — 320px elevated column holds its title, list, and footer. Selector: `[data-aui-popup-motion][role="dialog"]`.
3. **Column list** — Columns list reorders output fields; locked entries stay visible. Selector: `[class~="aui-list"]`.
4. **Visibility switch** — Show column switch hides configurable columns and disables locked ones. Selector: `[class~="aui-switch"]`.
5. **Drag handle** — Row handle lets users reorder the output columns. Selector: `[class~="aui-list-drag-handle"]`.
6. **Footer row** — Footer places Reset left and Cancel and Save right. Selector: `[data-ug-part="footer"]`.
7. **Reset** — The rotate-left icon button that restores the default columns. Selector: `[data-ug-part="reset"]`.
8. **Cancel** — The text Cancel that discards the column changes. Selector: `[data-ug-part="cancel"]`.
9. **Save** — Solid secondary Save applies the layout at app-specific scales. Selector: `[data-ug-part="save"]`.

## Apps

- HCS (`hcs`)
- HS (`hs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Contained trigger popover (`hcs-configure-columns`)

Apps: HCS

In context source: HCS: `src/components/ColumnVisibility.tsx`

In context view: Shown.

#### In context structure additions

1. **Output header** — The heading row of the Output pane, which holds the Configure columns trigger beside its title. Selector: `[data-ug-part="output-header"]`.
2. **Output title** — The Output heading that identifies the results whose columns the popover configures. Selector: `[data-ug-part="output-title"]`.
3. **Configure columns trigger** — The table-columns button that anchors the open popover to the results pane. Selector: `[data-ug-part="column-trigger"]`.

#### In context layer steps

1. **Output header** — The pane heading row with the Configure columns button beside Output. Selector: `[data-ug-part="output-header"]`.
2. **Output title** — The Output heading at the start of the pane header. Selector: `[data-ug-part="output-title"]`.
3. **Configure columns trigger** — The contained table-columns button that opens this popover. Selector: `[data-ug-part="column-trigger"]`.
4. **Trigger** — Configure columns button sits beside the Output heading. Selector: `[data-base-ui-click-trigger]`.
5. **Popup** — 320px elevated column holds its title, list, and footer. Selector: `[data-aui-popup-motion][role="dialog"]`.
6. **Column list** — Columns list reorders output fields; locked entries stay visible. Selector: `[class~="aui-list"]`.
7. **Visibility switch** — Show column switch hides configurable columns and disables locked ones. Selector: `[class~="aui-switch"]`.
8. **Drag handle** — Row handle lets users reorder the output columns. Selector: `[class~="aui-list-drag-handle"]`.
9. **Footer row** — Footer places Reset left and Cancel and Save right. Selector: `[data-ug-part="footer"]`.
10. **Reset** — The rotate-left icon button that restores the default columns. Selector: `[data-ug-part="reset"]`.
11. **Cancel** — The text Cancel that discards the column changes. Selector: `[data-ug-part="cancel"]`.
12. **Save** — Solid secondary Save applies the layout at app-specific scales. Selector: `[data-ug-part="save"]`.

#### Component UI source — `src/usecase-gallery/usecases/popover/Popover-002/example.tsx`

```tsx
import { Button, IconButton, Popover, Type, View } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 14)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', gap: '8' } }}>
        <Type as="h2" role="l3" weight="semi-bold">Output</Type>
        <Popover open>
          <Popover.Trigger render={<IconButton name="table-columns" aria-label="Configure columns" aui={{ color: 'secondary', paint: 'text', scale: 'sm', shape: 'soft' }} />} />
          <Popover.Portal container={host}>
            <Popover.Positioner side="bottom" align="end" sideOffset={4} className="ug-anchored">
              <Popover.Popup
                initialFocus={false}
                aria-label="Configure columns"
                render={<View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', minHeight: '0', minWidth: '0', gap: '8', width: '320' } }} />}
              >
                <Type data-ug-part="popup-heading" as="p" role="p3">Columns</Type>
                <View data-ug-part="footer" aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', minWidth: '0', justifyContent: 'between' } }}>
                  <IconButton data-ug-part="reset" name="rotate-left" aria-label="Reset columns to default" aui={{ paint: 'text' }} />
                  <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', minWidth: '0' } }}>
                    <Button data-ug-part="cancel" aui={{ paint: 'text' }}>Cancel</Button>
                    <Button data-ug-part="save" aui={{ color: 'secondary', paint: 'solid' }}>Save</Button>
                  </View>
                </View>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover>
      </View>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/popover/Popover-002/options/hcs-configure-columns/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, Icon, IconButton, List, Popover, Switch, Type, View } from '../../../../../kit';
import { MOCK_OUTPUT_COLUMNS } from '../../../../../mock-data';

// ColumnVisibility: the Configure columns popover opened from its table-columns trigger in the Output header, cut to a reorderable List of
// three columns (Model locked, Load sorted ascending) and the footer row, justifyContent: between: the reset icon at the start, Cancel and
// Save grouped at the end. Search and Group by model are left out. Shown open; the wrapper keeps stage room (inline min-block-size).
export default function HcsConfigureColumnsScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 18)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <View data-ug-part="output-header" aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', gap: '8' } }}>
        <Type data-ug-part="output-title" as="h2" role="l3" weight="semi-bold">Output</Type>
      <Popover open>
        <Popover.Trigger
          render={
            <IconButton
              name="table-columns"
              aria-label="Configure columns"
              data-ug-part="column-trigger"
              aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'contained', shape: 'soft' }}
            />
          }
        />
        <Popover.Portal container={host}>
          <Popover.Positioner side="bottom" align="end" sideOffset={4} className="ug-anchored">
            <Popover.Popup
              initialFocus={false}
              aria-label="Configure columns"
              render={
                <View
                  aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', minHeight: '0', minWidth: '0', gap: '8', width: '320' } }}
                />
              }
            >
              <List aria-label="Columns" reorderable>
                {MOCK_OUTPUT_COLUMNS.map((column) => (
                  <List.Item key={column.id} id={column.id} locked={!column.hideable}>
                    <List.ItemIndicator />
                    <List.ItemText>
                      <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '4', minWidth: '0' } }}>
                        <Type as="span">{column.header}</Type>
                        {column.id === 'load' && <Icon name="arrow-up" aria-label="Sorted ascending" aui={{ color: 'primary' }} />}
                      </View>
                    </List.ItemText>
                    <List.ItemActions>
                      <Switch
                        aria-label={`Show ${column.header}`}
                        defaultSelected
                        disabled={!column.hideable}
                        aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}
                      />
                      <List.DragHandle label={`Reorder ${column.header}`} />
                    </List.ItemActions>
                  </List.Item>
                ))}
              </List>
              <View data-ug-part="footer" aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', minWidth: '0', justifyContent: 'between' } }}>
                <IconButton data-ug-part="reset" name="rotate-left" aria-label="Reset columns to default" aui={{ paint: 'text' }} />
                <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', minWidth: '0' } }}>
                  <Button data-ug-part="cancel" aui={{ paint: 'text' }}>Cancel</Button>
                  <Button data-ug-part="save" aui={{ scale: 'sm', color: 'secondary', paint: 'solid' }}>Save</Button>
                </View>
              </View>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
      </View>
    </View>
  );
}
```

### 2. Text trigger popover (`hs-configure-columns`)

Apps: HS

In context source: HS: `src/hs/ColumnVisibility.tsx`

In context view: Shown.

#### In context structure additions

1. **Output header** — The heading row of the Output pane, which holds the Configure columns trigger beside its title. Selector: `[data-ug-part="output-header"]`.
2. **Output title** — The Output heading that identifies the results whose columns the popover configures. Selector: `[data-ug-part="output-title"]`.
3. **Configure columns trigger** — The table-columns button that anchors the open popover to the results pane. Selector: `[data-ug-part="column-trigger"]`.

#### In context layer steps

1. **Output header** — The pane heading row with the Configure columns button beside Output. Selector: `[data-ug-part="output-header"]`.
2. **Output title** — The Output heading at the start of the pane header. Selector: `[data-ug-part="output-title"]`.
3. **Configure columns trigger** — The secondary text table-columns button that opens this popover. Selector: `[data-ug-part="column-trigger"]`.
4. **Trigger** — Configure columns button sits beside the Output heading. Selector: `[data-base-ui-click-trigger]`.
5. **Popup** — 320px elevated column holds its title, list, and footer. Selector: `[data-aui-popup-motion][role="dialog"]`.
6. **Column list** — Columns list reorders output fields; locked entries stay visible. Selector: `[class~="aui-list"]`.
7. **Visibility switch** — Show column switch hides configurable columns and disables locked ones. Selector: `[class~="aui-switch"]`.
8. **Drag handle** — Row handle lets users reorder the output columns. Selector: `[class~="aui-list-drag-handle"]`.
9. **Footer row** — Footer places Reset left and Cancel and Save right. Selector: `[data-ug-part="footer"]`.
10. **Reset** — The rotate-left icon button that restores the default columns. Selector: `[data-ug-part="reset"]`.
11. **Cancel** — The text Cancel that discards the column changes. Selector: `[data-ug-part="cancel"]`.
12. **Save** — Solid secondary Save applies the layout at app-specific scales. Selector: `[data-ug-part="save"]`.

#### Component UI source — `src/usecase-gallery/usecases/popover/Popover-002/options/hs-configure-columns/example.tsx`

```tsx
import { Button, IconButton, Popover, Type, View } from '../../../../../kit';
import { useStageHost } from '../../../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 14)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', gap: '8' } }}>
        <Type as="h2" role="l3" weight="semi-bold">Output</Type>
        <Popover open>
          <Popover.Trigger render={<IconButton name="table-columns" aria-label="Configure columns" aui={{ color: 'secondary', paint: 'text', scale: 'sm', shape: 'soft' }} />} />
          <Popover.Portal container={host}>
            <Popover.Positioner side="bottom" align="end" sideOffset={4} className="ug-anchored">
              <Popover.Popup
                initialFocus={false}
                aria-label="Configure columns"
                render={<View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', minHeight: '0', minWidth: '0', gap: '8', width: '320' } }} />}
              >
                <Type data-ug-part="popup-heading" as="p" role="p3">Columns</Type>
                <View data-ug-part="footer" aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', minWidth: '0', justifyContent: 'between' } }}>
                  <IconButton data-ug-part="reset" name="rotate-left" aria-label="Reset columns to default" aui={{ paint: 'text' }} />
                  <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', minWidth: '0' } }}>
                    <Button data-ug-part="cancel" aui={{ paint: 'text' }}>Cancel</Button>
                    <Button data-ug-part="save" aui={{ color: 'secondary', paint: 'solid' }}>Save</Button>
                  </View>
                </View>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover>
      </View>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/popover/Popover-002/options/hs-configure-columns/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, IconButton, List, Popover, Switch, Type, View } from '../../../../../kit';
import { MOCK_OUTPUT_COLUMNS } from '../../../../../mock-data';

// HS ColumnVisibility: the Configure columns popover opened from its table-columns trigger (secondary text, no contained profile) at the end of the Output header.
// Its footer is the same row as HCS, but Save keeps the default scale (HCS sets "sm"). The search field and Group by model are left out.
export default function HsConfigureColumnsScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 18)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <View data-ug-part="output-header" aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', gap: '8' } }}>
        <Type data-ug-part="output-title" as="h2" role="l3" weight="semi-bold">Output</Type>
        <Popover open>
          <Popover.Trigger
            render={<IconButton name="table-columns" aria-label="Configure columns" data-ug-part="column-trigger" aui={{ color: 'secondary', paint: 'text', scale: 'sm', shape: 'soft' }} />}
          />
          <Popover.Portal container={host}>
            <Popover.Positioner side="bottom" align="end" sideOffset={4} className="ug-anchored">
              <Popover.Popup
                initialFocus={false}
                aria-label="Configure columns"
                render={
                  <View
                    aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', minHeight: '0', minWidth: '0', gap: '8', width: '320' } }}
                  />
                }
              >
                <List aria-label="Columns" reorderable>
                  {MOCK_OUTPUT_COLUMNS.map((column) => (
                    <List.Item key={column.id} id={column.id} locked={!column.hideable}>
                      <List.ItemIndicator />
                      <List.ItemText>{column.header}</List.ItemText>
                      <List.ItemActions>
                        <Switch
                          aria-label={`Show ${column.header}`}
                          defaultSelected
                          disabled={!column.hideable}
                          aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}
                        />
                        <List.DragHandle label={`Reorder ${column.header}`} />
                      </List.ItemActions>
                    </List.Item>
                  ))}
                </List>
                <View data-ug-part="footer" aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', minWidth: '0', justifyContent: 'between' } }}>
                  <IconButton data-ug-part="reset" name="rotate-left" aria-label="Reset columns to default" aui={{ paint: 'text' }} />
                  <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', minWidth: '0' } }}>
                    <Button data-ug-part="cancel" aui={{ paint: 'text' }}>Cancel</Button>
                    <Button data-ug-part="save" aui={{ color: 'secondary', paint: 'solid' }}>Save</Button>
                  </View>
                </View>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover>
      </View>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
