---
title: "Controls, HUD, and reading your colony"
description: "Find the information behind a busy colony: staffing, food, unit needs, statistics, and map controls."
group: "start"
order: 2
prerequisites: ["getting-started"]
tags: ["beginner", "controls", "reference"]
sources:
  - title: "Current public browser interface, observed 18 November 2026"
    url: "https://app.glob2.online/play/"
  - title: "Earlier source context: game interface and colony counters"
    url: "https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/hud/draw/GameGUIDraw.cpp"
  - title: "Earlier source context: default game keyboard bindings"
    url: "https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/data/keyboard-gui.default.txt"
  - title: "Earlier source context: sidebar controls"
    url: "https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/hud/input/GameGUIInputMenuClick.cpp"
---

A busy screen does not necessarily mean a productive colony. Learn to read the requests, resources, and unit needs behind the movement. This chapter uses desktop browser controls; keyboard bindings can be changed in **Settings → Controls**.

## Find your bearings

For the pictured practice, open **Tutorial → Food supply practice**. If a briefing appears, read it and choose **Ok**; otherwise follow the visible lesson task. This is a prepared training colony with an existing inn and swarm; its starting stocks are not a promise about a custom match. Press **P** to pause while you inspect it. The main map occupies most of the screen. The minimap and working sidebar sit on the right; colony counters run across the top.

Use the minimap to move your view to another part of the map. **Home** brings you back to your colony. These change your camera; they do not send globs to that location. Clicking the game canvas gives the game keyboard focus. If a shortcut appears to do nothing, click the canvas before trying again.

The menu icon beside the minimap and **Escape** open the in-game menu. Use it to save, return to play, or quit through the game's own controls. In a local practice match, **P** pauses and resumes the simulation. You can still inspect the interface while paused, but workers cannot deliver materials until you resume. Treat online pause and speed behavior as a match setting rather than assuming your local controls stop everyone else's game.

## Selection changes the sidebar

Left-click a building or glob to inspect it. Selection exposes information and the controls appropriate to that object. It does not make a glob follow conventional click-to-move orders.

:::media-group

[[media:controls-inn-v3]]

[[media:controls-inn-detail-v3]]

:::

In this paused example, the existing inn shows **HP 200/200**, **Inside 0/4**, **Working 0/2**, and **Food 10/10**. A shortfall between attached and requested workers does not by itself establish a problem: inspect the stock and resume to watch what work is needed.

On a selected building, look for these distinct readings:

| Reading | What it tells you | Useful question |
| --- | --- | --- |
| HP | Current health and maximum health | Is this structure damaged, or still under construction? |
| Working | Attached workers compared with requested workers | Have I asked for more labor than the colony can provide? |
| Material or Food count | What the building currently holds | Are resources arriving, or has delivery stopped? |
| Inside | Units currently using the service | Is this building busy, empty, or waiting for users to leave? |
| Priority | Relative hiring preference | Should this food job get workers before a less urgent site? |
| Production bars on a swarm | Mix of future Worker, Explorer, and Warrior births | Am I making the unit types I need? |

A building does not show every row: a construction site needs materials, an inn supplies meals, and a swarm creates units. Read the labels rather than transferring the meaning of a bar from one building to another.

On a selected glob, inspect nutrition, health, abilities, and current activity. Low nutrition calls for reachable food. Lost health calls for healing as well. A worker briefly leaving a job to eat is different from a worker being unable to reach that job at all. The selected worker below shows **HP 200/200**, **Food 69%**, and **Not carrying anything** in this paused frame.

:::media-group

[[media:controls-worker-v3]]

[[media:controls-worker-detail-v3]]

:::

:::note

**Right-click** clears a selection or cancels a placement tool. After clearing the selection, further right-clicks cycle sidebar views. Cancel before clicking somewhere else if you do not intend to place another building or flag.

:::

## Separate requests from available labor

