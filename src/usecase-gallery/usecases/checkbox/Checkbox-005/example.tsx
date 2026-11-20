import { Checkbox, Fieldset } from '../../../kit';

export default function Example() {
  return (
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
  );
}
