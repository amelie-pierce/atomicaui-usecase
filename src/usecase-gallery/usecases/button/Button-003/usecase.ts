import { defineUsecase } from '../../../define';

export default defineUsecase({
  area: 'Popover',
  title: 'Help popover close',
  apps: ['hcs'],
  contextVariant: 'close',
  source: { hcs: 'src/components/HcsDownloadDurationHelp.tsx' },
  summary: 'A transparent X IconButton closes a help popover.',
  where: 'The corner of a popover that explains a panel, beside the circle-question help trigger of Button-011. Real site source: HCS Button-013 (src/components/HcsDownloadDurationHelp.tsx).',
  when: 'Use it to dismiss a popover that has no footer. It is the compact square profile, not the contained header size, so it stays out of the way of the text.',
  how: 'In context the circle-question trigger opens the popup above it (top, start, 8px offset); the popup is a View card (surface, solid, soft, elevation 4) as wide as 34rem, kept inside the stage (an inline min(); sx has no such token). The X sits at the end of the intro row, "Duration of load adjustments as specified by the code are as follows:", above the five duration notes (Dead 90, Floor 100, Snow 115, Roof 125, Quake/Wind 160) as a plain list. Set aui color "secondary", paint "text", scale "sm", shape "soft" and profile "square-compact", plus sx flex "none". The glyph is xmark and the IconButton needs an aria-label.',
});
