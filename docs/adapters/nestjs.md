---
sidebar_position: 2
---

# NestJS

`@get-enlace/nest`, published from [`get-enlace/enlace-js`](https://github.com/get-enlace/enlace-js)
(the same monorepo as the Express adapter).

## Install

```bash
npm install @get-enlace/nest
```

## Usage

```ts
import { EnlaceModule } from '@get-enlace/nest';

@Module({ imports: [EnlaceModule.forRoot({ spec: './openapi.json' })] })
export class AppModule {}
```

`spec` is a file path, a URL, or an already-parsed OpenAPI 3.x object —
whatever's easiest to point at your API's own document.

This package's job is intentionally small: it serves the canvas UI and
resolves your OpenAPI document. Everything else — running a chain,
mapping fields, credentials — happens in the browser; see
[Building a Chain](../guides/connecting-and-mapping.md).

Want to see it running end to end first? There's a working
[NestJS example app](../examples.md) you can run locally.
