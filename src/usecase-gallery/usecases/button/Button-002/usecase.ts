import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Download CSV button',

  apps: ['pfd', 'hs', 'rws'],
    layers: [
        {"id":"container","partId":"container","title":"Container","explanation":"The Download CSV Button: secondary text paint, scale \"sm\", soft shape and flex \"none\" so it never shrinks in the wrapping toolbar row after the search field and count.","keyIdea":"Keeping the export control fixed lets the search and count wrap without squeezing it.","selector":"[class~=\"aui-button\"]"},
        {"id":"icon","partId":"icon","title":"Icon","explanation":"The CSV file glyph that sits before the label and tells the export format.","keyIdea":"The file glyph previews the CSV format before the download starts.","selector":"[class~=\"aui-button\"] > :is([class~=\"aui-contained-icon\"], [class~=\"aui-icon\"])"},
      ],
options: [
    { id: "pfd-toolbar", name: "Table toolbar", apps: ["pfd","hs","rws"], contextAnatomy: [
      { id: "toolbar", name: "Output toolbar", description: "The wrapping row of small controls (8px gap) with the search field first, the count next and Download CSV last." },
      { id: "search", name: "Search field", description: "The Search Table Field with a magnifying-glass icon that fills the line." },
      { id: "count", name: "Result count", description: "The muted \"Showing 1 entry\" status text before Download CSV." },
    ], source: {"pfd":"src/pfd/ResultsTable.tsx","hs":"src/hs/ResultsTable.tsx","rws":"src/rws/output.tsx"} ,
      contextLayers: [
        {"id":"context-toolbar","partId":"toolbar","title":"Output toolbar","explanation":"The wrapping row of small controls (8px gap) with the search field first, the count next and Download CSV last.","keyIdea":"The toolbar brings filtering, result count and export into one compact row.","selector":"[data-ug-part=\"toolbar\"]","scope":"context"},
        {"id":"context-search","partId":"search","title":"Search field","explanation":"The Search Table Field with a magnifying-glass icon that fills the line.","keyIdea":"The search field uses the remaining toolbar width to narrow table entries.","selector":"[data-ug-part=\"search\"]","scope":"context"},
        {"id":"context-count","partId":"count","title":"Result count","explanation":"The muted \"Showing 1 entry\" status text before Download CSV.","keyIdea":"The count reports how many entries remain before export.","selector":"[data-ug-part=\"count\"]","scope":"context"},
      ],
    },
  ],
  source: { pfd: 'src/pfd/ResultsTable.tsx', hs: 'src/hs/ResultsTable.tsx', rws: 'src/rws/output.tsx' },
  summary: 'A quiet text Button with a leading icon runs one action in a toolbar: a CSV icon downloads the rows.',
  where: 'The last item of the toolbar row above the Output table, after the search field and the result count. '
    + 'Real site source: PFD src/pfd/ResultsTable.tsx, HS src/hs/ResultsTable.tsx and RWS src/rws/output.tsx (ResultToolbar), the same Button in all three; HCS only has an export in dead code, and ACE, ADM, PBS, FD, AGPD and ADC have none. '
    + 'The scroll helpers that share this look sit as a pair in the Output header: see the Button group Button-027.',
  when: 'Use it for one-click export of the rows the table shows. Keep Download CSV last in the toolbar so the filters read first, and disable it while the table has no rows (HS and RWS do; PFD always enables it).',
  how: 'Set aui color "secondary", paint "text", scale "sm" and shape "soft" (profile "default"), with a Button.Icon "file-csv" before the label, and sx flex "none" so it never shrinks in the wrapping row (RWS writes the label in capitals, DOWNLOAD CSV, and the Button is the same). '
    + 'The example and the scene render this one Button. The scene shows the toolbar row of PFD, HS and RWS: sm controls with gap 8 that wrap, the search field filling the line, the muted count, then the button. '
    + 'Left out: Reset filters (PFD, HS), the Show Optimized Models switch (RWS), the product filter, the table and the notes.',
  anatomy: [
    {
      id: "container",
      name: "Container",
      description: "The Download CSV Button: secondary text paint, scale \"sm\", soft shape and flex \"none\" so it never shrinks in the wrapping toolbar row after the search field and count.",
      selector: "[class~=\"aui-button\"]",
    },
    {
      id: "icon",
      name: "Icon",
      description: "The CSV file glyph that sits before the label and tells the export format.",
      selector: "[class~=\"aui-button\"] > :is([class~=\"aui-contained-icon\"], [class~=\"aui-icon\"])",
    },
    {
      id: "label",
      name: "Label",
      description: "The label \"Download CSV\" (written in capitals in RWS) that exports the rows the table shows.",
      selector: "[class~=\"aui-button\"]",
      text: true,
    },
  ],
});
