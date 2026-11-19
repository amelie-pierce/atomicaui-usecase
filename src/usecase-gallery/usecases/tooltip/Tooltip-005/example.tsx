import { Button, Tooltip } from '../../../kit';

export default function Example() {
  return (
    <Tooltip.Provider>
      <Tooltip>
        <Tooltip.Trigger render={<Button aria-label="Show in 3D" aui={{ color: 'surface', paint: 'text', shape: 'soft', sx: { width: '96', height: '80' } }} />}>
          <svg viewBox="0 0 192 128" aria-hidden="true" style={{ width: 'var(--p-px-72)', aspectRatio: '4 / 3' }}>
              <rect width="192" height="128" fill="var(--theme-surface-alt)" />
              <path d="M24 20h144v18H24zM36 38h120v18H36z" fill="var(--theme-muted)" stroke="var(--theme-secondary)" strokeWidth="2" />
              <path d="M66 56v46h60V56M75 56v37h42V56" fill="var(--theme-surface)" stroke="var(--theme-secondary)" strokeWidth="3" />
              <path d="M48 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M138 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M82 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M104 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" fill="var(--theme-secondary)" />
            </svg>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner side="right" sideOffset={4}>
            <Tooltip.Popup>Show in 3D</Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    </Tooltip.Provider>
  );
}
