import { Button, IconButton, View } from '../../../kit';

export default function Example() {
  return (
    <>
      <IconButton data-ug-part="reset" name="rotate-left" aria-label="Reset columns to default" aui={{ paint: 'text' }} />
      <View data-ug-part="actions" aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '8' } }}>
        <Button data-ug-part="cancel" aui={{ paint: 'text' }}>Cancel</Button>
        <Button data-ug-part="save" aui={{ scale: 'sm', color: 'secondary', paint: 'solid' }}>Save</Button>
      </View>
    </>
  );
}
