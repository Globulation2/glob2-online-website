---
title: "Facing Nicowar: train before filling the defense flag"
description: "Keep meals supplied while preparing trained defenders, and distinguish a requested force from actual qualified arrivals."
locale: "en"
tags: ["AI", "Nicowar", "defense", "scouting"]
order: 7
group: "ai"
format: "profile"
prerequisites: ["choosing-an-ai", "sustainable-food", "jobs-and-flags", "training-and-upgrades", "defending-your-colony"]
sources:
  - title: "Current browser opponent selector, observed 18 November 2026"
    url: "https://app.glob2.online/play/"
  - title: "Native 0.11.6.1 Nicowar phases and readiness"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/ai/nicowar/Phases.cpp"
  - title: "Native 0.11.6.1 shipped Nicowar strategy"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/content/data/nicowar.txt"
  - title: "Native 0.11.6.1 Nicowar attack flags"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/ai/nicowar/Attack.cpp"
  - title: "Native 0.11.6.1 ordinary attack flag minimum"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/ai/nicowar/AINicowarTuning.h"
  - title: "Native 0.11.6.1 flag qualification"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/building/Misc.cpp"
  - title: "Native 0.11.6.1 displayed level conversion"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/ai/shared_runtime/ManagementFlag.cpp"
---

Nicowar can grow, train and prepare attacks together. Practice assembling a qualified home force while keeping meals available. A stocked inn and a completed barracks are useful preparations; inspect the actual warriors and service use before relying on them.

## Choose the opponent and save the opening

Create two colonies through [choosing an AI](/learn/choosing-an-ai/). Select **You** and **AI → Nicowar** on separate teams, and choose **Standard** with experiments off. The current browser chooser labels Nicowar **Medium (1653)**. That offline estimate is separate from an online player's rating.

[[media:choosing-ai-roster-v3]]

Save the opening before changing births, training or flags. Inspect the actual landscape and resources rather than copying a building position from another map.

The native 0.11.6.1 package ships Nicowar's aggressive **warrush** strategy profile. Choose **Nicowar** in the selector: the separate **Warrush** opponent uses another implementation. Development and actual arrivals still depend on the current map, supply and rules.

The pictured example is an AI-versus-AI replay in released **native 0.11.6.1**, red Warrush against cyan Nicowar on a generated 128×128 River map. Both colonies are computer-controlled; SDL GPU and explicit High resolution are applied. The browser chooser and the human practice below are separate from this native example.

## Supply births and meals separately

Build a reachable inn and follow its completion and deliveries. Read **Food**, **Inside** and **Working** separately. A stocked inn does not supply the swarm's production stock; inspect both before increasing births or borrowing workers for several training projects.

Keep worker production and hauling adequate while adding a small warrior force. Changing birth weights affects future role allocation, with an already pending birth able to finish; it does not transform current globs or give newborn warriors completed training.

Build a reachable barracks and wait for actual completion. Then check **Inside** and select individual warriors to inspect their abilities. An empty barracks can coexist with raw warriors held on another assignment.

## Give raw warriors a chance to train

Use this human practice after you have meals, a completed barracks and some warriors:

1. Place a home war flag with **F → W**, then cancel placement and select it.
2. Inspect **Minimum required level**, the requested count and actual **Here / On the way** readings. An assignment can hold raw warriors away from training.
3. Set the minimum to displayed **level 2**, and reduce the request to a small force you can supply, such as two.
4. Resume. Released raw warriors can seek eligible training while the flag waits for qualified units.
5. Inspect actual barracks occupants and individual combat abilities. Return to the flag and compare arrivals with the request.
6. Recheck meals, health and routes while those defenders gather. A filled flag is not evidence that every service will remain supplied.

In native 0.11.6.1, displayed minimum 2 requires the first training level in both attack speed and attack strength. It changes eligibility rather than upgrading a unit. If the flag remains empty, check both abilities, training places, route and other commitments before lowering the requirement to fill it.

## Compare actual home and offensive requests

At **8:48** in the native replay, Nicowar's home flag uses minimum **1**, with **Working 0/2**, **Here 0** and **On the way 0**. It can accept raw warriors; those zero arrival readings do not identify why the request is unfilled.

:::media-group

[[media:nicowar-home-flag-hd-v2]]

[[media:nicowar-home-flag-detail-hd-v2]]

:::

Another Nicowar flag, inside red Warrush's town at the same paused time, uses minimum **2** and **Working 0/5**. Here and On the way are again zero. Compare its eligibility with the available force before interpreting five requested as five attackers on site.

:::media-group

[[media:nicowar-offensive-flag-hd-v2]]

[[media:nicowar-offensive-flag-detail-hd-v2]]

:::

The native release's ordinary Nicowar offensive flags also use minimum 2. Its phase-readiness counting and its final flag qualification are different checks; an aggressive phase does not instantly give every warrior the required training. With unit upgrades disabled, its attack minimum changes to accept raw units.

## Scout without abandoning the colony

Produce a small scout force while keeping food work supplied. Use an exploration flag to answer a specific question about the approach, enemy services or defenders. Compare requests with actual arrivals and redirect or remove an obsolete request.

A scout-under-attack message can involve hostile explorers. Inspect the location before assuming that a ground army has reached home. Keep watching home alerts while looking at an interesting enemy town.

Refresh current vision before planning around enemy buildings. A remembered layout after a scout leaves is previous information; a flying scout's route does not prove that your ground force can follow it.

## Read pressure and recover deliberately

When contact begins, inspect the actual threatened units and services. Reduce an unnecessary construction or production commitment if it prevents meals and healing from working. Keep defenders close enough to use their support and observe whether they return in usable condition.

The native replay shows red and cyan units near Nicowar's home services, while its offensive request is elsewhere. Inspect both locations in your own practice; a flag panel alone does not show every commitment. The recording later reaches its 13:53 tick cap with both colonies alive and no winner recorded.

A local hold is time to repair the economy, recover units and scout again. It is not a match result. A force returning from a failed commitment needs actual food, healing and another readiness check before receiving the same request again.

| Observation | Check next | Useful adjustment |
| --- | --- | --- |
| Raw warriors wait at a flag while training is empty | Minimum level and competing assignments | Release raw units and observe eligible service use |
| A higher-minimum flag has no arrivals | Both combat abilities, places, routes and jobs | Give training time rather than immediately undoing eligibility |
| Inn stocked but births lag | Swarm food and production staffing | Restore the correct local supply |
| Scout reveals development while home alerts fire | Home HP, actual attackers and defender availability | Stabilize the colony before extending the scout operation |
| A force has arrived but services empty | Food, healing and simultaneous demands | Reduce the commitment until support works |

Load the saved opening and change one decision: supply births earlier, release a training-blocking request, or inspect the approach sooner. Compare deliveries, trained units and qualified arrivals before choosing the next operation.
