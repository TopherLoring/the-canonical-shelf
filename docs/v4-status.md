# Canonical Shelf v4 implementation status

## Complete in branch

- Dedicated `curriculum-v4-redesign` branch.
- 23-unit learner-facing architecture defined.
- Exact three-mastery-items-per-unit target defined (69 total; coverage test will enforce exact IDs).
- Shared native visual renderer created.
- Shared v4 visual/game design system created.
- Dedicated challenge-board renderer created.
- v4 course preview shell created.
- Topics/expert reference dataset and interface started.
- Topics tab preview integration created without modifying production `index.html`.
- v4 ordered loader created.
- First six mastery requirements fully rewritten as specific learner-facing modules.
- Architecture and content-progress tests added.

## In progress

- Correct and lock the exact 69-ID placement table.
- Rewrite remaining 63 mastery requirements.
- Reorganize 70 existing guided lessons into 23 units and rewrite transitions/headings where the old grouping shows through.
- Add visual specifications to every guided lesson where useful.
- Replace existing understanding-check presentation with v4 game boards.
- Expand Topics corpus across doctrine, life questions, practice, difficult questions, and glossary.
- Wire v4 loader into branch preview through the existing small expansion loader.

## Merge gates

v4 does not replace `main` until all architecture gates in `docs/v4-architecture.md` pass and the preview has been manually reviewed on desktop and narrow/mobile layouts.
