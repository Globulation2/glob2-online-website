---
title: "Facing Cortex: keep supply and scouting current"
description: "Recognize Cortex's changing development and pressure, keep a supplied defense, and inspect the opponent before choosing a counterattack."
locale: "en"
group: "ai"
order: 6
prerequisites: ["choosing-an-ai", "sustainable-food", "training-and-upgrades", "defending-your-colony", "organizing-an-attack"]
tags: ["AI", "Cortex", "scouting", "supply"]
reviewedAgainst: "c26a0a02aeef4993a7478c3651d6117b49dbc56c"
sources:
  - title: "Cortex ordinary policy and production"
    url: "https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/ai/cortex/CortexPolicy.cpp"
  - title: "Cortex combat decisions"
    url: "https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/ai/cortex/CortexPolicyCombat.cpp"
  - title: "Cortex economy and staffing"
    url: "https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/ai/cortex/CortexPolicyEconomy.cpp"
  - title: "Cortex wave movement"
    url: "https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/ai/cortex/AICortexFlags.cpp"
  - title: "Service admission and resource availability"
    url: "https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/building/Services.cpp"
---

Cortex develops feeding and training while changing its army commitments. A town that looked quiet on the first scout visit can gain services or send warriors while you are constructing your own buildings. Keep supply and information current together.

This Standard duel on **balanced for 2** follows red against cyan Cortex. The exercise is to maintain meals and healing during contact, recognize a construction project that cannot be supplied, and inspect the opponent before choosing the next commitment. It demonstrates a local supplied defense, not a completed victory.

## Choose ordinary Cortex

In **Custom game**, put **You** and **AI → Cortex** on separate teams and choose **Standard** with experiments off. The selector displays **Medium (1601)**. That is an offline difficulty estimate, separate from online OpenSkill ratings and authoritative ranks.

[[media:cortex-selection]]

The ordinary Cortex opponent uses its built-in decision policy. Experimental learned policies are separate development options; this walkthrough uses the ordinary public selection. An imported save can preserve its own configuration, so start a fresh ordinary practice duel when comparing these observations.

Save the opening with **Escape → Save**. The map in this example started with seven workers, an explorer and existing defense towers. On another map, inspect the actual opening assets rather than assuming those towers or those totals will exist.

## Establish supply before adding projects

Build an inn with **B → I** beside reachable food and wood, then right-click out of placement. Wait for completion, select the inn and watch **Food**, **Inside** and **Working** through deliveries and meals. A foundation cannot feed the colony, and a full food buffer does not tell you how many globs can eat simultaneously.

In this duel the first inn completed with **Food 6/10** and **Working 2/2**. Barracks and hospital followed while warrior births were added to the swarm's worker production. A second inn was completed as the population grew.

[[media:cortex-opening-food]]

[[media:cortex-opening-food-detail]]

Build only services you can supply. The attempted school is a useful warning: it had **Wood 7/7**, **Algae 0/2**, and a message that workers could not access the needed resource. More workers or a higher request cannot make an unreachable delivery work.

[[media:cortex-school-detail]]

For a stalled project, inspect the missing ingredient, routes and worker eligibility. Release its unnecessary Working request while investigating. Shore-accessible algae can be harvested without swimming; a pond's appearance alone does not establish an accessible shore. A swimming pool also trains individual globs over time rather than instantly granting the colony a water route.

## Scout development and the approach

Use the opening explorer to inspect useful approaches. Place an exploration flag with **F → E**, then right-click out of placement. Move the request when it has answered the current question, and inspect revealed territory through the minimap. Your explorer's flying route does not prove ground warriors can take the same route.

The first contact view showed cyan warriors approaching, a cyan war flag near the red approach, and a cyan hospital farther along the route. Those are reasons to inspect current enemy development and the local fight before committing defenders away from home.

[[media:cortex-pressure]]

[[media:cortex-development]]

[[media:cortex-development-detail]]

