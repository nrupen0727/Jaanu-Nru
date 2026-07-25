# Jaanu-Nru

Jainee & Nrupen's wedding website — a static, single-page site (no build step, no dependencies).

Live site: https://nrupen0727.github.io/Jaanu-Nru/

> This is the `blue-theme` branch — a navy-palette comparison of `prototype`, kept in sync on everything except the color tokens in `css/styles.css`.

## Project structure

```
index.html              The whole page (sections for intro, hero, invite, events, story, gallery, RSVP, countdown, footer)
css/
  styles.css             All styling
js/
  script.js               All behavior + the WEDDING_CONFIG object (see below)
assets/
  images/                 Logo + the couple/elephant card art
  video/                  Intro video (intro.mp4)
  gallery/                Your own photos go here (see below) — empty for now
```

`index.html` stays at the repo root because GitHub Pages serves the site from there; everything it loads (`css/styles.css`, `js/script.js`, and every `assets/...` path) is referenced relative to it, so the subfolders above are safe to reorganize further as long as those paths stay in sync.

## Editing content

Almost everything you'd want to change — names, date, venue, parent names, the event schedule, RSVP WhatsApp number, gallery photos — lives in one place: the `WEDDING_CONFIG` object at the top of `js/script.js`. Open that file and edit the values directly; the page reads from it at load time.

## Adding gallery photos

1. Crop/export your photos to a **3:4 portrait ratio** (e.g. 1200×1600px or 1500×2000px) — that's the shape of the gallery frame on the site. It uses `object-fit: cover`, so photos that aren't exactly 3:4 will still work but may get cropped slightly at the edges to fit.
2. Keep each file around **300–800 KB** (export as JPEG, ~80% quality) so the page loads quickly on phones. Full-resolution camera photos (several MB each) will work but will slow the page down.
3. Drop the files into `assets/gallery/`, named however you like (e.g. `photo1.jpg`, `photo2.jpg`, ...).
4. In `js/script.js`, find `WEDDING_CONFIG.gallery` and list them:
   ```js
   gallery: {
     photos: [
       "assets/gallery/photo1.jpg",
       "assets/gallery/photo2.jpg",
     ],
     placeholderCount: 4, // ignored once photos[] has entries
   },
   ```
   The carousel automatically shows however many photos you list, with prev/next arrows and dot navigation.

## Branches

- `prototype` — the active branch, currently deployed to GitHub Pages.
- `blue-theme` — this branch: a navy-palette comparison, kept in sync with `prototype` on everything except the color tokens in `css/styles.css`.
- `main`, `wedding-site` — earlier/unused scaffolding, not part of active development.

To switch which one is live, change the source branch in **Settings → Pages** on GitHub.

## Running locally

No build step needed — any static file server works:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000
