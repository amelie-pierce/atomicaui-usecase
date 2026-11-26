# Table-006: Dense print table

Component family: **Table**

UI type: **Data table**

Source: `src/usecase-gallery/usecases/table/Table-006/usecase.ts`

## What it is

The paper copy of a table: a flat all-cells grid with no sorting or selection, printed in the report.

## When to choose it

Use it on the print page only. The table has no sort button, selection or scroll. Pick the group of the app you build: the band colour, density, alignment and border colour differ and are not interchangeable.

## Where it belongs

Print views: ACE print/ui/report-primitives.tsx (ReportTable), ADM print/components/InputDataPrintPage.tsx, HS PrintView.tsx, RWS PrintView PrintTable.jsx, PBS PrintView.tsx, PFD PrintView.tsx and AGPD App.tsx (the print table).

## Usage guidance

Table with border "all-cells" and scale "xs"; cell and header-cell aui set the band. Five groups, measured in headless Chromium. ACE: text-coloured border rgb(0, 0, 0), no radius, header band painted muted (background rgb(71, 85, 105), text rgb(255, 255, 255)), cells 14px/18px with padding 6px 4px and centred. ADM: the same band and border with compact 12px/16px cells, padding 2px 4px, aligned left. HS: header cells painted secondary solid (background rgb(18, 18, 18), white text), 10/12 body type, borders rgb(148, 163, 184), start-aligned non-wrapping header labels and centred body cells. RWS: the HS table with centred header labels. PBS, AGPD and PFD: the bare xs table with 1px rgb(148, 163, 184) cell borders, header rgb(203, 213, 225) and 14px/18px cells with padding 4px 6px; PBS and AGPD measure identical, and PFD writes no border prop so its cells have 0px borders (an app-side omission against the PBS standard, merged away). The scenes leave out the bold footer row (ACE), the product image cell and the selected-row tint (HS), the checkbox footnotes (PBS) and repeated rows.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Table`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `paint`: `solid`, `text`
- `profile`: `compact`, `no-padding`
- `scale`: `xs`
- `shape`: `none`
- `color`: `secondary`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Table** — Flat print grid at scale "xs" with "all-cells" borders and no selection. ACE, ADM, HS and RWS override it with shape "none", a text-coloured border, compact profile or smaller 10/12 type. Selector: `[class~="aui-table"]`.
2. **Header** — Header row printed with Model and Load (lb); ACE and ADM paint it muted with a surface foreground, HS and RWS use a secondary solid fill. Selector: `[class~="aui-table-head"]`.
3. **Header cell** — Printed column label without sort controls; its alignment is centre in ACE and RWS and left or start in ADM and HS. Selector: `[class~="aui-table-header-cell"]`.
4. **Body** — The printed rows of the report table. Selector: `[class~="aui-table-body"]`.
5. **Row** — One printed record, Model B-200 with 2,210 lb; HS and RWS switch selectable and expandable off on the row. Selector: `[class~="aui-table-body"] [class~="aui-table-body"] [class~="aui-table-row"]`.
6. **Cell** — Plain printed value; ACE sets 4px by 6px padding with centred text, ADM left-aligns it in the compact profile. Selector: `[class~="aui-table-cell"]`.

## Component layer steps

1. **Table** — Flat print grid at scale "xs" with "all-cells" borders and no selection. ACE, ADM, HS and RWS override it with shape "none", a text-coloured border, compact profile or smaller 10/12 type. Selector: `[class~="aui-table"]`.
2. **Header** — Header row printed with Model and Load (lb); ACE and ADM paint it muted with a surface foreground, HS and RWS use a secondary solid fill. Selector: `[class~="aui-table-head"]`.
3. **Header cell** — Printed column label without sort controls; its alignment is centre in ACE and RWS and left or start in ADM and HS. Selector: `[class~="aui-table-header-cell"]`.
4. **Body** — The printed rows of the report table. Selector: `[class~="aui-table-body"]`.
5. **Row** — One printed record, Model B-200 with 2,210 lb; HS and RWS switch selectable and expandable off on the row. Selector: `[class~="aui-table-row"]`.
6. **Cell** — Plain printed value; ACE sets 4px by 6px padding with centred text, ADM left-aligns it in the compact profile. Selector: `[class~="aui-table-cell"]`.

## Apps

- ACE (`ace`)
- ADM (`adm`)
- HS (`hs`)
- RWS (`rws`)
- PBS (`pbs`)
- PFD (`pfd`)
- AGPD (`agpd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Print table (`ace-print`)

Apps: ACE

In context source: ACE: `src/features/print/ui/report-primitives.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/table/Table-006/example.tsx`

