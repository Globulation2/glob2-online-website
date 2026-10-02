---
title: "Keep the colony fed"
description: "Protect regrowth, keep inns supplied, and grow at a pace your food system can support."
locale: "en"
tags: ["strategy", "economy", "farming"]
order: 3
sources: [{"title": "Natural growth and resource scarcity", "url": "https://github.com/Globulation2/glob2/blob/604510c37baa1bef86f1641fc5bb2f8d8a26f72f/src/map/MapStep.cpp"}, {"title": "Wheat consumption", "url": "https://github.com/Globulation2/glob2/blob/604510c37baa1bef86f1641fc5bb2f8d8a26f72f/src/building/Misc.cpp"}, {"title": "Legacy farming reference", "url": "https://globulation2.org/wiki/Farming"}]
reviewedAgainst: "604510c37baa1bef86f1641fc5bb2f8d8a26f72f"
---

## Supply comes before expansion

An inn consumes wheat when a glob eats. Swarms also draw on the colony’s resources as they produce units. If hunger rises while stocks shrink, slow expansion and check the existing supply before building more production.

Workers need a usable route from resources to buildings. Inspect inns that are running low: are workers assigned, is wheat reachable, and is travel crowding the route?

## Leave room for regrowth

Wheat grows and spreads under suitable terrain conditions. Nearby water matters, and custom resource-scarcity rules can slow natural growth. An exhausted field cannot supply the same flow as a healthy one.

Experiment with protecting small patches from harvesting so living wheat remains next to open growing space. Keep access lanes clear and observe the result over time. This is a practical experiment rather than a guaranteed layout: terrain, demand, and game settings matter.

## Test a change before repeating it

In a custom game, watch food stocks and hunger while changing one worker allocation or production setting. A farm can look lush while its inns are still undersupplied.

The [original farming article](https://globulation2.org/wiki/Farming) preserves the community’s older layouts and diagrams. Its precise claims are historical; the current game’s resource settings may differ.
