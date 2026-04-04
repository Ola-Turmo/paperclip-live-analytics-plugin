#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PLUGIN_PACKAGE="@agent-analytics/paperclip-live-analytics-plugin"
PLUGIN_ID="agent-analytics.paperclip-live-analytics-plugin"

echo "==> Building plugin"
npm --prefix "$REPO_ROOT" run build

echo "==> Packing plugin"
npm --prefix "$REPO_ROOT" pack >/dev/null

echo "==> Uninstalling existing local plugin"
npx paperclipai plugin uninstall "$PLUGIN_ID" --force >/dev/null 2>&1 || true
npx paperclipai plugin uninstall "$PLUGIN_PACKAGE" --force >/dev/null 2>&1 || true

echo "==> Installing plugin from local repo"
npx paperclipai plugin install "$REPO_ROOT"

echo "==> Done"
