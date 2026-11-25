import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with plain title',
  title: 'Form dialog',
  apps: ['agpd'],
  options: [
    { id: "agpd-quote", name: "Request a quote", apps: ["agpd"], source: {"agpd":"src/agpd/QuoteDialog.tsx"} },
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
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The wide quote window, min(840px, 100%) through the --aui-width variable.',
    },
    {
      id: 'title',
      name: 'Title bar',
      selector: '[class~="aui-dialog-title"]',
      description: 'The title bar on the card surface (not raised) reading REQUEST A QUOTE, with only the close X after the spacer.',
    },
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
    },
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'The scrolling body (overflow auto, minHeight 0) that holds the one wrapping form.',
    },
    {
      id: 'form',
      name: 'Form',
      description: 'The View rendered as a form: a wrapping flex row with gap 24 and top alignment, so the plate preview and the form column can sit side by side.',
    },
    {
      id: 'form-text',
      name: 'Form text',
      text: true,
      description: 'The p3 placeholder line "The form fields go here." in the Dialog frame.',
    },
    {
      id: 'form-column',
      name: 'Form column',
      description: 'The column in the scene with gap 12 and a 256px minimum width that stacks the question, the text fields and the SUBMIT row.',
    },
    {
      id: 'dealer-group',
      name: 'Dealer question',
      selector: '[class~="aui-radio-group"]',
      description: 'The row RadioGroup asking "Are you a Simpson Strong-Tie Dealer ?", with the label on a full-width first line, defaulting to No.',
    },
    {
      id: 'dealer-radio',
      name: 'Yes / No radios',
      selector: '[class~="aui-radio"]',
      description: 'The Yes and No radios: an outlined tonal surface when unselected and a solid primary when selected.',
    },
    {
      id: 'name-field',
      name: 'Name field',
      selector: '[class~="aui-field"] input',
      description: 'The Name text input, identified by a placeholder and aria-label instead of a visible label.',
    },
    {
      id: 'notes-field',
      name: 'Notes textarea',
      selector: '[class~="aui-field"] textarea',
      description: 'The four-row textarea for "Add project notes and other part requests".',
    },
    {
      id: 'submit',
      name: 'SUBMIT',
      description: 'The solid secondary soft SUBMIT button at scale "sm", end-aligned in its own row.',
    },
  ],
});
