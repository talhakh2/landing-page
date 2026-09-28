# Abdullah Farooq — Industrial Battery Service

A landing page for a battery service engineer in Jeddah. React 19 + Vite, with a
procedurally-generated technical drawing of a forklift traction battery rendered
through [react-three-fiber](https://github.com/pmndrs/react-three-fiber).

**This is a service landing page, not an online CV.** See *Editorial policy*.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/   (static; drop on any host)
npm run preview
```

`base` is `'./'` in [vite.config.js](vite.config.js), so it works from a
subdirectory too.

## The portrait

`public/img/profile.jpg` — 960×1200, pre-cropped to the frame's 4:5 ratio rather
than relying on `object-fit` to guess. To replace it, save a new file at the same
path and size. If the file is missing the frame falls back to an "AF" monogram,
so nothing breaks.

It lives under `public/img/` rather than `public/assets/` because Vite writes its
own bundled output into `dist/assets/`.

**It is shown in colour, unlike the equipment tiles.** That is deliberate: the
hi-vis vest sits on the same yellow as `--signal`, which ties the person to the
page's accent. If you swap in a photo without hi-vis, reconsider that override in
`styles.css` (`.cred__bio .portrait__frame img { filter: none }`) — greyscale may
suit a different photo better.

## Layout

```
index.html              page shell, pre-paint theme script
src/
  main.jsx              entry
  App.jsx               composes the sections
  styles.css            all styling; design tokens at the top of :root
  data/content.js       every piece of copy — edit here, not in components
  hooks/                useTheme, useReveal, useScrollSpy
  sections/             TopBar, Hero, Services, Work, Process,
                        Credentials, Contact, SectionHead, Lightbox
  three/
    BatteryScene.jsx    Canvas, palette, fit-to-canvas zoom, visibility pausing
    BatteryPack.jsx     the battery geometry
public/img/profile.jpg  the portrait (you add this)
public/img/work/        gallery photography, 2 widths each (@800 + 1600)
```

Page order: Hero → **01** What I do → **02** Equipment → **03** How a job runs →
**04** Who you're calling → **05** Contact.

**To change any wording, edit `src/data/content.js`.** The components only lay it out.

## Editorial policy

The copy sells a service. It is deliberately **not** a CV transcription:

- **No employment history section.** Roles, dates and past employers are gone.
  The page describes what Abdullah does, not where he has worked.
- **No employer names**, anywhere. Certifications name the credential, not the
  vendor.
- **No personal identifiers.** The residency/ID number on the CV is not
  published, and should not be re-added — it does not belong on a public page.
- **No generic-engineering filler.** MATLAB, Cadence and AutoCAD were dropped;
  they are not why someone calls about a dying forklift battery.
- **Nothing is invented.** The `FACTS` strip states scope ("Traction packs &
  chargers"), never a rating, capacity range or years-of-service claim that
  cannot be backed up. Keep it that way when editing.

## Design system

Dark is the default — this is equipment, photographed under work light. A light
theme is still available from the toggle and persists in `localStorage`.

| Token | Dark | Light |
| --- | --- | --- |
| `--paper` | `#0d0f12` | `#f2f0ea` |
| `--ink` | `#f2f1ee` | `#101215` |
| `--signal` (fill) | `#ffc61a` | `#ffc61a` |
| `--signal-text` | `#ffc61a` | `#8a5a00` |

**One signal colour**, used only for state, position and emphasis — never
decoration. `--signal-text` darkens in the light theme because yellow text on
paper is unreadable; the yellow *fill* stays constant.

**No gradients anywhere.** The hazard banding under the hero is hard-edged bars
drawn as an inline SVG pattern, not `repeating-linear-gradient`.

## Photography

The Equipment gallery ships with seven Creative-Commons photographs of the
*equipment classes* this work covers. They are reference images, and the section
says so on the page. They are **not** photographs of Abdullah's own jobs.

### Replacing them with real photos

This is the single biggest improvement available to this page. For each entry in
`WORK` / `WORK_STRIP` in [src/data/content.js](src/data/content.js):

1. Save the photo as `public/img/work/<id>.webp` (long edge ~1600px) and
   `public/img/work/<id>@800.webp` (long edge 800px). The grid loads `@800`, the
   lightbox loads the full size.
2. Update `title`, `note` and `tag`.
3. Delete the `credit` object — then guard the `.lb__credit` line in
   [src/sections/Lightbox.jsx](src/sections/Lightbox.jsx) — and drop the
   `.work__note` disclaimer in [src/sections/Work.jsx](src/sections/Work.jsx).

### Current credits

| Plate | Author | Licence |
| --- | --- | --- |
| Traction pack, forklift | Newone | CC BY-SA 4.0 (cropped) |
| Corroded terminals | FalkorD | CC BY-SA 4.0 |
| Charger control board | Hannes Grobe | CC BY-SA 4.0 |
| Charger on the floor | P1898 | CC BY 4.0 |
| Gas-insulated switchgear | Geoprofi | CC BY-SA 2.0 |
| SF6 busbar runs | Kreuzschnabel | CC BY-SA 3.0 |
| Rating plate | Hannes Grobe | CC BY-SA 4.0 |

All via Wikimedia Commons; each plate links its source and licence in the
lightbox. The forklift pack was cropped to remove a camera watermark, which the
credit records as BY-SA requires.

Photographs are greyscaled in the grid and shown in colour in the lightbox. That
is doing real work: it makes seven photos from seven different cameras read as
one documentary set.

## Motion

Every animation had to name a purpose and a frequency tier before it was written;
decorative movement was rejected. Shared tokens live at the top of `:root` —
`--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `--dur-press: 140ms`,
`--dur-ui: 220ms`, `--dur-reveal: 420ms`. Nothing invents its own curve.

| What | Purpose | Ingredients |
| --- | --- | --- |
| Scroll reveal | Preventing a jarring change | `opacity` + `translateY(12px)`, 420ms `--ease-out`, 50–60ms stagger |
| Photo fade-in | Preventing a jarring change | `opacity` on decode, 500ms |
| Service card hover | State indication | signal bar `scaleY(0→1)` from the top, 220ms |
| Tile hover | State indication | greyscale → colour, `scale(1.03)`, pointer-gated |
| Lightbox | Spatial consistency | enters `scale(0.97)` + opacity over 220ms, **exits the same path** |
| Button press | Feedback | `scale(0.97)`, 140ms |
| 3D pack | Explanation | continuous rotation + damped cursor lean |

Only `transform` and `opacity` are animated, so nothing triggers layout or paint.
`prefers-reduced-motion` keeps the fades (they aid comprehension) and drops all
movement — gentler, not off.

Deliberately **not** animated: the nav (used repeatedly — motion would make it
feel slow) and the credentials list (data you read should not move for style).

## The 3D drawing

Built from primitives at runtime — no `.glb` to download, no model licence to
worry about. Every solid is filled with the *page* colour so it hides the lines
behind it, then its edges are stroked in ink: clean hidden-line removal instead
of a wireframe tangle, with no lighting, no shading and no gradients.

- **Orthographic camera** — true technical projection.
- `FitToCanvas` derives camera zoom from canvas size, so the pack fits at every
  breakpoint (an orthographic zoom is a fixed pixel scale otherwise).
- `frameloop` drops to `demand` once it scrolls out of view.
- Colours come from `PALETTE` in `BatteryScene.jsx`, which mirrors the CSS tokens.
  **Change a theme colour in `styles.css` and change it there too.**

The three.js bundle (~935 kB raw / ~249 kB gzip) is `lazy()`-loaded, so the page
renders and is readable before it arrives.

## Accessibility

The lightbox is a real dialog: `role="dialog"`, `aria-modal`, focus moves to
Close on open and returns to the tile that opened it, Tab is trapped inside,
Escape closes, arrow keys page, and body scroll is locked while open. Tiles are
`<button>`s. Focus rings are visible throughout.

## Still to fill in

- Real site photography for the Equipment gallery (see *Photography*).
