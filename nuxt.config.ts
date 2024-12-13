import { createResolver } from '@nuxt/kit';
import { defineNuxtConfig } from 'nuxt/config';

const { resolve } = createResolver(import.meta.url);

const isDeployed = process.env.AUTH_ORIGIN === 'http://localhost:3000' || !process.env.AUTH_ORIGIN ? false : true;
const deploymentDomain = process.env.AUTH_ORIGIN || 'http://localhost:3000';

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@sidebase/nuxt-auth', '@hebilicious/vue-query-nuxt', '@nuxt/eslint'],

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

  runtimeConfig: {
    nextAuthSecret: process.env.NEXTAUTH_SECRET,
    auth0ClientId: process.env.AUTH0_CLIENT_ID,
    auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET,
    auth0Issuer: process.env.AUTH0_ISSUER,
    public: {
      isDeployed
    }
  },

  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    originEnvKey: 'AUTH_ORIGIN',
    baseURL: `${deploymentDomain}/api/auth`,
    globalAppMiddleware: {
      isEnabled: true,
      allow404WithoutAuth: true,
      addDefaultCallbackUrl: true
    },
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true
    },
    provider: {
      type: 'authjs',
      trustHost: false,
      defaultProvider: 'auth0',
      addDefaultCallbackUrl: true
    }
  },

  css: [resolve('./assets/tailwind.css')],

  devtools: { enabled: true },

  vite: {
    optimizeDeps: {
      exclude: ['pinia']
    }
  },

  compatibilityDate: '2024-11-16',

  app: {
    head: {
      titleTemplate: '%s | Constant Reminders',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }]
    }
  },

  experimental: {
    localLayerAliases: true
  }
});