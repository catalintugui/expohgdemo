#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

SITE_URL="${VITE_SITE_URL:-https://haralamb-georgescu.ro}"
DIST_DIR="$ROOT/dist"

echo "→ Production build for $SITE_URL"
echo "→ Working directory: $ROOT"

if [[ ! -d node_modules ]]; then
  echo "→ Installing dependencies…"
  npm ci
fi

echo "→ Cleaning $DIST_DIR"
rm -rf "$DIST_DIR"

echo "→ Building (mode: production)…"
NODE_ENV=production npm run build -- --mode production

if [[ ! -f "$DIST_DIR/index.html" ]]; then
  echo "✗ Build failed: $DIST_DIR/index.html not found" >&2
  exit 1
fi

echo "✓ Production build ready: $DIST_DIR"
echo "  Deploy the contents of dist/ to the web root for haralamb-georgescu.ro"
