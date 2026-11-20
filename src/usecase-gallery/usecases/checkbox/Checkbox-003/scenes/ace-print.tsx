import type { ContextProps } from '../../../../types';
import { Checkbox, Fieldset, View } from '../../../../kit';

// ACE print report (src/features/print/ui/CrackPrintReport.tsx): the product selections repeat the input as a Fieldset, a Legend over one read-only Checkbox (`readOnly`, so the box looks as in the input panel and cannot be toggled).
// PBS (src/PrintView.tsx) writes a column under a Type l4 title with a smaller gap and a `disabled` Checkbox (grey); the scene keeps it enabled. This scene writes its own control; the other selections and the results tables are left out.
export default function AcePrintScene(_props: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }} style={{ inlineSize: 'min(100%, 360px)' }}>
      <Fieldset aui={{ paint: 'text', profile: 'no-padding' }}>
        <Fieldset.Legend>Paste over both sides of crack</Fieldset.Legend>
        <Checkbox defaultSelected readOnly aui={{
          scale: 'sm',
          states: {
            unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
            selected: { color: 'primary', paint: 'solid' },
          },
        }}>
          <Checkbox.Label>Yes</Checkbox.Label>
        </Checkbox>
      </Fieldset>
    </View>
  );
}
