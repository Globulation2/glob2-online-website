---
title: "JavaScript AI players"
description: "Install, write, test and play against your own JavaScript colony controller, and know what runs when you open someone else's file."
locale: "en"
group: "automate"
order: 4
format: "lesson"
prerequisites: ["getting-started", "choosing-an-ai"]
tags: ["AI", "JavaScript", "scripting", "custom AI"]
sources:
  - title: "Released 0.11.6.2 source: JavaScript scripting guide"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/docs/scripting/javascript.md"
  - title: "Released 0.11.6.2 source: JavaScript API reference"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/docs/scripting/javascript-api.md"
  - title: "Released 0.11.6.2 source: Custom AIs settings screen"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/src/ui/settings/SettingsScreenCustomAIs.cpp"
  - title: "Released 0.11.6.2 source: English interface text"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/content/data/texts.en.txt"
  - title: "Released 0.11.6.2 source: command-line guide"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/docs/tools/cli.md"
  - title: "Released 0.11.6.2 source: example AI script"
    url: "https://github.com/Globulation2/glob2/blob/aecd7aed221818f1a68e18f310695b7c5b4ffe51/examples/javascript/ai.js"
  - title: "JavaScript AI starter project"
    url: "https://github.com/Globulation2/glob2-javascript-ai-starter-exampler"
---

A JavaScript AI is a computer-controlled colony whose decisions come from a script you, or someone you trust, wrote. You select it for a colony in a local game, just as you would choose one of the [built-in opponents](/learn/choosing-an-ai/). It sees what that colony is allowed to see, and it gives the same kinds of orders a player can: staffing buildings, placing construction sites and flags, and painting zones.

Use one to practise against a strategy you designed, to automate your own experiments, or to compare an idea against Nicowar or Maxima over many games.

:::note

JavaScript AIs run only in local games. Custom controllers are not available in online multiplayer games or tournaments.

:::

## Only open files from people you trust

A JavaScript AI is ordinary program code, and the game treats it as trusted. Maps, saved games and replays can carry embedded JavaScript, and **loading one runs that code automatically**, with no setting to enable and no permission prompt. The game limits what scripts can reach and how much work they can do, but those limits exist for reliability. They do not protect your computer from a deliberately malicious script.

- Open maps, saves and replays only from people you trust, and read the embedded source when you can.
- An AI Library release marked **Passed compatibility checks** has passed the game's compatibility tests. It is not a safety certification and says nothing about how well the AI plays.

## Where custom AIs come from

Open **Settings → Custom AIs**. The screen explains the basics, and **Example AI and authoring guide** opens the starter project. You can add an AI in four ways:

