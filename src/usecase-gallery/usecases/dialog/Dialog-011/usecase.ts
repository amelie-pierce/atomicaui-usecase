import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'form-column', name: 'Form column', description: 'The column with gap 12 and a 256px minimum width that stacks the dealer question, the text fields and the SUBMIT row.' },
  { id: 'dealer-group', name: 'Dealer question', selector: '[class~="aui-radio-group"]', description: 'The row RadioGroup asking "Are you a Simpson Strong-Tie Dealer ?", label on a full-width first line, defaulting to No.' },
  { id: 'dealer-radio', name: 'Yes and No radios', selector: '[class~="aui-radio"]', description: 'An outlined tonal Radio when unselected and a solid primary one when selected.' },
  { id: 'name-field', name: 'Name field', selector: '[class~="aui-field"] input', description: 'The Name text input, identified by a placeholder and aria-label instead of a visible label.' },
  { id: 'notes-field', name: 'Project notes field', selector: '[class~="aui-field"] textarea', description: 'The four-row textarea for "Add project notes and other part requests".' },
  { id: 'submit', name: 'Submit button', description: 'The solid secondary soft SUBMIT button at scale sm, end-aligned in its own row.' },
];

export default defineUsecase({
  uiType: 'Dialog with plain title',
  title: 'Form dialog',
  apps: ['agpd'],
options: [
    { id: "agpd-quote", name: "Request a quote", apps: ["agpd"], source: {"agpd":"src/agpd/QuoteDialog.tsx"}, contextAnatomy: CONTEXT_ANATOMY ,
     contextAnatomyOverrides: [{"id":"form-column","lesson":{"explanation":"256px-minimum column stacks dealer question, fields, and SUBMIT.","selector":"[data-ug-part=\"form-column\"]","scope":"context"}},{"id":"dealer-group","lesson":{"explanation":"Radio row asks whether the user is a dealer; No starts selected.","scope":"context"}},{"id":"dealer-radio","lesson":{"explanation":"Outlined tonal radio becomes solid primary when selected.","scope":"context"}},{"id":"name-field","lesson":{"explanation":"Name input uses placeholder and aria-label without a visible label.","code":["Field.Input"],"scope":"context"}},{"id":"notes-field","lesson":{"explanation":"The four-row textarea for \"Add project notes and other part requests\".","code":["Field.Textarea"],"scope":"context"}},{"id":"submit","lesson":{"explanation":"End-aligned soft SUBMIT uses a solid secondary style.","selector":"[data-ug-part=\"submit\"]","scope":"context"}}]},
  ],
  source: { agpd: 'src/agpd/QuoteDialog.tsx' },
  summary: 'A wide dialog whose Body is one form: a yes/no question, short text fields, a notes Textarea and a SUBMIT button at the end of the row.',
  where: 'The Request a quote dialog of AGPD, opened from the plate selection. No other app has a request form of this kind; the feedback form the other apps open is Dialog-009 (Send feedback). Real site source: src/agpd/QuoteDialog.tsx.',
  when: 'Use it to collect a short request with several inputs that the user submits once. Do not use it for a two-button confirm (AlertDialog-003) or for one field.',
  how: 'Dialog.Popup is 840px wide by the --aui-width variable (the stage width here), and Dialog.Title is color "surface" with the Spacer and the close X (Button-031), not the raised Title of the other dialogs. Dialog.Body takes sx overflow "auto" and minHeight "0" and holds a View as "form", a wrapping flex row with gap 24 and alignItems "start". The example is the Dialog frame itself (Popup, surface Title with the close X, scrolling Body with the form View). In context fills the form View with the form column, a View with a column flex, gap 12, flex "fill" and minWidth "256", holding a RadioGroup in a row with its label on a full-width first line and a Yes and a No Radio (an outlined tonal surface when unselected, a solid primary when selected), one Field.Input per text field with a placeholder instead of a label, a Field.Textarea of four rows and a solid secondary soft SUBMIT Button at scale "sm" aligned to the end. The scene leaves out the plate preview that sits beside the form column, the dealer-only Account Number field, the empty-quote and validation messages and the Quote in progress dialog.',
  anatomy: [
    {
      id: 'overlay',
      name: 'Overlay',
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim behind the AGPD quote request.',
     lesson: {"explanation":"Scrim dims the AGPD workspace behind the quote request."}},
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The wide quote window, min(840px, 100%) through the --aui-width variable.',
     lesson: {"explanation":"The wide quote window, min(840px, 100%) through the --aui-width variable."}},
    {
      id: 'title',
      name: 'Title bar',
      selector: '[class~="aui-dialog-title"]',
      description: 'The title bar on the card surface (not raised) reading REQUEST A QUOTE, with only the close X after the spacer.',
     lesson: {"explanation":"Flat card-surface title says REQUEST A QUOTE before Close."}},
    {
      id: 'title-text',
      name: 'Title text',
      selector: '[class~="aui-dialog-title"]',
      text: true,
      description: 'The uppercase words REQUEST A QUOTE in the title bar.',
    },
    {
      id: 'close',
      name: 'Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X labelled "Close REQUEST A QUOTE".',
     lesson: {"explanation":"The close X labelled \"Close REQUEST A QUOTE\"."}},
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'The scrolling body (overflow auto, minHeight 0) that holds the one wrapping form.',
     lesson: {"explanation":"Scrollable body contains the wrapping form fields and preview."}},
    {
      id: 'form',
      name: 'Form',
      description: 'The View rendered as a form: a wrapping flex row with gap 24 and top alignment, so the plate preview and the form column can sit side by side.',
     lesson: {"explanation":"Wrapping form pairs plate preview and fields with 24px gap.","selector":"[data-ug-part=\"form\"]"}},
    {
      id: 'form-text',
      name: 'Form text',
      text: true,
      description: 'The p3 placeholder line "The form fields go here." in the Dialog frame.',
    },
  ],
});
