# Accordion-001: Flush sections

Component family: **Accordion**

UI type: **Section accordion**

Source: `src/usecase-gallery/usecases/accordion/Accordion-001/usecase.ts`

## What it is

The Input pane as a stack of collapsible sections: each a title row with an optional section icon and a chevron, opening onto the fields of one topic.

## When to choose it

Use it to split a long input form into topics the user can fold away, with several open at once. Do not use it for release notes in a dialog (Accordion-002), for groups inside a picker (Accordion-003) or for one block that just hides content (a Collapsible).

## Where it belongs

The Input panel of all ten apps (HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS, ADC): one Accordion whose items are the input sections (Connection Type, Load Properties, ...). Nine apps also have the Engineering Overview grid, where each section is its own card (ADC has no grid). Real site source: the Input pane of each app (the paths are in source).

## Usage guidance

An Accordion at scale "sm" with openMultiple, so any number of sections stay open. Each Accordion.Item is color "surface", scale "sm", shape "none" with a 1px outlined top border (borderColor "outlined", borderStyle "solid", borderBlockStartWidth "1") on every item but the first, inside one surface View card (shape "soft", overflow "hidden", gap 0). Accordion.Trigger is color "surface", paint "text", scale "sm", shape "none" and holds an optional Accordion.Icon (weight "regular"), the title as Type span role "l4" weight "semi-bold", and Accordion.Chevron; Accordion.Panel takes profile "default" and holds the fields. The example is that stack of sections you copy; In context sets it in the pane frame. The apps write three UIs of the list, measured in the gallery (trigger 28px high, label 14px weight 600 in every one): HCS, ACE, ADM, HS and ADC show a 20px section icon before the title; PBS, PFD, RWS and AGPD have no icon; FD has no icon and its titles are upper case. Section cards (Engineering Overview) put each item on the pane as its own soft card, shape "soft", overflow "hidden" and the four radii stated, 6px apart, with no dividers; the apps split the same way (HCS, ACE, ADM and HS with the icon; PBS, PFD, RWS and AGPD without; FD upper case). The scenes leave out the pane header (Button-033), the section fields, further sections, the grid columns, the phone layout (closed sections divided by a bottom border) and the layout, keyboard and scroll handling.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Accordion`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `surface`, `surface-alt`
- `shape`: `none`, `soft`
- `scale`: `sm`
- `paint`: `fixed`, `text`
- `profile`: `block-padding`, `default`, `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Item** — One Input-pane section, Connection Type (open by default) or Load Properties; in the list layout (HCS, HS, PFD) items are flush with a 1px outlined line between them, in the cards layout (FD, PBS) each is a soft rounded card. Selector: `[class~="aui-accordion-item"]`.
2. **Trigger** — Full-width surface title row, scale "sm" and shape "none", that opens or closes its section; openMultiple lets several stay open. Selector: `[class~="aui-accordion-trigger"]`.
3. **Section icon** — Leading regular-weight topic icon, link for Connection Type and arrow-down for Load Properties; PBS omits it in both layouts, and FD omits it in both layouts while uppercasing titles. Selector: `[class~="aui-accordion-trigger-content"] [class~="aui-contained-icon"]`.
4. **Title** — Semi-bold l4 section name, "Connection Type" or "Load Properties" (upper case in the card layouts). Selector: `[class~="aui-accordion-trigger-content"]`.
5. **Chevron** — Disclosure chevron at the end of the row that turns with the open state. Selector: `[class~="aui-accordion-trigger"] > [class~="aui-accordion-chevron"]`.
6. **Panel** — Body of the open section with default padding; Connection Type shows the placeholder "Section fields" while Load Properties has no panel. Selector: `[class~="aui-accordion-panel"]`.

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
- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Section list (`hcs-section-list`)

Apps: HCS, ACE, ADM, HS, ADC

In context source: HCS: `src/App.tsx`; ACE: `src/features/estimator/ui/EstimatorInputPanel.tsx`; ADM: `src/features/design-inputs/components/InputsPanel/InputsPanel.tsx`; HS: `src/App.tsx`; ADC: `src/adc/Workspace.tsx`

In context view: Shown.

#### In context structure additions

1. **Input pane** — The Input aside (aria-label "Input") on a surface-alt background that holds the section list or section cards; the pane header, the fields and further sections are left out. Part marker: `data-ug-part="input-pane"`.

