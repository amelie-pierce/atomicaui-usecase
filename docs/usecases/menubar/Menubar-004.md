# Menubar-004: Settings gear menu

Component family: **Menubar**

UI type: **Menubar with icon trigger**

Source: `src/usecase-gallery/usecases/menubar/Menubar-004/usecase.ts`

## What it is

A square gear button in the top bar opens a grouped menu of pane orientation radio rows, a reset row and, where the app has a 3D model, an Auto-Rotate check row.

## When to choose it

Use it for view settings that change the layout the user is working in, where each choice is a standing state rather than an action. Radio rows pick one orientation; the checkbox row switches one option. Do not use it for file or help actions: those are the File and Help Center menus (Menubar-002 and the next ones). The phone drawer row is Menubar-005.

## Where it belongs

The right end of the top bar, before the theme toggle, in every app but ADC: the layout settings that choose the Input and Output pane orientation (Vertical, Horizontal, Grid) and reset the pane sizes.

## Usage guidance

A Menubar.Dropdown whose Menubar.DropdownTrigger is the "gear" Menubar.Icon with profile "square" and aria-label "Settings" (the apps say "Layout settings" in places); the popup is aligned to the end of the trigger, 4px below it. Two Menubar.DropdownGroups, each with a GroupLabel ("Pane Orientation", "Pane Layout"): a RadioGroup of three RadioItems (Vertical "table-columns", Horizontal "table-rows", Grid "grid-2") and one DropdownItem "Reset layout to default" ("rotate-left"), with a Separator between the groups. Every row has a leading icon, and every RadioItem composes a Menubar.DropdownRadioItemIndicator with the hidden attribute: the kit draws a trailing dot unless an indicator is composed, so the chosen row shows only the item's own selected fill. Gear menu, HCS, ADM: the same menu plus a Separator and a CheckboxItem "Auto-Rotate 3D Model" ("rotate") with its indicator hidden; both apps wrap the trigger in an icon Tooltip "Settings" (the scene leaves it out because the open menu hides it), and HCS writes scale "sm" on the Dropdown, trigger and popup. Gear menu, other apps (ACE, HS, PFD, AGPD, PBS, RWS): the menu without Auto-Rotate (these apps have no 3D model) and without the trigger tooltip. Scale does not split the groups: PFD and AGPD write scale "sm" on the Dropdown, trigger and popup, PBS on the popup only, and ACE, HS and RWS write none; the rendered popups, rows (28px high, 6px gap) and trigger (28px square) match. RWS also puts a Separator under each group label; that is an app-side deviation from the shared menu, so it is not drawn. The scenes show the enabled state: the apps disable Reset layout to default while the layout is at its default and the Grid row below 992px. Each scene is a minimal Menubar holding only the Settings trigger, shown open; the theme toggle, the other bar items and the File and Help Center menus are left out.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Menubar`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `paint`: `text`
- `profile`: `no-padding`, `square`
- `scale`: `sm`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Menubar** — The "Top bar" strip whose right end holds the gear; the HCS and ACE scenes set it at scale "sm" and right-aligned. Selector: `[class~="aui-menubar"]`.
2. **Trigger** — Square gear button with aria-label "Settings" (profile "square") that opens the layout menu. Selector: `[class~="aui-menubar-trigger"]`.
3. **Trigger icon** — The gear glyph that is the whole visible content of the trigger. Selector: `[class~="aui-menubar-trigger"] > [class~="aui-contained-icon"]`.
4. **Popup** — Menu labelled "Settings", aligned to the end of the trigger so it stays on screen at the right edge. Selector: `[class~="aui-dropdown-popup"]`.
5. **Group** — The Pane Orientation group that holds its heading and the orientation rows. Selector: `[class~="aui-dropdown-group"]`.
6. **Group label** — The caption "Pane Orientation" (and "Pane Layout" in the scenes). Selector: `[class~="aui-dropdown-group-label"]`.
7. **Radio group** — Single-choice set with "vertical" chosen; the scenes add Horizontal and Grid. Selector: `[class~="aui-dropdown-radio-group"]`.
8. **Radio item** — The "Vertical" orientation row with its leading table-columns icon and a hidden indicator. Selector: `[class~="aui-dropdown-radio-item"]`.
9. **Row icon** — The leading glyph of a row, such as table-columns for Vertical. Selector: `[class~="aui-dropdown-radio-item"] > [class~="aui-contained-icon"]`.
10. **Item** — The "Reset layout to default" action row of the scenes, under its own Pane Layout group. Selector: `[class~="aui-dropdown-item"]`.
11. **Separator** — The divider between the orientation group, the layout group and the check row in the scenes. Selector: `[class~="aui-dropdown-separator"]`.
12. **Checkbox item** — The "Auto-Rotate 3D Model" check row of the HCS scene, shown only where the app has a 3D model. Selector: `[class~="aui-dropdown-checkbox-item"]`.

