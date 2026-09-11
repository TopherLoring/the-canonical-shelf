# Canonical Shelf — Integrated Seven-Track Curriculum

This overlay rebuilds the original seven Bible-literacy tracks as **69 guided skill missions embedded in the 16-unit / 70-lesson curriculum**.

## What changed

- Preserved all original track coverage exactly: Story 10, Order 17, Groups 12, Chronology 7, Content 8, Themes 7, Verses 8.
- Extracted the original authored step objects into `public/foundations-skill-source.js` so the source material is explicit and testable.
- Rebuilt every step in `public/foundations-skill-curriculum.js` with the guided curriculum's instructional layers: objective, substantive explanation, plain-language explanation, vocabulary, deeper inquiry, reflection, and model response.
- Assigned every mission to a pedagogically relevant curriculum unit and then to a specific guided lesson. Each original step is embedded exactly once.
- Kept the existing drill engine as the mission mastery-check engine rather than duplicating assessment code.
- Replaced the detached-track presentation with contextual mission cards, competency progress, and return-to-owning-lesson behavior.
- Retained End-to-End as the final cross-dimensional mastery experience.
- Progress compatibility with pre-integration track state is not a design requirement for this rebuild.

## New production assets

- `public/foundations-skill-source.js`
- `public/foundations-skill-curriculum.js`
- `tests/integrated-skill-curriculum.test.cjs`

`worker.js`, `public/sw.js`, the expansion metadata/finalizer, curriculum docs, test suite, and documentation generator were updated to load and understand the integrated curriculum.

## Verification completed

- Exact semantic comparison against the original seven source arrays: **69/69 source step objects match**.
- JavaScript/CJS syntax validation: **pass**.
- Self-contained curriculum integrity test: **pass**.
- Assertions cover 69 unique missions, exact 10/17/12/7/8/7/8 track counts, one-and-only-one lesson placement, guided-style fields, preserved mastery checks, Worker load order, and service-worker cache inclusion.

Run the focused test after overlaying this package on the full repository:

```sh
npm run test:skills
```

Then run the complete repository suite:

```sh
npm ci
npm test
npm run docs
```

## Packaging note

This archive is an **overlay for the current Canonical Shelf repository**, based on the recovered curriculum-expansion package. It intentionally does not fabricate baseline files that were not present in that recovered package (`public/index.html`, `public/foundations-data.js`, `public/foundations.js`, `public/foundations.css`, `public/corpus.txt`, and the baseline test files). Apply it at repository root so its paths merge with those existing baseline files.
