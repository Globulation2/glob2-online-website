---
title: "Facing Maxima: watch the economy behind the army"
description: "Keep meals and information current, recognize ownership changes and reassess the support behind each military commitment."
locale: "en"
group: "ai"
format: "profile"
order: 9
prerequisites: ["choosing-an-ai", "economy-and-expansion", "fruit-and-conversion", "training-and-upgrades", "defending-your-colony", "organizing-an-attack"]
tags: ["AI", "Maxima", "scouting", "defense", "fruit"]
sources:
  - title: "Current browser opponent selector, observed 18 November 2026"
    url: "https://app.glob2.online/play/"
  - title: "Native 0.11.6.1 Maxima economy and fruit support"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/ai/maxima/AIMaxima.cpp"
  - title: "Native 0.11.6.1 Maxima combat and waves"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/ai/maxima/AIMaximaCombat.cpp"
  - title: "Native 0.11.6.1 supply-funded production"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/ai/maxima/AIMaximaSwarmController.h"
  - title: "Native 0.11.6.1 match-format strategy resolution"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/ai/maxima/AIMaximaStrategy.cpp"
  - title: "Native 0.11.6.1 harvesting visibility and material access"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/map/MapResources.cpp"
  - title: "Native 0.11.6.1 reachable own and rival meal choice"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/team/TeamRouting.cpp"
  - title: "Native 0.11.6.1 ownership change before the meal"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/unit/UnitActivity.cpp"
  - title: "Native 0.11.6.1 available meal variety"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/building/Misc.cpp"
---

Maxima connects population growth, food access, service development and military commitments. A force leaving its colony does not tell you how much production remains behind it. Inspect the economy and approach again before making the next commitment.

## Choose a practice match you can inspect

Create two colonies through [choosing an AI](/learn/choosing-an-ai/), with **You** and **AI → Maxima** on separate teams. Choose **Standard** with experiments off. The current browser selector labels Maxima **Hard (1873)**, an offline difficulty estimate separate from an online player's rating.

[[media:choosing-ai-roster-v3]]

Save the opening before changing births, services or defense. Read the actual landscape and starting buildings instead of copying positions or an army size from another match. Pause local practice to inspect a panel, then resume to watch deliveries and arrivals.

The exact native 0.11.6.1 policy resolves different configurations for a duel, free-for-all or team format. Imported saves retain their resolved configuration. Changing the number of opponents therefore needs fresh observations; it does not simply add more copies of the same duel.

## Finish the meals that support growth

Find reachable wheat, wood and clear ground. Place an inn with **B → I**, cancel placement, and inspect its actual construction materials and attached workers. A foundation does not yet provide meal capacity. Use [resources and hauling](/learn/resources-and-hauling/) for the current construction and initial-supply demonstration.

If births compete with the unfinished service, reduce future production to a level the colony can supply. Birth weights and the swarm's **Working** request do different jobs. Lowering the hauling request releases labor but leaves stored production food available; an already pending birth can still finish after weights reach zero. Inspect actual totals and food after resuming.

When the inn completes, compare **Food**, **Inside** and **Working** through real visits. A full store is a buffer; it does not show whether hauling will keep up. Inspect swarm production food separately, then restore a birth mix that leaves enough workers for meals and construction.

Add reachable training and healing only when their construction and use can be supplied. Select actual warriors to inspect health, food and both combat abilities before relying on a visible headcount. A hospital cannot replace an inn.

## Inspect a native Maxima episode

The images below show an AI-versus-AI replay in released **native 0.11.6.1**, red Cabino against cyan Maxima on a generated 128×128 River map. Both colonies are computer-controlled. SDL GPU and explicit High resolution artwork are applied. This native example is separate from the browser selector and your own human practice.

[[media:maxima-development-hd-v2]]

At **2:13**, Maxima has a developing service settlement. Its exact native production policy considers reachable fertile food, workforce and hunger pressure, and funds further development around those constraints. Several services using one patch do not multiply that patch's food supply.

Scout the support behind an army as well as the army itself. A quiet town may still be preparing further growth. Use an exploration flag to answer a specific question about routes, meals or defenders, and compare its request with actual arrivals.

