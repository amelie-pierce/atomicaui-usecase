import { Panels, Type } from '../../../../../kit';

// The Grid (engineering) layout of HcsSplitLayout.tsx cut to its two panes: the same panes and handle as the side-by-side split in a
// vertical Panels group, Input above and the results below, the handle a 6px horizontal line. The 200px minimum sizes and the Input
// panel's collapse props (Panels-003) are left out; the splitter is not draggable in the scene.
export default function Scene() {
  return (
    <div style={{ inlineSize: 'min(100%, 560px)', blockSize: 160 }}>
      <Panels orientation="vertical" className="ug-split" aui={{ scale: 'sm' }}>
        <Panels.Panel
          id="hcs-input"
          defaultSize="50%"
          minSize="40px"
          className="ug-split__panel"
          aui={{ profile: 'block-padding', scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
        >
          <Type as="h2" role="l3" weight="semi-bold">Input</Type>
        </Panels.Panel>
        <Panels.ResizeHandle aria-label="Resize Input and results panels" color="primary" width="6px" />
        <Panels.Panel
          id="hcs-results"
          minSize="40px"
          className="ug-split__panel"
          aui={{ profile: 'block-padding', scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
        >
          <Type as="h2" role="l3" weight="semi-bold">Output</Type>
        </Panels.Panel>
      </Panels>
    </div>
  );
}
