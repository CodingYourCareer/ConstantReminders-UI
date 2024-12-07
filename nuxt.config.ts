import { createResolver } from '@nuxt/kit';
import { defineNuxtConfig } from 'nuxt/config';

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'nuxt-oidc-auth'],

  // TypeScript configuration
  typescript: {
    shim: false,
    strict: true
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  css: [resolve('./assets/tailwind.css')],

  devtools: { enabled: true },

  // Disable server-side rendering
  ssr: false,

  vite: {
    optimizeDeps: {
      exclude: ['pinia']
    }
  },

  compatibilityDate: '2024-11-16',

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      titleTemplate: '%s | Constant Reminders',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }]
    }
  },

  experimental: {
    localLayerAliases: true
  },

  oidc: {
    defaultProvider: 'auth0',
    providers: {
      auth0: {
        // audience: process.env.NUXT_OIDC_PROVIDERS_AUTH0_AUDIENCE,
        responseType: 'code',
        redirectUri: process.env.NUXT_OIDC_PROVIDERS_AUTH0_REDIRECT_URI,
        baseUrl: process.env.NUXT_OIDC_PROVIDERS_AUTH0_BASE_URL,
        clientId: process.env.NUXT_OIDC_PROVIDERS_AUTH0_CLIENT_ID,
        clientSecret: process.env.NUXT_OIDC_PROVIDERS_AUTH0_CLIENT_SECRET,
        grantType: 'authorization_code',
        scope: ['openid', 'email'],
        validateIdToken: true,
        validateAccessToken: true,
        exposeAccessToken: true,
        additionalTokenParameters: {
          // audience: process.env.NUXT_OIDC_PROVIDERS_AUTH0_AUDIENCE
        },
        tokenRequestType: 'json'
      }
    },
    session: {
      expirationCheck: true,
      automaticRefresh: true,
      expirationThreshold: 3600
    },
    middleware: {
      globalMiddlewareEnabled: false // Disable global middleware
    }
  }
});