---
sidebar_position: 1
---

# Express

`@get-enlace/express`, published from [`get-enlace/enlace-js`](https://github.com/get-enlace/enlace-js).

## Install

```bash
npm install @get-enlace/express
```

## Usage

```ts
import { enlace } from '@get-enlace/express';

app.use('/enlace', enlace({ spec: './openapi.json' }));
```

`spec` is a file path, a URL, or an already-parsed OpenAPI 3.x object —
whatever's easiest to point at your API's own document.

This package's job is intentionally small: it serves the canvas UI and
resolves your OpenAPI document. Everything else — running a chain,
mapping fields, credentials — happens in the browser; see
[Building a Chain](../guides/connecting-and-mapping.md).

## Using an existing spec setup

If you already generate your OpenAPI document some other way, keep doing
that — `enlace()` doesn't care how the object it's handed came to exist,
only that it's a valid OpenAPI 3.x document.

With [`swagger-jsdoc`](https://www.npmjs.com/package/swagger-jsdoc), that
means calling it yourself and passing the result straight through as
`spec` — no separate export step, no file on disk:

```ts
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import { enlace } from '@get-enlace/express';

const spec = swaggerJsdoc({
  definition: {
    openapi: '3.0.3',
    info: { title: 'My API', version: '1.0.0' },
    // Enlace's chain executor sends requests straight to this URL — see
    // "What Enlace needs from your spec" below.
    servers: [{ url: 'http://localhost:4000' }],
  },
  apis: ['./routes/*.js'], // files with @openapi JSDoc blocks
});

const app = express();
app.use('/enlace', enlace({ spec }));
```

`swaggerJsdoc()` runs synchronously and needs nothing from your running
server, so this works before `app.listen()` is even called — unlike the
NestJS case (see [NestJS](./nestjs.md#using-nestjsswagger)), there's no
"needs the app instance first" step to work around.

Already mounting `swagger-ui-express` from the same document? Nothing
about handing that same object to `enlace()` changes how that works —
they're two independent consumers of the same spec object.

### What Enlace needs from your spec

Whatever produces it, one thing matters for a chain to actually run:
**`servers[0].url`** — Enlace sends every request in the chain straight to
this URL from the browser, so it needs to be your API's real, reachable
base URL, not a placeholder.

`operationId` is optional — Enlace works fine without it, falling back to
a synthetic `METHOD /path` label — but it's worth setting on operations
you'll be dragging onto the canvas often, since it's what shows on the
node itself and in the operation search, instead of the raw path.

Want to see it running end to end first? There's a working
[Express example app](../examples.md) — its `index.js` builds its spec
with `swagger-jsdoc` this same way — you can run locally.
