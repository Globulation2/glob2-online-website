---
title: "Browser play, saves, and multiplayer"
description: "Prepare for a match and keep a safe copy of your local progress."
locale: "en"
tags: ["beginner", "multiplayer", "troubleshooting"]
order: 6
sources: [{"title": "Browser controls, storage, multiplayer, and renderer support", "url": "https://github.com/Globulation2/glob2/blob/604510c37baa1bef86f1641fc5bb2f8d8a26f72f/browser/README.md"}, {"title": "Storage guide", "url": "https://github.com/Globulation2/glob2/blob/880e3d2bec02c3ec71b7757aea9f1094d42e4b98/docs/browser/storage.md"}, {"title": "Online accounts and guest play", "url": "https://github.com/Globulation2/glob2/blob/6dbb6bfbbf0615d63bec120c704e707a8d2e9798/docs/multiplayer/identity.md"}, {"title": "Online hub and connection handling", "url": "https://github.com/Globulation2/glob2/blob/6dbb6bfbbf0615d63bec120c704e707a8d2e9798/docs/multiplayer/client.md"}, {"title": "Ratings and verification", "url": "https://github.com/Globulation2/glob2/blob/6dbb6bfbbf0615d63bec120c704e707a8d2e9798/docs/multiplayer/ratings-and-matchmaking.md"}]
reviewedAgainst: "6dbb6bfbbf0615d63bec120c704e707a8d2e9798"
---

## Start locally

Start with **Tutorial** in the browser game before entering multiplayer. On a computer, click the game canvas to focus keyboard input and enable music. The [first-session guide](/learn/getting-started/) walks through the observed tutorial entry and the colony’s first jobs.

Your browser saves belong to that browser profile and website address. Clearing site data removes them. Use the in-game import and export controls to keep backups; another browser does not automatically share those saves.

## Finish a save before closing

To continue a match later, open the game menu and choose **Save game**. Complete that save before leaving; quitting alone does not save an ongoing match for later play.

Then use the game’s **Quit** control and wait for storage to finish. If a write fails, the game offers a retry or a way to leave without confirming a save. Refreshing or closing the tab cannot wait for those pending writes.

## Play online

Choose **Play online** in the game to enter the online hub. Casual rooms and queues support guest play. Register an account to join rated queues and appear on the player leaderboards. Available sign-in methods are shown by the instance.

Use quick match to search for opponents, or create a room and share its invitation code. Some queues can offer AI opponents when human players are unavailable; check the queue information and your opponent preference.

The [online app](https://app.glob2online.com/) keeps player profiles, public match history, and leaderboard pages. Rated queue results change ratings only after engine verification. Room matches are unrated, and a provisional rating means the system is still learning a player’s skill.

Browser play is in early access. A reconnecting match shows its connection status and grace time in the game. Do not close or refresh deliberately during a match: leaving through the game quits your seat, while unexpected connection loss depends on reconnecting before the match’s grace expires.

## If the game has trouble running

Try the software renderer using the game address with `?renderer=software`. If a save fails, export a copy where the game offers that option. For a bug report, include your browser, game version, the action that failed, and any on-screen message.
