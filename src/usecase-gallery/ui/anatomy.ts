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
    { id: 'popup', name: 'Popup', token: 'Dialog.Popup', selector: marker('dialog-popup'), description: 'The dialog surface that traps focus.' },
    { id: 'title', name: 'Title', token: 'Dialog.Title', selector: marker('dialog-title'), description: 'The accessible name of the dialog.' },
    { id: 'close', name: 'Close', token: 'Dialog.Close', selector: marker('dialog-close'), description: 'The optional control that dismisses the dialog.' },
    { id: 'description', name: 'Description', token: 'Dialog.Description', selector: marker('dialog-description'), description: 'The optional summary of the dialog.' },
    { id: 'body', name: 'Body', token: 'Dialog.Body', selector: marker('dialog-body'), description: 'The main dialog content region.' },
    { id: 'actions', name: 'Actions', token: 'Dialog.Actions', selector: marker('dialog-actions'), description: 'The footer region for dialog actions.' },
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

const fallback = (componentId: string): AnatomyPart[] => [{
  id: 'root',
  name: componentId,
  token: componentId,
  selector: marker(componentId.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).replace(/^-/, '')),
  description: `The ${componentId} component shown in the preview.`,
}];

/** Resolve authored anatomy first, then the marker-backed defaults for the vendored kit. */
export function anatomyFor(usecase: Usecase): AnatomyPart[] {
  return usecase.anatomy?.length ? usecase.anatomy : DEFAULT_ANATOMY[usecase.componentId] ?? fallback(usecase.componentId);
}

