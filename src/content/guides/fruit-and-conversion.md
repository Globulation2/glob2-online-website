---
title: "Fruit, happiness and conversion"
description: "Read fruit and meal capacity separately, advertise an inn through Teams, and distinguish a richer offer from a proven ownership change."
locale: "en"
tags: ["fruit", "conversion", "food"]
order: 3
group: "develop"
prerequisites: ["sustainable-food", "exploration-and-movement"]
sources:
  - title: "Released native 0.11.6.1 food choice and travel limits"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/team/TeamRouting.cpp"
  - title: "Released native 0.11.6.1 meal fruit and offer reserves"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/building/Misc.cpp"
  - title: "Released native 0.11.6.1 ownership choice"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/unit/UnitActivity.cpp"
  - title: "Released native 0.11.6.1 current harvesting visibility"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/map/MapResources.cpp"
  - title: "Released native 0.11.6.1 fruit and effective armor"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/unit/UnitStats.cpp"
---

Food keeps globs alive. Fruit adds variety to meals and affects which usable inn a hungry glob prefers. A richer rival meal can attract a glob, but fruit stored somewhere on the map is not an automatic ownership change.

This chapter uses **released native 0.11.6.1**: actual human-controlled Teams settings in a local match against Numbi, and separate observed **Maxima-versus-Cabino AI replay** states. All use SDL GPU with explicit High resolution checked after loading. The mechanics below are exact released-native source context; the public browser's exact source revision remains unverified. The human exercise is yours to perform, while the replay observations are identified separately.

## Secure ordinary food before diverting hauling

Begin with a supplied, healthy local Standard colony against an AI. Save a checkpoint before changing food visibility or establishing a forward service. Keep an existing inn working while you test a richer offer.

1. Inspect the inn's **Food**, **Inside** and **Working** together. Stored meals, occupied service places and attached/requested haulers are different readings.
2. Find a reachable cherry, orange or prune source. Different kinds contribute variety; several cherries remain one kind.
3. Keep workers available to gather ordinary food as well as fruit. A flying explorer can reveal a source that your current ground workers still cannot reach.
4. Resume and look for actual stock changes. If fruit stays at zero, inspect current vision, remaining source stock, ground access and the workers attached to the inn.

The native harvesting rule requires **current team visibility** for fruit. Remembering an orchard through fog is insufficient. Keep a scout or another dependable source of vision near it, and preserve a real hauling route. A scouting request is not proof that an explorer has arrived or that any fruit has been delivered.

Use [exploration and movement](/learn/exploration-and-movement/) to distinguish the request from arrival and ground access. If a corridor must be cleared, make a small useful opening and keep services accessible; do not remove the surrounding food merely to tidy the map.

## Read the offer, not just a colorful stock

:::media-group

[[media:maxima-inn-fruit-hd-v2]]

[[media:maxima-inn-fruit-detail-hd-v2]]

:::

This is **Maxima's own inn** in a paused native AI-versus-AI replay at **5:35**. It shows **Food 5/10**, **Oranges 5/40**, **Inside 4/4** and **Working 1/1**; the other fruit kinds are zero. It is a stock-and-occupancy reading, not a newly observed human fruit-delivery sequence.

In the native offer calculation, a fruit kind contributes only when its available stock **exceeds the current Inside count**. Read that relationship before treating a small reserve as an advertised variety. Here the pictured five oranges exceed four occupants, but the occupied service, ordinary food, permissions and reachable trip still matter. That comparison alone does not identify why any individual changed sides.

Fruit cannot replace the inn's ordinary Food. The [current food exercise](/learn/sustainable-food/) separately shows a reserve falling and refilling after hauling is restored. An inn full of fruit but unable to serve a meal does not solve hunger.

## Advertise your inn through Teams

Open **Teams** through the alliance icon beside the map. The following human-controlled native example has three local Numbi AI opponents.

[[media:fruit-advertisement-before-hd-v3]]

