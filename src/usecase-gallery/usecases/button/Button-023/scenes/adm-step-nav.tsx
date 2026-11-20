import { Button, IconButton, Type, View } from '../../../../kit';
import { MockTourTarget } from '../../../../mock-data';

// ADM TutorialWalkthrough step 2 of 4 (Multi Design). ADM, PBS, PFD and FD write the same card: PREVIOUS and NEXT in capitals at the bold weight (by CSS on the row's buttons, `.adm-tour-navigation > button`; FD types the capitals), the counter pushed to the end by a CSS auto margin (inline here). The spotlight target is the gallery's shared stand-in, not the app's own page.
export default function AdmStepNavScene() {
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
        <Type as="h2" weight="medium" aui={{ sx: { paddingInlineEnd: '24' } }}>Multi Design</Type>
        <Type role="p3">Explore which products meet design requirements.</Type>
        <View className="ug-tour__nav" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8' } }}>
          <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
            <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
            Previous
          </Button>
          <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
            Next
            <Button.Icon name="arrow-right" aui={{ scale: 'sm' }} />
          </Button>
          <Type as="span" role="p3" color="muted" style={{ marginInlineStart: 'auto', whiteSpace: 'nowrap' }}>2 / 4</Type>
        </View>
      </View>
    </div>
  );
}
