---
title: "MCP agent tools reference"
description: "Every tool the desktop game's MCP server gives an AI assistant, what each needs, where it works, and a first session that gets an agent playing."
locale: "en"
group: "automate"
order: 7
format: "reference"
prerequisites: ["getting-started", "mcp-server"]
tags: ["AI", "MCP", "automation", "desktop", "reference", "scripting"]
reviewedAgainst: "Globulation 2 0.11.6.2 desktop release"
sources:
  - title: "Released 0.11.6.2 source: MCP tool definitions"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/src/mcp/Tools.cpp"
  - title: "Released 0.11.6.2 source: built-in game_guide topics"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/src/mcp/Guide.cpp"
  - title: "Released 0.11.6.2 source: embedded MCP UI server guide"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/docs/development/mcp-ui-server.md"
  - title: "Released 0.11.6.2 source: local human-match scripting through MCP"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/docs/multiplayer/hive-mind.md#local-human-match-scripting-through-mcp"
  - title: "Released 0.11.6.2 source: local match tools and Hive limits"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/src/hive/LocalCommander.cpp"
  - title: "Globulation 2 releases"
    url: "https://github.com/Globulation2/glob2/releases"
---

This reference lists the tools an AI assistant receives from the game's [MCP server](/learn/mcp-server/), as shipped in the **0.11.6.2** desktop release. Earlier releases have fewer tools: `game_guide` and every `game_*` tool need 0.11.6.2 or later, and `ui_inspect`, `ui_act`, `ui_wait`, `ui_renew_control` and the `hive_*` tools need 0.11.5.0 or later. Download the current build from the [Globulation 2 releases](https://github.com/Globulation2/glob2/releases) page.

Your assistant can read the exact arguments of each tool from the server itself. This page explains what the tools are for, so you know what to ask for and what to expect.

## Three families of tools

| Family | What it does | Where it works |
| --- | --- | --- |
| `ui_*` | Sees and operates the game window: screenshots, named on-screen controls, mouse and keyboard. | Any screen of the desktop game. |
| `game_*` | Reads your colony and acts on it in map tiles: place buildings, change them, paint zones, move the camera. Includes `game_guide`. | `game_guide` works anywhere. The others work in a local match you are playing yourself. |
| `hive_*` | Runs JavaScript player scripts for your colony and manages standing orders. | A local match you are playing yourself. |

