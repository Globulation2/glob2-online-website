import type {CollectionEntry} from 'astro:content';
export const handbookGroups = [
  {id:'start',title:'Start playing',description:'Get a colony running and learn to read the game.'},
  {id:'manage',title:'Manage the colony',description:'Keep workers, food, and production in balance.'},
  {id:'develop',title:'Develop the colony',description:'Build services, train units, and grow your options.'},
  {id:'map',title:'Control the map',description:'Explore, defend, and organize your forces.'},
  {id:'match',title:'Understand the match',description:'Prepare your game and keep your progress.'},
  {id:'improve',title:'Improve your play',description:'Recognize trouble and make better decisions.'},
  {id:'ai',title:'Face the AIs',description:'Understand the opponents you can practice against.'},
  {id:'reference',title:'Quick reference',description:'Look up buildings, units, resources, and controls.'},
] as const;
export type HandbookGroup = typeof handbookGroups[number]['id'];
const legacyGroups: Record<string,HandbookGroup> = {'getting-started':'start','jobs-and-flags':'manage','sustainable-food':'manage','fruit-and-conversion':'develop','defending-your-colony':'map','browser-and-multiplayer':'match'};
export function guideGroup(entry:CollectionEntry<'guides'>):HandbookGroup {return entry.data.group ?? legacyGroups[entry.id] ?? 'reference';}
export function orderedGuides(entries:CollectionEntry<'guides'>[]) {return [...entries].sort((a,b)=>handbookGroups.findIndex(g=>g.id===guideGroup(a))-handbookGroups.findIndex(g=>g.id===guideGroup(b)) || a.data.order-b.data.order || a.id.localeCompare(b.id));}