#### Component UI source — `src/usecase-gallery/usecases/accordion/Accordion-001/example.tsx`

```tsx
import { Accordion, Type, View } from '../../../kit';

export default function Example() {
  return (
    <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', overflow: 'hidden', gap: '0' } }}>
      <Accordion openMultiple defaultValue={['Connection Type']} aui={{ scale: 'sm' }}>
        <Accordion.Item value="Connection Type" aui={{ color: 'surface', scale: 'sm', shape: 'none' }}>
          <Accordion.Header>
            <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
              <Accordion.Icon name="link" weight="regular" aria-hidden />
              <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">Connection Type</Type>
              <Accordion.Chevron />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel aui={{ profile: 'default' }}>
            <Type as="p" role="p3">Section fields</Type>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="Load Properties" aui={{ color: 'surface', scale: 'sm', shape: 'none', sx: { borderColor: 'outlined', borderStyle: 'solid', borderBlockStartWidth: '1' } }}>
          <Accordion.Header>
            <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
              <Accordion.Icon name="arrow-down" weight="regular" aria-hidden />
              <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">Load Properties</Type>
              <Accordion.Chevron />
            </Accordion.Trigger>
          </Accordion.Header>
        </Accordion.Item>
      </Accordion>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/accordion/Accordion-001/options/hcs-section-list/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Accordion, Type, View } from '../../../../../kit';

// HCS Input pane (src/App.tsx Section; ACE, ADM, HS and ADC write the same sections through their own files): two flush sections in one surface card, a 1px outlined divider above the second, each with a regular-weight section icon, a Type l4 semi-bold title and the chevron. Left out: the pane header, the section fields and the other sections.
export default function HcsListScene(_props: ContextProps) {
  return (
    <View data-ug-part="input-pane" as="aside" aria-label="Input" aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0', gap: '0' } }} style={{ inlineSize: 'min(100%, 360px)' }}>
      <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', overflow: 'hidden', gap: '0' } }}>
        <span data-ug-component-root style={{ display: 'contents' }}>
          <Accordion openMultiple defaultValue={['Connection Type']} aui={{ scale: 'sm' }}>
          <Accordion.Item value="Connection Type" aui={{ color: 'surface', scale: 'sm', shape: 'none' }}>
            <Accordion.Header>
              <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                <Accordion.Icon name="link" weight="regular" aria-hidden />
                <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">Connection Type</Type>
                <Accordion.Chevron />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel aui={{ profile: 'default' }}>
              <Type as="p" role="p3">Section fields</Type>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="Load Properties" aui={{ color: 'surface', scale: 'sm', shape: 'none', sx: { borderColor: 'outlined', borderStyle: 'solid', borderBlockStartWidth: '1' } }}>
            <Accordion.Header>
              <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                <Accordion.Icon name="arrow-down" weight="regular" aria-hidden />
                <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">Load Properties</Type>
                <Accordion.Chevron />
              </Accordion.Trigger>
            </Accordion.Header>
          </Accordion.Item>
        </Accordion></span>
      </View>
    </View>
  );
}
```

### 2. Icon section list (`pbs-section-list`)

Apps: PBS, PFD, RWS, AGPD

In context source: PBS: `src/App.tsx`; PFD: `src/pfd/InputPane.tsx`; RWS: `src/rws/inputs.tsx`; AGPD: `src/agpd/InputPanel.tsx`

In context view: Shown.

#### In context structure additions

1. **Input pane** — The Input aside (aria-label "Input") on a surface-alt background that holds the section list or section cards; the pane header, the fields and further sections are left out. Part marker: `data-ug-part="input-pane"`.

#### Component UI source — `src/usecase-gallery/usecases/accordion/Accordion-001/options/pbs-section-list/example.tsx`

