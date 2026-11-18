import { Menubar } from '../../../kit';

export default function Example() {
  return (
    <Menubar aria-label="Main navigation" aui={{ scale: 'sm' }}>
      <Menubar.Dropdown>
        <Menubar.DropdownTrigger>Help Center</Menubar.DropdownTrigger>
        <Menubar.DropdownPortal>
          <Menubar.DropdownPositioner align="start" sideOffset={4}>
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
