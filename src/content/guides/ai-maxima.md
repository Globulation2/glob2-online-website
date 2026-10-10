---
title: "Facing Maxima: watch the economy behind the army"
description: "Keep a supplied defense, replace lost scouts and reassess Maxima's growing services before committing your force."
locale: "en"
group: "ai"
order: 8
prerequisites: ["choosing-an-ai", "economy-and-expansion", "fruit-and-conversion", "training-and-upgrades", "defending-your-colony", "organizing-an-attack"]
tags: ["AI", "Maxima", "scouting", "defense"]
reviewedAgainst: "c26a0a02aeef4993a7478c3651d6117b49dbc56c"
sources:
  - title: "Maxima economy and development"
    url: "https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/ai/maxima/AIMaxima.cpp"
  - title: "Maxima combat and waves"
    url: "https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/ai/maxima/AIMaximaCombat.cpp"
  - title: "Maxima supply-funded production"
    url: "https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/ai/maxima/AIMaximaSwarmController.h"
  - title: "Maxima strategy resolution"
    url: "https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/ai/maxima/AIMaximaStrategy.cpp"
---

Maxima connects population growth, food access, service development and military commitments. A force leaving its colony does not tell you how much production remains behind it. The useful habit against this opponent is to inspect the economy and the approach again before making the next commitment.

This Standard practice duel uses **balanced for 2**, red against cyan Maxima. Start with the supply and training chapters first: the exercise depends on reading actual stocks and arrivals, rather than copying an army size or a fixed opening timer.

## Choose a comparable practice match

In **Custom game**, choose **You** and **AI → Maxima** on opposing teams. Choose **Standard** with experiments off. The native selector displays **Hard (1873)**, an offline difficulty estimate separate from online OpenSkill ratings and authoritative ranks.

[[media:maxima-selection]]

Save the opening with **Escape → Save**. This map includes seven workers, an explorer and preplaced towers; inspect your actual starting assets on other maps.

Fresh ordinary practice uses the packaged configuration for its match format. Imported saves retain their resolved AI configuration. A duel and a four-player free-for-all therefore need separate observations; do not assume changing the number of opponents merely adds copies of precisely the same match.

## Release growth that outruns your first meals

Place an inn with **B → I** beside reachable food and wood, then right-click out of placement. Wait for completion before treating it as feeding capacity.

In this opening, the swarm's continuing production increased the worker population while the inn remained a foundation: **Wood 2/3**, **Working 1/3**. Food on the map was available, but the colony still needed workers to finish the actual service.

[[media:maxima-opening-site]]

[[media:maxima-site-detail]]

Select the swarm and temporarily reduce **Worker**, **Explorer** and **Warrior** birth weights to zero. Reduce **Working** too, releasing its carriers for the remaining construction and deliveries. Birth weights govern future units; they do not change existing globs into another role. Hauling alone can leave stored food funding births.

[[media:maxima-production-paused]]

After resuming, the inn completed and filled to **Food 10/10** with **Working 2/2**. Check **Inside** through actual meal visits as well: a full buffer and simultaneous service capacity answer different questions.

[[media:maxima-supplied-opening]]

[[media:maxima-food-detail]]

Once meals work, add a barracks and hospital with **B → B** and **B → H**, keeping their entrances and the food route clear. Resume controlled warrior production instead of leaving it permanently paused. A hospital heals injuries; it cannot replace an inn or solve hunger.

## Read what Maxima can support

Maxima's production policy considers reachable fertile food, available workforce and hunger pressure. It also plans new feeding and development projects around labor, materials and service access. Several buildings using one patch do not multiply that patch's sustainable food.

This helps explain why inspecting only the swarm or a visible warrior group is insufficient. Scout its inns, service buildings and expansions. A quiet town can still be building the support for a later force. A completed barracks does not establish the level of every warrior; inspect the actual selected unit when you can.

Use **F → E** to place an exploration flag on a useful approach, then right-click out of placement. Watch actual arrivals and fresh visibility. Explorer flight does not establish a ground route for warriors, and a lost explorer leaves remembered buildings without necessarily preserving current enemy-unit information.

## Recognize conversion before replacing lost globs

In this duel, a later message said **Your unit has joined Maxima / 2 - Cyan's team ×3**. The red worker count fell from fifteen to thirteen while replacement explorers and warriors were being produced. This is an ownership-change message, not an ordinary combat-death notification.

[[media:maxima-conversion]]

[[media:maxima-conversion-detail]]

The red inn still had ordinary food but **Cherries 0/40**, **Oranges 0/40** and **Prunes 0/40**. A full ordinary food buffer therefore did not establish a competitive fruit offer.

