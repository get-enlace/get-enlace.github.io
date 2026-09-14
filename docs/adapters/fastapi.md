---
sidebar_position: 3
---

# FastAPI

`enlace-fastapi`, published from [`get-enlace/enlace-python`](https://github.com/get-enlace/enlace-python).

## Install

```bash
pip install enlace-fastapi
```

## Usage

```python
from fastapi import FastAPI
from enlace_fastapi import enlace

app = FastAPI()
app.include_router(enlace(spec="./openapi.json"), prefix="/enlace")
```

Open `/enlace` and the canvas loads, reading your spec from
`/enlace/api/spec` — resolved fresh on every request, so editing the spec
file on disk shows up on the next canvas reload with no restart needed.

`spec` is a file path (`.json`/`.yaml`/`.yml`) or an already-parsed
OpenAPI 3.x `dict` — whichever's easiest to point at your API's own
document.

## Using FastAPI's own generated spec

Already have FastAPI building your OpenAPI document from your routes?
Call `app.openapi()` yourself and pass the result straight through — no
separate export step:

```python
from fastapi import FastAPI
from enlace_fastapi import enlace

app = FastAPI(title="My API", version="1.0.0")

# ... your routes ...

app.include_router(enlace(spec=app.openapi()), prefix="/enlace")
```

Call `app.openapi()` after your routes are registered — that's when it
actually has something to build from. Already mounting `/docs` or
`/redoc` from the same app? Nothing about also mounting `enlace()`
changes how those keep working — they're independent consumers of the
same spec.

This package's job is intentionally small: it serves the canvas UI and
resolves your OpenAPI document. Everything else — running a chain,
mapping fields, credentials — happens in the browser; see
[Building a Chain](../guides/connecting-and-mapping.md).

## Spec resolution

Unlike the other adapters, `spec` is always explicit — there's no
auto-detection to fall back on, since a FastAPI app has no single
conventional route every project serves its document from the way
springdoc or Swashbuckle do. Pass a file path, a URL your app builds
into a string, or `app.openapi()`'s own return value; whatever's
already the source of truth for your document.

Want to see it running end to end first? There's a live, hosted
[FastAPI example app](../examples.md#-try-it-live--no-setup-at-all) —
no local setup needed.
