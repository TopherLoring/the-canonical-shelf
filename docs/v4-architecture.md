# Canonical Shelf v4 — curriculum and interaction architecture

## Product direction

v4 is the primary learner-facing curriculum inside the existing Canonical Shelf application shell. It is not a second course layered beside the older Learn experience.

The full app keeps the established **Practice, Explore, Verses, Bible reader, translation controls, shelf navigation, and local Bible search**. The old learner-facing Learn surface is replaced at runtime by **Course**, and **Topics** is added as a separate reference surface.

### Core principles

- The learner-facing course is organized by subject and learning sequence, not by the seven legacy track names.
- The original 69 Bible-literacy requirements remain individually traceable and testable through stable legacy IDs.
- Guided theological learning and applied Bible-literacy mastery appear in one course path.
- Purpose-built visuals carry instructional information rather than decoration.
- Understanding checks use interaction patterns matched to the cognitive task.
- Explanations lead in plain English while Scripture, context, interpretive boundaries, and disagreement remain available at deeper layers.
- The application remains offline-capable and requires no external image/CDN dependency for core learning.
- Course completion measures learning activity, not personal theological assent.

## Course shape: 25 units

The course contains **70 guided lessons + 69 integrated mastery activities = 139 total course activities**.

The 69 original requirements are distributed by subject fit rather than by an arbitrary equal-per-unit quota. Guided lesson counts likewise follow the material; a unit can contain 1–5 guided lessons.

1. Start Here
2. How to Read a Bible
3. The Bible as a Library
4. The Story in One View
5. Beginnings
6. Abraham to Exodus
7. Torah and Wilderness
8. Land and Judges
9. Kings and Temple
10. Division and Prophets
11. Exile and Return
12. Poetry and Wisdom
13. The Prophetic Library
14. Jesus and the Gospels
15. Cross and Salvation
16. Acts and the Early Church
17. Paul and His Letters
18. General Letters
19. Christian Doctrine
20. Christian Practice
21. Christian Traditions
22. Difficult Questions
23. Resurrection, Judgment, and New Creation
24. Themes Across Scripture
25. Independent Mastery

The authoritative scope and detailed unit distribution are documented in `public/docs/curriculum.md` and `public/docs/course-review.md`.

## Source curriculum and migration model

The repository still builds the 70-lesson source curriculum from the existing Foundations data and expansion files. That source layer remains useful for preservation tests and content provenance, but it is no longer the learner-facing unit structure.

Runtime flow:

1. `public/index.html` initializes the established application and Foundations base.
2. `public/foundations-expansion-loader.js` builds the complete 70-lesson source curriculum and 69 preserved skill missions.
3. v4 migration files map those lessons and mastery requirements into the 25-unit learner-facing model.
4. the v4 shell bridge mounts Course into the existing Learn panel and keeps the established application chrome intact.
5. Topics joins the same shell as a reference tab.

The standalone `public/v4-integrated-preview.html` is retained only as a QA surface for exercising Course + Topics independently of the older application chrome. It is not a competing product runtime.

## Learning object model

A learner sees:

**Course → Unit → Activity**

Activities are either guided lessons or mastery activities and are interleaved in subject order.

A guided lesson can contain:

- opening orientation and objective
- complete primary reading
- substantive explanation
- plain-English restatement
- purpose-built instructional visual
- vocabulary
- historical/literary context
- interpretive boundary or disagreement panel
- deeper inquiry
- optional private reflection and model response
- initial understanding check
- later review challenge

A mastery activity contains:

- stable internal legacy ID
- learner-facing title and objective
- requirement-specific teaching copy
- plain-English summary
- vocabulary/deeper context where useful
- purpose-built visual
- understanding check matched to the skill
- persistent attempt/completion state

## Visual grammar

All instructional visuals are native HTML/CSS/SVG and must retain accessible textual equivalents.

Supported visual types include:

