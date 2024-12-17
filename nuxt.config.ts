// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  devServer: {
    port: 443,
    host: 'churchportal.local',
    https: {
      key: './ssl/churchportal.local-key.pem',
      cert: './ssl/churchportal.local.pem'
    }
  },
  css: [
    '~~/app/assets/css/main.css'
  ],
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxt/eslint',
    "@nuxt/ui",
    "@vite-pwa/nuxt",
    "nuxt-translation-manager",
    '@pinia-plugin-persistedstate/nuxt',
    "@nuxt/scripts",
    "@nuxt/fonts",
    "@nuxtjs/seo",
    '@nuxtjs/device',
    '@nuxtjs/algolia'
  ],
  runtimeConfig: {
    postgres: {
      db_url: process.env.DATABASE_URL || ''
    },
    public: {
      jwt: {
        secret_key: process.env.JWT_SECRET || 'jwt_secret_key'
      },
    },
    private: {
      algolia: {
        write_key: process.env.ALGOLIA_WRITE_KEY || ""
      }
    }
  },
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: false,
      },

    },
  },
  i18n: {
    // vueI18n: './i18n.config.ts',
    baseUrl: process.env.BASE_URL || '',
    langDir: './locales',
    // lazy:true,
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        language: 'en-US',
        name: 'us',
        files: [
          "en-US.json"
        ],
        domain: `https://en.${process.env.I18N_DOMAIN}`
      },
      {
        code: 'it',
        iso: 'it-IT',
        language: 'it-IT',
        name: 'it',
        files: [
          'it-IT.json'
        ],
        domain: `https://it.${process.env.I18N_DOMAIN}`
      },
      {
        code: 'fr',
        iso: 'fr-Fr',
        language: 'fr-Fr',
        name: 'fr',
        files: [
          "fr-FR.json"
        ],
        domain: `https://fr.${process.env.I18N_DOMAIN}`
      },
      {
        code: 'de',
        iso: 'de-DE',
        language: 'de-DE',
        name: 'de',
        files: [
          'de-DE.json'
        ],
        domain: `https://de.${process.env.I18N_DOMAIN}`
      },
    ],
    defaultLocale: 'en',
    differentDomains: false
  },
  icon: {
    customCollections: [
      {
        prefix: 'qb-logo',
        dir: './app/assets/logos'
      }
    ]
  },
  pwa: {

  },
  image: {
    quality: 90,
    format: ['webp', 'avif']
  },
  ui: {
    global: true
  },
  nitro: {
    experimental: {
      tasks: true
    },
    scheduledTasks: {
      '12 0 * * *': ['db:deleted_jwt']
    }
  }

});