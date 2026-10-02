# Static hosting and rollback

## Resources and boundaries

GCP project pharaoh-418820 contains the dedicated Firebase Hosting site glob2-website-pharaoh-418820 and public bucket glob2-website-public-pharaoh-418820. Firebase serves only the static Astro build. Multiplayer remains on its existing VM and database; website CI has no VM, database or backend-artifact permissions.

The website identity glob2-website-deploy uses project metadata-read permissions and a site-update IAM binding restricted to the dedicated Hosting site's resource name. The separate glob2-website-feeds identity writes only the public feed bucket. Both use the github-actions WIF pool and glob2-website provider, restricted to this repository and hosted GitHub runners. No service-account key or long-lived Firebase token is used. Restrict feed deployment environment to main; forks never receive credentials.

Repo variables WIF_PROVIDER, DEPLOY_SERVICE_ACCOUNT, FEED_SERVICE_ACCOUNT, API_ORIGIN and BACKEND_REVISION configure workflows. BACKEND_REVISION must identify the deployed API commit, not the website source. Update it alongside backend releases. Initial app hostname migration changes API_ORIGIN from the old apex to https://app.glob2online.com.

Firebase headers enforce CSP, nosniff and a referrer policy. The narrowly allowed wasm-unsafe-eval directive enables Pagefind's local search engine; it does not load the game. The game-specific COOP/COEP headers belong only on the app's /play/ path. There is no SPA fallback: missing public URLs return404.

## Website releases

The Website workflow validates content/types, builds, checks internal links, runs publisher tests and browser journeys, and uploads a checked dist artifact. Trusted same-repository PRs receive seven-day previews. Fork PRs only run checks. Main publishes a candidate, smoke-tests its routes/headers, and promotes exactly that finalized version to live.

The Firebase CLI is available for standard operations using ADC. The checked-in scripts/deploy-static.py offers the same static version/upload/release flow using gcloud's ephemeral identity token; scripts/promote-static.py promotes an existing immutable version. Both are restricted to this site. Release artifacts record the version and previous version for rollback.

For manual deploy, run the standard checks/build first:

```sh
python3 scripts/deploy-static.py --channel review
node scripts/smoke.mjs HTTPS_PREVIEW_URL
python3 scripts/promote-static.py --channel review
```

Restore a recorded version using the Restore website release workflow, or:

```sh
python3 scripts/promote-static.py --version sites/glob2-website-pharaoh-418820/versions/VERSION_ID
```

Verify routes and app links after restoration. Website rollback does not roll back DNS or multiplayer configuration; retain the prior Cloud DNS records and platform environment separately for a domain-cutover rollback.

## Rankings

The publisher uses the existing public modern platform leaderboard, avoiding new private APIs or account-store access. Its GitHub schedule is nominally five minutes but best effort; delayed jobs are visible through the snapshot timestamp and stale state. Failures preserve the prior object. The dedicated bucket permits anonymous object reads and production-origin GET CORS, while write permission belongs to the feed identity. PR previews use intercepted fixtures for ratings tests rather than expanding production CORS for every preview origin.

## Domain cutover

Create app.glob2online.com on the existing multiplayer host before moving the apex. Verify its certificate, sign-in, public API, realtime/relay endpoints and browser isolation headers. Configure the platform's canonical origin and advertised relay endpoints to the app hostname. Preserve the old apex while qualifying the new host; existing WebSocket sessions cannot be moved through DNS. Drain active games before any relay restart.

Prepare Firebase custom-domain ownership and ACME DNS records, verify certificate readiness, then switch apex/WWW DNS only after the selected design and app tests pass. Keep old-domain path migration separate from the legacy wiki, whose domain is not administered here.

Availability checks, scheduled feed freshness verification and project billing alerts cover operations. Inspect GitHub failure notifications when publication fails, and check GCP budgets without changing budgets for unrelated project services.
