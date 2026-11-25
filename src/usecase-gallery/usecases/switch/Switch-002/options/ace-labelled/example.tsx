import { Switch } from '../../../../../kit';

export default function Example() {
  return (
    <Switch defaultSelected aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }}>
      <Switch.Label>Group by model</Switch.Label>
    </Switch>
  );
}
