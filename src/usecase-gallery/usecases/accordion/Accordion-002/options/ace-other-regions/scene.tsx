import type { ContextProps } from '../../../../../types';
import { Accordion, Chip, Dialog, Type, View } from '../../../../../kit';

// ACE About dialog (src/features/top-navigation/ui/AboutDialog.tsx; HS src/hs/AboutDialog.tsx and FD src/components/AboutDialog.jsx write the same sections): the Popup with a raised Title and the close X, and the release notes Accordion whose second item, Updates for other regions, holds a second Accordion with one item per region (here one, open). Left out: the Release history column, the app header, the Global changes section above, the other regions and the "Updates for your project" band.
const trigger = (label: string, count: string) => (
  <Accordion.Header>
    <Accordion.Trigger>
      <span>
        <Type as="span" role="l3" weight="semi-bold">{label}</Type>{' '}
        <Type as="span" role="l5" color="muted">({count})</Type>
      </span>
      <Accordion.Chevron />
    </Accordion.Trigger>
  </Accordion.Header>
);

export default function AceOtherRegionsScene({ host }: ContextProps) {
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
          <Accordion aui={{ scale: 'sm' }} openMultiple defaultValue={['other']}>
                <Accordion.Item value="other">
                  {trigger('Updates for other regions', '1 update')}
                  <Accordion.Panel>
                    <Accordion aui={{ scale: 'sm' }} openMultiple defaultValue={['eu']}>
                      <Accordion.Item value="eu">
                        {trigger('Europe', '1 update')}
                        <Accordion.Panel>
                          <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', alignItems: 'start', gap: '12', paddingBlockStart: '8', paddingBlockEnd: '8' } }}>
                            <View aui={{ scale: 'sm', paint: 'text', sx: { width: '160', flex: 'none' } }}>
                              <Chip aui={{ scale: 'sm', color: 'success', paint: 'solid' }}>
                                <Chip.Label>FEATURE</Chip.Label>
                              </Chip>
                            </View>
                            <Type as="p" role="p3" aui={{ scale: 'sm', sx: { flex: 'fill', minWidth: '0' } }}>
                              Design to Eurocode 2.
                            </Type>
                          </View>
                        </Accordion.Panel>
                      </Accordion.Item>
                    </Accordion>
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
