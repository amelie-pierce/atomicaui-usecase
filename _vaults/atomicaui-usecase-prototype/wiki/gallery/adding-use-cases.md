---
title: Adding use cases
description: How the gallery registry works and how to add a use case or component.
date: 2026-11-13
---

# Adding use cases

- Every use case is one `define({...})` entry in `USE_CASES` (`src/usecases/registry.tsx:30`). The entry holds an `element`; the preview renders that element and the displayed code is generated from it by `elementToJsx` (`src/usecases/serialize-jsx.ts`), so the two cannot drift.
- A new component needs only entries with a new `component` name; the sidebar groups by that name (`COMPONENT_NAMES`, `src/usecases/registry.tsx`, `src/App.tsx`).
- Selection is the URL hash equal to the use case id (`#Button-001`); an unknown hash falls back to the first entry (`src/App.tsx`).
- The serializer handles strings, booleans, numbers, plain objects and nested elements as props or children; arrow functions are not supported (UNVERIFIED beyond that).
- `vite.config.ts` enables `@vitejs/plugin-react`; without it JSX compiles with the classic transform and the page fails at runtime with "React is not defined" even though `npm run build` passes.
- Button props: only `aui` (`color`, `paint`, `scale`, `shape`), native `disabled`, and `Button.Icon` / `Button.Spinner` parts (`src/vendor/atomic-aui/lib/button/button.tsx`). There is no `loading` prop.