```tsx
import { Accordion, Type, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', overflow: 'hidden', gap: '0' } }}>
      <Accordion openMultiple defaultValue={['Connection Type']} aui={{ scale: 'sm' }}>
        <Accordion.Item value="Connection Type" aui={{ color: 'surface', scale: 'sm', shape: 'none' }}>
          <Accordion.Header>
            <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
              <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">Connection Type</Type>
              <Accordion.Chevron />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel aui={{ profile: 'default' }}>
            <Type as="p" role="p3">Section fields</Type>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="Load Properties" aui={{ color: 'surface', scale: 'sm', shape: 'none', sx: { borderColor: 'outlined', borderStyle: 'solid', borderBlockStartWidth: '1' } }}>
          <Accordion.Header>
            <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
              <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">Load Properties</Type>
              <Accordion.Chevron />
            </Accordion.Trigger>
          </Accordion.Header>
        </Accordion.Item>
      </Accordion>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/accordion/Accordion-001/options/pbs-section-list/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Accordion, Type, View } from '../../../../../kit';

// PBS Input pane (src/App.tsx InputSection; PFD, RWS and AGPD write the same sections): two flush sections in one surface card, a 1px outlined divider above the second, each with a Type l4 semi-bold title and the chevron but no section icon. Left out: the pane header, the section fields and the other sections.
export default function PbsListScene(_props: ContextProps) {
  return (
    <View data-ug-part="input-pane" as="aside" aria-label="Input" aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0', gap: '0' } }} style={{ inlineSize: 'min(100%, 360px)' }}>
      <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', overflow: 'hidden', gap: '0' } }}>
        <span data-ug-component-root style={{ display: 'contents' }}>
          <Accordion openMultiple defaultValue={['Connection Type']} aui={{ scale: 'sm' }}>
          <Accordion.Item value="Connection Type" aui={{ color: 'surface', scale: 'sm', shape: 'none' }}>
            <Accordion.Header>
              <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">Connection Type</Type>
                <Accordion.Chevron />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel aui={{ profile: 'default' }}>
              <Type as="p" role="p3">Section fields</Type>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="Load Properties" aui={{ color: 'surface', scale: 'sm', shape: 'none', sx: { borderColor: 'outlined', borderStyle: 'solid', borderBlockStartWidth: '1' } }}>
            <Accordion.Header>
              <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">Load Properties</Type>
                <Accordion.Chevron />
              </Accordion.Trigger>
            </Accordion.Header>
          </Accordion.Item>
        </Accordion></span>
      </View>
    </View>
  );
}
```

### 3. Plain section list (`fd-section-list`)

Apps: FD

In context source: FD: `src/components/InputPane.jsx`

In context view: Shown.

#### In context structure additions

1. **Input pane** — The Input aside (aria-label "Input") on a surface-alt background that holds the section list or section cards; the pane header, the fields and further sections are left out. Part marker: `data-ug-part="input-pane"`.

#### Component UI source — `src/usecase-gallery/usecases/accordion/Accordion-001/options/fd-section-list/example.tsx`

```tsx
import { Accordion, Type, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', overflow: 'hidden', gap: '0' } }}>
      <Accordion openMultiple defaultValue={['Connection Type']} aui={{ scale: 'sm' }}>
        <Accordion.Item value="Connection Type" aui={{ color: 'surface', scale: 'sm', shape: 'none' }}>
          <Accordion.Header>
            <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
              <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">CONNECTION TYPE</Type>
              <Accordion.Chevron />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel aui={{ profile: 'default' }}>
            <Type as="p" role="p3">Section fields</Type>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="Load Properties" aui={{ color: 'surface', scale: 'sm', shape: 'none', sx: { borderColor: 'outlined', borderStyle: 'solid', borderBlockStartWidth: '1' } }}>
          <Accordion.Header>
            <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
              <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">LOAD PROPERTIES</Type>
              <Accordion.Chevron />
            </Accordion.Trigger>
          </Accordion.Header>
        </Accordion.Item>
      </Accordion>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/accordion/Accordion-001/options/fd-section-list/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Accordion, Type, View } from '../../../../../kit';

// FD Input pane (src/components/InputPane.jsx Section): two flush sections in one surface card, a 1px outlined divider above the second, each with no section icon and the title set in upper case by the app (toLocaleUpperCase). Left out: the pane header, the section fields and the other sections.
export default function FdListScene(_props: ContextProps) {
  return (
    <View data-ug-part="input-pane" as="aside" aria-label="Input" aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0', gap: '0' } }} style={{ inlineSize: 'min(100%, 360px)' }}>
      <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', overflow: 'hidden', gap: '0' } }}>
        <span data-ug-component-root style={{ display: 'contents' }}>
          <Accordion openMultiple defaultValue={['Connection Type']} aui={{ scale: 'sm' }}>
          <Accordion.Item value="Connection Type" aui={{ color: 'surface', scale: 'sm', shape: 'none' }}>
            <Accordion.Header>
              <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">CONNECTION TYPE</Type>
                <Accordion.Chevron />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel aui={{ profile: 'default' }}>
              <Type as="p" role="p3">Section fields</Type>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="Load Properties" aui={{ color: 'surface', scale: 'sm', shape: 'none', sx: { borderColor: 'outlined', borderStyle: 'solid', borderBlockStartWidth: '1' } }}>
            <Accordion.Header>
              <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">LOAD PROPERTIES</Type>
                <Accordion.Chevron />
              </Accordion.Trigger>
            </Accordion.Header>
          </Accordion.Item>
        </Accordion></span>
      </View>
    </View>
  );
}
```

