# Your live site did not update because GitHub never got your files

**Live URL:** https://marissamak.github.io/portfolio/

Saving files in Cursor = your Mac only.  
**GitHub** = what the world sees.  
They are not connected until you **push** (or paste on GitHub.com).

Run in Terminal (in this folder):

```bash
./push-live.sh
```

It tells you how many commits are still waiting to push.

---

## Method 1: GitHub Desktop (best if it works)

1. Open **GitHub Desktop**
2. Top left must say **portfolio** (not bymarissamak)
3. Look at the top bar:
   - If it says **Push origin** → click it. Done.
   - If it only says **Commit to main** → type a message, click **Commit to main**, then **Push origin**
4. When finished, the app should NOT say “X commits ahead of origin”
5. Wait 2 minutes, open https://marissamak.github.io/portfolio/ and press **Cmd + Shift + R**

**You did NOT push if** `./push-live.sh` still says commits waiting.

---

## Method 2: Paste on GitHub.com (no Desktop push needed)

Use this if Desktop will not push.

### Fix index.html

1. In Cursor, open `index.html` → **Cmd + A** → **Cmd + C** (copy all)
2. In your browser, go to:  
   https://github.com/marissamak/portfolio/edit/main/index.html  
   (log in to GitHub if asked)
3. Click in the big text box → **Cmd + A** → **Cmd + V** (paste)
4. Scroll down → **Commit changes** → green button
5. Wait for it to save

### Fix styles.css

1. In Cursor, open `styles.css` → **Cmd + A** → **Cmd + C**
2. Go to:  
   https://github.com/marissamak/portfolio/edit/main/styles.css
3. **Cmd + A** → **Cmd + V**
4. **Commit changes**

### Check it worked

1. Wait 2 minutes
2. Open https://marissamak.github.io/portfolio/
3. **Cmd + Shift + R**
4. View Page Source → search for `v=17` (not `v=16`)
5. Search page source for `View deck` → should find **nothing**

---

## Wrong links (will look “unchanged”)

| Wrong | Right |
|-------|--------|
| marissamak.github.io | marissamak.github.io/**portfolio/** |
| Old bookmark without /portfolio/ | Use full URL above |
