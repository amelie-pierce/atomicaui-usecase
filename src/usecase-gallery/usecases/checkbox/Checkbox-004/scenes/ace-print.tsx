import type { ContextProps } from '../../../../types';
import { View } from '../../../../kit';

// ACE print report (src/features/print/ui/CrackPrintReport.tsx): the product selections repeat the input as a Fieldset, a Legend over one read-only Checkbox (`readOnly`, so the box looks as in the input panel). Left out: the report page heading, the other selections and the results tables.
export default function AcePrintScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexDirection: 'column', gap: '8' } }} style={{ inlineSize: 'min(100%, 360px)' }}>
      {children}
    </View>
  );
}
