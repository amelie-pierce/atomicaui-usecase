import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'CardGroup',
  title: 'Selectable template cards',
  apps: ['adc'],
  cases: [{ id: 'adc-new-project', name: 'New project templates', source: { adc: 'src/adc/components/NewProjectDialog.tsx' } }],
  source: { adc: 'src/adc/components/NewProjectDialog.tsx' },
  summary: 'A labelled grid of image cards with a search and a view toggle, where one card is selected.',
  where: 'The User Templates section of the ADC New Project dialog (src/adc/components/NewProjectDialog.tsx).',
  when: 'Use it to choose one item from a set that is recognised by picture, with search for a long set. Use a RadioGroup for a short text list.',
  how: '`CardGroup` with `value` and `onValueChange` (a string or null), a `CardGroup.Label`, a `CardGroup.Toolbar` holding `CardGroup.Search` and `CardGroup.ViewToggle`, `CardGroup.Items` (`columns`, `maxHeight`) of `CardGroup.Item`s (`value`, `textValue`, `shape: "none"`, per-state `aui`: unselected surface tonal with an outlined border, selected primary tonal that returns the surface fill) each with `CardGroup.ItemImage` (`ratio="4:3"`) and `CardGroup.ItemBody` > `CardGroup.ItemTitle`, and `CardGroup.Empty` for no match. The example shows two columns; the app shows four with a fixed section height. The scene leaves out the dropzone and the warning.',
});
