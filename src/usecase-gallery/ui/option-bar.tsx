import { Radio, RadioGroup } from '../kit';
import type { UsecaseOption } from '../types';

/** The one selection control: choosing an option updates both previews and the complete document. */
export function OptionBar({ options, active, onChange }: { options: UsecaseOption[]; active?: UsecaseOption; onChange: (id: string) => void }) {
  return (
    <RadioGroup className="ug-options" aria-label="UI to view" direction="row" value={active?.id} onValueChange={(next) => onChange(String(next))}>
      {options.map(({ id, name }) => (
        <Radio key={id} value={id}>
          <Radio.Label>{name}</Radio.Label>
        </Radio>
      ))}
    </RadioGroup>
  );
}
