import type { ContextProps } from '../../../../../types';
import { Accordion, Type, View } from '../../../../../kit';

// PBS Input pane (src/App.tsx InputSection; PFD, RWS and AGPD write the same sections), Engineering Overview grid: two soft section cards 6px apart (a native rowGap on the View holding the items) on the pane, each with a Type l4 semi-bold title and the chevron but no section icon. Every corner of a card is rounded, stated as the four radii. Left out: the pane header, the section fields, the other sections and the grid columns.
export default function PbsCardsScene(_props: ContextProps) {
  return (
    <View data-ug-part="input-pane" as="aside" aria-label="Input" aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0', gap: '0' } }} style={{ inlineSize: 'min(100%, 360px)' }}>
      <span data-ug-component-root style={{ display: 'contents' }}>
          <Accordion openMultiple defaultValue={['Connection Type']} aui={{ scale: 'sm' }}>
        <View aui={{ paint: 'text', profile: 'no-padding', sx: { width: 'fill' } }} style={{ display: 'flex', flexDirection: 'column', rowGap: 6 }}>
          <Accordion.Item value="Connection Type" aui={{ color: 'surface', scale: 'sm', shape: 'soft', sx: { overflow: 'hidden', radiusStartStart: 'soft', radiusStartEnd: 'soft', radiusEndStart: 'soft', radiusEndEnd: 'soft' } }}>
            <Accordion.Header>
              <Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
                <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">Connection Type</Type>
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
                <Type data-ug-part="section-label" as="span" role="l4" weight="semi-bold">Load Properties</Type>
                <Accordion.Chevron />
              </Accordion.Trigger>
            </Accordion.Header>
          </Accordion.Item>
        </View>
      </Accordion></span>
    </View>
  );
}
