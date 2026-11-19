---
title: "Resources and hauling"
description: "Watch construction deliveries become a working food supply, read local stocks, and fix the missing requirement."
locale: "en"
tags: ["economy", "resources", "workers"]
order: 3
group: "manage"
prerequisites: ["getting-started"]
sources:
  - title: "Current public browser Food supply practice, observed 18 November 2026"
    url: "https://app.glob2.online/play/"
  - title: "Released native 0.11.6.1 source context: resource definitions"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/content/data/resources/registry.json"
  - title: "Released native 0.11.6.1 source context: worker movement and delivery"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/unit/UnitDisplacement.cpp"
  - title: "Released native 0.11.6.1 source context: building resources and services"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/building/Misc.cpp"
---

A resource helps the colony when it reaches the building that needs it. Workers collect material, travel and deliver it. A large wheat field somewhere on the map does not feed an empty inn until a usable supply route connects them.

For this exercise, open **Tutorial → Food supply practice**. It starts with a prepared colony, an existing inn and a swarm; your job is to build and supply another inn. Follow the visible task. If a briefing appears, read it and choose **Ok**. These illustrations show the prepared lesson, rather than a custom match against an AI.

Press **P** to inspect while paused and resume when you need workers to move. Use your own revealed wheat, trees and clear ground; the recorded counters and coordinates are examples, not values your game must reproduce.

## Inspect the consumer before adding a request

Select the existing inn. **Food** belongs to that inn, while the swarm and any other inn have separate stocks. **Inside** counts globs using its service. **Working** compares attached workers with the requested number. These readings answer different questions.

A full food stock may need little hauling at that instant. An empty one calls for a look at workers, wheat and access. Increasing every request at once can take labor away from meals without fixing the actual missing resource.

For a first supply check:

1. Select the inn and read Food, Inside and Working.
2. Find revealed wheat and the open approach to the inn.
3. Resume and look for workers traveling between that resource and the building.
4. Watch a delivery and the Food count; meals can consume food at the same time.
5. Pause again if the stock keeps falling and compare the jobs competing for workers.

Keep food available before giving the colony another construction job.

## Place one foundation and read its material request

Press **B**, then **I**, and place an inn on clear ground near useful resources. Leave room for globs to pass. Right-click out of placement and left-click the new foundation. Check the panel title so you are changing the site you intended.

:::media-group

[[media:hauling-foundation-v3]]

[[media:hauling-foundation-detail-v3]]

:::

The recorded foundation shows **HP 1/200**, **Working 0/3** and **Wood 0/3** while paused. It is a construction job, not an operating meal service. The request for three workers does not mean three have attached, and its missing wood cannot be replaced by food at another building.

Resume. Give workers time to reach the trees, collect materials and return. Keep the site selected so its changing resource panel remains visible.

## Watch construction become supply

:::media-group

[[media:hauling-construction-v3]]

[[media:hauling-construction-detail-v3]]

:::

A later frame shows **HP 135/200**, **Working 1/3** and **Wood 2/3**. Two of the three required wood units have arrived and construction has advanced. Read the actual labeled count instead of assuming every construction site uses the same material or amount.

[[media:hauling-construction-clip-v3]]

This continuous, normal-speed excerpt follows material deliveries through construction and the first food deliveries. Its sidebar changes from construction materials to the completed building's supplies. Compare the changing stock with the workers traveling between the resource and the building.

After completion, the inn needs food deliveries and room for its customers. Recheck the Working request: a building's work changes when its construction stage ends.

:::media-group

[[media:hauling-delivered-v3]]

[[media:hauling-delivered-detail-v3]]

:::

The paused completed inn has **HP 200/200**, **Food 6/10**, **Inside 0/4** and **Working 2/2**, and the lesson reports completion. Six food units are stored, nobody is inside at this moment, and two workers are attached against a request for two. A reserve is a useful checkpoint; a sustainable colony needs deliveries to continue after globs have eaten.

## Practice following one worker

Once the route is working, choose a visible worker collecting wheat. Watch it collect a load, return and deliver. Select it when you need to distinguish carrying a material from traveling empty. Keep both the resource and consumer in view if possible.

If the inn is already full, wait for a meal before expecting another delivery. A delivery and a meal can coincide, so the net stock does not have to rise after every worker visit. Compare several trips rather than interpreting one unchanged number as failure.

Your goal is to identify the resource, consumer and actual journey without relying on a particular worker position.

## Include travel in the cost

A worker on a long trip is unavailable for another delivery during that time. Water, crowds, buildings, forbidden marks and available approaches can matter as much as straight-line distance. A nearby-looking resource may have a poor route; a slightly farther resource can have an open approach.

Try one placement change at a time in a saved, healthy colony. Keep population and other work as steady as you can. Observe repeated deliveries and meals before deciding whether the new inn improved supply. Compare the result in your own practice rather than copying a pictured distance.

Leave the original inn operating while the new one is a foundation. Building directly over valuable food or a crowded approach can trade one problem for another. A second inn helps when workers can complete it and maintain both services.

## Distinguish missing labor from missing requirements

**Working 1/3** means one attached worker against a request for three. Raising the request asks for more labor; it does not guarantee an eligible, fed worker with a usable route.

| What you see | Inspect first | Useful correction |
| --- | --- | --- |
| A foundation waits with materials missing | Its labeled material and the source's route | Preserve access and release workers from optional jobs |
| Food falls beside a large wheat field | Working, actual trips, meals and competing demand | Free hauling labor before adding more mouths |
| Food is full but Working is low | Inside and any other supply requests | Check whether a delivery is actually needed |
| An advanced site has no builders | Its qualification message and worker training | Train and release eligible builders |
| Workers stop or circle | Terrain, footprints and painted areas | Remove the obstruction and inspect the route again |
| A worker repeatedly leaves the job | Its Food, HP and current activity | Restore meals or healing rather than only raising the request |

## Read the resource family

The consuming building's panel is your immediate guide. Ordinary resources have distinct uses:

| Map resource | Delivered material | Typical use |
| --- | --- | --- |
| Wheat | Food | Inn meals and swarm births |
| Trees | Wood | Construction and upgrades |
| Rocks | Stone | Particular buildings and defensive supply |
| Papyrus | Paper | Inspect an enabled recipe before assigning it a use; do not assume an ordinary building needs Paper |
| Algae | Algae | Building recipes including schools |
| Cherry, orange and prune trees | Their named fruit | Meal variety at inns |

Abundant wood does not replace missing algae. Inspect access to the actual resource instead of assuming every shoreline source requires swimming or every flying scout's route is usable by ground workers. Read [training and upgrades](/learn/training-and-upgrades/) when qualification or water access is the bottleneck.

Use the [resource reference](/learn/reference-resources/) to check renewal, persistence and the differences between resource families. Preserve growing space for food and materials you still need.

Harvesting material for a consumer and clearing resources to make space are different jobs. A Clearing flag is not a shortcut for stocking an inn. Preserve useful wheat and trees while clearing a deliberately small patch.

For ordinary play, plan direct supply from the natural resource to its consumer. Do not assume a market is a general warehouse that combines every building's stock; experimental logistics have their own rules. Your checkpoint is a completed, supplied inn and an explanation of the materials, workers and route that made it work. Continue with [food supply](/learn/sustainable-food/) to keep that route useful as the colony grows.
