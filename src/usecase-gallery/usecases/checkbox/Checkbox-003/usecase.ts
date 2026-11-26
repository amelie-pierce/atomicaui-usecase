import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single checkbox',
  title: 'Show passed checks filter',
  apps: ['fd'],
    layers: [
        {"id":"checkbox","partId":"checkbox","title":"Checkbox","explanation":"Checked filter keeps passed validations listed in the table below.","keyIdea":"This filter determines whether passed validation rows stay in the results table.","selector":"[class~=\"aui-checkbox\"]"},
        {"id":"indicator","partId":"indicator","title":"Indicator","explanation":"Outlined tonal box marks the filter as off.","keyIdea":"The empty outline marks the unchecked state before the filter is enabled.","selector":"[class~=\"aui-checkbox-indicator\"]","code":["Checkbox"],"unchanged":true},
        {"id":"icon","partId":"icon","title":"Icon","explanation":"Check mark appears while Show passed validations is enabled.","keyIdea":"The tick confirms that passed validations will remain visible in the table.","selector":"[class~=\"aui-checkbox-indicator\"] [class~=\"aui-contained-icon\"]","code":["Checkbox"],"unchanged":true},
        {"id":"label","partId":"label","title":"Label","explanation":"Caption names the passed-validation filter in the FD details column.","keyIdea":"The caption states the filtering rule so users know what changing the box will hide.","selector":"[class~=\"aui-control-row\"] > [class~=\"aui-label\"]"},
      ],
options: [
    { id: "fd-filter", showContext: false, name: "Table filter", apps: ["fd"], source: {"fd":"src/components/RowExpansion.jsx"} ,
      contextLayers: [

      ],
    },
  ],
  source: {
    fd: 'src/components/RowExpansion.jsx',
  },
  summary: 'A Checkbox with its label that turns an on and off filter of the table right below it: Show passed validations above a results table.',
  where: 'FD only: the Why not details of an expanded result row (src/components/RowExpansion.jsx, SolutionDetails), the first child of the details column above the checks Table.',
  when: 'Use it for an on and off filter that applies to the table right below it. Do not use it for a column filter (Dropdown-001), an exclusive choice (a RadioGroup) or an on and off setting that applies at once (a Switch).',
  how: 'The Checkbox has aui scale "sm" (22px box, a 14px mark, radius 4px) and per-state appearance in states: unselected color "surface" paint "tonal" with sx borderColor "outlined" (a white box with a 1px border), selected color "primary" paint "solid" (no border). Checkbox.Icon name "check" is the mark and Checkbox.Label is the caption on its right with an 8px gap: 16px regular. The Checkbox is the first child of a View (profile "default", scale "sm", flex column, gap 8) above the checks table, and starts unselected (the white box with the 1px border), so the app lists only the failed and warning checks until the reader turns it on and the passed ones appear too. It is the same bare Checkbox as the input panel option with a different label. The scene leaves out the checks table below.',
  anatomy: [
    {
      id: "checkbox",
      name: "Checkbox",
      selector: "[class~=\"aui-checkbox\"]",
      description: "The filter toggle, checked by default so passed validations are listed in the checks table right below it; selected is solid primary.",
    },
    {
      id: "indicator",
      name: "Indicator",
      selector: "[class~=\"aui-checkbox-indicator\"]",
      description: "The box that shows whether passed rows are filtered in, outlined and surface-tonal while off.",
    },
    {
      id: "icon",
      name: "Icon",
      selector: "[class~=\"aui-checkbox-indicator\"] [class~=\"aui-contained-icon\"]",
      description: "The \"check\" mark inside the box while \"Show passed validations\" is on.",
    },
    {
      id: "label",
      name: "Label",
      selector: "[class~=\"aui-control-row\"] > [class~=\"aui-label\"]",
      description: "The caption \"Show passed validations\" that names the filter in the Why not details column of FD.",
    },
  ],
});
