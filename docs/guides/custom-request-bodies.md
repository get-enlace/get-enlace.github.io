---
sidebar_position: 2
---

# Write a custom request body

The form view (one input per field) covers most bodies. Switch to **Raw
JSON** — the toggle in the node inspector — when you need something it
can't express: a value mapped into the middle of a string
(`"Bearer {{token}}"`), a body shape the form flattens away, or you just
want to write the JSON directly.

Switching in starts you from a real example of the body, generated from
the schema — not a blank editor. If the form already had mapped fields,
those come across as chips automatically:

![The Raw JSON editor showing customerId and productId as tag chips, auto-converted from the form view's mappings](/img/screenshots/raw-json-tag-chips.jpg)

## Map a value from inside the JSON

Type `{{` anywhere inside a string literal. This opens a small menu to
configure the mapping:

1. **Which upstream request** to pull from — any node reachable from this
   one, same rule as the form view's picker.
2. **What to pull** — a JSONPath filter into the response body (e.g.
   `$.items[0].id`), the whole raw response body, or a specific response
   header.
3. A **live preview** of the resolved value, using the last time you ran
   the chain.

Confirm it and the placeholder becomes a chip inline in your JSON —
something like `POST /customers (a1b2c3) → id` — instead of raw
`{{...}}` text. Click a chip to edit or remove it:

![The edit mapping modal, showing the source request, a JSONPath filter, and a live preview of the resolved value from the last run](/img/screenshots/tag-config-modal.jpg)

If a chip's source node gets deleted from the canvas, it turns visibly
red rather than silently resolving to nothing the next time you run.

## Mixing literal text and mapped values

Because a mapping is just a marker inside the string, this works fine:

```json
{ "authorization": "Bearer {{enlace:tok_1}}" }
```

Enlace resolves the tag and stitches it into the surrounding text at
request time — the mapped value doesn't have to be the whole field.

## Switching back to the form

Going Raw → Form is best-effort: each field the form knows how to render
gets read back out of your JSON. If the switch would lose something —
extra structure the form can't represent, or a mapping the flat form has
nowhere to put — you'll get a warning before anything is discarded.
Invalid JSON blocks the switch outright, so you can't accidentally lose
your edits to a typo.

## Uploading a file

If an operation's request body is `multipart/form-data` rather than
JSON — a file upload endpoint — the field for it appears as a file
picker in the form view instead of a text input. Click it to choose a
file from disk.

A file can't be represented as JSON, so these operations skip the
Raw/Form toggle entirely and stay in form mode — there's nothing to
switch to. Everything else about the form (mapping other fields from an
earlier step's response, static values alongside the file) works the
same as any other body.