### 4. Section cards (`hcs-section-cards`)

Apps: HCS, ACE, ADM, HS

In context source: HCS: `src/App.tsx`; ACE: `src/features/estimator/ui/EstimatorInputPanel.tsx`; ADM: `src/features/design-inputs/components/InputsPanel/InputsPanel.tsx`; HS: `src/App.tsx`

In context view: Shown.

#### In context structure additions

1. **Input pane** — The Input aside (aria-label "Input") on a surface-alt background that holds the section list or section cards; the pane header, the fields and further sections are left out. Part marker: `data-ug-part="input-pane"`.

#### Component UI source — `src/usecase-gallery/usecases/accordion/Accordion-001/options/hcs-section-cards/example.tsx`

```tsx
import { Accordion, Type, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', overflow: 'hidden', gap: '0' } }}>
      <Accordion openMultiple defaultValue={['Connection Type']} aui={{ scale: 'sm' }}>
        <View aui={{ paint: 'text', profile: 'no-padding', sx: { width: 'fill' } }} style={{ display: 'flex', flexDirection: 'column', rowGap: 6 }}>
        <Accordion.Item value="Connection Type" aui={{ color: 'surface', scale: 'sm', shape: 'soft', sx: { overflow: 'hidden', radiusStartStart: 'soft', radiusStartEnd: 'soft', radiusEndStart: 'soft', radiusEndEnd: 'soft' } }}>
          <Accordion.Header>
            <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
              <Accordion.Icon name="link" weight="regular" aria-hidden />
              <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">Connection Type</Type>
              <Accordion.Chevron />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel aui={{ profile: 'default' }}>
            <Type as="p" role="p3">Section fields</Type>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="Load Properties" aui={{ color: 'surface', scale: 'sm', shape: 'soft', sx: { overflow: 'hidden', radiusStartStart: 'soft', radiusStartEnd: 'soft', radiusEndStart: 'soft', radiusEndEnd: 'soft' } }}>
          <Accordion.Header>
            <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
              <Accordion.Icon name="arrow-down" weight="regular" aria-hidden />
              <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">Load Properties</Type>
              <Accordion.Chevron />
            </Accordion.Trigger>
          </Accordion.Header>
        </Accordion.Item>
        </View>
      </Accordion>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/accordion/Accordion-001/options/hcs-section-cards/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Accordion, Type, View } from '../../../../../kit';

// HCS Input pane (src/App.tsx Section; ACE, ADM, HS and ADC write the same sections through their own files), Engineering Overview grid: two soft section cards 6px apart (a native rowGap on the View holding the items) on the pane, each with a regular-weight section icon, a Type l4 semi-bold title and the chevron. Every corner of a card is rounded, stated as the four radii. Left out: the pane header, the section fields, the other sections and the grid columns.
export default function HcsCardsScene(_props: ContextProps) {
  return (
    <View data-ug-part="input-pane" as="aside" aria-label="Input" aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0', gap: '0' } }} style={{ inlineSize: 'min(100%, 360px)' }}>
      <span data-ug-component-root style={{ display: 'contents' }}>
          <Accordion openMultiple defaultValue={['Connection Type']} aui={{ scale: 'sm' }}>
        <View aui={{ paint: 'text', profile: 'no-padding', sx: { width: 'fill' } }} style={{ display: 'flex', flexDirection: 'column', rowGap: 6 }}>
          <Accordion.Item value="Connection Type" aui={{ color: 'surface', scale: 'sm', shape: 'soft', sx: { overflow: 'hidden', radiusStartStart: 'soft', radiusStartEnd: 'soft', radiusEndStart: 'soft', radiusEndEnd: 'soft' } }}>
            <Accordion.Header>
              <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                <Accordion.Icon name="link" weight="regular" aria-hidden />
                <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">Connection Type</Type>
                <Accordion.Chevron />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel aui={{ profile: 'default' }}>
              <Type as="p" role="p3">Section fields</Type>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="Load Properties" aui={{ color: 'surface', scale: 'sm', shape: 'soft', sx: { overflow: 'hidden', radiusStartStart: 'soft', radiusStartEnd: 'soft', radiusEndStart: 'soft', radiusEndEnd: 'soft' } }}>
            <Accordion.Header>
              <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                <Accordion.Icon name="arrow-down" weight="regular" aria-hidden />
                <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">Load Properties</Type>
                <Accordion.Chevron />
              </Accordion.Trigger>
            </Accordion.Header>
          </Accordion.Item>
        </View>
      </Accordion></span>
    </View>
  );
}
```

