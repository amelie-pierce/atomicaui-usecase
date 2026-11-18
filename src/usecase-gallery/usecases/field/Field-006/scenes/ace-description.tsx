import type { ContextProps } from '../../../../types';
import { Field, View } from '../../../../kit';

// The field note of ACE (src/features/estimator/ui/EstimatorInputPanel.tsx): the label-beside row of Field-001 (label and a closed Field.Select trigger sharing the row) with the Field.Description on its own line under the whole row, full width.
// Left out: the open list, the option check and the other fields of the panel; the app shows the field enabled.
export default function AceDescriptionScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { display: 'flex', flexDirection: 'column', width: 'fill', gap: '3' } }}>
        <View aui={{ sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'fill' } }}>
          <Field.Label aui={{ scale: 'sm', sx: { flex: 'fill', minWidth: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>Anchor type</Field.Label>
          <Field.Select defaultValue="adhesive" items={[{ label: 'Adhesive', value: 'adhesive' }]}>
            <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', scale: 'sm', sx: { flex: 'fill', minWidth: '0', height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20', textAlign: 'start' } }}>
              <Field.SelectValue />
              <Field.SelectChevron />
            </Field.SelectTrigger>
          </Field.Select>
        </View>
        <Field.Description>Adhesive anchors need a cure time.</Field.Description>
      </Field>
    </View>
  );
}
