export default {
  // Configurações do Nuxt
  // Ou 'server' se for um projeto SSR
  target: 'static',

  head: {
    title: 'lbandeira',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Página pessoal de lbandeira' },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inria+Sans:wght@400;700&display=swap',
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '~/static/minamaker.svg', // Caminho para o ícone na pasta static/
      },
    ],
  },
  
  css: [
    '~/assets/css/global.css',
  ],

  compatibilityDate: '2025-02-20',
};