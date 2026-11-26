# Menubar-001: Top bar action button

Component family: **Menubar**

UI type: **Menubar with text triggers**

Source: `src/usecase-gallery/usecases/menubar/Menubar-001/usecase.ts`

## What it is

A plain text button on the top bar that runs one action without a list of choices: About opens the about dialog, Reset opens the reset confirmation.

## When to choose it

Use a plain Menubar.Button for one top-level action that needs no list of choices: a click runs it or opens a dialog. Use the File menu (Menubar-002) or the Help Center menu (Menubar-003) for a short list of actions grouped under one text trigger. A setting is not this button (Menubar-004).

## Where it belongs

The top menubar of nine apps (FD has no menus): the About and Reset action buttons (Menubar.Button) between the File menu and the Help Center menu; the phone drawer also lists them as Menubar.Button rows.

## Usage guidance

A Menubar.Button with the label as its child, directly inside the Menubar, no popup, portal or positioner. It measures the same as a Menubar.DropdownTrigger (28px high, 4px 8px padding, 4px radius, 16px regular text, surface fill, no border), so only the code instruction differs (no popup) and the look is shared. The scene is the HS top bar (File, About, Reset and Help Center in a row, the two dropdown triggers closed for context), drawn the same in every app; ADM and ACE translate the wording and the mobile Applications button is the same part. The scene leaves out the dialogs the buttons open and the rest of the top bar (logo, gear).

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Menubar`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

No color, paint, scale, shape, profile, role, or weight string props were found in the example or scene source.

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Button** — The plain About button that runs one action, here the about dialog, with no list of choices. Selector: `[data-ug-part="button"]`.
2. **Label** — The visible word "About" (Reset in the HS scene) that names the action. Selector: `[data-ug-part="button"]`. Direct text is highlighted.

## Apps

- HS (`hs`)
- ADC (`adc`)
- ADM (`adm`)
- ACE (`ace`)
- HCS (`hcs`)
- PBS (`pbs`)
- PFD (`pfd`)
- RWS (`rws`)
- AGPD (`agpd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Action buttons (`hs-top-bar`)

Apps: HS, ADC, ADM, ACE, HCS, PBS, PFD, RWS, AGPD

In context source: HS: `src/hs/TopBar.tsx`

In context view: Shown.

#### In context structure additions

1. **Top bar** — The top bar Menubar that holds both action buttons and menu triggers. Selector: `[class~="aui-menubar"][aria-label="Top bar"]`.
2. **File menu trigger** — The File dropdown trigger at the start of the bar, which opens the file actions. Part marker: `data-ug-part="file-menu"`.
3. **Reset button** — The plain Reset Menubar.Button next to About that restores the design to its defaults. Part marker: `data-ug-part="reset"`.
4. **Help Center trigger** — The Help Center dropdown trigger at the end of the bar. Part marker: `data-ug-part="help-menu"`.

#### Component UI source — `src/usecase-gallery/usecases/menubar/Menubar-001/example.tsx`

```tsx
import { Menubar } from '../../../kit';

export default function Example() {
  return (
    <Menubar aria-label="Top bar">
      <Menubar.Button data-ug-part="button">About</Menubar.Button>
    </Menubar>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/menubar/Menubar-001/options/hs-top-bar/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Menubar } from '../../../../../kit';

// HS top bar (src/hs/TopBar.tsx; the other apps write About and Reset the same way): plain Menubar.Button text buttons between the File and Help Center menus.
// A Menubar.Dropdown is drawn next to them so the bar shows both trigger kinds; the logo, gear and theme toggle are left out.
export default function HsTopBarScene(_: ContextProps) {
  return (
    <div style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 28))' }}>
      <Menubar aria-label="Top bar">
        <Menubar.Dropdown>
          <Menubar.DropdownTrigger data-ug-part="file-menu">File</Menubar.DropdownTrigger>
        </Menubar.Dropdown>
        <Menubar.Button data-ug-part="button">About</Menubar.Button>
        <Menubar.Button data-ug-part="reset">Reset</Menubar.Button>
        <Menubar.Dropdown>
          <Menubar.DropdownTrigger data-ug-part="help-menu">Help Center</Menubar.DropdownTrigger>
        </Menubar.Dropdown>
      </Menubar>
    </div>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
