# Website content verification

Reviewed on 9 October 2026. The website and game deploy separately; source support for a feature does not establish its availability in the public app. This document records the editorial basis for the website, not a device qualification or a game release announcement.

## Source verification

Local game repository: `/Users/bradley/glob2`, revision `880e3d2bec02c3ec71b7757aea9f1094d42e4b98`. Stable public references use `https://github.com/Globulation2/glob2/blob/880e3d2bec02c3ec71b7757aea9f1094d42e4b98/` followed by the paths below.

| Website claim | Source inspected | Editorial limit |
| --- | --- | --- |
| Indirect control through worker requests, buildings and flags | `src/hud/input/GameGUIInputMenuClickBuilding.cpp`, `src/building/IntBuildingType.cpp`, `src/unit/UnitActivity.cpp`, `src/unit/UnitMovement.cpp` | Explain the decision and observable response; avoid promising that every request succeeds immediately. |
| Inns feed globs; workers collect resources; units interrupt work for needs | `src/building/Misc.cpp`, `src/unit/UnitActivity.cpp`, `src/building/InnSwapHarness.cpp` | Food and care depend on reachable services and the chosen rules. |
| Conquest, prestige and scenario objectives | `src/game/WinningConditions.cpp`, `src/game/rules/CustomGameRules.cpp` | Do not describe conquest as the only possible objective. Campaign scripts and chosen rules matter. |
| Training and custom-game variations | `src/building/IntBuildingType.cpp`, `docs/features/custom-game-setup/README.md` | Training, hunger and regrowth can change with match rules. |
| Tutorial sequence | `campaigns/Tutorial_Campaign.txt`, `data/texts.en.txt` | The shipped tutorial covers basics, further buildings, warriors/training and flags; public menu labels require deployed observation. |
| Browser-local saves and safe exit | `browser/README.md`, `docs/browser/storage.md` | Saves are profile/origin-local. Use the in-game Quit action and export backups; do not imply cloud save synchronization. |
| Online rooms, queues and guest/account behavior | `docs/multiplayer/client.md`, `docs/multiplayer/identity.md` | Source describes capabilities. Marketing directs readers to the app for currently available choices rather than promising a particular sign-in provider or opponent availability. |

The browser README contains conflicting scope statements: its introduction describes responsive touch presentation while its older Scope section says mouse/keyboard only and no mobile adaptation. Current source contains touch controls under `src/hud/touch/`. Neither source presence nor a resized desktop window qualifies physical phones. The website therefore makes no blanket phone support claim. It also avoids a public replay promise without a verified public replay journey.

## Deployed public observation

On 9 October 2026, the public in-app browser opened `https://app.glob2online.com/play/` without a sign-in prompt in an existing signed-in browser session. This was not a fresh anonymous-session check. The client displayed version `0.11.0.0`. A separate Firefox observation confirmed the visible menu entries Tutorial, Custom game, Play online, Campaign, Load game and Editor. The observed route was Tutorial → Tutorial Campaign → Introduction and Basics → Start Mission. The mission showed a red swarm and worker, prompted Space to continue, and then requested selecting a globule. This supports the exact entry labels in the first-session guide. The public hub presented navigation for Leaderboard, Players, Matches and Maps, and its welcome page explicitly said rooms and casual games need no account, with sign-in for ranked play. Its heading also included “staging”; the website therefore retains early-access language. No matchmaking or ranked-game journey was completed.

The tutorial observer clicked the Inn icon below the minimap, placed it on clear terrain near wheat, right-clicked to leave placement mode and selected the inn. The HUD showed Inn Level 1, a Working slider changed from 2/2 to 3/3, and Food rose from 3/10 to 10/10 as workers gathered wheat and fed. These are a worked tutorial example, not a universal starting build or guaranteed timing. The approved `glob2-first-colony.webp` capture shows Working 3/3 and Food 10/10. The separate `glob2-tutorial.webp` capture shows Working 0/3 and Food 10/10; its guide caption explains the distinction between requested and currently working units. Both were inspected before writing captions. `src/hud/draw/GameGUIDrawBuildingHelpers.cpp` confirms the Working display uses current working count followed by the requested maximum.

A separate custom-game check observed the Map, Players & Teams and Game Rules tabs and started an offline simulation with Play this map. The default observed setup was a random Fingerprint map with four colonies: the red local player and three Numbi Easy computer opponents. This is an observed setup, not a fixed default promised by the website. The observer selected the flag tab, then the first triangular icon with the Exploration Flag / Attracts explorers tooltip, placed it on clear terrain, right-clicked to leave placement mode and selected the flag. Its panel showed On the way 0, Here 0, Working 0/2 and Range 10. The colony had no explorers, so none responded. The initial missing-explorer capture was inspected. The swarm exposed Worker, Explorer and Warrior production controls. The observer increased the swarm’s Explorer production weight and set its worker request to three, then waited for new explorers. The flag began receiving explorers and revealed terrain around a lake. The final approved `glob2-exploration-flag.webp` derives from `exploration-flag-active.jpg`; visual inspection found On the way 0, Here 2, Working 2/2 and Range 10. Its guide caption reflects those captured counters rather than the observer’s slightly earlier live counters. The guide keeps the initial zero-explorer failure as context and explains producing new units rather than converting workers.

The observer also opened the game menu with the small round icon at the upper-left of the minimap and saw a separate Save game action. Quitting the tutorial led to a defeat/endgame screen. `docs/browser/storage.md` distinguishes completed save operations from the final storage flush. Both guides therefore require Save game for continuing a match later, followed by Quit to finish storage work; they do not present Quit as automatic match saving.

This review does not qualify physical phone controls, a full campaign completion or replay playback.

## Published downloads

Read-only inspection of `https://api.github.com/repos/Globulation2/glob2/releases?per_page=5` on 9 October 2026 returned three public prereleases: `evidence-map-wrapping-975`, `evidence-serial-loop-963-mechanisms`, and `evidence-serial-loop-963`. Their assets are evidence archives, manifests and checksums, not verified player installation packages. `src/data/release-metadata.json` records the check time with an empty curated release list. The download page retains the public release index and source instructions; it does not relabel evidence archives as installers.

## Historical material

The 2004 first-alpha date remains attributed to the existing original news archive reference in `src/content/history/project-history.md`. Historical dates and wiki translations are not new release or activity claims. The redesign adds original prose and links, and does not copy wiki text or media. Existing rights and attribution records remain in `content/migration-manifest.json`.

## Updating this evidence

Before adding a platform, feature or activity promise, check both the relevant source/release and the public visitor journey. Record the URL, review date, observable behavior and limits. Keep raw release responses, screenshots and browser reports in ignored artifacts; approved explanatory game captures belong with the site's credited assets. Recheck source-specific guides when their referenced behavior changes.
