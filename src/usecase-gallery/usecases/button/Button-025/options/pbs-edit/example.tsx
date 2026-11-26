import { Button, View } from '../../../../../kit';

export default function Example() {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', flexDirection: 'column', gap: '8', alignItems: 'center' } }}>
      <Button aui={{ color: 'secondary', paint: 'tonal', scale: 'sm' }}>Edit</Button>
      <Button aui={{ color: 'secondary', paint: 'tonal', scale: 'sm' }}>Duplicate</Button>
    </View>
  );
}
