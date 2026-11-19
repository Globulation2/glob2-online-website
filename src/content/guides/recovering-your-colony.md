---
title: "Recover from starvation, stalled construction, and failed attacks"
description: "Separate food from health, release competing jobs, and verify one repaired system before rebuilding."
locale: "en"
group: "improve"
order: 2
prerequisites: ["jobs-and-flags", "sustainable-food"]
tags: ["troubleshooting", "recovery", "strategy"]
sources:
  - title: "Current public browser Food supply and Hospitals practice, observed 18 November 2026"
    url: "https://app.glob2.online/play/"
  - title: "Released native 0.11.6.1 source context: hunger and recovery"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/unit/UnitMedical.cpp"
  - title: "Released native 0.11.6.1 source context: service routing"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/team/TeamRouting.cpp"
---

Recovery starts by finding the failing system. Another construction site, swarm or attack can add obligations before the colony can support them. Restore one essential service, watch the result, then reopen growth.

The two exercises here are separate prepared tutorials: **Food supply practice** demonstrates a small repairable supply interruption; the **Hospitals** lesson demonstrates healing an already injured, fed worker. They do not depict one colony surviving starvation or a raid.

## Take a local snapshot

In local practice, press **P** to inspect while paused. In an online match, do not assume that local pause can stop opponents. Read these before changing several controls:

1. Food in reachable inns, and whether it is replenishing.
2. Actual versus requested workers and usable supply routes.
3. Individual Food and HP, and service occupancy.
4. Construction and flag requests competing with essentials.
5. Swarm production and its separate food store.
6. Survivors still committed to unsafe destinations.

A request is a demand for labor, not a promise that someone is free to join. A full store is a snapshot, not evidence that supply can keep up indefinitely.

## Repair a small food interruption

Open **Tutorial → Food supply practice** and inspect the existing inn. Acknowledge a briefing if one appears. This exercise begins with supply available; do not deliberately reproduce it in a colony already starving.

1. Pause and record Food, Inside and Working. The recorded inn starts with Food **10/10**, Inside **0/4**, Working **0/0**.
2. Resume with that hauling request at zero. Inspect often and stop before a dangerous shortage. The recorded reserve falls to **9/10**.
3. Restore a request for two and high priority. In the running illustration, **Working 1/2** means one attached worker against two requested; Food is still **9/10**.
4. Wait for actual deliveries, then pause to inspect again. Here Food returns to **10/10**, Inside is **0/4** and Working is **0/2**.

[[media:food-stock-falling-v3]]

:::media-group

[[media:food-recovery-v3]]

[[media:food-recovery-detail-v3]]

:::

The request remains two when the attached count returns to zero. Do not raise it merely to make the two numbers match: look at the store and messages first. This sequence demonstrates a bounded refill after labor was restored, not a whole-colony recovery or a single worker's complete meal cycle. See [food supply](/learn/sustainable-food/) for the continuous excerpt and ongoing checks.

If the store never replenishes, inspect reachable wheat, worker availability and competing requests. A higher priority cannot create missing resources or open a blocked route. Reduce optional construction and production before adding another remote service that the same workers must finish and supply.

## Separate hunger from injury

Select an affected unit. **Food** and **HP** answer different questions: a meal service supplies food, while a Hospital treats injury. The prepared Hospitals lesson explicitly starts with an injured patient who is already fed; do not diagnose its initial injury as starvation.

In that lesson, pause and select the patient before building. The recorded worker has **HP 50/200** and **Food 81%**.

:::media-group

[[media:services-patient-before-v3]]

[[media:services-patient-before-detail-v3]]

:::

Place a Hospital through the Build controls on the prompted clear ground, leaving a route around it. Inspect the site: here it begins at **HP 1/260**, **Wood 0/3**, **Working 0/2**. Follow the task's request for builders; construction must finish before the service can help.

[[media:services-hospital-foundation-v3]]

Reselect the same patient before resuming. Keep that selection while normal simulation runs, then inspect again when the lesson completes. In the recorded interval the same selected worker reaches **HP 200/200** with **Food 40%**.

:::media-group

[[media:services-patient-after-v3]]

[[media:services-patient-after-detail-v3]]

:::

The completed Hospital shows **HP 260/260** and **Inside 0/2** at the later pause, after the patient’s HP has recovered and the lesson is complete. Keep food available afterward. Finishing a Hospital does not replace an inn or its hauling route.

## Find why construction stopped

Inspect one site at a time before assigning every free worker.

| Visible shortage | Check next | Useful small repair |
| --- | --- | --- |
| No attached workers | Other requests and unit needs | Release labor from optional work. |
| Material count does not rise | Remaining supply and ground access | Reopen a usable route or choose a viable source. |
| Eligible builders unavailable | Required qualification and training access | Train and free suitable workers before expanding the request. |
| Upgrade cannot fit | Its larger footprint and nearby obstructions | Clear necessary space before committing the upgrade. |
| Service cannot be reached | Surrounding buildings, walls and painted restrictions | Restore entry and exit access. |

The [current hauling exercise](/learn/resources-and-hauling/) shows a real foundation becoming a supplied inn. Use that sequence to distinguish construction progress from the continuing food job. If several sites stall, choose the one that restores essential capacity and reduce the others.

## Regroup after a failed attack

Reduce or move an obsolete war flag and check where survivors are committed. Inspect their food, health, training and return route before asking for another attack. Protect the working approach with a compact defensive position while leaving room for hauling; [jobs and flags](/learn/jobs-and-flags/) demonstrates the actual War flag and Guard-area controls.

Treat this as a troubleshooting exercise, not a pictured successful counterattack. Review a replay or your own observations for staggered arrivals, travel, blocked access, enemy defenses or a poor objective. Fix one identifiable problem before replacing the lost force.

## Reopen commitments one at a time

Restore a modest production mix only after food and usable services improve. Watch whether the next workers can actually join useful jobs. Finish one essential project, leave time for meals and recovery, then consider the next commitment. A quiet period can be productive when globs are eating, healing or training.

Continue with [food supply](/learn/sustainable-food/), [population and production](/learn/population-and-production/) or [defense](/learn/defending-your-colony/) according to the bottleneck you found.
