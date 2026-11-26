# Button-001: Print output button

Component family: **Button**

UI type: **Single button**

Source: `src/usecase-gallery/usecases/button/Button-001/usecase.ts`

## What it is

A Button with a print icon is the last item of a results pane header: quiet and tonal in HCS, a solid black Button in the tabbed headers of HS, FD and ADM.

## When to choose it

Use it for the one print action of the results pane. HCS keeps it quieter than a solid Button (tonal surface); the apps that follow the HS 2.0 panel standard make ordinary actions secondary solid. Add the native disabled attribute while nothing can be printed (all four apps disable it while the inputs are invalid or there is no result).

## Where it belongs

The action group at the end of the Output pane header, after the scroll helpers and Configure columns (not in the table toolbar). Real site source: HCS App.tsx (Output pane header); HS OutputPane.tsx (Print Output, after Fullscreen) and FD Results.jsx (after Column settings), both inside the tabbed header; ADM Workbench.tsx (right of the Summary and Result tabs, only on the result branch). ACE, PFD, PBS, AGPD and RWS have no Print Output Button: they print from the File menu or the phone drawer (Menubar items), and ADC has no print. View options, the other tonal button of HCS, lives in the 3D viewer (Button-009).

## Usage guidance

Choose the UI to view from the options at the top: each shows the Component UI and the In context UI, and the Document and Code follow it. White button with icon is the HCS Button and the example: aui scale "sm", color "surface", paint "tonal", sx flex "none", with Button.Icon print before the label. In HCS the Output pane header is a title ("Output") with the action group pushed to the end by an app margin (here an inline one). Black button with icon (HS, FD): the header is a 28px tab list (HS: Output, Job List; FD: Output, Calculation Result) with the action group growing and right-aligned after it; Print Output is a Button with aui color "secondary", paint "solid", scale "sm", shape "soft" and Button.Icon print. Black button without icon (ADM): the same tabbed header (Summary, Result) with the action group pushed to the end by a margin (an inline one here); the same Button without the icon, labelled Print Summary or Print Result after the active tab. Disabled button is the HCS header with the native disabled attribute on the Button; HS, FD and ADM disable theirs the same way. Left out of every scene: the Configure columns trigger, the scroll helpers, HS Fullscreen, the toolbar, the results table and Table Notes; also the icon-only form FD shows in a narrow header and ADM's phone print row.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Button`, `Tabs`, `Type`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `color`: `overlay`, `secondary`, `surface`, `surface-alt`
- `paint`: `fixed`, `solid`, `text`, `tonal`
- `profile`: `block-padding`, `default`, `no-padding`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Container** — The Print Output Button: scale "sm", surface color with tonal paint and flex "none" so it keeps its width at the end of the results pane header (HCS look; HS, FD and ADM scenes swap in a solid secondary black Button). Selector: `[class~="aui-button"]`.
2. **Icon** — The print glyph before the label, at scale "sm" so it matches the small Button. Selector: `[class~="aui-button"] > :is([class~="aui-contained-icon"], [class~="aui-icon"])`.
3. **Label** — The text "Print Output" that names the action of printing the results. Selector: `[class~="aui-button"]`. Direct text is highlighted.

## Component layer steps

1. **Container** — The Print Output Button: scale "sm", surface color with tonal paint and flex "none" so it keeps its width at the end of the results pane header (HCS look; HS, FD and ADM scenes swap in a solid secondary black Button). Selector: `[class~="aui-button"]`.
2. **Icon** — The print glyph before the label, at scale "sm" so it matches the small Button. Selector: `[class~="aui-button"] > :is([class~="aui-contained-icon"], [class~="aui-icon"])`.

## Apps

