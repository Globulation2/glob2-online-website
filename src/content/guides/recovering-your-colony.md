---
title: "Recover from starvation, stalled construction, and failed attacks"
description: "Stop adding pressure, restore essential jobs, and find the bottleneck before rebuilding."
group: "improve"
order: 2
prerequisites: ["jobs-and-flags", "sustainable-food"]
tags: ["troubleshooting", "recovery", "strategy"]
reviewedAgainst: "4edaed552c3574914197d4978fbff4b81bd1eedb"
sources:
  - title: "Unit meals, medicine, and job interruptions"
    url: "https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/unit/UnitActivity.cpp"
  - title: "Colony survival checks"
    url: "https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/team/TeamStep.cpp"
  - title: "Staffing and priorities"
    url: "https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/hud/input/GameGUIInputMenuClickBuilding.cpp"
---

Recovery starts by stopping the colony from creating more obligations. Another swarm, construction site, or war flag can make the same shortage worse. Identify the failing system, restore it, then rebuild gradually.

## Take a local snapshot before changing everything

In local practice, press **P** to pause and inspect. Save a separate recovery milestone if you want to compare decisions. In an online match, use the time available without assuming local pause can stop opponents.

Check the colony in this order:

1. Food stored in reachable inns.
2. Food workers and the routes they use.
3. Hungry or injured units and usable services.
4. Requests competing for the same workers.
5. Swarm production adding more mouths.
6. Combat flags keeping units away from home.

Units inside services may be eating or healing. Inspect the **Inside** count instead of judging the population only by sprites outside. Recovery services are active parts of the colony, not empty space where units disappear.

## Restore food before expanding population

Select an inn and inspect its labeled Food count, Working request, and any shortage message. Check that wheat is reachable and that painted forbidden terrain or new structures did not cut off delivery.

If construction is using the available workers, reduce its requests and favor the food job. Slow swarm production while the inn recovers. The swarm consumes food for future units; its stores do not feed the globs already alive.

Resume and watch a complete delivery-and-meal cycle. The checkpoint is food reaching users repeatedly, not a one-time count rising while hungry units still cannot access the inn.

If the local food patch is exhausted, labor redistribution alone cannot refill it. Locate reachable supply or plan another viable inn with enough construction capacity to finish and supply it. Do not order several remote sites before establishing which one the surviving colony can support.

## Practice a repairable food interruption

Start from a saved, healthy colony with a supplied inn. This small exercise teaches labor redistribution before a shortage becomes starvation.

1. Pause and note the inn's Food stock. In this example it starts at 10/10.
2. Reduce the inn's Working request to zero. Resume briefly, then pause with food still available. Meals have reduced this reserve to 7/10.
3. Stop the swarm's three birth weights and reduce its hauling request to release competing food labor.
4. Restore the inn's request; this example requests two workers. Resume and watch the delivery route.
5. Check that food returns and keeps replenishing across meals. Here it returns to 10/10 without losing a unit.

[[media:food-stock-falling]]

[[media:food-recovery]]

[[media:food-recovery-detail]]

At the final full stock, Working is 0/2. The request has been restored, but a full food reserve does not require continuous fetching. Read the food and the other resource messages before treating the low attached count as another failure. Restore a modest birth mix after supply is steady.

This is a repairable interruption in a healthy colony. If food is already gone and workers are starving, protect their remaining time by reducing optional commitments immediately; do not spend it reproducing the exercise.

## Heal damage after hunger

Globs need food and health. A hospital provides healing; it is not a replacement food source. A unit whose health fell during hunger still needs a reachable meal and usable healing afterward.

Keep the route to services open and give recovering units time away from nonessential work. If you immediately reassign every survivor to construction or fighting, the recovery period may never finish.

Inspect service occupancy and available capacity. A crowded service can need additional capacity, but adding another site during a labor or material shortage has a cost. Solve the actual bottleneck before expanding.


In the raid below, both inns have been destroyed while the hospital still has **Inside 2/2**. Those two occupied places can heal globs, but the lost meal service is a separate emergency. Rebuilding an inn is useful only if surviving workers can construct it and deliver reachable food before the remaining position collapses.

[[media:recovery-raid-loss]]

[[media:recovery-hospital-detail]]

## Find why construction stopped

Select one site at a time. Read its material requirement, attached/requested workers, current health/progress, and messages.

| What is missing | Useful check | Recovery action |
| --- | --- | --- |
| Workers | Demand at other buildings and unit needs | Release workers from lower-value jobs |
| A material | Remaining supply and route to it | Reopen access or choose a viable supply location |
| Qualified builders | Construction qualification and upgrade level | Make training usable and free eligible workers |
| Room for an upgrade | Adjacent structures/resources and larger footprint | Clear only the necessary obstruction or reconsider the upgrade |
| A usable exit | Buildings and walls near the service | Reopen access before adding more labor |

High priority cannot solve missing skill, material, or space. Requesting more workers against an impossible requirement turns a visible stall into a wider shortage.

When several sites stall, choose one that restores essential capacity. Reduce or cancel other commitments instead of spreading the same few workers across everything.

## Recover after a failed attack

Move or reduce the obsolete war flag. Check whether surviving warriors are still committed to a dangerous destination or can return to food and healing. Do not replace the entire lost force before checking home supplies.

Then inspect damage at home. If a food route or swarm was lost, rebuilding that economy can matter more than immediate retaliation. Protect the working approach with a compact defensive position and leave workers room to haul.

Review why the attack failed: incomplete training, staggered arrivals, long supply trips, enemy towers, a blocked route, or a poor objective. Make one correction before the next attempt. A replay can help inspect what happened, while a milestone save gives you a concrete local state to practice from.

## Reopen growth carefully

Once food delivery, health, and labor availability improve, resume one commitment:

1. Restore a modest future-production mix.
2. Observe whether inn supply still holds.
3. Finish the most useful stalled project.
4. Allow training and recovery between new jobs.
5. Add the next commitment only when the first is supported.

A short period of apparent inactivity can be productive if globs are eating, healing, or training. Judge recovery by usable capacity, not by how many construction sites are on screen.

Return to [sustainable food](/learn/sustainable-food/) to prevent the shortage recurring, or [defense](/learn/defending-your-colony/) to protect the rebuilt supply routes.
