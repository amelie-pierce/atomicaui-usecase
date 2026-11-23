import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Field with description',
  title: 'Description under a field',
  apps: ['fd', 'rws', 'ace'],
  cases: [
    {
      id: 'fd-description',
      name: 'Field description',
      apps: ['fd', 'rws'],
      note: 'Label above; the description sits under the control.',
      source: { fd: 'src/components/ui.jsx', rws: 'src/rws/inputs.tsx' },
    },
    {
      id: 'ace-description',
      name: 'Field description',
      apps: ['ace'],
      note: 'Label beside; the description sits under the whole row.',
      source: { ace: 'src/features/estimator/ui/EstimatorInputPanel.tsx' },
    },
  ],
  source: { fd: 'src/components/ui.jsx', rws: 'src/rws/inputs.tsx', ace: 'src/features/estimator/ui/EstimatorInputPanel.tsx' },
  summary: 'A line of help text under a field that explains the chosen value.',
  where: 'The input panel of FD, RWS and ACE: the note under a select (a standard, an anchor type) that says what the chosen option means. The three apps place it only under a select, so the scenes keep the closed trigger as the host; the select itself is Select-001.',
  when: 'Use it for a short, always visible explanation of the field, one line or two, that the user reads before changing the value. Use the error message of Field-003 for a failed value and a tooltip or help popover (Button-032) for longer help.',
  how: 'Label above (FD, RWS): a Field at scale "sm" with a 3 gap holds a Field.Label, the control and a Field.Description under it; the description is 16px/20px text in the body colour, 3px below the control. FD states the 28px trigger height and the type; RWS leaves them to the scale and renders the same 28px trigger (padding 3px), a size difference only. Label beside (ACE): the Field is a column holding the label-and-control row (half each, as Field-001) and the Field.Description on its own line under the whole row, full width. The apps show the field enabled. The scenes leave out the open list, the help trigger and the other fields of the pane.',
  anatomy: [
    {
      id: "field",
      name: "Field",
      token: "Field",
      selector: "[class~=\"aui-field\"]",
      description: "Stacked wrapper holding the \"Anchor type\" label, the select and the help line; in ACE it becomes a column with a label-and-select row above the note.",
      code: [
        "<Field aui={{ scale: 'sm', sx: { gap: '3' } }}>",
        "  …",
        "</Field>",
      ].join("\n"),
    },
    {
      id: "label",
      name: "Label",
      token: "Field.Label",
      selector: "[class~=\"aui-field-label\"]",
      description: "The \"Anchor type\" label that names the select; ACE puts it beside the trigger, taking half the row.",
      code: [
        "<Field.Label aui={{ scale: 'sm' }}>Anchor type</Field.Label>",
      ].join("\n"),
    },
    {
      id: "trigger",
      name: "Select trigger",
      token: "Field.SelectTrigger",
      selector: "[class~=\"aui-select-trigger\"]",
      description: "The closed 28px select trigger, surface coloured, that shows the chosen Adhesive option; the open list is Select-001.",
      code: [
        "<Field.SelectTrigger aui={{ scale: 'sm', color: 'surface', paint: 'fixed', sx: { width: 'fill', height: '28', … } }}>",
        "  <Field.SelectValue />",
        "  <Field.SelectChevron />",
        "</Field.SelectTrigger>",
      ].join("\n"),
    },
    {
      id: "value",
      name: "Value",
      token: "Field.SelectValue",
      selector: "[class~=\"aui-select-value\"]",
      description: "The text of the chosen option, \"Adhesive\".",
      code: [
        "<Field.SelectValue />",
      ].join("\n"),
    },
    {
      id: "chevron",
      name: "Chevron",
      token: "Field.SelectChevron",
      selector: "[class~=\"aui-select-chevron\"]",
      description: "The disclosure chevron at the end of the trigger.",
      code: [
        "<Field.SelectChevron />",
      ].join("\n"),
    },
    {
      id: "description",
      name: "Description",
      token: "Field.Description",
      selector: "[class~=\"aui-field-description\"]",
      description: "The help line \"Adhesive anchors need a cure time.\" under the control, 16/20 body-colour text, always visible.",
      code: [
        "<Field.Description>Adhesive anchors need a cure time.</Field.Description>",
      ].join("\n"),
    },
  ],
});
