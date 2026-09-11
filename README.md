# The Canonical Shelf

The Canonical Shelf is an offline-capable Bible reader, Bible-literacy trainer, and guided adult introduction to Christianity. It is designed for someone beginning with little or no prior Bible knowledge while retaining enough historical, literary, and theological depth to support serious continued study.

This branch contains the **v4 curriculum redesign integrated into the full application shell**. `public/index.html` still provides the established shelf, Practice, Explore, Verses, book reader, and local Bible search; the v4 loader now replaces the old learner-facing Learn surface with **Course** and adds **Topics** alongside those existing tools. `public/v4-integrated-preview.html` remains as a standalone QA surface for testing Course + Topics independently of the older application chrome.

## v4 learning architecture

The redesign is one connected curriculum rather than a guided course plus detached legacy skill tracks:

- **25 learner-facing units**
- **70 guided lessons**
- **69 integrated mastery activities** preserving every requirement from the original seven-track plan
- **139 total course activities**
- **70 lesson-specific instructional visuals** plus purpose-built mastery visuals
- **45 curated Topics guides** for doctrine, Christian life, difficult questions, and reference
- integrated completion, review, attempt, and unit/course progress
- untimed understanding checks with retries and contextual feedback
- offline precaching of the complete integrated v4 runtime and full-shell bridge

Guided lessons and mastery activities are interleaved inside the same unit path. A learner encounters explanation, Scripture, visual orientation, vocabulary, reflection, and an understanding check, then applies related Bible-literacy skills where they naturally belong. Mastery is therefore part of the curriculum rather than a second course hidden behind a “skill lab.”

### 25-unit sequence

1. **Start Here** — Christianity, Jesus, the course, and responsible learning
2. **How to Read a Bible** — references, context, translation, manuscripts, and canon
3. **The Bible as a Library** — the 66-book shelf, groups, genres, and navigation
4. **The Story in One View** — the whole biblical arc and its major hinge events
5. **Beginnings** — creation, humanity, rupture, mortality, and first promises
6. **Abraham to Exodus** — patriarchs, covenant, Egypt, Moses, and liberation
7. **Torah and Wilderness** — law, holiness, covenant life, testing, and formation
8. **Land and Judges** — conquest, settlement, Judges, Ruth, violence, and cycles
9. **Kings and Temple** — Samuel, Saul, David, Solomon, monarchy, and temple
10. **Division and Prophets** — the divided kingdoms, injustice, warning, and Assyria
11. **Exile and Return** — Babylon, 586 BC, exile, Persia, return, and rebuilding
12. **Poetry and Wisdom** — Job, Psalms, Proverbs, Ecclesiastes, and Song of Songs
13. **The Prophetic Library** — Major and Minor Prophets, chronology, and prophetic reading
14. **Jesus and the Gospels** — four Gospel portraits, Jewish context, kingdom, and discipleship
15. **Cross and Salvation** — atonement, grace, repentance, faith, resurrection, and reconciliation
16. **Acts and the Early Church** — Pentecost, mission, inclusion, conflict, and communal discernment
17. **Paul and His Letters** — Paul, audiences, letter order, theology, and community practice
18. **General Letters** — Hebrews and the General Epistles in their community settings
19. **Christian Doctrine** — Trinity, incarnation, Spirit, providence, freedom, and responsibility
20. **Christian Practice** — prayer, baptism, Communion, formation, ethics, and neighbor-love
21. **Christian Traditions** — authority, sacraments, polity, ecumenism, and denominational differences
22. **Difficult Questions** — suffering, harmful readings, inclusion, difficult ethical texts, and religious difference
23. **Resurrection, Judgment, and New Creation** — final hope, apocalyptic literature, judgment, and interpretive limits
24. **Themes Across Scripture** — canonical threads traced across books without flattening local context
25. **Independent Mastery** — book profiles, chronology, verse context, interpretation, and whole-canon synthesis

The 70 guided lessons are deliberately distributed across these units rather than forced into identical sizes. Each unit currently contains **1–5 guided lessons**, allowing dense subjects to breathe without padding narrower subjects with unrelated material.

## Original learning plan — preserved and rebuilt

