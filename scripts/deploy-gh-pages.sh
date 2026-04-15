#!/bin/bash
set -e

# --- CONFIGURAÇÃO DE CAMINHO ---
# Garante que o script saiba onde é a raiz do projeto, 
# não importa de onde você o chame no terminal.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"

echo "📍 Validando diretório raiz: $ROOT_DIR"

# --- LIMPEZA E PREPARAÇÃO ---
echo "📦 Salvando alterações temporárias (Stash)..."
git stash push -m "Temp stash durante deploy" --include-untracked || echo "Nada para guardar."

# --- EXECUÇÃO DO BUILD ---
echo "🔧 Instalando dependências e gerando build..."
npm install
npm run build

# --- VALIDAÇÃO DO OUTPUT ---
if [ ! -d "out" ]; then
    echo "❌ ERRO CRÍTICO: A pasta 'out' não foi gerada pelo Next.js."
    echo "Verifique se 'output: export' está no seu next.config.js"
    exit 1
fi

# --- PROCESSO DE DEPLOY ---
echo "🚚 Preparando arquivos para deploy..."
DIST_PATH=$(mktemp -d)
cp -r out/* "$DIST_PATH"
touch "$DIST_PATH/.nojekyll"

# Se você usa CNAME no domínio customizado, garanta que ele persista:
# (Substitua pelo seu domínio se não tiver o CNAME na pasta public)
echo "www.lbandeira.com.br" > "$DIST_PATH/CNAME"

echo "🌿 Alternando para a branch gh-pages..."
git checkout gh-pages || git checkout -b gh-pages

# Limpa a branch de deploy (exceto o histórico git)
find . -maxdepth 1 ! -name '.git' ! -name '.' ! -name '.gitignore' -exec rm -rf {} +

# Move os arquivos novos para a branch
cp -r "$DIST_PATH"/. .

# Commit e Push
git add .
git commit -m "Deploy: static site update" || echo "✅ Sem mudanças para subir."
git push origin gh-pages --force

# --- FINALIZAÇÃO ---
echo "🔙 Voltando para a branch principal..."
git checkout main
git stash pop || echo "Nada para restaurar do stash."

echo "🚀 Deploy concluído com sucesso!"