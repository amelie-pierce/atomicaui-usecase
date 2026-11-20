---
title: atomicaui-usecase-prototype wiki
description: Entry point for the use case gallery prototype built on the vendored AtomicAUI components.
date: 2026-11-13
---

# atomicaui-usecase-prototype

A Vite + React page that lists AtomicAUI components and their use cases (`Button-002`, ...), one per business action, each with a description, a live preview and copyable code. Source: `src/`; the feature is the self-contained `src/usecase-gallery/`.

## Operating mode

Notes are compiled just in time, file-cited, and every note is registered in this index. Unverified facts are marked `UNVERIFIED`.

## Authority order

Live code (`src/usecase-gallery/`, `src/App.tsx`), then the vendored library at `src/vendor/atomic-aui` (read-only, never edit), then these notes.

## Taxonomy

| Folder | Holds |
| --- | --- |
| [gallery](gallery/index.md) | How the use case gallery is built and how to add use cases |
