---
sidebar_position: 3
---

# Try the Demo

The fastest way to see Enlace work is against its own bundled sample API
— three cross-referencing resources (Customers, Products, Orders), no
setup beyond cloning one repo.

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

1. Drag onto the canvas: `POST /customers` (A), `PATCH /customers/{id}`
   (B), `POST /products` (C), `POST /orders` (D).
2. Fill in A's `name`/`email` and C's `name`/`price` with any values.
3. Connect box-to-box: A→B, A→C, A→D, C→D.
4. On B, map `path.id` from A's `id`; give `status` a static value like
   `"verified"`.
5. On D, map `body.customerId` from A's `id` and `body.productId` from
   C's `id`; give `qty` a static value.
6. Click **Run**.

![The four-node chain on the canvas: createCustomer connected to updateCustomer, createProduct, and createOrder, with createProduct also feeding into createOrder](/img/screenshots/canvas-chain-built.jpg)

All four calls come back green, in order A, B, C, D — but watch the debug
pane's timestamps: B and C actually overlap, they don't run one after the
other. That's the whole point — see
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
