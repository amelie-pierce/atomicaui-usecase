# Checkbox-002: Input panel option checkbox

Component family: **Checkbox**

UI type: **Single checkbox**

Source: `src/usecase-gallery/usecases/checkbox/Checkbox-002/usecase.ts`

## What it is

A Checkbox with its label that answers one yes or no input of an input section: Galvanized, Predrill, Same inputs as Left Hip.

## When to choose it

Use it for one on or off input of an input section that has no unit. Do not use it for an exclusive choice (a RadioGroup, or a Field.Select when there are many), an on and off setting that applies at once (a Switch) or a column filter (Dropdown-001). A set of Checkboxes under a title is Checkbox-004; a Checkbox that sits in a Field next to the other inputs is Field; the help icon beside a title is Button-032.

## Where it belongs

HCS src/App.tsx (Galvanized), HS src/hs/InputFields.tsx (Same inputs as Left Hip), FD src/components/InputPane.jsx (wood structural panel, Predrill), ADC src/adc/components/InputSections.tsx and EurocodeInputs.tsx (Equal Spacing and the option lists), ACE src/features/estimator/ui/EstimatorInputPanel.tsx (water filled holes, paste over both sides), PBS src/InputFields.tsx (Rotate Post Orientation, Rough Sawn), AGPD src/agpd/inputs.tsx (include plates) and ADM JointDistanceFields.tsx (centre the joint).

## Usage guidance

The Checkbox has aui scale "sm" (22px box, a 14px mark, radius 4px) and per-state appearance in states: unselected color "surface" paint "tonal" with sx borderColor "outlined" (a white box with a 1px border), selected color "primary" paint "solid" (no border). Checkbox.Icon name "check" is the mark and Checkbox.Label is the caption on its right with an 8px gap: 16px regular. The box sits in a column of the input section (View, flex column, gap 8). HCS, HS, FD and ADC: a bare Checkbox with Checkbox.Label, no title (HCS adds a muted note below and sets the label scale "sm", which renders the same 16px; ADC and FD omit scale, the same 22px box). ACE, PBS and AGPD: a Fieldset with a Fieldset.Legend (16px regular) over the Checkbox, 32px from the legend top to the box top (the Fieldset default gap); PBS and AGPD use a View group with a Label span as the title, the same 16px regular, with the box 23px below the title top (a 3px gap), a 9px spacing difference from ACE, so all three share one group. ADM: the Checkbox is a bare control of a Field row with a Field.Label before it, right-aligned (justifyContent "end", gap 8, 22px box at the end), an aria-label on the box and the duotone mark (Checkbox.Icon layer "duotone"). The scenes leave out the neighbouring fields, the help icons and locks of the label rows, and show the enabled state (HCS and ADC disable some options in the app).

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Checkbox`, `Field`, `Fieldset`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `primary`, `surface`
- `paint`: `solid`, `text`, `tonal`
- `profile`: `default`, `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Checkbox** — The checkable control for one yes or no input of an input section, checked by default, with the primary solid selected style. Selector: `[class~="aui-checkbox"]`.
2. **Indicator** — The box that shows the Galvanized state; HCS, HS, FD and ADC draw it with the same outlined, surface-tonal off style. Selector: `[class~="aui-checkbox-indicator"]`.
3. **Icon** — The "check" mark rendered inside the box when Galvanized is on. Selector: `[class~="aui-checkbox-indicator"] [class~="aui-contained-icon"]`.
4. **Label** — The caption "Galvanized" beside the box; the other apps use their own option text, such as Same inputs as Left Hip, and ADM instead puts a Field.Label (Center to joint) before a label-less checkbox. Selector: `[class~="aui-control-row"] > [class~="aui-label"]`.
5. **Fieldset** — ACE groups the checkbox under a titled group, with a Fieldset and a legend above the option. Selector: `[class~="aui-fieldset"]`.
6. **Legend** — The group title that sits above the checkbox in the ACE titled scene. Selector: `[class~="aui-fieldset-legend"]`.
7. **Field label** — The label of a Field above a checkbox in a form row. Selector: `[class~="aui-field-label"]`.

## Apps

