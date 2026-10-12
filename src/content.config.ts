import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/projects',
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      githubUrl: z.string().optional(),
      website: z.string().optional(),
      type: z.string().default('text'),
      icon: image().optional(),
      imageClass: z.string().optional(),
      star: z.number().optional(),
      fork: z.number().optional(),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      date: z.date().optional(),
      status: z.enum(['shipped', 'in-progress', 'paused', 'archived']).optional(),
      draft: z.boolean().default(false),
    }),
})

export const collections = { projects }
