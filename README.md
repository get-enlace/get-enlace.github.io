<h1>
  <img src="https://raw.githubusercontent.com/get-enlace/.github/refs/heads/main/brand/svgs/icon-full-100.svg" alt="" style="width: 32px; height: 32px; vertical-align: middle;"> get-enlace.github.io
</h1>

The [Enlace](https://github.com/get-enlace) project's website and
documentation, published at [get-enlace.github.io](https://get-enlace.github.io/).
Built with [Docusaurus](https://docusaurus.io/).

- `/` — the marketing landing page (what Enlace is, quickstart per adapter).
- `/docs` — full documentation: concepts, adapters, examples, releases,
  roadmap.

Content here should stay traceable to what's actually built in
[`enlace-ui`](https://github.com/get-enlace/enlace-ui),
[`enlace-js`](https://github.com/get-enlace/enlace-js),
[`enlace-dotnet`](https://github.com/get-enlace/enlace-dotnet), and
[`enlace-examples`](https://github.com/get-enlace/enlace-examples) — this
repo doesn't own any product behavior of its own.

## Local development

```bash
npm install
npm start
```

Opens a local dev server at `http://localhost:3000` with hot reload.

## Build

```bash
npm run build
```

Generates static content into `build/`, servable by any static host.
Docusaurus fails the build on a broken internal doc link
(`onBrokenLinks: 'throw'`), so a successful build is also a link-check.

## Deployment

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for how CI publishes this site to
GitHub Pages on push to `main`.
