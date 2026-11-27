# Select-005: Licence gate country select

Component family: **Select**

UI type: **Field select**

Source: `src/usecase-gallery/usecases/select/Select-005/usecase.ts`

## What it is

The country select of the licence gate: the same flag-led trigger and rows, with a check on the chosen row.

## When to choose it

Use it to ask for the country in a gate the user must pass before working, where the chosen option must show its glyph in the closed field. Use Select-004 for the same field in the app settings.

## Where it belongs

ACE only: the licence gate that asks for the country before the licence is accepted (src/features/eula/ui/EulaGate.tsx), a repeat of the country field of the App Configuration dialog.

## Usage guidance

The same flag-led trigger and rows as the configuration select, but the trigger states no scale or height and the chosen row ends with a check icon in its indicator (an indicator holding a 16px icon, where the configuration rows hold none). The scene shows the enabled state and leaves out the licence text, the Accept button and the other gate fields.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Dialog`, `Field`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `secondary`, `surface`, `surface-alt`
- `paint`: `fixed`, `solid`, `text`
- `profile`: `no-padding`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Anatomy parts (gallery ordered by mounted parent and visual reading order)

1. **Field** — Field at scale "sm", full width, laid out for the ACE licence gate dialog above the accept checkbox. Selector: `[class~="aui-field"]`. Layer step: **Field** — Small full-width field sits above the licence accept checkbox.
2. **Label** — The "Country" label above the licence gate trigger. Selector: `[class~="aui-field-label"]`. Layer step: **Label** — The "Country" label above the licence gate trigger.
3. **Trigger** — The flag-led outlined trigger in the licence gate; unlike the configuration panel the ACE scene states no scale or height. Selector: `[class~="aui-select-trigger"]`. Layer step: **Trigger** — Flag-led licence trigger uses app-default scale and height.
4. **Trigger icon** — The flag icon that leads the trigger and mirrors the chosen row. Selector: `[class~="aui-select-trigger"] > [class~="aui-contained-icon"]:not([class~="aui-select-chevron"])`. Layer step: **Trigger icon** — The flag icon that leads the trigger and mirrors the chosen row. Code target: `Field.SelectIcon`.
5. **Value** — Shows "United States" as the pre-filled country before the licence is accepted. Selector: `[class~="aui-select-value"]`. Direct text is highlighted.
6. **Chevron** — The chevron at the end of the trigger. Selector: `[class~="aui-select-chevron"]`. Layer step: **Chevron** — The chevron at the end of the trigger.
7. **Popup** — Popup of the trigger width, 4px below the trigger, listing the three countries. Selector: `[class~="aui-select-popup"]`. Layer step: **Popup** — Popup sits 4px below and lists three countries.
8. **List** — The list of Canada, United States and Mexico rows. Selector: `[class~="aui-select-list"]`. Layer step: **List** — The list of Canada, United States and Mexico rows.
9. **Item** — A country row with flag, name and a trailing check slot for the chosen country. Selector: `[class~="aui-select-item"]`. Layer step: **Item** — Country row pairs its flag and name with a trailing check slot.
10. **Item icon** — The flag icon at the start of each row, before the country name. Selector: `[class~="aui-select-item"] > [class~="aui-contained-icon"]`. Layer step: **Item icon** — Flag icon appears before each country name in the list. Code target: `Field.SelectIcon`.
11. **Item text** — The country name: Canada, United States or Mexico. Selector: `[class~="aui-select-item-text"]`. Layer step: **Item text** — The country name: Canada, United States or Mexico.
12. **Indicator** — In the ACE licence gate scene this slot holds a check icon on the chosen row; the base example keeps it empty. Selector: `[class~="aui-select-item-indicator"]`. Layer step: **Indicator** — ACE shows a check here; the base example leaves it empty.
13. **Check icon** — The check drawn at the end of the chosen country row in the ACE scene. Selector: `[class~="aui-select-item-indicator"] [class~="aui-contained-icon"]`. Layer step: **Check icon** — ACE draws a check at the chosen country’s row end.

## Apps

- ACE (`ace`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Licence gate country (`ace-licence-country`)

Apps: ACE

In context source: ACE: `src/features/eula/ui/EulaGate.tsx`

In context view: Shown.

**Context view:** The ACE country select sits inside the licence agreement gate before acceptance.

**Context placement:** In the ACE EulaGate dialog, below the agreement text and above the decline and accept actions.

**Context usage:** The In context view shows the real modal shell, licence copy, country field and paired actions. The country field is required before the user accepts the agreement.

#### In context structure additions

1. **Backdrop** — The dimmed backdrop behind the ACE licence agreement. Selector: `[data-ug-part="licence-backdrop"]`. Layer step: **Backdrop** — The backdrop separates the licence gate from the app beneath it.
2. **Dialog** — The modal licence gate that contains the country requirement and acceptance controls. Selector: `[data-ug-part="licence-dialog"]`. Layer step: **Dialog** — The modal frame contains the agreement and its controls.
3. **Title** — The agreement title and the Do Not Accept close action. Selector: `[data-ug-part="licence-title"]`. Layer step: **Title** — Title names the agreement; the Do Not Accept X follows.
4. **Description** — A short instruction to review and accept before starting ACE. Selector: `[data-ug-part="licence-description"]`. Layer step: **Instruction** — The sentence directs the user to review the agreement before starting ACE.
5. **Agreement body** — The scrollable agreement text and required country field. Selector: `[data-ug-part="licence-body"]`. Layer step: **Agreement body** — The body contains the licence copy followed by the country field.
6. **Agreement text** — The licence terms the user reviews before acceptance. Selector: `[data-ug-part="licence-copy"]`. Layer step: **Agreement text** — The user reviews the displayed licence terms before accepting.
7. **Country field position** — The required country choice sits after the licence text. Selector: `[data-ug-part="licence-country"]`. Layer step: **Country field position** — The country selection follows the licence terms inside the same body.
8. **Dialog actions** — The footer groups the decline and acceptance actions. Selector: `[data-ug-part="licence-actions"]`. Layer step: **Dialog actions** — The footer holds the two ways to leave the gate.
9. **Decline action** — Do Not Accept closes the agreement without accepting it. Selector: `[data-ug-part="decline"]`. Layer step: **Decline action** — Do Not Accept exits without agreeing to the terms.
10. **Accept action** — Accept Application License Agreement completes the gate. Selector: `[data-ug-part="accept"]`. Layer step: **Accept action** — The acceptance button completes the licence gate for ACE users.

#### Component UI source — `src/usecase-gallery/usecases/select/Select-005/example.tsx`

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

#### In context source — `src/usecase-gallery/usecases/select/Select-005/options/ace-licence-country/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dialog, View } from '../../../../../kit';
import { MockLicenceText } from '../../../../../mock-data';

