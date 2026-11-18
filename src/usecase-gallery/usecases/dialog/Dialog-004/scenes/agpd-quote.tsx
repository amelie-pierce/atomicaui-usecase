import type { ContextProps } from '../../../../types';
import { Dialog, View } from '../../../../kit';

// AGPD Request a quote (src/agpd/QuoteDialog.tsx): a Popup 840px wide (the stage caps it) whose Title sits on the card surface (color "surface", not raised) with only the close X, and a Body that scrolls (overflow auto) holding one wrapping form: the plate preview column and the form column side by side (each flex fill, minWidth 256, so they stack when narrow). Left out: the plate preview column, the dealer-only Account Number field, the validation errors and the Quote in progress dialog that follows a submit.
export default function AgpdQuoteScene({ children, host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} style={{ '--aui-width': 'min(840px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ color: 'surface' }}>
              REQUEST A QUOTE
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close REQUEST A QUOTE" />
            </Dialog.Title>
            <Dialog.Body aui={{ sx: { overflow: 'auto', minHeight: '0' } }}>
              <View as="form" aui={{ paint: 'text', sx: { display: 'flex', flexWrap: 'wrap', gap: '24', alignItems: 'start' } }}>
                {children}
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
