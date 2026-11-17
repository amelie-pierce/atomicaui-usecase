import type { ContextProps } from '../../../../types';
import { Dialog, Tooltip } from '../../../../kit';

// ADC DesignCapacityDialog (the About dialog ends the same way with Close): an AlertDialog whose one footer button is a solid primary (orange) OK, with the close X in a "Close" tooltip.
export default function AdcOkScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              <Dialog.Icon name="circle-xmark" aui={{ color: 'error' }} />
              Maximum Number of Designs Reached
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
            <Dialog.Description>
              A Project can contain a maximum of 15 Designs. Please close an existing Design before creating or duplicating a Design.
            </Dialog.Description>
            <Dialog.Actions>
              <Dialog.Button aui={{ color: 'primary', paint: 'solid' }}>OK</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
