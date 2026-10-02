import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const editorial = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  locale: z.string().regex(/^[a-z]{2}(?:-[A-Z]{2})?$/).default('en'),
  tags: z.array(z.string()).default([]),
  order: z.number().int().default(0),
  published: z.coerce.date().optional(),
  sources: z.array(z.object({ title: z.string(), url: z.url() })).default([]),
  reviewedAgainst: z.string().optional(),
});

export const collections = {
  guides: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/guides' }), schema: editorial }),
  news: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/news' }), schema: editorial }),
  history: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/history' }), schema: editorial }),
  archive: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/archive' }), schema: editorial }),
};
