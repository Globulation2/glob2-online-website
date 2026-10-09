---
title: "Buildings and services"
description: "Finish one useful building, supply its job, and keep meals available while adding healing and training."
locale: "en"
tags: ["buildings", "economy", "services"]
order: 1
group: "develop"
prerequisites: ["sustainable-food", "resources-and-hauling"]
reviewedAgainst: "4edaed552c3574914197d4978fbff4b81bd1eedb"
sources: [{"title":"Standard building catalog","url":"https://github.com/Globulation2/glob2/tree/4edaed552c3574914197d4978fbff4b81bd1eedb/data/buildings"},{"title":"Service admission and completion","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/building/Services.cpp"},{"title":"Construction and upgrading","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/building/Construction.cpp"}]
---

Buildings give autonomous globs places to work, eat, heal and train. Your decisions are where to place them, which projects receive labor, and whether the colony can supply and use them. A finished sprite alone does not establish that a service is working.

Use a healthy local practice colony from [Keep the colony fed](/learn/sustainable-food/). Save before adding a project. Pause births temporarily when a small labor force needs to finish a service before growing again.

## Choose the service for the problem

| Need | Building | What success looks like |
| --- | --- | --- |
| Existing globs need meals | Inn | Food deliveries continue and globs enter to eat. |
| Damaged globs need recovery | Hospital | Injured globs enter and leave with restored health. |
| Workers need better construction or harvesting | School | Eligible workers visit, train and return with improved abilities and qualification. |
| Warriors need stronger attacks | Barracks | Eligible warriors train their combat abilities. |
| Ground movement needs improvement | Racetrack | Eligible globs train walking. |
| Water blocks intended routes | Swimming pool | Eligible globs acquire or improve swimming. |
| The colony can support more units | Swarm | Food reaches it and newborns leave through usable exits. |

A hospital does not feed starving globs, and a school does not create workers. Fix the underlying shortage before choosing another building merely because it is available in the menu.

## Complete one project before adding three more

Select a clear site near the globs and resources it will serve. Avoid blocking a swarm exit, the approach to wheat, or a narrow corridor. Open construction with **B**, choose the building, place it, right-click out of the placement tool, and select its foundation. Use **B**, then **S** for a school.

[[media:services-foundation]]

Read the missing materials and Working request. Increase demand only when eligible workers are available. Resume and follow the deliveries until the site completes. A school, for example, requires both wood and algae; more assigned workers cannot substitute for an unreachable required material.

[[media:services-stalled-school]]

In this practice colony, the school received **Wood 7/7** but remained at **Algae 0/2**. Its resource-distance message explains the stall. Reduce the request on that stalled job and develop accessible supply before asking it for more workers. An unfinished school provides no training.

A higher-level site also requires trained builders. If labor is missing despite available materials, read its qualification messages before increasing every request. The training chapter explains how to create the eligible workers.

## Understand Working and Inside

After completion, select the building again. The fields depend on the service. At an inn, **Working** describes attached/requested haulers and **Inside** counts diners. A completed basic hospital shows Inside for patients and does not need a food stock or a continuous hauling assignment. Construction workers and service users are different roles.

[[media:services-active]]

[[media:services-active-detail]]

Eligible globs seek meals, healing and training automatically. You create usable capacity and leave them enough freedom to use it. Training can be delayed while every eligible unit remains occupied with other work. Do not read an empty service as proof that you must command each glob to enter.

## Add recovery after restoring meals

A damaged worker can leave work to seek healing. A level-one hospital has two service places and ordinary healing does not consume a material stock. To add one, press **B**, then **H**, place it on accessible clear ground, and let workers deliver its three wood before expecting patients. Place it where injured workers can reach it without a long detour, then observe an actual patient rather than judging it by construction alone.

[[media:services-healing]]

[[media:services-healing-detail]]

[[media:services-healing-result]]

If patients are waiting, consider capacity and travel. If starvation is continuing, return to the inn and food route first. Healing cannot make an absent wheat supply sustainable.

## Keep a backup before an upgrade

An upgrade turns the building into a construction site, interrupting its service. Before upgrading your only inn, establish another supplied inn and watch it serve meals. Keep that backup operating while trained workers deliver the upgrade materials.

This principle also applies to healing and training: account for the interruption before replacing the service you currently rely on. Save first, check the upgrade requirements and available space, and complete one stage before making another commitment.

## Check whether the building changed the bottleneck

After several service visits, inspect the original problem. Are food reserves replenishing? Are damaged globs returning to work? Have eligible workers actually trained? Is the new swarm producing the intended type without starving the inns?

If the answer is no, follow the required material, route, labor eligibility and service capacity in that order. Return to [Resources and hauling](/learn/resources-and-hauling/) for a missing delivery, or [Keep the colony fed](/learn/sustainable-food/) for recurring hunger. A completed useful service is progress; several stalled foundations are a new labor problem.
