# Tabs-004: Design tab rail

Component family: **Tabs**

UI type: **Closable tab rail**

Source: `src/usecase-gallery/usecases/tabs/Tabs-004/usecase.ts`

## What it is

A rail of closable tab chips, one per open design, ending in an add button, with an error dot on a tab whose design has a problem.

## When to choose it

Use it for a user-managed set of open items (designs, documents) where each item can be closed, a new one added and the order changed. For fixed views of one result use Tabs-001. The tab context menu is ContextMenu-001 and the overflow list of hidden designs is Dropdown-002, both on this rail.

## Where it belongs

The top of the ADC workspace, above the designer: one tab per open design (renamed by double-click, reordered by drag, opened from the hidden-designs menu when they do not fit), the add button at the end of the rail.

## Usage guidance

The example is the rail: a Tabs root (profile "no-padding") with a Tabs.List, a Tabs.Tab per design (nativeButton false and rendered as a div, so the buttons inside it are not nested in a button) with a leading label span and a Tabs.CloseButton (aria-label "Close <name>"), a Tabs.PinButton named "circle-exclamation" with color "error" and profile "contained" on a tab with an error (the app calls it the error dot; Tabs.PinButton has no pinned state and only runs the parent's onClick), and a final Tabs.AddButton named "file-circle-plus" labelled "Add new design". The chips take CHIP_AUI (color "surface-alt", paint "solid", shape "soft", selected raised tonal). Measured in the browser: the close and error buttons are 20x20 transparent squares inside the 28px chip, the add button is a 28x28 square chip. The app sets overflow "shrink" on the List so the chips shrink to the rail width (the scene does; the example leaves it off because the Component stage is only as wide as its content), and also passes reorderable and onReorder on the List, a ContextMenu around each Tab and disabled while a report runs. These Tabs parts are the Tabs' own icon buttons, so they are written here and not as IconButton use cases. ADC: one group. The scene keeps two tabs, one with the error dot, and leaves out drag reorder, rename, the error Tooltip, disabled states and the designer panels.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Tabs`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `profile`: `contained`, `no-padding`
- `color`: `error`, `raised`, `surface-alt`
- `paint`: `solid`, `text`, `tonal`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Tabs** — The design rail root with no padding; Design 1 (d1) is selected by default. Selector: `[class~="aui-tabs"]`.
2. **List** — Row holding the design chips and the add button; ADC lets it shrink with overflow="shrink". Selector: `[class~="aui-tabs-list"]`.
3. **Tab** — One open design (Design 1, Design 2) rendered as a div chip with nativeButton={false} so it can hold buttons; the selected chip is raised and tonal. Selector: `[class~="aui-tabs-tab"]`.
4. **Error dot** — Error-coloured circle-exclamation on Design 1, labelled "The design has an error". Selector: `[class~="aui-tabs-pin-button"]`.
5. **Close** — Per-design close action, for example "Close Design 1". Selector: `[class~="aui-tabs-close-button"]`.
6. **Add** — File-circle-plus button at the end of the rail that opens a new design. Selector: `[class~="aui-tabs-add-button"]`.

## Apps

- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Design tab rail (`adc-design-rail`)

Apps: ADC

In context source: ADC: `src/adc/Workspace.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/tabs/Tabs-004/example.tsx`

```tsx
import { Tabs } from '../../../kit';

export default function Example() {
  return (
    <Tabs defaultValue="d1" aui={{ profile: 'no-padding' }}>
      <Tabs.List>
        <Tabs.Tab
          value="d1"
          nativeButton={false}
          render={<div />}
          aui={{ color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'raised', paint: 'tonal' } } }}
        >
          <span>Design 1</span>
          <Tabs.PinButton name="circle-exclamation" aria-label="The design has an error" aui={{ color: 'error', profile: 'contained' }} />
          <Tabs.CloseButton aria-label="Close Design 1" />
        </Tabs.Tab>
        <Tabs.Tab
          value="d2"
          nativeButton={false}
          render={<div />}
          aui={{ color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'raised', paint: 'tonal' } } }}
        >
          <span>Design 2</span>
          <Tabs.CloseButton aria-label="Close Design 2" />
        </Tabs.Tab>
        <Tabs.AddButton name="file-circle-plus" aria-label="Add new design" />
      </Tabs.List>
    </Tabs>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/tabs/Tabs-004/options/adc-design-rail/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Tabs, View } from '../../../../../kit';

// ADC design tab rail (src/adc/Workspace.tsx:859-1095): the Tabs.List shrinks (overflow "shrink") and holds one chip per open design, each a Tabs.Tab with a Tabs.CloseButton and, on a design with an error, a Tabs.PinButton
// used as the error dot (a circle-exclamation in the error colour, in a Tooltip in the app), then a Tabs.AddButton for a new design. CHIP_AUI is src/adc/ui.ts. The context menu on each tab is ContextMenu-001 and the hidden-designs
// dropdown before the rail is Dropdown-002. Left out: drag reorder (reorderable, onReorder), double-click rename, the error Tooltip, the disabled states while a report runs and the design panels.
const CHIP_AUI = { color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'raised', paint: 'tonal' } } } as const;

export default function AdcDesignRailScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 480px)' }}>
      <Tabs defaultValue="d1" aui={{ profile: 'no-padding' }}>
        <Tabs.List overflow="shrink">
          <Tabs.Tab value="d1" nativeButton={false} render={<div />} aui={CHIP_AUI}>
            <span>Design 1</span>
            <Tabs.PinButton name="circle-exclamation" aria-label="The design has an error" aui={{ color: 'error', profile: 'contained' }} />
            <Tabs.CloseButton aria-label="Close Design 1" />
          </Tabs.Tab>
          <Tabs.Tab value="d2" nativeButton={false} render={<div />} aui={CHIP_AUI}>
            <span>Design 2</span>
            <Tabs.CloseButton aria-label="Close Design 2" />
          </Tabs.Tab>
          <Tabs.AddButton name="file-circle-plus" aria-label="Add new design" />
        </Tabs.List>
      </Tabs>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
