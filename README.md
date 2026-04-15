# lbandeira.com.br — Next.js

Refatoração do site pessoal para Next.js 14 com App Router.

## Stack

- **Next.js 14** — App Router, Server Components, output estático
- **TypeScript** — tipagem em todo o projeto
- **CSS Modules** — estilização por componente, sem conflitos
- **Google Fonts** — DM Serif Display + DM Mono + Instrument Sans
- **Vercel** — deploy recomendado

## Estrutura

```
src/
  app/
    layout.tsx       # metadata, fontes globais
    page.tsx         # página principal (todas as seções)
    globals.css      # tokens CSS, reset, animações globais
  components/
    Navbar.tsx/.css  # navegação sticky com highlight de seção ativa
    Hero.tsx/.css    # hero fullscreen com foto, nome e CTA
    About.tsx/.css   # bio, skills por categoria, links externos
    Projects.tsx/.css # grid de projetos com hover effects
    Resume.tsx/.css  # timeline de formação e experiência
    Contact.tsx/.css # contato + footer
    ScrollReveal.tsx # observer de animações de entrada
  data/
    index.ts         # projetos e currículo (fonte única de verdade)
```

## Como rodar

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy (Vercel)

```bash
npm run build
# gera pasta /out pronta para qualquer CDN ou GitHub Pages
```

Ou conecte o repositório na Vercel — deploy automático a cada push na `main`.

## Customizações importantes

### Adicionar sua foto
Em `src/components/Hero.tsx`, substitua o bloco `placeholder` por:

```tsx
import Image from "next/image";

<Image
  src="/foto.jpg"
  alt="Lais Bandeira"
  fill
  style={{ objectFit: "cover", objectPosition: "top" }}
  priority
/>
```

Coloque `foto.jpg` na pasta `public/`.

### Atualizar projetos
Edite `src/data/index.ts` — o array `projects` alimenta a seção automaticamente.

### Atualizar currículo
Edite `src/data/index.ts` — os arrays `education`, `experience` e `skills` alimentam a seção Resume.

### Adicionar CV em PDF
Coloque `resume.pdf` em `public/` — o botão "download PDF" já aponta para `/resume.pdf`.

### Atualizar email de contato
Em `src/components/Contact.tsx`, altere o `href` do link de email.

## Design

Estética **editorial técnica** — tipografia forte (DM Serif Display), grid decorativo de fundo,
tons terrosos (`#F5F2EC`) com acento laranja-ferrugem (`#C4551A`). Fundo escuro exclusivo
na seção de projetos para criar contraste e hierarquia visual.

Cores:
- `--bg`: #F5F2EC (creme)
- `--ink`: #1A1814 (quase preto)
- `--accent`: #C4551A (ferrugem)
- `--accent2`: #E8773A (laranja)
