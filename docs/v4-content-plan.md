# v4 content work plan

## 69 mastery rewrites

Every original requirement keeps its stable legacy ID for auditability, but none of the old generic wrapper copy is considered shippable. A completed v4 mastery module requires:

1. learner-facing title that explains why the skill matters;
2. short deck/dek that orients a beginner;
3. at least three connected teaching paragraphs written specifically for that requirement;
4. plain-English summary;
5. one purpose-built visual specification;
6. one understanding check chosen for the cognitive task, not merely reused because a renderer exists;
7. two-stage hint ladder where useful;
8. explanatory correct feedback;
9. original drill capability preserved or superseded by an equivalent/higher-quality v4 check;
10. exact legacy ID retained for coverage verification.

### Rewrite order

- Foundation first: `n.what`, `v.what`, `t.what`, `c.two`, `n.author`, `n.audience`.
- Shelf/navigation: all `o.*` and `g.*` requirements.
- Story/chronology: all `s.*` and remaining `c.*` requirements.
- Content profiles: remaining `n.*` requirements.
- Theme tracing: remaining `t.*` requirements.
- Verse context and reconstruction: remaining `v.*` requirements.
- Capstones last: `o.all`, `g.all`, `c.all`, `n.all`, `t.all`, `v.all` are rewritten after their prerequisites so they can synthesize instead of duplicate.

## Visual coverage standard

The entire curriculum—not only the 69 mastery modules—uses visuals where a visual genuinely carries information better than prose. Each guided lesson will receive one of:

- timeline
- shelf / canon map
- story arc
- flow / argument chain
- comparison board
- relationship network
- theme thread
- verse-context chain
- book profile
- position spectrum
- translation/canon/context stack
- schematic map

A lesson can explicitly opt out only when a visual would be decorative rather than explanatory.

## Topics reference desk

Minimum launch categories:

### Doctrine
Trinity; incarnation; Holy Spirit; creation; sin; grace; salvation; atonement; faith and works; providence; free will/predestination; Church; Scripture/inspiration; canon; resurrection; judgment/hell; new creation.

### Christian practice
Prayer; baptism; Communion/Eucharist; worship; confession; forgiveness; generosity; fasting; discernment; spiritual gifts; church membership/community; vocation/work.

### Life questions
Anxiety; grief; depression/mental health boundary; suffering; death; relationships; marriage; sex; money; debt; work; purpose; anger; forgiveness; justice; poverty; violence; politics boundary; medical care; doubt; unanswered prayer.

### Difficult / contested questions
LGBTQ people and relationships; women in ministry; slavery; conquest; antisemitism/Jewish-Christian relations; other religions; hell; biblical inerrancy; creation/evolution; miracles; spiritual evil; end-times systems.

### Glossary
Automatically harvest curriculum vocabulary, then editorially de-duplicate and cross-link definitions.

## Expert-answer format

1. **Short answer** — direct, plain English.
2. **What that means** — 1–3 concise sections.
3. **Important distinction** — common category error or misuse.
4. **Where Christians disagree** — only when disagreement is material.
5. **Biblical evidence** — optional references, not a proof-text wall.
6. **Related topics** — continue exploration.
7. **Course connection** — relevant unit/lesson where applicable.

## Future theologian chat

The Topics corpus becomes the retrieval source for a future conversational layer. A generative model should be required to:

- retrieve before answering;
- identify which claims come from the course’s editorial framework versus broader Christian consensus;
- label major disagreements;
- avoid inventing quotations or verse references;
- provide uncertainty when source material is insufficient;
- offer links back to the curated entries;
- never expose provider credentials in the static client.