// ACE EulaGate.tsx: the country choice sits in the licence agreement dialog before acceptance.
export default function AceLicenceCountryScene({ children, host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop data-ug-part="licence-backdrop" />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} data-ug-part="licence-dialog" aui={{ scale: 'sm', sx: { width: 'fill', height: 'fill' } }}>
            <Dialog.Title data-ug-part="licence-title" aui={{ scale: 'sm' }}>
              Adhesive Cartridge Estimator: Website Application License Agreement
              <Dialog.Spacer />
              <Dialog.Close aria-label="Do Not Accept" aui={{ scale: 'sm' }} />
            </Dialog.Title>
            <Dialog.Description data-ug-part="licence-description" aui={{ scale: 'sm', sx: { flex: 'none' } }}>
              Review and accept to start using ACE.
            </Dialog.Description>
            <Dialog.Body data-ug-part="licence-body" aui={{ scale: 'sm' }}>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '16', width: 'fill' } }}>
                <div data-ug-part="licence-copy"><MockLicenceText /></div>
                <div data-ug-part="licence-country">{children}</div>
              </View>
            </Dialog.Body>
            <Dialog.Actions data-ug-part="licence-actions" aui={{ scale: 'sm' }}>
              <Dialog.Button data-ug-part="decline" dismiss={false} aui={{ scale: 'sm', color: 'surface-alt', paint: 'solid', shape: 'soft' }}>Do Not Accept</Dialog.Button>
              <Dialog.Button data-ug-part="accept" dismiss={false} aui={{ scale: 'sm', color: 'secondary', paint: 'solid', shape: 'soft' }}>Accept Application License Agreement</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
