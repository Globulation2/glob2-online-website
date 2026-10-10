---
title: "Facing Nicowar: train before filling the defense flag"
description: "Match Nicowar's trained attack force with a qualified home defense, and keep that training connected to working food supply."
locale: "en"
tags: ["AI", "Nicowar", "defense", "scouting"]
order: 7
group: "ai"
prerequisites: ["choosing-an-ai", "sustainable-food", "jobs-and-flags", "training-and-upgrades", "defending-your-colony"]
reviewedAgainst: "c26a0a02aeef4993a7478c3651d6117b49dbc56c"
sources: [{"title":"Nicowar phases and readiness","url":"https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/ai/nicowar/Phases.cpp"},{"title":"Shipped aggressive Nicowar profile","url":"https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/data/nicowar.txt"},{"title":"Nicowar supply and development","url":"https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/ai/nicowar/Buildings.cpp"},{"title":"Nicowar attacks and defense","url":"https://github.com/Globulation2/glob2/tree/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/ai/nicowar"},{"title":"Actual warrior flag qualification","url":"https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/building/Misc.cpp"}]
---

Nicowar can grow, train and prepare attacks at the same time. A town with new economic buildings can still be sending an army toward yours. The useful practice is to stage a trained home force while keeping meals available, then check the actual attachment and food result.

Practice with a small home force: release raw warriors from their flag, let them train, then assemble two qualified defenders. Watch the barracks, flag and inn together so you can tell whether your army is becoming ready while meals remain available.

The illustrated Standard duel also includes a failed first defense. The home inn was stocked, but production was lightly supplied and military preparation came late. While the scout revealed Nicowar's developed services, attacks destroyed the home buildings. A stocked inn at one earlier moment had not made the colony safe.

## Choose the actual opponent

Create a two-colony local duel through [Choosing an AI opponent](/learn/choosing-an-ai/). Use **You** for one colony and **AI → Nicowar** for the other, on separate teams. Keep **Standard** rules. Save the opening so you can try a different decision from the same map.

[[media:nicowar-setup-detail]]

The chooser labels Nicowar **Medium (1653)**. That is an offline opponent estimate; it is separate from an online player's authoritative rank, provisional status and OpenSkill rating.

The shipped Nicowar uses its aggressive **warrush** strategy profile. Select **Nicowar** in the chooser: the separate **Warrush** opponent has another implementation. Do not expect Nicowar to randomly alternate between a slow opening and this profile.

[[media:nicowar-profile-detail]]

This example uses **Breachable highlands**, **128 × 128**, red against cyan. A generated version can put resources and routes elsewhere. Check your own visible ground before copying a building position.

## Supply the colony before borrowing its labor

Start with reachable wheat and wood. Place an inn with **B**, **I**, click clear ground, then right-click to leave placement. Select the completed inn and watch real food deliveries and meal use. The illustrated inn has **Food 10/10**. Its suppliers have detached because it is stocked; **Working 0/2** can be normal at this moment.

[[media:nicowar-first-food-detail]]

Next inspect the swarm. Its Food is a separate stock for births, and its Working request is a separate claim on workers. A stocked inn does not feed a swarm's production. The failed defense below began with only one requested swarm supplier and left the colony with little production food and a small defending population.

Keep worker production available while adding the explorers and warriors needed for the practice. Increasing a production weight changes the mix; it does not supply the food or provide an already trained defender. Check actual workers, stock and the newly produced units after resuming.

Build a barracks with **B**, **B**, place it on reachable clear ground near the colony, then right-click out of placement. Give its construction workers access to materials and wait for completion. Select it to check its health and training places. Keep the inn reachable from the barracks and the approach you intend to defend.

## Correct the flag that blocks your training

Nicowar's Standard offensive flags require trained combat abilities. Prepare a comparable home force without pulling every newborn warrior straight into a job that keeps it from training.

With a supplied inn, completed barracks and a few warriors available, create a home war flag with **F**, **W**. Place it near the service or approach you intend to protect, then right-click to leave placement. Select the visible star to read its panel. If you already have a home flag, inspect that one.

Check **Minimum required level** and the attached warriors before increasing the request. Level **1** accepts raw warriors. The illustrated flag has **Here 4**, **Working 4/10**, while the completed barracks has **Inside 0/2**. The warriors are occupied at the flag; completing a barracks has not made this force trained. Leave room for food work and training instead of trying to fill the whole request immediately.

[[media:nicowar-raw-flag-detail]]

[[media:nicowar-empty-barracks-detail]]

1. Pause and select the home war flag.
2. Set **Minimum required level** to **2**. This requires the first training level in both combat abilities; changing the flag does not upgrade units itself.
3. Reduce the request to **two**. The illustrated flag becomes **Working 0/2**, with no warriors Here or On the way: the raw warriors no longer qualify for its job.
4. Resume. Released warriors can seek training through the nearby barracks when meals, access and available places support them.
5. Inspect the barracks. **Inside 2/2** shows both training places occupied, compared with **Inside 0/2** before release. Then return to the flag and check how many qualified warriors have attached.
6. Revisit the inn. Check food, meal places and suppliers while the defense assembles, and keep watching for attack alerts.

