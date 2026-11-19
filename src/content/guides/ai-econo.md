---
title: "Facing Econo: keep food and fruit working"
description: "Keep a supplied home, scout Econo's development, and judge fruit access before committing workers or an army."
locale: "en"
group: "ai"
format: "profile"
order: 4
prerequisites: ["choosing-an-ai", "sustainable-food", "resources-and-hauling", "fruit-and-conversion"]
tags: ["AI", "Econo", "food", "scouting"]
sources:
  - title: "Current browser opponent panel, observed 18 November 2026"
    url: "https://app.glob2.online/play/"
  - title: "Native 0.11.6.1 Econo production and policy"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/ai/shared_runtime/Econo.cpp"
  - title: "Native 0.11.6.1 Econo services and expansion"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/ai/shared_runtime/EconoBuilding.cpp"
  - title: "Native 0.11.6.1 production weights"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/ai/AISharedRuntimeTuning.h"
  - title: "Native 0.11.6.1 harvest visibility checks"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/map/MapResources.cpp"
  - title: "Native 0.11.6.1 fruit resource properties"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/content/data/resources/registry.json"
  - title: "Native 0.11.6.1 reachable meals and conversion choices"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/team/TeamRouting.cpp"
---

Econo develops food, production and training while competing for useful services and fruit. Use it to practice a supplied home and deliberate reconnaissance. A colony without a warrior production plan can still have hostile explorers, defenses and opportunities to convert globs.

In native 0.11.6.1, Econo produces workers and explorers without regular warrior production. Continue to watch its actual units: conversion can change a colony’s composition, and hostile activity is still possible. The current browser selector calls this opponent **Econo - Easy (1310)**.

## Choose an ordinary practice duel

Open **Custom game**, choose two colonies, and select **You** for one and **AI → Econo** for the other on separate teams. Open **AI strategy**, check the opponent and choose **Use Econo**. Select **Standard** in Game Rules and leave experiments off. Use [choosing an AI](/learn/choosing-an-ai/) if you need the complete setup tour.

[[media:econo-profile-v3]]

The difficulty number estimates an offline AI duel cohort. It is separate from an online player's rating and is not a guarantee about your map or opening. Start and save a useful opening through **Escape → Save**. Pause local practice while inspecting a panel, then resume to test whether the work actually happens.

:::note

The opponent panel above is from the current browser game. The gameplay demonstration below is a **native 0.11.6.1 AI-versus-AI replay**: red Econo against cyan Cortex on a generated 128×128 River map. Both colonies are computer-controlled. It illustrates development and rival pressure; it is not a recording of the human exercise or a comparison establishing which AI is stronger.

:::

## Establish meals before borrowing labor

Find reachable wheat, wood and open ground. Build one inn with **B → I**, right-click out of placement and select its foundation. Check the actual construction materials and attached workers. Wait for completion and deliveries before adding several projects.

The [resources and hauling lesson](/learn/resources-and-hauling/) shows current construction and supply in motion. Use its distinction between a foundation's material store and a completed inn's Food store. Your practice colony's counters need not match the prepared tutorial colony.

Watch **Food**, **Inside** and **Working** over time. Meals are consumed; deliveries replenish the store. A stocked frame is one checkpoint. A growing population also adds demand, including the food used by swarms producing new globs.

:::checkpoint

Before exploring farther, verify that the inn is complete, wheat reaches its Food store, and workers continue delivering after globs have eaten. If the store repeatedly empties, release another construction or growth request and check the route before expanding.

:::

## Scout the growing town

Produce a small number of explorers while keeping meals supplied. Check the actual explorer count before reducing that production weight; changing a weight does not transform existing workers into explorers. Restore the production mix you can support.

Place an exploration flag with **F → E**, cancel placement, and inspect its request. Compare **On the way** with **Here** after resuming. When the question has been answered, move or remove the obsolete request so it does not hold your scouts unnecessarily.

In the native demonstration at **3:16**, Econo already has a second swarm and several services around the original settlement. The scene is evidence of this particular town's development, not a timer you can safely wait out in a human duel.

[[media:econo-town-hd-v2]]

Revisit the opponent. Look for additional production, training, completed upgrades and routes connecting its services. A quiet first scout visit does not establish that the colony will remain small.

## Inspect fruit before founding a service

Reveal which fruit types are available and whether Econo already serves that region. A flying explorer's route does not establish that ground workers can reach the same place. Check the approach, construction materials and how builders will obtain meals during the journey.

For your own inn, compare fruit seen on the map with fruit actually stored at the service. Workers need current vision and a reachable supply route; a remembered orchard outside current vision is insufficient. Inspect each named fruit stock rather than assuming that one stocked type means all three are supplied.

An accessible hostile inn offering a more appealing meal can attract and convert a hungry glob. Improve your own reachable food and fruit supply before planning around conversion. Seeing fruit near an enemy building does not reveal that building's exact stock or prove that every passing glob will convert. Read [fruit and conversion](/learn/fruit-and-conversion/) for the service and combat tradeoffs.

## Keep development and safety together

Later in the same native replay, cyan units are present among Econo's services and red workers have depleted health bars. The attack notifications identify pressure on the settlement. Earlier growth did not make those services safe.

[[media:econo-pressure-hd-v2]]

Watch the same pressure in motion at normal replay speed. Follow the units through the services, then pause your own practice to inspect health and food before choosing a response.

[[media:econo-cortex-pressure-motion-hd-v2]]

The Population history at **11:09** has passed a peak above 100 and shows a sampled value of **115**. Compare the history sample with the current role counts in the top bar, then inspect the units and services behind any change. The replay has a configured **13:53** duration. When a recording reaches that limit, “Replay Ended” does not by itself mean the match has a winner.

[[media:econo-history-hd-v2]]

In your practice, pair history with current observations. Are globs wounded, hungry, converted or lost to contact? Is the approach defended? Inspect the relevant globs and services before deciding why a total changed. A graph alone cannot identify every cause.

## Choose the next commitment

Save the supplied colony before attempting a new operation. Choose one: another reachable stocked inn, a verified training upgrade, or a supplied attack against an inspected target. For an attack, follow [organizing an attack](/learn/organizing-an-attack/) and preserve a route back to meals and healing.

| Observation | Check next | Useful adjustment |
| --- | --- | --- |
| The inn empties while scouts are being produced | Repeated deliveries and simultaneous swarm demand | Reduce growth or release a competing request while meals recover |
| Fruit is visible but its stock remains zero | Current vision, ground access and actual hauling | Supply a reachable service before relying on conversion |
| Econo adds services beyond the first scout view | New production, training and defended approaches | Scout again before committing to the original plan |
| Explorers remain at an obsolete flag | The request and Here count | Move or remove the request after it answers its question |
| Population falls while rival units enter the town | Individual health/food, services and recent contact | Stabilize supply and defense before adding more demands |
| One building falls but play continues | Surviving colonies and the selected victory rules | Follow the actual match objective rather than counting one destroyed inn |

Repeat the decision with a saved opening: improve one supply, information or defense choice and inspect the resulting deliveries and arrivals. The goal is a colony that can sustain its next commitment, rather than copying the native demonstration's building count or timeline.
