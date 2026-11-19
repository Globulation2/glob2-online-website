---
title: "Resource reference"
description: "Identify resource sources, read the consumer's actual material request, and distinguish harvesting from clearing and renewal."
locale: "en"
tags: ["reference", "resources", "economy"]
order: 3
group: "reference"
format: "reference"
prerequisites: ["resources-and-hauling"]
sources:
  - title: "Current public browser food and production examples, observed 18 November 2026"
    url: "https://app.glob2.online/play/"
  - title: "Released native 0.11.6.1 Standard resource definitions"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/content/data/resources/registry.json"
  - title: "Released native 0.11.6.1 harvesting and current-vision checks"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/map/MapResources.cpp"
  - title: "Released native 0.11.6.1 resource growth and spreading"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/map/ResourceGrowth.cpp"
  - title: "Released native 0.11.6.1 clearing and worker damage"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/unit/UnitMovement.cpp"
  - title: "Released native 0.11.6.1 ordinary building recipes"
    url: "https://github.com/Globulation2/glob2/tree/1b60514218218c89516b6c6f26f2fcefc9c8f974/content/data/buildings"
---

A resource on the map supplies a material. Workers bring that material to a building that requests it; there is no automatic colony-wide pool replacing those deliveries. Read the selected site's labeled requirement or the finished building's local stock before adding another job.

The resource definitions below are checked against released **native 0.11.6.1**. The illustrated food, production and construction examples come from the public **browser 0.11.6.0** prepared Food supply practice colony, with explicitly applied High resolution artwork. The browser's exact source revision remains unverified. Use its actual panel and match rules when applying the reference to another scenario.

## Standard sources

| Map source | Material | Renewal and permanence in the native catalog | Standard clearing |
| --- | --- | --- | --- |
| Trees | Wood | Can grow and spread; ordinary harvesting consumes the used deposit | Clearable |
| Wheat | Food | Can grow and spread; heavy use can exhaust a patch | Clearable |
| Papyrus | Paper | Its stock can grow, but the source does not spread | Clearable |
| Rocks | Stone | Ordinary harvesting leaves the deposit in place | Not clearable |
| Algae | Algae | Can grow and spread in suitable habitat | Clearable |
| Cherry tree | Cherries | Persistent tree with renewing fruit; does not spread | Not clearable |
| Orange tree | Oranges | Persistent tree with renewing fruit; does not spread | Not clearable |
| Prune tree | Prunes | Persistent tree with renewing fruit; does not spread | Not clearable |

Growth depends on suitable terrain and match settings. A no-growth or scarcity rule can change the supply problem. A large visible patch is a reserve, not a measurement of the population it can sustain indefinitely.

:::media-group

[[media:food-field-before-v3]]

[[media:food-field-after-v3]]

:::

These current browser crops show the same already revealed wheat patch at two observations, with a stone as a fixed landmark. Compare the distribution while the colony is active. The pictures combine whatever harvesting and renewal occurred; use repeated observations before deciding whether a patch keeps up with demand.

## Food has two competing consumers

Inns store food for existing globs' meals. Swarms store it for births. A worker hauling to one is not simultaneously supplying the other, and a stocked swarm does not refill an empty inn.

:::media-group

[[media:food-swarm-v3]]

[[media:food-swarm-detail-v3]]

:::

This selected swarm retains **Food 15/20** after its birth controls and hauling request have been reduced to their minimum. Stored production food remains when its supply request is lowered. Inspect the inn separately before assuming the meals are equally well supplied.

The ordinary native recipes use one food per meal and five per birth. The current browser examples show actual stocks and role changes; a net stock difference includes deliveries and consumption between observations. Do not divide it by a birth count to infer a recipe or a rate.

Use [food supply](/learn/sustainable-food/) to observe a small consumption/refill interval, and [population and production](/learn/population-and-production/) to change the future role mix while watching actual counts.

## Construction needs the listed material

A site needs its own recipe, not just any nearby resource. Select the site and compare required material, attached workers and usable routes.

:::media-group

[[media:hauling-construction-v3]]

[[media:hauling-construction-detail-v3]]

:::

The current browser inn foundation shows **Wood 2/3**, **Working 1/3** and **HP 135/200**. Two required wood units have arrived; food stored in another building does not replace the missing wood. Follow [resources and hauling](/learn/resources-and-hauling/) through the completed inn and its first food deliveries.

The native Standard catalog's basic school requires wood and algae, and later upgrades can require stone and other materials. Nearby-looking water is not proof that a worker can fetch the algae. Read the actual requirement and follow the trip before deciding whether material availability, access or builder qualification is the bottleneck.

Paper is a defined material, but the ordinary native Standard building recipes do not request it. Check an enabled recipe before assigning paper a use; optional extensions can request materials differently. The [building reference](/learn/reference-buildings/) separates construction costs from finished stocks and service capacity.

## Harvesting and clearing are different decisions

Hauling collects for a consumer. Clearing changes terrain by removing eligible resources; it does not deliver that cleared material into an inn or construction site. Check the Clearing flag's material filters or the painted patch before assigning labor, and preserve useful food and trees.

In the native Standard definitions, rocks and ordinary fruit trees are not clearable. Many stone deliveries therefore do not turn a rock source into a free building site. Use a deliberately small clearing patch when making an access lane, then inspect the result before extending it.

Native clearing work can damage the worker. Check its HP and service access, and preserve healing when the job requires it. A faster request does not make an injured, hungry or blocked worker immediately available. Return to [jobs and flags](/learn/jobs-and-flags/) to choose or release the actual request.

## Keep fruit sources visible

The native fruit definitions require current team visibility for harvesting. Remembering an orchard in the fog is insufficient. Keep a scout or another dependable source of vision near useful trees, then watch the inn's separate **Cherries**, **Oranges** and **Prunes** stores.

A scout supplies vision, not the hauling labor. If fruit stays at zero, check current source visibility, remaining fruit, a ground route and workers attached to the consumer. An explorer's flying route does not prove that ground workers can follow it.

Several pieces of one fruit remain one kind of variety. Fruit can affect meal choice and conversion when the other conditions are satisfied; it does not create globs or guarantee an ownership change by itself. Read [fruit and conversion](/learn/fruit-and-conversion/) before relying on an advertised offer.

## Keep optional systems separate

Foundation and landscape resource experiments can add other sources and materials. Read the actual map and experiment settings rather than extending the Standard table to every possible scenario.

Farm Areas add separate field mechanics; ordinary renewable wheat exists without that tool. The basic market is not a general colony-wide warehouse, and broader stock routing belongs to Markets V2. Preserve natural sources and clear approaches while checking the consumer's real requirements.
