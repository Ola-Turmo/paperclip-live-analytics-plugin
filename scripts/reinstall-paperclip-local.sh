#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PLUGIN_PACKAGE="@agent-analytics/paperclip-live-analytics-plugin"
PLUGIN_ID="agent-analytics.paperclip-live-analytics-plugin"
PURGE_FLAG="${PAPERCLIP_PLUGIN_PURGE:-0}"

echo "==> Building plugin"
npm --prefix "$REPO_ROOT" run build

echo "==> Packing plugin"
npm --prefix "$REPO_ROOT" pack >/dev/null

echo "==> Uninstalling existing local plugin"
if [ "$PURGE_FLAG" = "1" ]; then
  echo "    Purging plugin state/config because PAPERCLIP_PLUGIN_PURGE=1"
  npx paperclipai plugin uninstall "$PLUGIN_ID" --force >/dev/null 2>&1 || true
  npx paperclipai plugin uninstall "$PLUGIN_PACKAGE" --force >/dev/null 2>&1 || true
else
  echo "    Preserving plugin state/config"
  npx paperclipai plugin uninstall "$PLUGIN_ID" >/dev/null 2>&1 || true
  npx paperclipai plugin uninstall "$PLUGIN_PACKAGE" >/dev/null 2>&1 || true
fi

echo "==> Installing plugin from local repo"
npx paperclipai plugin install "$REPO_ROOT"

echo "==> Done"
