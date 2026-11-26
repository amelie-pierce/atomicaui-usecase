import { useStageHost } from '../../../hooks/use-stage-host';
import { Menubar, View } from '../../../kit';

export default function Example() {
  const host = useStageHost();
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
