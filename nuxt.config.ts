// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
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
  ],
  runtimeConfig: {
    postgres: {
      db_url: process.env.DATABASE_URL || ''
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
    vueI18n:'./i18n.config.ts',
    baseUrl: process.env.BASE_URL || '',
    langDir: './lang',
    // lazy:true,
    locales: [
      {
        code: 'en',
        iso: 'en-GB',
        name: 'gb',
        files: [
          'en/general.json'
        ]
      },
      {
        code: 'it',
        iso: 'it-IT',
        name: 'it',
        files: [
          'it/general.json'
        ]
      },
    ],
    defaultLocale: 'en',
  },
  pwa: {

  },
  image: {
    quality: 90,
    format: ['webp', 'avif']
  },
  ui: {
    global: true
  }
});