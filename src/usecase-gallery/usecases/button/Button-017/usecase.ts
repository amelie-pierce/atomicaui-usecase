import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Open report button',

  apps: ['adc'],
  options: [
    { id: "adc-status-bar", name: "Status bar", apps: ["adc"], source: {"adc":"src/adc/components/ReportFlow.tsx"} },
  ],
  source: { adc: 'src/adc/components/ReportFlow.tsx' },
  summary: 'A small blue solid Button with a file icon tells the user a report is ready and opens it.',
  where: 'The left slot of the ADC status bar, shown once a calculation report exists for the active design (it reads "Report is ready (outdated)" when the inputs changed since).',
  when: 'Use it for a status that is also an action: the state is the label and the click opens the result. A neutral action is Button-005; the accent solid is Button-015.',
  how: 'Set aui color "info", paint "solid", scale "xs" and shape "soft", with a Button.Icon "file-lines" and a span label. '
    + 'Measured: 26px high, 4px 6px padding, 14px medium text, white on blue rgb(59, 130, 246), 4px radius, so the colour and the size differ from Button-015 (accent, 28px, 16px). '
    + 'The generating state is the same Button as secondary text, disabled, and is left out with the rest of the bar.',
  anatomy: [
    {
      id: "container",
      name: "Container",
      token: "Button",
      description: "The report-ready Button in the ADC status bar: solid info (blue), extra small, soft shape.",
      selector: "[class~=\"aui-button\"]",
    },
    {
      id: "icon",
      name: "Icon",
      token: "Button.Icon",
      description: "The file glyph before the label that marks the item as a report.",
      selector: "[class~=\"aui-button\"] > :is([class~=\"aui-contained-icon\"], [class~=\"aui-icon\"])",
    },
    {
      id: "label",
      name: "Label",
      token: "Button",
      description: "The text \"Report is ready\" in a span, which reads \"Report is ready (outdated)\" when inputs changed.",
      selector: "[class~=\"aui-button\"] > span",
      text: true,
    },
  ],
});
