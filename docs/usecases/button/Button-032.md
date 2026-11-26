# Button-032: Open field help button

Component family: **Button**

UI type: **Icon button**

Source: `src/usecase-gallery/usecases/button/Button-032/usecase.ts`

## What it is

A transparent icon-only IconButton with a circle-question opens the help of a field from beside its label; the example is the 20px one and the Look select shows the 28px one.

## When to choose it

Use it to explain one field without adding permanent text. Always set aria-label; the popover or tooltip it opens holds the explanation.

## Where it belongs

After a field label in the input pane. HCS, PBS and RWS draw it as a 20px square that opens a popover; HS and ADM draw a 28px square that opens a tooltip; PFD and AGPD draw the 28px square that opens a popover. The popover is closed by Button-029.

## Usage guidance

Ghost, 20px (HCS, PBS, RWS). HCS: an IconButton with aui scale "sm", profile "contained", color "secondary", paint "text" and shape "soft", with the circle-question glyph. In context it is the Load Properties section: Download Duration alone, the label row (label text, then the icon, a flex row) above its select; the other fields are left out. PBS: a Button with a ContainedIcon circle-question child at profile "square-compact" so the label row keeps its height, opening a 320px popover. RWS: a Button at profile "square" pinned to 20px by sx, opening a 320px popover. Ghost, 28px (HS, ADM, PFD, AGPD): aui color "secondary", paint "text", scale "sm", shape "soft" and profile "square" on an IconButton; the apps that write the circle-question as a Button with a ContainedIcon child at profile "square" get the same 28px box and glyph, and the scene writes that control. HS: a Tooltip above it, 4px offset, up to 384px, so it has no close. ADM: the same square Button with a Tooltip above it, 8px offset, painted solid secondary at scale "sm", up to 256px. PFD and AGPD (one group): the same square Button opening a popover, top, 4px offset, a surface card up to 384px. Each help scene keeps one labelled field and one sentence of help text.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `ContainedIcon`, `Field`, `IconButton`, `Popover`, `Select`, `Tooltip`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `profile`: `block-padding`, `contained`, `default`, `no-padding`, `square`, `square-compact`
- `color`: `secondary`, `surface`, `surface-alt`
- `paint`: `fixed`, `solid`, `text`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Help button** — The 20px transparent secondary circle-question button that sits beside the field label; the Look select swaps it for the 28px ghost version. In scenes it is a Button around a ContainedIcon (square or square-compact, RWS fixed at 20px). Selector: `[class~="aui-button"][aria-label*="elp"]`.
2. **Help icon** — The circle-question glyph centred in the help button. Selector: `[class~="aui-button"][aria-label*="elp"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
3. **Field label** — The label (Material, or Download Duration in HCS) that names the control the help explains. Selector: `[class~="aui-field-label"]`.
4. **Field control** — The input (Steel) in ADM, HS, PBS, PFD and RWS scenes that the help text describes. Selector: `[class~="aui-field-control"]`.
5. **Help tooltip** — ADM and HS open the explanation as a tooltip above the button, up to 256px (ADM) or 384px (HS) wide. Selector: `[class~="aui-tooltip-popup"]`.
6. **Help popover** — PBS, PFD and RWS open the explanation in a solid popover (320px or 384px max) above the button. Selector: `[data-aui-popup-motion][role="dialog"]`.
7. **Select trigger** — HCS only: the Snow (115) select under the Download Duration label. Selector: `[class~="aui-select-trigger"]`.

## Component layer steps

1. **Help button** — The 20px transparent secondary circle-question button that sits beside the field label; the Look select swaps it for the 28px ghost version. In scenes it is a Button around a ContainedIcon (square or square-compact, RWS fixed at 20px). Selector: `[class~="aui-button"][aria-label*="elp"]`.
2. **Help icon** — The circle-question glyph centred in the help button. Selector: `[class~="aui-button"][aria-label*="elp"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
3. **Field label** — The label (Material, or Download Duration in HCS) that names the control the help explains. Selector: `[class~="aui-field-label"]`.
4. **Field control** — The input (Steel) in ADM, HS, PBS, PFD and RWS scenes that the help text describes. Selector: `[class~="aui-field-control"]`.
5. **Help tooltip** — ADM and HS open the explanation as a tooltip above the button, up to 256px (ADM) or 384px (HS) wide. Selector: `[class~="aui-tooltip-popup"]`.
6. **Help popover** — PBS, PFD and RWS open the explanation in a solid popover (320px or 384px max) above the button. Selector: `[data-aui-popup-motion][role="dialog"]`.
7. **Select trigger** — HCS only: the Snow (115) select under the Download Duration label. Selector: `[class~="aui-select-trigger"]`.

## Apps

- HCS (`hcs`)
- PBS (`pbs`)
- RWS (`rws`)
- HS (`hs`)
- ADM (`adm`)
- PFD (`pfd`)
- AGPD (`agpd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Ghost, 20px (`hcs-field-help`)

Apps: HCS

In context source: HCS: `src/App.tsx`

In context view: Shown.

#### In context structure additions

1. **Input pane** — The surface-alt Input pane that frames the Load Properties field. Selector: `[data-ug-part="input-pane"]`.
2. **Label row** — The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control. Selector: `[data-ug-part="label-row"]`.

#### In context layer steps

1. **Input pane** — The surface-alt Input pane that frames the Load Properties field. Selector: `[data-ug-part="input-pane"]`.
2. **Label row** — The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control. Selector: `[data-ug-part="label-row"]`.
3. **Help button** — The 20px transparent secondary circle-question button that sits beside the field label; the Look select swaps it for the 28px ghost version. In scenes it is a Button around a ContainedIcon (square or square-compact, RWS fixed at 20px). Selector: `[class~="aui-button"][aria-label*="elp"]`.
4. **Help icon** — The circle-question glyph centred in the help button. Selector: `[class~="aui-button"][aria-label*="elp"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
5. **Field label** — The label (Material, or Download Duration in HCS) that names the control the help explains. Selector: `[class~="aui-field-label"]`.
6. **Field control** — The input (Steel) in ADM, HS, PBS, PFD and RWS scenes that the help text describes. Selector: `[class~="aui-field-control"]`.
7. **Help tooltip** — ADM and HS open the explanation as a tooltip above the button, up to 256px (ADM) or 384px (HS) wide. Selector: `[class~="aui-tooltip-popup"]`.
8. **Help popover** — PBS, PFD and RWS open the explanation in a solid popover (320px or 384px max) above the button. Selector: `[data-aui-popup-motion][role="dialog"]`.
9. **Select trigger** — HCS only: the Snow (115) select under the Download Duration label. Selector: `[class~="aui-select-trigger"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-032/example.tsx`

```tsx
import { IconButton } from '../../../kit';

export default function Example() {
  return <IconButton name="circle-question" aria-label="Help" aui={{ scale: 'sm', profile: 'contained', color: 'secondary', paint: 'text', shape: 'soft' }} />;
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-032/options/hcs-field-help/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Field, Select, View } from '../../../../../kit';

// The Load Properties section of the Input pane (App.tsx lines 1131-1170) cut to the one field that carries the trigger: the Download
// Duration label row (HcsSelectbox `labelAccessory`) is a flex row, the label then the help trigger inline after it, above the select.
// The open help popover is Button-029.
export default function HcsFieldHelpScene({ children }: ContextProps) {
  return (
    <View
      data-ug-part="input-pane"
      as="aside"
      aria-label="Input"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0', gap: '0' } }}
      style={{ inlineSize: 'min(100%, 280px)' }}
    >
      <View aui={{ color: 'surface', shape: 'soft', profile: 'default', sx: { display: 'flex', flexDirection: 'column', width: 'fill', gap: '0' } }}>
        <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
          <View data-ug-part="label-row" aui={{ scale: 'sm', profile: 'no-padding', paint: 'text', sx: { display: 'flex', alignItems: 'center' } }}>
            <Field.Label aui={{ scale: 'sm' }}>Download Duration</Field.Label>
            {children}
          </View>
          <Select aui={{ scale: 'sm' }} defaultValue="Snow (115)" items={[{ label: 'Snow (115)', value: 'Snow (115)' }]}>
            <Select.Trigger aria-label="Download Duration" aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { minHeight: '28', height: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20' } }} style={{ inlineSize: '100%', minInlineSize: 0 }}>
              <Select.Value />
              <Select.Chevron aui={{ scale: 'sm' }} />
            </Select.Trigger>
          </Select>
        </Field>
      </View>
    </View>
  );
}
```

### 2. 20px help icon (`pbs-field-help`)

Apps: PBS

In context source: PBS: `src/InputFields.tsx`

In context view: Shown.

#### In context structure additions

1. **Label row** — The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control. Selector: `[data-ug-part="label-row"]`.

#### In context layer steps

1. **Label row** — The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control. Selector: `[data-ug-part="label-row"]`.
2. **Help button** — The 20px transparent secondary circle-question button that sits beside the field label; the Look select swaps it for the 28px ghost version. In scenes it is a Button around a ContainedIcon (square or square-compact, RWS fixed at 20px). Selector: `[class~="aui-button"][aria-label*="elp"]`.
3. **Help icon** — The circle-question glyph centred in the help button. Selector: `[class~="aui-button"][aria-label*="elp"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
4. **Field label** — The label (Material, or Download Duration in HCS) that names the control the help explains. Selector: `[class~="aui-field-label"]`.
5. **Field control** — The input (Steel) in ADM, HS, PBS, PFD and RWS scenes that the help text describes. Selector: `[class~="aui-field-control"]`.
6. **Help tooltip** — ADM and HS open the explanation as a tooltip above the button, up to 256px (ADM) or 384px (HS) wide. Selector: `[class~="aui-tooltip-popup"]`.
7. **Help popover** — PBS, PFD and RWS open the explanation in a solid popover (320px or 384px max) above the button. Selector: `[data-aui-popup-motion][role="dialog"]`.
8. **Select trigger** — HCS only: the Snow (115) select under the Download Duration label. Selector: `[class~="aui-select-trigger"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-032/options/pbs-field-help/example.tsx`

```tsx
import { IconButton } from '../../../../../kit';

export default function Example() {
  return <IconButton name="circle-question" aria-label="Help" aui={{ scale: 'sm', profile: 'contained', color: 'secondary', paint: 'text', shape: 'soft' }} />;
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-032/options/pbs-field-help/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, ContainedIcon, Field, Popover, View } from '../../../../../kit';

// PBS HelpPopover (src/InputFields.tsx): the trigger after each label is a Button at profile "square-compact", so a label with help keeps the height of one without. It opens a 320px popover; its close is Button-029.
export default function PbsFieldHelpScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 10)', inlineSize: 'min(100%, calc(var(--p-px-16) * 18))' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <View data-ug-part="label-row" aui={{ scale: 'sm', profile: 'no-padding', paint: 'text', sx: { display: 'flex', alignItems: 'center' } }}>
          <Field.Label aui={{ scale: 'sm' }}>Material</Field.Label>
          <Popover>
            <Popover.Trigger render={<Button aria-label="Material help" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square-compact', shape: 'soft' }} />}>
              <ContainedIcon name="circle-question" />
            </Popover.Trigger>
            <Popover.Portal container={host}>
              <Popover.Positioner side="top" sideOffset={4} className="ug-anchored">
                <Popover.Popup aria-label="Material help" render={<View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { width: '320' } }} />}>
                  Select the base material of the member.
                </Popover.Popup>
              </Popover.Positioner>
            </Popover.Portal>
          </Popover>
        </View>
        <Field.Control aui={{ scale: 'sm' }} aria-label="Material" defaultValue="Steel" />
      </Field>
    </View>
  );
}
```

### 3. 20px outlined help (`rws-field-help`)

Apps: RWS

In context source: RWS: `src/rws/inputs.tsx`

In context view: Shown.

#### In context structure additions

1. **Label row** — The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control. Selector: `[data-ug-part="label-row"]`.

#### In context layer steps

1. **Label row** — The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control. Selector: `[data-ug-part="label-row"]`.
2. **Help button** — The 20px transparent secondary circle-question button that sits beside the field label; the Look select swaps it for the 28px ghost version. In scenes it is a Button around a ContainedIcon (square or square-compact, RWS fixed at 20px). Selector: `[class~="aui-button"][aria-label*="elp"]`.
3. **Help icon** — The circle-question glyph centred in the help button. Selector: `[class~="aui-button"][aria-label*="elp"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
4. **Field label** — The label (Material, or Download Duration in HCS) that names the control the help explains. Selector: `[class~="aui-field-label"]`.
5. **Field control** — The input (Steel) in ADM, HS, PBS, PFD and RWS scenes that the help text describes. Selector: `[class~="aui-field-control"]`.
6. **Help tooltip** — ADM and HS open the explanation as a tooltip above the button, up to 256px (ADM) or 384px (HS) wide. Selector: `[class~="aui-tooltip-popup"]`.
7. **Help popover** — PBS, PFD and RWS open the explanation in a solid popover (320px or 384px max) above the button. Selector: `[data-aui-popup-motion][role="dialog"]`.
8. **Select trigger** — HCS only: the Snow (115) select under the Download Duration label. Selector: `[class~="aui-select-trigger"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-032/options/rws-field-help/example.tsx`

```tsx
import { IconButton } from '../../../../../kit';

export default function Example() {
  return <IconButton name="circle-question" aria-label="Help" aui={{ scale: 'sm', profile: 'contained', color: 'secondary', paint: 'text', shape: 'soft' }} />;
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-032/options/rws-field-help/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, ContainedIcon, Field, Popover, View } from '../../../../../kit';

// RWS Help (src/rws/inputs.tsx): a Button at profile "square" pinned to 20px by sx, so the label row keeps the 20px of a plain label. It opens a 320px popover; its close is Button-029.
export default function RwsFieldHelpScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 10)', inlineSize: 'min(100%, calc(var(--p-px-16) * 18))' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <View data-ug-part="label-row" aui={{ scale: 'sm', profile: 'no-padding', paint: 'text', sx: { display: 'flex', alignItems: 'center' } }}>
          <Field.Label aui={{ scale: 'sm' }}>Material</Field.Label>
          <Popover>
            <Popover.Trigger render={<Button aria-label="Material help" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft', sx: { width: '20', height: '20', minWidth: '20', minHeight: '20' } }} />}>
              <ContainedIcon name="circle-question" />
            </Popover.Trigger>
            <Popover.Portal container={host}>
              <Popover.Positioner side="top" sideOffset={4} className="ug-anchored">
                <Popover.Popup aria-label="Material help" render={<View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { width: '320' } }} />}>
                  Select the base material of the member.
                </Popover.Popup>
              </Popover.Positioner>
            </Popover.Portal>
          </Popover>
        </View>
        <Field.Control aui={{ scale: 'sm' }} aria-label="Material" defaultValue="Steel" />
      </Field>
    </View>
  );
}
```

### 4. Ghost, 28px (`hs-field-help`)

Apps: HS

In context source: HS: `src/hs/InputFields.tsx`

In context view: Shown.

#### In context structure additions

1. **Label row** — The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control. Selector: `[data-ug-part="label-row"]`.

#### In context layer steps

1. **Label row** — The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control. Selector: `[data-ug-part="label-row"]`.
2. **Help button** — The 20px transparent secondary circle-question button that sits beside the field label; the Look select swaps it for the 28px ghost version. In scenes it is a Button around a ContainedIcon (square or square-compact, RWS fixed at 20px). Selector: `[class~="aui-button"][aria-label*="elp"]`.
3. **Help icon** — The circle-question glyph centred in the help button. Selector: `[class~="aui-button"][aria-label*="elp"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
4. **Field label** — The label (Material, or Download Duration in HCS) that names the control the help explains. Selector: `[class~="aui-field-label"]`.
5. **Field control** — The input (Steel) in ADM, HS, PBS, PFD and RWS scenes that the help text describes. Selector: `[class~="aui-field-control"]`.
6. **Help tooltip** — ADM and HS open the explanation as a tooltip above the button, up to 256px (ADM) or 384px (HS) wide. Selector: `[class~="aui-tooltip-popup"]`.
7. **Help popover** — PBS, PFD and RWS open the explanation in a solid popover (320px or 384px max) above the button. Selector: `[data-aui-popup-motion][role="dialog"]`.
8. **Select trigger** — HCS only: the Snow (115) select under the Download Duration label. Selector: `[class~="aui-select-trigger"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-032/options/hs-field-help/example.tsx`

```tsx
import { IconButton } from '../../../../../kit';

export default function Example() {
  return <IconButton name="circle-question" aria-label="Help" aui={{ scale: 'sm', color: 'secondary', paint: 'text', shape: 'soft', profile: 'square' }} />;
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-032/options/hs-field-help/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, ContainedIcon, Field, Tooltip, View } from '../../../../../kit';

// HS Help (src/hs/InputFields.tsx): the same square Button after the label, but it opens a Tooltip (top, 4px offset, up to 384px) on hover or focus, not a Popover, so there is no close Button.
// Shown open; the scene keeps the one labelled field.
export default function HsFieldHelpScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 10)', inlineSize: 'min(100%, calc(var(--p-px-16) * 18))' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <View data-ug-part="label-row" aui={{ scale: 'sm', profile: 'no-padding', paint: 'text', sx: { display: 'flex', alignItems: 'center' } }}>
          <Field.Label aui={{ scale: 'sm' }}>Material</Field.Label>
          <Tooltip.Provider>
            <Tooltip open>
              <Tooltip.Trigger render={<Button aria-label="Material help" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft' }} />}>
                <ContainedIcon name="circle-question" />
              </Tooltip.Trigger>
              <Tooltip.Portal container={host}>
                <Tooltip.Positioner side="top" sideOffset={4} className="ug-anchored">
                  <Tooltip.Popup aui={{ sx: { maxWidth: '384' } }}>Select the base material of the member.</Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip>
          </Tooltip.Provider>
        </View>
        <Field.Control aui={{ scale: 'sm' }} aria-label="Material" defaultValue="Steel" />
      </Field>
    </View>
  );
}
```

### 5. 28px tooltip icon (`adm-field-help`)

Apps: ADM

In context source: ADM: `src/shared/lib/tooltip/AdmHelpTooltip.tsx`

In context view: Shown.

#### In context structure additions

1. **Label row** — The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control. Selector: `[data-ug-part="label-row"]`.

#### In context layer steps

1. **Label row** — The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control. Selector: `[data-ug-part="label-row"]`.
2. **Help button** — The 20px transparent secondary circle-question button that sits beside the field label; the Look select swaps it for the 28px ghost version. In scenes it is a Button around a ContainedIcon (square or square-compact, RWS fixed at 20px). Selector: `[class~="aui-button"][aria-label*="elp"]`.
3. **Help icon** — The circle-question glyph centred in the help button. Selector: `[class~="aui-button"][aria-label*="elp"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
4. **Field label** — The label (Material, or Download Duration in HCS) that names the control the help explains. Selector: `[class~="aui-field-label"]`.
5. **Field control** — The input (Steel) in ADM, HS, PBS, PFD and RWS scenes that the help text describes. Selector: `[class~="aui-field-control"]`.
6. **Help tooltip** — ADM and HS open the explanation as a tooltip above the button, up to 256px (ADM) or 384px (HS) wide. Selector: `[class~="aui-tooltip-popup"]`.
7. **Help popover** — PBS, PFD and RWS open the explanation in a solid popover (320px or 384px max) above the button. Selector: `[data-aui-popup-motion][role="dialog"]`.
8. **Select trigger** — HCS only: the Snow (115) select under the Download Duration label. Selector: `[class~="aui-select-trigger"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-032/options/adm-field-help/example.tsx`

```tsx
import { IconButton } from '../../../../../kit';

export default function Example() {
  return <IconButton name="circle-question" aria-label="Help" aui={{ scale: 'sm', color: 'secondary', paint: 'text', shape: 'soft', profile: 'square' }} />;
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-032/options/adm-field-help/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, ContainedIcon, Field, Tooltip, View } from '../../../../../kit';

// ADM AdmHelpTooltip (src/shared/lib/tooltip/AdmHelpTooltip.tsx): the same square Button after the label, opening a Tooltip above it (top, 8px offset) painted solid secondary at scale sm, up to 256px.
// Shown open; the scene keeps the one labelled field.
export default function AdmFieldHelpScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 10)', inlineSize: 'min(100%, calc(var(--p-px-16) * 18))' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <View data-ug-part="label-row" aui={{ scale: 'sm', profile: 'no-padding', paint: 'text', sx: { display: 'flex', alignItems: 'center' } }}>
          <Field.Label aui={{ scale: 'sm' }}>Material</Field.Label>
          <Tooltip.Provider>
            <Tooltip open>
              <Tooltip.Trigger render={<Button aria-label="Material help" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft' }} />}>
                <ContainedIcon name="circle-question" />
              </Tooltip.Trigger>
              <Tooltip.Portal container={host}>
                <Tooltip.Positioner side="top" sideOffset={8} className="ug-anchored">
                  <Tooltip.Popup aui={{ paint: 'solid', color: 'secondary', scale: 'sm', sx: { maxWidth: '256' } }}>Select the base material of the member.</Tooltip.Popup>
                </Tooltip.Positioner>
              </Tooltip.Portal>
            </Tooltip>
          </Tooltip.Provider>
        </View>
        <Field.Control aui={{ scale: 'sm' }} aria-label="Material" defaultValue="Steel" />
      </Field>
    </View>
  );
}
```

### 6. 28px popover icon (`pfd-field-help`)

Apps: PFD, AGPD

In context source: PFD: `src/pfd/fields.tsx`; AGPD: `src/agpd/inputs.tsx`

In context view: Shown.

#### In context structure additions

1. **Label row** — The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control. Selector: `[data-ug-part="label-row"]`.

#### In context layer steps

1. **Label row** — The flex row that puts the Material label (Download Duration in HCS) and the help button side by side above the control. Selector: `[data-ug-part="label-row"]`.
2. **Help button** — The 20px transparent secondary circle-question button that sits beside the field label; the Look select swaps it for the 28px ghost version. In scenes it is a Button around a ContainedIcon (square or square-compact, RWS fixed at 20px). Selector: `[class~="aui-button"][aria-label*="elp"]`.
3. **Help icon** — The circle-question glyph centred in the help button. Selector: `[class~="aui-button"][aria-label*="elp"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])`.
4. **Field label** — The label (Material, or Download Duration in HCS) that names the control the help explains. Selector: `[class~="aui-field-label"]`.
5. **Field control** — The input (Steel) in ADM, HS, PBS, PFD and RWS scenes that the help text describes. Selector: `[class~="aui-field-control"]`.
6. **Help tooltip** — ADM and HS open the explanation as a tooltip above the button, up to 256px (ADM) or 384px (HS) wide. Selector: `[class~="aui-tooltip-popup"]`.
7. **Help popover** — PBS, PFD and RWS open the explanation in a solid popover (320px or 384px max) above the button. Selector: `[data-aui-popup-motion][role="dialog"]`.
8. **Select trigger** — HCS only: the Snow (115) select under the Download Duration label. Selector: `[class~="aui-select-trigger"]`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-032/options/pfd-field-help/example.tsx`

```tsx
import { IconButton } from '../../../../../kit';

export default function Example() {
  return <IconButton name="circle-question" aria-label="Help" aui={{ scale: 'sm', color: 'secondary', paint: 'text', shape: 'soft', profile: 'square' }} />;
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-032/options/pfd-field-help/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, ContainedIcon, Field, Popover, View } from '../../../../../kit';

// PFD Help (src/pfd/fields.tsx; AGPD writes the same trigger in src/agpd/inputs.tsx): after the label text in the Field.Label row comes a Button (not an IconButton) at profile "square", 28px, not "contained".
// It opens a popover; its close is Button-029. The scene keeps the one labelled field.
export default function PfdFieldHelpScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 10)', inlineSize: 'min(100%, calc(var(--p-px-16) * 18))' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <View data-ug-part="label-row" aui={{ scale: 'sm', profile: 'no-padding', paint: 'text', sx: { display: 'flex', alignItems: 'center' } }}>
          <Field.Label aui={{ scale: 'sm' }}>Material</Field.Label>
          <Popover>
            <Popover.Trigger render={<Button aria-label="Material help" aui={{ scale: 'sm', paint: 'text', color: 'secondary', profile: 'square', shape: 'soft' }} />}>
              <ContainedIcon name="circle-question" />
            </Popover.Trigger>
            <Popover.Portal container={host}>
              <Popover.Positioner side="top" sideOffset={4} className="ug-anchored">
                <Popover.Popup aria-label="Material help" render={<View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { maxWidth: '384' } }} />}>
                  Select the base material of the member.
                </Popover.Popup>
              </Popover.Positioner>
            </Popover.Portal>
          </Popover>
        </View>
        <Field.Control aui={{ scale: 'sm' }} aria-label="Material" defaultValue="Steel" />
      </Field>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
