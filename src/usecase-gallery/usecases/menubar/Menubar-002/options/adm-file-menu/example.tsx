import { Menubar } from '../../../../../kit';

export default function Example() {
  return (
    <Menubar aria-label="Top bar">
      <Menubar.Dropdown>
        <Menubar.DropdownTrigger>File</Menubar.DropdownTrigger>
        <Menubar.DropdownPortal>
          <Menubar.DropdownPositioner sideOffset={4} align="start">
            <Menubar.DropdownPopup aui={{ sx: { width: '192' } }}>
              <Menubar.DropdownItem>Save to device</Menubar.DropdownItem>
              <Menubar.DropdownItem>Open from device</Menubar.DropdownItem>
              <Menubar.DropdownSeparator />
              <Menubar.DropdownSubmenuRoot>
                <Menubar.DropdownSubmenuTrigger>Print</Menubar.DropdownSubmenuTrigger>
                <Menubar.DropdownPortal>
                  <Menubar.DropdownPositioner side="right" align="start" sideOffset={4}>
                    <Menubar.DropdownPopup>
                      <Menubar.DropdownItem>Print output</Menubar.DropdownItem>
                    </Menubar.DropdownPopup>
                  </Menubar.DropdownPositioner>
                </Menubar.DropdownPortal>
              </Menubar.DropdownSubmenuRoot>
            </Menubar.DropdownPopup>
          </Menubar.DropdownPositioner>
        </Menubar.DropdownPortal>
      </Menubar.Dropdown>
    </Menubar>
  );
}
