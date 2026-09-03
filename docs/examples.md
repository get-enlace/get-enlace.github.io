---
sidebar_position: 4
---

# Example Apps

[`enlace-examples`](https://github.com/get-enlace/enlace-examples) has a
runnable sample app per adapter — `aspnetcore/`, `express/`, `java/`,
`nest/` — each already wired up to Enlace, so you can see a real chain
working before you touch your own API.

All four implement the exact same API (customers, products, orders —
see [`CONTRACT.md`](https://github.com/get-enlace/enlace-examples/blob/main/CONTRACT.md)
if you want the precise shape), so a chain you build against one works
unmodified against any of the others — it's the same demo, just served
by a different adapter.

## Try the reference chain

Each example's own README walks through this same five-step chain on the
canvas:

1. `POST /customers` — capture the new customer's `id`.
2. `POST /products` (×2) — capture both `id`s.
3. `POST /orders`, mapping `customerId` from step 1 and each item's
   `productId` from step 2 — capture the order's `id` and its
   server-computed `total`.
4. `PUT /orders/{id}/status`, with `id` mapped from step 3, body
   `{ "status": "paid" }`.
5. `GET /orders/{id}` — confirm the status change.

Two independent branches (customer, products) feeding into a third —
enough to exercise real cross-node mapping without being a maze.
