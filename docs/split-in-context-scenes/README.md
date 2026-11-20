# In context split: old id to new ids

Old ids are reused when a component renumbers, so an old deep link cannot be aliased (for example the old Dialog-005 is now Dialog-008 and Dialog-005 is another use case).

## Splits

- Dialog-001 -> Dialog-001 (About dialog), Dialog-002 (Report preview dialog), Dialog-003 (Calculator dialog), Dialog-004 (Template picker dialog)
- Checkbox-001 -> Checkbox-001 (Dialog option checkbox), Checkbox-002 (Input panel option checkbox), Checkbox-003 (Show passed checks filter)
- Checkbox-002 -> Checkbox-004 (Object visibility checkbox group), Checkbox-005 (Print summary checkbox)
- FileUpload-001 -> FileUpload-001 (Upload file dialog dropzone), FileUpload-002 (Feedback attachments dropzone)
- Menubar-001 -> Menubar-001 (Top bar action button), Menubar-002 (File menu), Menubar-003 (Help Center menu)
- Menubar-002 -> Menubar-004 (Settings gear menu), Menubar-005 (Settings drawer row menu)
- Radio-001 -> Radio-001 (Option radio group), Radio-002 (Camera projection radio group)
- Select-001 -> Select-001 (Single select), Select-002 (Column filter select)
- Select-003 -> Select-004 (Configuration country select), Select-005 (Licence gate country select)
- Table-003 -> Table-003 (Calculation summary table), Table-004 (Data preview table), Table-005 (Check details table)
- Table-005 -> Table-007 (Job tally totals row), Table-008 (Print table totals row)
- Tabs-001 -> Tabs-001 (Pane tabs), Tabs-002 (Phone workspace tabs)

## Full renumber map (only ids that change)

- Dialog: Dialog-002 -> Dialog-005, Dialog-003 -> Dialog-006, Dialog-004 -> Dialog-007, Dialog-005 -> Dialog-008, Dialog-006 -> Dialog-009, Dialog-007 -> Dialog-010, Dialog-008 -> Dialog-011, Dialog-009 -> Dialog-012
- Checkbox: Checkbox-002 -> Checkbox-004
- Menubar: Menubar-001 -> Menubar-002, Menubar-002 -> Menubar-004, Menubar-003 -> Menubar-006
- Select: Select-002 -> Select-003, Select-003 -> Select-004, Select-004 -> Select-006, Select-005 -> Select-007, Select-006 -> Select-008, Select-007 -> Select-009
- Table: Table-004 -> Table-006, Table-005 -> Table-007, Table-006 -> Table-009
- Tabs: Tabs-002 -> Tabs-003, Tabs-003 -> Tabs-004

## Left unsplit (the options are states, row kinds or sections of one action)

- Button-001 Print enabled or disabled (states). Button-028 results row or group row (row kinds). Button-029 apps popover or help popover close (same Close popover action). Button-031 Dialog close or close without Title (states).
- Accordion-001 Section list or Section cards (the same input pane, two renderings). Accordion-002 Release notes or Other regions (the Other regions accordion is nested in the same release notes accordion of the About dialog).
