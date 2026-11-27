# AtomicAUI use case reference

Generated per-use-case docs grounded in `src/usecase-gallery/usecases/`. Each page includes the authored choice guidance, Anatomy parts, lesson metadata used to derive Layer steps, options, apps, AtomicAUI component imports, style values, and source snippets. The gallery orders mounted Anatomy targets parent-first and by visual reading order; Layer reuses that Anatomy sequence. Regenerate with `npm run docs:usecases`.

## Build an app from these references

1. Choose a use case by its business action and read its **When to choose it** guidance; the title describes the action, while the UI type describes structure.
2. Choose the option whose rendered UI and state match the app. Its apps and source references show where the composition came from.
3. Copy the Component source for an isolated control, or use the In context source to place it in a representative composition. Combine multiple use cases when the app needs multiple actions or component responsibilities; keep each component's props and relationships consistent with its source.
4. Use AtomicAUI components, tokens, fonts, and icons only. Never edit `src/vendor/atomic-aui`, create new design-system components, or substitute hand-authored colors, fonts, or icons.
5. Treat the source snippets as the authority. The snippets include preview scaffolding such as `data-ug-part` and host placement where applicable; adapt only the gallery-specific preview wiring when integrating into an app.

## Use cases by component family

## Accordion

- [Accordion-001: Flush sections](./accordion/Accordion-001.md) — The Input pane as a stack of collapsible sections: each a title row with an optional section icon and a chevron, opening onto the fields of one topic.
- [Accordion-002: Title with badge and count](./accordion/Accordion-002.md) — The release notes of an About dialog as collapsible sections: each a title with a count, opening onto the list of changes with one coloured Chip each.
- [Accordion-003: Plain title](./accordion/Accordion-003.md) — A pick-one list split into two collapsible groups, Default Templates and My Templates, each a plain title with a chevron over its rows.

## AlertDialog

- [AlertDialog-001: Confirm with warning icon](./alert-dialog/AlertDialog-001.md) — A confirmation that interrupts the user: a warning icon title with a close X, a description of what is lost, and a Cancel next to the destructive action.
- [AlertDialog-002: Single centered action](./alert-dialog/AlertDialog-002.md) — A blocking notice with no close X and one solid button centred in the footer, the only way forward.
- [AlertDialog-003: Reset confirm dialog](./alert-dialog/AlertDialog-003.md) — A confirmation that asks before every input is reset: a warning title, a description of what is lost, and a Cancel next to a solid Reset.
- [AlertDialog-004: Delete confirm dialog](./alert-dialog/AlertDialog-004.md) — A confirmation that asks before a template or a saved result is deleted: a Cancel next to a solid error Delete.

## Button

