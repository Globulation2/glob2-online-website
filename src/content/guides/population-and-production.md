---
title: "Population and swarm production"
description: "Choose future unit roles, distinguish production from hauling, and verify growth with real counts and food stocks."
locale: "en"
tags: ["economy", "units", "production"]
order: 5
group: "manage"
prerequisites: ["sustainable-food"]
sources:
  - title: "Current public browser production exercise, observed 18 November 2026"
    url: "https://app.glob2.online/play/"
  - title: "Released native 0.11.6.1 source context: Swarm production recipes"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/content/data/buildings/swarm.json"
  - title: "Released native 0.11.6.1 source context: production choices and exits"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/building/TypeSteps.cpp"
  - title: "Released native 0.11.6.1 source context: building information and production controls"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/hud/draw/GameGUIDrawBuildingInfos.cpp"
---

The swarm creates new globs. Workers gather and build, explorers reveal the map, and warriors fight. Choose a future mix that answers the colony's next need while preserving food and labor for the globs already alive. Check a new warrior’s meals, health and training before relying on it in a military commitment.

For the pictured exercise, open **Tutorial → Food supply practice**. Its prepared colony provides an existing inn and swarm for inspecting production. This page uses that colony for a separate production experiment; follow [resources and hauling](/learn/resources-and-hauling/) for the lesson's construction task. Read an optional briefing, then pause before changing controls. Your counts can differ if the lesson runs while you read, so compare your own before and after readings.

## Separate the supply request from the birth controls

Select the swarm and read its local **Food** stock. The pictured storage capacity is **20**. Its **Working** row requests workers to supply that building. The labeled **Worker**, **Explorer** and **Warrior** controls beneath Food change future production.

:::media-group

[[media:population-panel-v3]]

[[media:population-panel-detail-v3]]

:::

The initial selected Swarm has **Food 20/20** and **Working 0/0**. Its stock belongs to production. Food stored in an inn belongs to that service, and existing globs still need meals there. Supplying one building does not automatically replenish the other.

A Working request allocates existing workers; it does not create them. A birth control chooses future unit production; it does not assign an existing worker to haul food. Changing either control also leaves the existing globs in their current roles.

Check the inn before increasing growth. If its stock is repeatedly falling, stabilize meals before adding more mouths. Keep an open approach around the swarm and preserve a usable exit for the type being produced.

## Produce workers deliberately

Use a healthy colony and save a checkpoint if you want to repeat the decision.

1. Pause and select the swarm.
2. Use the left ends of all three birth controls until each reaches its minimum. Include Worker so a previous setting does not carry into the experiment.
3. Increase **Worker** to a small positive weight. The recorded run used one increment after the reset; Explorer and Warrior remained at minimum.
4. Keep a modest **Working** request so food can reach the swarm. The recorded request was two.
5. Resume and observe actual exits, food and the role totals in the top bar.

:::media-group

[[media:population-worker-result-v3]]

[[media:population-worker-count-v3]]

:::

Across the recorded Worker-only phase, the worker total rose from **8 to 10**, while explorers remained **1**. The result frame shows **Food 7/20** and **Working 2/2**. The top-bar crop distinguishes **8 available / 10 total workers**: the total and availability answer different questions.

Watch deliveries as well as births. A net stock change includes activity occurring between observations, so use the next actual glob and the role total to check the production result. Do not treat the size of a bar as an immediate order to create that many units.

## Check what happens after a reset

The controls were then repeatedly reduced to their minimum again. In the following observation, workers had reached **11**, with explorers still **1**.

[[media:population-pending-birth-v3]]

This recording does not establish why the additional worker appeared. The practical lesson is to watch the actual totals after changing controls, rather than assuming the population has already stopped changing. A control change does not remove existing globs. Allow the colony to settle before comparing a later hold.

## Change the future role to Explorer

Keep meals supplied while changing production:

1. Pause and reduce the Worker and Warrior controls to their minimum.
2. Give **Explorer** a small positive weight.
3. Preserve the swarm's food supply and resume.
4. Watch a new explorer leave, then compare role totals with the preceding observation.

:::media-group

[[media:population-explorer-result-v3]]

[[media:population-explorer-count-v3]]

:::

During this recorded phase, explorers increased from **1 to 3**, while the worker total stayed **11**. The Swarm's result frame shows **Food 8/20** and **Working 2/2**. An explorer helps reveal routes and resources, but it does not replace the worker supplying an inn.

Move an obsolete exploration request when it has answered your question, and return to a production mix you can support. Select individual warriors and inspect training separately before relying on a military total; producing a role and training it are different work.

## Observe a food-available hold

To pause further growth, reduce all three birth controls to their minimum. Preserve enough food to distinguish the effect you are watching from an empty production store. If you also reduce the hauling request, remember that food already stored remains in the swarm.

[[media:population-zero-weights-v3]]

At the start of this later hold, the recorded totals were **11 workers and 3 explorers**, with **Food 8/20** and **Working 2/2**. After resuming and observing the colony again, the totals were unchanged while Food had risen to **15/20** and Working remained **2/2**.

:::media-group

[[media:population-stable-total-v3]]

[[media:population-stable-detail-v3]]

:::

This later comparison has both stored food and attached haulers. Keep checking your own totals and services after a change. Restore a positive production mix when meals, labor and space can support the next expansion.

## Use a mix without treating it as a queue

With several role controls above zero, their relative weights guide the future mix. More weight for workers favors that role; it is not an immediate batch order or a guaranteed alternating sequence. Observe production over time and adjust to actual needs.

Before increasing warrior production, check the workers supplying meals and projects. A force that consumes the colony's food without enough supporting labor can weaken the economy that keeps it useful. Release an unnecessary assignment when it prevents a unit from eating, healing or training.

Changing the existing swarm is usually the first control to inspect in a small colony. Another swarm needs construction resources, room, and continuing food and labor. Read its actual construction requirement and the selected rules before committing to extra capacity.

## Diagnose a stalled swarm

| What you see | Check next | Useful response |
| --- | --- | --- |
| Food is too low for production | Working, reachable wheat and competing deliveries | Release hauling labor and give real trips time |
| Food is available but no intended role appears | All three birth controls and the observed totals | Set the intended role above minimum, resume and inspect actual exits |
| A produced glob cannot leave | Movement-valid space and congestion around the footprint | Preserve a usable exit for that unit type |
| Growth stops despite supply | The selected match rules and any population limit | Inspect the limit before constructing another swarm |
| Totals grow while the colony weakens | Inn stock, service capacity and worker demand | Slow growth and restore the food and labor balance |
| A military total looks sufficient but arrivals are poor | Individual training, food, healing and competing requests | Release or qualify units before asking them to travel |

Save a supplied milestone once you have produced the intended roles and restored a useful mix. Return to [food supply](/learn/sustainable-food/) when meals are falling behind, or [resources and hauling](/learn/resources-and-hauling/) when a required delivery is the bottleneck. Repeat one production change at a time and explain it from actual stocks, exits and totals.
