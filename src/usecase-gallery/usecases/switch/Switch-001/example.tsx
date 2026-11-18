import { List, Switch } from '../../../kit';

export default function Example() {
  return (
    <List aria-label="Columns">
      <List.Item id="model">
        <List.ItemText>Model</List.ItemText>
        <List.ItemActions>
          <Switch aria-label="Show Model" defaultSelected aui={{ states: { selected: { color: 'primary', paint: 'solid' } } }} />
        </List.ItemActions>
      </List.Item>
    </List>
  );
}
