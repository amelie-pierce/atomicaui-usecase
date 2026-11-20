import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Open report button',
  look: 'Info solid, extra small',
  apps: ['adc'],
  cases: [
    { id: 'adc-status-bar', name: 'Status bar', apps: ['adc'], source: { adc: 'src/adc/components/ReportFlow.tsx' } },
  ],
  source: { adc: 'src/adc/components/ReportFlow.tsx' },
  summary: 'A small blue solid Button with a file icon tells the user a report is ready and opens it.',
  where: 'The left slot of the ADC status bar, shown once a calculation report exists for the active design (it reads "Report is ready (outdated)" when the inputs changed since).',
  when: 'Use it for a status that is also an action: the state is the label and the click opens the result. A neutral action is Button-005; the accent solid is Button-016.',
  how: 'Set aui color "info", paint "solid", scale "xs" and shape "soft", with a Button.Icon "file-lines" and a span label. '
    + 'Measured: 26px high, 4px 6px padding, 14px medium text, white on blue rgb(59, 130, 246), 4px radius, so the colour and the size differ from Button-016 (accent, 28px, 16px). '
    + 'The generating state is the same Button as secondary text, disabled, and is left out with the rest of the bar.',
});
