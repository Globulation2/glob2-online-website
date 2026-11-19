# Foundational browser scenarios

Run from the website repository with Node 24.14+ and a new ignored output directory:

```sh
node scripts/capture-current-guide.mjs scripts/handbook-scenarios/core/controls-and-food.mjs artifacts/handbook/controls-food-attempt-1
```

The helper qualifies the exact public JavaScript/WASM payload, selects High resolution through the actual graphics settings, reloads the application and rechecks the enabled choice with WebGL2 and loaded artwork before acting. Pack readiness alone is not accepted as the applied artwork choice. The exact deployed source revision remains unverified.

`food-practice.mjs` opens the current Tutorial → Food supply practice lesson. It is a prepared training colony, not a custom Standard match or AI qualification. The initial task may open directly; only a visible optional briefing is acknowledged.

`controls-and-food.mjs` lets normal simulation advance, pauses with P, selects the supplied Inn and a real visible worker, opens Statistics → Population full history, closes history, and opens Map overlays. It then returns to Build, uses B → I to place an Inn on open grass, right-clicks out of placement, selects the new site and resumes normal simulation. It records construction checkpoints and requires the actual lesson-complete control before finishing.

Coordinates apply to the recorded 1440×900 prepared lesson. A worker hit is accepted only when the observed selection is a unit. Changed scene layouts, absent lesson completion or payload changes fail rather than substituting fabricated state. Inspect and independently review every rerun before selecting its frames. Literal HP, staffing, food, materials and ticks are observations, not fixed assertions or forced values.

A successful rerun on 2026-11-18 recorded 56 events, completed the lesson at tick 3315 and paused at 3357. This independently demonstrates reproducibility. Earlier interactive 70-event Food practice evidence used for selected HUD/construction candidates remains its own source record and footage; do not attribute those frames to this script.

`practice.mjs` only opens Custom game setup; its initial map preview is a scaffold, not a qualified completed match.

`introduction.mjs` records the current lesson catalogue, first scouting task and
an actual explorer arrival. It inspects a settled entry frame before acknowledging
an optional briefing. The default flag request stays in place during travel;
after the task advances, the scenario pauses and reduces the request to one.
It does not claim completion of the Introduction's remaining tasks.

`guard-practice.mjs` opens Guard zones and flag tactics, settles the optional
briefing, and uses actual flag and area controls. It follows an explorer to the
practice enemy, paints four Guard tiles, lets the defense run, and sets a War
flag request to three at high priority. The scenario requires the lesson-complete
control before demonstrating a one-tile remove/restore operation while paused.
A successful applied-High run on 18 November recorded 135 events and finished
paused at tick 6854. Inspect each source frame before reusing its incidental
counts, positions or timing; no Clearing/filter/drag behavior is qualified.

`population-practice.mjs` uses the prepared Food supply colony for a separate
production experiment. Repeated genuine decrement clicks clamp all birth
controls before one role is increased. Normal simulation records Worker-only,
all-zero, Explorer-only and a later all-zero hold with food and hauling visible.
The scenario records observations rather than asserting a fixed birth count or
an instant stop; an additional worker after the first reset was observed in the
qualified run. Its later zero-weight hold had unchanged role totals with food
available. This is not completion of the Food lesson.

The final brief Inn interruption is exploratory. The first applied-High run
showed no stock decline before hauling was restored, so it does not establish
food depletion or recovery. Inspect every rerun before drawing those conclusions.

`interactive-practice.mjs` supports exploration through the same qualified
capture helper. It accepts serialized JSON commands in the ignored capture
output directory and returns a read-only diagnostic snapshot after each actual
UI action. The accepted actions are inspect, control, key, click, scroll,
screenshot, advance (1–120 normal ticks), import-file, and close. It accepts no JavaScript evaluation or direct simulation-state writes.

Write `interactive-command.json` atomically with the next integer `sequence`
and an `action`, then wait for that sequence in `interactive-response.json`
before issuing another command. Repeating the most recently completed sequence is ignored;
other out-of-order commands fail. Screenshot names use the helper's restricted naming
rules. A rejected action ends the capture; inspect its error record instead of
waiting for another acknowledgement. The close command lets the helper finalize
footage and the capture record.

An actual 100-command Food supply session on 18 November used this unchanged
bridge and completed with 115 recorded events. Preserve the real command recipe,
watcher source and source hashes with each session: an interactive capture is not
execution of a fixed lesson scenario. Inspect actual pause state and acknowledge
any settled optional briefing before acting on the map.

For `import-file`, provide a visible game control `key` and a `filename` such as
`downloads/1-example.glob2` from this capture's actual completed download list.
The helper waits for pending downloads and supplies a read-only copy of their
recorded metadata. The bridge checks the relative/canonical path and exact byte
length and SHA before opening the real file chooser through that control. It
accepts no arbitrary file or raw state input. The action
records the imported relative filename/hash; inspect the resulting game UI to
verify acceptance, rather than treating file-picker completion as a loaded game.