### 5. Icon section cards (`pbs-section-cards`)

Apps: PBS, PFD, RWS, AGPD

In context source: PBS: `src/App.tsx`; PFD: `src/pfd/InputPane.tsx`; RWS: `src/rws/inputs.tsx`; AGPD: `src/agpd/InputPanel.tsx`

In context view: Shown.

#### In context structure additions

1. **Input pane** — The Input aside (aria-label "Input") on a surface-alt background that holds the section list or section cards; the pane header, the fields and further sections are left out. Part marker: `data-ug-part="input-pane"`.

#### Component UI source — `src/usecase-gallery/usecases/accordion/Accordion-001/options/pbs-section-cards/example.tsx`

```tsx
import { Accordion, Type, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', overflow: 'hidden', gap: '0' } }}>
      <Accordion openMultiple defaultValue={['Connection Type']} aui={{ scale: 'sm' }}>
        <View aui={{ paint: 'text', profile: 'no-padding', sx: { width: 'fill' } }} style={{ display: 'flex', flexDirection: 'column', rowGap: 6 }}>
        <Accordion.Item value="Connection Type" aui={{ color: 'surface', scale: 'sm', shape: 'soft', sx: { overflow: 'hidden', radiusStartStart: 'soft', radiusStartEnd: 'soft', radiusEndStart: 'soft', radiusEndEnd: 'soft' } }}>
          <Accordion.Header>
            <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
              <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">Connection Type</Type>
              <Accordion.Chevron />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel aui={{ profile: 'default' }}>
            <Type as="p" role="p3">Section fields</Type>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="Load Properties" aui={{ color: 'surface', scale: 'sm', shape: 'soft', sx: { overflow: 'hidden', radiusStartStart: 'soft', radiusStartEnd: 'soft', radiusEndStart: 'soft', radiusEndEnd: 'soft' } }}>
          <Accordion.Header>
            <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
              <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">Load Properties</Type>
              <Accordion.Chevron />
            </Accordion.Trigger>
          </Accordion.Header>
        </Accordion.Item>
        </View>
      </Accordion>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/accordion/Accordion-001/options/pbs-section-cards/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Accordion, Type, View } from '../../../../../kit';

// PBS Input pane (src/App.tsx InputSection; PFD, RWS and AGPD write the same sections), Engineering Overview grid: two soft section cards 6px apart (a native rowGap on the View holding the items) on the pane, each with a Type l4 semi-bold title and the chevron but no section icon. Every corner of a card is rounded, stated as the four radii. Left out: the pane header, the section fields, the other sections and the grid columns.
export default function PbsCardsScene(_props: ContextProps) {
  return (
    <View data-ug-part="input-pane" as="aside" aria-label="Input" aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0', gap: '0' } }} style={{ inlineSize: 'min(100%, 360px)' }}>
      <span data-ug-component-root style={{ display: 'contents' }}>
          <Accordion openMultiple defaultValue={['Connection Type']} aui={{ scale: 'sm' }}>
        <View aui={{ paint: 'text', profile: 'no-padding', sx: { width: 'fill' } }} style={{ display: 'flex', flexDirection: 'column', rowGap: 6 }}>
          <Accordion.Item value="Connection Type" aui={{ color: 'surface', scale: 'sm', shape: 'soft', sx: { overflow: 'hidden', radiusStartStart: 'soft', radiusStartEnd: 'soft', radiusEndStart: 'soft', radiusEndEnd: 'soft' } }}>
            <Accordion.Header>
              <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">Connection Type</Type>
                <Accordion.Chevron />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel aui={{ profile: 'default' }}>
              <Type as="p" role="p3">Section fields</Type>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="Load Properties" aui={{ color: 'surface', scale: 'sm', shape: 'soft', sx: { overflow: 'hidden', radiusStartStart: 'soft', radiusStartEnd: 'soft', radiusEndStart: 'soft', radiusEndEnd: 'soft' } }}>
            <Accordion.Header>
              <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">Load Properties</Type>
                <Accordion.Chevron />
              </Accordion.Trigger>
            </Accordion.Header>
          </Accordion.Item>
        </View>
      </Accordion></span>
    </View>
  );
}
```

