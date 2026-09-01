---
sidebar_position: 1
---

# Connect operations and map data

A chain is built from two separate actions on the canvas: **connecting**
nodes to set the order they run in, and **mapping** fields to pull a
value from an earlier step's response. They're independent — keep them
that way in your head and the canvas stops being confusing.

![Four connected nodes on the canvas: createCustomer connects to updateCustomer, createProduct, and createOrder; createProduct also connects to createOrder](/img/screenshots/canvas-chain-built.jpg)

## Set the order: connect nodes

Drag from one node's connect handle to another's. This draws a solid
arrow and means exactly one thing: *the first node must finish before the
second starts.* No data moves along it.

You can connect nodes purely for sequencing — e.g. "delete this order
before creating its replacement" — even when no field actually needs a
value from the earlier one.

Click a connector to select it, then press Delete/Backspace to remove
it — same as removing a node. A field mapping isn't removed this way;
clear it from the field's own inspector control instead.

## Pull in a value: map a field

Open a node's inspector and, on the field you want to fill in, choose
"Map from..." instead of typing a static value. Pick an upstream node and
the response field to pull from it.

A mapped field **implies its own ordering** — you don't need to also draw
a connection for it. Mapping `body.customerId` from node A automatically
means A runs before this node, connection arrow or not.

You're not limited to the node directly before this one. In a chain
`A → B → C`, `C` can map a field straight from `A`, skipping `B`
entirely, as long as `A` is a real ancestor in the connection graph.

![The Node Inspector for createOrder, with body.customerId mapped from createCustomer's id and body.productId mapped from createProduct's id](/img/screenshots/run-output-all-green.jpg)

## What you can map from

- **Nested fields** work at any depth — a response's `address.city` shows
  up in the picker as its own entry, not just top-level fields.
- **Array fields** map as a single value (the whole array), not
  exploded per item — the field shows an example of the shape it expects.
- The picker only offers fields whose **type actually matches** the
  target — you won't see a string response field offered for a number
  input.

If the shape you need doesn't fit a flat field — you want to build a
larger JSON body with a mapped value embedded inside it, or the body is
too irregular for the form to represent — switch to
[Raw JSON mode](./custom-request-bodies.md) instead.

## Cleaning up

Delete a node and anything that referenced it — connections, mappings —
is removed automatically. Nothing is left silently dangling.
