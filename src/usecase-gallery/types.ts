import type { ComponentType, ReactNode } from 'react';
import type { AppKey } from './apps';

export type PreviewMode = 'component' | 'context';
export type DocumentMode = 'document' | 'layers';

/** One layer in the interactive build lesson, authored beside the use case anatomy. */
export interface LayerStep {
  id: string;
  /** Anatomy part id this layer reveals. Context layer ids can be namespaced independently. */
  partId?: string;
  title: string;
  explanation: string;
  keyIdea: string;
  selector?: string;
  /** JSX tags (e.g. `Dialog.Popup`) that write the target in the option views of this step, for elements whose class or marker is not in the code. */
  code?: string[];
  /** The step adds nothing to the code beyond the step before it, so its highlight may repeat. */
  unchanged?: boolean;
  /** Reveal the target's direct text as its own layer. */
  text?: boolean;
  /** Component layers target the selected example; context layers target the whole scene. */
  scope?: 'component' | 'context';
}

/** Written once per component in `usecases/<component>/<component>.meta.ts`. */
export interface ComponentMeta {
  /** Id prefix shared by every use case of the component, e.g. `Button` for `Button-013`. */
  id: string;
  /** Name shown in the tree. */
  title: string;
  /**
   * The UI types of the component in tree order, the middle level of the tree (`Single button`, `Button group`, ...).
   * A type is a UI told apart by its rendered look and code, never by where it is used. Every use case names one of
   * them in `uiType`, and every listed type has at least one use case.
   */
  uiTypes: string[];
  /**
   * Id of the component this one is shown inside (`Dialog` for AlertDialog). The component gets no card of its own: its UI
   * types become sections of the parent's page and tree entry, and its use cases keep their ids (`AlertDialog-001`).
   */
  parent?: string;
}

/**
 * One option of a use case: one UI to view, chosen from a single control at the top of the detail page. The Component UI
 * and the In context UI below the control, plus the complete document, all follow the chosen option.
 */
export interface UsecaseOptionDoc {
  /** Names the folder `options/<id>/` holding `scene.tsx` (the In context UI) and, after the first option, `example.tsx` (the Component UI). */
  id: string;
  /** The label of the option in the control (`White button with icon`, `Disabled button`). */
  name: string;
  /** The apps that draw this exact UI (keys of `apps.ts`, all listed in the use case's `apps`). */
  apps?: AppKey[];
  /** Plain text shown below the In context UI when this UI needs a specific measured note. */
  note?: string;
  /** Whether this option adds real surrounding app UI worth showing in the In context view. Defaults to true. */
  showContext?: boolean;
  /** Parts added by this option's scene; component anatomy is included automatically in the In context view. */
  contextAnatomy?: AnatomyPart[];
  /** Extra lesson layers that this option's In context scene adds. */
  contextLayers: LayerStep[];
  /** View-specific documentation for the scene. Omitted fields share the use case's general prose. */
  contextDocument?: Partial<UsecaseViewDoc>;
  /** Component-view overrides for options whose control, anatomy or explanation differs. */
  componentAnatomy?: Array<Pick<AnatomyPart, 'id'> & Partial<Omit<AnatomyPart, 'id'>>>;
  componentLayers?: LayerStep[];
  componentDocument?: Partial<UsecaseViewDoc>;
  /** The source file of the scene per app of the option; overrides the use case's `source` for these apps. */
  source?: Partial<Record<AppKey, string>>;
}

/** A documented component part and the preview selector it is linked to. */
export interface AnatomyPart {
  id: string;
  name: string;
  description: string;
  /** In context, component anatomy is measured inside the selected example and context anatomy around it. */
  scope?: 'component' | 'context';
  /** A selector scoped to the preview stage. Omit when the example uses data-ug-part. */
  selector?: string;
  /** Highlight only the direct text of the selected element, measured without touching the DOM. */
  text?: boolean;
}

export interface AccessibilityDoc {
  keyboard?: string;
  focus?: string;
}

export interface ApiProp {
  name: string;
  type: string;
  description?: string;
  required?: boolean;
  defaultValue?: string;
}

export interface RelatedComponent {
  label: string;
  href: string;
}

