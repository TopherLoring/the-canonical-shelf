# Canonical Shelf v4 — curriculum review and original-scope audit

## Review outcome

The v4 redesign now uses **one 25-unit curriculum** containing **70 guided lessons plus 69 integrated mastery activities — 139 learning activities total**. Story, Order, Groups, Chronology, Content, Themes, and Verses are competency dimensions inside the same path rather than detached mini-courses.

The redesign intentionally abandoned the earlier requirement that every unit contain the same number of lessons. Topic boundaries now determine unit size: each unit contains **1–5 guided lessons**, and mastery work is placed by subject fit rather than an arbitrary quota. Total unit load ranges from 3–9 activities, with most units landing between 3 and 8.

The original seven-track scope is fully preserved. The important change is instructional form: all 69 original requirements have specific v4 teaching copy, a plain-language explanation, a purpose-built visual, and a redesigned understanding check. Guided lessons and applied mastery are interleaved in one learner-facing sequence.

## Original intended learning — preserved

| Original mode | Requirements | Required capability | v4 status |
|---|---:|---|---|
| **0 · The Story** | 10 | Follow the biblical arc in ten movements and identify the books carrying each stage | 10 authored mastery activities integrated into relevant story units |
| **1 · Order** | 17 | Learn group order, testament order, and ultimately all 66 books | 17 authored sequence/navigation activities distributed across library, testament, and synthesis units |
| **2 · Groups** | 12 | Learn nine shelf groups and how literary form affects reading | 12 authored group/genre activities integrated where those books are studied |
| **3 · Chronology** | 7 | Distinguish shelf order, narrated setting, historical sequence, and composition | 7 authored chronology activities with explicit confidence/uncertainty boundaries |
| **4 · Content** | 8 | Recognize book movement, casts, openings, attribution, and audiences | 8 authored content/profile activities |
| **5 · Themes** | 7 | Trace major canonical threads across books | 7 authored synthesis activities plus broader guided theme work |
| **6 · Verses** | 8 | Identify theme, speaker, recipient, context, and reconstruct wording | 8 authored verse-context/recall activities |

**Total preserved requirements: 69.** Stable original IDs remain in the data model for audit coverage, but the learner does not encounter a parallel “legacy tracks” curriculum.

## v4 25-unit structure

| Unit | Guided | Mastery | Total | Primary coverage |
|---|---:|---:|---:|---|
| 1. Start Here | 1 | 2 | 3 | central Christian story and first interpretive bearings |
| 2. How to Read a Bible | 5 | 4 | 9 | references, context, translation, textual evidence, application |
| 3. The Bible as a Library | 2 | 3 | 5 | shelf, groups, genre, navigation |
| 4. The Story in One View | 1 | 3 | 4 | whole-canon arc and historical orientation |
| 5. Beginnings | 4 | 2 | 6 | creation, freedom, rupture, mortality, care |
| 6. Abraham to Exodus | 3 | 3 | 6 | promise, patriarchs, Egypt, Moses, liberation |
| 7. Torah and Wilderness | 1 | 2 | 3 | law, holiness, covenant life, neighbor responsibility |
| 8. Land and Judges | 1 | 3 | 4 | land, conquest, Judges, difficult narrative |
| 9. Kings and Temple | 2 | 3 | 5 | monarchy, power, David/Solomon, accountability |
| 10. Division and Prophets | 3 | 4 | 7 | divided kingdoms, justice, warning, prophetic setting |
| 11. Exile and Return | 2 | 5 | 7 | Babylon, lament, exile, Persia, rebuilding |
| 12. Poetry and Wisdom | 5 | 3 | 8 | Psalms, Proverbs, Job, Ecclesiastes, Song of Songs |
| 13. The Prophetic Library | 1 | 4 | 5 | Major/Minor Prophets, shelf and chronology |
| 14. Jesus and the Gospels | 4 | 3 | 7 | Jewish setting, kingdom, discipleship, parables, Gospel comparison |
| 15. Cross and Salvation | 4 | 2 | 6 | cross, atonement images, grace, repentance, repair |
| 16. Acts and the Early Church | 2 | 3 | 5 | Pentecost, mission, inclusion, communal discernment |
| 17. Paul and His Letters | 1 | 5 | 6 | Pauline shelf, chronology, audiences, communities |
| 18. General Letters | 1 | 2 | 3 | non-Pauline letters and corrective community writing |
| 19. Christian Doctrine | 5 | 1 | 6 | Trinity, incarnation, Spirit, providence, freedom |
| 20. Christian Practice | 5 | 2 | 7 | baptism, Communion, prayer, formation, neighbor-love |
| 21. Christian Traditions | 4 | 2 | 6 | creeds, authority, ecumenism, denominational difference |
| 22. Difficult Questions | 5 | 0 | 5 | difficult ethics, inclusion, Jewish roots, suffering, spiritual discernment |
| 23. Resurrection, Judgment, and New Creation | 4 | 2 | 6 | bodily resurrection, judgment, apocalypse, renewed creation |
| 24. Themes Across Scripture | 1 | 2 | 3 | cross-book thematic reasoning |
| 25. Independent Mastery | 3 | 4 | 7 | whole-book observation, synthesis, profiles, end-to-end competence |

