import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Data table',
  title: 'Dense print table',
  apps: ['ace', 'adm', 'hs', 'rws', 'pbs', 'pfd', 'agpd'],
  source: {
    ace: 'src/features/print/ui/report-primitives.tsx',
    adm: 'src/features/print/components/InputDataPrintPage.tsx',
    hs: 'src/hs/PrintView.tsx',
    rws: 'src/legacy/src/apps/rws/containers/PrintView/components/PrintTable.jsx',
    pbs: 'src/PrintView.tsx',
    pfd: 'src/pfd/PrintView.tsx',
    agpd: 'src/App.tsx',
  },
    layers: [
        {"id":"table","partId":"table","title":"Table","explanation":"Flat print grid at scale \"xs\" with \"all-cells\" borders and no selection. ACE, ADM, HS and RWS override it with shape \"none\", a text-coloured border, compact profile or smaller 10/12 type.","keyIdea":"A flat print grid preserves the table’s values without interactive selection controls.","selector":"[class~=\"aui-table\"]"},
        {"id":"head","partId":"head","title":"Header","explanation":"Header row printed with Model and Load (lb); ACE and ADM paint it muted with a surface foreground, HS and RWS use a secondary solid fill.","keyIdea":"The printed heading row labels columns in the report rather than acting as controls.","selector":"[class~=\"aui-table-head\"]"},
        {"id":"header-cell","partId":"header-cell","title":"Header cell","explanation":"Printed column label without sort controls; its alignment is centre in ACE and RWS and left or start in ADM and HS.","keyIdea":"Each plain heading stays readable in the compact report layout.","selector":"[class~=\"aui-table-header-cell\"]"},
        {"id":"body","partId":"body","title":"Body","explanation":"The printed rows of the report table.","keyIdea":"The body holds records in the sequence the report will present them.","selector":"[class~=\"aui-table-body\"]"},
        {"id":"row","partId":"row","title":"Row","explanation":"One printed record, Model B-200 with 2,210 lb; HS and RWS switch selectable and expandable off on the row.","keyIdea":"A row binds one printed model and its load into a single record.","selector":"[class~=\"aui-table-row\"]"},
        {"id":"cell","partId":"cell","title":"Cell","explanation":"Plain printed value; ACE sets 4px by 6px padding with centred text, ADM left-aligns it in the compact profile.","keyIdea":"Plain cells keep printed values legible without implying editability.","selector":"[class~=\"aui-table-cell\"]"},
      ],
options: [
    { id: "ace-print", name: "Print table", showContext: false, apps: ["ace"], source: {"ace":"src/features/print/ui/report-primitives.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "adm-print", name: "Print table — UI variant 2", showContext: false, apps: ["adm"], source: {"adm":"src/features/print/components/InputDataPrintPage.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "hs-print", name: "Print table — UI variant 3", showContext: false, apps: ["hs"], source: {"hs":"src/hs/PrintView.tsx"} ,
      contextLayers: [

      ],
    },
    { id: "rws-print", name: "Print table — UI variant 4", showContext: false, apps: ["rws"], source: {"rws":"src/legacy/src/apps/rws/containers/PrintView/components/PrintTable.jsx"} ,
      contextLayers: [

      ],
    },
    { id: "pbs-print", name: "Print table — UI variant 5", showContext: false, apps: ["pbs","pfd","agpd"], source: {"pbs":"src/PrintView.tsx","pfd":"src/pfd/PrintView.tsx","agpd":"src/App.tsx"} ,
      contextLayers: [

      ],
    },
  ],
  summary: 'The paper copy of a table: a flat all-cells grid with no sorting or selection, printed in the report.',
  where: 'Print views: ACE print/ui/report-primitives.tsx (ReportTable), ADM print/components/InputDataPrintPage.tsx, HS PrintView.tsx, RWS PrintView PrintTable.jsx, PBS PrintView.tsx, PFD PrintView.tsx and AGPD App.tsx (the print table).',
  when: 'Use it on the print page only. The table has no sort button, selection or scroll. Pick the group of the app you build: the band colour, density, alignment and border colour differ and are not interchangeable.',
  how: 'Table with border "all-cells" and scale "xs"; cell and header-cell aui set the band. Five groups, measured in headless Chromium. ACE: text-coloured border rgb(0, 0, 0), no radius, header band painted muted (background rgb(71, 85, 105), text rgb(255, 255, 255)), cells 14px/18px with padding 6px 4px and centred. ADM: the same band and border with compact 12px/16px cells, padding 2px 4px, aligned left. HS: header cells painted secondary solid (background rgb(18, 18, 18), white text), 10/12 body type, borders rgb(148, 163, 184), start-aligned non-wrapping header labels and centred body cells. RWS: the HS table with centred header labels. PBS, AGPD and PFD: the bare xs table with 1px rgb(148, 163, 184) cell borders, header rgb(203, 213, 225) and 14px/18px cells with padding 4px 6px; PBS and AGPD measure identical, and PFD writes no border prop so its cells have 0px borders (an app-side omission against the PBS standard, merged away). The scenes leave out the bold footer row (ACE), the product image cell and the selected-row tint (HS), the checkbox footnotes (PBS) and repeated rows.',
  anatomy: [
    {
      id: 'table',
      name: 'Table',
      selector: '[class~="aui-table"]',
      description: 'Flat print grid at scale "xs" with "all-cells" borders and no selection. ACE, ADM, HS and RWS override it with shape "none", a text-coloured border, compact profile or smaller 10/12 type.',
    },
    {
      id: 'head',
      name: 'Header',
      selector: '[class~="aui-table-head"]',
      description: 'Header row printed with Model and Load (lb); ACE and ADM paint it muted with a surface foreground, HS and RWS use a secondary solid fill.',
    },
    {
      id: 'header-cell',
      name: 'Header cell',
      selector: '[class~="aui-table-header-cell"]',
      description: 'Printed column label without sort controls; its alignment is centre in ACE and RWS and left or start in ADM and HS.',
    },
    {
      id: 'body',
      name: 'Body',
      selector: '[class~="aui-table-body"]',
      description: 'The printed rows of the report table.',
    },
    {
      id: 'row',
      name: 'Row',
      selector: '[class~="aui-table-body"] [class~="aui-table-body"] [class~="aui-table-row"]',
      description: 'One printed record, Model B-200 with 2,210 lb; HS and RWS switch selectable and expandable off on the row.',
    },
    {
      id: 'cell',
      name: 'Cell',
      selector: '[class~="aui-table-cell"]',
      description: 'Plain printed value; ACE sets 4px by 6px padding with centred text, ADM left-aligns it in the compact profile.',
    },
  ],
});
