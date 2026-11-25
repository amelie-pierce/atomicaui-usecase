import type { ContextProps } from '../../../../../types';
import { Menubar } from '../../../../../kit';

// HS File menu (src/hs/TopBar.tsx; ADC writes the same menu in src/adc/Workspace.tsx with its own actions): the 192px popup ends, after a separator, in a Print row that opens a submenu
// (side right, start, 4px offset) holding the print action. Shown with the submenu open and every item enabled (the apps disable Save and Print by state); the bar's About and Reset are left out.
export default function HsFileMenuScene({ host }: ContextProps) {
  return (
    <div style={{ minBlockSize: 'calc(var(--p-px-16) * 13)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Menubar aria-label="Top bar">
        <Menubar.Dropdown open>
          <Menubar.DropdownTrigger>File</Menubar.DropdownTrigger>
          <Menubar.DropdownPortal container={host}>
            <Menubar.DropdownPositioner sideOffset={4} align="start" className="ug-anchored">
              <Menubar.DropdownPopup aui={{ sx: { width: '192' } }}>
                <Menubar.DropdownItem>Save To Device</Menubar.DropdownItem>
                <Menubar.DropdownItem>Open From Device</Menubar.DropdownItem>
                <Menubar.DropdownItem>New From Template</Menubar.DropdownItem>
                <Menubar.DropdownItem>Save As Template</Menubar.DropdownItem>
                <Menubar.DropdownSeparator />
                <Menubar.DropdownSubmenuRoot open>
                  <Menubar.DropdownSubmenuTrigger>Print</Menubar.DropdownSubmenuTrigger>
                  <Menubar.DropdownPortal container={host}>
                    <Menubar.DropdownPositioner side="right" align="start" sideOffset={4} className="ug-anchored">
                      <Menubar.DropdownPopup>
                        <Menubar.DropdownItem>Print Output</Menubar.DropdownItem>
                      </Menubar.DropdownPopup>
                    </Menubar.DropdownPositioner>
                  </Menubar.DropdownPortal>
                </Menubar.DropdownSubmenuRoot>
              </Menubar.DropdownPopup>
            </Menubar.DropdownPositioner>
          </Menubar.DropdownPortal>
        </Menubar.Dropdown>
      </Menubar>
    </div>
  );
}
