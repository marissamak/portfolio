# Push your site live (every time)

Your live site is: **https://marissamak.github.io/portfolio/**

Changes on your computer do **not** go live until you push. Follow these steps every time.

---

## GitHub Desktop (easiest)

1. Open **GitHub Desktop**
2. Top left: make sure the repo is **portfolio** (not something else)
3. You should see changed files on the left and a commit box at the bottom left
4. Bottom left, type any short message (e.g. `Update site`) or use the one already filled in
5. Click **Commit to main**
6. Click **Push origin** (top bar, only appears after you commit)
7. Wait until it says **"Fetched"** or shows no pending commits
8. Wait **1–2 minutes**, then open: https://marissamak.github.io/portfolio/
9. Hard refresh: **Cmd + Shift + R**

---

## How you know it worked

- In GitHub Desktop: no files listed as changed, branch says up to date with origin
- On the live site: right-click → View Page Source → search for `styles.css?v=17` (number goes up when we bump it)

---

## If Push origin is greyed out

You forgot step 5 (Commit first). Commit, then Push.

---

## If you use the wrong link

Only this works: **https://marissamak.github.io/portfolio/**

`marissamak.github.io` alone will **not** show your site.
