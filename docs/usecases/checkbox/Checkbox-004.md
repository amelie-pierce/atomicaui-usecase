# Checkbox-004: Object visibility checkbox group

Component family: **Checkbox**

UI type: **Checkbox group**

Source: `src/usecase-gallery/usecases/checkbox/Checkbox-004/usecase.ts`

## What it is

Checkboxes under a group title that show or hide the parts of the 3D model (Wall, Roof, Base plate, Anchors).

## When to choose it

Use it to toggle independent parts of one drawing; each toggle is a Checkbox because several can be on. Do not use it for the camera choice (Perspective and Orthographic are a RadioGroup) or the Reset view button (Button-039 and the viewer buttons).

## Where it belongs

The 3D viewer controls of eight apps: HCS src/App.tsx, ADC src/adc/components/ConnectionModel.tsx, ADM src/features/viewer/components/ViewerChrome.tsx, FD src/components/Viewer.jsx, and the wrapped control row of HS src/hs/ViewerPane.tsx, PBS src/Viewer.tsx, AGPD src/agpd/Viewer.tsx and RWS src/rws/Viewer.tsx.

## Usage guidance

Every box is the 22px Checkbox (scale "sm" or none), selected color "primary" paint "solid", unselected color "surface" paint "tonal" with borderColor "outlined", the label 16px regular, except where noted. Five viewer groups, measured in headless Chromium. HCS: a column (gap 8) under a Type l3 semi-bold title (16px, weight 600) with Checkbox.Label at scale "sm". ADC: a column (gap 4) under a Type l5 bold title (12px, 700), the Checkboxes at scale "xs" and shape "soft": a 20px box, a 12px mark and a 14px weight 500 label, so it is the smallest. ADM: a compact column (gap 4) under a Type l5 semi-bold title (12px, 600), each row a Field (gap 6) with an icon-only Checkbox (aria-label, mark layer "duotone") and a Field.Label after it, 28px from the box start. FD: the same Field rows and title as ADM with the solid check (Checkbox.Icon name "check", Font Awesome 7 Pro instead of Duotone); FD disables Fasteners when the design does not pass and shows a "Select a Model to view Fasteners" tooltip, while the scene keeps it enabled without the tooltip. HS, PBS, AGPD, RWS: one wrapped row (gap 8) of Checkbox.Label boxes under the 3D view; PBS, AGPD and RWS lead it with an Object Visibility Type l4 semi-bold title (14px, 600) and HS has no title, so HS is merged with them. The group title is visible text here (a Type title or a Fieldset.Legend), where Checkbox-001 labels one option; a visible title against an aria-label, and `disabled`, are differences of the place inside this use case, not a split. The scenes leave out the results tables, the Reset view button, the camera radios, the 3D canvas and the Connection toggles that PBS, RWS and HCS disable until a model is chosen.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Checkbox`, `Field`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `paint`: `solid`, `text`, `tonal`
- `profile`: `compact`, `default`, `no-padding`
- `scale`: `sm`, `xs`
- `color`: `primary`, `surface`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Group title** — The "Object Visibility" title, a Type role "l4" at semi-bold weight, that names the group of visibility checkboxes; some apps write it as a Field.Label. Selector: `[data-aui-typeface]`.
2. **Checkbox** — One of the visibility checkboxes (Wall, Roof, and Base plate or Anchors in the scenes) that shows or hides that part of the 3D model; checked by default. Selector: `[class~="aui-checkbox"]`.
3. **Indicator** — The box that shows whether the model part is visible. Selector: `[class~="aui-checkbox-indicator"]`.
4. **Icon** — The "check" mark used in the ADC, ADM, FD, HCS and HS scenes; the compact example draws the box without one. Selector: `[class~="aui-checkbox-indicator"] [class~="aui-contained-icon"]`.
5. **Label** — The part name beside the box, such as Wall or Roof, in the wrapped row of the 3D viewer controls. Selector: `[class~="aui-control-row"] > [class~="aui-label"]`.

## Apps

- HCS (`hcs`)
- ADC (`adc`)
- ADM (`adm`)
- FD (`fd`)
- HS (`hs`)
- PBS (`pbs`)
- AGPD (`agpd`)
- RWS (`rws`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Object visibility (`hcs-visibility`)

Apps: HCS

In context source: HCS: `src/App.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/checkbox/Checkbox-004/example.tsx`

```tsx
import { Checkbox, Type, View } from '../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Type role="l3" weight="semi-bold">Object Visibility</Type>
      <Checkbox defaultSelected aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
        <Checkbox.Label aui={{ scale: 'sm' }}>Supporting Beam</Checkbox.Label>
      </Checkbox>
      <Checkbox defaultSelected aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
        <Checkbox.Label aui={{ scale: 'sm' }}>Supported Beam</Checkbox.Label>
      </Checkbox>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/checkbox/Checkbox-004/options/hcs-visibility/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Checkbox, Type, View } from '../../../../../kit';

