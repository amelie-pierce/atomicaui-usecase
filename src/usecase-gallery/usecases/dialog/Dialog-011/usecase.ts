import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with plain title',
  title: 'Form dialog',
  apps: ['agpd'],
  cases: [{ id: 'agpd-quote', name: 'Request a quote', apps: ['agpd'], source: { agpd: 'src/agpd/QuoteDialog.tsx' } }],
  source: { agpd: 'src/agpd/QuoteDialog.tsx' },
  summary: 'A wide dialog whose Body is one form: a yes/no question, short text fields, a notes Textarea and a SUBMIT button at the end of the row.',
  where: 'The Request a quote dialog of AGPD, opened from the plate selection. No other app has a request form of this kind; the feedback form the other apps open is Dialog-009 (Send feedback). Real site source: src/agpd/QuoteDialog.tsx.',
  when: 'Use it to collect a short request with several inputs that the user submits once. Do not use it for a two-button confirm (AlertDialog-003) or for one field.',
  how: 'Dialog.Popup is 840px wide by the --aui-width variable (the stage width here), and Dialog.Title is color "surface" with the Spacer and the close X (Button-031), not the raised Title of the other dialogs. Dialog.Body takes sx overflow "auto" and minHeight "0" and holds a View as "form", a wrapping flex row with gap 24 and alignItems "start". The example is the Dialog frame itself (Popup, surface Title with the close X, scrolling Body with the form View). In context fills the form View with the form column, a View with a column flex, gap 12, flex "fill" and minWidth "256", holding a RadioGroup in a row with its label on a full-width first line and a Yes and a No Radio (an outlined tonal surface when unselected, a solid primary when selected), one Field.Input per text field with a placeholder instead of a label, a Field.Textarea of four rows and a solid secondary soft SUBMIT Button at scale "sm" aligned to the end. The scene leaves out the plate preview that sits beside the form column, the dealer-only Account Number field, the empty-quote and validation messages and the Quote in progress dialog.',
  anatomy: [
    {
      id: 'overlay',
      name: 'Overlay',
      token: 'Dialog.Backdrop',
      selector: '[class~="aui-dialog-backdrop"]',
      description: 'The scrim behind the AGPD quote request.',
      code: `<Dialog open modal={false}>
  <Dialog.Portal container={host}>
    <Dialog.Backdrop />`,
    },
    {
      id: 'popup',
      name: 'Popup',
      token: 'Dialog.Popup',
      selector: '[class~="aui-dialog-popup"]',
      description: 'The wide quote window, min(840px, 100%) through the --aui-width variable.',
      code: `<Dialog.Popup initialFocus={false} style={{ '--aui-width': 'min(840px, 100%)' } as React.CSSProperties}>`,
    },
    {
      id: 'title',
      name: 'Title bar',
      token: 'Dialog.Title',
      selector: '[class~="aui-dialog-title"]',
      description: 'The title bar on the card surface (not raised) reading REQUEST A QUOTE, with only the close X after the spacer.',
      code: `<Dialog.Title aui={{ color: 'surface' }}>
  REQUEST A QUOTE
  <Dialog.Spacer />
  <Dialog.Close aria-label="Close REQUEST A QUOTE" />
</Dialog.Title>`,
    },
    {
      id: 'title-text',
      name: 'Title text',
      token: 'Dialog.Title',
      selector: '[class~="aui-dialog-title"]',
      text: true,
      description: 'The uppercase words REQUEST A QUOTE in the title bar.',
      code: `<Dialog.Title aui={{ color: 'surface' }}>
  REQUEST A QUOTE`,
    },
    {
      id: 'close',
      name: 'Close',
      token: 'Dialog.Close',
      selector: '[class~="aui-dialog-close"]',
      description: 'The close X labelled "Close REQUEST A QUOTE".',
      code: `<Dialog.Close aria-label="Close REQUEST A QUOTE" />`,
    },
    {
      id: 'body',
      name: 'Body',
      token: 'Dialog.Body',
      selector: '[class~="aui-dialog-body"]',
      description: 'The scrolling body (overflow auto, minHeight 0) that holds the one wrapping form.',
      code: `<Dialog.Body aui={{ sx: { overflow: 'auto', minHeight: '0' } }}>`,
    },
    {
      id: 'form',
      name: 'Form',
      token: 'View',
      description: 'The View rendered as a form: a wrapping flex row with gap 24 and top alignment, so the plate preview and the form column can sit side by side.',
      code: `<View data-ug-part="form" as="form" aui={{ paint: 'text', sx: { display: 'flex', flexWrap: 'wrap', gap: '24', alignItems: 'start' } }}>`,
    },
    {
      id: 'form-text',
      name: 'Form text',
      token: 'Type',
      text: true,
      description: 'The p3 placeholder line "The form fields go here." in the Dialog frame.',
      code: `<Type data-ug-part="form-text" as="p" role="p3">
  The form fields go here.
</Type>`,
    },
    {
      id: 'form-column',
      name: 'Form column',
      token: 'View',
      description: 'The column in the scene with gap 12 and a 256px minimum width that stacks the question, the text fields and the SUBMIT row.',
      code: `<View data-ug-part="form-column" aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '12', flex: 'fill', minWidth: '256' } }}>`,
    },
    {
      id: 'dealer-group',
      name: 'Dealer question',
      token: 'RadioGroup',
      selector: '[class~="aui-radio-group"]',
      description: 'The row RadioGroup asking "Are you a Simpson Strong-Tie Dealer ?", with the label on a full-width first line, defaulting to No.',
      code: `<RadioGroup defaultValue="no" direction="row" aui={{ scale: 'sm', profile: 'no-padding', sx: { flexWrap: 'wrap' } }}>
  <RadioGroup.Label aui={{ sx: { flexBasis: 'full' } }}>Are you a Simpson Strong-Tie Dealer ?</RadioGroup.Label>`,
    },
    {
      id: 'dealer-radio',
      name: 'Yes / No radios',
      token: 'Radio',
      selector: '[class~="aui-radio"]',
      description: 'The Yes and No radios: an outlined tonal surface when unselected and a solid primary when selected.',
      code: `<Radio value="yes" aui={SELECTION}>
  <Radio.Label>Yes</Radio.Label>
</Radio>`,
    },
    {
      id: 'name-field',
      name: 'Name field',
      token: 'Field.Input',
      selector: '[class~="aui-field"] input',
      description: 'The Name text input, identified by a placeholder and aria-label instead of a visible label.',
      code: `<Field.Input placeholder="Name" aria-label="Name" />`,
    },
    {
      id: 'notes-field',
      name: 'Notes textarea',
      token: 'Field.Textarea',
      selector: '[class~="aui-field"] textarea',
      description: 'The four-row textarea for "Add project notes and other part requests".',
      code: `<Field.Textarea rows={4} placeholder=" Add project notes and other part requests" aria-label="Add project notes and other part requests" />`,
    },
    {
      id: 'submit',
      name: 'SUBMIT',
      token: 'Button',
      description: 'The solid secondary soft SUBMIT button at scale "sm", end-aligned in its own row.',
      code: `<Button data-ug-part="submit" type="submit" aui={{ color: 'secondary', paint: 'solid', scale: 'sm', shape: 'soft' }}>
  SUBMIT
</Button>`,
    },
  ],
});