- HCS (`hcs`)
- HS (`hs`)
- FD (`fd`)
- ADC (`adc`)
- ACE (`ace`)
- PBS (`pbs`)
- AGPD (`agpd`)
- ADM (`adm`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Input panel option (`hcs-option`)

Apps: HCS, HS, FD, ADC

In context source: HCS: `src/App.tsx`; HS: `src/hs/InputFields.tsx`; FD: `src/components/InputPane.jsx`; ADC: `src/adc/components/InputSections.tsx`

Note: A bare checkbox without a title.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/checkbox/Checkbox-002/example.tsx`

```tsx
import { Checkbox } from '../../../kit';

export default function Example() {
  return (
    <Checkbox defaultSelected aui={{
      scale: 'sm',
      states: {
        unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
        selected: { color: 'primary', paint: 'solid' },
      },
    }}>
      <Checkbox.Icon name="check" />
      <Checkbox.Label>Galvanized</Checkbox.Label>
    </Checkbox>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/checkbox/Checkbox-002/options/hcs-option/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Checkbox, View } from '../../../../../kit';

// HCS, HS, FD and ADC input panels (HCS src/App.tsx Galvanized, HS src/hs/InputFields.tsx Same inputs as Left Hip, FD src/components/InputPane.jsx Predrill and the wood structural panel, ADC src/adc/components/InputSections.tsx Equal Spacing and the option list): the Checkbox sits alone in the column of the input section, its Checkbox.Label to its right. Left out: the sibling fields, HCS's muted note under Galvanized and the other options of the ADC list.
export default function HcsOptionScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Checkbox
        defaultSelected
        aui={{
          scale: 'sm',
          states: {
            unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
            selected: { color: 'primary', paint: 'solid' },
          },
        }}
      >
        <Checkbox.Label aui={{ scale: 'sm' }}>Same inputs as Left Hip</Checkbox.Label>
      </Checkbox>
    </View>
  );
}
```

### 2. Input panel option — UI variant 2 (`ace-titled`)

Apps: ACE, PBS, AGPD

In context source: ACE: `src/features/estimator/ui/EstimatorInputPanel.tsx`; PBS: `src/InputFields.tsx`; AGPD: `src/agpd/inputs.tsx`

Note: A title sits above the checkbox; PBS and AGPD use a smaller gap than ACE.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/checkbox/Checkbox-002/options/ace-titled/example.tsx`

```tsx
import { Checkbox } from '../../../../../kit';

export default function Example() {
  return (
    <Checkbox defaultSelected aui={{
      scale: 'sm',
      states: {
        unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
        selected: { color: 'primary', paint: 'solid' },
      },
    }}>
      <Checkbox.Icon name="check" />
      <Checkbox.Label>Galvanized</Checkbox.Label>
    </Checkbox>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/checkbox/Checkbox-002/options/ace-titled/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Checkbox, Fieldset } from '../../../../../kit';

// ACE estimator input panel (src/features/estimator/ui/EstimatorInputPanel.tsx, the water-filled holes and paste over both sides options): a Fieldset with a visible Legend above one Checkbox. The Fieldset keeps its own 12px gap between legend and box. Left out: the other fields of the section.
export default function AceTitledScene(_props: ContextProps) {
  return (
    <Fieldset aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Fieldset.Legend>Paste over both sides of crack</Fieldset.Legend>
      <Checkbox
        defaultSelected
        aui={{
          scale: 'sm',
          states: {
            unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
            selected: { color: 'primary', paint: 'solid' },
          },
        }}
      >
        <Checkbox.Label aui={{ scale: 'sm' }}>Yes</Checkbox.Label>
      </Checkbox>
    </Fieldset>
  );
}
```

### 3. Input panel option — UI variant 3 (`adm-label-first`)

Apps: ADM

In context source: ADM: `src/features/design-inputs/components/GeometrySection/JointDistanceFields.tsx`

Note: The label precedes the right-aligned checkbox.

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/checkbox/Checkbox-002/options/adm-label-first/example.tsx`

```tsx
import { Checkbox } from '../../../../../kit';

export default function Example() {
  return (
    <Checkbox defaultSelected aui={{
      scale: 'sm',
      states: {
        unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
        selected: { color: 'primary', paint: 'solid' },
      },
    }}>
      <Checkbox.Icon name="check" />
      <Checkbox.Label>Galvanized</Checkbox.Label>
    </Checkbox>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/checkbox/Checkbox-002/options/adm-label-first/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Checkbox, Field, View } from '../../../../../kit';

// ADM joint distance fields (src/features/design-inputs/components/GeometrySection/JointDistanceFields.tsx): the Checkbox is a bare control of a Field row, so Field.Label comes first and the box last, the row right-aligned with an 8px gap (Checkbox.Label cannot put the label first). The box carries an aria-label and the duotone mark. Left out: the joint distance number field above the row.
export default function AdmLabelFirstScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'end', width: 'fill', gap: '8' } }}>
        <Field.Label>Center to joint</Field.Label>
        <Checkbox
          aria-label="Center to joint"
          defaultSelected
          aui={{
            states: {
              unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } },
              selected: { paint: 'solid', color: 'primary' },
            },
          }}
        >
          <Checkbox.Icon name="check" layer="duotone" />
        </Checkbox>
      </Field>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