- **Open AI Library** to browse the online catalogue. **Discover** searches by name, description and author, filters by tags such as *Rush* or *Defensive*, and sorts by most liked, newest, recently updated or most downloaded. **Favourites** keeps a private shortlist (sign in through Online settings to like and favourite). Choose a release and **Download & install**. The game checks the downloaded file and installs only releases validated for the game version you are running. The **Installed** view works offline, and when you are connected it shows **Update available** for newer releases. Updates never install automatically.
- **Import JavaScript AI** to copy a single bundled `.js` file into the game's library.
- **Link development file** (desktop only) to point the game at a file you keep rebuilding. **Relink** changes the path, and removing a link never deletes your file.
- Build the [starter project](https://github.com/Globulation2/glob2-javascript-ai-starter-exampler), a readable template that grows food capacity, trains, explores, attacks and publishes telemetry. It needs Node.js 22 or newer: run `npm ci`, then `npm run build`, and import `dist/example.js`.

Each library entry offers **Update** (or **Relink**), **Validate**, which reruns the startup check, and **Remove from library**. Duplicate display names are allowed, because each entry keeps its own identity.

### Share an AI, or write one in the browser

**Share your AI**, at the bottom of the AI Library, opens the website's publishing page. Upload one bundled UTF-8 `.js` file of up to 128 KiB, then choose a name, description, visibility, version label, release notes and up to five tags. Each release must pass the same compatibility checks, and published releases cannot be changed afterwards. Upload a new release instead.

The online service also offers **AI Studio** at [app.glob2.online/ai-studio](https://app.glob2.online/ai-studio). It is a single-file editor with a chat assistant. Start from a working example, import a `.js` file, or open an AI Library version you own. **Run checks** runs the server compatibility checks, and **Playtest** runs the selected revision in a browser game. **Restart same setup** repeats that game with the same seed and opponent. Editing, downloading and playtesting are free. Assistant requests use a separate Studio balance with a visible spending cap. Neither checks nor repairs start on their own.

### Platforms

| Task | Desktop | Browser and Android |
| --- | --- | --- |
| Import a `.js` file, AI Library, Validate | Yes | Yes |
| Link development file | Yes | No; import, then use **Update** after each rebuild |

The free iOS App Store edition hides custom AI discovery and installation.

## Play against it

1. Start a local game, for example **Custom game** as described in [Choosing an AI opponent](/learn/choosing-an-ai/).
2. In **Players & Teams**, set a colony's controller to **AI**.
3. Open that colony's AI selector. Imported and linked JavaScript AIs appear in the list alongside the built-in opponents.

The game reads the selected file once, when the match starts, and stores that exact source in the game. Rebuilding a linked file or updating a library entry affects only games you start later. Saves and replays keep the code they started with, so you can resume or watch them without the original file or library entry.

## Write your first AI

An AI is one JavaScript file that defines a `step(ctx)` function. The game calls it at the AI decision cadence. Each call either returns **one order** or returns `null` for no order:

```javascript
let decisions = 0;

function step(ctx) {
  decisions++;
  const buildings = ctx.game.buildings({team: ctx.myTeam, limit: 50});
  const building = buildings.find(b => !b.virtual && b.workers !== 2);
  return building ? {type: 'workers', building, workers: 2} : null;
}
```

This AI asks each of its buildings (but not its flags) for two workers, one building per decision.

- **`ctx`** is new on every call. `ctx.myTeam` is your colony, `ctx.tick` is the game tick, and `ctx.game` answers questions about the world.
- **Top-level variables persist automatically.** `decisions` keeps counting across calls and is saved inside save games and replays. You do not need a state object or a setup function.
- **`ctx.tick` is the clock.** The game does not call `step` once per tick, so do not count calls to measure time.
- **One file.** You can write modules while you develop, but the game cannot import files at runtime. Bundle everything into a single `.js` file (up to 128 KiB) before you import it.

The [API tour](/learn/javascript-ai-api/) lists what you can read, every order type, and the newer profile 2 style in which you edit building properties and queue actions instead of returning one order.

## Check and test it on desktop

The desktop `glob2` executable includes two commands for AI authors. On macOS, use absolute paths, because the app changes its working directory when it starts.

First, check that the script loads:

```sh
glob2 ai check /absolute/path/to/my-ai.js
```

This loads your source, runs `metadata()` if you defined one, confirms that `step` exists, and checks that your initial top-level variables can be saved. It does **not** call `step`, so a script that crashes on its first decision still passes. A rejected script prints `FILE: message` and exits with status 2. Add `--format json` for a machine-readable report.

Then play a short headless game against a built-in AI:

```sh
glob2 game run --output-dir /absolute/path/to/new-run-folder \
  --map-file /absolute/path/to/SmallForTwo.map.gz --game-seed 1 \
  --player javascript --ai-script 0:/absolute/path/to/my-ai.js \
  --player nicowar --ticks 3000
```

Give one `--player` for each team on the map, in team order. `--ai-script 0:` attaches your file to the first player, and the output folder must not already contain a `result.json`. If your AI fails, the command prints the AI name, tick, error and script line, and `result.json` repeats it under `javascriptControllers`. Change `--game-seed` to try different games.

A profile 1 script has no `console` or logging. To inspect your state at a chosen tick, throw it: `throw new Error(JSON.stringify(myState))`. The resulting diagnostic shows the values.

In the game itself, use **Validate** in **Settings → Custom AIs**. A successful check reports "AI startup and persistent globals are valid."

## When a script fails

If `step` throws an error, returns an invalid order, uses up its work budget, or leaves top-level data that cannot be saved, that AI is **disabled for the rest of the game**. Its colony receives no more orders from it. The disabled state and its diagnostic are saved with the game.

In 0.11.6.2 and later, a local game also shows "A JavaScript AI stopped: …" with the AI name, tick and error, and **Menu → AI telemetry** keeps the full message under `runtime.status`. You can see it for your own and allied colonies, or for every colony while you watch a match. The [current desktop release is on GitHub](https://github.com/Globulation2/glob2/releases).

You cannot catch these failures inside your script, because the game validates your order and saved data after `step` returns. You can catch ordinary query errors, such as a malformed argument. A few failures are serious enough to end the whole game instead, such as the script running out of memory. Read small pages of data, and do not store whole snapshots of the world.

## Map scripts

Maps can carry a JavaScript scenario script as well. A map script also defines `step(ctx)`, but it sees the whole map (`ctx.myTeam` is `-1`), and it returns a list of effects such as `[{type: 'message', text: 'Welcome!'}]` instead of an order. Effects can show messages, change objectives and hints, enable or disable building choices, and issue scenario orders. To add one in the map editor, open the scenario editor, choose the **Map Script** tab, and select **JavaScript** in the language dropdown. **Compile** (or F9) checks syntax without running the script, and saving the map embeds it. A map-script failure stops the game rather than silently skipping the scenario. Map scripts run automatically when the map loads, so the trust warning above applies to them too.

## Troubleshooting

- **My AI is not in the colony's selector.** Import it in **Settings → Custom AIs** first, and check that **Validate** succeeds. Custom AIs are offered only in local games.
- **The game will not start with my linked AI.** A linked file is read when the match starts. If the file has moved or is broken, the launch stops with a diagnostic. Use **Relink**, or rebuild the file.
- **My changes do not appear.** A running or saved game keeps its original code. Start a new game after rebuilding or updating.
- **`ai check` passes but the AI stops on its first move.** The check never runs `step`. Use `glob2 game run` to exercise it.
- **A diagnostic says global data cannot be saved.** Your top-level variables hold something that cannot be stored, such as a `Map`, a class instance, `ctx` itself or (in profile 2) a managed building. See [persistence rules](/learn/javascript-ai-api/#persistence-rules-that-bite).
- **It works and then stops in a large game.** It probably ran out of work budget. Read smaller pages and spread big scans over several decisions.
