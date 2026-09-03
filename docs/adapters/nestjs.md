---
sidebar_position: 3
---

# NestJS

`@get-enlace/nest`, published from [`get-enlace/enlace-js`](https://github.com/get-enlace/enlace-js)
(the same monorepo as the Express adapter).

## Install

```bash
npm install @get-enlace/nest
```

## Usage

With a static spec — a file path, a URL, or an already-parsed OpenAPI 3.x
object, whatever's easiest to point at your API's own document:

```ts
import { EnlaceModule } from '@get-enlace/nest';

@Module({ imports: [EnlaceModule.forRoot({ spec: './openapi.json' })] })
export class AppModule {}
```

This package's job is intentionally small: it serves the canvas UI and
resolves your OpenAPI document. Everything else — running a chain,
mapping fields, credentials — happens in the browser; see
[Building a Chain](../guides/connecting-and-mapping.md).

## Using `@nestjs/swagger`

If your app already builds its OpenAPI document with `@nestjs/swagger`,
hand that same document to Enlace instead of maintaining a second, static
copy — one call, no separate export step:

```ts
// app.module.ts — import with no config; the spec gets set below, once
// the app exists
import { EnlaceModule } from '@get-enlace/nest';

@Module({ imports: [EnlaceModule] })
export class AppModule {}
```

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnlaceModule } from '@get-enlace/nest';

const app = await NestFactory.create(AppModule);

const config = new DocumentBuilder()
  .setTitle('My API')
  .setVersion('1.0.0')
  // Enlace's chain executor sends requests straight to this URL — see
  // "What Enlace needs from your spec" below.
  .addServer('http://localhost:4000')
  .build();

EnlaceModule.setSpec(app, SwaggerModule.createDocument(app, config));

await app.listen(4000);
```

This two-step shape — plain `imports: [EnlaceModule]`, then `setSpec()`
in `main.ts` — exists specifically for `@nestjs/swagger`: `createDocument`
needs a built `app` instance to introspect, which doesn't exist yet at
module-definition time, so the spec can only be attached afterward.
`forRoot({ spec })` is for specs you already have in hand before the app
is built; `EnlaceModule` + `setSpec()` is for specs that only exist after
it.

Already serving `swagger-ui-express`/`@nestjs/swagger`'s own Swagger UI
from that same document? Nothing about also handing it to Enlace changes
how that keeps working — they're two independent consumers of the same
object.

### What Enlace needs from your spec

Whatever produces it, one thing matters for a chain to actually run: the
document's `servers[0].url` (`DocumentBuilder#addServer`, above) needs to
be your API's real, reachable base URL — Enlace sends every request in
the chain straight there from the browser.

An `operationId` on your routes (by default, `@nestjs/swagger` generates
one per route as `ControllerName_methodName`, e.g. `CustomersController_findAll`)
is what shows on the node and in the operation search; without one,
Enlace falls back to a synthetic `METHOD /path` label — either way, the
operation still works.

### Custom mount path

By default the canvas is at `/enlace`. To change it:

```ts
@Module({ imports: [EnlaceModule.forRoot({ path: 'canvas' })] })
export class AppModule {}
```

Want to see it running end to end first? There's a working
[NestJS example app](../examples.md) — its `main.ts` wires up
`@nestjs/swagger` this same way — you can run locally.
