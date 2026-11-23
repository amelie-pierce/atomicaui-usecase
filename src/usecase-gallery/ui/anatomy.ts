import type { AnatomyPart, Usecase } from '../types';

const marker = (name: string) => `[class~="aui-${name}"]`;
const child = (parent: string, part: string) => `${marker(parent)} > ${marker(part)}`;
const descendant = (parent: string, part: string) => `${marker(parent)} ${marker(part)}`;

const DEFAULT_ANATOMY: Record<string, AnatomyPart[]> = {
  Accordion: [
    { id: 'item', name: 'Item', token: 'Accordion.Item', selector: marker('accordion-item'), description: 'The collapsible row that owns one section.' },
    { id: 'trigger', name: 'Trigger', token: 'Accordion.Trigger', selector: marker('accordion-trigger'), description: 'The button that opens or closes the section.' },
    { id: 'trigger-label', name: 'Label', token: 'Accordion.Trigger', selector: marker('accordion-trigger-content'), description: 'The trigger content that names the section.' },
    { id: 'trigger-icon', name: 'Icon', token: 'Accordion.Icon', selector: `${marker('accordion-trigger-content')} ${marker('contained-icon')}`, description: 'The optional leading icon inside the trigger label.' },
    { id: 'chevron', name: 'Chevron', token: 'Accordion.Chevron', selector: child('accordion-trigger', 'accordion-chevron'), description: 'The optional disclosure icon that indicates the section state.' },
    { id: 'panel', name: 'Panel', token: 'Accordion.Panel', selector: marker('accordion-panel'), description: 'The region containing the section content.' },
  ],
  Button: [
    { id: 'container', name: 'Container', token: 'Button', selector: marker('button'), description: 'The interactive surface that performs the action.' },
    { id: 'icon', name: 'Icon', token: 'Button.Icon', selector: `${marker('button')} > :is(${marker('contained-icon')}, ${marker('icon')})`, description: 'The optional icon rendered inside the button.' },
    { id: 'label', name: 'Label', token: 'Button', selector: marker('button'), text: true, description: 'The visible text that names the action.' },
    { id: 'spinner', name: 'Spinner', token: 'Button.Spinner', selector: child('button', 'spinner'), description: 'The optional loading indicator inside the button.' },
  ],
  Card: [
    { id: 'card', name: 'Card', token: 'Card', selector: marker('card'), description: 'The surface that groups the content.' },
    { id: 'image-container', name: 'Image container', token: 'Card.ImageContainer', selector: marker('card-image-container'), description: 'The media wrapper that owns the image area.' },
    { id: 'image', name: 'Image', token: 'Card.Image', selector: marker('card-image'), description: 'The image or placeholder shown in the card.' },
    { id: 'body', name: 'Body', token: 'Card.Body', selector: marker('card-body'), description: 'The content area inside the card.' },
    { id: 'header', name: 'Header', token: 'Card.Header', selector: marker('card-header'), description: 'The header layout for title, description and action.' },
    { id: 'title', name: 'Title', token: 'Card.Title', selector: marker('card-title'), description: 'The primary heading inside the card.' },
    { id: 'description', name: 'Description', token: 'Card.Description', selector: marker('card-description'), description: 'The supporting copy inside the card.' },
    { id: 'action', name: 'Action', token: 'Card.Action', selector: marker('card-action'), description: 'The optional header action slot.' },
  ],
  Checkbox: [
    { id: 'control', name: 'Control', token: 'Checkbox', selector: marker('checkbox'), description: 'The checkable control and its visual state.' },
    { id: 'indicator', name: 'Indicator', token: 'Checkbox.Indicator', selector: marker('checkbox-indicator'), description: 'The box that displays the checked or mixed state.' },
    { id: 'icon', name: 'Icon', token: 'Checkbox.Icon', selector: `${marker('checkbox-indicator')} ${marker('contained-icon')}`, description: 'The mark shown inside the indicator.' },
    { id: 'label', name: 'Label', token: 'Checkbox.Label', selector: `${marker('control-row')} > ${marker('label')}`, description: 'The optional caption associated with the control.' },
  ],
  Dialog: [
    { id: 'overlay', name: 'Overlay', token: 'Dialog.Backdrop', selector: marker('dialog-backdrop'), description: 'The scrim that separates the open dialog from the app behind it.' },
    { id: 'popup', name: 'Popup', token: 'Dialog.Popup', selector: marker('dialog-popup'), description: 'The dialog surface that traps focus.' },
    { id: 'title', name: 'Title', token: 'Dialog.Title', selector: marker('dialog-title'), description: 'The accessible name of the dialog.' },
    { id: 'close', name: 'Close', token: 'Dialog.Close', selector: marker('dialog-close'), description: 'The optional control that dismisses the dialog.' },
    { id: 'description', name: 'Description', token: 'Dialog.Description', selector: marker('dialog-description'), description: 'The optional summary of the dialog.' },
    { id: 'body', name: 'Body / content', token: 'Dialog.Body', selector: `${marker('dialog-body')}, ${marker('dialog-popup')} > ${marker('view')}`, description: 'The content region that holds this use case’s actual dialog body, including custom content when the UI does not use Dialog.Body.' },
    { id: 'actions', name: 'Actions', token: 'Dialog.Actions', selector: marker('dialog-actions'), description: 'The footer region for dialog actions.' },
    { id: 'action-buttons', name: 'Action buttons', token: 'Dialog.Button', selector: `${marker('dialog-actions')} ${marker('dialog-button')}, ${marker('dialog-actions')} ${marker('button')}`, description: 'The concrete buttons rendered in this dialog footer.' },
  ],
  Field: [
    { id: 'field', name: 'Field', token: 'Field', selector: marker('field'), description: 'The field wrapper that connects label, control and messages.' },
    { id: 'label', name: 'Label', token: 'Field.Label', selector: marker('field-label'), description: 'The visible label for the control.' },
    { id: 'control', name: 'Control', token: 'Field.Control', selector: marker('field-control'), description: 'The input control owned by the field.' },
    { id: 'description', name: 'Description', token: 'Field.Description', selector: marker('field-description'), description: 'The optional supporting guidance for the field.' },
    { id: 'error', name: 'Error', token: 'Field.Error', selector: marker('field-error'), description: 'The optional validation message for the field.' },
  ],
  Input: [{ id: 'input', name: 'Input', token: 'Input', selector: marker('input'), description: 'The editable single-line control.' }],
  Radio: [
    { id: 'control', name: 'Control', token: 'Radio', selector: marker('radio'), description: 'The selectable radio control.' },
    { id: 'indicator', name: 'Indicator', token: 'Radio.Indicator', selector: marker('radio-indicator'), description: 'The circle that displays the selected state.' },
    { id: 'label', name: 'Label', token: 'Radio.Label', selector: `${marker('control-row')} > ${marker('label')}`, description: 'The optional caption associated with the control.' },
  ],
  Switch: [
    { id: 'control', name: 'Control', token: 'Switch', selector: marker('switch'), description: 'The toggle control and its state.' },
    { id: 'thumb', name: 'Thumb', token: 'Switch.Thumb', selector: marker('switch-thumb'), description: 'The movable thumb that indicates the toggle state.' },
    { id: 'label', name: 'Label', token: 'Switch.Label', selector: `${marker('control-row')} > ${marker('label')}`, description: 'The optional caption associated with the control.' },
  ],
  Tabs: [
    { id: 'tabs', name: 'Tabs', token: 'Tabs', selector: marker('tabs'), description: 'The tabs root that coordinates the tab list and panels.' },
    { id: 'list', name: 'List', token: 'Tabs.List', selector: marker('tabs-list'), description: 'The row that groups the tab triggers.' },
    { id: 'tab', name: 'Tab', token: 'Tabs.Tab', selector: marker('tabs-tab'), description: 'A trigger that selects one tab panel.' },
    { id: 'icon', name: 'Icon', token: 'Tabs.Icon', selector: `${marker('tabs-tab')} > ${marker('contained-icon')}`, description: 'The optional icon inside a tab trigger.' },
    { id: 'content', name: 'Content', token: 'Tabs.TabContent', selector: descendant('tabs-tab', 'tabs-content'), description: 'The label slot inside a tab trigger.' },
    { id: 'close', name: 'Close', token: 'Tabs.CloseButton', selector: marker('tabs-close-button'), description: 'The optional close action inside a tab.' },
    { id: 'add', name: 'Add', token: 'Tabs.AddButton', selector: marker('tabs-add-button'), description: 'The optional action for adding a tab.' },
    { id: 'panel', name: 'Panel', token: 'Tabs.Panel', selector: marker('tabs-panel'), description: 'The content region for the selected tab.' },
  ],
  ToggleGroup: [
    { id: 'group', name: 'Group', token: 'ToggleGroup', selector: marker('toggle-group'), description: 'The group that coordinates the toggle items.' },
    { id: 'item', name: 'Item', token: 'ToggleGroup.Item', selector: `${marker('toggle-group')} > button`, description: 'An individual option in the toggle group.' },
  ],
};

