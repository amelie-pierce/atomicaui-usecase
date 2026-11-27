# Select-006: Grouped options

Component family: **Select**

UI type: **Field select**

Source: `src/usecase-gallery/usecases/select/Select-006/usecase.ts`

## What it is

A select whose rows are split into labelled groups: a heading above each run of related options.

## When to choose it

Use it when a long list falls into named families the user scans by heading. Use the plain field select (Select-001) for a flat list.

## Where it belongs

The design fields of the ADC input sections (a product or anchor list split by family) and the grouped lists of the FD settings popover.

## Usage guidance

Label beside (ADC): the Field is a row with the label (nowrap, ellipsis, flex fill, flex-basis half) and a 28px outlined trigger filling the other half; the popup matches the trigger width. Label above (FD): a Field at scale "sm" with the label above a 28px trigger (scale "sm", height 28) that leads with the chosen row's icon, and rows that lead with an icon. In both the Field.SelectList holds Field.SelectGroups, each with a Field.SelectGroupLabel heading and its Field.SelectItems (Field.SelectItemText plus an indicator written with `{null}`). The two differ in the label position, the widths (a 137px trigger beside the label, 280px above it) and the icons. The scenes show the enabled state and leave out the option thumbnails of ADC and the other fields of the section and settings popover; the scene uses a flag icon where FD shows its own icons.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Field`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `surface`
- `paint`: `fixed`, `text`
- `scale`: `sm`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Anatomy parts (gallery ordered by mounted parent and visual reading order)

1. **Field row** — Field written as a row (flexDirection "row", centred, full width) so the Product label and trigger share one line. Selector: `[class~="aui-field"]`. Layer step: **Field row** — Horizontal field shares one line between Product label and trigger.
2. **Label** — The "Product" label that takes half the row (flexBasis "half") and truncates with an ellipsis. Selector: `[class~="aui-field-label"]`. Layer step: **Label** — Product label uses half the row and truncates with ellipsis.
3. **Trigger** — Outlined trigger that fills the other half of the row (flex fill, flexBasis "half"); the FD scene leads it with the chosen row's icon. Selector: `[class~="aui-select-trigger"]`. Layer step: **Trigger** — Trigger fills the other half; FD adds the chosen product icon.
4. **Trigger icon** — The FD variant leads the trigger with a flag for the selected product. Selector: `[class~="aui-select-trigger"] > [class~="aui-contained-icon"]:not([class~="aui-select-chevron"])`. Layer step: **Trigger icon** — FD grouped trigger leads with the chosen product’s flag. Code target: `Field.SelectIcon`.
5. **Value** — Shows the chosen product, "Anchor A1" by default. Selector: `[class~="aui-select-value"]`. Direct text is highlighted.
6. **Chevron** — The chevron at the trigger end. Selector: `[class~="aui-select-chevron"]`. Layer step: **Chevron** — End chevron marks the product trigger as a dropdown.
7. **Popup** — Popup of the trigger width holding two groups, Anchors and Rods. Selector: `[class~="aui-select-popup"]`. Layer step: **Popup** — Popup of the trigger width holding two groups, Anchors and Rods.
8. **List** — The list that stacks the Anchors and Rods groups. Selector: `[class~="aui-select-list"]`. Layer step: **List** — The list that stacks the Anchors and Rods groups.
9. **Group** — One family of related rows: Anchors (Anchor A1, Anchor A2) or Rods (Rod B1). Selector: `[class~="aui-select-group"]`. Layer step: **Group** — Related rows group Anchor A1, Anchor A2, or Rod B1.
10. **Group label** — The heading above each family, "Anchors" and "Rods". Selector: `[class~="aui-select-group-label"]`. Layer step: **Group label** — The heading above each family, "Anchors" and "Rods".
11. **Item** — A product row inside its group; the chosen row is marked by a raised fill. Selector: `[class~="aui-select-item"]`. Layer step: **Item** — Raised fill marks the selected product within its group.
12. **Item icon** — The FD variant places a flag before each grouped product name. Selector: `[class~="aui-select-item"] > [class~="aui-contained-icon"]`. Layer step: **Item icon** — FD places a flag before each grouped product name. Code target: `Field.SelectIcon`.
13. **Item text** — The product name, such as "Anchor A2" or "Rod B1". Selector: `[class~="aui-select-item-text"]`. Layer step: **Item text** — The product name, such as "Anchor A2" or "Rod B1".
14. **Indicator** — Empty slot (`{null}`) at the row end; no check is drawn. Selector: `[class~="aui-select-item-indicator"]`. Layer step: **Indicator** — Empty slot (`{null}`) at the row end; no check is drawn.

