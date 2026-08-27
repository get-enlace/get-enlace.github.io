---
sidebar_position: 1
---

# Feature Requests

If something you want isn't covered in these docs, the way to ask for it
is a GitHub issue — not a public roadmap doc.

## Where to file one

File against **[`get-enlace/enlace-ui`](https://github.com/get-enlace/enlace-ui)**
regardless of which adapter you're using — it's where the canvas,
execution engine, and credential handling actually live. The one
exception is a request specific to how an adapter itself behaves (e.g.
spec auto-detection in ASP.NET Core) — file those against that adapter's
own repo instead
([`enlace-js`](https://github.com/get-enlace/enlace-js) or
[`enlace-dotnet`](https://github.com/get-enlace/enlace-dotnet)).

**[Open a new issue on enlace-ui →](https://github.com/get-enlace/enlace-ui/issues/new?title=%5BFeature%5D%3A+&labels=enhancement)**

## Known gaps

A few things Enlace doesn't do today, so you don't need to file these —
just 👍 or comment on the existing conversation:

- **Persistence.** Workflows and credentials live in browser memory only
  and reset on refresh — nothing is saved between sessions.
- **Drag-connect between fields on the canvas.** Field mapping goes
  through the node inspector's picker, or a tag in Raw JSON mode — not a
  direct drag between two fields.
- **Full OAuth2 `authorization_code` support.** Only
  [Popup Login](../guides/authenticating-requests.md#handling-a-login-you-cant-do-with-a-token)'s
  cookie-based flow exists; Enlace doesn't yet capture a token from a
  popup's own redirect.

## What's helpful to include

- **The problem, not just the solution** — what are you trying to build a
  chain around that Enlace can't do today?
- **A sample spec or operation shape**, if the request is about how a
  particular OpenAPI construct should render.

Found something that looks broken rather than missing? Same repo, same
tracker — just describe what you expected vs. what happened.
