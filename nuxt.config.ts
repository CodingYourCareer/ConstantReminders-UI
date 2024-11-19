import { createResolver } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  // TypeScript configuration
  typescript: {
    shim: false,
    strict: true,
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: [resolve("./assets/tailwind.css")],

  devtools: { enabled: true },

  // Disable server-side rendering
  ssr: false,

  vite: {
    optimizeDeps: {
      exclude: ["pinia"],
    },
  },

  // Modules configuration for Nuxt 3
  modules: ["@nuxtjs/tailwindcss"],

  compatibilityDate: "2024-11-16",

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
    head: {
      titleTemplate: "%s | Constant Reminders",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },

  experimental: {
    localLayerAliases: true,
  },
});
