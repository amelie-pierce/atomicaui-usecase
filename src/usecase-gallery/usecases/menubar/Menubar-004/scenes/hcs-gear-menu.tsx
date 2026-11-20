import type { ContextProps } from "../../../../types";
import { Menubar, View } from "../../../../kit";

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
