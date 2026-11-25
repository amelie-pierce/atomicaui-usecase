import type { ContextProps } from '../../../../../types';
import { Field, Type, View } from '../../../../../kit';

// The Output toolbar of PFD (ResultsTable.tsx), HS (ResultsTable.tsx) and RWS (output.tsx ResultToolbar): one wrapping row of sm controls (gap 8), the search field filling
// the line, the muted count, then Download CSV last. HS and RWS render it disabled while the table has no rows (the native disabled attribute). PFD and HS also hold Reset filters
// before the count, RWS a Show Optimized Models switch; both, and the table, are left out.
export default function PfdToolbarScene({ children }: ContextProps) {
  return (
    <View data-ug-part="toolbar" aui={{ scale: 'sm', profile: 'default', paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', flexWrap: 'wrap' } }} style={{ inlineSize: 'min(100%, 560px)' }}>
      <Field data-ug-part="search" style={{ minWidth: 112 }} aui={{ scale: 'sm', sx: { flex: 'fill' } }}>
        <Field.Control>
          <Field.Icon name="magnifying-glass" />
          <Field.Input aria-label="Search Table" placeholder="Search Table" />
        </Field.Control>
      </Field>
      <Type color="muted" aui={{ sx: { margin: '0', fontSize: '12', flex: 'none' } }}>
        <View data-ug-part="count" as="span" role="status" aui={{ paint: 'text', sx: { display: 'inline' } }}>Showing 1 entry</View>
      </Type>
      {children}
    </View>
  );
}
