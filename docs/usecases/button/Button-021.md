# Button-021: Save column configuration buttons

Component family: **Button**

UI type: **Button group**

Source: `src/usecase-gallery/usecases/button/Button-021/usecase.ts`

## What it is

A reset icon, a Cancel and a solid secondary Save close the Configure columns popover.

## When to choose it

Use it when the popover is lightweight and the Cancel should not compete with Save; the reset icon returns the columns to their default.

## Where it belongs

The footer of the Configure columns popover, opened from the table-columns IconButton at the end of the Output header: a reset icon at the start, then Cancel and Save. Real site source: HCS src/components/ColumnVisibility.tsx and HS src/hs/ColumnVisibility.tsx. Dialogs use a gray solid Cancel instead (Dialog-008).

## Usage guidance

HCS: Cancel sets aui paint "text" (default color, no fill, default scale); Save sets scale "sm", color "secondary" and paint "solid". Cancel and Save sit in their own row View so the footer row can use justifyContent "between": reset icon at the start, the pair at the end. The reset is an IconButton with the rotate-left glyph, aui paint "text", and needs an aria-label. In context the popover is opened under the table-columns IconButton (contained profile) (bottom, end, 4px offset): a reorderable List of three Output columns, then this footer; the search field, the other columns and Group by model are left out. HS (own group): the same footer, but Save has no scale (default size) and the table-columns trigger has no contained profile.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Icon`, `IconButton`, `List`, `Popover`, `Switch`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `paint`: `solid`, `text`
- `profile`: `contained`, `default`, `no-padding`
- `scale`: `sm`
- `color`: `primary`, `secondary`, `surface`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Reset button** — The icon-only rotate-left button at the start of the footer that resets the columns to their default order and visibility. Part marker: `data-ug-part="reset"`.
2. **Action group** — The row at the end of the footer that holds Cancel and Save with an 8px gap. Part marker: `data-ug-part="actions"`.
3. **Cancel** — The text-paint Cancel Button that closes the popover and discards changes (default color, no fill; default scale in HS). Part marker: `data-ug-part="cancel"`.
4. **Save** — The solid secondary Save Button that applies the column changes (scale "sm" in HCS, default scale in HS). Part marker: `data-ug-part="save"`.

## Component layer steps

1. **Reset button** — Start reset icon restores columns to default order and visibility. Selector: `[data-ug-part="reset"]`.
2. **Action group** — Footer pairs Cancel and Save with an 8px gap. Selector: `[data-ug-part="actions"]`.
3. **Cancel** — Text Cancel closes the popover and discards pending changes. Selector: `[data-ug-part="cancel"]`.
4. **Save** — Solid secondary Save applies the output column changes. Selector: `[data-ug-part="save"]`.

## Apps

- HCS (`hcs`)
- HS (`hs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Compact save button (`hcs-configure-columns`)

Apps: HCS

In context source: HCS: `src/components/ColumnVisibility.tsx`

In context view: Shown.

#### In context structure additions

1. **Configure columns popover** — The elevated popover opened under the table-columns IconButton that holds the column list and this footer. Part marker: `data-ug-part="popover"`.
2. **Column list** — The reorderable List of Output columns, each with a visibility Switch and a drag handle. Part marker: `data-ug-part="columns"`.

#### In context layer steps

1. **Configure columns popover** — Elevated popover contains the output columns and footer actions. Selector: `[data-ug-part="popover"]`.
2. **Column list** — Reorderable Output list pairs each column with visibility and drag controls. Selector: `[data-ug-part="columns"]`.
3. **Reset button** — Start reset icon restores columns to default order and visibility. Selector: `[data-ug-part="reset"]`.
4. **Action group** — Footer pairs Cancel and Save with an 8px gap. Selector: `[data-ug-part="actions"]`.
5. **Cancel** — Text Cancel closes the popover and discards pending changes. Selector: `[data-ug-part="cancel"]`.
6. **Save** — Solid secondary Save applies the output column changes. Selector: `[data-ug-part="save"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-021/example.tsx`

