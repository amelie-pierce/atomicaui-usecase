import type { ContextProps } from '../../../../types';
import { ContainedIcon, Tooltip, Type, View } from '../../../../kit';

// PFD ResultsTable ProductCell (src/pfd/ResultsTable.tsx line 59): the Model cell (a thumbnail and the product link, in a flex View) is the trigger; hover or focus opens the popup, kit default (surface, scale sm), above it (top, 4px offset),
// holding the larger image 96px wide (the apps draw a ContainedImage; the gallery has no image, so a kit icon stands in). Shown open; the scene keeps one cell.
export default function PfdImagePreviewScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', paddingBlockStart: 'calc(var(--p-px-16) * 8)' }}>
      <Tooltip open>
        <Tooltip.Trigger render={<View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '8', minHeight: '32' } }} />}>
          <ContainedIcon name="image" aria-hidden />
          <Type as="a" role="l4" color="secondary" href="#model" aui={{ sx: { textDecoration: 'underline' } }}>Model C-300</Type>
        </Tooltip.Trigger>
        <Tooltip.Portal container={host}>
          <Tooltip.Positioner side="top" sideOffset={4} className="ug-anchored">
            <Tooltip.Popup>
              <View aui={{ paint: 'text', profile: 'no-padding', sx: { width: '96', height: '64', display: 'flex', alignItems: 'center', justifyContent: 'center' } }}>
                <ContainedIcon name="image" aria-hidden />
              </View>
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip>
    </View>
  );
}
