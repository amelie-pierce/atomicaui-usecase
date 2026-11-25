import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'dealer-row', name: 'Dealer contact row', selector: '[data-ug-part="dealer-row"]', description: 'The end-aligned row under the quote form that pairs the Need help? text with the phone button, with an 8px gap.' },
];

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Call dealer button',

  apps: ['agpd'],
    layers: [
        {"id":"call","partId":"call","title":"Call","explanation":"The round (pill) solid primary phone button; the AGPD scene renders it as a tel: link named Call dealer.","keyIdea":"The round (pill) solid primary phone button; the AGPD scene renders it as a tel: link named Call dealer.","selector":"[class~=\"aui-button\"]"},
        {"id":"call-icon","partId":"call-icon","title":"Phone icon","explanation":"The phone glyph centred in the round button.","keyIdea":"The phone glyph centred in the round button.","selector":"[class~=\"aui-button\"] > :is([class~=\"aui-contained-icon\"], [class~=\"aui-icon\"])"},
      ],
options: [
    { id: "agpd-dealer-contact", contextAnatomy: CONTEXT_ANATOMY, name: "Dealer contact", apps: ["agpd"], source: {"agpd":"src/agpd/QuoteDialog.tsx"} ,
      contextLayers: [
        {"id":"context-dealer-row","partId":"dealer-row","title":"Dealer contact row","explanation":"The end-aligned row under the quote form that pairs the Need help? text with the phone button, with an 8px gap.","keyIdea":"The end-aligned row under the quote form that pairs the Need help?","selector":"[data-ug-part=\"dealer-row\"]","scope":"context"},
      ],
    },
  ],
  source: { agpd: 'src/agpd/QuoteDialog.tsx' },
  summary: 'A round filled accent IconButton calls the dealer.',
  where: 'The end of the dealer contact line under the AGPD quote form (Need help? and the phone number).',
  when: 'Use it for the one prominent icon-only action next to a line of text, here a link that starts a call. The quiet icon buttons are the ghost and tonal ones.',
  how: 'Set aui color "primary", paint "solid" and shape "pill" on an IconButton with render set to an anchor (href "tel:"), so the link is the control. '
    + 'Measured: 28px square, 999px radius, white glyph on orange rgb(255, 83, 8). The other icon buttons are transparent, outlined or tonal (Button-028 to Button-040), so a solid fill is its own variant.',
  anatomy: [
    { id: 'call', name: 'Call', selector: '[class~="aui-button"]', description: 'The round (pill) solid primary phone button; the AGPD scene renders it as a tel: link named Call dealer.' },
    { id: 'call-icon', name: 'Phone icon', selector: '[class~="aui-button"] > :is([class~="aui-contained-icon"], [class~="aui-icon"])', description: 'The phone glyph centred in the round button.' },
    { id: 'hint', name: 'Hint text', selector: '[class~="aui-type"]', text: true, description: 'AGPD only: the Need help? 1-800-000-0000 line beside the button.' },
  ],
});
