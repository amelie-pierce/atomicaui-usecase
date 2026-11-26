# Tabs-001: Pane tabs

Component family: **Tabs**

UI type: **Segmented tabs**

Source: `src/usecase-gallery/usecases/tabs/Tabs-001/usecase.ts`

## What it is

A row of 28px tab chips in the header of a pane switches the pane between its views (Summary and Result, Output and Job List); the selected chip is filled.

## When to choose it

Use it to switch one pane between a few views of the same result, with one view visible at a time and the tabs always on screen. Use Tabs-002 for the top-level switch of a phone workspace; use Tabs-003 when each tab reports a pass or fail. Do not use it for actions: those are Buttons in the header's action group.

## Where it belongs

The title spot of the Output pane header on desktop and tablet: HS (Output, Job List), PBS (Output, Connection List), FD (Output, Calculation Result), RWS (Output) and ADM (Summary, Result), each followed by the header's action group (Button-001, Button-002). ADC writes the same control above its 3D-Model and Design information panels. The ADC design tab rail is Tabs-004.

## Usage guidance

The example is the shared part: a Tabs root (profile "no-padding") holding a Tabs.List with Tabs.Tab chips and a Tabs.Panel per tab; each Tab takes color "surface-alt", paint "solid", shape "soft" and states selected { color: "overlay", paint: "solid" }, which renders a 28px chip with an 8px inline padding, a 6px gap between chips, a slate-100 fill and a slate-300 fill when selected, with no border. The pane frame and its 28px header band (a View with display flex, flexWrap wrap, minHeight 28 and zero block padding, which wraps the actions to a second row when narrow) are what the In context scene writes around it. HS, PBS, FD, RWS and ADM: one group. They render the same chips (measured in the browser: 28px high, 8px padding, selected rgb(203, 213, 225), others rgb(241, 245, 249), radius 4px, 16px/400, no border); HS writes no aui on the Tab because the default tab already computes to this fill, the others write the props above (TAB_IN_PANE_AUI). FD adds whiteSpace "nowrap" and PBS and FD a flexWrap "wrap" on the List, which only change how a narrow header wraps. A disabled tab differs by app (HS and FD paint it "text", so it has no fill; PBS keeps the filled chip, rgb(224, 224, 224)); the scenes show the enabled state. ADC: its tab strip sits outside a bordered pane, so it writes CHIP_AUI (the selected tab is a raised tonal chip, rgb(226, 232, 240) with a 1px dark border, against the flat slate-300 fill of the group above). The List wraps so the Save action drops to a right-aligned second row. Left out of the scenes: the header action group, the panel bodies, the Save button and every disabled state.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Tabs`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `profile`: `block-padding`, `default`, `no-padding`
- `color`: `overlay`, `raised`, `surface-alt`
- `paint`: `fixed`, `solid`, `text`, `tonal`
- `shape`: `soft`
- `scale`: `sm`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Tabs** — Root that switches the pane between its views; Summary is selected first through defaultValue="summary". ADC lists Model and Information, HS lists Summary and Result. Selector: `[class~="aui-tabs"]`.
2. **List** — The chip row in the pane header; ADC lets it wrap with flexWrap. Selector: `[class~="aui-tabs-list"]`.
3. **Tab** — A 28px soft chip: surface-alt solid when idle and overlay solid when selected. Selector: `[class~="aui-tabs-tab"]`.
4. **Panel** — Content of the selected view, "Summary content" or "Result content" in the example. Selector: `[class~="aui-tabs-panel"]`.

## Apps

- HS (`hs`)
- PBS (`pbs`)
- FD (`fd`)
- RWS (`rws`)
- ADM (`adm`)
- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Pane tabs (`hs-pane-tabs`)

Apps: HS, PBS, FD, RWS, ADM

In context source: HS: `src/hs/OutputTabs.tsx`; PBS: `src/ResultsSection.tsx`; FD: `src/components/Results.jsx`; RWS: `src/rws/output.tsx`; ADM: `src/app/layout/Workbench/Workbench.tsx`

In context view: Shown.

#### In context structure additions

1. **Output pane** — The Output section (soft, surface-alt) whose tabbed header holds the tab list. Part marker: `data-ug-part="output-pane"`.
2. **Pane header** — The 28px header row where the tab list takes the title spot, followed in the app by Print and Back to top actions. Part marker: `data-ug-part="pane-header"`.

#### Component UI source — `src/usecase-gallery/usecases/tabs/Tabs-001/example.tsx`

```tsx
import { Tabs } from '../../../kit';

