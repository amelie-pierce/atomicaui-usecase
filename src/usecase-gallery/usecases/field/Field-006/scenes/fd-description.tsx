import type { ContextProps } from '../../../../types';
import { Field, View } from '../../../../kit';

// The field note of FD (src/components/ui.jsx SelectInput), the same note of RWS (src/rws/inputs.tsx SelectField): a label-above Field whose control is a Field.Select trigger (the closed trigger only; the select itself is Select-001) with a Field.Description under it, 3px below the trigger, in the body colour at 16px/20px.
// RWS leaves the trigger height and type to the scale and renders the same 28px trigger (padding 3px instead of 2px), a size difference only.
// Left out: the open list, the help trigger beside the label and the other fields of the pane; the apps show the field enabled.
export default function FdDescriptionScene(_: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ inlineSize: 'min(100%, 280px)' }}>
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
    </View>
  );
}
