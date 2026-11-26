import { Checkbox, Fieldset } from '../../../../../kit';

export default function Example() {
  return (
    <Fieldset aui={{ paint: 'text', profile: 'no-padding' }} style={{ inlineSize: 'min(100%, 280px)' }}>
    <Fieldset.Legend>Paste over both sides of crack</Fieldset.Legend>
    <Checkbox defaultSelected aui={{
      scale: 'sm',
      states: {
        unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
        selected: { color: 'primary', paint: 'solid' },
      },
    }}>
      <Checkbox.Icon name="check" />
      <Checkbox.Label aui={{ scale: 'sm' }}>Yes</Checkbox.Label>
    </Checkbox>
    </Fieldset>
  );
}
