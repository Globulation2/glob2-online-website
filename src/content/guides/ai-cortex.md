---
title: "Facing Cortex: keep supply and scouting current"
description: "Recognize Cortex's development and pressure, maintain reachable meals and healing, and inspect the approach before committing defenders."
locale: "en"
group: "ai"
format: "profile"
order: 6
prerequisites: ["choosing-an-ai", "sustainable-food", "training-and-upgrades", "defending-your-colony", "organizing-an-attack"]
tags: ["AI", "Cortex", "scouting", "supply"]
sources:
  - title: "Current browser opponent selector, observed 18 November 2026"
    url: "https://app.glob2.online/play/"
  - title: "Native 0.11.6.1 Cortex production and economy facts"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/ai/cortex/CortexPolicy.cpp"
  - title: "Native 0.11.6.1 Cortex combat and support choices"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/ai/cortex/CortexPolicyCombat.cpp"
  - title: "Native 0.11.6.1 Cortex economy and staffing"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/ai/cortex/CortexPolicyEconomy.cpp"
  - title: "Native 0.11.6.1 Cortex wave movement"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/ai/cortex/AICortexFlags.cpp"
---

Cortex develops feeding and training while changing its army commitments. A town that looked quiet on the first scout visit can send warriors while you are constructing your own services. Keep supply and information current together.

## Choose ordinary Cortex

Open **Custom game**, give **You** and **AI → Cortex** separate colonies and teams, and choose **Standard** with experiments off. The observed browser selector calls this opponent **Cortex - Medium (1601)**. That number estimates an offline AI duel cohort; it is separate from an online player's rating.

[[media:choosing-ai-roster-v3]]

Use the ordinary built-in selection for this exercise. Experimental learned policies are separate development options. Start a fresh ordinary duel and save the opening with **Escape → Save** so that the configuration and first decisions are repeatable.

:::note

The setup panel is from the current browser game. The gameplay excerpt below is a **native 0.11.6.1 AI-versus-AI replay**, cyan Cortex against red Econo on a generated 128×128 River map. Both colonies are computer-controlled, and the spectator is watching Econo's settlement. It shows Cortex's units reaching this opponent; it does not record the human defense exercise or establish a general AI strength ranking.

:::

## Establish supply before adding projects

Find reachable wheat, wood and open ground. Build an inn with **B → I**, right-click out of placement and inspect the foundation's actual materials and staffing. Wait for completion and deliveries before adding several training projects. The [resources and hauling lesson](/learn/resources-and-hauling/) demonstrates the current construction and supply controls.

Read **Food**, **Inside** and **Working** separately. Stored food, simultaneous service places and attached workers answer different questions. Resume long enough to observe deliveries after meals, rather than treating one stocked frame as a permanent surplus.

Build only services you can supply. For a stalled project, inspect the missing ingredient, route, eligibility and actual worker messages. Adding a larger request cannot create an inaccessible resource. Shore-accessible algae can be collected without swimming; inspect the approach instead of assuming that a pond's appearance establishes access. Swimming is trained on individual globs over time.

:::checkpoint

Before increasing growth or warrior demand, complete the first inn and watch wheat replenish its Food store through meals. Release a competing construction request if it repeatedly empties. Save a supplied checkpoint before extending the town.

:::

## Scout the opponent and the approach

Produce a small explorer force while keeping food supplied. Place an exploration flag with **F → E**, cancel placement and inspect the requested count, **On the way** and **Here** after resuming. Move or remove the request when it has answered the current question.

Look for additional swarms, completed training, inns and healing along the approach. Revisit the opponent before choosing a target. Remembered structures can remain after current vision is lost, and an explorer's flying route does not prove that ground warriors can follow it.

In the native replay at **11:09**, cyan Cortex warriors are among red Econo's services. Attack notifications and depleted red health bars make the contact visible. The excerpt continues that same encounter at normal replay speed.

[[media:econo-pressure-hd-v2]]

[[media:econo-cortex-pressure-motion-hd-v2]]

Follow where the units gather and where service access remains. The spectator's Econo panel describes Econo; it does not expose Cortex's exact food stocks. One encounter also cannot show every stage of Cortex's attack planning.

## Recognize conditional development

In native 0.11.6.1's built-in policy, Cortex adjusts worker production to staffing demand and adds warriors as its economy develops. Food, spare labor, usable resources and training eligibility affect development. Treat these as reasons to inspect current services and units, rather than a fixed build order you must copy.

Its attacks consider known targets, force readiness and support distance. Successive waves can gather before marching; a changed flag request does not mean every unit has already arrived. Forward food and healing can support a longer approach when the policy can establish them.

Do not assume that food trouble makes the opponent passive. An established starving Cortex colony can attempt an urgent attack. Serious danger at home can call a force back, while minor harassment during an existing offensive commitment may leave that commitment in place.

## Keep the home defense usable

Pause a local practice to inspect the following choices, then resume and observe their effects:

1. Select the swarm and adjust the **Worker**, **Explorer** and **Warrior** birth weights to demand you can feed. A zero weight changes future role allocation; an already pending birth can still finish. It does not transform or remove existing globs. A zero hauling request alone can still leave stored food available for births.
2. Keep inns, training and healing reachable. Inspect real stocks, occupants, HP and unit abilities. A completed barracks is not proof that every warrior has trained.
3. Paint a compact **Guard area** with **A → G** near the approach, meals and healing, then cancel painting. Check the actual defending units after resuming. Guard attraction does not override every other assignment or guarantee an evenly spaced line.
4. Watch contact, deliveries, food stores and service visits together. Wounded or hungry warriors can leave their assignment for services; a request count is not an arrival count.

Use [defending your colony](/learn/defending-your-colony/) for the full defense workflow. Reduce new growth or an unnecessary construction commitment if it competes with the meals keeping the existing force usable.

## Inspect again before a counterattack

A supplied hold gives you time to choose the next operation. Scout the current enemy approach, services and defenders. Select a real warrior to check food, health and training, then inspect the force's route to meals and healing.

Choose a limited, reachable target. Use [organizing an attack](/learn/organizing-an-attack/) to follow actual arrivals and reassess survivors rather than immediately renewing the same request. Save a functioning checkpoint so that changing one decision does not require rebuilding the opening.

| What you see | What to inspect | Next useful action |
| --- | --- | --- |
| A service remains unfinished | Missing material, reachable supply and worker messages | Release competing requests and establish a real delivery route |
| Stocked inns but defenders keep leaving | Individual food, injuries, occupants and trips | Keep useful services close and observe through meals and healing |
| Cyan units reach buildings beyond the first scout view | Current vision, ground approach and local defenders | Update the approach before choosing a target |
| Pressure seems to stop briefly | Current units, flags and service use | Save and inspect before treating the interval as safety |
| A commitment arrives piecemeal | Actual Here/On the way counts and medical trips | Gather or reduce the commitment before renewing it |

Different rules change this exercise. No hunger removes ordinary feeding pressure, no resource growth changes whether waiting can restore a food catchment, and peaceful play removes ordinary combat. Return to [keeping the colony fed](/learn/sustainable-food/) or [recovering your colony](/learn/recovering-your-colony/) if the supporting economy fails before the next operation.