// HCS 3D view controls (src/App.tsx, the Object Visibility group in the output pane): a column (gap 8) with an "Object Visibility" title in Type l3 semi-bold (16px) over the Checkboxes, each Checkbox.Label at scale "sm". Left out: the Reset view button, the Perspective and Orthographic radios, the other toggles and the disabled state the app gives Connector and Connector Detail before a beam is selected (the scene shows them enabled).
export default function HcsVisibilityScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Type role="l3" weight="semi-bold">
        Object Visibility
      </Type>
      <Checkbox defaultSelected aui={{
        scale: 'sm',
        states: {
          unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
          selected: { color: 'primary', paint: 'solid' },
        },
      }}>
        <Checkbox.Label aui={{ scale: 'sm' }}>Supporting Beam</Checkbox.Label>
      </Checkbox>
      <Checkbox defaultSelected aui={{
        scale: 'sm',
        states: {
          unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
          selected: { color: 'primary', paint: 'solid' },
        },
      }}>
        <Checkbox.Label aui={{ scale: 'sm' }}>Supported Beam</Checkbox.Label>
      </Checkbox>
    </View>
  );
}
```

### 2. Object visibility — UI variant 2 (`adc-visibility`)

Apps: ADC

In context source: ADC: `src/adc/components/ConnectionModel.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/checkbox/Checkbox-004/options/adc-visibility/example.tsx`

```tsx
import { Checkbox, Type, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '4' } }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Type role="l5" weight="bold" aui={{ sx: { paddingBlockStart: '4' } }}>Object Visibility</Type>
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '4' } }}>
        <Checkbox defaultSelected aui={{ scale: 'xs', shape: 'soft', states: { unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } }, selected: { paint: 'solid', color: 'primary' } } }}>
          <Checkbox.Label>Concrete</Checkbox.Label>
        </Checkbox>
        <Checkbox defaultSelected aui={{ scale: 'xs', shape: 'soft', states: { unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } }, selected: { paint: 'solid', color: 'primary' } } }}>
          <Checkbox.Label>Anchors</Checkbox.Label>
        </Checkbox>
      </View>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/checkbox/Checkbox-004/options/adc-visibility/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Checkbox, Type, View } from '../../../../../kit';

// ADC connection model viewer (src/adc/components/ConnectionModel.tsx): the viewer controls list the toggles in a column (gap 4) under an "Object Visibility" title (Type l5 bold, 12px, 4px above). The Checkboxes are the smallest in the gallery: scale "xs" with shape "soft" (a 20px box, a 12px mark and a 14px medium label). Left out: the Reset view and Projection radios, the other toggles and the disabled Base Plate toggle (the scene shows it enabled).
export default function AdcVisibilityScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '4' } }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Type role="l5" weight="bold" aui={{ sx: { paddingBlockStart: '4' } }}>
        Object Visibility
      </Type>
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '4' } }}>
        <Checkbox defaultSelected aui={{
          scale: 'xs',
          shape: 'soft',
          states: {
            unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } },
            selected: { paint: 'solid', color: 'primary' },
          },
        }}>
          <Checkbox.Label>Concrete</Checkbox.Label>
        </Checkbox>
        <Checkbox defaultSelected aui={{
          scale: 'xs',
          shape: 'soft',
          states: {
            unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } },
            selected: { paint: 'solid', color: 'primary' },
          },
        }}>
          <Checkbox.Label>Anchors</Checkbox.Label>
        </Checkbox>
      </View>
    </View>
  );
}
```

### 3. Object visibility — UI variant 3 (`adm-visibility`)

Apps: ADM

In context source: ADM: `src/features/viewer/components/ViewerChrome.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/checkbox/Checkbox-004/options/adm-visibility/example.tsx`

```tsx
import { Checkbox, Field, Type, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', elevation: 0, profile: 'compact', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '4' } }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Type role="l5" weight="semi-bold">Object visibility</Type>
      <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6', width: 'fill' } }}>
        <Checkbox aria-label="Base plate" defaultSelected aui={{ states: { unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } }, selected: { paint: 'solid', color: 'primary' } } }}>
          <Checkbox.Icon name="check" layer="duotone" />
        </Checkbox>
        <Field.Label>Base plate</Field.Label>
      </Field>
      <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6', width: 'fill' } }}>
        <Checkbox aria-label="Anchors" defaultSelected aui={{ states: { unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } }, selected: { paint: 'solid', color: 'primary' } } }}>
          <Checkbox.Icon name="check" layer="duotone" />
        </Checkbox>
        <Field.Label>Anchors</Field.Label>
      </Field>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/checkbox/Checkbox-004/options/adm-visibility/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Checkbox, Field, Type, View } from '../../../../../kit';

