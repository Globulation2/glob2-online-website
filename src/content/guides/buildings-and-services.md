---
title: "Buildings and services"
description: "Complete a useful service, read its supplies and places, and check the effect on an actual glob."
locale: "en"
tags: ["buildings", "economy", "services"]
order: 1
group: "develop"
prerequisites: ["sustainable-food", "resources-and-hauling"]
sources:
  - title: "Current public browser Food supply, Hospitals and Schools lessons, observed 18 November 2026"
    url: "https://app.glob2.online/play/"
  - title: "Released native 0.11.6.1 Standard building catalog"
    url: "https://github.com/Globulation2/glob2/tree/1b60514218218c89516b6c6f26f2fcefc9c8f974/content/data/buildings"
  - title: "Released native 0.11.6.1 service admission and completion"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/building/Services.cpp"
  - title: "Released native 0.11.6.1 construction and service interruption"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/building/Construction.cpp"
---

Buildings give autonomous globs places to eat, heal and train. Your decisions are where to provide that capacity, which projects receive labor, and whether globs can reach and use the result. A finished building is one checkpoint; an actual improvement to a glob or supply problem is another.

The pictured examples are separate prepared **Hospitals and healing** and **Schools and worker skills** lessons in the public browser game. They show real construction and service outcomes with explicitly applied High resolution artwork. Native catalog details are identified separately; the browser deployment's exact source revision remains unverified.

## Choose a service for a specific problem

| Need | Service | Check the result |
| --- | --- | --- |
| Existing globs need meals | Inn | Watch stored food, actual use and replenishment. |
| Injured globs need healing | Hospital | Compare the same patient's HP before and after. |
| Workers need construction and harvesting training | School | Inspect an eligible worker's actual abilities after training. |
| Warriors need combat training | Barracks | Inspect eligible warriors and their combat abilities. |
| Ground travel needs improvement | Racetrack | Check walking after an eligible glob trains. |
| A route requires swimming | Swimming pool | Check the intended glob's ability and actual route. |
| The colony needs future units | Swarm | Keep production food supplied and observe the role totals. |

The ordinary service roles in this table follow the released native Standard catalog. The examples below demonstrate Inn supply, Hospital healing and School worker training. They do not test every glob's eligibility for every facility.

An Inn and a Hospital solve different needs. Read both Food and HP before choosing a project: a well-fed patient can be injured, while a healthy glob can still need a meal. A School teaches existing eligible globs; a Swarm produces new ones.

## Finish the building before expecting its service

Try **Tutorial → Schools and worker skills**. Acknowledge its briefing if one appears. This prepared lesson supplies workers able to fetch the needed materials; an arbitrary custom colony may need a different route or training first.

1. Pause with **P** in local practice and use **Show destination** to inspect the intended clearing.
2. Open **Build**, choose **School** and place it on the prompted ground.
3. Right-click to leave placement, then select the foundation. If another object remains selected, right-click to clear it before selecting the site.
4. Read HP, the actual Working request and each material requirement.
5. Resume and follow the materials until construction finishes.

:::media-group

[[media:training-school-foundation-v3]]

[[media:training-school-foundation-detail-v3]]

:::

This School starts at **HP 1/360**, **Wood 0/7**, **Algae 0/2** and **Working 0/5**. Five builders are requested; none is attached at that pause. A request does not create workers or provide the missing materials.

:::media-group

[[media:training-school-construction-v3]]

[[media:training-school-construction-detail-v3]]

:::

At the next paused inspection, HP has reached **81/360**, Wood **2/7**, Algae **0/2** and Working **5/5**. A full labor request does not mean construction is finished. Both kinds of material still need to arrive.

If one count stops increasing, inspect the source, route and available workers. A larger request cannot substitute wood for algae. Leave room around the footprint and service entrances; an explorer reaching the clearing does not prove that ground workers can deliver to it.

## Read service use separately from labor

After construction, select the building again. **Inside** counts globs using the service. It is separate from the workers requested to build or supply it.

:::media-group

[[media:training-school-completed-v3]]

