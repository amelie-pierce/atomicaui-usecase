# Dropdown-002: Filled icon trigger

Component family: **Dropdown**

UI type: **Dropdown with icon trigger**

Source: `src/usecase-gallery/usecases/dropdown/Dropdown-002/usecase.ts`

## What it is

An icon-only trigger opens a plain list of the items that no longer fit in a row; choosing one activates it.

## When to choose it

Use it for the overflow of a tab row: the items that do not fit become plain rows of a menu, with no selected state, and the menu closes on choice. It is the plain Dropdown, not a Menubar menu.

## Where it belongs

The ADC design tab rail, at the start of the row before the design tabs; it appears only when some designs do not fit as tabs and lists exactly those.

## Usage guidance

ADC: a Dropdown whose Dropdown.Trigger is the square icon form: aria-label "Show hidden designs", color "surface-alt", paint "solid", scale "sm", profile "square", shape "soft", sx flex "none" and borderColor "default", holding a Dropdown.Icon "ellipsis-vertical". The popup is a Dropdown.Popup at scale "sm" with maxHeight "256" and overflowY "auto" (it scrolls when many designs are hidden), placed 4px below the trigger and aligned to its start. Each hidden design is a plain Dropdown.Item showing its name (or "Design N"); no item is selected, and choosing one activates that design tab. The app disables the trigger while a report is running; the scene shows it enabled. The scene is shown open beside one visible design tab (CHIP_AUI of the app: surface-alt, solid, soft); drag reorder, rename, the tab context menu and the other tabs are left out.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Dropdown`, `Tabs`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `raised`, `surface-alt`
- `paint`: `solid`, `text`, `tonal`
- `scale`: `sm`
- `profile`: `no-padding`, `square`
- `shape`: `soft`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Trigger** — Square icon trigger labelled "Show hidden designs": color "surface-alt", paint "solid", soft shape, flex "none" with a default border. Selector: `[class~="aui-dropdown-trigger"]`.
2. **Icon** — The ellipsis-vertical glyph that is the only content of the trigger. Selector: `[class~="aui-dropdown-trigger"] > [class~="aui-contained-icon"]`.
3. **Popup** — Popup at scale "sm", capped at 256px high and scrolling vertically when many designs are hidden, aligned to the trigger start. Selector: `[class~="aui-dropdown-popup"]`.
4. **Item** — A plain row for one hidden design: Design 3, Design 4 or Design 5. None is selected; choosing one activates that tab. Selector: `[class~="aui-dropdown-item"]`.

## Component layer steps

1. **Trigger** — Square icon trigger labelled "Show hidden designs": color "surface-alt", paint "solid", soft shape, flex "none" with a default border. Selector: `[class~="aui-dropdown-trigger"]`.
2. **Icon** — The ellipsis-vertical glyph that is the only content of the trigger. Selector: `[class~="aui-dropdown-trigger"] > [class~="aui-contained-icon"]`.
3. **Popup** — Popup at scale "sm", capped at 256px high and scrolling vertically when many designs are hidden, aligned to the trigger start. Selector: `[class~="aui-dropdown-popup"]`.
4. **Item** — A plain row for one hidden design: Design 3, Design 4 or Design 5. None is selected; choosing one activates that tab. Selector: `[class~="aui-dropdown-item"]`.

## Apps

- ADC (`adc`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Overflow list (`adc-hidden-designs`)

Apps: ADC

In context source: ADC: `src/adc/Workspace.tsx`

In context view: Shown.

#### In context structure additions

1. **Visible tab** — The "Design 1" chip tab after the trigger; it stands for the design tab rail whose overflow the ellipsis menu lists. Selector: `[class~="aui-tabs-tab"]`.

#### In context layer steps

1. **Visible tab** — The "Design 1" chip tab after the trigger; it stands for the design tab rail whose overflow the ellipsis menu lists. Selector: `[class~="aui-tabs-tab"]`.
2. **Trigger** — Square icon trigger labelled "Show hidden designs": color "surface-alt", paint "solid", soft shape, flex "none" with a default border. Selector: `[class~="aui-dropdown-trigger"]`.
3. **Icon** — The ellipsis-vertical glyph that is the only content of the trigger. Selector: `[class~="aui-dropdown-trigger"] > [class~="aui-contained-icon"]`.
4. **Popup** — Popup at scale "sm", capped at 256px high and scrolling vertically when many designs are hidden, aligned to the trigger start. Selector: `[class~="aui-dropdown-popup"]`.
5. **Item** — A plain row for one hidden design: Design 3, Design 4 or Design 5. None is selected; choosing one activates that tab. Selector: `[class~="aui-dropdown-item"]`.

#### Component UI source — `src/usecase-gallery/usecases/dropdown/Dropdown-002/example.tsx`

```tsx
import { Dropdown } from '../../../kit';

