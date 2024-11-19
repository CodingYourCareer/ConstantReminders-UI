import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  // TypeScript configuration
  typescript: {
    shim: false,  // Disable TypeScript shims
  },

  // Disable server-side rendering
  ssr: false,

  // Modules configuration for Nuxt 3
  modules: [
    
     '@nuxtjs/tailwindcss',
  ],

  compatibilityDate: '2024-11-16',
});