```tsx
import { Table, View } from '../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Connection"
        aui={{ profile: 'no-padding', scale: 'xs', shape: 'none', sx: { width: 'fill', borderColor: 'text' } }}
        border="all-cells"
        scroll="parent"
        selectionMode="none"
      >
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ profile: 'no-padding', scale: 'xs', sx: { paddingInlineStart: '4', paddingInlineEnd: '4', paddingBlockStart: '6', paddingBlockEnd: '6', textAlign: 'center', background: 'muted', foreground: 'surface', whiteSpace: 'normal' } }}>Model</Table.HeaderCell>
            <Table.HeaderCell aui={{ profile: 'no-padding', scale: 'xs', sx: { paddingInlineStart: '4', paddingInlineEnd: '4', paddingBlockStart: '6', paddingBlockEnd: '6', textAlign: 'center', background: 'muted', foreground: 'surface', whiteSpace: 'normal' } }}>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ profile: 'no-padding', scale: 'xs', sx: { paddingInlineStart: '4', paddingInlineEnd: '4', paddingBlockStart: '6', paddingBlockEnd: '6', textAlign: 'center' } }}>Model B-200</Table.Cell>
            <Table.Cell aui={{ profile: 'no-padding', scale: 'xs', sx: { paddingInlineStart: '4', paddingInlineEnd: '4', paddingBlockStart: '6', paddingBlockEnd: '6', textAlign: 'center' } }}>2,210</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/table/Table-006/options/ace-print/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

// ACE report table (print/ui/report-primitives.tsx 11-46, 213-262): an all-cells grid with a text-coloured border and no corner radius, 4px by 6px cells
// centred, and a header band painted muted with surface text. One header row and one data row; the footer row (bold) is left out.
export default function AcePrintScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Connection"
        aui={{ profile: 'no-padding', scale: 'xs', shape: 'none', sx: { width: 'fill', borderColor: 'text' } }}
        border="all-cells"
        scroll="parent"
        selectionMode="none"
      >
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ profile: 'no-padding', scale: 'xs', sx: { paddingInlineStart: '4', paddingInlineEnd: '4', paddingBlockStart: '6', paddingBlockEnd: '6', textAlign: 'center', background: 'muted', foreground: 'surface', whiteSpace: 'normal' } }}>Model</Table.HeaderCell>
            <Table.HeaderCell aui={{ profile: 'no-padding', scale: 'xs', sx: { paddingInlineStart: '4', paddingInlineEnd: '4', paddingBlockStart: '6', paddingBlockEnd: '6', textAlign: 'center', background: 'muted', foreground: 'surface', whiteSpace: 'normal' } }}>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ profile: 'no-padding', scale: 'xs', sx: { paddingInlineStart: '4', paddingInlineEnd: '4', paddingBlockStart: '6', paddingBlockEnd: '6', textAlign: 'center' } }}>Model B-200</Table.Cell>
            <Table.Cell aui={{ profile: 'no-padding', scale: 'xs', sx: { paddingInlineStart: '4', paddingInlineEnd: '4', paddingBlockStart: '6', paddingBlockEnd: '6', textAlign: 'center' } }}>2,210</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

### 2. Dense print table (`adm-print`)

Apps: ADM

In context source: ADM: `src/features/print/components/InputDataPrintPage.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/table/Table-006/options/adm-print/example.tsx`

```tsx
import { Table, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Connection"
        aui={{ profile: 'no-padding', scale: 'xs', shape: 'none', sx: { width: 'fill', borderColor: 'text', textAlign: 'left' } }}
        border="all-cells"
        scroll="parent"
      >
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ profile: 'compact', scale: 'xs', sx: { textAlign: 'left', background: 'muted', foreground: 'surface' } }}>Model</Table.HeaderCell>
            <Table.HeaderCell aui={{ profile: 'compact', scale: 'xs', sx: { textAlign: 'left', background: 'muted', foreground: 'surface' } }}>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ profile: 'compact', scale: 'xs', sx: { textAlign: 'left' } }}>Model B-200</Table.Cell>
            <Table.Cell aui={{ profile: 'compact', scale: 'xs', sx: { textAlign: 'left' } }}>2,210</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/table/Table-006/options/adm-print/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

// ADM input data print page (InputDataPrintPage.tsx 47-90): the same muted header band and text-coloured grid as ACE, with compact xs cells aligned left.
export default function AdmPrintScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Connection"
        aui={{ profile: 'no-padding', scale: 'xs', shape: 'none', sx: { width: 'fill', borderColor: 'text', textAlign: 'left' } }}
        border="all-cells"
        scroll="parent"
      >
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell aui={{ profile: 'compact', scale: 'xs', sx: { textAlign: 'left', background: 'muted', foreground: 'surface' } }}>Model</Table.HeaderCell>
            <Table.HeaderCell aui={{ profile: 'compact', scale: 'xs', sx: { textAlign: 'left', background: 'muted', foreground: 'surface' } }}>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell aui={{ profile: 'compact', scale: 'xs', sx: { textAlign: 'left' } }}>Model B-200</Table.Cell>
            <Table.Cell aui={{ profile: 'compact', scale: 'xs', sx: { textAlign: 'left' } }}>2,210</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

