# Tooltip-001: Icon button tooltip

Component family: **Tooltip**

UI type: **Tooltip on a button**

Source: `src/usecase-gallery/usecases/tooltip/Tooltip-001/usecase.ts`

## What it is

An icon-only button shows what it does in a small tooltip on hover or keyboard focus.

## When to choose it

Use it on every IconButton that has no visible text, including the Reset View button over the viewer. Do not use it for a control whose label is already visible, and not for long help text (a help icon, Button-032). For a radio option, see Tooltip-004.

## Where it belongs

Every icon-only header, rail and navigation button of the ten apps (HCS HcsIconTooltip, ACE PaneIconTooltip, ADM AdmIconTooltip, ADC and FD IconTooltip, AGPD and RWS IconTip, PBS and PFD and HS output navigation). The panel standard of the apps is that an icon-only button carries an aria-label and a tooltip with the same words. Also the Reset View button floating over the 3D viewer (ADM ViewerChrome, FD Viewer).

## Usage guidance

Compose Tooltip.Provider, Tooltip, Tooltip.Trigger with the IconButton as render, Tooltip.Portal, Tooltip.Positioner and Tooltip.Popup. All ten apps show the same label tooltip on an icon-only button, so they are one group; no popup placement or surface was measured in a browser, so none splits it. From the tooltip source, HS requests the Base UI default side (top) and RWS requests bottom, each with a 4px offset; collision handling may flip the requested side when space is limited. Scenes show one enabled button and omit the surrounding pane header. Reset View (ADM, FD): the same IconButton trigger and label tooltip on a floating viewer control; ADM ViewerChrome and FD Viewer are read from the source and not run.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `IconButton`, `Tooltip`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `scale`: `sm`
- `paint`: `text`
- `color`: `secondary`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Trigger** — The icon-only gear IconButton labelled "Settings" (scale "sm", text paint, secondary colour) that the tooltip names; it is passed to the trigger through render. Part marker: `data-ug-part="trigger"`.
2. **Positioner** — Places the label below the gear button with a 4px offset (side="bottom"); the HS app requests the default top side and RWS the bottom. Selector: `[class~="aui-tooltip-positioner"]`.
3. **Popup** — The small tooltip surface that holds the one-word label. Selector: `[class~="aui-tooltip-popup"]`.
4. **Label** — The text "Settings", repeating the button's accessible name so sighted users can read it. Selector: `[class~="aui-tooltip-popup"]`. Direct text is highlighted.

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

### 1. Icon label (`hcs-icon-label`)

Apps: HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS, ADC

In context source: HCS: `src/components/HcsIconTooltip.tsx`; ACE: `src/shared/ui/PaneIconTooltip.tsx`; ADM: `src/shared/lib/tooltip/AdmIconTooltip.tsx`; PFD: `src/pfd/useOutputNavigation.tsx`; PBS: `src/App.tsx`; HS: `src/hs/useOutputNavigation.tsx`; FD: `src/components/ui.jsx`; AGPD: `src/agpd/panel.tsx`; RWS: `src/rws/panel.tsx`; ADC: `src/adc/Workspace.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/tooltip/Tooltip-001/example.tsx`

```tsx
import { IconButton, Tooltip } from '../../../kit';

export default function Example() {
  return (
    <Tooltip.Provider>
      <Tooltip>
        <Tooltip.Trigger render={<IconButton data-ug-part="trigger" name="gear" aria-label="Settings" aui={{ scale: 'sm', paint: 'text', color: 'secondary' }} />} />
        <Tooltip.Portal>
          <Tooltip.Positioner side="bottom" sideOffset={4}>
          <Tooltip.Popup><span data-ug-part="tooltip-label">Settings</span></Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    </Tooltip.Provider>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/tooltip/Tooltip-001/options/hcs-icon-label/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { IconButton, Tooltip, View } from '../../../../../kit';

export default function HcsIconLabelScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 6)' }}>
      <Tooltip.Provider>
        <Tooltip open>
          <Tooltip.Trigger render={<IconButton data-ug-part="trigger" name="gear" aria-label="Settings" aui={{ scale: 'sm', paint: 'text', color: 'secondary' }} />} />
          <Tooltip.Portal container={host}>
            <Tooltip.Positioner side="bottom" sideOffset={4} className="ug-anchored">
              <Tooltip.Popup aui={{ scale: 'sm' }}>Settings</Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip>
      </Tooltip.Provider>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
