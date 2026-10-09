---
title: "Resource reference"
description: "Identify Standard resource sources, distinguish harvesting from clearing, and understand what renews or stays in place."
locale: "en"
tags: ["reference", "resources", "economy"]
order: 3
group: "reference"
prerequisites: ["resources-and-hauling"]
reviewedAgainst: "4edaed552c3574914197d4978fbff4b81bd1eedb"
sources: [{"title":"Standard resource definitions","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/data/resources/registry.json"},{"title":"Current vision required for fruit harvesting","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/map/gradient/SeedCells.h"},{"title":"Resource growth and spreading","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/map/ResourceGrowth.cpp"},{"title":"Worker clearing","url":"https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/unit/UnitMovement.cpp"}]
---

A resource on the map supplies a material. Workers bring that material to a building that requests it; there is no automatic colony-wide pool replacing those deliveries. Read a selected site's labeled requirement or a finished building's local stock.

## Standard sources

| Map source | Material | Renewal and permanence | Clearing |
| --- | --- | --- | --- |
| Trees | Wood | Can grow and spread; harvesting removes the used deposit | Clearable |
| Wheat | Food | Can grow and spread; heavy use can exhaust a patch | Clearable |
| Papyrus | Paper | Stock can grow, but the resource does not spread | Clearable |
| Rocks | Stone | Ordinary harvesting does not consume the deposit | Not clearable |
| Algae | Algae | Can grow and spread in suitable habitat | Clearable |
| Cherry tree | Cherries | Persistent tree with renewing fruit; does not spread | Not clearable |
| Orange tree | Oranges | Persistent tree with renewing fruit; does not spread | Not clearable |
| Prune tree | Prunes | Persistent tree with renewing fruit; does not spread | Not clearable |

Resource growth depends on suitable terrain and match settings. No-growth and scarcity rules change reserves and renewal. A photographed patch alone cannot establish that its growth will support your population indefinitely.

[[media:food-field-comparison]]

## Food has two competing destinations

Inns store food for existing globs' meals. Swarms store it for births. A worker hauling to one is not simultaneously supplying the other.

[[media:food-swarm-detail]]

A standard meal uses one food, and an ordinary birth uses five. A large field can still leave the inn empty if labor is committed elsewhere or the delivery trip is too long. Use [Keep the colony fed](/learn/sustainable-food/) to separate those shortages from a full service.

## Construction needs the listed materials

Wood is common in first buildings. A school also needs algae; later upgrades can require stone and other materials. Nearby-looking water is not proof that workers can fetch its algae. Follow the actual trip and read distance or access messages.

[[media:services-stalled-school]]

Paper is a defined Standard material, but the ordinary building cost list does not use it. Do not assign effort to an imagined paper-consuming service. Inspect the actual site's requirements; optional extensions can use materials differently.

## Harvesting and clearing are different decisions

A hauling worker collects for a consumer. A clearing job removes selected resources to change the terrain; it can damage workers and remove a supply you wanted to keep. Check the clearing flag's material filters or the painted patch before using it.

Rocks and the ordinary fruit trees cannot be removed with the standard clearing tool. A stone source does not become a new empty building site simply because many workers have used it.

Preserve access lanes and future growing space without clearing every patch that makes the colony look untidy. A destroyed food source can become a larger cost than the construction it allowed.

## Keep fruit sources visible

Ordinary fruit trees must be currently visible to your team before workers can harvest them. A remembered orchard in the fog is not enough. Keep a scout or another source of vision near useful trees, then watch the inn's separate Cherries, Oranges and Prunes counts. If deliveries stop, check visibility as well as access and labor.

Several fruits of one kind are still one kind at a meal. Fruit variety affects food choice and can support conversion when the other required conditions are present. It does not create units or guarantee conversions by itself.

## Keep experimental resources separate

Optional foundation and landscape resource families can add ore, alternate vegetation, crops and other sources. They do not change the Standard reference above into a universal map catalog. Read the map and experiment settings when an unusual source appears.

The optional Farm Areas experiment also adds separate field mechanics. Ordinary renewable wheat exists without that tool. The basic market is not a general warehouse; broader stock routing belongs to Markets V2.

For actual trips and local stock, return to [Resources and hauling](/learn/resources-and-hauling/). For construction costs, see [Building and upgrade reference](/learn/reference-buildings/). For production demand, use [Population and swarm production](/learn/population-and-production/).
