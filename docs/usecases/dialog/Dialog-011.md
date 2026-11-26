# Dialog-011: Form dialog

Component family: **Dialog**

UI type: **Dialog with plain title**

Source: `src/usecase-gallery/usecases/dialog/Dialog-011/usecase.ts`

## What it is

A wide dialog whose Body is one form: a yes/no question, short text fields, a notes Textarea and a SUBMIT button at the end of the row.

## When to choose it

Use it to collect a short request with several inputs that the user submits once. Do not use it for a two-button confirm (AlertDialog-003) or for one field.

## Where it belongs

The Request a quote dialog of AGPD, opened from the plate selection. No other app has a request form of this kind; the feedback form the other apps open is Dialog-009 (Send feedback). Real site source: src/agpd/QuoteDialog.tsx.

## Usage guidance

Dialog.Popup is 840px wide by the --aui-width variable (the stage width here), and Dialog.Title is color "surface" with the Spacer and the close X (Button-031), not the raised Title of the other dialogs. Dialog.Body takes sx overflow "auto" and minHeight "0" and holds a View as "form", a wrapping flex row with gap 24 and alignItems "start". The example is the Dialog frame itself (Popup, surface Title with the close X, scrolling Body with the form View). In context fills the form View with the form column, a View with a column flex, gap 12, flex "fill" and minWidth "256", holding a RadioGroup in a row with its label on a full-width first line and a Yes and a No Radio (an outlined tonal surface when unselected, a solid primary when selected), one Field.Input per text field with a placeholder instead of a label, a Field.Textarea of four rows and a solid secondary soft SUBMIT Button at scale "sm" aligned to the end. The scene leaves out the plate preview that sits beside the form column, the dealer-only Account Number field, the empty-quote and validation messages and the Quote in progress dialog.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Dialog`, `Field`, `Radio`, `RadioGroup`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `primary`, `secondary`, `surface`
- `paint`: `solid`, `text`, `tonal`
- `scale`: `sm`
- `profile`: `no-padding`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Overlay** — The scrim behind the AGPD quote request. Selector: `[class~="aui-dialog-backdrop"]`.
2. **Popup** — The wide quote window, min(840px, 100%) through the --aui-width variable. Selector: `[class~="aui-dialog-popup"]`.
3. **Title bar** — The title bar on the card surface (not raised) reading REQUEST A QUOTE, with only the close X after the spacer. Selector: `[class~="aui-dialog-title"]`.
4. **Title text** — The uppercase words REQUEST A QUOTE in the title bar. Selector: `[class~="aui-dialog-title"]`. Direct text is highlighted.
5. **Close** — The close X labelled "Close REQUEST A QUOTE". Selector: `[class~="aui-dialog-close"]`.
6. **Body** — The scrolling body (overflow auto, minHeight 0) that holds the one wrapping form. Selector: `[class~="aui-dialog-body"]`.
7. **Form** — The View rendered as a form: a wrapping flex row with gap 24 and top alignment, so the plate preview and the form column can sit side by side. Part marker: `data-ug-part="form"`.
8. **Form text** — The p3 placeholder line "The form fields go here." in the Dialog frame. Part marker: `data-ug-part="form-text"`. Direct text is highlighted.

## Component layer steps

1. **Overlay** — The scrim behind the AGPD quote request. Selector: `[class~="aui-dialog-backdrop"]`.
2. **Popup** — The wide quote window, min(840px, 100%) through the --aui-width variable. Selector: `[class~="aui-dialog-popup"]`.
3. **Title bar** — The title bar on the card surface (not raised) reading REQUEST A QUOTE, with only the close X after the spacer. Selector: `[class~="aui-dialog-title"]`.
4. **Close** — The close X labelled "Close REQUEST A QUOTE". Selector: `[class~="aui-dialog-close"]`.
5. **Body** — The scrolling body (overflow auto, minHeight 0) that holds the one wrapping form. Selector: `[class~="aui-dialog-body"]`.
6. **Form** — The View rendered as a form: a wrapping flex row with gap 24 and top alignment, so the plate preview and the form column can sit side by side. Selector: `[data-ug-part="form"]`.

## Apps

- AGPD (`agpd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Request a quote (`agpd-quote`)

Apps: AGPD

In context source: AGPD: `src/agpd/QuoteDialog.tsx`

In context view: Shown.

#### In context structure additions

1. **Form column** — The column with gap 12 and a 256px minimum width that stacks the dealer question, the text fields and the SUBMIT row. Part marker: `data-ug-part="form-column"`.
2. **Dealer question** — The row RadioGroup asking "Are you a Simpson Strong-Tie Dealer ?", label on a full-width first line, defaulting to No. Selector: `[class~="aui-radio-group"]`.
3. **Yes and No radios** — An outlined tonal Radio when unselected and a solid primary one when selected. Selector: `[class~="aui-radio"]`.
4. **Name field** — The Name text input, identified by a placeholder and aria-label instead of a visible label. Selector: `[class~="aui-field"] input`.
5. **Project notes field** — The four-row textarea for "Add project notes and other part requests". Selector: `[class~="aui-field"] textarea`.
6. **Submit button** — The solid secondary soft SUBMIT button at scale sm, end-aligned in its own row. Part marker: `data-ug-part="submit"`.

