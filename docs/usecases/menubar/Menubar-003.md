# Menubar-003: Help Center menu

Component family: **Menubar**

UI type: **Menubar with text triggers**

Source: `src/usecase-gallery/usecases/menubar/Menubar-003/usecase.ts`

## What it is

A Help Center text trigger on the top bar opens a popup of the few help actions of an application: Feedback, Tutorials, Add to Home Screen.

## When to choose it

Use the trigger and popup for the few help actions of an application, where each row only runs an action or opens a dialog or panel. Do not use it for file actions (Menubar-002) or a single action (Menubar-001).

## Where it belongs

The Help Center menu closes the top menubar of nine apps (FD has no menus). Feedback and Tutorials are in every Help Center menu (HS words them "Feedback: Help us improve!" and "Contact: Request local support!" plus Tutorials), and PBS, PFD, RWS and AGPD add Add to Home Screen.

## Usage guidance

One instruction: a Menubar.Dropdown inside a Menubar, a Menubar.DropdownTrigger with the text, then Portal, Positioner (align "start", sideOffset 4; side bottom by default) and a Menubar.DropdownPopup of Menubar.DropdownItem rows, with an aui sx width on the popup. A row that holds several choices is a Menubar.DropdownSubmenuRoot whose Menubar.DropdownSubmenuTrigger (a right chevron row) opens a second Portal, Positioner (side "right", align "start", sideOffset 4) and Popup at the default width; a Menubar.DropdownSeparator splits the rows. Help Center menu, other apps (ACE, ADM, HS, ADC, PBS, PFD, RWS, AGPD): a Menubar at scale "sm" holds the trigger "Help Center" and a popup of plain rows: Feedback, Tutorials and Add to Home Screen. The popup width is a size difference only: 192 here (PBS, PFD, RWS, AGPD), 160 in ADM and ADC, 288 in ACE and HS. Help Center menu, HCS: the same trigger and a 288px popup whose first row is a submenu trigger "Tutorials" opening to the right with the single item "HCS: General Tutorial", and the plain item "Feedback Form" follows. Item wording is each app's own. The scenes are open with every item enabled (ADC disables Tutorials by state) and leave out the dialogs the rows open and the rest of the top bar.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Menubar`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `paint`: `text`
- `profile`: `no-padding`
- `scale`: `sm`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Menubar** — The top bar whose last menu is Help Center; the HCS scene sets it at scale "sm" and names it "Main navigation". Selector: `[class~="aui-menubar"]`.
2. **Trigger** — The text trigger "Help Center". Selector: `[class~="aui-menubar-trigger"]`.
3. **Popup** — The 192px wide popup under the trigger (288px in the HCS scene), aligned to the trigger start. Selector: `[class~="aui-dropdown-popup"]`.
4. **Item** — A help action row: "Feedback", "Tutorials" or "Add to Home Screen". Selector: `[class~="aui-dropdown-item"]`.
5. **Submenu trigger** — In the HCS scene "Tutorials" is a submenu trigger that opens one tutorial to its right. Selector: `[class~="aui-dropdown-submenu-trigger"]`.

## Apps

