import { Panels, Type } from '../../../../kit';

// The default split of HcsSplitLayout.tsx cut to its two panes: a horizontal Panels group (scale sm) of two soft surface-alt panes, each reduced to its
// semi-bold title, and the Panels.ResizeHandle between them (primary colour, 6px). The app's 400px and 200px minimum sizes, the collapse
// props of the Input panel (Panels-003) and the pane contents are left out; the splitter is not draggable in the scene. Written the same
// in all ten apps; ADC has three panes and two handles.
export default function Scene() {
  return (
    <div style={{ inlineSize: 'min(100%, 560px)', blockSize: 160 }}>
      <Panels orientation="horizontal" className="ug-split" aui={{ scale: 'sm' }}>
        <Panels.Panel
          id="hcs-input"
          defaultSize="50%"
          minSize="120px"
          className="ug-split__panel"
          aui={{ profile: 'block-padding', scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
        >
          <Type as="h2" role="l3" weight="semi-bold">Input</Type>
        </Panels.Panel>
        <Panels.ResizeHandle aria-label="Resize Input and 3D Viewer panels" color="primary" width="6px" />
        <Panels.Panel
          id="hcs-viewer"
          minSize="120px"
          className="ug-split__panel"
          aui={{ profile: 'block-padding', scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
        >
          <Type as="h2" role="l3" weight="semi-bold">3D Viewer</Type>
        </Panels.Panel>
      </Panels>
    </div>
  );
}
