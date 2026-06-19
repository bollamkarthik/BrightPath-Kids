#!/bin/zsh
set -e

cd "$(dirname "$0")"

PNPM="/Users/karthikbollam/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/pnpm"
NODE_DIR="/Users/karthikbollam/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin"
export PATH="$NODE_DIR:$PATH"

if [ ! -x "$PNPM" ]; then
  echo "Could not find the bundled package manager."
  echo "Install Node.js from https://nodejs.org, then run: npm install && npm run dev"
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "Installing web app dependencies..."
  "$PNPM" install
fi

echo "Starting BrightPath Kids web app..."
"$PNPM" run dev
