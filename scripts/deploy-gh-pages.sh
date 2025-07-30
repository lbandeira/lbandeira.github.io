#!/bin/bash

# Saia ao menor erro
set -e

echo "🔧 Gerando o build estático com Nuxt..."
yarn generate

echo "🚚 Preparando arquivos para deploy..."

# Pasta temporária
rm -rf dist
mkdir dist
cp -r .output/public/* dist/

# Alterna para gh-pages
git checkout gh-pages || git checkout -b gh-pages

# Remove todos os arquivos (exceto .git e .gitignore)
find . -maxdepth 1 ! -name '.git' ! -name '.' ! -name '.gitignore' -exec rm -rf {} +

# Copia os arquivos da pasta dist
cp -r ../dist/* .

# Cria o .nojekyll
touch .nojekyll

# Faz commit e push
git add .
git commit -m "Deploy: static site to GitHub Pages" || echo "✅ Sem alterações para comitar"
git push origin gh-pages

# Volta para a branch main
git checkout main

echo "🚀 Deploy finalizado com sucesso!"
