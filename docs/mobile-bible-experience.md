# Mobile-first and Bible experience acceptance criteria

The phone layout at 100% browser zoom is the canonical small-screen experience. Users should not need to zoom out to make navigation, Topics, Bible search, book details, or About fit.

## Mobile

- Maintain 18–20px class gutters plus iPhone safe-area insets.
- Keep Home / Course / Bible / Topics / Practice visible without horizontal navigation scrolling.
- Collapse the global search field until focused so it does not compete with the brand and progress control.
- Stack editorial sidebars/cards below the article on narrow screens.
- Prevent sticky navigation from obscuring headings, drawers, reader state, or book details.
- Give Safari bottom chrome sufficient safe-area breathing room.

## Bible search

- Reference searches should prioritize continuous passage reading and high verse density.
- Keyword searches should use compact result cards; result height follows verse length rather than a fixed card height.
- Aim for roughly 5–8 average-length keyword results per phone viewport where verse length permits.

## Bible

- The interactive bookshelf belongs to Bible and shows book names on the spines.
- Book selection controls use the current visual system rather than legacy button styling.
- Scripture reading uses a dedicated editorial reading surface; search-result density does not dictate reader typography.
- “Mark as learned” does not appear in book details.
- Previous/next chapter actions keep reader, active book, shelf state, and study details synchronized across book boundaries.

## Book profiles

Book details should expose, where supportable:

- orientation, canonical group, synopsis, authorship/date/setting;
- key themes;
- deeper-reading prompts;
- common questions and points of clarity;
- areas of Christian or scholarly disagreement without treating all disagreement as equivalent;
- translation/textual notes where wording or manuscripts materially affect interpretation;
- common ground and links into further study.

## Product language

Implementation labels such as v4/v5, legacy, migration, runtime, or redesign history are not learner-facing content. Technical version/build information may live in a quiet About/build-information surface only.
