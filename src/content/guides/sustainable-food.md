---
title: "Keep the colony fed"
description: "Read food stocks and service demand, slow births when supply falls behind, and preserve the next harvest."
locale: "en"
tags: ["strategy", "economy", "farming"]
order: 4
group: "manage"
prerequisites: ["resources-and-hauling"]
reviewedAgainst: "4edaed552c3574914197d4978fbff4b81bd1eedb"
sources: [{"title":"Inn capacity and meals","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/data/buildings/inn.json"},{"title":"Hunger and recovery","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/unit/UnitMedical.cpp"},{"title":"Resource growth","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/map/ResourceGrowth.cpp"},{"title":"Swarm production","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/data/buildings/swarm.json"}]
---

Food is a continuing job. Completing an inn gives your globs somewhere to eat; workers still have to deliver wheat, and the building can serve only a limited number of globs at once. New births add another mouth and consume food at the swarm. A colony can therefore outgrow a food system that worked a few minutes earlier.

Complete [Resources and hauling](/learn/resources-and-hauling/) first. Practice in a local Standard match against Numbi, with hunger and resource growth enabled. Save before changing your food system so you can try the correction again.

## Establish a working food route

Start with one reachable wheat patch, an inn close enough for regular deliveries, and workers available to supply it. Avoid adding several other construction sites while this first route is coming online.

1. Find revealed wheat and nearby buildable ground. Leave room for globs to pass around the inn.
2. Press **B**, then **I**, and click to place the inn. Right-click to leave placement mode; select the foundation.
3. Set its Working request and watch the required wood arrive. Construction must finish before the inn can feed anyone.
4. Keep the inn selected after completion. Watch workers bring wheat, and read the labeled **Food** count.
5. Let the game run through several deliveries and meals. A single full stock is useful, but the repeating route is what keeps the colony alive.

[[media:food-first-stock]]

[[media:food-first-stock-detail]]

In this practice match, the completed inn has **Food 3/10**, **Working 2/2** and **Inside 0/4**. These are three different readings: stored meals, attached/requested hauling workers, and occupied service places. The yellow horizontal service display is not a food reserve.

## Separate supply from service capacity

A level-one inn stores ten food and serves up to four globs at once. A meal uses one food. An empty inn needs deliveries; a stocked inn with every service place occupied needs time or more service capacity. Building another inn helps only if you can supply it.

Pause and inspect a struggling inn before choosing a remedy:

| What you see | What to check | First response |
| --- | --- | --- |
| Food keeps approaching zero | Working, accessible wheat, trip length and competing jobs | Release labor for food and shorten the delivery route. |
| Food is available but Inside stays full | Nearby hungry globs and total service capacity | Keep this inn running while adding another supplied inn. |
| Workers leave construction repeatedly | Meals and health, as well as the site's request | Restore food first; hungry workers cannot sustain the construction schedule. |
| Food is full but few workers are attached | Remaining supply requests and panel messages | A full stock can need little work; inspect before raising the request. |

More workers can solve a hauling shortage, but new workers also need food. Watch the result across several meal cycles before repeating the expansion.

## Watch the swarm compete for wheat

Select your swarm. Its Food belongs to unit production; it does not feed the existing colony. Each ordinary worker, explorer or warrior birth costs five food. The production weights choose the future unit mix, while Working requests workers to keep the swarm supplied.

[[media:food-swarm]]

[[media:food-swarm-detail]]

Compare the inn and swarm over time. If the swarm keeps producing while inn stocks fall, pause births before adding another swarm. Set all three birth weights to zero, using the left ends of their controls. If you also reduce the swarm's Working request, its food haulers can become available for other jobs. Neither change removes existing units.

Resume after making the correction. Give workers time to finish their current activity, reach the wheat and deliver it. Restore a modest production mix only when the inn can keep up with meals again. Do not wait for every food stock to be empty before acting.

## Try a small supply interruption, then recover

Use a saved, healthy practice colony for this exercise. Keep the inn selected, note its Food count, then temporarily reduce its Working request to zero. Resume briefly and watch meals draw down the stored food. Pause while food remains; this exercise does not require anyone to starve.

[[media:food-stock-falling]]

Restore the inn's request, slow births if necessary, and resume. Read the next few deliveries and meals together: the count can rise and fall within a healthy supply cycle. The goal is a reserve that replenishes, rather than a number that declines until the colony stops working.

[[media:food-recovery]]

[[media:food-recovery-detail]]

If hunger is already severe, cancel or reduce optional work first. Prioritize a reachable inn, preserve the path to wheat, and keep surviving workers on food. Add a hospital for damaged globs once the food route is functioning. A hospital heals; it cannot replace meals. If the nearest field is exhausted, secure another reachable supply rather than continuing to request nonexistent deliveries.

## Preserve the next harvest

Wheat can grow and spread under suitable terrain conditions, but harvesting can outrun that growth. A large field is a reserve, not a promise of unlimited throughput. Trees also regrow and spread; stone deposits behave differently and do not turn into empty farmland when used.

Watch the same revealed field over time. Keep the camera in the same place, compare the actual wheat tiles, and distinguish regrowth from newly explored fog. Notice whether harvesting is shrinking the patch faster than new wheat appears. Protect growing space from unnecessary construction and avoid clearing valuable wheat just to make a tidier colony.

[[media:food-field-comparison]]

When supply trends downward, slow growth, reduce competing food consumption, or expand toward another secure field. Do not assume that a fixed worker count or a particular field shape will support every population and map.

The optional **Farm Areas** experiment adds separate field mechanics. This Standard lesson uses ordinary wheat growth and does not require a painted farm area. No-growth and resource-scarcity custom rules also change how long reserves last; check the match rules before treating a field as renewable.

## Choose the next expansion from the bottleneck

Before another project, inspect the inn's Food and Inside counts, the swarm's food demand, and the workers actually attached to each job. Expand supply for a delivery shortage, service capacity for a meal bottleneck, and population only when both can support it.

Save the recovered colony. Return to [Your first colony](/learn/getting-started/) if you need the placement and staffing sequence, or use [Resources and hauling](/learn/resources-and-hauling/) to trace a route that is still failing. Repeat one change at a time until you can explain why the food reserve is replenishing.
