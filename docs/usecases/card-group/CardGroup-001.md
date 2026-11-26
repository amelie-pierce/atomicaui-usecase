# CardGroup-001: Selectable template cards

Component family: **CardGroup**

UI type: **CardGroup**

Source: `src/usecase-gallery/usecases/card-group/CardGroup-001/usecase.ts`

## What it is

A labelled grid of image cards with a search and a view toggle, where one card is selected.

## When to choose it

Use it to choose one item from a set that is recognised by picture, with search for a long set. Use a RadioGroup for a short text list.

## Where it belongs

The User Templates section of the ADC New Project dialog (src/adc/components/NewProjectDialog.tsx).

## Usage guidance

`CardGroup` with `value` and `onValueChange` (a string or null), a `CardGroup.Label`, a `CardGroup.Toolbar` holding `CardGroup.Search` and `CardGroup.ViewToggle`, `CardGroup.Items` (`columns`, `maxHeight`) of `CardGroup.Item`s (`value`, `textValue`, `shape: "none"`, per-state `aui`: unselected surface tonal with an outlined border, selected primary tonal that returns the surface fill) each with `CardGroup.ItemImage` (`ratio="4:3"`) and `CardGroup.ItemBody` > `CardGroup.ItemTitle`, and `CardGroup.Empty` for no match. The example shows two columns; the app shows four with a fixed section height. The scene leaves out the dropzone and the warning.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `CardGroup`, `Dialog`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `profile`: `no-padding`
- `shape`: `none`
- `color`: `primary`, `raised`, `surface`
- `paint`: `tonal`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Card group** — Selection group of template cards with template-1 selected through defaultValue; the ADC scene hosts it in the New Project dialog body. Selector: `[class~="aui-card-group"]`.
2. **Label** — Semi-bold heading "User Templates" above the toolbar. Selector: `[class~="aui-card-group"] [class~="aui-label"]`.
3. **Toolbar** — Row above the cards that holds the search and the view toggle. Selector: `[class~="aui-card-group-toolbar"]`.
4. **Search** — Search field with the placeholder "Search template". Selector: `[class~="aui-card-group-search"]`.
5. **View toggle** — Switch between card and list view of the templates. Selector: `[class~="aui-card-group-view-toggle"]`.
6. **Items** — Two-column grid with no gap that lays out Template 1 and Template 2. Selector: `[class~="aui-card-group-items"]`.
7. **Item** — A selectable template card with shape "none"; the selected one is primary tonal on a surface background, the others a tonal surface with an outlined border. Selector: `[class~="aui-card-group-item"]`.
8. **Item image** — 4:3 thumbnail at the top of each template card. Selector: `[class~="aui-card-group-item-image"]`.
9. **Item body** — Area under the thumbnail that carries the template name. Selector: `[class~="aui-card-group-item-body"]`.
10. **Item title** — Centred template name, Template 1 or Template 2. Selector: `[class~="aui-card-group-item-title"]`.
11. **Empty** — Message "No templates match your search" shown over the grid when the search filters everything out. Selector: `[class~="aui-card-group-empty"]`.

## Apps

- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. New project templates (`adc-new-project`)

Apps: ADC

In context source: ADC: `src/adc/components/NewProjectDialog.tsx`

In context view: Shown.

#### In context structure additions

1. **New Project dialog** — The Dialog popup titled New Project that hosts the template picker. Selector: `[class~="aui-dialog-popup"]`.
2. **New Project title bar** — The raised Dialog.Title reading "New Project", with the Close button at its end. Selector: `[class~="aui-dialog-title"]`.
3. **Close button** — The X Dialog.Close (aria-label "Close") that dismisses the dialog. Selector: `[class~="aui-dialog-close"]`.
4. **New Project body** — The Dialog.Body that ends with the User Templates card group (the import dropzone and clear-designs warning above it are left out). Selector: `[class~="aui-dialog-body"]`.

#### Component UI source — `src/usecase-gallery/usecases/card-group/CardGroup-001/example.tsx`

```tsx
import { CardGroup } from '../../../kit';
import { MOCK_IMAGE_SRC } from '../../../mock-data';

export default function Example() {
  return (
    <CardGroup defaultValue="template-1">
      <CardGroup.Label aui={{ sx: { typographyStyle: 'semi-bold' } }}>User Templates</CardGroup.Label>
      <CardGroup.Toolbar>
        <CardGroup.Search placeholder="Search template" />
        <CardGroup.ViewToggle />
      </CardGroup.Toolbar>
      <CardGroup.Items columns={2} aui={{ scale: 'sm', profile: 'no-padding', sx: { gap: '0' } }}>
        {['Template 1', 'Template 2'].map((name, index) => (
          <CardGroup.Item
            key={name}
            value={`template-${index + 1}`}
            textValue={name}
            aui={{
              shape: 'none',
              states: {
                unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
                selected: { color: 'primary', paint: 'tonal', sx: { background: 'surface', foreground: 'on-surface' } },
              },
            }}
          >
            <CardGroup.ItemImage src={MOCK_IMAGE_SRC} alt="" ratio="4:3" />
            <CardGroup.ItemBody>
              <CardGroup.ItemTitle aui={{ sx: { textAlign: 'center' } }}>{name}</CardGroup.ItemTitle>
            </CardGroup.ItemBody>
          </CardGroup.Item>
        ))}
      </CardGroup.Items>
      <CardGroup.Empty>No templates match your search</CardGroup.Empty>
    </CardGroup>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/card-group/CardGroup-001/options/adc-new-project/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog } from '../../../../../kit';

// ADC NewProjectDialog (src/adc/components/NewProjectDialog.tsx): the New Project dialog (raised Title with close X, a Body) ends its Body with the User Templates CardGroup under the import dropzone and the clear-designs warning (left out).
export default function AdcNewProjectScene({ children, host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              New Project
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close" />
            </Dialog.Title>
            <Dialog.Body>
              {children}
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
