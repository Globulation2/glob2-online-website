---
title: "JavaScript AI API tour"
description: "What a JavaScript AI can read, which orders it can give, how profile 2 differs, and the persistence rules and limits that catch authors out."
locale: "en"
group: "automate"
order: 5
format: "reference"
prerequisites: ["javascript-ai"]
tags: ["AI", "JavaScript", "scripting", "API", "reference"]
sources:
  - title: "Released 0.11.6.2 source: JavaScript API reference"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/docs/scripting/javascript-api.md"
  - title: "Released 0.11.6.2 source: JavaScript scripting guide"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/docs/scripting/javascript.md"
  - title: "Released 0.11.6.2 source: profile 1 TypeScript declarations"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/examples/javascript/glob2.d.ts"
  - title: "Released 0.11.6.2 source: profile 2 TypeScript declarations"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/examples/javascript/glob2-v2.d.ts"
  - title: "Released 0.11.6.2 source: JavaScript examples"
    url: "https://github.com/Globulation2/glob2/tree/aecd7aed221818f1a68e18f310695b7c5b4ffe51/examples/javascript"
---

This page is a guided tour for AI authors. For installing, testing and the trust warning, start with [JavaScript AI players](/learn/javascript-ai/). For every field, value and argument range, use the full references from release 0.11.6.2:

