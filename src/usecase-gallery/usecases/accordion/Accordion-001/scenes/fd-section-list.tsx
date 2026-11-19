import type { ContextProps } from '../../../../types';
import { Accordion, Type, View } from '../../../../kit';

// FD Input pane (src/components/InputPane.jsx Section): two flush sections in one surface card, a 1px outlined divider above the second, each with no section icon and the title set in upper case by the app (toLocaleUpperCase). Left out: the pane header, the section fields and the other sections.
export default function FdListScene(_props: ContextProps) {
  return (
    <View as="aside" aria-label="Input" aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0', gap: '0' } }} style={{ inlineSize: 'min(100%, 360px)' }}>
      <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', overflow: 'hidden', gap: '0' } }}>
        <Accordion openMultiple defaultValue={['Connection Type']} aui={{ scale: 'sm' }}>
          <Accordion.Item value="Connection Type" aui={{ color: 'surface', scale: 'sm', shape: 'none' }}>
            <Accordion.Header>
              <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                <Type as="span" role="l4" weight="semi-bold">CONNECTION TYPE</Type>
                <Accordion.Chevron />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel aui={{ profile: 'default' }}>
              <Type as="p" role="p3">Section fields</Type>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="Load Properties" aui={{ color: 'surface', scale: 'sm', shape: 'none', sx: { borderColor: 'outlined', borderStyle: 'solid', borderBlockStartWidth: '1' } }}>
            <Accordion.Header>
              <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                <Type as="span" role="l4" weight="semi-bold">LOAD PROPERTIES</Type>
                <Accordion.Chevron />
              </Accordion.Trigger>
            </Accordion.Header>
          </Accordion.Item>
        </Accordion>
      </View>
    </View>
  );
}
