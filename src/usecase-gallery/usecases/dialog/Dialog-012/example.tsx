import { Dialog, Type } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aria-label="Expanded Output" aui={{ shape: 'none', profile: 'no-padding', sx: { width: 'fill', height: 'fill', gap: '0' } }}>
            <Type data-ug-part="content-text" as="p" role="p3">
              The content, with its own toolbar, goes here.
            </Type>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
