---
title: "Hive Mind (coming soon): command your colony in plain language"
description: "Coming soon to public builds. Preview how you will turn on the Hive Mind commander, give it orders during an online match, read its reports, stop it, and understand credits, ranked rules and your data."
locale: "en"
group: "automate"
order: 2
prerequisites: ["getting-started"]
tags: ["multiplayer", "hive-mind", "automation", "online", "troubleshooting"]
sources:
  - title: "Released 0.11.6.2 source: Hive Mind overview"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/docs/multiplayer/hive-mind.md"
  - title: "Released 0.11.6.2 source: English in-game text"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/content/data/texts.en.txt"
  - title: "Released 0.11.6.2 source: Hive Mind settings"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/src/ui/settings/SettingsScreenOnline.cpp"
  - title: "Released 0.11.6.2 source: in-match commander cards"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/src/hive/HiveDialog.cpp"
  - title: "Released 0.11.6.2 source: commander orders and visibility"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/services/online/packages/hive/src/commander-api.txt"
  - title: "Released 0.11.6.2 source: account access policy"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/services/online/packages/core/src/accessPolicy.ts"
  - title: "Released 0.11.6.2 source: browser credits page"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/services/online/apps/web/src/pages/Commander.tsx"
  - title: "Released 0.11.6.2 source: account data export"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/services/online/apps/api/src/auth/accountExport.ts"
---

Hive Mind is a commander you talk to in plain language during an online match. You type an order such as "keep my swarms producing mostly workers", and the commander turns it into ordinary colony orders, reports back, and can leave behind **standing orders** that keep working for you. Your manual controls stay fully available the whole time: Hive Mind works alongside you, not instead of you.

:::note

**Coming soon.** Hive Mind isn't in the public versions of the game yet. The browser game and the current desktop and store downloads don't include it, so you won't find it in **Settings**. This guide describes how it works so you can get ready; it will be updated when Hive Mind reaches a public release.

:::

This guide covers what Hive Mind can and cannot do, how to switch it on, and what it costs you. For orders that keep running on their own, read [Hive Mind standing orders](/learn/hive-mind-standing-orders/) next.

## Who can use it

You need all of the following:

