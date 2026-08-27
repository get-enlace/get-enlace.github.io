import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Enlace',
  tagline: 'A visual, chained-execution canvas for any OpenAPI-documented API',
  favicon: 'img/favicon-mono-white.svg',

  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://get-enlace.github.io',
  // This is an org (<org>.github.io) site, so it's served at the root.
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'get-enlace',
  projectName: 'get-enlace.github.io',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/get-enlace/get-enlace.github.io/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/enlace-logo.svg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Enlace',
      logo: {
        alt: 'Enlace logo',
        src: 'img/enlace-logo.svg',
        srcDark: 'img/enlace-logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'dropdown',
          label: 'Adapters',
          position: 'left',
          items: [
            {label: 'Express', to: '/docs/adapters/express'},
            {label: 'NestJS', to: '/docs/adapters/nestjs'},
            {label: 'ASP.NET Core', to: '/docs/adapters/aspnetcore'},
          ],
        },
        {
          href: 'https://github.com/get-enlace/enlace-ui/issues/new?title=%5BFeature%5D%3A+&labels=enhancement',
          label: 'Request a Feature',
          position: 'left',
        },
        {
          href: 'https://github.com/get-enlace',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Overview', to: '/docs/start-here/overview'},
            {label: 'Building a Chain', to: '/docs/guides/connecting-and-mapping'},
            {label: 'Adapters', to: '/docs/adapters/express'},
            {label: 'Reference', to: '/docs/reference/credential-types'},
          ],
        },
        {
          title: 'Repos',
          items: [
            {label: 'enlace-ui', href: 'https://github.com/get-enlace/enlace-ui'},
            {label: 'enlace-js', href: 'https://github.com/get-enlace/enlace-js'},
            {label: 'enlace-dotnet', href: 'https://github.com/get-enlace/enlace-dotnet'},
            {label: 'enlace-examples', href: 'https://github.com/get-enlace/enlace-examples'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'Feature Requests', to: '/docs/community/feature-requests'},
            {label: 'Contributing', to: '/docs/community/contributing'},
            {label: 'GitHub', href: 'https://github.com/get-enlace'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Enlace. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
