---
sidebar_position: 1
sidebar_label: Overview
---

# Overview

Swagger UI lets you try one API call at a time. Enlace lets you chain
several — drag the operations you need onto a canvas, wire one call's
output into the next call's input, and run the whole thing from your
browser. Independent branches run at the same time; dependent ones wait
their turn.

It plugs into an app you already have. Point it at your OpenAPI 3.x
document — however you already produce one, Swashbuckle, Springdoc,
swagger-ui-express, hand-written — and it works. There's nothing else to
stand up: no server, no database, no separate execution engine. Every
request fires straight from your browser to your API, the same way
Swagger UI's own "Try it out" does.

## What you can build with it

A chain like: create a customer, then in parallel update that customer
and create a product, then place an order that needs data from both. Each
step's fields can be typed in directly or mapped from an earlier step's
response — so the order's `customerId` comes from step one automatically,
instead of you copy-pasting an ID between browser tabs.

## Where to go next

- **[Install it](./installing.md)** in your app — a few lines, whichever
  framework you're on.
- **[Try the demo](./try-the-demo.md)** against a sample API before
  touching your own — five minutes, no setup.
- Ready to build a real chain? Jump to
  [Connect operations and map data](../guides/connecting-and-mapping.md).
