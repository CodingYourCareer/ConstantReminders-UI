import Tailwind from "@tailwindcss/vite";

const isDeployed =
  process.env.AUTH_ORIGIN === "http://localhost:3000" ||
  !process.env.AUTH_ORIGIN
    ? false
    : true;
const deploymentDomain = process.env.AUTH_ORIGIN || "http://localhost:3000";

export default defineNuxtConfig({
  modules: [
    "@sidebase/nuxt-auth",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxtjs/color-mode",
    "@hebilicious/vue-query-nuxt",
    "@nuxt/scripts",
    "@nuxtjs/seo",
    "@vueuse/nuxt",
    "@nuxt/ui",
  ],

  // TypeScript configuration
  typescript: {
    shim: false,
    strict: true,
  },

  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    originEnvKey: "AUTH_ORIGIN",
    baseURL: `${deploymentDomain}/api/auth`,
    globalAppMiddleware: {
      isEnabled: true,
      allow404WithoutAuth: true,
      addDefaultCallbackUrl: true,
    },
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
    },
    provider: {
      type: "authjs",
      trustHost: false,
      defaultProvider: "auth0",
      addDefaultCallbackUrl: true,
    },
  },

  css: ["./app/assets/tailwind.css"],

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  vite: {
    plugins: [Tailwind()],
  },

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

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
    dataValue: "theme",
  },
  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    componentIslands: true,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  schemaOrg: {
    identity: {
      type: "Organization",
      name: "Coding Your Career",
      url: process.env.NUXT_SITE_URL,
      // logo: "/CRCLogo.png",
    },
  },

  runtimeConfig: {
    public: {
      // NUXT_PUBLIC_API_BASE_URL=<your-url>
      apiBaseUrl: "",
      isDeployed,
    },
    nextAuthSecret: process.env.NEXTAUTH_SECRET,
    auth0ClientId: process.env.AUTH0_CLIENT_ID,
    auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET,
    auth0Issuer: process.env.AUTH0_ISSUER,
  },
});
