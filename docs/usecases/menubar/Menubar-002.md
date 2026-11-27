# Menubar-002: File menu

Component family: **Menubar**

UI type: **Menubar with text triggers**

Source: `src/usecase-gallery/usecases/menubar/Menubar-002/usecase.ts`

## What it is

A File text trigger on the top bar opens a popup of device, template and print actions for the open design.

## When to choose it

Use the trigger and popup for the file-level actions of the open design (save, open, print), where each row only runs an action or opens a dialog or panel. Use a submenu only when one row holds several choices; a menu of plain rows stays flat. A menu of one action, or a setting, is not this menu (Menubar-001, Menubar-004).

## Where it belongs

The File menu comes first in the top menubar of nine apps (FD has no menus). Real site source: the top bar of each app (the paths are in source and in each case).

## Usage guidance

One instruction: a Menubar.Dropdown inside a Menubar, a Menubar.DropdownTrigger with the text, then Portal, Positioner (align "start", sideOffset 4; side bottom by default) and a Menubar.DropdownPopup of Menubar.DropdownItem rows, with an aui sx width on the popup. A row that holds several choices is a Menubar.DropdownSubmenuRoot whose Menubar.DropdownSubmenuTrigger (a right chevron row) opens a second Portal, Positioner (side "right", align "start", sideOffset 4) and Popup at the default width; a Menubar.DropdownSeparator splits the rows. File menu, HS and ADC: after the device and template items a separator and a submenu trigger "Print" opening the one print item, popup width "192". File menu, other apps (ADM, ACE, HCS, PBS, PFD, RWS, AGPD): the same popup with plain rows, the last of them Print; the standard is ADM, five rows (Save to device, Open from device, New from template, Save as template, Print) with a separator before Print. ACE and HCS write no separator, PBS, PFD, RWS and AGPD have only Download, Upload, separator, Print, and HCS has only Open, Save, Print at the default popup width (148px instead of 192px); HCS also sets scale "sm" on every part, which renders the same as the default. Item wording is each app's own. The scenes are open with every item enabled (the apps disable Save, Download, Print and ADC Save As Template by state); the app positioner z-index, the dialogs the rows open and the rest of the top bar are left out.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Menubar`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

No color, paint, scale, shape, profile, role, or weight string props were found in the example or scene source.

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Anatomy parts (gallery ordered by mounted parent and visual reading order)

1. **Menubar** — The "Top bar" strip with the File menu first; the other apps place About, Reset and Help Center after it. Selector: `[class~="aui-menubar"]`. Layer step: **Menubar** — Top bar starts with File; apps may add About, Reset, or Help.
2. **Trigger** — The text trigger "File" that opens the device, template and print actions. Selector: `[class~="aui-menubar-trigger"]`. Layer step: **Trigger** — The text trigger "File" that opens the device, template and print actions. Code target: `Menubar.DropdownTrigger`.
3. **Popup** — The 192px wide menu surface, 4px below the trigger and aligned to its start. Selector: `[class~="aui-dropdown-popup"]`. Layer step: **Popup** — 192px menu opens 4px below its start-aligned trigger.
4. **Item** — A plain action row: "Save to device" or "Open from device". Selector: `[class~="aui-dropdown-item"]`. Layer step: **Item** — A plain action row: "Save to device" or "Open from device".
5. **Separator** — The divider between the device actions and the Print submenu. Selector: `[class~="aui-dropdown-separator"]`. Layer step: **Separator** — The divider between the device actions and the Print submenu.
6. **Submenu trigger** — The "Print" row with a trailing arrow; it opens a second popup to its right holding "Print output". Selector: `[class~="aui-dropdown-submenu-trigger"]`. Layer step: **Submenu trigger** — Print row’s arrow opens a second menu with Print output.

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

### 1. Print submenu (`hs-file-menu`)

Apps: HS, ADC

In context source: HS: `src/hs/TopBar.tsx`; ADC: `src/adc/Workspace.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/menubar/Menubar-002/example.tsx`