[[media:nicowar-qualified-request-detail]]

[[media:nicowar-barracks-training-detail]]

The resulting level-2 flag has **Here 2**, **Working 2/2**, and nobody On the way. The inn has **Food 9/10**, **Inside 1/4**, and **Working 1/2**: two qualifying defenders have assembled, a meal place is in use and a supplier is attached. Continue checking replenishment as the colony works.

[[media:nicowar-qualified-result-detail]]

[[media:nicowar-retry-food-detail]]

The clip shows the same adjustment from a raw-warrior assignment to a two-warrior qualified flag, ending with a stocked inn. Pause to inspect the change in the flag panel.

[[media:nicowar-training-clip]]

An empty flag just after raising its minimum is the expected transition. Lowering the minimum immediately to fill it would undo the training opportunity. If it remains empty, inspect both combat levels, the route, training places and competing jobs. Two trained defenders are a starting force; decide whether to add more from the threat you actually see.

## Reveal development without abandoning home

Produce a small scout group while continuing the food work. Use the minimap to inspect revealed ground. If explorers keep wandering away from the useful direction, place an exploration flag with **F**, **E** near the next ground you want to reveal and right-click out of placement. Its requested explorers still have to attach and travel.

Do not treat a scout-under-attack message as proof that the ground army has arrived. Explorers can encounter hostile flying units. Select the threatened unit or return to the alert's location and identify what is there.

The directed scout in this run revealed cyan training and service buildings and several explorers. Home alerts already reported a warrior, workers and the barracks under attack. That is a reason to inspect the colony immediately, even if the scout view is interesting.

[[media:nicowar-scout]]

[[media:nicowar-scout-alert-detail]]

Look for usable barracks and trained warriors, service capacity, and the routes into your working area. Nicowar's phases overlap rather than follow a fixed minute-by-minute script. It can add production and food service alongside military preparation; later it can develop movement, swimming and higher buildings.

The aggressive profile can enter war preparation with a very small colony and count untrained warriors toward its war trigger. Under Standard rules its offensive warrior flags still require training in both combat abilities. Read actual units and training access instead of predicting an attack solely from that trigger. The profile's three flags requesting five warriors each are requests, not a promise of fifteen attackers arriving together.

## Read the result and retry the decision

In the first attempt the home service buildings were lost while the scout was across the map. Remaining globs were still visible, but the original inn, swarm and barracks had disappeared from their working area. Keeping those buildings supplied earlier did not compensate for the late defense.

[[media:nicowar-lost-services]]

Once a supply or birth building is destroyed, moving its former worker request cannot restore it. Inspect which buildings survive, release unnecessary flags, and rebuild only if reachable materials and enough workers remain. If the colony is eliminated, use the saved opening to practice the earlier decision again.

A separate early-production retry also ended in colony elimination; it increased requests without establishing a sufficient trained defense.

[[media:nicowar-loss-detail]]

A retry should change one understandable commitment: increase a poorly supplied birth service while keeping meals stocked, start a modest defending force before exploring far away, or keep a scout flag closer to a useful route. Judge the change by actual deliveries, trained defenders and the survival of services, then save that result. A larger number in a request slider is not the outcome.

## When the threat changes

| What you observe | What to inspect next | Useful response |
| --- | --- | --- |
| Inn stocked, few defenders appearing | Swarm food, suppliers and unit mix | Restore production supply without starving meals. |
| War flag remains empty | Available warriors and both combat levels | Complete training and reduce competing assignments. |
| Scout attacks but no ground raid in view | Unit type and alert location | Identify the encounter before moving the whole defense. |
| Several threatened services | Actual approaches and each flag's attachment | Protect reachable working services instead of splitting a tiny army everywhere. |
| Nicowar gains higher services or swimming facilities | Actual unit levels and accessible routes | Revisit the scout picture; old information can miss a new approach. |
| More fruit and explorers appear later | Food advertisement, reachable meals and conversion | Use [Fruit and conversion](/learn/fruit-and-conversion/); fruit alone does not guarantee a transfer. |

Nicowar also protects regrowing resource seeds and redirects economic effort when feeding fails. An apparently quiet interval can be development or recovery rather than permanent inactivity. Later trained explorers can attack ground groups, so a lesson about early warriors does not cover every possible late threat.

**Peaceful**, **No unit upgrades**, **No regrowth**, and optional experiments change the lesson. Peaceful suppresses hostile military policy; No unit upgrades changes attack qualification and development; No regrowth removes the benefit of preserving regrowth seeds. The captures here use Standard, and do not demonstrate those variants.

Continue with [Defending your colony](/learn/defending-your-colony/) to rehearse the actual assignment, or [Recovering your colony](/learn/recovering-your-colony/) to diagnose damaged supply before funding the next project.
