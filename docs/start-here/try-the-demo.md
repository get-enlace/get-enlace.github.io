---
sidebar_position: 3
---

# Try the Demo

## No setup at all: try it live

**[enlace-fastapi.onrender.com/enlace](https://enlace-fastapi.onrender.com/enlace/)**
is a hosted, Postgres-backed instance of Enlace running against the
FastAPI [reference example](../examples.md) — nothing to clone or run.
It's the deeper demo: three real credential types (OAuth2 password,
OAuth2 client-credentials, API key) across three actors, chained through
a cart → checkout → payment → fulfillment → shipment flow, with
demo credentials seeded for you. See
[Example Apps](../examples.md#-try-it-live--no-setup-at-all) for the
exact credential values and the full 8-step chain to build.

## Run it yourself: the bundled sample API

The fastest way to see Enlace work on your own machine is against its
own bundled sample API — three cross-referencing resources (Customers,
Products, Orders), no setup beyond cloning one repo.

```bash
git clone https://github.com/get-enlace/enlace-ui.git
cd enlace-ui
npm install
npm start
```

Open `http://localhost:4000/enlace`.

## Build a chain with two parallel branches

The sample API is shaped to show off concurrent execution: creating a
customer (**A**), then updating that customer and creating a product at
the same time (**B** and **C**, independent of each other), then placing
an order that needs data from **A and C, but not B**.

The palette groups operations by their OpenAPI tag (Customers, Products,
Orders), so you'll find each one under its resource rather than one long
flat list — use **Expand all** if you'd rather browse everything at once.
The search box above it matches operation IDs and [preset](../guides/presets.md)
names together, so typing finds either; prefix with `/` to search paths
instead, or `.` to search presets only.

1. Drag onto the canvas: `POST /customers` (A), `PATCH /customers/{id}`
   (B), `POST /products` (C), `POST /orders` (D).
2. Type values straight into A's `name`/`email` and C's `name`/`price`
   fields.
3. Connect box-to-box: A→B, A→C, A→D, C→D.
4. On B, type `{{` in the `id` path field to map it from A's `id`; type
   a literal value like `"verified"` into `status`.
5. On D, map `customerId` from A's `id` and `productId` from C's `id`
   the same way; type a literal value into `qty`.
6. Click **Run**.

![The four-node chain on the canvas: createCustomer connected to updateCustomer, createProduct, and createOrder, with createProduct also feeding into createOrder](/img/screenshots/canvas-chain-built.jpg)

All four calls come back green, in order A, B, C, D — but watch the
Results pane's timestamps: B and C actually overlap, they don't run one
after the other. That's the whole point — see
[Run a chain and read the results](../guides/running-a-chain.md) for why.

![Run output showing all four requests returning 2xx status codes](/img/screenshots/run-output-all-green.jpg)

## Try it with real authentication

Every write operation in the sample API requires a *different* credential
type, genuinely enforced — get a request wrong and it comes back `401`.
`npm start` also boots a local mock OAuth2 issuer, so the two OAuth2
credential types are a real signed-JWT round trip, not a stub.

Open the **Credentials** drawer — under "Declared in spec" you'll see all
five schemes read straight from the API's own document, ready to
configure with just a name and a made-up secret.

![The Credentials drawer's \"Declared in spec\" list, showing five security schemes read from the OpenAPI document with Configure buttons](/img/screenshots/credentials-declared-in-spec.jpg)

Attach one to each matching node and run again. See
[Authenticate your requests](../guides/authenticating-requests.md) for
what to fill in for each type.

**Next:** point Enlace at your own API — see
[Connect operations and map data](../guides/connecting-and-mapping.md).
