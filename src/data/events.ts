import { z } from 'zod';
import records from './events.json';

const utcTime = z.iso.datetime({ offset: false });
const httpsUrl = z.url().refine(value => {
  const url = new URL(value);
  return url.protocol === 'https:' && !url.username && !url.password;
}, 'Use an HTTPS URL without embedded credentials');
const timezone = z.string().refine(value => {
  try { new Intl.DateTimeFormat('en', { timeZone: value }).format(); return true; }
  catch { return false; }
}, 'Use an IANA timezone');
export const eventSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  start: utcTime,
  end: utcTime.optional(),
  timezone,
  format: z.string().min(1),
  organizer: z.string().min(1),
  status: z.enum(['announced', 'registration-open', 'in-progress', 'completed', 'cancelled']),
  rules: z.array(z.string().min(1)).min(1),
  registrationUrl: httpsUrl.optional(),
  results: z.array(z.object({ place: z.number().int().positive(), player: z.string().min(1) })).optional(),
  provider: z.literal('git'),
}).refine(event => !event.end || Date.parse(event.end) > Date.parse(event.start), {
  message: 'Event end must follow its start', path: ['end'],
});
export const eventsSchema = z.array(eventSchema).refine(events => new Set(events.map(event => event.slug)).size === events.length, 'Event slugs must be unique');
export type CommunityEvent = z.infer<typeof eventSchema>;
export const events: CommunityEvent[] = eventsSchema.parse(records);
export function getCommunityEvents(): readonly CommunityEvent[] { return events; }
