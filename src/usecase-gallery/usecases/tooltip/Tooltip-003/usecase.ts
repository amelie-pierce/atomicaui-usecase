import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Tooltip on a button',
  title: 'Card button tooltip',
  apps: ['pfd', 'rws'],
    layers: [
        {"id":"trigger","partId":"trigger","title":"Trigger","explanation":"The selection target: a 96 by 80 surface image Button labelled \"Show in 3D\" in the example and RWS, or the PFD \"Embedded Strap\" card (a View as button, at least 96px square).","keyIdea":"The selection target: a 96 by 80 surface image Button labelled \"Show in 3D\" in the example and RWS, or the PFD \"Embedded Strap\" card (a View as button, at least 96px square).","selector":"[data-ug-part=\"trigger\"]"},
        {"id":"thumbnail","partId":"thumbnail","title":"Thumbnail","explanation":"The connection image drawn inside the trigger as an aria-hidden svg (72px wide in the example, 64px in the PFD card).","keyIdea":"The connection image drawn inside the trigger as an aria-hidden svg (72px wide in the example, 64px in the PFD card).","selector":"[data-ug-part=\"trigger\"] > svg"},
        {"id":"positioner","partId":"positioner","title":"Positioner","explanation":"Opens the note to the right of the image button with a 4px offset (side=\"right\"); PFD uses the default side.","keyIdea":"Opens the note to the right of the image button with a 4px offset (side=\"right\"); PFD uses the default side.","selector":"[class~=\"aui-tooltip-positioner\"]"},
        {"id":"popup","partId":"popup","title":"Popup","explanation":"The text tooltip surface; in PFD it is allowed to grow to 384px for the longer note.","keyIdea":"The text tooltip surface; in PFD it is allowed to grow to 384px for the longer note.","selector":"[class~=\"aui-tooltip-popup\"]"},
      ],
options: [
    { id: "pfd-card-note", name: "Card hint", showContext: false, apps: ["pfd"], source: {"pfd":"src/pfd/SelectionCards.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "rws-show-in-3d", name: "Card hint — UI variant 2", showContext: false, apps: ["rws"], source: {"rws":"src/rws/output.tsx"} ,
      contextLayers: [

      ],
    },
  ],
  source: { pfd: 'src/pfd/SelectionCards.tsx', rws: 'src/rws/output.tsx' },
  summary: 'A selection card or an image button explains itself in a text tooltip.',
  where: 'The option cards of the PFD input (the Embedded Strap note) and the product image toggle of the RWS output ("Show in 3D").',
  when: 'Use it for a note that belongs to one card or image and is too long for its label. Do not hide required information in it.',
  how: 'PFD: the card (a View as button, min 96px, a ContainedImage over its label) is the Tooltip.Trigger and the Provider has delay 0, so the note opens at once; the popup is the kit default at the default side, 4px offset, up to 384px wide. RWS: the image Button (color surface, paint text, soft, 96 by 80, 4px padding, aria-pressed) is the trigger; its popup, the kit default, opens to the right (right, 4px offset) with "Show in 3D" and is not mounted once the product is shown. The scenes use a representative connection image and show one card or button with the tooltip open, leaving out the other cards and the output row.',
  anatomy: [
    {
      id: 'trigger',
      name: 'Trigger',
      description: 'The selection target: a 96 by 80 surface image Button labelled "Show in 3D" in the example and RWS, or the PFD "Embedded Strap" card (a View as button, at least 96px square).',
    },
    {
      id: 'thumbnail',
      name: 'Thumbnail',
      selector: '[data-ug-part="trigger"] > svg',
      description: 'The connection image drawn inside the trigger as an aria-hidden svg (72px wide in the example, 64px in the PFD card).',
    },
    {
      id: 'card-label',
      name: 'Card label',
      text: true,
      description: 'The PFD card caption "Embedded Strap" under the image.',
    },
    {
      id: 'positioner',
      name: 'Positioner',
      selector: '[class~="aui-tooltip-positioner"]',
      description: 'Opens the note to the right of the image button with a 4px offset (side="right"); PFD uses the default side.',
    },
    {
      id: 'popup',
      name: 'Popup',
      selector: '[class~="aui-tooltip-popup"]',
      description: 'The text tooltip surface; in PFD it is allowed to grow to 384px for the longer note.',
    },
    {
      id: 'note',
      name: 'Note',
      selector: '[class~="aui-tooltip-popup"]',
      text: true,
      description: 'The explanation text: "Show in 3D" in the example and RWS, "Use with a continuous strap along the plate." in PFD.',
    },
  ],
});
