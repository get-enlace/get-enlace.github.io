import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import HeroIllustration from '@site/src/components/HeroIllustration';

import styles from './index.module.css';

type Feature = {
  icon: string;
  title: string;
  description: ReactNode;
};

const features: Feature[] = [
  {
    icon: '🔗',
    title: 'Any OpenAPI document',
    description: (
      <>
        The only input contract is a valid OpenAPI 3.x document. Enlace
        doesn't care what produced it — Swashbuckle, Springdoc,
        swagger-ui-express, hand-written, anything.
      </>
    ),
  },
  {
    icon: '🌐',
    title: 'Runs entirely in your browser',
    description: (
      <>
        Same trust model as Swagger UI's own "Try it out," extended to a
        whole chain of calls. There's no server-side execution engine
        anywhere in Enlace.
      </>
    ),
  },
  {
    icon: '⚡',
    title: 'Independent branches run concurrently',
    description: (
      <>
        Nodes are grouped into dependency-ordered levels; everything
        within a level fires at once. "A, then B+C in parallel, then D"
        really does run B and C at the same time.
      </>
    ),
  },
  {
    icon: '🔒',
    title: 'Credentials never leave your browser',
    description: (
      <>
        Bearer tokens, API keys, and OAuth2 credentials live in browser
        memory for the session only — never sent to or stored by the
        adapter, and redacted in the Results pane.
      </>
    ),
  },
  {
    icon: '🐞',
    title: 'Step through a chain like a debugger',
    description: (
      <>
        Arm a breakpoint on any connector and hit Debug instead of Run —
        inspect each request before it fires, then Continue, Step, or
        Stop, without the rest of the chain losing its concurrency.
      </>
    ),
  },
  {
    icon: '💾',
    title: 'Save and share a workflow',
    description: (
      <>
        Export a chain to a portable <code>.enlace</code> file — with or
        without credentials, and password-encrypted when it carries real
        secrets — then hand it to a teammate or check it into a repo.
      </>
    ),
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <HeroIllustration />
      <div className={styles.heroOverlay} />
      <div className={clsx('container', styles.heroContent)}>
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p>
          Drag operations onto a canvas, wire one call's output into the
          next call's input, and run the whole chain from the browser.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/start-here/installing">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--outline button--lg"
            to="/docs/start-here/overview">
            What is Enlace?
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className="row">
          {features.map((feature) => (
            <div key={feature.title} className={clsx('col col--4', 'margin-bottom--lg')}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <Heading as="h3">{feature.title}</Heading>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomepageQuickstart() {
  return (
    <section className={styles.sectionAlt}>
      <div className="container">
        <div className={styles.quickstartIntro}>
          <Heading as="h2">Mount it in your existing app</Heading>
          <p>
            Enlace mounts as middleware — no separate service, no
            database, no Docker container.
          </p>
        </div>
        <Tabs groupId="adapter">
          <TabItem value="aspnetcore" label="ASP.NET Core">
            <CodeBlock language="bash">dotnet add package Enlace.AspNetCore</CodeBlock>
            <CodeBlock language="csharp">{`builder.Services.AddEnlace();
// ...
app.UseEnlace(); // mounts at /enlace by default`}</CodeBlock>
          </TabItem>
          <TabItem value="express" label="Express">
            <CodeBlock language="bash">npm install @get-enlace/express</CodeBlock>
            <CodeBlock language="ts">{`import { enlace } from '@get-enlace/express';

app.use('/enlace', enlace({ spec: './openapi.json' }));`}</CodeBlock>
          </TabItem>
          <TabItem value="nestjs" label="NestJS">
            <CodeBlock language="bash">npm install @get-enlace/nest</CodeBlock>
            <CodeBlock language="ts">{`import { EnlaceModule } from '@get-enlace/nest';

@Module({ imports: [EnlaceModule.forRoot({ spec: './openapi.json' })] })
export class AppModule {}`}</CodeBlock>
          </TabItem>
          <TabItem value="spring" label="Spring Boot">
            <CodeBlock language="xml">{`<dependency>
    <groupId>io.github.get-enlace</groupId>
    <artifactId>enlace-spring-boot-starter</artifactId>
    <version>0.0.1</version>
</dependency>`}</CodeBlock>
            <p>
              That's it — autoconfiguration mounts <code>/enlace</code> for a
              project already running springdoc conventionally.
            </p>
          </TabItem>
        </Tabs>
        <div className={clsx(styles.buttons, 'margin-top--lg')}>
          <Link className="button button--primary button--lg" to="/docs/start-here/installing">
            Full setup guide →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="A visual, chained-execution canvas for any OpenAPI-documented API. Runs entirely in your browser.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageQuickstart />
      </main>
    </Layout>
  );
}
