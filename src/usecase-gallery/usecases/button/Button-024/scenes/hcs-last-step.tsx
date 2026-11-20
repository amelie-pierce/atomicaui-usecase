import { Button, IconButton, Type, View } from '../../../../kit';
import { MockTourTarget } from '../../../../mock-data';

// HCS F01Walkthrough step 6 of 6 (File). The File menu is at the right edge, so the card does not fit to its right and the app puts it to the left of the spotlight, level with its top. The last step has Previous and End; End carries a check after the label, mixed case, regular weight.
export default function HcsLastStepScene() {
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
        <Type as="h2" weight="medium" aui={{ sx: { paddingInlineEnd: '24' } }}>File</Type>
        <Type role="p3">Use File to open or save a project.</Type>
        <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8' } }}>
          <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
            <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
            Previous
          </Button>
          <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
            End
            <Button.Icon name="check" aui={{ scale: 'sm' }} />
          </Button>
          <Type as="span" role="p3" color="muted" style={{ marginInlineStart: 'auto', whiteSpace: 'nowrap' }}>6 / 6</Type>
        </View>
      </View>
    </div>
  );
}
