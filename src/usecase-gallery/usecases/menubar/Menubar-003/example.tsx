import { Menubar } from '../../../kit';

export default function Example() {
  return (
    <Menubar aria-label="Top bar">
      <Menubar.Button aria-label="Settings" aui={{ color: 'surface', paint: 'tonal' }}>
        <Menubar.Icon name="globe" />
        US
        <Menubar.Divider />
        EN
        <Menubar.Divider />
        IBC 2018
      </Menubar.Button>
    </Menubar>
  );
}
