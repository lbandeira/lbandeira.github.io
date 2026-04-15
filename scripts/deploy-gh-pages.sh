#!/bin/bash

# Saia imediatamente se um comando falhar
set -e

# --- CONFIGURAÇÃO DE AMBIENTE ---
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"

echo "📍 Diretório raiz identificado: $ROOT_DIR"

# --- LIMPEZA E TRATAMENTO DE ALTERAÇÕES ---
# O segredo para evitar o erro de checkout: stash com -u (untracked)
echo "📦 Guardando alterações e limpando arquivos temporários..."
HAS_CHANGES=$(git status --porcelain)
if [ -n "$HAS_CHANGES" ]; then
    # -u inclui arquivos novos/untracked que o Next.js costuma gerar
    git stash push -m "Temp stash durante deploy automático" -u
    STASHED=true
else
    STASHED=false
    echo "✅ Diretório limpo."
fi

# --- EXECUÇÃO DO BUILD ---
echo "🔧 Instalando dependências..."
npm install

echo "🏗️  Gerando build estático com Next.js..."
npm run build

# --- VALIDAÇÃO DA PASTA OUT ---
if [ ! -d "out" ] || [ -z "$(ls -A out)" ]; then
    echo "❌ ERRO: A pasta 'out' não foi gerada ou está vazia."
    [ "$STASHED" = true ] && git stash pop
    exit 1
fi

echo "✅ Build gerado com sucesso!"

# --- PREPARAÇÃO DOS ARQUIVOS ---
DIST_PATH=$(mktemp -d)
cp -r out/* "$DIST_PATH"
touch "$DIST_PATH/.nojekyll"
echo "www.lbandeira.com.br" > "$DIST_PATH/CNAME"

# --- GERENCIAMENTO DE BRANCHES ---
echo "🌿 Preparando branch gh-pages..."

# Forçamos a troca com -f para garantir que nada trave a mudança
if git show-ref --verify --quiet refs/heads/gh-pages; then
    git checkout -f gh-pages
else
    git checkout -b gh-pages
fi

# Tenta sincronizar com o remoto se ele existir
git fetch origin
git reset --hard origin/gh-pages || echo "Branch remota não encontrada, iniciando do zero."

# Limpa tudo na branch gh-pages (menos o que é do Git)
find . -maxdepth 1 ! -name '.git' ! -name '.' ! -name '.gitignore' -exec rm -rf {} +

# Traz os arquivos do build
cp -r "$DIST_PATH"/. .

# --- DEPLOY (COMMIT E PUSH) ---
git add .
# Só faz commit se houver mudanças reais
if git commit -m "Deploy: atualização $(date +'%Y-%m-%d %H:%M:%S')"; then
    echo "🚀 Subindo para o GitHub..."
    git push origin gh-pages --force
else
    echo "✅ Site já está atualizado no GitHub."
fi

# --- FINALIZAÇÃO ---
echo "🔙 Retornando para a branch principal..."
git checkout -f main

if [ "$STASHED" = true ]; then
    echo "📦 Restaurando suas alterações..."
    git stash pop || echo "⚠️ Aviso: Conflito ao restaurar stash. Verifique manualmente."
fi

echo "✨ Deploy finalizado! Verifique em: www.lbandeira.com.br"