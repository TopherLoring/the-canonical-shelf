// Canonical Shelf v3.8: the curriculum is loaded by public/index.html through
// foundations-expansion-loader.js, so the Worker only serves static assets.
export default {
  fetch(request, env) {
    return env.ASSETS.fetch(request);
  }
};
