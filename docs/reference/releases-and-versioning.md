---
sidebar_position: 2
---

# Releases & Versioning

Enlace ships across three package ecosystems, each with a **dev** channel
for fast iteration and a **prod** channel for real installs.

| Package | Dev channel | Prod channel |
|---|---|---|
| `@get-enlace/ui`, `@get-enlace/express`, `@get-enlace/nest` | GitHub Packages npm, `dev` dist-tag | [npmjs.org](https://npmjs.org), `latest` |
| `Enlace.AspNetCore` | GitHub Packages NuGet | [NuGet.org](https://nuget.org) |

The dev channel exists for fast, low-ceremony iteration and isn't meant
for production use — it updates on every merge to each repo's `main`
branch, with no stability guarantee between builds. The prod channel is
what real consumers should install: a deliberately slower-moving,
versioned release.

## What to install

Unless you're specifically tracking an in-progress feature, install from
the **prod** channel — the plain `npm install @get-enlace/express`,
`npm install @get-enlace/nest`, or `dotnet add package Enlace.AspNetCore`
commands shown throughout these docs already point there by default.

## Versioning

All packages follow semver. Enlace is pre-1.0 today, so expect the usual
pre-1.0 caveat: minor version bumps may still include breaking changes
until a 1.0 is cut. Each repo's own release notes (GitHub Releases on
that repo) are the source of truth for what changed in a given version.

## Status by adapter

- **Express, NestJS** — actively developed, both live in
  [`enlace-js`](https://github.com/get-enlace/enlace-js).
- **ASP.NET Core** — pre-release scaffold, live in
  [`enlace-dotnet`](https://github.com/get-enlace/enlace-dotnet). See its
  [adapter page](../adapters/aspnetcore.md#status) for what's in scope
  today.

Have an idea for what should come next? See
[Feature Requests](../community/feature-requests.md).