- [Button-001: Print output button](./button/Button-001.md) — A Button with a print icon is the last item of a results pane header: quiet and tonal in HCS, a solid black Button in the tabbed headers of HS, FD and ADM.
- [Button-002: Download CSV button](./button/Button-002.md) — A quiet text Button with a leading icon runs one action in a toolbar: a CSV icon downloads the rows.
- [Button-003: Reset to default button](./button/Button-003.md) — A raised solid Button resets one field group to its default without leaving the form.
- [Button-004: Show all products button](./button/Button-004.md) — A Button styled as an underlined warning-colored link inside body copy.
- [Button-005: Try again button](./button/Button-005.md) — The default gray Button retries a failed action from an error message: Try again under the Results error.
- [Button-006: Cancel upload button](./button/Button-006.md) — The default gray Cancel is the lone button at the end of an upload dialog that waits for a file dropped in its body.
- [Button-007: Close info dialog button](./button/Button-007.md) — Close is the lone button of an info dialog that only informs; its first look, the default gray one, is the example; the Look select shows the other.
- [Button-008: Reset filters button](./button/Button-008.md) — A neutral default Button clears the active filters of a results table; FD draws it as a quiet text Button.
- [Button-009: Open view options button](./button/Button-009.md) — A tonal text Button in the corner of the 3D viewer opens the camera and visibility controls in a popover.
- [Button-010: Show locked field option button](./button/Button-010.md) — A small primary text Button in a lock popover reveals the option that controls a locked field.
- [Button-011: Start tutorial topic button](./button/Button-011.md) — A full-width text Button with an outlined border is one tutorial topic in the Help & Tutorials list; pressing it starts that guided tour.
- [Button-012: Launch general tutorial button](./button/Button-012.md) — A borderless text Button on the last step of a topic tour starts the General Tutorial.
- [Button-013: Add to Job List button](./button/Button-013.md) — A solid secondary Button, black with white text, adds the chosen result to the job list.
- [Button-014: Add job button](./button/Button-014.md) — A solid secondary Button with a plus icon appends an empty job entry under the Job tally table.
- [Button-015: Acknowledge notice button](./button/Button-015.md) — A solid primary Button, orange with white text, is the lone OK that acknowledges a notice.
- [Button-016: Show all connection types button](./button/Button-016.md) — A text Button in the primary colour opens the full list from the footer of a carousel.
- [Button-017: Open report button](./button/Button-017.md) — A small blue solid Button with a file icon tells the user a report is ready and opens it.
- [Button-018: Open products picker button](./button/Button-018.md) — A full-width small Button with a border stands in for a field until the user activates it.
- [Button-019: Toggle prototype controls button](./button/Button-019.md) — A surface Button lifted with a shadow floats over the page and toggles a panel of controls.
- [Button-020: Go to carousel page button](./button/Button-020.md) — An empty solid Button is one dot of a carousel pager; the current page is the primary one.
- [Button-021: Save column configuration buttons](./button/Button-021.md) — A reset icon, a Cancel and a solid secondary Save close the Configure columns popover.
- [Button-022: Save edited value buttons](./button/Button-022.md) — A filled Cancel and a solid secondary Save close the in-place editor popover of a value chip.
- [Button-023: Walkthrough step navigation buttons](./button/Button-023.md) — Borderless text Buttons step back and forward through a guided tour: Previous with arrow-left before it, then Next with arrow-right after it.
- [Button-024: End walkthrough buttons](./button/Button-024.md) — Borderless text Buttons close a guided tour on its last step: Previous with arrow-left before it, and End in place of Next.
- [Button-025: Edit and Duplicate row buttons](./button/Button-025.md) — Two tonal labelled Buttons in the first cell of a saved-list row edit or duplicate that row.
- [Button-026: Edit and Delete row link buttons](./button/Button-026.md) — Text Buttons with no padding read as links; stacked in a column they give a table row its few actions while the table stays light.
- [Button-027: Back to top and Table Notes buttons](./button/Button-027.md) — Two quiet text Buttons with a leading icon sit together in a header: an arrow jumps to the top of a long table and another down to its notes.
- [Button-028: Expand row button](./button/Button-028.md) — A compact chevron Button expands a table row; HCS draws it as a Button (error color on failed rows), the other apps use the table's own expand trigger.
- [Button-029: Close popover button](./button/Button-029.md) — A transparent icon-only IconButton, 20px square, closes a popover from its corner.
- [Button-030: Close walkthrough button](./button/Button-030.md) — A transparent icon-only IconButton, 20px square, dismisses the coach-mark card of a walkthrough from its corner.
- [Button-031: Close dialog button](./button/Button-031.md) — A transparent icon-only IconButton, 20px square, closes a dialog from the end of its Title.
- [Button-032: Open field help button](./button/Button-032.md) — A transparent icon-only IconButton with a circle-question opens the help of a field from beside its label; the example is the 20px one and the Look select shows the 28px one.
- [Button-033: Collapse all sections button](./button/Button-033.md) — A transparent icon-only IconButton collapses every section of the Input pane, and expands them again when all are closed.
- [Button-034: Show column info button](./button/Button-034.md) — A transparent icon-only button with a circle-info opens an explanation popover from a table column header.
- [Button-035: Open column menu button](./button/Button-035.md) — A small IconButton opens the menu of a table column header.
- [Button-036: Expand panel button](./button/Button-036.md) — A square transparent IconButton, 28px, expands a collapsed side panel from its rail.
- [Button-037: Step carousel buttons](./button/Button-037.md) — Two square transparent Buttons, 28px, step an input pane carousel back and forward.
- [Button-038: Remove row button](./button/Button-038.md) — A square transparent trash IconButton, 28px, removes a row from a saved list after a confirmation.
- [Button-039: Reset view button](./button/Button-039.md) — An orange icon with a thin outline floats over a 3D viewer to reset the camera.
- [Button-040: Add result row button](./button/Button-040.md) — A tonal plus IconButton, 28px square, adds one result row to a list.
- [Button-041: Call dealer button](./button/Button-041.md) — A round filled accent IconButton calls the dealer.
- [Button-042: Recalculate button](./button/Button-042.md) — A small amber solid IconButton re-runs the calculation when the inputs have changed.

