# Menubar-005: Settings drawer row menu

Component family: **Menubar**

UI type: **Menubar with icon trigger**

Source: `src/usecase-gallery/usecases/menubar/Menubar-005/usecase.ts`

## What it is

A Settings text row in the phone drawer opens the same layout settings menu that the gear opens on the desktop top bar.

## When to choose it

Use it for the layout settings on a phone, where the top bar gear is replaced by a drawer row. Use Menubar-004 on the desktop top bar. Do not use it for file or help actions.

## Where it belongs

The phone drawer of ADM (src/features/settings/components/SettingsMenu.tsx) and ACE (src/features/settings/ui/SettingsMenu.tsx).

## Usage guidance

The same menu as the gear menu with a different trigger: the Menubar.DropdownTrigger is the text row "Settings" instead of the gear, and the menu opens beside or below it. ADM places the popup to the left (side "left", align "start", sideOffset 8, above the drawer) and keeps Auto-Rotate; ACE places it below, centred (side "bottom", align "center", sideOffset 4) and has no Auto-Rotate. The scenes show the enabled state: the apps disable Reset layout to default while the layout is at its default, and ADM hides the two groups and keeps only Auto-Rotate below 768px. Each scene is a minimal Menubar holding only the Settings trigger, shown open; the rest of the drawer is left out.

## AtomicAUI components, props, and token values

AtomicAUI components imported by this use case: `Menubar`, `View`

The source snippets below are authoritative for the complete prop values and composition. These styling values are the ones explicitly present in the selected examples and scenes:

- `paint`: `text`
- `profile`: `no-padding`

### Authored API props

No separate API prop table is authored. Use the exact props visible in the Component and In context source below.

## Structure (outer to inner)

1. **Menubar** — The strip named "Drawer" that holds the Settings row inside the phone drawer. Selector: `[class~="aui-menubar"]`.
2. **Trigger** — The text row "Settings" that opens the menu; it replaces the gear of the desktop bar. Selector: `[class~="aui-menubar-trigger"]`.
3. **Popup** — Menu labelled "Settings", opened below the row (side "bottom") and centred on it (align "center"). Selector: `[class~="aui-dropdown-popup"]`.
4. **Group** — The Pane Orientation group with its heading and rows. Selector: `[class~="aui-dropdown-group"]`.
5. **Group label** — The "Pane Orientation" caption above the radio rows (and "Pane Layout" in the scenes). Selector: `[class~="aui-dropdown-group-label"]`.
6. **Radio group** — Single-choice set with Vertical chosen; the ADM and ACE scenes add Horizontal and Grid. Selector: `[class~="aui-dropdown-radio-group"]`.
7. **Radio item** — The "Vertical" row with its table-columns icon and a hidden indicator. Selector: `[class~="aui-dropdown-radio-item"]`.
8. **Row icon** — The leading glyph of a row, table-columns for Vertical. Selector: `[class~="aui-dropdown-radio-item"] > [class~="aui-contained-icon"]`.
9. **Item** — The "Reset layout to default" row of the ACE and ADM scenes. Selector: `[class~="aui-dropdown-item"]`.
10. **Separator** — The divider between the orientation group and the layout group in the scenes. Selector: `[class~="aui-dropdown-separator"]`.
11. **Checkbox item** — The "Auto-Rotate 3D Model" check row that the ADM scene adds because ADM has a 3D model. Selector: `[class~="aui-dropdown-checkbox-item"]`.

## Apps

- ADM (`adm`)
- ACE (`ace`)

## Options and copyable source

Choose the option that matches the rendered UI and state. Each snippet is copied from the gallery source named above it; use the Component source for the isolated control and the In context source when you need its surrounding composition.

### 1. Drawer row (`adm-drawer-row`)

Apps: ADM

In context source: ADM: `src/features/settings/components/SettingsMenu.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/menubar/Menubar-005/example.tsx`

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
        inlineSize: "min(100%, calc(var(--p-px-16) * 32))",
      }}
    >
      <Menubar
        aria-label="Top bar"
        style={{ paddingInlineStart: "calc(var(--p-px-16) * 16)" }}
      >
        <Menubar.Dropdown open modal={false}>
          <Menubar.DropdownTrigger>Settings</Menubar.DropdownTrigger>
          <Menubar.DropdownPortal container={host}>
            <Menubar.DropdownPositioner
              side="left"
              align="start"
              sideOffset={8}
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

#### In context source — `src/usecase-gallery/usecases/menubar/Menubar-005/options/adm-drawer-row/scene.tsx`

```tsx
import type { ContextProps } from "../../../../../types";
import { Menubar, View } from "../../../../../kit";

// ADM drawer: the Settings text row opens its menu to the left (side left, align start, sideOffset 8), with Auto-Rotate.
export default function AdmDrawerRowScene({ host }: ContextProps) {
  return (
    <View
      aui={{
        paint: "text",
        profile: "no-padding",
        sx: { display: "flex", justifyContent: "end", alignItems: "start" },
      }}
      style={{
        minBlockSize: "calc(var(--p-px-16) * 28)",
        inlineSize: "min(100%, calc(var(--p-px-16) * 32))",
      }}
    >
      <Menubar
        aria-label="Top bar"
        style={{ paddingInlineStart: "calc(var(--p-px-16) * 16)" }}
      >
        <Menubar.Dropdown open modal={false}>
          <Menubar.DropdownTrigger>Settings</Menubar.DropdownTrigger>
          <Menubar.DropdownPortal container={host}>
            <Menubar.DropdownPositioner
              side="left"
              align="start"
              sideOffset={8}
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

### 2. Drawer row — UI variant 2 (`ace-drawer-row`)

Apps: ACE

In context source: ACE: `src/features/settings/ui/SettingsMenu.tsx`

In context view: Hidden by the authored option setting.

#### Component UI source — `src/usecase-gallery/usecases/menubar/Menubar-005/options/ace-drawer-row/example.tsx`

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
        inlineSize: "min(100%, calc(var(--p-px-16) * 32))",
      }}
    >
      <Menubar aria-label="Top bar">
        <Menubar.Dropdown open modal={false}>
          <Menubar.DropdownTrigger>Settings</Menubar.DropdownTrigger>
          <Menubar.DropdownPortal container={host}>
            <Menubar.DropdownPositioner
              side="bottom"
              align="center"
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

#### In context source — `src/usecase-gallery/usecases/menubar/Menubar-005/options/ace-drawer-row/scene.tsx`

```tsx
import type { ContextProps } from "../../../../../types";
import { Menubar, View } from "../../../../../kit";

// ACE drawer: the Settings text row opens its menu below, centred (side bottom, align center).
export default function AceDrawerRowScene({ host }: ContextProps) {
  return (
    <View
      aui={{
        paint: "text",
        profile: "no-padding",
        sx: { display: "flex", justifyContent: "end", alignItems: "start" },
      }}
      style={{
        minBlockSize: "calc(var(--p-px-16) * 28)",
        inlineSize: "min(100%, calc(var(--p-px-16) * 32))",
      }}
    >
      <Menubar aria-label="Top bar">
        <Menubar.Dropdown open modal={false}>
          <Menubar.DropdownTrigger>Settings</Menubar.DropdownTrigger>
          <Menubar.DropdownPortal container={host}>
            <Menubar.DropdownPositioner
              side="bottom"
              align="center"
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
