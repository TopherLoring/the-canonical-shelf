# Verification

Run `npm ci` then `npm test` (Node 18+). Production remains dependency-light; Node dependencies are used by the test harness and documentation generator.

The test command now has three layers:

1. **Baseline foundations suite** — validates the original guided lesson structures, corpus passages, challenge solutions, review timing, import sanitization, application syntax, completion gates, and cached assets.
2. **Full-app DOM interaction suite** — exercises the existing reader/search, baseline guided missions, failure/hint paths, notes, spaced review, progress import/export, and original book drills through LinkeDOM.
3. **Curriculum expansion integrity suite** — loads the 23-lesson baseline plus the production expansion layer and asserts 70 unique lessons, 4–5 lessons in every unit, preservation of all baseline lesson data, complete corpus ranges for every new reading, valid challenge schemas, all seven original skill tracks totaling 69 steps, and 14 cross-book theme investigations.

The expansion adds 47 lessons, 94 initial challenges, and 94 return challenges. With the 50 initial and 36 return challenges in the baseline, production contains **144 initial guided challenges and 130 return-review challenges**.

`npm run docs` loads the same baseline and expansion data and regenerates the 16 readable unit documents from `public/corpus.txt`.

## Browser verification

The pre-expansion Chromium smoke suite previously passed at 390px mobile and 1440px desktop widths for real inputs, incorrect/correct mission paths, argument mapping, hints, resume, persistence, original drills, chapter reading, horizontal overflow, and offline corpus reload.

The current expansion is additive and covered by integrity tests, but a complete browser/device pass of all 47 new lesson screens has not been performed. Before claiming full visual/accessibility certification, run the browser suite against the Worker-served shell and complete screen-reader plus cross-browser/device testing.

## Deployment verification

`wrangler.jsonc` uses an `ASSETS` binding with `run_worker_first: true`. `worker.js` transforms only `/` and `/index.html`, appending the five expansion scripts after the existing application code; all other asset requests pass through unchanged.

The service-worker cache version must be bumped whenever its cached asset list changes. This release uses `canon-v3.6.0` and includes all curriculum-expansion scripts plus `docs/course-review.md`.
