import { Button, IconButton, Type, View } from '../../../../../kit';
import { MockTourTarget } from '../../../../../mock-data';

// PBS Walkthrough step 12 of 12 (Product Notes). PBS and PFD write the same last step: END in capitals at the bold weight (by CSS on the row's buttons; PFD types the capitals) with the check after the label, as HCS, and the counter pushed to the end by a CSS auto margin (inline here). The target is the gallery's shared stand-in.
export default function PbsLastStepScene() {
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
        <Type data-ug-part="step-title" as="h2" weight="medium" aui={{ sx: { paddingInlineEnd: '24' } }}>Product Notes</Type>
        <Type role="p3">The notes column contains additional information.</Type>
        <View data-ug-part="step-nav" className="ug-tour__nav" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8' } }}>
          <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
            <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
            Previous
          </Button>
          <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
            End
            <Button.Icon name="check" aui={{ scale: 'sm' }} />
          </Button>
          <Type data-ug-part="step-counter" as="span" role="p3" color="muted" style={{ marginInlineStart: 'auto', whiteSpace: 'nowrap' }}>12 / 12</Type>
        </View>
      </View>
    </div>
  );
}
