import type { ContextProps } from '../../../../types';
import { Button, View } from '../../../../kit';

// ADC status bar left slot (src/adc/components/ReportFlow.tsx, ReportStatusButton): once a calculation report exists, an info solid xs Button with the file-lines icon opens the report preview.
// Left out: the generating state, the rest of the status bar and the preview dialog.
export default function AdcStatusBarScene(_: ContextProps) {
  return (
    <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', gap: '8' } }}>
      <Button aui={{ color: 'info', paint: 'solid', scale: 'xs', shape: 'soft' }}>
        <Button.Icon name="file-lines" />
        <span>Report is ready</span>
      </Button>
    </View>
  );
}
