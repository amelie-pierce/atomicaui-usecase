import type { ContextProps } from '../../../../../types';
import { IconButton, Popover, Type, View } from '../../../../../kit';
import { MOCK_DURATION_NOTES } from '../../../../../mock-data';

// HcsDownloadDurationHelp: the circle-question trigger opens a popup above it (top, start, 8px offset). The popup is a
// View column: an intro row with the close X at its end, then a plain list of the five duration notes. HCS sets its
// width to min(34rem, viewport - 16px); the scene keeps min(34rem, stage) inline, since sx has no min() token.
// The wrapper keeps stage room (inline min-block-size) above the trigger for the popup.
export default function HcsHelpCloseScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'end' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 18)', inlineSize: 'min(100%, calc(var(--p-px-16) * 40))' }}>
    <Popover open>
      <Popover.Trigger
        render={
          <IconButton
            name="circle-question"
            aria-label="Help with Download Duration"
            aui={{ scale: 'sm', profile: 'contained', color: 'secondary', paint: 'text', shape: 'soft' }}
          />
        }
      />
      <Popover.Portal container={host}>
        <Popover.Positioner side="top" align="start" sideOffset={8} collisionPadding={8} className="ug-anchored">
          <Popover.Popup
            initialFocus={false}
            aria-label="Download Duration help"
            style={{ inlineSize: 'min(34rem, 100%)', overflowY: 'auto' }}
            render={
              <View
                aui={{ scale: 'sm', profile: 'default', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column' } }}
              />
            }
          >
            <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text', sx: { display: 'flex', alignItems: 'start' } }}>
              <Type data-ug-part="help-intro" aui={{ sx: { flex: 'fill' } }}>
                Duration of load adjustments as specified by the code are as follows:
              </Type>
              <span data-ug-component-root style={{ display: 'contents' }}>
                <IconButton
                  name="xmark"
                  aria-label="Close help"
                  aui={{ scale: 'sm', profile: 'square-compact', color: 'secondary', paint: 'text', shape: 'soft', sx: { flex: 'none' } }}
                />
              </span>
            </View>
            <View
              data-ug-part="duration-notes"
              as="ul"
              aui={{ scale: 'sm', profile: 'no-padding', paint: 'text', sx: { display: 'flex', flexDirection: 'column' } }}
              style={{ listStyle: 'none', margin: 0, padding: 0 }}
            >
              {MOCK_DURATION_NOTES.map(([label, description]) => (
                <li key={label}>
                  <strong>"{label}"</strong> – {description}
                </li>
              ))}
            </View>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover>
    </View>
  );
}
