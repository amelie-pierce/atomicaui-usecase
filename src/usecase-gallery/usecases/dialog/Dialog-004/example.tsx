import { Button, Field, Radio, RadioGroup, View } from '../../../kit';

const SELECTION = {
  scale: 'sm',
  states: {
    unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } },
    selected: { color: 'primary', paint: 'solid' },
  },
} as const;

export default function Example() {
  return (
    <View aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '12', flex: 'fill', minWidth: '256' } }}>
      <RadioGroup defaultValue="no" direction="row" aui={{ scale: 'sm', profile: 'no-padding', sx: { flexWrap: 'wrap' } }}>
        <RadioGroup.Label aui={{ sx: { flexBasis: 'full' } }}>Are you a Simpson Strong-Tie Dealer ?</RadioGroup.Label>
        <Radio value="yes" aui={SELECTION}>
          <Radio.Label>Yes</Radio.Label>
        </Radio>
        <Radio value="no" aui={SELECTION}>
          <Radio.Label>No</Radio.Label>
        </Radio>
      </RadioGroup>
      <Field aui={{ scale: 'sm' }}>
        <Field.Control>
          <Field.Input placeholder="Name" aria-label="Name" />
        </Field.Control>
      </Field>
      <Field aui={{ scale: 'sm' }}>
        <Field.Textarea rows={4} placeholder=" Add project notes and other part requests" aria-label="Add project notes and other part requests" />
      </Field>
      <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8', justifyContent: 'end' } }}>
        <Button type="submit" aui={{ color: 'secondary', paint: 'solid', scale: 'sm', shape: 'soft' }}>
          SUBMIT
        </Button>
      </View>
    </View>
  );
}
