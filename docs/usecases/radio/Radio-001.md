# Radio-001: Option radio group

Component family: **Radio**

UI type: **Radio**

Source: `src/usecase-gallery/usecases/radio/Radio-001/usecase.ts`

## What it is

A group of radios under a form label that picks one option among a few named ones: a plate or fastener option, Auto-rotate 3D model Yes or No.

## When to choose it

Use it for one input of a form that is a choice among two to four short, always visible options, with a label. Use Select-001 when the list is longer. The camera projection that sits next to the other view controls is Radio-002.

## Where it belongs

The input panel of AGPD, RWS and PBS (inline radios under a form label, for example a plate or fastener option) and the Auto-rotate 3D model setting in the Settings popover of the FD phone drawer. Real site source: the input fields (AGPD, RWS, PBS) and App.jsx (FD) (the paths are in source).

## Usage guidance

One RadioGroup at scale "sm" with no padding holds the Radios in the tonal outlined selection look (an unselected outlined tonal surface, a solid primary selected), 22px dots with 16px text; the example is the labelled group. Inline (AGPD, RWS, PBS): direction "row", whose RadioGroup.Label is a row (gap 4, width fill) on its own first line, then the Radios with 8 between them. PBS wraps its radios in a flex row with a 12 gap and a 3 column gap under the label, a 4px spacing difference that renders the same, so it is in this group (measured in the gallery). Stacked (FD): the default column direction with a plain RadioGroup.Label above the Yes and No radios, one per line. The scenes leave out the help trigger and lock hint of the label row, the per-radio disabled rule, the label highlighted in error (PBS) and the drawer around the settings popover.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Popover`, `Radio`, `RadioGroup`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `profile`: `default`, `no-padding`
- `color`: `primary`, `surface`, `surface-alt`
- `paint`: `fixed`, `solid`, `text`, `tonal`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Anatomy parts (gallery ordered by mounted parent and visual reading order)

1. **Radio group** — A row of radios (direction "row") with Welded selected by default; the FD Settings popover shows the same group as Yes or No. Selector: `[class~="aui-radio-group"]`. Layer step: **Radio group** — Row group defaults to Welded; FD shows its Yes or No variant.
2. **Group label** — The "Plate connection" form label at the start of the row, laid out as a flex row that fills the width with a gap of 4. Selector: `[class~="aui-radio-group"] > [class~="aui-label"]`. Layer step: **Group label** — Plate connection label starts the full-width row with 4px gap.
3. **Radio** — One option, Welded or Bolted: a tonal surface circle with an outlined border when unselected and a solid primary circle when chosen. Selector: `[class~="aui-radio"]`. Layer step: **Radio** — Welded and Bolted circles use tonal unselected and solid primary selected states.
4. **Indicator** — The circle that shows which option is chosen. Selector: `[class~="aui-radio-indicator"]`. Layer step: **Indicator** — The circle that shows which option is chosen. Code target: `Radio`.
5. **Label** — The option text, Welded or Bolted, beside its circle. Selector: `[class~="aui-control-row"] > [class~="aui-label"]`. Layer step: **Label** — The option text, Welded or Bolted, beside its circle.

## Apps

- AGPD (`agpd`)
- RWS (`rws`)
- PBS (`pbs`)
- FD (`fd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Labelled group (`agpd-inline`)

Apps: AGPD, RWS, PBS

In context source: AGPD: `src/agpd/inputs.tsx`; RWS: `src/rws/inputs.tsx`; PBS: `src/InputFields.tsx`

In context view: Shown.

#### In context structure additions

1. **Input pane** — The soft surface-alt section labelled "Input panel" that holds the plate connection field. Part marker: `data-ug-part="input-pane"`.
2. **Pane title** — The semi-bold "Input" heading at the top of the pane. Part marker: `data-ug-part="input-title"`.

#### Component UI source — `src/usecase-gallery/usecases/radio/Radio-001/example.tsx`

