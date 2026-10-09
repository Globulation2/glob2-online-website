---
title: "Your first colony"
description: "Start the tutorial, give a building workers, and learn what to check when the colony waits."
locale: "en"
tags: ["beginner", "basics"]
order: 1
sources: [{"title": "Tutorial campaign sequence", "url": "https://github.com/Globulation2/glob2/blob/880e3d2bec02c3ec71b7757aea9f1094d42e4b98/campaigns/Tutorial_Campaign.txt"}, {"title": "Building worker controls", "url": "https://github.com/Globulation2/glob2/blob/880e3d2bec02c3ec71b7757aea9f1094d42e4b98/src/hud/input/GameGUIInputMenuClickBuilding.cpp"}, {"title": "Construction and resource delivery", "url": "https://github.com/Globulation2/glob2/blob/880e3d2bec02c3ec71b7757aea9f1094d42e4b98/src/building/Construction.cpp"}, {"title": "Unit work, hunger and medical needs", "url": "https://github.com/Globulation2/glob2/blob/880e3d2bec02c3ec71b7757aea9f1094d42e4b98/src/unit/UnitActivity.cpp"}, {"title": "Building meals", "url": "https://github.com/Globulation2/glob2/blob/880e3d2bec02c3ec71b7757aea9f1094d42e4b98/src/building/Misc.cpp"}, {"title": "Browser play and saving", "url": "https://github.com/Globulation2/glob2/blob/880e3d2bec02c3ec71b7757aea9f1094d42e4b98/browser/README.md"}, {"title": "Working panel current and requested workers", "url": "https://github.com/Globulation2/glob2/blob/880e3d2bec02c3ec71b7757aea9f1094d42e4b98/src/hud/draw/GameGUIDrawBuildingHelpers.cpp"}, {"title": "Completed save operations and shutdown storage", "url": "https://github.com/Globulation2/glob2/blob/880e3d2bec02c3ec71b7757aea9f1094d42e4b98/docs/browser/storage.md"}]
reviewedAgainst: "880e3d2bec02c3ec71b7757aea9f1094d42e4b98"
---

