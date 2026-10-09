# Verified downloads implementation evidence

Website tested commit: ad9d3e77ef0a5245d341b581886186052d16487d. Website base: 7ca772207b5f720138188511e2dd2cccd75a676f (integrated).
Game tested commit: 3ce1fbceb49022f8c500f9a73ff284ea2845e0dd. Game branch base: 880e3d2bec02c3ec71b7757aea9f1094d42e4b98; fetched master: 132f6b5136886bc53664cb41fba008f6a2f640ba. Newer game changes did not overlap this release tooling.

Host: macOS 26.6.2, arm64. Node 24.14.0, npm dependencies installed with npm ci; Python 3.14.7. No game runtime dependencies added. Apple API tooling reuses the existing hash-pinned mobile/play-api-requirements.txt environment.

## Website verification

Commands (from website checkout with Node 24.14.0 on PATH):

```
npm ci
npm run check
npm run build
node scripts/check-links.mjs
node --test scripts/test_monitor.mjs scripts/test_downloads.mjs
python3 -m unittest discover -s scripts -p 'test_*.py' -v
npm test -- --workers=2
node scripts/test_downloads_render.mjs
```

Results: Astro check has no errors, warnings or hints; static build and 26-page link check pass; 28 Node tests, 21 Python tests and 147 Chromium/Firefox/WebKit browser tests pass. Populated manifest render checks cover 18 browser/width/theme combinations plus reviewed store/package withdrawals. Separate Python-generated manifest accepted by the website schema, including all eleven packages and encoded source filenames.

Independent content, design, accessibility and integration review inspected two rendered rounds. Round 1 shows truthful unqualified availability; round 2 shows a synthetic qualified release at desktop and phone widths in both themes. Synthetic packages and store URLs are test fixtures, not production availability. Final tracked metadata contains no qualified release. Browser checks cover keyboard navigation, JavaScript-disabled journeys and axe checks; actual assistive-technology user testing remains a launch qualification task.

## Game release tooling verification

```
python3 -m unittest discover -s test/build_system -p 'test_downloads*.py' -v
python3 -m unittest discover -s test/build_system -p 'test_ios_store_release.py' -v
python3 -m unittest discover -s test/build_system -p 'test_ci_concurrency.py' -v
python3 -m unittest discover -s test/build_system -p 'test_play_release.py' -v
python3 -m unittest discover -s test/build_system -p 'test_release_guards.py' -v
/tmp/glob2-tools/actionlint -shellcheck='' -ignore 'label .*unknown' .github/workflows/github-release.yml .github/workflows/promote-downloads.yml .github/workflows/release.yml .github/workflows/android-play-internal.yml .github/workflows/ios-testflight.yml .github/workflows/ios-production.yml .github/workflows/fdroid-release-validation.yml .github/workflows/publish-desktop.yml
```

64 focused Python tests pass. Actionlint 1.7.7 passes with its outdated runner-label validation excluded; selected labels checked against official GitHub documentation. Shellcheck was unavailable and disabled. Earlier broader build-system run executed 396 tests with two unrelated ffmpeg music-test SIGABRT failures; no music code changed. The attached focused logs are the final committed revision.

These tests establish manifest validation, immutable source/artifact contracts, guards, production-store API requests and static website behavior. They do not establish native installation, signing account acceptance, successful real store submission or simulation equivalence across release architectures. No simulation code changed. Installed-package qualification must still cover deterministic checksums, save/load, replay/network compatibility and online play on all listed real devices/platforms before promotion.

## Launch limits

No package was published, no store release submitted and no website deployment performed. Required production availability remains gated. Windows Azure signing authentication/identity verification, Mac notarization key configuration, clean-machine/device qualification and mobile production approvals remain outstanding. Android permanent sideload and existing Developer ID credentials were stored only in protected mirror environments, with encrypted local backups outside Git; off-machine secure backups remain operational work. No key material or private configuration is included here.
