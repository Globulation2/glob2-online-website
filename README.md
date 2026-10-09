# Globulation 2 Online

The public, static Astro website for Globulation 2 Online. The game and online platform are maintained independently in [Globulation2/glob2](https://github.com/Globulation2/glob2).

- Public website: https://glob2online.com
- Online hub: https://app.glob2online.com
- Browser play: https://app.glob2online.com/play/
- Sign in: https://app.glob2online.com/signin

## Develop and verify

Use Node 24.14 or newer. Dependencies are pinned in package-lock.json.

```sh
npm ci
npm run dev
npm run check
npm run build
node scripts/check-links.mjs
node --test scripts/test_monitor.mjs
python3 -m unittest discover -s scripts -p 'test_*.py' -v
npx playwright install --with-deps chromium firefox webkit
npm test
```

`npm run preview` serves the compiled pages with Pagefind search. Development mode does not build the search index. Browser tests serve the compiled site with Firebase security headers on port4322 to exercise the production CSP.

The site uses Astro content collections for guides, news, history and source-linked archive entries. `src/data/events.json` contains validated, reviewed human-community events; an empty collection is intentional until organizers announce something. `src/data/site.ts` holds community URLs. Configure only verified Discord invitations. `src/data/release-metadata.json` records a qualified all-platform manifest; `scripts/sync-releases.mjs` verifies immutable public release assets and production store links. Node 24.14+ is required for the shared TypeScript schema.

The selected design is Colony. `/design/colony/` and `/design/field-guide/` remain noindexed review references. Search distinguishes current guidance from history. The legacy migration manifest records sources, revisions, attribution, language, rights and verification status. Original wiki prose and media remain source-linked where republication rights are unverified.

## Integrations and operations

See [hosting and rollback](docs/hosting.md), [content maintenance](docs/content.md), and [player-rating snapshot contract](scripts/RANKINGS.md). Public pages use no account cookies or analytics, and do not initiate gameplay. The rankings widget requests a sanitized public snapshot; it never queries account persistence or uses authenticated APIs.

Code is GPL-3.0-or-later. Game media attribution is listed on `/credits/`; legacy source links retain their original authorship and do not imply transfer of rights.

The homepage's silent colony video and its two WebP posters come from
`platform/apps/web/src/art/` in the game repository. Rebuild them using
`tools/record_menu_colony.py` there and copy `colony-loop.mp4`,
`colony-960.webp`, and `colony-1600.webp` into `public/brand/` together. The
recording uses the actual menu simulation without UI, with a soft loop transition.
The homepage pauses it off screen and in hidden tabs, supplies a pause button,
and uses the poster for reduced motion and failed playback.
