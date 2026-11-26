# Chip-001: Solid release label

Component family: **Chip**

UI type: **Label chip**

Source: `src/usecase-gallery/usecases/chip/Chip-001/usecase.ts`

## What it is

A small solid label that names the kind of an item, coloured by meaning: success for a feature, warning for an improvement.

## When to choose it

Use it to tag an item with a short word in a list. Use a tonal Status chip for a state (Chip-003) and a Dismissible chip for a value the user can remove (Chip-005).

## Where it belongs

The release notes of the About dialog in the nine apps that have one (ADC has no About dialog). Real source: the About dialog of each app (the paths are in source).

## Usage guidance

`Chip` at `scale: "sm"`, `color` by meaning (`success`, `warning`) and `paint: "solid"`, with one `Chip.Label` in capitals. It sits in a 160px start column so the labels of every row line up with the text beside them. All nine apps write the same Chip (apps differ only in the column width, 96px in HS and 160px in HCS, a size); the scene is the HCS one and leaves out the Accordion around the rows.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Chip`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `success`, `warning`
- `paint`: `solid`, `text`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Chip** — The solid success chip at scale "sm" that tags a release-note entry as a feature (the warning colour is used for an improvement). Selector: `[class~="aui-chip"]`.
2. **Label** — The uppercase kind name FEATURE. Selector: `[class~="aui-chip-label"]`. Direct text is highlighted.

## Apps

- HCS (`hcs`)
- ACE (`ace`)
- ADM (`adm`)
- PFD (`pfd`)
- PBS (`pbs`)
- HS (`hs`)
- FD (`fd`)
- AGPD (`agpd`)
- RWS (`rws`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Release note row (`hcs-release-note`)

Apps: HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS

In context source: HCS: `src/components/HcsAboutDialog.tsx`; ACE: `src/features/top-navigation/ui/AboutDialog.tsx`; ADM: `src/features/top-navigation/components/AboutDialog.tsx`; PFD: `src/pfd/AboutDialog.tsx`; PBS: `src/AboutDialog.tsx`; HS: `src/hs/AboutDialog.tsx`; FD: `src/components/AboutDialog.jsx`; AGPD: `src/agpd/AboutDialog.tsx`; RWS: `src/rws/AboutDialog.tsx`

In context view: Shown.

#### In context structure additions

1. **Change row** — One release-note row: a flex row with 8px vertical padding and an outlined bottom border between rows. Part marker: `data-ug-part="change-row"`.
2. **Chip column** — The fixed 160px start column that holds the change Chip (FEATURE, IMPROVEMENT). Part marker: `data-ug-part="chip-column"`.
3. **Change text** — The p3 text that describes the change, such as "Added the Download Duration help." Part marker: `data-ug-part="change-text"`.

#### Component UI source — `src/usecase-gallery/usecases/chip/Chip-001/example.tsx`

```tsx
import { Chip } from '../../../kit';

export default function Example() {
  return (
    <Chip aui={{ scale: 'sm', color: 'success', paint: 'solid' }}>
      <Chip.Label>FEATURE</Chip.Label>
    </Chip>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/chip/Chip-001/options/hcs-release-note/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Chip, Type, View } from '../../../../../kit';

// HcsAboutDialog release notes (src/components/HcsAboutDialog.tsx): each change is a row, a 160px start column holding the solid Chip (success for a feature, warning for an improvement) next to the p3 text, with an outlined bottom border between rows. One row and one more Chip colour are shown.
export default function HcsReleaseNoteScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 28))' }}>
      <View data-ug-part="change-row" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', paddingBlockStart: '8', paddingBlockEnd: '8', borderColor: 'outlined', borderBlockEndWidth: '1' } }}>
        <View data-ug-part="chip-column" aui={{ scale: 'sm', paint: 'text', sx: { width: '160', flex: 'none' } }}>
          {children}
        </View>
        <Type data-ug-part="change-text" as="p" role="p3" aui={{ scale: 'sm', sx: { flex: 'fill', minWidth: '0' } }}>
          Added the Download Duration help.
        </Type>
      </View>
      <View data-ug-part="change-row" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', paddingBlockStart: '8', paddingBlockEnd: '8' } }}>
        <View data-ug-part="chip-column" aui={{ scale: 'sm', paint: 'text', sx: { width: '160', flex: 'none' } }}>
          <Chip aui={{ scale: 'sm', color: 'warning', paint: 'solid' }}>
            <Chip.Label>IMPROVEMENT</Chip.Label>
          </Chip>
        </View>
        <Type data-ug-part="change-text" as="p" role="p3" aui={{ scale: 'sm', sx: { flex: 'fill', minWidth: '0' } }}>
          Faster results table.
        </Type>
      </View>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
