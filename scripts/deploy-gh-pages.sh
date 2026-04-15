#!/bin/bash

# Saia ao menor erro
set -e

echo "🔧 Gerando o build estático com Next.js..."
npm run build

echo "🚚 Preparando arquivos para deploy..."

# Pasta temporária absoluta
DIST_PATH=$(mktemp -d)

# Copia os arquivos do build para pasta temporária
cp -r out/* "$DIST_PATH"

# Garante que arquivos com _ não sejam ignorados pelo Jekyll do GitHub Pages
touch "$DIST_PATH/.nojekyll"

# Muda para a branch gh-pages (cria se não existir)
git checkout gh-pages || git checkout -b gh-pages

# Remove tudo (menos .git e .gitignore)
find . -maxdepth 1 ! -name '.git' ! -name '.' ! -name '.gitignore' -exec rm -rf {} +

# Copia os arquivos do build da pasta temporária para cá
cp -r "$DIST_PATH"/. .

# Faz commit e push
git add .
git commit -m "Deploy: static site to GitHub Pages" || echo "✅ Sem alterações para comitar"
git push origin gh-pages

# Volta pra branch principal
git checkout main

echo "🚀 Deploy concluído com sucesso!"