### 3. Band header table (`hs-print`)

Apps: HS

In context source: HS: `src/hs/PrintView.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/table/Table-006/options/hs-print/example.tsx`

```tsx
import { Table, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Connection"
        a11y="table"
        border="all-cells"
        aui={{ scale: 'xs', profile: 'compact', sx: { width: 'fill', fontSize: '10', lineHeight: '12' } }}
        headerCellAui={{ color: 'secondary', paint: 'solid', sx: { textAlign: 'start', whiteSpace: 'nowrap', borderColor: 'secondary' } }}
        cellAui={{ sx: { textAlign: 'center', borderColor: 'secondary' } }}
      >
        <Table.Head>
          <Table.Row data-aui-header-row selectable={false} expandable={false}>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row selectable={false} expandable={false}>
            <Table.Cell>Model B-200</Table.Cell>
            <Table.Cell>2,210</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/table/Table-006/options/hs-print/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

// HS print table (PrintView.tsx 100-190): compact xs cells at 10/12 type, header cells painted secondary solid with start-aligned
// nowrap labels, secondary cell borders and centred cells.
export default function HsPrintScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Connection"
        a11y="table"
        border="all-cells"
        aui={{ scale: 'xs', profile: 'compact', sx: { width: 'fill', fontSize: '10', lineHeight: '12' } }}
        headerCellAui={{ color: 'secondary', paint: 'solid', sx: { textAlign: 'start', whiteSpace: 'nowrap', borderColor: 'secondary' } }}
        cellAui={{ sx: { textAlign: 'center', borderColor: 'secondary' } }}
      >
        <Table.Head>
          <Table.Row data-aui-header-row selectable={false} expandable={false}>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row selectable={false} expandable={false}>
            <Table.Cell>Model B-200</Table.Cell>
            <Table.Cell>2,210</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

### 4. Legacy print grid (`rws-print`)

Apps: RWS

In context source: RWS: `src/legacy/src/apps/rws/containers/PrintView/components/PrintTable.jsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/table/Table-006/options/rws-print/example.tsx`

```tsx
import { Table, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Connection"
        a11y="table"
        border="all-cells"
        aui={{ scale: 'xs', profile: 'compact', sx: { width: 'fill', fontSize: '10', lineHeight: '12' } }}
        headerCellAui={{ color: 'secondary', paint: 'solid', sx: { textAlign: 'center', borderColor: 'secondary' } }}
        cellAui={{ sx: { textAlign: 'center', borderColor: 'secondary' } }}
      >
        <Table.Head>
          <Table.Row data-aui-header-row selectable={false} expandable={false}>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row selectable={false} expandable={false}>
            <Table.Cell>Model B-200</Table.Cell>
            <Table.Cell>2,210</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/table/Table-006/options/rws-print/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

// RWS print table (legacy PrintTable.jsx 1-60): the HS table (compact xs cells at 10/12 type, header cells painted secondary solid, secondary cell borders and centred cells),
// but the header labels are centred, not start-aligned.
export default function RwsPrintScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Connection"
        a11y="table"
        border="all-cells"
        aui={{ scale: 'xs', profile: 'compact', sx: { width: 'fill', fontSize: '10', lineHeight: '12' } }}
        headerCellAui={{ color: 'secondary', paint: 'solid', sx: { textAlign: 'center', borderColor: 'secondary' } }}
        cellAui={{ sx: { textAlign: 'center', borderColor: 'secondary' } }}
      >
        <Table.Head>
          <Table.Row data-aui-header-row selectable={false} expandable={false}>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row selectable={false} expandable={false}>
            <Table.Cell>Model B-200</Table.Cell>
            <Table.Cell>2,210</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

### 5. Grouped print table (`pbs-print`)

Apps: PBS, PFD, AGPD

In context source: PBS: `src/PrintView.tsx`; PFD: `src/pfd/PrintView.tsx`; AGPD: `src/App.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/table/Table-006/options/pbs-print/example.tsx`

```tsx
import { Table, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Connection"
        aui={{ scale: 'xs' }}
        border="all-cells"
        borderStyle="tonal"
      >
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Model B-200</Table.Cell>
            <Table.Cell>2,210</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/table/Table-006/options/pbs-print/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Table, View } from '../../../../../kit';

// PBS print table (PrintView.tsx 61-80), also AGPD (App.tsx 763) and PFD (PrintView.tsx 66): the bare xs table with all-cells borders and the library's default header and cell.
export default function PbsPrintScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Table
        aria-label="Connection"
        aui={{ scale: 'xs' }}
        border="all-cells"
        borderStyle="tonal"
      >
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Load (lb)</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Model B-200</Table.Cell>
            <Table.Cell>2,210</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
