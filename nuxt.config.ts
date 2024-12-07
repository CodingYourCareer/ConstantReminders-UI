import { createResolver } from '@nuxt/kit';
import { defineNuxtConfig } from 'nuxt/config';

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@sidebase/nuxt-auth'],

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
  }
});