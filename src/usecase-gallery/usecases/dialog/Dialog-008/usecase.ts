import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Save template dialog',
  look: 'Cancel and secondary Save',
  apps: ['ace', 'adm', 'hs', 'fd'],
  cases: [
    { id: 'ace-save', name: 'Save template', apps: ['ace', 'adm', 'hs'], source: { ace: 'src/features/templates/ui/SaveAsTemplateDialog.tsx', adm: 'src/features/templates/components/SaveAsTemplateDialog.tsx', hs: 'src/hs/TemplateDialogs.tsx' } },
    { id: 'fd-save', name: 'Save template', apps: ['fd'], source: { fd: 'src/App.jsx' } },
  ],
  source: { ace: 'src/features/templates/ui/SaveAsTemplateDialog.tsx', adm: 'src/features/templates/components/SaveAsTemplateDialog.tsx', hs: 'src/hs/TemplateDialogs.tsx', fd: 'src/App.jsx' },
  summary: 'A form dialog that names and saves the current inputs as a template: a Cancel and a Save that stays disabled until the name is valid.',
  where: 'The Save as template dialog. Real site source: ACE and ADM SaveAsTemplateDialog.tsx, HS TemplateDialogs.tsx and FD src/App.jsx. HCS, PFD, PBS, AGPD, RWS and ADC have no template dialog.',
  when: 'Use it when the user commits a name for new saved data; keep Save disabled until the name is valid.',
  how: 'Cancel is the Dialog.Button default; Save is color "secondary", paint "solid" (FD: a primary Save in place of the black one, its Cancel a plain Button that looks the same). Two groups. '
    + 'ACE, ADM and HS (a raised Title with the close X, Save disabled until the name is valid; ADM caps the popup at 480px). FD (a primary Save). Body fields beyond the name field are left out.',
});
