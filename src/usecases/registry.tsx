import { Button } from '../vendor/atomic-aui';
import type { ReactElement } from 'react';
import { elementToJsx } from './serialize-jsx';

export interface UseCaseDefinition {
  /** Unique id, `<Component>-<NNN>`; also the URL hash. */
  id: string;
  component: string;
  title: string;
  /** Where, when and how to use this use case. */
  description: string;
  /** The single source of truth: it is rendered as the preview and serialized as the code. */
  element: ReactElement;
}

export interface UseCase extends UseCaseDefinition {
  code: string;
}

const define = (definition: UseCaseDefinition): UseCase => ({
  ...definition,
  code: elementToJsx(definition.element),
});

export const USE_CASES: UseCase[] = [
  define({
    id: 'Button-001',
    component: 'Button',
    title: 'Primary action',
    description:
      'Use one solid primary Button for the main action of a form, card or page, such as "Save changes" or "Continue". Keep it to one per view so the next step is obvious.',
    element: <Button aui={{ color: 'primary', paint: 'solid' }}>Save changes</Button>,
  }),
  define({
    id: 'Button-002',
    component: 'Button',
    title: 'Secondary action',
    description:
      'Use a tonal Button next to a primary action for the less important choice, such as "Cancel" or "Back". The softer fill keeps it visible without competing with the primary action.',
    element: <Button aui={{ color: 'secondary', paint: 'tonal' }}>Cancel</Button>,
  }),
  define({
    id: 'Button-003',
    component: 'Button',
    title: 'Destructive action',
    description:
      'Use the error color for actions that delete or discard data, such as "Delete project". Pair it with a confirmation step and place it away from the primary action.',
    element: <Button aui={{ color: 'error', paint: 'solid' }}>Delete project</Button>,
  }),
  define({
    id: 'Button-004',
    component: 'Button',
    title: 'Disabled and loading',
    description:
      'Disable the Button while a request is in flight so it cannot be submitted twice, and show Button.Spinner next to the label. Set aria-busy yourself, as the Button has no loading prop.',
    element: (
      <Button aui={{ color: 'primary', paint: 'solid' }} disabled aria-busy>
        <Button.Spinner />
        Saving
      </Button>
    ),
  }),
];

export const COMPONENT_NAMES = Array.from(new Set(USE_CASES.map((u) => u.component)));
