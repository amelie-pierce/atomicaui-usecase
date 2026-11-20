import { Menubar } from '../../../kit';

export default function Example() {
  return (
    <Menubar aria-label="Top bar">
      <Menubar.Dropdown>
        <Menubar.DropdownTrigger>Help Center</Menubar.DropdownTrigger>
        <Menubar.DropdownPortal>
          <Menubar.DropdownPositioner sideOffset={4} align="start">
            <Menubar.DropdownPopup aui={{ sx: { width: '192' } }}>
              <Menubar.DropdownItem>Feedback</Menubar.DropdownItem>
              <Menubar.DropdownItem>Tutorials</Menubar.DropdownItem>
              <Menubar.DropdownItem>Add to Home Screen</Menubar.DropdownItem>
            </Menubar.DropdownPopup>
          </Menubar.DropdownPositioner>
        </Menubar.DropdownPortal>
      </Menubar.Dropdown>
    </Menubar>
  );
}
