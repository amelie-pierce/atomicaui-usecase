import { Menubar } from '../../../kit';

export default function Example() {
  return (
    <Menubar aria-label="Top bar">
      <Menubar.Button data-ug-part="button">About</Menubar.Button>
    </Menubar>
  );
}