Unit 22 contains no inherited mastery requirement because none of the original 69 steps belongs there naturally. That is intentional: v4 no longer pads units merely to make counts symmetrical.

## Guided-lesson quality review

### What is now strong

**Layered explanation.** Guided lessons combine primary Scripture, substantive teaching, a simpler restatement, vocabulary, deeper inquiry, optional reflection, and model reflection. This gives a novice an accessible stopping point while keeping a path open for more serious study.

**Purpose-built visuals.** All **70 guided lessons now have explicit lesson-specific visual definitions** rather than receiving generic unit art. The visual vocabulary includes timelines, flows, comparisons, shelf diagrams, story arcs, relationship maps, theme threads, verse-context models, book profiles, interpretive spectrums/stacks, and schematic maps. A regression test verifies the 70 visual IDs exactly match the 70 lesson IDs and that the migration layer actually prioritizes the authored visuals.

**Active reasoning.** Checks use sequencing, matching, evidence classification, context reconstruction, argument mapping, scenarios, comparison, verse rebuilding, timeline ordering, and capstone identification. Correct answers lock so a completed board cannot be accidentally changed; hints appear only when authored; retries remain free.

**Transfer rather than assent.** A scored answer concerns evidence, contextual reasoning, or conceptual relationships. Learners are not asked to perform personal belief in order to complete the course.

**Review is distinct from first completion.** Finishing a guided lesson records completion. Returning to it uses review challenges where available and increments a separate review count. Mastery attempts are counted without double-counting a successful final submission.

**Navigation is now persistent.** Guided internal rerenders retain their route back to the owning unit. Completion returns the learner to the same interleaved unit path rather than dropping them into a detached track or losing context.

**Keyboard/focus behavior is materially improved.** Course/unit route headings receive focus after navigation; game rerenders attempt to restore focus to the changed control or feedback; feedback uses live status semantics; challenge/course/unit progress uses progressbar semantics. This is automated/interface hardening, not a substitute for real screen-reader testing.

## Original-information preservation check

The v4 rewrite still teaches the intended original content:

- the ten-movement Bible story;
- the 66-book Protestant shelf and group/testament order;
- nine shelf groups and genre-aware reading;
- shelf order versus narrated/historical/composition chronology;
- book movement, major people, openings, attribution, and audiences;
- major themes traced across more than one book;
- verse theme, speaker, recipient, contextual meaning, and reconstruction.

The newer curriculum adds rather than substitutes: contextual interpretation, textual criticism, Jewish setting, Christian doctrine, practices, denominational comparison, difficult ethical/theological questions, explicit inclusive commitments, visual orientation, and independent-study method.

## Topics and reference layer

The v4 Topics library currently contains **45 curated plain-English reference entries** spanning doctrine, Scripture, Christian life, ethics, difficult/contested questions, and common pastoral/life concerns. Topics are intentionally a reference surface rather than another completion track.

A searchable Topics layer is pedagogically useful because not every learner question should require another core course lesson. The remaining product opportunity is to connect Topics more intelligently to course context—for example, recently viewed references, contextual recommendations from a lesson, and a cross-course glossary.

