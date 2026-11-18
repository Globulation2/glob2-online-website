# Current handbook captures

Use Node 24.14+ and a new ignored output directory for every attempt:

```sh
node scripts/capture-current-guide.mjs scripts/handbook-scenarios/core/practice.mjs artifacts/handbook/practice-attempt-1
```

`observed-baseline.json` identifies the public browser payload by exact decoded
JavaScript/WASM hashes and byte lengths. Its source revision is deliberately null:
the menu version and package identity do not establish the exact deployed source.
Keep the earlier `src/data/guide-baseline.json` as its original capture record.

Each invocation creates a separate browser/profile, handles the first-use offer,
waits for WebGL2 and the HD pack, and records real visible-control actions, game
diagnostics, screenshots, downloads and full browser footage. The original public
module bytes are transparently forwarded unchanged after integrity verification;
only transport encoding/length headers are removed. Changed payloads fail closed.
These observations do not establish native-client or multiplayer qualification.

Before the scenario, the helper selects **Settings → Display & graphics → Artwork
→ High resolution** through actual visible controls, waits for persistence and
reloads the application. It then reopens Settings to verify the enabled explicit
choice, records before/after screenshots, and checks WebGL2 plus published artwork
readiness. Package readiness alone is insufficient: Automatic can switch to
Original for the rest of a slow session. Relevant adaptation/backend console
messages are retained in the ignored capture record; a reported step-down after
the explicit reload fails qualification. Earlier captures made before this gate
remain valid state evidence, but need separate applied-artwork review before
being presented as high-quality visual refreshes.

Scenarios export an async function receiving:

- `control(key)`: click an enabled visible control from the current diagnostic state.
- `click(x, y, options)`: normal browser mouse input, including `{button:'right'}`.
- `key(name)`: normal keyboard input using Playwright key names.
- `state()` / `note(action, detail)`: inspect and record the actual diagnostic state.
- `screenshot(name)`: save a full PNG and matching diagnostic JSON.
- `waitTicks(count)`: let the real simulation advance; it does not change its clock.
- `page`, `context`, `output`, `baseline`: browser handles and capture metadata.

Use actual UI interactions and normal simulation. Never inject units, counters,
game state or orders through diagnostic/evaluation hooks. Record the real chosen
lesson/map/rules/AI and any unknown seed; a prepared lesson is not a custom match.
UI screens can differ: Food supply practice opens its task directly, whereas the
Introduction has an initial briefing. Inspect before clicking optional dialogs.

`core/` owns shared practice and foundational lessons. `advanced/` owns independent
advanced/reference/AI scenarios. Coordinate file ownership and use distinct output
directories; no scenario shares another browser's runtime or user profile. Captures
remain candidates until independent content/visual review and immutable upload.