The original seven Bible-learning modes are now competency dimensions within the v4 course. All **69 original requirements** remain present exactly once, but their teaching, visuals, and checks have been rewritten to match the newer curriculum.

| Competency | Requirements | Intended learning |
|---|---:|---|
| **The Story** | 10 | The biblical arc in ten major movements and the books that carry it |
| **Order** | 17 | Groups, testaments, and ultimately the complete 66-book shelf |
| **Groups** | 12 | The nine shelf groups plus how literary form affects reading |
| **Chronology** | 7 | Shelf position, narrated setting, historical sequence, composition, and confidence levels |
| **Content** | 8 | Book movement, people, openings, attribution, and audiences |
| **Themes** | 7 | Major threads traced across books without reducing context to keyword matching |
| **Verses** | 8 | Theme, speaker, recipient, context, and reconstruction |

The mastery modules use stable original IDs for coverage/audit purposes, but the learner sees them as subject-appropriate activities inside the 25-unit sequence. End-to-end synthesis remains the final cross-dimensional goal.

## Guided lesson design

A typical v4 guided lesson contains:

- a clear learning objective and complete primary reading;
- substantive explanation plus a plain-language restatement;
- vocabulary and a deeper interpretive layer;
- a **lesson-specific visual** chosen for what it needs to teach—timeline, flow, comparison, shelf, story arc, relationship map, theme thread, verse-context model, book profile, spectrum, interpretive stack, or schematic map;
- optional private reflection and a model response;
- an initial understanding check and a different return-review challenge where available.

The challenge system uses sequencing, matching, evidence classification, context reconstruction, argument mapping, scenarios, comparisons, verse rebuilding, timeline sorting, and capstone identification. Correct answers lock against accidental mutation; retries are free; hints appear only when authored; completion and later reviews are tracked separately.

The application assesses a learner's use of evidence and concepts, **not personal theological assent**.

## Topics reference

The v4 Topics library currently contains **45 curated plain-English reference articles** covering doctrine, Scripture, Christian practice, ethics, difficult questions, and common life concerns. Topics are separate from course completion: they are a searchable reference layer a learner can consult when a question arises. Opened Topics are retained as lightweight recent-reference history without becoming scored course work.

## Editorial and theological framework

The curriculum is explicitly LGBTQ-affirming and open-table, with strong influence from Metropolitan Community Churches and the Christian Church (Disciples of Christ). It engages historic Christian doctrine substantively, explains major disagreements in terms adherents would recognize, and does not require assent in order to participate.

Approved teaching commitments include:

- Scripture is inspired and authoritative, interpreted through literary form, historical context, textual evidence, and the life and teaching of Jesus; inerrancy is not required.
- Jesus Christ's willing sacrifice and resurrection are necessary to salvation. Biblical atonement language includes sin-bearing, reconciliation, sacrifice, substitution, and victory over sin and death; penal substitution is accommodated without being made the exclusive mechanism.
- Salvation is God's gift of grace, received through repentance and trust in Christ rather than purchased by moral performance; loving conduct follows grace.
- Historic Trinitarian and incarnational teaching is taught clearly: one God in three persons; Jesus fully divine and fully human.
- Baptism is spiritually and socially significant without being declared necessary for salvation in this guide.
- Communion is an open table: all are welcome, always. Differing Christian accounts of Christ's presence are explained fairly.
- Human freedom is meaningful; wrongdoing is possible without evil becoming God's desire. Providence and human responsibility are held together without treating foreknowledge and causation as synonyms.
- Genesis is read according to genre and ancient context; the course does not require young-earth creationism and distinguishes inherited mortality/brokenness from inherited personal guilt.
- Christianity's Jewish roots are integral. Collective Jewish blame for Jesus' death and simplistic claims that God abandoned the Jewish people are rejected.
- LGBTQ dignity, relationships, marriage, leadership, and equal participation are explicit editorial commitments. Opposing readings can be explained accurately without putting a learner's dignity up for debate.
- Difficult texts involving conquest, slavery, women, suffering, judgment, miracles, Satan/demons, and final destiny are addressed directly with interpretive boundaries rather than hidden or sensationalized.
- Bodily resurrection and renewed creation anchor final hope; detailed end-times systems remain disputed interpretations.