```tsx
import { useStageHost } from '../../../hooks/use-stage-host';
import { Menubar } from '../../../kit';

export default function Example() {
  const host = useStageHost();
  return (
    <div style={{ minBlockSize: 'calc(var(--p-px-16) * 13)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Menubar aria-label="Top bar">
        <Menubar.Dropdown open>
          <Menubar.DropdownTrigger>File</Menubar.DropdownTrigger>
          <Menubar.DropdownPortal container={host}>
            <Menubar.DropdownPositioner sideOffset={4} align="start" className="ug-anchored">
              <Menubar.DropdownPopup aui={{ sx: { width: '192' } }}>
                <Menubar.DropdownItem>Save To Device</Menubar.DropdownItem>
                <Menubar.DropdownItem>Open From Device</Menubar.DropdownItem>
                <Menubar.DropdownItem>New From Template</Menubar.DropdownItem>
                <Menubar.DropdownItem>Save As Template</Menubar.DropdownItem>
                <Menubar.DropdownSeparator />
                <Menubar.DropdownSubmenuRoot open>
                  <Menubar.DropdownSubmenuTrigger>Print</Menubar.DropdownSubmenuTrigger>
                  <Menubar.DropdownPortal container={host}>
                    <Menubar.DropdownPositioner side="right" align="start" sideOffset={4} className="ug-anchored">
                      <Menubar.DropdownPopup>
                        <Menubar.DropdownItem>Print Output</Menubar.DropdownItem>
                      </Menubar.DropdownPopup>
                    </Menubar.DropdownPositioner>
                  </Menubar.DropdownPortal>
                </Menubar.DropdownSubmenuRoot>
              </Menubar.DropdownPopup>
            </Menubar.DropdownPositioner>
          </Menubar.DropdownPortal>
        </Menubar.Dropdown>
      </Menubar>
    </div>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/menubar/Menubar-002/options/hs-file-menu/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Menubar } from '../../../../../kit';

// HS File menu (src/hs/TopBar.tsx; ADC writes the same menu in src/adc/Workspace.tsx with its own actions): the 192px popup ends, after a separator, in a Print row that opens a submenu
// (side right, start, 4px offset) holding the print action. Shown with the submenu open and every item enabled (the apps disable Save and Print by state); the bar's About and Reset are left out.
export default function HsFileMenuScene({ host }: ContextProps) {
  return (
    <div style={{ minBlockSize: 'calc(var(--p-px-16) * 13)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Menubar aria-label="Top bar">
        <Menubar.Dropdown open>
          <Menubar.DropdownTrigger>File</Menubar.DropdownTrigger>
          <Menubar.DropdownPortal container={host}>
            <Menubar.DropdownPositioner sideOffset={4} align="start" className="ug-anchored">
              <Menubar.DropdownPopup aui={{ sx: { width: '192' } }}>
                <Menubar.DropdownItem>Save To Device</Menubar.DropdownItem>
                <Menubar.DropdownItem>Open From Device</Menubar.DropdownItem>
                <Menubar.DropdownItem>New From Template</Menubar.DropdownItem>
                <Menubar.DropdownItem>Save As Template</Menubar.DropdownItem>
                <Menubar.DropdownSeparator />
                <Menubar.DropdownSubmenuRoot open>
                  <Menubar.DropdownSubmenuTrigger>Print</Menubar.DropdownSubmenuTrigger>
                  <Menubar.DropdownPortal container={host}>
                    <Menubar.DropdownPositioner side="right" align="start" sideOffset={4} className="ug-anchored">
                      <Menubar.DropdownPopup>
                        <Menubar.DropdownItem>Print Output</Menubar.DropdownItem>
                      </Menubar.DropdownPopup>
                    </Menubar.DropdownPositioner>
                  </Menubar.DropdownPortal>
                </Menubar.DropdownSubmenuRoot>
              </Menubar.DropdownPopup>
            </Menubar.DropdownPositioner>
          </Menubar.DropdownPortal>
        </Menubar.Dropdown>
      </Menubar>
    </div>
  );
}
```

### 2. Flat file actions (`adm-file-menu`)

Apps: ADM, ACE, HCS, PBS, PFD, RWS, AGPD

In context source: ADM: `src/app/layout/NavBar/NavBar.tsx`; ACE: `src/features/top-navigation/ui/AceNavBar.tsx`; HCS: `src/App.tsx`; PBS: `src/TopBar.tsx`; PFD: `src/pfd/TopBar.tsx`; RWS: `src/rws/TopBar.tsx`; AGPD: `src/agpd/TopBar.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/menubar/Menubar-002/options/adm-file-menu/example.tsx`

```tsx
import { useStageHost } from '../../../../../hooks/use-stage-host';
import { Menubar } from '../../../../../kit';

export default function Example() {
  const host = useStageHost();
  return (
    <div style={{ minBlockSize: 'calc(var(--p-px-16) * 13)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Menubar aria-label="Top bar">
        <Menubar.Dropdown open>
          <Menubar.DropdownTrigger>File</Menubar.DropdownTrigger>
          <Menubar.DropdownPortal container={host}>
            <Menubar.DropdownPositioner sideOffset={4} align="start" className="ug-anchored">
              <Menubar.DropdownPopup aui={{ sx: { width: '192' } }}>
                <Menubar.DropdownItem>Save to device</Menubar.DropdownItem>
                <Menubar.DropdownItem>Open from device</Menubar.DropdownItem>
                <Menubar.DropdownItem>New from template</Menubar.DropdownItem>
                <Menubar.DropdownItem>Save as template</Menubar.DropdownItem>
                <Menubar.DropdownSeparator />
                <Menubar.DropdownItem>Print</Menubar.DropdownItem>
              </Menubar.DropdownPopup>
            </Menubar.DropdownPositioner>
          </Menubar.DropdownPortal>
        </Menubar.Dropdown>
      </Menubar>
    </div>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/menubar/Menubar-002/options/adm-file-menu/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Menubar } from '../../../../../kit';

// ADM File menu (src/app/layout/NavBar/NavBar.tsx; ACE, HCS, PBS, PFD, RWS and AGPD write the same menu with fewer or other actions): a File trigger on the top bar opens a 192px popup
// (bottom, start, 4px offset) of device and template actions, a separator, then Print. Shown open and enabled (the apps disable Save, Download and Print by state); the bar's About and Reset are left out.
export default function AdmFileMenuScene({ host }: ContextProps) {
  return (
    <div style={{ minBlockSize: 'calc(var(--p-px-16) * 13)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Menubar aria-label="Top bar">
        <Menubar.Dropdown open>
          <Menubar.DropdownTrigger>File</Menubar.DropdownTrigger>
          <Menubar.DropdownPortal container={host}>
            <Menubar.DropdownPositioner sideOffset={4} align="start" className="ug-anchored">
              <Menubar.DropdownPopup aui={{ sx: { width: '192' } }}>
                <Menubar.DropdownItem>Save to device</Menubar.DropdownItem>
                <Menubar.DropdownItem>Open from device</Menubar.DropdownItem>
                <Menubar.DropdownItem>New from template</Menubar.DropdownItem>
                <Menubar.DropdownItem>Save as template</Menubar.DropdownItem>
                <Menubar.DropdownSeparator />
                <Menubar.DropdownItem>Print</Menubar.DropdownItem>
              </Menubar.DropdownPopup>
            </Menubar.DropdownPositioner>
          </Menubar.DropdownPortal>
        </Menubar.Dropdown>
      </Menubar>
    </div>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
