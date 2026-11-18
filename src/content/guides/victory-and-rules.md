---
title: "Victory conditions and custom rules"
description: "Read the match contract before building: opponents, alliances, prestige, scenario goals, and optional rules."
group: "match"
order: 1
prerequisites: ["getting-started"]
tags: ["rules", "victory", "reference"]
sources:
  - title: "Current browser rule controls, observed 18 November 2026"
    url: "https://app.glob2.online/play/"
  - title: "Winning conditions"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/game/WinningConditions.cpp"
  - title: "Custom game rules"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/game/rules/CustomGameRules.cpp"
  - title: "Named rule presets"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/content/data/rulesets.json"
---

:::note

A match can end before you destroy every enemy structure. Read the rules and objectives before choosing your opening, and check the result screen's reason when it finishes.

:::

## Check setup in three passes

The setup examples below were observed in the public browser game on 18 November 2026 (menu version 0.11.6.0). Open **Custom Game** and inspect its three tabs before choosing **Play this map**.

1. **Map:** inspect the landscape, colony count, and starting positions. A map choice changes routes and available supplies.
2. **Players & Teams:** confirm who controls each colony and which colonies share a team. **You + AI** gives shared control; choose **You** for ordinary unassisted practice.
3. **Game Rules:** inspect the preset and any changes. Use **Standard** when following the handbook's ordinary food-and-construction lessons.

An AI's difficulty label describes a computer opponent profile. It is separate from the authoritative online player rank. The name of a preset is also not a substitute for its actual rule summary.

[[media:choosing-ai-standard-v3]]

[[media:rules-presets-detail-v3]]

## Defeating opponents and surviving

Ordinary matches track whether colonies remain alive and whether opposing colonies are defeated. Allies affect who counts as an opponent; a surviving alliance can finish a match when no enemies remain. Read the Players & Teams tab so you do not mistake a friendly colony for the next target.

Protect the whole colony's ability to continue: production, food, healing, and surviving units matter. Destroying one particular structure is not a universal victory button. A colony may still have units or other production, and a scenario may use its own objective.

When a match ends, read the reason rather than inferring it from the last structure you saw fall. During recovery, a glob inside a feeding or healing service is not simply absent from the colony: inspect occupied services before assuming all units are gone.

## Understand prestige before racing it

:::note

The pictures show current browser setup controls. Prestige, timer and probability outcomes below are checked against native 0.11.6.1; those endings have not been newly exercised in the browser.

:::

When prestige victory is enabled, the trigger is **combined prestige across the match reaching its threshold**. It is not a separate race for every colony to reach that threshold alone.

At that trigger, the highest-prestige **surviving** colony wins. If opposing colonies tie for the highest prestige, the match is a draw. A defeated colony's retained buildings and prestige do not disqualify every survivor.

Check the configured victory rule before planning a prestige race. Prestige is separate from an estimated win probability: a percentage estimate is not a prestige total or its threshold. If combined prestige approaches the threshold while another surviving colony leads, adding prestige can bring the end closer without making you the winner.

In the standard building catalog, completed top-level schools provide prestige. That makes a prestige plan a development commitment: food, enough labor, trained builders, materials, and space for upgrades. Do not pursue those upgrades while the economy cannot feed its existing population.

:::media-group

[[media:rules-conquest-v3]]

[[media:rules-victory-detail-v3]]

:::

Prestige is a match objective, not experience points or an online rating. Disabling the prestige rule changes whether reaching its threshold ends that match.

## Scenario goals can override your usual routine

Tutorials and campaigns use their own instructions and scripted completion checks. Choose a lesson from **Tutorial** and follow its current task rather than assuming ordinary conquest is required. The current Food supply practice, for example, reports completion after you build an Inn and supply it with wheat. Use the lesson’s **Help / why?** or destination controls when offered; message history is a separate reference.

When playing an unfamiliar campaign mission:

1. Read the opening instructions before spending workers.
2. Inspect the starting buildings and available tools.
3. Check which services and unit roles the task needs.
4. Keep a save before committing to an irreversible attack or clearing operation.
5. Read the next message after each objective changes.

A tool missing from the tutorial panel may be intentionally unavailable until the next lesson. Repeated shortcuts cannot substitute for that objective.

[[media:rules-sandbox-v3]]

## Optional rules change what the colony needs

Treat a changed rule set as a different exercise. **Summary** highlights the selected preset; **All rules** exposes the individual Match, Start, Economy and Combat controls. A manual edit is shown as a change to the preset, with reset controls available. Inspect individual rules when comparing matches.

[[media:rules-all-v3]]

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

[[media:rules-blitz-v3]]

The browser Blitz summary also shows 2x speed, eight Veteran starting workers, a medium stockpile and instant construction. Sandbox instead changes exploration and economic pressure, including revealed terrain, a large stockpile and disabled hunger and combat. These examples are setup inspections; a preview still generating does not prove that a match has started.

Experiments, including farm-area or market extensions, are not universal requirements for playing the game. A map may enable content that another map lacks. The handbook's standard lessons do not require enabling experiments.

## Choose one change for a practice match

For your first AI practice, keep Standard and change only the map or opponent. Once you understand the colony loop, use one optional rule to investigate a particular question. For example, compare food management on two landscapes without also changing hunger, construction, and combat.

Before blaming a failed opening on the map or AI, compare the rules to the match where it previously worked. Different rule settings can explain a different result even when the buildings look familiar.

Continue with [browser saves and multiplayer preparation](/learn/browser-and-multiplayer/) to preserve a useful practice state and join a match with the right expectations.
