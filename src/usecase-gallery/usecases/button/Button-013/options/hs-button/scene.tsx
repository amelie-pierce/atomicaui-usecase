import type { ContextProps } from '../../../../../types';
import { Field, View } from '../../../../../kit';

// HS Output toolbar (ResultsTable.tsx, `actions` slot from OutputPane.tsx): one wrapping row of sm controls (gap 8) that starts with Add to Job List, then the search field fills the line.
// The app disables the button while no result is selected or a job is being edited. The count, Reset filters, Download CSV and the table are left out.
export default function HsButtonScene({ children }: ContextProps) {
  return (
    <View data-ug-part="toolbar" aui={{ scale: 'sm', profile: 'default', paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', flexWrap: 'wrap' } }} style={{ inlineSize: 'min(100%, 560px)' }}>
      {children}
      <Field data-ug-part="search" style={{ minWidth: 112 }} aui={{ scale: 'sm', sx: { flex: 'fill' } }}>
        <Field.Control>
          <Field.Icon name="magnifying-glass" />
          <Field.Input aria-label="Search results" placeholder="Search Table" />
        </Field.Control>
      </Field>
    </View>
  );
}
