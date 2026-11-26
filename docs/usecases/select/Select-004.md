# Select-004: Configuration country select

Component family: **Select**

UI type: **Field select**

Source: `src/usecase-gallery/usecases/select/Select-004/usecase.ts`

## What it is

A select in the App Configuration panel whose trigger and rows lead with an icon (the country flag), written as a field with the label above.

## When to choose it

Use it for an app setting that has a recognisable glyph per option, where the chosen option must show its glyph in the closed field. Use the field select (Select-001) when the options carry no icon. The country select of the ACE licence gate is Select-005.

## Where it belongs

The App Configuration of HS, ADC, FD, PFD and RWS (an anchored popover) and ACE (a dialog), for the country, and in HS, ADC and FD also the language and unit fields.

## Usage guidance

A Field at scale "sm", width fill and minWidth 0, with a Field.Label and a Field.Select. The Field.SelectTrigger is color "surface", paint "fixed", scale "sm", width fill and 28px high; it leads with a Field.SelectIcon (the chosen row's icon), then Field.SelectValue and Field.SelectChevron. Each Field.SelectItem leads with a Field.SelectIcon, then Field.SelectItemText and a Field.SelectItemIndicator written with `{null}` (no check). The apps draw the flag with an image (ContainedImage in ACE); the scene uses a flag icon, since the gallery uses kit icons only. The scene shows the enabled state (HS, ADC, FD disable a field with one option) and leaves out the popover or dialog around the field, the other configuration fields, and FD and ADC grouped lists (Select-006).

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Field`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `surface`
- `paint`: `fixed`, `text`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Field** — Field at scale "sm", full width with zero minimum width so it fits the configuration panel. Selector: `[class~="aui-field"]`.
2. **Label** — The "Country" label above the trigger. Selector: `[class~="aui-field-label"]`.
3. **Trigger** — The 28px outlined trigger (scale "sm", color "surface", paint "fixed") that opens the country list. Selector: `[class~="aui-select-trigger"]`.
4. **Trigger icon** — The flag icon that leads the trigger and mirrors the chosen row. Selector: `[class~="aui-select-trigger"] > [class~="aui-contained-icon"]:not([class~="aui-select-chevron"])`.
5. **Value** — Shows "United States", the default country. Selector: `[class~="aui-select-value"]`. Direct text is highlighted.
6. **Chevron** — The chevron at the end of the trigger. Selector: `[class~="aui-select-chevron"]`.
7. **Popup** — Popup of the trigger width, 4px below the trigger, holding three flagged rows. Selector: `[class~="aui-select-popup"]`.
8. **List** — The list of Canada, United States and Mexico rows. Selector: `[class~="aui-select-list"]`.
9. **Item** — A country row with its flag icon, name and an empty indicator slot; the chosen row is marked by a raised fill. Selector: `[class~="aui-select-item"]`.
10. **Item icon** — The flag icon at the start of each row, before the country name. Selector: `[class~="aui-select-item"] > [class~="aui-contained-icon"]`.
11. **Item text** — The country name: Canada, United States or Mexico. Selector: `[class~="aui-select-item-text"]`.
12. **Indicator** — An empty slot (`{null}`) at the end of each row; in this panel the chosen row has no check. Selector: `[class~="aui-select-item-indicator"]`.

## Component layer steps

1. **Field** — Full-width small field fits within the configuration panel. Selector: `[class~="aui-field"]`.
2. **Label** — Country label appears above the trigger in this panel. Selector: `[class~="aui-field-label"]`.
3. **Trigger** — 28px fixed-surface outlined trigger opens the country choices. Selector: `[class~="aui-select-trigger"]`.
4. **Trigger icon** — The flag icon that leads the trigger and mirrors the chosen row. Selector: `[class~="aui-select-trigger"] > [class~="aui-contained-icon"]:not([class~="aui-select-chevron"])`.
5. **Chevron** — The chevron at the end of the trigger. Selector: `[class~="aui-select-chevron"]`.
6. **Popup** — Popup sits 4px below and holds three flagged countries. Selector: `[class~="aui-select-popup"]`.
7. **List** — The list of Canada, United States and Mexico rows. Selector: `[class~="aui-select-list"]`.
8. **Item** — Country row pairs flag, name, and selection state. Selector: `[class~="aui-select-item"]`.
9. **Item icon** — Flag icon appears before each country name in the list. Selector: `[class~="aui-select-item"] > [class~="aui-contained-icon"]`.
10. **Item text** — The country name: Canada, United States or Mexico. Selector: `[class~="aui-select-item-text"]`.
11. **Indicator** — Chosen country uses a raised row without an end check. Selector: `[class~="aui-select-item-indicator"]`.

## Apps

- HS (`hs`)
- ACE (`ace`)
- ADC (`adc`)
- FD (`fd`)
- PFD (`pfd`)
- RWS (`rws`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Configuration select (`hs-configuration-select`)

Apps: HS, ACE, ADC, FD, PFD, RWS

In context source: HS: `src/hs/SettingsPanel.tsx`; ACE: `src/features/app-configuration/ui/AppConfigurationDialog.tsx`; ADC: `src/adc/components/AppConfigurationPopover.tsx`; FD: `src/components/SettingsPopover.jsx`; PFD: `src/pfd/CountrySelection.tsx`; RWS: `src/rws/CountryConfiguration.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/select/Select-004/example.tsx`

```tsx
import { Field } from '../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm', sx: { width: 'fill', minWidth: '0' } }}>
      <Field.Label>Country</Field.Label>
      <Field.Select
        defaultValue="us"
        items={[
          { label: 'Canada', value: 'ca' },
          { label: 'United States', value: 'us' },
          { label: 'Mexico', value: 'mx' },
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
                <Field.SelectItem value="ca">
                  <Field.SelectIcon name="flag" aria-hidden />
                  <Field.SelectItemText>Canada</Field.SelectItemText>
                  <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                </Field.SelectItem>
                <Field.SelectItem value="us">
                  <Field.SelectIcon name="flag" aria-hidden />
                  <Field.SelectItemText>United States</Field.SelectItemText>
                  <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                </Field.SelectItem>
                <Field.SelectItem value="mx">
                  <Field.SelectIcon name="flag" aria-hidden />
                  <Field.SelectItemText>Mexico</Field.SelectItemText>
                  <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                </Field.SelectItem>
              </Field.SelectList>
            </Field.SelectPopup>
          </Field.SelectPositioner>
        </Field.SelectPortal>
      </Field.Select>
    </Field>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/select/Select-004/options/hs-configuration-select/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The configuration select of HS (src/hs/SettingsPanel.tsx ConfigSelect), the same field of ACE (src/features/app-configuration/ui/AppConfigurationDialog.tsx), ADC (src/adc/components/AppConfigurationPopover.tsx),
// FD (src/components/SettingsPopover.jsx), PFD (src/pfd/CountrySelection.tsx) and RWS (src/rws/CountryConfiguration.tsx): a Field with the label above a 28px outlined trigger that leads with the chosen row's icon,
// and rows that each lead with an icon and keep an empty indicator. The apps show a flag image (ACE, PFD, RWS), the scene a flag icon. Built open and non-modal (container={host}, positioner ug-anchored).
// Left out: the Popover or dialog that holds the configuration (an anchored popover in HS, ADC, FD, PFD and RWS, a dialog in ACE) and the other configuration fields; the app disables fields with one option, the scene shows it enabled.
export default function HsConfigurationSelectScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { width: 'fill', minWidth: '0' } }}>
        <Field.Label>Country</Field.Label>
        <Field.Select open
          defaultValue="us"
          items={[
            { label: 'Canada', value: 'ca' },
            { label: 'United States', value: 'us' },
            { label: 'Mexico', value: 'mx' },
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
                  <Field.SelectItem value="ca">
                    <Field.SelectIcon name="flag" aria-hidden />
                    <Field.SelectItemText>Canada</Field.SelectItemText>
                    <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                  </Field.SelectItem>
                  <Field.SelectItem value="us">
                    <Field.SelectIcon name="flag" aria-hidden />
                    <Field.SelectItemText>United States</Field.SelectItemText>
                    <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                  </Field.SelectItem>
                  <Field.SelectItem value="mx">
                    <Field.SelectIcon name="flag" aria-hidden />
                    <Field.SelectItemText>Mexico</Field.SelectItemText>
                    <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                  </Field.SelectItem>
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
