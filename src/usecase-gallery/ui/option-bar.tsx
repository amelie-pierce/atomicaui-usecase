import { Radio, RadioGroup } from '../kit';
import type { UsecaseOption } from '../types';

/** The one selection control of a selection-based use case: choosing an option updates the previews and the Document and Code panels. */
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