export default function Example() {
  return (
    <Dropdown>
      <Dropdown.Trigger
        aria-label="Show hidden designs"
        aui={{ color: 'surface-alt', paint: 'solid', scale: 'sm', profile: 'square', shape: 'soft', sx: { flex: 'none', borderColor: 'default' } }}
      >
        <Dropdown.Icon name="ellipsis-vertical" />
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Positioner align="start" sideOffset={4}>
          <Dropdown.Popup aui={{ scale: 'sm', sx: { maxHeight: '256', overflowY: 'auto' } }}>
            <Dropdown.Item>Design 3</Dropdown.Item>
            <Dropdown.Item>Design 4</Dropdown.Item>
            <Dropdown.Item>Design 5</Dropdown.Item>
          </Dropdown.Popup>
        </Dropdown.Positioner>
      </Dropdown.Portal>
    </Dropdown>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/dropdown/Dropdown-002/options/adc-hidden-designs/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Dropdown, Tabs, View } from '../../../../../kit';

// ADC design tab rail (src/adc/Workspace.tsx): the ellipsis-vertical trigger sits at the start of the rail, before the Tabs, and appears only when designs do not fit as tabs;
// its popup lists the hidden designs. Built open and non-modal (container={host}, positioner ug-anchored). The chip look is CHIP_AUI of src/adc/ui.ts.
// The app disables the trigger and tabs while a report is running, the scene shows them enabled. Drag reorder, rename and the tab context menu are left out; one visible tab stands for the rail.

const CHIP_AUI = { color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'raised', paint: 'tonal' } } } as const;

export default function AdcHiddenDesignsScene({ host }: ContextProps) {
  return (
    <View
      aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '8' } }}
      style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 480px)', alignItems: 'start' }}
    >
      <Dropdown open>
        <Dropdown.Trigger
          aria-label="Show hidden designs"
          aui={{ color: 'surface-alt', paint: 'solid', scale: 'sm', profile: 'square', shape: 'soft', sx: { flex: 'none', borderColor: 'default' } }}
        >
          <Dropdown.Icon name="ellipsis-vertical" />
        </Dropdown.Trigger>
        <Dropdown.Portal container={host}>
          <Dropdown.Positioner align="start" sideOffset={4} className="ug-anchored">
            <Dropdown.Popup aui={{ scale: 'sm', sx: { maxHeight: '256', overflowY: 'auto' } }}>
              <Dropdown.Item>Design 3</Dropdown.Item>
              <Dropdown.Item>Design 4</Dropdown.Item>
              <Dropdown.Item>Design 5</Dropdown.Item>
            </Dropdown.Popup>
          </Dropdown.Positioner>
        </Dropdown.Portal>
      </Dropdown>
      <Tabs defaultValue="d1" aui={{ profile: 'no-padding' }}>
        <Tabs.List>
          <Tabs.Tab value="d1" aui={CHIP_AUI}>Design 1</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
