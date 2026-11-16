import type { ContextProps } from '../types';
import { Accordion, IconButton, Type, View } from '../kit';

// The Input pane header: collapse chevron at the start, the title, a spacer, then the header icon button
// (Collapse all) at the end. Header icons are the contained profile (20px box), not the 28px rail size.
export default function PanelContext({ children }: ContextProps) {
  return (
    <View
      as="section"
      aria-label="Input"
      aui={{ scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }}
      style={{ inlineSize: 'min(100%, 420px)' }}
    >
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '8' } }} style={{ minBlockSize: 28 }}>
        <IconButton name="angle-left" aria-label="Collapse Input" aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'contained', shape: 'soft' }} />
        <Type as="h2" role="l3" weight="bold">Input</Type>
        <View aui={{ paint: 'text', profile: 'no-padding', sx: { flex: 'fill' } }} />
        {children}
      </View>
      <Accordion defaultValue={['connection']} aui={{ scale: 'sm' }}>
        <Accordion.Item value="connection">
          <Accordion.Header>
            <Accordion.Trigger>
              Connection Type
              <Accordion.Chevron />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            <Type as="p" role="p3">Face mount hanger on a supporting beam.</Type>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="load">
          <Accordion.Header>
            <Accordion.Trigger>
              Load Properties
              <Accordion.Chevron />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>
            <Type as="p" role="p3">Download duration and loads.</Type>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </View>
  );
}
