---
title: "Hive Mind standing orders (coming soon)"
description: "Coming soon to public builds. Preview how you will ask the Hive Mind commander for orders that keep running, then manage them with the Pause, Resume and Cancel controls on their cards, and learn what happens after a reconnect."
locale: "en"
group: "automate"
order: 3
prerequisites: ["getting-started", "hive-mind"]
tags: ["multiplayer", "hive-mind", "automation", "online", "troubleshooting"]
sources:
  - title: "Released 0.11.6.2 source: Hive Mind overview, limits and recovery"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/docs/multiplayer/hive-mind.md"
  - title: "Released 0.11.6.2 source: standing-order cards"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/src/hive/HiveDialog.cpp"
  - title: "Released 0.11.6.2 source: English in-game text"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/content/data/texts.en.txt"
  - title: "Released 0.11.6.2 source: commander limits"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/services/online/packages/hive/src/commander-api.txt"
  - title: "Released 0.11.6.2 source: example standing orders"
    url: "https://github.com/Globulation2/glob2/tree/aecd7aed221818f1a68e18f310695b7c5b4ffe51/examples/hive-mind"
---

A standing order is a named, repeating task that the [Hive Mind commander](/learn/hive-mind/) sets up for you. For example: "every so often, make sure my swarms are producing mostly workers", or "tell me when my workers start going hungry". Once it's installed, a standing order runs again and again on its own. Each run looks at your colony and can issue a few ordinary colony orders or post a short result. You don't need to keep talking to the commander, and you don't need credits for it to keep running.

:::note

**Coming soon.** Hive Mind isn't in the public versions of the game yet. The browser game and the current desktop and store downloads don't include it, so you won't find it in **Settings**. This guide describes how standing orders work so you can get ready; it will be updated when Hive Mind reaches a public release.

:::

## Ask for a standing order

You don't create standing orders from a menu. You ask the commander for one in plain language. Press **Ctrl+Enter** (or select **Give order**), describe what should keep happening, and press **Enter**. The commander decides whether a one-off action or a standing order fits better. When it creates a standing order, it gives the order a name and a short description, and a card appears for it on the map.

Requests that work well are specific and ongoing. Some examples:

- "Keep all my finished swarms producing roughly four workers for every explorer and warrior."
- "Watch my workers and tell me as soon as any of them are hungry."
- "Every so often, report how many buildings I have and how many workers each one has."
- "Stop the worker-ratio order and replace it with one that favors warriors."

These describe the kind of task the commander's own tested examples cover: swarm production ratios, a hunger watch, and a building report. They aren't guaranteed scripts. The commander writes the actual order, and the game still decides whether each colony order can be carried out.

## How standing orders keep running

- **On a fixed schedule.** Each standing order has an interval of at least 25 game ticks. The commander picks the interval when it creates the order.
- **One at a time.** Orders that are due run in turn, never at the same moment.
- **No catch-up bursts.** If a run is missed, the order doesn't make up for it with a flood of extra runs.
- **They remember things between runs.** For example, a hunger watch can remember that it has already warned you, so it doesn't warn you again on every run.
- **They use your normal order queue.** Their orders go into the same queue as your own clicks and follow the same game rules. An accepted order is only queued. A construction site can still fail because of where it is or what's available.
- **They see what you see.** Fog of war applies, and your allies' private information isn't shared.
- **They need your game to be in the match.** Standing orders run in your copy of the game while you're connected to the match as a player, and they belong to that match only.

### Without credits

Installed standing orders keep running when your credits run out. What does need credits is the commander thinking again. That happens when you give it a new order, and when a standing order calls the commander back for a follow-up (next section).

## Follow-ups and alerts

A standing order can raise an alert, such as "Our workers need food." The alert appears in your reports. If the order was created while **Allow supervision for new commands** was on in **Settings → Hive Mind**, the alert can also wake the commander to look again and act. That follow-up uses credits.

Some limits keep follow-ups under control:

- Repeated alerts of the same kind close together are combined instead of each waking the commander.
- The commander can be woken by alerts at most six times a minute.
- While you have no credits, alerts still appear as reports, but they don't wake the commander. When you add credits later, those old alerts aren't acted on.
- **Stop commander** (or **Ctrl+Shift+Enter**) withdraws the commander's permission to follow up on all your existing standing orders. The orders themselves keep running.
- Changing the **Allow supervision for new commands** setting only affects new commands. It doesn't change orders you already have.

