import { Dialog } from '../../../../../kit';
import { useStageHost } from '../../../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ '--aui-width': 'min(640px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ color: 'raised' }}>
              <Dialog.Icon name="triangle-exclamation" aui={{ color: 'warning', paint: 'text' }} />
              <span data-ug-part="title-text">Warning: Reset Inputs?</span>
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close" />
            </Dialog.Title>
            <Dialog.Description>
              Restore factory defaults for the current design or all designs. Project information and design names are preserved.
            </Dialog.Description>
            <Dialog.Actions align="split" aui={{ sx: { flexWrap: 'wrap' } }}>
              <Dialog.Button data-ug-part="cancel">Cancel</Dialog.Button>
              <Dialog.Button data-ug-part="reset-current" aui={{ color: 'error', paint: 'text', sx: { whiteSpace: 'nowrap' } }}>Reset Current Design to Standard</Dialog.Button>
              <Dialog.Button data-ug-part="confirm" aui={{ color: 'error', paint: 'solid', sx: { whiteSpace: 'nowrap' } }}>Reset All Designs to Standard</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
