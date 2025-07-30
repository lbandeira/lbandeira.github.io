export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'github-pages',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      fallback: '404.html' // fallback para rotas SSG
    }
  },
  app: {
    baseURL: '/', // <- root do domínio GitHub Pages
  },
  css: ["~/assets/css/tailwind.css"],

  modules: ['@nuxtjs/tailwindcss'],
  compatibilityDate: '2025-07-29',
})
