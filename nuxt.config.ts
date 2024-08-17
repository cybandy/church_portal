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
   
  ],
  runtimeConfig: {
    postgres: {
      db_url: process.env.DATABASE_URL || ''
    },
    public: {
      jwt: {
        secret_key: process.env.JWT_SECRET || 'jwt_secret_key'
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
    vueI18n: './i18n.config.ts',
    baseUrl: process.env.BASE_URL || '',
    langDir: './locales',
    // lazy:true,
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'us',
        files: [
          "en-US.json"
        ]
      },
      {
        code: 'it',
        iso: 'it-IT',
        name: 'it',
        files: [
          'it-IT.json'
        ]
      },
      {
        code: 'fr',
        iso: 'fr-Fr',
        name: 'fr',
        files: [
          "fr-FR.json"
        ]
      },
      {
        code: 'de',
        iso: 'de-DE',
        name: 'de',
        files: [
          'de-DE.json'
        ]
      },
    ],
    defaultLocale: 'en',
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
 
});