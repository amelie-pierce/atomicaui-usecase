import { Select } from '../kit';
import type { UsecaseOption } from '../types';

/** The one selection control, a select on the right side of the preview header: choosing an option updates the preview and the complete document. */
export function OptionBar({ options, active, onChange }: { options: UsecaseOption[]; active: UsecaseOption; onChange: (id: string) => void }) {
  return (
    <div className="ug-options">
      <Select items={options.map(({ id, name }) => ({ label: name, value: id }))} value={active.id} onValueChange={(next) => next && onChange(String(next))}>
        <Select.Trigger aria-label="UI to view" aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { width: 'fill' } }}>
          <Select.Value />
          <Select.Chevron />
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner side="bottom" sideOffset={4}>
            <Select.Popup matchTriggerWidth>
              <Select.List>
                {options.map(({ id, name }) => (
                  <Select.Item key={id} value={id}>
                    <Select.ItemText>{name}</Select.ItemText>
                    <Select.ItemIndicator>{null}</Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select>
    </div>
  );
}
