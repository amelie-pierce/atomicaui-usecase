import { Button, View } from '../../../../../kit';

export default function Example() {
  return (
    <View className="ug-tour__nav" aui={{ scale: 'sm', paint: 'text', sx: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8' } }}>
      <Button style={{ fontWeight: 700 }} aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
        <Button.Icon name="arrow-left" aui={{ scale: 'sm' }} />
        PREVIOUS
      </Button>
      <Button style={{ fontWeight: 700 }} aui={{ scale: 'sm', paint: 'text', color: 'secondary' }}>
        NEXT
        <Button.Icon name="arrow-right" aui={{ scale: 'sm' }} />
      </Button>
    </View>
  );
}
