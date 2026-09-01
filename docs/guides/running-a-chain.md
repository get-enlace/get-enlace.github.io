---
sidebar_position: 4
---

# Run a chain and read the results

Hit **Run**. Enlace works out which nodes depend on which — through
connections and through field mappings — and fires them in the right
order, straight from your browser to your target API.

## Independent steps really do run in parallel

If two nodes don't depend on each other or on anything the other
depends on, Enlace fires both requests at the same time instead of
waiting for one to finish first. In the [demo chain](../start-here/try-the-demo.md),
that's what makes updating a customer and creating a product happen
together instead of one after another — the two requests genuinely
overlap in flight, not just run in a permissive order.

A node still waits for everything it depends on — directly or through a
mapped field — no matter how many other things are running at the same
time.

## Reading the Results pane

Every node in the chain gets a row in the **Results** pane (bottom of
the canvas) before the run even starts, in dependency order, with a
status icon that updates live as the run proceeds — pending, in flight,
completed, failed, or skipped. Expand a row to see the exact request
sent and the response received.

![Run output with all four requests succeeding, one expanded to show its request and response](/img/screenshots/run-output-all-green.jpg)

Bearer/Basic credentials are redacted here (see
[Authenticate your requests](./authenticating-requests.md#what-enlace-does--and-doesnt--protect)
for exactly what is and isn't), so most runs are safe to leave open while
pairing or screen-sharing — but check that page if you're using an API
key sent as a header.

The pane stays empty until you actually run something — nodes sitting on
an untouched canvas don't get placeholder rows. **Clear** empties the
list again once you're done with it, but keeps the underlying run result
around in the background so any field mappings pulling a preview from
it keep resolving; it's the visible rows that get wiped, not the data
those mappings need.

## The canvas locks while a run is in progress

Field values, credentials, connections, and request mode can't be edited
while a run is going — the inspector and canvas controls disable
themselves, and even a direct store edit is rejected, so nothing can
silently "take" without actually affecting the run in progress. You can
still drag nodes around to rearrange the canvas; position was never part
of what gets executed.

## If a step fails

Whatever hasn't started yet is halted — no more requests fire after the
point of failure. Anything already in flight in parallel with the failed
step still finishes and reports its own result, since a request that's
already gone out to your API can't be called back. Nothing downstream of
the failure runs.

## A cycle in your chain

If a set of nodes end up depending on each other in a loop — A needs B,
B needs A — Enlace refuses to run any of it and tells you before sending
a single request, rather than executing part of the chain and hanging.

## Want to pause mid-run and inspect a step before it fires?

See [Debug a chain step by step](./debugging-a-chain.md) — arm a
breakpoint on a connector and use **Debug** instead of **Run**.
