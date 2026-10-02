---
title: "Jobs, flags, and a little breathing room"
description: "Shape where the colony works and explores without ordering every glob around."
locale: "en"
tags: ["beginner", "mechanics"]
order: 2
sources: [{"title": "Unit movement", "url": "https://github.com/Globulation2/glob2/blob/604510c37baa1bef86f1641fc5bb2f8d8a26f72f/src/unit/UnitMovement.cpp"}, {"title": "Building and flag types", "url": "https://github.com/Globulation2/glob2/blob/604510c37baa1bef86f1641fc5bb2f8d8a26f72f/src/building/IntBuildingType.cpp"}, {"title": "Unit activity", "url": "https://github.com/Globulation2/glob2/blob/604510c37baa1bef86f1641fc5bb2f8d8a26f72f/src/unit/UnitActivity.cpp"}]
reviewedAgainst: "604510c37baa1bef86f1641fc5bb2f8d8a26f72f"
---

## Think in demand

Buildings request workers. Flags request activity in a location: clearing flags attract workers, war flags attract warriors, and exploration flags attract explorers. Change a request when your priorities change; leaving every job at high demand spreads a limited workforce thin.

## Inspect before adding workers

If a building waits for material, more assigned workers may help only when workers and a route are available. Select a glob to inspect its activity. A worker that is eating or healing is meeting a need, and may return to work afterward.

Keep paths between services and resources open. Ground units have to navigate obstacles and each other; a crowded route can make an otherwise sensible layout slow.

## Make each flag useful

Place an exploration flag where information will change your next decision. Use war flags deliberately, and remove requests after the job is over so troops can attend to other needs.

Guard areas help direct defensive movement. Check the actual approach routes into your settlement rather than assuming a line on the map makes it safe.

Try one flag in a practice match and watch which units respond before assigning several.
