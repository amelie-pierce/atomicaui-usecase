import type { ContextProps } from '../../../../../types';
import { Menubar, View } from '../../../../../kit';

// HCS App.tsx: the top bar (scale sm) holds the Help Center Menubar.Dropdown. Its 288px popup starts with a Tutorials submenu trigger that opens a second popup to its right (right, start, 4px offset) with the one tutorial,
// then the plain Feedback Form item. The app's positioner z-index (110 and 111) is its own page layering and is left out. The menu is shown open with the submenu open.
export default function HcsHelpCenterScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 10)', inlineSize: 'min(100%, calc(var(--p-px-16) * 36))' }}>
      <Menubar aria-label="Main navigation" aui={{ scale: 'sm' }}>
        <Menubar.Dropdown open>
          <Menubar.DropdownTrigger>Help Center</Menubar.DropdownTrigger>
          <Menubar.DropdownPortal container={host}>
            <Menubar.DropdownPositioner align="start" sideOffset={4} className="ug-anchored">
              <Menubar.DropdownPopup aui={{ sx: { width: '288' } }}>
                <Menubar.DropdownSubmenuRoot open>
                  <Menubar.DropdownSubmenuTrigger>Tutorials</Menubar.DropdownSubmenuTrigger>
                  <Menubar.DropdownPortal container={host}>
                    <Menubar.DropdownPositioner side="right" align="start" sideOffset={4} className="ug-anchored">
                      <Menubar.DropdownPopup>
                        <Menubar.DropdownItem>HCS: General Tutorial</Menubar.DropdownItem>
                      </Menubar.DropdownPopup>
                    </Menubar.DropdownPositioner>
                  </Menubar.DropdownPortal>
                </Menubar.DropdownSubmenuRoot>
                <Menubar.DropdownItem>Feedback Form</Menubar.DropdownItem>
              </Menubar.DropdownPopup>
            </Menubar.DropdownPositioner>
          </Menubar.DropdownPortal>
        </Menubar.Dropdown>
      </Menubar>
    </View>
  );
}
