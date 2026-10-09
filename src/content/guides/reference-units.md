---
title: "Units and abilities"
description: "Worker, explorer and warrior roles, individual training, food and health, and the controls that assign useful work."
locale: "en"
tags: ["reference", "units", "training"]
order: 2
group: "reference"
prerequisites: ["population-and-production"]
reviewedAgainst: "4edaed552c3574914197d4978fbff4b81bd1eedb"
sources: [{"title":"Standard unit types","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/unit/types/Race.cpp"},{"title":"Unit activities and learning","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/unit/UnitActivity.cpp"},{"title":"Unit statistics and combat","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/unit/UnitStats.cpp"}]
---

Globs act autonomously. Select one to read what it is doing, its health, food and abilities. Assign useful jobs through buildings, flags and areas rather than treating selection as a move command.

## The three roles

| Glob | Main jobs | Movement and limits | Assign through |
| --- | --- | --- | --- |
| Worker | Gather, haul, construct, repair and clear | Ground routes; swimming requires the relevant training | Building Working requests and clearing work |
| Explorer | Reveal terrain and scout useful routes | Flies over obstacles and water; ground forbidden areas do not create an aerial barrier | Exploration flag |
| Warrior | Attack and defend | Ground routes; movement and combat training change readiness | War flag or guard area when idle |

Changing a swarm's production weights creates a future mix of these roles. It does not change an existing worker into a warrior or move an existing explorer. All three ordinary birth recipes cost five food.

[[media:population-explorer-result]]

## Read health, food and activity together

**HP** is current and maximum health. **Food** on a selected unit describes its own nutrition; it is different from an inn's stored Food count. A unit taking a meal or healing can interrupt the job you requested.

[[media:training-worker-after]]

A healthy-looking glob can still need food. A well-fed glob can still need healing after combat or clearing. An inn serves meals; a hospital heals. Preserve access to both when planning a march or a large construction project.

Globs inside services remain part of the colony. Inspect the building's Inside count instead of assuming an empty-looking patch contains no surviving units.

## Training belongs to the individual

| Training | Facility | Readiness check |
| --- | --- | --- |
| Building and harvesting | School | Inspect the worker's abilities and the qualification needed by the construction tier. |
| Walking | Racetrack | Check an eligible ground unit after a service visit. |
| Swimming | Swimming pool | Verify the intended glob can cross before committing work beyond water. |
| Attack speed and strength | Barracks | Inspect eligible warriors before relying on their combat ability. |
| Further eligible abilities | Higher school tiers | Check the particular unit type and service; not every glob can learn every ability. |

The displayed Levels describe different abilities rather than one universal rank. A building level is another separate measurement. A higher building tier provides a service; globs still need to visit and complete training.

Workers' construction qualification determines which sites they may build. Basic school builder training qualifies workers for Level 2 sites; further builder training at the next school stage qualifies them for Level 3 sites. Before the colony has the required qualified builder, an upgrade action can be unavailable. After it unlocks, the qualified worker still needs time, access and freedom from other work.

## Combat abilities and experience

Warriors' attacks and explorers' magic are different systems. Explorers are not harmless merely because they fly to scout. Higher school training can give eligible explorers ground magic, but that magic is not a building-destruction attack.

Combat experience is distinct from service training and online ratings. Check the unit's actual statistics rather than assuming equal-looking sprites have equal combat strength. Health, food, training, position and the number of units arriving together all affect a fight.

Fruit served with meals records variety for that unit. It can influence food choice and conversion, but it is not a universal combat bonus: the fruit penalty can reduce effective armor for relevant unit types. Several copies of one fruit do not become several distinct kinds.

## Diagnose the missing contribution

| Symptom | Inspect | Useful action |
| --- | --- | --- |
| Worker does not attach to a site | Food, health, route and required qualification | Restore services or release a qualified worker. |
| Explorer ignores a ground barrier | Flight and the intended flag | Use a reachable scouting destination; forbidden ground does not stop flight. |
| Warrior stays away from home | Existing war request, needs and routes | Reduce the obsolete flag before expecting idle guard behavior. |
| A unit has not gained an expected ability | Eligibility, occupied service places and other jobs | Make the service usable and allow a real visit. |
| Population grows but useful work stalls | Role mix, total labor requests and food | Slow births and restore the workers and services the next job needs. |

For births and changing the role mix, use [Population and swarm production](/learn/population-and-production/). For assigning existing units, return to [Jobs, priorities, flags and areas](/learn/jobs-and-flags/). For individual services, use [Buildings and services](/learn/buildings-and-services/).
