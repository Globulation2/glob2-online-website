# Globulation 2 Online

This repository owns the public static site. The game, account system and multiplayer services live in Globulation2/glob2 and deploy independently.

## Commands and ownership

Use Node24.14+ and `npm ci`. Run `npm run check`, `npm run build`, `node scripts/check-links.mjs`, `node --test scripts/test_monitor.mjs`, `python3 -m unittest discover -s scripts -p 'test_*.py' -v`, and `npm test`. Browser tests require `npx playwright install --with-deps chromium firefox webkit` on Linux. A built-site preview is `npm run preview`.

Keep Astro static. Do not add SSR, account forms, game runtime downloads, WebSockets, analytics, or new service subscriptions without an explicit product request. Gameplay starts only after navigating to app.glob2online.com.

Content lives in src/content and structured data in src/data. Validate events, keep download URLs tied to public releases, and never invent activity, rankings, dates, or unsupported game capabilities. Ratings preserve the modern platform's authoritative rank, provisional flag and OpenSkill scale.

## Agent collaboration

Assign disjoint file ownership before parallel work. Authors request independent content, design, accessibility and integration review, then address findings. Require two rendered review rounds for substantial visual changes. Record reproducible commands and limits; preserve human visual selections.

## Legacy material and assets

Maintain content/migration-manifest.json when migrating legacy wiki content. Preserve dates, sources, attribution and language; verify reuse rights before copying prose or images. A GPL game license does not prove wiki article reuse rights. Link to originals when rights are unresolved. Current guidance must be verified against the game; label historical advice.

## Deployment and secrets

Firebase Hosting publishes dist only to glob2-website-pharaoh-418820. Preview PRs must be trusted same-repository branches; forks receive no cloud credentials. Main deployments test a preview and promote that exact immutable version. Use WIF, not service-account keys or permanent Firebase tokens. The feed publisher has separate bucket-scoped permissions and cannot access game persistence.

Never change multiplayer infrastructure during a website deployment. Domain cutover is a separately verified operation. Keep source, scripts and enduring operational docs in Git; screenshots, reports, release responses, credentials and generated files belong in ignored artifacts or external secret storage. Do not commit .env files or any credentials.
