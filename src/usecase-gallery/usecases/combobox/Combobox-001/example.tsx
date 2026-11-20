import { Combobox, Field } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
      <Field.Label aui={{ scale: 'sm' }}>Country</Field.Label>
      <Combobox items={['Canada', 'Mexico', 'United States']} defaultValue="Canada" open modal={false}>
        <Combobox.InputGroup aui={{ scale: 'sm', sx: { width: 'fill' } }}>
          <Combobox.Input placeholder="Search" aria-label="Country" />
          <Combobox.Trigger>
            <Combobox.Icon name="chevron-down" />
          </Combobox.Trigger>
        </Combobox.InputGroup>
        <Combobox.Portal container={host}>
          <Combobox.Positioner side="bottom" sideOffset={4} className="ug-anchored">
            <Combobox.Popup matchTriggerWidth aui={{ scale: 'sm' }}>
              <Combobox.Empty>No result found</Combobox.Empty>
              <Combobox.List>
                {(option: string) => (
                  <Combobox.Item key={option} value={option}>
                    {option}
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                )}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox>
    </Field>
  );
}
