import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Spinner',
  title: 'Large info spinner',
  apps: ['adc'],
    layers: [
        {"id":"spinner","partId":"spinner","title":"Spinner","explanation":"The extra-large info-coloured spinner, hidden from assistive technology (role \"presentation\", aria-hidden) because the message below carries the meaning.","keyIdea":"The extra-large info-coloured spinner, hidden from assistive technology (role \"presentation\", aria-hidden) because the message below carries the meaning.","selector":"[class~=\"aui-spinner\"]"},
        {"id":"ring","partId":"ring","title":"Ring","explanation":"The large animated ring above \"Your design report is being generated\" in the ADC report dialog.","keyIdea":"The large animated ring above \"Your design report is being generated\" in the ADC report dialog.","selector":"[class~=\"aui-spinner-ring\"]"},
      ],
options: [
    { id: "adc-report", name: "Generating report", contextAnatomy: [{ id: 'message', name: 'Status message', description: 'The semi-bold p1 text under the spinner, "Your design report is being generated. Please keep this window open.", which carries the status since the spinner is hidden from assistive tech.' }], source: {"adc":"src/adc/components/ReportFlow.tsx"} ,
      contextLayers: [
        {"id":"context-message","partId":"message","title":"Status message","explanation":"The semi-bold p1 text under the spinner, \"Your design report is being generated. Please keep this window open.\", which carries the status since the spinner is hidden from assistive tech.","keyIdea":"The semi-bold p1 text under the spinner, \"Your design report is being generated.","selector":"[data-ug-part=\"message\"]","scope":"context"},
      ],
    },
  ],
  source: { adc: 'src/adc/components/ReportFlow.tsx' },
  summary: 'An extra-large info spinner above a message, for a job that holds the user in a dialog.',
  where: 'The generating step of the ADC report flow (src/adc/components/ReportFlow.tsx).',
  when: 'Use it when a dialog waits on one job and the message says what to do. Use the small pane spinner (Spinner-001) inside a pane.',
  how: '`Spinner` with `aui={{ color: "info", scale: "xl" }}`; the message beside it carries the status, so the Spinner is `role="presentation"` and `aria-hidden`. The pair is a centred column View with gap 8.',
  anatomy: [
    {
      id: "spinner",
      name: "Spinner",
      selector: "[class~=\"aui-spinner\"]",
      description: "The extra-large info-coloured spinner, hidden from assistive technology (role \"presentation\", aria-hidden) because the message below carries the meaning.",
    },
    {
      id: "ring",
      name: "Ring",
      selector: "[class~=\"aui-spinner-ring\"]",
      description: "The large animated ring above \"Your design report is being generated\" in the ADC report dialog.",
    },
  ],
});
