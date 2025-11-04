import { createResolver } from '@nuxt/kit'
import { defineNuxtConfig } from 'nuxt/config'

const { resolve } = createResolver(import.meta.url)

// Environment variables with fallbacks
const GQL_HOST = process.env.GQL_HOST || 'http://localhost:4000/graphql'
const APP_HOST = process.env.APP_HOST || 'http://localhost:3000'

export default defineNuxtConfig({
  ssr: true, // ✅ belangrijk
  rootDir: resolve('.'),
  modulesDir: [resolve('../node_modules')], // 👈 belangrijk voor monorepo-structuur

  image: {
    provider: 'none',
    domains: ['wp.kledingzoeken.nl'], // ← vervang met je echte domein
  },

  compatibilityDate: '2025-08-10',

  app: {
    head: {
      htmlAttrs: { lang: 'nl' },
      link: [{ rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    },
    pageTransition: { name: 'page', mode: 'default' },
  },

  plugins: [resolve('./app/plugins/init.ts')],

  components: [{ path: resolve('./app/components'), pathPrefix: false }],

  modules: [
    resolve('./modules/woonuxt-bridge.ts'),
    'nuxt-graphql-client',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/i18n',
  ],

  runtimeConfig: {
    public: {
      'graphql-client': {
        clients: {
          default: {
            host: GQL_HOST,
            headers: { Origin: APP_HOST },
            fetchOptions: {
              mode: 'cors',
              credentials: 'include',
            },
          },
        },
      },
    },
  },

  alias: {
    '#constants': resolve('./app/constants'),
    '#woo': resolve('./.nuxt/gql/default'), // ✅ correcte alias voor Netlify
  },

  hooks: {
    'pages:extend'(pages) {
      const addPage = (name: string, path: string, file: string) => {
        pages.push({ name, path, file: resolve(`./app/pages/${file}`) })
      }

      // ✅ Routes
      addPage('product-page-pager', '/products/page/:pageNumber', 'products.vue')
      addPage('product-category-page', '/c/:categorySlug', 'c/[slug].vue')
      addPage('product-category-page-pager', '/c/:categorySlug/page/:pageNumber', 'c/[slug].vue')
      addPage('order-received', '/checkout/order-received/:orderId', 'order-summary.vue')
      addPage('order-summary', '/order-summary/:orderId', 'order-summary.vue')
    },
  },

  nitro: {
    preset: 'netlify',
    routeRules: {
      '/checkout/order-received/**': { prerender: false },
      '/order-summary/**': { prerender: false },
      '/api/**': { prerender: false },
    },
  },

  // 🌍 i18n-configuratie
  i18n: {
    locales: [
      { code: 'en_US', file: 'en-US.json', name: 'English 🇺🇸' },
      { code: 'nl_NL', file: 'nl-NL.json', name: 'Dutch' },
      { code: 'de_DE', file: 'de-DE.json', name: 'Deutsch 🇩🇪' },
      { code: 'es_ES', file: 'es-ES.json', name: 'Español 🇪🇸' },
      { code: 'fr_FR', file: 'fr-FR.json', name: 'Français 🇫🇷' },
      { code: 'it_IT', file: 'it-IT.json', name: 'Italiano 🇮🇹' },
      { code: 'pt_BR', file: 'pt-BR.json', name: 'Português 🇧🇷' },
    ],
    langDir: 'locales',
    defaultLocale: 'nl_NL',
    strategy: 'no_prefix',
  },
})
