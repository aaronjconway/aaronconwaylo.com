// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Welcome to my Website!',
  tagline: '',
  url: 'https://aaronconwaylo.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',


  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          sidebarPath: 'sidebars.js',
        },
        blog: {
          showReadingTime: true,

        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: "G-1ZMZ11D36T",
          anonymizeIP: true,
        },
      }),
    ],
  ],

  plugins: [
    [
      'content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'about',
        path: 'about',
        routeBasePath: 'about',
      }),
    ],
    async function myPlugin(context, options) {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // appends the tailwindcss and autoprefixer
          postcssOptions.plugins.push(require('tailwindcss'));
          postcssOptions.plugins.push(require('autoprefixer'));
          return postcssOptions;
        },
      };
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Aaron Conway',
        items: [
          {
            to: 'about/about',
            position: 'right',
            label: 'About',
          },
          {
            to: 'calculator',
            position: 'right',
            label: 'Calculator',
          },
          {
            type: 'doc',
            docId: 'intro',
            position: 'right',
            label: 'Knowledge Base',
          },
          {
            to: 'blog',
            label: 'Blog',
            position: 'right'
          },
          {
            to: 'https://aaronconway.floify.com/apply',
            label: 'Apply Now',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Compliance',
            items: [
              {
                label: 'NMLS Consumer Access',
                to: 'https://nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/1660690',
              },
              {
                label: 'Texas Compliant Notice',
                to: 'https://nexamortgage.com/texas-complaint/',
              },
              {
                label: 'Licensing',
                to: 'about/licensing',
              },
              {
                label: 'Privacy Policy',
                to: 'about/privacy-policy',
              },
            ],
          },
          {
            title: 'Address',
            items: [
              {
                label: '3100 W Ray Road #201 Office #209 Chandler, AZ 85226',
                to: 'httpsorg/EntityDetails.aspx/COMPANY/1660690',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Aaron Conway Loan Officer, LLC`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
