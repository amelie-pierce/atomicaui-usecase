import { Button, IconButton, Type, View } from '../../../../../kit';
import { MockTourTarget } from '../../../../../mock-data';

// Walkthrough step 1 of 6 (Connection Type), the first step, so the footer has only Next. The close X sits in the card's top end
// corner, 4px in, by the app's local CSS (`.hcs-tour-close`; the kit sx has no inset axis), here an inline style; the title
// reserves 24px at its end so its text stops short of the X.

export default function HcsWalkthroughCloseScene() {
  return (
    <div className="ug-tour">
      <MockTourTarget target="connection" />
      <View
        role="region"
        aria-label="Walkthrough"
        className="ug-tour__card"
        aui={{ scale: 'sm', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '16', paddingBlockStart: '16', paddingBlockEnd: '16', paddingInlineStart: '16', paddingInlineEnd: '16' } }}
        style={{ insetInlineStart: 228, insetBlockStart: 8, inlineSize: 328 }}
      >
        <span style={{ position: 'absolute', insetBlockStart: 4, insetInlineEnd: 4 }}>
          <IconButton name="xmark" aria-label="Close walkthrough" aui={{ scale: 'sm', paint: 'text', color: 'surface' }} />
        </span>
        <Type data-ug-part="step-title" as="h2" weight="medium" aui={{ sx: { paddingInlineEnd: '24' } }}>Connection Type</Type>
        <Type role="p3">Choose how the beams connect.</Type>
        <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8' } }}>
          <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
            Next
            <Button.Icon name="arrow-right" aui={{ scale: 'sm' }} />
          </Button>
          <Type data-ug-part="step-counter" as="span" role="p3" color="muted" style={{ marginInlineStart: 'auto', whiteSpace: 'nowrap' }}>1 / 6</Type>
        </View>
      </View>
    </div>
  );
}
