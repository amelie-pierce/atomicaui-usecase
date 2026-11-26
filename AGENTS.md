# Agent notes

Project knowledge lives in `_vaults/atomicaui-usecase-prototype/wiki/index.md`; read it first.

Use case detail pages are selection-based (one option control, `options` in `usecase.ts`); load the `usecase-builder` skill before changing a use case.

Agent-facing AtomicAUI use case references are generated in `docs/usecases/`; update their gallery sources and run `npm run docs:usecases`.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
