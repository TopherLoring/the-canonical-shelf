# Canonical Shelf v4 — curriculum and interaction architecture

## Product direction

v4 is a full curriculum and learning-experience redesign. It is not an additive overlay on the 16-unit curriculum.

### Core principles

- The learner-facing course is organized by subject and learning sequence, not by the seven legacy track names.
- The original 69 Bible-literacy requirements remain individually traceable and testable, but all user-facing copy is rewritten for flow, clarity, and context.
- Purpose-built visual teaching devices are part of the curriculum, not decoration.
- Understanding checks use dedicated interaction patterns rather than generic selects, checkboxes, and plain cards.
- Explanations lead in plain English. Scripture, source notes, historical detail, and denominational differences remain available as progressively deeper evidence.
- The app remains offline-capable and does not require external image/CDN dependencies.

## Course shape: 23 units

The 70 existing guided lessons are redistributed and expanded across 23 units. The 69 Bible-literacy modules are distributed at three per unit. This provides room for concepts to breathe while keeping the original skill coverage exact.

1. Start Here — Christianity, Jesus, and how this course works
2. How to Read a Bible — references, context, translation, canon
3. The Bible as a Library — shelf map, groups, genres, navigation
4. The Story in One View — whole-Bible arc and major hinges
5. Beginnings — creation, humanity, rupture, promise
6. Abraham to Exodus — family, covenant, slavery, liberation
7. Torah and Wilderness — law, holiness, testing, formation
8. Land and Judges — conquest, judges, difficult violence, cycles
9. Kings and Temple — Saul, David, Solomon, kingdom, worship
10. Division and Prophets — north/south, injustice, warning
11. Exile and Return — 722/586 BC, Babylon, Persia, rebuilding
12. Poetry and Wisdom — Job, Psalms, Proverbs, Ecclesiastes, Song
13. The Prophetic Library — major/minor prophets, chronology, reading strategy
14. Jesus and the Gospels — four portraits, Jewish context, kingdom
15. Cross, Resurrection, and Salvation — atonement, grace, repentance, hope
16. Acts and the Early Church — mission, conflict, inclusion, discernment
17. Paul and His Letters — letter order, audiences, theology, practice
18. General Letters and Revelation — catholic epistles, apocalypse, final hope
19. Christian Doctrine — Trinity, incarnation, Spirit, providence
20. Christian Practice — prayer, baptism, Communion, formation, ethics
21. Christians Disagree — traditions, authority, sacraments, difficult questions
22. Themes Across Scripture — fourteen canonical threads and comparison work
23. Independent Mastery — book profiles, chronology, verse context, whole-canon synthesis

## Learning object model

A learner sees three nested levels:

**Unit → Lesson → activity blocks**

A lesson can contain:

- opening orientation / question
- primary explanation
- purpose-built visual
- plain-English summary
- vocabulary chips
- historical / literary context panel
- interpretive boundary or disagreement panel
- optional primary-text evidence
- worked example
- understanding game
- reflection / transfer prompt
- linked mastery module(s)

The 69 original requirements become `masteryModules`, not detached courses. Each has a stable `legacyId` for coverage tests and a new learner-facing title, explanation, examples, visual specification, and assessment pattern.

## Visual grammar

All visuals are native HTML/CSS/SVG and must support keyboard navigation, high contrast, reduced motion, and narrow screens.

### Reusable visual types

- `shelf` — proportional 66-book shelf / group boundaries
- `timeline` — historical eras, anchor dates, before/after relationships
- `story-arc` — connected narrative beats with hinge events
- `relationship` — people / communities / correspondence relationships
- `compare` — side-by-side concepts, traditions, genres, or passages
- `flow` — observation → interpretation → application or causal sequences
- `theme-thread` — a concept recurring across books and eras
- `map-lite` — schematic geographic relationships without external tiles
- `book-profile` — book card with setting, purpose, people, audience, themes
- `verse-context` — speaker → recipient → situation → wording → application
- `spectrum` — distinguish positions without implying false equivalence
- `stack` — layers such as canon / translation / manuscript / interpretation

Every lesson should declare either a useful visual type or explicitly state `visual: null` with a reason. Visuals are not mandatory filler.

## Understanding-game system

The old generic challenge shell is replaced by a coherent game system with shared progress, feedback, and motion but different boards for different cognitive tasks.

### Game types

- `timeline-sort` — drag / keyboard-sort events on a horizontal timeline
- `shelf-build` — place books or groups into shelf slots
- `sequence-path` — arrange narrative / argument stages as connected cards
- `match-board` — visually connect two sets of concepts without native selects
- `evidence-lab` — sort claims into Supported / Possible / Overreach
- `context-lens` — identify speaker, recipient, setting, genre, and purpose
- `argument-map` — connect evidence → interpretation → application nodes
- `compare-board` — classify similarities / differences between two views or texts
- `scenario` — decision cards with consequence feedback
- `verse-rebuild` — reconstruct wording or conceptual structure in chunks
- `book-detective` — infer a book from synopsis, people, opening, audience, and era
- `theme-trace` — connect a theme through multiple canonical stops
- `capstone` — mixed-format multi-step synthesis

### Interaction quality requirements

- Dedicated full-width game board, not a form embedded in prose.
- Clear current objective and progress track.
- Large interactive tiles with hover/focus/selected/locked/correct/error states.
- Immediate explanatory feedback; wrong answers should teach rather than merely reject.
- Optional hint ladder (nudge → stronger hint → reveal), not one static hint.
- Retry without penalty.
- Keyboard alternative for any drag interaction.
- Reduced-motion mode.
- Completion animation is subtle and can be disabled.
- Avoid fake points/coins that do not support learning; progress is meaningful mastery coverage.

## Topics / expert reference surface

`Topics` is a first-class tab separate from Learn, Explore, Practice, and Verses.

It contains:

- natural-language Ask search against curated entries
- practical topics (“What does Christianity say about…?”)
- doctrine & theology
- glossary
- Christian disagreements / tradition comparison

Answers lead with a direct plain-English explanation. Supporting references, interpretive limits, and denominational differences follow as expandable evidence.

A future generative theologian assistant can retrieve from this vetted corpus. The static app must never expose a model API key and must not present generic model output as authoritative theology.

## Migration / testing gates

Before v4 can replace main:

1. 69/69 legacy requirements mapped exactly once.
2. All 69 user-facing modules rewritten; no generic track template copy remains.
3. 23 units exist and every lesson is assigned exactly once.
4. Every lesson has a valid visual declaration or explicit no-visual rationale.
5. Every challenge is renderable through the new game engine.
6. Keyboard and reduced-motion tests pass.
7. Topic search works offline.
8. Service-worker cache contains every required v4 asset.
9. No model keys, external image dependencies, or required network requests.
10. Existing Bible corpus / Explore / translation capabilities remain intact.
