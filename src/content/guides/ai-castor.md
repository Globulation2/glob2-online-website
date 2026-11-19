---
title: "Facing Castor: inspect the colony before committing"
description: "Keep meals, growth and training supplied, update your view of Castor, and check a real force before choosing a limited target."
locale: "en"
tags: ["AI", "Castor", "scouting", "strategy"]
order: 3
group: "ai"
format: "profile"
prerequisites: ["choosing-an-ai", "sustainable-food", "training-and-upgrades", "organizing-an-attack"]
sources:
  - title: "Current browser Castor selector, observed 18 November 2026"
    url: "https://app.glob2.online/play/"
  - title: "Native 0.11.6.1 Castor economy and strikes"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/ai/castor/Control.cpp"
  - title: "Native 0.11.6.1 Castor readiness and progression"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/ai/castor/State.cpp"
  - title: "Native 0.11.6.1 Castor project implementation"
    url: "https://github.com/Globulation2/glob2/tree/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/ai/castor"
---

Castor manages development as projects and adjusts production around food and workforce. Practice reading the colony you actually encounter. Several buildings do not guarantee a large population, a stocked inn does not supply every swarm, and a finished barracks does not prove that every warrior has trained.

## Set up a repeatable exercise

Create two colonies through [choosing an AI](/learn/choosing-an-ai/). Select **You** and **AI → Castor**, use separate teams and choose **Standard** with experiments off. Save the opening before changing the production mix.

[[media:choosing-ai-roster-v3]]

The browser selector's offline difficulty number is separate from an online player's rating. Inspect your own reachable wheat, wood, clear ground and approach before copying a placement from any example. Pause locally to read a panel, then resume to observe real deliveries and arrivals.

:::note

The gameplay example is an **AI-versus-AI replay in released native 0.11.6.1**, cyan Castor against red Numbi on a generated 128×128 River map. Both colonies are computer-controlled, and the spectator watches Castor. It illustrates one supply and contact episode, separately from the human exercise below; it is not a comparison establishing which AI is stronger.

:::

## Keep feeding and production distinct

Complete a reachable inn before adding several projects. Inspect the foundation's materials and workers, then watch the completed inn's **Food**, **Inside** and **Working** through meals and deliveries. Use [resources and hauling](/learn/resources-and-hauling/) for the current construction and supply workflow.

Inspect the swarm separately. It uses its own food stock for births; an inn's stocked Food reading does not establish that production is supplied. Check the swarm's actual food, staffing and production mix while increasing population.

A school, barracks or hospital competes for construction labor and materials before it can help. Release an unnecessary request when several projects leave essential supply struggling. Do not replace an empty reserve with a higher requested workforce until you have checked the actual route, eligibility and available workers.

In the native replay at **5:38**, Castor’s selected swarm has **Food 4/20** and **Working 0/0**. A nearby selected inn has **Food 10/10**, **Inside 0/4** and **Working 0/1**. These are two different local stores in the same paused town.

:::media-group

[[media:castor-swarm-hd-v2]]

[[media:castor-swarm-detail-hd-v2]]

:::

:::media-group

[[media:castor-inn-hd-v2]]

[[media:castor-inn-detail-hd-v2]]

:::

In your practice, ask which stock is empty and which task needs a delivery. The answers distinguish an inn's meal service from a swarm's births and a foundation's construction.

## Scout development without assuming its cause

Produce a small number of explorers while maintaining meals. Use an exploration flag to answer a specific question: which services have completed, where are the defenders, or what ground approach reaches the town? Compare the requested count with **On the way** and **Here** after resuming.

Move or remove an obsolete request. Replace current vision if scouts leave or disappear; remembered structures are previous sightings rather than a reliable view of every defender. A flying explorer's route does not prove that ground workers or warriors can use the same approach.

At **8:33**, Castor’s own Statistics panel reports **Population 4**, while a barracks-under-attack alert appears. Buildings and service capacity have not become a large defending force in this episode.

[[media:castor-population-hd-v2]]

The Population history shows the earlier plateau near five and the later sampled four. Compare that history with current units, supplies and contact before deciding why the total changed.

[[media:castor-history-hd-v2]]

Compare buildings with actual population, training and delivery activity. An unchanged total does not identify one cause by itself. Inspect food, births, wounds, conversion and losses before deciding what a quiet interval means.

## Understand conditional development

In native 0.11.6.1, Castor's construction projects consider workforce, food, space and enemy reach. Food pressure can change production and staffing decisions. Under ordinary resource growth, waiting can allow a catchment to recover, but a quiet scene is not proof that this is what the controller is doing.

Its military demand changes with development and time. Attack readiness considers healthy warrior fighting power and a timeout, while strikes choose seen, reachable enemy buildings. A failed assault can increase what is required before trying again.

Keep watching the approach to useful training and services as well as the swarm. A swimming pool is a reason to inspect individual movement training and possible routes, rather than proof that the whole colony can cross water immediately.

## Make readiness visible before a probe

Prepare a limited human exercise rather than trying to copy a pictured force size:

1. Complete a reachable barracks while keeping meals supplied.
2. Produce warriors without removing the workers needed for food and construction.
3. Allow training, then select an actual warrior and inspect its combat abilities.
4. Check food, injuries, occupancy and routes back to healing before asking the force to travel.
5. Choose a revealed, reachable target and inspect its defenders and supporting services.
6. Set a small war-flag request with an appropriate minimum level; follow actual arrivals after resuming.

A flag allocates eligible units. It does not create trained warriors or deliver the whole request at once. If raw warriors remain assigned instead of training, release that assignment and observe whether they use the needed service.

If you add a tower, wait for construction and inspect ammunition before relying on it. An intact tower during a quiet interval does not demonstrate that it has defeated an assault.

## Read contact and decide when to stop

Watch the target, the approach and the home economy together. Units can leave for meals or healing, and survivors may return in different condition. Select real units instead of treating a lower request count as a complete account of losses.

If the probe cannot sustain pressure, remove or reduce the assignment, let survivors recover and scout again. A failed probe can still answer a question about defenders or routes; repeating the same request without learning from it spends more of the supplied force.

| Observation | Check next | Useful adjustment |
| --- | --- | --- |
| Inn stocked but births remain slow | Swarm food, staffing and production mix | Restore the actual production supply before adding another swarm |
| More services but little population change | Food, births, injuries and recent contact | Diagnose the observed constraint instead of counting buildings |
| A barracks is complete but units remain raw | Individual abilities and competing assignments | Release an obstructing request and observe training |
| A tower stands on the chosen approach | Completed state, ammunition and nearby defenders | Choose a supported, limited probe or another reachable target |
| Requested warriors arrive separately | Here, On the way, food and healing trips | Reduce or gather the commitment before renewing it |
| A probe ends with fewer healthy warriors | Survivors, services and updated enemy vision | Recover and change one decision before repeating |

Save the supplied checkpoint. Repeat one change—earlier scouting, fewer concurrent projects or a more qualified force—and compare the resulting deliveries, training and arrivals. The useful result is a decision you can explain from the actual colony, rather than an assumed fixed Castor opening.
