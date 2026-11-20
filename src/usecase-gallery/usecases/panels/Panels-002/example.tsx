import { Panels, Type } from '../../../kit';

export default function Example() {
  return (
    <Panels orientation="vertical" aui={{ scale: 'sm' }} style={{ inlineSize: 'min(100%, 560px)', blockSize: 160 }}>
      <Panels.Panel
        id="input"
        defaultSize="50%"
        minSize="40px"
        aui={{ profile: 'block-padding', scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      >
        <Type as="h2" role="l3" weight="semi-bold">Input</Type>
      </Panels.Panel>
      <Panels.ResizeHandle aria-label="Resize Input and Output panels" color="primary" width="6px" />
      <Panels.Panel
        id="output"
        minSize="40px"
        aui={{ profile: 'block-padding', scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      >
        <Type as="h2" role="l3" weight="semi-bold">Output</Type>
      </Panels.Panel>
    </Panels>
  );
}
