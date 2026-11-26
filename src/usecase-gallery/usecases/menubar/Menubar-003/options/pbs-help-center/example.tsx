import { useStageHost } from '../../../../../hooks/use-stage-host';
import { Menubar, View } from '../../../../../kit';

export default function Example() {
  const host = useStageHost();
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
