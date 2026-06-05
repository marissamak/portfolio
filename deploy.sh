#!/bin/bash
# Upload site + all photos to GitHub (needs Personal Access Token as password)
set -e
cd "$(dirname "$0")"
git remote set-url origin https://github.com/marissamak/portfolio.git
echo "Pushing website + images to marissamak/portfolio..."
echo "(When asked for password, paste a GitHub token — NOT your account password)"
echo "Create token: https://github.com/settings/tokens → Generate classic → check 'repo'"
echo ""
git add index.html styles.css script.js .nojekyll images/
git status --short | head -40
git commit -m "Add all portfolio images" 2>/dev/null || echo "Nothing new to commit"
git push origin main
echo ""
echo "Done! Wait 2 minutes, then: https://marissamak.github.io/portfolio/"
