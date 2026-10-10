---
title: "Fruit, happiness and conversion"
description: "Keep orchards visible, supply fruit with meals, and use food advertisement without mistaking it for an automatic conversion effect."
locale: "en"
tags: ["fruit", "conversion", "food"]
order: 3
group: "develop"
prerequisites: ["sustainable-food", "exploration-and-movement"]
reviewedAgainst: "c26a0a02aeef4993a7478c3651d6117b49dbc56c"
sources: [{"title":"Fruit harvesting visibility","url":"https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/map/gradient/SeedCells.h"},{"title":"Meals and fruit variety","url":"https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/building/Misc.cpp"},{"title":"Food selection and conversion conditions","url":"https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/team/TeamRouting.cpp"},{"title":"Changing ownership","url":"https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/unit/UnitActivity.cpp"},{"title":"Fruit and armor","url":"https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/unit/UnitStats.cpp"}]
---

Food keeps globs alive. Fruit adds variety to their meals and changes which inn they prefer when hungry. A richer meal can attract a rival's glob, but only when that glob can discover the offer and reach an available meal service.

Start with a healthy Standard practice colony against an AI on a map with accessible fruit. Keep ordinary food supplied before diverting workers to an orchard. The illustrated Fingerprint practice match is against Econo. The illustrated home inn has collected cherries beside the nearby pond while keeping ordinary food supplied. Its fruit reserve and four meal places are separate counts.

## Keep the orchard in view

1. Find cherry, orange or prune trees near a safe hauling route. Different colors identify different kinds.
2. Produce an explorer if needed. Use an exploration flag near the orchard and request a scout.
3. Resume and watch the explorer reveal the trees. Keep vision there while workers collect fruit; nearby buildings and globs can also maintain it.
4. Select the inn and read its separate Cherries, Oranges and Prunes counts.

[[media:fruit-orchard]]

Fruit harvesting requires **current visibility**. Seeing trees once and leaving them in remembered fog is insufficient. Maintain an explorer near the source, or another dependable source of vision. A scout does not haul the fruit; workers still need access and time to bring it to the inn.

The illustrated orchard is already within the colony's current vision. The exploration flag shows an optional request for additional scouts; it has **Here 0** and is not evidence that a scout has arrived.

[[media:fruit-orchard-detail]]

## Supply meals and fruit separately

An inn needs ordinary food to serve a meal. Fruit cannot replace that food reserve. Preserve enough hauling for both instead of assuming a full cherry stock solves an empty Food count.

Keep a reserve for the globs already inside. The offer counts a fruit kind only when that kind's available stock exceeds the current Inside count; one cherry beside four occupants is therefore insufficient to advertise that kind.

Let workers make actual deliveries. If the stock stays at zero, check the source's current visibility, route, remaining fruit and the workers attached to the inn. A source beyond water can require a different route or trained ground units even though the flying scout reaches it easily. Dense resources can also block ground access. Open only the corridor you need, preserve the surrounding food, and use a hospital for globs injured by clearing.

[[media:fruit-stock]]

[[media:fruit-stock-detail]]

The meal's happiness counts **distinct fruit kinds**, rather than the number of cherries in storage. Three cherries are one kind; cherries, oranges and prunes offer three kinds. Each available kind can accompany a meal. Select a glob after it eats to inspect its fruit result.

In the selected worker panel, **Food 98% (1)** means the worker has almost a full nutrition reserve and one fruit kind recorded from its meal. The parentheses do not show carried cherries or a count of meals.

[[media:fruit-meal]]

## Weigh the armor tradeoff

Fruit is not a universal combat improvement. For relevant unit types, eaten fruit reduces effective armor through the fruit penalty. Select a warrior before and after its next meal and compare the armor line, keeping the same unit selected while it moves.

The illustrated Standard warrior first shows **Food 93% (0)** and **Armour 10 = 10 - 0 * 10**. After its cherry meal, the same selected warrior shows **Food 99% (1)** and **Armour 0 = 10 - 1 * 10**. One fruit kind has restored its nutrition but removed its effective armor in this configuration. This is a measured example, not a universal penalty for every class, training level or custom rule.

[[media:fruit-armor-before]]

[[media:fruit-armor-after]]

Keep that tradeoff in mind before describing a happier army as a stronger army. Accessible varied home meals can resist a richer rival offer, while the armor result changes what happens when a unit next fights.

## Advertise an inn to another colony

Food advertisement allows another team's globs to consider your inns. Ordinary scouting of a rival's building does not replace this permission.

Open the in-game Teams panel using the alliance icon beside the map. In this practice match, You and Econo already belong to separate teams. Enable **fV** beside Econo: the panel labels it “Show vision for Inn buildings (to steal units)”. Confirm with **Ok**, then resume. This shares the food offer; it does not give you control over the opponent's decisions.

[[media:fruit-advertise]]

[[media:fruit-advertise-detail]]

## Understand the conversion decision

A hungry glob compares usable meals. A reachable own inn offering equal or greater fruit variety keeps it with its colony. A richer rival offer can win the comparison only when food advertisement allows it, the rival service can feed and convert with adequate fruit reserves for its current occupants, and the trip is short enough for the glob's remaining nutrition.

Conversion changes ownership when the glob chooses the rival feeding service, before it completes the meal. It is not a fruit aura around the tree or a reward for merely enabling the checkbox. Observe the ownership and conversion event rather than counting every visitor as a successful conversion.

In the illustrated match the native message says a unit from Econo / Cyan's team has joined your team. The worker total changes from 13 to 14 and the conversion counter reads **+1/-0**. The worker HUD uses available/total: **8/14** means eight available workers out of fourteen total. The swarm's production weights were zero during that interval, so this population increase is a conversion, not a birth. This demonstrates one successful offer; it does not promise the same timing or result in every match.

[[media:fruit-conversion]]

[[media:fruit-conversion-detail]]

[[media:fruit-offer-clip]]

Protect your own colony with accessible meals of adequate variety. Keeping a rich inn full but inaccessible or completely occupied can leave it unable to defend a hungry glob's food choice.

## Diagnose an unsuccessful offer

| Symptom | Check | Useful correction |
| --- | --- | --- |
| Orchard is known but fruit does not arrive | Current vision, source stock and ground route | Keep it visible and restore a real hauling path. |
| Fruit is stored but globs do not eat | Ordinary Food and available Inside places | Restore the meal service first. |
| Rival knows the location but ignores the inn | Food visibility to that team | Advertise food through the alliance panel. |
| Advertising produces no ownership change | Hunger, own meal quality, travel and conversion rules | Wait for a meaningful food choice; do not promise an inevitable result. |
| Home globs start changing sides | Competing advertised meals and usable own inns | Restore reachable own meals with equal or better variety. |

Save before changing diplomacy or establishing a forward inn. Build on [Keep the colony fed](/learn/sustainable-food/) and [Exploration, terrain and movement](/learn/exploration-and-movement/) when the problem is supply or visibility rather than conversion itself.
