import { Button, IconButton, Type, View } from '../../../../../kit';
import { MockTourTarget } from '../../../../../mock-data';

// ADM TutorialWalkthrough step 4 of 4 (3D Viewer). ADM and FD write the same last step: END in capitals at the bold weight with no icon after it (by CSS on the row's buttons in ADM; FD types the capitals), the counter pushed to the end by a CSS auto margin (inline here). The target is the gallery's shared stand-in.
export default function AdmLastStepScene() {
  return (
    <div className="ug-tour">
      <MockTourTarget target="file" />
      <View
        role="region"
        aria-label="Walkthrough"
        className="ug-tour__card"
        aui={{ scale: 'sm', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '16', paddingBlockStart: '16', paddingBlockEnd: '16', paddingInlineStart: '16', paddingInlineEnd: '16' } }}
        style={{ insetInlineStart: 164, insetBlockStart: 8, inlineSize: 328 }}
      >
        <IconButton
          name="xmark"
          aria-label="Close walkthrough"
          aui={{ scale: 'sm', paint: 'text', color: 'surface' }}
          style={{ position: 'absolute', insetBlockStart: 4, insetInlineEnd: 4 }}
        />
        <Type data-ug-part="step-title" as="h2" weight="medium" aui={{ sx: { paddingInlineEnd: '24' } }}>3D Viewer</Type>
        <Type role="p3">Use the 3D Viewer to explore the spatial layout.</Type>
        <View data-ug-part="step-nav" className="ug-tour__nav" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8' } }}>
          <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
            <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
            Previous
          </Button>
          <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>End</Button>
          <Type data-ug-part="step-counter" as="span" role="p3" color="muted" style={{ marginInlineStart: 'auto', whiteSpace: 'nowrap' }}>4 / 4</Type>
        </View>
      </View>
    </div>
  );
}
