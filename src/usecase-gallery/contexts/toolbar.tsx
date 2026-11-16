import type { ContextProps } from '../types';
import { Button, Field, Type, View } from '../kit';
import { MockResultsBody } from '../mock-data';

// The Output body toolbar: one wrapping row above the table. The search field fills the row, Reset filters
// follows it (not at the end), then the muted count and the outlined product filter.
export default function ToolbarContext({ children }: ContextProps) {
  return (
    <View
      as="section"
      aria-label="Output"
      aui={{ scale: 'sm', color: 'surface-alt', paint: 'fixed', shape: 'soft', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }}
      style={{ inlineSize: 'min(100%, 560px)' }}
    >
      <Type as="h2" role="l3" weight="bold">Output</Type>
      <View aui={{ color: 'surface', paint: 'solid', shape: 'soft', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }}>
        <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8' } }}>
          <Field aui={{ scale: 'sm', sx: { flex: 'fill' } }} style={{ minInlineSize: 112 }}>
            <Field.Control>
              <Field.Icon name="magnifying-glass" />
              <Field.Input aria-label="Search results" placeholder="Search" defaultValue="Model" />
              <Field.Button aria-label="Clear search">
                <Field.ButtonIcon name="xmark" />
              </Field.Button>
            </Field.Control>
          </Field>
          {children}
          <Type as="span" role="p3" color="muted" style={{ flex: 'none' }}>Showing 3 of 12 results</Type>
          <Button aui={{ scale: 'sm', color: 'surface', paint: 'fixed' }}>
            All Products
            <Button.Icon name="angle-down" aui={{ scale: 'sm' }} />
          </Button>
        </View>
        <MockResultsBody />
      </View>
    </View>
  );
}
