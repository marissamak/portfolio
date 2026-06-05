#!/bin/bash
# Run this once to upload your real portfolio to GitHub
set -e
cd "$(dirname "$0")"
git remote set-url origin https://github.com/marissamak/portfolio.git
echo "Pushing to marissamak/portfolio..."
git push -u origin main
echo ""
echo "Done! Wait 1-2 minutes, then open:"
echo "  https://marissamak.github.io/portfolio/"
echo ""
echo "Hard refresh: Cmd + Shift + R"
