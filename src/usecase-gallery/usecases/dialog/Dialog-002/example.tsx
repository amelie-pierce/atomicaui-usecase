import { View } from '../../../kit';
import { MockLicenceText } from '../../../mock-data';

export default function Example() {
  return (
    <View aui={{ paint: 'text', scale: 'sm', sx: { flex: 'none', display: 'flex', flexDirection: 'column', gap: '12', minWidth: '0' } }}>
      <MockLicenceText />
    </View>
  );
}
