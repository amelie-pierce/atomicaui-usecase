# ToggleGroup-002: Hugging segments

Component family: **ToggleGroup**

UI type: **ToggleGroup**

Source: `src/usecase-gallery/usecases/toggle-group/ToggleGroup-002/usecase.ts`

## What it is

Two segments sized to their labels with no outline of their own, switching the field they sit above.

## When to choose it

Use it to switch the mode of one field next to it. Use the labelled segments (ToggleGroup-001) for a setting with its own label.

## Where it belongs

The fastener switch (STN22 or SDWB) over the Diameter / Style field of AGPD (src/agpd/inputs.tsx).

## Usage guidance

`ToggleGroup` with `aui={{ paint: "text" }}` (no rail border), `value={[value]}`, `multiple={false}` and an `aria-label`; each `ToggleGroup.Item` renders the same Button and pressed-state View as ToggleGroup-001, but the View takes `paddingInlineStart` and `paddingInlineEnd` "6" and no `flex: "fill"`, so each segment hugs its text.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Field`, `ToggleGroup`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `paint`: `text`
- `color`: `surface`
- `scale`: `sm`, `xs`
- `shape`: `none`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Group** — The fastener switch named "Fastener", with STN22 chosen, that sizes to its labels and draws no outline of its own. Selector: `[class~="aui-toggle-group"]`.
2. **Item** — One option, STN22 or SDWB, rendered through a text Button at scale "xs" with zero padding so only the segment shows. Selector: `[class~="aui-toggle-group"] > button`.
3. **Segment** — The span that paints the pressed option solid secondary with soft corners and 6px inline padding, so each segment hugs its label. Selector: `[class~="aui-toggle-group"] > button [class~="aui-view"]`.
4. **Option text** — The fastener name, STN22 or SDWB, in a Type role "l5" at medium weight. Selector: `[class~="aui-toggle-group"] > button [data-aui-typeface]`.
5. **Field below** — The Diameter / Style field that the switch sits above and drives in the AGPD scene. Selector: `[class~="aui-field-control"]`.

## Component layer steps

1. **Group** — STN22-selected fastener group sizes itself to the option labels. Selector: `[class~="aui-toggle-group"]`.
2. **Item** — STN22 and SDWB appear as text buttons without added padding. Selector: `[class~="aui-toggle-group"] > button`.
3. **Segment** — Pressed segment uses soft secondary fill with 6px side padding. Selector: `[class~="aui-toggle-group"] > button [class~="aui-view"]`.
4. **Option text** — Fastener code uses medium-weight l5 type at compact scale. Selector: `[class~="aui-toggle-group"] > button [data-aui-typeface]`.
5. **Field below** — Diameter and Style field sits below the fastener choice. Selector: `[class~="aui-field-control"]`.

## Apps

- AGPD (`agpd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Fastener switch (`agpd-fastener`)

Apps: AGPD

In context source: AGPD: `src/agpd/inputs.tsx`

In context view: Shown.

#### In context structure additions

1. **Diameter and style field** — The Diameter and Style field control, showing 1/4 in, hex head, that the segments sit above and switch. Part marker: `data-ug-part="diameter-field"`.

#### In context layer steps

1. **Diameter and style field** — Field shows 1/4 inch and hex head beneath the segments. Selector: `[data-ug-part="diameter-field"]`.
2. **Group** — STN22-selected fastener group sizes itself to the option labels. Selector: `[class~="aui-toggle-group"]`.
3. **Item** — STN22 and SDWB appear as text buttons without added padding. Selector: `[class~="aui-toggle-group"] > button`.
4. **Segment** — Pressed segment uses soft secondary fill with 6px side padding. Selector: `[class~="aui-toggle-group"] > button [class~="aui-view"]`.
5. **Option text** — Fastener code uses medium-weight l5 type at compact scale. Selector: `[class~="aui-toggle-group"] > button [data-aui-typeface]`.
6. **Field below** — Diameter and Style field sits below the fastener choice. Selector: `[class~="aui-field-control"]`.

#### Component UI source — `src/usecase-gallery/usecases/toggle-group/ToggleGroup-002/example.tsx`

```tsx
import { Button, ToggleGroup, Type, View } from '../../../kit';

export default function Example() {
  return (
    <ToggleGroup aria-label="Fastener" aui={{ paint: 'text' }} value={['2']} multiple={false}>
      {[['2', 'STN22'], ['11', 'SDWB']].map(([value, text]) => (
        <ToggleGroup.Item
          key={value}
          value={value}
          render={(props, state) => (
            <Button
              {...props}
              aui={{ color: 'surface', paint: 'text', scale: 'xs', shape: 'none', sx: { paddingInlineStart: '0', paddingInlineEnd: '0', paddingBlockStart: '0', paddingBlockEnd: '0' } }}
            >
              <View
                as="span"
                aui={{
                  color: state.pressed ? 'secondary' : 'surface',
                  paint: state.pressed ? 'solid' : 'text',
                  scale: 'xs',
                  shape: state.pressed ? 'soft' : 'none',
                  sx: { lineHeight: '16', paddingBlockStart: '3', paddingBlockEnd: '3', paddingInlineStart: '6', paddingInlineEnd: '6' },
                }}
              >
                <Type as="span" role="l5" weight="medium">
                  {text}
                </Type>
              </View>
            </Button>
          )}
        />
      ))}
    </ToggleGroup>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/toggle-group/ToggleGroup-002/options/agpd-fastener/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// AGPD FastenerToggle (src/agpd/inputs.tsx): the STN22 | SDWB segments sit over the Diameter / Style field they switch, with paint "text" so only the field's outline frames them. The segments hug their labels (6px inline padding) instead of filling a wide popover as in HS. The Select is shown as a plain Field.
export default function AgpdFastenerScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '4' } }} style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 20))' }}>
      {children}
      <Field aui={{ scale: 'sm' }}>
        <Field.Control data-ug-part="diameter-field" aria-label="Diameter and style" defaultValue="1/4 in, hex head" />
      </Field>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