## Apps

- HCS (`hcs`)
- ADM (`adm`)
- ACE (`ace`)
- HS (`hs`)
- PFD (`pfd`)
- AGPD (`agpd`)
- RWS (`rws`)
- PBS (`pbs`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Gear menu (`hcs-gear-menu`)

Apps: HCS, ADM

In context source: HCS: `src/App.tsx`; ADM: `src/features/settings/components/SettingsMenu.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/menubar/Menubar-004/example.tsx`

```tsx
import { useStageHost } from '../../../hooks/use-stage-host';
import { Menubar, View } from "../../../kit";

export default function Example() {
  const host = useStageHost();
  return (
    <View
      aui={{
        paint: "text",
        profile: "no-padding",
        sx: { display: "flex", justifyContent: "end", alignItems: "start" },
      }}
      style={{
        minBlockSize: "calc(var(--p-px-16) * 28)",
        inlineSize: "min(100%, calc(var(--p-px-16) * 24))",
      }}
    >
      <Menubar aria-label="Top bar" aui={{ scale: "sm" }}>
        <Menubar.Dropdown open modal={false} aui={{ scale: "sm" }}>
          <Menubar.DropdownTrigger
            aria-label="Settings"
            aui={{ scale: "sm", profile: "square" }}
          >
            <Menubar.Icon name="gear" />
          </Menubar.DropdownTrigger>
          <Menubar.DropdownPortal container={host}>
            <Menubar.DropdownPositioner
              align="end"
              sideOffset={4}
              className="ug-anchored"
            >
              <Menubar.DropdownPopup
                aria-label="Settings"
                aui={{ scale: "sm" }}
              >
                <Menubar.DropdownGroup>
                  <Menubar.DropdownGroupLabel>
                    Pane Orientation
                  </Menubar.DropdownGroupLabel>
                  <Menubar.DropdownRadioGroup defaultValue="vertical">
                    <Menubar.DropdownRadioItem value="vertical">
                      <Menubar.Icon name="table-columns" />
                      Vertical
                      <Menubar.DropdownRadioItemIndicator hidden />
                    </Menubar.DropdownRadioItem>
                    <Menubar.DropdownRadioItem value="horizontal">
                      <Menubar.Icon name="table-rows" />
                      Horizontal
                      <Menubar.DropdownRadioItemIndicator hidden />
                    </Menubar.DropdownRadioItem>
                    <Menubar.DropdownRadioItem value="grid">
                      <Menubar.Icon name="grid-2" />
                      Grid
                      <Menubar.DropdownRadioItemIndicator hidden />
                    </Menubar.DropdownRadioItem>
                  </Menubar.DropdownRadioGroup>
                </Menubar.DropdownGroup>
                <Menubar.DropdownSeparator />
                <Menubar.DropdownGroup>
                  <Menubar.DropdownGroupLabel>
                    Pane Layout
                  </Menubar.DropdownGroupLabel>
                  <Menubar.DropdownItem>
                    <Menubar.Icon name="rotate-left" />
                    Reset layout to default
                  </Menubar.DropdownItem>
                </Menubar.DropdownGroup>
                <Menubar.DropdownSeparator />
                <Menubar.DropdownCheckboxItem defaultChecked>
                  <Menubar.Icon name="rotate" />
                  Auto-Rotate 3D Model
                  <Menubar.DropdownCheckboxItemIndicator hidden />
                </Menubar.DropdownCheckboxItem>
              </Menubar.DropdownPopup>
            </Menubar.DropdownPositioner>
          </Menubar.DropdownPortal>
        </Menubar.Dropdown>
      </Menubar>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/menubar/Menubar-004/options/hcs-gear-menu/scene.tsx`

```tsx
import type { ContextProps } from "../../../../../types";
import { Menubar, View } from "../../../../../kit";

// HCS and ADM: the gear with Auto-Rotate (hcs-design-prototype src/App.tsx; adm SettingsMenu.tsx). The apps wrap the trigger in an icon tooltip "Settings", left out here because the open menu hides it.
export default function HcsGearMenuScene({ host }: ContextProps) {
  return (
    <View
      aui={{
        paint: "text",
        profile: "no-padding",
        sx: { display: "flex", justifyContent: "end", alignItems: "start" },
      }}
      style={{
        minBlockSize: "calc(var(--p-px-16) * 28)",
        inlineSize: "min(100%, calc(var(--p-px-16) * 24))",
      }}
    >
      <Menubar aria-label="Top bar" aui={{ scale: "sm" }}>
        <Menubar.Dropdown open modal={false} aui={{ scale: "sm" }}>
          <Menubar.DropdownTrigger
            aria-label="Settings"
            aui={{ scale: "sm", profile: "square" }}
          >
            <Menubar.Icon name="gear" />
          </Menubar.DropdownTrigger>
          <Menubar.DropdownPortal container={host}>
            <Menubar.DropdownPositioner
              align="end"
              sideOffset={4}
              className="ug-anchored"
            >
              <Menubar.DropdownPopup
                aria-label="Settings"
                aui={{ scale: "sm" }}
              >
                <Menubar.DropdownGroup>
                  <Menubar.DropdownGroupLabel>
                    Pane Orientation
                  </Menubar.DropdownGroupLabel>
                  <Menubar.DropdownRadioGroup defaultValue="vertical">
                    <Menubar.DropdownRadioItem value="vertical">
                      <Menubar.Icon name="table-columns" />
                      Vertical
                      <Menubar.DropdownRadioItemIndicator hidden />
                    </Menubar.DropdownRadioItem>
                    <Menubar.DropdownRadioItem value="horizontal">
                      <Menubar.Icon name="table-rows" />
                      Horizontal
                      <Menubar.DropdownRadioItemIndicator hidden />
                    </Menubar.DropdownRadioItem>
                    <Menubar.DropdownRadioItem value="grid">
                      <Menubar.Icon name="grid-2" />
                      Grid
                      <Menubar.DropdownRadioItemIndicator hidden />
                    </Menubar.DropdownRadioItem>
                  </Menubar.DropdownRadioGroup>
                </Menubar.DropdownGroup>
                <Menubar.DropdownSeparator />
                <Menubar.DropdownGroup>
                  <Menubar.DropdownGroupLabel>
                    Pane Layout
                  </Menubar.DropdownGroupLabel>
                  <Menubar.DropdownItem>
                    <Menubar.Icon name="rotate-left" />
                    Reset layout to default
                  </Menubar.DropdownItem>
                </Menubar.DropdownGroup>
                <Menubar.DropdownSeparator />
                <Menubar.DropdownCheckboxItem defaultChecked>
                  <Menubar.Icon name="rotate" />
                  Auto-Rotate 3D Model
                  <Menubar.DropdownCheckboxItemIndicator hidden />
                </Menubar.DropdownCheckboxItem>
              </Menubar.DropdownPopup>
            </Menubar.DropdownPositioner>
          </Menubar.DropdownPortal>
        </Menubar.Dropdown>
      </Menubar>
    </View>
  );
}
```

### 2. Gear menu — UI variant 2 (`ace-gear-menu`)

Apps: ACE, HS, PFD, AGPD, RWS, PBS

In context source: ACE: `src/features/settings/ui/SettingsMenu.tsx`; HS: `src/hs/TopBar.tsx`; PFD: `src/pfd/TopBar.tsx`; AGPD: `src/agpd/TopBar.tsx`; RWS: `src/rws/TopBar.tsx`; PBS: `src/TopBar.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/menubar/Menubar-004/options/ace-gear-menu/example.tsx`

```tsx
import { useStageHost } from '../../../../../hooks/use-stage-host';
import type { ContextProps } from "../../../../../types";
import { Menubar, View } from "../../../../../kit";

export default function Example() {
  const host = useStageHost();
  return (
    <View
      aui={{
        paint: "text",
        profile: "no-padding",
        sx: { display: "flex", justifyContent: "end", alignItems: "start" },
      }}
      style={{
        minBlockSize: "calc(var(--p-px-16) * 28)",
        inlineSize: "min(100%, calc(var(--p-px-16) * 24))",
      }}
    >
      <Menubar aria-label="Top bar">
        <Menubar.Dropdown open modal={false}>
          <Menubar.DropdownTrigger
            aria-label="Settings"
            aui={{ profile: "square" }}
          >
            <Menubar.Icon name="gear" />
          </Menubar.DropdownTrigger>
          <Menubar.DropdownPortal container={host}>
            <Menubar.DropdownPositioner
              align="end"
              sideOffset={4}
              className="ug-anchored"
            >
              <Menubar.DropdownPopup aria-label="Settings">
                <Menubar.DropdownGroup>
                  <Menubar.DropdownGroupLabel>
                    Pane Orientation
                  </Menubar.DropdownGroupLabel>
                  <Menubar.DropdownRadioGroup defaultValue="vertical">
                    <Menubar.DropdownRadioItem value="vertical">
                      <Menubar.Icon name="table-columns" />
                      Vertical
                      <Menubar.DropdownRadioItemIndicator hidden />
                    </Menubar.DropdownRadioItem>
                    <Menubar.DropdownRadioItem value="horizontal">
                      <Menubar.Icon name="table-rows" />
                      Horizontal
                      <Menubar.DropdownRadioItemIndicator hidden />
                    </Menubar.DropdownRadioItem>
                    <Menubar.DropdownRadioItem value="grid">
                      <Menubar.Icon name="grid-2" />
                      Grid
                      <Menubar.DropdownRadioItemIndicator hidden />
                    </Menubar.DropdownRadioItem>
                  </Menubar.DropdownRadioGroup>
                </Menubar.DropdownGroup>
                <Menubar.DropdownSeparator />
                <Menubar.DropdownGroup>
                  <Menubar.DropdownGroupLabel>
                    Pane Layout
                  </Menubar.DropdownGroupLabel>
                  <Menubar.DropdownItem>
                    <Menubar.Icon name="rotate-left" />
                    Reset layout to default
                  </Menubar.DropdownItem>
                </Menubar.DropdownGroup>
              </Menubar.DropdownPopup>
            </Menubar.DropdownPositioner>
          </Menubar.DropdownPortal>
        </Menubar.Dropdown>
      </Menubar>
    </View>
  );
}
```

#### In context source — `src/usecase-gallery/usecases/menubar/Menubar-004/options/ace-gear-menu/scene.tsx`

```tsx
import type { ContextProps } from "../../../../../types";
import { Menubar, View } from "../../../../../kit";

// ACE, HS, PFD, AGPD, PBS and RWS: the gear without Auto-Rotate (no 3D model). PFD, AGPD and PBS write scale "sm", which renders the same; RWS adds a separator under each group label, an app-side deviation not drawn here.
export default function AceGearMenuScene({ host }: ContextProps) {
  return (
    <View
      aui={{
        paint: "text",
        profile: "no-padding",
        sx: { display: "flex", justifyContent: "end", alignItems: "start" },
      }}
      style={{
        minBlockSize: "calc(var(--p-px-16) * 28)",
        inlineSize: "min(100%, calc(var(--p-px-16) * 24))",
      }}
    >
      <Menubar aria-label="Top bar">
        <Menubar.Dropdown open modal={false}>
          <Menubar.DropdownTrigger
            aria-label="Settings"
            aui={{ profile: "square" }}
          >
            <Menubar.Icon name="gear" />
          </Menubar.DropdownTrigger>
          <Menubar.DropdownPortal container={host}>
            <Menubar.DropdownPositioner
              align="end"
              sideOffset={4}
              className="ug-anchored"
            >
              <Menubar.DropdownPopup aria-label="Settings">
                <Menubar.DropdownGroup>
                  <Menubar.DropdownGroupLabel>
                    Pane Orientation
                  </Menubar.DropdownGroupLabel>
                  <Menubar.DropdownRadioGroup defaultValue="vertical">
                    <Menubar.DropdownRadioItem value="vertical">
                      <Menubar.Icon name="table-columns" />
                      Vertical
                      <Menubar.DropdownRadioItemIndicator hidden />
                    </Menubar.DropdownRadioItem>
                    <Menubar.DropdownRadioItem value="horizontal">
                      <Menubar.Icon name="table-rows" />
                      Horizontal
                      <Menubar.DropdownRadioItemIndicator hidden />
                    </Menubar.DropdownRadioItem>
                    <Menubar.DropdownRadioItem value="grid">
                      <Menubar.Icon name="grid-2" />
                      Grid
                      <Menubar.DropdownRadioItemIndicator hidden />
                    </Menubar.DropdownRadioItem>
                  </Menubar.DropdownRadioGroup>
                </Menubar.DropdownGroup>
                <Menubar.DropdownSeparator />
                <Menubar.DropdownGroup>
                  <Menubar.DropdownGroupLabel>
                    Pane Layout
                  </Menubar.DropdownGroupLabel>
                  <Menubar.DropdownItem>
                    <Menubar.Icon name="rotate-left" />
                    Reset layout to default
                  </Menubar.DropdownItem>
                </Menubar.DropdownGroup>
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
