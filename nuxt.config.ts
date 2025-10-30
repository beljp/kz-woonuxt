import { defineNuxtConfig } from 'nuxt/config'
import { createResolver } from '@nuxt/kit' // ✅ juiste import voor Nuxt 4.1.3

const { resolve } = createResolver(import.meta.url)

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
    preset: 'netlify', // ✅ belangrijk voor Netlify
  },

  vite: {
    plugins: [require('@rollup/plugin-graphql')()],
  },

  generate: {
    fallback: true, // ✅ zorgt dat client routes zoals /broeken werken
  },

  hooks: {
    // ✅ Dynamische categorieën prerenderen
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

  // ✅ i18n-config — correct pad via resolver
  i18n: {
    lazy: false,
    langDir: resolve('./woonuxt_base/i18n/locales'),
    defaultLocale: 'nl_NL',
    strategy: 'no_prefix',
    locales: [
      { code: 'nl_NL', file: 'nl-NL.json', name: 'Nederlands 🇳🇱' },
      { code: 'en_US', file: 'en-US.json', name: 'English 🇺🇸' },
      { code: 'de_DE', file: 'de-DE.json', name: 'Deutsch 🇩🇪' },
      { code: 'es_ES', file: 'es-ES.json', name: 'Español 🇪🇸' },
      { code: 'fr_FR', file: 'fr-FR.json', name: 'Français 🇫🇷' },
      { code: 'it_IT', file: 'it-IT.json', name: 'Italiano 🇮🇹' },
      { code: 'pt_BR', file: 'pt-BR.json', name: 'Português 🇧🇷' },
    ],
  },
})
