---
sidebar_position: 1
sidebar_label: Overview
---

# Overview

Most API documentation tools let you test one endpoint at a time in isolation. **Enlace** turns your OpenAPI 3.x spec into an interactive visual execution graph — drag operations onto a canvas, wire one call's output into the next call's input with dynamic tag autocomplete, and run multi-step workflows concurrently right from your browser. Independent branches execute in parallel; dependent ones wait their turn.

It mounts directly into an application you already have. Point it at your OpenAPI 3.x document — however you produce one (FastAPI, Swashbuckle, Springdoc, NestJS, Express, or hand-written) — and it works. There is nothing else to stand up: no server orchestration, no database, and no separate execution backend. Every request fires straight from your browser to your API, keeping tokens and credentials securely in browser memory.

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
