#!/bin/sh
set -e

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
TMP="/tmp/layalidays-deploy-$$"

echo "→ Cloning your GitHub repo..."
git clone https://github.com/ismailmahamood19-jpg/layalidays.git "$TMP"
cd "$TMP"

echo "→ Moving site files to repo root (fixing GitHub Pages 404)..."
cp "$REPO_DIR/index.html" .
cp -R "$REPO_DIR/css" .
cp -R "$REPO_DIR/js" .
cp -R "$REPO_DIR/assets" .
cp "$REPO_DIR/.nojekyll" .
cp "$REPO_DIR/.gitignore" .
rm -rf "Layali days"

git add -A
git commit -m "Fix GitHub Pages: move site files to repository root" || true

echo "→ Pushing to GitHub..."
git push origin main

echo ""
echo "Done! Wait 1-2 minutes, then open:"
echo "  https://ismailmahamood19-jpg.github.io/layalidays/"
echo ""
echo "If Pages is not enabled yet:"
echo "  GitHub → layalidays repo → Settings → Pages → Source: main branch, / (root)"
