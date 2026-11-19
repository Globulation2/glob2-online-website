---
title: "Expand when the colony can support it"
description: "Choose a useful new service, budget for construction and continuing supply, and compare the result with the existing colony."
locale: "en"
tags: ["economy", "expansion", "planning"]
order: 4
group: "develop"
prerequisites: ["sustainable-food", "population-and-production", "buildings-and-services"]
sources:
  - title: "Current public browser Food supply practice, observed 18 November 2026"
    url: "https://app.glob2.online/play/"
  - title: "Released native 0.11.6.1 source context: building work and supply"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/building/Misc.cpp"
  - title: "Released native 0.11.6.1 source context: inn requirements"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/content/data/buildings/inn.json"
  - title: "Released native 0.11.6.1 source context: service routing"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/team/TeamRouting.cpp"
---

An expansion creates work before it provides capacity. Workers must construct it, then supply or use it. Choose one specific problem, build the smallest useful addition, and compare the old services with the new commitment afterward.

The illustrated construction is the current **Food supply practice** lesson: a prepared colony adds another inn and supplies it. It establishes construction and initial stocking. The comparison exercise below asks you to continue observing your own colony; the illustrations do not establish that both inns stayed supplied through a long expansion.

## Choose the problem before the building

Select the existing inn. Read **Food**, **Inside** and **Working**, then watch more than one moment. A stocked inn can still have too few accessible places at busy times; an empty inn can have enough places but inadequate delivery. Do not choose another site until you know which problem you are trying to solve.

:::media-group

[[media:food-first-stock-v3]]

[[media:food-first-stock-detail-v3]]

:::

This separate supply inspection shows a full existing inn with no occupants or hauling request at that pause. It is a useful reading example, not proof of sustained capacity. In your game, record the same fields before construction so you have something to compare afterward.

Choose a purpose: shorten journeys to meals, provide a backup before an upgrade, reach a resource, or support training. Reveal the proposed ground and inspect the ground-worker route. An explorer reaching a destination does not by itself establish a hauling route.

## Make room for construction

1. In local practice, pause and record the existing service's state. Save a milestone if you want to revisit the decision.
2. Reduce optional jobs competing for the same workers. Inspect actual attachments rather than only requested totals.
3. Review Swarm production. If the present population can staff the next step, reduce future production while supply catches up.
4. Keep the existing inn's food job viable. Swarm Food is a different local store; it does not substitute for an empty inn.
5. Choose one site with reachable materials and room around its footprint. Leave enough workers available to finish and supply it.

Do not assume a production change freezes the population instantly. The [current population exercise](/learn/population-and-production/) records an extra worker after the controls were reduced, then a later bounded stable interval. Check actual counts as work proceeds. Fruit recruitment can add a separate source of arrivals; see [fruit and conversion](/learn/fruit-and-conversion/) before relying on a fixed headcount.

## Build one useful service

For the pictured exercise, open **Tutorial → Food supply practice** and follow its prompt to build another inn. Acknowledge a briefing if one appears. Press **B**, **I**, choose clear ground and right-click to leave placement mode. Select the foundation to inspect the requirement.

:::media-group

[[media:hauling-foundation-v3]]

[[media:hauling-foundation-detail-v3]]

:::

The recorded foundation starts at **HP 1/200**, **Wood 0/3**. Request builders and resume: materials and available workers must actually reach the site. In the construction frame, **HP 135/200**, **Wood 2/3** and **Working 1/3** show real progress with only one of three requested workers attached.

:::media-group

[[media:hauling-construction-v3]]

[[media:hauling-construction-detail-v3]]

:::

Do not respond to every gap by raising the request. Check competing jobs and routes. If a material cannot arrive, another foundation usually adds the same unsolved demand.

## Completion starts the continuing job

The completed recorded inn has **HP 200/200**, **Food 6/10**, **Inside 0/4** and **Working 2/2**. Construction is finished and food has arrived; no glob is using the service at this paused instant.

:::media-group

[[media:hauling-delivered-v3]]

[[media:hauling-delivered-detail-v3]]

:::

[[media:hauling-construction-clip-v3]]

The continuous excerpt shows construction and initial stocking. It does not follow a particular worker through a full meal cycle or prove long-term supply. Keep observing after the lesson's immediate goal succeeds.

## Compare the old service with the new one

Pause at useful intervals and record both inns in a small table:

| Service | Food before work | Food after construction | Later Food / Inside | Working attached / requested |
| --- | --- | --- | --- | --- |
| Existing inn | Your observation | Your observation | Your observation | Your observation |
| New inn | Not built | Your observation | Your observation | Your observation |

Resume between checks. Watch actual use and replenishment, not just full stores while nobody is eating. If the new inn fills while the old one empties, you may have redistributed a shortage. If both remain stocked but globs cannot get a meal, inspect journeys, available places and service access.

The [food interruption exercise](/learn/sustainable-food/) shows why attached/requested counts need context: a refilled inn can show **Working 0/2**. Do not increase every request solely to keep its numerator nonzero.

Avoid upgrading your only working meal service during an unresolved shortage. Plan another functioning service first, inspect the upgrade's space and builder requirements, then observe the transition in your own game.

## Repair the bottleneck before expanding again

| Visible problem | Inspect next | Small correction |
| --- | --- | --- |
| Foundation receives no materials | Actual workers and reachable supply | Release competing labor or reopen access. |
| Higher-tier work has no eligible builders | Required qualification and training access | Prepare suitable workers before that commitment. |
| Finished inn remains empty | Hauling request, wheat and routes | Restore supply rather than placing another service. |
| Old inn loses supply during construction | Where workers were diverted | Reduce optional work and check both stores again. |
| Stocked inns do not solve hunger | Travel, entry routes and free places | Make the service reachable to its intended users. |
| Population exceeds the labor budget | Production and recruitment | Review new arrivals and their continuing food demand. |

Restore growth gradually after the new service is useful and the old economy still works. Choose a unit mix for the next job, observe whether those units become available, then make one further commitment. [Recovery](/learn/recovering-your-colony/) covers a failing service; [jobs and flags](/learn/jobs-and-flags/) explains how to move requests toward the immediate bottleneck.
