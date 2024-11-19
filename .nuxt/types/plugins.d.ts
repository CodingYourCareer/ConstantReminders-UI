// Generated by Nuxt'
import type { Plugin } from '#app'

type Decorate<T extends Record<string, any>> = { [K in keyof T as K extends string ? `$${K}` : never]: T[K] }

type InjectionType<A extends Plugin> = A extends {default: Plugin<infer T>} ? Decorate<T> : unknown

type NuxtAppInjections = 
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.14.159_@parcel+watcher@2.5.0_@types+node@22.9.0_eslint@8.57.1_ioredis@5.4.1_magicast@0_3vzg6mnte7rvpjd6fsfna27ewi/node_modules/nuxt/dist/app/plugins/revive-payload.client.js")> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.14.159_@parcel+watcher@2.5.0_@types+node@22.9.0_eslint@8.57.1_ioredis@5.4.1_magicast@0_3vzg6mnte7rvpjd6fsfna27ewi/node_modules/nuxt/dist/head/runtime/plugins/unhead.js")> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.14.159_@parcel+watcher@2.5.0_@types+node@22.9.0_eslint@8.57.1_ioredis@5.4.1_magicast@0_3vzg6mnte7rvpjd6fsfna27ewi/node_modules/nuxt/dist/app/plugins/router.js")> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.14.159_@parcel+watcher@2.5.0_@types+node@22.9.0_eslint@8.57.1_ioredis@5.4.1_magicast@0_3vzg6mnte7rvpjd6fsfna27ewi/node_modules/nuxt/dist/app/plugins/navigation-repaint.client.js")> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.14.159_@parcel+watcher@2.5.0_@types+node@22.9.0_eslint@8.57.1_ioredis@5.4.1_magicast@0_3vzg6mnte7rvpjd6fsfna27ewi/node_modules/nuxt/dist/app/plugins/check-outdated-build.client.js")> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.14.159_@parcel+watcher@2.5.0_@types+node@22.9.0_eslint@8.57.1_ioredis@5.4.1_magicast@0_3vzg6mnte7rvpjd6fsfna27ewi/node_modules/nuxt/dist/app/plugins/revive-payload.server.js")> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.14.159_@parcel+watcher@2.5.0_@types+node@22.9.0_eslint@8.57.1_ioredis@5.4.1_magicast@0_3vzg6mnte7rvpjd6fsfna27ewi/node_modules/nuxt/dist/app/plugins/chunk-reload.client.js")> &
  InjectionType<typeof import("../../node_modules/.pnpm/@nuxt+devtools@1.6.0_rollup@4.27.3_vite@5.4.11_@types+node@22.9.0_sass@1.81.0_terser@5.36.0___njzuupf7eswip5oaf5nd7xcxli/node_modules/@nuxt/devtools/dist/runtime/plugins/devtools.server.js")> &
  InjectionType<typeof import("../../node_modules/.pnpm/@nuxt+devtools@1.6.0_rollup@4.27.3_vite@5.4.11_@types+node@22.9.0_sass@1.81.0_terser@5.36.0___njzuupf7eswip5oaf5nd7xcxli/node_modules/@nuxt/devtools/dist/runtime/plugins/devtools.client.js")> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.14.159_@parcel+watcher@2.5.0_@types+node@22.9.0_eslint@8.57.1_ioredis@5.4.1_magicast@0_3vzg6mnte7rvpjd6fsfna27ewi/node_modules/nuxt/dist/app/plugins/dev-server-logs.js")> &
  InjectionType<typeof import("../../node_modules/.pnpm/nuxt@3.14.159_@parcel+watcher@2.5.0_@types+node@22.9.0_eslint@8.57.1_ioredis@5.4.1_magicast@0_3vzg6mnte7rvpjd6fsfna27ewi/node_modules/nuxt/dist/app/plugins/check-if-layout-used.js")>

declare module '#app' {
  interface NuxtApp extends NuxtAppInjections { }

  interface NuxtAppLiterals {
    pluginName: 'nuxt:revive-payload:client' | 'nuxt:head' | 'nuxt:router' | 'nuxt:revive-payload:server' | 'nuxt:chunk-reload' | 'nuxt:global-components' | 'nuxt:checkIfLayoutUsed'
  }
}

declare module 'vue' {
  interface ComponentCustomProperties extends NuxtAppInjections { }
}

export { }
