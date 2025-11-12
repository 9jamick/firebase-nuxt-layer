export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxt/ui'],
  extends: ['../module'],
  ssr: false,
  ui: {
    colorMode: false,
  }
})
