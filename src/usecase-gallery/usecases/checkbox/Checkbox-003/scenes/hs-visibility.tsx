import type { ContextProps } from '../../../../types';
import { View } from '../../../../kit';

// HS, PBS, AGPD and RWS viewer (HS src/hs/ViewerPane.tsx, PBS src/Viewer.tsx, AGPD src/agpd/Viewer.tsx, RWS src/rws/Viewer.tsx): the visibility toggles are one wrapped row (gap 8) under the 3D view, after the Reset View button. PBS, AGPD and RWS lead the checkboxes with an "Object Visibility" title (Type l4 semi-bold, 14px); HS has no title. Left out: the Reset View button, the Perspective and Orthographic radios (PBS), the 3D canvas and, in RWS, the Connection toggle that the app disables until a model is selected.
export default function HsVisibilityScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'default' }} style={{ inlineSize: 'min(100%, 420px)' }}>
      {children}
    </View>
  );
}
