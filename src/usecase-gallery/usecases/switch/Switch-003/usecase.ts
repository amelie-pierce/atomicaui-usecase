import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Switch',
  title: 'Switch with bordered off state',
  apps: ['adm'],
  options: [
    { id: "adm-loads", name: "Load conditions", apps: ["adm"], source: {"adm":"src/features/design-inputs/components/LoadsSection/LoadConditionsFields.tsx"} },
  ],
  source: { adm: 'src/features/design-inputs/components/LoadsSection/LoadConditionsFields.tsx' },
  summary: 'A switch at the end of a form row, with the row\'s name at the start, turns the setting on or off; its off state is a white track with a thin border.',
  where: 'ADM load conditions in the input panel: three rows, each a Type l5 name with a help icon at the start and a Switch at the end.',
  when: 'Use it for an on and off choice that applies at once in the rows of a form, where the row text is the label and the switches line up at one edge, and the off switch needs a visible outline on a white panel. For a pale off track, see Switch-001.',
  how: 'A row View (flex, centred, space between, fill width, gap 8) holds the name in a Type role "l5" (bold, 12px) and a Switch with an aria-label equal to the name and no Switch.Label, with the shared toggle states (unselected tonal surface with an outlined border, selected primary solid). The gallery scene, measured in headless Chromium, shows off as an rgb(255,255,255) track with a 1px rgb(148,163,184) border and the thumb at x=5, on as the rgb(255,83,8) fill, 44 by 22px. The app was not run; its props and states are read from the app source. The name is a separate Type, so a click on it does not toggle. The scene shows the switch on and enabled and leaves out the help icon (the Field help trigger) and the server error line that one of the rows shows under it.',
  anatomy: [
    {
      id: "list",
      name: "List",
      token: "List",
      selector: "[class~=\"aui-list\"]",
      description: "The \"Load conditions\" list of the ADM input panel, three rows each with a name and a switch.",
      code: [
        "<List aria-label=\"Load conditions\">",
        "  …",
        "</List>",
      ].join("\n"),
    },
    {
      id: "row",
      name: "Row",
      token: "List.Item",
      selector: "[class~=\"aui-list-item\"]",
      description: "The Wind load row with the name at the start and its switch at the end.",
      code: [
        "<List.Item id=\"wind\">",
        "  <List.ItemText>Wind load</List.ItemText>",
        "  <List.ItemActions>…</List.ItemActions>",
        "</List.Item>",
      ].join("\n"),
    },
    {
      id: "row-text",
      name: "Row text",
      token: "List.ItemText",
      selector: "[class~=\"aui-list-item-text\"]",
      description: "The condition name \"Wind load\".",
      code: [
        "<List.ItemText>Wind load</List.ItemText>",
      ].join("\n"),
    },
    {
      id: "row-actions",
      name: "Row actions",
      token: "List.ItemActions",
      selector: "[class~=\"aui-list-item-actions\"]",
      description: "The slot at the end of the row that holds the switch.",
      code: [
        "<List.ItemActions>",
        "  …",
        "</List.ItemActions>",
      ].join("\n"),
    },
    {
      id: "switch",
      name: "Switch",
      token: "Switch",
      selector: "[class~=\"aui-switch\"]",
      description: "The off-by-default control whose unselected track is a surface-tonal white fill with a thin outlined border; selected it is solid primary.",
      code: [
        "<Switch aria-label=\"Wind load\" aui={{ states: { unselected: { color: 'surface', paint: 'tonal', sx: { borderColor: 'outlined' } }, selected: { color: 'primary', paint: 'solid' } } }} />",
      ].join("\n"),
    },
    {
      id: "thumb",
      name: "Thumb",
      selector: "[class~=\"aui-switch-thumb\"]",
      description: "The thumb at the start of the white track while the load is off.",
      code: [
        "<Switch aria-label=\"Wind load\" … />",
      ].join("\n"),
    },
  ],
});
