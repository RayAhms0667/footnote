# Footnote

A free daily retro history trivia game. Seven questions a day (2 easy, 2 medium, 3 hard). Obvious answers score a little, obscure ones score a lot, and your points upgrade a pixel tank all the way to an orbital rocket.

**Play:** https://rayahms0667.github.io/footnote/

## Features

- One official round per day, the same questions for everyone, resetting at local midnight
- Practice replays that never change your score or streak
- 140 daily questions (40 easy, 40 medium, 60 hard), dealt on a fixed schedule so none repeats until all have been used (20 days), and none returns within 10 days
- Answers not on the built-in lists are checked against Wikipedia, with rarity scored from article page views
- Original chiptune soundtrack and sound effects, generated in the browser
- Player accounts or guest play, saved in the player's browser
- Installable on phones (Add to Home Screen) and playable offline once loaded
- Terms of Service and Privacy Policy built in

## Files

| File | What it is |
|---|---|
| `index.html` | The whole game (built, do not edit by hand) |
| `src/footnote.html` | Game source |
| `tools/build-site.js` | Builds `index.html` and the support files from the source |
| `tools/make-assets.ps1` | Draws the icons and share image (Windows PowerShell) |
| `manifest.webmanifest`, `sw.js` | Home-screen install and offline support |
| `og-image.png`, `icon-*.png` | Share preview and app icons |
| `404.html`, `robots.txt`, `sitemap.xml` | Not-found page and search engine files |

## Rebuild

```bash
node tools/build-site.js src/footnote.html index.html https://rayahms0667.github.io/footnote/
```

The last argument is the site's public address. It is used for the share preview, search engine files and `CNAME`.

## Connect a custom domain

1. Rebuild with your domain as the last argument, for example `https://playfootnote.com/`. This writes the `CNAME` file. Commit and push.
2. At your domain registrar, add DNS records:
   - For the bare domain (`playfootnote.com`): four `A` records pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - For `www`: a `CNAME` record pointing to `rayahms0667.github.io`
3. In the repo, open **Settings → Pages**. Check the custom domain shows, then tick **Enforce HTTPS** once it becomes available. The certificate can take up to a day.
