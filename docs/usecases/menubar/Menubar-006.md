# Menubar-006: Settings summary

Component family: **Menubar**

UI type: **Menubar with summary trigger**

Source: `src/usecase-gallery/usecases/menubar/Menubar-006/usecase.ts`

## What it is

A tonal Menubar.Button that sums up the current region, language and design code in one line, separated by dividers, and opens the settings popover.

## When to choose it

Use it when several settings that apply to the whole design are read at a glance on the bar and edited together in one popover. A single icon-only settings menu is the gear (Menubar-004); a plain action is a Menubar.Button place of Menubar-001.

## Where it belongs

The right side of the top bar in HS (country, EU purchase country, language, design code and design method, Popover.Trigger), FD (country, language and design code, Popover.Trigger) and ACE (country flag and language, the app configuration button).

## Usage guidance

A Menubar.Button with aui color "surface" and paint "tonal" holding, in order, an optional Menubar.Icon (the app puts a ContainedImage flag, fit "contain", ratio "4:3", in it; the scene uses a globe icon), the text values and a Menubar.Divider between each pair. HS and FD write it as the render prop of a Popover.Trigger inside a non-modal Popover.Root and ACE as the app configuration button; the scene draws the closed bar only. Measured against the plain Menubar.Button of Menubar-001: it has a white fill, a 1px border and 3px 7px padding where Menubar-001 has the surface fill, no border and 4px 8px padding, and it grows with its dividers, so it is its own type. The popover contents are left out; HS adds the EU purchase country and design method values, FD prefixes labels, ACE shows only country and language.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Menubar`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `color`: `surface`
- `paint`: `tonal`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Menubar** — The "Top bar" strip that holds the one summary button at its right side. Selector: `[class~="aui-menubar"]`.
2. **Button** — Tonal button (color "surface", paint "tonal", aria-label "Settings") that sums up region, language and design code and opens the settings popover. Selector: `[class~="aui-button"]`.
3. **Icon** — The globe glyph that leads the summary. Selector: `[class~="aui-button"] > [class~="aui-contained-icon"]`.
4. **Label** — The summary text "US", "EN" and "IBC 2018" shown in one line. Selector: `[class~="aui-button"]`. Direct text is highlighted.
5. **Divider** — The thin separators between country, language and design code (two in this example). Selector: `[class~="aui-menubar-divider"]`.

## Component layer steps

1. **Menubar** — Top bar holds one summary button at the right edge. Selector: `[class~="aui-menubar"]`.
2. **Button** — Tonal Settings button summarizes region, language, and design code. Selector: `[class~="aui-button"]`.
3. **Icon** — Globe glyph leads the region and language settings summary button. Selector: `[class~="aui-button"] > [class~="aui-contained-icon"]`.
4. **Divider** — Two thin dividers separate country, language, and design code. Selector: `[class~="aui-menubar-divider"]`.

## Apps

- HS (`hs`)
- FD (`fd`)
- ACE (`ace`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Top bar (`hs-settings`)

Apps: HS, FD, ACE

In context source: HS: `src/hs/TopBar.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/menubar/Menubar-006/example.tsx`

```tsx
import { Menubar } from '../../../kit';

export default function Example() {
  return (
    <Menubar aria-label="Top bar">
      <Menubar.Button aria-label="Settings" aui={{ color: 'surface', paint: 'tonal' }}>
        <Menubar.Icon name="globe" />
        US
        <Menubar.Divider />
        EN
        <Menubar.Divider />
        IBC 2018
      </Menubar.Button>
    </Menubar>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/menubar/Menubar-006/options/hs-settings/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Menubar } from '../../../../../kit';

// HS top bar settings summary (src/hs/TopBar.tsx; ACE and FD write the same trigger in AceNavBar.tsx and SettingsPopover.jsx): a tonal surface Menubar.Button
// with the region, language and design code separated by Menubar.Divider. In HS and FD it is a Popover.Trigger render prop; the closed bar is drawn here and the flag image is a globe icon.
export default function HsSettingsScene(_: ContextProps) {
  return (
    <div style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 32))' }}>
      <Menubar aria-label="Top bar">
        <Menubar.Button aria-label="Settings" aui={{ color: 'surface', paint: 'tonal' }}>
          <Menubar.Icon name="globe" />
          US
          <Menubar.Divider />
          EN
          <Menubar.Divider />
          IBC 2018
          <Menubar.Divider />
          Allowable Stress Design (ASD)
        </Menubar.Button>
      </Menubar>
    </div>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
