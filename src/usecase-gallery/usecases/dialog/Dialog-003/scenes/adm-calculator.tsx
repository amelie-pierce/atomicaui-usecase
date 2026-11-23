import type { ContextProps } from '../../../../types';
import { Dialog, Type } from '../../../../kit';

// ADM Thickness Calculator (src/features/base-plate/components/ThicknessCalculatorDialog.tsx): the dialog is opened by a Dialog.Trigger written inside the same Dialog root
// (a secondary solid soft "sm" button), then the usual raised Title with Spacer and close X over a Body. Shown open next to its trigger; the app's information panel, chart and error state are left out.
export default function AdmCalculatorScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Trigger type="button" aui={{ color: 'secondary', paint: 'solid', scale: 'sm', shape: 'soft' }}>
        Thickness Calculator
      </Dialog.Trigger>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ '--aui-width': 'min(520px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Thickness Calculator
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close" />
            </Dialog.Title>
            <Dialog.Body>
              <Type data-ug-part="calculator-text" as="p" role="p3">
                The calculator result goes here.
              </Type>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
