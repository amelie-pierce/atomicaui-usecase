import { Menubar } from '../../../kit';

export default function Example() {
  return (
    <Menubar aria-label="Top bar">
      <Menubar.Dropdown>
        <Menubar.DropdownTrigger aria-label="Settings" aui={{ profile: 'square' }}>
          <Menubar.Icon name="gear" />
        </Menubar.DropdownTrigger>
        <Menubar.DropdownPortal>
          <Menubar.DropdownPositioner align="end" sideOffset={4}>
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
