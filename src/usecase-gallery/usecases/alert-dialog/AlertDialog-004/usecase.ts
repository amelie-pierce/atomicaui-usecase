import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'AlertDialog',
  title: 'Delete confirm dialog',
  look: 'Cancel and error Delete',
  apps: ['ace', 'adm', 'pbs', 'hs', 'fd'],
  cases: [
    { id: 'ace-delete', name: 'Delete confirm', apps: ['ace', 'adm'], source: { ace: 'src/features/templates/ui/NewFromTemplateDialog.tsx', adm: 'src/features/templates/components/NewFromTemplateDialog.tsx' } },
    { id: 'pbs-delete', name: 'Delete confirm', apps: ['pbs'], source: { pbs: 'src/ResultsSection.tsx' } },
    { id: 'hs-delete', name: 'Delete confirm', apps: ['hs', 'fd'], source: { hs: 'src/hs/TemplateDialogs.tsx', fd: 'src/components/TemplatesDialog.jsx' } },
  ],
  source: { ace: 'src/features/templates/ui/NewFromTemplateDialog.tsx', adm: 'src/features/templates/components/NewFromTemplateDialog.tsx', pbs: 'src/ResultsSection.tsx', hs: 'src/hs/TemplateDialogs.tsx', fd: 'src/components/TemplatesDialog.jsx' },
  summary: 'A confirmation that asks before a template or a saved result is deleted: a Cancel next to a solid error Delete.',
  where: 'The confirmation opened from the Delete action of a template (ACE, ADM, HS, FD) or of a saved result (PBS). '
    + 'Real site source: ACE and ADM NewFromTemplateDialog.tsx, PBS ResultsSection.tsx, HS TemplateDialogs.tsx and FD TemplatesDialog.jsx. HCS, PFD, AGPD, RWS and ADC have no delete confirm.',
  when: 'Use it before an irreversible delete: color "error" marks the Delete. The Remove row button that opens it is Button-038.',
  how: 'In the apps this is AlertDialog; the gallery draws it as a non-modal Dialog because the vendored AlertDialog is forced modal. The footer is the default Cancel (Close in PBS) and a solid error Delete. Three groups. '
    + 'ACE and ADM (a raised warning Title, no close X; ACE at the default width, ADM capped at 480px). PBS (no Title: a header row with only the close X, then Close, a Spacer and a solid error Delete). '
    + 'HS and FD (a plain Title, no close X). Every scene is cut to the least that shows the footer.',
});
