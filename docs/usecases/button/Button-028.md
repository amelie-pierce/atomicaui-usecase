# Button-028: Expand row button

Component family: **Button**

UI type: **Icon button**

Source: `src/usecase-gallery/usecases/button/Button-028/usecase.ts`

## What it is

A compact chevron Button expands a table row; HCS draws it as a Button (error color on failed rows), the other apps use the table's own expand trigger.

## When to choose it

Use it for a per-row disclosure. In HCS switch color to "error" for rows that failed so the reason stands out (shown in the second row of the scene). Always give it an aria-label (the table trigger takes it from the row's expansionLabel); only HCS sets aria-expanded itself.

## Where it belongs

The first cell of a table row, before the name. Real site source: HCS (the Model cell of ProductRow in src/components/F01Results.tsx; the turn is src/components/F01Results.css) and its group rows (same file); FD Results.jsx (modelCell, Table.ExpandTrigger); HS ResultsTable.tsx (group rows, Table.ExpandTrigger); ADC ProductsPicker.tsx (parent rows of the anchor tree, Table.ExpandTrigger). ACE, ADM, PFD, PBS, AGPD and RWS have no expandable rows.

## Usage guidance

The example is the HCS Button: aui scale "sm", profile "square-compact", paint "text" and color "surface" (or "error"), with sx minWidth and minHeight "24" for a safe hit area. The glyph is angle-right (weight "solid"), shown in the closed state; the app turns only the icon 90 degrees through CSS when aria-expanded is true (the scene's `.ug-results` rule does the same), and the button itself never rotates. The apps are grouped by what the UI looks like, never by the content or data each app shows: every scene uses mock data, so apps with the same UI but different content (HCS and ADC) are one group. The preview groups the apps by distinct UI and the Document lists the same groups. Results table (the Why Not expander of a result row): HCS and FD (the Button above, first element of the Model cell, before the name; the scene is the Model column and two rows, because the button shows in two colors). FD draws the same chevron with the library's Table.ExpandTrigger and has no error color, so the HCS format is the standard. Group row (rows that group members under a model or a parent): HCS and ADC (Table.ExpandTrigger, then the group name in semi-bold; ADC sets the trigger to scale "xs" and gap 6 where HCS keeps the table density and gap 4, a size difference only); HS (the same row painted surface-alt solid, so the group reads as a band). Left out of every scene: selection, the thumbnail, the other columns, sorting, the frozen column, the Why Not panel and the member rows.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Table`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `profile`: `no-padding`, `square-compact`
- `color`: `error`, `raised`, `surface`, `surface-alt`
- `paint`: `solid`, `text`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Expand button** — The 24px minimum square-compact text Button with aria-expanded false that opens the Why Not explanation of one model row; HCS tints it with the error color on failed rows like Model C-300. Selector: `[class~="aui-button"][aria-label^="Why Not"]`.
2. **Chevron** — The solid angle-right glyph that points to the collapsed content. Selector: `[class~="aui-button"][aria-label^="Why Not"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
3. **Table expand trigger** — HCS and HS group rows (A-100 (2)) use the table own expand trigger instead of a Button, placed before the semi-bold group name. Selector: `[class~="aui-table-expand-trigger"]`.
4. **Row** — The result row that the chevron opens: a model such as Model A-100, or the A-100 (2) group row with an Expand A-100 group label. Selector: `[class~="aui-table-row"]`.
5. **Model cell** — The Model cell that holds the chevron and the model name side by side with a gap of 12 (4 in group rows). Selector: `[class~="aui-table-cell"]`.

## Apps

- HCS (`hcs`)
- HS (`hs`)
- FD (`fd`)
- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Results table (`hcs-results`)

Apps: HCS, FD

In context source: HCS: `src/components/F01Results.tsx`; FD: `src/components/Results.jsx`

In context view: Shown.

#### In context structure additions

1. **Results table** — The Table of connector results, cut to the Model column; its header cell is raised. Selector: `[class~="aui-table"]`.
2. **Failed-model expander** — The second row's expander in the error color for Model C-300, which failed its check. Selector: `[aria-label="Why Not for Model C-300"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-028/example.tsx`

```tsx
import { Button } from '../../../kit';

export default function Example() {
  return (
    <Button
      aria-label="Why Not for passing model"
      aria-expanded={false}
      aui={{
        scale: 'sm',
        profile: 'square-compact',
        color: 'surface',
        paint: 'text',
        sx: { minWidth: '24', minHeight: '24' },
      }}
    >
      <Button.Icon name="angle-right" weight="solid" aui={{ scale: 'sm' }} />
    </Button>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-028/options/hcs-results/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, Table, View } from '../../../../../kit';

// F01Results cut to the Model column, with mock model names (FD's Results.jsx shows the same chevron through Table.ExpandTrigger, without the error colour): a header and two rows, one passed (the expander is the example) and one failed (the expander in the
// error color). Each row composes its own Model cell: expander, model name. The chevron turns 90 degrees on the icon only (`.ug-results`,
// as `.hcs-why-not-toggle` in the app); the scene is static, so nothing responds to clicks.
export default function ResultsScene({ children }: ContextProps) {
  return (
    <View className="ug-results" aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table aria-label="Connector calculation results" aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }}>Model</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {[
            { model: 'Model A-100', passed: true },
            { model: 'Model C-300', passed: false },
          ].map((row, rowIndex) => (
            <Table.Row key={row.model}>
              <Table.Cell>
                <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '12', minWidth: '0' } }}>
                  {rowIndex === 0 ? (
                    children
                  ) : (
                    <Button
                      data-ug-part="failed-expander"
                      aria-label={`Why Not for ${row.model}`}
                      aria-expanded={false}
                      aui={{ scale: 'sm', profile: 'square-compact', color: 'error', paint: 'text', sx: { minWidth: '24', minHeight: '24' } }}
                    >
                      <Button.Icon name="angle-right" weight="solid" aui={{ scale: 'sm' }} />
                    </Button>
                  )}
                  {row.model}
                </View>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </View>
  );
}
```

### 2. Group model row (`hcs-group`)

Apps: HCS, ADC

In context source: HCS: `src/components/F01Results.tsx`; ADC: `src/adc/components/ProductsPicker.tsx`

In context view: Shown.

#### In context structure additions

1. **Results table** — The Table of connector results, cut to the Model column; its header cell is raised. Selector: `[class~="aui-table"]`.
2. **Group label** — The semi-bold model name with its member count (A-100 (2)) next to the expander in the group row. Selector: `[data-ug-part="group-label"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-028/options/hcs-group/example.tsx`

```tsx
import { Button } from '../../../../../kit';

export default function Example() {
  return (
    <Button
      aria-label="Why Not for passing model"
      aria-expanded={false}
      aui={{
        scale: 'sm',
        profile: 'square-compact',
        color: 'surface',
        paint: 'text',
        sx: { minWidth: '24', minHeight: '24' },
      }}
    >
      <Button.Icon name="angle-right" weight="solid" aui={{ scale: 'sm' }} />
    </Button>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-028/options/hcs-group/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Table, Type, View } from '../../../../../kit';

// HCS results table grouped by model (F01Results.tsx), with mock data; ADC's ProductsPicker parent row is the same UI (it sets the trigger to scale xs and gap 6, a size difference only): the group row is not selectable and spans every column; its cell is a flex row (gap 4) of the library's
// Table.ExpandTrigger (a chevron-right IconButton at the table density, rotated 90 degrees by the DS when open) and the model number with the member count in
// semi-bold. The scene keeps the Model header and the closed group row; the member rows and the other columns are left out.
export default function HcsGroupScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table aria-label="Connector calculation results" expandable indicatorColumn={false} aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }}>Model</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row selectable={false} expandable expansionLabel="Expand A-100 group">
            <Table.Cell>
              <View aui={{ paint: 'text', scale: 'sm', sx: { display: 'flex', alignItems: 'center', gap: '4' } }}>
                <Table.ExpandTrigger />
                <Type data-ug-part="group-label" as="span" weight="semi-bold">A-100 (2)</Type>
              </View>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

### 3. Counted model row (`hs-group`)

Apps: HS

In context source: HS: `src/hs/ResultsTable.tsx`

In context view: Shown.

#### In context structure additions

1. **Results table** — The Table of connector results, cut to the Model column; its header cell is raised. Selector: `[class~="aui-table"]`.
2. **Group label** — The semi-bold model name with its member count (A-100 (2)) next to the expander in the group row. Selector: `[data-ug-part="group-label"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-028/options/hs-group/example.tsx`

```tsx
import { Button } from '../../../../../kit';

export default function Example() {
  return (
    <Button
      aria-label="Why Not for passing model"
      aria-expanded={false}
      aui={{
        scale: 'sm',
        profile: 'square-compact',
        color: 'surface',
        paint: 'text',
        sx: { minWidth: '24', minHeight: '24' },
      }}
    >
      <Button.Icon name="angle-right" weight="solid" aui={{ scale: 'sm' }} />
    </Button>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-028/options/hs-group/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Table, Type, View } from '../../../../../kit';

// HS results table grouped by model (ResultsTable.tsx): the same group row as HCS (Table.ExpandTrigger, then the model with its member count in semi-bold, gap 4), but
// the row and its first cell are painted surface-alt solid, so the group reads as a band above its members. The member rows and the other columns are left out.
export default function HsGroupScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table aria-label="Results" expandable indicatorColumn={false} aui={{ scale: 'sm', shape: 'soft' }}>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ color: 'raised' }}>Model</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row aui={{ color: 'surface-alt', paint: 'solid' }} selectable={false} expandable expansionLabel="Expand A-100 group">
            <Table.Cell aui={{ color: 'surface-alt', paint: 'solid' }}>
              <View aui={{ paint: 'text', scale: 'sm', sx: { display: 'flex', alignItems: 'center', gap: '4' } }}>
                <Table.ExpandTrigger />
                <Type data-ug-part="group-label" as="span" weight="semi-bold">A-100 (2)</Type>
              </View>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
