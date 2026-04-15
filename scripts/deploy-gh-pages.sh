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

# 1. Garante que estamos na raiz e que não há sujeira atrapalhando o checkout
git stash push -m "Temp stash durante deploy" --include-untracked

# 2. Pasta temporária absoluta para o build
DIST_PATH=$(mktemp -d)
cp -r out/* "$DIST_PATH"
touch "$DIST_PATH/.nojekyll"

# 3. Tenta mudar para a gh-pages. Se não existir, cria.
# Se já existir, apenas entra nela.
if git rev-parse --verify gh-pages >/dev/null 2>&1; then
    git checkout gh-pages
else
    git checkout -b gh-pages
fi

# 4. Sincroniza com o que está no servidor para evitar conflitos de push
git pull origin gh-pages --rebase || echo "Primeiro deploy, nada para baixar."

# 5. Remove tudo (menos .git e .gitignore) para garantir um deploy limpo
find . -maxdepth 1 ! -name '.git' ! -name '.' ! -name '.gitignore' -exec rm -rf {} +

# 6. Traz os arquivos do build de volta
cp -r "$DIST_PATH"/. .

# 7. Commit e Push forçado (já que a gh-pages é uma branch de resultado, não de código)
git add .
if git commit -m "Deploy: static site to GitHub Pages"; then
    git push origin gh-pages --force
else
    echo "✅ Sem alterações para comitar."
fi

# 8. Volta para a branch principal e devolve seus arquivos pendentes
git checkout main
git stash pop || echo "Nada para recuperar do stash."

echo "🚀 Deploy concluído com sucesso!"