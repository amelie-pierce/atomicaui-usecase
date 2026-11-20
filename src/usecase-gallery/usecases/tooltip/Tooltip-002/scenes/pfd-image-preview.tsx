import type { ContextProps } from '../../../../types';
import { Tooltip, Type, View } from '../../../../kit';

// PFD ResultsTable ProductCell (src/pfd/ResultsTable.tsx line 59): the Model cell (a thumbnail and the product link, in a flex View) is the trigger; hover or focus opens the popup, kit default (surface, scale sm), above it (top, 4px offset),
// holding the larger image 96px wide (shown with a representative connection image). Shown open; the scene keeps one cell.
export default function PfdImagePreviewScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', paddingBlockStart: 'calc(var(--p-px-16) * 8)' }}>
      <Tooltip open>
        <Tooltip.Trigger render={<View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '8', minHeight: '32' } }} />}>
          <svg viewBox="0 0 192 128" aria-hidden="true" style={{ width: 'var(--p-px-32)', aspectRatio: '4 / 3' }}>
              <rect width="192" height="128" fill="var(--theme-surface-alt)" />
              <path d="M24 20h144v18H24zM36 38h120v18H36z" fill="var(--theme-muted)" stroke="var(--theme-secondary)" strokeWidth="2" />
              <path d="M66 56v46h60V56M75 56v37h42V56" fill="var(--theme-surface)" stroke="var(--theme-secondary)" strokeWidth="3" />
              <path d="M48 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M138 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M82 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M104 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" fill="var(--theme-secondary)" />
            </svg>
          <Type as="a" role="l4" color="secondary" href="#" onClick={(event) => event.preventDefault()} aui={{ sx: { textDecoration: 'underline' } }}>Model C-300</Type>
        </Tooltip.Trigger>
        <Tooltip.Portal container={host}>
          <Tooltip.Positioner side="top" sideOffset={4} className="ug-anchored">
            <Tooltip.Popup>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { width: '96', height: '64', display: 'flex', alignItems: 'center', justifyContent: 'center' } }}>
                <svg viewBox="0 0 192 128" role="img" aria-label="Model C-300 connection preview" style={{ width: '100%', aspectRatio: '4 / 3' }}>
              <rect width="192" height="128" fill="var(--theme-surface-alt)" />
              <path d="M24 20h144v18H24zM36 38h120v18H36z" fill="var(--theme-muted)" stroke="var(--theme-secondary)" strokeWidth="2" />
              <path d="M66 56v46h60V56M75 56v37h42V56" fill="var(--theme-surface)" stroke="var(--theme-secondary)" strokeWidth="3" />
              <path d="M48 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M138 29a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M82 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M104 74a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" fill="var(--theme-secondary)" />
            </svg>
              </View>
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    </View>
  );
}
