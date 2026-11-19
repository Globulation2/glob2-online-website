---
title: "Connect an AI assistant with the MCP server"
description: "Turn on the desktop game's built-in MCP server, connect a local AI assistant, and understand what it can do while it is enabled."
locale: "en"
group: "automate"
order: 6
format: "lesson"
prerequisites: ["getting-started"]
tags: ["AI", "MCP", "automation", "desktop", "settings", "troubleshooting"]
reviewedAgainst: "Globulation 2 0.11.6.2 desktop release"
sources:
  - title: "Released 0.11.6.2 source: embedded MCP UI server guide"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/docs/development/mcp-ui-server.md"
  - title: "Released 0.11.6.2 source: Settings → MCP server screen"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/src/ui/settings/SettingsScreenMCP.cpp"
  - title: "Released 0.11.6.2 source: English interface text"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/content/data/texts.en.txt"
  - title: "Released 0.11.6.2 source: command-line reference (--mcp-port)"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/docs/tools/cli.md"
  - title: "Released 0.11.6.2 source: built-in game_guide text for agents"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/src/mcp/Guide.cpp"
  - title: "Released 0.11.6.2 source: platform availability"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/src/mcp/Availability.h"
  - title: "Globulation 2 releases"
    url: "https://github.com/Globulation2/glob2/releases"
---

The desktop game contains a small **MCP server**. MCP (Model Context Protocol) is the standard many AI assistants use to call outside tools. With the server switched on, an assistant running on the same computer, such as Claude Code or another MCP client, can look at the game window, press its buttons, and play on your behalf. In local matches against the computer it can also read your colony in map tiles and run short scripts for you.

This page covers enabling the server, connecting a client, and what you are allowing while it is on. The [agent tool reference](/learn/mcp-agent-tools/) lists every tool the assistant receives.

## What you can use it for

- **Play together.** Let an assistant manage part of the work, for example placing Inns and keeping food flowing, while you watch or take over. Your own mouse and keyboard keep working throughout.
- **Learn the game.** Ask an assistant to start the **Tutorial**, read each lesson card, and explain why it is placing a building where it does.
- **Hand your colony a script.** In a local match, an assistant can run JavaScript player scripts and install standing orders that keep running between its turns. This works in today's desktop releases, with no account or credits; see [MCP agent tools reference](/learn/mcp-agent-tools/).
- **Exercise your own maps.** Have an assistant start a custom game on a map you made and report what it finds.

The assistant needs no prior knowledge of Globulation 2. The server describes the game to it, and its `game_guide` tool covers rules, menus, the in-game display and common errors.

## Which version and platform you need

This guide describes the **0.11.6.2** desktop release. Check the version you have before you start, because the tools grew over several releases:

| Release | What an assistant gets |
| --- | --- |
| 0.11.4.0 | Screenshots, pointer and keyboard input, and the control lease. No screen inspection, no `game_*` or `hive_*` tools. |
| 0.11.5.0 and 0.11.6.1 | Adds screen inspection and named controls (`ui_inspect`, `ui_act`, `ui_wait`, `ui_renew_control`) and local Hive scripting (`hive_*`). |
| 0.11.6.2 | Adds `game_guide`, the map-tile tools (`game_world`, `game_place`, `game_building`, `game_zone`, `game_view`) and the `--mcp-port` launch option. |

