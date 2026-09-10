# Verification

Run `npm ci` then `npm test` (Node 18+). The static application itself needs no build or runtime dependencies; serve `public/` over HTTP/HTTPS.

The dependency-free suite validates lesson structure, full corpus reading coverage, all challenge solutions, review timing, import sanitization, app syntax, legacy completion gates, and offline assets.

The DOM integration suite executes the complete production app with LinkeDOM, exercises all fifty initial and thirty-six return-review challenges and their event handlers, tests failure and hint paths, note preservation, early/due review awards, combined progress backup, navigation, original drills, full chapter reading, and exact/range search.

These suites passed for the complete sixteen-unit release, including old-progress migration and pausing a mission to revisit its lesson. LinkeDOM supplies DOM behavior, not a rendering engine. The Chromium smoke suite also passed at 390px mobile and 1440px desktop widths: real inputs, incomplete/complete missions, directed argument creation/removal, hints, resume, reload persistence, original drills, full chapters, horizontal overflow, and service-worker offline reload with the corpus. Assistive-technology testing and a cross-browser/device matrix have not been performed. Select values and scroll APIs are adapted explicitly in the test harness. The release does not claim full visual or accessibility certification.

Run `npm run docs` after content edits to regenerate the readable unit documents from the production lesson data and corpus.

## Optional browser verification

Install Playwright and its Chromium browser separately, then run:

```sh
node tests/browser.cjs
```

The script serves `public/` on a temporary localhost port and closes it when done. Set `SHELF_PLAYWRIGHT_MODULE` to an absolute Playwright module path if it is not installed locally; set `SHELF_BROWSER_PATH` to use an existing Chromium executable. `SHELF_SCREENSHOT` optionally records mobile viewport images. The release was checked with Chromium 152. External font requests are blocked in this test; font loading and visual appearance on other browsers remain outside its assertions.
