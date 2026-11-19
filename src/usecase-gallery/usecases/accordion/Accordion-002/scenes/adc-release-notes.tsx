import type { ContextProps } from '../../../../types';
import { Accordion, Dialog, Icon, Type, View } from '../../../../kit';

// ADC About dialog (src/adc/Workspace.tsx): the shell dialog Popup with a raised Title and the close X, and a Body holding one Accordion whose release item is written like an Input section: surface item and trigger (scale "sm", shape "none"), the version line as a Type l4 semi-bold with no count, and a panel row of a warning surface label with an icon beside the change text. Left out: the app description above the Accordion, the Close footer and further releases.
export default function AdcReleaseNotesScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false}>
            <Dialog.Title aui={{ color: 'raised' }}>
              About
              <Dialog.Spacer />
              <Dialog.Close aria-label="Close About" />
            </Dialog.Title>
            <Dialog.Body>
              <Accordion defaultValue={['initial']}>
                <Accordion.Item value="initial" aui={{ color: 'surface', scale: 'sm', shape: 'none' }}>
                  <Accordion.Header>
                    <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                      <Type as="span" role="l4" weight="semi-bold">1.0 Released on Jan 01, 2027 (TBD)</Type>
                      <Accordion.Chevron />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel aui={{ profile: 'default' }}>
                    <View aui={{ paint: 'text', profile: 'no-padding', scale: 'sm', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '8' } }}>
                      <View aui={{ color: 'warning', paint: 'solid', shape: 'soft', scale: 'sm', profile: 'default', sx: { display: 'flex', alignItems: 'center', gap: '4' } }}>
                        <Icon name="wand-magic-sparkles" aria-hidden="true" style={{ color: 'inherit' }} />
                        <Type role="l4">Initial</Type>
                      </View>
                      <Type role="l4">Initial release of the application</Type>
                    </View>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
