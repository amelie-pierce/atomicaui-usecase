import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Card',
  title: 'Preview card',
  apps: ['hcs'],
  cases: [{ id: 'hcs-preview', name: 'Option preview', source: { hcs: 'src/components/HcsBeamTypeSelect.tsx' } }],
  source: { hcs: 'src/components/HcsBeamTypeSelect.tsx' },
  summary: 'A raised surface card with a title above an illustration, shown beside an option list to preview the highlighted option.',
  where: 'The Type and Supported type selects of HCS (src/components/HcsBeamTypeSelect.tsx): hovering or arrowing to an option previews it.',
  when: 'Use it to explain a choice with a picture before the user commits. Do not use it as a persistent panel.',
  how: '`Card` with `color: "surface"`, `paint: "solid"`, `shape: "soft"`, `elevation: 4`, `sx: { width: "224" }`, `Card.Body` holding `Card.Title` and a `ContainedImage` (`fit="contain"`, `ratio="4:3"`). In the app it is the content of a `Popover` anchored to the open list (`side` right, or left for Supported types, `sideOffset={8}`, `initialFocus={false}`). The scene anchors it to a stand-in for the field; the real list is Combobox-002.',
  anatomy: [
    {
      id: 'card',
      name: 'Card',
      token: 'Card',
      selector: '[class~="aui-card"]',
      description: '224px wide raised surface card with elevation 4 that floats beside the option list in a popover.',
      code: `<Card aui={{ scale: 'sm', color: 'surface', paint: 'solid', shape: 'soft', elevation: 4, sx: { width: '224' } }}>`,
    },
    {
      id: 'body',
      name: 'Body',
      token: 'Card.Body',
      selector: '[class~="aui-card-body"]',
      description: 'Stacks the option name above its illustration.',
      code: `<Card.Body aui={{ scale: 'sm' }}>
  <Card.Title>Glulam</Card.Title>
  <ContainedImage … />
</Card.Body>`,
    },
    {
      id: 'title',
      name: 'Title',
      token: 'Card.Title',
      selector: '[class~="aui-card-title"]',
      description: 'Name of the highlighted option, "Glulam".',
      code: `<Card.Title>Glulam</Card.Title>`,
    },
    {
      id: 'illustration',
      name: 'Illustration',
      token: 'ContainedImage',
      selector: '[class~="aui-contained-image"]',
      description: '4:3 generic illustration of Glulam, fitted whole with fit="contain".',
      code: `<ContainedImage src={MOCK_IMAGE_SRC} alt="Generic illustration of Glulam" fit="contain" ratio="4:3" />`,
    },
  ],
});
