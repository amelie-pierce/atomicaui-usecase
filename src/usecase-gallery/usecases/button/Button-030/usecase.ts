import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Accent solid pill, 28px',
  apps: ['agpd'],
  cases: [{ id: 'agpd-dealer-contact', name: 'Dealer contact', apps: ['agpd'], source: { agpd: 'src/agpd/QuoteDialog.tsx' } }],
  source: { agpd: 'src/agpd/QuoteDialog.tsx' },
  summary: 'A round filled accent IconButton calls the dealer.',
  where: 'The end of the dealer contact line under the AGPD quote form (Need help? and the phone number).',
  when: 'Use it for the one prominent icon-only action next to a line of text, here a link that starts a call. The quiet icon buttons are the ghost and tonal ones.',
  how: 'Set aui color "primary", paint "solid" and shape "pill" on an IconButton with render set to an anchor (href "tel:"), so the link is the control. Measured: 28px square, 999px radius, white glyph on orange rgb(255, 83, 8). The other icon buttons are transparent, outlined or tonal (Button-024 to Button-029), so a solid fill is its own variant.',
});
