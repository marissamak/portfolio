#!/bin/bash
# Run this after making site changes. It tells you if GitHub still needs a push.
cd "$(dirname "$0")"

echo ""
echo "  Live site: https://marissamak.github.io/portfolio/"
echo ""

git fetch origin main 2>/dev/null || true
AHEAD=$(git rev-list --count origin/main..HEAD 2>/dev/null)

if [ -z "$AHEAD" ] || [ "$AHEAD" = "0" ]; then
  echo "  ✓ Your computer matches GitHub. Live site should be up to date."
  echo "    If the browser still looks old: Cmd+Shift+R on the live URL."
else
  echo "  ⚠️  YOU HAVE $AHEAD COMMIT(S) THAT ARE NOT ON GITHUB YET."
  echo "     The live site CANNOT update until you push."
  echo ""
  echo "  Do this in GitHub Desktop:"
  echo "    1. Open GitHub Desktop"
  echo "    2. Repo must be: portfolio"
  echo "    3. Click  Push origin  (top right)"
  echo ""
  echo "  If you only see  Commit to main  and not Push:"
  echo "    → Click Commit to main first, THEN Push origin"
  echo ""
  git log origin/main..HEAD --oneline
  open -a "GitHub Desktop" 2>/dev/null || true
fi
echo ""
