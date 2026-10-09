---
title: "Resources and hauling"
description: "Follow a worker's delivery route, read local building stocks, and fix the bottleneck before adding more jobs."
locale: "en"
tags: ["economy", "resources", "workers"]
order: 3
group: "manage"
prerequisites: ["getting-started"]
reviewedAgainst: "4edaed552c3574914197d4978fbff4b81bd1eedb"
sources: [{"title":"Resource definitions","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/data/resources/registry.json"},{"title":"Worker delivery and movement","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/unit/UnitDisplacement.cpp"},{"title":"Building resources and services","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/building/Misc.cpp"}]
---

A colony grows through deliveries. Workers collect resources from the map and bring them to the building that needs them. A large field somewhere on the map does not help an empty inn until a worker can harvest it and complete the trip.

Use a quiet practice game for this lesson. First establish a stocked inn and a working swarm, following [Your first colony](/learn/getting-started/). Keep the game paused while inspecting panels, and resume to watch workers move.

For your practice, open **Custom Game**, choose **two colonies**, and use **Players & Teams** to select **You** for one and **Numbi** for the other on separate teams. Keep **Standard** in **Game Rules**. Establish a supplied inn before the exercise, and save a healthy starting state. Use reachable food and clear ground on your map rather than copying the illustrations' exact coordinates.

## Follow one complete delivery

Select your inn and read its **Food** count. The first number is the stock currently inside that building; the second is its storage limit. The food at another inn or at a swarm is a different stock.

1. Set the inn's **Working** request to one if no one is assigned.
2. If Food is already full, resume and wait for a glob to eat before looking for the next delivery. Workers need not keep fetching food into a full stock.
3. Find the worker who visits the wheat and comes back toward the inn.
4. Watch the worker collect a load, return to the inn, and deliver it.
5. Read Food again. Repeat until you can recognize the route without selecting the worker each time.
6. Watch a glob eat. A delivery can coincide with a meal, so the net count need not rise every time.

[[media:hauling-delivery]]

The **Inside** count tracks globs using the inn's service, not stored food. Workers assigned to keep the inn supplied are also different from the globs taking meals. When you need to diagnose an empty inn, start with Food, then Working, then the route.

## Construction is a different delivery job

A new inn needs wood before it can serve food. Place one foundation on clear land near accessible trees and food, leaving room for globs to move around it. Right-click out of placement, select the foundation, and read the required resources.

[[media:hauling-construction]]

[[media:hauling-construction-detail]]

During construction, a wood count such as **1/3** means one of the three required wood deliveries has arrived. As workers bring more materials, construction advances. After completion, the inn's supply job changes to food and fruit. Keeping the same building selected makes this change easy to see.

Do not place several foundations just to give your workers something to do. Every active site asks for labor, and globs still need meals while those sites are unfinished. If your first inn is running low, reduce other requests before asking for another project.

## Travel is part of the cost

Compare a short route to a long route before repeating a building placement. A worker walking halfway across the colony is unavailable for another delivery during that trip. Obstacles, water, crowds and building footprints can make a nearby-looking patch slower to reach than an open route a little farther away.

[[media:hauling-route-comparison]]

[[media:hauling-delivery-clip]]

[[media:hauling-delivered]]

For a practical comparison, keep population and other work steady. Select each inn in turn and observe its Food count across several delivery trips. Ask which one runs short and which resources its workers actually use. A nearer building can help, but available land, future growth and safe access also matter; moving every service directly onto a resource patch is not an automatic solution.

## Read the request and the result separately

**Working 1/3** means one worker is attached to a request for three. Increasing the request tells the colony you want more workers there. It does not guarantee they are available, able to reach the building, or qualified for its job.

[[media:hauling-working-detail]]

[[media:hauling-near-detail]]

A worker may leave to eat or heal. A well-stocked building may have little hauling to do. Construction can require trained builders at higher levels. Read the selected panel's messages and stock before treating a shortfall as evidence that the controls have failed.

| Symptom | Inspect first | A useful correction |
| --- | --- | --- |
| Foundation waits with materials missing | Required material and the worker's route to its source | Free workers from other jobs and preserve an open approach. |
| Inn food is low despite a lush field | Working, actual delivery trips and service demand | Shorten the haul or release more labor for food. |
| Food is full but Working is low | Food, Inside and any additional resource requests | Check whether deliveries are needed before increasing the request. |
| A higher-level site has resources nearby but no builders | Its qualification messages and your workers' training | Complete the appropriate school training. |
| A worker circles or cannot get through | Buildings, terrain and forbidden areas along the route | Clear an unwanted obstacle or correct the area that blocks access. |

## Know what you are harvesting

The ordinary resource families have distinct jobs:

| Map resource | Delivered material | Main use |
| --- | --- | --- |
| Wheat | Food | Meals at inns and births at swarms |
| Trees | Wood | Construction and upgrades |
| Rocks | Stone | Selected construction and defensive supply |
| Papyrus | Paper | Buildings whose resource panel requires it |
| Algae | Algae | Buildings whose resource panel requires it, including schools |
| Cherry, orange and prune trees | Their corresponding fruit | Meal variety at inns |

Read the building's panel before choosing a site. Access to abundant wood does not solve a missing algae delivery. Workers may need training to reach a water-separated supply; inspect the actual route rather than assuming every shoreline resource requires swimming.

## Harvesting and clearing are different actions

**Harvesting** takes a material for delivery. **Clearing** removes a resource to make space. Do not expect a clearing job to stock your inn or pay for a foundation. Keep clearing small and deliberate, and protect useful wheat and trees you still need.

Trees and wheat can regrow and spread in standard play. Rocks behave differently: a worker can take stone without emptying the deposit like a patch of wood. Fruit trees persist rather than spreading across the map. These differences matter when planning future room and supply.

## Start with direct supply

For ordinary play, plan a usable route from the natural resource to the consuming building. A standard market is not a general warehouse that automatically joins every building's stock. Extended shared-storage logistics belong to optional experimental rules, so avoid building an opening around them unless you deliberately enabled and understand those rules.

Your checkpoint for this lesson is simple: you can point to a consumer, identify its resource source, follow a complete delivery, and explain the stock shown in its panel. Next, use that supply chain to [keep the colony fed](/learn/sustainable-food/).
