import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with plain title',
  title: 'Form dialog',
  apps: ['agpd'],
  cases: [{ id: 'agpd-quote', name: 'Request a quote', apps: ['agpd'], source: { agpd: 'src/agpd/QuoteDialog.tsx' } }],
  source: { agpd: 'src/agpd/QuoteDialog.tsx' },
  summary: 'A wide dialog whose Body is one form: a yes/no question, short text fields, a notes Textarea and a SUBMIT button at the end of the row.',
  where: 'The Request a quote dialog of AGPD, opened from the plate selection. No other app has a request form of this kind; the feedback form the other apps open is Dialog-006 (Send feedback). Real site source: src/agpd/QuoteDialog.tsx.',
  when: 'Use it to collect a short request with several inputs that the user submits once. Do not use it for a two-button confirm (AlertDialog-003) or for one field.',
  how: 'Dialog.Popup is 840px wide by the --aui-width variable (the stage width here), and Dialog.Title is color "surface" with the Spacer and the close X (Button-031), not the raised Title of the other dialogs. Dialog.Body takes sx overflow "auto" and minHeight "0" and holds a View as "form", a wrapping flex row with gap 24 and alignItems "start". The example is the Dialog frame itself (Popup, surface Title with the close X, scrolling Body with the form View). In context fills the form View with the form column, a View with a column flex, gap 12, flex "fill" and minWidth "256", holding a RadioGroup in a row with its label on a full-width first line and a Yes and a No Radio (an outlined tonal surface when unselected, a solid primary when selected), one Field.Input per text field with a placeholder instead of a label, a Field.Textarea of four rows and a solid secondary soft SUBMIT Button at scale "sm" aligned to the end. The scene leaves out the plate preview that sits beside the form column, the dealer-only Account Number field, the empty-quote and validation messages and the Quote in progress dialog.',
});
