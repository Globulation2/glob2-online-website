---
title: "Building and upgrade reference"
description: "Check construction and upgrade materials, distinguish builder qualification from staffing, and read usable service places and stocks."
locale: "en"
tags: ["reference", "buildings", "upgrades"]
order: 1
group: "reference"
format: "reference"
prerequisites: ["buildings-and-services"]
sources:
  - title: "Current public browser Food supply, Hospitals and Schools examples, observed 18 November 2026"
    url: "https://app.glob2.online/play/"
  - title: "Released native 0.11.6.1 building catalogs"
    url: "https://github.com/Globulation2/glob2/tree/1b60514218218c89516b6c6f26f2fcefc9c8f974/content/data/buildings"
  - title: "Released native 0.11.6.1 builder qualification in the Upgrade interface"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/render/scene/SceneExtract.cpp"
  - title: "Released native 0.11.6.1 construction, repair and service interruption"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/building/Construction.cpp"
  - title: "Released native 0.11.6.1 worker eligibility and local stocks"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/building/Misc.cpp"
---

The tables give **released native 0.11.6.1 Standard catalog values**. The illustrations are actual High-resolution public **browser 0.11.6.0** Food supply, Hospitals and Schools lessons; that deployment's exact source revision remains unverified. They show selected counters and a worker's observed training, rather than testing every catalog recipe or completing an upgrade of every service.

Read the selected rules before applying a table to instant construction, stockpiles, no-upgrade modes, experiments or an altered scenario. Construction materials, service places and finished stocks are different requirements.

## Construction and upgrade materials

Level 1 is a new site's material requirement. The upgrade columns are the materials for the next stage, not the combined cost of all earlier stages.

| Building | Level 1 | Upgrade to Level 2 | Upgrade to Level 3 |
| --- | --- | --- | --- |
| Swarm | 35 food | — | — |
| Inn | 3 wood | 8 wood | 7 wood, 5 stone |
| Hospital | 3 wood | 8 wood | 3 wood, 5 stone |
| School | 7 wood, 2 algae | 5 wood, 5 stone, 12 algae | 7 wood, 4 food, 12 stone, 10 algae |
| Barracks | 7 wood | 3 wood, 10 stone | 10 wood, 10 stone |
| Racetrack | 6 wood, 1 stone | 10 wood, 5 stone | 15 wood, 5 stone |
| Swimming pool | 8 wood | 12 wood, 6 food | 8 wood, 4 food, 6 stone, 8 algae |
| Defense tower | 6 wood | 10 wood, 14 stone | 8 wood, 14 stone, 2 algae |
| Stone wall | 4 stone | — | — |
| Market | 4 wood, 4 stone | Experimental | Experimental |

A dash means no further Standard tier. Market upgrades require Markets V2; do not budget for them as ordinary progression.

:::media-group

[[media:training-school-foundation-v3]]

[[media:training-school-foundation-detail-v3]]

:::

The current browser School foundation shows **Wood 0/7**, **Algae 0/2**, **Working 0/5** and **HP 1/360**. Five builders are requested, none has attached at that pause, and the materials are still missing. Increasing a request cannot substitute wood for algae or create a usable route.

## Prepare eligible builders before the upgrade

In the native Standard progression, ordinary workers can build Level 1 sites. Basic School builder training prepares Level 2 work; further builder training at the next School stage prepares Level 3 work. Qualification and the displayed building-work value are separate from the building's own level.

The native Upgrade interface considers both space and the colony's available construction qualification. An action can remain unavailable before a suitable builder exists. After it becomes available, the site still needs a qualified worker free to reach and perform the job; a busy or hungry worker does not arrive instantly.

:::media-group

[[media:training-worker-before-detail-v3]]

[[media:training-worker-after-detail-v3]]

:::

In the actual browser Schools lesson, the same continuously selected worker changes from **Build (1): 8** to **Build (2): 12** while its HP stays **200/200**. Its Food falls from **98%** to **51%** across that interval. This is observed training in the prepared lesson; inspect the particular worker and selected site in your own match.

:::warning

An upgrade interrupts the building's service. Keep a supplied backup before upgrading a feeding service, check the next footprint, and read whether damage requires repair first. A visible Upgrade button is preparation, not a completed upgrade.

:::

The recorded School is complete and its Upgrade control is visible. No Inn upgrade, locked/unlocked Inn comparison or completed higher-tier service is pictured here. Use the [training lesson](/learn/training-and-upgrades/) and inspect the actual next-stage requirement before committing your only useful service.

## Service places after completion

Inside counts globs using a service. It does not count builders or workers hauling supplies.

| Service | Level 1 places | Level 2 places | Level 3 places | Purpose |
| --- | --- | --- | --- | --- |
| Inn | 4 | 7 | 17 | Meals |
| Hospital | 2 | 5 | 7 | Healing |
| School | 4 | 7 | 9 | Eligible unit training |
| Barracks | 2 | 4 | 5 | Combat training |
| Racetrack | 2 | 4 | 6 | Walking training |
| Swimming pool | 2 | 4 | 6 | Swimming training |

:::media-group

[[media:services-hospital-completed-detail-v3]]

[[media:training-school-completed-detail-v3]]

:::

The pictured current browser Hospital is empty at **Inside 0/2**, while the School has **Inside 1/4**. The empty final Hospital frame does not show its patient inside; read the [services lesson](/learn/buildings-and-services/) for the separate same-patient health observations. Occupancy and successful service completion answer different questions.

A full service may need time or more usable capacity. An empty one may have no eligible visitor needing it, or may have an access or availability problem. Raising unrelated labor requests does not diagnose that difference.

## Food, fruit and ammunition stocks

| Building stock | Level 1 | Level 2 | Level 3 | What uses it |
| --- | --- | --- | --- | --- |
| Inn food | 10 | 30 | 50 | One food per ordinary native meal |
| Inn, each fruit kind | 40 | 80 | 200 | Optional fruit with meals |
| Swarm food | 20 | — | — | Five food per ordinary native birth |
| Tower stone | 4 | 4 | 4 | Converted into ammunition |

[[media:food-recovery-detail-v3]]

This actual browser inn has **Food 10/10**, **Inside 0/4** and **Working 0/2** after a bounded refill. Stored meals, occupancy and attached/requested haulers are separate readings. An ordinary Hospital has no food store and cannot replace an inn.

The basic native Market catalog can hold fruit; it is not a general warehouse combining every building's materials. Check the actual experiment settings before relying on broader stock routing or upgrades.

For missing deliveries, return to [resources and hauling](/learn/resources-and-hauling/). For growth pressure, use [food supply](/learn/sustainable-food/) and [population and production](/learn/population-and-production/). Choose additional service capacity only when workers can finish it and the intended globs can reach and use it.
