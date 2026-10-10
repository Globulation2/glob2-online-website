---
title: "Facing Econo: keep food and fruit working"
description: "Practice a supplied colony, scout Econo's economic expansion, and judge fruit access before committing workers or an army."
locale: "en"
group: "ai"
order: 4
prerequisites: ["choosing-an-ai", "sustainable-food", "resources-and-hauling", "fruit-and-conversion"]
tags: ["AI", "Econo", "food", "scouting"]
reviewedAgainst: "c26a0a02aeef4993a7478c3651d6117b49dbc56c"
sources:
  - title: "Econo production and policy loop"
    url: "https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/ai/shared_runtime/Econo.cpp"
  - title: "Econo services, expansion and upgrades"
    url: "https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/ai/shared_runtime/EconoBuilding.cpp"
  - title: "Econo scouting and resource protection"
    url: "https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/ai/shared_runtime/EconoFlags.cpp"
  - title: "Reachable meals and conversion choices"
    url: "https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/team/TeamRouting.cpp"
---

Econo builds an economy around food, adds services and training, and competes for fruit and converts. Its Standard profile produces workers and explorers without producing warriors. Use it to practice a colony that remains supplied while you look beyond home. Continue to watch hostile explorers and visible defenses: **No warriors** does not make the match peaceful.

The exercise here is to keep a working inn, discover fruit, scout the competing colony, and choose an expansion you can support. You can complete those checkpoints without winning the duel.

## Choose the opponent and save the opening

Open **Custom game**, choose two colonies, and select **You** for one colony and **AI → Econo** for the other on separate teams. Open its **AI strategy** panel to check the selection, choose **Use Econo**, then select **Standard** in Game Rules. Keep experiments off for this lesson.

[[media:econo-profile-detail]]

The chooser's **Easy (1310)** is an offline difficulty estimate. It is separate from the online leaderboard's OpenSkill rating and rank. The illustrated match uses a generated **128 × 128 Fingerprint** map, red against cyan. Your resources and placements can differ.

Start, allow the opening to become visible, and save through **Escape → Save**. Pause with **P** when inspecting a panel; resume to test whether workers actually deliver or globs actually arrive.

## Establish meals before adding demands

Find reachable wheat, wood and clear land. Build one inn with **B → I**, right-click out of placement, and inspect its foundation. Wait for completion and real food deliveries before committing several new projects.

In this opening, workers first revealed the nearby pond and resources. The completed inn then held **Food 8/10** with two attached workers. That provided a useful starting checkpoint for scouting.

[[media:econo-first-meals]]

[[media:econo-first-meals-detail]]

Compare Food and Inside over time. Occupants use meals, and workers replenish the store. A single stocked frame is a checkpoint; repeated meals and deliveries show whether the arrangement continues working. Keep the growing wheat patch and a route around the pond intact.

Econo also places inns and production near their inputs. As its population grows, it plans more services and swarms, then movement training, schools and upgrades. Those choices explain what to look for when scouting; they do not set the staffing or building count your own map needs.

## Produce scouts, then release growth

Select your swarm and temporarily favor **Explorer** births. Keep the inn staffed while food also goes into production. Watch the actual explorer total: changing a weight does not instantly create a scout or change a worker's role.

This colony produced two explorers, then restored worker production. When the colony reached thirteen workers, production weights were reduced to zero and the swarm's Working request was reduced. That released labor for existing services and possible construction.

[[media:econo-scout-production-detail]]

[[media:econo-production-released-detail]]

Use **F → E** to place an exploration flag, cancel placement with a right-click, then select it. Check its Working request and compare **On the way** with **Here**. Move the request when it has answered your question, or remove it and confirm the removal after resuming. Obsolete requests can hold your scouts in already inspected territory.

## Scout fruit and its competing services

Use the minimap to inspect the next region. Send scouts far enough to reveal a useful question: is there another wheat source, which fruit types are available, and does Econo already serve the area? Flight can reveal a place your workers cannot reach by the same route.

The southern scouting request revealed a broad fruit patch beside wheat and water. Continued exploration then exposed cyan globs and an Econo inn near that patch. The resource was already contested.

[[media:econo-contested-orchard]]

A later scouting pass also revealed nearby cyan construction sites. Recheck a growing settlement before treating the first view as its final layout.

[[media:econo-scouted-services]]

Before founding another inn there, check the ground approach, construction wood, food deliveries and nearby hostile services. Keep builders fed during the journey. If the approach is unsafe or the materials are too far away, postpone that foundation and develop a nearer supplied site.

Econo sends explorers toward fruit and, under Standard hostile rules, toward opposing worker-producing buildings. An explorer request is different from a warrior army. Higher training can nevertheless make hostile explorers dangerous to ground units. Inspect a visible unit's training before judging what it can do, and use [colony defense](/learn/defending-your-colony/) if pressure reaches home.

## Turn discovery into stocked meals

Return to your inn and inspect the fruit stocks as well as Food. Seeing colored fruit trees on the map is only the beginning: workers need current vision of the fruit, a reachable ground route, and time to bring it to a service. A remembered orchard outside current vision is insufficient.

At the home checkpoint, this colony's inn held **Food 8/10**, **Cherries 29/40**, and four occupants. Oranges and prunes were still zero. The colony had established one fruit supply, rather than all three.

[[media:econo-home-fruit]]

[[media:econo-home-fruit-detail]]

Fruit affects the appeal of a meal. An accessible enemy inn offering more appealing food can attract a hungry glob and convert it. Continue supplying your own population while improving fruit access; an inn without meals cannot serve the colony reliably. Read [fruit and conversion](/learn/fruit-and-conversion/) for the service and combat tradeoffs.

[[media:econo-hauling-clip]]

The clip shows the actual home service cycle: workers move between the nearby wheat and the inn while globs use the supplied service. Give the economy time to work before placing another request.

## Choose the next objective deliberately

Save the supplied colony before your next commitment. A useful next exercise is another reachable, stocked service, an inspected training upgrade, or a supplied attack against an exposed opponent building. For the attack, follow [organizing an attack](/learn/organizing-an-attack/) and bring survivors back for meals afterward.

A growing Econo colony can add inns, swarms and training while you inspect another part of the map. Revisit the target and approach before committing. Removing one inn does not prove its colony is eliminated; use the configured [victory conditions](/learn/victory-and-rules/) to decide what ending the duel requires.

| What you observe | What to check | Useful adjustment |
| --- | --- | --- |
| Your inn empties during scout production | Food deliveries and simultaneous swarm demand | Reduce growth or release another request so meals recover |
| Fruit is visible but its inn stock stays zero | Current vision of fruit, a reachable ground route and actual hauling | Improve a reachable supply before planning conversion around it |
| A distant orchard has cyan services | Current vision, approach and builder supply | Postpone unsafe expansion or choose a nearer site |
| Scouts remain in an old region | Remaining exploration requests and Here count | Move or remove the obsolete request |
| Econo's buildings look larger on a later visit | Schools, completed upgrades and new services | Reassess the operation against the current town |
| An operation succeeds but the match continues | Remaining colonies and selected victory rules | Pursue the actual match goal rather than counting one destroyed building |

If meals fail, recover the colony before repeating the expansion. A supplied home gives you time to decide which contest over food, fruit or territory is worth taking.
