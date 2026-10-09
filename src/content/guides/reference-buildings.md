---
title: "Building and upgrade reference"
description: "Standard construction costs, builder requirements, service places, and the stocks that matter after completion."
locale: "en"
tags: ["reference", "buildings", "upgrades"]
order: 1
group: "reference"
prerequisites: ["buildings-and-services"]
reviewedAgainst: "4edaed552c3574914197d4978fbff4b81bd1eedb"
sources: [{"title":"Standard building definitions","url":"https://github.com/Globulation2/glob2/tree/4edaed552c3574914197d4978fbff4b81bd1eedb/data/buildings"},{"title":"Upgrade availability and builder qualification","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/render/scene/SceneExtract.cpp"},{"title":"Materials and services","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/building/Services.cpp"}]
---

These are the public browser game's Standard building costs. Read your match's rules before applying them to instant construction, starting stockpiles, experiments or an altered scenario. A construction cost is different from the stock a finished building keeps for its work.

## Construction and upgrade materials

The Level 1 column is a new site's material requirement. Levels 2 and 3 are the materials for the next upgrade stage, rather than the combined cost of every earlier stage.

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
| Stone wall | 1 stone | — | — |
| Market | 4 wood, 4 stone | Experimental | Experimental |

A dash means there is no further Standard building tier. Market upgrades belong to the optional Markets V2 experiment; do not budget for them as ordinary progression.

[[media:services-stalled-school]]

## Builders and the Upgrade action

Ordinary workers can construct Level 1 sites. For Level 2 sites, train workers at a basic school. For Level 3 sites, supply further builder training at the next school stage. Standard school training supplies that progression.

Before the colony has the required qualification, an upgrade action can be unavailable even when the building is healthy and has room. Train a suitable worker first. Once the action is unlocked, the site still needs eligible workers available to perform it. A trained builder busy elsewhere, taking a meal, healing or unable to reach the site cannot instantly complete the job.

Qualification is distinct from the displayed rate of a worker's building ability. Read the site's messages and the worker's training instead of assuming more ordinary workers can replace one qualified builder.

Upgrading interrupts the building's service. Keep a supplied backup inn before upgrading a feeding service, and check the larger footprint before committing. Damaged buildings can need repair before an upgrade is available.

## Service places after completion

Inside counts globs using a service. It does not count the workers constructing the building or stocking an inn.

| Service | Level 1 places | Level 2 places | Level 3 places | Purpose |
| --- | --- | --- | --- | --- |
| Inn | 4 | 7 | 17 | Meals |
| Hospital | 2 | 5 | 7 | Healing |
| School | 4 | 7 | 9 | Eligible unit training |
| Barracks | 2 | 4 | 5 | Combat training |
| Racetrack | 2 | 4 | 6 | Walking training |
| Swimming pool | 2 | 4 | 6 | Swimming training |

[[media:services-healing-detail]]

A full service needs time or more usable capacity. An empty service can mean no eligible glob needs it, no one is available to visit, or the route is unsuitable. Staffing every unrelated job more heavily does not solve those problems.

## Food, fruit and ammunition stocks

| Building stock | Level 1 | Level 2 | Level 3 | What uses it |
| --- | --- | --- | --- | --- |
| Inn food | 10 | 30 | 50 | One food per ordinary meal |
| Inn, each fruit kind | 40 | 80 | 200 | Optional fruit served with meals |
| Swarm food | 20 | — | — | Five food per ordinary birth |
| Tower stone | 4 | 4 | 4 | Converted into ammunition |

The Inn's Food count is stored meals. Its yellow service display is not a food reserve. An ordinary hospital heals without a food or material stock; it cannot substitute for an inn. A completed basic market can store fruit, but Standard does not provide a general colony-wide warehouse or enabled historical inter-team exchange controls.

[[media:food-first-stock-detail]]

## Choose from the symptom

For missing deliveries, inspect [Resources and hauling](/learn/resources-and-hauling/). For empty inns or excessive births, use [Keep the colony fed](/learn/sustainable-food/) and [Population and swarm production](/learn/population-and-production/). For service placement and occupancy, return to [Buildings and services](/learn/buildings-and-services/).
