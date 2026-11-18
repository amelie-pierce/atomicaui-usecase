import type { ContextProps } from '../../../../types';
import { Field, View } from '../../../../kit';

// The Input pane field of HCS (src/components/HcsSelectbox.tsx, mounted in src/App.tsx), the same label-above field of HS, PBS, PFD, FD and RWS: a Field with the label stacked over a
// full-width 28px outlined trigger (surface, fixed) and a matchTriggerWidth popup placed 4px below. Built open and non-modal (container={host}, positioner ug-anchored).
// HS, PBS, PFD and FD write the same props; RWS leaves out the 28px height and 16/20 type and renders the same 28px trigger (padding 3px instead of 2px), so it joins this group.
// Left out: the help trigger and lock beside the label, the invalid state, the not applicable placeholder and the other fields of the pane; the app disables the field when it has one option, the scene shows it enabled.
export default function HcsFieldSelectScene({ host }: ContextProps) {
  return (
    <View aui={{ scale: 'sm', profile: 'no-padding', paint: 'text' }} style={{ minBlockSize: 'calc(var(--p-px-16) * 12)', inlineSize: 'min(100%, 280px)' }}>
      <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
        <Field.Label aui={{ scale: 'sm' }}>Download Duration</Field.Label>
        <Field.Select open
          defaultValue="snow"
          items={[
            { label: 'Dead (90)', value: 'dead' },
            { label: 'Snow (115)', value: 'snow' },
            { label: 'Roof (125)', value: 'roof' },
          ]}
        >
          <Field.SelectTrigger aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { width: 'fill', height: '28', minHeight: '28', paddingBlockStart: '3', paddingBlockEnd: '3', fontSize: '16', lineHeight: '20' } }}>
            <Field.SelectValue />
            <Field.SelectChevron />
          </Field.SelectTrigger>
          <Field.SelectPortal container={host}>
            <Field.SelectPositioner side="bottom" sideOffset={4} className="ug-anchored">
              <Field.SelectPopup matchTriggerWidth>
                <Field.SelectList>
                  <Field.SelectItem value="dead">
                    <Field.SelectItemText>Dead (90)</Field.SelectItemText>
                    <Field.SelectItemIndicator />
                  </Field.SelectItem>
                  <Field.SelectItem value="snow">
                    <Field.SelectItemText>Snow (115)</Field.SelectItemText>
                    <Field.SelectItemIndicator />
                  </Field.SelectItem>
                  <Field.SelectItem value="roof">
                    <Field.SelectItemText>Roof (125)</Field.SelectItemText>
                    <Field.SelectItemIndicator />
                  </Field.SelectItem>
                </Field.SelectList>
              </Field.SelectPopup>
            </Field.SelectPositioner>
          </Field.SelectPortal>
        </Field.Select>
      </Field>
    </View>
  );
}
