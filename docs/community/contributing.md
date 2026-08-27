---
sidebar_position: 2
---

# Contributing

These docs cover *using* Enlace. The internals — architecture, data
model, how CI/releases work, local dev setup — live with the code, one
level closer to what they describe:

| Repo | Architecture | Contributing |
|---|---|---|
| `enlace-ui` (canvas, execution engine) | [ARCHITECTURE.md](https://github.com/get-enlace/enlace-ui/blob/main/ARCHITECTURE.md) | [CONTRIBUTING.md](https://github.com/get-enlace/enlace-ui/blob/main/CONTRIBUTING.md) |
| `enlace-js` (Express, NestJS) | — | [CONTRIBUTING.md](https://github.com/get-enlace/enlace-js/blob/main/CONTRIBUTING.md) |
| `enlace-dotnet` (ASP.NET Core) | — | [CONTRIBUTING.md](https://github.com/get-enlace/enlace-dotnet/blob/main/CONTRIBUTING.md) |
| `enlace-examples` | — | [README.md](https://github.com/get-enlace/enlace-examples/blob/main/README.md) |
| `get-enlace.github.io` (this site) | — | [CONTRIBUTING.md](https://github.com/get-enlace/get-enlace.github.io/blob/main/CONTRIBUTING.md) |

Start with `enlace-ui/ARCHITECTURE.md` if you're trying to understand how
the whole system fits together — it's the package everything else
depends on.
