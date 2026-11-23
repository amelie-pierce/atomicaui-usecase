import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Collapse all sections button',
  look: 'Ghost, 20px',
  apps: ['hcs'],
  cases: [
    { id: 'hcs-panel-header', name: 'Panel header', apps: ['hcs'], source: { hcs: 'src/App.tsx' } },
  ],
  source: { hcs: 'src/components/F01Experience.tsx' },
  summary: 'A transparent icon-only IconButton collapses every section of the Input pane, and expands them again when all are closed.',
  where: 'The end of the HCS Input pane header, after the collapse chevron, the semi-bold title and a Panels.Spacer. Real site source: HCS src/App.tsx. No other app has this control.',
  when: 'Use it for panel chrome that acts on every section at once; wrap it in a Tooltip with the same text as the aria-label.',
  how: 'An IconButton with aui color "secondary", paint "text", scale "sm", shape "soft" and profile "contained" inside a Tooltip with the same text as the aria-label, as the app does for every icon-only button. '
    + 'In context it sits above two accordion sections, both open and empty, so the label and glyph read Collapse all and arrows-to-line; with every section closed they read Expand all and arrows-from-line. '
    + 'The section contents and the Galvanized card are left out. One group, HCS only.',
  anatomy: [
    { id: 'collapse', name: 'Collapse all', token: 'IconButton', selector: '[class~="aui-button"][aria-label^="Collapse"]', description: 'The transparent secondary arrows-to-line button (aria-label Collapse all) that folds every Input section; in HCS it is the angle-left Collapse Input button at the start of the header.',
      code: `<IconButton name="arrows-to-line" aria-label="Collapse all" aui={{ color: 'secondary', paint: 'text', scale: 'sm', shape: 'soft', profile: 'contained' }} />` },
    { id: 'collapse-icon', name: 'Icon', token: 'IconButton', selector: '[class~="aui-button"][aria-label^="Collapse"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])', description: 'The arrows-to-line glyph, which becomes expand when all sections are closed.',
      code: `<IconButton name="arrows-to-line" aria-label="Collapse all" aui={{ color: 'secondary', paint: 'text', scale: 'sm', shape: 'soft', profile: 'contained' }} />` },
    { id: 'tooltip', name: 'Tooltip', token: 'Tooltip.Popup', selector: '[class~="aui-tooltip-popup"]', description: 'The Collapse Input label shown below the button in the HCS panel header.',
      code: `<Tooltip.Popup aui={{ scale: 'sm' }}>Collapse Input</Tooltip.Popup>` },
    { id: 'item', name: 'Section', token: 'Accordion.Item', selector: '[class~="aui-accordion-item"]', description: 'The Connection Type and Load Properties sections of the Input pane that the button collapses or expands together.',
      code: `<Accordion.Item key={name} value={name} aui={{ color: 'surface', scale: 'sm', shape: 'none', sx: i ? { … } : undefined }}>` },
    { id: 'trigger', name: 'Section trigger', token: 'Accordion.Trigger', selector: '[class~="aui-accordion-trigger"]', description: 'The header row of each section with its icon, semi-bold name and chevron.',
      code: `<Accordion.Trigger aui={{ color: 'surface', paint: 'text', scale: 'sm', shape: 'none' }}>
  <Accordion.Icon name={icon} weight="regular" aria-hidden />
  <Type role="l4" weight="semi-bold">{name}</Type>
  <Accordion.Chevron />
</Accordion.Trigger>` },
  ],
});
