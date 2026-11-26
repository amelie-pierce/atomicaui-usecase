# AtomicAUI use case kit upgrade report

- **Release:** 7.0.5 → 7.0.9.
- **Files:** 56 added, 13 changed, 0 removed under `src/vendor/atomic-aui`; `package.json` and `package-lock.json` updated.
- **New components:** AvatarGroup, Banner, AreaChart, BarChart, LineChart, PieChart, RadarChart (plus shared chart container/renderer), Pagination, Slider, and TreeView. Chart tokens were added.
- **Changed components:** Avatar now inherits group scale; Table improves composed single-selection and sortable-header keyboard behavior, and adjusts `Table.Footer` semantics for scroll modes; Toast action/close buttons inherit root paint; View.ScrollArea remounts its viewport when the scroll axis changes.
- **Breaking changes and upgrade fixes:** the release report lists no breaking changes and the upgrade applied no app-level breaking fixes. No component or token removals were reported.
- **Dependencies:** added `@tanstack/charts` `^1.5.0` and `d3-shape` `3.2.0`; the upgrade generated `package-lock.json`.
- **Gallery and docs impact:** no gallery or `docs/usecases/` files changed. Existing Table examples may show the updated selection and sort keyboard behavior, including Table-002 and sortable tables such as Button-035. Toast-001 may show root paint inherited by its actions. Tabs-002 uses the ScrollArea viewport fix. The newly added components do not yet have gallery use cases or generated docs.
- **Build:** `npm run build` passed on `nhutnt245/atomicaui-upgrade-7-0-9` (2,381 modules transformed; Vite emitted its large-chunk warning). The upgrade CLI could not build its separate review copy because the repository has no `pnpm-lock.yaml`; it also generated a package lock for npm.