const EXTRA_ANATOMY: Record<string, AnatomyPart[]> = {
  CardGroup: [
    { id: 'group', name: 'Group', token: 'CardGroup', selector: marker('card-group'), description: 'The collection surface for the cards shown in this use case.' },
    { id: 'toolbar', name: 'Toolbar', token: 'CardGroup.Toolbar', selector: marker('card-group-toolbar'), description: 'The controls that filter or change this card collection.' },
    { id: 'items', name: 'Items', token: 'CardGroup.Items', selector: marker('card-group-items'), description: 'The layout region containing the rendered card items.' },
    { id: 'item', name: 'Item', token: 'CardGroup.Item', selector: marker('card-group-item'), description: 'One selectable card item in this collection.' },
  ],
  Chip: [
    { id: 'chip', name: 'Chip', token: 'Chip', selector: marker('chip'), description: 'The compact status or label surface shown for this use case.' },
    { id: 'icon', name: 'Icon', token: 'Chip.Icon', selector: marker('chip-icon'), description: 'The optional leading icon that qualifies the chip.' },
    { id: 'label', name: 'Label', token: 'Chip.Label', selector: marker('chip-label'), text: true, description: 'The visible chip text for this use case.' },
    { id: 'dismiss', name: 'Dismiss', token: 'Chip.Dismiss', selector: marker('chip-dismiss'), description: 'The optional control that removes this chip.' },
  ],
  Combobox: [
    { id: 'input', name: 'Input', token: 'Combobox.Input', selector: marker('combobox-input'), description: 'The query field used to search or edit the selected value.' },
    { id: 'value', name: 'Value', token: 'Combobox.Value', selector: marker('combobox-value'), description: 'The selected value displayed in the trigger.' },
    { id: 'popup', name: 'Popup', token: 'Combobox.Popup', selector: marker('combobox-popup'), description: 'The open result surface for this use case.' },
    { id: 'list', name: 'List', token: 'Combobox.List', selector: marker('combobox-list'), description: 'The result list presented by the combobox.' },
    { id: 'item', name: 'Item', token: 'Combobox.Item', selector: marker('combobox-item'), description: 'A selectable result in this list.' },
  ],
  ContextMenu: [
    { id: 'trigger', name: 'Trigger', token: 'ContextMenu.Trigger', selector: '[data-popup-open]', description: 'The content area that opens this menu on the context-menu gesture.' },
    { id: 'popup', name: 'Popup', token: 'ContextMenu.Popup', selector: marker('dropdown-popup'), description: 'The contextual action surface shown for this use case.' },
    { id: 'item', name: 'Item', token: 'ContextMenu.Item', selector: marker('dropdown-item'), description: 'An action row in the contextual menu.' },
  ],
  Drawer: [
    { id: 'overlay', name: 'Overlay', token: 'Drawer.Backdrop', selector: marker('drawer-backdrop'), description: 'The scrim behind the open drawer.' },
    { id: 'popup', name: 'Popup', token: 'Drawer.Popup', selector: marker('drawer-popup'), description: 'The drawer surface that contains this navigation or action set.' },
    { id: 'title', name: 'Title', token: 'Drawer.Title', selector: marker('drawer-title'), description: 'The accessible heading for this drawer.' },
    { id: 'close', name: 'Close', token: 'Drawer.Close', selector: marker('drawer-close'), description: 'The control that dismisses this drawer.' },
    { id: 'content', name: 'Content', token: 'Drawer.Content', selector: marker('drawer-content'), description: 'The scrollable content region inside this drawer.' },
  ],
  Dropdown: [
    { id: 'trigger', name: 'Trigger', token: 'Dropdown.Trigger', selector: marker('dropdown-trigger'), description: 'The control that opens this use case’s menu.' },
    { id: 'popup', name: 'Popup', token: 'Dropdown.Popup', selector: marker('dropdown-popup'), description: 'The menu surface shown after opening the trigger.' },
    { id: 'item', name: 'Item', token: 'Dropdown.Item', selector: marker('dropdown-item'), description: 'A selectable action row in the menu.' },
    { id: 'separator', name: 'Separator', token: 'Dropdown.Separator', selector: marker('dropdown-separator'), description: 'The divider between action groups, when present.' },
  ],
  FileUpload: [
    { id: 'upload', name: 'Upload surface', token: 'FileUpload', selector: marker('file-upload'), description: 'The file drop surface rendered for this upload flow.' },
    { id: 'dropzone', name: 'Dropzone', token: 'FileUpload.Dropzone', selector: marker('file-upload-dropzone'), description: 'The upload target that accepts the files shown in this use case.' },
    { id: 'icon', name: 'Icon', token: 'FileUpload.Icon', selector: marker('file-upload-icon'), description: 'The upload affordance icon inside the dropzone.' },
    { id: 'label', name: 'Label', token: 'FileUpload.Label', selector: marker('file-upload-label'), text: true, description: 'The instruction that tells the user what can be uploaded.' },
    { id: 'body', name: 'Body', token: 'FileUpload.Body', selector: marker('file-upload-body'), description: 'The content area for file rows and upload status.' },
    { id: 'row', name: 'File row', token: 'FileUpload.Row', selector: marker('file-upload-row'), description: 'The rendered file entry and its progress or action state.' },
    { id: 'action', name: 'Browse action', token: 'FileUpload.Action', selector: marker('file-upload-action'), description: 'The action that opens the file picker in this upload flow.' },
  ],
  Menubar: [
    { id: 'menubar', name: 'Menubar', token: 'Menubar', selector: marker('menubar'), description: 'The navigation bar that groups this use case’s menu triggers.' },
    { id: 'trigger', name: 'Trigger', token: 'Menubar.Trigger', selector: marker('menubar-trigger'), description: 'The visible menu trigger for this action.' },
    { id: 'divider', name: 'Divider', token: 'Menubar.Divider', selector: marker('menubar-divider'), description: 'The separator that groups related triggers.' },
  ],
  Panels: [
    { id: 'panels', name: 'Panels', token: 'Panels', selector: marker('panels'), description: 'The split layout that arranges this use case’s panels.' },
    { id: 'panel', name: 'Panel', token: 'Panels.Panel', selector: marker('panels-panel'), description: 'One resizable or collapsible region in this layout.' },
    { id: 'trigger', name: 'Trigger', token: 'Panels.Trigger', selector: marker('panels-trigger'), description: 'The control that changes this panel layout.' },
    { id: 'resize-handle', name: 'Resize handle', token: 'Panels.ResizeHandle', selector: marker('panels-resize-handle'), description: 'The handle that changes the split between panels.' },
  ],
  Popover: [
    { id: 'trigger', name: 'Trigger', token: 'Popover.Trigger', selector: '[data-base-ui-click-trigger]', description: 'The control that anchors this use case’s popover.' },
    { id: 'popup', name: 'Popup', token: 'Popover.Popup', selector: '[data-aui-popup-motion][role="dialog"]', description: 'The floating surface containing this use case’s content.' },
  ],
  Select: [
    { id: 'trigger', name: 'Trigger', token: 'Select.Trigger', selector: marker('select-trigger'), description: 'The field control that opens the available choices.' },
    { id: 'value', name: 'Value', token: 'Select.Value', selector: marker('select-value'), text: true, description: 'The selected option displayed in the field.' },
    { id: 'popup', name: 'Popup', token: 'Select.Popup', selector: marker('select-popup'), description: 'The option surface shown when this select is open.' },
    { id: 'item', name: 'Item', token: 'Select.Item', selector: marker('select-item'), description: 'A selectable option in this list.' },
  ],
  Spinner: [
    { id: 'spinner', name: 'Spinner', token: 'Spinner', selector: marker('spinner'), description: 'The progress indicator shown while this use case is working.' },
    { id: 'ring', name: 'Ring', token: 'Spinner.Ring', selector: marker('spinner-ring'), description: 'The animated ring that communicates indeterminate progress.' },
  ],
  Table: [
    { id: 'table', name: 'Table', token: 'Table', selector: marker('table'), description: 'The data grid that presents this use case’s records.' },
    { id: 'head', name: 'Header', token: 'Table.Head', selector: marker('table-head'), description: 'The column heading region for this table.' },
    { id: 'header-cell', name: 'Header cell', token: 'Table.HeaderCell', selector: marker('table-header-cell'), description: 'A labeled column heading, including its sort or action affordance.' },
    { id: 'body', name: 'Body', token: 'Table.Body', selector: marker('table-body'), description: 'The rows containing this use case’s data.' },
    { id: 'row', name: 'Row', token: 'Table.Row', selector: marker('table-row'), description: 'One record row rendered by this table.' },
    { id: 'cell', name: 'Cell', token: 'Table.Cell', selector: marker('table-cell'), description: 'A value or control within the rendered row.' },
  ],
  Toast: [
    { id: 'toast', name: 'Toast', token: 'Toast', selector: marker('toast'), description: 'The transient notification surface shown for this use case.' },
    { id: 'icon', name: 'Icon', token: 'Toast.Icon', selector: marker('toast-icon'), description: 'The status icon that matches this notification’s type.' },
    { id: 'content', name: 'Content', token: 'Toast.Content', selector: marker('toast-content'), description: 'The title and description copy for this notification.' },
    { id: 'title', name: 'Title', token: 'Toast.Title', selector: marker('toast-title'), text: true, description: 'The concise notification heading.' },
    { id: 'description', name: 'Description', token: 'Toast.Description', selector: marker('toast-description'), description: 'The supporting notification detail.' },
    { id: 'close', name: 'Close', token: 'Toast.Close', selector: marker('toast-close'), description: 'The control that dismisses this notification.' },
  ],
  Tooltip: [
    { id: 'trigger', name: 'Trigger', token: 'Tooltip.Trigger', selector: marker('tooltip-trigger'), description: 'The control or target that owns this tooltip.' },
    { id: 'popup', name: 'Popup', token: 'Tooltip.Popup', selector: marker('tooltip-popup'), description: 'The explanatory surface shown for the target.' },
  ],
};

const fallback = (componentId: string): AnatomyPart[] => [{
  id: 'root',
  name: componentId,
  token: componentId,
  selector: marker(componentId.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).replace(/^-/, '')),
  description: `The ${componentId} component shown in the preview.`,
}];

/** Resolve authored anatomy first, then the marker-backed defaults for the vendored kit. */
export function anatomyFor(usecase: Usecase): AnatomyPart[] {
  const parts = usecase.anatomy?.length ? usecase.anatomy : DEFAULT_ANATOMY[usecase.componentId] ?? EXTRA_ANATOMY[usecase.componentId] ?? fallback(usecase.componentId);
  return parts.map((part) => ({
    ...part,
    description: `${part.description} In ${usecase.title}, it appears in ${usecase.summary.toLowerCase()}`,
  }));
}

