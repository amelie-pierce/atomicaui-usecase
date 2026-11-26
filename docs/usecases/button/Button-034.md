# Button-034: Show column info button

Component family: **Button**

UI type: **Icon button**

Source: `src/usecase-gallery/usecases/button/Button-034/usecase.ts`

## What it is

A transparent icon-only button with a circle-info opens an explanation popover from a table column header.

## When to choose it

Use it to explain one column without adding permanent text; stop its click so it does not sort the column. Always set aria-label.

## Where it belongs

A table column header cell. Real site source: FD src/components/Results.jsx (FastenerPatternInfo). No other app has this control.

## Usage guidance

FD writes a Button (color "secondary", paint "text", scale "xs", shape "soft") with a circle-info Button.Icon, which opens a popover below it; the scene writes that Button, the example shows the IconButton form. The scene keeps one header cell and the first line of the popover. One group, FD only.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `IconButton`, `Popover`, `Table`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `raised`, `secondary`, `surface`
- `paint`: `solid`, `text`
- `scale`: `sm`, `xs`
- `shape`: `soft`
- `profile`: `contained`, `default`, `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Info button** — The xs transparent secondary circle-info button that explains a column; in FD it is a Button with Button.Icon beside the Fastener Pattern heading. Selector: `[class~="aui-button"][aria-label="Fastener Pattern"], [class~="aui-button"][aria-label="Column info"]`.
2. **Info icon** — The circle-info glyph that signals a note about the column. Selector: `[class~="aui-button"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
3. **Column header** — The raised Fastener Pattern heading cell that carries the text and the info button with a 4px gap. Selector: `[class~="aui-table-header-cell"]`.
4. **Info popover** — The 384px solid popover below the heading that states Fasteners are counted per row. Selector: `[data-aui-popup-motion][role="dialog"]`.

## Component layer steps

1. **Info button** — The xs transparent secondary circle-info button that explains a column; in FD it is a Button with Button.Icon beside the Fastener Pattern heading. Selector: `[class~="aui-button"][aria-label="Fastener Pattern"], [class~="aui-button"][aria-label="Column info"]`.
2. **Info icon** — The circle-info glyph that signals a note about the column. Selector: `[class~="aui-button"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
3. **Column header** — The raised Fastener Pattern heading cell that carries the text and the info button with a 4px gap. Selector: `[class~="aui-table-header-cell"]`.
4. **Info popover** — The 384px solid popover below the heading that states Fasteners are counted per row. Selector: `[data-aui-popup-motion][role="dialog"]`.

## Apps

- FD (`fd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Header info (`fd-header-info`)

Apps: FD

In context source: FD: `src/components/Results.jsx`

In context view: Shown.

#### In context structure additions

1. **Results table** — The Table whose raised header row holds the Fastener Pattern heading and its info button. Selector: `[class~="aui-table"]`.

#### In context layer steps

1. **Results table** — The Table whose raised header row holds the Fastener Pattern heading and its info button. Selector: `[class~="aui-table"]`.
2. **Info button** — The xs transparent secondary circle-info button that explains a column; in FD it is a Button with Button.Icon beside the Fastener Pattern heading. Selector: `[class~="aui-button"][aria-label="Fastener Pattern"], [class~="aui-button"][aria-label="Column info"]`.
3. **Info icon** — The circle-info glyph that signals a note about the column. Selector: `[class~="aui-button"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
4. **Column header** — The raised Fastener Pattern heading cell that carries the text and the info button with a 4px gap. Selector: `[class~="aui-table-header-cell"]`.
5. **Info popover** — The 384px solid popover below the heading that states Fasteners are counted per row. Selector: `[data-aui-popup-motion][role="dialog"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-034/example.tsx`

```tsx
import { IconButton } from '../../../kit';

export default function Example() {
  return <IconButton name="circle-info" aria-label="Column info" aui={{ color: 'secondary', paint: 'text', scale: 'xs', shape: 'soft', profile: 'contained' }} />;
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-034/options/fd-header-info/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, Popover, Table, View } from '../../../../../kit';

// FD FastenerPatternInfo (src/components/Results.jsx): not a field label but a table column header: a Button (color secondary, paint text, scale xs, soft) with a circle-info Button.Icon sits in the header cell and opens a popover below it (bottom, 4px offset, 384px).
// Its click is stopped so it does not sort the column. The scene keeps one header cell and the first line of the popover.
export default function FdHeaderInfoScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 10)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Table aria-label="Results" aui={{ scale: 'sm', shape: 'soft' }} style={{ inlineSize: '100%' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }}>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '4' } }}>
                Fastener Pattern
                <Popover open>
                  <Popover.Trigger render={<Button aria-label="Fastener Pattern" aui={{ color: 'secondary', paint: 'text', scale: 'xs', shape: 'soft' }} />}>
                    <Button.Icon name="circle-info" />
                  </Popover.Trigger>
                  <Popover.Portal container={host}>
                    <Popover.Positioner side="bottom" sideOffset={4} className="ug-anchored">
                      <Popover.Popup initialFocus={false} aria-label="Fastener Pattern" render={<View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { width: '384' } }} />}>
                        Fasteners are counted per row.
                      </Popover.Popup>
                    </Popover.Positioner>
                  </Popover.Portal>
                </Popover>
              </View>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
      </Table>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
