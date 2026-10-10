# Article experience

The handbook, news, history and archive share the Colony reading system. Guides
use `format: lesson` (the default), `format: reference`, or `format: profile`.
Keep existing slugs, headings, immutable source references and media IDs.
Historical collections retain their original dates and attribution; a source
link does not grant permission to copy additional wiki material.

## Authoring

Use substantial sections with actions, observations and recovery. Keep essential
instructions expanded. Optional callouts wrap existing Markdown:

```markdown
:::checkpoint
Food should arrive and globs should be eating before expanding the colony.
:::
```

`note`, `warning` and `checkpoint` are supported. Labels accompany color.
Group a full scene with a genuine detail from the same action or state:

```markdown
:::media-group

[[media:fruit-orchard]]

[[media:fruit-orchard-detail]]

:::
```

The full scene spans the article canvas; its detail follows with a caption.
Standalone media markers still work. Do not group unrelated frames merely
because they are adjacent. Unknown container directives fail the build.
Media bytes, dimensions, paths and checksums remain in the immutable manifest.
Silent clips require the equivalent observation in writing. Spoken clips
require caption tracks and a transcript before publication.

## Reading and media

At 1280px and above, chapter/collection and section rails flank the article.
Between 960 and 1279px, section navigation becomes a native disclosure. Below
960px, both become disclosures. Heading links continue to work without JavaScript.
The section highlight stores no history or completion state. Navigation and
viewer controls are excluded from Pagefind; current and historical results
retain their existing type filters.

PhotoSwipe 5.4.4 owns zoom, pan, touch gestures, gallery navigation and focus
containment. It is MIT licensed and requires no keys, registration or permissions.
Its code and styles are bundled locally; no CDN or third-party player is used.
The adapter loads the viewer on first inspection, supplies captions, native video
content and fullscreen controls, and transfers playback state. Original image/clip
links and inline video remain functional without the viewer.

## Verification

Use Node 24.14+ and `npm ci`, then `npm run check` and `npm run build`.
If a Markdown processor/plugin changes while developing, move the ignored
`node_modules/.astro/data-store.json` into `artifacts/` before rebuilding; Astro
may otherwise reuse the previous rendered Markdown.

Run `node tests/server.mjs` for a preview with production Firebase headers.
In another terminal, run:

```sh
SITE_URL=http://127.0.0.1:4322 node scripts/review-site.mjs 1
# Address independent review findings, rebuild, then repeat with 2.
SITE_URL=http://127.0.0.1:4322 node scripts/review-site.mjs 2
SITE_URL=http://127.0.0.1:4322 npm test -- --workers=2
node scripts/check-links.mjs
node --test scripts/test_monitor.mjs
python3 -m unittest discover -s scripts -p 'test_*.py' -v
npm run check:media
```

The rendered helper covers light/dark at 360, 768, 1024, 1440 and 1920px,
article/browse/search and open-viewer states, CSS 200% text sizing and reading
without JavaScript. Screenshots/reports remain ignored. Human review checks
hierarchy, caption legibility and media grouping. The full browser suite covers
Chromium, Firefox and WebKit under the production CSP. Emulation is not a
physical touchscreen or assistive-technology review; record those limits.

A visual revamp requires two rendered rounds and independent content, design,
accessibility and integration review. Deploy only through the existing trusted
preview and immutable promotion process; game services are outside this work.