- HCS (`hcs`)
- ADM (`adm`)
- HS (`hs`)
- FD (`fd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. White button with icon (`white-icon`)

Apps: HCS

In context source: HCS: `src/App.tsx`

In context view: Shown.

#### In context structure additions

1. **Output pane** — The Output pane frame, a surface-alt section that holds the header row. The toolbar, table and notes are left out. Part marker: `data-ug-part="output-pane"`.
2. **Output title** — The "Output" heading at the start of the pane header. Part marker: `data-ug-part="output-title"`.
3. **Header actions** — The action group pushed to the end of the header, which holds the Print Output button (HCS). Part marker: `data-ug-part="header-actions"`.

#### In context layer steps

1. **Output pane** — The Output pane frame, a surface-alt section that holds the header row. The toolbar, table and notes are left out. Selector: `[data-ug-part="output-pane"]`.
2. **Output title** — The "Output" heading at the start of the pane header. Selector: `[data-ug-part="output-title"]`.
3. **Header actions** — The action group pushed to the end of the header, which holds the Print Output button (HCS). Selector: `[data-ug-part="header-actions"]`.
4. **Container** — The Print Output Button: scale "sm", surface color with tonal paint and flex "none" so it keeps its width at the end of the results pane header (HCS look; HS, FD and ADM scenes swap in a solid secondary black Button). Selector: `[class~="aui-button"]`.
5. **Icon** — The print glyph before the label, at scale "sm" so it matches the small Button. Selector: `[class~="aui-button"] > :is([class~="aui-contained-icon"], [class~="aui-icon"])`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-001/example.tsx`

```tsx
import { Button } from '../../../kit';

export default function Example() {
  return (
    <Button aui={{ scale: 'sm', color: 'surface', paint: 'tonal', sx: { flex: 'none' } }}>
      <Button.Icon name="print" aui={{ scale: 'sm' }} />
      Print Output
    </Button>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-001/options/white-icon/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Type, View } from '../../../../../kit';

// Print Output enabled, as the HCS Output pane composes it, cut to the header: pane frame, wrapping header (title, then the action group
// pushed to the end by the app's `.hcs-output-actions` margin, here an inline one). The toolbar, table and notes are left out.

export default function EnabledScene({ children }: ContextProps) {
  return (
    <View
      as="section"
      data-ug-part="output-pane"
      aria-label="Output"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      style={{ inlineSize: 'min(100%, 720px)' }}
    >
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', minHeight: '28', flex: 'none', paddingBlockStart: '0', paddingBlockEnd: '0' } }}>
        <Type data-ug-part="output-title" as="h2" role="l3" weight="semi-bold" aui={{ sx: { display: 'flex', alignItems: 'center', minHeight: '28' } }}>Output</Type>
        <View data-ug-part="header-actions" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', justifyContent: 'end', flexWrap: 'wrap', gap: '6', minHeight: '28' } }} style={{ marginInlineStart: 'auto' }}>
          {children}
        </View>
      </View>
    </View>
  );
}
```

### 2. Black button with icon (`black-icon`)

Apps: HS, FD

In context source: HS: `src/hs/OutputPane.tsx`; FD: `src/components/Results.jsx`

In context view: Shown.

#### In context structure additions

1. **Output pane** — The Output pane frame, a surface-alt section that holds the header row. Only the header is shown. Part marker: `data-ug-part="output-pane"`.
2. **Output tabs** — The Output and Job List tabs at the start of the header, with the selected tab on an overlay fill. Part marker: `data-ug-part="output-tabs"`.
3. **Header actions** — The action group that grows and right-aligns itself after the tabs and holds Print Output. Part marker: `data-ug-part="header-actions"`.

#### In context layer steps

1. **Output pane** — The Output pane frame, a surface-alt section that holds the header row. Only the header is shown. Selector: `[data-ug-part="output-pane"]`.
2. **Output tabs** — The Output and Job List tabs at the start of the header, with the selected tab on an overlay fill. Selector: `[data-ug-part="output-tabs"]`.
3. **Header actions** — The action group that grows and right-aligns itself after the tabs and holds Print Output. Selector: `[data-ug-part="header-actions"]`.
4. **Container** — The Print Output Button: scale "sm", surface color with tonal paint and flex "none" so it keeps its width at the end of the results pane header (HCS look; HS, FD and ADM scenes swap in a solid secondary black Button). Selector: `[class~="aui-button"]`.
5. **Icon** — The print glyph before the label, at scale "sm" so it matches the small Button. Selector: `[class~="aui-button"] > :is([class~="aui-contained-icon"], [class~="aui-icon"])`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-001/options/black-icon/example.tsx`

```tsx
import { Button } from '../../../../../kit';

export default function Example() {
  return (
    <Button aui={{ color: 'secondary', paint: 'solid', scale: 'sm', shape: 'soft' }}>
      <Button.Icon name="print" aui={{ scale: 'sm' }} />
      Print Output
    </Button>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-001/options/black-icon/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, Tabs, View } from '../../../../../kit';

// HS and FD Output header (HS OutputTabs.tsx, FD Results.jsx): the 28px tabbed header of the panel standard, tab list first, then the action group, which grows
// and right-aligns itself. Print Output is a secondary solid soft sm Button with the print icon. Enabled.
// Configure columns, the scroll helpers, Fullscreen, the toolbar and the table are left out.

const TAB_AUI = { color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'overlay', paint: 'solid' } } } as const;

