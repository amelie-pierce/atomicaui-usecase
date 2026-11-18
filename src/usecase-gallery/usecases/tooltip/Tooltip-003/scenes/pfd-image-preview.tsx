import type { ContextProps } from '../../../../types';
import { ContainedImage, Tooltip, Type, View } from '../../../../kit';

// PFD ResultsTable ProductCell (src/pfd/ResultsTable.tsx line 59): the Model cell (a thumbnail and the product link, in a flex View) is the trigger; hover or focus opens the popup, kit default (surface, scale sm), above it (top, 4px offset),
// holding the larger image 96px wide (shown with a representative connection image). Shown open; the scene keeps one cell.
export default function PfdImagePreviewScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', paddingBlockStart: 'calc(var(--p-px-16) * 8)' }}>
      <Tooltip open>
        <Tooltip.Trigger render={<View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '8', minHeight: '32' } }} />}>
          <ContainedImage src="/images/tooltip-connection.svg" alt="" fit="contain" ratio="4:3" style={{ width: 'var(--p-px-32)' }} />
          <Type as="a" role="l4" color="secondary" href="#" onClick={(event) => event.preventDefault()} aui={{ sx: { textDecoration: 'underline' } }}>Model C-300</Type>
        </Tooltip.Trigger>
        <Tooltip.Portal container={host}>
          <Tooltip.Positioner side="top" sideOffset={4} className="ug-anchored">
            <Tooltip.Popup>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { width: '96', height: '64', display: 'flex', alignItems: 'center', justifyContent: 'center' } }}>
                <ContainedImage src="/images/tooltip-connection.svg" alt="" fit="contain" ratio="4:3" style={{ width: '100%' }} />
              </View>
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    </View>
  );
}
