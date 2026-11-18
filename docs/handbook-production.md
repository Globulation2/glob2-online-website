# Player handbook production

The handbook teaches Globulation 2 through illustrated, actionable lessons. Browser-specific flows use the actual public browser game; shared gameplay demonstrations may use an exact public native release when the platform is stated. Research and captures support editorial review; articles remain focused on playing. The website stays static, and creator programming and map editing are outside this handbook.

## Research and ownership

Before an article is commissioned, map its player concepts to the matching engine source, AI configuration and visible game behavior. Use the deployed build's source revision, not an arbitrary development checkout. Record the served package checksum and verify the deployment record matches it. Reconcile source differences before reusing research for a later build. If the exact deployed source cannot be identified, record a null source revision and qualify the actual delivered payload hashes plus observed actions. Never substitute a candidate checkout revision for deployment identity. Omit `reviewedAgainst` for those observed-only updates and identify older or candidate implementation links as source context.

The coordinator maintains `src/data/guide-coverage.json`. Each concept has an article destination or an explicit reason for exclusion/deferment. Research briefs, experimental observations and temporary review notes live in ignored `artifacts/handbook/`. Assign disjoint article and artifact directories to authors. After the pilot workflow passes, authors may produce independent groups in parallel. Reviewers must not review their own articles.

## Article conventions

Guides live in `src/content/guides/`. Keep established slugs. Frontmatter `group` assigns a handbook section, `order` orders chapters within it, and `prerequisites` lists existing guide slugs. `reviewedAgainst` identifies the source revision. Sources use immutable revision links.

Teach actions, observations and recovery. Use substantial sections rather than disconnected tips. Put each `[[media:asset-id]]` marker on its own paragraph at the step it explains. The marker resolves through `src/data/guide-media.json` to a responsive figure or user-controlled clip. Alt text describes the relevant game state; captions explain what the player should notice. Use actual player-perspective captures. Pair full scenes with genuine detail crops whenever readers must identify a control label or number at mobile width. Annotated media must preserve the underlying game state. Silent clips need an equivalent written explanation; speech would require captions and a transcript.

## Capture

`scripts/capture-guide.mjs` runs trusted author scenarios against the public browser game in an isolated profile. A scenario exports an async function receiving the page, real control and keyboard helpers, screenshots, diagnostic state, tick waits and an action log:

```sh
node scripts/capture-guide.mjs artifacts/handbook/scenarios/lesson.mjs artifacts/handbook/lesson
```

Keep the fixed capture viewport, renderer, game revision, package checksum, map/start save, seed where known, rules and resolved AI strategy in the private capture package. Save initial and useful milestone states using the game controls. Retain original screenshots, full footage, action notes, exported saves/replays and observed ticks. Replay compatibility depends on the matching game build. Do not promise exact-tick seeking.

The capture harness closes the live game page before waiting for recording finalization. Export required native saves and recordings before returning from the scenario; retain any cleanup limits in its private record.

Use the game's recorder when available or browser video recording, then select short explanatory MP4 clips and WebP screenshots. Capture the initial situation, relevant action/panel and resulting change. A screenshot quota does not replace coverage of the actual lesson.

## Media storage and reproducible builds

Approved media lives in the existing public bucket `glob2-website-public`, under versioned `guide-media/` paths. Raw recordings and review artifacts stay ignored or in external evidence storage. Never put private account data in the public bucket.

The tracked manifest records IDs, public object URLs, same-origin website paths, SHA-256 hashes, byte lengths, dimensions, kind, alt text, captions and video poster IDs. Paths are immutable: create a new version for corrected media. Stage approved files under an ignored source directory matching their manifest paths, then publish:

```sh
python3 scripts/upload-guide-media.py --source-dir artifacts/handbook/approved
```

Use Node 24.14+ on PATH. The local publisher impersonates `glob2-website-media@bradley-personal-20261027.iam.gserviceaccount.com` with a short-lived token. Its custom role permits only object creation and reading under `guide-media/`; it cannot replace/delete objects. `scripts/guide-media-role.yaml` is the enduring role definition. The feed publisher retains its separate ratings-only permissions. The bucket IAM condition is `resource.name.startsWith("projects/_/buckets/glob2-website-public/objects/guide-media/")`.

Upload new reviewed media locally before opening its article PR, so the PR build can download the manifest’s assets. The verified website workflow produces a `guide-media` artifact from staged media; it is available for subsequent publication verification or recovery.

The `Publish approved guide media` workflow uses WIF and the `website-media` environment on main. Its provider admits only this repository's exact main-branch workflow on GitHub-hosted runners. It downloads an approved `guide-media` artifact from a selected same-repository Actions run, validates every object against the main manifest and uploads only matching bytes. It does not take credentials from the artifact.

`npm run build` downloads/checks media, reuses only verified cached bytes in ignored artifacts, and stages assets into `dist/guide-media/`. Readers load them from the website origin. Missing, corrupt or mismatched files fail the build. Media are included in the same immutable Hosting version as the article.

## Review and publication

Complete the first-colony pilot before expanding the queue. For each article, independent reviewers check mechanics, reproduce the walkthrough, inspect design/accessibility and verify integration. Substantial visual changes require two rendered rounds, with revisions between them. Keep review screenshots and reports ignored. Fix factual findings and recapture media when steps change.

