import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Show locked field option button',
  look: 'Accent text, extra small',
  apps: ['agpd'],
  cases: [
    { id: 'agpd-lock-hint', name: 'Lock hint', apps: ['agpd'], source: { agpd: 'src/agpd/inputs.tsx' } },
  ],
  source: { agpd: 'src/agpd/inputs.tsx' },
  summary: 'A small primary text Button in a lock popover reveals the option that controls a locked field.',
  where: 'The popover of the lock icon after a field label in the AGPD input pane (LockHint). It exists only in AGPD; the lock trigger is a square label-row Button like Button-033 and the popover has no close X.',
  when: 'Use it when a field is locked by another setting and the user needs a way to reach that setting: the text names the controlling option and this Button jumps to it.',
  how: 'Set aui paint "text", color "primary" and scale "xs"; it is the only action in the popup, at the start under the explanatory line. '
    + 'In context the lock trigger (profile "square", secondary text) opens a 288px View column (surface, solid, soft, elevation 4, gap 8) above it, shown open: the line "Controlled by Plate Option, currently ...", then this Button. '
    + 'The hover and focus open, the 250 ms hide delay and the rest of the field are left out.',
});