The later scouting view recorded cyan barracks, hospitals, a school foundation, a swimming pool and an inn. The explorer was then lost; the red worker total also fell from nineteen to eighteen during continuing pressure. Remembered structures can stay visible after a scout disappears. Replace scouting before treating that view as current enemy-unit information.

Cortex weighs food capacity, staffing, available resources and training when choosing development. It can build support and expand onto another food catchment when its current supply is strained. Schools, movement training and army services depend on actual eligibility; they are not a guaranteed fixed build sequence or a recipe you must copy.

Its attacks also depend on known targets, force readiness and support distance. Waves can gather before marching, and new forces can form while older ones remain committed. A flag moving is a request changing, not proof that every warrior arrived together or that the previous force disappeared.

Do not rely on food pressure making the opponent passive. An established starving Cortex colony can attempt a more urgent attack. Serious damage at home can trigger defense, while minor harassment during an offensive commitment may not immediately recall its force. These are conditional tendencies: inspect the units and actual outcome before attributing a quiet interval to one cause.

## Keep the home defense usable

When the colony already has a useful defending force, pause new demand before deciding to grow further:

1. Select the swarm and set all **Worker**, **Explorer** and **Warrior** birth weights to zero for this exercise. Reduce its **Working** request to zero too. Birth weights govern future units; they do not change existing workers into warriors. A reduced hauling request alone can still leave births spending stored food.
2. Keep both inns, the barracks and hospital reachable. Inspect actual occupants, stocks and HP rather than judging service readiness from the sprite.
3. Paint a compact **Guard area** with **A → G** on the approach near meals and healing, then right-click when finished. Guard attraction helps idle warriors; it does not override an existing war-flag assignment or guarantee an evenly spaced line.
4. Resume and check whether contact continues, supplies remain available, and defenders can return for services.

[[media:cortex-growth-detail]]

[[media:cortex-defense]]

The red colony had nineteen workers and eighteen warriors before this change. After the observed defense interval, both inns had **Food 10/10**: one held three occupants and the other four. The hospital had two occupants, and the eighteen-warrior total was still present. Those are useful signs that services remained available during the local hold; they do not prove every defender was healthy or an indefinite defense was established.

[[media:cortex-food-after-detail]]

[[media:cortex-hospital-detail]]

[[media:cortex-hold-clip]]

The silent clip follows the home meal cycle after the local hold. Read the written steps alongside it: preserve services, inspect real arrivals and injuries, and check the resulting food and unit totals. Saving the functioning checkpoint lets you compare a later decision without reconstructing the opening.

## Inspect again before a counterattack

A supplied hold creates time to choose the next operation. Scout current enemy services, the ground approach and the location of defenders. Inspect a real warrior's food, health and training before assigning the force; a completed barracks is not evidence that every warrior has finished training.

A reachable, valuable target is only part of readiness. The force must gather, travel, fight and still reach meals or healing. Use [Organizing an attack](/learn/organizing-an-attack/) to plan a limited commitment and watch actual arrivals. Reassess when survivors return instead of immediately sending the same request out again.

| What you see | What to inspect | Next useful action |
| --- | --- | --- |
| A school remains unfinished | Missing algae, reachable shore and eligibility messages | Release competing requests and establish a real delivery route |
| Full inns but defenders keep leaving | Food, Inside, trips and the position of the guard request | Keep service access close and observe through a meal cycle |
| Cyan services appear along the route | Fresh scouts, defenders and ground access | Update the approach before choosing a target |
| Pressure seems to stop briefly | Current units, flags and your own service use | Save and inspect; do not assume the opponent surrendered |
| A new commitment arrives piecemeal | Actual Here/On the way counts and medical trips | Gather or reduce the commitment before renewing it |

Different rules change the exercise. No hunger removes ordinary feeding pressure, no resource growth prevents waiting for seed regrowth, and peaceful play removes ordinary combat. Return to [Keep the colony fed](/learn/sustainable-food/) or [Recovering your colony](/learn/recovering-your-colony/) if the supporting economy fails before another operation.
