import { Accordion, Button, Dialog, List, Type, View } from '../../../../../kit';
import { useStageHost } from '../../../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { gap: '0' } }} style={{ '--aui-width': 'min(860px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              <span data-ug-part="title-text">About</span>
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close About" />
            </Dialog.Title>
            <View data-ug-part="body" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', overflow: 'hidden', minHeight: '0' } }}>
              <View data-ug-part="history-column" aui={{ scale: 'sm', paint: 'text', sx: { width: '224', flex: 'none', borderColor: 'outlined', borderInlineEndWidth: '1' } }}>
                <Type data-ug-part="history-heading" as="strong" role="l4" weight="bold">
                  Release history
                </Type>
              </View>
              <View data-ug-part="notes-column" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '16', flex: 'fill', minWidth: '0' } }}>
                <Type as="h2" role="h5">Post-to-Foundation Designer</Type>
                <Type as="p" role="p3" color="muted">PFD streamlines the design of anchorage and holdown solutions for specific uplift loads.</Type>
                <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '4' } }}>
                  <Type as="p" role="p3" color="muted">Key Features:</Type>
                  <List data-ug-part="key-features" aui={{ paint: 'text', profile: 'no-padding', scale: 'xs' }}>
                    <List.Item aui={{ sx: { alignItems: 'start' } }}>
                      <List.ItemText>
                        <Type as="span" role="p3" color="muted"><Type as="strong" role="p3" weight="semi-bold">Dynamic UI:</Type>{' '}the inputs follow the selected design code.</Type>
                      </List.ItemText>
                    </List.Item>
                  </List>
                </View>
                <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', justifyContent: 'end' } }}>
                  <Button data-ug-part="toggle-all" aui={{ paint: 'text', scale: 'xs' }}>Collapse all</Button>
                </View>
                <Accordion aui={{ scale: 'sm' }} openMultiple defaultValue={['global']}>
                  <Accordion.Item value="global">
                    <Accordion.Header>
                      <Accordion.Trigger>
                        <Type as="span" role="l3" weight="semi-bold">Global changes (1 update)</Type>
                        <Accordion.Chevron />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>Resize the Input, 3D Viewer, and Output panels to suit your workspace.</Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </View>
            </View>
            <Dialog.Actions data-ug-part="footer" aui={{ scale: 'sm' }}>
              <Dialog.Button data-ug-part="footer-close" aui={{ scale: 'sm', color: 'secondary' }}>Close</Dialog.Button>
            </Dialog.Actions>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
