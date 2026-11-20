import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Tooltip on a button',
  title: 'Card button tooltip',
  apps: ['pfd', 'rws'],
  cases: [
    { id: 'pfd-card-note', name: 'Card hint', apps: ['pfd'], source: { pfd: 'src/pfd/SelectionCards.tsx' } },
    { id: 'rws-show-in-3d', name: 'Card hint', apps: ['rws'], source: { rws: 'src/rws/output.tsx' } },
  ],
  source: { pfd: 'src/pfd/SelectionCards.tsx', rws: 'src/rws/output.tsx' },
  summary: 'A selection card or an image button explains itself in a text tooltip.',
  where: 'The option cards of the PFD input (the Embedded Strap note) and the product image toggle of the RWS output ("Show in 3D").',
  when: 'Use it for a note that belongs to one card or image and is too long for its label. Do not hide required information in it.',
  how: 'PFD: the card (a View as button, min 96px, a ContainedImage over its label) is the Tooltip.Trigger and the Provider has delay 0, so the note opens at once; the popup is the kit default at the default side, 4px offset, up to 384px wide. RWS: the image Button (color surface, paint text, soft, 96 by 80, 4px padding, aria-pressed) is the trigger; its popup, the kit default, opens to the right (right, 4px offset) with "Show in 3D" and is not mounted once the product is shown. The scenes use a representative connection image and show one card or button with the tooltip open, leaving out the other cards and the output row.',
});
