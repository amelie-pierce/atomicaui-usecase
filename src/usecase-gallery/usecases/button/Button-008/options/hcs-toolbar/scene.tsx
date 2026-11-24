import type { ContextProps } from '../../../../../types';
import { Field, Type, View } from '../../../../../kit';

// HCS, PFD and HS Output pane cut to its toolbar (HCS App.tsx, PFD ResultsTable.tsx, HS ResultsTable.tsx): one wrapping row, the search field filling the line and Reset filters after
// it (only while a filter is active). The header actions, count, product filter, table and notes are left out.
export default function HcsToolbarScene({ children }: ContextProps) {
  return (
    <View
      as="section"
      aria-label="Output"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      style={{ inlineSize: 'min(100%, 560px)' }}
    >
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', alignItems: 'center', minHeight: '28', flex: 'none', paddingBlockStart: '0', paddingBlockEnd: '0' } }}>
        <Type as="h2" role="l3" weight="semi-bold">Output</Type>
      </View>
      <View aui={{ scale: 'sm', profile: 'default', paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', flexWrap: 'wrap' } }}>
        <Field style={{ minWidth: 112 }} aui={{ scale: 'sm', sx: { flex: 'fill' } }}>
          <Field.Control>
            <Field.Icon name="magnifying-glass" />
            <Field.Input aria-label="Search connector models" placeholder="Search connector models..." defaultValue="Model" />
            <Field.Button aria-label="Clear search">
              <Field.ButtonIcon name="xmark" />
            </Field.Button>
          </Field.Control>
        </Field>
        {children}
      </View>
    </View>
  );
}
