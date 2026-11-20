import { Button, IconButton, View } from '../../../kit';

export default function Example() {
  return (
    <>
      <IconButton name="rotate-left" aria-label="Reset columns to default" aui={{ paint: 'text' }} />
      <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '8' } }}>
        <Button aui={{ paint: 'text' }}>Cancel</Button>
        <Button aui={{ scale: 'sm', color: 'secondary', paint: 'solid' }}>Save</Button>
      </View>
    </>
  );
}
