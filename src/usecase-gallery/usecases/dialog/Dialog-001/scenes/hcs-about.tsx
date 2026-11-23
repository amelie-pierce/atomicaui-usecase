import type { ContextProps } from '../../../../types';
import { Accordion, Chip, Dialog, Field, List, Type, View } from '../../../../kit';

// HCS About dialog (the shared dialog of ACE, ADM, PBS, HS, FD, AGPD and RWS; src/components/HcsAboutDialog.tsx): an 860 x 740 Popup (capped by the stage, height from the content) with a raised Title, a Release history column (heading, search Field, one selected release row with a CURRENT Chip) beside the app header and the release notes. The apps add or drop the "Updates for your project" band by release and region; the scene leaves it out.
export default function HcsAboutScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aui={{ scale: 'sm', sx: { gap: '0' } }} style={{ '--aui-width': 'min(860px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ scale: 'sm', color: 'raised' }}>
              About
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close About" />
            </Dialog.Title>
            <View data-ug-part="body" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', overflow: 'hidden', minHeight: '0' } }}>
              <View data-ug-part="history-column" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'column', width: '224', flex: 'none', minHeight: '0', borderColor: 'outlined', borderInlineEndWidth: '1' } }}>
                <View data-ug-part="history-header" aui={{ scale: 'sm', paint: 'text', profile: 'default', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', gap: '8', borderColor: 'outlined', borderBlockEndWidth: '1' } }}>
                  <Type data-ug-part="history-heading" as="strong" role="l4" weight="bold">
                    Release history
                  </Type>
                  <Type as="span" role="l6" color="muted">
                    1 version
                  </Type>
                </View>
                <View aui={{ scale: 'sm', paint: 'text', profile: 'default' }}>
                  <Field aui={{ scale: 'sm' }}>
                    <Field.Control>
                      <Field.Icon name="magnifying-glass" />
                      <Field.Input type="search" placeholder="Search releases" aria-label="Search releases" />
                    </Field.Control>
                  </Field>
                </View>
                <List role="listbox" aria-label="Release history" aui={{ scale: 'sm', paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column' } }}>
                  <List.Item
                    interactive
                    role="option"
                    selected
                    aria-selected
                    aui={{ scale: 'sm', color: 'surface', paint: 'solid', sx: { width: 'fill', alignItems: 'start', borderColor: 'secondary', borderInlineStartWidth: '4' } }}
                  >
                    <List.ItemIndicator aui={{ scale: 'sm', sx: { display: 'none' } }} />
                    <List.ItemText>
                      <View as="span" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '4' } }}>
                        <View as="span" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', flexWrap: 'wrap', gap: '8' } }}>
                          <Type data-ug-part="version" as="strong" role="l3" weight="bold">
                            1.0.0
                          </Type>
                          <Chip aui={{ scale: 'sm', color: 'primary', paint: 'tonal' }}>
                            <Chip.Label>CURRENT</Chip.Label>
                          </Chip>
                        </View>
                      </View>
                    </List.ItemText>
                  </List.Item>
                </List>
              </View>
              <View data-ug-part="notes-column" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'column', flex: 'fill', minHeight: '0', minWidth: '0' } }}>
                <View data-ug-part="notes-header" as="header" aui={{ scale: 'sm', paint: 'text', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '8', flex: 'none', borderColor: 'outlined', borderBlockEndWidth: '1' } }}>
                  <Type as="h2" role="h5">
                    Hinge Connector Selector
                  </Type>
                  <Type as="p" role="p3" color="muted">
                    Explore timber hinge connector models for your project.
                  </Type>
                </View>
                <View aui={{ scale: 'sm', paint: 'text', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '16' } }}>
                  <Accordion aui={{ scale: 'sm' }} openMultiple defaultValue={['global']}>
                    <Accordion.Item value="global">
                      <Accordion.Header>
                        <Accordion.Trigger>
                          <span>
                            <Type as="span" role="l3" weight="semi-bold">
                              Global changes
                            </Type>{' '}
                            <Type as="span" role="l5" color="muted">
                              (1 update)
                            </Type>
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
                  </Accordion>
                </View>
              </View>
            </View>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
