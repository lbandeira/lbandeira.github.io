import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,vue}',
    './components/**/*.{js,ts,vue}',
    './app/**/*.{js,ts,vue}',
    './layouts/**/*.{js,ts,vue}',
    './*.html',
  ],
  theme: {
    extend: {
      colors: {
        'sky-pastel': '#A6D0E4',
        'green-pastel': '#C4E3D0',
        'golden-pastel': '#F1CB8C',
        'background-soft': '#F3EBEB',
        'rose-pastel': '#F99D9D',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true, // isso garante que o reset padrão do Tailwind está ativado
  },
}

export default config


