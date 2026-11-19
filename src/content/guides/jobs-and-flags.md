---
title: "Jobs, priorities, flags, and areas"
description: "Request useful work, keep essential services supplied, and use flags and small painted areas deliberately."
group: "manage"
order: 1
prerequisites: ["getting-started", "controls-and-hud"]
tags: ["beginner", "management", "flags"]
sources:
  - title: "Current public browser Guard zones and flag tactics lesson, observed 18 November 2026"
    url: "https://app.glob2.online/play/"
  - title: "Released native 0.11.6.1 source context: staffing, priorities and flag controls"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/hud/input/GameGUIInputMenuClickBuilding.cpp"
  - title: "Released native 0.11.6.1 source context: unit work and needs"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/unit/UnitActivity.cpp"
  - title: "Released native 0.11.6.1 source context: area tools"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/hud/GameGUIToolManager.cpp"
---

You give the colony jobs. Buildings request workers; flags request units near a destination; painted areas affect how units use terrain. Requests still depend on the units you have, their needs and training, and a usable route.

For the pictured exercise, open **Tutorial**, scroll down and choose **Guard zones and flag tactics**. This prepared colony already has services, an explorer and warriors. Follow its four tasks: scout, prepare a guard zone, repel the practice attack and counterattack. It is a useful place to learn these controls; its starting army and supplies are not a custom game's opening.

## Keep essential work supplied

Select an inn and compare **Food**, **Inside** and **Working**. Food is its stock, Inside is service occupancy, and Working compares attached units with the request. Then inspect the swarm and any construction sites. The [controls lesson](/learn/controls-and-hud/) shows these different readings in a current prepared colony.

A request does not create a unit. Asking five projects for three workers each can leave jobs waiting when the colony has only a handful. Workers may also leave work to eat, heal or train. A fully stocked inn may need little hauling at that instant; a site missing a reachable material cannot use extra requests to manufacture it.

Try one new project at a time:

1. Check that the inn has food and receives deliveries.
2. Place one useful site near its materials.
3. Give it a modest Working request and resume.
4. Compare actual attachments and deliveries at the site and inn.
5. Reduce the optional request if meals begin falling behind.

## Use priority without promising an outcome

The selected building or flag offers **low**, **mid** and **high** priority. Use the visible choice to favor an important request over optional work. In the pictured counterattack, the War flag is set to high; the later frame shows the requested three warriors have arrived.

Priority does not train a worker, turn one unit type into another, open a blocked route or provide missing food. When a request remains empty, check eligibility, needs, competing assignments and access before increasing it again. Preserve essential food hauling while releasing units for a new operation.

## Scout with an Exploration flag

The first task asks for an Exploration flag at the enemy base. Choose **Show destination**, press **F**, then **E**, and place it near the marked region. Right-click to leave placement, then left-click the flag to inspect it.

The panel separates **On the way**, **Here**, **Working**, **Range** and the minimum-level filter. A flag's radius controls the region of its work; the Working request controls how many eligible units it seeks. Changing one is not a substitute for changing the other.

:::media-group

[[media:jobs-exploration-v3]]

[[media:jobs-exploration-detail-v3]]

:::

The request was reduced from two to one and the range from ten to four through the left arrows before resuming. In this later frame, one explorer has arrived: **Working 1/1**, **On the way 0** and **Here 1**. The lesson has advanced to the Guard task. Compare the request with the actual travel and arrival rather than expecting an assignment to move the unit instantly.

Use a minimum-level filter only when you have a reason and eligible units. The pictured Exploration flag accepts any explorer. A stricter filter can make a useful-looking request wait for a unit you have not produced or trained.

## Paint a small Guard zone

In the second task, choose **Show destination**, then press **A**, followed by **G**, for the Guard area tool. Choose a brush and paint a small patch at the marked destination. The pictured patch is four adjacent tiles, painted while paused.

:::media-group

[[media:jobs-guard-area-v3]]

[[media:jobs-guard-detail-v3]]

:::

Resume so warriors can reach it. Painting while paused changes the area; it does not move a warrior there. This lesson waits for defenders, launches a practice attack and then asks you to counterattack. Keep the existing inns supplied while units travel and fight.

Guard areas and War flags can compete for warriors. A zone that was useful during defense may hold units away from the next objective. Inspect the current task and actual assignments rather than covering the entire map with Guard tiles.

To remove an unwanted patch, press **A**, then **D**, and paint over it. **A**, then **A**, returns to adding. In the following paused comparison, one tile was removed and then restored through those actual controls. No unit movement was needed for the area change.

[[media:jobs-guard-removing-v3]]

[[media:jobs-guard-restored-v3]]

Right-click when you finish painting so an incidental map click does not add another mark.

## Request a focused counterattack

After repelling the practice attack, this lesson unlocks the War flag. Choose **Show destination**, press **F**, then **W**, and place it near the enemy Swarm. Right-click out of placement and select the star-shaped flag. If several flags overlap, check the panel title before changing a request.

The actual selected War flag initially requested ten warriors. The exercise needs three and a radius of four or smaller. Reduce the Working request with its left arrow, inspect Range, and keep the minimum required level suitable for your existing army. Resume and watch **On the way** and **Here** change.

:::media-group

[[media:jobs-war-request-v3]]

[[media:jobs-war-detail-v3]]

:::

The later frame shows **Working 3/3**, **On the way 0**, **Here 3**, **Range 4**, high priority and minimum level one. This is an observed arrival, not a promise that any request for three will fill immediately. By this frame the prepared lesson reports completion of its scouting, defense and counterattack tasks.

Keep an army's meal and healing routes in mind. A focused radius can concentrate a job, but it does not supply an army or guarantee that the target is safe to attack. Follow [organizing an attack](/learn/organizing-an-attack/) for the larger operation.

## Choose other tools deliberately

Exploration, War and Clearing flags request different unit roles. The default **F → C** Clearing flag is for removing chosen resource materials, not delivering those materials to an inn or foundation. Inspect its filters and the actual patch before assigning workers; preserve useful food and building material.

Areas also have different purposes. Forbidden marks can obstruct ground routes; Clearing areas can remove resources; optional Farm Areas belong to an experiment. Test a small, visible patch and keep routes around it open. A painted area is not a wall or a guarantee against every movement type. If units stall, remove the questionable marks and observe the route again. Check **Settings → Controls** if your shortcuts differ.

## Release work when the task ends

After a building completes, its work can change from construction to supply. After scouting or combat, a flag or Guard zone can also become obsolete. Reduce or remove requests that no longer serve your plan.

| Symptom | Check next | Useful correction |
| --- | --- | --- |
| Working stays below the request | Unit role, needs, training, other assignments and access | Release a competing request and allow travel time |
| A flag is staffed but Here remains zero | On the way, radius and destination | Observe the approach before raising the request |
| A site has workers but waits | Required materials, routes and construction qualification | Fix the missing requirement instead of only hiring more |
| Warriors remain at home | Guard markings and other flag requests | Remove obsolete defensive work before a new commitment |
| Food falls during several projects | Inn deliveries and swarm demand | Slow expansion and release haulers for meals |
| Units stop near painted terrain | The marks and alternative paths | Remove a small section and inspect actual movement |

Restore essential supply first, then choose the next useful job. The [resources lesson](/learn/resources-and-hauling/) follows construction deliveries, and [food supply](/learn/sustainable-food/) helps you decide whether the colony can sustain another request.
