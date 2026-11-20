import { Combobox, Field } from '../../../kit';
import { useStageHost } from '../../../hooks/use-stage-host';

export default function Example() {
  const host = useStageHost();
  return (
    <Field aui={{ scale: 'sm', sx: { gap: '3' } }}>
      <Field.Label aui={{ scale: 'sm' }}>Type</Field.Label>
      <Combobox items={['Glulam', 'Solid Sawn', 'Parallel Strand Lumber']} defaultValue="Glulam" open modal={false}>
        <Combobox.InputGroup aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { height: '28', minHeight: '28' } }}>
          <Combobox.Input aria-label="Type" aui={{ scale: 'sm' }} />
          <Combobox.Trigger aria-label="Open Type" aui={{ scale: 'sm' }}>
            <Combobox.Icon name="chevron-down" layer="monotone" aui={{ scale: 'sm' }} />
          </Combobox.Trigger>
        </Combobox.InputGroup>
        <Combobox.Portal container={host}>
          <Combobox.Positioner sideOffset={4} align="start" className="ug-anchored">
            <Combobox.Popup matchTriggerWidth maxHeight="20rem" aui={{ scale: 'sm' }}>
              <Combobox.List>
                {(option: string) => (
                  <Combobox.Item key={option} value={option} aui={{ scale: 'sm' }}>
                    {option}
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
