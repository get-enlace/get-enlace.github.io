---
sidebar_position: 1
---

# Credential Types

For how to pick and use one of these, see
[Authenticate your requests](../guides/authenticating-requests.md). This
page is the exact reference: what each type needs and how it's attached.

| Type | Attached as | Needs |
|---|---|---|
| Bearer | `Authorization: Bearer <token>` header | A token |
| Basic | `Authorization: Basic <...>` header | Username, password |
| API Key | A header, or a query param | Key name, value, and location (header/query) |
| OAuth2 — Client Credentials | Bearer header, token fetched from `tokenUrl` first | Token URL, client ID, client secret, optional scope |
| OAuth2 — Password | Bearer header, token fetched from `tokenUrl` first | Token URL, username, password, optional client ID/secret/scope |
| Popup Login | Nothing injected — browser's own cookie jar, via `credentials: 'include'` | A login URL to open in the popup |

Both OAuth2 types cache the fetched token in memory and reuse it across
nodes rather than re-fetching per request.

**Popup Login** is the exception to "attached as a value": it triggers a
real login in a separate browser window instead of injecting anything
into the request. It's scoped to session-cookie-based logins only — a
provider that hands back a token instead of setting a cookie isn't
something Popup Login can capture today.

## Spec-derived credentials

If a loaded OpenAPI document declares `components.securitySchemes`,
those appear pre-filled (scheme, token URL, field names) in the
Credentials drawer's "Declared in spec" list — you only need to supply
the secret. A credential created this way stays marked as spec-derived
on its card afterward.
