import type { ContextProps } from '../../../../types';
import { Spinner, Type, View } from '../../../../kit';

// ADC ReportFlow generating step (src/adc/components/ReportFlow.tsx): an xl info Spinner (decorative, hidden from assistive tech) above a semi-bold p1 message that carries the status, centred in a column with gap 8.
export default function AdcReportScene({ children }: ContextProps) {
  return (
    <View aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8' } }} style={{ inlineSize: 'min(100%, calc(var(--p-px-16) * 28))' }}>
      {children}
      <Type as="p" role="p1" weight="semi-bold">
        Your design report is being generated. Please keep this window open.
      </Type>
    </View>
  );
}
