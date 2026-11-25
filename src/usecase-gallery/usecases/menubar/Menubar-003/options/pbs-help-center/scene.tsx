import type { ContextProps } from '../../../../../types';
import { Menubar, View } from '../../../../../kit';

// PBS TopBar (src/TopBar.tsx), the same Help Center menu in PFD, RWS, AGPD, ACE, ADM, HS and ADC: the top bar (scale sm) holds one Menubar.Dropdown whose trigger reads "Help Center". The popup opens under it (start, 4px offset)
// and lists the plain items Feedback, Tutorials and Add to Home Screen. The popup is 192px here (PFD, RWS, AGPD the same); ADM and ADC set 160px, ACE and HS 288px, a size difference only. The menu is shown open and enabled.
export default function PbsHelpCenterScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 10)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Menubar aria-label="Application navigation" aui={{ scale: 'sm' }}>
        <Menubar.Dropdown open>
          <Menubar.DropdownTrigger>Help Center</Menubar.DropdownTrigger>
          <Menubar.DropdownPortal container={host}>
            <Menubar.DropdownPositioner align="start" sideOffset={4} className="ug-anchored">
              <Menubar.DropdownPopup aui={{ sx: { width: '192' } }}>
                <Menubar.DropdownItem>Feedback</Menubar.DropdownItem>
                <Menubar.DropdownItem>Tutorials</Menubar.DropdownItem>
                <Menubar.DropdownItem>Add to Home Screen</Menubar.DropdownItem>
              </Menubar.DropdownPopup>
            </Menubar.DropdownPositioner>
          </Menubar.DropdownPortal>
        </Menubar.Dropdown>
      </Menubar>
    </View>
  );
}
