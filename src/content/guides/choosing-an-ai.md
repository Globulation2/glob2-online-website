---
title: "Choosing an AI opponent"
description: "Set up a practice duel, understand the opponent labels, and choose a useful next challenge from the eight native AIs."
locale: "en"
tags: ["practice", "opponents", "AI", "setup"]
order: 1
group: "ai"
prerequisites: ["getting-started"]
reviewedAgainst: "4edaed552c3574914197d4978fbff4b81bd1eedb"
sources: [{"title": "Native AI names, selector and difficulty cohort", "url": "https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/ai/AINames.cpp"}, {"title": "Custom game controls", "url": "https://github.com/Globulation2/glob2/blob/4edaed552c3574914197d4978fbff4b81bd1eedb/src/game/screens/CustomGameScreen.cpp"}, {"title": "Native opponent implementations", "url": "https://github.com/Globulation2/glob2/tree/4edaed552c3574914197d4978fbff4b81bd1eedb/src/ai"}]
---

An AI practice match lets you learn one problem at a time: keeping a colony supplied, spotting a change in the opponent's army, or surviving an attack without losing your food deliveries. Choose the opponent for the lesson you want to practice, then keep the setup simple enough to understand what happened.

Finish [your first colony](/learn/getting-started/) before starting here. That tutorial gives you time to learn the controls. A practice opponent keeps developing while you read, so pause when you need to inspect a panel.

## Set up a practice duel

Open [the browser game](https://app.glob2online.com/play/) and choose **Custom Game**.

1. On **Map**, choose **Random map**.
2. Set **Colonies** to **two**. For a compact practice map, set width and height to **128**.
3. Inspect the preview. Find where the colonies start, where their food lies, and whether water or narrow passages separate them. Different landscapes teach different movement problems.
4. Open **Players & Teams**. Keep your colony's controller set to **You** and the other colony's controller set to **AI**.
5. Keep the colonies on different teams. A two-colony free-for-all is a straightforward duel.

[[media:choosing-ai-map]]

[[media:choosing-ai-players]]

The controller choice matters. **AI** makes that colony your computer-controlled opponent. **You + AI** lets both you and an AI issue orders to the same colony; it is a different exercise. **Closed** removes that colony from the match. Check these before choosing the opponent's name.

[[media:choosing-ai-controller]]

[[media:choosing-ai-controller-detail]]

## Choose the opponent by name

Open the AI selector in the other colony's row. The eight native opponents are **Numbi, Castor, Econo, Warrush, Cortex, Nicowar, Cabino, and Maxima**. Choose **Numbi** for a first practice duel.

[[media:choosing-ai-roster]]

[[media:choosing-ai-roster-detail]]

The small information button beside the selector opens the opponent descriptions. You can browse the names there and use the **Use** button to select one, or return with **Back**. Read the description to decide what to watch; keep scouting during the match to see what this opponent actually built on your map.

[[media:choosing-ai-info]]

The selector's **Easy**, **Medium**, and **Hard** labels summarize an offline comparison between native AIs. The numbers beside them belong to that comparison. They are separate from the online player ladder and its **OpenSkill** rankings.

Use the labels to choose a starting challenge, then judge the match itself. Food access, travel distance, water, available room and your decisions can make two games against the same AI feel quite different. An Easy opponent can still destroy an unfinished or starving colony.

## Pick a useful next lesson

| Opponent | Useful practice focus |
| --- | --- |
| Numbi | Establish food and training, scout its development, then prepare for military pressure. |
| Castor | Follow construction and training changes, then defend against a developed force. |
| Econo | Explore, develop a sustainable colony and watch what explorers can do. |
| Warrush | Keep food deliveries working while preparing and handling early pressure. |
| Cortex | Read changing economic and military pressure, and recover between fights. |
| Nicowar | Scout early hostile groups and organize defense without abandoning growth. |
| Cabino | Protect feeding, healing and training services while managing several attack targets. |
| Maxima | Compare force, supply and routes before committing to a fight. |

**Econo's “No warriors” label does not mean an empty or harmless colony.** It produces explorers, and trained explorers can threaten other colonies. Use it to practice development and reconnaissance while still paying attention to hostile activity.

**Inactive** is also listed, but it issues no AI orders. It can give you a quiet colony for a comparison; it does not teach defending against an AI attack.

## Keep the first rules ordinary

On **Game Rules**, choose **Standard**. Check the setup, then choose **Play this map** once the preview is ready.

[[media:choosing-ai-standard]]

Standard keeps ordinary feeding, production, construction and combat needs in play. Disabling hunger, training or resource growth changes the decisions you are practicing. Learn that change deliberately once you can manage the ordinary loop.

For your first Numbi game, give yourself a modest objective: build a supplied inn, keep the swarm supplied, and produce explorers to reveal nearby land. Watch the food counts and workers' routes before adding more projects. Save a milestone when the colony is working so that a failed defense gives you a state you can return to.

## Make each attempt teach you something

Before changing opponents, identify the problem that ended the last attempt. If your inn emptied, practice food deliveries. If attackers reached an undefended service, scout the approach and try a defensive response. If your army lost far from home, inspect its training, health and route to food before sending another group.

Change one part of your next attempt: a staffing request, a building location, the time you start training, or where you gather defenders. Keep the same starting state when you want to compare that decision. A new random map also changes the landscape, so it is harder to tell which change caused the result.

Once a lesson works on one map, try another landscape. The opponent chapters give you scouting checkpoints and response exercises; your job is to read the colony in front of you and check whether the response worked.

Start with Numbi, or return to [jobs and flags](/learn/jobs-and-flags/) and [sustainable food](/learn/sustainable-food/) if your own colony still stalls before the fighting begins.
