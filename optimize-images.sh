#!/usr/bin/env bash
# Resize and compress portfolio images for web (run from repo root).
set -euo pipefail
cd "$(dirname "$0")/images"
ORIG="_originals"
mkdir -p "$ORIG"

backup_once() {
  local f="$1"
  [[ -f "$ORIG/$f" ]] || cp -n "$f" "$ORIG/$f" 2>/dev/null || true
}

to_jpeg() {
  local src="$1" max="$2"
  local base="${src%.png}"
  local dest="${base}.jpg"
  backup_once "$src"
  sips -s format jpeg -s formatOptions 82 -Z "$max" "$src" --out "$dest" >/dev/null
  sips -s format jpeg -s formatOptions 85 -Z 800 "$dest" --out "${base}-thumb.jpg" >/dev/null
  echo "  $src -> $dest + thumb ($(du -h "$dest" | cut -f1) / $(du -h "${base}-thumb.jpg" | cut -f1))"
}

echo "Hero photo..."
backup_once "my-pic.jpg"
sips -Z 1400 -s formatOptions 85 my-pic.jpg >/dev/null
echo "  my-pic.jpg ($(du -h my-pic.jpg | cut -f1))"

echo "Creative + client + NFP screenshots (900px JPEG + thumbs)..."
for f in creative-*.png daphnes-artistry-*.png hanabi-baking-studio-*.png private-client-deck-*.png nonprofit-*.png; do
  [[ -f "$f" ]] || continue
  to_jpeg "$f" 900
done

echo "Client/NFP display thumbs (1100px, sharp)..."
for f in daphnes-artistry-*.jpg hanabi-baking-studio-*.jpg private-client-deck-*.jpg nonprofit-*.jpg; do
  [[ -f "$f" && "$f" != *-thumb.jpg ]] || continue
  base="${f%.jpg}"
  sips -s format jpeg -s formatOptions 85 -Z 1100 "$f" --out "${base}-thumb.jpg" >/dev/null
done

echo "Creative display thumbs (800px, sharp)..."
for f in creative-*.jpg; do
  [[ -f "$f" && "$f" != *-thumb.jpg ]] || continue
  base="${f%.jpg}"
  sips -s format jpeg -s formatOptions 85 -Z 800 "$f" --out "${base}-thumb.jpg" >/dev/null
done

echo "Connect button (PNG, smaller)..."
if [[ -f connect-button.png ]]; then
  backup_once connect-button.png
  sips -Z 440 connect-button.png >/dev/null
  echo "  connect-button.png ($(du -h connect-button.png | cut -f1))"
fi

echo "Done. Originals in images/_originals/"
