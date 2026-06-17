#!/usr/bin/env bash
# Regenerate WebP variants from a high-resolution source image.
# Requires cwebp (https://developers.google.com/speed/webp/download).
set -euo pipefail

PRESET="${1:-}"
SOURCE="${2:-}"

if [[ -z "$PRESET" || -z "$SOURCE" || ! -f "$SOURCE" ]]; then
  echo "Usage: $0 <bbq|climbing> <source-image>" >&2
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/images"

case "$PRESET" in
  bbq)
    cwebp -q 82 -resize 1280 0 "$SOURCE" -o "$OUT/bbq-albert-park-hero.webp"
    cwebp -q 82 -resize 800 0 "$SOURCE" -o "$OUT/bbq-albert-park-card.webp"
    ls -lh "$OUT"/bbq-albert-park-*.webp
    ;;
  climbing)
    cwebp -q 82 -resize 1280 0 "$SOURCE" -o "$OUT/northern-climbing-hero.webp"
    cwebp -q 82 -resize 800 0 "$SOURCE" -o "$OUT/northern-climbing-card.webp"
    ls -lh "$OUT"/northern-climbing-*.webp
    ;;
  *)
    echo "Unknown preset: $PRESET (expected bbq or climbing)" >&2
    exit 1
    ;;
esac
