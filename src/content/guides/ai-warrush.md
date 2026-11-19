---
title: "Facing Warrush: hold a supplied approach"
description: "Recognize military pressure, release competing demand and keep a compact defense connected to meals and healing."
locale: "en"
group: "ai"
format: "profile"
order: 5
prerequisites: ["choosing-an-ai", "sustainable-food", "training-and-upgrades", "defending-your-colony"]
tags: ["AI", "Warrush", "defense", "food"]
sources:
  - title: "Current browser opponent selector, observed 18 November 2026"
    url: "https://app.glob2.online/play/"
  - title: "Native 0.11.6.1 Warrush production and guard-area policy"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/ai/warrush/AIWarrush.cpp"
  - title: "Native 0.11.6.1 Warrush tuning"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/ai/warrush/AIWarrushTuning.h"
  - title: "Native 0.11.6.1 warrior guard attraction"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/unit/UnitMovement.cpp"
---

Warrush produces a military mixture and directs warriors toward discovered enemy buildings. Prepare a colony that can keep defenders fed through contact. Its name does not give you a safe number of minutes before attack, and one successful hold does not end the duel.

## Choose Standard and establish supply

Create two colonies through [choosing an AI](/learn/choosing-an-ai/). Select **You** and **AI → Warrush** on separate teams, and choose **Standard** with experiments off. The browser chooser labels Warrush **Easy (1401)**, an offline difficulty estimate separate from an online player's rating. Save the opening before changing the production mix.

[[media:choosing-ai-roster-v3]]

Find reachable wheat and wood. Build an inn with **B → I**, cancel placement and inspect the actual foundation materials and attached workers. Wait for completion and deliveries before committing to several training buildings. Follow [resources and hauling](/learn/resources-and-hauling/) for the current illustrated construction and initial supply workflow.

Read **Food**, **Inside** and **Working** together. A full store can coexist with no attached haulers at that moment; resume and check whether deliveries recover after meals. An inn's food and the swarm's production food are separate stocks.

## Prepare defenders and their services

Adjust swarm births toward a force you can supply while retaining the workers needed for meals and construction. Changing weights affects future role allocation; a pending birth can still finish, and existing workers do not turn into warriors. Watch the actual totals and production food.

Complete a reachable barracks and hospital when the economy can support them. Inspect individual abilities and actual occupants afterward. Training and healing take time, and warriors can leave an assignment for meals or services. A nearby defense tower also needs ammunition and a usable supply route.

## Inspect a native Warrush episode

The following images show an AI-versus-AI replay in released **native 0.11.6.1**, red Warrush against cyan Nicowar on a generated 128×128 River map. Both colonies are computer-controlled. The session uses SDL GPU and explicitly applied High resolution artwork; the pictured clock is **8:48**. The browser chooser above and the human exercise below are separate from this native demonstration.

[[media:warrush-town-hd-v2]]

Read the finished-service notices alongside the attack alert. Several services and a military population exist, but the same paused frame does not show whether every injury or meal is being handled. Inspect actual stock, occupants and unit condition before relying on that capacity.

Pause your human practice to inspect the services, then resume to observe a real visit or delivery. A finished building is preparation; use by the appropriate globs is a separate result.

## Read contact before changing the defense

An alert identifies something to inspect. Look at the actual location, enemy units, injuries, building health and the route to meals. Select a threatened unit or service before deciding whether to add defenders, restore supply or stop a competing project.

In native 0.11.6.1, Warrush can steer offense with guard paint over discovered enemy building footprints. It does not require a visible war flag to keep applying pressure. Actual paths, available warriors, combat and service trips still affect arrivals. A quiet interval is time to inspect the approach, not proof that another commitment cannot arrive.

:::media-group

[[media:warrush-guard-targets-hd-v2]]

[[media:warrush-guard-detail-hd-v2]]

:::

This is Warrush's watched-team area view over Nicowar's town at the same paused time. The blue Guard paint covers enemy building footprints; it is not a human-painted home defense. Look at the actual enemy units near those services before deciding where your own defense needs support.

The replay later reaches its 13:53 tick-cap end with both colonies alive and no winner recorded. Use the pictured commitment to practice diagnosis, rather than treating it as a strength ranking or a demonstrated victory.

## Release competing demand and guard a useful place

When a usable force already exists, reduce demand that prevents its support from working:

1. Inspect the swarm's food and birth weights. Stop unneeded future births while the current colony recovers, allowing for an already pending birth.
2. Inspect the swarm's **Working** request separately. Reducing that request releases labor; it does not itself prevent stored production food from being spent on births.
3. Release construction or other requests that compete with essential meals and healing. Check actual worker attachment after resuming.
4. Paint a compact **Guard area** with **A → G**, then cancel painting. Choose a defensible approach near services rather than painting a large region without checking where units gather.
5. Watch real contact and service visits. Guard attraction does not override every explicit war-flag assignment or promise an evenly spaced line.

Use [defending your colony](/learn/defending-your-colony/) for defensive planning. Preserve room and routes for meals and healing while checking whether the force actually remains usable.

## Inspect the result through continuing work

Compare the inn's replenishment, occupants and attached workers through meals. Select wounded defenders, observe hospital use, and recheck their condition before sending them away again. A tower's remaining HP is different from its stone and ammunition stock.

Do not infer an indefinite defense from a single stocked frame. Save a functioning checkpoint, then compare one change after another: fewer births, a better gathering position or a released construction request.

For a counterattack, scout current enemy services and defenders and follow [organizing an attack](/learn/organizing-an-attack/). Keep a route to meals and judge actual arrivals before renewing the request. The configured victory condition, rather than the disappearance of one attacker, determines when the match is won.

| Observation | Check next | Useful adjustment |
| --- | --- | --- |
| The inn empties during contact | Simultaneous births, construction and hauling | Release unneeded demand and verify replenishment |
| Warriors gather far from meals | Guard paint, explicit flags and reachable services | Keep a useful compact assignment near support |
| Injured defenders circulate | Healing places, access and nearby meals | Allow actual recovery before another operation |
| A tower stops supporting the approach | Ammunition, stone and delivery workers | Restore its usable supply route |
| Contact continues after one attacker disappears | New arrivals and surviving enemy services | Keep inspecting while preserving food and healing |

Return to [recovering your colony](/learn/recovering-your-colony/) if essential services fail. The useful practice result is a colony that can keep feeding, training, healing and defending through its next commitment.
