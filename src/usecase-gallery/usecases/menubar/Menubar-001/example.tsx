import { Menubar } from '../../../kit';

export default function Example() {
  return (
    <Menubar aria-label="Top bar">
      <Menubar.Dropdown>
        <Menubar.DropdownTrigger>File</Menubar.DropdownTrigger>
      </Menubar.Dropdown>
    </Menubar>
  );
}
