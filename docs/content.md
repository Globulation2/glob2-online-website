# Content maintenance

Use reviewed PRs for current guides, news, community URLs, event records and release metadata. The CI preview shows the change before publication. Coding agents follow AGENTS.md and verify claims against the game repository or public release artifacts.

## Current and historical content

Content collections validate title, description, locale, tags, ordering, publication date and source links. Guides should record reviewedAgainst where a particular revision supports the advice. Avoid exact mechanics claims until verified in source and play. The historical archive carries source links and clear context; obsolete hosting or download instructions must never be presented as current.

The migration manifest in content/migration-manifest.json records the audited wiki pages and intended destinations. Add attribution, source revision/date/language, rights and verification status for each additional source. Link rather than copy when rights are unknown. Public-only access does not preserve the wiki's full revision history; do not claim a complete backup or retirement of the original site.

## Events and downloads

Event records in src/data/events.json require a unique slug, title, UTC start, optional end, IANA display timezone, format, organizer, status and rules. Registration links use HTTPS; published results are editorial. No events, registrations or standings should be fabricated. The provider interface currently reads Git content; actual bracket/registration backend integration is a separate feature.

The Check download metadata workflow imports `downloads-manifest.json` from a qualified stable public game release. It paginates past evidence prereleases, checks the exact public tag commit, required platform packages and GitHub asset digests (hashing bytes when no digest is available). Schema v2 website metadata contains one manifest or null; a failed import never replaces the previous snapshot. Run `node scripts/sync-releases.mjs` with Node 24.14+ or dispatch the workflow after publication, then review its metadata PR. No release dispatch or website merge bypasses qualification.

Game release execution and sensitive configuration belong only to `genixpro/glob2-release`; the public downloads remain versioned assets in `Globulation2/glob2`. The page advertises packages only after every required platform and both production mobile stores are qualified. Empty metadata is intentional before the first release. Desktop/mobile alternatives and checksums work without JavaScript. Store links are validated public destinations, never guessed. `src/data/download-channels.json` holds reviewed, release-tag-bound store URL updates and package/store withdrawals separately from the immutable manifest. The importer does not overwrite this editorial file; changing releases requires resetting or re-reviewing its entries. Correct a withdrawn or broken download through reviewed metadata and restore a prior website version when needed; do not move game tags or replace published bytes.

## Review

Substantial changes require two rendered rounds: factual/editorial review and usability/accessibility/integration review. Test newcomer play/download journeys, strategy discovery, original-source attribution, responsive navigation and community actions. Keep reports/screenshots in ignored artifacts; durable conclusions belong here or in the relevant guide.

## Player handbook

See [handbook production](handbook-production.md) for research ownership, gameplay capture, independent review, media storage and article publication.
Use `node scripts/review-site.mjs 1` against the built Firebase-header test
server, address findings, rebuild, and run it again with `2`. The helper
captures the homepage, game explanation, first-session guide, downloads and
community at 360, 768 and 1440px in light/dark themes. It also checks accessible
names/contrast with axe, 44px navigation targets, loaded images, overflow and
200% text reflow on the homepage, game explanation and first-session guide.
Image backgrounds still require human contrast inspection;
the helper uses Chromium and reduced motion, so run the full Playwright suite
for Firefox, WebKit and video behaviour too.

The new-player introduction received two rendered review rounds on 9 October
2026. Findings addressed image alignment, phone navigation, full-size guide
image links, accurate worker/flag captions, guest-play wording and the tablet
hero's background contrast. Gameplay captures and verification limits are
documented in [website content verification](website-content-verification.md).
The review covers responsive website layouts; physical phone gameplay and
anonymous ranked/account flows were not exercised. Keep resource-heavy game
capture sessions separate from browser checks; `npm test -- --workers=1` is a
reproducible local option when concurrent Firefox runs hit timeouts.

## Privacy and terms

The game repository is authoritative: `docs/mobile/privacy-policy.md` is the
unified policy and `docs/mobile/terms.md` contains the service terms. The website
renders synchronized copies in `src/content/legal/` at
`https://glob2online.com/privacy/` and `https://glob2online.com/terms/`. Frontmatter
records the source URL and SHA-256 of each original Markdown document.

Use Node 24.14+ to sync and verify:

```sh
node scripts/sync-legal.mjs --game-repo /path/to/glob2
node scripts/sync-legal.mjs --check --game-repo /path/to/glob2
node --test scripts/test_legal_sync.mjs
```

Omit `--game-repo` to import or check public game master over HTTPS. The importer
resolves one immutable source revision and reads both documents before writing.
Review and merge game document changes first, then synchronize the website.
Every website verification and the scheduled/manual legal check report upstream
drift without changing files.
Remote checks cannot pass for new source files until the game changes are
published. Build remains independent of remote availability.

The old Fire tablet Markdown is a compatibility pointer, and the website's
`/privacy/fire-tablet/` route redirects to the unified page's edition section.
Both game-menu branches use the unified URL, with the Fire section anchor where
appropriate. Publish the website pages before shipping those game-menu changes;
store listing URLs require separate updates through their release processes.

When updating terms or privacy, verify optional product, payment and AI-provider
claims against the game implementation. Preserve mandatory consumer rights and
announce material terms changes with their effective date.
