import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Icon button',
  title: 'Open field help button',
  apps: ['hcs', 'pbs', 'rws', 'hs', 'adm', 'pfd', 'agpd'],
  cases: [
    { id: 'hcs-field-help', name: 'Field help', apps: ['hcs'], look: 'Ghost, 20px', source: { hcs: 'src/App.tsx' } },
    { id: 'pbs-field-help', name: 'Field help', apps: ['pbs'], look: 'Ghost, 20px', source: { pbs: 'src/InputFields.tsx' } },
    { id: 'rws-field-help', name: 'Field help', apps: ['rws'], look: 'Ghost, 20px', source: { rws: 'src/rws/inputs.tsx' } },
    { id: 'hs-field-help', name: 'Field help', apps: ['hs'], look: 'Ghost, 28px', source: { hs: 'src/hs/InputFields.tsx' } },
    { id: 'adm-field-help', name: 'Field help', apps: ['adm'], look: 'Ghost, 28px', source: { adm: 'src/shared/lib/tooltip/AdmHelpTooltip.tsx' } },
    { id: 'pfd-field-help', name: 'Field help', apps: ['pfd', 'agpd'], look: 'Ghost, 28px', source: { pfd: 'src/pfd/fields.tsx', agpd: 'src/agpd/inputs.tsx' } },
  ],
  source: { hcs: 'src/components/F01Experience.tsx', pbs: 'src/ResultsSection.tsx', rws: 'src/rws/ShellDialogs.tsx', hs: 'src/hs/InputFields.tsx', adm: 'src/shared/lib/tooltip/AdmHelpTooltip.tsx', pfd: 'src/pfd/fields.tsx', agpd: 'src/agpd/inputs.tsx' },
  summary: 'A transparent icon-only IconButton with a circle-question opens the help of a field from beside its label; the example is the 20px one and the Look select shows the 28px one.',
  where: 'After a field label in the input pane. HCS, PBS and RWS draw it as a 20px square that opens a popover; HS and ADM draw a 28px square that opens a tooltip; PFD and AGPD draw the 28px square that opens a popover. The popover is closed by Button-029.',
  when: 'Use it to explain one field without adding permanent text. Always set aria-label; the popover or tooltip it opens holds the explanation.',
  how: 'Ghost, 20px (HCS, PBS, RWS). HCS: an IconButton with aui scale "sm", profile "contained", color "secondary", paint "text" and shape "soft", with the circle-question glyph. '
    + 'In context it is the Load Properties section: Download Duration alone, the label row (label text, then the icon, a flex row) above its select; the other fields are left out. '
    + 'PBS: a Button with a ContainedIcon circle-question child at profile "square-compact" so the label row keeps its height, opening a 320px popover. '
    + 'RWS: a Button at profile "square" pinned to 20px by sx, opening a 320px popover. '
    + 'Ghost, 28px (HS, ADM, PFD, AGPD): aui color "secondary", paint "text", scale "sm", shape "soft" and profile "square" on an IconButton; the apps that write the circle-question as a Button with a ContainedIcon child at profile "square" get the same 28px box and glyph, and the scene writes that control. '
    + 'HS: a Tooltip above it, 4px offset, up to 384px, so it has no close. ADM: the same square Button with a Tooltip above it, 8px offset, painted solid secondary at scale "sm", up to 256px. PFD and AGPD (one group): the same square Button opening a popover, top, 4px offset, a surface card up to 384px. '
    + 'Each help scene keeps one labelled field and one sentence of help text.',
  anatomy: [
    { id: 'help', name: 'Help button', token: 'IconButton', selector: '[class~="aui-button"][aria-label*="elp"]', description: 'The 20px transparent secondary circle-question button that sits beside the field label; the Look select swaps it for the 28px ghost version. In scenes it is a Button around a ContainedIcon (square or square-compact, RWS fixed at 20px).',
      code: `<IconButton name="circle-question" aria-label="Help" aui={{ scale: 'sm', profile: 'contained', color: 'secondary', paint: 'text', shape: 'soft' }} />` },
    { id: 'help-icon', name: 'Help icon', token: 'ContainedIcon', selector: '[class~="aui-button"][aria-label*="elp"] > :is([class~="aui-icon"], [class~="aui-contained-icon"])', description: 'The circle-question glyph centred in the help button.',
      code: `<ContainedIcon name="circle-question" />` },
    { id: 'label', name: 'Field label', token: 'Field.Label', selector: '[class~="aui-field-label"]', description: 'The label (Material, or Download Duration in HCS) that names the control the help explains.',
      code: `<Field.Label aui={{ scale: 'sm' }}>Material</Field.Label>` },
    { id: 'control', name: 'Field control', token: 'Field.Control', selector: '[class~="aui-field-control"]', description: 'The input (Steel) in ADM, HS, PBS, PFD and RWS scenes that the help text describes.',
      code: `<Field.Control aui={{ scale: 'sm' }} aria-label="Material" defaultValue="Steel" />` },
    { id: 'tooltip', name: 'Help tooltip', token: 'Tooltip.Popup', selector: '[class~="aui-tooltip-popup"]', description: 'ADM and HS open the explanation as a tooltip above the button, up to 256px (ADM) or 384px (HS) wide.',
      code: `<Tooltip.Popup aui={{ paint: 'solid', color: 'secondary', scale: 'sm', sx: { maxWidth: '256' } }}>Select the base material of the member.</Tooltip.Popup>` },
    { id: 'popover', name: 'Help popover', token: 'Popover.Popup', selector: '[data-aui-popup-motion][role="dialog"]', description: 'PBS, PFD and RWS open the explanation in a solid popover (320px or 384px max) above the button.',
      code: `<Popover.Popup aria-label="Material help" render={<View aui={{ color: 'surface', paint: 'solid', profile: 'default', shape: 'soft', elevation: 4, sx: { width: '320' } }} />}>
  Select the base material of the member.
</Popover.Popup>` },
    { id: 'select', name: 'Select trigger', token: 'Select.Trigger', selector: '[class~="aui-select-trigger"]', description: 'HCS only: the Snow (115) select under the Download Duration label.',
      code: `<Select.Trigger aria-label="Download Duration" aui={{ … }} style={{ inlineSize: '100%', minInlineSize: 0 }}>` },
  ],
});