### 6. Outlined section cards (`fd-section-cards`)

Apps: FD

In context source: FD: `src/components/InputPane.jsx`

In context view: Shown.

#### In context structure additions

1. **Input pane** — The Input aside (aria-label "Input") on a surface-alt background that holds the section list or section cards; the pane header, the fields and further sections are left out. Part marker: `data-ug-part="input-pane"`.

#### Component UI source — `src/usecase-gallery/usecases/accordion/Accordion-001/options/fd-section-cards/example.tsx`

```tsx
import { Accordion, Type, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', overflow: 'hidden', gap: '0' } }}>
      <Accordion openMultiple defaultValue={['Connection Type']} aui={{ scale: 'sm' }}>
        <View aui={{ paint: 'text', profile: 'no-padding', sx: { width: 'fill' } }} style={{ display: 'flex', flexDirection: 'column', rowGap: 6 }}>
        <Accordion.Item value="Connection Type" aui={{ color: 'surface', scale: 'sm', shape: 'soft', sx: { overflow: 'hidden', radiusStartStart: 'soft', radiusStartEnd: 'soft', radiusEndStart: 'soft', radiusEndEnd: 'soft' } }}>
          <Accordion.Header>
            <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
              <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">CONNECTION TYPE</Type>
              <Accordion.Chevron />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel aui={{ profile: 'default' }}>
            <Type as="p" role="p3">Section fields</Type>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="Load Properties" aui={{ color: 'surface', scale: 'sm', shape: 'soft', sx: { overflow: 'hidden', radiusStartStart: 'soft', radiusStartEnd: 'soft', radiusEndStart: 'soft', radiusEndEnd: 'soft' } }}>
          <Accordion.Header>
            <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
              <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">LOAD PROPERTIES</Type>
              <Accordion.Chevron />
            </Accordion.Trigger>
          </Accordion.Header>
        </Accordion.Item>
        </View>
      </Accordion>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/accordion/Accordion-001/options/fd-section-cards/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Accordion, Type, View } from '../../../../../kit';

// FD Input pane (src/components/InputPane.jsx Section), Engineering Overview grid: two soft section cards 6px apart (a native rowGap on the View holding the items) on the pane, each with no section icon and the title set in upper case by the app (toLocaleUpperCase). Every corner of a card is rounded, stated as the four radii. Left out: the pane header, the section fields, the other sections and the grid columns.
export default function FdCardsScene(_props: ContextProps) {
  return (
    <View data-ug-part="input-pane" as="aside" aria-label="Input" aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0', gap: '0' } }} style={{ inlineSize: 'min(100%, 360px)' }}>
      <span data-ug-component-root style={{ display: 'contents' }}>
          <Accordion openMultiple defaultValue={['Connection Type']} aui={{ scale: 'sm' }}>
        <View aui={{ paint: 'text', profile: 'no-padding', sx: { width: 'fill' } }} style={{ display: 'flex', flexDirection: 'column', rowGap: 6 }}>
          <Accordion.Item value="Connection Type" aui={{ color: 'surface', scale: 'sm', shape: 'soft', sx: { overflow: 'hidden', radiusStartStart: 'soft', radiusStartEnd: 'soft', radiusEndStart: 'soft', radiusEndEnd: 'soft' } }}>
            <Accordion.Header>
              <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">CONNECTION TYPE</Type>
                <Accordion.Chevron />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel aui={{ profile: 'default' }}>
              <Type as="p" role="p3">Section fields</Type>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="Load Properties" aui={{ color: 'surface', scale: 'sm', shape: 'soft', sx: { overflow: 'hidden', radiusStartStart: 'soft', radiusStartEnd: 'soft', radiusEndStart: 'soft', radiusEndEnd: 'soft' } }}>
            <Accordion.Header>
              <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">LOAD PROPERTIES</Type>
                <Accordion.Chevron />
              </Accordion.Trigger>
            </Accordion.Header>
          </Accordion.Item>
        </View>
      </Accordion></span>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