export default function HsEnabledScene(_props: ContextProps) {
  return (
    <View
      as="section"
      data-ug-part="output-pane"
      aria-label="Output"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      style={{ inlineSize: 'min(100%, 720px)' }}
    >
      <Tabs defaultValue="output" aui={{ profile: 'no-padding' }}>
        <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', minHeight: '28', flex: 'none', paddingBlockStart: '0', paddingBlockEnd: '0' } }}>
          <Tabs.List data-ug-part="output-tabs">
            <Tabs.Tab value="output" aui={TAB_AUI}>Output</Tabs.Tab>
            <Tabs.Tab value="jobs" aui={TAB_AUI}>Job List</Tabs.Tab>
          </Tabs.List>
          <View data-ug-part="header-actions" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', justifyContent: 'end', flexWrap: 'wrap', gap: '6', flex: 'auto' } }}>
            <Button aui={{ color: 'secondary', paint: 'solid', scale: 'sm', shape: 'soft' }}>
              <Button.Icon name="print" aui={{ scale: 'sm' }} />
              Print Output
            </Button>
          </View>
        </View>
      </Tabs>
    </View>
  );
}
```

### 3. Black button without icon (`black-no-icon`)

Apps: ADM

In context source: ADM: `src/app/layout/Workbench/Workbench.tsx`

In context view: Shown.

#### In context structure additions

1. **Output pane** — The Output pane frame, a surface-alt section that holds the header row. Only the header is shown. Part marker: `data-ug-part="output-pane"`.
2. **Output tabs** — The Summary and Result tabs at the start of the header; the Print label follows the selected tab. Part marker: `data-ug-part="output-tabs"`.
3. **Header actions** — The action group pushed to the end of the header with an auto inline-start margin; it holds the text-only Print Summary button. Part marker: `data-ug-part="header-actions"`.

#### In context layer steps

1. **Output pane** — The Output pane frame, a surface-alt section that holds the header row. Only the header is shown. Selector: `[data-ug-part="output-pane"]`.
2. **Output tabs** — The Summary and Result tabs at the start of the header; the Print label follows the selected tab. Selector: `[data-ug-part="output-tabs"]`.
3. **Header actions** — The action group pushed to the end of the header with an auto inline-start margin; it holds the text-only Print Summary button. Selector: `[data-ug-part="header-actions"]`.
4. **Container** — The Print Output Button: scale "sm", surface color with tonal paint and flex "none" so it keeps its width at the end of the results pane header (HCS look; HS, FD and ADM scenes swap in a solid secondary black Button). Selector: `[class~="aui-button"]`.
5. **Icon** — The print glyph before the label, at scale "sm" so it matches the small Button. Selector: `[class~="aui-button"] > :is([class~="aui-contained-icon"], [class~="aui-icon"])`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-001/options/black-no-icon/example.tsx`

