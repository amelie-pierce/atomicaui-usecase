import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// The table search of PBS (src/ResultsSection.tsx), the same field of RWS (src/rws/output.tsx): the same Field with a Field.Icon (magnifying-glass) and a Field.Input, and no clear button.
// The icon-only field is also the search of the column list popovers (HS, HCS, FD) and of the release notes in the About dialogs (HCS, HS, PBS, PFD, RWS); those boxes render the same way.
// Left out: the Optimized switch and the other toolbar controls beside the field; the apps show the field enabled.
export default function PbsSearchScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { flex: 'fill' } }}>
        <Field.Control>
          <Field.Icon name="magnifying-glass" />
          <Field.Input aria-label="Search Table" placeholder="Search Table" />
        </Field.Control>
      </Field>
    </View>
  );
}
