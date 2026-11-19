---
title: "Keep the colony fed"
description: "Read local food stocks and service demand, slow growth when supply falls behind, and verify that deliveries replenish what globs consume."
locale: "en"
tags: ["strategy", "economy", "farming"]
order: 4
group: "manage"
prerequisites: ["resources-and-hauling"]
sources:
  - title: "Current public browser Food supply practice, observed 18 November 2026"
    url: "https://app.glob2.online/play/"
  - title: "Released native 0.11.6.1 source context: inn storage and feeding"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/content/data/buildings/inn.json"
  - title: "Released native 0.11.6.1 source context: unit hunger and recovery"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/unit/UnitMedical.cpp"
  - title: "Released native 0.11.6.1 source context: Swarm production"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/building/TypeSteps.cpp"
  - title: "Released native 0.11.6.1 source context: resource ecology"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/content/data/resources/registry.json"
---

Food is a continuing job. Completing an inn provides a service, but workers still have to replenish its stock. Births draw on a separate store at the swarm, while every new glob adds demand for meals. A colony can outgrow a food system that worked a few minutes earlier.

Complete [resources and hauling](/learn/resources-and-hauling/) first. For the pictured exercise, open **Tutorial → Food supply practice**. This prepared colony already has an inn, a swarm and stocked supplies; those are not a custom match's starting conditions. If a briefing appears, acknowledge it and follow the visible lesson task. Use the existing inn for the interruption below; the construction exercise in Resources and hauling covers building another one.

## Read the local store and the service separately

Select an inn and distinguish three readings:

- **Food** is stored supply at this particular building.
- **Inside** counts globs currently using its service.
- **Working** compares attached hauling workers with the requested number.

:::media-group

[[media:food-first-stock-v3]]

[[media:food-first-stock-detail-v3]]

:::

The selected level-one inn starts this demonstration with **Food 10/10**, **Inside 0/4** and **Working 0/0**. It has a full reserve and nobody inside, while its hauling request is temporarily zero. The four service places and ten food capacity are different limits; a bar for service activity is not another food reserve.

When establishing your own supply, keep a usable route between revealed wheat and the inn. Leave room around the footprint and avoid several competing construction sites. The [construction exercise](/learn/resources-and-hauling/) shows materials arriving, the inn finishing, and its work changing to food delivery.

After completion, recheck the hauling request. Watch several deliveries and meals rather than treating one full stock as evidence of lasting supply. A delivery and consumption can happen close together, so an unchanged net count does not prove that nobody worked or ate.

## Control growth without confusing the two food stores

Select the swarm separately. Its **Food** supports births; it does not replace the inn's meals for existing globs. Its **Worker**, **Explorer** and **Warrior** birth controls determine future production, while **Working** asks existing workers to supply that building.

:::media-group

[[media:food-swarm-v3]]

[[media:food-swarm-detail-v3]]

:::

This selected Swarm frame comes from a separate production experiment in the same prepared lesson. Its birth controls and hauling request have been reduced to their minimum, yet **Food 15/20** remains. Reducing hauling does not remove the stored supply, and raising a production control does not transform existing workers into another role.

If meals are falling behind growth, reduce future births before adding another swarm. Use the left end of each birth control until it reaches its minimum. Check the actual population after resuming; changed bars alone do not prove that the total has already stopped changing. The [production lesson](/learn/population-and-production/) illustrates the observed changes and a later food-available hold.

You can also reduce the swarm's hauling request to release that competing job, while preserving the inn's supply. Restore a modest production mix only after meals and deliveries can keep up. Avoid waiting until every local stock is empty before making the adjustment.

## Observe a small interruption, then refill

Start from a supplied, healthy colony and keep food in reserve. This is a brief inspection exercise, not a requirement to starve anyone. Pause when you need time to read a panel.