**Reading needs no control.** Screenshots, inspection, waiting, `game_guide`, `game_world`, `hive_status`, `hive_api`, `hive_result` and listing or inspecting standing orders work without a token. **Everything that changes the game** needs the token from `ui_acquire_control`. See [How control works](/learn/mcp-server/#how-control-works).

## game_guide: the built-in manual

`game_guide` is written for an assistant that knows nothing about Globulation 2. Point a new assistant at it first. Pass a `topic`; the default is `overview`. Every topic also returns links to the game's source and documentation.

| Topic | What it covers |
| --- | --- |
| `overview` | What the game is and the first five calls to make. |
| `gameplay` | Rules: units, buildings, food, flags, zones and victory. |
| `screens` | Menus and how to start a tutorial or a custom game. |
| `hud` | Reading the in-game screen. |
| `actions` | Named controls versus coordinate gestures, placing and selecting. |
| `control` | The control lease and token workflow. |
| `hive` | Reading the world and scripting your colony with JavaScript. |
| `troubleshooting` | What common errors mean and what to do next. |
| `links` | Source code, documentation and tutorial content. |

## ui_* tools: the game window

These tools work on every screen: menus, settings, the tutorial, matches, the map editor and replays. They operate the window as a person would, so they also work where the `game_*` and `hive_*` tools do not.

### Look

| Tool | What it does |
| --- | --- |
| `ui_status` | Whether the window is available (not minimized or behind an operating-system dialog), its size, and who holds control. |
| `ui_screenshot` | A PNG of the next rendered frame. `max_width` and `max_height` shrink it. The returned `capture_id` lets later clicks use this image's pixel coordinates. |
| `ui_inspect` | The current screen's name and its controls, each with a key, label, role, available actions, value and revision. `compact: true` gives a much smaller result and is recommended. `surface` or `subtree` narrows it; `screenshot: true` adds an image. |
| `ui_wait` | Waits until something happens, for example `{"screen": "game_session"}` after starting a match, or a control becoming enabled or changing value. Default 10 seconds, at most 30. On timeout it returns the latest state. |

### Act on named controls

| Tool | What it does |
| --- | --- |
| `ui_act` | Operates a control found by `ui_inspect`, by `surface`, `key` and `revision`. Actions are `activate` (press), `select` (choose by index), `set_value` (slider, toggle or text) and `scroll`. The game checks the control again when it receives the action, so a stale, hidden, disabled or covered control is refused rather than mis-clicked. |

Named controls are the reliable way to use menus and panels. Prefer `ui_act` over clicking by coordinates whenever the thing you want is a button, tab, slider or field.

### Mouse and keyboard

| Tool | What it does |
| --- | --- |
| `ui_click` | Clicks at x, y: left (default), middle or right, single or double. A right click cancels placement. |
| `ui_drag` | Drags through a list of points, for example to paint a zone or pan the map. |
| `ui_scroll` | Mouse wheel at x, y: zooms the map or scrolls a list. |
| `ui_move` | Moves the pointer (hover). |
| `ui_mouse_button` | Holds or releases a mouse button across calls. |
| `ui_key` | Presses, holds or releases a key by name, such as `Escape`, `Return`, `Space` or `A`, with optional modifiers. Escape cancels placement or selection, then opens the game menu. |
| `ui_type_text` | Types text into the focused text field. |
| `ui_release_inputs` | Lets go of every key and button the assistant is holding. It keeps control. |

The map, minimap and replay bar are pictures rather than controls, so use a screenshot and coordinates there. Pass the screenshot's `capture_id` so x and y refer to that image. Any input tool can also return a fresh screenshot with `capture_after: true`.

### Control

| Tool | What it does |
| --- | --- |
| `ui_acquire_control` | Takes control and returns the token. Fails while another client holds control. `inspect: true` also returns the current screen. |
| `ui_renew_control` | Extends the five-minute control lease without sending input. |
| `ui_release_control` | Releases held keys and buttons and gives up control. |

## game_* tools: your colony in map tiles

These tools let an assistant think in map tiles instead of screen pixels. Apart from `game_guide`, they work only in a **local match where you are the human player**. They are unavailable online, in LAN games, replays, spectating, or when an AI has taken over your colony.

| Tool | What it does |
| --- | --- |
| `game_world` | Reads your colony: free and total units, prestige and win chance; recent alerts such as attacks, with their tiles; your buildings with id, type, top-left tile, size, level, construction state and workers; unit counts and your warriors by training level; hungry and injured units; known resources with the nearest tile; other teams' buildings you can see or remember; how recent placements went; and the names and sizes of everything you can place. `detail: "full"` adds unit lists. `area` limits it to a tile rectangle. No token needed. |
| `game_place` | Places a building site or flag by name, with its top-left corner on a tile, through the same checks as a click. `near: true` searches outward for room and reports where it went. Buildings need explored ground. Refusals say why. |
| `game_building` | Changes one of your buildings or flags by its `id` and `generation` from `game_world`: units requested (`workers`), `priority` (low, medium, high), Swarm `production` ratios, flag `range`, or an `action`: upgrade, repair, cancel_upgrade, destroy, cancel_destroy, or move (a flag, to x, y). A request above the building's limit is capped, and the reply says so. |
| `game_zone` | Paints or erases a forbidden, guard or clearing zone over a tile rectangle, up to 64 by 64 tiles. |
| `game_view` | Centres the camera on a tile and returns where it now appears on screen, so the assistant can click what is there. |

**Fog of war applies.** The `game_*` tools report only what your colony sees now or has seen before. Other teams' buildings out of sight are reported as last seen, and are corrected only when that ground is in view again. They never reveal another team's hit points or warrior training. An assistant using these tools learns nothing your colony has not seen.

Placements pass the same checks as your own clicks. A placement is confirmed on a later simulation step, so the assistant should check `game_world` rather than assume success.

## hive_* tools: scripts for your colony

The `hive_*` tools run small `step(ctx)` JavaScript player scripts in a local match on your own computer. They need no account and no credits, and they work in today's desktop releases. These are the same kind of scripts that the upcoming online [Hive Mind](/learn/hive-mind/) commander will use. Call `hive_api` for the exact script contract your game version accepts; [Hive Mind standing orders](/learn/hive-mind-standing-orders/) explains the standing-order idea from a player's point of view.

**Where they work:** only a local match where you are the human player. Online and LAN games, replays, spectating and AI takeover all refuse local scripting. Scripts see only what your colony may see.

| Tool | What it does |
| --- | --- |
| `hive_status` | Whether scripting is available now, the current match `session` id, and the limits. No token needed. |
| `hive_api` | The script API: world queries, order formats and limits. Read it before the first script. No token needed. |
| `hive_run` | Runs one script once. Needs `token`, `session`, a new `operation_key` and `source`. A `queued` reply means the script was accepted, not that it succeeded. |
| `hive_result` | Reads a run's or program change's output, errors and order results by `session` and `operation_key`. It never runs anything again. |
| `hive_program` | Manages standing orders, named scripts that run again every `interval_ticks` (at least 25): `list`, `inspect`, `install`, `replace` (with `expected_revision` from `inspect`), `pause`, `resume`, `cancel`. Changes need the token, session and a new operation key. |

### Limits and lifetime

| Limit | Value |
| --- | --- |
| Script source | 128 KiB |
| Standing orders per match | 8 |
| Orders returned by one invocation | 32 |
| Minimum interval for standing orders | 25 ticks |

- **Use a fresh operation key for each change.** Repeating a key with the same arguments returns the earlier result without running it again. Reusing a key with different arguments fails.
- **One-shot runs share nothing.** Each `hive_run` starts fresh. A standing order keeps its variables between its own successful runs; replacing it resets them.
- **Standing orders outlive the assistant.** They keep running after the assistant disconnects or its control lease expires. Each has an in-game Hive card showing recent output and errors, with pause, resume and cancel controls. If a program's worker fails, that program is paused.
- **Nothing is saved.** Standing orders, their variables and run history are never saved with the game. Leaving or loading a match discards them. A new match has a new `session` id.
- **Accepted is not achieved.** Orders a script returns still go through the normal order queue, and the game decides what actually happens.

## A recommended first session

Give your assistant this sequence, or simply ask it to call `game_guide` and follow the overview.

1. `game_guide` with topic `overview` (and later `gameplay` and `screens`) to learn the game.
2. `ui_status` to check the window is available and nobody else holds control.
3. `ui_acquire_control` and keep the token.
4. `ui_inspect` with `compact: true` to see the current screen and its controls.
5. From the main menu, `ui_act` to activate **Tutorial** (key `menu/1`), then **Introduction** (key `tutorial/lesson/0`). On a brand-new profile the first screen may instead offer `intro/start`.
6. `ui_wait` for `{"screen": "game_session"}`, then inspect again. Control numbers and revisions change whenever a screen is rebuilt.
7. Read the lesson card and follow it. Use `game_world` to see the colony, `game_place` and `game_building` to act, and `game_view` with `ui_screenshot` to look around the map.
8. Optionally, `hive_status` and `hive_api`, then a small read-only `hive_run` followed by `hive_result`.
9. `ui_release_control` when finished.

Two rules keep a session safe:

- **Never retry an input call automatically.** The game may have received it before an error or timeout was reported. Inspect first, then decide.
- **Re-inspect after every screen change.** An action's reply can describe the screen as it was when the input arrived; wait for the new screen before acting again.

## Troubleshooting

| What the assistant sees | What to do |
| --- | --- |
| Window not available | The game is minimized, hidden or behind an operating-system dialog. Restore it, then call `ui_status` again. |
| Another client controls the game | Wait for it to finish, or press **Revoke control** in **Settings → MCP server**. |
| Token rejected | Control was lost. Call `ui_acquire_control` again. |
| Stale control | The screen changed. Call `ui_inspect` again and use the new surface and revision. |
| Hidden control | Scroll its container with `ui_act` (`scroll`) first. |
| Blocked control | A dialog or panel covers it. Close or answer the dialog. |
| Stale viewport or expired capture | Take a new `ui_screenshot` and use its `capture_id`. |
| Wait timed out | The condition did not happen. Read the returned state. |
| `game_*` or `hive_*` unavailable | You are not in a local match as the human player, or the match is online, LAN, a replay, spectated or under AI takeover. |
| Match session expired | A new match started. Get the new `session` from `hive_status`. |
| Nothing happens in the match | Check the game is not paused and the building or flag requests more than zero units. |
