##!/bin/bash

# Saia ao menor erro
set -e

# Salva o caminho da raiz do projeto (um nível acima de onde este script está)
# Isso garante que o script funcione não importa de onde você o chame
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "📍 Direitório atual: $(pwd)"

echo "📦 Instalando dependências..."
npm install

echo "🔧 Gerando o build estático com Next.js..."
npm run build

# Verifica se a pasta 'out' existe
if [ ! -d "out" ]; then
    echo "❌ Erro: A pasta 'out' não foi encontrada em $(pwd)"
    exit 1
fi

echo "🚚 Preparando arquivos para deploy..."
DIST_PATH=$(mktemp -d)

# Copia usando o caminho garantido
cp -r out/* "$DIST_PATH"

# Garante que arquivos com _ não sejam ignorados pelo Jekyll
touch "$DIST_PATH/.nojekyll"

# Muda para a branch gh-pages
git checkout gh-pages || git checkout -b gh-pages

# Remove arquivos antigos da branch de deploy
find . -maxdepth 1 ! -name '.git' ! -name '.' ! -name '.gitignore' -exec rm -rf {} +

# Move os arquivos novos
cp -r "$DIST_PATH"/. .

# Faz commit e push
git add .
git commit -m "Deploy: static site to GitHub Pages" || echo "✅ Sem alterações para comitar"
git push origin gh-pages --force

# Volta pra branch principal (verifique se a sua chama 'main' ou 'master')
git checkout main

echo "🚀 Deploy concluído com sucesso!"