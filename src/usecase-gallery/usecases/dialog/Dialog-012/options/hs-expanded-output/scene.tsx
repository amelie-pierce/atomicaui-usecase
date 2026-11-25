import type { ContextProps } from '../../../../../types';
import { Dialog, Table, Type } from '../../../../../kit';

// HS expanded Output (src/hs/OutputTabs.tsx, with the in-page expand of Output.jsx): the same content as the page, moved into a Dialog.Popup with no Title and no close X, square
// (shape "none"), no-padding and filling the screen (width and height fill, gap 0); the app's toolbar inside the content collapses it. Here a plain toolbar line and one table row stand for it.
export default function HsExpandedOutputScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aria-label="Expanded Output" aui={{ shape: 'none', profile: 'no-padding', sx: { width: 'fill', height: 'fill', gap: '0' } }}>
            <Type data-ug-part="content-text" as="p" role="p3">
              Output toolbar
            </Type>
            <Table aria-label="Output">
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell>Load</Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Dead</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