Maxima's fruit policy maintains useful source visibility and advertises feeding services when its fruit supply qualifies. A glob can choose a reachable advertised rival meal offering better fruit variety, changing ownership before completing the meal. Read [Fruit, happiness and conversion](/learn/fruit-and-conversion/) for the actual conditions and the armor tradeoff; a fruit tree or the advertisement checkbox alone does not automatically convert visitors.

When you see this message:

1. Pause and inspect the own inn's food, fruit stocks and current occupants.
2. Check whether an orchard has current visibility and a ground hauling route. Remembered trees and a flying scout's route are insufficient for fruit delivery.
3. Watch actual fruit deliveries before counting that inn as a better offer. Each advertised kind needs adequate stock for the current occupants.
4. Reassess staffing after ownership losses. Automatically replacing every missing glob can consume food while the original problem continues.

A reachable own offer with equal or greater fruit variety keeps the glob with its colony. Improve real service availability and fruit access; do not assume a guard area orders hungry globs to refuse rival meals.

## Keep defense and recovery separate

For the local defense exercise, pause all three swarm birth weights and its hauling request again, then paint a compact **Guard area** with **A → G** near the home meals and hospital. Right-click out of painting, resume and inspect what actually happens. Existing war-flag assignments and service trips can still take warriors away from the guard area.

[[media:maxima-defense]]

After this interval the first inn still had **Food 9/10** and **Inside 2/4**, while the red workforce had fallen to six workers and eleven warriors remained. A further joining notification appeared alongside warrior-under-attack warnings. The compact guard did not stop ownership losses or establish a successful hold.

[[media:maxima-result-detail]]

A supplied home position helps you inspect the next decision. It does not solve every route or conversion problem. Keep the notification, worker totals, meal stocks and actual fighting in view together; a good-looking line of warriors can hide a shrinking workforce.

[[media:maxima-front]]

One selected cyan warrior had **HP 184/250**, **Food 72% (0)** and **Armour 10**, with attack-speed level 2 shown in its panel. This identifies an actual trained, injured fighter; it does not establish every warrior's level or Maxima's total force. Compare individual readiness before deciding that matching its visible headcount will be enough.

[[media:maxima-warrior-detail]]

[[media:maxima-pressure-clip]]

The silent clip replays home service from the guard checkpoint at normal speed. A joining notification appears while the worker total changes from six to five and the inn refills from Food 9/10 to 10/10. Ordinary meals remained supplied during that ownership loss. Read the notification and fruit stocks alongside the combat; this response did not demonstrate a victory or a lasting defense.

Maxima can gather land forces before advancing, retain a home defense and reconsider offense during a serious colony emergency. Food and army readiness affect those decisions. These are conditional policies, not a promise that a distraction will empty its base or that every visible group is its whole army.

After ending this practice by leaving the match, **Net conversions** recorded twelve globs lost to Maxima. The overview recorded only one ordinary red unit loss, alongside eight cyan losses. Combat damage therefore told only part of the story: the workforce was being recruited away while the defense inflicted damage. The result screen labels leaving as a loss; this was a stopped practice exercise, not a demonstrated elimination.

[[media:maxima-conversion-history]]

[[media:maxima-practice-summary]]

Open **Net conversions** separately from **Units lost** when reviewing your own practice. A successful-looking fight should not distract from the labor and service economy changing underneath it.

Before committing a counterattack, re-scout the approach and the support behind it. Check your own warrior's health, both combat abilities and actual route. Units eating or healing are temporarily unavailable; they are not necessarily lost. Use [Organizing an attack](/learn/organizing-an-attack/) for a limited commitment and inspect survivors before repeating it.

| Symptom | What to inspect | Next decision |
| --- | --- | --- |
| First inn remains a foundation | Materials, arrived workers and competing swarm demand | Release unnecessary production and finish the feeding service |
| A glob joins cyan | Ownership-change notification and own fruit offer | Repair fruit visibility, route and real meal stocks |
| Explorer disappears from an old scout view | Current count, notifications and fresh visibility | Replace information without treating remembered units as current |
| Home food is full but workers keep leaving | Fruit stock, occupants and reachable rival offers | Diagnose conversion separately from starvation |
| Defenders leave the guard patch | War-flag assignments, hunger, injuries and service trips | Preserve actual meals and healing before extending the line |
| Enemy force pauses briefly | Fresh scouts, current services and approach | Reassess before committing the entire army |

Practice these observations under the same rules first. No hunger, no resource growth, no upgrades and peaceful play change feeding, renewal, training and combat constraints. A different match format can resolve a different opponent configuration; keep that context with your comparison. When the workforce or supply fails, return to [Recovering your colony](/learn/recovering-your-colony/) before rebuilding every lost commitment.
