import { Field } from '../../../../../kit';

export default function Example() {
  return (
    <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
      <Field.Label aui={{ scale: 'sm' }}>Anchor type</Field.Label>
      <Field.Select defaultValue="adhesive" items={[{ label: 'Adhesive', value: 'adhesive' }]}>
        <Field.SelectTrigger aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { width: 'fill', height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20' } }}>
          <Field.SelectValue />
          <Field.SelectChevron />
        </Field.SelectTrigger>
      </Field.Select>
      <Field.Description>Adhesive anchors need a cure time.</Field.Description>
    </Field>
  );
}
