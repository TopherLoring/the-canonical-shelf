# v4 branch preview

The v4 redesign is intentionally isolated from production.

The branch preview assets are loaded through `public/v4-loader.js`. That loader is designed to be appended to the existing expansion loader only on `curriculum-v4-redesign`.

When active:

- a **Topics** tab is inserted at runtime;
- the existing Learn panel gains a **Preview redesigned v4 course** control;
- the current production interfaces remain available for comparison;
- the v4 curriculum can be exercised without deleting the legacy implementation while the rewrite is incomplete.

Do not merge the v4 loader to `main` until all 69 mastery modules are authored and the 23-unit migration is complete.