Personal speculative beliefs discussed during development are not silently promoted to course doctrine. See [`public/docs/curriculum.md`](public/docs/curriculum.md) for the fuller framework.

## Full application surfaces

The redesign branch now presents these surfaces in one application shell:

- **Practice:** the established optional drills/free play.
- **Explore:** complete biblical text navigation by book and chapter.
- **Course:** the v4 25-unit, 139-activity integrated curriculum mounted into the former Learn route.
- **Topics:** the v4 searchable plain-English reference desk.
- **Verses:** the established curated passage/reference surface.
- **Global Bible search:** local search against `public/corpus.txt`, including references/ranges and complete verse text; search continues routing to the Bible/Verses result surface rather than Topics.

`v4-integrated-preview.html` remains useful as an isolated Course + Topics QA surface, but it is no longer the only way to enter v4 on this branch.

The installation uses the Berean Standard Bible corpus and a 66-book Protestant shelf. The curriculum explicitly teaches that Catholic and Orthodox canons differ and that this shelf arrangement is not the only Christian canon organization.

## Development

```sh
npm ci
npm test
npm run test:v4
npm run docs
```

- `npm test` runs the baseline foundations/interactions/expansion tests **and** the complete v4 verification suite.
- `npm run test:v4` runs the v4 architecture, mastery, migration, visual, game, progress, Topics, loader, full-shell integration, standalone preview, accessibility, and offline-cache checks directly.
- `npm run docs` regenerates the legacy/source unit documents used during curriculum development.

To serve the repository locally:

```sh
python -m http.server 8000 --directory public
```

Open `/` for the integrated full application. Open `/v4-integrated-preview.html` only when you want the isolated Course + Topics QA surface.

## Offline behavior

`public/sw.js` uses cache version `canon-v4-redesign-4`. It precaches the complete local runtime required by the full application and v4 integration—including the 70-lesson migration layer, mastery content, Topics corpus, visuals, games, progress model, full-shell bridge, and styles. The existing application and standalone v4 preview both register the service worker. Runtime caching ignores failed/opaque responses, and navigation retains separate cached fallbacks for the full application and standalone preview.

## Cloudflare deployment

`wrangler.jsonc` uses Cloudflare Workers Static Assets with `public/` bound as `ASSETS`. `worker.js` is intentionally minimal and delegates requests directly to the static asset binding. On this redesign branch the v4 loader mounts Course + Topics into the existing `public/index.html` shell at runtime, preserving the established reader/search/Practice/Verses surfaces while keeping the standalone preview available for focused QA.

The repository should not contain generated `node_modules/`, `.wrangler/`, or local Wrangler account-cache files. Install dependencies during development/build instead.

## Verification status and remaining work

Automated v4 verification currently protects:

- all 70 guided lesson IDs and their 25-unit placement;
- all 69 original mastery requirements exactly once;
- substantive authored copy for every mastery module;
- all 70 purpose-built guided visuals and their actual migration priority;
- challenge renderers, answer locking, hints, retries, feedback, and keyboard/focus behavior;
- guided completion/review persistence and mastery attempt accounting;
- integrated course navigation and progress semantics;
- 45 Topics entries plus reference-history/focus integration;
- accessibility hooks for focus, progress, live feedback, reduced motion, high contrast, and forced colors;
- full-shell integration preserving Practice, Explore, Verses, and global Bible-search routing;
- standalone preview and loader ordering;
- complete offline runtime precaching.

The major structural/product integration work is therefore implemented on this branch. Remaining release gates are principally **human and editorial validation**: complete real screen-reader, keyboard, high-contrast, touch/mobile, and cross-browser testing; perform novice-learner usability testing; conduct a source-by-source scholarly review of contested authorship/dating/audience claims and the 66-book profiles; add human/peer feedback around the independent study project; and run final manual regression checks of Explore/Search/Practice/Verses in the integrated shell before merging to production.

See [`public/docs/course-review.md`](public/docs/course-review.md) for the evolving curriculum-quality audit.
