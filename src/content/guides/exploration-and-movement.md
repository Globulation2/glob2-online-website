---
title: "Exploration, terrain, water, and movement"
description: "Give scouts a useful destination, distinguish arrival from a request, and check ground access before committing a colony."
locale: "en"
group: "map"
order: 1
prerequisites: ["getting-started", "jobs-and-flags"]
tags: ["exploration", "terrain", "movement"]
sources:
  - title: "Current public browser Guard zones and flag tactics lesson, observed 18 November 2026"
    url: "https://app.glob2.online/play/"
  - title: "Released native 0.11.6.1 source context: unit movement and visibility"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/unit/UnitMovement.cpp"
  - title: "Released native 0.11.6.1 source context: movement abilities"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/content/data/units/registry.json"
  - title: "Released native 0.11.6.1 source context: ground and air terrain constraints"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/map/pathfind/MapAStarDomain.h"
  - title: "Released native 0.11.6.1 source context: fruit visibility and access"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/map/MapResources.cpp"
---

Explore to answer a question: where is the next supply, which route reaches it, and what could interrupt that route? A scout's arrival provides information. It does not build a road, establish a ground hauling route or supply the colony left behind.

For the illustrated exercise, open **Tutorial → Guard zones and flag tactics**. Scroll the lesson catalogue if needed. It begins with a prepared colony and units; you are not expected to reproduce those starting conditions in a custom match. Follow the visible first task to scout the enemy base. Acknowledge a briefing if it appears.

## Direct the explorer toward a useful destination

1. Pause with **P** in local practice and choose **Show destination** in the lesson prompt. This centers the intended location; it does not order a unit there.
2. Press **F**, then **E** to choose an Exploration flag. Place it at the marked destination.
3. Right-click to leave placement, then select the flag.
4. Read its request and range. In this capture the default request is two and range ten; reduce them to **one explorer** and **range four**.
5. Resume and watch actual travel and revealed terrain. Do not treat the requested count as an arrival.

[[media:scout-reveal-clip-v3]]

The continuous excerpt shows the explorer revealing the enemy Swarm and the first task advancing to **Prepare a guard zone**. The explorer is available in this prepared lesson; [population and production](/learn/population-and-production/) covers producing explorers in a different prepared practice colony.

:::media-group

[[media:jobs-exploration-v3]]

[[media:jobs-exploration-detail-v3]]

:::

At the later paused inspection, the selected flag shows **Working 1/1**, **Here 1** and **On the way 0**, with **Range 4**. Compare all three readings. A future flag can request one explorer while nobody is attached, or have an attached explorer still traveling.

## Spend exploration on decisions

Use the new information before adding another commitment:

- Find food and construction materials, then inspect how workers could reach them.
- Look for an approach that connects an opponent to your inn or production.
- Check the space around a proposed building and its service routes.
- Revisit a military objective before committing a force to it.

A flag gives autonomous units a task around a destination. Food, healing and competing work still matter. If a scout does not remain where expected, inspect its needs, actual total and the flag's readings before increasing the request. A scout-under-attack notice is a reason to inspect the location, not proof that a ground army has already reached home.

Move or remove an obsolete request through the actual flag controls available in your game. If you create another destination, check that the previous request is not retaining the explorer you wanted to send. Do not assume placing several flags creates more scouts.

## Separate discovered terrain from current vision

Black undiscovered terrain hides the layout. A revealed region can still contain remembered information after your units leave. A familiar enemy building silhouette does not establish its current occupants, food, health or defenders.

The native 0.11.6.1 fruit rules also require current team visibility for harvesting. Remembering an orchard is not enough. When a fruit store stays empty, check current vision, remaining fruit, a ground route and attached workers. An explorer contributes vision; workers must still make the delivery.

Use the minimap to inspect another region and **Home** to recenter in the current default controls. Those change the camera, not a scout's assignment. A **Reveal terrain** match option concerns discovery; inspect the actual rules rather than assuming every enemy unit remains visible everywhere.

## Check the route for the unit that will use it

Explorers fly, while workers and warriors have ground movement and ability constraints. The native movement model includes separate ground and air restrictions; flying is not a promise to ignore every map-specific barrier. Inspect the actual terrain and scenario rules.

Water is a useful example: an explorer reaching another bank does not establish that your present workers or warriors can cross. A swimming pool provides training, but a finished building does not instantly give every glob swimming ability. Select the intended unit, inspect its abilities and allow access and time for training before planning around a crossing. This scouting sequence does not demonstrate a swimming lesson.

A usable route must continue to food and other services, not merely end at the target. Buildings, walls, resource deposits and painted ground restrictions can change access. Keep room around busy service entries, and inspect the trip after altering the terrain.

## Diagnose unexpected movement

| Observation | Inspect next | Small correction |
| --- | --- | --- |
| Requested scout never arrives | Actual explorer total, eligibility and competing flags | Release an obsolete request or choose an eligible unit. |
| Scout returns toward home | Food, HP and service access | Let it meet its needs before asking for a longer assignment. |
| A flyer reaches a site but workers do not | Ground route, terrain and movement ability | Choose reachable construction ground or prepare the needed ability. |
| Fruit remains at zero | Current source visibility and hauling access | Restore both vision and a usable delivery route. |
| A previously safe approach changes | Fresh vision and alerts | Scout again before repeating the old commitment. |

In the native controls, target lines help identify destinations rather than drawing the navigable route. Likewise, a wrapping map seam can make an approach shorter than it appears in a flat view. Use the actual map settings, minimap and camera to inspect both sides; the camera edge is not a defensive wall. Check your current controls before relying on a renderer-specific alternate view.

Once the route answers your question, use the information to [defend the colony](/learn/defending-your-colony/) or [organize an attack](/learn/organizing-an-attack/). Keep some attention on home while studying the newly revealed area.
