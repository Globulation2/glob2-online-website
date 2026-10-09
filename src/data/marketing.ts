import { site } from './site';

interface Decision { title: string; description: string }
interface EditorialLink extends Decision { label: string; href: string }
interface HomeContent {
  eyebrow: string; title: string; description: string; playLabel: string; playNote: string;
  image: { src: string; alt: string; caption: string };
  gameplayTitle: string; gameplayDescription: string;
  decisionsTitle: string; decisions: Decision[];
  firstSession: EditorialLink; playOptions: EditorialLink[]; background: EditorialLink;
  closing: { title: string; description: string; label: string };
}

export const home: HomeContent = {
  eyebrow: 'Globulation 2 Online',
  title: 'Build a colony. Decide where the work goes.',
  description: 'A free, open-source real-time strategy game. Build a settlement, keep it fed, and compete with rival colonies. You assign workers to buildings and place flags; the globs find their own routes and look after their needs.',
  playLabel: 'Play in browser',
  playNote: 'Start with the tutorial. Browser play is in early access.',
  image: {
    src: '/images/glob2-first-colony.webp',
    alt: 'A selected inn beside a red swarm, with workers gathering wheat and an inn panel showing Working 3/3 and Food 10/10.',
    caption: 'The first tutorial colony: an inn on the left and a red swarm beside it. The selected inn’s panel shows three workers and a full wheat supply.',
  },
  gameplayTitle: 'Give the colony work, then watch what happens.',
  gameplayDescription: 'A building needs materials and workers. Those workers also need meals and sometimes medical care. Your decisions connect these needs: a new construction project can wait while the colony catches up on food.',
  decisionsTitle: 'Three decisions you will make',
  decisions: [
    { title: 'Where should workers go?', description: 'Set the worker demand at each building. Construction, food deliveries and other jobs draw on the same workforce, so increasing one request can leave another waiting.' },
    { title: 'Can you feed a larger colony?', description: 'Inns feed your globs; swarms produce more of them. Keep wheat within reach and inns supplied before expanding your population.' },
    { title: 'Where do you need information or force?', description: 'Exploration flags attract explorers; war flags attract warriors. Choose a destination, then watch which units arrive and how the route affects them.' },
  ],
  firstSession: { title: 'Start with your first colony', description: 'Use the tutorial to learn construction and food, then try one change at a time in a custom game. Our first-session guide explains what to watch and what to check when work stops.', label: 'Read the first-session guide', href: '/learn/getting-started/' },
  playOptions: [
    { title: 'Play on your own', description: 'Learn in the tutorial, follow a campaign, or set up a custom game with computer opponents. The editor lets you build maps of your own.', label: 'Learn how the game works', href: '/game/' },
    { title: 'Play online', description: 'Use the online app for rooms, casual games and ranked play. Rooms and casual games allow guests; ranked play requires sign-in. Browse player leaderboards, match records and maps there.', label: 'Open the online app', href: site.hubUrl },
  ],
  background: { title: 'An open-source RTS with a long history', description: 'Globulation 2’s first alpha appeared in 2004. The original wiki preserves its community’s manuals and experiments; the current project develops the game and browser version in public.', label: 'Read the project history', href: '/history/project-history/' },
  closing: { title: 'Try the tutorial.', description: 'Open the browser game and choose Tutorial to begin.', label: 'Play in browser' },
};

export const game: { title: string; description: string; sections: { title: string; paragraphs: string[] }[]; roles: Decision[] } = {
  title: 'You manage the colony’s priorities.',
  description: 'Globulation 2 is a real-time strategy game built around indirect control. You request work and choose where it happens, while individual globs handle movement, meals and other needs.',
  sections: [
    { title: 'Buildings and flags are your orders', paragraphs: ['Select a building to change how many workers it requests. Place a clearing, exploration or war flag to request activity at a location. You manage these demands rather than moving each glob through every step.', 'Watch the response before adding more requests. Workers may be carrying materials, eating or healing; a busy colony cannot do every job at once.'] },
    { title: 'Compete with rival colonies', paragraphs: ['In conquest, win by defeating every opposing colony. Games can also use prestige victory, and campaigns can set their own objectives. Check the chosen rules and the scenario instructions before planning your match.', 'A military push depends on more than its warriors. Food, training, recovery and the routes through your settlement determine how well the colony supports it.'] },
    { title: 'Food and training compete for time', paragraphs: ['Inns turn wheat deliveries into meals. Swarms produce new globs, adding both working capacity and more mouths to feed. A growing population needs a food supply that can keep up.', 'Schools, racetracks, swimming pools and barracks provide different kinds of training. Hospitals provide care. Keep services reachable, and check the match rules: custom games can change hunger, training and resource regrowth.'] },
    { title: 'Choose a way to play', paragraphs: ['The tutorial introduces the basics before buildings, training and flags. Campaigns offer scenarios; custom games let you choose a map, computer opponents and rules. Use the editor to create a map.', 'For multiplayer, choose Play online in the game. The online app links to leaderboards, player records, matches and maps. Browser play is in early access; check the app for the options currently available.'] },
  ],
  roles: [
    { title: 'Workers', description: 'Carry resources and supply construction and buildings. Their availability connects the economy to every new project.' },
    { title: 'Explorers', description: 'Respond to exploration flags and reveal more of the map, giving you information for the next decision.' },
    { title: 'Warriors', description: 'Fight opposing colonies and respond to war flags. Training and access to food and care support their work.' },
  ],
};

export const downloads = {
  title: 'Download Globulation 2.',
  description: 'Choose your platform, or start your colony in the browser. Verified installed editions appear here as releases are published.',
  browserTitle: 'Browser early access',
  browserDescription: 'Open the game and start with Tutorial. Browser saves stay in the browser profile where you created them; export a backup before clearing site data.',
  browserLabel: 'Play in browser',
  sourceDescription: 'Use the repository’s build instructions for your platform.',
  helpTitle: 'Before your first game',
  helpDescription: 'The first-session guide explains how to start the tutorial, assign work and keep an inn supplied.',
};

export const community = {
  title: 'Contribute to Globulation 2.',
  description: 'Find the game’s source, report a reproducible problem, or explore the community’s original documentation.',
  contributionTitle: 'Work on the game',
  contributionDescription: 'The project repository holds the code and developer documentation. Start there to find the relevant build, contribution and translation instructions.',
  bugTitle: 'Report a bug',
  bugDescription: 'Include your game version and browser or operating system, the steps that caused the problem, and the message you saw. A save or replay can help reproduce a gameplay problem.',
  historyTitle: 'Read the original wiki',
  historyDescription: 'Older manuals, strategies and translations remain available with their contributor histories. Their gameplay details may differ from the current game.',
  mapsTitle: 'Explore maps',
  mapsDescription: 'Visit the map library in the online app. Use the in-game editor to create a map of your own.',
};
