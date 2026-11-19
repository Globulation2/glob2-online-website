# Advanced capture scenarios

`setup-and-rules.mjs` uses the shared current-browser capture helper and real
visible controls to inspect map/controller choices, the eight-opponent roster,
strategy panels and rule presets. Setup text is not evidence of AI behavior or a
match result. Its High-qualified execution retains actual setting/reload proof
separately from the unchanged public JavaScript/WASM hashes; the browser's exact
source revision remains unverified.

## Released native MCP observer

`native-session.mjs` is an interactive observer/controller for an isolated released
native client, not a fixed lesson scenario or a browser MCP endpoint. It was used
with public native 0.11.6.1, source
`1b60514218218c89516b6c6f26f2fcefc9c8f974`. An independent process/profile uses the
supported native MCP server on loopback port 27207. Coordinate an exclusive
renderer/control window before launching; never control another worker's client.
The maintained game MCP documentation describes enabling that server normally.

Launch from the packaged Resources directory with an isolated ignored profile.
Choose SDL GPU and explicit High resolution through supported Graphics settings,
then load a fresh replay and verify the enabled setting again. Retain proof after
capture too. Software cannot render this High artwork; loaded assets or Automatic
quality alone are insufficient. A source-supported bundle asset search and known
working directory are not a per-sprite runtime file trace.

From the website repository, for example:

```sh
node scripts/handbook-scenarios/advanced/native-session.mjs artifacts/handbook/my-native-session inspect
node scripts/handbook-scenarios/advanced/native-session.mjs artifacts/handbook/my-native-session activate game/panel/0
node scripts/handbook-scenarios/advanced/native-session.mjs artifacts/handbook/my-native-session screenshot observed-scene
```

The helper acquires an actual UI lease and inspects the current surface/control
revision before semantic actions. Supported operations are `inspect` (optional key
prefix), `activate` (exact key), `set` (`key=number`), `file` (exact visible file
label), `key`, `click` (`x,y`), `move` (`x,y`), `scroll` (`x,y,dy`), `screenshot`
(lowercase hyphenated name), and `release`. Click/move/scroll coordinates use the
actual returned screenshot viewport, whose physical pixels can differ from
semantic control bounds. Inspect the current frame instead of reusing coordinates
from a different window.

The output must be below ignored `artifacts/`. Screenshots, inspections and real
actions are retained there; lease material is confined to `lease-private.json`
and must never be committed or copied into public evidence. Use a fresh output
folder for a new process. If a lease expires or an uncertain action fails, inspect
and reacquire deliberately rather than blindly replaying the input. There is no
simulation-state write or script-evaluation operation in this helper.

Real supported menu recording is separate from screenshots. Set and verify normal
1x before motion, preserve the complete raw recorder metadata, and inspect actual
start/stop chapters, dropped frames and selected clip timing. Fast replay viewing
may be useful for paused stills but is not a normal-speed motion demonstration.

Finish or release actual recording first, then release control on a live instance
or quit the task-owned application through its normal menus. After a successful
Quit, the post-action inspection can return connection refused because the MCP
server has closed; confirm the application process's actual clean exit separately.
Do not hold a renderer while writing prose, formatting media or reviewing other
work. Preserve generated map/replay/controller seeds and exact observed states;
an unresolved tick-cap replay is not a victory or a controlled AI-strength test.