```tsx
import { Radio, RadioGroup } from '../../../kit';

export default function Example() {
  return (
    <RadioGroup defaultValue="welded" direction="row" aui={{ scale: 'sm', profile: 'no-padding' }}>
      <RadioGroup.Label aui={{ sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4', width: 'fill' } }}>Plate connection</RadioGroup.Label>
      <Radio value="welded" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
        <Radio.Label>Welded</Radio.Label>
      </Radio>
      <Radio value="bolted" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
        <Radio.Label>Bolted</Radio.Label>
      </Radio>
    </RadioGroup>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/radio/Radio-001/options/agpd-inline/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Radio, RadioGroup, Type, View } from '../../../../../kit';

// The RadioField of the input panel in AGPD (src/agpd/inputs.tsx) and RWS (src/rws/inputs.tsx), and the RadioChoice of PBS (src/InputFields.tsx), which wraps its radios in a row with a 12 gap instead of 8 and renders the same otherwise: a row RadioGroup at scale "sm" whose label takes the first line (a row with a 4 gap, width fill), then the radios inline.
// Left out: the help trigger and lock hint of the label row, the per-radio disabled rule; the apps show the group enabled.
export default function AgpdInlineScene(_: ContextProps) {
  return (
    <View data-ug-part="input-pane" as="section" aria-label="Input panel" aui={{ color: 'surface-alt', paint: 'fixed', shape: 'soft', profile: 'default' }}>
      <Type data-ug-part="input-title" as="h2" role="l3" weight="semi-bold">Input</Type>
      <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 20))' }}>
        <RadioGroup defaultValue="welded" direction="row" aui={{ scale: 'sm', profile: 'no-padding' }}>
          <RadioGroup.Label aui={{ sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4', width: 'fill' } }}>Plate connection</RadioGroup.Label>
          <Radio value="welded" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
            <Radio.Label>Welded</Radio.Label>
          </Radio>
          <Radio value="bolted" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
            <Radio.Label>Bolted</Radio.Label>
          </Radio>
        </RadioGroup>
      </View>
    </View>
  );
}
```

### 2. Settings popover radios (`fd-settings`)

Apps: FD

In context source: FD: `src/App.jsx`

In context view: Shown.

#### In context structure additions

1. **Settings button** — The Settings Button that opens the popover under it. Part marker: `data-ug-part="settings-trigger"`.
2. **Settings popover** — The elevated popover that holds the settings, here the Auto-rotate 3D model group. Part marker: `data-ug-part="settings-popup"`.
3. **Settings title** — The semi-bold "Settings" heading at the top of the popover. Part marker: `data-ug-part="settings-title"`.

#### Component UI source — `src/usecase-gallery/usecases/radio/Radio-001/options/fd-settings/example.tsx`

```tsx
import { Radio, RadioGroup } from '../../../../../kit';

export default function Example() {
  return (
    <RadioGroup defaultValue="welded" direction="row" aui={{ scale: 'sm', profile: 'no-padding' }}>
      <RadioGroup.Label aui={{ sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4', width: 'fill' } }}>Plate connection</RadioGroup.Label>
      <Radio value="welded" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
        <Radio.Label>Welded</Radio.Label>
      </Radio>
      <Radio value="bolted" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
        <Radio.Label>Bolted</Radio.Label>
      </Radio>
    </RadioGroup>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/radio/Radio-001/options/fd-settings/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, Popover, Radio, RadioGroup, Type, View } from '../../../../../kit';

// The SettingRadios of FD (src/App.jsx, the Auto-rotate 3D model row of the phone drawer's Settings popover): a column RadioGroup with a plain RadioGroup.Label above stacked Yes and No radios in the shared selection look.
// Left out: the other settings and the drawer; the app shows the group enabled.
export default function FdSettingsScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Popover open modal={false}>
        <Popover.Trigger render={<Button data-ug-part="settings-trigger">Settings</Button>} />
        <Popover.Portal container={host}>
          <Popover.Positioner side="bottom" sideOffset={4} className="ug-anchored">
            <Popover.Popup data-ug-part="settings-popup" initialFocus={false} aria-label="Settings" render={<View as="section" aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4 }} />}>
              <Type data-ug-part="settings-title" as="h2" role="l3" weight="semi-bold">Settings</Type>
              <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 20))' }}>
                <RadioGroup defaultValue="true">
                  <RadioGroup.Label>Auto-rotate 3D model</RadioGroup.Label>
                  <Radio value="true" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
                    <Radio.Label>Yes</Radio.Label>
                  </Radio>
                  <Radio value="false" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
                    <Radio.Label>No</Radio.Label>
                  </Radio>
                </RadioGroup>
              </View>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
