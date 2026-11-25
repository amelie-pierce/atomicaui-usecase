import type { CSSProperties } from 'react';
import type { ContextProps } from '../../../../../types';
import { Dialog, Tooltip } from '../../../../../kit';

// ADC reset dialog: an AlertDialog capped at 640px (the app caps it by the screen padding; 100% keeps it inside the preview stage) with a raised warning Title whose close X sits in a "Close" tooltip, and a split footer of three buttons: the default Cancel, a text error "Reset Current Design to Standard" and a solid error "Reset All Designs to Standard".
export default function AdcResetScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ '--aui-width': 'min(640px, 100%)' } as CSSProperties}>
            <Dialog.Title aui={{ color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" aui={{ color: 'warning', paint: 'text' }} />
              Warning: Reset Inputs?
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
              Restore factory defaults for the current design or all designs. Project information, design names, tabs, and their order are preserved.
            </Dialog.Description>
            <Dialog.Actions align="split" aui={{ sx: { flexWrap: 'wrap' } }}>
              <Dialog.Button data-ug-part="cancel">Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="reset-current" aui={{ color: 'error', paint: 'text', sx: { whiteSpace: 'nowrap' } }}>Reset Current Design to Standard</Dialog.Button>
              <Dialog.Button data-ug-part="reset-all" aui={{ color: 'error', paint: 'solid', sx: { whiteSpace: 'nowrap' } }}>Reset All Designs to Standard</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
