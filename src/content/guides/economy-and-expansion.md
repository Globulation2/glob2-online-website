---
title: "Expand when the colony can support it"
description: "Choose a small expansion, fund its continuing supply, and check the outcome before adding another commitment."
locale: "en"
tags: ["economy", "expansion", "planning"]
order: 4
group: "develop"
prerequisites: ["sustainable-food", "population-and-production", "buildings-and-services"]
reviewedAgainst: "c26a0a02aeef4993a7478c3651d6117b49dbc56c"
sources: [{"title":"Continuing supply and labor","url":"https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/building/Misc.cpp"},{"title":"Inn costs and capacities","url":"https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/data/buildings/inn.json"},{"title":"Production and food competition","url":"https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/data/buildings/swarm.json"},{"title":"Service access","url":"https://github.com/Globulation2/glob2/blob/c26a0a02aeef4993a7478c3651d6117b49dbc56c/src/team/TeamRouting.cpp"}]
---

Expansion adds recurring work. A new building consumes construction materials, asks for workers and then has a purpose to keep supporting. More population also adds food demand. Expand one useful part of the colony, then watch whether the old services and the new commitment work together.

The illustrated Fingerprint checkpoint has thirteen workers, two explorers and a supplied home inn. Birth weights are already zero. The small expansion adds a second inn north of the pond as another reachable meal service while retaining the original inn. These are practice observations, not a prescribed opening or a guaranteed best site.

## Choose the problem before the building

Select the existing inn and swarm. Read their Food counts, Inside places, Working requests and actual workers. Watch them through several deliveries and meals. A full inn with all its places occupied suggests a service-capacity problem; an empty inn suggests a supply problem. A single snapshot cannot tell you which condition persists.

[[media:expansion-old-food-detail]]

Do the same for the proposed destination. Reveal the ground, locate its reachable materials and leave paths around the footprint. A flying explorer's access does not establish that a ground worker can haul there.

Decide what the expansion should accomplish: shorten the journey to meals, provide another functioning inn during an upgrade, reach a useful resource, or support a training service. Do not add a second building merely because another colony has one.

## Make room in the economy

1. Save a checkpoint before committing labor.
2. Reduce competing jobs. If population is already enough to staff the work, zero the swarm's active production weights while the new service comes online.
3. Keep the existing inn supplied. Birth food and meal food are separate demands at separate buildings; full swarm stock cannot substitute for an empty inn.
4. Request a small amount of construction labor, then inspect actual Working. A request does not create an available worker.
5. Resume and watch real deliveries. If materials remain missing, inspect access and qualified labor before placing another site.

[[media:expansion-growth-detail]]

Pausing births limits one source of demand. [Fruit conversion](/learn/fruit-and-conversion/) can still add globs when you advertise food, so check the actual population rather than assuming it stays fixed.

## Build the smallest useful step

For a nearer meal service, place a basic inn on clear ground near the working area and reachable wheat. Press **B**, **I**, click the site and right-click to leave placement mode. Select the foundation and keep its material requirements visible.

The foundation in this example starts with **Wood 0/3** and **Working 0/2** after the request is reduced from three to two. Let the game run; actual workers have to join and deliver wood.

[[media:expansion-site]]

[[media:expansion-site-detail]]

A basic inn needs three wood to finish. Completion gives it four meal places and room for ten ordinary food; workers must then bring that food. Keep its supply request modest until the old and new inns are both serving meals.

After construction, the new inn shows **HP 200/200**, **Working 2/2** and **Food 2/10**. The original inn still has **Food 8/10**, two occupants and both requested workers. Construction has succeeded without leaving the old meal service empty.

[[media:expansion-completed]]

[[media:expansion-completed-detail]]

Do not upgrade your only working meal service to solve a temporary crowd. An upgrade replaces it with a construction site until work finishes. A functioning backup makes that transition easier to support.

## Check the continuing cost

Let the colony run after construction. Revisit both inns, not just the new one. Look for repeated food deliveries, occupied meal places, healthy globs and a field that remains reachable. Compare the old stock with its earlier state; if its supply now collapses, the new service has moved the bottleneck instead of resolving it.

At the later check, the new inn has **Food 9/10**, one occupant and **Working 1/2**. The original inn has **Food 10/10**, two occupants and **Working 0/2**. Both are serving globs while stocked. The original request has not disappeared: its actual attachment is zero at this instant, which is different from an empty service. Do not increase every request just to make its numerator match.

[[media:expansion-new-result-detail]]

[[media:expansion-old-result-detail]]

The new inn also reports unavailable fruit access. Its ordinary wheat meals are functioning, but this expansion has not established a second fruit supply. Diagnose the warning in relation to the intended service.

[[media:expansion-supply-clip]]

This observed interval demonstrates completion, repeated stocking and use of both services. It does not prove unlimited harvest or indefinite safety. Continue checking the field and service demand as the colony changes.

Restore population production gradually only after supply and service work together. Choose the unit mix needed for the next goal. Workers can support hauling and construction; explorers reveal destinations; warriors add military demand. More of each is useful only when the colony supports it.

## Recover from an expansion that stalls

| Visible problem | Inspect next | Small correction |
| --- | --- | --- |
| Foundation has no materials | Requested versus actual workers, reachable resources | Release competing labor and restore a route. |
| Higher-tier site never gains builders | Construction qualification | Keep school access and idle training time before the upgrade. |
| New inn is complete but Food stays empty | Actual suppliers and wheat access | Restore hauling; completion alone does not supply meals. |
| Old inn empties during the work | Labor diverted to the new site or service | Reduce the new request and pause births while old supply recovers. |
| Several inns are stocked but globs remain hungry | Travel and available places | Put meal service where the working globs can use it. |
| Population still rises with birth weights zero | Conversion counter and advertised food | Budget for arrivals or reconsider the advertisement. |

Keep the useful completed step and remove unnecessary competing commitments. Save the stable result before planning the next one. [Keep the colony fed](/learn/sustainable-food/) covers continuing harvest; [Jobs, flags and priorities](/learn/jobs-and-flags/) explains how to move labor to the immediate bottleneck.
