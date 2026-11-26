import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Tooltip on a button',
  title: 'Icon button tooltip',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws', 'adc'],
    layers: [
    {"id":"trigger","partId":"trigger","title":"Icon button trigger","explanation":"Settings gear opens the help label that repeats its accessible name.","keyIdea":"The gear trigger remains the action while its label is temporarily repeated as help.","selector":"[data-ug-part=\"trigger\"]"},
    {"id":"positioner","partId":"positioner","title":"Tooltip positioner","explanation":"The positioner places the tooltip below the trigger with a four-pixel offset.","keyIdea":"The positioner anchors the label below the control with a deliberate gap.","selector":"[class~=\"aui-tooltip-positioner\"]"},
    {"id":"popup","partId":"popup","title":"Tooltip surface","explanation":"The small popup provides a surface for the trigger label.","keyIdea":"The surface separates the label from page content so it reads as transient help.","selector":"[class~=\"aui-tooltip-popup\"]"},
    {"id":"label","partId":"label","title":"Settings label","explanation":"The word Settings repeats the button accessible name for sighted users.","keyIdea":"Repeating Settings gives sighted users the button name when its glyph is the only visible control.","selector":"[data-ug-part=\"tooltip-label\"]","code":["View"],"unchanged":true},
  ],
options: [
    { id: "hcs-icon-label", name: "Icon label", apps: ["hcs","ace","adm","pfd","pbs","hs","fd","agpd","rws","adc"], showContext: false, source: {"hcs":"src/components/HcsIconTooltip.tsx","ace":"src/shared/ui/PaneIconTooltip.tsx","adm":"src/shared/lib/tooltip/AdmIconTooltip.tsx","pfd":"src/pfd/useOutputNavigation.tsx","pbs":"src/App.tsx","hs":"src/hs/useOutputNavigation.tsx","fd":"src/components/ui.jsx","agpd":"src/agpd/panel.tsx","rws":"src/rws/panel.tsx","adc":"src/adc/Workspace.tsx"} ,
      contextLayers: [

      ],
    },
  ],
  source: {
    hcs: 'src/components/HcsIconTooltip.tsx',
    ace: 'src/shared/ui/PaneIconTooltip.tsx',
    adm: 'src/shared/lib/tooltip/AdmIconTooltip.tsx',
    pfd: 'src/pfd/useOutputNavigation.tsx',
    pbs: 'src/App.tsx',
    hs: 'src/hs/useOutputNavigation.tsx',
    fd: 'src/components/ui.jsx',
    agpd: 'src/agpd/panel.tsx',
    rws: 'src/rws/panel.tsx',
    adc: 'src/adc/Workspace.tsx',
  },
  summary: 'An icon-only button shows what it does in a small tooltip on hover or keyboard focus.',
  where: 'Every icon-only header, rail and navigation button of the ten apps (HCS HcsIconTooltip, ACE PaneIconTooltip, ADM AdmIconTooltip, ADC and FD IconTooltip, AGPD and RWS IconTip, PBS and PFD and HS output navigation). The panel standard of the apps is that an icon-only button carries an aria-label and a tooltip with the same words. Also the Reset View button floating over the 3D viewer (ADM ViewerChrome, FD Viewer).',
  when: 'Use it on every IconButton that has no visible text, including the Reset View button over the viewer. Do not use it for a control whose label is already visible, and not for long help text (a help icon, Button-032). For a radio option, see Tooltip-004.',
  how: 'Compose Tooltip.Provider, Tooltip, Tooltip.Trigger with the IconButton as render, Tooltip.Portal, Tooltip.Positioner and Tooltip.Popup. All ten apps show the same label tooltip on an icon-only button, so they are one group; no popup placement or surface was measured in a browser, so none splits it. From the tooltip source, HS requests the Base UI default side (top) and RWS requests bottom, each with a 4px offset; collision handling may flip the requested side when space is limited. Scenes show one enabled button and omit the surrounding pane header. Reset View (ADM, FD): the same IconButton trigger and label tooltip on a floating viewer control; ADM ViewerChrome and FD Viewer are read from the source and not run.',
  anatomy: [
    {
      id: 'trigger',
      name: 'Trigger',
      description: 'The icon-only gear IconButton labelled "Settings" (scale "sm", text paint, secondary colour) that the tooltip names; it is passed to the trigger through render.',
    },
    {
      id: 'positioner',
      name: 'Positioner',
      selector: '[class~="aui-tooltip-positioner"]',
      description: 'Places the label below the gear button with a 4px offset (side="bottom"); the HS app requests the default top side and RWS the bottom.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-tooltip-popup"]',
      description: 'The small tooltip surface that holds the one-word label.',
    },
    {
      id: 'label',
      name: 'Label',
      selector: '[class~="aui-tooltip-popup"]',
      text: true,
      description: 'The text "Settings", repeating the button\'s accessible name so sighted users can read it.',
    },
  ],
});
