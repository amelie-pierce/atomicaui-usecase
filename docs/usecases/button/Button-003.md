# Button-003: Reset to default button

Component family: **Button**

UI type: **Single button**

Source: `src/usecase-gallery/usecases/button/Button-003/usecase.ts`

## What it is

A raised solid Button resets one field group to its default without leaving the form.

## When to choose it

Use it for a helper that acts on part of a form. It sits slightly darker than the default gray so it still reads on a gray panel.

## Where it belongs

Next to a group of inputs in a side panel: Reset to default. Real site source: HCS, the only live use of color "raised". Built from the Beam Properties section in src/App.tsx (lines 1131-1320).

## Usage guidance

Set aui scale "sm", paint "solid", color "raised" and shape "soft", with Button.Icon arrow-rotate-left before the label. In context it is the Beam Properties section of the Input pane: one beam column cut to the Fc perp field with the button below it. The button is left-aligned and as wide as its label (the app's `.hcs-material-strength` rule, here an alignSelf start wrapper); the app has it in both beam columns, with the beam type, species, SG, width and depth fields around it and the other sections above. The field value is sample data.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Accordion`, `Button`, `Symbol`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `paint`: `fixed`, `solid`, `text`
- `color`: `raised`, `surface`, `surface-alt`
- `shape`: `none`, `soft`
- `profile`: `block-padding`, `default`, `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Anatomy parts (gallery ordered by mounted parent and visual reading order)

1. **Container** — The Reset to default Button: small, solid, raised color with a soft shape, placed beside a group of beam property inputs in a side panel. Selector: `[class~="aui-button"]`. Layer step: **Container** — Small raised Reset to default sits below the beam input.
2. **Icon** — The counter-clockwise arrow that signals returning the group to its defaults. Selector: `[class~="aui-button"] > :is([class~="aui-contained-icon"], [class~="aui-icon"])`. Layer step: **Icon** — The counter-clockwise arrow that signals returning the group to its defaults.
3. **Label** — The text "Reset to default" naming what the Button restores. Selector: `[class~="aui-button"]`. Direct text is highlighted.

## Apps

- HCS (`hcs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Raised solid with icon (`default`)

Apps: HCS

In context source: HCS: `src/App.tsx`

In context view: Shown.

#### In context structure additions

1. **Input pane** — The narrow Input aside that holds the form sections. Part marker: `data-ug-part="input-pane"`. Layer step: **Input pane** — The narrow Input aside that holds the form sections.
2. **Beam Properties section** — The open "Beam Properties" Accordion item with its layer-group icon and chevron, holding the Fc perp number field (650 psi) with Reset to default below it. Part marker: `data-ug-part="beam-section"`. Layer step: **Beam Properties section** — Open Beam Properties item contains the 650 psi field and reset action.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-003/example.tsx`

```tsx
import { Button } from '../../../kit';

export default function Example() {
  return (
    <Button aui={{ scale: 'sm', paint: 'solid', color: 'raised', shape: 'soft' }}>
      <Button.Icon name="arrow-rotate-left" />
      Reset to default
    </Button>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-003/options/default/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Accordion, Symbol, Type, View } from '../../../../../kit';
import { MockNumberField } from '../../../../../mock-data';

// The Beam Properties section of the Input pane (App.tsx lines 1131-1320) cut to one beam column and the one field Reset to default
// belongs to: the Fc perp number field with Reset to default below it (left-aligned, as wide as its label: the app's
// `.hcs-material-strength > button` rule, here an alignSelf start wrapper). The app has the button in both beam columns.
export default function FormContext({ children }: ContextProps) {
  return (
    <View
      as="aside"
      data-ug-part="input-pane"
      aria-label="Input"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0', gap: '0' } }}
      style={{ inlineSize: 'min(100%, 280px)' }}
    >
      <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', overflow: 'hidden', gap: '0' } }}>
        <Accordion defaultValue={['Beam Properties']} aui={{ scale: 'sm' }}>
          <Accordion.Item data-ug-part="beam-section" value="Beam Properties" aui={{ color: 'surface', scale: 'sm', shape: 'none' }}>
            <Accordion.Header>
              <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                <Accordion.Icon name="layer-group" weight="regular" aria-hidden />
                <Type role="l4" weight="semi-bold">Beam Properties</Type>
                <Accordion.Chevron />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel aui={{ profile: 'default' }}>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '4', minWidth: '0' } }}>
                <MockNumberField label={<span><Type as="span">Fc</Type><Symbol script="subscript">perp</Symbol></span>} value="650" unit="psi" />
                <View aui={{ paint: 'text', profile: 'no-padding', sx: { alignSelf: 'start' } }}>
                  {children}
                </View>
              </View>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </View>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
