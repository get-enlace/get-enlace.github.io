---
sidebar_position: 1
---

# ASP.NET Core

`Enlace.AspNetCore`, published from [`get-enlace/enlace-dotnet`](https://github.com/get-enlace/enlace-dotnet).

## Install

```bash
dotnet add package Enlace.AspNetCore
```

## Usage

```csharp
// Program.cs
builder.Services.AddEnlace();
// ...
app.UseEnlace(); // mounts at /enlace by default
```

With a customized Swashbuckle route or a different spec source entirely:

```csharp
builder.Services.AddEnlace(options =>
{
    options.SpecUrl = "https://internal-host/custom/openapi.json";
    options.MountPath = "/enlace"; // default
});
```

## Spec resolution

1. **Zero-config default** — if your app already runs Swashbuckle
   conventionally, its spec is already served at
   `/swagger/v1/swagger.json`; the adapter defaults to that path with no
   configuration needed.
2. **Auto-detect fallback** — if that doesn't resolve, it tries a short
   list of other conventional paths (`/openapi.json`, `/swagger.json`)
   with a plain HTTP request to your app's own server — no reflection
   into route tables or framework internals.
3. **Explicit override** — set `options.SpecUrl` to point at anything
   else: a customized route, a different service's spec, a static file.
4. **Failure is loud** — if nothing resolves, startup fails with an error
   naming exactly what was tried and how to fix it, rather than rendering
   a silent empty canvas.

This package's job is intentionally small: it serves the canvas UI and
resolves your OpenAPI document. Everything else — running a chain,
mapping fields, credentials — happens in the browser; see
[Building a Chain](../guides/connecting-and-mapping.md).

Want to see it running end to end first? There's a working
[ASP.NET Core example app](../examples.md) you can run locally.

## Status

Pre-release scaffold. Persistence (saving/reloading workflows and
credentials) is out of scope for this phase — canvas state and
credentials live in browser memory for the session only.
