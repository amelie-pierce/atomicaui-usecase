import { Menubar } from '../../../../../kit';

export default function Example() {
  return (
    <Menubar aria-label="Drawer">
      <Menubar.Dropdown>
        <Menubar.DropdownTrigger>Settings</Menubar.DropdownTrigger>
        <Menubar.DropdownPortal>
          <Menubar.DropdownPositioner side="bottom" align="center" sideOffset={4}>
            <Menubar.DropdownPopup aria-label="Settings">
              <Menubar.DropdownGroup>
                <Menubar.DropdownGroupLabel>Pane Orientation</Menubar.DropdownGroupLabel>
                <Menubar.DropdownRadioGroup defaultValue="vertical">
                  <Menubar.DropdownRadioItem value="vertical">
                    <Menubar.Icon name="table-columns" />
                    Vertical
                    <Menubar.DropdownRadioItemIndicator hidden />
                  </Menubar.DropdownRadioItem>
                </Menubar.DropdownRadioGroup>
              </Menubar.DropdownGroup>
            </Menubar.DropdownPopup>
          </Menubar.DropdownPositioner>
        </Menubar.DropdownPortal>
      </Menubar.Dropdown>
    </Menubar>
  );
}
