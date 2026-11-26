# ToggleGroup-001: Labelled segments

Component family: **ToggleGroup**

UI type: **ToggleGroup**

Source: `src/usecase-gallery/usecases/toggle-group/ToggleGroup-001/usecase.ts`

## What it is

A labelled row of full-width segments where exactly one option is on, the chosen one a solid secondary segment.

## When to choose it

Use it to pick one of two to four short options that should stay visible. Use a Select for a longer list and a Switch for on or off.

## Where it belongs

The settings popover of HS (region, units) and the app configuration popover of ADC (src/adc/components/AppConfigurationPopover.tsx).

## Usage guidance

`Field` with a `Field.Label` (its `id` goes to the group's `aria-labelledby`), then `ToggleGroup` with `value={[value]}`, `multiple={false}` and one `ToggleGroup.Item` per option, rendered as a `Button` (color surface, text, xs, shape none, flex "fill", no padding) that holds a `View` whose look follows `state.pressed` (pressed: color secondary, solid, soft; otherwise surface, text, no shape) and a `Type` l5 medium label. HS and ADC render the same segments, so they are one group. The scene shows one setting in the open popover.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Field`, `Popover`, `ToggleGroup`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`, `xs`
- `color`: `secondary`, `surface`
- `paint`: `solid`, `text`
- `shape`: `none`, `soft`
- `profile`: `default`, `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Field** — The wrapper at scale "sm", filling the popover width, that ties the "Units" label to the segment row. Selector: `[class~="aui-field"]`.
2. **Label** — The "Units" label above the segments, referenced by aria-labelledby so the group is named. Selector: `[class~="aui-field-label"]`.
3. **Group** — The single-select group (multiple={false}) with Metric chosen, whose segments share the full width. Selector: `[class~="aui-toggle-group"]`.
4. **Item** — One option, Metric or Imperial, rendered through a text Button at scale "xs" with no padding that flexes to fill. Selector: `[class~="aui-toggle-group"] > button`.
5. **Segment** — The inner span that paints the segment: solid secondary with soft corners when pressed, plain text on surface otherwise. Selector: `[class~="aui-toggle-group"] > button [class~="aui-view"]`.
6. **Option text** — The Metric or Imperial name in a Type role "l5" at medium weight. Selector: `[class~="aui-toggle-group"] > button [data-aui-typeface]`.

## Component layer steps

1. **Field** — Small wrapper spans the popover width, joining Units label to segments. Selector: `[class~="aui-field"]`.
2. **Label** — Units label names the measurement system above the segments. Selector: `[class~="aui-field-label"]`.
3. **Group** — Metric-selected group stretches across the width and allows one choice. Selector: `[class~="aui-toggle-group"]`.
4. **Item** — Metric and Imperial buttons fill the group without internal padding. Selector: `[class~="aui-toggle-group"] > button`.
5. **Segment** — Pressed segment is solid secondary; unpressed segment stays plain. Selector: `[class~="aui-toggle-group"] > button [class~="aui-view"]`.
6. **Option text** — Option name uses medium-weight l5 type at compact scale. Selector: `[class~="aui-toggle-group"] > button [data-aui-typeface]`.

## Apps

- HS (`hs`)
- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Settings popover (`hs-settings`)

Apps: HS, ADC

In context source: HS: `src/hs/SettingsPanel.tsx`; ADC: `src/adc/components/AppConfigurationPopover.tsx`

In context view: Shown.

#### In context structure additions

1. **Settings button** — The text Button labelled Settings that opens the popover under it. Part marker: `data-ug-part="settings-trigger"`.
2. **Settings popover** — The elevated popover, 288px wide, anchored under the trigger that holds one Field per setting. Part marker: `data-ug-part="settings-popover"`.

#### In context layer steps

1. **Settings button** — The text Button labelled Settings that opens the popover under it. Selector: `[data-ug-part="settings-trigger"]`.
2. **Settings popover** — Elevated 288px popover groups one field for each setting. Selector: `[data-ug-part="settings-popover"]`.
3. **Field** — Small wrapper spans the popover width, joining Units label to segments. Selector: `[class~="aui-field"]`.
4. **Label** — Units label names the measurement system above the segments. Selector: `[class~="aui-field-label"]`.
5. **Group** — Metric-selected group stretches across the width and allows one choice. Selector: `[class~="aui-toggle-group"]`.
6. **Item** — Metric and Imperial buttons fill the group without internal padding. Selector: `[class~="aui-toggle-group"] > button`.
7. **Segment** — Pressed segment is solid secondary; unpressed segment stays plain. Selector: `[class~="aui-toggle-group"] > button [class~="aui-view"]`.
8. **Option text** — Option name uses medium-weight l5 type at compact scale. Selector: `[class~="aui-toggle-group"] > button [data-aui-typeface]`.

#### Component UI source — `src/usecase-gallery/usecases/toggle-group/ToggleGroup-001/example.tsx`

```tsx
import { Button, Field, ToggleGroup, Type, View } from '../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm', sx: { width: 'fill', minWidth: '0' } }}>
      <Field.Label id="units-label">Units</Field.Label>
      <ToggleGroup value={['metric']} multiple={false} aria-labelledby="units-label">
        {[['metric', 'Metric'], ['imperial', 'Imperial']].map(([option, content]) => (
          <ToggleGroup.Item
            key={option}
            value={option}
            render={(props, state) => (
              <Button
                {...props}
                aui={{ color: 'surface', paint: 'text', scale: 'xs', shape: 'none', sx: { flex: 'fill', minWidth: '0', paddingInlineStart: '0', paddingInlineEnd: '0', paddingBlockStart: '0', paddingBlockEnd: '0' } }}
              >
                <View
                  as="span"
                  aui={{
                    color: state.pressed ? 'secondary' : 'surface',
                    paint: state.pressed ? 'solid' : 'text',
                    scale: 'xs',
                    shape: state.pressed ? 'soft' : 'none',
                    sx: { flex: 'fill', minWidth: '0', lineHeight: '16', paddingBlockStart: '3', paddingBlockEnd: '3' },
                  }}
                >
                  <Type as="span" role="l5" weight="medium">
                    {content}
                  </Type>
                </View>
              </Button>
            )}
          />
        ))}
      </ToggleGroup>
    </Field>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/toggle-group/ToggleGroup-001/options/hs-settings/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, Popover, View } from '../../../../../kit';

// HS SettingsPanel (src/hs/SettingsPanel.tsx; ADC AppConfigurationPopover.tsx writes the same Field and segments): the settings popover holds one Field per setting, a Field.Label above full-width segments (flex fill, no padding on the Button; the pressed segment is a solid secondary soft View, the others text). The popover is open and anchored under a settings text button; only one setting is shown.
export default function HsSettingsScene({ children, host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Popover open>
        <Popover.Trigger render={<Button data-ug-part="settings-trigger" aui={{ scale: 'sm', paint: 'text', color: 'secondary', shape: 'soft' }} />}>Settings</Popover.Trigger>
        <Popover.Portal container={host}>
          <Popover.Positioner side="bottom" align="start" sideOffset={4} className="ug-anchored">
            <Popover.Popup
              data-ug-part="settings-popover"
              initialFocus={false}
              aria-label="Settings"
              render={<View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '8', width: '288' } }} />}
            >
              {children}
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
