# Chip-005: Attachment chip

Component family: **Chip**

UI type: **Dismissible chip**

Source: `src/usecase-gallery/usecases/chip/Chip-005/usecase.ts`

## What it is

A default chip with a name and a dismiss X, one per file the user attached.

## When to choose it

Use it for a value the user added and may remove. Use a Label chip for a read-only tag (Chip-001).

## Where it belongs

The Feedback form of ADM, PFD, PBS, HS, AGPD and RWS, above the upload area (FileUpload-002).

## Usage guidance

`Chip` with default aui, one `Chip.Label` and `Chip.Dismiss` with an aria-label naming the file ("Remove markup.pdf"); `onClick` on the dismiss removes the file. The chips wrap in a flex row (gap 8). The six apps render the same chip, so there is one group; the scene leaves out the upload area and the size errors.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Chip`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `paint`: `text`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Chip** — The default-styled chip that stands for one attached file in the Feedback form of ADM, PFD, PBS, HS, AGPD and RWS. Selector: `[class~="aui-chip"]`.
2. **Label** — The attached file name, screenshot.png. Selector: `[class~="aui-chip-label"]`. Direct text is highlighted.
3. **Dismiss** — The X button at the end, labelled "Remove screenshot.png", that detaches the file. Selector: `[class~="aui-chip-dismiss"]`.

## Component layer steps

1. **Chip** — The default-styled chip that stands for one attached file in the Feedback form of ADM, PFD, PBS, HS, AGPD and RWS. Selector: `[class~="aui-chip"]`.
2. **Dismiss** — The X button at the end, labelled "Remove screenshot.png", that detaches the file. Selector: `[class~="aui-chip-dismiss"]`.

## Apps

- ADM (`adm`)
- PFD (`pfd`)
- PBS (`pbs`)
- HS (`hs`)
- AGPD (`agpd`)
- RWS (`rws`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Feedback attachments (`adm-attachments`)

Apps: ADM, PFD, PBS, HS, AGPD, RWS

In context source: ADM: `src/features/top-navigation/components/FeedbackDialog.tsx`; PFD: `src/pfd/ShellDialogs.tsx`; PBS: `src/WorkspaceTools.tsx`; HS: `src/hs/ShellExtras.tsx`; AGPD: `src/agpd/ShellDialogs.tsx`; RWS: `src/rws/ShellDialogs.tsx`

In context view: Shown.

#### In context structure additions

1. **Attachment heading** — The "Attach Screenshot or Markups" l4 caption above the attached files. Part marker: `data-ug-part="attach-label"`.
2. **Attachment row** — The wrapping flex row (8px gap) that lists one Chip per attached file, such as screenshot.png and markup.pdf. Part marker: `data-ug-part="attachment-row"`.

#### In context layer steps

1. **Attachment heading** — The "Attach Screenshot or Markups" l4 caption above the attached files. Selector: `[data-ug-part="attach-label"]`.
2. **Attachment row** — The wrapping flex row (8px gap) that lists one Chip per attached file, such as screenshot.png and markup.pdf. Selector: `[data-ug-part="attachment-row"]`.
3. **Chip** — The default-styled chip that stands for one attached file in the Feedback form of ADM, PFD, PBS, HS, AGPD and RWS. Selector: `[class~="aui-chip"]`.
4. **Dismiss** — The X button at the end, labelled "Remove screenshot.png", that detaches the file. Selector: `[class~="aui-chip-dismiss"]`.

#### Component UI source — `src/usecase-gallery/usecases/chip/Chip-005/example.tsx`

```tsx
import { Chip } from '../../../kit';

export default function Example() {
  return (
    <Chip>
      <Chip.Label>screenshot.png</Chip.Label>
      <Chip.Dismiss aria-label="Remove screenshot.png" />
    </Chip>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/chip/Chip-005/options/adm-attachments/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Chip, Type, View } from '../../../../../kit';

// Feedback attachments (ADM FeedbackDialog.tsx; PFD, PBS, HS, AGPD and RWS write the same Chip): every attached file is a default Chip with its name and a dismiss X, in a wrapping row with gap 8 above the upload area.
export default function AdmAttachmentsScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }} style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 28))' }}>
      <Type data-ug-part="attach-label" as="span" role="l4">Attach Screenshot or Markups</Type>
      <View data-ug-part="attachment-row" aui={{ paint: 'text', sx: { display: 'flex', flexWrap: 'wrap', gap: '8' } }}>
        {children}
        <Chip>
          <Chip.Label>markup.pdf</Chip.Label>
          <Chip.Dismiss aria-label="Remove markup.pdf" />
        </Chip>
      </View>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
