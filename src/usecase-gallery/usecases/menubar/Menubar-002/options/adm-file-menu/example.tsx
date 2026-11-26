import { useStageHost } from '../../../../../hooks/use-stage-host';
import { Menubar } from '../../../../../kit';

export default function Example() {
  const host = useStageHost();
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
