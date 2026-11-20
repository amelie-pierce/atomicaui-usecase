import type { ContextProps } from "../../../../types";
import { Menubar, View } from "../../../../kit";

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
