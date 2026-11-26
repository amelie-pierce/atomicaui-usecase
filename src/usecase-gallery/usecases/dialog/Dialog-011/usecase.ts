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
    layers: [
        {"id":"overlay","partId":"overlay","title":"Overlay","explanation":"Scrim dims the AGPD workspace behind the quote request.","keyIdea":"The scrim isolates the quote request while the product page remains behind it.","selector":"[class~=\"aui-dialog-backdrop\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"The wide quote window, min(840px, 100%) through the --aui-width variable.","keyIdea":"The wide popup accommodates the plate preview beside the quote form.","selector":"[class~=\"aui-dialog-popup\"]"},
        {"id":"title","partId":"title","title":"Title bar","explanation":"Flat card-surface title says REQUEST A QUOTE before Close.","keyIdea":"The request heading names the task on the card surface.","selector":"[class~=\"aui-dialog-title\"]"},
        {"id":"close","partId":"close","title":"Close","explanation":"The close X labelled \"Close REQUEST A QUOTE\".","keyIdea":"The close control exits the quote request.","selector":"[class~=\"aui-dialog-close\"]"},
        {"id":"body","partId":"body","title":"Body","explanation":"Scrollable body contains the wrapping form fields and preview.","keyIdea":"The scrolling body keeps the complete quote form within the large dialog.","selector":"[class~=\"aui-dialog-body\"]"},
        {"id":"form","partId":"form","title":"Form","explanation":"Wrapping form pairs plate preview and fields with 24px gap.","keyIdea":"A wrapping form row lets the plate preview and questions share the wide body.","selector":"[data-ug-part=\"form\"]"},
      ],
options: [
    { id: "agpd-quote", name: "Request a quote", apps: ["agpd"], source: {"agpd":"src/agpd/QuoteDialog.tsx"}, contextAnatomy: CONTEXT_ANATOMY ,
      contextLayers: [
        {"id":"context-form-column","partId":"form-column","title":"Form column","explanation":"256px-minimum column stacks dealer question, fields, and SUBMIT.","keyIdea":"The minimum-width column keeps dealer details and contact fields readable.","selector":"[data-ug-part=\"form-column\"]","scope":"context"},
        {"id":"context-dealer-group","partId":"dealer-group","title":"Dealer question","explanation":"Radio row asks whether the user is a dealer; No starts selected.","keyIdea":"The dealer question gathers eligibility context before quote submission.","selector":"[class~=\"aui-radio-group\"]","scope":"context"},
        {"id":"context-dealer-radio","partId":"dealer-radio","title":"Yes and No radios","explanation":"Outlined tonal radio becomes solid primary when selected.","keyIdea":"The selected radio makes the dealer answer clear at a glance.","selector":"[class~=\"aui-radio\"]","scope":"context"},
        {"id":"context-name-field","partId":"name-field","title":"Name field","explanation":"Name input uses placeholder and aria-label without a visible label.","keyIdea":"The name input captures who is requesting the quote.","selector":"[class~=\"aui-field\"] input","scope":"context"},
        {"id":"context-notes-field","partId":"notes-field","title":"Project notes field","explanation":"The four-row textarea for \"Add project notes and other part requests\".","keyIdea":"Project notes give users space to describe additional part requests.","selector":"[class~=\"aui-field\"] textarea","scope":"context"},
        {"id":"context-submit","partId":"submit","title":"Submit button","explanation":"End-aligned soft SUBMIT uses a solid secondary style.","keyIdea":"The end-aligned submit action closes the request form sequence.","selector":"[data-ug-part=\"submit\"]","scope":"context"},
      ],
    },
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
  ],
});
