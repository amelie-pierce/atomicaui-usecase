import type { AnatomyPart, Usecase } from '../types';

const marker = (name: string) => `[class~="aui-${name}"]`;

const DEFAULT_ANATOMY: Record<string, AnatomyPart[]> = {
  Accordion: [
    { id: 'item', name: 'Item', token: 'Accordion.Item', selector: marker('accordion-item'), description: 'The collapsible row that owns one section.' },
    { id: 'trigger', name: 'Trigger', token: 'Accordion.Trigger', selector: marker('accordion-trigger'), description: 'The button that opens or closes the section.' },
    { id: 'panel', name: 'Panel', token: 'Accordion.Panel', selector: marker('accordion-panel'), description: 'The region containing the section content.' },
  ],
  Button: [{ id: 'trigger', name: 'Trigger', token: 'Button', selector: marker('button'), description: 'The interactive control that performs the action.' }],
  Card: [
    { id: 'card', name: 'Card', token: 'Card', selector: marker('card'), description: 'The surface that groups the content.' },
    { id: 'body', name: 'Body', token: 'Card.Body', selector: marker('card-body'), description: 'The content area inside the card.' },
  ],
  Checkbox: [{ id: 'control', name: 'Control', token: 'Checkbox', selector: marker('checkbox'), description: 'The checkable control and its visual state.' }],
  Dialog: [
    { id: 'popup', name: 'Popup', token: 'Dialog.Popup', selector: marker('dialog-popup'), description: 'The dialog surface that traps focus.' },
    { id: 'title', name: 'Title', token: 'Dialog.Title', selector: marker('dialog-title'), description: 'The accessible name of the dialog.' },
    { id: 'body', name: 'Body', token: 'Dialog.Body', selector: marker('dialog-body'), description: 'The main dialog content region.' },
    { id: 'actions', name: 'Actions', token: 'Dialog.Actions', selector: marker('dialog-actions'), description: 'The footer region for dialog actions.' },
  ],
  Field: [
    { id: 'field', name: 'Field', token: 'Field', selector: marker('field'), description: 'The field wrapper that connects label, control and messages.' },
    { id: 'label', name: 'Label', token: 'Field.Label', selector: marker('field-label'), description: 'The visible label for the control.' },
    { id: 'control', name: 'Control', token: 'Field.Control', selector: marker('field-control'), description: 'The input control owned by the field.' },
  ],
  Input: [{ id: 'input', name: 'Input', token: 'Input', selector: marker('input'), description: 'The editable single-line control.' }],
  Radio: [{ id: 'control', name: 'Control', token: 'Radio', selector: marker('radio'), description: 'The selectable radio control.' }],
  Switch: [{ id: 'control', name: 'Control', token: 'Switch', selector: marker('switch'), description: 'The toggle control and its state.' }],
  Tabs: [
    { id: 'list', name: 'List', token: 'Tabs.List', selector: marker('tabs-list'), description: 'The row that groups the tab triggers.' },
    { id: 'tab', name: 'Tab', token: 'Tabs.Tab', selector: marker('tabs-tab'), description: 'A trigger that selects one tab panel.' },
    { id: 'panel', name: 'Panel', token: 'Tabs.Panel', selector: marker('tabs-panel'), description: 'The content region for the selected tab.' },
  ],
  ToggleGroup: [{ id: 'group', name: 'Group', token: 'ToggleGroup', selector: marker('toggle-group'), description: 'The group that coordinates the toggle items.' }],
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

