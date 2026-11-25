import type { ContextProps } from '../../../../../types';
import { Menubar } from '../../../../../kit';

// HS top bar (src/hs/TopBar.tsx; the other apps write About and Reset the same way): plain Menubar.Button text buttons between the File and Help Center menus.
// A Menubar.Dropdown is drawn next to them so the bar shows both trigger kinds; the logo, gear and theme toggle are left out.
export default function HsTopBarScene(_: ContextProps) {
  return (
    <div style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 28))' }}>
      <Menubar aria-label="Top bar">
        <Menubar.Dropdown>
          <Menubar.DropdownTrigger data-ug-part="file-menu">File</Menubar.DropdownTrigger>
        </Menubar.Dropdown>
        <Menubar.Button data-ug-part="button">About</Menubar.Button>
        <Menubar.Button data-ug-part="reset">Reset</Menubar.Button>
        <Menubar.Dropdown>
          <Menubar.DropdownTrigger data-ug-part="help-menu">Help Center</Menubar.DropdownTrigger>
        </Menubar.Dropdown>
      </Menubar>
    </div>
  );
}