Replace lost information deliberately. Remembered buildings are previous information, and an explorer's flying route does not prove a ground route for warriors or haulers. Check home alerts while looking at an interesting enemy town.

## Distinguish an ownership change from a combat loss

At **5:35**, while watching Maxima, the native replay reports **A unit from cabino's team has joined your team ×7**. This is an ownership-change notification. It does not identify which individual took which route or meal.

:::media-group

[[media:maxima-joins-hd-v2]]

[[media:maxima-joins-detail-hd-v2]]

:::

Separately, Maxima's own inn at the same paused time shows **Food 5/10**, **Oranges 5/40**, **Inside 4/4** and **Working 1/1**, with Cherries and Prunes at zero. Those are the selected service's actual stores and occupants; they do not by themselves establish the cause of the earlier join notifications.

:::media-group

[[media:maxima-inn-fruit-hd-v2]]

[[media:maxima-inn-fruit-detail-hd-v2]]

:::

In the exact native release, Maxima can maintain fruit-source visibility and advertise qualifying feeding services. A convertible hungry glob can choose a reachable, advertised non-allied service with a better available fruit offer. Ownership changes when that rival meal is chosen, before the trip and meal finish. A reachable own meal with equal or greater available variety is preferred; service availability, route, starvation travel limit and conversion eligibility also matter.

Fruit trees nearby and an advertisement checkbox alone do not establish those conditions. Read [fruit and conversion](/learn/fruit-and-conversion/) and inspect actual named stores, occupants and service access rather than assuming every missing unit died in combat.

When a joining notification appears in your own practice:

1. Pause and read which colony gained or lost the glob. Check current role totals alongside the notice.
2. Inspect your own inn's ordinary food, each named fruit stock, occupants and workers. Ordinary food alone does not measure its fruit offer.
3. Check current orchard visibility and a usable ground hauling route. Observe actual fruit deliveries before counting an orchard as supplied.
4. Restore essential service work before replacing every missing glob. Extra births can consume food while an ownership-loss problem continues.
5. Resume and watch the next interval. Keep combat losses, ordinary service trips and joining notifications separate when assessing the workforce.

## Keep defense, recovery and victory separate

For a supplied home defense, release unneeded production and competing construction, allowing for a pending birth. Paint a compact **Guard area** with **A → G** near useful meals and healing, then cancel painting. Follow actual arrivals and service visits after resuming.

Guard attraction does not override every explicit war-flag assignment, and hungry globs can still need a meal. A well-positioned line therefore does not establish that food, healing or ownership are stable. Inspect each service and the actual condition of returning defenders.

Save a functioning checkpoint before increasing the commitment. Native Maxima can gather forces, retain home defense and reconsider offense during emergencies; the observed approaching group need not be its whole force. Re-scout the target, check your qualified warriors and ground route, and follow [organizing an attack](/learn/organizing-an-attack/) for a limited commitment with a recovery plan.

The pictured native replay eventually reaches its **13:53 tick-cap end with both colonies alive and no winner recorded**. The notifications and service states are useful diagnosis examples, not a demonstrated elimination or a comparison of general AI strength.

| Observation | Check next | Useful decision |
| --- | --- | --- |
| First inn remains a foundation | Materials, arrived workers and competing demand | Finish usable meals before adding more commitments |
| A glob joins the rival | Notification, own service access and fruit stores | Improve the actual offer before replacing every missing unit |
| Scout disappears from an old view | Current totals, alerts and fresh visibility | Replace information while preserving home work |
| Many warriors exist but few arrive | Training, routes, other jobs and service use | Reduce or redirect the commitment after diagnosis |
| Contact appears successful while labor shrinks | Ownership changes, births and combat losses | Restore the service economy as well as the defense |
| Maxima expands behind a visible force | New meals, training, routes and defenders | Reassess the support before repeating the same raid |

Repeat one change from the saved opening and compare the next supplied interval: deliveries, trained arrivals, ownership notices and recovery. Judge the configured match result separately from a successful local fight.
