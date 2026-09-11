const EXPANSION_SCRIPTS = `
<script src="/foundations-expansion-core.js"></script>
<script src="/foundations-units-02-08.js"></script>
<script src="/foundations-units-09-16.js"></script>
<script src="/foundations-skill-source.js"></script>
<script src="/foundations-skill-curriculum.js"></script>
<script src="/foundations-expansion-meta.js"></script>
<script src="/foundations-expansion-finalize.js"></script>`;

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (request.method !== 'GET' || !response.ok) return response;
    const url = new URL(request.url);
    const isShell = url.pathname === '/' || url.pathname === '/index.html';
    const isHtml = (response.headers.get('content-type') || '').includes('text/html');
    if (!isShell || !isHtml) return response;
    return new HTMLRewriter()
      .on('body', { element(element) { element.append(EXPANSION_SCRIPTS, { html: true }); } })
      .transform(response);
  }
};
