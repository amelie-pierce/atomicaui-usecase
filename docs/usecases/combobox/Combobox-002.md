# Combobox-002: Select with option preview

Component family: **Combobox**

UI type: **Combobox**

Source: `src/usecase-gallery/usecases/combobox/Combobox-002/usecase.ts`

## What it is

A compact Combobox whose open list previews the highlighted option in a card beside it.

## When to choose it

Use it when an option is easier to choose from a picture. Use the searchable select (Combobox-001) when the list only needs filtering.

## Where it belongs

The Type and Supported type fields of the HCS Input pane (src/components/HcsBeamTypeSelect.tsx).

## Usage guidance

`Combobox` with `items`, `value`, `open`, `onOpenChange`, `onValueChange` and `onItemHighlighted`; `Combobox.InputGroup` at `scale: "sm"` (`color: "surface"`, `paint: "fixed"`, 28px tall) with `Combobox.Input` and the chevron `Combobox.Trigger`; the `Combobox.Popup` takes `matchTriggerWidth` and `maxHeight="20rem"`. A `Popover` anchored to the popup shows the preview Card (Card-003) after a 150ms pause on an option. The scene sets the Card in a row beside the open list instead of a floating Popover.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Card`, `Combobox`, `ContainedImage`, `Field`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `surface`
- `paint`: `fixed`, `solid`, `text`
- `profile`: `no-padding`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Field** — Field at scale "sm" with a 3 gap that stacks the Type label above the combobox. Selector: `[class~="aui-field"]`.
2. **Label** — The "Type" label above the input group. Selector: `[class~="aui-field-label"]`.
3. **Input group** — Input group at scale "sm" (color "surface", paint "fixed"), 28px high, matching the other Input pane fields. Selector: `[class~="aui-combobox-input-group"]`.
4. **Input** — The type field showing "Glulam"; it filters Glulam, Solid Sawn and Parallel Strand Lumber as the user types. Selector: `[class~="aui-combobox-input"]`.
5. **Trigger** — The "Open Type" button at the end of the group that opens the list. Selector: `[class~="aui-combobox-trigger"]`.
6. **Icon** — The chevron-down glyph in the monotone layer at scale "sm". Selector: `[class~="aui-combobox-icon"]`.
7. **Popup** — Popup of the trigger width capped at 20rem high, aligned to the start of the group. Selector: `[class~="aui-combobox-popup"]`.
8. **List** — The list that renders one row per timber type. Selector: `[class~="aui-combobox-list"]`.
9. **Item** — A timber type row at scale "sm"; highlighting one previews it in the card beside the list. Selector: `[class~="aui-combobox-item"]`.

## Component layer steps

1. **Field** — Small field stacks Type above the picker with a 3px gap. Selector: `[class~="aui-field"]`.
2. **Label** — The "Type" label above the input group. Selector: `[class~="aui-field-label"]`.
3. **Input group** — Small fixed-surface row matches the Input pane’s 28px fields. Selector: `[class~="aui-combobox-input-group"]`.
4. **Input** — Glulam field filters three timber types as the user types. Selector: `[class~="aui-combobox-input"]`.
5. **Trigger** — End button labelled Open Type reveals the list. Selector: `[class~="aui-combobox-trigger"]`.
6. **Icon** — The chevron-down glyph in the monotone layer at scale "sm". Selector: `[class~="aui-combobox-icon"]`.
7. **Popup** — Popup aligns with the group start and caps height at 20rem. Selector: `[class~="aui-combobox-popup"]`.
8. **List** — The list that renders one row per timber type. Selector: `[class~="aui-combobox-list"]`.
9. **Item** — Highlighted timber row previews its type in the adjacent card. Selector: `[class~="aui-combobox-item"]`.

## Apps

- HCS (`hcs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Beam type (`hcs-beam-type`)

Apps: HCS

In context source: HCS: `src/components/HcsBeamTypeSelect.tsx`

In context view: Shown.

#### In context structure additions