Start by learning how one building works. Open the [browser game](https://app.glob2online.com/play/), choose **Tutorial**, then select **Introduction and Basics** in **Tutorial Campaign** and choose **Start Mission**. The tutorial is a local game mode; it does not require entering a multiplayer queue.

The first mission begins with a red swarm and a worker. Follow its on-screen prompts: press **Space** to continue when asked, then click the globule when the lesson requests it. Later lessons introduce more buildings, training and flags.

This guide explains the work and food decisions you will encounter. Custom rules can change those systems, so use the tutorial before experimenting with a custom game.

## 1. Inspect a building before changing it

Select one of your buildings. Its information shows what it needs and how many workers it requests. An **inn** feeds globs; a **swarm** produces new ones. They have different jobs, even though both rely on deliveries.

**What to watch:** globs travel between the buildings and nearby resources. A glob leaving a job to eat is meeting a need, rather than ignoring your order.

**If nothing is selected:** select the building itself, rather than a nearby glob or an empty tile. On a computer, click inside the game to give it keyboard focus.

## 2. Give one job workers

When the tutorial asks for an inn, click the **Inn** icon below the minimap and choose clear ground near wheat. Right-click to leave placement mode, then select the inn. Its panel identifies it as **Inn Level 1**.

Use the **Working** slider in that panel to change the worker request. Changing the request from two to three asks for another worker; **3/3** means all three requested workers are currently working. Keep workers available for other buildings too.

<figure class="guide-figure">
<a href="/images/glob2-tutorial.webp" aria-label="View the tutorial inn and its worker panel at full size">
<img src="/images/glob2-tutorial.webp" width="1280" height="720" alt="Selected inn to the left of a red swarm. The inn panel on the right shows Working 0/3 and Food 10/10." loading="lazy" />
</a>
<figcaption>The inn is on the left, beside the red swarm. Here, Working 0/3 means three workers are requested and none are currently working there. Food 10/10 shows a full wheat supply. Requested workers and current workers can differ as globs meet their needs. <a href="/images/glob2-tutorial.webp">View the full-size screenshot</a>.</figcaption>
</figure>

**What to watch:** available workers respond by travelling to the job and bringing the materials it needs. A worker request is demand, not a promise that all requested workers arrive immediately.

**If construction waits:** check three things before raising demand again: whether materials are available, whether workers are free, and whether they can reach the site. Workers eating or receiving care cannot supply the site at the same time.

## 3. Check food before producing more globs

Select your inn and inspect **Food** in its panel alongside **Working**. In the pictured example, **Food 10/10** means the inn has a full wheat supply. Workers collect and deliver wheat to replenish the supply after meals.

Workers must collect reachable wheat for the inn to serve meals. Watch arrivals and deliveries before increasing population production at a swarm.

**What to watch:** food supply must keep up as the colony grows. A field near your settlement is not enough if the inn has no workers or its deliveries cannot get through.

**If hunger rises:** give the existing food supply time and workers to recover. Reduce competing worker requests or population production before opening more projects. Check the route to wheat as well as the amount left on the map.

## 4. Follow the tutorial through flags

Continue the remaining lessons rather than starting a fight immediately. They introduce other buildings and training before flags and attacking.

An exploration flag requests explorers at a location. A war flag requests warriors. A clearing flag requests workers. These requests use different unit roles; assigning a flag does not turn an ordinary worker into a warrior.

**What to watch:** the requested units travel toward the flag. Their route, training and other needs affect what happens next.

**If a flag has no response:** check that your colony has the relevant unit type and that the flag requests units. Inspect the route and whether those units are occupied before placing more flags.

## 5. Try one experiment in a custom game

After the tutorial, choose **Custom game**. Its setup has **Map**, **Players & Teams** and **Game Rules** tabs. Check the map, which colony you control, the computer opponents and the rules, then choose **Play this map**.

First, practise the inn’s worker request: change it, wait, and compare its deliveries with the other jobs in your colony. Then try an exploration flag:

1. Open the flag tab: the second round icon beneath the minimap.
2. Choose the first triangular icon. Its tooltip reads **Exploration Flag** and **Attracts explorers**.
3. Place it on clear terrain, right-click to leave placement mode, then select the flag.
4. Inspect **On the way**, **Here**, **Working** and **Range** in its panel. These tell you whether units are responding and what the flag requests.

<figure class="guide-figure">
<a href="/images/glob2-exploration-flag.webp" aria-label="View the exploration flag and its response counters at full size">
<img src="/images/glob2-exploration-flag.webp" width="1280" height="720" alt="Selected exploration flag beside a red swarm and a revealed lake, with a panel showing On the way 0, Here 2, Working 2/2 and Range 10." loading="lazy" />
</a>
<figcaption>After the swarm produces explorers, two respond to the flag: Working 2/2 and Here 2. They reveal terrain around the lake. On the way 0 means neither is still travelling to the flag. <a href="/images/glob2-exploration-flag.webp">View the full-size screenshot</a>.</figcaption>
</figure>

**If nobody arrives:** check whether your colony has explorers. A flag requesting two explorers shows **Working 0/2** if none are assigned. If the colony has zero explorers, that request cannot be filled. Select a swarm to find its **Worker**, **Explorer** and **Warrior** production controls. Increase the **Explorer** production weight and keep workers supplying the swarm; a worker request of three gives deliveries a share of the workforce. Wait for new explorers to be produced, then select the flag again to watch **On the way** and **Here** change. These controls produce new units; they do not turn existing workers into explorers.

In the pictured example, **Working 2/2** and **Here 2** show that two explorers have arrived. The map now reveals terrain around the lake. Producing explorers supplied the units the flag needed.

Keep this a small experiment. When you can explain why one building or flag is working or waiting, try a second service. Next, read [jobs and flags](/learn/jobs-and-flags/) and [keeping the colony fed](/learn/sustainable-food/).

## Leave with a saved copy

To continue a match later, open the game menu using the small round icon at the upper-left of the minimap. Choose **Save game** and finish the save before leaving.

Then use the game’s **Quit** control and wait for storage to finish before closing the browser tab. Quit flushes stored files; it does not replace saving the match. Browser saves belong to the current browser profile and website address. Export a backup before clearing site data or moving browsers. See [browser play and saves](/learn/browser-and-multiplayer/) for the details.
