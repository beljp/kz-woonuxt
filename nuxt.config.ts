import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  extends: ['./woonuxt_base'],

  runtimeConfig: {
    public: {
      wcKey: process.env.WC_KEY,
      wcSecret: process.env.WC_SECRET,
    },
  },

  components: [{ path: './components', pathPrefix: false }],

  nitro: {
    prerender: {
      concurrency: 10,
      interval: 1000,
      failOnError: false,
      routes: [],
    },
    minify: true,
    preset: 'netlify', // ⬅️ belangrijk voor Netlify
  },

  // ✅ Toegevoegd – 31-10-2025
  routeRules: {
    '/': { static: true },
    '/**': { isr: 600 }, // hergenereer elke 10 minuten
  },

  vite: {
    plugins: [require('@rollup/plugin-graphql')()],
  },

  generate: {
    fallback: true, // ⬅️ zorgt dat client routes zoals /broeken werken
    i18n: {
  lazy: true,
  langDir: 'locales',
  strategy: 'no_prefix',
  defaultLocale: 'nl_NL',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root',
  },
  vueI18n: {
    legacy: false,
    locale: 'nl_NL',
    fallbackLocale: 'nl_NL',
  },
},
  },

  hooks: {
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
})
