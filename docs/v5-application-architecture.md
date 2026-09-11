# Canonical Shelf v5 — Application Experience

## Product model

The application has five primary destinations. A primary destination is a complete section; it must not reveal another row of subsection tabs.

1. **Home** — orientation, continue learning, progress, suggested next action, recent activity, and entry points into Scripture and Topics.
2. **Course** — the 25-unit, 139-activity guided curriculum.
3. **Bible** — Scripture reader, canonical navigation, book profiles, chapter navigation, canon/timeline exploration, and the interactive bookshelf.
4. **Topics** — plain-English expert reference for doctrine, theology, biblical concepts, Christian life, difficult questions, glossary terms, and related exploration.
5. **Practice** — optional reinforcement: recommended review, canonical order/groups, context and interpretation, themes, verses, games, and mastery work.

The retired top-level labels **Explore** and **Verses** are not destinations in v5. Their useful functions belong to Bible, Topics, Course, or Practice according to user intent. The old Learn/Play/Explore/Verses panels may remain as implementation engines, but v5 owns their visibility and framing; they are not parallel learner-facing pages.

## Global header

The persistent header is a utility and navigation surface. It contains:

- Canonical Shelf brand/home control;
- primary navigation: Home / Course / Bible / Topics / Practice;
- global Scripture/site search;
- translation selection;
- profile/progress access.

Search and translation are not owned by a content section. They remain reachable throughout the application. Scripture-reference queries stay with the Bible search path; non-reference queries are handed into Topics.

On narrow screens the header becomes a compact mobile navigation surface rather than compressing five labels into an unusable row.

## Home

Home answers **Where am I and what should I do next?** It contains:

- Continue learning;
- current progress;
- suggested next activity;
- Explore Scripture entry;
- featured topic;
- Practice entry;
- recent activity stored locally in the browser.

The bookshelf is currently intentionally excluded from Home so the completed v5 architecture can be evaluated cleanly. It may be duplicated or excerpted on Home later if that improves orientation without weakening Bible as its canonical home.

## Course

Course exposes the authoritative `CANON_V4_COURSE` sequence as a 25-unit journey. The unit overview is a navigation and orientation surface, not a second tab system. The existing 70 guided lessons and 69 mastery activities remain the learning engines beneath it.

The Course page must never regress into separate Story / Order / Groups / Chronology / Content / Themes / Verses tracks. Those names survive only as competency dimensions inside the integrated curriculum.

## Bible and the bookshelf

The bookshelf remains a signature feature, but it belongs to Bible rather than controlling the whole application. The v5 Bible page explicitly surfaces:

- Bookshelf;
- Books & canonical groups;
- Bible reader;
- book profiles and chapter navigation through the existing reader experience;
- Canon & timeline exploration.

The page layer audits the shelf location at runtime so it cannot leak above or across unrelated destinations.

Bible may offer contextual views such as shelf, list, or chronology, but these are controls within the page—not a second application tab bar.

## Topics

Topics is distinct from the project's theological disclosure. It is user-directed reference content with seven visible entry modes:

- Ask / search;
- Theology & doctrine;
- Christian life;
- Biblical concepts;
- Difficult questions;
- Glossary;
- Related exploration.

The underlying curated/offline Topics corpus remains authoritative. v5 adds the information architecture and global-search handoff rather than introducing generative answers.

## Practice

Practice is reinforcement, not a second curriculum. Its visible v5 structure is:

- Recommended review;
- Book & order;
- Context & interpretation;
- Themes;
- Verses;
- Games & mastery.

Legacy learner-facing controls such as **Learning map**, **Practice missions**, **Theology guide**, and **Book drills** are hidden from the v5 information architecture. Existing practice engines can still be invoked underneath the new categories where they remain useful.

## Statement of Faith and About

The **Statement of Faith** is not primary application content and is not a sixth main tab. It is an institutional/theological disclosure reachable from the footer/About surface.

It reads as a traditional cohesive belief statement using declarative **We believe…** language. The About surface separately explains:

- About Canonical Shelf;
- How this guide approaches Scripture;
- Sources & methodology;
- Translation information;
- Accessibility;
- Privacy.

## Content migration rule

No legacy screen survives merely because it still functions. Every original surface must be reviewed for:

1. narrative fit with the current curriculum;
2. visual fit with the v5 design system;
3. correct information architecture;
4. whether a better contemporary interaction now exists.

Legacy content may be rewritten, recombined, relocated, or retired. The underlying 25-unit curriculum and its theological/editorial safeguards remain intact unless a content review deliberately changes them.

## Design direction

The target is **scholarly editorial design + premium learning application + contemporary digital museum**: warm and human, typographically strong, spacious, tactile, and clearly distinct from generic SaaS or church-template aesthetics.

Motion communicates relationship, hierarchy, progress, or state. The app uses progressive enhancement for major route transitions and tactile interactions while respecting `prefers-reduced-motion`, forced colors, keyboard operation, and assistive technology.

## Implementation layers

The current architecture is deliberately layered so stable learning behavior is not reimplemented unnecessarily:

1. baseline single-file application and Bible data;
2. expanded guided curriculum and integrated mastery metadata;
3. v4 course, game, progress, Topics, and shell bridges;
4. `v5-shell.js` / `v5-shell.css` — global routing, header, Home, About, isolated engine visibility;
5. `v5-pages.js` / `v5-pages.css` — first-class Course, Bible, Topics, Practice, global search, profile/progress, recent activity, and legacy-chrome retirement.

The v5 layer is built on `v5-complete-experience` until acceptance. Automated tests protect the 70 guided lessons, 69 mastery activities, 25-unit course map, Topics data, page architecture, route isolation, bookshelf ownership, progress reuse, responsive/accessibility fallbacks, and offline operation.

## Acceptance invariants

A release candidate fails v5 acceptance if any of these are true:

- a primary destination exposes the old application tab bar;
- more than one legacy engine panel is visible at once;
- the bookshelf appears on Course, Topics, or Practice;
- Explore or Verses returns as a primary destination;
- Practice visibly presents Learning map / Practice missions / Theology guide / Book drills as its architecture;
- Course loses the 25-unit / 139-activity model;
- Statement of Faith becomes a primary navigation tab;
- global search, translation controls, or progress access disappear from the application shell;
- reduced-motion, forced-colors, keyboard, offline, or responsive behavior is knowingly broken.
