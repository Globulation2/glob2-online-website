---
title: "Training and upgrades"
description: "Observe individual learning, prepare qualified builders, and follow a real upgrade back into service."
locale: "en"
tags: ["training", "buildings", "progression"]
order: 2
group: "develop"
prerequisites: ["buildings-and-services", "sustainable-food"]
sources:
  - title: "Current public browser Schools and Upgrading buildings lessons, observed 18 November 2026"
    url: "https://app.glob2.online/play/"
  - title: "Released native 0.11.6.1 Standard training facilities"
    url: "https://github.com/Globulation2/glob2/tree/1b60514218218c89516b6c6f26f2fcefc9c8f974/content/data/buildings"
  - title: "Released native 0.11.6.1 training completion"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/building/Services.cpp"
  - title: "Released native 0.11.6.1 upgrade and builder requirements"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/building/Misc.cpp"
  - title: "Released native 0.11.6.1 upgrade construction and service interruption"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/building/Construction.cpp"
---

A building's level and a glob's abilities describe different things. Completing a School does not improve every worker instantly. Starting an upgrade does not supply its materials, and faster walking does not replace construction training.

These examples are two separate current public browser tutorials: **Schools and worker skills**, then **Upgrading buildings**. They supply prepared colonies and different workers. Both use explicitly applied High resolution artwork; the browser's exact deployment source remains unverified. Native Standard progression below is identified separately from the observed tutorial outcomes.

## Choose training for the intended job

| Facility | Native Standard training purpose | Inspect afterward |
| --- | --- | --- |
| School | Eligible workers' construction and harvesting; further abilities at later tiers | The individual ability and the site's required qualification |
| Racetrack | Walking | The glob's Walk level and value |
| Swimming pool | Swimming | The intended glob's ability and usable route |
| Barracks | Eligible warriors' combat abilities | Attack statistics and actual readiness |

Eligibility depends on unit type and service tier. Read the particular glob, not just the facility name. Preserve meals and allow suitable globs time to use training rather than committing every available one to another job.

## Complete the first School lesson

Open **Tutorial → Schools and worker skills**. Follow its prompt to place a School in the clearing through **Build → School**. Right-click out of placement and select the foundation.

:::media-group

[[media:training-school-foundation-v3]]

[[media:training-school-foundation-detail-v3]]

:::

The actual site starts at **HP 1/360**, **Wood 0/7**, **Algae 0/2** and **Working 0/5**. This prepared lesson supplies swimmers able to fetch its materials. In your own match, check the actual ground and water access before assuming more requests will bring the missing algae.

Resume and let construction finish. [Buildings and services](/learn/buildings-and-services/) follows its intermediate material readings and completed **Inside 1/4** panel. A foundation provides no training yet; after completion, available places and eligible visitors still matter.

## Check the same worker again

Pause and select a worker before it trains. Record its Levels, HP and Food, then retain that selection while normal simulation runs. Inspect again after an actual improvement.

:::media-group

[[media:training-worker-before-detail-v3]]

[[media:training-worker-after-detail-v3]]

:::

In this School lesson the continuously selected worker changes from **Build (1): 8** to **Build (2): 12**. HP remains **200/200**, while Food changes from **98%** to **51%** across the interval. The actual lesson completes. That result belongs to the selected worker; another glob can still have different training.

In the released native Standard progression, basic School builder training prepares Level 2 construction, and further builder training at the next School stage prepares Level 3 work. The site's eligibility and the displayed work value serve different checks. A full request cannot make an unqualified worker perform the next tier.

## Start a real upgrade with prepared builders

Open the separate **Tutorial → Upgrading buildings** lesson. Its first task asks you to upgrade a **Racetrack** and assign skilled builders. The lesson's help explains that its prepared builders already have first-level School skills.

1. Pause and select the existing Racetrack. Read its level, health and current occupants.
2. Choose the actual **Upgrade** control. Watch the resulting state rather than assuming the project has already finished.
3. Allow existing service users to finish, then inspect the construction site and its material requests.
4. Keep eligible builders available and resume until the work actually completes.

:::media-group

[[media:upgrade-racetrack-before-v3]]

[[media:upgrade-racetrack-before-detail-v3]]

:::

At the initial pause the Racetrack is **Level 1**, **HP 675/675**, **Inside 2/2**. After Upgrade is chosen, its control changes to **Cancel upgrade** while the remaining occupant finishes.

:::media-group

[[media:upgrade-racetrack-queued-v3]]

[[media:upgrade-racetrack-queued-detail-v3]]

:::

The occupied service does not become a completed higher tier merely because the request is queued. Follow the transition into actual construction, and account for losing that service while builders work.

## Supply the site through completion

:::media-group

[[media:upgrade-racetrack-construction-v3]]

[[media:upgrade-racetrack-construction-detail-v3]]

:::

The later paused panel identifies a **Level 2 construction site** at **HP 961/1000**, **Wood 8/10**, **Stone 5/5**, **Working 2/7**. Stone is complete, but two wood units are still missing. Two workers are attached against seven requested; that numerator does not by itself tell you why the others are unavailable.

Inspect the remaining source, route and qualified labor before raising the request. Preserve food hauling. Space, materials and eligibility are separate constraints; cancelling an upgrade is not a completed improvement.

:::media-group

[[media:upgrade-racetrack-completed-v3]]

[[media:upgrade-racetrack-completed-detail-v3]]

:::

The actual finished Racetrack is **Level 2**, **HP 1000/1000**, **Inside 4/4**. The lesson has progressed through using the upgraded training and reports completion. The earlier two-place service now has four places; its return to service is a separate checkpoint from the construction request.

## Observe the individual using the improved service

:::media-group

[[media:upgrade-worker-before-v3]]

[[media:upgrade-worker-before-detail-v3]]

:::

:::media-group

[[media:upgrade-worker-after-v3]]

[[media:upgrade-worker-after-detail-v3]]

:::

In this second lesson, one continuously selected worker changes from **Walk (1): 16** to **Walk (3): 26** across the recorded interval. Its **Build (1): 8** stays unchanged, HP remains **200/200**, and Food changes from **75%** to **56%**. This observation does not count individual visits or claim a single visit jumped two levels. It shows why you should inspect the specific ability you meant to improve.

## Keep a backup before upgrading a meal service

The demonstrated upgrade is a Racetrack. When upgrading an Inn in your own match, first establish another reachable, supplied meal service and observe actual use. A backup foundation cannot feed the colony. Preserve that alternative while trained builders perform the upgrade.

Use the [building reference](/learn/reference-buildings/) for native Standard recipes and places, and read the actual browser panel for your selected rules. Do not extend this one demonstrated upgrade into a claim that every service has the same costs, footprint or training requirements.

## Diagnose before adding another project

| Observation | Inspect next | Useful correction |
| --- | --- | --- |
| School waits on algae | Reachable source and appropriately trained workers | Restore the actual delivery route. |
| Finished facility has no training result | Eligibility, service places and competing work | Free appropriate globs and allow real use. |
| Upgrade is queued behind occupants | Current service use and resulting construction state | Let the transition finish before diagnosing a material shortage. |
| Upgrade site receives no workers | Required qualification, needs and routes | Train and release suitable builders. |
| One material remains missing | That source and its actual delivery | Solve the missing requirement rather than requesting everyone. |
| Meals fail during upgrading | Backup service, stocks and access | Restore feeding before committing further work. |

Keep a completed save at useful milestones. Develop one stage at a time, check the actual unit and service afterward, then decide whether the next upgrade is worth its interruption.
