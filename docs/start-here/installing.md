---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installing

Enlace mounts as middleware in your app. Pick your framework:

<Tabs groupId="adapter">
<TabItem value="aspnetcore" label="ASP.NET Core">

```bash
dotnet add package Enlace.AspNetCore
```

```csharp
// Program.cs
builder.Services.AddEnlace();
// ...
app.UseEnlace(); // mounts at /enlace by default
```

If you're already running Swashbuckle conventionally, that's it — no
`spec` needed. See [the ASP.NET Core adapter page](../adapters/aspnetcore.md)
if it isn't found automatically.

</TabItem>
<TabItem value="express" label="Express">

```bash
npm install @get-enlace/express
```

```ts
import { enlace } from '@get-enlace/express';

app.use('/enlace', enlace({ spec: './openapi.json' }));
```

</TabItem>
<TabItem value="nestjs" label="NestJS">

```bash
npm install @get-enlace/nest
```

```ts
import { EnlaceModule } from '@get-enlace/nest';

@Module({ imports: [EnlaceModule.forRoot({ spec: './openapi.json' })] })
export class AppModule {}
```

</TabItem>
<TabItem value="spring" label="Spring Boot">

```xml
<dependency>
    <groupId>io.github.get-enlace</groupId>
    <artifactId>enlace-spring-boot-starter</artifactId>
    <version>0.0.1</version>
</dependency>
```

Nothing else to wire up — adding the dependency is enough for a project
already running springdoc conventionally. See
[the Spring Boot adapter page](../adapters/java.md) for custom mount
paths and spec resolution if it isn't found automatically.

</TabItem>
</Tabs>

`spec` is a file path, a URL, or an already-parsed OpenAPI 3.x object —
whatever's easiest to point at your API's own document.

Open the route you mounted it at (`/enlace` by default) and you'll see
every operation from your spec, ready to drag onto the canvas.

**Next:** [try it against a sample API first](./try-the-demo.md), or jump
straight to [building a chain](../guides/connecting-and-mapping.md) with
your own.
