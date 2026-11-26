# Tooltip-005: Disabled control tooltip

Component family: **Tooltip**

UI type: **Tooltip on a disabled control**

Source: `src/usecase-gallery/usecases/tooltip/Tooltip-005/usecase.ts`

## What it is

A control that cannot be used shows why in a tooltip on its wrapper.

## When to choose it

Use it when a disabled control would leave the user guessing. A disabled element receives no hover or focus, so the trigger is a wrapper around it; keep the reason to one sentence.

## Where it belongs

The selection radio of a failed result row (HCS F01Results, FD Results) and the Order button of the HS output pane while no result is selected.

## Usage guidance

The Tooltip.Trigger is a span (`render={<span />}` or a View as span) made focusable with tabIndex 0 and an aria-label carrying the reason, around the disabled control (a Radio with selected false and tabIndex -1 in HCS and FD, a Button in HS); the popup is the kit default (surface, scale sm). The apps are one group; no placement was measured in a browser, so none splits it. From the tooltip source, HS leaves the side at its default (top) with a 4px offset and mounts the popup only while the button is disabled; collision handling may flip the requested side when space is limited. The scene shows the control in its disabled state and leaves out the table row and the pane around it.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Radio`, `Tooltip`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `paint`: `text`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Trigger wrapper** — The focusable inline-flex span (tabIndex 0) whose aria-label "Selection unavailable for Model C-300" carries the reason, so keyboard and screen reader users reach the disabled radio's explanation. Part marker: `data-ug-part="trigger"`.
2. **Disabled radio** — The disabled, unselected "Model C-300" radio taken out of the tab order (tabIndex -1) so the wrapper receives the focus. Selector: `[data-ug-part="trigger"] [class~="aui-radio"]`.
3. **Positioner** — Opens the reason above the wrapper with a 4px offset (side="top"). Selector: `[class~="aui-tooltip-positioner"]`.
4. **Popup** — The default tooltip surface (scale "sm" in the HCS scene). Selector: `[class~="aui-tooltip-popup"]`.
5. **Reason** — The sentence "Failed products can't be selected. See Why Not for the reason." that explains why the control is disabled. Selector: `[class~="aui-tooltip-popup"]`. Direct text is highlighted.

## Component layer steps

1. **Trigger wrapper** — The focusable inline-flex span (tabIndex 0) whose aria-label "Selection unavailable for Model C-300" carries the reason, so keyboard and screen reader users reach the disabled radio's explanation. Selector: `[data-ug-part="trigger"]`.
2. **Disabled radio** — The disabled, unselected "Model C-300" radio taken out of the tab order (tabIndex -1) so the wrapper receives the focus. Selector: `[data-ug-part="trigger"] [class~="aui-radio"]`.
3. **Positioner** — Opens the reason above the wrapper with a 4px offset (side="top"). Selector: `[class~="aui-tooltip-positioner"]`.
4. **Popup** — The default tooltip surface (scale "sm" in the HCS scene). Selector: `[class~="aui-tooltip-popup"]`.

## Apps

- HCS (`hcs`)
- FD (`fd`)
- HS (`hs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Disabled control (`hcs-disabled-radio`)

Apps: HCS, FD, HS

In context source: HCS: `src/components/F01Results.tsx`; FD: `src/components/Results.jsx`; HS: `src/hs/OutputPane.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/tooltip/Tooltip-005/example.tsx`

```tsx
import { Radio, Tooltip } from '../../../kit';

export default function Example() {
  return (
    <Tooltip.Provider>
      <Tooltip>
        <Tooltip.Trigger render={<span data-ug-part="trigger" />} tabIndex={0} aria-label="Selection unavailable for Model C-300" closeOnClick={false} style={{ display: 'inline-flex' }}>
          <Radio disabled selected={false} tabIndex={-1} aria-label="Model C-300" aui={{ scale: 'sm' }} />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner side="top" sideOffset={4}>
            <Tooltip.Popup>Failed products can't be selected. See Why Not for the reason.</Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    </Tooltip.Provider>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/tooltip/Tooltip-005/options/hcs-disabled-radio/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Radio, Tooltip, View } from '../../../../../kit';

export default function HcsDisabledRadioScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 8)', paddingBlockStart: 'calc(var(--p-px-16) * 4)' }}>
      <Tooltip.Provider>
        <Tooltip open>
          <Tooltip.Trigger render={<span data-ug-part="trigger" />} tabIndex={0} aria-label="Selection unavailable for Model C-300" closeOnClick={false} style={{ display: 'inline-flex' }}>
            <Radio disabled selected={false} tabIndex={-1} aria-label="Model C-300" aui={{ scale: 'sm' }} />
          </Tooltip.Trigger>
          <Tooltip.Portal container={host}>
            <Tooltip.Positioner side="top" sideOffset={4} className="ug-anchored">
              <Tooltip.Popup aui={{ scale: 'sm' }}>Failed products can't be selected. See Why Not for the reason.</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip>
      </Tooltip.Provider>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
