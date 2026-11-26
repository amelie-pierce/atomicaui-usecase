# Dialog-012: Content-only expanded dialog

Component family: **Dialog**

UI type: **Dialog without title**

Source: `src/usecase-gallery/usecases/dialog/Dialog-012/usecase.ts`

## What it is

A dialog with no title and no close X: the popup is square, has no padding and fills the screen, and holds content that brings its own controls.

## When to choose it

Use it to enlarge a panel the user is already working in to the whole screen, where the content keeps its own toolbar with the way back. If the dialog needs its own name or close X, use one with a title bar (Dialog-001, Dialog-005).

## Where it belongs

HS Output panel (src/hs/OutputTabs.tsx): the expand control of the Output pane moves the same tabs and table into a full-screen dialog, and the toolbar inside the content collapses it.

## Usage guidance

A Dialog.Popup with aria-label (it has no Title to name it) and aui shape "none", profile "no-padding" and sx width "fill", height "fill" and gap "0", holding the content directly: there is no Dialog.Title, Dialog.Close or Dialog.Body. A different structure from Dialog-005, which also fills the screen but has a raised Title with a close X and a padded Body (measured: Dialog-005 has a 28px title bar, this one starts with its content at the popup edge). HS renders the content in place while the dialog is closed and inside the popup while open, so the same panel is reused. In the scene a toolbar line and one table row stand for the Output tabs; the stage caps the popup, the app uses the whole viewport.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Dialog`, `Table`, `Type`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `shape`: `none`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Overlay** — The scrim behind the expanded HS Output view. Selector: `[class~="aui-dialog-backdrop"]`.
2. **Popup** — The square, no-padding popup that fills the screen with a zero gap; with no Title it is named by aria-label "Expanded Output". Selector: `[class~="aui-dialog-popup"]`.
3. **Content text** — The p3 line that stands for the content and its own toolbar (the scene reads "Output toolbar"). Part marker: `data-ug-part="content-text"`. Direct text is highlighted.

## Component layer steps

1. **Overlay** — The scrim behind the expanded HS Output view. Selector: `[class~="aui-dialog-backdrop"]`.
2. **Popup** — The square, no-padding popup that fills the screen with a zero gap; with no Title it is named by aria-label "Expanded Output". Selector: `[class~="aui-dialog-popup"]`.

## Apps

- HS (`hs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Expanded output (`hs-expanded-output`)

Apps: HS

In context source: HS: `src/hs/OutputTabs.tsx`

In context view: Shown.

#### In context structure additions

1. **Output table** — The table labelled "Output" that stands for the Output tabs; the popup places it straight at the edge. Selector: `[class~="aui-table"]`.
2. **Column heading** — The single "Load" column heading. Selector: `[class~="aui-table-header-cell"]`.
3. **Value cell** — The "Dead" value cell of the one row. Selector: `[class~="aui-table-cell"]`.

#### In context layer steps

1. **Output table** — The table labelled "Output" that stands for the Output tabs; the popup places it straight at the edge. Selector: `[class~="aui-table"]`.
2. **Column heading** — The single "Load" column heading. Selector: `[class~="aui-table-header-cell"]`.
3. **Value cell** — The "Dead" value cell of the one row. Selector: `[class~="aui-table-cell"]`.
4. **Overlay** — The scrim behind the expanded HS Output view. Selector: `[class~="aui-dialog-backdrop"]`.
5. **Popup** — The square, no-padding popup that fills the screen with a zero gap; with no Title it is named by aria-label "Expanded Output". Selector: `[class~="aui-dialog-popup"]`.

#### Component UI source — `src/usecase-gallery/usecases/dialog/Dialog-012/example.tsx`

```tsx
import { Dialog, Type } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aria-label="Expanded Output" aui={{ shape: 'none', profile: 'no-padding', sx: { width: 'fill', height: 'fill', gap: '0' } }}>
            <Type data-ug-part="content-text" as="p" role="p3">
              The content, with its own toolbar, goes here.
            </Type>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/dialog/Dialog-012/options/hs-expanded-output/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog, Table, Type } from '../../../../../kit';

// HS expanded Output (src/hs/OutputTabs.tsx, with the in-page expand of Output.jsx): the same content as the page, moved into a Dialog.Popup with no Title and no close X, square
// (shape "none"), no-padding and filling the screen (width and height fill, gap 0); the app's toolbar inside the content collapses it. Here a plain toolbar line and one table row stand for it.
export default function HsExpandedOutputScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aria-label="Expanded Output" aui={{ shape: 'none', profile: 'no-padding', sx: { width: 'fill', height: 'fill', gap: '0' } }}>
            <Type data-ug-part="content-text" as="p" role="p3">
              Output toolbar
            </Type>
            <Table aria-label="Output">
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell>Load</Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Dead</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
