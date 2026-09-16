# Canonical Shelf v6 — Clean-Core Replatform

Status: **active design and implementation on `v6` branch only**.

## Release rule

Do not merge to `main` or deploy a v6 runtime until the v6 acceptance gates are complete. The existing application remains the production and migration source while v6 is developed in parallel.

## Product invariants

v6 preserves the Canonical Shelf product rather than the v4/v5 runtime implementation.

- One self-paced 25-unit curriculum.
- 70 guided lessons + 69 mastery requirements = 139 scored activities.
- Stable activity/mastery identity independent from curriculum sequence.
- Five primary destinations: Home, Course, Bible, Topics, Practice.
- Bible owns canonical bookshelf/browse/reader experiences.
- Topics remain curated reference content and do not count toward course completion.
- Practice reinforces learning but does not create a second curriculum.
- No account, cohort, social, or required backend.
- Core Bible, Course, Topics, Practice, progress, search, and export/import remain usable offline.
- Learner progress is local-first and migratable from legacy state.
- The Statement of Faith is the normative ceiling for Canonical Shelf doctrinal claims.
- LGBTQ people are fully included under the Statement of Faith; orientation is not inherently sinful; faithful same-sex relationships and marriage may embody Christian virtue; LGBTQ identity does not bar Christian participation or leadership.
- Competing Christian interpretations are represented accurately without allowing an external view to silently replace Canonical Shelf's stated position.
- The product distinguishes textual evidence, historical context, interpretation, doctrine, reception history, and application.

## Architecture boundary

v6 is greenfield at the application/runtime layer and brownfield at the product/content/data layer.

### Preserve or migrate

- curriculum intellectual property;
- stable learner-facing identities where practical;
- Scripture corpus and book metadata;
- Topics and source material;
- Statement of Faith and theological/editorial safeguards;
- learner progress/history through a versioned migration path;
- selected mastery/evaluation algorithms after review.

### Replace

- single-file application substrate;
- DOM relocation/repair as architecture;
- whole-body mutation-observer coordination;
- v4/v5 bridge layers and adapters;
- parallel CSS systems;
- text/DOM discovery for application routing;
- fragmented progress/state ownership;
- non-atomic service-worker executable updates;
- content encoded primarily as executable UI JavaScript.

## v6 source topology

```text
v6/
  app/                 shell, routes, app composition
  domains/             course, bible, topics, practice, progress, search
  knowledge/           entities, claims, interpretations, traditions, sources
  learning/            activities, assessment, mastery, feedback, recommendation
  platform/            persistence, migration, offline, backup, search index
  design-system/       tokens, components, patterns
  schemas/             versioned canonical data contracts
  tests/               v6-specific validation

content-v6/
  scripture/
  statement/
  theology/
  topics/
  curriculum/
  sources/
  taxonomy/
```

The directories above are additive until cutover. v6 code must not depend on legacy DOM structure.

## Development slices

1. Doctrinal constitution and LGBTQ evidence policy.
2. Curriculum resequencing and prerequisite/spacing model.
3. Canonical knowledge architecture.
4. Bounded Theologian runtime.
5. Topics + global Search redesign.
6. Bible + Theologian integration.
7. Practice/recommendation integration.
8. Offline/privacy/model architecture.
9. Assurance and red-team suite.
10. Application implementation, migration parity, and cutover readiness.

## Acceptance gates before merge/deploy

v6 is not releasable until all gates pass:

- all 25 units, 70 lessons, 69 mastery requirements, 139 activities, and 45 Topics are accounted for;
- legacy learner-state fixtures migrate losslessly to the v6 model;
- no application-wide DOM repair or whole-body observer is needed for core behavior;
- one authoritative progress domain owns completion, mastery, and review state;
- doctrinal assertions trace to Statement-of-Faith authority or are explicitly marked descriptive/open;
- contested evidence is not rendered as consensus;
- queer reception history can be represented without being converted into unsupported textual fact;
- automated accessibility checks pass and manual keyboard, screen-reader, forced-color, reduced-motion, zoom, and touch validation is complete;
- browser validation passes in Chromium, Firefox, Safari/WebKit, iOS Safari, and Android Chrome;
- offline cold/warm start, navigation, Scripture, course activity completion, restart, interrupted update, bad asset, rollback, and backup/restore scenarios pass;
- executable release updates are atomic and a known-good version is retained;
- schema, migration, browser E2E, visual regression, accessibility, offline, performance, and security checks are release-blocking;
- branch/release governance prevents accidental production cutover.