- **An online match.** Hive Mind runs in online matches, including ranked ones. It is not available while you watch a replay, while you spectate, or after your colony has been defeated.
- **A registered account.** Guest play is not enough. The commander only works for a registered account that has Hive Mind access, which you get by adding credits (see [Credits](#credits-and-your-account)).
- **Credits** for the commander's thinking. Standing orders that are already installed keep running without credits.
- **A game server that has Hive Mind turned on.** Each online server decides whether to offer it. The public server at app.glob2.online is already set up to offer it once a game version that includes Hive Mind is released.
- **A copy of the game that includes it.** No public version does yet (see the note above). Once one does, you'll find **Hive Mind** in **Settings**.

## Turn it on

Open **Settings → Hive Mind**. There are two switches, and both start out on:

- **Enable commander shortcuts** ("Command your colony without opening a menu.") turns on the commander keyboard shortcut and the commander controls that appear during a match. If you turn it off, those controls disappear from the map.
- **Allow supervision for new commands** controls whether the commander may come back to check on the standing orders it sets up for you. The in-game description puts it like this: "Follow-ups use credits; installed orders keep running without credits." This setting only affects commands you send after you change it. It doesn't cancel orders you already have.

The same page has a **Commander account and credits** button, which opens your account's credits page in the browser. There are no credit settings in the match screen itself.

## Give an order

During a match, either:

- press **Ctrl+Enter**, or
- select **Give order** in the commander controls on the map.

A chat-style box opens. Type your order (up to 2,000 characters) and press **Enter** to send it and close the box. **Escape** closes the box but keeps your draft, so you can finish it later.

After you send an order, a report says **Order received:** followed by your text. The commander then looks at your colony and starts working. Its first report is usually "I am assessing the colony."

Sending a new order replaces whatever the commander was doing for your previous one. Standing orders it already installed keep running.

### What the commander can do

The commander uses the same kinds of orders you do. It can:

- place construction sites and flags,
- set worker counts, building priorities and swarm production ratios,
- delete a building, or cancel a deletion,
- set market exchanges, flag ranges and minimum unit levels, move flags, and choose what a clearing flag clears,
- add or remove forbidden, guard and clearing areas.

Like you, it directs your units through buildings, flags and areas. It doesn't steer individual units.

### What "received" and "accepted" mean

When the commander issues orders, they go into the same queue as your own clicks and follow the same game rules. An accepted order is only a queued order. A construction site can still fail because of placement, missing resources, or what is already on the map. The commander is set up to check your colony afterwards rather than assume an order worked, and you should check too.

### What the commander can see

The commander sees the match from your colony's point of view and nothing more:

- **Fog of war applies.** It sees enemy units and buildings only when your colony can currently see them. It may remember terrain you explored earlier, but that memory isn't live.
- **Your allies' private information stays private.** An alliance doesn't give the commander your allies' resources or detailed unit and building information.
- It can only act for your own colony.

## Read reports

The commander controls on the map show the commander's latest progress or its most recent report, in short form. Select **Reports / details** to expand the panel. It then shows the **ten most recent reports** and more detail on each standing order. Select **Less** to collapse it again.

The same panel also shows messages about connection problems and paused standing orders. Those are covered under [Troubleshooting](#troubleshooting) and in the [standing orders guide](/learn/hive-mind-standing-orders/).

## Stop the commander

You can stop the commander at any time:

- press **Ctrl+Shift+Enter**, or
- select **Stop commander** in the commander controls on the map. This button is there for mouse and touch players.

The control shows **Stopping…** and then **Stopped**, and the commander reports "I have stopped working. Your standing orders remain active."

Stopping does three things:

- It ends the commander's current work.
- It cancels colony orders the commander had prepared but not yet sent.
- It withdraws the commander's permission to come back and follow up on your standing orders.

Stopping does **not** remove your standing orders. They keep running. To pause or remove one, use the controls on its card, described in [Hive Mind standing orders](/learn/hive-mind-standing-orders/).

If the control shows **Stop failed; retry the stop shortcut**, press the shortcut or select the button again.

### Change the shortcuts

Ctrl+Enter and Ctrl+Shift+Enter are only the defaults. You can change them under **Settings → Controls**, where they're listed as **Open commander** and **Stop commander**.

## Credits and your account

Credits pay for the commander's thinking: understanding your order, planning, and any follow-ups it makes. Running standing orders that are already installed costs no credits.

To manage credits:

1. Sign in on the online site.
2. Open your account. When the server offers Hive Mind, the account page has a **Hive Mind** card with a **Hive Mind credits** button. **Commander account and credits** in the game's settings opens the same page.
3. The page shows your available credits, any credits reserved for work in progress, and your recent activity. If purchases are open on that server, it also lists the credit packs you can buy.

The first time you add credits to your account, it also unlocks Hive Mind access. Payment happens on a separate checkout page. Your balance updates once the payment is confirmed, and you can go back to your colony while it's processing.

Prices and pack sizes are shown on the credits page. They aren't listed here because the server sets them.

Some things to know about credits:

- **When you run out:** the commander won't take new orders. It shows "Your commander needs more credits. Standing orders remain active." Your standing orders keep running, but the commander can't make paid follow-ups on them. Alerts that come in while you have no credits stay in your reports. They aren't acted on later when you add more credits.
- **No subscriptions or automatic top-ups.** Credits don't expire, and there's no automatic per-match spending cap. To limit your spending, stop the commander or turn off **Allow supervision for new commands**.
- **Refunds and disputes:** if a purchase is refunded or disputed after you've spent some of its credits, your balance can go below zero. While it's negative, the commander can't work until you add enough credits to bring it back above zero.

## Ranked play

Hive Mind is allowed in ranked matches on servers that turn it on. Both the in-game settings and the credits page say so. Once it's released, your opponent may be using it too.

## Your data

Commander records are part of your account's data. The **Download my data** button on your account page includes:

- your Hive Mind credit balance and credit history,
- your purchases and any refunds,
- usage records for the commander's work,
- your commander sessions, including your commands and its reports,
- the colony operations it carried out,
- your standing orders.

The download only contains records that belong to your own account.

## Limitations

- Hive Mind only works for online matches, and only on servers that offer it.
- Results aren't guaranteed. The commander can misread a situation or ask for something the game then refuses. Watch your colony, especially in close ranked games.
- It only knows what your colony can see.
- It works through the same order queue as you, so a burst of orders from you and your standing orders together can briefly fill that queue.
- The commander can only be connected in one window or device per match.

## Troubleshooting

**Ctrl+Enter does nothing.** Check that **Enable commander shortcuts** is on in **Settings → Hive Mind** and that the shortcut hasn't been changed under **Settings → Controls**. Also check that you're in an online match as a player. The commander isn't available in replays, while spectating, or after your colony is defeated.

**"Add credits to enlist your commander."** Your account doesn't have Hive Mind access yet. Sign in with a registered account and add credits on the credits page.

**"Your commander needs more credits. Standing orders remain active."** Your available balance is used up or below zero. Add credits, then send your order again.

**"Order not confirmed. Open the commander to retry; your message has been kept."** The game couldn't confirm that the server received your order. Open the commander again; your text is still there. Press Enter to resend it.

**"Your previous order is still sending."** Wait a moment, then open the commander. Your newer message has been kept so you can send it.

**"Your commander is connected in another window."** Close the other tab or game window that is in the same match, then try again.

**"Hive Mind is not available on this instance" or "Hive Mind is not enabled on this instance."** The server you're playing on doesn't offer the commander.

**Credits page says "Sign in to view your commander and credits."** Sign in on the online site first.

**Something about paused standing orders or a changed connection.** See [Hive Mind standing orders](/learn/hive-mind-standing-orders/#reconnects-and-restarts).

For other ways to automate your colony, see the [automation overview](/learn/automation-overview/).