Find the intended opponent's row and enable **fV**. Its legend reads **“Show vision for Inn buildings (to steal units)”**. Choose **Ok**, then reopen Teams to confirm the saved setting for that row.

:::media-group

[[media:fruit-advertisement-confirmed-hd-v3]]

[[media:fruit-advertisement-detail-hd-v3]]

:::

The reopened panel has fV checked for **Lime Numbi**, while Cyan and Purple remain unchecked. This confirms the selected food-visibility permission. It does not demonstrate that a rival glob has chosen the meal, arrived or converted.

The neighboring controls have different purposes: **mV** concerns Markets and fruit exchange; **C** concerns chat recipients. Follow the actual labels rather than treating every checked box as part of an inn offer. Alliance and shared vision are fixed in this pictured match; food advertisement remains its own available control.

## Understand when ownership can change

A hungry eligible glob compares usable meals. In the released-native routing rule, a reachable own inn with equal or greater fruit variety keeps preference over the rival candidate. A rival offer must satisfy food visibility, service and conversion eligibility, fruit reserves and a travel limit based on remaining nutrition. Changing a permission does not bypass those conditions.

:::checkpoint

In the native implementation, ownership changes when the glob chooses the rival feeding service, **before completing the meal**. Inspect an actual ownership event; do not count every visitor, tree or checked fV box as a conversion.

:::

:::media-group

[[media:maxima-joins-hd-v2]]

[[media:maxima-joins-detail-hd-v2]]

:::

The separate Maxima-versus-Cabino replay shows the literal notice **“A unit from cabino's team has joined your team ×7”**. It establishes the displayed accumulated notice. It does not identify seven unique visitors, a particular meal, or an individual causal link to the later selected orange stock. The local Teams exercise above is a different match.

In your own saved practice, keep ordinary meals usable, advertise one intended opponent, then observe actual events and ownership. Population alone can mix births, deaths and conversions. Inspect the unit and event context rather than attributing every increase to fruit. An unsuccessful offer can still teach you which prerequisite is missing.

## Compare fruit variety and armor on the same glob

The released-native meal code records distinct fruit kinds for the eating unit. An inn's stock is not that unit's eaten-fruit result. Select a glob and read its own Food and fruit indication after a meal; the fruit indication is neither carried stock nor a meal counter.

Fruit is also **not a universal combat improvement**. The native effective-armor calculation subtracts fruit count times the relevant type's fruit penalty; the penalty differs by type and configuration. More variety can make an inn attractive while reducing effective armor for a relevant warrior. Check actual abilities and selected rules before planning a fight around it.

For an individual comparison in your own local practice:

1. Select one warrior before its next meal. Note its Food, recorded fruit and armor expression.
2. Preserve the same selection while it travels and uses a supplied inn. Avoid introducing training or another change into the comparison.
3. Inspect it again after the meal and compare the actual readings.
4. Keep the result tied to that unit, training and rules rather than assuming every type has the same penalty.

No current same-unit fruit/armor before-and-after pair was obtained for this refresh. These steps teach a source-qualified comparison to perform; the Maxima stock and join notice do not substitute for it.

## Diagnose the missing outcome

| Observation | Inspect next | Useful adjustment |
| --- | --- | --- |
| Known orchard yields no fruit | Current visibility, source stock and ground route | Restore both vision and a usable hauling path. |
| Fruit arrives but meals fail | Ordinary Food and usable service places | Repair the meal supply first. |
| Rival knows the area but ignores the inn | Its row's actual fV permission and eligible food choice | Confirm the intended row and inspect the other conditions. |
| Advertising yields no ownership event | Hunger, own offers, service access and travel | Observe a real food choice; do not promise an inevitable result. |
| Home globs change sides | Reachable own meals and fruit variety | Restore a usable own offer rather than merely filling an inaccessible inn. |

Keep the richer service supportable after the first visitor. Preserve home hauling and review both stocks and occupancy over time. A newly joined glob still needs meals, health and useful work; an attractive but failing inn adds another obligation to the colony.