#### In context layer steps

1. **Form column** — The column with gap 12 and a 256px minimum width that stacks the dealer question, the text fields and the SUBMIT row. Selector: `[data-ug-part="form-column"]`.
2. **Dealer question** — The row RadioGroup asking "Are you a Simpson Strong-Tie Dealer ?", label on a full-width first line, defaulting to No. Selector: `[class~="aui-radio-group"]`.
3. **Yes and No radios** — An outlined tonal Radio when unselected and a solid primary one when selected. Selector: `[class~="aui-radio"]`.
4. **Name field** — The Name text input, identified by a placeholder and aria-label instead of a visible label. Selector: `[class~="aui-field"] input`.
5. **Project notes field** — The four-row textarea for "Add project notes and other part requests". Selector: `[class~="aui-field"] textarea`.
6. **Submit button** — The solid secondary soft SUBMIT button at scale sm, end-aligned in its own row. Selector: `[data-ug-part="submit"]`.
7. **Overlay** — The scrim behind the AGPD quote request. Selector: `[class~="aui-dialog-backdrop"]`.
8. **Popup** — The wide quote window, min(840px, 100%) through the --aui-width variable. Selector: `[class~="aui-dialog-popup"]`.
9. **Title bar** — The title bar on the card surface (not raised) reading REQUEST A QUOTE, with only the close X after the spacer. Selector: `[class~="aui-dialog-title"]`.
10. **Close** — The close X labelled "Close REQUEST A QUOTE". Selector: `[class~="aui-dialog-close"]`.
11. **Body** — The scrolling body (overflow auto, minHeight 0) that holds the one wrapping form. Selector: `[class~="aui-dialog-body"]`.
12. **Form** — The View rendered as a form: a wrapping flex row with gap 24 and top alignment, so the plate preview and the form column can sit side by side. Selector: `[data-ug-part="form"]`.

#### Component UI source — `src/usecase-gallery/usecases/dialog/Dialog-011/example.tsx`

```tsx
import { Dialog, Type, View } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ '--aui-width': 'min(840px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ color: 'surface' }}>
              REQUEST A QUOTE
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close REQUEST A QUOTE" />
            </Dialog.Title>
            <Dialog.Body aui={{ sx: { overflow: 'auto', minHeight: '0' } }}>
              <View data-ug-part="form" as="form" aui={{ paint: 'text', sx: { display: 'flex', flexWrap: 'wrap', gap: '24', alignItems: 'start' } }}>
                <Type data-ug-part="form-text" as="p" role="p3">
                  The form fields go here.
                </Type>
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/dialog/Dialog-011/options/agpd-quote/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, Dialog, Field, Radio, RadioGroup, View } from '../../../../../kit';

const SELECTION = {
  scale: 'sm',
  states: {
    unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
    selected: { color: 'primary', paint: 'solid' },
  },
} as const;

// AGPD Request a quote (src/agpd/QuoteDialog.tsx): a Popup 840px wide (the stage caps it) whose Title sits on the card surface (color "surface", not raised) with only the close X, and a Body that scrolls (overflow auto) holding one wrapping form: the plate preview column and the form column side by side (each flex fill, minWidth 256, so they stack when narrow). Left out: the plate preview column, the dealer-only Account Number field, the validation errors and the Quote in progress dialog that follows a submit.
export default function AgpdQuoteScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ '--aui-width': 'min(840px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ color: 'surface' }}>
              REQUEST A QUOTE
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close REQUEST A QUOTE" />
            </Dialog.Title>
            <Dialog.Body aui={{ sx: { overflow: 'auto', minHeight: '0' } }}>
              <View data-ug-part="form" as="form" aui={{ paint: 'text', sx: { display: 'flex', flexWrap: 'wrap', gap: '24', alignItems: 'start' } }}>
                <View data-ug-part="form-column" aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '12', flex: 'fill', minWidth: '256' } }}>
                  <RadioGroup defaultValue="no" direction="row" aui={{ scale: 'sm', profile: 'no-padding', sx: { flexWrap: 'wrap' } }}>
                    <RadioGroup.Label aui={{ sx: { flexBasis: 'full' } }}>Are you a Simpson Strong-Tie Dealer ?</RadioGroup.Label>
                    <Radio value="yes" aui={SELECTION}>
                      <Radio.Label>Yes</Radio.Label>
                    </Radio>
                    <Radio value="no" aui={SELECTION}>
                      <Radio.Label>No</Radio.Label>
                    </Radio>
                  </RadioGroup>
                  <Field aui={{ scale: 'sm' }}>
                    <Field.Control>
                      <Field.Input placeholder="Name" aria-label="Name" />
                    </Field.Control>
                  </Field>
                  <Field aui={{ scale: 'sm' }}>
                    <Field.Textarea rows={4} placeholder=" Add project notes and other part requests" aria-label="Add project notes and other part requests" />
                  </Field>
                  <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8', justifyContent: 'end' } }}>
                    <Button data-ug-part="submit" type="submit" aui={{ color: 'secondary', paint: 'solid', scale: 'sm', shape: 'soft' }}>
                      SUBMIT
                    </Button>
                  </View>
                </View>
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