Run all AGENTS.md checks plus `npm run check:media`. Browser tests must exercise illustrated articles, grouped navigation, prerequisite/contents/adjacent links, mobile/zoom layouts, light/dark themes, media failures and content without JavaScript. Record commands and actual limits in PR evidence.

Publish each accepted article through a trusted same-repository PR preview. Main promotes the tested immutable Hosting version. Do not deploy game services or change multiplayer infrastructure as part of handbook publication.

Release smoke checks retry required page and media responses only for temporary 404/503 statuses, with five attempts and 37 seconds cumulative backoff. Invalid successful HTML, missing chapter navigation, redirects, permanent errors and mismatched media bytes still fail. The intentional 404 and old application redirect checks are not retried. Each fetch is separately bounded; 37 seconds is not a total wall-time limit.

## Bounded Introduction update — 18 November 2026

The current `/learn/getting-started/` entry now follows the observed public browser Tutorial lessons catalog and Introduction's first scouting task. Three reviewed full-frame images and a genuine sidebar detail crop are published under immutable `guide-media/v2/getting-started/` paths. The completed four-object uploader was followed by cache-bypassed public GET byte-length and SHA-256 verification; [the pilot evidence](first-session-current-evidence.json) records the payload identities, actions, originals, formatted assets and public readback.

The current browser menu reports 0.11.6.0, but its exact deployed source revision remains unverified. This narrow observed UI correction does not replace `guide-baseline.json` or qualify a new whole-handbook capture baseline. The demonstrated explorer arrived while the initial request was two; that request was reduced to one afterward. The next Build another Inn prompt was read, but the remaining four tasks were not completed or claimed as verified.

The older inn/hospital walkthrough remains in a closed, Pagefind-ignored reference disclosure. Its source revision, media IDs, object URLs and byte hashes are preserved; captions and accessible descriptions now explicitly identify it as the earlier 0.11.0.0 tutorial, including in the lightbox. Older subsection labels use bold paragraphs to avoid adding obsolete steps to the current contents navigation or skipping heading levels. Existing other handbook lessons remain current published material with their own earlier provenance; this update does not refresh all 237 earlier assets.

## Current handbook migration

`scripts/handbook-scenarios/observed-baseline.json` qualifies the observed public browser payload separately from the retained earlier `src/data/guide-baseline.json`. It records menu version 0.11.6.0 and exact JavaScript/WASM bytes and SHA-256 hashes, with an unverified source revision. Current browser captures use 1440×900, WebGL2 and the fully loaded HD artwork pack. Native demonstrations identify the exact public release, source and artifact separately; they do not establish identical browser behavior.

| Chapter | Completed bounded update | Media/provenance status |
| --- | --- | --- |
| Control reference | Actual Settings→Controls→Keyboard shortcuts, Game bindings and binding-editor Cancel; current U label is Start/Stop Upgrade | Two reviewed v2 images, including a genuine binding detail crop, uploaded and public GET byte/hash verified; earlier two v1 records retain their original objects/digests and are marked `supersededBy` |
| Choosing an AI opponent | The actual browser selector lists Econo - Easy (1310); removed the obsolete attribution of “No warriors” to its current label | Text correction only; existing illustrations remain explicitly qualified until the current selector family is integrated |

Preserve teaching depth when replacing a family: match actual actions, counter values and outcomes, and keep useful motion demonstrations or record a reviewed replacement. A new generic scene is not sufficient evidence of a refreshed lesson. Replace source markers only after independent review, completed immutable upload and fresh public byte/hash readback. Older objects are never overwritten; staged-but-superseded metadata is retained while the partial migration is reconciled.

### Repeat the reference-controls capture

The first v2 reference-controls pair was captured interactively through Playwright MCP, not generated by the generic capture helper. Its ignored `artifacts/handbook-author-controls-reference/actions.json` records the real action sequence, and `runtime-proof.json` records fresh public payload hashes and control labels. To reproduce the same panel:

1. Create an isolated browser tab at `https://app.glob2.online/play/?threads=serial&renderer=webgl2`, set 1440×900, and wait for the renderer and HD artwork pack to be ready.
2. If the first-run Introduction offer is present, use `intro/menu` (Go back to main menu). From the main menu use `menu/6` (Settings), then `nav.4` (Controls).
3. Use Game in Keyboard shortcuts (`keys.mode.0`); it was already selected by default in the original isolated session. Move the pointer to 950,610 and scroll down 600px. Wait until `keys.binding.3` (escape) is visibly available.
4. Capture the full 1440×900 frame. The original shows the Game/Map editor tabs, Restore default shortcuts, and the Escape/U/worker-request rows. The detail is a genuine 254×100 crop at 865,430 from that same frame, encoded as WebP quality 92/method 6.
5. Open `keys.binding.3`, verify the editor offers Save shortcut, Remove shortcut and Cancel, then use `binding.cancel`. Confirm that the escape binding is unchanged. The published image was captured before opening this editor.
6. Fetch the public `index.js` and `index.wasm` payloads and compare bytes/SHA-256 with the observed baseline before accepting a new capture. Preserve source revision as unknown unless deployment identity is independently established. New world animation frames can differ; create new immutable paths rather than replacing the published image bytes.

The reference capture does not change an account, multiplayer service, match state or saved shortcut. Subsequent maintained capture scenarios can reproduce these interactions, but their outputs must keep their own action and integrity records rather than being attributed to the original MCP session.
