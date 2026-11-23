import { Button, IconButton, Type, View } from '../../../../kit';
import { MockTourTarget } from '../../../../mock-data';

// ACE TutorialWalkthrough step 2 of 4 (Split-Pane Slider). ACE, HS, RWS and AGPD write the same card: PREVIOUS and NEXT typed in capitals at the regular weight, the two buttons in their own View and the counter at the end of the row by justify between (HCS keeps mixed case and a CSS margin). The spotlight target is the gallery's shared stand-in, not the app's own page.
export default function AceStepNavScene() {
  return (
    <div className="ug-tour">
      <MockTourTarget target="beams" />
      <View
        role="region"
        aria-label="Walkthrough"
        className="ug-tour__card"
        aui={{ scale: 'sm', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '16', paddingBlockStart: '16', paddingBlockEnd: '16', paddingInlineStart: '16', paddingInlineEnd: '16' } }}
        style={{ insetInlineStart: 228, insetBlockStart: 8, inlineSize: 328 }}
      >
        <IconButton
          name="xmark"
          aria-label="Close walkthrough"
          aui={{ scale: 'sm', paint: 'text', color: 'surface' }}
          style={{ position: 'absolute', insetBlockStart: 4, insetInlineEnd: 4 }}
        />
        <Type as="h2" weight="medium" aui={{ sx: { paddingInlineEnd: '24' } }}>Split-Pane Slider</Type>
        <Type role="p3">Need more space on the input side or the output? Drag the slider.</Type>
        <View data-ug-part="step-nav" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'between', gap: '8' } }}>
          <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8' } }}>
            <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
              <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
              PREVIOUS
            </Button>
            <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
              NEXT
              <Button.Icon name="arrow-right" aui={{ scale: 'sm' }} />
            </Button>
          </View>
          <Type as="span" role="p3" color="muted" style={{ whiteSpace: 'nowrap' }}>2 / 4</Type>
        </View>
      </View>
    </div>
  );
}