- [JavaScript API reference](https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/docs/scripting/javascript-api.md)
- [Scripting guide](https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/docs/scripting/javascript.md)
- TypeScript declarations for your editor: [glob2.d.ts](https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/examples/javascript/glob2.d.ts) (profile 1) and [glob2-v2.d.ts](https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/examples/javascript/glob2-v2.d.ts) (profile 2). Copy both into your project. They are for editing only, and the game runs JavaScript, not TypeScript.
- [Examples](https://github.com/Globulation2/glob2/tree/aecd7aed221818f1a68e18f310695b7c5b4ffe51/examples/javascript) and the [starter project](https://github.com/Globulation2/glob2-javascript-ai-starter-exampler)

Only the methods and fields listed in the reference exist. The API has no pathfinding queries, no live game objects and no way to change the world directly. Everything you do happens through orders.

## Two profiles

| Feature | Profile 1 | Profile 2 |
| --- | --- | --- |
| Opt in | Default | `metadata()` returns `{apiVersion: 2, name: "..."}` |
| How you act | `step` returns one order or `null` | Set building properties and queue `ctx.actions`; `step` returns nothing |
| Extra services | None | `ctx.spatial` (distances, placement), `ctx.telemetry` |

Both profiles share the same read API, persistence rules and fog of war. Profile 1 stays fully supported. Profile 2 suits larger AIs, and the starter project uses it.

## The ctx object

| Member | Meaning |
| --- | --- |
| `ctx.tick` | The game tick this decision observes. It is not a count of calls. |
| `ctx.myTeam` | Your colony's team ID |
| `ctx.random()` | Deterministic random number in `[0, 1)`. `Math.random()` uses the same private stream. |
| `ctx.game` | Read-only queries described below |

`ctx` is new on every call. Do not keep it in a top-level variable. Changing its properties does not give you extra powers.

## Reading the game

```javascript
ctx.game.teams()
ctx.game.units({team, offset, limit})
ctx.game.buildings({team, offset, limit})
ctx.game.unit({id, generation})
ctx.game.building({id, generation})
ctx.game.unitTypes({offset, limit})
ctx.game.unitBehavior({id, generation})
ctx.game.buildingTypes()
ctx.game.terrainTypes()
ctx.game.resourceTypes()
ctx.game.materialTypes()
ctx.game.experiments()
ctx.game.rules()
ctx.game.map.width / ctx.game.map.height
ctx.game.map.tile(x, y)
ctx.game.map.region(x, y, width, height)
ctx.game.map.zones(x, y, width, height, team)
```

- **Records are detached copies.** Changing a record (in profile 1) does nothing to the game. Records have no prototype, so use `Object.keys(record)` rather than `record.hasOwnProperty()`.
- **Read in small pages.** `offset` and `limit` page through visible results. Each list call costs work, so spread big scans over several decisions.
- **Keep references, not records.** An entity is identified by `{id, generation}`. A list record already contains both fields. Look the entity up again later. `null` means it is dead, hidden or replaced.
- **The map wraps.** Read coordinates may be negative or past the edge, and results come back in normal map coordinates. `region` returns a flat row-major array of up to 256 by 256 tiles, but a full 256 by 256 read exceeds the work budget.
- **Ask about capabilities, not names.** `buildingTypes()` records list `capabilities` such as `feed`, `heal` or `produceWorker`, plus `nextType` for upgrades. `rules()` reports match settings such as `noUpgrades`, `peaceful` and `noHunger`.

```javascript
let buildingOffset = 0;

function step(ctx) {
  const page = ctx.game.buildings({team: ctx.myTeam, offset: buildingOffset, limit: 50});
  buildingOffset = page.length === 50 ? buildingOffset + 50 : 0;
  const innType = ctx.game.buildingTypes().find(
    t => t.placeable && t.capabilities.includes('feed')
  );
  // ...
  return null;
}
```

### What your AI can see

| Data | Your AI sees |
| --- | --- |
| Team IDs and alive status | Every team |
| Team stock and alliances | Your own team only |
| Your units and buildings | Full records: workers, stock, hunger, carried goods and more |
| Other units | Only when visible and outside buildings; basic fields only |
| Other buildings | Only when their anchor tile is visible and they are not cloaked; basic fields only |

Allies get the same limited view as enemies. Tiles you have never explored come back as just `{x, y, visible: false, explored: false}`. An explored tile that is out of sight shows remembered terrain and resources from `observedTick`, without units or buildings. An empty or hidden occupant slot reads `65535`, not `null`. Your AI's exploration history is saved with the game.

```javascript
let wheat = [];

function step(ctx) {
  const unit = ctx.game.units({team: ctx.myTeam, limit: 1})[0];
  if (!unit) return null;
  const tiles = ctx.game.map.region(unit.x - 4, unit.y - 4, 8, 8);
  wheat = tiles.flatMap(t => t.visible && t.resource && t.resource.type === 1
    ? [{x: t.x, y: t.y, amount: t.resource.amount}] : []);
  return null;
}
```

Numbers such as resource IDs (wood `0`, wheat `1`, stone `3`) and building families (swarm `0`, inn `1`) are listed in the reference. They are not predefined globals, so define your own constants.

## Orders (profile 1)

Return one order object, or `null`. Any building you name must be your own and must be a current reference. A record from a list works.

| `type` | What it does |
| --- | --- |
| `create` | Place a new construction site or flag: `buildingType`, `x`, `y`, `workers`, `futureWorkers` (flags also need `range`) |
| `workers` | Set a building's requested workers (`0..20`) |
| `construction`, `cancelConstruction` | Start or cancel an upgrade or repair |
| `delete`, `cancelDelete` | Remove a building, or undo the removal |
| `priority` | Low `-1`, normal `0`, high `1` |
| `production` | Swarm ratios: three integers `0..16` for worker, explorer and warrior |
| `exchange` | Market receive and send masks |
| `range`, `moveFlag` | Change a flag's radius, or move it |
| `minimumLevel`, `requireBombing`, `workerMinimumLevel` | Set who a building or flag attracts |
| `clearingMaterials` | Choose what a clearing flag clears |
| `forbidden`, `guardArea`, `clearArea`, `farmArea` | Add (`mode: 1`) or remove (`mode: 2`) a zone with a row-major `mask` of booleans (`farmArea` only with the farm-areas experiment) |
| `alliance` | Set your own team's allies, enemies and shared vision |

```javascript
function step(ctx) {
  const swarm = ctx.game.buildings({team: ctx.myTeam, limit: 50})
    .find(b => b.shortType === 0);
  if (!swarm || swarm.production.join() === '4,1,3') return null;
  return {type: 'production', building: swarm, ratios: [4, 1, 3]};
}
```

**Orders are not instant.** Each order executes after a match-wide order delay, measured from `ctx.tick` (0–16 ticks, default 14). The game can still reject an accepted order when it executes, for example if the site is occupied or the building choice is disabled. Your next decision may therefore not show the result yet. Remember what you asked for, and when, so you do not send the same order repeatedly. For `create` and `moveFlag`, `x` and `y` must already be inside the map. Unlike reads, these orders do not wrap coordinates.

## Profile 2

```javascript
export function metadata() { return {apiVersion: 2, name: "My AI"}; }

let innAction = null;
let nextInnCheck = 0;

export function step(ctx) {
  const buildings = ctx.game.buildings({team: ctx.myTeam, limit: 32});
  for (const b of buildings) {
    if (b.workers !== 3) b.workers = 3;
  }
  const swarm = buildings.find(b => b.shortType === 0);
  const status = innAction === null ? null : ctx.actions.status(innAction);
  if (swarm && ctx.tick >= nextInnCheck && (status === null || status.status === 'failed')) {
    nextInnCheck = ctx.tick + 128;
    innAction = ctx.actions.build({
      building: 'inn',
      preferences: [{metric: 'distance', sources: {points: [{x: swarm.x, y: swarm.y}]}, weight: -1}],
    });
  }
  ctx.telemetry.set('colony.buildings', buildings.length);
}
```

- **Managed buildings.** Your own building records have writable `workers`, `priority`, `production`, `receiveMask`, `sendMask`, `range`, `minimumLevel` and similar properties, applied according to each building's capabilities. Reading them shows your pending value, and `building.observed` shows the game's value. Assign whole arrays.
- **Actions.** `ctx.actions` offers `create`, `build`, `upgrade`, `repair`, `delete`, `zone`, `status` and `cancel`. The queuing methods return a numeric action ID; `build` returns `null` when no suitable site is found. `status(id)` reports `pending`, `issued`, `constructing`, `completed`, `failed` or `cancelled`, and `null` once old history is dropped. `cancel` affects only actions that are still pending.
- **Still one order per decision.** Edits and actions wait in a queue, and the game sends one order each time your AI is polled. The queue survives saves.
- **Spatial services.** `ctx.spatial` provides wrapped grid `distance` (Chebyshev or Manhattan), `distanceField` and `fieldValue` (travel distance by walking, swimming or flying), `passable`, `components`, `summary`, `hotspots`, and `placement`. `placement` ranks building sites by distance, fertility, resource density and threat. `ctx.actions.build` queues the best result. These services use only what your colony has observed. A `null` distance or reachability means "unknown", not "far".
- **Telemetry.** `ctx.telemetry.set(name, value, description?)` publishes numbers, booleans or short text. You can read the values in **Menu → AI telemetry** during play and in replays.

## Persistence rules that bite

Top-level `let`, `const` and `var` variables are saved after every successful decision and restored when a game loads.

You can store `null`, booleans, numbers, strings, arrays and plain objects, including shared references and cycles.

You **cannot** store:

- `Map` or `Set` instances, class instances, objects with custom prototypes, getters or symbol keys
- `ctx` or game services. In profile 2, managed buildings and spatial fields expire after the call, so store `building.ref` and look the building up again.
- Functions created during a call, or functions with private closure variables. Functions written at top level are fine.

You can use a `Map` inside a single call, as long as you convert it before the call ends. Other rules:

- Top-level setup code must be deterministic. It cannot query the world or use randomness, so do that inside `step`.
- The global object and built-ins are frozen. Declare variables at top level instead of adding to `globalThis`, and do not use names that start with `__glob2_`.
- Orders and other returned data must not contain `undefined`, `NaN`, infinities or array holes. Omit a field, or use `null`.
- If saving your variables fails, the decision is rejected and the AI is disabled.

## Limits that matter

| Limit | Value |
| --- | --- |
| Source file | 128 KiB, one bundled file, no runtime imports |
| Work per decision | 1,000,000 units of script work. Profile 2 spatial services have their own separate 16 million unit budget. |
| Memory | 32 MiB script heap |
| Saved variables, and each returned value | 1 MiB each |
| Data nesting | 256 levels |
| Profile 2 queue | 256 pending actions, 256 new actions per decision, 1,024 history records |
| Telemetry | 128 names per AI, names up to 128 bytes, text up to 512 bytes |

The budget counts work, not seconds, so the same script behaves the same on any computer. Running out of budget disables the AI, and catching the exception does not prevent this. Ordinary synchronous JavaScript and the full `Math` object work. The runtime has no regular expressions, `async`/promises, `BigInt`, `Date`, `Proxy`, typed arrays, `eval`, or file, network and clock access. Profile 1 has no `console`. To inspect state, use telemetry in profile 2, or throw an error containing your data.

To stay inside the limits, compare `ctx.tick` to schedule expensive work, read small pages and regions, and limit placement searches to an area. The starter project makes one economy decision every 128 ticks.

## Troubleshooting

- **`TypeError` from a query.** An argument is the wrong type or out of range. For example, IDs and coordinates must be integer numbers, not strings. You can catch these errors.
- **`ctx.game.unit({id: tile.groundUnit})` returns `null`.** Tile occupants are bare IDs. Find the unit in a list to get its `generation`.
- **Enemy fields are `undefined`.** Other teams' records contain only basic fields.
- **The same order repeats every decision.** The previous one has not executed yet. Track what you have already requested.
- **`farmArea` is rejected.** It works only in games with the `farm-areas` experiment. Check `ctx.game.experiments()`.
