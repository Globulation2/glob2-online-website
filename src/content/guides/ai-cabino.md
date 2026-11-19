---
title: "Facing Cabino: protect the services behind your army"
description: "Update scouting, inspect a trained force and keep meals and healing usable across the whole threatened approach."
locale: "en"
group: "ai"
format: "profile"
order: 8
prerequisites: ["choosing-an-ai", "training-and-upgrades", "defending-your-colony", "fruit-and-conversion"]
tags: ["AI", "Cabino", "services", "defense", "scouting"]
sources:
  - title: "Current browser opponent selector, observed 18 November 2026"
    url: "https://app.glob2.online/play/"
  - title: "Native 0.11.6.1 Cabino production, targets and services"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/ai/simple/AICabino.cpp"
  - title: "Native 0.11.6.1 Cabino policy constants"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/ai/simple/AICabino.h"
  - title: "Native 0.11.6.1 harvesting visibility and material access"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/map/MapResources.cpp"
  - title: "Native 0.11.6.1 reachable meals and services"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/team/TeamRouting.cpp"
---

Cabino allocates units among production, feeding, training and military commitments. Its native 0.11.6.1 target priorities put healing and feeding services ahead of production, and it can maintain several attacks. Protect support buildings even when the swarm itself appears safe.

## Set up an ordinary practice duel

Create two colonies through [choosing an AI](/learn/choosing-an-ai/). Choose **You** and **AI → Cabino** on separate teams, then **Standard** with experiments off. The browser selector calls Cabino **Medium (1680)**, an offline estimate separate from an online player's rating. Save the opening before changing production or defense.

[[media:choosing-ai-roster-v3]]

Inspect the actual map, resources and route. Cabino's requested production mix changes with its controllers' demands and the units it already has; copying one opening ratio does not reproduce its whole policy.

The following native example is an AI-versus-AI replay in released **0.11.6.1**, red Cabino against cyan Maxima on a generated 128×128 River map. Both colonies are computer-controlled, with SDL GPU and explicit High resolution applied. It is separate from the current browser selector and your own human practice.

[[media:cabino-development-hd-v2]]

## Finish useful meals before adding an army

Locate reachable wheat, wood and clear ground. Build an inn with **B → I**, cancel placement, and follow actual construction materials, completion and food deliveries. Read **Food**, **Inside** and **Working** separately through meals.

Inspect swarm production food as well as inn meals. Keep the workers needed for both while adding training. A barracks or hospital needs construction labor and materials before it can serve anyone, and its completion does not establish a trained force.

Use [resources and hauling](/learn/resources-and-hauling/) and [training and upgrades](/learn/training-and-upgrades/) to make these checkpoints visible in your own practice. Select a real warrior and inspect abilities, food and health before relying on it.

At **2:13**, Cabino's selected own inn shows **Food 10/10**, **Inside 1/4** and **Working 0/1**. Its ordinary meals are stocked even though no hauler is attached at that moment. Resume your own game and observe whether replenishment keeps up through visits.

:::media-group

[[media:cabino-inn-hd-v2]]

[[media:cabino-inn-detail-hd-v2]]

:::

The hospital selected at the same time has **Inside 2/2** and **HP 260/260**. This is actual service occupancy; it is not a measurement of how much each visitor has recovered or of the army's training.

:::media-group

[[media:cabino-hospital-hd-v2]]

[[media:cabino-hospital-detail-hd-v2]]

:::

## Replace information deliberately

Use an exploration flag to inspect a useful approach or service cluster. Compare its request with **On the way** and **Here** after resuming. A flag left after its explorers are lost cannot provide current vision.

If a scout disappears, check its actual total and alerts. Produce a small replacement group without abandoning supply, then change the request or approach rather than repeating the same unsupported trip. Restore the production mix you can feed afterward.

Revisit the opponent before choosing a target. Remembered buildings can remain after vision is lost; they do not establish current defenders or service occupants. A flying explorer's path is not proof of a ground route.

Later, at **5:35**, Cabino's Population history displays **39**, after growth, a small dip and renewed growth. Compare that history sample with the current role totals and look for births, combat and ownership-change notices before assigning a cause.

[[media:cabino-history-hd-v2]]

In the native release, Cabino also places exploration requests around fruit sources. Hostile explorers can have threatening abilities; identify a unit and its actual training instead of treating every scout alert as the arrival of a ground army.

## Keep the support line working

When the intended force exists, reduce unnecessary future births and release competing hauling or construction demands. An already pending birth can still finish after weights change. The swarm's **Working** control is separate from the birth mix and stored production food.

Complete another reachable meal service when actual occupancy, stock or route length requires it. Preserve the old service during construction. A hospital provides healing; it cannot replace food, and globs may leave an assignment to use either service.

Paint a compact **Guard area** with **A → G** near the useful approach, then cancel painting. Follow real arrivals and service visits. Guard attraction is not squad selection and does not guarantee that every warrior stands on an exact painted tile.

The native example still shows Cabino's services at 5:35, but their existence and Population history do not demonstrate a lasting defense. The replay later reaches its 13:53 tick-cap end with both colonies alive and no winner recorded.

Watch more than the visible line of soldiers. Inspect exposed inns and healing, recent damage, actual food replenishment and the health of returning defenders. Save a functioning checkpoint before increasing the commitment.

## Expect allocation rather than one target

Under ordinary upgrades, native 0.11.6.1 Cabino's attack controller requires attack training and enough available qualified warriors. Existing flags reserve part of that force, and several target requests can coexist. An approaching group need not represent every hostile unit or target.

Its defense controller reacts to damage at its ground buildings by requesting nearby warriors. Inspect those that actually arrive before extending a raid. A target preference does not guarantee that an exposed hospital will draw the whole army away.

For a human counterattack, choose a reachable objective, check training and provide support for travel and return. Follow [organizing an attack](/learn/organizing-an-attack/) and reassess survivors before assigning them again.

## Inspect food and fruit together

Fruit near a service is not proof of its actual stock. Check current vision, a usable ground route and each named fruit store. Read [fruit and conversion](/learn/fruit-and-conversion/) before relying on a rival meal to change ownership.

If units disappear, distinguish death, an ordinary service trip and a conversion notification. Improve actual food and fruit access before simply replacing every missing glob. A guard area does not tell hungry globs to refuse an available rival meal.

| Observation | Check next | Useful decision |
| --- | --- | --- |
| A first scout disappears | Actual totals, alerts and remaining requests | Produce replacements and improve the information request |
| More services appear on a later visit | Fresh visibility, defenders and ground access | Reassess the target before committing |
| Many units exist but few are available | Existing jobs, training and service use | Release an obsolete request before demanding more units |
| Soldiers gather while meals empty | Food deliveries, births and competing work | Reduce demand and restore supply |
| Several support buildings face contact | Each service and the whole approach | Concentrate usable defense while preserving meals and healing |
| A raid draws defenders | Actual arrivals and your surviving qualified force | Continue, recover or change the target deliberately |

Repeat one decision from the saved opening. Compare real supply, training and arrivals before judging whether the changed choice improved the colony's next commitment.