export default function Example() {
  return (
    <Tabs defaultValue="summary" aui={{ profile: 'no-padding' }}>
      <Tabs.List>
        <Tabs.Tab value="summary" aui={{ color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'overlay', paint: 'solid' } } }}>
          Summary
        </Tabs.Tab>
        <Tabs.Tab value="result" aui={{ color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'overlay', paint: 'solid' } } }}>
          Result
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="summary">Summary content</Tabs.Panel>
      <Tabs.Panel value="result">Result content</Tabs.Panel>
    </Tabs>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/tabs/Tabs-001/options/hs-pane-tabs/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Tabs, View } from '../../../../../kit';

// HS, PBS, FD, RWS and ADM Output pane (HS OutputTabs.tsx, PBS ResultsSection.tsx, FD Results.jsx, RWS output.tsx, ADM Workbench.tsx): the tab list takes the title spot of the 28px tabbed header,
// chips with the TAB_IN_PANE_AUI props of the panel standard (ADM's pane-standard.ts; HS writes no aui and computes the same fill). The tab list is the only header item; the action group
// that follows it (Print, Back to top), the body panels, the disabled Job List / Calculation Result tab and PBS's wrap rule are left out.
const TAB_AUI = { color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'overlay', paint: 'solid' } } } as const;

export default function HsPaneTabsScene(_props: ContextProps) {
  return (
    <View
      data-ug-part="output-pane"
      as="section"
      aria-label="Output"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      style={{ inlineSize: 'min(100%, 480px)' }}
    >
      <Tabs defaultValue="summary" aui={{ profile: 'no-padding' }}>
        <View data-ug-part="pane-header" aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', minHeight: '28', flex: 'none', paddingBlockStart: '0', paddingBlockEnd: '0' } }}>
          <Tabs.List>
            <Tabs.Tab value="summary" aui={TAB_AUI}>Summary</Tabs.Tab>
            <Tabs.Tab value="result" aui={TAB_AUI}>Result</Tabs.Tab>
          </Tabs.List>
        </View>
      </Tabs>
    </View>
  );
}
```

### 2. Pane tabs — UI variant 2 (`adc-pane-tabs`)

Apps: ADC

In context source: ADC: `src/adc/Workspace.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/tabs/Tabs-001/options/adc-pane-tabs/example.tsx`

```tsx
import { Tabs } from '../../../../../kit';

export default function Example() {
  return (
    <Tabs defaultValue="summary" aui={{ profile: 'no-padding' }}>
      <Tabs.List>
        <Tabs.Tab value="summary" aui={{ color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'overlay', paint: 'solid' } } }}>
          Summary
        </Tabs.Tab>
        <Tabs.Tab value="result" aui={{ color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'overlay', paint: 'solid' } } }}>
          Result
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="summary">Summary content</Tabs.Panel>
      <Tabs.Panel value="result">Result content</Tabs.Panel>
    </Tabs>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/tabs/Tabs-001/options/adc-pane-tabs/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Tabs, View } from '../../../../../kit';

// ADC model viewer column (src/adc/Workspace.tsx:1351-1403): the tab strip sits outside a bordered pane, so the chips use CHIP_AUI of src/adc/ui.ts (the selected tab is a raised tonal chip with a 1px border).
// The strip wraps (Tabs.List flexWrap) so the Save action drops to a right-aligned second row when narrow; Save, the panels and the second tab's content are left out.
const CHIP_AUI = { color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'raised', paint: 'tonal' } } } as const;

export default function AdcPaneTabsScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Tabs defaultValue="model" aui={{ sx: { display: 'flex', flexDirection: 'column' } }}>
        <Tabs.List aui={{ sx: { flexWrap: 'wrap' } }}>
          <Tabs.Tab value="model" aui={CHIP_AUI}>Model</Tabs.Tab>
          <Tabs.Tab value="info" aui={CHIP_AUI}>Information</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
