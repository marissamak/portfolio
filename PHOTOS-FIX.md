# Fix missing photos

Your site code is correct. GitHub is only missing the image files.

## Best fix — one push (all 30+ photos at once)

1. Create a token: https://github.com/settings/tokens → **Generate new token (classic)** → check **repo** → Generate → copy `ghp_...`

2. In Terminal:

```bash
cd ~/Documents/GitHub/bymarissamak
./deploy.sh
```

3. Username: `marissamak`  
   Password: paste the **token** (not your GitHub password)

4. Wait 2–3 minutes, then hard refresh: https://marissamak.github.io/portfolio/

Test: https://marissamak.github.io/portfolio/images/about/my-pic.jpg should show your photo (not 404).

---

## No token? Upload on GitHub (3 batches)

Open: https://github.com/marissamak/portfolio/upload/main

Drag folders from **`Documents/GitHub/bymarissamak/images`** (not DROP-ON-GITHUB):

| Batch | Drag this folder |
|-------|------------------|
| 1 | `images/about` |
| 2 | `images/projects/creative` |
| 3 | `images/projects/professional` |

Commit after each batch. Paths on GitHub must be `images/about/...` not `DROP-ON-GITHUB/...`.