## Apps

- ADC (`adc`)
- FD (`fd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Grouped options (`adc-grouped-options`)

Apps: ADC

In context source: ADC: `src/adc/components/DesignField.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/select/Select-006/example.tsx`

```tsx
import { Field } from '../../../kit';

export default function Example() {
  return (
    <Field aui={{ sx: { flexDirection: 'row', alignItems: 'center', width: 'fill' } }}>
      <Field.Label aui={{ sx: { flex: 'fill', flexBasis: 'half', minWidth: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>Product</Field.Label>
      <Field.Select
        defaultValue="a1"
        items={[
          { label: 'Anchor A1', value: 'a1' },
          { label: 'Anchor A2', value: 'a2' },
          { label: 'Rod B1', value: 'b1' },
        ]}
      >
        <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', sx: { flex: 'fill', flexBasis: 'half', minWidth: '0' } }}>
          <Field.SelectValue />
          <Field.SelectChevron />
        </Field.SelectTrigger>
        <Field.SelectPortal>
          <Field.SelectPositioner side="bottom" sideOffset={4}>
            <Field.SelectPopup matchTriggerWidth>
              <Field.SelectList>
                <Field.SelectGroup>
                  <Field.SelectGroupLabel>Anchors</Field.SelectGroupLabel>
                  <Field.SelectItem value="a1">
                    <Field.SelectItemText>Anchor A1</Field.SelectItemText>
                    <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                  </Field.SelectItem>
                  <Field.SelectItem value="a2">
                    <Field.SelectItemText>Anchor A2</Field.SelectItemText>
                    <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                  </Field.SelectItem>
                </Field.SelectGroup>
                <Field.SelectGroup>
                  <Field.SelectGroupLabel>Rods</Field.SelectGroupLabel>
                  <Field.SelectItem value="b1">
                    <Field.SelectItemText>Rod B1</Field.SelectItemText>
                    <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                  </Field.SelectItem>
                </Field.SelectGroup>
              </Field.SelectList>
            </Field.SelectPopup>
          </Field.SelectPositioner>
        </Field.SelectPortal>
      </Field.Select>
    </Field>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/select/Select-006/options/adc-grouped-options/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The grouped design field of ADC (src/adc/components/DesignField.tsx, the groups branch): the label beside a 28px outlined trigger, and a popup whose rows are split into Field.SelectGroups,
// each with a Field.SelectGroupLabel heading. Built open and non-modal (container={host}, positioner ug-anchored). Left out: the option thumbnails of the app and the other fields of the section.
export default function AdcGroupedOptionsScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 14)', inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ sx: { flexDirection: 'row', alignItems: 'center', width: 'fill' } }}>
        <Field.Label aui={{ sx: { flex: 'fill', flexBasis: 'half', minWidth: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>Product</Field.Label>
        <Field.Select open
          defaultValue="a1"
          items={[
            { label: 'Anchor A1', value: 'a1' },
            { label: 'Anchor A2', value: 'a2' },
            { label: 'Rod B1', value: 'b1' },
          ]}
        >
          <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', sx: { flex: 'fill', flexBasis: 'half', minWidth: '0' } }}>
            <Field.SelectValue />
            <Field.SelectChevron />
          </Field.SelectTrigger>
          <Field.SelectPortal container={host}>
            <Field.SelectPositioner side="bottom" sideOffset={4} className="ug-anchored">
              <Field.SelectPopup matchTriggerWidth>
                <Field.SelectList>
                  <Field.SelectGroup>
                    <Field.SelectGroupLabel>Anchors</Field.SelectGroupLabel>
                    <Field.SelectItem value="a1">
                      <Field.SelectItemText>Anchor A1</Field.SelectItemText>
                      <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                    </Field.SelectItem>
                    <Field.SelectItem value="a2">
                      <Field.SelectItemText>Anchor A2</Field.SelectItemText>
                      <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                    </Field.SelectItem>
                  </Field.SelectGroup>
                  <Field.SelectGroup>
                    <Field.SelectGroupLabel>Rods</Field.SelectGroupLabel>
                    <Field.SelectItem value="b1">
                      <Field.SelectItemText>Rod B1</Field.SelectItemText>
                      <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                    </Field.SelectItem>
                  </Field.SelectGroup>
                </Field.SelectList>
              </Field.SelectPopup>
            </Field.SelectPositioner>
          </Field.SelectPortal>
        </Field.Select>
      </Field>
    </View>
  );
}
```

### 2. Flagged grouped select (`fd-grouped-options`)

Apps: FD

In context source: FD: `src/components/SettingsPopover.jsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/select/Select-006/options/fd-grouped-options/example.tsx`

```tsx
import { Field } from '../../../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm', sx: { gap: '3', width: 'fill', minWidth: '0' } }}>
      <Field.Label aui={{ sx: { flex: 'fill', flexBasis: 'half', minWidth: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>Product</Field.Label>
      <Field.Select
        defaultValue="a1"
        items={[
          { label: 'Anchor A1', value: 'a1' },
          { label: 'Anchor A2', value: 'a2' },
          { label: 'Rod B1', value: 'b1' },
        ]}
      >
        <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', scale: 'sm', sx: { width: 'fill', height: '28' } }}>
          <Field.SelectIcon name="flag" aria-hidden />
          <Field.SelectValue />
          <Field.SelectChevron />
        </Field.SelectTrigger>
        <Field.SelectPortal>
          <Field.SelectPositioner side="bottom" sideOffset={4}>
            <Field.SelectPopup matchTriggerWidth>
              <Field.SelectList>
                <Field.SelectGroup>
                  <Field.SelectGroupLabel>Anchors</Field.SelectGroupLabel>
                  <Field.SelectItem value="a1">
                    <Field.SelectIcon name="flag" aria-hidden />
                    <Field.SelectItemText>Anchor A1</Field.SelectItemText>
                    <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                  </Field.SelectItem>
                  <Field.SelectItem value="a2">
                    <Field.SelectIcon name="flag" aria-hidden />
                    <Field.SelectItemText>Anchor A2</Field.SelectItemText>
                    <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                  </Field.SelectItem>
                </Field.SelectGroup>
                <Field.SelectGroup>
                  <Field.SelectGroupLabel>Rods</Field.SelectGroupLabel>
                  <Field.SelectItem value="b1">
                    <Field.SelectIcon name="flag" aria-hidden />
                    <Field.SelectItemText>Rod B1</Field.SelectItemText>
                    <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                  </Field.SelectItem>
                </Field.SelectGroup>
              </Field.SelectList>
            </Field.SelectPopup>
          </Field.SelectPositioner>
        </Field.SelectPortal>
      </Field.Select>
    </Field>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/select/Select-006/options/fd-grouped-options/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The grouped configuration select of FD (src/components/SettingsPopover.jsx ConfigSelect with groups, after ADC DesignField.tsx): the label above a 28px outlined trigger that leads with the chosen row's icon,
// and a popup whose rows are split into Field.SelectGroups with a Field.SelectGroupLabel heading each. Built open and non-modal (container={host}, positioner ug-anchored).
// Left out: the Popover that holds the settings and the other settings fields.
export default function FdGroupedOptionsScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 14)', inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { width: 'fill', minWidth: '0' } }}>
        <Field.Label>Product</Field.Label>
        <Field.Select open
          defaultValue="a1"
          items={[
            { label: 'Anchor A1', value: 'a1' },
            { label: 'Anchor A2', value: 'a2' },
            { label: 'Rod B1', value: 'b1' },
          ]}
        >
          <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', scale: 'sm', sx: { width: 'fill', height: '28' } }}>
            <Field.SelectIcon name="flag" aria-hidden />
            <Field.SelectValue />
            <Field.SelectChevron />
          </Field.SelectTrigger>
          <Field.SelectPortal container={host}>
            <Field.SelectPositioner side="bottom" sideOffset={4} className="ug-anchored">
              <Field.SelectPopup matchTriggerWidth>
                <Field.SelectList>
                  <Field.SelectGroup>
                    <Field.SelectGroupLabel>Anchors</Field.SelectGroupLabel>
                    <Field.SelectItem value="a1">
                      <Field.SelectIcon name="flag" aria-hidden />
                      <Field.SelectItemText>Anchor A1</Field.SelectItemText>
                      <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                    </Field.SelectItem>
                    <Field.SelectItem value="a2">
                      <Field.SelectIcon name="flag" aria-hidden />
                      <Field.SelectItemText>Anchor A2</Field.SelectItemText>
                      <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                    </Field.SelectItem>
                  </Field.SelectGroup>
                  <Field.SelectGroup>
                    <Field.SelectGroupLabel>Rods</Field.SelectGroupLabel>
                    <Field.SelectItem value="b1">
                      <Field.SelectIcon name="flag" aria-hidden />
                      <Field.SelectItemText>Rod B1</Field.SelectItemText>
                      <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                    </Field.SelectItem>
                  </Field.SelectGroup>
                </Field.SelectList>
              </Field.SelectPopup>
            </Field.SelectPositioner>
          </Field.SelectPortal>
        </Field.Select>
      </Field>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
