import type { ContextProps } from '../../../../../types';
import { Button, Field, Type, View } from '../../../../../kit';

// The FD Output toolbar (Results.jsx): the same wrapping row, search field filling the line, but Reset filters is a secondary text Button (soft, sm, no icon scale)
// instead of the default gray solid one, and the app renders it while a search, a status filter or a custom sort is active. This scene writes its own Button, so the
// example is not spliced in. The header actions, the status select, the count, the table and the notes are left out.
export default function FdToolbarScene(_props: ContextProps) {
  return (
    <View
      as="section"
      data-ug-part="output-pane"
      aria-label="Output"
      aui={{ scale: 'sm', profile: 'block-padding', color: 'surface-alt', paint: 'fixed', shape: 'soft', sx: { display: 'flex', flexDirection: 'column', minHeight: '0' } }}
      style={{ inlineSize: 'min(100%, 560px)' }}
    >
      <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', alignItems: 'center', minHeight: '28', flex: 'none', paddingBlockStart: '0', paddingBlockEnd: '0' } }}>
        <Type data-ug-part="output-title" as="h2" role="l3" weight="semi-bold">Output</Type>
      </View>
      <View data-ug-part="toolbar" aui={{ scale: 'sm', profile: 'default', paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8', flexWrap: 'wrap' } }}>
        <Field data-ug-part="search" style={{ minWidth: 112 }} aui={{ scale: 'sm', sx: { flex: 'fill' } }}>
          <Field.Control>
            <Field.Icon name="magnifying-glass" />
            <Field.Input aria-label="Search solutions" placeholder="Search" defaultValue="Model" />
            <Field.Button aria-label="Clear search">
              <Field.ButtonIcon name="xmark" />
            </Field.Button>
          </Field.Control>
        </Field>
        <Button aui={{ color: 'secondary', paint: 'text', scale: 'sm', shape: 'soft' }}>
          <Button.Icon name="filter-circle-xmark" />
          Reset filters
        </Button>
      </View>
    </View>
  );
}
