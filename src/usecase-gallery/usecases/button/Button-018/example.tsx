import { Button } from '../../../kit';

export default function Example() {
  return (
    <Button aui={{ color: 'info', paint: 'solid', scale: 'xs', shape: 'soft' }}>
      <Button.Icon name="file-lines" />
      <span>Report is ready</span>
    </Button>
  );
}
