import { createResolver } from '@nuxt/kit'
import { defineNuxtConfig } from 'nuxt/config'

const { resolve } = createResolver(import.meta.url)

// ✅ Environment variables met fallbacks
const GQL_HOST = process.env.GQL_HOST || 'https://wp.kledingzoeken.nl/graphql'
const APP_HOST = process.env.APP_HOST || 'https://kledingzoeken.nl'

export default defineNuxtConfig({
  extends: ['./woonuxt_base'],

  compatibilityDate: '2025-08-10',

  app: {
    head: {
      htmlAttrs: { lang: 'nl' },
      link: [{ rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    },
    pageTransition: { name: 'page', mode: 'default' },
  },

  image: {
    provider: 'none',
    domains: ['wp.kledingzoeken.nl'],
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
    '#woo': '../.nuxt/gql/default',
  },

  hooks: {
    'pages:extend'(pages) {
      const addPage = (name: string, path: string, file: string) => {
        pages.push({ name, path, file: resolve(`./app/pages/${file}`) })
      }

      // ✅ Bestaande routes
      addPage('product-page-pager', '/products/page/:pageNumber', 'products.vue')
      addPage('product-category-page', '/product-category/:categorySlug', 'product-category/[slug].vue')
      addPage('product-category-page-pager', '/product-category/:categorySlug/page/:pageNumber', 'product-category/[slug].vue')
      addPage('order-received', '/checkout/order-received/:orderId', 'order-summary.vue')
      addPage('order-summary', '/order-summary/:orderId', 'order-summary.vue')
    },

    // ✅ Dynamische categorieën prerenderen (blijft behouden)
    async 'nitro:config'(nitroConfig) {
      try {
        const res = await fetch('https://wp.kledingzoeken.nl/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              {
                productCategories(first: 100) {
                  nodes {
                    slug
                  }
                }
              }
            `,
          }),
        })

        const json = await res.json()
        const slugs = json?.data?.productCategories?.nodes?.map((n: any) => n.slug) || []
        console.log('✅ [Prerender Hook] Categorieën gevonden:', slugs.length)

        nitroConfig.prerender.routes.push(...slugs.map((slug: string) => `/${slug}`))
      } catch (err) {
        console.warn('⚠️ [Prerender Hook] Kon categorieën niet ophalen:', err)
      }
    },
  },

  nitro: {
    preset: 'netlify', // ✅ zorgt voor correcte SSR build op Netlify
    prerender: {
      concurrency: 10,
      interval: 1000,
      failOnError: false,
      routes: [],
    },
    routeRules: {
      '/checkout/order-received/**': { prerender: false },
      '/order-summary/**': { prerender: false },
    },
    minify: true,
  },

  // ✅ Static fallback zodat /broeken, /dames/broeken enz. werken op Netlify
  generate: {
    fallback: true,
  },

  // ✅ i18n fix: laadt vertalingen direct in, voorkomt 404 voor /_i18n/...
  i18n: {
    lazy: false, // ⬅️ voorkomt 404 bij messages.json
    langDir: 'locales',
    defaultLocale: 'nl_NL',
    strategy: 'no_prefix',
    locales: [
      { code: 'en_US', file: 'en-US.json', name: 'English 🇺🇸' },
      { code: 'nl_NL', file: 'nl-NL.json', name: 'Dutch 🇳🇱' },
      { code: 'de_DE', file: 'de-DE.json', name: 'Deutsch 🇩🇪' },
      { code: 'es_ES', file: 'es-ES.json', name: 'Español 🇪🇸' },
      { code: 'fr_FR', file: 'fr-FR.json', name: 'Français 🇫🇷' },
      { code: 'it_IT', file: 'it-IT.json', name: 'Italiano 🇮🇹' },
      { code: 'pt_BR', file: 'pt-BR.json', name: 'Português 🇧🇷' },
    ],
  },
})
