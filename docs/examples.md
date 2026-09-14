---
sidebar_position: 4
---

# Example Apps

[`enlace-examples`](https://github.com/get-enlace/enlace-examples) has a
runnable sample app per adapter — `aspnetcore/`, `express/`, `fastapi/`,
`java/`, `nest/` — each already wired up to Enlace, so you can see a
real chain working before you touch your own API.

## 🚀 Try it live — no setup at all

The `fastapi/` example is deployed and running right now, Postgres-backed,
with real OAuth2 auth:

👉 **[enlace-fastapi.onrender.com/enlace](https://enlace-fastapi.onrender.com/enlace/)**

Open it, drop in the seeded demo credentials, and build the chain below —
nothing to install, nothing to run locally.

## The two reference chains

The four CRUD-only examples (`aspnetcore/`, `express/`, `java/`, `nest/`)
implement one shared, unauthenticated contract — customers, products,
orders — so a chain built against one works unmodified against any other:

1. `POST /customers` — capture the new customer's `id`.
2. `POST /products` (×2) — capture both `id`s.
3. `POST /orders`, mapping `customerId` from step 1 and each item's
   `productId` from step 2 — capture the order's `id` and its
   server-computed `total`.
4. `PUT /orders/{id}/status`, with `id` mapped from step 3, body
   `{ "status": "paid" }`.
5. `GET /orders/{id}` — confirm the status change.

`fastapi/` goes further: it's the **production reference implementation**
— three real credential types across three actors (customer, admin,
carrier), a compound cart→checkout→payment→fulfillment→shipment flow, and
an 8-step chain with two credential switches mid-run:

1. `GET /products` (no credential) — pick a product's `id`.
2. `POST /carts` (`customer` credential) — capture the cart's `id`.
3. `POST /carts/{cartId}/items`, `productId` mapped from step 1.
4. `POST /carts/{cartId}/checkout` — capture **both** `order.id` and
   `payment.id` out of one compound response.
5. `POST /payments/{id}/confirm`, `id` mapped from step 4's `payment.id`.
6. `POST /orders/{id}/fulfill`, `id` mapped from step 4's `order.id` —
   **switch to the `admin` credential here** — capture the shipment's
   `trackingNumber`.
7. `PUT /shipments/{trackingNumber}/status`, mapped from step 6 —
   **switch to the `carrier` credential here**.
8. `GET /shipments/{trackingNumber}` (no credential) — confirm
   `status: "delivered"`.

See [`fastapi/README.md`](https://github.com/get-enlace/enlace-examples/blob/main/fastapi/README.md#testing-the-live-demo)
for the exact demo credential values, or
[`CONTRACT.md`](https://github.com/get-enlace/enlace-examples/blob/main/CONTRACT.md)
for the full API shape behind both chains. The CRUD-only examples will
grow into this same richer contract over time — for now, `fastapi/` is
the one that's actually there, and it's the one that's live.
