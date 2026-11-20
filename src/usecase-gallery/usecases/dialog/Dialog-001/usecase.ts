import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Dialog with title bar',
  title: 'Content dialog',
  apps: ['hcs', 'ace', 'adm', 'pfd', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
  cases: [
    {
      id: 'hcs-about',
      name: 'About dialog',
      apps: ['hcs', 'ace', 'adm', 'pbs', 'hs', 'fd', 'agpd', 'rws'],
      source: {
        hcs: 'src/components/HcsAboutDialog.tsx',
        ace: 'src/features/top-navigation/ui/AboutDialog.tsx',
        adm: 'src/features/top-navigation/components/AboutDialog.tsx',
        pbs: 'src/AboutDialog.tsx',
        hs: 'src/hs/AboutDialog.tsx',
        fd: 'src/components/AboutDialog.jsx',
        agpd: 'src/agpd/AboutDialog.tsx',
        rws: 'src/rws/AboutDialog.tsx',
      },
    },
    { id: 'pfd-about', name: 'About dialog', apps: ['pfd'], source: { pfd: 'src/pfd/AboutDialog.tsx' } },
    { id: 'ace-templates', name: 'Template picker', apps: ['ace'], source: { ace: 'src/features/templates/ui/NewFromTemplateDialog.tsx' } },
    { id: 'adm-templates', name: 'Template picker', apps: ['adm'], source: { adm: 'src/features/templates/components/NewFromTemplateDialog.tsx' } },
    { id: 'hs-templates', name: 'Template picker', apps: ['hs', 'fd'], source: { hs: 'src/hs/TemplateDialogs.tsx', fd: 'src/components/TemplatesDialog.jsx' } },
  ],
  source: {
    hcs: 'src/components/HcsAboutDialog.tsx',
    ace: 'src/features/top-navigation/ui/AboutDialog.tsx',
    adm: 'src/features/top-navigation/components/AboutDialog.tsx',
    pfd: 'src/pfd/AboutDialog.tsx',
    pbs: 'src/AboutDialog.tsx',
    hs: 'src/hs/AboutDialog.tsx',
    fd: 'src/components/AboutDialog.jsx',
    agpd: 'src/agpd/AboutDialog.tsx',
    rws: 'src/rws/AboutDialog.tsx',
  },
  summary: 'A dialog with a raised title bar and a close X over a content body: the wide About dialog with a Release history column beside the notes of the chosen release, or the narrower template picker with one radio list.',
  where: 'The About item of the top bar menu in nine apps (HCS, ACE, ADM, PFD, PBS, HS, FD, AGPD, RWS; ADC has no About dialog), and the File menu item New from template in ACE, ADM, HS and FD (HCS, PFD, PBS, AGPD, RWS and ADC have no template picker). Real site source: the About dialog and the template dialog of each app (the paths are in source and in each case).',
  when: 'Use it to show what an app is and what changed in each release, with a list of versions to choose from, or to choose one saved starting point from a short list that has two owners (built in and the user\'s). Do not use it for a short message or a confirm (a plain Dialog, Button-001), for a list of tutorials (Button-025), to save a template (Button-001, Save template) or for a long searchable list.',
  how: 'The Dialog.Popup has a zero gap at scale "sm" (About) or the default scale (template picker) and the width the apps set by CSS variable; every Title is raised and carries the name, the Spacer and the close X (Button-031). The width is the one thing that differs between the two dialogs, so it is a size and not a second look: the About popup is min(860px, viewport minus 28px) (the stage width here) and the template popup is the default 480px (ADM sets 520px). The apps also set a 740px About height and, below 768px, turn the history into a strip above the notes (left out). The About body is one row: a 224px Release history column (a heading and a version count, a search Field with a magnifying-glass icon, a listbox List whose selected row is a solid surface with a 4px secondary start border, version in bold l3 and a tonal primary CURRENT Chip) and a notes column (an app header with an h5 name and a muted p3 summary, then the release notes). The notes are an Accordion (openMultiple, the global section open) whose trigger reads the label in semi-bold l3 and the count in muted l5, and whose rows are a 160px column with a solid Chip (success for a feature, warning for an improvement) next to a p3 text. The template picker body holds one RadioGroup, and each row is a Radio at scale "sm" whose states are an outlined tonal surface when unselected and a solid primary when selected, with sx flex "fill" so it takes the row; only the user\'s own rows add row actions after the Radio, in a flex row with gap 8: three text Buttons Download, Delete (color error) and Edit in ACE and ADM, three icon buttons (download, trash, pen, each with an aria-label) in HS and FD. The example is the Dialog frame you copy (Popup, raised Title with the close X, and the two columns); the Accordion of release notes and the radio list are supporting parts shown in In context. The apps write two About UIs: HCS, ACE, ADM, PBS, HS, FD, AGPD and RWS are one group (HCS, ACE, HS, FD, PBS, AGPD and RWS may also show the "Updates for your project" band and the "Updates for other regions" section, left out; the scene is the HCS one); PFD is the other group, with a Key Features list (muted label over an xs List) and a right-aligned xs text button that toggles every section (Collapse all or Expand all) above the notes. The template picker has three UIs, one scene each: ACE (the default-width Popup, an Accordion of the two sections with a Type l4 trigger), ADM (a 520px Popup, plain sections each headed by a muted Type, no Accordion) and HS and FD (the default-width shell dialog, an Accordion with plain-text triggers and icon-button rows; the Body also scrolls). The scenes leave out the no-match state, the keyboard handlers, the narrow layout, the template footer (Cancel and Create, Button-001) and delete confirm, the empty state and further rows.',
});
