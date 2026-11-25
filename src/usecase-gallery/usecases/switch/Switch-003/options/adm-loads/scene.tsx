import type { ContextProps } from '../../../../../types';
import { Accordion, Type, View } from '../../../../../kit';

export default function AdmLoadsScene({ children }: ContextProps) {
  return (
    <View data-ug-part="input-pane" as="aside" aria-label="Input" aui={{ color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column' } }} style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 17.5))' }}>
      <Accordion defaultValue={['Load conditions']} aui={{ scale: 'sm' }}>
        <Accordion.Item data-ug-part="section" value="Load conditions" aui={{ color: 'surface', scale: 'sm', shape: 'none' }}>
          <Accordion.Header>
            <Accordion.Trigger data-ug-part="section-title" aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
              <Type role="l4" weight="semi-bold">Load conditions</Type>
              <Accordion.Chevron />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel aui={{ profile: 'default' }}>
            {children}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </View>
  );
}
