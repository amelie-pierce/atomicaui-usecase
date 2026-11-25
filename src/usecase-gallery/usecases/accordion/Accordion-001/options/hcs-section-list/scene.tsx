import type { ContextProps } from '../../../../../types';
import { Accordion, Type, View } from '../../../../../kit';

// HCS Input pane (src/App.tsx Section; ACE, ADM, HS and ADC write the same sections through their own files): two flush sections in one surface card, a 1px outlined divider above the second, each with a regular-weight section icon, a Type l4 semi-bold title and the chevron. Left out: the pane header, the section fields and the other sections.
export default function HcsListScene(_props: ContextProps) {
  return (
    <View as="aside" aria-label="Input" aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0', gap: '0' } }} style={{ inlineSize: 'min(100%, 360px)' }}>
      <View aui={{ color: 'surface', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', width: 'fill', overflow: 'hidden', gap: '0' } }}>
        <Accordion openMultiple defaultValue={['Connection Type']} aui={{ scale: 'sm' }}>
          <Accordion.Item value="Connection Type" aui={{ color: 'surface', scale: 'sm', shape: 'none' }}>
            <Accordion.Header>
              <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                <Accordion.Icon name="link" weight="regular" aria-hidden />
                <Type as="span" role="l4" weight="semi-bold">Connection Type</Type>
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
                <Accordion.Icon name="arrow-down" weight="regular" aria-hidden />
                <Type as="span" role="l4" weight="semi-bold">Load Properties</Type>
                <Accordion.Chevron />
              </Accordion.Trigger>
            </Accordion.Header>
          </Accordion.Item>
        </Accordion>
      </View>
    </View>
  );
}
