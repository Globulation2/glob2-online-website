---
title: "Browser play, saves, replays, and multiplayer"
description: "Save a useful state, export and restore a real backup, record a clip, and inspect the online choices."
locale: "en"
group: "match"
order: 2
prerequisites: ["getting-started"]
tags: ["beginner", "multiplayer", "troubleshooting", "saves"]
sources:
  - title: "Current public browser save, export, import, load, recording and online controls, observed 18 November 2026"
    url: "https://app.glob2.online/play/"
  - title: "Released native 0.11.6.1 source context: browser storage and file formats"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/docs/browser/storage.md"
  - title: "Released native 0.11.6.1 source context: gameplay recording"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/docs/features/gameplay-recording.md"
  - title: "Released native 0.11.6.1 source context: replay implementation"
    url: "https://github.com/Globulation2/glob2/tree/1b60514218218c89516b6c6f26f2fcefc9c8f974/src/replay"
  - title: "Released native 0.11.6.1 source context: online client"
    url: "https://github.com/Globulation2/glob2/blob/1b60514218218c89516b6c6f26f2fcefc9c8f974/docs/multiplayer/client.md"
---

Open [the browser game](https://app.glob2.online/play/) to play; reading the website's handbook does not start a simulation. These desktop examples use the actual public **browser 0.11.6.0** with explicitly applied High resolution artwork. Its exact deployed source revision remains unverified. Storage and replay background from the released native source is identified separately from the observed browser steps.

[[media:browser-main-v3]]

Use **Tutorial** for prepared lessons, **Custom game** for a local map and opponents, **Campaign** for missions, and **Load game** for retained files. Learn the local controls before joining a live opponent. A saved simulation, campaign progress, a replay and a recorded video preserve different things.

## Save a useful decision point

Choose a healthy local practice state you may want to revisit. The pictured example saves the completed **Upgrading buildings** lesson after its Racetrack upgrade; it is not another player's game.

1. In local practice, pause if you want time to inspect. Press **Escape** or use the game-menu icon.
2. Choose **Save game**.
3. Use the **Filename** field to identify the milestone. Use separate names when you want to retain an opening and a later decision.
4. Choose **Ok** and wait for the save operation to finish and return to the game.

[[media:browser-game-menu-v3]]

[[media:browser-save-dialog-v3]]

The recorded save uses the existing name **Upgrading buildings**. Do not close the tab while it is still writing. If an error remains visible, read it and follow the available retry or export route; dismissing an error is not a completed backup.

Use explicit saves for checkpoints rather than relying only on an Auto save. Saving a simulation is separate from keeping the tutorial or campaign's mission-progress record.

## Export from the main-menu file chooser

Return to the main menu and choose **Load game**. The current main-menu **Choose a game** screen provides **Import** and **Export file**. The simpler Load game dialog inside the running match did not show those controls in this observation.

1. Select the saved game in the left list.
2. Check its preview and displayed information so you know which file you are exporting.
3. Choose **Export file** and wait for the browser download to finish.
4. Keep the downloaded file somewhere you can find again, alongside the game version used for it.

:::media-group

[[media:browser-selected-save-v3]]

[[media:browser-file-detail-mobile-v3]]

:::

This demonstration downloaded a **.game.gz** file. Keep its extension and contents intact. Record the release version from the main menu; the chooser’s own Version field can display a different value. A simulation save recreates a playable state; it is not the same as an MP4 recording or a replay's command history.

The released browser-storage implementation keeps local files by browser profile and site origin. Keep exported backups before clearing site data, changing profiles or moving to another address. Do not assume signing in transfers a local simulation file; use the actual export and import controls for that backup.

## Import a compatible backup and wait for confirmation

In the main-menu game chooser, choose **Import** and select the compatible save through the browser's file picker. Wait for validation and persistence. A chosen filename or a dismissed picker is only the beginning.

[[media:browser-import-confirmed-v3]]

In this actual run the newly imported copy appeared and became selected alongside the original **Upgrading buildings** save. The first import and a second import were both performed with the same downloaded file.

[[media:browser-duplicate-import-v3]]

The repeated import created a separate **(1)** copy; the original and first imported copy remained in the list. Re-exporting the imported copy produced exactly the same bytes as the initial download in this check. That result does not make an arbitrary, corrupt or incompatible file valid.

If import reports an error, keep the original backup and read the message. The native storage implementation validates file type, version and structure before accepting it. A persistence failure and a file-validation failure are different problems; follow the actual retry/export options rather than assuming either has succeeded.

## Load and check the state you meant to keep

Select the imported game, choose **Ok**, and wait for the match to finish loading. Inspect a recognizable building, unit or milestone rather than treating the file-picker action as a successful restore. Pause again if you need inspection time: the recorded import resumed normal simulation after loading.

[[media:browser-loaded-game-v3]]

Here the imported save restored the upgraded **Level 2 Racetrack**, **HP 1000/1000**, and the lesson-complete state. This is an actual save-game round trip, distinct from replay playback.

## Keep replay history separate from saved simulations

The results screen offers **Save Replay**. Enter a name, choose **Ok**, and wait for that save operation to finish. The named dialog below belongs to this demonstration's results flow after leaving the local lesson.

[[media:browser-replay-save-dialog-v3]]

In this check, **Ok** returned to results; a persisted replay entry or playback was not verified.

The main-menu game chooser offers a **Replays** control for selecting the other file type. Replays follow compatible game commands rather than storing a video of the visible screen. Keep the relevant game version and a milestone save as well when you want to play a decision again. Do not assume a replay is a normal save or supports arbitrary exact-tick seeking.

When reviewing a match, inspect the build-up as well as the final fight: training, food, travel and support can explain a later result.

## Record and export visible footage

A recording preserves the local visible perspective. It is different from both a playable save and a command-history replay.

1. Open the game menu and choose **Start recording**. Check that the control changes to **Stop recording**.
2. Return to the game and capture the action you want to explain. A paused screen, menu and gameplay are different parts of the same visible recording.
3. Stop recording and allow finalization to finish.
4. Open **Recordings**, then choose **Export video** for the completed entry.
5. Keep the downloaded video before clearing browser storage. Export its metadata or events separately if you need those additional records.

:::media-group

[[media:browser-recordings-v3]]

[[media:browser-recording-detail-v3]]

:::

The actual check exported a playable **MP4**, with metadata and events as separate downloads. The file includes both menus and gameplay; exporting the metadata alone would not provide that video. Inspect a downloaded recording in a player before treating a toggle as a usable result.

Default recording shortcuts can be checked under **Settings → Controls**; the actual menu controls above avoid relying on a customized binding. Recording availability, encoder choice and storage can vary. Read any error and preserve completed exports rather than assuming an interrupted recording was finalized.

## Inspect the online choices before joining

Choose **Play online** from the main menu. The observed hub has **Ranked 1v1**, **Casual 1v1**, **Rooms**, account sign-in, and a code-or-invite field. These are different choices, not evidence that you have already joined a match.

[[media:browser-online-hub-v3]]

The observed Casual option describes an unrated queue with an AI fallback after a wait. Read the current queue's actual description; online availability and waiting times can change. A local AI difficulty estimate is not an online leaderboard rank.

Before choosing a match:

- Practice the default controls locally.
- Inspect the selected map, rules, teams and account requirements.
- Use a compatible current client and keep its connection/loading flow active.
- Choose a session you can stay through.

For a private room, use the intended code or invitation and inspect its settings before starting. The pictured example stops at the hub; inspect the current room or queue details before starting.

## Troubleshoot without losing the backup

| Problem | Inspect first | Next step |
| --- | --- | --- |
| Keys do not reach the game | Canvas focus and active dialog | Click the game and finish or close the dialog. |
| Save seems missing | Browser profile, site address and selected list | Return to the original location or import the compatible export. |
| Import stays busy | Visible validation/persistence message | Wait for completion rather than navigating away. |
| Import reports failure | File type, version and actual error | Retain the original and follow the offered recovery controls. |
| Load returns an unexpected state | Selected file and recognizable milestone | Recheck the correct backup before overwriting anything. |
| Recording is absent or unusable | Finalization, errors and the downloaded video | Inspect the actual output and preserve any completed export. |
| Online entry fails | Current client, network and displayed hub message | Resolve that condition before joining a session. |

Finish save and export operations before leaving. Browser-tab closure cannot wait for pending storage writes; a download you have actually retained is a separate backup from the local browser store.
