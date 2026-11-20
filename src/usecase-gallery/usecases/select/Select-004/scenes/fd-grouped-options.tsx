import type { ContextProps } from '../../../../types';
import { Field, View } from '../../../../kit';

// The grouped configuration select of FD (src/components/SettingsPopover.jsx ConfigSelect with groups, after ADC DesignField.tsx): the label above a 28px outlined trigger that leads with the chosen row's icon,
// and a popup whose rows are split into Field.SelectGroups with a Field.SelectGroupLabel heading each. Built open and non-modal (container={host}, positioner ug-anchored).
// Left out: the Popover that holds the settings and the other settings fields.
export default function FdGroupedOptionsScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 14)', inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { width: 'fill', minWidth: '0' } }}>
        <Field.Label>Product</Field.Label>
        <Field.Select open
          defaultValue="a1"
          items={[
            { label: 'Anchor A1', value: 'a1' },
            { label: 'Anchor A2', value: 'a2' },
            { label: 'Rod B1', value: 'b1' },
          ]}
        >
          <Field.SelectTrigger aui={{ color: 'surface', paint: 'fixed', scale: 'sm', sx: { width: 'fill', height: '28' } }}>
            <Field.SelectIcon name="flag" aria-hidden />
            <Field.SelectValue />
            <Field.SelectChevron />
          </Field.SelectTrigger>
          <Field.SelectPortal container={host}>
            <Field.SelectPositioner side="bottom" sideOffset={4} className="ug-anchored">
              <Field.SelectPopup matchTriggerWidth>
                <Field.SelectList>
                  <Field.SelectGroup>
                    <Field.SelectGroupLabel>Anchors</Field.SelectGroupLabel>
                    <Field.SelectItem value="a1">
                      <Field.SelectIcon name="flag" aria-hidden />
                      <Field.SelectItemText>Anchor A1</Field.SelectItemText>
                      <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                    </Field.SelectItem>
                    <Field.SelectItem value="a2">
                      <Field.SelectIcon name="flag" aria-hidden />
                      <Field.SelectItemText>Anchor A2</Field.SelectItemText>
                      <Field.SelectItemIndicator>{null}</Field.SelectItemIndicator>
                    </Field.SelectItem>
                  </Field.SelectGroup>
                  <Field.SelectGroup>
                    <Field.SelectGroupLabel>Rods</Field.SelectGroupLabel>
                    <Field.SelectItem value="b1">
                      <Field.SelectIcon name="flag" aria-hidden />
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
    </View>
  );
}
