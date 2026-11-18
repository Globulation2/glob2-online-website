# Foundational browser scenarios

Run from the website repository with Node 24.14+ and a new ignored output directory:

```sh
node scripts/capture-current-guide.mjs scripts/handbook-scenarios/core/controls-and-food.mjs artifacts/handbook/controls-food-attempt-1
```

The helper qualifies the exact public JavaScript/WASM payload, WebGL2 and HD readiness before acting. The exact deployed source revision remains unverified.

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