## Offline and runtime review

The integrated v4 preview now registers the service worker directly. Cache version `canon-v4-redesign-2` precaches the complete local dependency graph required for Course and Topics, including all migration/data layers, visuals, games, mastery content, Topics content, and styles. A regression test extracts the preview's actual local `src`/`href` dependencies and fails if any are missing from the service-worker cache.

The service worker no longer runtime-caches failed or opaque responses and retains separate navigation fallbacks for the existing application and the v4 integrated preview.

## Automated verification

The v4 suite now protects the following invariants:

- 25 unique learner-facing units;
- all 70 guided lessons migrated exactly once, with no unit containing more than five guided lessons;
- all 69 original mastery IDs present exactly once;
- all 69 mastery modules fully authored with substantive copy, a visual, and an understanding check;
- all 70 guided lessons mapped to explicit authored visuals that are actually used;
- supported visual/game renderer coverage;
- challenge answer locking, useful-hint behavior, feedback semantics, and reduced-motion support;
- guided completion/review persistence and mastery attempt accounting;
- persistent unit navigation across guided rerenders;
- integrated Course/Topics preview wiring;
- 45 Topics entries with minimum content quality;
- loader order and runtime dependencies;
- complete offline precaching of the integrated preview.

The standard `npm test` command now runs the baseline application suites and the complete v4 verification suite so v4 cannot silently drift outside normal repository QA.

## Remaining gaps and recommended next improvements

### Highest priority before v4 replaces the production learning shell

1. **Integrate Course/Topics with the full application shell.** The v4 Course and Topics experience currently lives at `v4-integrated-preview.html`, while the existing `index.html` retains Explore/Search and the established reader. The next production step is one shell that exposes redesigned Course + Topics alongside Explore + Search without regressing reader/search behavior.
2. **Human accessibility testing.** Automated semantics and focus behavior are substantially improved, but actual VoiceOver/NVDA testing, high-contrast/forced-colors testing, touch testing, and browser/device coverage are still required.
3. **Novice learner usability testing.** Structural coverage does not prove that a person with little Bible knowledge understands the vocabulary, pacing, visual models, or transitions. Observe real first-time learners and record recurring hesitation, misconceptions, and abandonment points.
4. **66-book scholarly/source audit.** Existing content is useful for teaching, but disputed authorship, dating, audience, and chronology claims still need systematic source citations and visible confidence labels across all 66 book profiles.
5. **Human feedback on independent study.** Automated checks can validate method structure but cannot certify the quality of exegesis. Add a facilitator/peer rubric for claim, evidence, counterevidence, context, and application.

### Valuable next curriculum expansions

6. **Advanced transfer missions.** Add optional late-course exercises with multiple plausible readings, conflicting evidence, and fewer scaffolds so advanced learners must weigh competing explanations rather than recognize one clearly intended response.
7. **Second Temple/canon bridge.** Jewish context and differing Christian canons are introduced, but a dedicated historical bridge from Persian/Hellenistic Judaism through the first-century world would materially improve Gospel and New Testament literacy.
8. **Denominational comparison depth.** Add a concise matrix comparing authority, baptism, Communion, polity, inclusion, worship, and salvation emphases using each tradition's own sources.
9. **Difficult-text electives.** Conquest, slavery, women, sexuality, suffering, judgment, miracles, and spiritual evil can each support an optional deeper passage study without overloading the novice core.
10. **Cross-course glossary/reference linking.** Vocabulary exists inside lessons and Topics provides broader articles; a unified glossary with lesson-to-Topic links would make the app more useful after course completion.

## Release assessment

The v4 curriculum is no longer a 16-unit expansion with attached legacy exercises. It is a coherent **25-unit / 139-activity integrated course** with complete preservation of the original 69 skill requirements, explicit visual instruction across all 70 guided lessons, a substantial searchable Topics layer, persistent progress, redesigned challenge interaction, and an offline-capable integrated runtime.

The strongest remaining risks are no longer missing curriculum breadth or missing original content. They are **production-shell integration, human usability/accessibility validation, and scholarly source transparency**. Those should be treated as release gates before v4 replaces the existing learning interface.