// ADM viewer chrome (src/features/viewer/components/ViewerChrome.tsx): a compact column (gap 4, aligned to the start) with an "Object visibility" title in Type l5 semi-bold (12px). Each row is a Field (scale "sm", gap 6) holding an icon-only Checkbox (aria-label, duotone mark) and a Field.Label after it. Left out: the Reset view icon button with its tooltip, the Flat view row and the other members.
export default function AdmVisibilityScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', elevation: 0, profile: 'compact', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '4' } }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Type role="l5" weight="semi-bold">
        Object visibility
      </Type>
      <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6', width: 'fill' } }}>
        <Checkbox aria-label="Base plate" defaultSelected aui={{
          states: {
            unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } },
            selected: { paint: 'solid', color: 'primary' },
          },
        }}>
          <Checkbox.Icon name="check" layer="duotone" />
        </Checkbox>
        <Field.Label>Base plate</Field.Label>
      </Field>
      <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6', width: 'fill' } }}>
        <Checkbox aria-label="Anchors" defaultSelected aui={{
          states: {
            unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } },
            selected: { paint: 'solid', color: 'primary' },
          },
        }}>
          <Checkbox.Icon name="check" layer="duotone" />
        </Checkbox>
        <Field.Label>Anchors</Field.Label>
      </Field>
    </View>
  );
}
```

### 4. Object visibility — UI variant 4 (`fd-visibility`)

Apps: FD

In context source: FD: `src/components/Viewer.jsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/checkbox/Checkbox-004/options/fd-visibility/example.tsx`

```tsx
import { Checkbox, Field, Type, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '4' } }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Type role="l5" weight="semi-bold">Object visibility</Type>
      <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6', width: 'fill' } }}>
        <Checkbox aria-label="Base plate" defaultSelected aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
          <Checkbox.Icon name="check" />
        </Checkbox>
        <Field.Label>Base plate</Field.Label>
      </Field>
      <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6', width: 'fill' } }}>
        <Checkbox aria-label="Fasteners" aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
          <Checkbox.Icon name="check" />
        </Checkbox>
        <Field.Label>Fasteners</Field.Label>
      </Field>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/checkbox/Checkbox-004/options/fd-visibility/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Checkbox, Field, Type, View } from '../../../../../kit';

// FD viewer (src/components/Viewer.jsx, ControlRow): the same Field rows as ADM under an "Object visibility" title (Type l5 semi-bold, 12px), column gap 4 and Field gap 6, but the Checkbox is `scale "sm"` with the solid check (Checkbox.Icon name "check"). The scene leaves out the Reset view and the radios.
export default function FdVisibilityScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '4' } }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Type role="l5" weight="semi-bold">
        Object visibility
      </Type>
      <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6', width: 'fill' } }}>
        <Checkbox aria-label="Base plate" defaultSelected aui={{
          scale: 'sm',
          states: {
            unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
            selected: { color: 'primary', paint: 'solid' },
          },
        }}>
          <Checkbox.Icon name="check" />
        </Checkbox>
        <Field.Label>Base plate</Field.Label>
      </Field>
      <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6', width: 'fill' } }}>
        <Checkbox aria-label="Fasteners" aui={{
          scale: 'sm',
          states: {
            unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
            selected: { color: 'primary', paint: 'solid' },
          },
        }}>
          <Checkbox.Icon name="check" />
        </Checkbox>
        <Field.Label>Fasteners</Field.Label>
      </Field>
    </View>
  );
}
```

### 5. Object visibility — UI variant 5 (`hs-visibility`)

Apps: HS, PBS, AGPD, RWS

In context source: HS: `src/hs/ViewerPane.tsx`; PBS: `src/Viewer.tsx`; AGPD: `src/agpd/Viewer.tsx`; RWS: `src/rws/Viewer.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/checkbox/Checkbox-004/options/hs-visibility/example.tsx`

```tsx
import { Checkbox, Type, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexWrap: 'wrap', gap: '8', alignItems: 'center' } }} style={{ inlineSize: 'min(100%, 420px)' }}>
      <Type as="span" role="l4" weight="semi-bold">Object Visibility</Type>
      <Checkbox defaultSelected aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
        <Checkbox.Label>Wall</Checkbox.Label>
      </Checkbox>
      <Checkbox defaultSelected aui={{ scale: 'sm', states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }}>
        <Checkbox.Label>Roof</Checkbox.Label>
      </Checkbox>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/checkbox/Checkbox-004/options/hs-visibility/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { View } from '../../../../../kit';

// HS, PBS, AGPD and RWS viewer (HS src/hs/ViewerPane.tsx, PBS src/Viewer.tsx, AGPD src/agpd/Viewer.tsx, RWS src/rws/Viewer.tsx): the visibility toggles are one wrapped row (gap 8) under the 3D view, after the Reset View button. PBS, AGPD and RWS lead the checkboxes with an "Object Visibility" title (Type l4 semi-bold, 14px); HS has no title. Left out: the Reset View button, the Perspective and Orthographic radios (PBS), the 3D canvas and, in RWS, the Connection toggle that the app disables until a model is selected.
export default function HsVisibilityScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'default' }} style={{ inlineSize: 'min(100%, 420px)' }}>
      {children}
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
