import type { ContextProps } from '../../../../types';
import { Button, Dialog, Field, Radio, RadioGroup, View } from '../../../../kit';

const SELECTION = {
  scale: 'sm',
  states: {
    unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
    selected: { color: 'primary', paint: 'solid' },
  },
} as const;

// AGPD Request a quote (src/agpd/QuoteDialog.tsx): a Popup 840px wide (the stage caps it) whose Title sits on the card surface (color "surface", not raised) with only the close X, and a Body that scrolls (overflow auto) holding one wrapping form: the plate preview column and the form column side by side (each flex fill, minWidth 256, so they stack when narrow). Left out: the plate preview column, the dealer-only Account Number field, the validation errors and the Quote in progress dialog that follows a submit.
export default function AgpdQuoteScene({ host }: ContextProps) {
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
                <View aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '12', flex: 'fill', minWidth: '256' } }}>
                  <RadioGroup defaultValue="no" direction="row" aui={{ scale: 'sm', profile: 'no-padding', sx: { flexWrap: 'wrap' } }}>
                    <RadioGroup.Label aui={{ sx: { flexBasis: 'full' } }}>Are you a Simpson Strong-Tie Dealer ?</RadioGroup.Label>
                    <Radio value="yes" aui={SELECTION}>
                      <Radio.Label>Yes</Radio.Label>
                    </Radio>
                    <Radio value="no" aui={SELECTION}>
                      <Radio.Label>No</Radio.Label>
                    </Radio>
                  </RadioGroup>
                  <Field aui={{ scale: 'sm' }}>
                    <Field.Control>
                      <Field.Input placeholder="Name" aria-label="Name" />
                    </Field.Control>
                  </Field>
                  <Field aui={{ scale: 'sm' }}>
                    <Field.Textarea rows={4} placeholder=" Add project notes and other part requests" aria-label="Add project notes and other part requests" />
                  </Field>
                  <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8', justifyContent: 'end' } }}>
                    <Button type="submit" aui={{ color: 'secondary', paint: 'solid', scale: 'sm', shape: 'soft' }}>
                      SUBMIT
                    </Button>
                  </View>
                </View>
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
