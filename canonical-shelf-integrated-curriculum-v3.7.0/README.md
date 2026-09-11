# The Canonical Shelf

The Canonical Shelf is an offline-capable Bible reader, Bible-literacy trainer, and guided adult introduction to Christianity. It is designed for someone beginning with little or no prior knowledge while retaining enough historical, literary, and theological depth to support serious continued study.

The deployed application is served from `public/`. Search runs directly against `public/corpus.txt` and returns complete Bible verses; Explore provides book-by-book and chapter-by-chapter access to the complete 66-book corpus.

## Learning architecture

The curriculum contains **16 units and 70 guided lessons**, with **4–5 distinct guided lessons in every unit**, plus **69 integrated Bible-skill missions** rebuilt from the original seven-track learning plan. The skill missions are distributed through the same units instead of living in a parallel legacy course.

The expanded path covers:

1. Orientation and the central Christian story
2. Reading Scripture: genre, context, translation, textual criticism, application, and Bible-navigation skills
3. Creation and humanity
4. Covenant and liberation
5. Land, kingdom, exile, and return
6. Prayer and wisdom literature
7. Prophets and justice
8. Jesus in his Jewish world and the Gospels
9. Cross, atonement, resurrection, grace, and repentance
10. The early Church and New Testament communities
11. Trinity, incarnation, Spirit, providence, and freedom
12. Baptism, Communion, prayer, and Christian formation
13. Creeds, authority, ecumenism, and Christian traditions
14. Difficult ethical texts, LGBTQ inclusion, Judaism/other religions, suffering, miracles, and spiritual discernment
15. Resurrection, judgment, apocalyptic literature, and renewed creation
16. Independent whole-book study, argument building, theme tracing, application, and revision

Guided understanding checks are gamified rather than simple Q&A. They use evidence boards, sequencing, multi-stage scenarios, matching, and directed argument maps. New lessons add 94 initial challenges and 94 return challenges; combined with the existing curriculum, the application contains **144 initial guided challenges and 130 return-review challenges**. Hints and retries are unlimited, missions are untimed, and the system assesses understanding rather than personal assent.

## Original learning plan — rebuilt and integrated

The original seven Bible-learning tracks now operate as competency dimensions across the single guided course. Every former track step is represented as an embedded skill mission with the same teach → understand → practice pattern as the newer curriculum. Mission completion remains measurable so theological exposure is not confused with Bible-navigation or recall mastery.

| Track | Steps | Intended learning |
|---|---:|---|
| **The Story** | 10 | The biblical arc in ten beats, checked against the books that carry it |
| **Order** | 17 | Group by group, then testament, then all 66 books |
| **Groups** | 12 | The nine shelf groups plus how to read the literary forms they contain |
| **Chronology** | 7 | Shelf order versus narrated setting and composition; disputed datings are treated as teaching models, not absolute facts |
| **Content** | 8 | Summaries, casts, openings, authorship information, and audiences |
| **Themes** | 7 | Fourteen threads traced across books; the expanded course adds fourteen paired-passage investigations |
| **Verses** | 8 | Theme, speaker, recipient, and verse reconstruction |

That is **69 integrated skill missions** inside the guided curriculum. The legacy drill engine remains available behind those missions, and End-to-End remains the final cross-dimensional mastery challenge.

See [`public/docs/course-review.md`](public/docs/course-review.md) for the full preservation audit, strengths, known gaps, and recommended next improvements.

## Editorial and theological framework

The curriculum is explicitly LGBTQ-affirming and open-table, with strong influence from Metropolitan Community Churches and the Christian Church (Disciples of Christ). It engages historic Christian doctrine substantively, explains major disagreements in recognizable terms, and does not require assent in order to participate.

Among the approved teaching commitments are:

