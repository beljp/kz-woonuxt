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
  
  // ✅ i18n instellingen
  i18n: {
    lazy: false,
    langDir: './woonuxt_base/i18n/locales', // correcte map
    defaultLocale: 'nl_NL',
    strategy: 'no_prefix',
    locales: [
      { code: 'nl_NL', file: 'nl-NL.json', name: 'Nederlands' },
    ],
  },
  
  vite: {
    plugins: [require('@rollup/plugin-graphql')()],
  },

  generate: {
    fallback: true, // ⬅️ zorgt dat client routes zoals /broeken werken
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
