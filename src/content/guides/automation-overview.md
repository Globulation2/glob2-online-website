---
title: "Automation in Globulation 2: Hive Mind, JavaScript AIs and MCP"
description: "Compare the three ways to automate a colony, from plain-language commands in online matches to custom AI opponents and AI agents that play the desktop game."
locale: "en"
group: "automate"
order: 1
prerequisites: ["getting-started"]
tags: ["automation", "Hive Mind", "JavaScript", "MCP", "AI"]
sources:
  - title: "Released 0.11.6.2 source: Hive Mind"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/docs/multiplayer/hive-mind.md"
  - title: "Released 0.11.6.2 source: JavaScript scripting"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/docs/scripting/javascript.md"
  - title: "Released 0.11.6.2 source: embedded MCP UI server"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/docs/development/mcp-ui-server.md"
  - title: "Public online service features, checked 19 November 2026"
    url: "https://app.glob2.online/api/v1/instance"
---

Globulation 2 is a game about giving your colony goals rather than steering every unit. Three optional features take that idea further. JavaScript AI players and the MCP server are available now; Hive Mind is coming soon. Each one suits a different kind of player, and none of them is needed to enjoy the game. Learn the ordinary controls in [your first colony](/learn/getting-started/) before adding automation: you will understand what an assistant is doing far better once you have done it yourself.

## Which one do you want?

| Feature | What it does | Where it works | What you need |
| --- | --- | --- | --- |
| [Hive Mind](/learn/hive-mind/) (coming soon) | You type plain-language commands during an online match; a commander carries them out with ordinary orders and reports back. It can also keep named standing orders running. | Not in public builds yet. When released: online matches, including ranked, on servers that enable it | A registered account and Hive Mind credits |
| [JavaScript AI players](/learn/javascript-ai/) | A custom computer opponent or ally written in JavaScript. Import one, then pick it in a game's player setup like a built-in AI. | Local games you set up yourself | A script from the AI Library, AI Studio, or your own file |
| [MCP server](/learn/mcp-server/) | Lets an AI assistant on your own computer, such as an MCP-compatible coding or chat app, see the game window and operate it, or read your colony and place buildings directly. | The desktop game only | A desktop build and an MCP client |

## How they relate

All three hand their decisions to the game the same way you do. A Hive Mind command, a JavaScript AI's choice, and an MCP agent's click or placement each become an ordinary order. The game still checks placement, resources and every other rule, so an assistant cannot do anything you could not do yourself. An order being **accepted** only means it was queued; whether the building gets finished or the attack succeeds depends on the match, exactly as it does for you.

They also play fair with information. Hive Mind, JavaScript AI players and the MCP colony tools only see what your colony can see or has seen. Fog of war still applies, and an ally's private details are not shared with your assistant.

Hive Mind and the MCP server share one more thing: the player script format. Hive Mind's standing orders are small JavaScript programs with a `step(ctx)` function, and the MCP server can run the same kind of program in a local match on your own desktop, without an account or credits. See [Hive Mind standing orders](/learn/hive-mind-standing-orders/) and [MCP agent tools reference](/learn/mcp-agent-tools/).

## Versions

These guides describe Globulation 2 **0.11.6.2**, the latest public release on 19 November 2026. The browser game at [app.glob2.online](https://app.glob2.online/play/) is updated separately. If you install a desktop build, check its version in the main menu: some MCP tools described here are not present in older desktop releases. Desktop builds are published on the [GitHub releases page](https://github.com/Globulation2/glob2/releases).

## Play responsibly with assistants

- **Ranked play.** Once Hive Mind is released, it will be permitted in ranked matches on servers that enable it. Other tools that drive your game window are a different matter: follow the rules of any tournament or event you enter.
- **Trust what you run.** JavaScript AIs and map scripts are code. A map, saved game or replay that contains a script runs it when you open the file, so only open files from people you trust.
- **Keep control.** You can always play manually alongside any assistant. The MCP server can be turned off, or have its control revoked, from Settings. Hive Mind will have a Stop commander control, and its standing orders can be paused or cancelled.
