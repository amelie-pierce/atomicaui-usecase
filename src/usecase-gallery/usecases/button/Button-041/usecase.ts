import { defineUsecase } from '../../../define';

const CONTEXT_ANATOMY = [
  { id: 'dealer-row', name: 'Dealer contact row', selector: '[data-ug-part="dealer-row"]', description: 'The end-aligned row under the quote form that pairs the Need help? text with the phone button, with an 8px gap.' },
];

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Call dealer button',

  apps: ['agpd'],
options: [
    { id: "agpd-dealer-contact", contextAnatomy: CONTEXT_ANATOMY, name: "Dealer contact", apps: ["agpd"], source: {"agpd":"src/agpd/QuoteDialog.tsx"} ,
     contextAnatomyOverrides: [{"id":"dealer-row","lesson":{"explanation":"End-aligned row pairs Need help? with Call and 8px gap.","scope":"context"}}]},
  ],
  source: { agpd: 'src/agpd/QuoteDialog.tsx' },
  summary: 'A round filled accent IconButton calls the dealer.',
  where: 'The end of the dealer contact line under the AGPD quote form (Need help? and the phone number).',
  when: 'Use it for the one prominent icon-only action next to a line of text, here a link that starts a call. The quiet icon buttons are the ghost and tonal ones.',
  how: 'Set aui color "primary", paint "solid" and shape "pill" on an IconButton with render set to an anchor (href "tel:"), so the link is the control. '
    + 'Measured: 28px square, 999px radius, white glyph on orange rgb(255, 83, 8). The other icon buttons are transparent, outlined or tonal (Button-028 to Button-040), so a solid fill is its own variant.',
  anatomy: [
    { id: 'call', name: 'Call', selector: '[class~="aui-button"]', description: 'The round (pill) solid primary phone button; the AGPD scene renders it as a tel: link named Call dealer.' , lesson: {"explanation":"Pill-shaped primary phone button calls the dealer directly."}},
    { id: 'call-icon', name: 'Phone icon', selector: '[class~="aui-button"] > :is([class~="aui-contained-icon"], [class~="aui-icon"])', description: 'The phone glyph centred in the round button.' , lesson: {"explanation":"The phone glyph centred in the round button.","code":["IconButton"]}},
    { id: 'hint', name: 'Hint text', selector: '[class~="aui-type"]', text: true, description: 'AGPD only: the Need help? 1-800-000-0000 line beside the button.' },
  ],
});
