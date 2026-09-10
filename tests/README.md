# Verification

Run `npm ci` then `npm test` (Node 18+). The static application itself needs no build or runtime dependencies; serve the repository over HTTP/HTTPS.

The dependency-free suite validates lesson structure, full corpus reading coverage, all challenge solutions, review timing, import sanitization, app syntax, legacy completion gates, and offline assets.

The DOM integration suite executes the complete production app with LinkeDOM, exercises all eighteen initial and eight transfer-review challenges and their event handlers, tests failure and hint paths, note preservation, early/due review awards, combined progress backup, navigation, original drills, full chapter reading, and exact/range search.

These suites passed for the Units 1–2 release, including old-progress migration and pausing a mission to revisit its lesson. LinkeDOM supplies DOM behavior, not a rendering engine. Real-browser visual, assistive-technology, and offline service-worker lifecycle testing have not been performed in this environment. Select values and scroll APIs are adapted explicitly in the test harness. The release does not claim full visual or accessibility certification.

Run `npm run docs` after content edits to regenerate the readable unit documents from the production lesson data and corpus.
