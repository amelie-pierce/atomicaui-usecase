import type { ContextProps } from '../../../../types';
import { Button, IconButton, Type, View } from '../../../../kit';
import { MockTourTarget } from '../../../../mock-data';

// HCS F01Walkthrough step 3 of 6 (Beam Properties): a spotlight around the target and the 328px card beside it (to its right, level with its top). In the app both are position: fixed at measured rectangles; here they sit at fixed numbers in the stage frame. Labels are mixed case (Previous, Next) at the regular weight, and the counter is pushed to the end by a CSS auto margin (inline here).
export default function HcsStepNavScene({ children }: ContextProps) {
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
        <Type as="h2" weight="medium" aui={{ sx: { paddingInlineEnd: '24' } }}>Beam Properties</Type>
        <Type role="p3">Choose beam materials and dimensions.</Type>
        <View data-ug-part="step-nav" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8' } }}>
          {children}
          <Type as="span" role="p3" color="muted" style={{ marginInlineStart: 'auto', whiteSpace: 'nowrap' }}>3 / 6</Type>
        </View>
      </View>
    </div>
  );
}
