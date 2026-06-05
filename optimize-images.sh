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
  local src="$1" max="$2" quality="$3"
  local dest="${src%.png}.jpg"
  backup_once "$src"
  sips -s format jpeg -s formatOptions "$quality" -Z "$max" "$src" --out "$dest" >/dev/null
  echo "  $src -> $dest ($(du -h "$dest" | cut -f1), ${max}px)"
}

echo "Hero photo..."
backup_once "my-pic.jpg"
sips -Z 1400 -s formatOptions 90 my-pic.jpg >/dev/null
echo "  my-pic.jpg ($(du -h my-pic.jpg | cut -f1))"

echo "Creative projects (1200px, high quality)..."
for f in creative-*.png; do
  [[ -f "$f" ]] || continue
  to_jpeg "$f" 1200 92
done

echo "Client + NFP work (1600px, high quality)..."
for f in daphnes-artistry-*.png hanabi-baking-studio-*.png private-client-deck-*.png nonprofit-*.png; do
  [[ -f "$f" ]] || continue
  to_jpeg "$f" 1600 92
done

echo "Connect button (PNG)..."
if [[ -f connect-button.png ]]; then
  backup_once connect-button.png
  sips -Z 440 connect-button.png >/dev/null
fi

echo "Done. Site uses the .jpg files directly (not -thumb). Originals in images/_originals/"
