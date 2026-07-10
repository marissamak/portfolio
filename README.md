# Marissa Mak — Portfolio

Live site: **https://marissamak.com/**

## Publish / update the site

1. **Rename the repo on GitHub** (one time): [github.com/marissamak/bymarissamak/settings](https://github.com/marissamak/bymarissamak/settings) → **Repository name** → `portfolio` → **Rename**.

2. **Push your files** (Terminal) — **required** or the site stays blank:

   ```bash
   cd ~/Documents/GitHub/bymarissamak
   git remote set-url origin https://github.com/marissamak/portfolio.git
   git push -u origin main
   ```

   You should see `index.html`, `styles.css`, and `images/` upload. If it says "Everything up-to-date" but the site is still blank, run `git log -1` and confirm you see the portfolio commit (not just "Initial commit").

3. **Turn on GitHub Pages** (one time): [github.com/marissamak/portfolio/settings/pages](https://github.com/marissamak/portfolio/settings/pages) → **Source**: Deploy from branch → **main** → **/ (root)** → **Save**.

4. **Custom domain** (one time): In the same Pages settings, set **Custom domain** to `marissamak.com` and enable **Enforce HTTPS**. The repo includes a `CNAME` file. At your domain registrar, point DNS to GitHub Pages (A records for `@`, or CNAME `www` → `marissamak.github.io`).

After DNS propagates, open https://marissamak.com/