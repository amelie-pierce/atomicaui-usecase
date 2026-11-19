import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'IconButton',
  title: '(to merge)',
  apps: ['adm'],
  cases: [{ id: 'adm-loads', name: 'Load conditions', apps: ['adm'], source: { adm: 'src/features/design-inputs/components/LoadsSection/LoadConditionsFields.tsx' } }],
  source: { adm: 'src/features/design-inputs/components/LoadsSection/LoadConditionsFields.tsx' },
  summary: 'A setting row whose name sits at the start and whose switch sits at the far end.',
  where: 'ADM load conditions in the input panel: three rows, each a Type l5 name with a help icon at the start and a Switch at the end.',
  when: 'Use it for a list of yes or no conditions that read as rows of a form: the name starts the row and the switches line up at one edge. Use Switch.Label (Switch-002) for a single switch with text beside it.',
  how: 'ADM: a row View (flex, centred, space between, fill width, gap 8) holds the name in a Type role "l5" (bold, 12px) and a Switch with an aria-label equal to the name, no Switch.Label, with the shared toggle states (unselected tonal surface with an outlined border, selected primary solid), so the gallery scene, measured in headless Chromium, shows off as an rgb(255,255,255) track with a 1px rgb(148,163,184) border and the thumb at x=5, on as the rgb(255,83,8) fill, 44 by 22px. The app was not run; its props and states are read from the app source. The name is a separate Type, so a click on it does not toggle. The scene shows the switch on and enabled and leaves out the help icon (the Field help trigger) and the server error line that one of the rows shows under it.',
});
