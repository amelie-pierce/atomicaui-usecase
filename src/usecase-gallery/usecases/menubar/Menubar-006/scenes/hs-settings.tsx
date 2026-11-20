import type { ContextProps } from '../../../../types';
import { Menubar } from '../../../../kit';

// HS top bar settings summary (src/hs/TopBar.tsx; ACE and FD write the same trigger in AceNavBar.tsx and SettingsPopover.jsx): a tonal surface Menubar.Button
// with the region, language and design code separated by Menubar.Divider. In HS and FD it is a Popover.Trigger render prop; the closed bar is drawn here and the flag image is a globe icon.
export default function HsSettingsScene(_: ContextProps) {
  return (
    <div style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 32))' }}>
      <Menubar aria-label="Top bar">
        <Menubar.Button aria-label="Settings" aui={{ color: 'surface', paint: 'tonal' }}>
          <Menubar.Icon name="globe" />
          US
          <Menubar.Divider />
          EN
          <Menubar.Divider />
          IBC 2018
          <Menubar.Divider />
          Allowable Stress Design (ASD)
        </Menubar.Button>
      </Menubar>
    </div>
  );
}
