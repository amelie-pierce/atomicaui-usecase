import type { ContextProps } from '../../../../types';
import { Field, View } from '../../../../kit';

// The table search of HS (src/hs/ResultsTable.tsx), the same field of HCS (src/App.tsx), PFD (src/pfd/ResultsTable.tsx) and FD (src/components/Results.jsx): a Field with one outlined control holding a Field.Icon (magnifying-glass), a Field.Input and a Field.Button with a Field.ButtonIcon (xmark) that clears the search.
// The kit shows the clear button only while the box has text (Field.Control stamps data-aui-filled; an empty box hides the button with visibility), so the scene starts with a mock search term and the button is visible; empty, this box looks like the second group. The apps set minWidth 112px and flex fill on the Field to share the toolbar row; the scene takes the host width instead.
// Left out: the Reset filters button and the other toolbar controls beside the field (Button-007 and the table use cases); the apps show the field enabled.
export default function HsSearchScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { flex: 'fill' } }}>
        <Field.Control>
          <Field.Icon name="magnifying-glass" />
          <Field.Input aria-label="Search Table" placeholder="Search Table" defaultValue="Plate" />
          <Field.Button aria-label="Clear search">
            <Field.ButtonIcon name="xmark" />
          </Field.Button>
        </Field.Control>
      </Field>
    </View>
  );
}