- HCS (`hcs`)
- ACE (`ace`)
- ADM (`adm`)
- HS (`hs`)
- ADC (`adc`)
- PBS (`pbs`)
- PFD (`pfd`)
- RWS (`rws`)
- AGPD (`agpd`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Tutorials submenu (`hcs-help-center`)

Apps: HCS

In context source: HCS: `src/App.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/menubar/Menubar-003/example.tsx`

```tsx
import { useStageHost } from '../../../hooks/use-stage-host';
import { Menubar, View } from '../../../kit';

export default function Example() {
  const host = useStageHost();
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 10)', inlineSize: 'min(100%, calc(var(--p-px-16) * 36))' }}>
      <Menubar aria-label="Main navigation" aui={{ scale: 'sm' }}>
        <Menubar.Dropdown open>
          <Menubar.DropdownTrigger>Help Center</Menubar.DropdownTrigger>
          <Menubar.DropdownPortal container={host}>
            <Menubar.DropdownPositioner align="start" sideOffset={4} className="ug-anchored">
              <Menubar.DropdownPopup aui={{ sx: { width: '288' } }}>
                <Menubar.DropdownSubmenuRoot open>
                  <Menubar.DropdownSubmenuTrigger>Tutorials</Menubar.DropdownSubmenuTrigger>
                  <Menubar.DropdownPortal container={host}>
                    <Menubar.DropdownPositioner side="right" align="start" sideOffset={4} className="ug-anchored">
                      <Menubar.DropdownPopup>
                        <Menubar.DropdownItem>HCS: General Tutorial</Menubar.DropdownItem>
                      </Menubar.DropdownPopup>
                    </Menubar.DropdownPositioner>
                  </Menubar.DropdownPortal>
                </Menubar.DropdownSubmenuRoot>
                <Menubar.DropdownItem>Feedback Form</Menubar.DropdownItem>
              </Menubar.DropdownPopup>
            </Menubar.DropdownPositioner>
          </Menubar.DropdownPortal>
        </Menubar.Dropdown>
      </Menubar>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/menubar/Menubar-003/options/hcs-help-center/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Menubar, View } from '../../../../../kit';

// HCS App.tsx: the top bar (scale sm) holds the Help Center Menubar.Dropdown. Its 288px popup starts with a Tutorials submenu trigger that opens a second popup to its right (right, start, 4px offset) with the one tutorial,
// then the plain Feedback Form item. The app's positioner z-index (110 and 111) is its own page layering and is left out. The menu is shown open with the submenu open.
export default function HcsHelpCenterScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 10)', inlineSize: 'min(100%, calc(var(--p-px-16) * 36))' }}>
      <Menubar aria-label="Main navigation" aui={{ scale: 'sm' }}>
        <Menubar.Dropdown open>
          <Menubar.DropdownTrigger>Help Center</Menubar.DropdownTrigger>
          <Menubar.DropdownPortal container={host}>
            <Menubar.DropdownPositioner align="start" sideOffset={4} className="ug-anchored">
              <Menubar.DropdownPopup aui={{ sx: { width: '288' } }}>
                <Menubar.DropdownSubmenuRoot open>
                  <Menubar.DropdownSubmenuTrigger>Tutorials</Menubar.DropdownSubmenuTrigger>
                  <Menubar.DropdownPortal container={host}>
                    <Menubar.DropdownPositioner side="right" align="start" sideOffset={4} className="ug-anchored">
                      <Menubar.DropdownPopup>
                        <Menubar.DropdownItem>HCS: General Tutorial</Menubar.DropdownItem>
                      </Menubar.DropdownPopup>
                    </Menubar.DropdownPositioner>
                  </Menubar.DropdownPortal>
                </Menubar.DropdownSubmenuRoot>
                <Menubar.DropdownItem>Feedback Form</Menubar.DropdownItem>
              </Menubar.DropdownPopup>
            </Menubar.DropdownPositioner>
          </Menubar.DropdownPortal>
        </Menubar.Dropdown>
      </Menubar>
    </View>
  );
}
```

### 2. Plain help actions (`pbs-help-center`)

Apps: ACE, ADM, HS, ADC, PBS, PFD, RWS, AGPD

In context source: ACE: `src/features/top-navigation/ui/AceNavBar.tsx`; ADM: `src/app/layout/NavBar/NavBar.tsx`; HS: `src/hs/TopBar.tsx`; ADC: `src/adc/Workspace.tsx`; PBS: `src/TopBar.tsx`; PFD: `src/pfd/TopBar.tsx`; RWS: `src/rws/TopBar.tsx`; AGPD: `src/agpd/TopBar.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/menubar/Menubar-003/options/pbs-help-center/example.tsx`

```tsx
import { useStageHost } from '../../../../../hooks/use-stage-host';
import { Menubar, View } from '../../../../../kit';

export default function Example() {
  const host = useStageHost();
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 10)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Menubar aria-label="Application navigation" aui={{ scale: 'sm' }}>
        <Menubar.Dropdown open>
          <Menubar.DropdownTrigger>Help Center</Menubar.DropdownTrigger>
          <Menubar.DropdownPortal container={host}>
            <Menubar.DropdownPositioner align="start" sideOffset={4} className="ug-anchored">
              <Menubar.DropdownPopup aui={{ sx: { width: '192' } }}>
                <Menubar.DropdownItem>Feedback</Menubar.DropdownItem>
                <Menubar.DropdownItem>Tutorials</Menubar.DropdownItem>
                <Menubar.DropdownItem>Add to Home Screen</Menubar.DropdownItem>
              </Menubar.DropdownPopup>
            </Menubar.DropdownPositioner>
          </Menubar.DropdownPortal>
        </Menubar.Dropdown>
      </Menubar>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/menubar/Menubar-003/options/pbs-help-center/scene.tsx`

```tsx
import type { ContextProps } from '../../../../../types';
import { Menubar, View } from '../../../../../kit';

// PBS TopBar (src/TopBar.tsx), the same Help Center menu in PFD, RWS, AGPD, ACE, ADM, HS and ADC: the top bar (scale sm) holds one Menubar.Dropdown whose trigger reads "Help Center". The popup opens under it (start, 4px offset)
// and lists the plain items Feedback, Tutorials and Add to Home Screen. The popup is 192px here (PFD, RWS, AGPD the same); ADM and ADC set 160px, ACE and HS 288px, a size difference only. The menu is shown open and enabled.
export default function PbsHelpCenterScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 10)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Menubar aria-label="Application navigation" aui={{ scale: 'sm' }}>
        <Menubar.Dropdown open>
          <Menubar.DropdownTrigger>Help Center</Menubar.DropdownTrigger>
          <Menubar.DropdownPortal container={host}>
            <Menubar.DropdownPositioner align="start" sideOffset={4} className="ug-anchored">
              <Menubar.DropdownPopup aui={{ sx: { width: '192' } }}>
                <Menubar.DropdownItem>Feedback</Menubar.DropdownItem>
                <Menubar.DropdownItem>Tutorials</Menubar.DropdownItem>
                <Menubar.DropdownItem>Add to Home Screen</Menubar.DropdownItem>
              </Menubar.DropdownPopup>
            </Menubar.DropdownPositioner>
          </Menubar.DropdownPortal>
        </Menubar.Dropdown>
      </Menubar>
    </View>
  );
}
```

_Generated by `npm run docs:usecases`; edit the source use case, example, scene, or API data instead of editing this file._
