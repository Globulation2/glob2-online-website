---
title: "Fruit, happiness, and conversion"
description: "Food variety can draw globs to another colony, with a tradeoff worth watching."
locale: "en"
tags: ["strategy", "economy", "conversion"]
order: 4
sources: [{"title": "Food selection", "url": "https://github.com/Globulation2/glob2/blob/604510c37baa1bef86f1641fc5bb2f8d8a26f72f/src/team/TeamRouting.cpp"}, {"title": "Meal variety", "url": "https://github.com/Globulation2/glob2/blob/604510c37baa1bef86f1641fc5bb2f8d8a26f72f/src/building/Misc.cpp"}, {"title": "Conversion", "url": "https://github.com/Globulation2/glob2/blob/604510c37baa1bef86f1641fc5bb2f8d8a26f72f/src/unit/UnitActivity.cpp"}, {"title": "Armor and fruit", "url": "https://github.com/Globulation2/glob2/blob/604510c37baa1bef86f1641fc5bb2f8d8a26f72f/src/unit/UnitStats.cpp"}]
reviewedAgainst: "604510c37baa1bef86f1641fc5bb2f8d8a26f72f"
---

## Variety matters

When a glob eats at an inn, the game records the fruit varieties served with its wheat. Several copies of one fruit do not count as several varieties in that meal.

Food selection can lead a glob to another team’s inn. When that happens, the glob can change ownership. Availability, access, and the teams’ visibility and relationships matter; fruit is part of a wider food system.

## Supply the welcome

An inn needs food available when hungry globs arrive. Keep wheat deliveries working while you expand fruit access. A tempting inn that runs short cannot reliably serve either your existing population or new arrivals.

Monitor conversions alongside hunger and production. New globs create new demand, so adjust your services as the population changes.

## Consider the military tradeoff

Fruit eaten at a meal can reduce a unit’s effective armor. Exact values depend on the unit’s configuration and game rules. A food strategy can therefore change combat outcomes as well as population.

Practice this in a custom game: compare stocked inns with different fruit supplies, and inspect units after they eat. The [legacy fruit article](https://globulation2.org/wiki/Fruit_and_conversion) remains available as historical community reading.
