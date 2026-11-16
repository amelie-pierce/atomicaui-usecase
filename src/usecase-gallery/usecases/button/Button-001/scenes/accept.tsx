import type { ContextProps } from '../../../../types';
import { Dialog, Type } from '../../../../kit';

// The licence dialog: Accept stays disabled until the body is read to the end (not wired here).
export default function AcceptScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', shape: 'soft' }}>
          <Dialog.Title aui={{ color: 'raised' }}>
            Website Application License Agreement
            <Dialog.Spacer />
            <Dialog.Close />
          </Dialog.Title>
          <Dialog.Description>Review and accept to start using the prototype.</Dialog.Description>
          <Dialog.Body aui={{ profile: 'default' }}>
            <Type as="p" role="p3">1. This sample agreement is placeholder text for the preview.</Type>
            <Type as="p" role="p3">2. Scroll to the end of the agreement to enable Accept.</Type>
            <Type as="p" role="p3">3. Placeholder terms continue here.</Type>
          </Dialog.Body>
          <Dialog.Actions>
            <Dialog.Button dismiss={false}>Do Not Accept</Dialog.Button>
            <Dialog.Button dismiss={false} disabled aui={{ color: 'secondary', paint: 'solid' }}>Accept Application License Agreement</Dialog.Button>
          </Dialog.Actions>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog>
  );
}
