import { Tabs } from '../../../kit';

export default function Example() {
  return (
    <Tabs defaultValue="d1" aui={{ profile: 'no-padding' }}>
      <Tabs.List>
        <Tabs.Tab
          value="d1"
          nativeButton={false}
          render={<div />}
          aui={{ color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'raised', paint: 'tonal' } } }}
        >
          <span>Design 1</span>
          <Tabs.PinButton name="circle-exclamation" aria-label="The design has an error" aui={{ color: 'error', profile: 'contained' }} />
          <Tabs.CloseButton aria-label="Close Design 1" />
        </Tabs.Tab>
        <Tabs.Tab
          value="d2"
          nativeButton={false}
          render={<div />}
          aui={{ color: 'surface-alt', paint: 'solid', shape: 'soft', states: { selected: { color: 'raised', paint: 'tonal' } } }}
        >
          <span>Design 2</span>
          <Tabs.CloseButton aria-label="Close Design 2" />
        </Tabs.Tab>
        <Tabs.AddButton name="file-circle-plus" aria-label="Add new design" />
      </Tabs.List>
    </Tabs>
  );
}
