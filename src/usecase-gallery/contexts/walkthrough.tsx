import type { ContextProps } from '../types';
import { IconButton, Symbol, Type, View } from '../kit';
import { MockTourTarget } from '../mock-data';

// Walkthrough step 3 of 6 (Beam Properties), as F01Walkthrough renders it: a spotlight around the target and the 328px card
// beside it (to its right, level with its top). In the app both are position: fixed at measured rectangles; here they sit at
// fixed numbers in the stage frame. Step 1 has no Previous; the last step ends with End (Button-005).

export default function WalkthroughContext({ children }: ContextProps) {
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
        <Type role="p3">Choose beam materials and dimensions. Use Reset to default to restore Fc<Symbol script="subscript">perp</Symbol>.</Type>
        <View aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8' } }}>
          {children}
          <Type as="span" role="p3" color="muted" style={{ marginInlineStart: 'auto', whiteSpace: 'nowrap' }}>3 / 6</Type>
        </View>
      </View>
    </div>
  );
}
