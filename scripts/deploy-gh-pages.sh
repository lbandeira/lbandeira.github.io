#!/bin/bash

# Saia imediatamente se um comando falhar
set -e

# --- CONFIGURAÇÃO DE AMBIENTE ---
# Define a raiz do projeto baseada na localização deste script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"

echo "📍 Diretório raiz identificado: $ROOT_DIR"

# --- TRATAMENTO DE ALTERAÇÕES PENDENTES ---
# Resolve o erro: "Please commit your changes or stash them"
echo "📦 Guardando alterações temporárias no Stash..."
HAS_CHANGES=$(git status --porcelain)
if [ -n "$HAS_CHANGES" ]; then
    git stash push -m "Temp stash durante deploy automático" --include-untracked
    STASHED=true
else
    STASHED=false
    echo "✅ Nada para guardar, diretório limpo."
fi

# --- EXECUÇÃO DO BUILD ---
echo "🔧 Instalando dependências..."
npm install

echo "🏗️  Gerando build estático com Next.js..."
npm run build

# --- VALIDAÇÃO DA PASTA OUT ---
# Resolve o erro: "cp: out/*: No such file or directory"
if [ ! -d "out" ] || [ -z "$(ls -A out)" ]; then
    echo "❌ ERRO: A pasta 'out' não foi gerada ou está vazia."
    echo "Verifique se 'output: export' está configurado no seu next.config.js."
    # Se falhar, precisamos devolver o stash antes de sair
    [ "$STASHED" = true ] && git stash pop
    exit 1
fi

echo "✅ Build gerado com sucesso!"

# --- PREPARAÇÃO DO DEPLOY ---
DIST_PATH=$(mktemp -d)
cp -r out/* "$DIST_PATH"
touch "$DIST_PATH/.nojekyll"

# Garante a persistência do seu domínio customizado
echo "www.lbandeira.com.br" > "$DIST_PATH/CNAME"

# --- GERENCIAMENTO DE BRANCHES ---
# Resolve o erro: "fatal: a branch named 'gh-pages' already exists"
echo "🌿 Preparando branch gh-pages..."
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "A branch gh-pages já existe localmente. Trocando para ela..."
    git checkout gh-pages
else
    echo "Criando nova branch gh-pages..."
    git checkout -b gh-pages
fi

# Sincroniza com o remoto para evitar conflitos de push
git pull origin gh-pages --rebase || echo "Primeiro deploy ou branch apenas local."

# Limpa os arquivos antigos (mantendo o histórico do Git)
find . -maxdepth 1 ! -name '.git' ! -name '.' ! -name '.gitignore' -exec rm -rf {} +

# Move os novos arquivos do build para a branch
cp -r "$DIST_PATH"/. .

# --- DEPLOY (COMMIT E PUSH) ---
git add .
if git commit -m "Deploy: atualização do site estático $(date +'%Y-%m-%d %H:%M:%S')"; then
    echo "🚀 Subindo arquivos para o GitHub..."
    git push origin gh-pages --force
else
    echo "✅ Sem alterações detectadas para subir."
fi

# --- FINALIZAÇÃO E LIMPEZA ---
echo "🔙 Voltando para a branch principal..."
git checkout main

if [ "$STASHED" = true ]; then
    echo "📦 Restaurando suas alterações do Stash..."
    git stash pop
fi

echo "✨ Tudo pronto! Seu site deve atualizar em instantes em www.lbandeira.com.br"