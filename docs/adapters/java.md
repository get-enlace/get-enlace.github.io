---
sidebar_position: 4
---

# Spring Boot

`enlace-spring-boot-starter`, published from [`get-enlace/enlace-java`](https://github.com/get-enlace/enlace-java).

## Install

```xml
<dependency>
    <groupId>io.github.get-enlace</groupId>
    <artifactId>enlace-spring-boot-starter</artifactId>
    <version>0.0.1</version>
</dependency>
```

## Usage

Nothing to wire up by hand — adding the dependency is enough. Spring
Boot's autoconfiguration mounts the canvas at `/enlace` as soon as it's
on the classpath, for a project already running springdoc conventionally:

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

Open `/enlace` and the canvas loads, reading your resolved spec from
`/enlace/api/spec`.

To customize the mount path or point at an explicit spec:

```properties
# application.properties
enlace.path=enlace
enlace.spec-url=https://internal-host/custom/openapi.json
```

This package's job is intentionally small: it serves the canvas UI and
resolves your OpenAPI document. Everything else — running a chain,
mapping fields, credentials — happens in the browser; see
[Building a Chain](../guides/connecting-and-mapping.md).

## Spec resolution

Unlike some adapters, you never pass your spec in directly — this one
finds it for you:

1. **Zero-config default** — if your app already runs springdoc
   conventionally, its spec is already served at `/v3/api-docs`; the
   adapter defaults to that path with no configuration needed.
2. **Auto-detect fallback** — if that doesn't resolve, it tries a short
   list of other conventional paths (`/v3/api-docs.yaml`, `/swagger.json`,
   `/openapi.json`) with a plain HTTP request to your app's own server —
   no reflection into route tables or framework internals.
3. **Explicit override** — set `enlace.spec-url` to point at anything
   else: a customized route, a different service's spec, a static file.
4. **Failure is loud, not fatal** — if nothing resolves, the app keeps
   running (the UI shell still loads) but `GET /enlace/api/spec` reports
   the failure with what was tried, and the application log names it at
   ERROR, rather than rendering a silent empty canvas.

Want to see it running end to end first? There's a working
[Spring Boot example app](../examples.md) you can run locally.