## The standing-order cards

The commander controls stack at the bottom-left of the map. Each standing order has its own card under the **Give order**, **Reports / details** and **Stop commander** controls. The cards only take mouse and touch input inside their own edges, so you can still click and drag the map around them.

Each card shows:

- the order's **name**,
- its status: **Active**, **Paused**, or **Needs a fresh order**,
- a short summary of its most recent result, or its most recent error,
- the order's description, once you select **Reports / details** to expand the panel.

Each card also has two buttons:

- **Pause** stops that one order from running. Pausing takes effect on your screen straight away, while the change is confirmed with the server. Once an order is paused, the button changes to **Resume**.
- **Cancel** removes that standing order completely. To get it back, ask the commander for it again.

While a change is being confirmed, the card shows **Updating…** or **Requested**, and its buttons are briefly unavailable. If the card shows **Update failed; try again**, select the control again. If you see "Standing order update failed. Your order is paused locally; retry the control.", the order is paused on your side until a retry succeeds.

Pausing or cancelling one card only affects that order. **Stop commander** doesn't pause or cancel any cards.

## Change a standing order

To change what a standing order does, ask the commander, for example "Make the worker-ratio order favor explorers instead." The replacement is checked before it takes over. If the check fails, the old order keeps running unchanged. A replaced order usually starts with a fresh memory, so something like "already warned you" may reset.

## Limits you might hit

- **Eight standing orders** at a time. To add another once you have eight, cancel one or ask the commander to replace one.
- **32 colony orders per run** of a standing order.
- **64 waiting orders** shared between you and all your commander and standing orders. If you're clicking quickly while several standing orders are busy, they share this space.
- **At least 25 game ticks** between runs of a standing order.
- **Size limits.** A standing order's own instructions, what it remembers, and its reported results each have size limits. The commander works within them. If a run fails, for example because it went over one of these limits, that order pauses and needs attention.

## Reconnects and restarts

Standing orders are kept for the match and for your account, but each one's working memory lives in the copy of the game that was running it. The game is deliberately careful when that connection is interrupted:

- **The connection changed.** If your connection to the commander changed during the match, all your standing orders are paused and you see "The connection changed. Review your paused standing orders before resuming." Check your colony, then select **Resume** on each order you still want.
- **An order couldn't be confirmed.** If the game can't confirm whether a standing order's orders went through, it pauses your standing orders and tells you: "An order could not be confirmed. Review your standing orders before resuming." It does this so an order is never sent twice by mistake.
- **A standing order failed.** If an order hits an error or a limit, that order pauses and you see "A standing order needs attention and has been paused." Its card shows the error. Ask the commander to fix or replace it, or select **Cancel**.
- **A different window or device.** If you come back to the match in a copy of the game that doesn't have an order's working memory (for example after reopening the game somewhere else), the order's card shows **Needs a fresh order**. You'll see "A standing order needs a fresh instruction after reconnecting. You can cancel it or ask the commander to replace it." You can't resume it as it is. Select **Cancel**, or ask the commander to replace it.

Standing orders from one match never carry over into another match.

## FAQ

**Do standing orders cost credits while they run?**
No. Only the commander's thinking costs credits: new orders, and follow-ups when supervision is allowed.

**I pressed Stop commander but my standing orders are still running. Why?**
That's how it's designed. Stop ends the commander's own work and its follow-ups. To halt a standing order, select **Pause** or **Cancel** on its card.

**Why was everything paused when I came back?**
The game pauses standing orders whenever it can't be sure what happened while the connection was interrupted. Check your colony, then select **Resume** on the orders you still want.

**A standing order says it placed a building, but nothing appeared.**
"Accepted" only means the order was queued. Placement, space, resources and other game rules still decide whether the building happens.

**Can a standing order see the enemy base?**
Only what your colony can currently see, plus terrain you've explored earlier.

**Can I have more than eight?**
No. Cancel or replace one first.

See [Hive Mind](/learn/hive-mind/) for credits, ranked rules and your data, and the [automation overview](/learn/automation-overview/) for other ways to automate.
