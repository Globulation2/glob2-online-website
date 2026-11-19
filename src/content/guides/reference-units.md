---
title: "Units and abilities"
description: "Worker, explorer and warrior roles, individual training, food and health, and the controls that assign useful work."
locale: "en"
tags: ["reference", "units", "training"]
order: 2
group: "reference"
format: "reference"
prerequisites: ["population-and-production"]
sources: [{"title":"Current public browser production, Hospitals and Schools examples, observed 18 November 2026","url":"https://app.glob2.online/play/"},{"title":"Released native 0.11.6.1 magic targets and unit damage","url":"https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/unit/UnitMedical.cpp"},{"title":"Released native 0.11.6.1 air-route constraints","url":"https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/map/pathfind/MapAStarDomain.h"},{"title":"Released native 0.11.6.1 terrain and forbidden-area checks","url":"https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/map/Map.h"},{"title":"Released native 0.11.6.1 source context: Standard unit types","url":"https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/content/data/units/registry.json"},{"title":"Released native 0.11.6.1 source context: unit activities and learning","url":"https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/unit/UnitActivity.cpp"},{"title":"Released native 0.11.6.1 source context: unit statistics and combat","url":"https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/unit/UnitStats.cpp"}]
---

The current illustrations are actual High-resolution public **browser 0.11.6.0** prepared lessons: production, Hospitals and Schools. The implementation details below are qualified as **released native 0.11.6.1 Standard source context**; the browser deployment’s exact source revision remains unverified. The pictured worker training and health changes do not demonstrate swimming, magic, combat training or every role’s service eligibility.

Globs act autonomously. Select one to read what it is doing, its health, food and abilities. Assign useful jobs through buildings, flags and areas rather than treating selection as a move command.

## The three roles

| Glob | Main jobs | Movement and limits | Assign through |
| --- | --- | --- | --- |
| Worker | Gather, haul, construct, repair and clear | Ground routes; swimming requires the relevant training | Building Working requests and clearing work |
| Explorer | Reveal terrain and scout useful routes | Flies across water and ordinary ground obstacles; ground forbidden areas do not create an aerial barrier | Exploration flag |
| Warrior | Attack and defend | Ground routes; movement and combat training change readiness | War flag or guard area when idle |

Flight does not mean every tile is passable. The released native 0.11.6.1 route checks reject terrain or resources that block air movement, as well as an occupied air cell. These air-route constraints are native source context; the pictured browser production exercise does not newly test every obstacle or flight rule.

Changing a swarm's production weights creates a future mix of these roles. It does not change an existing worker into a warrior or move an existing explorer. All three ordinary birth recipes cost five food.

[[media:population-explorer-result-v3]]

The current prepared-colony production exercise raises explorers from **1 to 3** while workers remain **11**. This shows a changed future role mix, rather than an existing worker changing type. Check the top-bar totals after resuming; production weights are not immediate creation orders.

## Read health, food and activity together

**HP** is current and maximum health. **Food** on a selected unit describes its own nutrition; it is different from an inn's stored Food count. A unit taking a meal or healing can interrupt the job you requested.

:::media-group

[[media:services-patient-before-detail-v3]]

[[media:services-patient-after-detail-v3]]

:::

In the current Hospitals lesson, the same selected worker changes from **HP 50/200, Food 81%** to **HP 200/200, Food 40%** while normal simulation runs and the lesson completes. Health has recovered while nutrition has declined. The prepared worker begins already injured and fed; these observations do not establish the cause of its injury or show an entire enter/heal/leave cycle.

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

:::media-group

[[media:training-worker-before-detail-v3]]

[[media:training-worker-after-detail-v3]]

:::

In the current Schools lesson, the same continuously selected worker changes from **Build (1): 8** to **Build (2): 12**. HP stays **200/200** and Food falls from **98% to 51%** across the interval. The completed School has Inside **1/4**. These are observed worker-training results; the visible Upgrade control is not evidence that a building upgrade has been performed.

The displayed Levels describe different abilities rather than one universal rank. A building level is another separate measurement. A higher building tier provides a service; globs still need to visit and complete training.

In the released native progression, workers' construction qualification determines which sites they may build. Basic school builder training qualifies workers for Level 2 sites; further builder training at the next school stage qualifies them for Level 3 sites. Before the colony has the required qualified builder, an upgrade action can be unavailable. After it unlocks, the qualified worker still needs time, access and freedom from other work.

## Combat abilities and experience

The following combat and fruit rules are released native source context, rather than newly captured browser combat trials. Warriors' attacks and explorers' magic are different systems. Explorers are not harmless merely because they fly to scout. Higher school training can give eligible explorers ground magic, but that magic is not a building-destruction attack.

Combat experience is distinct from service training and online ratings. Check the unit's actual statistics rather than assuming equal-looking sprites have equal combat strength. Health, food, training, position and the number of units arriving together all affect a fight.

:::warning

In the native rules, fruit served with meals records variety for that unit. It can influence food choice and conversion, but it is not a universal combat bonus: the fruit penalty can reduce effective armor for relevant unit types. Several copies of one fruit do not become several distinct kinds.

:::

## Diagnose the missing contribution

| Symptom | Inspect | Useful action |
| --- | --- | --- |
| Worker does not attach to a site | Food, health, route and required qualification | Restore services or release a qualified worker. |
| Explorer ignores a ground barrier | Flight and the intended flag | Use a reachable scouting destination; forbidden ground does not stop flight. |
| Warrior stays away from home | Existing war request, needs and routes | Reduce the obsolete flag before expecting idle guard behavior. |
| A unit has not gained an expected ability | Eligibility, occupied service places and other jobs | Make the service usable and allow a real visit. |
| Population grows but useful work stalls | Role mix, total labor requests and food | Slow births and restore the workers and services the next job needs. |

Read the selected rules and the individual glob before treating a service as available to every role. A training facility’s name and a building’s level do not guarantee that a particular unit can learn the desired ability.

For births and changing the role mix, use [Population and swarm production](/learn/population-and-production/). For assigning existing units, return to [Jobs, priorities, flags and areas](/learn/jobs-and-flags/). For individual services, use [Buildings and services](/learn/buildings-and-services/).
