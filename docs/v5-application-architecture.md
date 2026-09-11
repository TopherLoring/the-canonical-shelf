# Canonical Shelf v5 — Application Experience

## Product model

The application has five primary destinations. A primary destination is a complete section; it must not reveal another row of subsection tabs.

1. **Home** — orientation, continue learning, progress, suggested next action, recent activity, and entry points into Scripture and Topics.
2. **Course** — the 25-unit, 139-activity guided curriculum.
3. **Bible** — Scripture reader, canonical navigation, book profiles, and the interactive bookshelf.
4. **Topics** — plain-English expert reference for doctrine, theology, biblical concepts, Christian life, difficult questions, and glossary terms.
5. **Practice** — optional reinforcement: canonical order/groups, context, themes, verses, games, and recommended review.

The retired top-level labels **Explore** and **Verses** are not destinations in v5. Their useful functions belong to Bible, Topics, Course, or Practice according to user intent.

## Global header

The persistent header is a utility and navigation surface. It contains:

- Canonical Shelf brand/home control;
- primary navigation: Home / Course / Bible / Topics / Practice;
- global biblical/search entry point;
- translation selection;
- progress/profile access where available.

Search and translation are not owned by a content section. They remain reachable throughout the application.

On narrow screens the header becomes a compact mobile navigation surface rather than compressing five labels into an unusable row.

## Bible and the bookshelf

The bookshelf remains a signature feature, but it belongs to Bible rather than controlling the whole application. It should become a polished canonical navigation visualization with book/group relationships, learned/read state, keyboard access, responsive behavior, and a transition into book detail/reader content.

Bible may offer contextual views such as shelf, list, or chronology, but these are controls within the page—not a second application tab bar.

## Topics

Topics remains distinct from the project's theological disclosure. It is user-directed reference content: search/ask, doctrine and theology, Christian life, biblical concepts, difficult questions, glossary, and related-topic exploration. It should read like a clear expert guide rather than a scored course.

## Statement of Faith

The **Statement of Faith** is not primary application content and is not a sixth main tab. It is an institutional/theological disclosure reachable from the footer and optionally an About/More menu.

It should read as a traditional cohesive belief statement using declarative **We believe…** language. Supporting pages may separately explain methodology, denominational influences, sources, interpretive approach, translation information, accessibility, and privacy.

## Content migration rule

No legacy screen survives merely because it still functions. Every original surface must be reviewed for:

1. narrative fit with the current curriculum;
2. visual fit with the v5 design system;
3. correct information architecture;
4. whether a better contemporary interaction now exists.

Legacy content may be rewritten, recombined, relocated, or retired. The underlying 25-unit curriculum and its theological/editorial safeguards remain intact unless a content review deliberately changes them.

## Design direction

The target is **scholarly editorial design + premium learning application + contemporary digital museum**: warm and human, typographically strong, spacious, tactile, and clearly distinct from generic SaaS or church-template aesthetics.

Motion communicates relationship, hierarchy, progress, or state. Use progressive enhancement for view transitions, shared-element movement, scroll-linked reveals, responsive/container-aware layouts, and tactile micro-interactions. Respect `prefers-reduced-motion`, forced colors, keyboard operation, and assistive technology.

## Migration strategy

Build v5 as an isolated shell on `v5-application-experience`. Preserve the working v4 curriculum/runtime beneath it while each legacy surface is migrated. Do not destabilize `main` during the redesign. Automated tests must continue to protect Bible reader/search behavior, 70 guided lessons, 69 mastery activities, Topics data, progress, and offline operation.