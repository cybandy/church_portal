// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  site: {
    url: process.env.BASE_URL || 'https://praiseportal.qbtech.dev',
    name: 'PraisePortal'
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
    "@nuxtjs/seo",
    '@nuxtjs/device',
    '@nuxtjs/algolia',
    'nuxt-security'
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
  'translation-manager': {
    langDir: '../i18n/locales'
  },
  i18n: {
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
      },
      {
        code: 'it',
        iso: 'it-IT',
        language: 'it-IT',
        name: 'it',
        files: [
          'it-IT.json'
        ],
      },
      {
        code: 'fr',
        iso: 'fr-Fr',
        language: 'fr-Fr',
        name: 'fr',
        files: [
          "fr-FR.json"
        ],
      },
      {
        code: 'de',
        iso: 'de-DE',
        language: 'de-DE',
        name: 'de',
        files: [
          'de-DE.json'
        ],
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
  image: {
    quality: 90,
    format: ['webp', 'avif']
  },
  ogImage: {
    fonts: [
      'Noto+Sans:400',
      'Noto+Sans:700',
    ]
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        "img-src": [
          "`self`", "https", "data:", "https://flagcdn.com",
        ],
        "object-src": ["https://flagcdn.com",]
      },
      crossOriginResourcePolicy: "cross-origin",
      permissionsPolicy: {
        fullscreen: ["`self`"]
      }
    }
  },
  nitro: {
    experimental: {
      tasks: true
    },
    scheduledTasks: {
      '12 0 * * *': ['db:deleted_jwt']
    },
    prerender: {
      autoSubfolderIndex: false
    }

  },
  experimental: {
    inlineRouteRules: true
  }
});