## Card

- [Card-001: Product card](./card/Card-001.md) — A fixed 128 by 160 card with a contained image above a centred, wrapping title.
- [Card-002: Image tile](./card/Card-002.md) — An image-only card, 96 by 96, used as the visual of a link in a grid.
- [Card-003: Preview card](./card/Card-003.md) — A raised surface card with a title above an illustration, shown beside an option list to preview the highlighted option.

## CardGroup

- [CardGroup-001: Selectable template cards](./card-group/CardGroup-001.md) — A labelled grid of image cards with a search and a view toggle, where one card is selected.

## Checkbox

- [Checkbox-001: Dialog option checkbox](./checkbox/Checkbox-001.md) — A Checkbox with its label that answers one optional yes or no question at the end of a dialog form: Send me a copy of my responses.
- [Checkbox-002: Input panel option checkbox](./checkbox/Checkbox-002.md) — A Checkbox with its label that answers one yes or no input of an input section: Galvanized, Predrill, Same inputs as Left Hip.
- [Checkbox-003: Show passed checks filter](./checkbox/Checkbox-003.md) — A Checkbox with its label that turns an on and off filter of the table right below it: Show passed validations above a results table.
- [Checkbox-004: Object visibility checkbox group](./checkbox/Checkbox-004.md) — Checkboxes under a group title that show or hide the parts of the 3D model (Wall, Roof, Base plate, Anchors).
- [Checkbox-005: Print summary checkbox](./checkbox/Checkbox-005.md) — A read-only Checkbox under a Fieldset legend in the print report that repeats an input option of the input panel.

## Chip

- [Chip-001: Solid release label](./chip/Chip-001.md) — A small solid label that names the kind of an item, coloured by meaning: success for a feature, warning for an improvement.
- [Chip-002: Compact soft label](./chip/Chip-002.md) — A compact label with soft corners that marks a state of the whole app: BETA in the notice banner, the version beside the menu.
- [Chip-003: Tonal status with icon](./chip/Chip-003.md) — A tonal chip with a leading icon that states a result: success and a check for Passed, error and a cross for Failed.
- [Chip-004: Compact solid status](./chip/Chip-004.md) — A compact solid chip with an icon for each check category of a result: green and a check when it passes, red and an exclamation when it fails.
- [Chip-005: Attachment chip](./chip/Chip-005.md) — A default chip with a name and a dismiss X, one per file the user attached.

## Combobox

- [Combobox-001: Searchable select](./combobox/Combobox-001.md) — A select you can type into: the text field filters the list, a chevron opens it, and the chosen option is ticked.
- [Combobox-002: Select with option preview](./combobox/Combobox-002.md) — A compact Combobox whose open list previews the highlighted option in a card beside it.

## Context menu

- [ContextMenu-001: Tab context menu](./context-menu/ContextMenu-001.md) — A right-click on a tab opens a menu of actions for that tab: close, close the others, rename, duplicate and move.

## Dialog

