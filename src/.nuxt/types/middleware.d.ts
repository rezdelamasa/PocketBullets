import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "C:/Users/rezde.DESKTOP-CP5BLSV/WebstormProjects/PocketBullets-ts/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}