1. **Preview card** — The 224px elevated Card beside the open list that previews the highlighted timber type (the app shows it in a side Popover). Selector: `[class~="aui-card"]`.
2. **Preview title** — The type name, Glulam, shown above the preview picture. Selector: `[class~="aui-card-title"]`.

#### In context layer steps

1. **Preview card** — Elevated 224px card previews the highlighted timber type beside the list. Selector: `[class~="aui-card"]`.
2. **Preview title** — The type name, Glulam, shown above the preview picture. Selector: `[class~="aui-card-title"]`.
3. **Field** — Small field stacks Type above the picker with a 3px gap. Selector: `[class~="aui-field"]`.
4. **Label** — The "Type" label above the input group. Selector: `[class~="aui-field-label"]`.
5. **Input group** — Small fixed-surface row matches the Input pane’s 28px fields. Selector: `[class~="aui-combobox-input-group"]`.
6. **Input** — Glulam field filters three timber types as the user types. Selector: `[class~="aui-combobox-input"]`.
7. **Trigger** — End button labelled Open Type reveals the list. Selector: `[class~="aui-combobox-trigger"]`.
8. **Icon** — The chevron-down glyph in the monotone layer at scale "sm". Selector: `[class~="aui-combobox-icon"]`.
9. **Popup** — Popup aligns with the group start and caps height at 20rem. Selector: `[class~="aui-combobox-popup"]`.
10. **List** — The list that renders one row per timber type. Selector: `[class~="aui-combobox-list"]`.
11. **Item** — Highlighted timber row previews its type in the adjacent card. Selector: `[class~="aui-combobox-item"]`.

#### Component UI source — `src/usecase-gallery/usecases/combobox/Combobox-002/example.tsx`

```tsx
import { Combobox, Field } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
      <Field.Label aui={{ scale: 'sm' }}>Type</Field.Label>
      <Combobox items={['Glulam', 'Solid Sawn', 'Parallel Strand Lumber']} defaultValue="Glulam" open modal={false}>
        <Combobox.InputGroup aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { height: '28', minHeight: '28' } }}>
          <Combobox.Input aria-label="Type" aui={{ scale: 'sm' }} />
          <Combobox.Trigger aria-label="Open Type" aui={{ scale: 'sm' }}>
            <Combobox.Icon name="chevron-down" layer="monotone" aui={{ scale: 'sm' }} />
          </Combobox.Trigger>
        </Combobox.InputGroup>
        <Combobox.Portal container={host}>
          <Combobox.Positioner sideOffset={4} align="start" className="ug-anchored">
            <Combobox.Popup matchTriggerWidth maxHeight="20rem" aui={{ scale: 'sm' }}>
              <Combobox.List>
                {(option: string) => (
                  <Combobox.Item key={option} value={option} aui={{ scale: 'sm' }}>
                    {option}
                  </Combobox.Item>
                )}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox>
    </Field>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/combobox/Combobox-002/options/hcs-beam-type/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Card, ContainedImage, View } from '../../../../../kit';
import { MOCK_IMAGE_SRC } from '../../../../../mock-data';

// HCS HcsBeamTypeSelect (src/components/HcsBeamTypeSelect.tsx): the Type Combobox in the Input pane; while its list is open, the highlighted option previews in a Card (Card-003) in a Popover to the side of the list (side right, 8px offset). The scene sets the Card in a row beside the open list instead of a floating Popover.
export default function HcsBeamTypeScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'start', gap: '8' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 18)', inlineSize: 'min(100%, calc(var(--p-px-16) * 32))' }}>
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { width: '224', flex: 'none' } }}>
        {children}
      </View>
      <Card aui={{ scale: 'sm', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, sx: { width: '224', marginBlockStart: '64' } }}>
        <Card.Body aui={{ scale: 'sm' }}>
          <Card.Title>Glulam</Card.Title>
          <ContainedImage src={MOCK_IMAGE_SRC} alt="Generic illustration of Glulam" fit="contain" ratio="4:3" />
        </Card.Body>
      </Card>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
