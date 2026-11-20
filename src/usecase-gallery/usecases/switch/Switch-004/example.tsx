import { List, Switch } from '../../../kit';

export default function Example() {
  return (
    <List aria-label="Load conditions">
      <List.Item id="wind">
        <List.ItemText>Wind load</List.ItemText>
        <List.ItemActions>
          <Switch aria-label="Wind load" aui={{ states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }} />
        </List.ItemActions>
      </List.Item>
    </List>
  );
}
