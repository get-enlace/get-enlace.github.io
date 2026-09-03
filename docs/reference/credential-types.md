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
| OAuth2 — Client Credentials | Bearer header, token fetched from `tokenUrl` first | Token URL, client ID, client secret, optional scope, client auth method, extra token params |
| OAuth2 — Password (legacy) | Bearer header, token fetched from `tokenUrl` first | Token URL, username, password, optional client ID/secret/scope/client auth method/extra token params |
| Cookie (session) | Nothing injected — browser's own cookie jar, via `credentials: 'include'` | Nothing required; an optional login URL for a convenience link |

Both OAuth2 types cache the fetched token in memory and reuse it across
nodes rather than re-fetching per request. Saving either type actually
fetches a token first ("Verify & Save") — a bad `tokenUrl` or secret is
caught at save time, not on the first run that needs it. **Client auth
method** (Basic header vs. request body) controls how `clientId`/
`clientSecret` are sent on that token request only; it has no effect on
the downstream API call, which always just gets the resulting token as a
`Bearer` header. It only applies when a client ID/secret is actually set
— OAuth2 (Password) accepts a public client with neither, per RFC 6749
§4.3, in which case there's nothing for it to apply to. **Extra token
params** are arbitrary additional form fields sent on the token request
only (an `audience` or `resource` claim, a vendor-specific parameter,
…) — they never reach the downstream API call, and reserved fields
(`grant_type`, `client_id`, `client_secret`, `scope`) can't be
overridden through them.

**Cookie (session)** is the exception to "attached as a value": it
injects nothing into the request at all, and holds no secret of its own.
It just flips a fetch option so the browser's own cookie jar — populated
by whatever independent login you already did, in any tab, entirely
outside Enlace — tags along. Scoped to session-cookie-based logins only;
a provider that hands back a token instead of setting a cookie isn't
something this credential type can capture.

## Spec-derived credentials

If a loaded OpenAPI document declares `components.securitySchemes`,
those appear pre-filled (scheme, token URL, field names) in the
Credentials drawer's "Declared in spec" list — you only need to supply
the secret. A credential created this way stays marked as spec-derived
on its card afterward.