If your installed game is older than 0.11.6.2, get the current build from the [Globulation 2 releases](https://github.com/Globulation2/glob2/releases) page.

The server exists only in the **desktop** builds for Windows, macOS and Linux. The [browser game](https://app.glob2.online/play/), Android and iOS builds do not include it, and their Settings have no MCP category.

## Turn the server on

The server is **off** by default.

1. Start the desktop game and open **Settings**.
2. Choose the **MCP server** category. Its first line reminds you: "Enabling the MCP server permits local clients to see and operate the game."
3. Turn on **Enable MCP server**.
4. Leave **Port** at **27202** unless another program already uses it. Any port from 1 to 65535 is accepted.
5. Check the status line below the endpoint. **Running** means a client can connect. **Starting** appears briefly while the listener restarts. **Error:** followed by a reason means it could not start (see [Troubleshooting](#troubleshooting)).
6. Choose **Copy endpoint** to put the address on your clipboard.

With the default port the endpoint is:

```text
http://127.0.0.1:27202/mcp
```

Changes take effect immediately, with no restart. The game remembers the setting and the port in your local settings profile, so the server comes back on the next time you start the game. Turn it off when you are done.

The same screen shows **Current controller**: the client that now holds control, or **None**.

### Enable it for one session from the command line

If you start the game from a terminal, you can enable the server for that run only:

```sh
glob2 play --mcp-port 27202
```

`glob2 replay` accepts the same option. Nothing is saved: the next ordinary start uses your saved setting again. If you change any MCP setting during that run, the launch values become your saved choice.

## Connect your MCP client

The server speaks MCP over HTTP (the "Streamable HTTP" transport) at the endpoint above. It needs no API key, token, or extra header. In your client, add an HTTP or remote MCP server, give it a name such as `glob2`, and enter the endpoint URL.

For example, with Claude Code:

```sh
claude mcp add --transport http glob2 http://127.0.0.1:27202/mcp
```

Other clients use their own settings screens or configuration files; look for the option to add an HTTP server by URL. If you changed the port, use your port in the URL.

The game must be running with the server enabled before the client connects. Then ask the assistant to call `ui_status`. It should report that the window is available. A good first request is "Start the Globulation 2 tutorial and play the introduction lesson."

:::note

**Clients that only support local command (stdio) servers.** The game's source repository includes a Linux helper, `tools/mcp_stdio.py`, which connects a stdio client to the running game or starts the game for it. Its `--help` option explains its settings. See the [MCP server guide in the repository](https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/docs/development/mcp-ui-server.md#linux-stdio-launcher).

:::

## What you are allowing

While the server is on, any program on your computer can see and operate the game window. Keep these points in mind:

- **Local only.** The server listens only on your own computer's loopback address (127.0.0.1). Other computers on your network cannot reach it, and there is no option to open it to them.
- **No password.** There is no authentication token. Any local program can connect while the server is enabled, not only the assistant you configured.
- **You stay in charge.** Your own mouse and keyboard keep working alongside the assistant's input. You can take over at any time.
- **Game window only.** The assistant operates the game's own screens and in-game dialogs. File pickers and other operating-system dialogs are outside its reach.
- **Revoke control** in **Settings → MCP server** immediately takes control away from the current client, cancels its pending actions and releases any keys or buttons it was holding.
- **Turn it off when you are not using it.** Switching off **Enable MCP server** stops the listener, cancels the controlling client's pending actions and releases anything it was holding.

:::warning

Standing orders installed with `hive_program` keep running in your local match after the assistant disconnects or loses control. Pause or cancel them from their in-game Hive cards. They are never saved and end when you leave or load a match.

:::

## How control works

Looking is free: any connected client can take screenshots and read the screen without asking. Sending input is different. Only one client at a time can hold **control**.

1. The assistant calls `ui_acquire_control` and receives a token. It passes that token with every action.
2. While it keeps acting, control stays with it. After **five minutes** without a token-bearing call, control expires and another client can take it. The assistant can extend it with `ui_renew_control`.
3. When it finishes, it should call `ui_release_control`, which also releases anything it was holding down.
4. A second client cannot take control until the first releases it, the lease expires, or you press **Revoke control**.

If you switch away from the game window, for example to type to your assistant, the game releases any keys or mouse buttons the assistant was holding and cancels its pending actions. The assistant keeps control and does not need to acquire it again. A key or button held by the assistant also lets go after five seconds unless it refreshes the hold.

If the game window is minimized or an operating-system dialog covers it, `ui_status` reports the window as unavailable. Restore the window and the assistant can continue.

## Troubleshooting

**The status shows Error.** The listener could not start, and the text after **Error:** gives the reason. A common cause is that another program, or a second copy of the game, already uses the port. Close that program and choose **Retry listener**, or set a different **Port** and update the URL in your client.

**There is no MCP server category in Settings.** You are using the browser, Android or iOS version. Use a desktop release, 0.11.6.2 or later for every tool described here.

**The client cannot connect.**

- Check that the game is running and the status reads **Running**.
- Check that the port in your client's URL matches **Port** in Settings. Use **Copy endpoint** to avoid typing mistakes.
- Use `127.0.0.1` or `localhost`. The server rejects requests addressed to any other host name, including your computer's network name or IP address. It listens on IPv4 only, so if `localhost` fails on your system, use `127.0.0.1`.
- Browser-based tools that send a web page's `Origin` header are rejected unless that origin is the server's own `http://127.0.0.1:<port>` or `http://localhost:<port>` address. Use a desktop or command-line MCP client.
- If you launched with `--mcp-port`, the server runs on that port for that session only.

**The assistant says another client controls the game.** Another program holds control. Wait for it to finish or expire, or press **Revoke control**.

**The assistant's token was rejected.** Control was lost through expiry, **Revoke control**, or turning the server off. The assistant should call `ui_acquire_control` again.

**An action seemed to fail or time out.** The assistant should not simply repeat input actions. The game may already have received the click or key before the error or timeout was reported. It should inspect the screen or call `game_world` first, then decide what to do. Well-behaved clients never retry input calls automatically.

**Nothing happens in the match.** Check that the game is not paused and that the building or flag requests more than zero units.

## For client developers

The server supports MCP protocol versions **2025-11-25** and **2026-07-28**. Requests are HTTP POSTs to `/mcp` with `Content-Type: application/json` and an `Accept` header listing both `application/json` and `text/event-stream`. Responses are plain JSON. GET and DELETE are not supported, and the server keeps no sessions, streams, resources or prompts. The server's `tools/list` response is the authoritative description of every tool's arguments. The [repository's MCP server guide](https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/docs/development/mcp-ui-server.md) has the full protocol details.

## Next steps

- [MCP agent tools reference](/learn/mcp-agent-tools/): every tool, with a recommended first session.
- [Automation overview](/learn/automation-overview/): how the MCP server, Hive scripts and JavaScript AIs fit together.
- [JavaScript AI](/learn/javascript-ai/) if you want to write your own computer opponent instead.
