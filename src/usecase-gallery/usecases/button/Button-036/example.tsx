import { Button, View } from '../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', alignItems: 'start' } }}>
      <Button aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'no-padding' }}>Edit</Button>
      <Button aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'no-padding' }}>Delete</Button>
    </View>
  );
}
