import type { ContextProps } from '../../../../types';
import { Button, Chip, Dialog, Field, List, Type, View } from '../../../../kit';

// PFD About dialog (src/pfd/AboutDialog.tsx): the same shell, Release history column and app header as the HCS dialog, but the notes column also carries a Key Features list (a muted label over a List at scale xs) and a right-aligned xs text button that expands or collapses every section. The button is shown in its Collapse all state.
export default function PfdAboutScene({ children, host }: ContextProps) {
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
            <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', overflow: 'hidden', minHeight: '0' } }}>
              <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'column', width: '224', flex: 'none', minHeight: '0', borderColor: 'outlined', borderInlineEndWidth: '1' } }}>
                <View aui={{ scale: 'sm', paint: 'text', profile: 'default', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', gap: '8', borderColor: 'outlined', borderBlockEndWidth: '1' } }}>
                  <Type as="strong" role="l4" weight="bold">
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
                          <Type as="strong" role="l3" weight="bold">
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
              <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'column', flex: 'fill', minHeight: '0', minWidth: '0' } }}>
                <View as="header" aui={{ scale: 'sm', paint: 'text', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '8', flex: 'none', borderColor: 'outlined', borderBlockEndWidth: '1' } }}>
                  <Type as="h2" role="h5">
                    Post-to-Foundation Designer
                  </Type>
                  <Type as="p" role="p3" color="muted">
                    PFD streamlines the design of anchorage and holdown solutions for specific uplift loads.
                  </Type>
                </View>
                <View aui={{ scale: 'sm', paint: 'text', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '16' } }}>
                  <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '4' } }}>
                    <Type as="p" role="p3" color="muted">
                      Key Features:
                    </Type>
                    <List aui={{ paint: 'text', profile: 'no-padding', scale: 'xs' }}>
                      <List.Item aui={{ sx: { alignItems: 'start' } }}>
                        <List.ItemText>
                          <Type as="span" role="p3" color="muted">
                            <Type as="strong" role="p3" weight="semi-bold">
                              Dynamic UI:
                            </Type>{' '}
                            the inputs follow the selected design code.
                          </Type>
                        </List.ItemText>
                      </List.Item>
                    </List>
                  </View>
                  <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', justifyContent: 'end' } }}>
                    <Button aui={{ paint: 'text', scale: 'xs' }}>Collapse all</Button>
                  </View>
                  {children}
                </View>
              </View>
            </View>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