```tsx
import { Button, IconButton, View } from '../../../kit';

export default function Example() {
  return (
    <>
      <IconButton data-ug-part="reset" name="rotate-left" aria-label="Reset columns to default" aui={{ paint: 'text' }} />
      <View data-ug-part="actions" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '8' } }}>
        <Button data-ug-part="cancel" aui={{ paint: 'text' }}>Cancel</Button>
        <Button data-ug-part="save" aui={{ scale: 'sm', color: 'secondary', paint: 'solid' }}>Save</Button>
      </View>
    </>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-021/options/hcs-configure-columns/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Icon, IconButton, List, Popover, Switch, Type, View } from '../../../../../kit';
import { MOCK_OUTPUT_COLUMNS } from '../../../../../mock-data';

// ColumnVisibility: the Configure columns popover opened from its table-columns trigger in the Output header, cut to a reorderable List of
// three columns (Model locked, Load sorted ascending) and the footer row, justifyContent: between: the reset icon at the start, Cancel and
// Save grouped at the end. Search and Group by model are left out. Shown open; the wrapper keeps stage room (inline min-block-size).
export default function HcsConfigureColumnsScene({ children, host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 18)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', gap: '8' } }}>
        <Type as="h2" role="l3" weight="semi-bold">Output</Type>
      <Popover open>
        <Popover.Trigger
          render={
            <IconButton
              name="table-columns"
              aria-label="Configure columns"
              aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'contained', shape: 'soft' }}
            />
          }
        />
        <Popover.Portal container={host}>
          <Popover.Positioner side="bottom" align="end" sideOffset={4} className="ug-anchored">
            <Popover.Popup
                data-ug-part="popover"
              initialFocus={false}
              aria-label="Configure columns"
              render={
                <View
                  aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', minHeight: '0', minWidth: '0', gap: '8', width: '320' } }}
                />
              }
            >
              <List data-ug-part="columns" aria-label="Columns" reorderable>
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
              <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', minWidth: '0', justifyContent: 'between' } }}>
                {children}
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

### 2. Default save button (`hs-configure-columns`)

Apps: HS

In context source: HS: `src/hs/ColumnVisibility.tsx`

In context view: Shown.

#### In context structure additions

1. **Configure columns popover** — The elevated popover opened under the table-columns IconButton that holds the column list and this footer. Part marker: `data-ug-part="popover"`.
2. **Column list** — The reorderable List of Output columns, each with a visibility Switch and a drag handle. Part marker: `data-ug-part="columns"`.

#### In context layer steps

1. **Configure columns popover** — Elevated popover contains the output columns and footer actions. Selector: `[data-ug-part="popover"]`.
2. **Column list** — Reorderable Output list pairs each column with visibility and drag controls. Selector: `[data-ug-part="columns"]`.
3. **Reset button** — Start reset icon restores columns to default order and visibility. Selector: `[data-ug-part="reset"]`.
4. **Action group** — Footer pairs Cancel and Save with an 8px gap. Selector: `[data-ug-part="actions"]`.
5. **Cancel** — Text Cancel closes the popover and discards pending changes. Selector: `[data-ug-part="cancel"]`.
6. **Save** — Solid secondary Save applies the output column changes. Selector: `[data-ug-part="save"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-021/options/hs-configure-columns/example.tsx`

```tsx
import { Button, IconButton, View } from '../../../../../kit';

export default function Example() {
  return (
    <>
      <IconButton data-ug-part="reset" name="rotate-left" aria-label="Reset columns to default" aui={{ paint: 'text' }} />
      <View data-ug-part="actions" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '8' } }}>
        <Button data-ug-part="cancel" aui={{ paint: 'text' }}>Cancel</Button>
        <Button data-ug-part="save" aui={{ color: 'secondary', paint: 'solid' }}>Save</Button>
      </View>
    </>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-021/options/hs-configure-columns/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, IconButton, List, Popover, Switch, Type, View } from '../../../../../kit';
import { MOCK_OUTPUT_COLUMNS } from '../../../../../mock-data';

// HS ColumnVisibility: the Configure columns popover opened from its table-columns trigger (secondary text, no contained profile) at the end of the Output header.
// Its footer is the same row as HCS, but Save keeps the default scale (HCS sets "sm"). The search field and Group by model are left out.
export default function HsConfigureColumnsScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 18)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', gap: '8' } }}>
        <Type as="h2" role="l3" weight="semi-bold">Output</Type>
        <Popover open>
          <Popover.Trigger
            render={<IconButton name="table-columns" aria-label="Configure columns" aui={{ color: 'secondary', paint: 'text', scale: 'sm', shape: 'soft' }} />}
          />
          <Popover.Portal container={host}>
            <Popover.Positioner side="bottom" align="end" sideOffset={4} className="ug-anchored">
              <Popover.Popup
                data-ug-part="popover"
                initialFocus={false}
                aria-label="Configure columns"
                render={
                  <View
                    aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', minHeight: '0', minWidth: '0', gap: '8', width: '320' } }}
                  />
                }
              >
                <List data-ug-part="columns" aria-label="Columns" reorderable>
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
                <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', minWidth: '0', justifyContent: 'between' } }}>
                  <IconButton data-ug-part="reset" name="rotate-left" aria-label="Reset columns to default" aui={{ paint: 'text' }} />
                  <View data-ug-part="actions" aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', minWidth: '0' } }}>
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