- `shelf`
- `timeline`
- `story-arc`
- `relationship`
- `compare`
- `flow`
- `theme-thread`
- `map-lite`
- `book-profile`
- `verse-context`
- `spectrum`
- `stack`

Every one of the 70 guided lessons has an explicit authored visual definition. Mastery activities also use requirement-specific visuals where the visual improves understanding.

## Understanding-game system

The v4 interaction layer uses reusable boards matched to different learning tasks, including:

- timeline sorting
- shelf/order reconstruction
- sequencing
- matching
- evidence classification
- context reconstruction
- argument mapping
- compare boards
- scenarios
- verse rebuilding
- book identification
- theme tracing
- capstone synthesis

Interaction requirements:

- untimed by default
- retries without penalty
- correct answers lock against accidental mutation
- hints appear only when useful and authored
- explanatory feedback rather than bare right/wrong state
- keyboard-operable controls
- focus restoration after rerenders
- live feedback semantics
- reduced-motion support
- high-contrast/forced-colors support
- no fake currency or reward systems that obscure learning progress

## Progress model

v4 tracks guided completion, later reviews, mastery completion, and mastery attempts separately.

Completion is written to persistent v4 progress. Returning to a completed guided lesson can use review material without erasing first-completion state. Course and unit progress are derived from actual activity completion rather than the old detached-track presentation.

Topics history is lightweight reference history and does not count toward course completion.

## Topics / reference surface

Topics is a first-class tab separate from Course, Practice, Explore, and Verses.

It provides:

- natural-language search over curated entries
- doctrine and theology
- Christian practice
- life questions
- difficult/contested questions
- glossary material
- related-topic navigation
- supporting biblical references

Topics leads with a direct explanation and exposes disagreement/context where relevant. It is intentionally curated and offline rather than presented as generative AI.

## Full-shell integration

The production-shaped branch runtime is the existing `public/index.html` shell plus the v4 loader/bridge.

The integration contract is:

- Practice remains functional.
- Explore and the complete Bible reader remain functional.
- Verses and translation switching remain functional.
- global Bible search continues to route to verse results.
- Course replaces the old learner-facing Learn rendering.
- Topics is added without stealing the existing routes.
- the shelf, book drawer, and existing navigation remain available.

Automated shell-integration tests protect this contract.

## Offline architecture

`public/sw.js` precaches the active full-shell and standalone-QA dependencies, including the source curriculum, v4 migration/runtime files, Topics corpus, styles, and shell bridge.

The service worker:

- uses a versioned `canon-v4-redesign-*` cache;
- removes older Canonical Shelf caches on activation;
- does not runtime-cache failed or opaque responses;
- preserves navigation fallbacks for both `index.html` and the integrated QA preview.

Superseded preview loaders and the old 23-unit prototype runtime are intentionally not retained.

## Verification gates

Automated repository verification currently checks:

1. all 70 guided lesson IDs and their 25-unit placement;
2. all 69 original mastery requirements exactly once;
3. substantive authored mastery content;
4. explicit visual coverage for all guided lessons;
5. supported visual/game renderers;
6. answer locking, hints, retries, feedback, and focus behavior;
7. guided completion/review and mastery-attempt persistence;
8. Course/Topics full-shell routing without loss of Practice/Explore/Verses/search;
9. Topics corpus quality/coverage invariants;
10. offline dependency coverage;
11. preservation of the underlying reader/search application through the normal `npm test` command.

## Remaining release gates

The remaining release risks are primarily human/editorial rather than missing architecture:

- manual full-shell regression on the final build;
- VoiceOver/NVDA and keyboard-only testing;
- forced-colors/high-contrast, mobile/touch, and cross-browser review;
- novice-learner usability testing;
- systematic source/confidence review of disputed authorship, dating, audience, and chronology claims across all 66 book profiles;
- human/peer evaluation criteria for independent-study work.

These are documented in `public/docs/course-review.md` and should remain explicit rather than being hidden behind a technically green build.