[[media:training-school-completed-detail-v3]]

:::

The completed School has **HP 360/360** and **Inside 1/4** at this pause. One glob occupies one of four places. Compare this with a supplied Inn, whose **Working** request concerns hauling while **Inside** concerns diners. [Food supply](/learn/sustainable-food/) shows those Inn readings through an actual reserve drop and refill.

An empty service is not automatically broken. There may be no eligible glob needing it at that moment, or the intended visitors may be busy, blocked or unable to reach it. A full service may need time or additional usable capacity. Inspect the glob and route before raising an unrelated worker request.

## Verify an actual training result

Select a worker before training, then keep that selection while the School is completed and normal simulation runs. Read its abilities again after a real visit rather than assuming every worker improved as soon as the building appeared.

:::media-group

[[media:training-worker-before-detail-v3]]

[[media:training-worker-after-detail-v3]]

:::

The same retained worker changes from **Build (1): 8** to **Build (2): 12**. Its HP stays **200/200**; Food falls from **98%** to **51%**. The actual lesson completes. The School's level and the worker's displayed ability level are different readings; training belongs to that individual.

Keep meals available and release optional competing requests when suitable workers need time to learn. [Training and upgrades](/learn/training-and-upgrades/) explains progression and the separate requirements of a higher-tier construction site.

## Add healing for an injured, fed patient

Open **Tutorial → Hospitals and healing**. This is a separate prepared scene: its selected patient is already injured and fed. Do not diagnose the starting injury as starvation.

:::media-group

[[media:services-patient-before-v3]]

[[media:services-patient-before-detail-v3]]

:::

The worker starts at **HP 50/200** and **Food 81%**. Follow the prompt to place a Hospital on clear reachable ground through **Build → Hospital**. Right-click out of placement and inspect its foundation.

:::media-group

[[media:services-hospital-foundation-v3]]

[[media:services-hospital-foundation-detail-v3]]

:::

The site starts at **HP 1/260**, **Wood 0/3**, **Working 0/2**. Let the requested builders deliver wood and complete it. Reselect the same patient before resuming, and keep that selection while the lesson runs.

:::media-group

[[media:services-patient-after-v3]]

[[media:services-patient-after-detail-v3]]

:::

The same patient later has **HP 200/200** and **Food 40%**, and the actual healing lesson completes. The prepared injury and its repair do not establish a whole-colony recovery from starvation or a raid. [Recovery](/learn/recovering-your-colony/) combines these distinct checks into a practical diagnosis.

:::media-group

[[media:services-hospital-completed-v3]]

[[media:services-hospital-completed-detail-v3]]

:::

The finished Hospital reads **HP 260/260**, **Inside 0/2** at the final pause. Continue supplying meals afterward: the Hospital does not replace an Inn.

## Budget for the next interruption

An upgrade turns a service into a construction project. Before upgrading the only useful Inn, establish another supplied meal service and observe actual use. A backup foundation cannot feed anyone. Apply the same planning to healing or training capacity that the colony currently relies on.

Check the next footprint, material requirements and eligible builders before starting. The completed School above has an Upgrade control; its presence alone does not show a completed upgrade. Develop one stage at a time and observe the resulting capacity before committing another service.

## Check whether the bottleneck changed

| Observation | Inspect next | Useful small correction |
| --- | --- | --- |
| Material count stalls | Source, ground access and assigned workers | Restore the actual delivery before adding a second site. |
| Finished service stays empty | Eligible visitors, their needs and route | Make it usable and allow a real visit. |
| Inside stays full | Service time, demand and reachable alternatives | Add useful capacity only if it can be completed and supported. |
| A worker has not improved | Eligibility, occupied places and competing work | Free appropriate workers while preserving meals. |
| An injured unit does not recover | HP, food and reachable healing | Separate the meal shortage from injury treatment. |
| A higher-tier project has no builders | Required construction qualification | Train and release suitable workers before raising demand. |

One functioning service is more useful than several unsupplied projects. Recheck the original glob or stock problem after the building completes, then decide whether the next commitment is justified.
