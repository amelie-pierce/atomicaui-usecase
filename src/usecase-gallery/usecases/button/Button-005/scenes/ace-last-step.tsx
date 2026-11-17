import { Button, IconButton, Type, View } from '../../../../kit';
import { MockTourTarget } from '../../../../mock-data';

// ACE TutorialWalkthrough step 4 of 4 (Step #1). ACE, HS, RWS and AGPD write the same last step: END typed in capitals at the regular weight with no icon after it (HCS shows a check), the counter at the end of the row by justify between. The card sits left of the target as in the HCS scene; the target is the gallery's shared stand-in.
export default function AceLastStepScene() {
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
        <Type as="h2" weight="medium" aui={{ sx: { paddingInlineEnd: '24' } }}>Step #1</Type>
        <Type role="p3">Click here for application specific tutorials.</Type>
        <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'between', gap: '8' } }}>
          <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8' } }}>
            <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
              <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
              PREVIOUS
            </Button>
            <Button aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>END</Button>
          </View>
          <Type as="span" role="p3" color="muted" style={{ whiteSpace: 'nowrap' }}>4 / 4</Type>
        </View>
      </View>
    </div>
  );
}
