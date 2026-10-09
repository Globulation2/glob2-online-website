---
title: "Victory conditions and custom rules"
description: "Read the match contract before building: opponents, alliances, prestige, scenario goals, and optional rules."
group: "match"
order: 1
prerequisites: ["getting-started"]
tags: ["rules", "victory", "reference"]
reviewedAgainst: "4edaed552c3574914197d4978fbff4b81bd1eedb"
sources:
  - title: "Winning conditions"
    url: "https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/game/WinningConditions.cpp"
  - title: "Custom game rules"
    url: "https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/game/rules/CustomGameRules.cpp"
  - title: "Named rule presets"
    url: "https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/data/rulesets.json"
---

A match can end before you destroy every enemy structure. Read the rules and objectives before choosing your opening, and check the result screen's reason when it finishes.

## Check setup in three passes

Open **Custom Game** and inspect its three tabs before choosing **Play this map**.

1. **Map:** inspect the landscape, colony count, and starting positions. A map choice changes routes and available supplies.
2. **Players & Teams:** confirm who controls each colony and which colonies share a team. **You + AI** gives shared control; choose **You** for ordinary unassisted practice.
3. **Game Rules:** inspect the preset and any changes. Use **Standard** when following the handbook's ordinary food-and-construction lessons.

An AI's difficulty label describes a computer opponent profile. It is separate from the authoritative online player rank. The name of a preset is also not a substitute for its actual rule summary.

[[media:rules-standard]]

[[media:rules-presets-detail]]

## Defeating opponents and surviving

Ordinary matches track whether colonies remain alive and whether opposing colonies are defeated. Allies affect who counts as an opponent; a surviving alliance can finish a match when no enemies remain. Read the Players & Teams tab so you do not mistake a friendly colony for the next target.

Protect the whole colony's ability to continue: production, food, healing, and surviving units matter. Destroying one particular structure is not a universal victory button. A colony may still have units or other production, and a scenario may use its own objective.

When a match ends, read the reason rather than inferring it from the last structure you saw fall. During recovery, a glob inside a feeding or healing service is not simply absent from the colony: inspect occupied services before assuming all units are gone.

## Understand prestige before racing it

When prestige victory is enabled, the trigger is **combined prestige across the match reaching its threshold**. It is not a separate race for every colony to reach that threshold alone.

At that trigger, the highest-prestige **surviving** colony wins. If opposing colonies tie for the highest prestige, the match is a draw. A defeated colony's retained buildings and prestige do not disqualify every survivor.

The top bar presents three prestige readings: your colony's prestige, total prestige, and the threshold. Watch all three. If the total is approaching the threshold and another surviving colony leads, building prestige can bring the end closer without making you the winner.

In the standard building catalog, completed top-level schools provide prestige. That makes a prestige plan a development commitment: food, enough labor, trained builders, materials, and space for upgrades. Do not pursue those upgrades while the economy cannot feed its existing population.

[[media:rules-conquest]]

[[media:rules-victory-detail]]

Prestige is a match objective, not experience points or an online rating. Disabling the prestige rule changes whether reaching its threshold ends that match.

## Scenario goals can override your usual routine

Tutorials and campaigns use their own instructions and scripted completion checks. The first tutorial ends after its lesson sequence, not after you defeat a normal AI colony. Read the current message and consult **H** for history when an objective is unclear.

When playing an unfamiliar campaign mission:

1. Read the opening instructions before spending workers.
2. Inspect the starting buildings and available tools.
3. Check which services and unit roles the task needs.
4. Keep a save before committing to an irreversible attack or clearing operation.
5. Read the next message after each objective changes.

A tool missing from the tutorial panel may be intentionally unavailable until the next lesson. Repeated shortcuts cannot substitute for that objective.

[[media:rules-sandbox]]

## Optional rules change what the colony needs

Treat a changed rule set as a different exercise. Inspect individual rules when comparing matches.

| Rule family | What to reconsider |
| --- | --- |
| Hunger and feeding | Whether ordinary food pressure is present; a hunger-free game does not teach a normal food opening |
| Construction and stockpiles | Whether workers must fetch normal materials before completing structures |
| Combat and death | Whether threats, losses, and recovery behave like the match you intend to practice |
| Unit and building upgrades | Whether progression and trained builders are available |
| Revealed terrain | Whether scouting still has to discover the layout; terrain reveal does not automatically reveal every enemy action |
| Prestige, timers, and probability victory | Which standings or threshold can end the match |
| Resource renewal | How quickly natural supply can recover |

A timer ends the match at its deadline and compares the prestige of surviving colonies, even if combined prestige has not reached the ordinary threshold. The highest surviving prestige wins; opposing leaders tied for first draw. Protect survival and your standing before the deadline rather than assuming the match can continue.

**Probability victory** is another optional ending. When enabled, the game can finish once a surviving alliance reaches the configured estimated win-probability threshold, after the initial decision delay. This is the game's match estimate, not an online rating or a guaranteed future result. For example, Blitz enables a 97% threshold as well as a timer. Read **Probability victory** in the Rules summary; **Off (play it out)** leaves this ending disabled.

Experiments, including farm-area or market extensions, are not universal requirements for playing the game. A map may enable content that another map lacks. The handbook's standard lessons do not require enabling experiments.

## Choose one change for a practice match

For your first AI practice, keep Standard and change only the map or opponent. Once you understand the colony loop, use one optional rule to investigate a particular question. For example, compare food management on two landscapes without also changing hunger, construction, and combat.

Before blaming a failed opening on the map or AI, compare the rules to the match where it previously worked. Different rule settings can explain a different result even when the buildings look familiar.

Continue with [browser saves and multiplayer preparation](/learn/browser-and-multiplayer/) to preserve a useful practice state and join a match with the right expectations.
