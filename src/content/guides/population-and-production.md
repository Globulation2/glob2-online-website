---
title: "Population and swarm production"
description: "Choose a useful birth mix, support it with food and labor, and diagnose a swarm that stops producing."
locale: "en"
tags: ["economy", "units", "production"]
order: 5
group: "manage"
prerequisites: ["sustainable-food"]
reviewedAgainst: "4edaed552c3574914197d4978fbff4b81bd1eedb"
sources: [{"title":"Swarm recipes","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/data/buildings/swarm.json"},{"title":"Production choices and exits","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/building/TypeSteps.cpp"},{"title":"Production controls","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/hud/draw/GameGUIDrawBuildingInfos.cpp"}]
---

Your swarm creates new globs. Workers gather and build, explorers reveal the map, and warriors fight. A useful birth mix answers the colony's next need while leaving enough food and labor to support the units already alive.

Start with the stable colony from [Keep the colony fed](/learn/sustainable-food/). Save before changing production. This lesson uses a local Standard practice match against Numbi.

## Read the swarm before changing it

Select the swarm. **Food** is its local production stock, with a standard storage limit of twenty. **Working** requests workers to supply it. The three labeled controls below Food set the relative weights for future worker, explorer and warrior births.

[[media:population-panel]]

[[media:population-panel-detail]]

Every ordinary birth costs five food. Food in an inn is reserved there for meals; it is not the swarm's stock. A swarm that is busy producing can compete with inns for wheat and hauling workers.

Check your inn first. If its Food is falling toward zero, pause growth and restore meals before creating more globs. A larger population with no working food route is a larger recovery problem.

## Produce one type deliberately

1. Pause the practice match and select the swarm.
2. Reduce the explorer and warrior weights to zero using the left ends of their controls.
3. Raise the Worker weight above zero using the right end of its control, and confirm its colored fill. Keep a modest Working request so food can reach the swarm.
4. Resume. Observe food deliveries, production progress and the next newborn leaving the swarm.
5. Read the worker total in the top bar. Existing workers do not change class when you move a production control.

[[media:population-worker-result]]

[[media:population-worker-count]]

To explore, set worker and warrior weights to zero and raise Explorer. Wait for an actual explorer birth before treating the change as complete. An explorer can reveal routes and resources, but it cannot replace the worker hauling food to your inn.

[[media:population-explorer-result]]

[[media:population-explorer-count]]

## Weights are a mix, not a queue

With several weights above zero, the swarm chooses between those unit recipes. The values are relative: a larger worker weight favors workers, but it does not promise an exact repeating sequence or an immediate batch of that many units. Watch the births and colony totals over time.

Decide what you can support before adding warriors. Their production uses the same food resource, and they need meals afterward. A warrior-heavy mix can leave too few workers to construct and supply the colony that supports the army.

For a small colony, changing the existing swarm's mix is usually the first control to try. Another swarm needs thirty-five food to construct and then more food and labor to operate. Add production capacity when the supply system can sustain it, rather than because the current swarm is waiting for a delivery.

## Stop growth without removing units

Set all three birth weights to zero. This stops further production timing; a birth already waiting for a clear exit can still emerge. Existing globs remain part of the colony. If food haulers are needed elsewhere, reduce its Working request as well.

[[media:population-zero-weights]]

[[media:population-stable-total]]

Resume and observe the colony while the inn replenishes. Restore the birth mix when food and service capacity can support the next expansion. Pausing births is a useful temporary response to starvation risk, a large construction project, or an army that has become expensive to supply.

## Diagnose a stalled swarm

| Symptom | Check | Correction |
| --- | --- | --- |
| Food is below the cost of a birth | Working and the wheat route | Free hauling labor and give deliveries time. |
| Food is available but production is stopped | All three birth weights | Raise at least one intended type. |
| Production cannot release a unit | Space and movement around the swarm | Preserve usable exits and reduce congestion. |
| More births stop despite supply | The configured population limit and current total | Read match rules before adding another swarm. |
| New units appear but the colony grows weaker | Inn stocks, worker demand and unit mix | Slow births and rebuild the food and labor balance. |

Keep paths around the swarm open when placing new buildings. A food stock does not remove the need for a usable exit, and another swarm does not override a match's population limit.

Save after producing the intended type and restoring a sustainable mix. Return to [Resources and hauling](/learn/resources-and-hauling/) when stock is the bottleneck, or [Keep the colony fed](/learn/sustainable-food/) when births have outpaced meals.
