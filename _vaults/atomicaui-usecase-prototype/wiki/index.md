---
title: atomicaui-usecase-prototype wiki
description: Entry point for the use case gallery prototype built on the vendored AtomicAUI components.
date: 2026-11-13
---

# atomicaui-usecase-prototype

A Vite + React page that lists AtomicAUI components and their use cases (`Button-001`, ...), each with a description, a live preview and copyable code. Source: `src/`.

## Operating mode

Notes are compiled just in time, file-cited, and every note is registered in this index. Unverified facts are marked `UNVERIFIED`.

## Authority order

Live code (`src/usecases/registry.tsx`, `src/App.tsx`), then the vendored library at `src/vendor/atomic-aui` (read-only, never edit), then these notes.

## Taxonomy

| Folder | Holds |
| --- | --- |
| [gallery](gallery/index.md) | How the use case gallery is built and how to add use cases |
