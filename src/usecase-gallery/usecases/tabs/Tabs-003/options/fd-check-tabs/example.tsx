import { Tabs } from '../../../../../kit';

export default function Example() {
  return (
    <Tabs defaultValue="connection" aui={{ scale: 'sm', sx: { gap: '12' } }}>
      <Tabs.List aui={{ scale: 'sm' }}>
        <Tabs.Tab value="connection" aui={{ scale: 'sm' }}>
          <Tabs.Icon name="check" aui={{ scale: 'sm', color: 'success' }} />
          Connection
        </Tabs.Tab>
        <Tabs.Tab value="weld" aui={{ scale: 'sm' }}>
          <Tabs.Icon name="xmark" aui={{ scale: 'sm', color: 'error' }} />
          Weld
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="connection">Connection check</Tabs.Panel>
      <Tabs.Panel value="weld">Weld check</Tabs.Panel>
    </Tabs>
  );
}
