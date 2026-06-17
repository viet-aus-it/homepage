#!/usr/bin/env bash
# Regenerate WebP variants from a high-resolution source PNG.
# Requires cwebp (https://developers.google.com/speed/webp/download).
set -euo pipefail

SOURCE="${1:-}"
if [[ -z "$SOURCE" || ! -f "$SOURCE" ]]; then
  echo "Usage: $0 <source-png>" >&2
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/images"

cwebp -q 82 -resize 1280 0 "$SOURCE" -o "$OUT/bbq-albert-park-hero.webp"
cwebp -q 82 -resize 800 0 "$SOURCE" -o "$OUT/bbq-albert-park-card.webp"

ls -lh "$OUT"/bbq-albert-park-*.webp
