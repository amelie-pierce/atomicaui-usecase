import type { ContextProps } from '../types';
import { Field, Type, View } from '../kit';
import { MockOutputActions, MockOutputNotes, MockOutputTable, MockProductFilter } from '../mock-data';

// The Output pane with its toolbar, as App.tsx composes it: one wrapping row above the table. The search field fills the line, Reset
// filters follows it (only while a filter is active), then the muted result count and the product filter (HcsProductFilter, an outlined
// Dropdown trigger). The header, the table and the notes are the same as in Button-007.
export default function ToolbarContext({ children }: ContextProps) {
  return (
    <View
      as="section"
      aria-label="Output"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      style={{ inlineSize: 'min(100%, 720px)' }}
    >
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', minHeight: '28', flex: 'none', paddingBlockStart: '0', paddingBlockEnd: '0' } }}>
        <Type as="h2" role="l3" weight="semi-bold" aui={{ sx: { display: 'flex', alignItems: 'center', minHeight: '28' } }}>Output</Type>
        <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', justifyContent: 'end', flexWrap: 'wrap', gap: '6', minHeight: '28' } }} style={{ marginInlineStart: 'auto' }}>
          <MockOutputActions />
        </View>
      </View>
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flex: 'fill', width: 'fill', minHeight: '0' } }}>
        <View aui={{ color: 'surface', shape: 'soft', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', width: 'fill', gap: '0', flex: 'fill', minHeight: '0', paddingBlockStart: '8', paddingBlockEnd: '8', paddingInlineStart: '8', paddingInlineEnd: '8' } }}>
          <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', flex: 'none', flexWrap: 'wrap', paddingBlockEnd: '6' } }}>
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
            <Type color="muted" aui={{ sx: { margin: '0', fontSize: '12', flex: 'none' } }}>
              <span role="status">Showing 2 of 3 results</span>
            </Type>
            <MockProductFilter label="Passed Products (2)" />
          </View>
          <MockOutputTable />
          <MockOutputNotes />
        </View>
      </View>
    </View>
  );
}