/** Prose and reference sections that describe one rendered view of a use case. */
export interface UsecaseViewDoc {
  summary: string;
  where: string;
  when: string;
  how: string;
  usage?: string;
  behavior?: string;
  variants?: string;
  accessibility?: AccessibilityDoc;
  prompt?: string;
  debugPrompt?: string;
  api?: { props?: ApiProp[] };
  related?: RelatedComponent[];
}

/** Written once per use case in `usecases/<component>/<UseCaseId>/usecase.ts`. */
export interface UsecaseDoc {
  /** The UI type this use case belongs to: one of the component's `uiTypes`. Use cases with the same type share a tree group. */
  uiType: string;
  /**
   * The name of the use case, shown beside the id in the tree. One use case is one business action, so the title names
   * the action (`Download CSV button`, `Reset confirm dialog`).
   */
  title: string;
  /** One sentence: what this use case shows. */
  summary: string;
  /** Where in a product this pattern appears. */
  where: string;
  /** When to choose it, and when not to. */
  when: string;
  /** How to use it: the props and rules that matter. */
  how: string;
  /** Optional component-facing detail content; absent sections stay out of the document. */
  aliases?: string[];
  anatomy: AnatomyPart[];
  /** Component build order, from its outer wrapper to its detailed contents. */
  layers: LayerStep[];
  usage?: string;
  behavior?: string;
  variants?: string;
  accessibility?: AccessibilityDoc;
  prompt?: string;
  debugPrompt?: string;
  api?: { props?: ApiProp[] };
  related?: RelatedComponent[];
  /**
   * Keys of the apps (see `apps.ts`) that use this pattern. The list must equal the union of the options' apps.
   */
  apps: AppKey[];
  /**
   * The selection-based detail page. Every UI of the action (each look and state, enabled or disabled) is one option of one
   * list; the page shows one control at the top, and below it the selected view and its matching document. The first
   * option's example is `example.tsx`; every other option has `options/<id>/example.tsx`, and every option has
   * `options/<id>/scene.tsx`.
   */
  options: UsecaseOptionDoc[];
  /**
   * Optional: the source design each app's In context scene was built from, per app key (for HCS, the file in the
   * hcs-design-prototype repo). An option's own `source` overrides it for that scene.
   */
  source?: Partial<Record<AppKey, string>>;
}

/** The props of a context component: the example to place inside the real area. */
export interface ContextProps {
  children: ReactNode;
  /** The preview stage; portaled parts (a Dialog's popup) render here so they stay static inside the card. */
  host: HTMLElement;
}

/** One resolved option: its Component UI, In context UI and the code of both. */
export interface UsecaseOption {
  id: string;
  name: string;
  apps: AppKey[];
  label: string;
  note?: string;
  showContext: boolean;
  contextAnatomy: AnatomyPart[];
  contextLayers: LayerStep[];
  contextDocument?: Partial<UsecaseViewDoc>;
  componentAnatomy?: Array<Pick<AnatomyPart, 'id'> & Partial<Omit<AnatomyPart, 'id'>>>;
  componentLayers?: LayerStep[];
  componentDocument?: Partial<UsecaseViewDoc>;
  Scene: ComponentType<ContextProps>;
  Example: ComponentType;
  loadExampleCode: () => Promise<string>;
  loadCode: () => Promise<string>;
}

export interface Usecase extends UsecaseDoc {
  /** `<ComponentId>-<NNN>`; also the URL hash. */
  id: string;
  componentId: string;
  layers: LayerStep[];
  /** The rendered example. Loaded on demand, so wrap it in `<Suspense>`. */
  Example: ComponentType;
  /** Resolves to the copyable snippet, derived from the same `example.tsx` that renders. */
  loadCode: () => Promise<string>;
  options: UsecaseOption[];
}

/** The use cases of one component that share a UI type. */
export interface UiTypeGroup {
  title: string;
  usecases: Usecase[];
}

export interface ComponentGroup extends ComponentMeta {
  uiTypeGroups: UiTypeGroup[];
  /** The tree may show this component's only same-named UI type as direct use-case children. */
  flattenUiTypeGroup?: boolean;
}