- Scripture is inspired and authoritative, interpreted through literary form, historical context, textual evidence, and the life and teaching of Jesus; inerrancy is not required.
- Jesus Christ's willing sacrifice and resurrection are necessary to salvation. Biblical atonement language includes sin-bearing, reconciliation, sacrifice, substitution, and victory over sin and death; penal substitution is accommodated without being made the exclusive mechanism.
- Salvation is God's gift of grace, received through acknowledging sin and human inability to save ourselves, repentance, trust in Christ's saving work, and acceptance of the gift. Loving conduct follows grace rather than purchasing it.
- Historic Trinitarian and incarnational teaching is taught clearly: one God in three persons; Jesus fully divine and fully human.
- Baptism is spiritually and socially significant without being declared necessary for salvation in this guide.
- Communion is an open table: all are welcome, always. Differing Christian accounts of Christ's presence are explained fairly.
- Human freedom is meaningful; wrongdoing is possible without evil becoming God's desire. Providence and human responsibility are held together without treating foreknowledge and causation as synonyms.
- Genesis is read according to genre and ancient context; the curriculum does not require young-earth creationism. It distinguishes inherited mortality/brokenness from inherited personal guilt.
- Christianity's Jewish roots are integral. Collective Jewish blame for Jesus' death and simplistic claims that God abandoned the Jewish people are rejected.
- LGBTQ dignity, relationships, marriage, leadership, and equal participation are explicit editorial commitments. Opposing readings may be explained without putting a learner's dignity up for debate.
- Difficult texts involving conquest, slavery, women, suffering, judgment, miracles, Satan/demons, and final destiny are addressed directly with interpretive boundaries rather than hidden or sensationalized.
- Bodily resurrection and renewed creation anchor final hope; detailed end-times systems remain disputed interpretations.

Personal speculative beliefs discussed during curriculum development are not silently promoted to course doctrine. See [`public/docs/curriculum.md`](public/docs/curriculum.md) for the complete approved framework.

## Reading and practice

- **Learn:** 70 guided lessons with 69 embedded Bible-skill missions, theology guide, continuing-study prompts, and private reflection notes.
- **Practice:** the same understanding missions plus spaced return practice.
- **Explore:** full biblical text navigation by book and chapter.
- **Search:** queries `corpus.txt`; supports words/phrases and references/ranges and returns complete verse text.
- **Book drills:** the original Bible-order, group, content, chronology, theme, and verse-memory systems remain accessible.

This installation uses the Berean Standard Bible corpus and a 66-book Protestant shelf. The curriculum explicitly teaches that Catholic and Orthodox canons differ and that the app's shelf organization is not the only way communities organize Scripture.

## Curriculum provenance

The curriculum is original work. Sample introductory course descriptions from Concordia University Texas and Bethel University in Mishawaka informed the breadth expected of an introductory Bible/Christianity course; those institutions do not endorse this application. Denominational comparisons use each tradition's own current public material where available.

## Development

```sh
npm ci
npm test
npm run docs
```

`npm test` runs the existing foundations and full-app interaction suites plus the expansion integrity test. `npm run docs` regenerates unit documents using the baseline data and curriculum expansion layer.

To serve locally:

```sh
python -m http.server 8000 --directory public
```

## Cloudflare deployment

`wrangler.jsonc` uses Cloudflare Workers Static Assets with `public/` bound as `ASSETS`. `worker.js` runs before the HTML shell and appends the curriculum-expansion scripts after the existing application code. This keeps the large baseline data and interface intact while loading the 47 additional lessons additively.

The service worker caches the expansion scripts and uses cache version `canon-v3.7.0`, ensuring clients do not remain indefinitely on the previous curriculum after deployment.

The repository should not contain generated `node_modules/`, `.wrangler/`, or local Wrangler account-cache files. Install dependencies during development/build instead.

## Verification status and known gaps

Structural tests verify lesson counts, unique IDs, complete corpus references, challenge schemas, all 69 integrated skill missions, original-step source coverage, and the 14 cross-book theme investigations. The existing interaction tests continue to protect the reader, search, progress persistence, import/export, and baseline missions.

The final editorial audit found the course substantially broader and more coherent than the 23-lesson baseline, while identifying worthwhile next improvements rather than treating expansion as finished pedagogy: add harder late-course transfer challenges with multiple plausible answers; conduct a source-by-source scholarly audit of all 66 book profiles and contested chronology/authorship claims; add human/peer review for the independent project; expand Second Temple/canon history; and test the complete learning path with adults who actually begin with little Bible knowledge and with assistive technologies.
