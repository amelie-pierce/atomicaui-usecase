import type { ComponentType, ReactNode } from 'react';
import type { AppKey } from './apps';

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
}

/** One In context case of a use case: one scene, shared by every app of its group. */
export interface UsecaseCaseDoc {
  /** Names the scene file `scenes/<id>.tsx`; by convention `<first app>-<type>`. */
  id: string;
  /** The place of use the scene shows (Reset confirm dialog, Walkthrough card, ...). Cases with the same name are the same place, one per group of apps. */
  name: string;
  /**
   * The apps that share this exact UI (keys of `apps.ts`, all listed in the use case's `apps`). Within one name the
   * groups never overlap. Omit when the scene is the same in every app of the use case.
   */
  apps?: AppKey[];
  /** The look of the control in this group when it differs from another group of the same action (`Secondary solid`, `Dark solid`); shown in the Document row and above the preview. Omit the use case `look` when every case states one. */
  look?: string;
  /** Plain text shown below the scene: a property of this UI (label above or beside, a unit weight, ...). Never a toggle value. */
  note?: string;
  /** The source file of this scene per app of the group; overrides the use case's `source` for these apps. */
  source?: Partial<Record<AppKey, string>>;
}

/** Written once per use case in `usecases/<component>/<UseCaseId>/usecase.ts`. */
export interface UsecaseDoc {
  /** The UI type this use case belongs to: one of the component's `uiTypes`. Use cases with the same type share a tree group. */
  uiType: string;
  /**
   * The name of the use case, shown beside the id in the tree. One use case is one business action, so the title names
   * the action (`Download CSV button`, `Reset confirm dialog`). A component not yet converted still names its variant here
   * (`Secondary solid`).
   */
  title: string;
  /** The look of the control or dialog that performs the action (`Secondary solid`, `Text with leading icon`): a property, never a tree level. Shown in the Document and above the preview. Omit it when every case states its own `look`. */
  look?: string;
  /**
   * The place of use of the one default In context (`contexts/<area-slug>.tsx`), for a use case without `cases`.
   * Omit it when `cases` list the places: the scenes replace the area context.
   */
  area?: string;
  /** One sentence: what this use case shows. */
  summary: string;
  /** Where in a product this pattern appears. */
  where: string;
  /** When to choose it, and when not to. */
  when: string;
  /** How to use it: the props and rules that matter. */
  how: string;
  /**
   * Keys of the apps (see `apps.ts`) that use this pattern. When cases name their `apps`, the list must equal the
   * union of those groups: the catalog throws for an app no case shows or a case app that is not listed.
   */
  apps: AppKey[];
  /** Optional: the area's context places this example elsewhere (for example `close`, the card corner); uses `contexts/<area-slug>-<variant>.tsx`. */
  contextVariant?: string;
  /**
   * Optional: the places of use of this use case (for a converted component, places of the one action, such as a row kind
   * or a state; for an unconverted one, the dialogs that hold a single button). Each id names a file
   * `scenes/<id>.tsx` in the use case folder; the preview shows a radio group of the place names and renders the chosen
   * scene instead of the area context. Cases that share a `name` are the UI variants of one type, one per group of apps
   * (see `UsecaseCaseDoc`); with two or more variants the preview adds a toggle of the groups under the radio group.
   */
  cases?: UsecaseCaseDoc[];
  /**
   * Optional: the source design each app's In context scenes were built from, per app key (for HCS, the file in the
   * hcs-design-prototype repo). A case's own `source` overrides it for that scene.
   */
  source?: Partial<Record<AppKey, string>>;
}

/** The props of a context component: the example to place inside the real area. */
export interface ContextProps {
  children: ReactNode;
  /** The preview stage; portaled parts (a Dialog's popup) render here so they stay static inside the card. */
  host: HTMLElement;
}

/** What the centre preview shows: the lone component, or the component inside the area that holds it. */
export type PreviewMode = 'component' | 'context';

/** What the right pane shows: the documentation or the copyable code. */
export type DetailMode = 'document' | 'code';

/** One resolved In context case: its scene and the snippet with the example placed inside it. */
export interface UsecaseCase {
  id: string;
  name: string;
  /** The apps that share this UI: the group of the case, or every app of the use case when the case sets none. */
  apps: AppKey[];
  /** The group toggle text: the app labels joined by a comma. */
  label: string;
  /** The look of this group, when the case states one. */
  look?: string;
  /** The property note shown below the scene, when the case has one. */
  note?: string;
  Scene: ComponentType<ContextProps>;
  loadCode: () => Promise<string>;
}

/**
 * One look of a use case: the same business action drawn another way (`Dark solid` beside the default `Secondary solid`).
 * Derived from the `look` of the cases; the first look is the use case's own `example.tsx`, every other one has
 * `looks/<look-slug>.tsx` in the use case folder. The preview shows a select of the looks.
 */
export interface UsecaseLook {
  name: string;
  /** The apps whose cases draw this look. */
  apps: AppKey[];
  Example: ComponentType;
  loadCode: () => Promise<string>;
}

export interface Usecase extends Omit<UsecaseDoc, 'cases'> {
  /** `<ComponentId>-<NNN>`; also the URL hash. */
  id: string;
  componentId: string;
  /** The rendered example. Loaded on demand, so wrap it in `<Suspense>`. */
  Example: ComponentType;
  /** Resolves to the copyable snippet, derived from the same `example.tsx` that renders. */
  loadCode: () => Promise<string>;
  /** The real area that holds the example (`contexts/<area>.tsx`); absent when the kit cannot compose it. */
  Context?: ComponentType<ContextProps>;
  /** Resolves to the snippet with the example placed inside the context's JSX; present with `Context`. */
  loadContextCode?: () => Promise<string>;
  /** The In context cases from `scenes/`; they take the place of `Context` when present. */
  cases?: UsecaseCase[];
  /** The looks of the action when its cases state two or more; the preview shows a select, and `apps`, the cases and the example follow the chosen one. */
  looks?: UsecaseLook[];
}

/** The use cases of one component that share a UI type. */
export interface UiTypeGroup {
  title: string;
  usecases: Usecase[];
}

export interface ComponentGroup extends ComponentMeta {
  uiTypeGroups: UiTypeGroup[];
}
