import type { ContextProps } from '../../../../../types';
import { Accordion, Chip, Dialog, Type, View } from '../../../../../kit';

// HCS About dialog (src/components/HcsAboutDialog.tsx; ACE, ADM, PFD, PBS, HS, FD, AGPD and RWS write the same Accordion, FD as one Accordion per section): the Popup (capped by the stage) with a raised Title and the close X, and a Body View holding the release notes Accordion with its one open Global changes section and one change row. Left out: the Release history column, the app header, the "Updates for your project" band, the other sections and PFD's Collapse all button.
export default function HcsReleaseNotesScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { gap: '0' } }} style={{ '--aui-width': 'min(640px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              About
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close About" />
            </Dialog.Title>
            <View data-ug-part="about-body" aui={{ scale: 'sm', paint: 'text', profile: 'default' }}>
              <span data-ug-component-root style={{ display: 'contents' }}>
          <Accordion aui={{ scale: 'sm' }} openMultiple defaultValue={['global']}>
                <Accordion.Item value="global">
                  <Accordion.Header>
                    <Accordion.Trigger>
                      <span data-ug-part="section-label">
                        <Type as="span" role="l3" weight="semi-bold">Global changes</Type>{' '}
                        <Type as="span" role="l5" color="muted">(1 update)</Type>
                      </span>
                      <Accordion.Chevron />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel>
                    <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', alignItems: 'start', gap: '12', paddingBlockStart: '8', paddingBlockEnd: '8' } }}>
                      <View aui={{ scale: 'sm', paint: 'text', sx: { width: '160', flex: 'none' } }}>
                        <Chip aui={{ scale: 'sm', color: 'warning', paint: 'solid' }}>
                          <Chip.Label>IMPROVEMENT</Chip.Label>
                        </Chip>
                      </View>
                      <Type as="p" role="p3" aui={{ scale: 'sm', sx: { flex: 'fill', minWidth: '0' } }}>
                        Resize the Input, 3D Viewer, and Output panels to suit your workspace.
                      </Type>
                    </View>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion></span>
            </View>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
