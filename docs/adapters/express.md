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

Want to see it running end to end first? There's a working
[Express example app](../examples.md) you can run locally.
