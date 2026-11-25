import type { ContextProps } from '../../../../../types';
import { Dialog, Tooltip } from '../../../../../kit';

// ADC dialogs: the close X is the trigger of a "Close" tooltip (a solid secondary sm popup above it), inside a raised Title.
export default function AdcCloseScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Feedback Form
              <Dialog.Spacer />
              <Tooltip.Provider>
                <Tooltip>
                  <Tooltip.Trigger render={<Dialog.Close aria-label="Close" />} />
                  <Tooltip.Portal>
                    <Tooltip.Positioner side="top" sideOffset={8}>
                      <Tooltip.Popup aui={{ paint: 'solid', color: 'secondary', scale: 'sm' }}>Close</Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip>
              </Tooltip.Provider>
            </Dialog.Title>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
