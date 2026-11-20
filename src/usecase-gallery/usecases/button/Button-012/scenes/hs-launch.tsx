import type { ContextProps } from '../../../../types';
import { IconButton, Type, View } from '../../../../kit';
import { MockTourTarget } from '../../../../mock-data';

// HS TutorialWalkthrough (src/hs/Tutorials.tsx), the last step of a topic other than the General Tutorial (Joist step 11 of 11): the step has no heading, so the body keeps 24px at its end for the close X, and the launch Button sits between the body and the navigation row (not shown), start-aligned. The target is the gallery's shared stand-in.
export default function HsLaunchScene({ children }: ContextProps) {
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
        <View aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '16', paddingInlineEnd: '24' } }}>
          <Type as="p" role="p3">Find a solution. See the General tutorial for more information on the Results Table.</Type>
        </View>
        {children}
      </View>
    </div>
  );
}
