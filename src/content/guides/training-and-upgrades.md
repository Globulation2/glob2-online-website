---
title: "Training and upgrades"
description: "Give globs time to learn, distinguish building levels from unit abilities, and supply qualified builders for upgrades."
locale: "en"
tags: ["training", "buildings", "progression"]
order: 2
group: "develop"
prerequisites: ["buildings-and-services", "sustainable-food"]
reviewedAgainst: "4edaed552c3574914197d4978fbff4b81bd1eedb"
sources: [{"title":"School construction and training","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/data/buildings/school.json"},{"title":"Upgrade action availability","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/render/scene/SceneExtract.cpp"},{"title":"Builder qualification and jobs","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/building/Misc.cpp"},{"title":"Service training","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/building/Services.cpp"},{"title":"Individual abilities","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/unit/Unit.h"}]
---

A building level describes a service or construction stage. A glob's abilities describe that individual. Upgrading a school does not instantly upgrade every worker; adding materials to an inn upgrade does not replace qualified builders.

Start from a healthy saved practice colony. This example uses a Standard match against Numbi on Breachable highlands, with reachable shoreline algae. Keep meals operating throughout the exercise and slow births while the workers build and train.

## Choose the facility for the ability

| Facility | Main training |
| --- | --- |
| School | Worker construction and harvesting; higher school tiers teach further abilities to eligible globs |
| Barracks | Eligible warriors' attack speed and strength |
| Racetrack | Walking |
| Swimming pool | Swimming |

Training is automatic for eligible globs with a usable service and time available. Not every unit type can learn every ability. Inspect an actual glob instead of assuming it gained the training you intended.

## Build a school you can supply

1. Check the inn's Food and the workers available for another project.
2. Identify reachable wood and algae. A school needs **seven wood and two algae**; an isolated pond that workers cannot use is not sufficient.
3. Press **B**, then **S**, and place the school on clear reachable land. Right-click to stop placement, then select the site.
4. Give it a modest Working request and resume. Read both resource counts while deliveries arrive.
5. After completion, read Inside and watch eligible workers visit the service.

[[media:training-school-site]]

[[media:training-school-service]]

[[media:training-school-detail]]

If wood has arrived but algae remains at zero, follow the algae route and read the site's messages. Increase labor only when the requested workers can perform the job. Some shoreline sources can be harvested from accessible ground; crossing water to another source may require swimming. Inspect the actual route before building a pool solely because algae appears near water.

## Leave workers time to learn

Reduce requests on optional construction or clearing jobs after the school completes. Preserve food hauling, then let other eligible workers become available for training. A school with no free service places cannot train another glob at that instant.

Select a worker before training, then inspect a worker that has completed a school visit. Read its Levels and activity, rather than judging by the building sprite. The examples below compare an ordinary worker with a trained worker. The first school tier improves ordinary worker construction and harvesting and advances the construction qualification needed for the next building tier.

[[media:training-worker-before]]

[[media:training-worker-after]]

The display's ability level and rate are related but are not the same measurement as construction qualification. Qualification determines which site tier a worker may build. In Standard play, school training advances these together; a faster-looking worker is not a universal substitute for checking a site's eligibility message.

## Keep meals available before upgrading an inn

Establish a second supplied inn before taking the first one offline. Watch it receive food and serve a meal; a backup foundation cannot feed the colony. Save a pre-upgrade milestone.

Before any worker has the required construction qualification, the inn's **Upgrade** action is unavailable. Pressing **U** cannot bypass that requirement. After school training unlocks it, select the inn you intend to upgrade and press **U**, or choose its upgrade action. Check that the larger footprint has room. Once the upgrade begins, the building is a site and its old meal service is interrupted.

[[media:training-upgrade-locked]]

[[media:training-upgrade-unlocked]]

[[media:training-upgrade-site]]

[[media:training-upgrade-site-detail]]

A level-two inn needs eight wood and workers that have completed builder training at a basic school. Even after the action has unlocked, the site can remain unstaffed when qualified workers are occupied, recovering, unreachable or lost. Return to the school and release eligible workers for training; do not solve an eligibility message by requesting every worker in the colony.

Let trained builders deliver materials and finish the upgrade. Keep the backup inn supplied throughout. Select the completed inn and check the new service and food capacities before beginning another upgrade. Recheck Working as well: the completed building can restore its own default hauling request.

[[media:training-upgrade-result]]

[[media:training-upgrade-detail]]

## Develop one stage at a time

The next building tier requires further builder training at the next school stage. That progression itself requires builders and materials. Develop the school and workers in an order that can complete each step.

Do not upgrade every service together. The colony loses those services during their construction stages, while globs still need meals and recovery. Keep a usable alternative and observe the completed improvement before committing another building.

## Diagnose a progression stall

| What you see | Check | Correction |
| --- | --- | --- |
| School site waits on one material | Its labeled requirement and reachable source | Restore the actual supply route. |
| School is complete but workers do not improve | Occupancy, eligibility and their other jobs | Free suitable workers and allow training time. |
| Upgrade requests workers but attaches none | Required construction qualification and unit needs | Train and release eligible builders. |
| Upgrade cannot start | Damage, footprint space and qualified workers | Repair, make a viable footprint or train a suitable worker before retrying. |
| Meals fail during upgrading | Backup inn's completion, stock and capacity | Restore usable feeding before continuing development. |

Custom **No unit upgrades** changes this lesson. Check rules before treating unavailable training as a labor problem. Standard progression also differs from experimental or altered catalogs.

Save after a worker has trained and the upgraded inn is operating. Return to [Buildings and services](/learn/buildings-and-services/) for capacity and placement, or [Resources and hauling](/learn/resources-and-hauling/) when materials are the remaining bottleneck.
