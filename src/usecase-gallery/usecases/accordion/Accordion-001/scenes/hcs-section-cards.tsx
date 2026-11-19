import type { ContextProps } from '../../../../types';
import { Accordion, Type, View } from '../../../../kit';

// HCS Input pane (src/App.tsx Section; ACE, ADM, HS and ADC write the same sections through their own files), Engineering Overview grid: two soft section cards 6px apart (a native rowGap on the View holding the items) on the pane, each with a regular-weight section icon, a Type l4 semi-bold title and the chevron. Every corner of a card is rounded, stated as the four radii. Left out: the pane header, the section fields, the other sections and the grid columns.
export default function HcsCardsScene(_props: ContextProps) {
  return (
    <View as="aside" aria-label="Input" aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0', gap: '0' } }} style={{ inlineSize: 'min(100%, 360px)' }}>
      <Accordion openMultiple defaultValue={['Connection Type']} aui={{ scale: 'sm' }}>
        <View aui={{ paint: 'text', profile: 'no-padding', sx: { width: 'fill' } }} style={{ display: 'flex', flexDirection: 'column', rowGap: 6 }}>
          <Accordion.Item value="Connection Type" aui={{ color: 'surface', scale: 'sm', shape: 'soft', sx: { overflow: 'hidden', radiusStartStart: 'soft', radiusStartEnd: 'soft', radiusEndStart: 'soft', radiusEndEnd: 'soft' } }}>
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
          <Accordion.Item value="Load Properties" aui={{ color: 'surface', scale: 'sm', shape: 'soft', sx: { overflow: 'hidden', radiusStartStart: 'soft', radiusStartEnd: 'soft', radiusEndStart: 'soft', radiusEndEnd: 'soft' } }}>
            <Accordion.Header>
              <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                <Accordion.Icon name="arrow-down" weight="regular" aria-hidden />
                <Type as="span" role="l4" weight="semi-bold">Load Properties</Type>
                <Accordion.Chevron />
              </Accordion.Trigger>
            </Accordion.Header>
          </Accordion.Item>
        </View>
      </Accordion>
    </View>
  );
}