1. Select the inn and note Food, Inside and Working.
2. Temporarily reduce its hauling request to zero.
3. Resume and wait for an actual stock change. Watch the building and passing globs; do not assume a fixed number of seconds is enough.
4. Once the stock has fallen while food remains, restore a modest hauling request. Use priority to favor this essential job over optional work.
5. Resume if paused and watch the next deliveries, occupancy and stock together.

[[media:food-stock-falling-v3]]

In the observed run, the existing inn's stock fell from **10/10 to 9/10** while **Working was 0/0**. Food remains available throughout this small interruption.

[[media:food-hauling-restored-v3]]

The request was restored to **two** and priority set to **high**. The next illustrated frame still has **Food 9/10** and shows **Working 1/2**: one worker has attached against a request for two. Changing a request is not an instant delivery.

:::media-group

[[media:food-recovery-v3]]

[[media:food-recovery-detail-v3]]

:::

The later paused frame has **Food 10/10**, **Inside 0/4** and **Working 0/2**. The reserve has refilled, even though no worker is attached at this instant. Read the full stock before treating that staffing difference as another shortage.

[[media:food-consumption-refill-clip-v3]]

The continuous, normal-speed excerpt shows the stock reduction, the changed hauling request and the refill. Keep watching additional meals and deliveries before expanding the colony again.

## Choose the remedy from the bottleneck

| What you see | What to check | Useful response |
| --- | --- | --- |
| Food repeatedly approaches zero | Actual deliveries, reachable wheat, trip length and competing jobs | Release hauling labor and shorten an inefficient route |
| Food is available but Inside stays full | Waiting hungry globs and usable service capacity | Keep this inn supplied while adding capacity you can maintain |
| Food is full but Working is below the request | Current reserve, occupancy and other supply needs | Observe before raising the request again |
| Workers repeatedly leave a foundation | Their Food, HP and service access | Restore meals or healing before adding more construction |
| Swarm food rises while inn food falls | Birth controls, hauling requests and shared demand for wheat | Slow growth and preserve meals for existing globs |
| Several projects are unfinished together | Required materials, eligible builders and actual attachments | Finish or release one commitment before adding another |

More workers can help a hauling shortage, but they also need meals. A second inn helps only if workers can complete it and then supply it. Keep the original inn operating while an additional one is still a foundation.

If hunger is already severe, reduce optional work, preserve the route to reachable wheat and prioritize food. Once the food route works, maintain access to healing for damaged globs. A hospital can aid recovery; it does not replace the inn's meals. If the nearby resource has gone, raising a request cannot manufacture another delivery.

## Watch the next harvest

Under ordinary growth rules, wheat can renew and spread on suitable terrain, but harvesting can outrun that renewal. A large visible patch is a reserve, not a guaranteed throughput. Keep the camera in the same place and compare already revealed ground so new exploration does not look like regrowth.

:::media-group

[[media:food-field-before-v3]]

[[media:food-field-after-v3]]

:::

These crops show the same revealed portion of a wheat patch earlier and later in the prepared-colony experiment. The nearby stone provides a fixed landmark. Compare the changed distribution while the colony is active, then watch further harvesting and renewal before deciding how much population this field can support.

Preserve useful wheat and growing space instead of clearing the field just to tidy the town. Trees, persistent deposits and fruit have different behavior; use the [resource reference](/learn/reference-resources/) when planning future room and supply.

Optional **Farm Areas** add separate field mechanics. This exercise does not require a painted farm area. No-growth, hunger and scarcity rules can change the problem; inspect the selected [match rules](/learn/victory-and-rules/) before applying an ordinary supply plan to an experiment.

## Repeat from a healthy checkpoint

Before another expansion, check the inn's Food and Inside, the swarm's birth demand, and the workers actually attached to important jobs. Expand delivery for a hauling shortage, service capacity for an occupied inn, and population only when the supply can support it.

Save a supplied milestone through the game's own controls. Repeat one change at a time from that checkpoint and compare actual stock, arrivals and service use. Your goal is to explain why the reserve replenishes across continuing colony activity, then preserve that condition while adding the next project.
