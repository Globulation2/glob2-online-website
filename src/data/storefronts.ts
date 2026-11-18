import { z } from 'zod';

// Reviewed production listings are independent of all-platform release qualification.
// A listing's presence never qualifies the direct-download manifest or other stores.
const destinations = {
  microsoft: 'https://apps.microsoft.com/detail/9PH4FCRMX19F',
  apple: 'https://apps.apple.com/us/app/globulation-2/id6817603328',
  snap: 'https://snapcraft.io/globulation2',
} as const;
const storefrontSchema = z.object({
  id: z.enum(['microsoft', 'apple', 'snap']),
  platform: z.enum(['windows', 'ios', 'linux']),
  name: z.string().min(1),
  url: z.url(),
  checkedAt: z.iso.date(),
}).superRefine((store, ctx) => {
  if (store.url !== destinations[store.id]) ctx.addIssue({code:'custom',message:'Store destination must match the reviewed product listing'});
});
export const storefronts = z.array(storefrontSchema).parse([
  {id:'microsoft',platform:'windows',name:'Microsoft Store',url:destinations.microsoft,checkedAt:'2026-11-18'},
  {id:'apple',platform:'ios',name:'App Store',url:destinations.apple,checkedAt:'2026-11-18'},
  {id:'snap',platform:'linux',name:'Snap Store',url:destinations.snap,checkedAt:'2026-11-18'},
]);
export const storefrontFor = (platform: string) => storefronts.find(store => store.platform === platform);
export const getGameLabel = (locale: string, downloadLabel: string) => locale === 'en' ? 'Get the game' : downloadLabel;