- [Dialog-001: About dialog](./dialog/Dialog-001.md) — The About dialog of an app: a wide dialog with a raised title bar and a close X, a Release history column beside the notes of the chosen release.
- [Dialog-002: Report preview dialog](./dialog/Dialog-002.md) — A dialog with a raised title bar and a close X over a report preview: the Calculation Report window of ADC.
- [Dialog-003: Calculator dialog](./dialog/Dialog-003.md) — A dialog with a raised title bar and a close X over a small calculator: the Thickness Calculator of ADM, opened from the base plate inputs.
- [Dialog-004: Template picker dialog](./dialog/Dialog-004.md) — A narrow dialog with a raised title bar and a close X over one radio list of templates with two owners (built in and the user's own).
- [Dialog-005: Full-size dialog](./dialog/Dialog-005.md) — The licence a user must accept before the app opens: a dialog that fills the screen, a Title with the close X, and a scrolling Body of legal text.
- [Dialog-006: Centered-title dialog](./dialog/Dialog-006.md) — A small raised-title dialog whose title is centred between side paddings, with the close X pinned to the end and a column of rows in the body.
- [Dialog-007: Accept licence dialog](./dialog/Dialog-007.md) — A gate that asks the user to accept the licence agreement before the app opens: a Do Not Accept and a solid Accept.
- [Dialog-008: Save template dialog](./dialog/Dialog-008.md) — A form dialog that names and saves the current inputs as a template: a Cancel and a Save that stays disabled until the name is valid.
- [Dialog-009: Send feedback dialog](./dialog/Dialog-009.md) — A form dialog that sends the user's feedback: a Cancel and a solid Send (Submit).
- [Dialog-010: Welcome dialog](./dialog/Dialog-010.md) — A welcome dialog that offers the guided tour: a gray Close and a solid Start Walkthrough.
- [Dialog-011: Form dialog](./dialog/Dialog-011.md) — A wide dialog whose Body is one form: a yes/no question, short text fields, a notes Textarea and a SUBMIT button at the end of the row.
- [Dialog-012: Content-only expanded dialog](./dialog/Dialog-012.md) — A dialog with no title and no close X: the popup is square, has no padding and fills the screen, and holds content that brings its own controls.

## Drawer

- [Drawer-001: Mobile navigation drawer](./drawer/Drawer-001.md) — A side panel that holds the top bar actions on a phone: a no-padding popup with a vertical menu, opened under the bar.

## Dropdown

- [Dropdown-001: Outlined text trigger](./dropdown/Dropdown-001.md) — A text trigger with a chevron opens a short list of radio rows; the chosen row names the trigger and closes the list.
- [Dropdown-002: Filled icon trigger](./dropdown/Dropdown-002.md) — An icon-only trigger opens a plain list of the items that no longer fit in a row; choosing one activates it.

## Field

- [Field-001: Number field with unit](./field/Field-001.md) — A labelled field with one outlined control that holds a number and shows its unit after the value.
- [Field-002: Text field](./field/Field-002.md) — A labelled field with one outlined control for a line of text.
- [Field-003: Field with error](./field/Field-003.md) — The message under a field whose value failed validation, in the error colour.
- [Field-004: Search field](./field/Field-004.md) — A search box with a magnifying-glass icon at the start and, in some apps, a clear button at the end.
- [Field-005: Textarea](./field/Field-005.md) — A labelled field with a multi-line outlined box for free text.
- [Field-006: Description under a field](./field/Field-006.md) — A line of help text under a field that explains the chosen value.

## FileUpload

- [FileUpload-001: Upload file dialog dropzone](./file-upload/FileUpload-001.md) — A dashed drop area with an icon, a prompt and a browse action in an upload dialog: drag a file in or pick one from the device.
- [FileUpload-002: Feedback attachments dropzone](./file-upload/FileUpload-002.md) — A dashed drop area in the Feedback form that attaches several files: the attached files as Chips above the dropzone.

## Menubar

- [Menubar-001: Top bar action button](./menubar/Menubar-001.md) — A plain text button on the top bar that runs one action without a list of choices: About opens the about dialog, Reset opens the reset confirmation.
- [Menubar-002: File menu](./menubar/Menubar-002.md) — A File text trigger on the top bar opens a popup of device, template and print actions for the open design.
- [Menubar-003: Help Center menu](./menubar/Menubar-003.md) — A Help Center text trigger on the top bar opens a popup of the few help actions of an application: Feedback, Tutorials, Add to Home Screen.
- [Menubar-004: Settings gear menu](./menubar/Menubar-004.md) — A square gear button in the top bar opens a grouped menu of pane orientation radio rows, a reset row and, where the app has a 3D model, an Auto-Rotate check row.
- [Menubar-005: Settings drawer row menu](./menubar/Menubar-005.md) — A Settings text row in the phone drawer opens the same layout settings menu that the gear opens on the desktop top bar.
- [Menubar-006: Settings summary](./menubar/Menubar-006.md) — A tonal Menubar.Button that sums up the current region, language and design code in one line, separated by dividers, and opens the settings popover.

## Panels

- [Panels-001: Side by side](./panels/Panels-001.md) — A Panels group splits the workspace into surface panes side by side that the user resizes by dragging the vertical handle between them.
- [Panels-002: Stacked](./panels/Panels-002.md) — A Panels group stacks the workspace into surface panes, Input above and the results below, that the user resizes by dragging the horizontal handle between them.
- [Panels-003: Top rail](./panels/Panels-003.md) — A collapsible Panels.Panel rests at a 40px rail and carries a Panels.Trigger that expands it again.

## Popover

- [Popover-001: Help popover](./popover/Popover-001.md) — A short text popover opened from a circle-question trigger beside a field label, closed by an X or an outside click.
- [Popover-002: Form popover with footer](./popover/Popover-002.md) — A popover that holds a small form and ends in a footer row: a reset icon at the start, Cancel and a solid Save at the end.
- [Popover-003: Column menu](./popover/Popover-003.md) — A popover of choices opened from the kebab of a table header cell: the Sort radios for that column.

## Radio

- [Radio-001: Option radio group](./radio/Radio-001.md) — A group of radios under a form label that picks one option among a few named ones: a plate or fastener option, Auto-rotate 3D model Yes or No.
- [Radio-002: Camera projection radio group](./radio/Radio-002.md) — The camera projection radios of the 3D viewer, Perspective and Orthographic, with no label, next to the other view controls.

## Select

- [Select-001: Single select](./select/Select-001.md) — A labelled field whose outlined trigger shows the chosen value and a chevron and opens a list of single-choice rows.
- [Select-002: Column filter select](./select/Select-002.md) — The Search by option field of a table column menu: a select that filters the column to one of its known values.
- [Select-003: Multiple select](./select/Select-003.md) — The field select with the `multiple` prop: the trigger lists every chosen option and the list stays open while rows are toggled.
- [Select-004: Configuration country select](./select/Select-004.md) — A select in the App Configuration panel whose trigger and rows lead with an icon (the country flag), written as a field with the label above.
- [Select-005: Licence gate country select](./select/Select-005.md) — The country select of the licence gate: the same flag-led trigger and rows, with a check on the chosen row.
- [Select-006: Grouped options](./select/Select-006.md) — A select whose rows are split into labelled groups: a heading above each run of related options.
- [Select-007: Options with images](./select/Select-007.md) — A field select whose rows lead with a picture of the option in a tonal tile, so the user picks by sight.
- [Select-008: Cell select](./select/Select-008.md) — A compact label-less select that fills a table cell and picks one value for the row.
- [Select-009: Status filter](./select/Select-009.md) — A label-less select in the output toolbar that narrows the results by status.

## Spinner

- [Spinner-001: Small pane spinner](./spinner/Spinner-001.md) — A small default-colour spinner centred in a pane while its results load.
- [Spinner-002: Large info spinner](./spinner/Spinner-002.md) — An extra-large info spinner above a message, for a job that holds the user in a dialog.

## Switch

- [Switch-001: Switch at row end](./switch/Switch-001.md) — A switch at the end of a row, with the row's name at the start, turns the setting the row names on or off.
- [Switch-002: Switch with label](./switch/Switch-002.md) — A switch with its own text beside it that turns one option on or off.
- [Switch-003: Switch with bordered off state](./switch/Switch-003.md) — A switch at the end of a form row, with the row's name at the start, turns the setting on or off; its off state is a white track with a thin border.

## Table

- [Table-001: Results grid](./table/Table-001.md) — The results table of the Output pane: a framed all-cells grid with a raised sortable header, the first column pinned and left-aligned, and the other columns centred.
- [Table-002: Selectable rows](./table/Table-002.md) — A radio in the first cell selects one row of a results table; the selected row is marked by the row surface and an edge bar.
- [Table-003: Calculation summary table](./table/Table-003.md) — A short table of a few labelled rows under a raised header band: the calculation summary and the limit state ratios of a result.
- [Table-004: Data preview table](./table/Table-004.md) — A small table that previews the imported data before the user confirms: Field, Value and Status columns under a raised header row.
- [Table-005: Check details table](./table/Table-005.md) — A header-less table of check messages inside an expanded result row: a status Chip and the message of each failed or warning check.
- [Table-006: Dense print table](./table/Table-006.md) — The paper copy of a table: a flat all-cells grid with no sorting or selection, printed in the report.
- [Table-007: Job tally totals row](./table/Table-007.md) — A Table.Foot row under the body that totals the columns above it in a results table, kept in view while the body scrolls.
- [Table-008: Print table totals row](./table/Table-008.md) — A bold Table.Foot row that totals the columns of a table in the printed report.
- [Table-009: Cell input table](./table/Table-009.md) — A table whose cells hold inputs: each spacing value is edited in its own number field.

## Tabs

- [Tabs-001: Pane tabs](./tabs/Tabs-001.md) — A row of 28px tab chips in the header of a pane switches the pane between its views (Summary and Result, Output and Job List); the selected chip is filled.
- [Tabs-002: Phone workspace tabs](./tabs/Tabs-002.md) — The one top-level switch of a phone workspace: a full-width row of tab chips at the top, one tab per pane with short labels on one line.
- [Tabs-003: Tabs with status icon](./tabs/Tabs-003.md) — Tabs that each lead with a pass or fail icon, so the tab strip is also the summary of which checks passed.
- [Tabs-004: Design tab rail](./tabs/Tabs-004.md) — A rail of closable tab chips, one per open design, ending in an add button, with an error dot on a tab whose design has a problem.

## Toast

- [Toast-001: Status toast](./toast/Toast-001.md) — A short message that appears at the top end of the work area after an action and leaves by itself: a severity icon, a title, a description and a close X.

## ToggleGroup

- [ToggleGroup-001: Labelled segments](./toggle-group/ToggleGroup-001.md) — A labelled row of full-width segments where exactly one option is on, the chosen one a solid secondary segment.
- [ToggleGroup-002: Hugging segments](./toggle-group/ToggleGroup-002.md) — Two segments sized to their labels with no outline of their own, switching the field they sit above.

## Tooltip

- [Tooltip-001: Icon button tooltip](./tooltip/Tooltip-001.md) — An icon-only button shows what it does in a small tooltip on hover or keyboard focus.
- [Tooltip-002: Text button tooltip](./tooltip/Tooltip-002.md) — Hovering or focusing a link, cell or mark opens a tooltip that holds a larger image instead of text.
- [Tooltip-003: Card button tooltip](./tooltip/Tooltip-003.md) — A selection card or an image button explains itself in a text tooltip.
- [Tooltip-004: Radio option tooltip](./tooltip/Tooltip-004.md) — A radio option of a group, with its label beside it, shows a short note about the option in a small tooltip on hover or keyboard focus.
- [Tooltip-005: Disabled control tooltip](./tooltip/Tooltip-005.md) — A control that cannot be used shows why in a tooltip on its wrapper.