```tsx
import { Button } from '../../../../../kit';

export default function Example() {
  return (
    <Button aui={{ color: 'secondary', paint: 'solid', scale: 'sm', shape: 'soft' }}>
      Print Summary
    </Button>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-001/options/black-no-icon/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, Tabs, View } from '../../../../../kit';

// ADM Output header (Workbench.tsx): the same tabbed header, but the action group is pushed to the end by the app's `.adm-header-actions` margin (here an inline one)
// and Print is text only (the label follows the tab: Print Summary or Print Result). Enabled.
// The tab bodies, the toolbar and the table are left out.

const TAB_AUI = { color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'overlay', paint: 'solid' } } } as const;

export default function AdmEnabledScene(_props: ContextProps) {
  return (
    <View
      as="section"
      data-ug-part="output-pane"
      aria-label="Output"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      style={{ inlineSize: 'min(100%, 720px)' }}
    >
      <Tabs defaultValue="summary" aui={{ profile: 'no-padding' }}>
        <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', minHeight: '28', flex: 'none', paddingBlockStart: '0', paddingBlockEnd: '0' } }}>
          <Tabs.List data-ug-part="output-tabs">
            <Tabs.Tab value="summary" aui={TAB_AUI}>Summary</Tabs.Tab>
            <Tabs.Tab value="result" aui={TAB_AUI}>Result</Tabs.Tab>
          </Tabs.List>
          <View data-ug-part="header-actions" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '6', height: '28' } }} style={{ marginInlineStart: 'auto' }}>
            <Button aui={{ color: 'secondary', paint: 'solid', scale: 'sm', shape: 'soft' }}>
              Print Summary
            </Button>
          </View>
        </View>
      </Tabs>
    </View>
  );
}
```

### 4. Disabled button (`disabled`)

Apps: HCS, ADM, HS, FD

In context source: HCS: `src/App.tsx`; ADM: `src/app/layout/Workbench/Workbench.tsx`; HS: `src/hs/OutputPane.tsx`; FD: `src/components/Results.jsx`

In context view: Shown.

#### In context structure additions

1. **Output pane** — The Output pane frame, a surface-alt section that holds the header row. Labelled "Output, inputs invalid". Part marker: `data-ug-part="output-pane"`.
2. **Output title** — The "Output" heading at the start of the pane header. Part marker: `data-ug-part="output-title"`.
3. **Header actions** — The action group pushed to the end of the header; its Print Output button is disabled while the inputs are invalid. Part marker: `data-ug-part="header-actions"`.

#### In context layer steps

1. **Output pane** — The Output pane frame, a surface-alt section that holds the header row. Labelled "Output, inputs invalid". Selector: `[data-ug-part="output-pane"]`.
2. **Output title** — The "Output" heading at the start of the pane header. Selector: `[data-ug-part="output-title"]`.
3. **Header actions** — The action group pushed to the end of the header; its Print Output button is disabled while the inputs are invalid. Selector: `[data-ug-part="header-actions"]`.
4. **Container** — The Print Output Button: scale "sm", surface color with tonal paint and flex "none" so it keeps its width at the end of the results pane header (HCS look; HS, FD and ADM scenes swap in a solid secondary black Button). Selector: `[class~="aui-button"]`.
5. **Icon** — The print glyph before the label, at scale "sm" so it matches the small Button. Selector: `[class~="aui-button"] > :is([class~="aui-contained-icon"], [class~="aui-icon"])`.

#### Component UI source — `src/usecase-gallery/usecases/button/Button-001/options/disabled/example.tsx`

```tsx
import { Button } from '../../../../../kit';

export default function Example() {
  return (
    <Button disabled aui={{ scale: 'sm', color: 'surface', paint: 'tonal', sx: { flex: 'none' } }}>
      <Button.Icon name="print" aui={{ scale: 'sm' }} />
      Print Output
    </Button>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/button/Button-001/options/disabled/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Button, Type, View } from '../../../../../kit';

// Print Output while the inputs are invalid: the same header as the Enabled case, with the native disabled attribute on Print Output.

export default function DisabledScene(_props: ContextProps) {
  return (
    <View
      as="section"
      data-ug-part="output-pane"
      aria-label="Output, inputs invalid"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      style={{ inlineSize: 'min(100%, 720px)' }}
    >
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', minHeight: '28', flex: 'none', paddingBlockStart: '0', paddingBlockEnd: '0' } }}>
        <Type data-ug-part="output-title" as="h2" role="l3" weight="semi-bold" aui={{ sx: { display: 'flex', alignItems: 'center', minHeight: '28' } }}>Output</Type>
        <View data-ug-part="header-actions" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', justifyContent: 'end', flexWrap: 'wrap', gap: '6', minHeight: '28' } }} style={{ marginInlineStart: 'auto' }}>
          <Button disabled aui={{ scale: 'sm', color: 'surface', paint: 'tonal', sx: { flex: 'none' } }}>
            <Button.Icon name="print" aui={{ scale: 'sm' }} />
            Print Output
          </Button>
        </View>
      </View>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
