#!/usr/bin/env bash
# Regenerate a WebP from a high-resolution source image (1280px wide, q82).
# Requires cwebp (https://developers.google.com/speed/webp/download).
set -euo pipefail

SOURCE="${1:-}"

if [[ -z "$SOURCE" || ! -f "$SOURCE" ]]; then
  echo "Usage: $0 <source-image>" >&2
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/images"
BASENAME="$(basename "${SOURCE%.*}")"

cwebp -q 82 -resize 1280 0 "$SOURCE" -o "$OUT/${BASENAME}.webp"
ls -lh "$OUT/${BASENAME}.webp"
