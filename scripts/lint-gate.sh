#!/usr/bin/env bash
# Auto-fix lint/format, verify with ci checks, then block if fixes need re-staging.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

pnpm run lint:fix
pnpm run ci

mode="${1:---working-tree}"

case "$mode" in
  --working-tree)
    # Block when auto-fix changed the working tree but changes are not staged yet.
    if ! git diff --quiet; then
      echo ""
      echo "lint:gate auto-fixed files. Review the diff, stage updates, and commit again."
      exit 1
    fi
    ;;
  --since-head)
    if ! git diff --quiet HEAD; then
      echo ""
      echo "lint:gate changed tracked files relative to HEAD. Commit the fixes before pushing."
      exit 1
    fi
    ;;
  *)
    echo "Unknown mode: $mode (expected --working-tree or --since-head)" >&2
    exit 2
    ;;
esac
