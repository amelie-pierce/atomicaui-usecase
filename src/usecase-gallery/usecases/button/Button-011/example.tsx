import { IconButton } from '../../../kit';

export default function Example() {
  return (
    <>
      <IconButton name="angle-left" aria-label="Collapse Input" aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'contained', shape: 'soft' }} />
      <IconButton name="arrows-to-line" aria-label="Collapse all" aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'contained', shape: 'soft' }} />
      <IconButton name="arrows-from-line" aria-label="Expand all" aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'contained', shape: 'soft' }} />
      <IconButton
        name="table-columns"
        aria-label="Configure columns"
        aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'contained', shape: 'soft' }}
      />
      <IconButton name="circle-question" aria-label="Help" aui={{ color: 'secondary', paint: 'text', scale: 'sm', profile: 'contained', shape: 'soft' }} />
    </>
  );
}
