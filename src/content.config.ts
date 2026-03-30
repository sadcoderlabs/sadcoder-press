import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()),
    lang: z.enum(['en', 'zh']),
    draft: z.boolean().optional().default(false),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string().optional(),
    date: z.coerce.date(),
    platform: z.array(z.enum(['twitter', 'threads', 'bluesky', 'mastodon'])),
    lang: z.enum(['en', 'zh']),
    tags: z.array(z.string()),
    publishedUrl: z.object({
      twitter: z.string().url().optional(),
      threads: z.string().url().optional(),
      bluesky: z.string().url().optional(),
      mastodon: z.string().url().optional(),
    }).optional(),
    replyTo: z.object({
      url: z.string().url(),
      author: z.string(),
      content: z.string(),
    }).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog, posts };
