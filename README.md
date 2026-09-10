# The Canonical Shelf

A static, offline-capable Bible reader and adult introduction to Christianity. Serve the `public/` directory over HTTP or HTTPS; no application server, API key, or build step is required.

## Learning path

All 16 units are available as 23 complete lessons: five orientation lessons, four reading-method lessons, and fourteen integrated unit studies. Later studies each include four primary-text encounters. Every lesson includes an objective, full Bible reading, explanation, simpler explanation, vocabulary, deeper questions, private reflection, and an understanding mission.

There are 50 initial and 36 return-review challenges using sequencing, matching, evidence boards, directed argument maps, and multi-stage scenarios. Missions are untimed, permit hints and retries, and assess understanding rather than personal assent. Milestones and spaced reviews track task completion, not spiritual worth or whole-subject mastery.

The guide follows the approved open-table, LGBTQ-affirming editorial framework, with MCC and Disciples influences, substantive engagement with historic Christian teaching, and contextual interpretation. It is original curriculum informed by university course descriptions, not a university-endorsed course or an exhaustive seminary program. See [curriculum, sources, and editorial boundaries](public/docs/curriculum.md).

## Units 1 and 2: reading with evidence

- **Corinth in context:** patronage, status, and shared meals, with explicit boundaries between textual observations and historical reconstruction.
- **Translation workshop:** compare 1 John 5:6–8 with NET textual notes and distinguish manuscript variants from English-word choices.
- **Genre investigation:** compare Daniel’s visions, Acts’ narrative, and Exodus’ law using full passages.
- **Argument maps:** construct and revise directed links from observations to an interpretation and a justified application; unsupported shortcuts stay disconnected.

Lesson sources are linked in the app and in the generated unit documents.

## Reading and practice

- **Learn:** guided lessons, unit navigation, and theology guide.
- **Practice:** understanding missions and scheduled review.
- **Explore:** all 66 books with full chapters and previous/next navigation.
- **Verses / search:** search `corpus.txt` for words, phrases, books, chapters, or verse ranges and display complete verses.
- **Book drills:** the original memory games remain available with their saved progress.

This reader contains the Berean Standard Bible in the 66-book Protestant canon. The curriculum explains that other Christian canons differ.

Progress and reflection notes are stored on the device. Exported progress includes notes; share a backup only if you intend to share those reflections. The service worker caches the app, corpus, and curriculum documents for use after an initial successful online load.

## Development

```sh
npm ci
npm test
npm run docs
```

The Node dependencies are for tests only. `npm run docs` regenerates the readable unit documents from the production lesson data and corpus. Serve locally with an HTTP server such as `python -m http.server 8000 --directory public`.

Validation passed: content and full-app DOM suites cover all 86 authored challenges; Chromium checks cover mobile/desktop navigation, real argument-map controls, progress persistence, full chapters, and offline reloads. Screen-reader and cross-browser testing remain outstanding.

See [verification instructions and limits](tests/README.md) for the content, DOM, and optional browser suites. Updating cached assets requires a cache-version change in `sw.js`.

## Deployment layout

`wrangler.jsonc` points Cloudflare static assets at `public/`. The browser scripts, Bible corpus, manifest, service worker, and generated curriculum documents all live there. Keep deployment pointed at that directory. Author lesson content in `public/foundations-data.js`, regenerate documents with `npm run docs`, run the tests, and update the service-worker cache version when changing cached files.

An existing open browser tab may still use the previous app until reloaded after the service-worker update. This repository update does not itself verify that a connected Cloudflare deployment has completed.
