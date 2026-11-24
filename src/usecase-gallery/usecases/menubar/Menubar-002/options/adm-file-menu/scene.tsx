import type { ContextProps } from '../../../../../types';
import { Menubar } from '../../../../../kit';

// ADM File menu (src/app/layout/NavBar/NavBar.tsx; ACE, HCS, PBS, PFD, RWS and AGPD write the same menu with fewer or other actions): a File trigger on the top bar opens a 192px popup
// (bottom, start, 4px offset) of device and template actions, a separator, then Print. Shown open and enabled (the apps disable Save, Download and Print by state); the bar's About and Reset are left out.
export default function AdmFileMenuScene({ host }: ContextProps) {
  return (
    <div style={{ minBlockSize: 'calc(var(--p-px-16) * 13)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Menubar aria-label="Top bar">
        <Menubar.Dropdown open>
          <Menubar.DropdownTrigger>File</Menubar.DropdownTrigger>
          <Menubar.DropdownPortal container={host}>
            <Menubar.DropdownPositioner sideOffset={4} align="start" className="ug-anchored">
              <Menubar.DropdownPopup aui={{ sx: { width: '192' } }}>
                <Menubar.DropdownItem>Save to device</Menubar.DropdownItem>
                <Menubar.DropdownItem>Open from device</Menubar.DropdownItem>
                <Menubar.DropdownItem>New from template</Menubar.DropdownItem>
                <Menubar.DropdownItem>Save as template</Menubar.DropdownItem>
                <Menubar.DropdownSeparator />
                <Menubar.DropdownItem>Print</Menubar.DropdownItem>
              </Menubar.DropdownPopup>
            </Menubar.DropdownPositioner>
          </Menubar.DropdownPortal>
        </Menubar.Dropdown>
      </Menubar>
    </div>
  );
}
