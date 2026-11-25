import type { ContextProps } from '../../../../../types';
import { Dialog } from '../../../../../kit';

// FD LicenseGate (src/components/LicenseGate.jsx): the licence dialog asks for the country with a searchable Combobox (a Field.Label above, the list matching the trigger width, grouped by region with flags in the app). The scene shows the Combobox in the dialog body with a flat list.
export default function FdLicenseCountryScene({ children, host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>License Agreement</Dialog.Title>
            <Dialog.Body style={{ minBlockSize: 'calc(var(--p-px-16) * 14)' }}>
              {children}
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
