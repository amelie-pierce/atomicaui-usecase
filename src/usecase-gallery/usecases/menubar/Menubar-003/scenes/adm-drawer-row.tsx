import type { ContextProps } from "../../../../types";
import { Menubar, View } from "../../../../kit";

// ADM drawer: the Settings text row opens its menu to the left (side left, align start, sideOffset 8), with Auto-Rotate.
export default function AdmDrawerRowScene({ host }: ContextProps) {
  return (
    <View
      aui={{
        paint: "text",
        profile: "no-padding",
        sx: { display: "flex", justifyContent: "end" },
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
