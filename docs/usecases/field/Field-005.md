# Field-005: Textarea

Component family: **Field**

UI type: **Multi-line field**

Source: `src/usecase-gallery/usecases/field/Field-005/usecase.ts`

## What it is

A labelled field with a multi-line outlined box for free text.

## When to choose it

Use it for text of several lines, such as a description or a comment; use the Field-002 text field for one line. Put the label above in a stacked form, beside only in the ADC project info rows, and drop the label only when a placeholder and an aria-label name the box (the AGPD quote notes).

## Where it belongs

All ten apps: the description of the Send feedback form, the ADC project comment and project fields, the AGPD quote notes and the HCS support form.

## Usage guidance

Label above (HCS, HS, PBS, PFD, FD, RWS, ADM, ACE; ADC and AGPD have their own groups below): a Field holds a Field.Label and a Field.Textarea; the Field.Textarea draws its own 1px slate outline with a 4px radius and 3/8 padding, so there is no Field.Control around it. The rows are the only difference between the apps (HS, PFD, RWS, AGPD and PBS five; ACE, ADM and FD seven; HCS four; ADC two), as is the placeholder and resizable="vertical" (no visible change), so they share the scene with five rows. Label beside (ADC): the Field is a row aligned to the start with a 96px end-aligned Field.Label and a Field.Textarea filling the rest. No label (AGPD quote notes): a Field with only a Field.Textarea (rows 4) named by its aria-label and placeholder. The apps show the field enabled. The scenes leave out the required asterisk, the help trigger, the placeholder, the error line (Field-003) and the rest of the form.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Field`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `profile`: `no-padding`
- `paint`: `text`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Field** — Stacked wrapper that pairs the "Description" label with the multi-line box; ADC makes it a row with a 96px label and AGPD drops the label entirely. Selector: `[class~="aui-field"]`.
2. **Label** — The "Description" label above the box; in the AGPD quote notes there is no label and an aria-label names the box. Selector: `[class~="aui-field-label"]`.
3. **Textarea** — The five-row box that draws its own 1px slate outline, 4px radius and 3/8 padding, so no Field.Control surrounds it; it resizes vertically only. Selector: `[class~="aui-textarea"]`.

## Apps

- HCS (`hcs`)
- HS (`hs`)
- PBS (`pbs`)
- PFD (`pfd`)
- FD (`fd`)
- RWS (`rws`)
- AGPD (`agpd`)
- ADM (`adm`)
- ACE (`ace`)
- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Textarea (`hs-textarea`)

Apps: HCS, HS, PBS, PFD, FD, RWS, ADM, ACE

In context source: HCS: `src/components/F01Experience.tsx`; HS: `src/hs/ShellExtras.tsx`; PBS: `src/WorkspaceTools.tsx`; PFD: `src/pfd/ShellDialogs.tsx`; FD: `src/components/Feedback.jsx`; RWS: `src/rws/ShellDialogs.tsx`; ADM: `src/features/top-navigation/components/FeedbackDialog.tsx`; ACE: `src/features/top-navigation/ui/FeedbackDialog.tsx`

Note: Label above.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/field/Field-005/example.tsx`

```tsx
import { Field, View } from '../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field>
        <Field.Label>Description</Field.Label>
        <Field.Textarea rows={5} />
      </Field>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/field/Field-005/options/hs-textarea/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The multi-line field of the Send feedback form of HS (src/hs/ShellExtras.tsx), the same field of PFD, RWS and AGPD (their ShellDialogs.tsx), PBS (src/WorkspaceTools.tsx), ACE, ADM and FD (their feedback dialogs), HCS (src/components/F01Experience.tsx, a bare Textarea) and ADC (src/adc/components/ProjectInfoField.tsx): a Field with the label stacked over a Field.Textarea, which draws its own 1px outlined, 4px radius frame (no Field.Control around it).
// The apps differ only in rows (HS, PFD, RWS, AGPD, PBS five; ACE, ADM and FD seven; HCS four; ADC two), the placeholder and resizable="vertical", none of which changes the look; the scene keeps five rows.
// Left out: the required asterisk, the help trigger beside the label, the placeholder, the error line (Field-003) and the form around it; the apps show the field enabled.
export default function HsScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field>
        <Field.Label>Description</Field.Label>
        <Field.Textarea rows={5} />
      </Field>
    </View>
  );
}
```

### 2. Side label textarea (`adc-textarea-beside`)

Apps: ADC

In context source: ADC: `src/adc/Workspace.tsx`

Note: Label beside: a 96px end-aligned label, the textarea fills the rest of the row.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/field/Field-005/options/adc-textarea-beside/example.tsx`

```tsx
import { Field, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { flexDirection: 'row', alignItems: 'start', gap: '8', width: 'fill' } }}>
        <Field.Label aui={{ sx: { width: '96', textAlign: 'end', flex: 'none' } }}>Comment</Field.Label>
        <Field.Textarea rows={5} aui={{ scale: 'sm', sx: { flex: 'fill', minWidth: '0' } }} />
      </Field>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/field/Field-005/options/adc-textarea-beside/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The Comment row of the project info of ADC (src/adc/Workspace.tsx): a Field row aligned to the start with a 96px end-aligned label and a Field.Textarea filling the rest of the row.
// Left out: the Name and Quantity rows above it; the app shows the field enabled.
export default function AdcBesideScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { flexDirection: 'row', alignItems: 'start', gap: '8', width: 'fill' } }}>
        <Field.Label aui={{ sx: { width: '96', textAlign: 'end', flex: 'none' } }}>Comment</Field.Label>
        <Field.Textarea rows={5} aui={{ scale: 'sm', sx: { flex: 'fill', minWidth: '0' } }} />
      </Field>
    </View>
  );
}
```

### 3. Unlabelled textarea (`agpd-textarea-nolabel`)

Apps: AGPD

In context source: AGPD: `src/agpd/QuoteDialog.tsx`

Note: No label: the box is named by its aria-label and placeholder (the quote notes).

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/field/Field-005/options/agpd-textarea-nolabel/example.tsx`

```tsx
import { Field, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm' }}>
        <Field.Textarea rows={4} placeholder="Add project notes" aria-label="Add project notes" />
      </Field>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/field/Field-005/options/agpd-textarea-nolabel/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The notes box of the quote dialog of AGPD (src/agpd/QuoteDialog.tsx): a Field holding only a Field.Textarea, named by its aria-label and placeholder, with no Field.Label.
// Left out: the other fields of the quote form; the app shows the field enabled.
export default function AgpdScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm' }}>
        <Field.Textarea rows={4} placeholder="Add project notes" aria-label="Add project notes" />
      </Field>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