The top bar's unit counters show **availability / total**. They help you spot the balance between the colony and its commitments. The worker availability figure subtracts outstanding worker demand, so it can become negative. A negative value is a labor shortage signal; it does not mean workers have literally disappeared.

To investigate it:

1. Select your inn and check that it has food and a sensible Working request.
2. Select each unfinished site and compare its requested workers with actual attachments.
3. Reduce a less urgent request or cancel an unnecessary project.
4. Resume the game and check whether workers now reach the more important job.

The selected-building **Working** row and the swarm's production mix solve different problems. Raising a Working request allocates existing workers. Raising Worker production asks the swarm to create future workers, requiring food and time. Increasing every request at once can deepen the shortage.

## Use the statistics views

Clear the selection, then choose the **Statistics** icon below the minimap. The current panel has topic buttons: **Overview**, **Colony**, **Economy**, **Military**, **World**, and **Game engine performance**. Use a topic to find the measurement relevant to your question.

[[media:controls-statistics-v3]]

For a first example, choose **Population** in Overview. Its current value and an inline history chart appear in the sidebar. In this prepared colony, the selected reading is **Population 13**. Choose **Open full history** to expand the chart; **Details** offers its explanation and **Close** returns to the panel.

[[media:controls-history-v3]]

Use history to answer a specific question. Did population grow while food stocks fell? Did an interruption coincide with stalled construction? Pair the measurement with a visible cause on the map. Inspect the definition and units before interpreting a percentage or a rate; an individual glob's HP and Food remain direct checks when that glob needs help.

## Use map overlays to locate trouble

**Map overlays** is a separate sidebar view, opened with the fourth icon below the minimap. It is not the history chart. Its controls include **Starving Map**, **Wounded Units Map**, **Defense Map**, and **Fertility Map**.

[[media:controls-overlays-v3]]

Use an overlay to locate an area worth inspecting, then return to the affected globs, buildings and routes. An overlay changes what the map shows; it does not feed a hungry glob, heal an injury, or assign more workers. The example shows all four boxes unchecked. Compare an overlay with the selected glob’s HP, Food and current activity before deciding what to change.

**Prestige** is an in-match victory measure. The online leaderboard uses a separate player-ranking system. Read [victory conditions and custom rules](/learn/victory-and-rules/) before planning around a match's objective.

## A few shortcuts worth learning first

| Default key | Action | When to use it |
| --- | --- | --- |
| Escape | Open the game menu | Save, quit, or return to play |
| P | Pause or resume local play | Inspect a problem without letting it grow |
| Home | Return the camera to home | Recover your bearings after scouting |
| H | Open message history | Revisit tutorial instructions or events |
| Space | Go to an event; continue a message when prompted | Follow the active lesson’s visible instructions |
| + or = / − | Increase / decrease selected building's requested workers | Move labor between competing jobs |
| I | Toggle information drawing | Inspect map information without changing the simulation |
| T | Toggle unit-path drawing | Investigate a unit's route |
| S | Toggle accessibility aids | Add visual distinctions to the map |
| Tab | Cycle your same-type selection | Find another owned glob or building of the selected type; the camera can move |

Building and area shortcuts use sequences. For an inn, press **B**, then **I**; those are separate key presses, not a simultaneous chord. The control reference lists more sequences. When a shortcut's result surprises you, right-click to cancel, inspect the current selection, and use the visible control until you understand the mode.

## Read the colony in a repeatable order

Try a thirty-second check each time you return home:

1. **Food:** select an inn and check stored food and delivery.
2. **Labor:** compare worker availability with the largest Working requests.
3. **Production:** inspect the swarm's future unit mix.
4. **Health:** look for globs that need meals or healing.
5. **Projects:** check whether sites receive materials and whether upgrades have room.

If everything is moving but one checkpoint is failing, solve that failure before adding more work. Continue with [jobs, priorities, flags, and areas](/learn/jobs-and-flags/) to turn those readings into deliberate colony management.
