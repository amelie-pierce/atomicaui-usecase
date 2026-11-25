import { Field } from '../../../../../kit';

export default function Example() {
  return (
    <Field aui={{ sx: { flexDirection: 'row', alignItems: 'center', width: 'fill' } }}>
      <Field.Label aui={{ sx: { flex: 'fill', flexBasis: 'half', minWidth: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>Product</Field.Label>
      <Field.Select
        defaultValue="a1"
        items={[
          { label: 'Anchor A1', value: 'a1' },
          { label: 'Anchor A2', value: 'a2' },
          { label: 'Rod B1', value: 'b1' },
        ]}
      >
        <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', sx: { flex: 'fill', flexBasis: 'half', minWidth: '0' } }}>
          <Field.SelectValue />
          <Field.SelectChevron />
        </Field.SelectTrigger>
        <Field.SelectPortal>
          <Field.SelectPositioner side="bottom" sideOffset={4}>
            <Field.SelectPopup matchTriggerWidth>
              <Field.SelectList>
                <Field.SelectGroup>
                  <Field.SelectGroupLabel>Anchors</Field.SelectGroupLabel>
                  <Field.SelectItem value="a1">
                    <Field.SelectItemText>Anchor A1</Field.SelectItemText>
                    <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                  </Field.SelectItem>
                  <Field.SelectItem value="a2">
                    <Field.SelectItemText>Anchor A2</Field.SelectItemText>
                    <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                  </Field.SelectItem>
                </Field.SelectGroup>
                <Field.SelectGroup>
                  <Field.SelectGroupLabel>Rods</Field.SelectGroupLabel>
                  <Field.SelectItem value="b1">
                    <Field.SelectItemText>Rod B1</Field.SelectItemText>
                    <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                  </Field.SelectItem>
                </Field.SelectGroup>
              </Field.SelectList>
            </Field.SelectPopup>
          </Field.SelectPositioner>
        </Field.SelectPortal>
      </Field.Select>
    </Field>
  );
}
